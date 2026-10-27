import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";
import { GET } from "./api/places/route";

const realFetch = globalThis.fetch;
const hasDatabase = Boolean(
  process.env.FINDER_DALLAS_API_URL && process.env.SUPABASE_ANON_KEY,
);

// there is no Next.js server in tests, so send "/api/places" calls
// straight to the real route handler; everything else (Supabase) uses real fetch
function routeApiToHandler() {
  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input.toString();
    if (url.startsWith("/api/places")) {
      return GET(new NextRequest(new URL(url, "http://localhost")));
    }
    return realFetch(input, init);
  });
}

// pick a category and click Search, like a real user
async function searchCategory(categoryName: RegExp) {
  const user = userEvent.setup();
  render(<Home />);
  await user.click(screen.getByRole("button", { name: categoryName }));
  await user.click(screen.getByRole("button", { name: /search resources/i }));
  return user;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Home page", () => {
  it("keeps Search disabled until a category is picked", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /search resources/i })).toBeDisabled();
  });

  it("filters category cards and shows a message when none match", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const categorySearch = screen.getByRole("searchbox", { name: /search categories/i });

    // "food" should leave only Food Bank
    await user.type(categorySearch, "food");
    expect(screen.getByRole("button", { name: /food bank/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /shelter/i })).not.toBeInTheDocument();

    // nothing matches "zzzz"
    await user.clear(categorySearch);
    await user.type(categorySearch, "zzzz");
    expect(screen.getByText(/no categories match your search/i)).toBeInTheDocument();

    // clearing brings every category back
    await user.clear(categorySearch);
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(4);
  });

  // the real database can't be made to fail on demand, so fake a 500 here
  it("shows the error message when the API fails", async () => {
    vi.stubGlobal("fetch", async () =>
      Response.json({ error: "Something went wrong loading resources." }, { status: 500 }),
    );

    await searchCategory(/job center/i);

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Something went wrong loading resources.");
  });
});

// skipped when Supabase env vars are missing
describe.skipIf(!hasDatabase)("Home page with the real database", () => {
  beforeEach(() => {
    routeApiToHandler();
  });

  it("shows real results for a category search", async () => {
    await searchCategory(/shelter/i);

    const count = await screen.findByText(/^\d+ places?$/, {}, { timeout: 15000 });
    const results = screen.getAllByRole("article");

    expect(results.length).toBeGreaterThan(0);
    expect(count).toHaveTextContent(String(results.length));
  }, 20000);

  it("filters real results and shows a message when nothing matches", async () => {
    const user = await searchCategory(/shelter/i);
    const results = await screen.findAllByRole("article", {}, { timeout: 15000 });

    // filter by the first real place's name, it should still be listed
    const firstName = within(results[0]).getByRole("heading").textContent ?? "";
    const filter = screen.getByRole("searchbox", { name: /filter results/i });

    await user.type(filter, firstName);
    expect(screen.getByText(firstName)).toBeInTheDocument();

    await user.clear(filter);
    await user.type(filter, "zzzz");
    // same message in visible UI and sr-only status for assistive tech
    expect(screen.getAllByText(/no matches for your filter/i)).toHaveLength(2);
  }, 20000);
});

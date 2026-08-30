import type { CategoryId, Place } from "../types";

export async function fetchPlaces(category: CategoryId): Promise<Place[]> {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const url = `${apiUrl}/api/places?category=${category}`;
    const res = await fetch(url);

    // #region agent log
    fetch('http://127.0.0.1:7286/ingest/cf03b19b-d106-4227-ac8d-7614104160a2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b6380'},body:JSON.stringify({sessionId:'1b6380',location:'fetchPlaces.ts:response',message:'API response received',data:{url,status:res.status,ok:res.ok,category},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
    // #endregion

    if (!res.ok) {
        // #region agent log
        fetch('http://127.0.0.1:7286/ingest/cf03b19b-d106-4227-ac8d-7614104160a2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b6380'},body:JSON.stringify({sessionId:'1b6380',location:'fetchPlaces.ts:error',message:'API request failed',data:{url,status:res.status,category},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        throw new Error("Request failed");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CACHE_TAG_REVIWES } from "../../../lib/reviews";

export async function POST(request) {
    const payload = await request.json()
    console.log("5 payload:", payload);
    if (payload.model === 'review') {
        revalidateTag(CACHE_TAG_REVIWES)
        console.log('revalidate:', CACHE_TAG_REVIWES);
    }
    return new Response(null, {
        status: 204
    })
    // return NextResponse.json({
    //     healthy: true
    // })
}
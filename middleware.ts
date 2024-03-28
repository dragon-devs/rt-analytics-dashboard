import {NextRequest, NextResponse} from "next/server";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {analytics} from "@/utils/analytics";

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname === '/'){
        // track analytics event
        try {
            analytics.track("pageview", {
                page: '/',
                country: req.geo?.country
            })
        } catch (error){
            // fail silently.
            console.log(error)
        }
    }
    return NextResponse.next()
}

export const matcher = {
    matcher: ['/']
}
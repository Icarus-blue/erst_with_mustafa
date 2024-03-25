import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const userToken = request.cookies.get("your-key")?.value;

//   if (!userToken) {
//     return NextResponse.redirect(new URL("/desired-route", request.url));
//   } else {
//     return NextResponse.redirect(new URL("/desired-route", request.url));
//   }
// }

// export const config = {
//   matcher: "/desired-route",
// };

export const config = {
  matcher: [
    "/home",
    "/music",
    "/explore",
    "/albums",
    "/profile",
    "/profile-edit",
    "/artists",
    "/artist-allsong",
    "/album-allsong"
  ],
};

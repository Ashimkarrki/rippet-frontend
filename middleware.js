import { NextResponse } from "next/server";
export const middleware = async (req) => {
  // console.log(req.cookies.get("jwt"));
  // console.log(req.cookies.get("Role"));
  console.log(await req.cookies.getAll());
  return NextResponse.next();
};

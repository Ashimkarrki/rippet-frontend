import { NextResponse } from "next/server";
export const middleware = (req) => {
  console.log(req.cookies.get("jwt"));
  console.log(req.cookies.get("Role"));
  console.log(req.cookies.getAll());
  return NextResponse.next();
};
// export const config = {
//   matcher: "/",
// };

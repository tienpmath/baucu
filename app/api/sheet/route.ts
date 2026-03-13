import { NextResponse } from "next/server";
// import { getSheetData } from "@/lib/googleSheet";

export async function GET() {
  //const data = await getSheetData();
  return NextResponse.json({ message: "Hello, world!" });
}
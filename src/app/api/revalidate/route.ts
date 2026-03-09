import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret");

  if (!process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: "REVALIDATION_SECRET is not configured on the server" },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("printful-products", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

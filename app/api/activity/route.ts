import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, price, longitude, latitude, activityId } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const activity = await db.activities.create({
      data: {
        userId,
        name,
        price,
        longitude,
        latitude,
        activityId,
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.log("FLIGHTS :", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

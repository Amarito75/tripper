import { auth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, price, longitude, latitude, activityId } = req.body;
    const userId = auth().userId; // Récupérer l'ID de l'utilisateur authentifié

    // Vérifier si l'ID de l'utilisateur est disponible
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Créer l'activité dans la base de données
    const activity = await db.activity.create({
      data: {
        userId,
        name,
        price,
        longitude,
        latitude,
        activityId,
      },
    });

    console.log("ACTIVITY :", activity);
    return res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

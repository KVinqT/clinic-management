import expres, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getClinicData = async (req: Request, res: Response) => {
  try {
    const allPetsData = await prisma.pets.findMany({
      include: {
        pet_parents: {
          include: {
            parents: true,
          },
        },
      },
    });
    res.send(allPetsData);
  } catch (err) {
    console.log(err);
  }
};

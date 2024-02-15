import expres, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getClinicData = async (req: Request, res: Response) => {
  const statusData = req.query;
  const statusId = statusData.status_id;
  const breedId = statusData.breed_id;
  const searchPetName = statusData.searchName as string;
  console.log("statusData", statusData);
  try {
    const whereByCondition: any = {};
    if (statusId) {
      whereByCondition["statusId"] = Number(statusId);
    }
    if (breedId) {
      whereByCondition["breedId"] = Number(breedId);
    }
    if (searchPetName) {
      whereByCondition["name"] = { contains: searchPetName.toLowerCase() };
    }
    const allPetsData = await prisma.pets.findMany({
      where: whereByCondition,
      include: {
        breed: true,
        status: true,
        parents: {
          include: {
            townships: true,
            cities: true,
          },
        },
      },
    });
    res.status(200).send(allPetsData);
  } catch (err) {
    console.log(err);
  }
};

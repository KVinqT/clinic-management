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
    const whereforParent = {};
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
        parents: true,
      },
    });
    res.send(allPetsData);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

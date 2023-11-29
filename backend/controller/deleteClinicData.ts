import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteClinicData = async (req: Request, res: Response) => {
  const toDeleteId = req.params.petId;
  console.log("toDeleteId", toDeleteId);
  const petDatas = await prisma.pets.findFirst({
    where: {
      id: Number(toDeleteId),
    },
  });
  const parentIdOfPet = petDatas?.parentsId;
  await prisma.pets.delete({
    where: {
      id: Number(toDeleteId),
    },
  });
  const isParentStillExist = await prisma.pets.findFirst({
    where: {
      parentsId: Number(parentIdOfPet),
    },
  });

  if (!isParentStillExist) {
    await prisma.parents.delete({
      where: {
        id: Number(parentIdOfPet),
      },
    });
  }
  res.sendStatus(200);
};

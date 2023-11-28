import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteClinicData = async (req: Request, res: Response) => {
  const toDeleteId = req.params.petId;
  console.log(toDeleteId);

  const petsAndParentsData = await prisma.pet_parents.findFirst({
    where: {
      petId: Number(toDeleteId),
    },
  });
  const petAndParentId = petsAndParentsData?.id;
  const parentId = petsAndParentsData?.parentId;
  await prisma.pet_parents.delete({
    where: {
      id: petAndParentId,
    },
  });
  await prisma.pets.delete({
    where: {
      id: Number(toDeleteId),
    },
  });

  const isParentStillExist = await prisma.pet_parents.findFirst({
    where: {
      parentId: Number(parentId),
    },
  });

  if (!isParentStillExist) {
    await prisma.parents.delete({
      where: {
        id: parentId,
      },
    });
  }
  res.send(200);
};

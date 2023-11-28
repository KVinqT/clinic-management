import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const prisma = new PrismaClient();

export const updateClinicData = async (req: Request, res: Response) => {
  const toUpdateId = req.params.petId;
  console.log("toUpdateId", toUpdateId);

  const updatedData = req.body;
  const {
    petName,
    gender,
    status,
    breed,
    dateOfBirth,
    parentName,
    phoneNumber,
    address,
    city,
    township,
  } = updatedData;
  await prisma.pets.update({
    where: {
      id: Number(toUpdateId),
    },
    data: {
      name: petName,
      gender,
      dob: dateOfBirth,
      breedId: breed,
      statusId: status,
    },
  });
  const relatedParent = await prisma.pet_parents.findFirst({
    where: {
      petId: Number(toUpdateId),
    },
  });
  const parentId = relatedParent?.parentId;
  await prisma.parents.update({
    where: {
      id: parentId,
    },
    data: {
      name: parentName,
      phone_number: phoneNumber,
      address: address,
      citiesId: city,
      townshipsId: township,
    },
  });
  res.send(200);
};

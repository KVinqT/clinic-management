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

  try {
    const petData = await prisma.pets.update({
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
    await prisma.parents.update({
      where: {
        id: Number(petData.parentsId),
      },
      data: {
        name: parentName,
        phone_number: phoneNumber,
        address: address,
        citiesId: city,
        townshipsId: township,
      },
    });
    res.status(200).send({ petData });
  } catch (error) {
    return res.status(500).send(error);
  }
};

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createClinicData = async (req: Request, res: Response) => {
  const petsAndParentsData = req.body;

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
  } = petsAndParentsData;

  const petDatas = await prisma.pets.create({
    data: {
      name: petName,
      gender,
      dob: dateOfBirth,
      breedId: breed,
      statusId: status,
    },
  });

  const ParentExist = await prisma.parents.findFirst({
    where: {
      phone_number: phoneNumber,
    },
  });
  console.log("existing parent", ParentExist);

  if (!ParentExist) {
    const parentDatas = await prisma.parents.create({
      data: {
        name: parentName,
        phone_number: phoneNumber,
        address: address,
        citiesId: city,
        townshipsId: township,
      },
    });
    await prisma.pet_parents.create({
      data: {
        parentId: parentDatas.id,
        petId: petDatas.id,
      },
    });
  } else {
    await prisma.pet_parents.create({
      data: {
        parentId: ParentExist.id,
        petId: petDatas.id,
      },
    });
  }
  res.send(200);
};

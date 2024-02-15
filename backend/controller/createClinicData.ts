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

  //if exist take parentId
  const ParentExist = await prisma.parents.findFirst({
    where: {
      phone_number: phoneNumber,
    },
  });
  console.log("existing parent", ParentExist);

  if (!ParentExist) {
    const parentDatas = await prisma.parents.create({
      data: {
        name: parentName.toLowerCase(),
        phone_number: phoneNumber,
        address: address.toLowerCase(),
        citiesId: city,
        townshipsId: township,
      },
    });
    const petDatas = await prisma.pets.create({
      data: {
        name: petName.toLowerCase(),
        gender,
        dob: dateOfBirth,
        breedId: breed,
        statusId: status,
        parentsId: parentDatas.id,
      },
    });
    res.status(200).send({ petDatas });
  } else {
    await prisma.pets.create({
      data: {
        name: petName,
        gender,
        dob: dateOfBirth,
        breedId: breed,
        statusId: status,
        parentsId: ParentExist.id,
      },
    });
    res.status(200);
  }
};

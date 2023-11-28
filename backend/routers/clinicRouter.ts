import express from "express";
import { getClinicData } from "../controller/getClinicData";
import { createClinicData } from "../controller/createClinicData";
import { updateClinicData } from "../controller/updateClinicData";
import { deleteClinicData } from "../controller/deleteClinicData";
const clinicRouter = express.Router();

clinicRouter.get("/", getClinicData);
clinicRouter.post("/", createClinicData);
clinicRouter.put("/:petId", updateClinicData);
clinicRouter.delete("/:petId", deleteClinicData);

export default clinicRouter;

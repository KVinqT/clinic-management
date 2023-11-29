/*
  Warnings:

  - You are about to drop the `pet_parents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pet_parents" DROP CONSTRAINT "pet_parents_parentId_fkey";

-- DropForeignKey
ALTER TABLE "pet_parents" DROP CONSTRAINT "pet_parents_petId_fkey";

-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "parentsId" INTEGER;

-- DropTable
DROP TABLE "pet_parents";

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_parentsId_fkey" FOREIGN KEY ("parentsId") REFERENCES "Parents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

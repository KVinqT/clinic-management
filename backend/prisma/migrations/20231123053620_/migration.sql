/*
  Warnings:

  - You are about to drop the column `DoB` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `dob` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "DoB",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;

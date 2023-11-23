/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Parents" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pets" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Address";

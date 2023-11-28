-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "citiesId" INTEGER,
ADD COLUMN     "townshipsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_citiesId_fkey" FOREIGN KEY ("citiesId") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_townshipsId_fkey" FOREIGN KEY ("townshipsId") REFERENCES "Townwships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

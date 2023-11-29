-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_parentsId_fkey";

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_parentsId_fkey" FOREIGN KEY ("parentsId") REFERENCES "Parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

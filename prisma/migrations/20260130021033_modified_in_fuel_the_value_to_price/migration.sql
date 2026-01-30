/*
  Warnings:

  - You are about to drop the column `value` on the `FuelFull` table. All the data in the column will be lost.
  - Added the required column `data` to the `Defect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `FuelFull` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Defect" ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FuelFull" DROP COLUMN "value",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

/*
  Warnings:

  - Added the required column `km` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HistoryStatus" AS ENUM ('ENTRY', 'EXIT');

-- AlterTable
ALTER TABLE "history" ADD COLUMN     "km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "HistoryStatus" NOT NULL DEFAULT 'ENTRY';

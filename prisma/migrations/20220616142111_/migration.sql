/*
  Warnings:

  - Made the column `WPMAverage` on table `GameResult` required. This step will fail if there are existing NULL values in that column.
  - Made the column `WPMMax` on table `GameResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GameResult" ALTER COLUMN "WPMAverage" SET NOT NULL,
ALTER COLUMN "WPMMax" SET NOT NULL;

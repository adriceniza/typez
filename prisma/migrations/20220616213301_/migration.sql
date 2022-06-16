/*
  Warnings:

  - You are about to alter the column `WPMAverage` on the `GameResult` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "GameResult" ALTER COLUMN "WPMAverage" SET DATA TYPE INTEGER;

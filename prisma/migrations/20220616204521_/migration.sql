/*
  Warnings:

  - You are about to drop the column `WPMMax` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `statsId` on the `GameResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "WPMMax",
DROP COLUMN "statsId",
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

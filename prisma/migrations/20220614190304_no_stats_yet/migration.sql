/*
  Warnings:

  - You are about to drop the `stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stats" DROP CONSTRAINT "stats_userId_fkey";

-- DropTable
DROP TABLE "stats";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic" TEXT NOT NULL DEFAULT E'https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png';

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "WPMAverage" DOUBLE PRECISION NOT NULL,
    "WPMPeak" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_userId_key" ON "Stats"("userId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

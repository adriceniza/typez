-- CreateTable
CREATE TABLE "GameResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "statsId" TEXT NOT NULL,
    "WPMAverage" DOUBLE PRECISION,
    "WPMMax" DOUBLE PRECISION,
    "expEarned" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "StudySessionTask" ADD COLUMN     "difficulty" INTEGER,
ADD COLUMN     "durationInMinutes" INTEGER,
ADD COLUMN     "reviewScheduled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wasInterrupted" BOOLEAN NOT NULL DEFAULT false;

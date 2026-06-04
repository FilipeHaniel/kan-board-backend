/*
  Warnings:

  - You are about to drop the column `order` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "order",
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

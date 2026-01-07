/*
  Warnings:

  - You are about to drop the column `platformName` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `platformUrl` on the `Social` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platforms` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "platformName",
DROP COLUMN "platformUrl",
ADD COLUMN     "platforms" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_key" ON "Social"("userId");

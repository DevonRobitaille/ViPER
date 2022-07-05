/*
  Warnings:

  - You are about to drop the column `reponsiveness` on the `score` table. All the data in the column will be lost.
  - Added the required column `responsiveness` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `score` DROP COLUMN `reponsiveness`,
    ADD COLUMN `responsiveness` INTEGER NOT NULL;

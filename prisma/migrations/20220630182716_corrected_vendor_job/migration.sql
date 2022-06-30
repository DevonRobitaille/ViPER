/*
  Warnings:

  - You are about to drop the column `contact` on the `job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `job` DROP COLUMN `contact`;

-- AlterTable
ALTER TABLE `vendor` ADD COLUMN `contact` VARCHAR(191) NULL;

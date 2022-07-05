/*
  Warnings:

  - Added the required column `approvedAt` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `approvedAt` DATETIME(3) NOT NULL;

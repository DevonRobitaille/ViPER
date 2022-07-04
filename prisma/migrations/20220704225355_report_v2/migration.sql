-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_supervisorId_fkey`;

-- AlterTable
ALTER TABLE `report` MODIFY `supervisorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

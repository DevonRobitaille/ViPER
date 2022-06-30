-- DropForeignKey
ALTER TABLE `activatetoken` DROP FOREIGN KEY `activateToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ActivateToken` ADD CONSTRAINT `ActivateToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `activatetoken` RENAME INDEX `activateToken_id_key` TO `ActivateToken_id_key`;

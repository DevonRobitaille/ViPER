-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `vendorId` VARCHAR(191) NOT NULL,
    `reportType` ENUM('PERIODIC', 'INCREASED_SUPERVISION') NOT NULL DEFAULT 'PERIODIC',
    `reportDate` DATETIME(3) NOT NULL,
    `objectivesReviewed` VARCHAR(191) NOT NULL,
    `justification` VARCHAR(191) NOT NULL,
    `overallPerformance` INTEGER NOT NULL,
    `objectivesFuture` VARCHAR(191) NOT NULL,
    `additionalNotes` VARCHAR(191) NOT NULL,
    `evaluatorId` VARCHAR(191) NOT NULL,
    `supervisorId` VARCHAR(191) NOT NULL,
    `scoreId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Report_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `id` VARCHAR(191) NOT NULL,
    `onTimeDelivery` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `quality` INTEGER NOT NULL,
    `reponsiveness` INTEGER NOT NULL,
    `reliability` INTEGER NOT NULL,
    `accountability` INTEGER NOT NULL,
    `leadTime` INTEGER NOT NULL,
    `changeOrder` INTEGER NOT NULL,
    `professionalism` INTEGER NOT NULL,

    UNIQUE INDEX `Score_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_evaluatorId_fkey` FOREIGN KEY (`evaluatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_scoreId_fkey` FOREIGN KEY (`scoreId`) REFERENCES `Score`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

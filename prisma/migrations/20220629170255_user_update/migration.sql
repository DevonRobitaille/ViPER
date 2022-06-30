/*
  Warnings:

  - You are about to drop the column `expires` on the `verificationtoken` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `verificationtoken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `verificationtoken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `verificationtoken`;

-- DropIndex
DROP INDEX `VerificationToken_token_key` ON `verificationtoken`;

-- AlterTable
ALTER TABLE `verificationtoken` DROP COLUMN `expires`,
    DROP COLUMN `identifier`,
    DROP COLUMN `token`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `VerificationToken_id_key` ON `VerificationToken`(`id`);

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

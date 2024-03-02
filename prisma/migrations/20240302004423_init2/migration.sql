/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('income', 'expense');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "type",
ADD COLUMN     "paymentType" "PaymentType" NOT NULL;

-- DropEnum
DROP TYPE "Type";

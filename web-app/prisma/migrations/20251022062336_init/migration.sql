/*
  Warnings:

  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BankAccount" DROP CONSTRAINT "BankAccount_userId_fkey";

-- DropTable
DROP TABLE "public"."BankAccount";

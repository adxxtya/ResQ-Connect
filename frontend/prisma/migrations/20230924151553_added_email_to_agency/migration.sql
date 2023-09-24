/*
  Warnings:

  - Added the required column `email` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "email" TEXT NOT NULL;

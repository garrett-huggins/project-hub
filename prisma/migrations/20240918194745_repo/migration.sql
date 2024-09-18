/*
  Warnings:

  - Added the required column `url` to the `Repo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('Frontend', 'Backend', 'Fullstack', 'Mobile', 'Web', 'Desktop', 'Game', 'Database', 'DevOps', 'Security', 'Cloud', 'AI', 'ML', 'DataScience', 'IoT', 'SaaS', 'AR', 'VR', 'Other');

-- AlterTable
ALTER TABLE "Repo" ADD COLUMN     "description" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "tags" "Tags"[],
ADD COLUMN     "url" TEXT NOT NULL;

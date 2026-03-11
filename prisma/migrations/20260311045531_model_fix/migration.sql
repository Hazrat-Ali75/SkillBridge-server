/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tutorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_tutorId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "TutorCategory";

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_tutorId_key" ON "Review"("tutorId");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

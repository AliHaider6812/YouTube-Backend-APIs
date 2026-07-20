/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `b_id` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_title_key";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "author",
DROP COLUMN "b_id",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

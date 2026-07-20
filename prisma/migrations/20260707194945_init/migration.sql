-- CreateTable
CREATE TABLE "Book" (
    "b_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("b_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

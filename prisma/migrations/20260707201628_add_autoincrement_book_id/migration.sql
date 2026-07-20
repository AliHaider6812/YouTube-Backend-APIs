-- AlterTable
CREATE SEQUENCE book_b_id_seq;
ALTER TABLE "Book" ALTER COLUMN "b_id" SET DEFAULT nextval('book_b_id_seq');
ALTER SEQUENCE book_b_id_seq OWNED BY "Book"."b_id";

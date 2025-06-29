-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

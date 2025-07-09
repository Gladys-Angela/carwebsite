/*
  Warnings:

  - Added the required column `createdById` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "hireRate" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "averageRating" REAL NOT NULL DEFAULT 0,
    "features" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    CONSTRAINT "Car_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("averageRating", "condition", "dealerId", "features", "fuelType", "hireRate", "id", "image", "location", "make", "mileage", "model", "price", "transmission", "type", "year") SELECT "averageRating", "condition", "dealerId", "features", "fuelType", "hireRate", "id", "image", "location", "make", "mileage", "model", "price", "transmission", "type", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

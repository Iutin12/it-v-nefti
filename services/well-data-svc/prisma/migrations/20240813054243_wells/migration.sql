/*
  Warnings:

  - A unique constraint covering the columns `[id,oilfieldId]` on the table `Well` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Well" ADD COLUMN     "oilfieldId" TEXT;

-- CreateTable
CREATE TABLE "Oilfield" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oilfield_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OilfieldWells" (
    "id" TEXT NOT NULL,
    "oilfieldId" TEXT NOT NULL,
    "wellId" TEXT NOT NULL,

    CONSTRAINT "OilfieldWells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OilfieldWells_id_key" ON "OilfieldWells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Well_id_oilfieldId_key" ON "Well"("id", "oilfieldId");

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_oilfieldId_fkey" FOREIGN KEY ("oilfieldId") REFERENCES "Oilfield"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OilfieldWells" ADD CONSTRAINT "OilfieldWells_oilfieldId_fkey" FOREIGN KEY ("oilfieldId") REFERENCES "Oilfield"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OilfieldWells" ADD CONSTRAINT "OilfieldWells_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "Well"("id") ON DELETE CASCADE ON UPDATE CASCADE;

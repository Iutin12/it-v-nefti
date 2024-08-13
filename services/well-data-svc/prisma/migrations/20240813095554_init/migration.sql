-- CreateTable
CREATE TABLE "well" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oilfieldId" TEXT,

    CONSTRAINT "well_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oilfield" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oilfield_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oilfield_wells" (
    "id" TEXT NOT NULL,
    "oilfieldId" TEXT NOT NULL,
    "wellId" TEXT NOT NULL,

    CONSTRAINT "oilfield_wells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation" (
    "id" TEXT NOT NULL,
    "wellHeadPressure" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "fluidCompressibility" DOUBLE PRECISION NOT NULL,
    "fluidDensity" DOUBLE PRECISION NOT NULL,
    "pipeDiameter" DOUBLE PRECISION NOT NULL,
    "inclinationAngle" DOUBLE PRECISION NOT NULL,
    "sectionsNumber" DOUBLE PRECISION NOT NULL,
    "moodyCoefficient" DOUBLE PRECISION NOT NULL,
    "startLiquidRate" DOUBLE PRECISION NOT NULL,
    "permeability" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "fluidViscosity" DOUBLE PRECISION NOT NULL,
    "fluidVoumeFactor" DOUBLE PRECISION NOT NULL,
    "saturationPressure" DOUBLE PRECISION NOT NULL,
    "averageReservoirePressure" DOUBLE PRECISION NOT NULL,
    "supplyContourRadius" DOUBLE PRECISION NOT NULL,
    "wellRadius" DOUBLE PRECISION NOT NULL,
    "skinFactor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wellId" TEXT,
    "calculation_result_id" TEXT NOT NULL,

    CONSTRAINT "calculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation_result" (
    "id" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calculationId" TEXT NOT NULL,

    CONSTRAINT "calculation_result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "well_name_key" ON "well"("name");

-- CreateIndex
CREATE UNIQUE INDEX "well_id_oilfieldId_key" ON "well"("id", "oilfieldId");

-- CreateIndex
CREATE UNIQUE INDEX "oilfield_wells_id_key" ON "oilfield_wells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_id_key" ON "calculation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_calculation_result_id_key" ON "calculation"("calculation_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_result_id_key" ON "calculation_result"("id");

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_oilfieldId_fkey" FOREIGN KEY ("oilfieldId") REFERENCES "oilfield"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oilfield_wells" ADD CONSTRAINT "oilfield_wells_oilfieldId_fkey" FOREIGN KEY ("oilfieldId") REFERENCES "oilfield"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oilfield_wells" ADD CONSTRAINT "oilfield_wells_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "well"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation" ADD CONSTRAINT "calculation_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "well"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation" ADD CONSTRAINT "calculation_calculation_result_id_fkey" FOREIGN KEY ("calculation_result_id") REFERENCES "calculation_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

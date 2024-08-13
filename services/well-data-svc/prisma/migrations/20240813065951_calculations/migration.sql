-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "WellHeadPressure" DOUBLE PRECISION NOT NULL,
    "Depth" DOUBLE PRECISION NOT NULL,
    "FluidCompressibility" DOUBLE PRECISION NOT NULL,
    "FluidDensity" DOUBLE PRECISION NOT NULL,
    "PipeDiameter" DOUBLE PRECISION NOT NULL,
    "InclinationAngle" DOUBLE PRECISION NOT NULL,
    "SectionsNumber" DOUBLE PRECISION NOT NULL,
    "MoodyCoefficient" DOUBLE PRECISION NOT NULL,
    "StartLiquidRate" DOUBLE PRECISION NOT NULL,
    "Permeability" DOUBLE PRECISION NOT NULL,
    "Thickness" DOUBLE PRECISION NOT NULL,
    "FluidViscosity" DOUBLE PRECISION NOT NULL,
    "FluidVoumeFactor" DOUBLE PRECISION NOT NULL,
    "SaturationPressure" DOUBLE PRECISION NOT NULL,
    "AverageReservoirePressure" DOUBLE PRECISION NOT NULL,
    "SupplyContourRadius" DOUBLE PRECISION NOT NULL,
    "WellRadius" DOUBLE PRECISION NOT NULL,
    "SkinFactor" DOUBLE PRECISION NOT NULL,
    "wellId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calculation_id_key" ON "Calculation"("id");

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "Well"("id") ON DELETE SET NULL ON UPDATE CASCADE;

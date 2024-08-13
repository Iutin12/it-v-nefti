-- CreateTable
CREATE TABLE "well" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oilfield_id" TEXT,

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
    "oilfield_id" TEXT NOT NULL,
    "well_id" TEXT NOT NULL,

    CONSTRAINT "oilfield_wells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation" (
    "id" TEXT NOT NULL,
    "well_head_pressure" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "fluid_compressibility" DOUBLE PRECISION NOT NULL,
    "fluid_density" DOUBLE PRECISION NOT NULL,
    "pipe_diameter" DOUBLE PRECISION NOT NULL,
    "inclination_angle" DOUBLE PRECISION NOT NULL,
    "sections_number" DOUBLE PRECISION NOT NULL,
    "moody_coefficient" DOUBLE PRECISION NOT NULL,
    "start_liquid_rate" DOUBLE PRECISION NOT NULL,
    "permeability" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "fluid_viscosity" DOUBLE PRECISION NOT NULL,
    "fluid_voume_factor" DOUBLE PRECISION NOT NULL,
    "saturation_pressure" DOUBLE PRECISION NOT NULL,
    "average_reservoire_pressure" DOUBLE PRECISION NOT NULL,
    "supply_contour_radius" DOUBLE PRECISION NOT NULL,
    "well_radius" DOUBLE PRECISION NOT NULL,
    "skin_factor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "well_id" TEXT,
    "calculation_result_id" TEXT NOT NULL,

    CONSTRAINT "calculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation_result" (
    "id" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calculation_id" TEXT NOT NULL,

    CONSTRAINT "calculation_result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "well_name_key" ON "well"("name");

-- CreateIndex
CREATE UNIQUE INDEX "well_id_oilfield_id_key" ON "well"("id", "oilfield_id");

-- CreateIndex
CREATE UNIQUE INDEX "oilfield_wells_id_key" ON "oilfield_wells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_id_key" ON "calculation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_calculation_result_id_key" ON "calculation"("calculation_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_result_id_key" ON "calculation_result"("id");

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_oilfield_id_fkey" FOREIGN KEY ("oilfield_id") REFERENCES "oilfield"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oilfield_wells" ADD CONSTRAINT "oilfield_wells_oilfield_id_fkey" FOREIGN KEY ("oilfield_id") REFERENCES "oilfield"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oilfield_wells" ADD CONSTRAINT "oilfield_wells_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation" ADD CONSTRAINT "calculation_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation" ADD CONSTRAINT "calculation_calculation_result_id_fkey" FOREIGN KEY ("calculation_result_id") REFERENCES "calculation_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

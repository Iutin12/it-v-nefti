-- CreateTable
CREATE TABLE "well" (
    "id" TEXT NOT NULL,
    "well_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "field_id" TEXT,

    CONSTRAINT "well_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field" (
    "id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_wells" (
    "id" TEXT NOT NULL,
    "field_id" TEXT NOT NULL,
    "well_id" TEXT NOT NULL,

    CONSTRAINT "field_wells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "init_data" (
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
    "calc_result_id" TEXT NOT NULL,

    CONSTRAINT "init_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calc_result" (
    "id" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "init_data_id" TEXT NOT NULL,

    CONSTRAINT "calc_result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "well_well_number_key" ON "well"("well_number");

-- CreateIndex
CREATE UNIQUE INDEX "well_id_field_id_key" ON "well"("id", "field_id");

-- CreateIndex
CREATE UNIQUE INDEX "field_field_name_key" ON "field"("field_name");

-- CreateIndex
CREATE UNIQUE INDEX "field_wells_id_key" ON "field_wells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "init_data_id_key" ON "init_data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "init_data_calc_result_id_key" ON "init_data"("calc_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "calc_result_id_key" ON "calc_result"("id");

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_wells" ADD CONSTRAINT "field_wells_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_wells" ADD CONSTRAINT "field_wells_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "init_data" ADD CONSTRAINT "init_data_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "init_data" ADD CONSTRAINT "init_data_calc_result_id_fkey" FOREIGN KEY ("calc_result_id") REFERENCES "calc_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

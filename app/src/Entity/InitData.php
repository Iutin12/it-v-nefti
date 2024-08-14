<?php

namespace App\Entity;

use App\Repository\InitDataRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InitDataRepository::class)]
class InitData
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private mixed $id = null;

    #[ORM\Column]
    private ?float $WellHeadPressure = null;

    #[ORM\Column]
    private ?float $Depth = null;

    #[ORM\Column]
    private ?float $FluidCompressibility = null;

    #[ORM\Column]
    private ?float $FluidDensity = null;

    #[ORM\Column]
    private ?float $PipeDiameter = null;

    #[ORM\Column]
    private ?float $InclinationAngle = null;

    #[ORM\Column]
    private ?float $SectionsNumber = null;

    #[ORM\Column]
    private ?float $MoodyCoefficient = null;

    #[ORM\Column]
    private ?float $StartLiquidRate = null;

    #[ORM\Column]
    private ?float $Permeability = null;

    #[ORM\Column]
    private ?float $Thickness = null;

    #[ORM\Column]
    private ?float $FluidViscosity = null;

    #[ORM\Column]
    private ?float $FluidVoumeFactor = null;

    #[ORM\Column]
    private ?float $SaturationPressure = null;

    #[ORM\Column]
    private ?float $AverageReservoirePressure = null;

    #[ORM\Column]
    private ?float $SupplyContourRadius = null;

    #[ORM\Column]
    private ?float $WellRadius = null;

    #[ORM\Column]
    private ?float $SkinFactor = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $wellId = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $calcResultId = null;

    #[ORM\Column]
    private ?float $StartPwf = null;

    #[ORM\Column]
    private ?float $EndPwf = null;

    #[ORM\Column]
    private ?float $StepPwf = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getWellHeadPressure(): ?float
    {
        return $this->WellHeadPressure;
    }

    public function setWellHeadPressure(float $WellHeadPressure): static
    {
        $this->WellHeadPressure = $WellHeadPressure;

        return $this;
    }

    public function getDepth(): ?float
    {
        return $this->Depth;
    }

    public function setDepth(float $Depth): static
    {
        $this->Depth = $Depth;

        return $this;
    }

    public function getFluidCompressibility(): ?float
    {
        return $this->FluidCompressibility;
    }

    public function setFluidCompressibility(float $FluidCompressibility): static
    {
        $this->FluidCompressibility = $FluidCompressibility;

        return $this;
    }

    public function getFluidDensity(): ?float
    {
        return $this->FluidDensity;
    }

    public function setFluidDensity(float $FluidDensity): static
    {
        $this->FluidDensity = $FluidDensity;

        return $this;
    }

    public function getPipeDiameter(): ?float
    {
        return $this->PipeDiameter;
    }

    public function setPipeDiameter(float $PipeDiameter): static
    {
        $this->PipeDiameter = $PipeDiameter;

        return $this;
    }

    public function getInclinationAngle(): ?float
    {
        return $this->InclinationAngle;
    }

    public function setInclinationAngle(float $InclinationAngle): static
    {
        $this->InclinationAngle = $InclinationAngle;

        return $this;
    }

    public function getSectionsNumber(): ?float
    {
        return $this->SectionsNumber;
    }

    public function setSectionsNumber(float $SectionsNumber): static
    {
        $this->SectionsNumber = $SectionsNumber;

        return $this;
    }

    public function getMoodyCoefficient(): ?float
    {
        return $this->MoodyCoefficient;
    }

    public function setMoodyCoefficient(float $MoodyCoefficient): static
    {
        $this->MoodyCoefficient = $MoodyCoefficient;

        return $this;
    }

    public function getStartLiquidRate(): ?float
    {
        return $this->StartLiquidRate;
    }

    public function setStartLiquidRate(float $StartLiquidRate): static
    {
        $this->StartLiquidRate = $StartLiquidRate;

        return $this;
    }

    public function getPermeability(): ?float
    {
        return $this->Permeability;
    }

    public function setPermeability(float $Permeability): static
    {
        $this->Permeability = $Permeability;

        return $this;
    }

    public function getThickness(): ?float
    {
        return $this->Thickness;
    }

    public function setThickness(float $Thickness): static
    {
        $this->Thickness = $Thickness;

        return $this;
    }

    public function getFluidViscosity(): ?float
    {
        return $this->FluidViscosity;
    }

    public function setFluidViscosity(float $FluidViscosity): static
    {
        $this->FluidViscosity = $FluidViscosity;

        return $this;
    }

    public function getFluidVoumeFactor(): ?float
    {
        return $this->FluidVoumeFactor;
    }

    public function setFluidVoumeFactor(float $FluidVoumeFactor): static
    {
        $this->FluidVoumeFactor = $FluidVoumeFactor;

        return $this;
    }

    public function getSaturationPressure(): ?float
    {
        return $this->SaturationPressure;
    }

    public function setSaturationPressure(float $SaturationPressure): static
    {
        $this->SaturationPressure = $SaturationPressure;

        return $this;
    }

    public function getAverageReservoirePressure(): ?float
    {
        return $this->AverageReservoirePressure;
    }

    public function setAverageReservoirePressure(float $AverageReservoirePressure): static
    {
        $this->AverageReservoirePressure = $AverageReservoirePressure;

        return $this;
    }

    public function getSupplyContourRadius(): ?float
    {
        return $this->SupplyContourRadius;
    }

    public function setSupplyContourRadius(float $SupplyContourRadius): static
    {
        $this->SupplyContourRadius = $SupplyContourRadius;

        return $this;
    }

    public function getWellRadius(): ?float
    {
        return $this->WellRadius;
    }

    public function setWellRadius(float $WellRadius): static
    {
        $this->WellRadius = $WellRadius;

        return $this;
    }

    public function getSkinFactor(): ?float
    {
        return $this->SkinFactor;
    }

    public function setSkinFactor(float $SkinFactor): static
    {
        $this->SkinFactor = $SkinFactor;

        return $this;
    }

    public function getWellId(): ?string
    {
        return $this->wellId;
    }

    public function setWellId(?string $wellId): static
    {
        $this->wellId = $wellId;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getCalcResultId(): ?string
    {
        return $this->calcResultId;
    }

    public function setCalcResultId(?string $calcResultId): static
    {
        $this->calcResultId = $calcResultId;

        return $this;
    }

    public function getStartPwf(): ?float
    {
        return $this->StartPwf;
    }

    public function setStartPwf(float $StartPwf): static
    {
        $this->StartPwf = $StartPwf;

        return $this;
    }

    public function getEndPwf(): ?float
    {
        return $this->EndPwf;
    }

    public function setEndPwf(float $EndPwf): static
    {
        $this->EndPwf = $EndPwf;

        return $this;
    }

    public function getStepPwf(): ?float
    {
        return $this->StepPwf;
    }

    public function setStepPwf(float $StepPwf): static
    {
        $this->StepPwf = $StepPwf;

        return $this;
    }

    public function make($json){
        $this->StartPwf = $json["StartPwf"];
        $this->EndPwf = $json["EndPwf"];
        $this->StepPwf = $json["StepPwf"];
        $this->SaturationPressure = $json["SaturationPressure"];
        $this->Permeability = $json["Permeability"];
        $this->Thickness = $json["Thickness"];
        $this->FluidViscosity = $json["FluidViscosity"];
        $this->FluidVoumeFactor = $json["FluidVoumeFactor"];
        $this->SupplyContourRadius = $json["SupplyContourRadius"];
        $this->WellRadius = $json['WellRadius'];
        $this->SkinFactor = $json['SkinFactor'];
        $this->AverageReservoirePressure = $json['AverageReservoirePressure'];
        $this->WellHeadPressure = $json['WellHeadPressure'];
        $this->Depth = $json['Depth'];
        $this->FluidCompressibility = $json['FluidCompressibility'];
        $this->FluidDensity = $json['FluidDensity'];
        $this->PipeDiameter = $json['PipeDiameter'];
        $this->InclinationAngle = $json['InclinationAngle'];
        $this->SectionsNumber = $json['SectionsNumber'];
        $this->MoodyCoefficient = $json['MoodyCoefficient'];
        $this->StartLiquidRate = $json['StartLiquidRate'];
        $this->wellId = $json['WellId'];
        $this->created_at = new \DateTime();
        $this->updated_at = new \DateTime();

    }
}

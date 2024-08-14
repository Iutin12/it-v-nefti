<?php

namespace App\Entity;

use App\Repository\FieldWellsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FieldWellsRepository::class)]
class FieldWells
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $fieldId = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $wellId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getFieldId(): ?string
    {
        return $this->fieldId;
    }

    public function setFieldId(string $fieldId): static
    {
        $this->fieldId = $fieldId;

        return $this;
    }

    public function getWellId(): ?string
    {
        return $this->wellId;
    }

    public function setWellId(string $wellId): static
    {
        $this->wellId = $wellId;

        return $this;
    }
}

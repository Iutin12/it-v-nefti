<?php

namespace App\tools\IdGen;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Id\AbstractIdGenerator;

class IdGen extends AbstractIdGenerator
{
    public function generateId(EntityManagerInterface $em, object|null $entity): mixed
    {
        return $entity->getId();
    }
}
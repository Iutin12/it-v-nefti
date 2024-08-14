<?php

// tests/Service/NewsletterGeneratorTest.php
namespace App\Tests\Controller;

use App\Controller\NodeController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class NodeControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();

        // Запросить конкретную страницу
        $crawler = $client->request('GET', '/api/calc');

        $this->assertResponseIsUnprocessable();
    }
}
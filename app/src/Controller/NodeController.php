<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class NodeController
{
    #[Route('/', name: 'app_lucky_number')]
    public function number(): Response
    {
        $ans = $this->executeRequest();

        return new JsonResponse($ans);
    }

    private function executeRequest()
    {
		$curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, "symfony_gpn-web-irp-1:8000/irp/calculate?StartPwf=0&EndPwf=200&StepPwf=20&SaturationPressure=80&Permeability=50&Thickness=10&FluidViscosity=1&FluidVoumeFactor=1&SupplyContourRadius=500&WellRadius=0.073&Skin=1&AverageReservoirePressure=200");
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        $result = curl_exec($curl);
        $result = json_decode($result, true);
		curl_close($curl);
        return $result;
    }
}
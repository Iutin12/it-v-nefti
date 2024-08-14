<?php

namespace App\Controller;

use App\Entity\CalcResult;
use App\Entity\InitData;
use App\Entity\Well;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class Point
{
    public $x;
    public $y;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
    }
}

class NodeController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(EntityManagerInterface $em): Response
    {
        $ans = $em->getRepository(Well::class)->findAll();

        var_dump($ans);

        return new JsonResponse($ans);
    }

    #[Route('/api/calc', name: 'app_analysis', methods: ["POST"])]
    public function getAnalysis(EntityManagerInterface $em, Request $request): Response
    {
        $postFields = $request->getContent();

        $postJson = json_decode($postFields, true);

        ksort($postJson);

        $hsh = hash('sha256', json_encode($postJson));
        if ($res = $em->getRepository(CalcResult::class)->findOneBy(['initDataId' => $hsh])){
            return new JsonResponse($res->getResult());
        }

        $init_data = new InitData();
        $init_data->make($postJson);
        $init_data->setId($hsh);

        $irp = $this->executeRequest('symfony_gpn-web-irp-1:8000/irp/calculate', $postFields);


        $postFields = substr($postFields, 0, -1) . ', "Q":' . json_encode($irp["Q"]) . "}";


        $vlp = $this->executeRequest('symfony_gpn-web-vlp-1:8000/calculation', $postFields);

        if (!isset($irp['Q']) || !isset($vlp['q'])){
            return new JsonResponse("Invalid data", 422);
        }
        
        $qCount = count($irp['Q']);

        $point = $this->find_intersaction($irp['Q'], $irp['p_wf'], $vlp['pwf']);

        $result = new CalcResult();
        $result->setId(time());
        $result->setResult([
            'point' => $point,
            'vlp' => $vlp,
            'irp' => $irp
        ]);
        $result->setInitDataId($hsh);
        $result->setCreatedAt(new \DateTime());

        $init_data->setCalcResultId($result->getId());

        $em->persist($init_data);
        $em->persist($result);

        $em->flush();

        $init_data->setId($hsh);

        $em->persist($init_data);
        $em->flush();
        

        return new JsonResponse([
            'point' => $point,
            'vlp' => $vlp,
            'irp' => $irp
        ]);
    }

    private function executeRequest($url, $fields)
    {
		$curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        $result = curl_exec($curl);
        $result = json_decode($result, true);
		curl_close($curl);
        return $result;
    }

    function find_intersaction($y, $x1, $x2)
    {
        $flag = False;
        if ($x1[count($x1)-1] > $x2[count($x2)-1]){
            $flag = True;
        }
        for ($i = count($y)-1; $i > 0; $i--){
            if (($x1[$i] > $x2[$i]) != $flag)
            {
                return [$x1[$i], $y[$i]];
            }
        }
        return NULL;
    }

    // $flag = false;

        // for ($i = $qCount - 1; $i > 1; $i--){
        //     for ($j = $qCount - 1; $j > 1; $j--){
        //         $point = 0;
        //         // $point = $this->get_inter_py($vlp["q"][$i], $vlp["pwf"][$i], $vlp["q"][$i - 1], $vlp["pwf"][$i - 1], $irp["Q"][$j], $irp["p_wf"][$j], $irp["Q"][$j - 1], $irp["p_wf"][$j - 1]);
        //         // $point = $this->get_line_intersection($vlp["pwf"][$i], $vlp["q"][$i], $vlp["pwf"][$i - 1], $vlp["q"][$i - 1], $irp["p_wf"][$j], $irp["Q"][$j], $irp["p_wf"][$j - 1], $irp["Q"][$j - 1]);
        //         $isInter = $this->get_inter(new Point($vlp["q"][$i], $vlp["pwf"][$i]), new Point($vlp["q"][$i - 1], $vlp["pwf"][$i - 1]), new Point($irp["Q"][$j], $irp["p_wf"][$j]), new Point($irp["Q"][$j - 1], $irp["p_wf"][$j - 1]));
        //         // if ($isInter){
        //         //     var_dump($vlp["q"][$i]);die;
        //         //     $point = $this->get_inter_py($vlp["q"][$i], $vlp["pwf"][$i], $vlp["q"][$i - 1], $vlp["pwf"][$i - 1], $irp["Q"][$j], $irp["p_wf"][$j], $irp["Q"][$j - 1], $irp["p_wf"][$j - 1]);
        //         // }
        //         // $point = $this->get_inter(new Point($vlp["q"][$i], $vlp["pwf"][$i]), new Point($vlp["q"][$i - 1], $vlp["pwf"][$i - 1]), new Point($irp["Q"][$j], $irp["p_wf"][$j]), new Point($irp["Q"][$j - 1], $irp["p_wf"][$j - 1]));
        //         if ($point){
        //             break;
        //         }
        //     }
        //     if ($flag){
        //         break;
        //     }
        // }

    // private function get_line_intersection(float $p0_x, float $p0_y, float $p1_x, float $p1_y, 
    // float $p2_x, float $p2_y, float $p3_x, float $p3_y)
    // {
    //     $s10_x = $p1_x - $p0_x;
    //     $s10_y = $p1_y - $p0_y;
    //     $s32_x = $p3_x - $p2_x;
    //     $s32_y = $p3_y - $p2_y;

    //     $denom = $s10_x * $s32_y - $s32_x * $s10_y;
    //     if ($denom == 0)
    //         return 0; // Collinear
        
    //     $denomPositive = false;
    //         if ($denom > 0){
    //         $denomPositive = true;
    //     }

    //     $s02_x = $p0_x - $p2_x;
    //     $s02_y = $p0_y - $p2_y;
    //     $s_numer = $s10_x * $s02_y - $s10_y * $s02_x;
    //     if (($s_numer < 0) === $denomPositive)
    //         return 0; // No collision

    //     $t_numer = $s32_x * $s02_y - $s32_y * $s02_x;
    //     if (($t_numer < 0) === $denomPositive)
    //         return 0; // No collision

    //     if ((($s_numer > $denom) === $denomPositive) || (($t_numer > $denom) === $denomPositive))
    //         return 0; // No collision
    //     // Collision detected
    //     $i_x = 0;
    //     $i_y = 0;
    //     $t = $t_numer / $denom;
    //     $i_x = $p0_x + ($t * $s10_x);
    //     $i_y = $p0_y + ($t * $s10_y);

    //     if ((min($p0_x, $p1_x) <= $i_x) && ($i_x <= max($p0_x, $p1_x))){
    //         return [$i_x, $i_y];
    //     }
    //     return 0;
    // }

    // function get_inter(Point $A, Point $B, Point $C, Point $D) {
    //     if ($this->doIntersect($A, $B, $C, $D)){
    //         # Line AB represented as a1x + b1y = c1
    //         $a1 = $B->y - $A->y;
    //         $b1 = $A->x - $B->x;
    //         $c1 = $a1*($A->x) + $b1*($A->y);
        
    //         # Line CD represented as a2x + b2y = c2
    //         $a2 = $D->y - $C->y;
    //         $b2 = $C->x - $D->x;
    //         $c2 = $a2*($C->x) + $b2*($C->y);
        
    //         $determinant = $a1*$b2 - $a2*$b1;
        
    //         if ($determinant == 0){
    //             # The lines are parallel. This is simplified
    //             # by returning a pair of FLT_MAX
    //             return new Point(10**9, 10**9);
    //         }
    //         else{
    //             $x = ($b2*$c1 - $b1*$c2)/$determinant;
    //             $y = ($a1*$c2 - $a2*$c1)/$determinant;
    //             return new Point($x, $y);
    //         }
    //     }
    // }

    // function onSegment($p, $q, $r){
    //     if ( ($q->x <= max($p->x, $r->x)) && ($q->x >= min($p->x, $r->x)) && ($q->y <= max($p->y, $r->y)) && ($q->y >= min($p->y, $r->y))){
    //         return true;
    //     }
    //     return false;
    // }
  
    // function orientation($p, $q, $r){
    //     $val = (($q->y - $p->y) * ($r->x - $q->x)) - (($q->x - $p->x) * ($r->y - $q->y)); 
    //     if ($val > 0){
    //         return 1;
    //     } else if ($val < 0){
    //         return 2;
    //     }
    //     else{
    //         return 0;
    //     }
    // }

    // function doIntersect($p1,$q1,$p2,$q2){
    //     # Find the 4 orientations required for  
    //     # the general and special cases 
    //     $o1 = $this->orientation($p1, $q1, $p2);
    //     $o2 = $this->orientation($p1, $q1, $q2);
    //     $o3 = $this->orientation($p2, $q2, $p1);
    //     $o4 = $this->orientation($p2, $q2, $q1);
    
    //     # General case 
    //     if (($o1 != $o2) && ($o3 != $o4)){
    //         return true;
    //     } 
    //     if (($o1 == 0) && $this->onSegment($p1, $p2, $q1)){
    //         return true;
    //     }
    //     if (($o2 == 0) && $this->onSegment($p1, $q2, $q1)){
    //         return true;
    //     } 
    //     if (($o3 == 0) && $this->onSegment($p2, $p1, $q2)){
    //         return true;
    //     }
    //     if (($o4 == 0) && $this->onSegment($p2, $q1, $q2)){
    //         return true;
    //     } 
    //     # If none of the cases 
    //     return false;
    // }

    // function get_inter_py($x1_1, $y1_1, $x1_2, $y1_2, $x2_1, $y2_1, $x2_2, $y2_2){
    //     $A1 = $y1_1 - $y1_2;
    //     $B1 = $x1_2 - $x1_1;
    //     $C1 = $x1_1*$y1_2 - $x1_2*$y1_1;
    //     $A2 = $y2_1 - $y2_2;
    //     $B2 = $x2_2 - $x2_1;
    //     $C2 = $x2_1*$y2_2 - $x2_2*$y2_1;
        
    //     if (($B1*$A2 - $B2*$A1) && ($A1 != 0)) {
    //         $y = ($C2*$A1 - $C1*$A2) / ($B1*$A2 - $B2*$A1);
    //         $x = (-$C1 - $B1*$y) / $A1;
    //         if ((min($x1_1, $x1_2) <= $x) && ($x <= max($x1_1, $x1_2))){
    //             return [$x, $y];
    //         }
    //         return NULL;
    //     } else if (($B1*$A2 - $B2*$A1) && ($A2 != 0)){
    //         $y = ($C2*$A1 - $C1*$A2) / ($B1*$A2 - $B2*$A1);
    //         $x = (-$C2 - $B2*$y) / $A2;
    //         if ((min($x1_1, $x1_2) <= $x) && ($x <= max($x1_1, $x1_2))){
    //             return [$x, $y];
    //         }
    //         return NULL;
    //     }
    //     return NULL;
    // }
}

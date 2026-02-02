<?php

namespace App\DataFixtures;

use App\Entity\Qcm;
use App\Entity\Response;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class QcmFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $qcm = new Qcm();
        $qcm->setTitle('Symfony – Bases')
            ->setDescription('QCM pour tester les bases de Symfony');

        $questions = [
            [
                'question' => 'Symfony est un framework de quel langage ?',
                'answer'   => 'PHP',
            ],
            [
                'question' => 'Quelle commande permet de démarrer le serveur Symfony ?',
                'answer'   => 'symfony server:start',
            ],
            [
                'question' => 'Quel ORM est utilisé par Symfony ?',
                'answer'   => 'Doctrine',
            ],
        ];

        foreach ($questions as $item) {
            $response = new Response();
            $response
                ->setQuestion($item['question'])
                ->setAnswer($item['answer'])
                ->setQcm($qcm); // 🔥 liaison avec Qcm

            // Optionnel mais propre côté objet
            $qcm->addResponse($response);

            $manager->persist($response);
        }

        $manager->persist($qcm);
        $manager->flush();
    }
}
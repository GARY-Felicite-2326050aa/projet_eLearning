<?php

namespace App\DataFixtures;

use App\Entity\Question;
use App\Entity\Answer;
use App\Entity\Quiz;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class QuestionAnswerFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 4; $i++) {
            for ($q = 1; $q <= 3; $q++) {
                $question = new Question();
                $question->setContent("Question $q du QCM ?");
                $question->setQuiz(
                    $this->getReference(
                        QuizFixtures::QUIZ_REFERENCE.$i,
                        Quiz::class
                    )
                );

                $manager->persist($question);

                for ($a = 1; $a <= 4; $a++) {
                    $answer = new Answer();
                    $answer->setContent("Réponse $a");
                    $answer->setIsCorrect($a === 1);
                    $answer->setQuestion($question);

                    $manager->persist($answer);
                }
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            QuizFixtures::class,
        ];
    }
}

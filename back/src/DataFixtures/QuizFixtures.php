<?php

namespace App\DataFixtures;

use App\Entity\Quiz;
use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class QuizFixtures extends Fixture implements DependentFixtureInterface
{
    public const QUIZ_REFERENCE = 'quiz_';

    public function load(ObjectManager $manager): void
    {
        $course = $this->getReference(
            CourseFixtures::COURSE_1,
            Course::class
        );

        for ($i = 0; $i < 4; $i++) {
            $quiz = new Quiz();
            $quiz->setTitle('Quiz '.$i);
            $quiz->setCourse($course);

            $manager->persist($quiz);
            $this->addReference(self::QUIZ_REFERENCE.$i, $quiz);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CourseFixtures::class,
        ];
    }
}

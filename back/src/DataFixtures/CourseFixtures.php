<?php

namespace App\DataFixtures;

use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CourseFixtures extends Fixture
{
    public const string COURSE_1 = 'course_1';

    public function load(ObjectManager $manager): void
    {
        $course = new Course();
        $course->setTitle('Cours Symfony');
        $course->setDescription('Description du cours Symfony');

        $manager->persist($course);
        $manager->flush();

        $this->addReference(self::COURSE_1, $course);
    }
}

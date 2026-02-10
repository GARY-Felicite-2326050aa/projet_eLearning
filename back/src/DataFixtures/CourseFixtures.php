<?php

namespace App\DataFixtures;

use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CourseFixtures extends Fixture
{
    public const string COURSE_SYMFONY = 'course_symfony';
    public const string COURSE_REACT = 'course_react';

    public function load(ObjectManager $manager): void
    {
        $course1 = new Course();
        $course1->setTitle('Cours Symfony 7');
        $course1->setDescription('Maîtrisez le backend PHP.');
        $manager->persist($course1);
        $this->addReference(self::COURSE_SYMFONY, $course1);

        $course2 = new Course();
        $course2->setTitle('Formation React');
        $course2->setDescription('Le guide complet du frontend moderne.');
        $manager->persist($course2);
        $this->addReference(self::COURSE_REACT, $course2);

        $manager->flush();
    }
}
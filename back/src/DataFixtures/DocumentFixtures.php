<?php

namespace App\DataFixtures;

use App\Entity\Document;
use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class DocumentFixtures extends Fixture implements DependentFixtureInterface
{
    public const DOCUMENT_REFERENCE = 'document_';

    public function load(ObjectManager $manager): void
    {
        $course = $this->getReference(
            CourseFixtures::COURSE_1,
            Course::class
        );

        for ($i = 0; $i < 4; $i++) {
            $document = new Document();
            $document->setTitle('Document '.$i);
            $document->setFilePath('uploads/documents/document_'.$i.'.pdf');
            $document->setCourse($course);

            $manager->persist($document);
            $this->addReference(self::DOCUMENT_REFERENCE.$i, $document);
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

<?php
namespace App\DataFixtures;

use App\Entity\Document;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class DocumentFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $doc = new Document();
        $doc->setTitle('Support de cours React.pdf');
        $doc->setFilePath('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
        
        // On attache au cours React
        $doc->setCourse($this->getReference(CourseFixtures::COURSE_REACT));

        $manager->persist($doc);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [CourseFixtures::class];
    }
}
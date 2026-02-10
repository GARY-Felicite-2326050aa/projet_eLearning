<?php
namespace App\DataFixtures;

use App\Entity\Video;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class VideoFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $video = new Video();
        $video->setTitle('Installation de Symfony');
        $video->setUrlPath('https://www.youtube.com/embed/dQw4w9WgXcQ');
        
        // On récupère le cours via sa référence
        $video->setCourse($this->getReference(CourseFixtures::COURSE_SYMFONY));
        
        $manager->persist($video);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [CourseFixtures::class];
    }
}
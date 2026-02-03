<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {}

    public function load(ObjectManager $manager): void
    {
        $prof = new User();
        $prof->setEmail('prof@test.com');
        $prof->setRole('ROLE_PROF');
        $prof->setPassword(
            $this->hasher->hashPassword($prof, 'password')
        );

        $manager->persist($prof);
        $this->addReference('prof-1', $prof);

        $student = new User();
        $student->setEmail('student@test.com');
        $student->setRole('ROLE_USER');
        $student->setPassword(
            $this->hasher->hashPassword($student, 'password')
        );

        $manager->persist($student);

        $manager->flush();
    }
}

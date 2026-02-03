<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-user',
    description: 'Create a test user'
)]
class CreateUserCommand extends Command
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $user = new User();
        $user->setEmail('test@test.com');
        $user->setRole('ROLE_USER');

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            'password'
        );

        $user->setPassword($hashedPassword);

        $this->em->persist($user);
        $this->em->flush();

        $io->success('User test@test.com créé avec mot de passe "password"');

        return Command::SUCCESS;
    }
}

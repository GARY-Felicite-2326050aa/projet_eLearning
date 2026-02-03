<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private string $email;

    #[ORM\Column]
    private string $password;

    #[ORM\Column(length: 50)]
    private string $role = 'ROLE_USER';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    // 🔐 REQUIRED
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    // 👤 REQUIRED
    public function getRoles(): array
    {
        return [$this->role];
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;
        return $this;
    }
}

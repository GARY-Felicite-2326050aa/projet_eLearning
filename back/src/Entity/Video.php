<?php

namespace App\Entity;

use App\Repository\VideoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VideoRepository::class)]
class Video
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:read'])] // Visible quand on lit un cours
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:read'])]
    private ?string $titre = null;

  
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fileName = null;

  
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['course:read'])]
    private ?string $urlExterne = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['course:read'])]
    private ?int $dureeEnSecondes = null;

  
    #[ORM\ManyToOne(inversedBy: 'videos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Course $course = null;

    // --- GETTERS & SETTERS ---

    public function getId(): ?int { return $this->id; }

    public function getTitre(): ?string { return $this->titre; }
    public function setTitre(string $titre): static { $this->titre = $titre; return $this; }

    public function getFileName(): ?string { return $this->fileName; }
    public function setFileName(?string $fileName): static { $this->fileName = $fileName; return $this; }

    public function getUrlExterne(): ?string { return $this->urlExterne; }
    public function setUrlExterne(?string $urlExterne): static { $this->urlExterne = $urlExterne; return $this; }

    public function getDureeEnSecondes(): ?int { return $this->dureeEnSecondes; }
    public function setDureeEnSecondes(?int $dureeEnSecondes): static { $this->dureeEnSecondes = $dureeEnSecondes; return $this; }

    public function getCourse(): ?Course { return $this->course; }
    public function setCourse(?Course $course): static { $this->course = $course; return $this; }

   
    #[Groups(['course:read'])]
    public function getUrl(): ?string
    {
        if ($this->urlExterne) {
            return $this->urlExterne;
        }

        if ($this->fileName) {
            
            return '/uploads/videos/' . $this->fileName;
        }

        return null;
    }
}
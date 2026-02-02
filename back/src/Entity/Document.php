<?php

namespace App\Entity;

use App\Repository\DocumentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DocumentRepository::class)]
class Document
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:read'])]
    private ?string $titre = null;

  
    #[ORM\Column(length: 255)]
    private ?string $fileName = null;

    
    #[ORM\Column(length: 50)]
    #[Groups(['course:read'])]
    private ?string $format = null; // ex: "application/pdf"


    // Relation : Un document appartient à UN seul cours
    #[ORM\ManyToOne(inversedBy: 'documents')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Course $course = null;

    // --- GETTERS & SETTERS ---

    public function getId(): ?int { return $this->id; }

    public function getTitre(): ?string { return $this->titre; }
    public function setTitre(string $titre): static { $this->titre = $titre; return $this; }

    public function getFileName(): ?string { return $this->fileName; }
    public function setFileName(string $fileName): static { $this->fileName = $fileName; return $this; }

    public function getFormat(): ?string { return $this->format; }
    public function setFormat(string $format): static { $this->format = $format; return $this; }

    public function getFileSize(): ?int { return $this->fileSize; }
    public function setFileSize(?int $fileSize): static { $this->fileSize = $fileSize; return $this; }

    public function getCourse(): ?Course { return $this->course; }
    public function setCourse(?Course $course): static { $this->course = $course; return $this; }

    // --- MÉTHODE INTELLIGENTE POUR LE FRONTEND (REACT) ---

    #[Groups(['course:read'])]
    public function getUrl(): string
    {
        return '/uploads/documents/' . $this->fileName;
    }
}
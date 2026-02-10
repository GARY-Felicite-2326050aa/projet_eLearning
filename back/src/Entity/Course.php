<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CourseRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['course:read']] 
)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:read'])]
    private string $title;

    #[ORM\Column(type: 'text')]
    #[Groups(['course:read'])]
    private string $description;

    #[ORM\OneToMany(
        targetEntity: Quiz::class,
        mappedBy: 'course',
        cascade: ['persist', 'remove'],
        orphanRemoval: true
    )]
    #[Groups(['course:read'])]
    private Collection $quizzes;

    #[ORM\OneToMany(
        targetEntity: Document::class,
        mappedBy: 'course',
        cascade: ['persist', 'remove'],
        orphanRemoval: true
    )]
    #[Groups(['course:read'])]
    private Collection $documents;

    #[ORM\OneToMany(
        targetEntity: Video::class,
        mappedBy: 'course',
        cascade: ['persist', 'remove'],
        orphanRemoval: true
    )]
    #[Groups(['course:read'])]
    private Collection $videos;

    public function __construct()
    {
        $this->quizzes = new ArrayCollection();
        $this->documents = new ArrayCollection();
        $this->videos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getQuizzes(): Collection
    {
        return $this->quizzes;
    }

    public function addQuiz(Quiz $quiz): self
    {
        if (!$this->quizzes->contains($quiz)) {
            $this->quizzes->add($quiz);
            $quiz->setCourse($this);
        }

        return $this;
    }

    public function removeQuiz(Quiz $quiz): self
    {
        if ($this->quizzes->removeElement($quiz)) {
            $quiz->setCourse(null);
        }

        return $this;
    }

    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(Document $document): self
    {
        if (!$this->documents->contains($document)) {
            $this->documents->add($document);
            $document->setCourse($this);
        }

        return $this;
    }

    public function removeDocument(Document $document): self
    {
        if ($this->documents->removeElement($document)) {
            if ($document->getCourse() === $this) {
                $document->setCourse(null);
            }
        }

        return $this;
    }

    public function getVideos(): Collection
    {
        return $this->videos;
    }

    public function addVideo(Video $video): self
    {
        if (!$this->videos->contains($video)) {
            $this->videos->add($video);
            $video->setCourse($this);
        }

        return $this;
    }

    public function removeVideo(Video $video): self
    {
        if ($this->videos->removeElement($video)) {
            if ($video->getCourse() === $this) {
                $video->setCourse(null);
            }
        }

        return $this;
    }
}

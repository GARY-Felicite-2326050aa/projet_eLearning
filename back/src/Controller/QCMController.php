<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Entity\Question;
use App\Entity\Answer;
use App\Repository\DocumentRepository;
use App\Repository\VideoRepository;
use App\Service\MistralService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/qcm')]
class QCMController extends AbstractController
{
    #[Route('/generate', name: 'api_qcm_generate', methods: ['POST'])]
    public function generate(
        Request $request,
        DocumentRepository $documentRepository,
        VideoRepository $videoRepository,
        MistralService $mistralService,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['documentId']) && !isset($data['videoId'])) {
            return $this->json(['error' => 'documentId ou videoId requis'], 400);
        }

        /** ================================
         *  1️⃣ Récupérer le texte source
         *  ================================ */
        $text = null;
        $course = null;

        if (isset($data['documentId'])) {
            $document = $documentRepository->find($data['documentId']);

            if (!$document) {
                return $this->json(['error' => 'Document introuvable'], 404);
            }

            // ⚠️ Simplifié : idéalement extraction PDF
            $text = file_get_contents($document->getFilePath());
            $course = $document->getCourse();
        }

        if (isset($data['videoId'])) {
            $video = $videoRepository->find($data['videoId']);

            if (!$video) {
                return $this->json(['error' => 'Vidéo introuvable'], 404);
            }

            // ⚠️ Ici tu brancheras plus tard un transcript IA
            $text = "Transcript de la vidéo : " . $video->getTitle();
            $course = $video->getCourse();
        }

        if (!$text || !$course) {
            return $this->json(['error' => 'Impossible de générer le QCM'], 400);
        }

        /** ================================
         *  2️⃣ Appel IA (Mistral)
         *  ================================ */
        $questionsIA = $mistralService->generateQcm($text);

        /** ================================
         *  3️⃣ Création du Quiz
         *  ================================ */
        $quiz = new Quiz();
        $quiz->setTitle('QCM généré automatiquement');
        $quiz->setCourse($course);

        foreach ($questionsIA as $q) {
            $question = new Question();
            $question->setContent($q['question']);
            $question->setQuiz($quiz);

            // Vrai
            $answerTrue = new Answer();
            $answerTrue->setContent('Vrai');
            $answerTrue->setIsCorrect($q['answer'] === true);
            $answerTrue->setQuestion($question);

            // Faux
            $answerFalse = new Answer();
            $answerFalse->setContent('Faux');
            $answerFalse->setIsCorrect($q['answer'] === false);
            $answerFalse->setQuestion($question);

            $question->addAnswer($answerTrue);
            $question->addAnswer($answerFalse);

            $quiz->addQuestion($question);

            $em->persist($question);
            $em->persist($answerTrue);
            $em->persist($answerFalse);
        }

        $em->persist($quiz);
        $em->flush();

        /** ================================
         *  4️⃣ Réponse pour React
         *  ================================ */
        return $this->json([
            'quizId' => $quiz->getId(),
            'questionsCount' => count($quiz->getQuestions()),
        ], 201);
    }
}

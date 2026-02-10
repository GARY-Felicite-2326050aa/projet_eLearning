import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../../../shared/lib/axios";
import type {Course} from "../../../../features/courses/type/Course";

export default function CourseContentPage() {
    const { type, id } = useParams<{ type: 'video' | 'document', id: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            api.get(`/courses/${id}`)
                .then((res) => setCourse(res.data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (!course) return <div className="alert alert-danger m-5">Cours introuvable</div>;

    const isVideo = type === 'video';

    // --- CORRECTION MAJEURE ICI ---
    // On accède aux tableaux au pluriel (videos/documents)
    // Et on récupère la propriété spécifique (urlPath/filePath)
    const currentVideo = course.videos && course.videos.length > 0 ? course.videos[0] : null;
    const currentDoc = course.documents && course.documents.length > 0 ? course.documents[0] : null;

    const videoUrl = currentVideo ? currentVideo.urlPath : "";
    const docUrl = currentDoc ? currentDoc.filePath : "";

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container">

                {/* Fil d'ariane */}
                <div className="mb-4">
                    <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none ps-0 text-secondary">
                        <i className="bi bi-arrow-left me-2"></i>Retour aux cours
                    </button>
                    <div className="d-flex align-items-center gap-3 mt-2">
                        <h2 className="fw-bold mb-0">{course.title}</h2>
                        <span className={`badge ${isVideo ? 'bg-primary' : 'bg-danger'}`}>
                            {isVideo ? 'Vidéo' : 'Document'}
                        </span>
                    </div>
                </div>

                <div className="row g-4">

                    {/* ZONE DE CONTENU (GAUCHE) */}
                    <div className="col-lg-8">
                        <div className="card shadow border-0 overflow-hidden">
                            {isVideo ? (
                                // --- PLAYER ---
                                <div className="ratio ratio-16x9 bg-black">
                                    {videoUrl ? (
                                        <iframe
                                            src={videoUrl} // Assure-toi que l'URL est embeddable
                                            title="Video Player"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center text-white">
                                            Vidéo indisponible
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // --- VIEWER ---
                                <div className="p-5 text-center bg-white">
                                    <div className="mb-4">
                                        <i className="bi bi-file-earmark-pdf text-danger" style={{ fontSize: "5rem" }}></i>
                                    </div>
                                    <h4>{currentDoc?.title || "Document de cours"}</h4>
                                    <p className="text-muted">Cliquez ci-dessous pour accéder au fichier.</p>

                                    <div className="d-flex justify-content-center gap-3 mt-4">
                                        {docUrl ? (
                                            <>
                                                <a href={docUrl} target="_blank" rel="noreferrer" className="btn btn-danger px-4">
                                                    <i className="bi bi-eye me-2"></i>Ouvrir
                                                </a>
                                                <a href={docUrl} download className="btn btn-outline-secondary px-4">
                                                    <i className="bi bi-download me-2"></i>Télécharger
                                                </a>
                                            </>
                                        ) : (
                                            <p className="text-danger">Lien du fichier manquant.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="card-body">
                                <h5 className="card-title">Description</h5>
                                <p className="card-text text-secondary">{course.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR (DROITE) */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-header bg-white py-3">
                                <h5 className="mb-0 fw-bold">
                                    <i className="bi bi-check2-circle me-2 text-success"></i>
                                    Quiz associés
                                </h5>
                            </div>
                            <div className="list-group list-group-flush">
                                {course.quizzes && course.quizzes.length > 0 ? (
                                    course.quizzes.map((quizRef, index) => {
                                        // Gestion robuste de l'ID (si string IRI ou objet)
                                        const quizId = typeof quizRef === 'string'
                                            ? quizRef.split('/').pop()
                                            : (quizRef as any).id; // Cast temporaire si le type est pas strict

                                        return (
                                            <Link
                                                key={index}
                                                to={`/quiz/${quizId}`}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                                            >
                                                <span>Quiz #{index + 1}</span>
                                                <i className="bi bi-chevron-right text-muted"></i>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <div className="p-4 text-center text-muted">
                                        <small>Aucun quiz pour ce module.</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import ResourceCard from "../../courses/components/ResourceCard";
import {getCourses} from "../../courses/api/courses.api";
import type {Course} from "../../courses/type/Course";

export default function HomeStudent() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourses()
            .then((res) => setCourses(res))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    // Filtrage des cours
    const videoCourses = courses.filter(c => c.videos && c.videos.length > 0);
    const docCourses = courses.filter(c => c.documents && c.documents.length > 0);

    return (
        <div className="container py-5">
            <header className="mb-5 border-bottom pb-3">
                <h1 className="display-5 fw-bold text-dark">Espace Étudiant</h1>
                <p className="lead text-secondary">Accédez à vos ressources pédagogiques.</p>
            </header>

            {/* --- SECTION VIDÉOS --- */}
            <section className="mb-5">
                <h3 className="fw-bold mb-4 text-primary">
                    <i className="bi bi-play-circle-fill me-2"></i>Cours Vidéo
                </h3>
                {videoCourses.length === 0 ? (
                    <div className="alert alert-light border">Aucun cours vidéo disponible.</div>
                ) : (
                    <div className="row g-4">
                        {videoCourses.map((course) => (
                            <div key={`vid-${course.id}`} className="col-md-6 col-lg-4">
                                <ResourceCard 
                                    type="video" 
                                    course={course} 
                                    resourceCount={course.videos.length} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* --- SECTION DOCUMENTS --- */}
            <section>
                <h3 className="fw-bold mb-4 text-danger">
                    <i className="bi bi-file-earmark-text-fill me-2"></i>Documents PDF
                </h3>
                {docCourses.length === 0 ? (
                    <div className="alert alert-light border">Aucun document disponible.</div>
                ) : (
                    <div className="row g-4">
                        {docCourses.map((course) => (
                            <div key={`doc-${course.id}`} className="col-md-6 col-lg-4">
                                <ResourceCard 
                                    type="document" 
                                    course={course} 
                                    resourceCount={course.documents.length} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
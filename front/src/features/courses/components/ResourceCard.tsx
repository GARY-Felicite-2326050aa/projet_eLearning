import { Link } from "react-router-dom";
import type { Course } from "../type/Course";

interface ResourceCardProps {
    type: 'video' | 'document';
    course: Course;
    resourceCount: number;
}

export default function ResourceCard({ type, course, resourceCount }: ResourceCardProps) {
    const isVideo = type === 'video';
    
    // Configuration visuelle selon le type
    const bgClass = isVideo ? 'bg-primary' : 'bg-danger';
    const icon = isVideo ? 'bi-play-circle-fill' : 'bi-file-earmark-pdf-fill';
    const btnClass = isVideo ? 'btn-outline-primary' : 'btn-outline-danger';
    const label = isVideo ? 'Regarder' : 'Consulter';

    return (
        <div className="card h-100 shadow-sm border-0 hover-shadow transition">
            {/* En-tête coloré avec icône */}
            <div className={`card-header ${bgClass} text-white d-flex justify-content-center align-items-center`} style={{ height: "150px" }}>
                <i className={`bi ${icon}`} style={{ fontSize: "4rem" }}></i>
            </div>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{course.title}</h5>
                <p className="card-text text-muted small flex-grow-1">
                    {course.description.length > 80 
                        ? course.description.substring(0, 80) + '...' 
                        : course.description}
                </p>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <span className="badge bg-light text-secondary border">
                        {resourceCount} {isVideo ? 'Vidéo(s)' : 'Fichier(s)'}
                    </span>
                    
                    {/* Lien dynamique : /courses/video/1 ou /courses/document/1 */}
                    <Link 
                        to={`/courses/${type}/${course.id}`} 
                        className={`btn ${btnClass} btn-sm fw-bold`}
                    >
                        {label} <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}
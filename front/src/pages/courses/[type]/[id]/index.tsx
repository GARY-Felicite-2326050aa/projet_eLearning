import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type {Course} from "../../../features/course/type/Course";
import api from "../../../shared/lib/axios";

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        api.get(`/courses/${id}`).then((res) => setCourse(res.data));
    }, [id]);

    if (!course) return null;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="mb-6">{course.description}</p>

            <h2 className="font-semibold mb-2">QCM disponibles</h2>
            {course.quizzes.map((q) => {
                const quizId = q.split("/").pop();
                return (
                    <Link
                        key={q}
                        to={`/quiz/${quizId}`}
                        className="block bg-green-500 text-white px-4 py-2 rounded mb-2"
                    >
                        ✏️ Passer le QCM
                    </Link>
                );
            })}
        </div>
    );
};

export default CourseDetail;
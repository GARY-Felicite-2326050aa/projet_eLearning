import { useEffect, useState } from "react";
import { getCourses } from "../../course/api/courses.api";
import type {Course} from "../../course/type/Course";

export default function HomeStudent() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourses()
            .then((res) => {
                setCourses(res)
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Chargement des cours...</p>;
    }

    return (
        <div>
            <h1>Espace Étudiant</h1>

            {courses.length === 0 && (
                <p>Aucun cours disponible pour le moment</p>
            )}

            {courses.map((course) => (
                <div
                    key={course.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    <h2>{course.title}</h2>

                </div>
            ))}
        </div>
    );
}
import { useEffect, useState } from "react";
import type {Course} from "../../features/course/type/Course";
import api from "../../shared/lib/axios";
import CourseCard from "../../features/course/components/CourseCard";

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        api.get("/courses").then((res) => {
            setCourses(res.data["hydra:member"]);
        });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">📚 Vidéos de cours</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Courses;

import { Link } from "react-router-dom";
import type {Course} from "../type/Course";

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="bg-white rounded-xl shadow">
            <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                ▶️
            </div>
            <div className="p-4">
                <h2 className="font-bold text-lg">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                </p>
                <Link
                    to={`/courses/${course.id}`}
                    className="block bg-blue-600 text-white text-center py-2 rounded"
                >
                    📘 Voir le cours
                </Link>
            </div>
        </div>
    );
}
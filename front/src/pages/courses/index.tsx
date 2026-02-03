import { useEffect, useState } from "react";
import type {Course} from "../../features/course/type/Course";
import {getCourses} from "../../features/course/api/courses.api";

const Page = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .finally(() => setLoading(false));

    }, [courses]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {courses.map(course => (
                <div
                    key={course.id}
                    className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-bold mb-2">
                        {course.title}
                    </h2>
                    <p className="text-gray-600">
                        {course.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Page;
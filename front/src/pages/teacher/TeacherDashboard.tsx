import { useState, useEffect } from 'react';
// Correction du chemin : on remonte de 2 niveaux (teacher -> pages -> src)
import api from "../../shared/lib/axios";
import UploadSection from "../../features/teacher/components/UploadSection";
import ResultsTable from "../../features/teacher/components/ResultsTable";


export default function TeacherDashboard() {
    const [courses, setCourses] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Utilisation des endpoints de ton backend Symfony
                const [coursesRes, resultsRes] = await Promise.all([
                    api.get('/courses'),
                    api.get('/quiz')
                ]);
                setCourses(coursesRes.data);
                setResults(resultsRes.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center">Chargement du dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold text-blue-900">Tableau de Bord Professeur</h1>

                {/* Section d'upload (Maquette 1) */}
                <UploadSection />

                {/* Résultats des QCM (Maquette 1 & 2) */}
                <ResultsTable results={results} />

            </div>
        </div>
    );
}
// src/features/teacher/components/ResultsTable.tsx
import { useState } from 'react';

export interface Result {
    id: number;
    student: string;
    qcm: string;
    date: string;
    score: string;
    note: string;
}

interface ResultsTableProps {
    results: Result[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Fonction pour gérer les couleurs des badges selon la note (Maquette 1)
    const getBadgeStyle = (note: string) => {
        switch (note.toLowerCase()) {
            case 'excellent': return "bg-green-100 text-green-700";
            case 'bien': return "bg-blue-100 text-blue-700";
            case 'moyen': return "bg-orange-100 text-orange-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    📊 Résultats des QCM
                </h2>
                <button className="bg-[#10B981] text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-colors">
                    📥 Exporter en CSV
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-[#2563EB] text-white">
                    <tr>
                        <th className="p-4 font-bold text-sm">Étudiant</th>
                        <th className="p-4 font-bold text-sm">QCM</th>
                        <th className="p-4 font-bold text-sm">Date</th>
                        <th className="p-4 font-bold text-sm">Score</th>
                        <th className="p-4 font-bold text-sm">Note</th>
                        <th className="p-4 font-bold text-sm text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {results.length > 0 ? (
                        results.map((res) => (
                            <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold text-slate-700">{res.student}</td>
                                <td className="p-4 text-slate-600">{res.qcm}</td>
                                <td className="p-4 text-slate-400 italic text-sm">{res.date}</td>
                                <td className="p-4 font-bold text-slate-800 text-lg">{res.score}</td>
                                <td className="p-4">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold italic ${getBadgeStyle(res.note)}`}>
                                            {res.note}
                                        </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => setSelectedId(selectedId === res.id ? null : res.id)}
                                        className="border-2 border-blue-600 text-blue-600 px-4 py-1.5 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        {selectedId === res.id ? "Fermer" : "Voir détails"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                                Aucun résultat disponible pour le moment.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
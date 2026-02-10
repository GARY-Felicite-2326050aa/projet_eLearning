export default function UploadSection() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">📤 Upload Vidéos & Documents</h2>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-10 bg-blue-50/50">
                <p className="text-gray-600">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                <p className="text-xs text-gray-400 mt-2">Formats : MP4, PDF, DOCX (Max 500MB)</p>
            </div>
            <button className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700">
                Uploader tous les fichiers
            </button>
        </div>
    );
}
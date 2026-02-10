import api from "../../../shared/lib/axios";
import type {DocumentCollection} from "./document.dto";
import type {Document} from "../type/Document";

export const getDocuments = async (): Promise<DocumentCollection> => {
    const response = await api.get<DocumentCollection>("/api/documents");
    return response.data;
};

export const getDocument = async (id: number): Promise<Document> => {
    const response = await api.get<Document>(`/api/documents/${id}`);
    return response.data;
};

export const createDocument = async (
    data: Omit<Document, "id">
): Promise<Document> => {
    const response = await api.post<Document>("/api/documents", data);
    return response.data;
};

export const updateDocument = async (
    id: number,
    data: Partial<Omit<Document, "id">>
): Promise<Document> => {
    const response = await api.patch<Document>(
        `/api/documents/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        }
    );
    return response.data;
};

export const deleteDocument = async (id: number): Promise<void> => {
    await api.delete(`/api/documents/${id}`);
};
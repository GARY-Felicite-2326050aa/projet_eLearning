import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {Document} from "../type/Document";
type DocumentState = {
    documents: Document[];
    setDocuments: (documents: Document[]) => void;
    addDocument: (document: Document) => void;
    updateDocument: (document: Document) => void;
    removeDocument: (id: number) => void;
};

export const useDocumentStore = create<DocumentState>()(
    persist(
        (set) => ({
            documents: [],

            setDocuments: (documents) => set({ documents }),

            addDocument: (document) =>
                set((state) => ({
                    documents: [...state.documents, document],
                })),

            updateDocument: (updated) =>
                set((state) => ({
                    documents: state.documents.map((d) =>
                        d.id === updated.id ? updated : d
                    ),
                })),

            removeDocument: (id) =>
                set((state) => ({
                    documents: state.documents.filter((d) => d.id !== id),
                })),
        }),
        {
            name: "document-storage",
        }
    )
);
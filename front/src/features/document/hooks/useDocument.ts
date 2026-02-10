import {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../api/document.api";

export const useDocument = () => {
    return {
        getDocuments,
        getDocument,
        createDocument,
        updateDocument,
        deleteDocument,
    };
};
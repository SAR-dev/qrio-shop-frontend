export const getImageUrl = ({ 
    collectionId, 
    id, 
    filename 
}: { 
    collectionId: string, 
    id: string, 
    filename: string 
}) => `${import.meta.env.VITE_API_URL}/api/files/${collectionId}/${id}/${filename}`
export const getImageUrl = ({ 
    id, 
    filename 
}: { 
    id: string, 
    filename: string 
}) => `${import.meta.env.VITE_API_URL}/api/files/images/${id}/${filename}`

export const maxDivisibleByThree = (num: number) => {
    if (num < 0) return 0;
    return num - (num % 3);
  }
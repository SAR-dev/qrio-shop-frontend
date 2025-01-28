import axios from "axios";
import { constants } from "./constants";

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

export const maxDivisibleByTwo = (num: number) => {
    if (num < 0) return 0;
    return num - (num % 2);
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'Authorization': localStorage.getItem(constants.AUTH_TOKEN_API)}
  });
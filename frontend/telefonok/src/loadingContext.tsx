import { createContext } from "react";

export const LoadingContext = createContext({
    isLoading: false,
    setIsLoading: (state: boolean) => {isLoading: state}
})
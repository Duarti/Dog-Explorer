import { createContext, ReactNode, useEffect, useState } from 'react';
import { Dog } from '../types/types';

interface DogsContextProps {
    dogs: Dog[];
    setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const DogsContext = createContext<DogsContextProps>({
    dogs: [],
    setDogs: () => {},
});

/**
 * This global state provider will also update the local storage.
 */
export const DogsProvider = ({ children }: { children: ReactNode }) => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    useEffect(() => {
        if (!dogs.length) return;
        localStorage.setItem('dogs', JSON.stringify(dogs));
    }, [dogs]);

    return (
        <DogsContext.Provider value={{ dogs, setDogs }}>
            {children}
        </DogsContext.Provider>
    );
};

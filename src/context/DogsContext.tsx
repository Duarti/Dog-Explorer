import { createContext, ReactNode, useState } from 'react';
import { Dog } from '../types/types';

interface DogsContextProps {
    dogs: Dog[];
    setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const DogsContext = createContext<DogsContextProps>({
    dogs: [],
    setDogs: () => {},
});

export const DogsProvider = ({ children }: { children: ReactNode }) => {
    const [dogs, setDogs] = useState<Dog[]>([]);

    return (
        <DogsContext.Provider value={{ dogs, setDogs }}>
            {children}
        </DogsContext.Provider>
    );
};

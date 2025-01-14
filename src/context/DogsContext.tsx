import { createContext, ReactNode, useEffect, useState } from 'react';
import { Dog } from '@/types/types';
import getLocalDogs from '@utils/getLocalDogs';

interface DogsContextProps {
    contextDogs: Dog[];
    setContextDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const DogsContext = createContext<DogsContextProps>({
    contextDogs: [],
    setContextDogs: () => {},
});

/**
 * This global state provider will also update the local storage.
 */
export const DogsProvider = ({ children }: { children: ReactNode }) => {
    const [contextDogs, setContextDogs] = useState<Dog[]>([]);

    const localDogs = getLocalDogs();
    const hasLocalDogs = Boolean(localDogs.length);

    useEffect(() => {
        if (hasLocalDogs) {
            setContextDogs(localDogs);
        }
    }, []);

    useEffect(() => {
        if (!contextDogs.length) return;
        localStorage.setItem('dogs', JSON.stringify(contextDogs));
    }, [contextDogs]);

    return (
        <DogsContext.Provider value={{ contextDogs, setContextDogs }}>
            {children}
        </DogsContext.Provider>
    );
};

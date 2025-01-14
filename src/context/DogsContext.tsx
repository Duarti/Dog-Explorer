import { createContext, ReactNode, useEffect, useState } from 'react';
import { Dog } from '@/types/types';
import getLocalDogs from '@utils/getLocalDogs';

interface DogsContextProps {
    contextDogs: Dog[];
    setContextDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

/**
 * Context for managing dog data.
 * Holds the current list of dogs and a function to update it.
 *
 * @type {React.Context<DogsContextProps>}
 */
export const DogsContext = createContext<DogsContextProps>({
    contextDogs: [],
    setContextDogs: () => {},
});

/**
 * Dog data context provider.
 * Manages a list of dogs and syncs with local storage.
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

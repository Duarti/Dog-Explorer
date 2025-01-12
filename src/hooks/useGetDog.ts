import { useContext, useEffect } from "react";
import { DogsContext } from "../context/DogsContext";
import { useFetchDog } from "./useFetchDog";
import getLocalDogs from "../utils/getLocalDogs";
import { Dog } from "../types/types";

/**
 * This hook will return data for a specific dog queried from local storage, or from The Dog API if local storage is empty.
 */
const useGetDog = (id: number | undefined) => {
    const { contextDogs, setContextDogs } = useContext(DogsContext);

    const localDogs = getLocalDogs();
    const hasLocalDog = Boolean(localDogs.find((dog: Dog) => dog.id === id));

    const existingDog =
        contextDogs.find((dog: Dog) => dog.id === id) ||
        localDogs.find((dog: Dog) => dog.id === id);

    // Don't fetch if we have dogs in local storage
    const {
        data: fetchedDog,
        error,
        isLoading,
        isFetching,
    } = useFetchDog(id, !hasLocalDog && !existingDog);

    // If we have the dog in local storage, set the context dog to the local dog (this will write into local storage as well)
    useEffect(() => {
        if (fetchedDog && !contextDogs.some((dog) => dog.id === fetchedDog.id)) {
            setContextDogs([...contextDogs, fetchedDog]);
        }
    }, [fetchedDog]);

    const dog = existingDog || fetchedDog;

    return { dog, error, isLoading, isFetching };
};

export default useGetDog;

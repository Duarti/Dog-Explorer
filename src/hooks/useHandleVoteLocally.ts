import { useContext, useCallback } from 'react';
import { DogsContext } from '../context/DogsContext';
import { VOTE_ENUM } from '../types/types';

const useHandleVoteLocally = (): ((
    dogIds: number[],
    type: VOTE_ENUM
) => void) => {
    const { setContextDogs } = useContext(DogsContext);

    const handleVoteLocally = useCallback(
        (dogIds: number[], type: VOTE_ENUM) => {
            setContextDogs((prevContextDogs) =>
                prevContextDogs.map((prevContextDog) =>
                    dogIds.includes(prevContextDog.id)
                        ? {
                              ...prevContextDog,
                              voted: type === VOTE_ENUM.UPVOTE,
                          }
                        : prevContextDog
                )
            );
        },
        [setContextDogs]
    );

    return handleVoteLocally;
};

export default useHandleVoteLocally;

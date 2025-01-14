import { useContext, useCallback } from 'react';
import { DogsContext } from '@/context/DogsContext';
import { VOTE_ENUM } from '@/types/types';

/**
 * Custom hook to handle local voting updates for dogs.
 * Updates the `voted` state of dogs in the context based (local storage) on the provided IDs and vote type.
 *
 * @returns {Function} A function to handle local votes.
 * @param {number[]} dogIds - Array of dog IDs to update.
 * @param {VOTE_ENUM} type - The type of vote (`UPVOTE` or `DOWNVOTE`).
 *
 * @example
 * const handleVoteLocally = useHandleVoteLocally();
 * handleVoteLocally([1, 2, 3], VOTE_ENUM.UPVOTE);
 */
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

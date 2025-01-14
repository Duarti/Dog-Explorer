import { useMutation } from '@tanstack/react-query';
import { voteForDog } from '@api/api';
import message from '@components/shared/Message';
import { VOTE_ENUM } from '@/types/types';

interface HandleVoteProps {
    onSuccess?: () => void;
    onError?: () => void;
    onFinish?: () => void;
}

interface HandleVoteDataProps {
    imageIds: string[];
    value?: VOTE_ENUM;
}

/**
 * Custom hook for handling vote submissions on dog images.
 * Allows voting on multiple images with success, error, and finish callbacks.
 *
 * @param {Function} [props.onSuccess] - Callback triggered on successful vote submission.
 * @param {Function} [props.onError] - Callback triggered on vote submission error.
 * @param {Function} [props.onFinish] - Callback triggered when the vote operation is settled.
 * @returns {Function} handleVote - Function to initiate a vote.
 * @returns {boolean} isLoading - Whether the vote operation is in progress.
 * @returns {boolean} isError - Whether an error occurred during the vote operation.
 * @returns {Error|undefined} error - The error encountered during the vote operation.
 *
 * @example
 * const { handleVote, isLoading, isError, error } = useHandleVote({
 *   onSuccess: () => console.log('Vote submitted successfully'),
 *   onError: () => console.log('Vote submission failed'),
 *   onFinish: () => console.log('Vote operation finished'),
 * });
 *
 * handleVote({ imageIds: ['img1', 'img2'], value: VOTE_ENUM.UPVOTE });
 * if (isLoading) return <p>Submitting votes...</p>;
 * if (isError) console.error(error);
 */
const useHandleVote = ({ onSuccess, onError, onFinish }: HandleVoteProps) => {
    const mutation = useMutation<void, Error, HandleVoteDataProps>({
        mutationFn: async ({
            imageIds,
            value = VOTE_ENUM.UPVOTE,
        }: HandleVoteDataProps) => {
            await Promise.all(
                imageIds.map((imageId) => voteForDog(imageId, value))
            );
        },
        onSuccess: (_, variables) => {
            onSuccess
                ? onSuccess()
                : message.success(
                      `Successfully voted ${
                          variables.value === VOTE_ENUM.UPVOTE ? 'up' : 'down'
                      } on ${variables.imageIds.length} images.`
                  );
        },
        onError: (error) => {
            onError
                ? onError()
                : message.error(
                      `Failed to submit some votes. Please try again. Error: ${error.message}`
                  );
        },
        onSettled: () => {
            onFinish && onFinish();
        },
    });

    const handleVote = ({
        imageIds,
        value = VOTE_ENUM.UPVOTE,
    }: HandleVoteDataProps) => {
        mutation.mutate({ imageIds, value });
    };

    return {
        handleVote,
        isLoading: mutation.status === 'pending',
        isError: mutation.status === 'error',
        error: mutation.error,
    };
};

export default useHandleVote;

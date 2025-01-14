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

import { voteForDog } from '../api/api';
import { VOTE_ENUM } from '../types/types';

interface HandleVoteProps {
    imageIds: string[];
    value?: VOTE_ENUM;
    onSuccess?: () => void;
    onError?: () => void;
    onFinish?: () => void;
}

const handleVote = async ({
    imageIds,
    value = VOTE_ENUM.UPVOTE,
    onSuccess,
    onError,
    onFinish,
}: HandleVoteProps) => {
    try {
        await Promise.all(
            imageIds.map((imageId) => {
                voteForDog(imageId, value);
            })
        );
        alert(`Successfully voted on ${imageIds.length} dogs!`);
        onSuccess && onSuccess();
    } catch (error) {
        alert('Failed to submit some votes. Check the console for details.');
        onError && onError();
    } finally {
        onFinish && onFinish();
    }
};

export default handleVote;

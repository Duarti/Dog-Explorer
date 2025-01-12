import LoadingSpinner from './LoadingSpinner';

const Loading = () => {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <LoadingSpinner />
        </div>
    );
};

export default Loading;

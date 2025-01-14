import { useNavigate } from 'react-router-dom';
import StyledButton from '@components/shared/StyledButton';

const GlobalError = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center gap-10 h-full"
        >
            <h2 className="text-3xl font-bold">Something went wrong.</h2>
            <StyledButton onClick={goHome}>Go Home</StyledButton>
        </div>
    );
};

export default GlobalError;

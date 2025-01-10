interface ErrorFallbackProps {
    error: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => (
    <div role="alert">
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
    </div>
);

export default ErrorFallback;

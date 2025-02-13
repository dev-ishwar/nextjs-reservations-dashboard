'use client';

type PropsType = {
    error: Error & { digest?: number },
    reset: () => void
}
const ErrorPage = ({ error, reset }: PropsType) => {
    return (
        <main>
            <p>{error.message}</p>
            <p>{error.digest}</p>
            <button onClick={reset}>Try Again</button>
        </main>
    )
}

export default ErrorPage;
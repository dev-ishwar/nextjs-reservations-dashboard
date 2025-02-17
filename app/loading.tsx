const Loading = () => {
    return (
        <div className="absolute inset-0 z-20 bg-black/25 grid place-content-center">
            <p className="sr-only">Loading...</p>
            <div className="size-25 border-6 border-black/90 border-t-blue-100 animate-spin rounded-full"></div>
        </div>
    )
}

export default Loading;
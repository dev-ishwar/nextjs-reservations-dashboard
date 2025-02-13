const Loading = () => {
    return (
        <div className="absolute inset-0 bg-black/25 grid place-content-center">
            <p className="sr-only">Loading...</p>
            <div className="size-25 border-4 border-black border-t-0 rounded-full"></div>
        </div>
    )
}

export default Loading;
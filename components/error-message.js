export default function ErrorMessage({message}) {
    return (
            <div className="error bg-red-400 mx-auto mb-5 text-center p-2 rounded">
                <div className="text-white text-sm font-medium">{message}</div>
            </div>
    );
}

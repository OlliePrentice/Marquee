export default function FormButton({title, type, disabled, pageNumber, pageHandler}) {
    return (
        <>
            <button type={type} disabled={disabled} onClick={() => pageHandler(pageNumber)} className={`no-underline uppercase tracking-widest text-xxs py-3 px-5 bg-green-400 rounded text-white font-medium transition hover:bg-green-500 ${disabled && 'pointer-events-none opacity-50'}`}>{title}</button>
        </>
    );
}

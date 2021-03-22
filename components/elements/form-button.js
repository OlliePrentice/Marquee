export default function FormButton({children, type, disabled, onClick, classNames}) {
    return (
        <>
            <button type={type} disabled={disabled} onClick={onClick} className={`btn ${classNames} ${disabled && 'pointer-events-none opacity-50'}`}>{children}</button>
        </>
    );
}

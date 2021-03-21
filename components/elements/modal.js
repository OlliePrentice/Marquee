import RemoveButton from "../elements/remove-button";

export default function Modal(props) {

    return (
        <div className={`modal fixed top-0 left-0 z-50 w-full h-full p-10 flex items-center bg-gray-900 bg-opacity-80 ${props.className}`} onClick={() => props.closeModal()}>
            <div className="bg-white pt-20 px-8 pb-8 w-full max-w-4xl mx-auto rounded-xl shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <RemoveButton remove={props.closeModal} />
                {props.children}
            </div>
        </div>
    );

};
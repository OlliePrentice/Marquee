import RemoveButton from "../elements/remove-button";

export default function Modal(props) {

    return (
        <div className={`modal fixed top-0 left-0 overflow-y-auto z-50 w-full h-full flex flex-wrap items-center py-10 md:py-20 px-10 bg-gray-900 bg-opacity-80 ${props.className}`} onClick={() => props.closeModal()}>
            <div className="bg-white pt-20 px-8 pb-8 w-full max-w-4xl mx-auto rounded-xl shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <RemoveButton remove={props.closeModal} />
                {props.children}
            </div>
            <div className="h-20 w-full"></div>
        </div>
    );

};
export default function RemoveButton( { remove, i } ) {
    return (
        <span
        className="w-5 h-5  block absolute top-3 right-3 bg-red-500 rounded-full z-5 text-white cursor-pointer hover:opacity-70"
        onClick={() => remove(i)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
                                                                   strokeWidth={2}
                                                                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
    );
}
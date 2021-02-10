import { useState } from 'react';

export default function Switch(props) {
    const [value, updateValue] = useState(0);

    return (
        <>
            <ul className="switch p-0">
                {props.items.map((item, index) => (
                    <li key={index} onClick={() => { updateValue(index); props.switchTrigger && props.switchTrigger(item.label) }} className={`border border-l-0 first:border-l text-gray-400 cursor-pointer leading-tight inline-block py-3 px-5 uppercase text-xxs font-semibold first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg hover:bg-gray-200 hover:text-gray-700 ${index === value && 'bg-green-400 border-green-400 !text-white hover:bg-green-400'}`}>{item.label}</li>
                ))}
            </ul>
        </>
    );
}

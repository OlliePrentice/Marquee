export default function CalendarType() {

    const types = [
        {
            id: 'typeFlexible',
            value: 'flexible',
            name: 'calendar_type',
            label: 'Flexible'
        },
        {
            id: 'typeFixed',
            value: 'fixed',
            name: 'calendar_type',
            label: 'Fixed'
        }
    ];

    return (
        <>
            <h3 className="text-2xl block mb-4">Select a calendar type:</h3>
            {types.map((type, index) =>
                (
                    <div key={index} className="mb-2">
                        <input id={type.id} type="radio" value={type.value} name={type.name}/>
                        <label htmlFor={type.id}>{type.label}</label>
                    </div>
                ))}
        </>
    );
}

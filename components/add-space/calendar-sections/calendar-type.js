import FormSectionHeading from "../../elements/form-section-heading";

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
            <FormSectionHeading>Select a calendar type</FormSectionHeading>
            {types.map((type, index) => {

                let label = '';

                switch (type) {
                    case 'Flexible':
                        label = '(Enable bookings between a range of times)';
                        break;
                    case 'Fixed':
                        label = '(Enable bookings only at specified times)';
                        break;
                }

                return (
                    <div key={index} className="mb-12">
                        <input id={type.id} type="radio" value={type.value} name={type.name} className="choice-input"/>
                        <label htmlFor={type.id} className="text-9xl">{type.label} <span className="text-xs text-gray-500">(Enable bookings between a range of times)</span></label>
                    </div>
                )
            })}
        </>
    );
}

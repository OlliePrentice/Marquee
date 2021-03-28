import { useState } from 'react';
import CalendarDivision from "./calendar-sections/calendar-division";
import CalendarDefaults from "./calendar-sections/calendar-defaults";
import CalendarPicker from "./calendar-sections/calendar-picker";

export default function CalendarBuilder() {

    const [division, setDivision] = useState('daily');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    function handleDivisionChange(division, min, max) {
        setDivision(division);
        setMin(min);
        setMax(max);
    }

    return (
        <>
            <div className="mb-20">
                <CalendarDivision updateDivision={handleDivisionChange} />
            </div>
            <div className="mb-20">
                <CalendarDefaults division={division} min={min} max={max} />
            </div>
            <div className="mb-20">
                <CalendarPicker division={division} min={min} max={max} />
            </div>
        </>
    )
}
import {addMinutes, startOfDay} from "date-fns";
import formatLocale from "../../utils/formatLocale";

export default function TimeSelects({fieldPrefix = 'calendar', timepicker, timepickers, setTimepickers, division, min, minRemove = 0}) {

    let slotDivision;

    switch (division) {
        case 'daily':
            slotDivision = 0;
            break;
        case 'hourly':
            slotDivision = 24;
            break;
        case '30-min':
            slotDivision = 48;
            break;
        case '15-min':
            slotDivision = 96;
            break;
        case '10-min':
            slotDivision = 144;
            break;
        default:
            slotDivision = 24;
    }


    const firstSlot = startOfDay(new Date(1994, 5, 19));
    const slotStarts = Array.from(Array(slotDivision)).map((_e, i) => formatLocale(addMinutes(firstSlot, ((((i - 1) * 60) / (slotDivision / 24)) + 60 / (slotDivision / 24))), 'h:mma'));
    const slotEnds = Array.from(Array(slotDivision)).map((_e, i) => formatLocale(addMinutes(firstSlot, ((((i) * 60) / (slotDivision / 24)) + 60 / (slotDivision / 24))), 'h:mma'));


    function incrementSlotCount(day) {
        const selectList = [...timepickers];

        for (let i in selectList) {
            if (selectList[i].day === day.toLowerCase()) {

                selectList[i].starts.push({selected: selectList[i].ends[selectList[i].count - 1].selected + 2});
                selectList[i].ends.push({selected: selectList[i].ends[selectList[i].count - 1].selected + (min + 2)});
                selectList[i].count += 1;
                setTimepickers(selectList);
                break;
            }
        }
    }

    function setTimePicked(e, day, type, row) {

        const selectList = [...timepickers];
        for (let item in selectList) {
            if (selectList[item].day === day.toLowerCase()) {
                if (type === 'start') {
                    selectList[item].starts[row] = {selected: e.target.selectedIndex};
                } else {
                    selectList[item].ends[row] = {selected: e.target.selectedIndex};
                }
                setTimepickers(selectList);
                break;
            }
        }
    }

    const removeSlot = (index, timepicker) => {
        const selectList = [...timepickers];
        for (let i in selectList) {
            if (selectList[i].day === timepicker.day) {
                selectList[i].starts.splice(index, 1);
                selectList[i].ends.splice(index, 1);
                selectList[i].count -= 1;

                setTimepickers(selectList);
            }
        }

    };

    function renderSelects() {
        console.log(slotStarts);
        return Array.from(Array(timepicker.count)).map((_val, i) => {

            const prevEnd = timepicker.ends[i - 1] !== undefined ? timepicker.ends[i - 1].selected : false;
            const nextStart = timepicker.starts[i + 1] !== undefined ? timepicker.starts[i + 1].selected : false;

            return (
                <div key={i} className="flex flex-wrap -mx-2 mb-6">
                    <div className="flex-1 px-2 relative">
                        <label htmlFor={`${fieldPrefix}DayStart` + timepicker.day + i}
                               className={`block mb-2 absolute -top-7 ${i !== 0 && 'sr-only'}`}>Start</label>
                        <select value={timepicker.starts[i].selected}
                                name={`${fieldPrefix}_day_start_` + timepicker.day + `[]`}
                                id={`${fieldPrefix}DayStart` + timepicker.day + i}
                                onChange={(e) => setTimePicked(e, timepicker.day, 'start', i)}>
                            {slotStarts.map((val, j) => (
                                <option key={j} value={j}
                                        disabled={j > timepicker.ends[i].selected - min || prevEnd !== false && j < prevEnd + 2}>{val.toLowerCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 px-2 relative">
                        <label htmlFor={`${fieldPrefix}DayEnd` + timepicker.day + i}
                               className={`block mb-2 absolute -top-7 ${i !== 0 && 'sr-only'}`}>End</label>
                        <select value={timepicker.ends[i].selected}
                                name={`${fieldPrefix}_day_end_` + timepicker.day + `[]`}
                                id={`${fieldPrefix}DayEnd` + timepicker.day + i}
                                onChange={(e) => setTimePicked(e, timepicker.day, 'end', i)}>
                            {slotEnds.map((val, j) => (
                                <option key={j} value={j}
                                        disabled={j < timepicker.starts[i].selected + min || nextStart !== false && j > nextStart - 2}>{val.toLowerCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="px-2">
                        <div className="relative w-5 h-full">
                            {i > minRemove &&
                            <span
                                className="block absolute top-1/2 left-0 transform -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full z-5 text-white cursor-pointer hover:opacity-70"
                                onClick={() => removeSlot(i, timepicker)}><svg
                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"><path
                                strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>}
                        </div>
                    </div>
                </div>

            );
        })
    }

    if (timepicker) {

        let slotButtonDisabled = false;

        if (timepicker) {

            if (slotStarts.length - timepicker.ends[timepicker.ends.length - 1].selected < min + 3) {
                slotButtonDisabled = true;
            }
        }

        return (
            <>
                <div>
                    {renderSelects(timepicker)}
                    <div className="w-full">
                        <button type="button" disabled={slotButtonDisabled} className="btn block w-full cursor-pointer"
                                onClick={() => incrementSlotCount(timepicker.day)}>Add Time Slot
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

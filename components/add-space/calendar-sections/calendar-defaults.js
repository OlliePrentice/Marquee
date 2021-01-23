import {addDays, startOfWeek, addHours, startOfDay, addMinutes} from 'date-fns'
import formatLocale from "../../../utils/formatLocale";
import {useState} from "react";

export default function CalendarDefaults({division}) {

    const [timepickers, setTimepickers] = useState([]);

    const firstDay = startOfWeek(new Date());
    const weekDays = Array.from(Array(7)).map((e, i) => formatLocale(addDays(firstDay, (i + 1)), 'EEEE'));

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

    const firstSlot = startOfDay(new Date());
    const slots = Array.from(Array(slotDivision)).map((e, i) => formatLocale(addMinutes(firstSlot, ((((i - 1) * 60) / (slotDivision / 24)) + 60 / (slotDivision / 24))), 'h:mma'));

    // console.log(slotDivision / 24);
    // console.log(slots);

    function handleDayCheck(e) {
        const checkedDay = e.target.value;
        const selectList = [...timepickers];

        if (e.target.checked) {
            selectList.push({day: checkedDay, count: 1});
            setTimepickers(selectList);
        } else {
            const selectList = [...timepickers];

            timepickers.forEach((item, i) => {
                if (item.day === checkedDay) {
                    selectList.splice(i, 1);
                }
            });

            setTimepickers(selectList);
        }
    }

    function incrementSlotCount(day) {
        const selectList = [...timepickers];

        for (var i in selectList) {
            if (selectList[i].day === day.toLowerCase()) {
                selectList[i].count += 1;
                setTimepickers(selectList);
                break; //Stop this loop, we found it!
            }
        }

        // const timepicker = selectList.find(obj => {
        //
        //     if(obj.day === day.toLowerCase()) {
        //     }
        //
        //     return obj.day === day.toLowerCase();
        // });
        //
        // if(timepicker) {
        //
        // }
    }

    function setTimePicked(e, day, type, row) {

        const selectList = [...timepickers];
        for (var item in selectList) {
            if (selectList[item].day === day.toLowerCase()) {
                //selectList[item].picked.push({type: type,row: row,selected: e.target.selectedIndex}); FIX ERROR
                setTimepickers(selectList);
                break; //Stop this loop, we found it!
            }
        }
    }

    function renderSelects(day) {
        const timepicker = timepickers.find(obj => {
            return obj.day === day.toLowerCase();
        });

        if (timepicker) {
            return Array.from(Array(timepicker.count)).map((val, i) => (
                <div key={i}>
                    <label htmlFor={`defaultDayStart` + timepicker.day + i} className="block">Start</label>
                    <select name={`default_day_start_` + timepicker.day + `[]`} id={`defaultDayStart` + timepicker.day + i} onChange={(e) => setTimePicked(e, day, 'start', i)}>
                        {slots.map((val, j) => (
                            <option key={j} value={j} disabled={i !== 0 && j < timepicker.pickedIndex}>{val.toLowerCase()}</option>
                        ))}
                    </select>
                    <label htmlFor={`defaultDayEnd` + timepicker.day + i} className="block">End</label>
                    <select name={`default_day_end_` + timepicker.day + `[]`} id={`defaultDayEnd` + timepicker.day + i} onChange={(e) => setTimePicked(e, day)}>
                        {slots.map((val, j) => (
                            <option key={j} value={j} disabled={j < timepicker.pickedIndex}>{val.toLowerCase()}</option>
                        ))}
                    </select>
                </div>
            ))
        }
    }

    return (
        <>
            {console.log(timepickers)}
            <h3 className="text-2xl block mb-8">Set your default opening hours:</h3>
            {weekDays.map((day, i) =>
                (
                    <div key={i} className="mb-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="px-2">
                                <input id={'default' + day} type="checkbox" name="default_day"
                                       value={day.toLowerCase()} onChange={(e) => handleDayCheck(e)}/>
                                <label htmlFor={'default' + day}>{day}</label>
                            </div>
                            {division !== 'daily' &&
                            <>
                                <div className="px-2">
                                    {renderSelects(day)}
                                </div>
                                <span onClick={() => incrementSlotCount(day)}>Add</span>
                            </>
                            }
                        </div>
                    </div>
                )
            )}
        </>
    );
}

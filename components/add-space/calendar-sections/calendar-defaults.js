import {addDays, startOfWeek, addHours, startOfDay, addMinutes} from 'date-fns'
import formatLocale from "../../../utils/formatLocale";
import {useState, useEffect} from "react";
import usePrevious from "../../../utils/usePrevious";


function CalendarDefaults({division, min, max}) {

    const [timepickers, setTimepickers] = useState([]);

    const firstDay = startOfWeek(new Date());
    const weekDays = Array.from(Array(7)).map((e, i) => formatLocale(addDays(firstDay, (i + 1)), 'EEEE'));
    const prevProps = usePrevious({division, min, max});


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

    function handleDayCheck(e) {
        const checkedDay = e.target.value;
        const selectList = [...timepickers];

        if (e.target.checked) {
            selectList.push({day: checkedDay, count: 1, starts: [{selected: 0}], ends: [{selected: min + 1}]});
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

        for (let i in selectList) {
            if (selectList[i].day === day.toLowerCase()) {

                selectList[i].starts.push({selected: selectList[i].ends[selectList[i].count - 1].selected + 1});
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
                break; //Stop this loop, we found it!
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

    function renderSelects(timepicker) {

        if (timepicker) {
            return Array.from(Array(timepicker.count)).map((val, i) => {

                const prevEnd = timepicker.ends[i - 1] !== undefined ? timepicker.ends[i - 1].selected : false;
                const nextStart = timepicker.starts[i + 1] !== undefined ? timepicker.starts[i + 1].selected : false;

                //(j - timepicker.starts[i].selected) > max + 1
                //(timepicker.ends[i].selected - j) > max + 1

                return (
                    <div key={i} className="flex flex-wrap -mx-2 mb-6">
                        <div className="flex-1 px-2">
                            <label htmlFor={`defaultDayStart` + timepicker.day + i}
                                   className={`block mb-2 ${i !== 0 && 'sr-only'}`}>Start</label>
                            <select value={timepicker.starts[i].selected}
                                    name={`default_day_start_` + timepicker.day + `[]`}
                                    id={`defaultDayStart` + timepicker.day + i}
                                    onChange={(e) => setTimePicked(e, timepicker.day, 'start', i)}>
                                {slots.map((val, j) => (
                                    <option key={j} value={j}
                                            disabled={j > timepicker.ends[i].selected - 1 || prevEnd && j < prevEnd + 1 || (timepicker.ends[i].selected - j) < min + 1}>{val.toLowerCase()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 px-2">
                            <label htmlFor={`defaultDayEnd` + timepicker.day + i}
                                   className={`block mb-2 ${i !== 0 && 'sr-only'}`}>End</label>
                            <select value={timepicker.ends[i].selected}
                                    name={`default_day_end_` + timepicker.day + `[]`}
                                    id={`defaultDayEnd` + timepicker.day + i}
                                    onChange={(e) => setTimePicked(e, timepicker.day, 'end', i)}>
                                {slots.map((val, j) => (
                                    <option key={j} value={j}
                                            disabled={j < timepicker.starts[i].selected + (min + 1) || nextStart && j > nextStart - 1}>{val.toLowerCase()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="px-2">
                            <div className="relative w-5 h-full">
                                {i !== 0 &&
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
    }

    useEffect(() => {
        if (prevProps !== undefined) {
            if (prevProps.division !== division || prevProps.min !== min || prevProps.max !== max) {
                setTimepickers([]);
            }
        }
    }, [division, min, max]);

    return (
        <>
            {/*{console.log(timepickers)}*/}
            <h3 className="text-lg font-medium block mb-20">{division === 'daily' ? 'Set your default opening days' : 'Set your default opening hours'}...</h3>
            {weekDays.map((day, i) => {
                    const timepicker = timepickers.find(obj => {
                        return obj.day === day.toLowerCase();
                    });

                    let dayChecked = false;
                    let slotButtonDisabled = false;

                    if (timepicker) {
                        if (timepicker.day === day.toLowerCase()) {
                            dayChecked = true;
                        }

                        console.log(slots.length - timepicker.ends[timepicker.ends.length - 1].selected);
                        console.log(min);

                        if(slots.length - timepicker.ends[timepicker.ends.length - 1].selected < min + 3) {
                            slotButtonDisabled = true;
                        }
                    }

                    return (
                        <div key={i} className="mb-4">
                            <div className="flex flex-wrap -mx-4">
                                <div className="px-4 w-1/3">
                                    <input id={'default' + day} type="checkbox" name="default_day" className="choice-input"
                                           checked={dayChecked}
                                           value={day.toLowerCase()} onChange={(e) => handleDayCheck(e)}/>
                                    <label htmlFor={'default' + day} className="!inline-block text-4xl">{day}</label>
                                </div>
                                {division !== 'daily' && dayChecked &&
                                <>
                                    <div className="flex flex-wrap px-4 flex-1 -mx-2 mb-10">
                                        <div className="px-2 flex-1">
                                            {renderSelects(timepicker)}
                                        </div>
                                        <div className="w-full px-2 mr-9">
                                            <button type="button" disabled={slotButtonDisabled} className="btn block w-full cursor-pointer"
                                                  onClick={() => incrementSlotCount(day)}>Add Time Slot</button>
                                        </div>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    )
                }
            )}
        </>
    );
}


export default CalendarDefaults;

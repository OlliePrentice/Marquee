import {addDays, startOfWeek } from 'date-fns'
import formatLocale from "../../../utils/formatLocale";
import {useState, useEffect} from "react";
import usePrevious from "../../../utils/usePrevious";
import TimeSelects from "../../elements/time-selects";
import FormSectionHeading from "../../elements/form-section-heading";

function CalendarDefaults({division, min, max}) {

    const prevProps = usePrevious({division, min, max});
    const [timepickers, setTimepickers] = useState([]);

    const firstDay = startOfWeek(new Date());
    const weekDays = Array.from(Array(7)).map((e, i) => formatLocale(addDays(firstDay, (i + 1)), 'EEEE'));


    function handleDayCheck(e) {
        const checkedDay = e.target.value;
        const selectList = [...timepickers];

        if (e.target.checked) {
            selectList.push({day: checkedDay, count: 1, starts: [{selected: 0}], ends: [{selected: min}]});
            setTimepickers(selectList);
        } else {

            timepickers.forEach((item, i) => {
                if (item.day === checkedDay) {
                    selectList.splice(i, 1);
                }
            });

            setTimepickers(selectList);
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
            <FormSectionHeading>{division === 'daily' ? 'Set your default opening days' : 'Set your default opening hours'}</FormSectionHeading>

            {weekDays.map((day, i) => {
                    const timepicker = timepickers.find(obj => {
                        return obj.day === day.toLowerCase();
                    });

                    let dayChecked = false;

                    if (timepicker) {
                        if (timepicker.day === day.toLowerCase()) {
                            dayChecked = true;
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
                                    <div className="pt-8 px-4 flex-1 -mx-2 mb-10">
                                        <TimeSelects fieldPrefix="default" timepicker={timepicker} timepickers={timepickers} division={division} min={min} setTimepickers={setTimepickers}/>
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

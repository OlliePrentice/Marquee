import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSelects from "../../elements/time-selects";
import {format} from 'date-fns';
import usePrevious from "../../../utils/usePrevious";
import Modal from "../../elements/modal";
import FormButton from "../../elements/form-button";

export default function CalendarPicker({division, min, max}) {
    const prevProps = usePrevious({division, min, max});
    const [unavailable, setUnavailable] = useState([]);
    const [timepickers, setTimepickers] = useState([]);

    function handleAvailabilityClick(e, date) {
        e.stopPropagation();
        const dates = [...unavailable];
        const dateFound = dates.indexOf(date);
        if (dateFound > -1) {
            dates.splice(dateFound, 1);
        } else {
            dates.push(date);
        }

        setUnavailable(dates);

        if (dateFound === -1) {
            const checkedDay = format(date, 'Y-MM-dd');
            const checkedDatesList = [...timepickers];

            const foundDay = timepickers.findIndex(item => item.day === checkedDay);
            if (foundDay > -1) {
                checkedDatesList.splice(foundDay, 1);
            }

            setTimepickers(checkedDatesList);
        }
    }

    function calendarTileActions(date) {
        return (
            <>
                <FormButton
                    type="button"
                    classNames={`w-full btn ${!unavailable.includes(date) && 'btn--danger'}`}
                    onClick={(e) => handleAvailabilityClick(e, date)}>

                    {!unavailable.includes(date) && <>
                    Set date as unavailable
                    </>}

                    {unavailable.includes(date) && <>
                    Set date as available
                    </>}

                </FormButton>
            </>
        )
    }

    function enableSpecialTimepicker(date) {
        const checkedDay = format(date, 'Y-MM-dd');
        const checkedDatesList = [...timepickers];

        const foundDay = timepickers.findIndex(item => item.day === checkedDay);

        if (foundDay > -1) {
            checkedDatesList[foundDay].count = 1;
            checkedDatesList[foundDay].starts = [{selected: 0}];
            checkedDatesList[foundDay].ends = [{selected: min}];
        }

        setTimepickers(checkedDatesList);
    }

    function handleDateClick(date) {
        const checkedDay = format(date, 'Y-MM-dd');
        const checkedDatesList = [...timepickers];

        checkedDatesList.forEach((item) => {
            item.active = false;
        });

        const foundDay = timepickers.findIndex(item => item.day === checkedDay);

        if (foundDay > -1) {
            checkedDatesList[foundDay].active = true;
        } else {
            checkedDatesList.push({active: true, day: checkedDay, pickerDate: date.setHours(0,0,0,0), count: 0, starts: [{selected: 0}], ends: [{selected: min}]})
        }

        setTimepickers(checkedDatesList);
    }

    function handleModalClose() {

        const checkedDatesList = [...timepickers];

        checkedDatesList.forEach((item) => {
            item.active = false;
        });

        setTimepickers(checkedDatesList);
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
            <div className="calendar-picker relative">
                <h3 className="text-lg font-medium block mb-12">Set unavailable days and special slots...</h3>

                <div className="calendar-picker__main">
                    <Calendar
                        id="lang-switcher"
                        onChange={(value) => handleDateClick(value)}
                        minDate={new Date()}
                        view="month"
                        tileClassName={({date}) => {
                            const tileClasses = [];

                            if(date.getTime() < new Date().setHours(0, 0, 0, 0)) {
                                tileClasses.push('expired');
                            }

                            if(unavailable.includes(date.setHours(0,0,0,0))) {
                                tileClasses.push('unavailable');
                            }

                            if(timepickers.findIndex(item => item.pickerDate === date.setHours(0,0,0,0)) > -1) {
                                tileClasses.push('active');
                            }

                            return tileClasses;
                        }}
                    />
                </div>
                
                {timepickers.map((timepicker, i) => (
                    <Modal key={i} className={timepicker.active ? 'block' : 'hidden'} closeModal={handleModalClose}>
                        <div className="mb-5">
                            {calendarTileActions(timepicker.pickerDate)}
                        </div>
                        {division !== 'daily' && !unavailable.includes(timepicker.pickerDate) &&
                        <>
                            <span className="block mb-5 text-center text-gray-300">- or -</span>
                            {timepicker.count === 0 &&
                            <div className="mb-5">
                                <FormButton
                                    type="button"
                                    classNames={`w-full btn`}
                                    onClick={() => enableSpecialTimepicker(timepicker.pickerDate)}
                                    >
                                    Add opening times
                                </FormButton>
                            </div>}
                            {timepicker.count > 0 &&
                            <div className="pt-10">
                                <input type="hidden" name="calendar_special[]" value={timepicker.day} />
                                <TimeSelects timepicker={timepicker} timepickers={timepickers} division={division} min={min} setTimepickers={setTimepickers} minRemove={-1}/>
                            </div>
                            }
                        </>}
                    </Modal>
                ))}
            </div>
        </>
    )
}

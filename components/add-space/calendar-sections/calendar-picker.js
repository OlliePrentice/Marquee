import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSelects from "../../elements/time-selects";
import {format} from 'date-fns';
import usePrevious from "../../../utils/usePrevious";
import Modal from "../../elements/modal";

export default function CalendarPicker({division, min, max}) {
    const prevProps = usePrevious({division, min, max});
    const [unavailable, setUnavailable] = useState([]);
    const [timepickers, setTimepickers] = useState([]);

    function handleAvailabilityClick(e, date) {
        e.stopPropagation();
        const dates = [...unavailable];
        const dateFound = dates.indexOf(date.getTime());
        if (dateFound > -1) {
            dates.splice(dateFound, 1);
        } else {
            dates.push(date.getTime());
        }

        setUnavailable(dates);

        const checkedDay = format(date, 'Y-MM-dd');
        const checkedDatesList = [...timepickers];

        const foundDay = timepickers.findIndex(item => item.day === checkedDay);
        if (foundDay > -1) {
            checkedDatesList.splice(foundDay, 1);
        }

        setTimepickers(checkedDatesList);
    }

    function calendarTileActions(date) {
        return (
            <span className="date-actions inline-block absolute top-0 right-0">
                <span
                    className={`w-7 h-7 p-1 inline-block bg-gray-50 text-gray-600 hover:text-white ${!unavailable.includes(date.getTime()) ? 'hover:bg-red-400 hover:border-red-400' : 'hover:bg-green-400 hover:border-green-400'} `}
                    onClick={(e) => handleAvailabilityClick(e, date)}>
                    {!unavailable.includes(date.getTime()) &&
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clipRule="evenodd"/>
                    </svg>}

                    {unavailable.includes(date.getTime()) &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>}
                </span>
            </span>
        )
    }

    function handleDateClick(date) {
        const checkedDay = format(date, 'Y-MM-dd');
        const checkedDatesList = [...timepickers];

        checkedDatesList.forEach((item) => {
            item.active = false;
        });

        const foundDay = timepickers.findIndex(item => item.day === checkedDay);

        if (foundDay > -1) {
            checkedDatesList.splice(foundDay, 1);
        } else {
            checkedDatesList.push({active: true, day: checkedDay, pickerDate: date, count: 1, starts: [{selected: 0}], ends: [{selected: min}]})
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
                        tileClassName={({date}) => date.getTime() < new Date().setHours(0, 0, 0, 0) ? 'expired' : null}
                        tileDisabled={({date}) => unavailable.includes(date.getTime())}
                    />
                </div>
                
                {timepickers.map((timepicker, i) => (
                    <Modal key={i} className={timepicker.active ? 'block' : 'hidden'} closeModal={handleModalClose}>
                        <div className="mb-8">
                            <input id={`unavialableDate${i}`} type="checkbox" name="calendar_unavailable[]" />
                            <label htmlFor={`unavialableDate${i}`} className="radio-btn radio-btn--danger">Set day as unavailable</label>
                            {calendarTileActions(timepicker.pickerDate)}
                        </div>
                        <input type="hidden" name="calendar_special[]" value={timepicker.day} />
                        <TimeSelects timepicker={timepicker} timepickers={timepickers} division={division}
                                    min={min}
                                    setTimepickers={setTimepickers}/>
                    </Modal>
                ))}
            </div>
        </>
    )
}

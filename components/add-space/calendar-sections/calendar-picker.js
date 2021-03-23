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
        const dateFound = dates.indexOf(date.getTime());
        if (dateFound > -1) {
            dates.splice(dateFound, 1);
        } else {
            dates.push(date.setHours(0,0,0,0));
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
            <span className="date-actions">
                <FormButton
                    type="button"
                    classNames={`w-full btn ${!unavailable.includes(date.getTime()) && 'btn--danger'}`}
                    onClick={(e) => handleAvailabilityClick(e, date)}>

                    {!unavailable.includes(date.getTime()) && <>
                    Set date as unavailable
                    </>}

                    {unavailable.includes(date.getTime()) && <>
                    Set date as available
                    </>}

                </FormButton>
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

        //Find reason for double click
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
                        tileClassName={({date}) => {
                            const tileClasses = [];

                            if(date.getTime() < new Date().setHours(0, 0, 0, 0)) {
                                tileClasses.push('expired');
                            }

                            if(unavailable.includes(date.setHours(0,0,0,0))) {
                                tileClasses.push('unavailable');
                            }

                            return tileClasses;
                        }}
                    />
                </div>
                
                {timepickers.map((timepicker, i) => (
                    <Modal key={i} className={timepicker.active ? 'block' : 'hidden'} closeModal={handleModalClose}>
                        <div className="mb-8">
                            {calendarTileActions(timepicker.pickerDate)}
                        </div>
                        {division !== 'daily' &&
                        <>
                            <input type="hidden" name="calendar_special[]" value={timepicker.day} />
                            <TimeSelects timepicker={timepicker} timepickers={timepickers} division={division}
                                    min={min}
                                    setTimepickers={setTimepickers}/>
                        </>}
                    </Modal>
                ))}
            </div>
        </>
    )
}

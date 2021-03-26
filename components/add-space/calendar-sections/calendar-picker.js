import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSelects from "../../elements/time-selects";
import {format} from 'date-fns';
import usePrevious from "../../../utils/usePrevious";
import Modal from "../../elements/modal";
import FormButton from "../../elements/form-button";
import FormSectionHeading from "../../elements/form-section-heading";

export default function CalendarPicker({division, min, max}) {
    const prevProps = usePrevious({division, min, max});
    const [unavailable, setUnavailable] = useState([]);
    const [timepickers, setTimepickers] = useState([]);

    function handleAvailabilityClick(date) {
        const unavailableDates = [...unavailable];
        const dateFound = unavailableDates.indexOf(date);
        
        if (dateFound > -1) {

            unavailableDates.splice(dateFound, 1);

        } else {

            unavailableDates.push(date);

            const checkedDatesList = [...timepickers];
            const foundDay = timepickers.findIndex(item => item.pickerDate === date);

            if (foundDay > -1) {
                checkedDatesList.splice(foundDay, 1);
            }

            setTimepickers(checkedDatesList);
        }

        setUnavailable(unavailableDates);

    }

 
    function handleDateClick(date) {
        const checkedDatesList = [...timepickers];
        const foundDay = timepickers.findIndex(item => item.pickerDate === date);

        checkedDatesList.forEach((item) => {
            item.active = false;
        });

        if (foundDay > -1) {
            checkedDatesList[foundDay].active = true;
        } else {
            checkedDatesList.push({active: true, day: format(date, 'Y-MM-dd'), pickerDate: date, count: 0, starts: [{selected: 0}], ends: [{selected: min}]})
        }

        setTimepickers(checkedDatesList);
    }

    function enableSpecialTimepicker(date) {
        
        const checkedDatesList = [...timepickers];
        const foundDay = timepickers.findIndex(item => item.pickerDate === date);

        if (foundDay > -1) {
            checkedDatesList[foundDay].count = 1;
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
        if (prevProps !== undefined && (prevProps.division !== division || prevProps.min !== min || prevProps.max !== max)) {
            setTimepickers([]);
        }
    }, [division, min, max]);

    return (
        <>
            <div className="calendar-picker relative">
                <FormSectionHeading>{division === 'daily' ? 'Set unavailable days' : 'Set unavailable and special days'}</FormSectionHeading>

                <div className="calendar-picker__main">
                    <Calendar
                        id="lang-switcher"
                        onChange={(date) => {
                            const dateStart = date.setHours(0,0,0,0);

                            if(division === 'daily') {
                                handleAvailabilityClick(dateStart);
                            } else {
                                handleDateClick(dateStart)
                            }

                        }}
                        minDate={new Date()}
                        view="month"
                        tileClassName={({date}) => {
                            const dateStart = date.setHours(0,0,0,0);
                            const tileClasses = [];

                            if(dateStart < new Date().setHours(0, 0, 0, 0)) {
                                tileClasses.push('expired');
                            }

                            if(unavailable.includes(dateStart)) {
                                tileClasses.push('unavailable');
                            }

                            const foundIndex = timepickers.findIndex(item => item.pickerDate === dateStart);

                            if(foundIndex !== -1 && timepickers[foundIndex].count) {
                                tileClasses.push('active');
                            }

                            return tileClasses;
                        }}
                    />
                </div>
                
                {timepickers.map((timepicker, i) => (
                    <Modal key={i} className={timepicker.active ? 'block' : 'hidden'} closeModal={handleModalClose}>
                        <div className="mb-5">
                            <FormButton
                                type="button"
                                classNames={`w-full btn ${!unavailable.includes(timepicker.pickerDate) && 'btn--danger'}`}
                                onClick={() => handleAvailabilityClick(timepicker.pickerDate)}>

                                {!unavailable.includes(timepicker.pickerDate) && <>
                                Set date as unavailable
                                </>}

                                {unavailable.includes(timepicker.pickerDate) && <>
                                Set date as available
                                </>}

                            </FormButton>
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

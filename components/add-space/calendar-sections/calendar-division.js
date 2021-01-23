import {useEffect, useState} from 'react';
import getIntervalRange from "../../../utils/getIntervalRange";

export default function CalendarDivision(props) {

    const [selectedDivision, setSelectedDivision] = useState('daily');
    const [selectedMinInterval, setSelectedMinInterval] = useState(null);
    const [selectedMaxInterval, setSelectedMaxInterval] = useState(null);
    const [minIntervals, setMinIntervals] = useState(getIntervalRange(86400, 2678400, 86400));
    const [maxIntervals, setMaxIntervals] = useState(getIntervalRange(86400, 2678400));

    const divisions = [
        {
            label: 'Daily',
            value: 'daily',
        },
        {
            label: 'Hourly',
            value: 'hourly'
        },
        {
            label: 'Every 30 minutes',
            value: '30-min'
        },
        {
            label: 'Every 15 minutes',
            value: '15-min'
        },
        {
            label: 'Every 10 minutes',
            value: '10-min'
        }
    ];

    function updateIntervals(division, minValue, maxValue) {

        switch (division) {
            case 'daily':
                setMinIntervals(getIntervalRange(86400, 2678400, maxValue || 86400, 'min'));
                setMaxIntervals(getIntervalRange(86400, 2678400, minValue, 'max'));
                break;
            case 'hourly':
                setMinIntervals(getIntervalRange(3600, 86400, maxValue || 3600, 'min'));
                setMaxIntervals(getIntervalRange(3600, 86400, minValue, 'max'));
                break;
            case '30-min':
                setMinIntervals(getIntervalRange(1800, 86400, maxValue || 1800, 'min'));
                setMaxIntervals(getIntervalRange(1800, 86400, minValue, 'max'));
                break;
            case '15-min':
                setMinIntervals(getIntervalRange(900, 86400, maxValue || 900, 'min'));
                setMaxIntervals(getIntervalRange(900, 86400, minValue, 'max'));
                break;
            case '10-min':
                setMinIntervals(getIntervalRange(600, 86400, maxValue || 600, 'min'));
                setMaxIntervals(getIntervalRange(600, 86400, minValue, 'max'));
                break;
            default:
                setMinIntervals(getIntervalRange(86400, 2678400, maxValue || 86400, 'min'));
                setMaxIntervals(getIntervalRange(86400, 2678400, minValue, 'max'));
                break;
        }
    }

    function handleDivision(e) {
        setSelectedDivision(e.target.value);
        setSelectedMinInterval('');
        setSelectedMaxInterval('');
        updateIntervals(e.target.value);

        props.updateDivision(e.target.value);
    }

    function handleInterval(e) {
        if(e.target.dataset.interval === 'min') {
            setSelectedMinInterval(e.target.value);
            updateIntervals(selectedDivision, e.target.value, selectedMaxInterval);
        } else {
            setSelectedMaxInterval(e.target.value);
            updateIntervals(selectedDivision, selectedMinInterval, e.target.value);
        }
    }


    return (
        <>
            <div className="mb-8">
                <h3 className="text-2xl block mb-8">Now for a few basic settings...</h3>
                <label htmlFor="bookingDivision" className="mb-2 block">How frequently can slots be booked?</label>
                <select name="booking_division" id="bookingDivision" className="block"
                        onChange={(e) => handleDivision(e)} value={selectedDivision || ''}>
                    {
                        divisions.map((division, i) => (
                            <option key={i} value={division.value}>{division.label}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex flex-wrap -mx-4">
                <div className="px-4">
                    <label htmlFor="bookingMinimum" className="mb-2 block">What is the maximum time that can be
                        booked?</label>
                    <select name="booking_minimum" id="bookingMinimum" className="block"
                            onChange={(e) => handleInterval(e)} data-interval="max" value={selectedMaxInterval || ''}>
                        {
                            maxIntervals.map((interval, i) => (
                                <option key={i} disabled={interval.disabled}
                                        value={interval.value}>{interval.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="px-4">
                    <label htmlFor="bookingMinimum" className="mb-2 block">What is the minimum time that can be
                        booked?</label>
                    <select name="booking_minimum" id="bookingMinimum" className="block"
                            onChange={(e) => handleInterval(e)} data-interval="min" value={selectedMinInterval || ''}>
                        {
                            minIntervals.map((interval, i) => (
                                <option key={i} disabled={interval.disabled}
                                        value={interval.value}>{interval.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );

}

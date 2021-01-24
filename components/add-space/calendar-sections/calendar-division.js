import {useEffect, useState} from 'react';
import getIntervalRange from "../../../utils/getIntervalRange";

export default function CalendarDivision(props) {

    const [selectedDivision, setSelectedDivision] = useState('daily');
    const [selectedMinInterval, setSelectedMinInterval] = useState({value: null, index: 0});
    const [selectedMaxInterval, setSelectedMaxInterval] = useState({value: null, index: 0});
    const [minIntervals, setMinIntervals] = useState(getIntervalRange(86400, 2678400, 86400, 'min', 'daily'));
    const [maxIntervals, setMaxIntervals] = useState(getIntervalRange(86400, 2678400, 86400, 'max', 'daily'));

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
                setMinIntervals(getIntervalRange(86400, 2678400, maxValue || 86400, 'min', division));
                setMaxIntervals(getIntervalRange(86400, 2678400, minValue, 'max', division));
                break;
            case 'hourly':
                setMinIntervals(getIntervalRange(3600, 86400, maxValue || 3600, 'min', division));
                setMaxIntervals(getIntervalRange(3600, 86400, minValue, 'max', division));
                break;
            case '30-min':
                setMinIntervals(getIntervalRange(1800, 86400, maxValue || 1800, 'min', division));
                setMaxIntervals(getIntervalRange(1800, 86400, minValue, 'max', division));
                break;
            case '15-min':
                setMinIntervals(getIntervalRange(900, 86400, maxValue || 900, 'min', division));
                setMaxIntervals(getIntervalRange(900, 86400, minValue, 'max', division));
                break;
            case '10-min':
                setMinIntervals(getIntervalRange(600, 86400, maxValue || 600, 'min', division));
                setMaxIntervals(getIntervalRange(600, 86400, minValue, 'max', division));
                break;
            default:
                setMinIntervals(getIntervalRange(86400, 2678400, maxValue || 86400, 'min', division));
                setMaxIntervals(getIntervalRange(86400, 2678400, minValue, 'max', division));
                break;
        }
    }

    function handleDivision(e) {
        setSelectedDivision(e.target.value);
        setSelectedMinInterval({value: null, index: 0});
        setSelectedMaxInterval({value: null, index: 0});
        updateIntervals(e.target.value);

        props.updateDivision(e.target.value, 0, 0);
    }

    function handleInterval(e) {
        if(e.target.dataset.interval === 'min') {
            setSelectedMinInterval({value: e.target.value, index: e.target.selectedIndex});
            updateIntervals(selectedDivision, e.target.value, selectedMaxInterval.value);

            props.updateDivision(selectedDivision, e.target.selectedIndex, selectedMaxInterval.index);
        } else {
            setSelectedMaxInterval({value: e.target.value, index: e.target.selectedIndex});
            updateIntervals(selectedDivision, selectedMinInterval.value, e.target.value);

            props.updateDivision(selectedDivision, selectedMinInterval.index, e.target.selectedIndex);
        }
    }


    return (
        <>
            <div className="mb-12">
                <h3 className="text-lg font-medium block mb-20">Now for a few basic settings...</h3>
                <label htmlFor="bookingDivision" className="block">How frequently can slots be booked?</label>
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
                <div className="px-4 flex-1">
                    <label htmlFor="bookingMaximum" className="block">What is the maximum time that can be
                        booked?</label>
                    <select name="booking_maximum" id="bookingMaximum" className="block"
                            onChange={(e) => handleInterval(e)} data-interval="max" value={selectedMaxInterval.value || ''}>
                        {
                            maxIntervals.map((interval, i) => (
                                <option key={i} disabled={interval.disabled}
                                        value={interval.value}>{interval.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="px-4 flex-1">
                    <label htmlFor="bookingMinimum" className="block">What is the minimum time that can be
                        booked?</label>
                    <select name="booking_minimum" id="bookingMinimum" className="block"
                            onChange={(e) => handleInterval(e)} data-interval="min" value={selectedMinInterval.value || ''}>
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

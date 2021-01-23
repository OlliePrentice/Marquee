import {formatDuration, intervalToDuration} from 'date-fns';

export default function getIntervalRange(interval, max, selectedValue, type = 'min') {
    const range = [];
    for (let i = interval; i <= max; i += interval) {
        let disabled = false;
        if(selectedValue) disabled = type === 'min' ? selectedValue < i : selectedValue > i;
        range.push(
            {
                label: formatDuration(intervalToDuration({start: 0, end: i * 1000})),
                value: i,
                disabled: disabled
            }
        );

    }

    return range;
}

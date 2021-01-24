import {formatDuration, intervalToDuration} from 'date-fns';

export default function getIntervalRange(interval, max, selectedValue, type = 'min', division) {
    const range = [];
    for (let i = interval; i <= max; i += interval) {
        let disabled = false;
        if(selectedValue) disabled = type === 'min' ? selectedValue < i : selectedValue > i;
        let label = division === 'daily' ? i / 60 / 60 / 24 : formatDuration(intervalToDuration({start: 0, end: (i * 1000)}));

        if( division === 'daily') {
            if (label === 1) {
                label += ' day';
            } else {
                label += ' days';
            }
        }

        range.push(
            {
                label: label,
                value: i,
                disabled: disabled
            }
        );

    }

    return range;
}

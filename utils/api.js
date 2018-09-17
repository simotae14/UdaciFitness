import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';

// fetch the calendar data
export function fetchCalendarResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults);
}

// first function to submit a entry
export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }));
}

// second function to submit a entry
export function removeEntry(key) {
    // get the value from the local storage
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            // retrieve the data and parsering it
            const data =  JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
        });
}

import {Selector} from "testcafe";

export const getCurrStagesSelector = () =>
    Selector('#root')
        .child(1)
        .child(0)
        .child(0)
        .child(1)
        .child(0)
        .child(2)
        .child(0)
        .child(0)
        .child(0)
        .child(0)
        .child(0)

export const getStagesToSetSelector = () =>
    Selector('#root')
        .child(1)
        .child(0)
        .child(0)
        .child(1)
        .child(0)
        .child(2)
        .child(0)
        .child(0)
        .child(2)
        .child(0)
        .child(0)


export const getStartDateSelector = () =>
    Selector('.MuiCardContent-root')
        .filter((el, _) => el.textContent.includes('Start Of Process'))

export const getEndDateSelector = () =>
    Selector('.MuiCardContent-root')
        .filter((el, _) => el.textContent.includes('End Of Process'))


export const getMonthDaySelector = day =>
    Selector(".MuiPickersCalendar-transitionContainer")
        .find('button')
        .withText(day)


export const getDateSubmitSelector = selector =>
    selector.parent().parent().parent().parent().child('button')

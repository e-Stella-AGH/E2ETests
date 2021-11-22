import {Selector} from "testcafe";
import {openOfferAsHr} from "../offers/utils";
import {
    getCurrStagesSelector,
    getEndDateSelector,
    getMonthDaySelector,
    getStagesToSetSelector,
    getStartDateSelector
} from "./selectors";


async function setStages({t, stages}) {
    const currStagesSelector = getCurrStagesSelector()
    const n = await currStagesSelector
        .childElementCount

    for (let i = 0; i < n; i++) {
        let stage = await currStagesSelector.child(i).textContent
        if (stages.includes(stage)) {
            stages.splice(stages.indexOf(stage), 1)
        }
    }

    for (let stage of stages) {
        const target = await getCurrStagesSelector().child(-1)
        await t
            .dragToElement(getStagesToSetSelector().child(div => div.textContent === stage, {stage}), target)
            .click(Selector('button').withText("OK"))
    }
}

async function pickDate(t, date, selector) {
    await t
        .click(selector.find('svg'))
        .click(getMonthDaySelector(date)).click(Selector('button').withText('OK'))
        .click(selector
            .find('button')
            .withText('SCHEDULE'))
        .click(Selector('button').withText('OK'))
}

export const startProcess = async ({
                                       t,
                                       offerName,
                                       startDate,
                                       endDate,
                                       stages = ['APPLIED', 'HR_INTERVIEW', 'TECHNICAL_INTERVIEW', 'TASK', 'ENDED']
                                   }) => {
    await openOfferAsHr({t, offerName})
    await t
        .click(Selector('button').withText('OFFER MENU'))
        .click(Selector('button').withText('EDIT PROCESS'))
    await setStages({t, stages});

    endDate && await pickDate(t, endDate, getEndDateSelector())

    if (startDate) {
        await pickDate(t, startDate, getStartDateSelector())
        await t.click(Selector('button').withText('OK'))
    } else {
        await t
            .click(Selector('button').withText('START '))
            .click(Selector('button').withText('OK'))
            .click(Selector('button').withText('OK'))
    }
}
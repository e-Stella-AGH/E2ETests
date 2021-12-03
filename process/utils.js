import {Selector} from "testcafe";
import {openOfferAsHr} from "../offers/utils";
import {
    getCurrStagesSelector,
    getEndDateSelector,
    getMonthDaySelector,
    getStagesToSetSelector,
    getStartDateSelector
} from "./selectors";
import {acceptSelector, nextSelector} from "../common/utils";


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
                                       stages = ['HR_INTERVIEW', 'TECHNICAL_INTERVIEW', 'TASK']
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

export const openApplication = async ({ t, firstName, lastName }) => {
    await t
        .click(Selector('button').withText('APPLICATIONS MENU'))
        .click(Selector('button').withText('APPLICATIONS'))
        .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${firstName} ${lastName}`), {firstName, lastName}))
}

export const planMeeting = async ({t, hosts, duration, hr = false}) => {
    await t
        .click('svg')
    if (hr) {
        for (let host of hosts) {
            await t
                .click(Selector('input'))
                .click(Selector('li').withAttribute('data-value', host))
        }
    } else {
        for (let host of hosts) {
            await t
                .typeText(Selector('input'), host)
                .click(Selector('.swal2-popup').find('svg'))
        }
    }


    await t
        .click(nextSelector())
        .click(nextSelector())
        .typeText(Selector('input'), duration)
        .click(nextSelector())
        .click(acceptSelector())
}


export const addNewTask = async ({ t, description, tests, timeLimit }) => {
    await t.click(Selector(".MuiList-root").filter((el, _) => el.textContent === ""))
        .click(Selector(".MuiRadio-root").filter((_, idx) => idx === 1))
        .typeText("textarea", description)
        .click(Selector("button").withText("NEXT"))
        .click(Selector(".MuiRadio-root").filter((_, idx) => idx === 0))
    await tests.forEach(async test => {
        await t
            .typeText(Selector("input").filter((_, idx) => idx === 0), test.input)
            .typeText(Selector("input").filter((_, idx) => idx === 1), test.output)
            .click(Selector(".swal2-popup").find("svg"))
    })
    await t
        .click(Selector("button").withText("NEXT"))
        .typeText("input", timeLimit)
        .click(Selector("button").withText("NEXT"))
}

export const solveTask = async ({ t, code }) => {
    await t
        .click(Selector('button').withText('START'))
        .click(Selector('button').withText('OK'))
        .click(Selector('button').withText('TAKE CONTROL'))
        .typeText('.monaco-mouse-cursor-text', code)
        .click(Selector('button').withText("SUBMIT"))
}
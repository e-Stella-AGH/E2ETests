import { Selector } from "testcafe";
import { MailSlurp } from "mailslurp-client";
import {loginAsHr, logout} from "../auth/logins";
import {addOffer, applyForOffer, openOfferAsHr} from "../offers/utils";
import {openApplication, planMeeting, startProcess, addNewTask, solveTask} from "./utils";
import {
    getGuestEmailAddress,
    getHostAEmailAddress,
    getHostBEmailAddress,
    getNextMail
} from "../common/mailUtils";
import {acceptSelector, addNote, buttonSelector, nextSelector, refresh} from "../common/utils";
import {
    addTimeSlotsHostA,
    addTimeSlotsHostB,
    guestInterviewInvitationBody,
    hostInterviewInvitationBody,
    pickTimeSlotBody
} from "../common/mailTexts";

let hostAUrl, hostBUrl, guestUrl, hostAMailAddress, hostBMailAddress, guestMailAddress, hostAMail, hostBMail, guestMail, password;
const mainUrl = 'http://localhost:3000/MainFrontApp/#/'
// const mainUrl = 'https://e-stella-agh.github.io/MainFrontApp/#/'
const offerName = "Sample offer from tests"
const name = process.env.NAME || 'name'
const lastName = process.env.SURNAME || 'lastName'


// fixture `E-Stella`
//     .page `${mainUrl}`;


// test("Should be able to start recruitment process", async t => {
//     const offerName = "Sample offer from tests"
//
//     await loginAsHr({ t })
//
//     await t
//         .click(Selector('.MuiAvatar-root'))
//         .click(Selector('.MuiListItem-root').withText('Create offer'))
//
//     await addOffer({ t, name: offerName })
//     await startProcess({ t, offerName })
//     await logout(t)
// })
//
//
// test("Should be able to apply for offer with no user", async t => {
//
//     // const emailAddress = await getGuestEmailAddress()
//     // guestMailAddress = await getGuestEmailAddress()
//     guestMailAddress = "trosiek@student.agh.edu.pl"
//
//     await t.click(Selector('.MuiPaper-root').withText(offerName))
//
//     await applyForOffer({ t, firstName: name, lastName: lastName, email: guestMailAddress})
//
//     // const mail = await getNextMail(emailAddress)
//     // await t.expect(mail.headers.Subject).eql('Your application has been received!')
// })

// test("Should be able to schedule a meeting", async t => {
//     const offerName = "Sample offer from tests"
//
//
//     // hostAMailAddress = await getHostAEmailAddress()
//     hostAMailAddress = "tomek@chromat.pl"
//     // hostBMailAddress = await getHostBEmailAddress()
//     hostBMailAddress = "trosiek4@gmail.com"
//
//     await loginAsHr({ t })
//     await openOfferAsHr({ t, offerName })
//     await openApplication({ t, firstName: name, lastName })
//     await t
//         .click(nextSelector())
//         .click(acceptSelector())
//         .click(buttonSelector('PLAN MEETING'))
//         .click(acceptSelector())
//     await planMeeting({t, hosts: [hostAMailAddress, hostBMailAddress], duration: '10'})
//
//     // hostAMail = await getNextMail(hostAMailAddress)
//     // hostBMail = await getNextMail(hostBMailAddress)
//     // guestMail = await getNextMail(guestMailAddress)
//
//     /*
//         get emails for all
//      */
//     hostAUrl = addMoreSlotsBody.split("link: ")[1].split('.')[0].trim()
//     hostBUrl = addMoreSlotsBody.split("link: ")[1].split('.')[0].trim()
//     guestUrl = pickTimeSlotBody.split("link: ")[1].trim()
//
//     await logout(t)
//
// })

hostAUrl = addTimeSlotsHostA.split("link: ")[1].split('.')[0].trim()
hostBUrl = addTimeSlotsHostB.split("link: ")[1].split('.')[0].trim()
guestUrl = pickTimeSlotBody.split("link: ")[1].trim()

// fixture `E-Stella`
//     .page `${hostAUrl}`;
//
// test("Should choose two time ranges", async t => {
//
//     // pick date range (up top and down bottom) - DEV
//     const daySelector = Selector('.rbc-time-content').child(-1)
//
//     await t
//         .click(acceptSelector())
//         .drag(daySelector.child(2), 0, 40)
//         .click(acceptSelector())
//         .click(acceptSelector())
//         .drag(daySelector.child(8), 0, 100)
//         .click(acceptSelector())
//         .click(acceptSelector())
// })
//
// fixture `E-Stella`
//     .page `${hostBUrl}`;
//
// test("Should choose one time range", async t => {
//     const daySelector = Selector('.rbc-time-content').child(-1)
//
//     await t
//         .click(acceptSelector())
//         .drag(daySelector.child(4), 0, 300)
//         .click(acceptSelector())
//         .click(acceptSelector())
// })
//
// fixture `E-Stella`
//     .page `${guestUrl}`;
//
// test("Should be able to pick first date", async t => {
//     // pick first date
//     await t
//         .click(acceptSelector())
//         .doubleClick(Selector('.rbc-event-content').withText('Double click'))
//         .click(acceptSelector())
//         .click(acceptSelector())
//
//
//     // hostAMail = await getNextMail(hostAMailAddress)
//     // hostBMail = await getNextMail(hostBMailAddress)
//     // guestMail = await getNextMail(guestMailAddress)
//
//
// })
hostAUrl = hostInterviewInvitationBody.split("place at ")[1].split(" ")[0].trim()
hostBUrl = hostInterviewInvitationBody.split("place at ")[1].split(" ")[0].trim()
guestUrl = guestInterviewInvitationBody.split("place at ")[1].split(" ")[0].trim()
fixture `E-Stella`
    .page `${hostAUrl}`;

test("Should attend the meeting as HR and add note", async t => {
    // AT THE MEETING
    await t
        .typeText(Selector('input[name=login]'), "principus@roma.com")
        .typeText(Selector('input[name=password]'), "a")
        .click(Selector('button[type=submit]').withText('LOGIN'))
        .click(Selector('button').withText('OK'))


    await addNote({t, tags: ["interview", "hr", "minus"], note: "didn't show up"})
})

// fixture `E-Stella`
//     .page `${mainUrl}`;
//
// test("Should plan technical interview", async t => {
//
//     // PLAN THE DEV MEETING
//
//     await loginAsHr({t})
//     await openOfferAsHr({t, offerName})
//     await t
//         .click(Selector('button').withText('APPLICATIONS MENU'))
//         .click(Selector('button').withText('APPLICATIONS'))
//         .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {
//             name,
//             lastName
//         }))
//         .click(Selector('button').withText('NEXT STAGE'))
//         .typeText("input", `${hostAMailAddress},${hostBMailAddress}`)
//         .click(Selector('button').withText('OK'))
//         .click(Selector('button').withText('OK'))
//         .click(Selector('button').withText('PLAN MEETING'))
//         .click(Selector('button').withText('OK'))
//         .click('svg')
//         .click(Selector('button').withText('Next'))
//         .click(Selector('button').withText('Next'))
//         .typeText(Selector('input'), duration)
//         .click(Selector('button').withText('Next'))
//         .click(Selector('button').withText('OK'))
//
//     // HOSTS SHOULD GET AN EMAIL
//     // GUEST SHOULD GET AN EMAIL
// })
//
// test("Should assign dev to set tasks", async t => {
//
//     await openOfferAsHr({t, offerName})
//     await t
//         .click(Selector('button').withText('APPLICATIONS MENU'))
//         .click(Selector('button').withText('APPLICATIONS'))
//         .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {
//             name,
//             lastName
//         }))
//         .click(Selector('button').withText('NEXT STAGE'))
//         .typeText("input", `${hostAMailAddress}`)
//         .click(Selector('button').withText('OK'))
//         .click(Selector('button').withText('OK'))
//
//     await logout(t)
//
//     hostAMail = await getNextMail(hostAMailAddress)
//
//     hostAUrl = taskAssignReqBody.split("at: ")[1].split(".")[0].trim()
//     password = taskAssignReqBody.split("is: ")[1].split("\n")[0].trim()
// })
//
// fixture `E-Stella`
//     .page `${hostAUrl}`;
//
// test("Should assign tasks", async t => {
//
//     // AS DEV
//     await t.typeText("input", password).click(Selector("button").withText("GO!"))
//
//     //ADD TASK
//     await addNewTask({t, description, tests, timeLimit});
//
//     await t
//         .click(Selector(".MuiListItem-button").withText("Assign Task"))
//         .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {
//             name,
//             lastName
//         }))
//
//     await addNote(t, ["dev", "cv", "plus"], "Nice cv")
//
//     await t
//         .click(Selector('button').withText("ASSIGN TASK"))
//         .click(Selector("li").find("svg"))
//         .click(Selector('button').withText("ASSIGN"))
//     await accept(t)
//     await t.click(Selector('button').withText('JOB DONE!'))
//
//
//     guestMail = await getNextMail(guestMailAddress)
//     guestUrl = taskAssignedBody.split('at: ')[1].split('.')[0].trim()
// })
//
// fixture `E-Stella`
//     .page `${guestUrl}`;
//
// test("Should attempt to solve a task", async t => {
//
//     //AT TASK
//     await solveTask({t, code})
//     await refresh()
//
//
//     hostAMail = await getNextMail(hostAMailAddress)
//     hostAUrl = taskAssignedBody.split('at: ')[1].split('.')[0].trim()
// })
//
// fixture `E-Stella`
//     .page `${hostAUrl}`;
//
// test("Should review the task", async t => {
//     //AS DEV
//     await addNote(t, ["dev", "task", "minus"], "not fancy")
//     await addNote(t, ["dev", "task", "neutral"], "python")
// })
//
// fixture `E-Stella`
//     .page `${mainUrl}`;
//
// test("Should accept the candidate", async t => {
//
//     //AS HR
//     await loginAsHr({t, login, password})
//     await openOfferAsHr({t, offerName})
//     await t
//         .click(Selector('button').withText('APPLICATIONS MENU'))
//         .click(Selector('button').withText('APPLICATIONS'))
//         .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {name, lastName}))
//         .click(Selector('button').withText('ACCEPT CANDIDATE'))
//         .click(Selector('button').withText('OK'))
// })



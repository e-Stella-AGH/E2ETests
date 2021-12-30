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


let hostAUrl, hostBUrl, guestUrl, hostAMailAddress, hostBMailAddress, guestMailAddress, hostAMail, hostBMail, guestMail, password;
const mainUrl = 'https://e-stella-agh.github.io/MainFrontApp/#/'
const offerName = "Sample offer for E2E presentation"
const code = 'n = input()\nprint(n)'
const name = 'Jerzy'
const lastName = 'Kiler'

fixture `E-Stella`
    .page `${mainUrl}`;

test("Should be able to add hr partners", async t => {
    await loginAsHr({t, login: process.env.ORG_LOGIN})
    hostAMailAddress = await getHostAEmailAddress()
    hostBMailAddress = await getHostBEmailAddress()
    await t
            .click(Selector('.MuiAvatar-root'))
            .click(Selector('.MuiListItem-root').withText("Company's partners"))
        .typeText(Selector('input'), "HostA")
        .typeText(Selector('input').filter((_, idx) => idx === 1), "surname1")
        .typeText(Selector('input').filter((_, idx) => idx === 2), hostAMailAddress)
        .click(buttonSelector('ADD'))
        .click(acceptSelector())
        .typeText(Selector('input'), "HostB")
        .typeText(Selector('input').filter((_, idx) => idx === 1), "surname2")
        .typeText(Selector('input').filter((_, idx) => idx === 2), hostBMailAddress)
        .click(buttonSelector('ADD'))
        .click(acceptSelector())

    await getNextMail(hostAMailAddress)
    await getNextMail(hostBMailAddress)

    await logout(t)
})


test("Should be able to start recruitment process", async t => {
    await loginAsHr({ t })

    await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('Create offer'))

    await addOffer({ t, name: offerName })
    await startProcess({ t, offerName })
    await logout(t)
})


test("Should be able to apply for offer with no user", async t => {
    guestMailAddress = await getGuestEmailAddress()

    await t.click(Selector('.MuiPaper-root').withText(offerName))

    await applyForOffer({ t, firstName: name, lastName: lastName, email: guestMailAddress})

     guestMail = await getNextMail(guestMailAddress)
     await t.expect(guestMail.headers.Subject).eql('Your application has been received!')
})

test("Should be able to schedule a meeting", async t => {
    hostAMailAddress = await getHostAEmailAddress()
    hostBMailAddress = await getHostBEmailAddress()

    await loginAsHr({ t })
    await openOfferAsHr({ t, offerName })
    await openApplication({ t, firstName: name, lastName })
    await addNote({t, tags: ["hr", "cv", "plus"], note: "good skills"})
    await t
        .click(nextSelector())
        .click(acceptSelector())
        .click(buttonSelector('PLAN MEETING'))
        .click(acceptSelector())
    await planMeeting({t, hosts: [hostAMailAddress, hostBMailAddress], duration: '10', hr: true})
    await logout(t)
    try {
        await getNextMail(hostAMailAddress).then(mail => {
            hostAMail = mail.body
            hostAUrl = hostAMail.split("link: ")[1].split('.\r')[0].trim()
        })

        await getNextMail(hostBMailAddress).then(mail => {
            hostBMail = mail.body
            hostBUrl = hostBMail.split("link: ")[1].split('.\r')[0].trim()
        })

        await getNextMail(guestMailAddress).then(mail => {
            guestMail = mail.body
            guestUrl = guestMail.split("link: ")[1].trim()
        })
    } catch(e) {
        console.log(e)
    }


})


test("Should choose two time ranges", async t => {
    await t.navigateTo(hostAUrl)

    // pick date range (up top and down bottom) - DEV
    const daySelector = Selector('.rbc-time-content').child(-1)

    await t
        .click(acceptSelector())
        .drag(daySelector.child(2), 0, 200)
        .click(acceptSelector())
        .click(acceptSelector())
        .drag(daySelector.child(8), 0, 100)
        .click(acceptSelector())
        .click(acceptSelector())

})


test("Should choose one time range", async t => {
    await t.navigateTo(hostBUrl)
    await t
        .click(acceptSelector())
    const daySelector = Selector('.rbc-time-content').child(-1)
    await t
        .drag(daySelector.child(4), 0, 200)
        .click(acceptSelector())
        .click(acceptSelector())
})


test("Should be able to pick first date", async t => {
    await t.navigateTo(guestUrl)
    try {
        await t
    .click(acceptSelector())
            .doubleClick(Selector('.rbc-events-container').child(0))
            .click(acceptSelector())
            .click(acceptSelector())
    } catch(e) {
        console.log(e)
    }

    await getNextMail(hostAMailAddress).then(mail => {
        hostAMail = mail.body
        hostAUrl = hostAMail.split("place at ")[1].split(" ")[0].trim()
    })

    await getNextMail(hostBMailAddress).then(mail => {
        hostBMail = mail.body
        hostBUrl = hostBMail.split("place at ")[1].split(" ")[0].trim()
    })

    await getNextMail(guestMailAddress).then(mail => {
        guestMail = mail.body
        guestUrl = guestMail.split("place at ")[1].split(" ")[0].trim()
    })
})

test("Should attend the meeting as HR and add note", async t => {
    await t.navigateTo(hostAUrl)

    // AT THE MEETING
    await t
        .typeText(Selector('input[name=login]'), "principus@roma.com")
        .typeText(Selector('input[name=password]'), "a")
        .click(Selector('button[type=submit]').withText('LOGIN'))
        .click(acceptSelector())


    await addNote({t, tags: ["interview", "hr", "minus"], note: "didn't show up"})
})

test("Should plan technical interview", async t => {
    await t.navigateTo(mainUrl)
    // PLAN THE DEV MEETING

    await loginAsHr({t})
    await openOfferAsHr({t, offerName})
    await t
        .click(buttonSelector('APPLICATIONS MENU'))
        .click(buttonSelector('APPLICATIONS'))
        .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {
            name,
            lastName
        }))
        .click(buttonSelector('NEXT STAGE'))
        .typeText("input", `${hostAMailAddress},${hostBMailAddress}`)
        .click(acceptSelector())
        .click(acceptSelector())
        .click(buttonSelector('PLAN MEETING'))
        .click(acceptSelector())
        .click('svg')
        .click(nextSelector())
        .click(nextSelector())
        .typeText(Selector('input'), '20')
        .click(nextSelector())
        .click(acceptSelector())

    try {
        // HOSTS SHOULD GET EMAILS
        await getNextMail(hostAMailAddress)
        await getNextMail(hostBMailAddress)
        // GUEST SHOULD GET AN EMAIL
        await getNextMail(guestMailAddress)
    } catch (e) {
        console.log(e)
    }

    try {
        await getNextMail(hostAMailAddress)
        await getNextMail(hostBMailAddress)
    } catch (e) {
        console.log(e)
    }

})

test("Should assign dev to set tasks", async t => {
    await loginAsHr({t})
    await openOfferAsHr({t, offerName})
    await t
        .click(buttonSelector('APPLICATIONS MENU'))
        .click(buttonSelector('APPLICATIONS'))
        .click(Selector('.MuiCardContent-root').filter(el => el.textContent.includes(`${name} ${lastName}`), {
            name,
            lastName
        }))
        .click(buttonSelector('NEXT STAGE'))
        .typeText("input", `${hostAMailAddress}`)
        .click(acceptSelector())
        .click(acceptSelector())

    await logout(t)

    await getNextMail(hostAMailAddress).then(mail => {
        hostAMail = mail.body
        hostAUrl = hostAMail.split("at: ")[1].split(".\r\n")[0].trim()
        password = hostAMail.split("is:")[1].trim().split("\n")[0].trim()
    })
})

test("Should assign tasks", async t => {
    await t.navigateTo(hostAUrl)

    // AS DEV
    await t.typeText("input", password).click(buttonSelector('GO'))

    //ADD TASK
    await addNewTask({t, description: "test task", tests: [{input: "1", output: "1"}, {input: "12", output: "12"}], timeLimit: "12"});

    await t
        .click(Selector(".MuiListItem-button").withText("Assign Task"))
        .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {
            name,
            lastName
        }).nth(-1))

    await t
        .click(buttonSelector("ASSIGN TASK"))
        .click(Selector('.MuiPaper-root.MuiCard-root').find("svg"))
        .click(buttonSelector("ASSIGN"))
        .click(acceptSelector())
    await t.doubleClick(buttonSelector('JOB DONE'))

    await t.wait(100)

    await addNote({t, tags: ["dev", "cv", "plus"], note: "Nice cv", mail: hostAMailAddress})

    await getNextMail(guestMailAddress).then(mail => {
        guestMail = mail.body
        guestUrl = guestMail.split('at: ')[1].replace(/\s+/g, '').split('.All')[0].trim()
    })
})

test("Should attempt to solve a task", async t => {
    await t.navigateTo(guestUrl)

    //AT TASK
    await solveTask({t, code})
    await t.wait(10000)
    await refresh()

    hostAMail = await getNextMail(hostAMailAddress).then(mail => {
        hostAMail = mail.body
        hostAUrl = hostAMail.split('at: ')[1].replace(/\s+/g, '').split('.Password')[0].trim()
        password = hostAMail.split("is:")[1].trim().split("\n")[0].trim()
    })
})

test("Should review the task", async t => {
    await t.navigateTo(hostAUrl)

    await t.typeText("input", password).click(buttonSelector('GO'))
    await t.wait(2000)
    //AS DEV
    await addNote({t, tags: ["dev", "task", "minus"], note: "not fancy", mail: hostAMailAddress})
})

test("Should accept the candidate", async t => {
    await t.navigateTo(mainUrl)

    //AS HR
    await loginAsHr({t})
    await openOfferAsHr({t, offerName})
    await t
        .click(buttonSelector('APPLICATIONS MENU'))
        .click(buttonSelector('APPLICATIONS'))
        .click(Selector('.MuiCardContent-root').filter((el, idx) => el.textContent.includes(`${name} ${lastName}`), {name, lastName}))
        .click(buttonSelector('ACCEPT CANDIDATE'))
        .click(buttonSelector('OK'))
})

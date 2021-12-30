import {MailSlurp} from "mailslurp-client";

let apiKey
let mailslurp
let inboxes
global.FormData = require('form-data');
require('dotenv').config();

const startServiceIfNeeded = async () => {
    if (!apiKey && !mailslurp && !inboxes) await startService()
}


async function startService() {
    apiKey = process.env.MAILSLURP_API_KEY
    mailslurp = new MailSlurp({apiKey})
    const guestInbox = await mailslurp.inboxController.getInbox({inboxId: process.env.GUEST_INBOX_ID})
    const hostAInbox = await mailslurp.inboxController.getInbox({inboxId: process.env.HOST_A_INBOX_ID})
    const hostBInbox = await mailslurp.inboxController.getInbox({inboxId: process.env.HOST_B_INBOX_ID})
    inboxes = { guestInbox, hostAInbox, hostBInbox }
}

export const getGuestEmailAddress = async () => {
    await startServiceIfNeeded();
    return inboxes.guestInbox.emailAddress
}

export const getHostAEmailAddress = async () => {
    await startServiceIfNeeded();
    return inboxes.hostAInbox.emailAddress
}

export const getHostBEmailAddress = async () => {
    await startServiceIfNeeded();
    return inboxes.hostBInbox.emailAddress
}

export const getNextMail = async (address) =>{
    await startServiceIfNeeded();
    const inbox = Object.values(inboxes).filter(inbox => inbox.emailAddress === address)[0]
    return await mailslurp.waitController.waitForLatestEmail({
        inboxId: inbox.id,
        timeout: 30000,
        unreadOnly: true
    })
}



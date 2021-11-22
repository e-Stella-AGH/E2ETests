import {MailSlurp} from "mailslurp-client";

let apiKey
let mailslurp
let inbox

async function startService() {
    apiKey = process.env.MAILSLURP_API_KEY
    mailslurp = new MailSlurp({apiKey})
    inbox = await mailslurp.inboxController.getInbox({inboxId: process.env.INBOX_ID})
}

export const getEmailAddress = async () => {
    if (!apiKey && !mailslurp && !inbox) await startService()
    return inbox.emailAddress
}

export const getNextMail = async () =>{
    if (!apiKey && !mailslurp && !inbox) await startService()
    return await mailslurp.waitController.waitForLatestEmail({
        inboxId: inbox.id,
        timeout: 30000,
        unreadOnly: true
    })
}


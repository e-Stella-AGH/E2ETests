import { Selector } from "testcafe";
import { MailSlurp } from "mailslurp-client";
import {loginAsHr, logout} from "../auth/logins";
import {addOffer, applyForOffer} from "../offers/utils";
import {startProcess} from "./utils";
import {getEmailAddress, getNextMail} from "../common/mailUtils";

fixture `E-Stella`
    .page `https://e-stella-agh.github.io/MainFrontApp/#/`;


test("Should be able to start recruitment process", async t => {
    const offerName = "Sample offer from tests"

    await loginAsHr({ t })

    await t
        .click(Selector('button').withText('OK'))
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('Create offer'))

    await addOffer({ t, name: offerName })
    await startProcess({ t, offerName })
    await logout(t)
})


test("Should be able to apply for offer with no user", async t => {

    const offerName = "Sample offer from tests"
    const emailAddress = await getEmailAddress()

    await t.click(Selector('.MuiPaper-root').withText(offerName))

    await applyForOffer({ t, firstName: "name", lastName: "lastName", email: emailAddress})

    const mail = await getNextMail()
    await t.expect(mail.headers.Subject).eql('Your application has been received!')
})
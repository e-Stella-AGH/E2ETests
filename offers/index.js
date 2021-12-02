import { Selector, Role } from 'testcafe';
import { loginAsHr } from '../auth/logins';
import { addOffer, openOfferAsHr, deleteOffer } from './utils'

fixture `E-Stella`
    .page `https://e-stella-agh.github.io/MainFrontApp/#/`;


test("Should be able to create offer as HR and then delete it", async t => {

    const offerName = "Sample offer from tests"

    await loginAsHr({ t })

    await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('Create offer'))
        
    await addOffer({ t, name: offerName })

    await openOfferAsHr({ t, offerName })

    await deleteOffer({ t, name: offerName })

    const offerExists = Selector('h5').withText(offerName).exists
    await t.expect(offerExists).notOk()

})
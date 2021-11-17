import { Selector } from 'testcafe'

const addSkill = async ({ t, name = "Sample Skill", level = "Regular" }) => {
    await t
        .typeText(Selector('div[form=skill-form] > div > input[name=name]'), name)
        .click(Selector('label').withText('Skill level'))
        .click(Selector('.MuiListItem-root').withText(level))
        .click(Selector('button').withText('ADD SKILL'))
}

export const addOffer = async ({ t, name = "Sample offer from tests", position = "Sample position from tests", localization = "Sample localization", minSalary = "1000", maxSalary = "2000", description = "It's just an offer from E2E testing, it should be deleted", skills = [{ name: 'Sample Skill', level: 'Regular' }] }) => {
    await t
        .typeText(Selector('input[name=name]'), name)
        .typeText(Selector('input[name=position]'), position)
        .typeText(Selector('input[name=localization]'), localization)
        .typeText(Selector('input[name=minSalary]'), minSalary)
        .typeText(Selector('input[name=maxSalary]'), maxSalary)
        .typeText(Selector('textarea[name=description]'), description)
    
    await Promise.all(skills.map(skill => addSkill({ t, ...skill })))
    
    await t
        .click(Selector('button').withText('SAVE OFFER'))
        .click(Selector('button').withText('OK'))
}

export const openOffer = async ({t, offerName}) => {
    await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('My offers'))
        .click(Selector('h5').withText(offerName))
}

export const deleteOffer = async ({ t }) => {
    await t
        .click(Selector('span').withText('OFFER MENU'))
        .click(Selector('p').withText('DELETE OFFER'))
        // click anywhere to hide menu
        .click(Selector('p').withText('DELETE OFFER'), { offsetX: 200 })
        //close swal - shouldn't we ask about being sure?
        .click(Selector('button').withText('Ok'))
}
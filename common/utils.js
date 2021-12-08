import {Selector, ClientFunction} from "testcafe";

export const buttonSelector = (text) => Selector('button').withText(new RegExp(text, "i"))
export const acceptSelector = buttonSelector('OK')
export const nextSelector = buttonSelector('NEXT')

export const addNote = async ({t, tags, note, mail = null}) => {
    await t
        .click(Selector(".MuiDrawer-paper").filter((el, _) => el.textContent === "").find("svg"))
        .click(Selector(".MuiDrawer-docked").find(".MuiGrid-root.MuiGrid-container").find("svg"))
        .typeText(Selector('.MuiDrawer-docked').find('.rc-md-editor'), note)
    for await (const tag of tags) {
        await t
            .typeText(Selector(".MuiDrawer-docked").find(".MuiCard-root.MuiCard-root").find("input"), tag)
            .click(Selector(".MuiDrawer-docked").find(".MuiCard-root.MuiCard-root").find('button').withText(''))
    }
    await t
        .click(buttonSelector('ADD'))

        if (mail) {
            await t.typeText(Selector('.swal2-popup').find('input'), mail)
                .click(acceptSelector())
        }
        await t.click(acceptSelector())
}

export const refresh = async() => {
    await ClientFunction(() => {
        document.location.reload();
    })();
}

export const changeUrl = (url, oldBase, newBase) => {
    return url.replace(oldBase, newBase)
}

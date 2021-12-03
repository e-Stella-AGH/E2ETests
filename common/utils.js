import {Selector, ClientFunction} from "testcafe";

export const buttonSelector = (text) => Selector('button').withText(new RegExp(text, "i"))
export const acceptSelector = buttonSelector('OK')
export const nextSelector = buttonSelector('NEXT')

export const addNote = async ({t, tags, note}) => {
    await t
        .click(Selector(".MuiDrawer-paper").filter((el, _) => el.textContent === "").find("svg"))
        .click(Selector(".MuiGrid-root.MuiGrid-container").find("svg"))
    for (let tag of tags) {
        await t
            .typeText(Selector(".MuiCard-root.MuiCard-root").find("input"), tag)
            .click(Selector(".MuiCard-root.MuiCard-root").find('button').withText(''))
    }
    try {
        await t
            .typeText(Selector(".MuiCard-root.MuiCard-root").find('textarea'), note)
            .click(Selector("button").withText("ADD"))
            .click(acceptSelector(t))
    } catch (e) {
        console.log(e)
    }

}

export const refresh = async() => {
    await ClientFunction(() => {
        document.location.reload();
    })();
}

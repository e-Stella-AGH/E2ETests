import { Selector } from 'testcafe'
require('dotenv').config()

export const logout = async t => {
    await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('Logout'))
}

export const loginAsHr = async ({t, login="principus@roma.com", password="a"}) => {
    await t
        .click(Selector('#loginButton').withText('LOGIN'))
        .typeText(Selector('input[name=login]'), login)
        .typeText(Selector('input[name=password]'), password)
        .click(Selector('button[type=submit]').withText('LOGIN'))
}

export const registerJobSeeker = async ({t, login = process.env.USER_MAIL, password = process.env.USER_PASSWORD, name = process.env.USER_NAME || 'name', surname = process.env.USER_SURNAME || 'surname'}) => {

    await t
        .click(Selector('button').withText('REGISTER'))
        .typeText(Selector('input[name=login]'), login)
        .typeText(Selector('input[name=password]'), password)
        .typeText(Selector('input[name=firstName]'), name)
        .typeText(Selector('input[name=lastName]'), surname)
        .click(Selector('button[type=submit]').withText('REGISTER'))

}

export const loginAsUser = async ({t, login = process.env.USER_MAIL, password = process.env.USER_PASSWORD}) => {
    await t
        .click(Selector('#loginButton').withText('LOGIN'))
        .typeText(Selector('input[name=login]'), login)
        .typeText(Selector('input[name=password]'), password)
        .click(Selector('button[type=submit]').withText('LOGIN'))
}
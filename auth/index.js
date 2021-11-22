import { Selector } from 'testcafe';
import { uuid } from 'uuidv4';
import { loginAsHr, loginAsUser, logout, registerJobSeeker } from './logins';


fixture `login tests`
    .page `https://e-stella-agh.github.io/MainFrontApp/#/`;

test("HR log in test", async t => {
    await loginAsHr({ t })

    await t.click(Selector('button').withText('OK'))

    await logout(t)

})

const randomJobSeekerLogin = `${uuid()}@interia.pl`
const randomJobSeekerPassword = uuid()

test("Register job seeker - user wasn't logged in", async t => {
    await registerJobSeeker({ t, login: randomJobSeekerLogin, password: randomJobSeekerPassword })

    await t.expect(Selector('h2').withText('Successfully registered!').exists).ok()

    await t
        .click(Selector('button').withText('Go to login page'))

    await loginAsUser({ t, login: randomJobSeekerLogin, password: randomJobSeekerPassword })

    await t.click(Selector('button').withText('OK'))

    await logout(t)
})

test("Register job seeker - user was already registered", async t => {
    await registerJobSeeker({ t, login: randomJobSeekerLogin, password: randomJobSeekerPassword })

    await t.expect(Selector('h2').withText(`We couldn't register you!`).exists).ok()

    await t
        .click(Selector('button').withText('OK'))

    
    // check if we're still on register page
    await t.expect(Selector('h5').withText('Register!').exists).ok()
})

const newRandomUserPassword = uuid()

test("Login as user - bad password", async t => {
    await loginAsUser({ t, login: randomJobSeekerLogin, password: newRandomUserPassword })
    
    await t.expect(Selector('h2').withText(`We couldn't log you in!`).exists).ok()
    await t.expect(Selector('div').withText(`Error: Invalid password`).exists).ok()

    await t
        .click(Selector('button').withText('OK'))
})


const newRandomUserName = `${uuid()}@interia.pl`

test("Login as user - user not registered", async t => {
    await loginAsUser({ t, login: newRandomUserName, password: newRandomUserPassword })

    await t.expect(Selector('h2').withText(`We couldn't log you in!`).exists).ok()
    await t.expect(Selector('div').withText(`Error: User with such email: ${newRandomUserName} not found`).exists).ok()

    await t.click(Selector('button').withText('OK'))
})

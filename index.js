import { Selector, Role } from 'testcafe';

// fixture `Getting Started`
//     .page `https://devexpress.github.io/testcafe/example/`;

// test("My first test", async t => {
//     await t
//         .typeText('#developer-name', 'Peter Parker')
//         .click('#submit-button')
//         .expect(Selector('.result-content').find('h1').innerText).eql("Thank you, Peter Parker!")
// })

const hrRole = Role('https://e-stella-agh.github.io/MainFrontApp/#/login', async t => {
    await t
        .typeText(Selector('input[name=login]'), "principus@roma.com")
        .typeText(Selector('input[name=password]'), "a")
        .click(Selector('button[type=submit]').withText('LOGIN'))
})

fixture `E-Stella`
    .page `https://e-stella-agh.github.io/MainFrontApp/#/`;

test("HR log in test", async t => {
    await t
        .click(Selector('#loginButton').withText('LOGIN'))
        .typeText(Selector('input[name=login]'), "principus@roma.com")
        .typeText(Selector('input[name=password]'), "a")
        .click(Selector('button[type=submit]').withText('LOGIN'))
        .expect(Selector('#swal2-title').innerText).eql("Successfully logged in!")
})

test("Should be able to create offer as HR", async t => {
    
})
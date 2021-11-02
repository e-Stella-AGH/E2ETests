import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `https://devexpress.github.io/testcafe/example/`;

test("My first test", async t => {
    await t
        .typeText('#developer-name', 'Peter Parker')
        .click('#submit-button')

    const articleHeader = await Selector.apply('.result-content').find('h1')
    let headerText = await articleHeader.innerText
    console.log(headerText)
})
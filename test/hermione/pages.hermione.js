describe('Страницы главная, условия доставки, контакты должны иметь статическое содержимое', async function() {

    const SCREEN_TEST_WIDTH = 1920;
    const SCREEN_TEST_HEIGHT = 1080;

    it(`сверка страницы "главная"`, async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(SCREEN_TEST_WIDTH, SCREEN_TEST_HEIGHT);

        await page.goto('http://localhost:3000/hw/store');
        await compare(browser, page);
    });

    it(`сверка страницы "условия доставки"`, async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(SCREEN_TEST_WIDTH, SCREEN_TEST_HEIGHT);

        await page.goto('http://localhost:3000/hw/store/delivery');
        await compare(browser, page);
    });

    it(`сверка страницы "контакты"`, async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(SCREEN_TEST_WIDTH, SCREEN_TEST_HEIGHT);

        await page.goto('http://localhost:3000/hw/store/contacts');
        await compare(browser, page);
    });

    async function compare(browser, page) {
        await page.waitForSelector('body', { timeout: 5000 });
        await browser.assertView('plain', 'body');
    }
});
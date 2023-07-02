describe('Вёрстка должна адаптироваться под ширину экрана', async function() {

    const screenResolutions = [
        [1920, 1080],
        [1280, 1080],
        [800, 1080],
        [575, 1080],
    ];

    for (let i = 0; i < screenResolutions.length; i++) {
        it(`cоответствие следующей ширине: ${screenResolutions[i][0]}px`, async ({ browser }) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();

            await browser.setWindowSize(screenResolutions[i][0], screenResolutions[i][1]);
            await page.goto('http://localhost:3000/hw/store/');

            await page.waitForSelector('body', { timeout: 5000 });
            await browser.assertView('plain', 'body');
        });
    }
});

describe('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {

    const SCREEN_TEST_WIDTH = 575;
    const SCREEN_TEST_HEIGHT = 1080;

    it(`ширина экрана проверки: ${SCREEN_TEST_WIDTH}px`, async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.setWindowSize(SCREEN_TEST_WIDTH, SCREEN_TEST_HEIGHT);
        await page.goto('http://localhost:3000/hw/store/');

        await page.waitForSelector('body', { timeout: 5000 });
        await browser.assertView('plain', 'body');
    });
});


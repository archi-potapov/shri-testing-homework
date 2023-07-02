import React from 'react';

import {render} from '@testing-library/react';
import events from '@testing-library/user-event';
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";

describe('Общие требования', () => {

    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async () => {

        const application = getApplicationPage('/hw/store');
        const { getByTestId } = render(application);

        const navbarList = getByTestId('navbar-list').childNodes;

        const linksArray = [
            '/hw/store/catalog',
            '/hw/store/delivery',
            '/hw/store/contacts',
            '/hw/store/cart'
        ]

        for (let i = 0; i < navbarList.length; i++) {
            expect((navbarList[i] as Element).getAttribute('href')).toBe(linksArray[i])
        }
    });

    it('название магазина в шапке должно быть ссылкой на главную страницу', async () => {

        const application = getApplicationPage('/hw/store');
        const { getByTestId } = render(application);

        const navbarStoreLink = getByTestId('navbar-store-link');
        const hrefAttribute = navbarStoreLink.getAttribute('href');

        expect(hrefAttribute).toBe('/hw/store/')
    });

    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {

        const application = getApplicationPage('/hw/store');
        const { getByTestId } = render(application);

        const navbarList = getByTestId('navbar-list').childNodes;
        const navbarWrapper = getByTestId('navbar-main');
        const navbarToggler = getByTestId('navbar-toggler');

        await events.click(navbarToggler);
        await events.click(navbarList[1] as Element);

        expect(navbarWrapper.className).toMatch(/(?<!-)collapse/gm)
    });
});

export function getApplicationPage(basename: string) {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );

    return application;
}

import React from 'react';

import {render} from '@testing-library/react';
import {getApplicationPage} from "./common.test";

describe('В магазине должны быть страницы: главная, каталог, условия доставки, контакты', () => {

    const linksArray = [
        '/hw/store',
        '/hw/store/catalog',
        '/hw/store/delivery',
        '/hw/store/contacts'
    ]

    for (let i = 0; i < linksArray.length; i++) {

        it(`тест: ${i}`, async () => {

            const application = getApplicationPage(linksArray[i]);
            const {getByTestId} = render(application);

            const applicationElement = await getByTestId('app');

            expect(applicationElement).not.toBe(null);

        });
    }
});

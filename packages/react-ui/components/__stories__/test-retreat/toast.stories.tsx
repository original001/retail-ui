import { CSFStory } from 'creevey';
import React from 'react';
import { WebDriver } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';

import { Toast } from '../../Toast'; // 2
import { Button } from '../../Button';

export default {
  title: 'TR Toast',
};

// Utils

/**
 * Ожидает, пока пройдёт указанное кол-во милисекунд
 *
 * @param driver
 * @param msTime
 */
async function sleep(driver: WebDriver, msTime: number) {
  let isDone = false;
  setTimeout(() => (isDone = true), msTime);
  await driver.wait(() => isDone, msTime);
}

export const ComplexToast: CSFStory<JSX.Element> = () => {
  function showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled'),
    });
  }

  return (
    <div style={{ height: '100px', width: '100vw' }} id="test-element-wrapper">
      <Button onClick={showComplexNotification}>Show notification</Button>
    </div>
  );
};

/**
 * ComplexToast. Тост с действиями
 *
 * 0. История showToast
 * 1. Найти контрол вызова тоста
 * 2. Клик по контролу
 * 3. 📸 тост появился
 *
 * 0. История hideToast
 * 1. Найти контрол вызова тоста
 * 2. Клик по контролу
 * 3. Тост появился
 * 4. 📸 спустя 7сек тост закрылся
 * 5. Клик по контролу
 * 6. Тост появился
 * 7. Навести мышь на тост
 * 8. 📸 спустя 7сек тост не закрылся
 *
 *  Profit!
 */

ComplexToast.story = {
  parameters: {
    creevey: {
      tests: {
        async showToast() {
          const element = await this.browser.findElement({ css: '#test-element-wrapper' });
          const toastControl = await this.browser.findElement({ css: 'button' });

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          const toastToggled = await element.takeScreenshot();

          await this.expect({ toastToggled }).to.matchImages();
        },

        async hideToast() {
          const element = await this.browser.findElement({ css: '#test-element-wrapper' });
          const toastControl = await this.browser.findElement({ css: 'button' });

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          await sleep(this.browser, 7000);

          const toastClosedTimeout = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(toastControl)
            .perform();

          const toast = await this.browser.wait(until.elementLocated({ css: '[data-tid~="ToastView__root"]' }), 3000);
          await this.browser
            .actions({ bridge: true })
            .move({ origin: toast })
            .perform();

          await sleep(this.browser, 7000);
          const toastNotClosingOnHover = await element.takeScreenshot();

          await this.expect({ toastClosedTimeout, toastNotClosingOnHover }).to.matchImages();
        },
      },
    },
  },
};

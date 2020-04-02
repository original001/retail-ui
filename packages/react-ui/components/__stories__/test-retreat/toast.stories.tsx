import { CSFStory } from 'creevey';
import React from 'react';
import { WebDriver } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';
import { action } from '@storybook/addon-actions';

import { Toast } from '../../Toast'; // 2
import { Nullable } from '../../../typings/utility-types';
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

// Фичареквест:
// В компоненте текст не может быть набран в две строки (по гайдам).
// Тем не менее, он переносится в случае, если в длинной строке есть пробелы
// Мы предлагаем обдумать это место в гайдах и в случае, когда текст не помещается в одну строку,
// обрезать его с троеточием в конце

export const LongName: CSFStory<JSX.Element> = () => (
  <Toast>
    longggggggggggggname1234512345123451234512345123451234512345123451234512345123451234512345jgjjjjjgfgfffffffffjgjfgjfgjjfjgjfgverylonggkgkkgkgkvfgkgkkgkgkg
  </Toast>
);
LongName.story = { name: 'toast with long name' };

export const ToastDissapearWhenNext: CSFStory<JSX.Element> = () => {
  let toast1: Nullable<Toast>;
  let toast2: Nullable<Toast>;

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Toast ref={el => (toast1 = el)} onClose={action('close')} onPush={action('push')} />
      <Toast ref={el => (toast2 = el)} onClose={action('close')} onPush={action('push')} />
      <div style={{ padding: '4px 200px 200px 4px' }} />
      <Button data-tid="firstButton" onClick={showToast1}>
        Show 1st toast
      </Button>
      <Button data-tid="secondButton" onClick={showToast2}>
        Show 2nd toast
      </Button>
    </div>
  );

  function showToast1() {
    if (toast1) {
      toast1.push('Toast with long name long long');
    }
  }

  function showToast2() {
    if (toast2) {
      toast2.push('Toast');
    }
  }
};

// BUG: Не выполняется требование гайдов:
// Всегда показывается только 1 тост. Перед появлением следующего тоста, текущий скрывается, даже если время его показа еще не истекло.

// 0. Кнопка 1 вызывает длинный тост. Кнопка 2 вызывает короткий тост
// 1. Найти кнопку 1. Нажать ее, запустить таймер на 1 секунду
// 2. По истечению таймера сфотографировать 1 тост
// 3. Найти кнопку 2. Нажать ее, запустить таймер на 1 сек
// 4. По истечению таймера сфотографировать 2 тост (1 пропал)

ToastDissapearWhenNext.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const button1 = await this.browser.findElement({ css: '[data-tid~=firstButton]' });
          const button2 = await this.browser.findElement({ css: '[data-tid~=secondButton]' });

          await this.browser
            .actions({ bridge: true })
            .click(button1)
            .perform();

          const toast1 = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button2)
            .perform();

          const toast2 = await element.takeScreenshot();

          await this.expect({ toast1, toast2 }).to.matchImages();
        },
      },
    },
  },
};

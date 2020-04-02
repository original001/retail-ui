import { CSFStory, CreeveyStoryParams } from 'creevey';
import React from 'react';

import { Link } from '../../Link'; // 2
import { OkIcon } from '../../../internal/icons/16px';
import { Toast } from '../../Toast';

export default { title: 'TR Link' };

export const Simple_link: CSFStory<JSX.Element> = () => <Link>Very Simple Link</Link>;
Simple_link.story = {
  parameters: {
    creevey: {
      tests: {
        async hover() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });

          // находим link
          const link = await this.browser.findElement({ css: '[data-comp-name*=Link]' });

          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          // 5. сравниваем результаты
          await this.expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

export const Link_WithOnClick: CSFStory<JSX.Element> = () => (
  <Link onClick={() => Toast.push('RUN!')}>Another Simple Link</Link>
);
Link_WithOnClick.story = {
  parameters: {
    creevey: {
      tests: {
        async hover() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });

          // находим link
          const link = await this.browser.findElement({ css: '[data-comp-name*=Link]' });

          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(link)
            .perform();

          // Находим тост
          const toast_element = await this.browser.findElement({ css: '[data-tid*=ToastView__root]' });

          // 5. делаем скриншот "при клике"
          const toast = await toast_element.takeScreenshot();

          // 6. сравниваем результаты
          await this.expect({ idle, hover, toast }).to.matchImages();
        },
      },
    },
  },
};

export const LinkDefault: CSFStory<JSX.Element> = () => {
  return <Link>Enabled</Link>;
};

export const LinkWithIcon: CSFStory<JSX.Element> = () => {
  return <Link icon={<OkIcon />}>OK</Link>;
};

export const LinkWithSpaces: CSFStory<JSX.Element> = () => {
  return <Link>Link with spaces</Link>;
};

export const LinkSuccess: CSFStory<JSX.Element> = () => {
  return <Link use="success">Link with spaces</Link>;
};

export const LinkDanger: CSFStory<JSX.Element> = () => {
  return <Link use="danger">Link with spaces</Link>;
};

export const LinkGrayed: CSFStory<JSX.Element> = () => {
  return <Link use="grayed">Link with spaces</Link>;
};

/**
 * Link
 *
 * 0. Истории Link*
 * 1. Найти элемент на странице
 * 2. Сделать скриншот дефолтного состояния
 * 3. Навести курсор на ссылку
 * 4. Сделать скриншот состояния hover
 * 5. Нажать на ссылку
 * 6. Сделать скриншот состояния pressed/mouseDown
 * 7. Отпустить ссылку
 * 8. Сделать скриншот состояния hover
 */

const linkTests: CreeveyStoryParams['tests'] = {
  async pressedThenReleased() {
    const element = await this.browser.findElement({ css: '#test-element' });
    const link = await this.browser.findElement({ css: '[data-comp-name~=Link]' });

    const idle = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .move({ origin: link })
      .perform();

    const hover = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .press()
      .perform();

    const pressed = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .release()
      .perform();

    const released = await element.takeScreenshot();

    await this.expect({ idle, hover, pressed, released }).to.matchImages();
  },
  async focused() {
    const element = await this.browser.findElement({ css: '#test-element' });

    await this.browser
      .actions({ bridge: true })
      .sendKeys(this.keys.TAB)
      .perform();

    const focused = await element.takeScreenshot();

    await this.expect({ focused }).to.matchImages();
  },
};

LinkDefault.story = { parameters: { creevey: { tests: linkTests } } };

LinkWithIcon.story = { parameters: { creevey: { tests: linkTests } } };

LinkWithSpaces.story = { parameters: { creevey: { tests: linkTests } } };

LinkSuccess.story = { parameters: { creevey: { tests: linkTests } } };

LinkDanger.story = { parameters: { creevey: { tests: linkTests } } };

LinkGrayed.story = { parameters: { creevey: { tests: linkTests } } };

/**
 * Link
 *
 * 0. История LinkDisabled
 * 1. Найти элемент на странице
 * 2. Сделать скриншот задизабленного состояния
 * 3. Навести курсор на ссылку
 * 4. Сделать скриншот состояния hover
 */

export const LinkDisabled: CSFStory<JSX.Element> = () => {
  return <Link disabled={true}>Disabled</Link>;
};

LinkDisabled.story = {
  parameters: {
    creevey: {
      tests: {
        async hover() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const link = await this.browser.findElement({ css: '[data-comp-name~=Link]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          const hover = await element.takeScreenshot();

          await this.expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

export const BasicLink: CSFStory<JSX.Element> = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Link href="#">Base link</Link>
    </div>
  );
};

/**
 *  Link. Клик по ссылке
 *
 *  0. История BasicLink
 *  1. Найти элемент на странице
 *  2. Наведение на ссылку
 *  3. 📸 состояние "hover"
 *  4. Нажать клавишу MOUSE_DOWN
 *  5. 📸 состояние “зажатая кнопка мыши”
 *  4. Нажать клавишу MOUSE_UP
 *  5. 📸 состояние “кликнули по ссылке”
 *
 *  Profit!
 */

BasicLink.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const link = await this.browser.findElement({ css: 'a' });

          const started = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: link })
            .perform();

          const hovered = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .press()
            .perform();

          const pressed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click()
            .perform();

          const clicked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ x: 0, y: 0 })
            .perform();

          const activated = await element.takeScreenshot();

          await this.expect({ started, hovered, pressed, clicked, activated }).to.matchImages();
        },
      },
    },
  },
};

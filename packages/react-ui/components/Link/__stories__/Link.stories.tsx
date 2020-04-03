import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Link } from '../Link';
import { Toast } from '../../Toast';

const linkTests: CreeveyStoryParams['tests'] = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async hover() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  },
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
};

export default { title: 'Link', parameters: { creevey: { skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }] } } };

export const Simple: CSFStory<JSX.Element> = () => <Link>Simple Link</Link>;
Simple.story = { parameters: { creevey: { tests: linkTests } } };

export const WithIcon: CSFStory<JSX.Element> = () => <Link icon={<OkIcon />}>Simple Link</Link>;
WithIcon.story = { parameters: { creevey: { tests: linkTests } } };

export const Danger: CSFStory<JSX.Element> = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);
Danger.story = { parameters: { creevey: { tests: linkTests } } };

export const Grayed: CSFStory<JSX.Element> = () => <Link use="grayed">Simple link</Link>;
Grayed.story = { parameters: { creevey: { tests: linkTests } } };

export const Disabled: CSFStory<JSX.Element> = () => <Link disabled>Simple link</Link>;
Disabled.story = { parameters: { creevey: { tests: linkTests } } };

export const WithSpaces: CSFStory<JSX.Element> = () => {
  return <Link>Link with spaces</Link>;
};
WithSpaces.story = { parameters: { creevey: { tests: linkTests } } };

export const Success: CSFStory<JSX.Element> = () => {
  return <Link use="success">Link with spaces</Link>;
};
Success.story = { parameters: { creevey: { tests: linkTests } } };

export const WithOnClick: CSFStory<JSX.Element> = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
WithOnClick.story = {
  name: 'With onClick',
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

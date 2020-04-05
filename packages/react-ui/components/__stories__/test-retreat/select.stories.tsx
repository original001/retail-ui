import { CSFStory } from 'creevey';
import React from 'react';

import { Select } from '../../Select'; // 4

export default {
  title: 'TR Select',
};

export const WithDefaultValue: CSFStory<JSX.Element> = () => (
  <Select width="150px" items={['oneoneone', 'twotwotwo', 'threethree']} defaultValue={'threethree'} />
);
WithDefaultValue.story = {
  name: 'using default value',
  parameters: { creevey: { captureElement: null } },
};

export const Disabled: CSFStory<JSX.Element> = () => (
  <Select width="150px" items={['oneoneone', 'twotwotwo', 'threethree']} disabled />
);
Disabled.story = {
  name: 'disabled',
  parameters: { creevey: { captureElement: null } },
};

export const WithSearch: CSFStory<JSX.Element> = () => (
  <Select width="150px" items={['oneoneone', 'twotwotwo', 'threethree']} search />
);
WithSearch.story = {
  name: 'with search',
  parameters: {
    creevey: {
      tests: {
        async ['search item']() {
          const element = await this.browser.findElement({ css: '.dropdown-test-container' });
          await this.browser
            .actions({ bridge: true })
            .click(await this.browser.findElement({ css: '[data-comp-name~=Select]' }))
            .perform();
          const searchVisible = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('o', 'n', 'e')
            .perform();
          const filtered = await element.takeScreenshot();

          await this.expect({ searchVisible, filtered }).to.matchImages();
        },
      },
    },
  },
};

const notSelectable: React.ReactElement = <span id="notSelectable">Not Selectable</span>;

export const WithNotSelectableValue: CSFStory<JSX.Element> = () => (
  <Select<any>
    width="150px"
    // @ts-ignore
    items={[Select.static(() => <Select.Item>{notSelectable}</Select.Item>), 'oneoneone', 'threethree']}
  />
);
WithNotSelectableValue.story = {
  name: 'not selectable value',
  parameters: {
    creevey: {
      tests: {
        async ['try click on not selectable']() {
          const element = await this.browser.findElement({ css: '.dropdown-test-container' });
          await this.browser
            .actions({ bridge: true })
            .click(await this.browser.findElement({ css: '[data-comp-name~=Select]' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .move({ origin: this.browser.findElement({ id: 'notSelectable' }) })
            .perform();
          const notHovered = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ id: 'notSelectable' }))
            .perform();
          const notClickable = await element.takeScreenshot();

          await this.expect({ notHovered, notClickable }).to.matchImages();
        },
      },
    },
  },
};

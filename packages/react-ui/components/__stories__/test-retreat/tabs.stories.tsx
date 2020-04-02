import { CSFStory } from 'creevey';
import React from 'react';

import { Tabs } from '../../Tabs'; // 4

export default {
  title: 'TR Tabs',
};

export const SimpleTabs: CSFStory<JSX.Element> = () => {
  const initialState = 'first';
  const [current, currentSet] = React.useState(initialState);
  const changeHandler = (value: string) => currentSet(value);

  return (
    <Tabs value={current} onValueChange={changeHandler}>
      <Tabs.Tab id="first">first</Tabs.Tab>
      <Tabs.Tab disabled id="second">
        second (disabled)
      </Tabs.Tab>
      <Tabs.Tab id="third">third</Tabs.Tab>
    </Tabs>
  );
};

/**
 * Tabs. Выбор нужного таба
 *
 *  0. История BasicToggle
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на таб
 *  4. 📸 состояние “hover”
 *  5. Фокус на табе
 *  6. 📸 состояние "в фокусе"
 *  7. Кликнуть на таб
 *  8. 📸 состояние "включен"
 *
 *  Profit!
 */

SimpleTabs.story = {
  parameters: {
    creevey: {
      tests: {
        async selectTab() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const thirdTab = await this.browser.findElement({ css: 'a[data-prop-id~=third]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: thirdTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(thirdTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await this.expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },

        async selectDisabledTab() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const secondTab = await this.browser.findElement({ css: 'a[data-prop-id~=second]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: secondTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(secondTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await this.expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },

        async selectActiveTab() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const firstTab = await this.browser.findElement({ css: 'a[data-prop-id~=first]' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: firstTab })
            .perform();

          const hoverTab = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(firstTab)
            .perform();

          const activeTabChanged = await element.takeScreenshot();

          await this.expect({ defaultToggle, hoverTab, activeTabChanged }).to.matchImages();
        },
      },
    },
  },
};

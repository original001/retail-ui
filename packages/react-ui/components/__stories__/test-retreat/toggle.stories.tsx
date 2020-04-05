import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';
import React from 'react';

export default { title: 'TR Toggle' };
import { Toggle } from '../../Toggle'; // 1
export const UncontrolledToggle: CSFStory<JSX.Element> = () => <Toggle onValueChange={action('toggle')} />;

export const BasicToggle: CSFStory<JSX.Element> = () => {
  const initialState = false;
  const [checked, checkSet] = React.useState(initialState);
  const toggleCheck = () => {
    checkSet(!checked);
  };
  return (
    <div>
      <Toggle checked={checked} onChange={toggleCheck} /> {checked ? 'On' : 'Off'}
    </div>
  );
};

/**
 * Toggle. Переключение
 *
 *  0. История BasicToggle
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на переключатель
 *  4. 📸 состояние “hover”
 *  5. Фокус на переключателе
 *  6. 📸 состояние "в фокусе"
 *  7. Кликнуть на переключатель
 *  8. 📸 состояние "включен"
 *  Profit!
 */

BasicToggle.story = {
  parameters: {
    creevey: {
      tests: {
        async toggleItem() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const inputLabel = await this.browser.findElement({ css: 'label' });

          const defaultToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: inputLabel })
            .perform();

          const hoverToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: inputLabel })
            .press()
            .perform();

          const focusToggle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(inputLabel)
            .perform();

          const toggled = await element.takeScreenshot();

          await this.expect({ defaultToggle, hoverToggle, focusToggle, toggled }).to.matchImages();
        },
      },
    },
  },
};

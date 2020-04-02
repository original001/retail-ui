import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';
import React, { useRef, useState } from 'react';

export default { title: 'TR Toggle' };
import { Toggle } from '../../Toggle'; // 1
export const UncontrolledToggle: CSFStory<JSX.Element> = () => <Toggle onValueChange={action('toggle')} />;

/**
 *  UncontrolledToggle.
 *
 *  1. Найти элемент на странице
 *  2. hover
 *  3. 📸 состояние hovered
 *  4. click
 *  5. 📸 состояние checked
 *  7. un-hovered
 *  8. 📸 состояние un-hovered
 *  9. click
 *  10. 📸 состояние un-checked
 *
 */

UncontrolledToggle.story = {
  parameters: {
    creevey: {
      tests: {
        async hover() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          const root = await this.browser.findElement({ css: '#root' });
          // находим кнопку
          const toggle = await this.browser.findElement({ css: '[data-comp-name*=Toggle]' });
          const toggle_checkbox = await this.browser.findElement({ css: '[data-prop-type*=checkbox]' });

          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: toggle })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(toggle_checkbox)
            .perform();

          // делаем скриншот "при чеке"
          const check_on = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: root })
            .perform();

          // делаем скриншот "без ховера"
          const hover_off = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(toggle_checkbox)
            .perform();

          // делаем скриншот "при анчеке"
          const check_off = await element.takeScreenshot();

          // 5. сравниваем результаты
          await this.expect({ idle, hover, check_on, hover_off, check_off }).to.matchImages();
        },
      },
    },
  },
};

class Simple extends React.Component<any, any> {
  public state = {
    checked: true,
  };

  public render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onValueChange={() => {
            const { checked } = this.state;
            this.setState({ checked: !checked });
          }}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

export const Plain: CSFStory<JSX.Element> = () => <Simple />;
Plain.story = {
  name: 'plain',
  parameters: {
    creevey: {
      tests: {
        async hover() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: '[data-comp-name~=Toggle]' }) })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover');
        },
        async focused() {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('focused');
        },
      },
    },
  },
};

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

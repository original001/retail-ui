import { CSFStory } from 'creevey';
import React from 'react';

import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Tooltip } from '../../Tooltip'; // 1

export default {
  title: 'TR Tooltip',
};

// 0. Имеется поле ввода и тултип с кнопкой, по клику на которую поле ввода фокусится
// 1. Триггерим тултип по клику, сфотографируем
// 2. Кликаем по кнопке в тултипе
// 3. Тултип должен закрыться, сфотографируем

export const ToolptipWithLinkInside: CSFStory<JSX.Element> = () => {
  let input: Nullable<Input>;

  const renderTooltip = () => {
    return (
      <div>
        Text and{' '}
        <Button onClick={handleButtonClick} data-tid={`buttonToClick`} use="link">
          Button
        </Button>
      </div>
    );
  };

  const handleButtonClick = () => {
    if (input) {
      input.focus();
    }
  };

  return (
    <div>
      <Tooltip trigger="click" render={renderTooltip}>
        <Input data-tid={`inputWithTooltip`} />
      </Tooltip>
      <div>
        <Input ref={el => (input = el)} data-tid={`inputToFocus`} />
      </div>
    </div>
  );
};

ToolptipWithLinkInside.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: `#test-element` });
          const inputField1 = await this.browser.findElement({ css: `[data-tid~=inputWithTooltip]` });

          await this.browser
            .actions({ bridge: true })
            .click(inputField1)
            .perform();

          const tooltip = await element.takeScreenshot();

          const button = await this.browser.findElement({ css: `[data-tid~=buttonToClick]` });

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .sendKeys(`this is very long text to enter into inputField`)
            .perform();

          const focusedInputWithText = await element.takeScreenshot();

          await this.expect({ tooltip, focusedInputWithText }).to.matchImages();
        },
      },
    },
  },
};

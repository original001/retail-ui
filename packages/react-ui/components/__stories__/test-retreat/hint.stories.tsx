import { CSFStory } from 'creevey';
import React from 'react';

import { Hint } from '../../Hint'; // 1

export default { title: 'TR Hint' };

const changingTextTimeout = 0;

export const HintTest: CSFStory<JSX.Element> = () => {
  let timeout: number;
  const [value, updateValue] = React.useState('short');
  const [trigger, updateTrigger] = React.useState(1);
  const [isOpened, updateIsOpened] = React.useState(false);

  const onClick = () => {
    updateIsOpened(!isOpened);
    updateValue('short');

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      updateTrigger(trigger + 1);
      updateValue('new long value after programmatically changing');
    }, changingTextTimeout);
  };

  return (
    <>
      <div
        style={{
          padding: '5px 5px 5px 5px',
          position: 'absolute',
          border: '1px solid black',
          right: '50%',
          top: '100px',
        }}
      >
        <Hint text={value} pos="top" disableAnimations manual opened>
          hint here
        </Hint>
      </div>
      <div
        id="hint-wrapper"
        style={{
          padding: '80px 5px 5px 160px',
          position: 'absolute',
          border: '1px solid black',
          right: '0',
          top: '100px',
        }}
      >
        <Hint text={value} pos="top" disableAnimations manual opened={isOpened}>
          <div id="hint-trigger" onClick={onClick} key={trigger} style={{ border: '1px solid black' }}>
            hint here
          </div>
        </Hint>
      </div>
    </>
  );
};

HintTest.story = {
  parameters: {
    creevey: {
      tests: {
        async hintNearWindowBorderAfterTextChanging() {
          const hintTrigger = await this.browser.findElement({ css: '#hint-trigger' });
          const hintWrapper = await this.browser.findElement({ css: '#hint-wrapper' });

          await this.browser
            .actions({ bridge: true })
            .click(hintTrigger)
            .perform();
          await new Promise(r => setTimeout(r, changingTextTimeout));

          const hintedElement = await hintWrapper.takeScreenshot();

          await this.expect({ hintedElement }).to.matchImages();
        },
      },
    },
  },
};

/**
 *  Hint. Хинт появляется при наведении курсора на элемент
 *
 *  0. История TextWithHint
 *  1. Найти элемент на странице
 *  2. 📸 хинт отсутствует
 *  3. Навести на элемент
 *  4. 📸 хинт появился
 *  5. Убрать курсор с элемента
 *  6. 📸 хинт исчез
 *  Profit!
 */

export const SimpleHint: CSFStory<JSX.Element> = () => {
  return <Hint text="World">Hello</Hint>;
};
//В storybook не анимируется hint при наведении на него

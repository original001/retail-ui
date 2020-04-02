import { CSFStory } from 'creevey';
import React, { useState } from 'react';

import { Input } from '../../Input'; // 1

export default { title: 'TR Input' };

export const InputWithError: CSFStory<JSX.Element> = () => {
  const [value, setValue] = useState<string>('');
  const isError = value === 'error';
  const disabled = value === 'disabled';

  return (
    <section>
      <Input
        value={value}
        error={isError}
        disabled={disabled}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </section>
  );
};

/**
 *  Input.
 *
 *  0. История InputDefault
 *  1. Найти элемент на странице
 *  2. focus
 *  3. 📸 состояние focus
 *  4. ввести текст err
 *  5. 📸 состояние с текстом
 *  7. ввести текст error
 *  8. 📸 состояние error
 *  9. ввести текст disable
 *  10. 📸 состояние disable
 *
 */

InputWithError.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Input]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('err')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('or')
            .perform();

          const withError = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .doubleClick(input)
            .sendKeys('disabled')
            .perform();

          const disabled = await element.takeScreenshot();

          await this.expect({ focused, typed, withError, disabled }).to.matchImages();
        },
      },
    },
  },
};

export const InputStates: CSFStory<JSX.Element> = () => {
  const [value, setValue] = useState<string>('');
  const isError = value === 'error';
  const disabled = value === 'disabled';
  const warning = value === 'warning';

  return (
    <section>
      <Input
        value={value}
        error={isError}
        disabled={disabled}
        warning={warning}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </section>
  );
};

/**
 *  Input.
 *
 *  0. История InputDefault
 *  1. Найти элемент на странице
 *  2. focus
 *  3. 📸 состояние focus
 *  4. ввести текст err
 *  5. 📸 состояние с текстом
 *  7. ввести текст error
 *  8. 📸 состояние error
 *  9. ввести текст disable
 *  10. 📸 состояние disable
 *
 */

InputStates.story = {
  parameters: {
    creevey: {
      tests: {
        async states() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Input]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('err')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('or')
            .perform();

          const withError = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .doubleClick(input)
            .sendKeys('warning')
            .perform();

          const withWarning = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .doubleClick(input)
            .sendKeys('disabled')
            .perform();

          const disabled = await element.takeScreenshot();

          await this.expect({ idle, focused, typed, withError, withWarning, disabled }).to.matchImages();
        },
      },
    },
  },
};

export const InputWithPlaceholder: CSFStory<JSX.Element> = () => <Input placeholder="Hold the place!" />;
InputWithPlaceholder.story = {
  name: 'Input with placeholder',
  parameters: {
    creevey: {
      tests: {
        async Plain() {
          await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
        },
        async Focused() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'label' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
        },
        async ['With typed text']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Test...')
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('With typed text');
        },
      },
    },
  },
};

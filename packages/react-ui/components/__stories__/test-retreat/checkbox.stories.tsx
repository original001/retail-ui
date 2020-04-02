import { CSFStory } from 'creevey';
import React, { useRef, useState } from 'react';

import { Checkbox } from '../../Checkbox';
import { Button } from '../../Button';

export default {
  title: 'TR Checkbox',
};

export const ClickDisabled: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox checked={value} onValueChange={updateValue} disabled>
      text
    </Checkbox>
  );
};
/**
 * Checkbox. Клик по заблокированному чекбоксу
 *
 * - 📸 дефолтное состояние
 * - Клик по чекбоксу
 * - 📸 состояние после клика
 */
ClickDisabled.story = {
  parameters: {
    creevey: {
      tests: {
        async clickDisabled() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const afterClicked = await element.takeScreenshot();

          await this.expect({ idle, afterClicked }).to.matchImages();
        },
      },
    },
  },
};

export const ClickCheckbox: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox checked={value} onValueChange={updateValue}>
      text
    </Checkbox>
  );
};
/**
 * Checkbox. Ставим и снимаем галочку кликом
 *
 * - 📸 дефолтное состояние
 * - Клик по чекбоксу
 * - 📸 состояние “выбран чекбокс”
 * - Клик по чекбоксу
 * - 📸 состояние “не выбран чекбокс”
 */
ClickCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const afterClicked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const afterTwoClicked = await element.takeScreenshot();

          await this.expect({ idle, afterClicked, afterTwoClicked }).to.matchImages();
        },
      },
    },
  },
};

export const WarningCheckbox: CSFStory<JSX.Element> = () => {
  const [checked, update] = React.useState(true);
  return (
    <Checkbox warning checked={checked} onValueChange={update}>
      text
    </Checkbox>
  );
};
/**
 * Checkbox. Клик по чекбоксу в состоянии "выбран" и подсветкой "warning"
 *
 * - Клик по чекбоксу
 * - 📸 состояние “не выбран чекбокс”
 */
WarningCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async warningChecked() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          const unchecked = await element.takeScreenshot();

          await this.expect({ idle, unchecked }).to.matchImages();
        },
      },
    },
  },
};

/* polunina*/

export const BasicCheckbox: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox checked={value} onValueChange={updateValue}>
      text
    </Checkbox>
  );
};

/**
 *  CheckBox. Состояние “hover”
 *
 *  0. История CheckBox
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на CheckBox
 *  4. 📸 состояние “hover”
 *  5. Наблюдаем изменение цвета фона
 *
 *  Profit!
 */

BasicCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          // находим чекбокс
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkbox })
            .perform();

          // 4. делаем скриншот "при наведении"
          const afterClicked = await element.takeScreenshot();
          // 5. сравниваем результаты
          await this.expect({ idle, afterClicked }).to.matchImages();
        },
      },
    },
  },
};

export const CheckboxLongValue: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <>
      <div>
        <Checkbox checked={value} onValueChange={updateValue}>
          long text long text long text long text long text long text long text long text long text long text long text
          long text long text long text long text long text long text long text long text long text long text long text
          long text long text
        </Checkbox>
      </div>
      <div>
        <Checkbox checked={value} onValueChange={updateValue}></Checkbox>
      </div>
    </>
  );
};

/**
 *  CheckBox. Состояние “Длиинный текст и еще один чекбокс”
 *
 *  0. 📸 дефолтное состояние
 *
 *  Profit!
 */

CheckboxLongValue.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();
          // 3. сравниваем результаты
          await this.expect({ idle }).to.matchImages();
        },
      },
    },
  },
};

export const IndeterminateCheckbox: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox checked={value} onValueChange={updateValue} initialIndeterminate>
      text
    </Checkbox>
  );
};

/**
 *  CheckBox. Состояние из промежуточного в checked
 *
 *  0. История CheckBox
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние - промежуточное
 *  3. Кликнуть на CheckBox
 *  4. 📸 состояние “checked”
 *  5. Наблюдаем изменение состояния
 *
 *  Profit!
 */

IndeterminateCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          // находим чекбокс
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });
          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. кликаем на  checkbox
          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          // 4. делаем скриншот "checked"
          const afterClicked = await element.takeScreenshot();
          // 5. сравниваем результаты
          await this.expect({ idle, afterClicked }).to.matchImages();
        },
      },
    },
  },
};

export const CheckBoxStates: CSFStory<JSX.Element> = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const checkbox = useRef<Checkbox>(null);

  const handleChangeIndeterminate = () => {
    const currentCheckBox = checkbox?.current;
    if (currentCheckBox?.state.indeterminate) {
      currentCheckBox?.resetIndeterminate();
    } else {
      currentCheckBox?.setIndeterminate();
    }
  };

  return (
    <section>
      <Checkbox ref={checkbox} checked={checked} onClick={() => setChecked(!checked)} />
      <br />
      <br />
      <Button onClick={handleChangeIndeterminate}>Изменить initialIndeterminate</Button>
    </section>
  );
};

/**
 *  CheckBox.
 *
 *  0. История CheckBoxDefault
 *  1. Найти элемент на странице
 *  2. hover
 *  3. 📸 состояние hovered
 *  4. click
 *  5. 📸 состояние clicked
 *  7. indeterminate
 *  8. 📸 состояние indeterminate
 *  9. reset indeterminate
 *  10. 📸 состояние reset indeterminate
 *
 */

CheckBoxStates.story = {
  parameters: {
    creevey: {
      tests: {
        async states() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });
          const button = await this.browser.findElement({ css: 'button' });

          const idle = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkbox })
            .perform();
          const hover = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();
          const checked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();
          const unChecked = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();
          const setInitialIndeterminate = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();
          const resetInitialIndeterminate = await element.takeScreenshot();

          await this.expect({
            idle,
            hover,
            checked,
            unChecked,
            setInitialIndeterminate,
            resetInitialIndeterminate,
          }).to.matchImages();
        },
      },
    },
  },
};

class CheckboxWithErrorClass extends React.Component<any, any> {
  public state = {
    checked: false,
    error: true,
  };

  public render() {
    const { checked, error } = this.state;
    return (
      <Checkbox error={error} onValueChange={() => this.setState({ checked: !checked })} checked={checked}>
        {this.props.children}
      </Checkbox>
    );
  }
}

export const CheckboxWithError: CSFStory<JSX.Element> = () => (
  <CheckboxWithErrorClass>CheckboxWithError</CheckboxWithErrorClass>
);
CheckboxWithError.story = {
  name: 'checkboxWithError',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hovered' }],
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async hovered() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: 'span' }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
        },
        async clicked() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'span' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
        async tabPress() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'span' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .press()
            .release()
            .sendKeys(this.keys.TAB)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
        },
        async spacePressAfterClick() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#test-element' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
        },
        async doubleSpacePressAfterClick() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#test-element' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('doubleSpacePress');
        },
      },
    },
  },
};

class CheckboxWithTextClass extends React.Component<any, any> {
  public state = {
    checked: false,
  };

  public render() {
    const { checked } = this.state;
    return (
      <Checkbox onValueChange={() => this.setState({ checked: !checked })} checked={checked}>
        {this.props.children}
      </Checkbox>
    );
  }
}

export const CheckboxWithText: CSFStory<JSX.Element> = () => (
  <CheckboxWithTextClass>
    <div data-tid="text">CheckboxWithText</div>
  </CheckboxWithTextClass>
);

/**
 *  Checkbox.
 *
 *  0. История CheckboxWithText
 *  1. Найти на странице текст у чекбокса
 *  2. Фокус на текст чекбокса
 *  3. 📸 состояние "не выбран и в фокусе"
 *  4. Нажимаем на текст чекбоса
 *  5. 📸 состояние "нажат и выбран"
 *  6. Отжимаем
 *  7. 📸 состояние "выбран и в фокусе"
 *  8. Снимаем фокус
 *  9. 📸 состояние "выбран и не в фокусе"
 *
 *  Profit!
 */

CheckboxWithText.story = {
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async hoverOnLabel() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hoverOnLabel');
        },
      },
    },
  },
};

class CheckboxWithIndeterminateState1 extends React.Component<any, any> {
  state = {
    checked: false,
    initialIndeterminate: true,
  };

  public render() {
    const { checked, initialIndeterminate } = this.state;
    return (
      <Checkbox
        initialIndeterminate={initialIndeterminate}
        onValueChange={() => this.setState({ checked: !checked })}
        checked={checked}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}

export const SimpleCheckbox: CSFStory<JSX.Element> = () => (
  <CheckboxWithIndeterminateState1>Click me </CheckboxWithIndeterminateState1>
);

CheckboxWithText.story = {
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async hoverOnLabel() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hoverOnLabel');
        },
        async pressOnLabel() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .press(0)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('pressOnLabel');
        },
        async stayHoveredAfterCheck() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .click(label)
            .move({
              origin: label,
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('stayHoveredAfterCheck');
        },
        async stayHoveredAfterUncheck() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .click(label)
            .click(label)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('stayHoveredAfterUncheck');
        },
        async pressWhenChecked() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .click(label)
            .move({
              origin: label,
            })
            .press()
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('pressWhenChecked');
        },
        async unhoveredWhenUncheckAfterMoveOver() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .click(label)
            .click(label)
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('unhoveredWhenUncheckAfterMoveOver');
        },
        async stayUncheckedAfterDragAndDrop() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .press(0)
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .release(0)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('stayUncheckedAfterDragAndDrop');
        },
        async stayCheckedAfterDragAndDrop() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: label,
            })
            .click(label)
            .press(0)
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .release(0)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('stayCheckedAfterDragAndDrop');
        },
      },
    },
  },
};

export const UnaryCheckbox: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState(false);
  return (
    <Checkbox checked={value} onValueChange={updateValue}>
      Check it out!
    </Checkbox>
  );
};

/**
 *  Checkbox. Ховер и смена состояния
 *
 *  0. История CheckBox
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на чекбокс
 *  4. 📸 состояние "hovered"
 *  5. Выбрать чекбокс
 *  6. 📸 состояние "checked"
 *  Profit!
 */

UnaryCheckbox.story = {
  parameters: {
    creevey: {
      tests: {
        async ChangeState() {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });

          // 2. делаем скриншот "по умолчанию"
          const uncheckedUnhovered = await element.takeScreenshot();

          // находим чекбокс
          const checkbox = await this.browser.findElement({ css: '[data-comp-name~=Checkbox]' });

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: checkbox })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hovered = await element.takeScreenshot();

          // 5. выбираем чекбокс
          await this.browser
            .actions({ bridge: true })
            .click(checkbox)
            .perform();

          // 6. делаем скриншот после выбора чекбокса
          const checked = await element.takeScreenshot();
          await this.expect({ uncheckedUnhovered, hovered, checked }).to.matchImages();
        },
      },
    },
  },
};

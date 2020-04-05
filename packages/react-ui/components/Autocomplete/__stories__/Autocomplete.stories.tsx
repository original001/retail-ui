import React from 'react';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Gapped } from '../../Gapped';
import { Autocomplete } from '../Autocomplete';

export default { title: 'Autocomplete' };

export const Simple = () => <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />;
Simple.story = { name: 'simple', parameters: { creevey: { skip: [true] } } };

export const ControlledAutocomplete: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};
ControlledAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        /**
         *  Autocomplete. Независимость от регистра
         *
         *  0. История BasicAutocomplete
         *  1. Найти элемент на странице
         *  2. Фокус на поле ввода
         *  3. Ввести "ONE"
         *  4. 📸 состояние “введенное слово"
         *
         *  Profit!
         */
        async shouldSuggestCaseIndependent() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('ONE')
            .perform();

          const upperCaseTyped = await element.takeScreenshot();

          await this.expect({ typed: upperCaseTyped }).to.matchImages();
        },
        /**
         *  Autocomplete. Обрезает пробелы
         *
         *  0. История BasicAutocomplete
         *  1. Найти элемент на странице
         *  2. Фокус на поле ввода
         *  3. Ввести "   two   "
         *  4. 📸 состояние “введенное слово"
         *
         *  Profit!
         */
        async shouldIgnoreSpacesAfterOrBefore() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('   two   ')
            .perform();

          const typedWithSpaces = await element.takeScreenshot();

          await this.expect({ typed: typedWithSpaces }).to.matchImages();
        },
      },
    },
  },
};

export const WithRenderItem = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithRenderItem.story = { name: 'with renderItem', parameters: { creevey: { skip: [true] } } };

export const WithBigRenderItemWidth = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>}
  />
);
WithBigRenderItemWidth.story = { name: 'with big renderItem width', parameters: { creevey: { skip: [true] } } };

export const WithFixedMenuSize = () => (
  <UncontrolledAutocomplete
    source={[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.',
      'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.',
      'Donec lacus nunc, viverra nec.',
      'Sed lectus. Integer euismod lacus luctus magna.',
      'Suspendisse potenti.',
      ' Sed dignissim lacinia nunc.',
    ]}
    renderItem={(x: string) => <div>{x}</div>}
    menuWidth={400}
    menuMaxHeight={150}
  />
);
WithFixedMenuSize.story = { name: 'with fixed menu size', parameters: { creevey: { skip: [true] } } };

export const WithOnBlurOnFocusHandlers = () => <WithBlurFocusHandlersExample />;
WithOnBlurOnFocusHandlers.story = { name: 'with onBlur/onFocus handlers', parameters: { creevey: { skip: [true] } } };

class UncontrolledAutocomplete extends React.Component<any, any> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onValueChange={value => {
          this.setState({ value });
        }}
      />
    );
  }
}

class WithBlurFocusHandlersExample extends React.Component<any, any> {
  public state = {
    focusCount: 0,
    blurCount: 0,
  };
  public render() {
    return (
      <Gapped vertical>
        <UncontrolledAutocomplete
          onFocus={() => {
            const { focusCount } = this.state;
            this.setState({ focusCount: focusCount + 1 });
          }}
          onBlur={() => {
            const { blurCount } = this.state;
            this.setState({ blurCount: blurCount + 1 });
          }}
          source={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(
            ' ',
          )}
        />
        <span>Focuses count: {this.state.focusCount}</span>
        <span>Blures count: {this.state.blurCount}</span>
      </Gapped>
    );
  }
}

export const AutocompleteWithScroll: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(`Abba ${i}`);
  }
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={items} value={value} onValueChange={updateValue} />
    </div>
  );
};

AutocompleteWithScroll.story = {
  parameters: {
    creevey: {
      tests: {
        /**
         *  Autocomplete. При большом количестве вариантов виден скроллбар
         *
         *  0. История AutocompleteWithScroll
         *  1. Найти элемент на странице
         *  2. Фокус на поле ввода
         *  3. Ввести "Abba"
         *  4. 📸 состояние дропдауна со скроллбаром
         *
         *  Profit!
         */
        async scrollBarShouldBeVisible() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('Abba')
            .perform();

          const autocompleteWithScroll = await element.takeScreenshot();

          await this.expect({ autocompleteWithScroll }).to.matchImages();
        },
        /**
         *  Autocomplete. Скроллбар расширяется при наведении
         *
         *  0. История AutocompleteWithScroll
         *  1. Найти элемент на странице
         *  2. Фокус на поле ввода
         *  3. Ввести "Abba"
         *  4. Находим скроллбар
         *  5. Наводим на него мышь
         *  6. 📸 состояние скроллбара в дропдауне
         *
         *  Profit!
         */
        async scrollBarShouldEnlargeOnHover() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('Abba')
            .perform();

          const scrollBar = await this.browser.findElement({ className: 'react-ui-ejkfzu' });
          await this.browser
            .actions({ bridge: true })
            .move({ origin: scrollBar })
            .perform(); //Hover не работает на IE11
          const scrollBarOnHover = await element.takeScreenshot();

          await this.expect({ scrollBarOnHover }).to.matchImages();
        },
      },
    },
  },
};

/**
 *  Autocomplete. Текст вводится с выравниванием по правому краю / по центру
 *
 *  0. История AutocompleteWithRightTextAlignment
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. Ввести "text"
 *  4. 📸 состояние поля ввода
 *
 *  Profit!
 */

export const AutocompleteWithRightTextAlignment: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete align={'right'} source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

const textAlignmentTest: CreeveyStoryParams['tests'] = {
  async textShouldBeAligned() {
    const element = await this.browser.findElement({ css: '#test-element' });
    const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

    await this.browser
      .actions({ bridge: true })
      .click(input)
      .perform();

    await this.browser
      .actions({ bridge: true })
      .sendKeys('text')
      .perform();

    const typed = await element.takeScreenshot();
    await this.expect({ typed }).to.matchImages();
  },
};

AutocompleteWithRightTextAlignment.story = {
  parameters: {
    creevey: {
      tests: textAlignmentTest,
    },
  },
};

export const AutocompleteWithCenterTextAlignment: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete align={'center'} source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

AutocompleteWithCenterTextAlignment.story = {
  parameters: {
    creevey: {
      tests: textAlignmentTest,
    },
  },
};

export const BasicAutocomplete: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete
        source={['first value', 'first one more time', 'second value', 'third value']}
        value={value}
        onValueChange={updateValue}
      />
    </div>
  );
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. 📸 состояние "в фокусе"
 *  3. Ввести символ "f"
 *  4. 📸 состояние “введенный символ”
 *  5. Нажать клавишу ARROW_DOWN
 *  6. 📸 состояние “подсвечен первый элемент”
 *  7. Нажать клавишу ENTER
 *  8. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

/**
 *  Autocomplete. Пропадание выпадашки после ввода неподходящего значения
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символ "f"
 *  3. 📸 состояние “введенный символ”
 *  4. Ввести символ "s"
 *  5. 📸 состояние “введено несуществующее значение”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по двум словам
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first value"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по символам внутри слова
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Сохранение введенного текста после потери фокуса
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Нажатие Enter при невыбранном элементе
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first"
 *  3. Нажать клавишу ENTER
 *  4. 📸 состояние “не выбран элемент”
 *
 */

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async wrongTyped() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('x')
            .perform();

          const typedWrong = await element.takeScreenshot();

          await this.expect({ typed, typedWrong }).to.matchImages();
        },

        async severalWords() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first value')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ typed, highlighted, selected }).to.matchImages();
        },

        async notFirstSymbol() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('rst')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ typed, highlighted, selected }).to.matchImages();
        },

        async saveTextOnBlur() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.TAB)
            .perform();

          const noFocus = await element.takeScreenshot();

          await this.expect({ typed, noFocus }).to.matchImages();
        },

        async enterWhenNoSelectedItem() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const empty = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ empty, selected }).to.matchImages();
        },
      },
    },
  },
};

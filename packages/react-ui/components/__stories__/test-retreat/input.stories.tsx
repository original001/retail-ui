import { CSFStory } from 'creevey';
import React, { useState } from 'react';

import { Input } from '../../Input'; // 1

export default { title: 'TR Input' };

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

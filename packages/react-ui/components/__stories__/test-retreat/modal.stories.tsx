import { CSFStory } from 'creevey';
import React, { Component } from 'react';

import { Button } from '../../Button';
import { Modal } from '../../Modal'; // 3

export default {
  title: 'TR Modal',
};

/*=============================*/

class SmallModalOnTop extends Component<{}, {}> {
  public state = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close} alignTop>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <Button data-tid="modal-content-button">Content Button</Button>
        </Modal.Body>
      </Modal>
    );
  }

  public render() {
    return (
      <div>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

export const SmallModalOnTheTop: CSFStory<JSX.Element> = () => <SmallModalOnTop />;
SmallModalOnTheTop.story = {
  name: 'Small modal on the Top',
  parameters: {
    creevey: {
      tests: {
        async ['opens from keyboard']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .press()
            .release()
            .sendKeys(this.keys.TAB, this.keys.ENTER)
            .perform();
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('opens from keyboard');
        },
        async ['closes from keyboard focusing cross']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .press()
            .release()
            .sendKeys(this.keys.TAB, this.keys.ENTER, this.keys.TAB, this.keys.ENTER)
            .perform();
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('closes from keyboard focusing cross');
        },
        async ['focuses only elements inside']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .press()
            .release()
            .sendKeys(this.keys.TAB, this.keys.ENTER, this.keys.TAB, this.keys.TAB)
            .pause(1) // otherwise it focuses both cross and the button at once
            .sendKeys(this.keys.TAB)
            .perform();
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('focuses only elements inside');
        },
      },
    },
  },
};

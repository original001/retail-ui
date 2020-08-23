import { isClient } from '../client';

import { isKeyTab } from './keyboard/identifiers';

class TabListener {
  public isTabPressed = false;
  constructor() {
    window.addEventListener('keydown', e => (this.isTabPressed = isKeyTab(e)));
    window.addEventListener('mousedown', () => (this.isTabPressed = false));
  }
  public setIsTabPressed(isTabPressed: boolean) {
    this.isTabPressed = isTabPressed;
  }
}

let tabListenerInstance: null | TabListener = null;

export const tabListener = (): null | TabListener => {
  if (tabListenerInstance !== null) {
    return tabListenerInstance;
  }
  if (!isClient()) {
    return null;
  }
  return (tabListenerInstance = new TabListener());
};

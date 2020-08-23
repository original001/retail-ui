type Client = {
  isMac: boolean;
  isWindows: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isOpera: boolean;
  isChrome: boolean;
  isEdge: boolean;
  isIE11: boolean;
};

let client: null | Client = null;

const getClient = (): null | Client => {
  if (client !== null) {
    return client;
  }
  if (!isClient()) {
    return null;
  }
  // NOTE Some checks are used from https://github.com/arasatasaygin/is.js
  const platform = ((navigator && navigator.platform) || '').toLowerCase();
  const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();
  const vendor = ((navigator && navigator.vendor) || '').toLowerCase();

  const isMac = platform.includes('mac');
  const isWindows = platform.includes('win');

  const isSafari = /version\/(\d+).+?safari/.test(userAgent);
  const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(userAgent);
  const isOpera = /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent);
  const isChrome = vendor.includes('google inc') && /(?:chrome|crios)\/(\d+)/.test(userAgent) && !isOpera;
  const isEdge = userAgent.includes('edge/');
  const isIE11 = userAgent.includes('trident/');

  return (client = { isMac, isWindows, isSafari, isFirefox, isOpera, isChrome, isEdge, isIE11 });
};

export const isClient = () => typeof window !== 'undefined';

export const isMac = () => Boolean(getClient()?.isMac);
export const isWindows = () => Boolean(getClient()?.isWindows);

export const isSafari = () => Boolean(getClient()?.isSafari);
export const isFirefox = () => Boolean(getClient()?.isFirefox);
export const isOpera = () => Boolean(getClient()?.isOpera);
export const isChrome = () => Boolean(getClient()?.isChrome);
export const isEdge = () => Boolean(getClient()?.isEdge);
export const isIE11 = () => Boolean(getClient()?.isIE11);

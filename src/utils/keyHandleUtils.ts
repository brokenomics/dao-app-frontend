import { isFunction } from 'lodash';
import { KeyboardEvent } from 'react';

import { KEYBOARD_EVENT_KEY_ENTER } from '../constants/keyConstants';

function handleSpecificKeyPress(key: string, callback?: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === key && callback && isFunction(callback)) {
      e.preventDefault();
      callback(e);
    }
  };
}

export function handleEnterKeyPress(
  callback?: () => void,
): (e: KeyboardEvent) => void {
  return handleSpecificKeyPress(KEYBOARD_EVENT_KEY_ENTER, callback);
}

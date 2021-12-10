/* eslint-disable @typescript-eslint/no-non-null-assertion */
const SCROLL_EL_CLASS_NAME = 'simplebar-content-wrapper';

export default function getScrollElementById(id: string): HTMLDivElement {
  return document!
    .getElementById(id)!
    .getElementsByClassName(SCROLL_EL_CLASS_NAME)[0]! as HTMLDivElement;
}

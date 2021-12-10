/* eslint-disable no-plusplus */
import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ModalContext, ModalType } from './ModalContext';

/**
 * Callback types provided for descriptive type-hints
 */
type ShowModal = () => void;
type HideModal = () => void;

/**
 * Utility function to generate unique number per component instance
 */
const generateModalKey = ((): (() => string) => {
  let count = 0;

  return (): string => `${++count}`;
})();

/**
 * Check whether the argument is a stateless component.
 *
 * We take advantage of the stateless nature of functional components to be
 * inline the rendering of the modal component as part of another immutable
 * component.
 *
 * This is necessary for allowing the modal to update based on the inputs passed
 * as the second argument to useModal without unmounting the previous version of
 * the modal component.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunctionalComponent = (Component: Function): boolean => {
  const { prototype } = Component;

  return !prototype || !prototype.isReactComponent;
};

/**
 * React hook for showing modal windows
 */
export const useModal = (
  component: ModalType,
  inputs: unknown[] = [],
): [ShowModal, HideModal] => {
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.',
    );
  }

  const key = useMemo(generateModalKey, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modal = useMemo(() => component, [inputs]);
  const context = useContext(ModalContext);
  const [isShown, setShown] = useState<boolean>(false);
  const showModal = useCallback(() => setShown(true), []);
  const hideModal = useCallback(() => setShown(false), []);

  useEffect(() => {
    if (isShown) {
      context.showModal(key, modal);
    } else {
      context.hideModal(key);
    }

    // Hide modal when parent component unmounts
    return (): void => context.hideModal(key);
  }, [modal, isShown, context, key]);

  return [showModal, hideModal];
};

export default useModal;

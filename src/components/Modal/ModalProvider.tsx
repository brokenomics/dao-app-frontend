import React, { useCallback, useState, useMemo } from 'react';
import { ModalType, ModalContext } from './ModalContext';
import ModalRoot from './ModalRoot';

/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Specifies the root element to render modals into
   */
  container?: Element;

  /**
   * Container component for modal nodes
   */
  rootComponent?: React.ComponentType<unknown>;

  /**
   * Subtree that will receive modal context
   */
  children: React.ReactNode;
}

/**
 * Modal Provider
 *
 * Provides modal context and renders ModalRoot.
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({
  container,
  rootComponent,
  children,
}: ModalProviderProps) => {
  if (container && !(container instanceof HTMLElement)) {
    throw new Error(
      `Container must specify DOM element to mount modal root into.`,
    );
  }

  const [modals, setModals] = useState<Record<string, ModalType>>({});
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals((existModals) => ({
        ...existModals,
        [key]: modal,
      })),
    [],
  );

  const hideModal = useCallback(
    (key: string) =>
      setModals((existModals) => {
        const newModals = { ...existModals };

        delete newModals[key];

        return newModals;
      }),
    [],
  );

  const contextValue = useMemo(() => ({ showModal, hideModal }), [
    hideModal,
    showModal,
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      <>
        {children}
        <ModalRoot
          modals={modals}
          component={rootComponent}
          container={container}
        />
      </>
    </ModalContext.Provider>
  );
};

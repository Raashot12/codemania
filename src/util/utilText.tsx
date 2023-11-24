/* eslint-disable import/extensions */
import { render, RenderOptions } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PreloadedState } from 'redux';
import { MantineProvider } from '@mantine/core';
import { AppStore, RootState, setupStore } from '@/state/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children,
  }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return (
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

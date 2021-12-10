import React from 'react';

export function useForceUpdate(): () => void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue] = React.useState(0);

  return () => setValue((value) => value + 1);
}

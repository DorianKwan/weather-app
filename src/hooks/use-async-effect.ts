import { DependencyList, useEffect } from 'react';

export const useAsyncEffect = (
  effect: Function,
  destroy?: any,
  inputs?: any,
) => {
  useEffect(
    () => {
      let result: any;
      let mounted = true;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const maybePromise = effect(() => mounted);

      Promise.resolve(maybePromise).then(value => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result = value;
      });

      return () => {
        mounted = false;

        if (destroy === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          destroy(result);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof destroy === 'function'
      ? (inputs as DependencyList)
      : (destroy as DependencyList),
  );
};

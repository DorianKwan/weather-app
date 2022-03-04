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

      const maybePromise = effect(() => mounted);

      Promise.resolve(maybePromise).then(value => {
        result = value;
      });

      return () => {
        mounted = false;

        if (destroy === 'function') {
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

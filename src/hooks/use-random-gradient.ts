import { useMemo, useState } from 'react';
import { Gradient, Theme } from 'src/theme/theme';

const getRandomGradient: (
  gradientList: Gradient[],
) => [Gradient, Gradient[]] = gradientList => {
  const randomIdx = Math.floor(Math.random() * gradientList.length);

  const [gradient] = gradientList.splice(randomIdx, 1);

  return [gradient, gradientList];
};

// USE WISELY; THIS CAN BE EXTREMELY TAXING LOGIC
export const useRandomGradient = ({ gradients }: Theme) => {
  const initialGradientList = useMemo(
    () => Object.values(gradients),
    [gradients],
  );

  const [initialRandomGradient, updatedInitialGradientList] = useMemo(
    () => getRandomGradient(initialGradientList),
    [initialGradientList],
  );

  const [remainingGradients, setRemainingGradients] = useState<Gradient[]>(
    updatedInitialGradientList,
  );

  const [gradientHistory, setGradientHistory] = useState<Gradient[]>([
    initialRandomGradient,
  ]);

  const [currentGradientIdx, setCurrentGradientIdx] = useState(0);

  const next = () => {
    const nextIdx = currentGradientIdx + 1;

    if (!gradientHistory[nextIdx]) {
      if (remainingGradients.length === 0) {
        setCurrentGradientIdx(0);
        return;
      }

      const [newGradient, updatedGradientList] =
        getRandomGradient(remainingGradients);

      gradientHistory.push(newGradient);

      setGradientHistory([...gradientHistory]);
      setRemainingGradients([...updatedGradientList]);
    }

    setCurrentGradientIdx(nextIdx);
  };

  const prev = () => {
    const prevIdx = currentGradientIdx - 1;

    if (prevIdx < 0) {
      if (remainingGradients.length === 0) {
        setCurrentGradientIdx(gradientHistory.length - 1);
        return;
      }

      const [newGradient, updatedGradientList] =
        getRandomGradient(remainingGradients);

      gradientHistory.push(newGradient);

      setGradientHistory([...gradientHistory]);
      setRemainingGradients([...updatedGradientList]);
      setCurrentGradientIdx(gradientHistory.length - 1);
      return;
    }

    setCurrentGradientIdx(prevIdx);
  };

  return {
    gradient: gradientHistory[currentGradientIdx],
    history: gradientHistory,
    next,
    prev,
  };
};

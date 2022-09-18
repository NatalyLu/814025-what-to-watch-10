import { useState } from 'react';
import { Films } from '../types/types';

function useShowMore<T extends Films | string[]>(maxCount: number, array: T) {
  const [index, setIndex] = useState(maxCount);

  // Берём первые n элементов для отрисовки, если элементов больше не осталось, то скрываем кнопку ShowMore
  const someFilteredItems = array.slice(0, index) as T;
  const isItems = Boolean(array.length - someFilteredItems.length);

  const handleButtonClick = (): void => {
    setIndex(index + maxCount);
  };

  return {
    isMoreItemsExist: isItems,
    handleButtonClick: handleButtonClick,
    someFilteredItems: someFilteredItems,
  };
}

export default useShowMore;

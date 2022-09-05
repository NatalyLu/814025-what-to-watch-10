import { useState } from 'react';
// import { Films } from '../types/types';

// запись вида Films | string[] приводит к ошибкам в файлах genre-list.tsx и film-catalog.tsx
function useShowMore(maxCount: number, array: any[]) {
  const [index, setIndex] = useState(maxCount);

  // Берём первые n элементов для отрисовки, если элементов больше не осталось, то скрываем кнопку ShowMore
  const someFilteredItems = array.slice(0, index);
  const isItems = Boolean(array.length - someFilteredItems.length);

  const handleButtonClick = (): void => {
    setIndex(index + maxCount);
  };

  return {
    isItems: isItems,
    handleButtonClick: handleButtonClick,
    someFilteredItems: someFilteredItems,
  };
}

export default useShowMore;

import { useEffect, useState } from 'react';

type UseMockInfinityDataProps<T> = {
  fetchedEntities: T[];
  offset: number;
};

type UseMockInfinityDataType<T> = {
  entities: T[];
  onNext: () => void;
  hasMore: boolean;
};

export const useMockInfinityData = <T>({
  fetchedEntities,
  offset,
}: UseMockInfinityDataProps<T>): UseMockInfinityDataType<T> => {
  const [index, setIndex] = useState(offset);
  const [initialEntitiesLength] = useState(fetchedEntities.length);

  const startIndex = 0;

  useEffect(() => {
    if (fetchedEntities.length !== initialEntitiesLength) {
      setIndex((prevIndex) => prevIndex + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedEntities]);

  const onNext = () =>
    setTimeout(
      () =>
        setIndex(
          index + offset > fetchedEntities.length
            ? fetchedEntities.length
            : index + offset
        ),
      1000
    );

  const hasMore = fetchedEntities.length > index;

  return {
    entities: fetchedEntities.slice(startIndex, index),
    onNext,
    hasMore,
  };
};

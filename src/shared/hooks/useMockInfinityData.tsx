/* eslint-disable react-hooks/exhaustive-deps */
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

export const useMockInfinityData = <T,>({
  fetchedEntities,
  offset,
}: UseMockInfinityDataProps<T>): UseMockInfinityDataType<T> => {
  const [entities, setEntities] = useState<T[]>([]);
  const [index, setIndex] = useState(offset);
  const startIndex = 0;

  useEffect(() => {
    if (fetchedEntities.length) {
      setEntities(fetchedEntities.slice(startIndex, offset));
    }
  }, []);

  useEffect(() => {
    setEntities(fetchedEntities.slice(startIndex, index));
  }, [index]);

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

  const hasMore = fetchedEntities.length > entities.length;

  return { entities, onNext, hasMore };
};

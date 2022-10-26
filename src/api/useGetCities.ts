import { CityType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetCities = (cityId: string | null) =>
  useApiQuery<CityType[]>({
    endpoint: `cities/${cityId}`,
    queryKey: ['cities', cityId],
    enabled: Boolean(cityId),
  });

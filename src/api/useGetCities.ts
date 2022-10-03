import { useApiQuery } from 'api/useApiQuery';
import { CityType } from 'shared/types/responseTypes';

export const useGetCities = (cityId: string | null) =>
  useApiQuery<CityType[]>({
    endpoint: `cities/${cityId}`,
    queryKey: ['cities', cityId],
    enabled: Boolean(cityId),
  });

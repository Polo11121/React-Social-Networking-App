import { useApiQuery } from 'api/useApiQuery';
import { FiltersType } from 'shared/types/repeatableTypes';
import { UserType } from 'shared/types/responseTypes';

export const useGetMatchingUser = (filters: FiltersType) =>
  useApiQuery<UserType>({
    endpoint: `matches/matchingUsers?interestedCity=[${filters?.interestedCity?.location?.coordinates}]&interestedCityMaxDistance=${filters?.interestedCityMaxDistance}&interestedAge=${filters?.interestedAge}&interestedGenders=${filters?.interestedGenders}`,
    queryKey: 'matchingUsers',
  });

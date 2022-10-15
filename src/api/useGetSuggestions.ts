import { useApiQuery } from 'api/useApiQuery';
import { FiltersType } from 'shared/types/repeatableTypes';
import { UserType } from 'shared/types/responseTypes';

export const useGetSuggestions = () =>
  useApiQuery<UserType[]>({
    endpoint: `matches/suggestions`,
    queryKey: 'matchingUsers',
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

// ?interestedCity=[${filters?.interestedCity?.location?.coordinates}]&interestedCityMaxDistance=${filters?.interestedCityMaxDistance}&interestedAge=${filters?.interestedAge}&interestedGenders=${filters?.interestedGenders}

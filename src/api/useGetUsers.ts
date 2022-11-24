import { useInfiniteQuery } from 'react-query';
import { UserType } from 'shared/types/responseTypes';
import { FiltersType } from 'shared/types/repeatableTypes';
import axios from 'axios';

type UseGetUsersResponseType = { hasNextPage: boolean; data: UserType[] };

type UseGetUsersPropsType = {
  filters: FiltersType;
  randomSeed?: number;
  isSwipe?: boolean;
};

export const useGetUsers = ({
  filters,
  randomSeed = Math.random(),
  isSwipe = false,
}: UseGetUsersPropsType) => {
  const formatQueryParams = () => {
    let queryParam = '';

    if (isSwipe) {
      queryParam = queryParam.concat('&isSwipe=true');
    }
    if (filters?.interestedCity) {
      queryParam = queryParam.concat(
        `&interestedCity=[${filters.interestedCity.location.coordinates}]`
      );
    }
    if (filters?.interestedCityMaxDistance) {
      queryParam = queryParam.concat(
        `&interestedCityMaxDistance=${
          filters.interestedCityMaxDistance.endsWith('km')
            ? filters.interestedCityMaxDistance.slice(0, -2)
            : filters.interestedCityMaxDistance
        }`
      );
    }
    if (filters?.interestedAge) {
      queryParam = queryParam.concat(`&interestedAge=${filters.interestedAge}`);
    }
    if (filters?.interestedGenders) {
      queryParam = queryParam.concat(
        `&interestedGenders=${filters.interestedGenders}`
      );
    }

    return queryParam;
  };

  const getUsers = ({ pageParam = 1 }): Promise<UseGetUsersResponseType> =>
    axios
      .get(
        `/api/v1/matches/users?page=${pageParam}&limit=10${formatQueryParams()}&randomSeed=${randomSeed}`
      )
      .then((res) => res.data);

  const data = useInfiniteQuery(['users', filters], getUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  return {
    ...data,
    data: data?.data?.pages?.map((users) => users.data).flat(1) || [],
    // @ts-ignore
    results: data?.data?.pages[0].results,
  };
};

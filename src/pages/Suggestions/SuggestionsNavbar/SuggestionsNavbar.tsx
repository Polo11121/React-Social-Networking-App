import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsers } from 'api/useGetUsers';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import { Filters } from 'shared/fixtures/Filters/Filters';
import { SuggestionsList } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsList/SuggestionsList';
import { useAuthContext } from 'contexts/AuthContext';
import classNames from 'classnames';
import './SuggestionsNavbar.scss';

export const SuggestionsNavbar = () => {
  const [randomSeed] = useState(Math.random());
  const { id } = useParams();
  const {
    userInfo: { filters },
  } = useAuthContext();

  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    data: suggestions,
  } = useGetUsers({
    filters: {
      ...filters,
      interestedCity: filters?.interestedCity,
      interestedGenders: filters?.interestedGenders,
    },
    randomSeed,
  });

  return (
    <div
      className={classNames('suggestions-navbar', {
        'suggestions-navbar--hidden': id,
      })}
    >
      <div className="suggestions-navbar__header">
        <h2>Propozycje</h2>
        <Filters />
      </div>
      <WithLoader isLoading={isLoading}>
        <SuggestionsList
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          suggestions={suggestions}
        />
      </WithLoader>
    </div>
  );
};

import { useState } from 'react';
import { MatchesList } from 'pages/Matches/MatchesList/MatchesList';
import { MatchesFilters } from 'pages/Matches/MatchesFilters/MatchesFilters';
import { MatchesListOptionType } from 'shared/types/repeatableTypes';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import { useSearch } from 'shared/hooks/useSearch';
import { useGetMatches } from 'api/useGetMatches';
import './Matches.scss';

export const Matches = () => {
  const [listOption, setListOption] = useState<MatchesListOptionType>('all');
  const { value, changeValueHandler } = useSearch();
  const { isLoading } = useGetMatches();

  const changeListOptionHandler = (option: MatchesListOptionType) =>
    setListOption(option);

  return (
    <div className="matches">
      <div className="matches__container">
        <WithLoader isLoading={isLoading}>
          <MatchesFilters
            searchTerm={value}
            onSearchTermChange={changeValueHandler}
            listOption={listOption}
            onListOptionChange={changeListOptionHandler}
          />
          <MatchesList listOption={listOption} searchTerm={value} />
        </WithLoader>
      </div>
    </div>
  );
};

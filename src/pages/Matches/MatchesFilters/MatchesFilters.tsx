import { ChangeEvent } from 'react';
import { Chip } from '@mui/material';
import { Search } from 'components';
import { MatchesListOptionType } from 'shared/types/repeatableTypes';
import { useGetMatches } from 'api/useGetMatches';
import classNames from 'classnames';
import './MatchesFilters.scss';

type MatchesFiltersPropsType = {
  searchTerm: string;
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  listOption: string;
  onListOptionChange: (option: MatchesListOptionType) => void;
};
export const MatchesFilters = ({
  searchTerm,
  listOption,
  onSearchTermChange,
  onListOptionChange,
}: MatchesFiltersPropsType) => {
  const {
    data: { allCount, matchCount, receiveCount, sendCount },
  } = useGetMatches();

  const getClassnames = (option: MatchesListOptionType) =>
    classNames('matches-filters__chip', {
      'matches-filters__chip--checked': listOption === option,
    });

  return (
    <div className="matches-filters">
      <Search
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder="Znajdź użytkownika"
      />
      <div className="matches-filters__chips">
        <Chip
          label={`Wszyscy (${allCount})`}
          variant="outlined"
          className={getClassnames('all')}
          onClick={() => onListOptionChange('all')}
        />
        <Chip
          label={`Dopasowani (${matchCount})`}
          variant="outlined"
          className={getClassnames('match')}
          onClick={() => onListOptionChange('match')}
        />
        <Chip
          label={`Otrzymane prośby (${receiveCount})`}
          variant="outlined"
          className={getClassnames('request')}
          onClick={() => onListOptionChange('request')}
        />
        <Chip
          label={`Wysłane prośby (${sendCount})`}
          variant="outlined"
          className={getClassnames('none')}
          onClick={() => onListOptionChange('none')}
        />
      </div>
    </div>
  );
};

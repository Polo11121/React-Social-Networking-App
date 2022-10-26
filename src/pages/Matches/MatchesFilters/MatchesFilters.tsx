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

  const chipsList = [
    { label: `Wszyscy (${allCount})`, value: 'all' as const },
    { label: `Dopasowani (${matchCount})`, value: 'match' as const },
    { label: `Otrzymane prośby (${receiveCount})`, value: 'request' as const },
    { label: `Wysłane prośby (${sendCount})`, value: 'none' as const },
  ];

  return (
    <div className="matches-filters">
      <Search
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder="Znajdź użytkownika"
      />
      <div className="matches-filters__chips">
        {chipsList.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            variant="outlined"
            className={getClassnames(value)}
            onClick={() => onListOptionChange(value)}
          />
        ))}
      </div>
    </div>
  );
};

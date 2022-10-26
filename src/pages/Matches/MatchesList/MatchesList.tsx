import { MatchesListOptionType } from 'shared/types/repeatableTypes';
import { useGetMatches } from 'api/useGetMatches';
import { Match } from 'pages/Matches/MatchesList/Match/Match';
import { getFullName } from 'shared/functions';
import HeartBrokenSharpIcon from '@mui/icons-material/HeartBrokenSharp';
import classNames from 'classnames';
import './MatchesList.scss';

export const MatchesList = ({
  listOption,
  searchTerm,
}: {
  listOption: MatchesListOptionType;
  searchTerm: string;
}) => {
  const {
    data: { matches },
  } = useGetMatches();

  const filteredData = matches.filter(
    ({ match: { name, surname }, status }) =>
      getFullName(name, surname)
        .toUpperCase()
        .includes(searchTerm.toUpperCase()) &&
      (listOption === 'all' || status === listOption)
  );

  return (
    <div
      className={classNames('matches-list', {
        'matches-list--empty': !matches.length,
      })}
    >
      {matches.length ? (
        filteredData.map(({ match, status }) => (
          <Match
            key={match._id}
            name={match.name}
            surname={match.surname}
            profileImage={match.profileImage}
            status={status}
            id={match._id}
          />
        ))
      ) : (
        <>
          <HeartBrokenSharpIcon style={{ fontSize: '8rem' }} />
          <h2>Brak dopasowań.</h2>
        </>
      )}
    </div>
  );
};

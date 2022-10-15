import { MatchesListOptionType } from 'shared/types/repeatableTypes';
import { useGetMatches } from 'api/useGetMatches';
import { Match } from 'pages/Matches/MatchesList/Match/Match';
import { getFullName } from 'shared/functions';
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
    <div className="matches-list">
      {filteredData.map(({ match, status }) => (
        <Match
          name={match.name}
          surname={match.surname}
          profileImage={match.profileImage}
          status={status}
          id={match._id}
        />
      ))}
    </div>
  );
};

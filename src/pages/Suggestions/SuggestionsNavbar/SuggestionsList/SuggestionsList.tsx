import { useSuggestionsContext } from 'contexts/SuggestionsContext';
import { Suggestion } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsList/Suggestion/Suggestion';
import { UserType } from 'shared/types/responseTypes';

export const SuggestionsList = ({
  suggestions,
}: {
  suggestions: UserType[];
}) => {
  const { requestedUsers } = useSuggestionsContext();

  return (
    <div style={{ overflowY: 'auto', margin: '1rem 0', height: '100%' }}>
      {suggestions.map(
        ({ birthDate, name, surname, _id, home, profileImage }) => (
          <Suggestion
            name={name}
            surname={surname}
            id={_id}
            birthDate={birthDate}
            city={home?.city}
            profileImage={profileImage}
            requested={requestedUsers.includes(_id)}
          />
        )
      )}
    </div>
  );
};

import { BouncingDotsLoader } from 'components';
import { useSuggestionsContext } from 'contexts/SuggestionsContext';
import { Suggestion } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsList/Suggestion/Suggestion';
import { UserType } from 'shared/types/responseTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import './SuggestionsList.scss';

type SuggestionsListPropsType = {
  suggestions: UserType[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
};
export const SuggestionsList = ({
  suggestions,
  fetchNextPage,
  hasNextPage,
}: SuggestionsListPropsType) => {
  const { requestedUsers } = useSuggestionsContext();

  return (
    <div id="scrollableDiv" className="suggestions-list">
      {suggestions.length ? (
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={suggestions.length}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={<BouncingDotsLoader testId="suggestions-" />}
        >
          {suggestions.map(
            ({ birthDate, name, surname, _id, home, profileImage }) => (
              <Suggestion
                key={_id}
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
        </InfiniteScroll>
      ) : (
        <span className="suggestions-list__message">Brak propozycji.</span>
      )}
    </div>
  );
};

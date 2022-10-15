import { useParams } from 'react-router-dom';
import { useGetSuggestions } from 'api/useGetSuggestions';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import { SuggestionsList } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsList/SuggestionsList';
import classNames from 'classnames';
import './SuggestionsNavbar.scss';

export const SuggestionsNavbar = () => {
  const { id } = useParams();
  const { isLoading, isRefetching, data: suggestions } = useGetSuggestions();

  return (
    <div
      className={classNames('suggestions-navbar', {
        'suggestions-navbar--hide': id,
      })}
    >
      <div className="suggestions-navbar__header">
        <h2>Propozycje</h2>
      </div>
      <WithLoader isLoading={isLoading || isRefetching}>
        <SuggestionsList suggestions={suggestions} />
      </WithLoader>
    </div>
  );
};

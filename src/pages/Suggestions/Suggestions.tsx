import { SuggestionsContent } from 'pages/Suggestions/SuggestionsContent/SuggestionsContent';
import { SuggestionsNavbar } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsNavbar';
import { SuggestionsContextProvider } from 'contexts/SuggestionsContext';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import './Suggestions.scss';

export const Suggestions = () => {
  const { id } = useParams();

  return (
    <SuggestionsContextProvider>
      <div
        className={classNames('suggestions', {
          'suggestions--full-width': !id,
        })}
      >
        <SuggestionsNavbar />
        <SuggestionsContent />
      </div>
    </SuggestionsContextProvider>
  );
};

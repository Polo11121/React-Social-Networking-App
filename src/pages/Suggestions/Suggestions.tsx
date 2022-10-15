import { SuggestionsContextProvider } from 'contexts/SuggestionsContext';
import { SuggestionsContent } from 'pages/Suggestions/SuggestionsContent/SuggestionsContent';
import { SuggestionsNavbar } from 'pages/Suggestions/SuggestionsNavbar/SuggestionsNavbar';
import './Suggestions.scss';

export const Suggestions = () => (
  <SuggestionsContextProvider>
    <div className="suggestions">
      <SuggestionsNavbar />
      <SuggestionsContent />
    </div>
  </SuggestionsContextProvider>
);

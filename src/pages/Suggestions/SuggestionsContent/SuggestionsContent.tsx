import { useParams } from 'react-router-dom';
import { Profile } from 'pages/Profile/Profile';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import classNames from 'classnames';
import './SuggestionsContent.scss';

export const SuggestionsContent = () => {
  const { id } = useParams();

  return (
    <div
      className={classNames('suggestions-content', {
        'suggestions-content--hidden': !id,
      })}
    >
      {id ? (
        <Profile />
      ) : (
        <div className="suggestions-content__message">
          <PeopleOutlineIcon style={{ fontSize: '8rem' }} />
          <h2>
            Wybierz imię i nazwisko osoby, aby wyświetlić podgląd jej profilu.
          </h2>
        </div>
      )}
    </div>
  );
};

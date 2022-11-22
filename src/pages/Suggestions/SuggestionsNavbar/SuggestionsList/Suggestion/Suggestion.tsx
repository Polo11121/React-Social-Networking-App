import { Link, useParams } from 'react-router-dom';
import { getAge, getFullName } from 'shared/functions';
import { useMatchFunctionality } from 'shared/features/useMatchFunctionality/useMatchFunctionality';
import { Button, Avatar } from 'components';
import classNames from 'classnames';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import './Suggestion.scss';

type SuggestionPropsType = {
  name: string;
  surname: string;
  birthDate: Date;
  city: string;
  id: string;
  profileImage: string;
  requested: boolean;
};

export const Suggestion = ({
  name,
  surname,
  birthDate,
  city,
  id,
  profileImage,
  requested,
}: SuggestionPropsType) => {
  const { id: paramsId } = useParams();
  const { requestMatchHandler, cancelMatchHandler } = useMatchFunctionality({
    userId: id,
  });

  return (
    <Link
      to={`/suggestions/${id}`}
      className={classNames('suggestion', {
        'suggestion--active': id === paramsId,
      })}
      data-testid={`suggestion-${name}-${surname}-link`}
    >
      <>
        <Avatar className="suggestion__avatar" src={profileImage} />
        <div className="suggestion__info">
          <div>
            {getFullName(name, surname)}, {getAge(birthDate)}
          </div>
          {city && <div>{city}</div>}
          {requested ? (
            <Button
              style={{ marginTop: '0.5rem' }}
              onClick={cancelMatchHandler}
              Icon={<HeartBrokenIcon />}
              fullWidth
              text="Anuluj"
              buttonStyleType="mandy"
            />
          ) : (
            <Button
              style={{ marginTop: '0.5rem' }}
              onClick={requestMatchHandler}
              Icon={<FavoriteIcon />}
              fullWidth
              text="Wyślij prośbę"
              buttonStyleType="primary"
            />
          )}
        </div>
      </>
    </Link>
  );
};

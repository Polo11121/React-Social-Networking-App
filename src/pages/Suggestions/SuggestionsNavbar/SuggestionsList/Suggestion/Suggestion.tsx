import { Avatar } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getAge, getFullName } from 'shared/functions';
import { useMatchFunctionality } from 'shared/hooks/useMatchFunctionality';
import { Button } from 'components';
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
  const { requestMatch, rejectMatch } = useMatchFunctionality({ userId: id });

  return (
    <Link
      to={`/suggestions/${id}`}
      className={classNames('suggestion', {
        'suggestion--active': id === paramsId,
      })}
    >
      <>
        <Avatar className="suggestion__avatar" src={profileImage} />
        <div className="suggestion__info">
          <div>{getFullName(name, surname)}</div>
          <div>
            {city}, {getAge(birthDate)}
          </div>
          {requested ? (
            <Button
              style={{ marginTop: '0.5rem' }}
              onClick={rejectMatch}
              Icon={<HeartBrokenIcon />}
              fullWidth
              text="Anuluj"
              buttonStyleType="mandy"
            />
          ) : (
            <Button
              style={{ marginTop: '0.5rem' }}
              onClick={requestMatch}
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

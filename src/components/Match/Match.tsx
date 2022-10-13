import { useMatchFunctionality } from 'shared/hooks/useMatchFunctionality';
import { getFullName } from 'shared/functions';
import { Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import classnames from 'classnames';
import './Match.scss';

type MatchPropsType = {
  status: 'none' | 'match' | 'request';
  name: string;
  surname: string;
  profileImage: string;
  id: string;
};

export const Match = ({
  status,
  name,
  surname,
  profileImage,
  id,
}: MatchPropsType) => {
  const { matchButtons, matchStatus, isMatch, goToProfile } =
    useMatchFunctionality({
      userId: id,
      userStatus: status,
    });

  return (
    <div className="match">
      <div onClick={goToProfile} className="match__info">
        <Avatar
          className="match__avatar"
          src={profileImage}
          alt={getFullName(name, surname)}
        />
        <h2 className="match__name">{getFullName(name, surname)}</h2>
      </div>
      <span className={classnames({ match__mandy: isMatch })}>
        {matchStatus()}
        {isMatch && <FavoriteIcon className="match__mandy" />}
      </span>
      <div className="match__buttons">{matchButtons()}</div>
    </div>
  );
};

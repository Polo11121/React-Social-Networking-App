import { forwardRef } from 'react';
import { HobbiesIcon } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesIcon/HobbiesIcon';
import { UserType } from 'shared/types/responseTypes';
import { getAge } from 'shared/functions';
import { Chip } from '@mui/material';
import TinderCard from 'react-tinder-card';
import classNames from 'classnames';
import './SwipeCard.scss';

type SwipeCardPropsType = {
  onSwipe: (direction: string, index: number, userId: string) => void;
  onCardLeftScreen: (index: number) => void;
  user: UserType;
  index: number;
  isHidden: boolean;
};

export const SwipeCard = forwardRef<HTMLDivElement, SwipeCardPropsType>(
  ({ onSwipe, index, user, onCardLeftScreen, isHidden }, ref) => {
    const { hobbies, name, description, birthDate, profileImage } = user;

    return (
      <div className="swipe-card" style={{ zIndex: 1000 - index }}>
        <TinderCard
          // @ts-ignore
          ref={ref}
          onSwipe={(direction) => onSwipe(direction, index, user._id)}
          onCardLeftScreen={() => onCardLeftScreen(index)}
          preventSwipe={['up', 'down']}
          className={classNames('swipe-card__content', {
            'swipe-card__content--hidden': isHidden,
          })}
        >
          <img className="swipe-card__image" src={profileImage} alt="" />
          <div
            className={classNames('swipe-card__container', {
              'swipe-card__container--extend': hobbies.length || description,
            })}
          >
            <div className="swipe-card__info">
              {name}, {getAge(birthDate)}
            </div>

            <div>{description}</div>
            {Boolean(hobbies.length) && (
              <div className="swipe-card__info">Zainteresowania:</div>
            )}
            <div className="swipe-card__hobbies">
              {hobbies?.map(({ icon, text, _id }) => (
                <Chip
                  icon={
                    <HobbiesIcon className="swipe-card__chip" iconName={icon} />
                  }
                  key={_id}
                  label={text}
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        </TinderCard>
      </div>
    );
  }
);

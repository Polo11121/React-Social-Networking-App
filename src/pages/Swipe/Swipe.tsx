import { useState, useRef, createRef, useMemo } from 'react';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import { SwipeCard } from 'pages/Swipe/SwipeCard/SwipeCard';
import { Filters } from 'shared/features/Filters/Filters';
import { IconButton } from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import { useGetUsers } from 'api/useGetUsers';
import { useMatch } from 'api/useMatch';
import RefreshIcon from '@mui/icons-material/Refresh';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import HeartBrokenSharpIcon from '@mui/icons-material/HeartBrokenSharp';
import classNames from 'classnames';
import './Swipe.scss';

export const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState('');
  const currentIndexRef = useRef(currentIndex);

  const {
    userInfo: { filters, gender },
  } = useAuthContext();

  const {
    fetchNextPage,
    isFetching,
    data: users, // @ts-ignore
    results,
    hasNextPage,
  } = useGetUsers({ filters, isSwipe: true });
  const { mutateAsync } = useMatch();

  const childRefs = useMemo(
    () =>
      Array(results)
        .fill(0)
        .map(() => createRef()),
    [results]
  );

  const updateCurrentIndexHandler = (index: number) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const swipedHandler = (direction: string, index: number, userId: string) => {
    setLastDirection(direction);
    updateCurrentIndexHandler(index + 1);

    mutateAsync({ userId, status: direction }).then(() => {
      if (currentIndex === users.length - 1 && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  const outOfFrameHandler = (index: number) => {
    if (currentIndexRef.current <= index) {
      // @ts-ignore
      childRefs[index].current.restoreCard();
    }
  };

  const swipeHandler = async (direction: string) => {
    if (currentIndex <= results - 1) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(direction);
    }
  };

  const goBackHandler = async () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      mutateAsync({ userId: users[newIndex]._id, status: 'none' });
      updateCurrentIndexHandler(newIndex);
      // @ts-ignore
      await childRefs[newIndex].current.restoreCard();
    }
  };

  const swipeMessage = () => {
    if (!lastDirection) {
      return 'Przesuń żeby uzyskać dopasowanie';
    }

    return `
Przesunął${gender === 'male' ? 'eś' : 'aś'} w ${
      lastDirection === 'left' ? 'lewo' : 'prawo'
    }`;
  };

  const isEmptyMessageVisible =
    !users.length || (users.length === currentIndex && !hasNextPage);

  return (
    <div className="swipe">
      <Filters />
      <div className="swipe__cards">
        <WithLoader isLoading={isFetching}>
          <>
            {users.map((user, index) => (
              <SwipeCard
                user={user}
                isHidden={index < currentIndex}
                // @ts-ignore
                ref={childRefs[index]}
                key={user._id}
                index={index}
                onSwipe={swipedHandler}
                onCardLeftScreen={outOfFrameHandler}
              />
            ))}
            <div
              className={classNames('swipe__empty', {
                'swipe__empty--visible': isEmptyMessageVisible,
              })}
            >
              <HeartBrokenSharpIcon style={{ fontSize: '8rem' }} />
              <h2>Brak dopasowań.</h2>
            </div>
          </>
        </WithLoader>
      </div>
      <div
        className={classNames('swipe__buttons', {
          'swipe__buttons--hidden': !users.length,
        })}
      >
        <IconButton
          onClick={() => swipeHandler('left')}
          className="swipe__button"
          disableRipple
          data-testid="swipe-left-button"
        >
          <CloseIcon className="swipe__icon swipe__icon--left" />
        </IconButton>
        <IconButton
          className="swipe__button"
          disableRipple
          onClick={goBackHandler}
          data-testid="swipe-undo-button"
        >
          <RefreshIcon className="swipe__icon swipe__icon--refresh" />
        </IconButton>
        <IconButton
          onClick={() => swipeHandler('right')}
          className="swipe__button"
          disableRipple
          data-testid="swipe-right-button"
        >
          <FavoriteIcon className="swipe__icon swipe__icon--right" />
        </IconButton>
      </div>
      <h2
        className={classNames('swipe__message', {
          'swipe__message--hidden': !users.length,
        })}
      >
        {swipeMessage()}
      </h2>
    </div>
  );
};

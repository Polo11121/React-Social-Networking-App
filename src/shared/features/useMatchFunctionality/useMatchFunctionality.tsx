import { useState } from 'react';
import { useSuggestionsContext } from 'contexts/SuggestionsContext';
import { RejectMatchModal } from 'shared/features/useMatchFunctionality/RejectMatchModal/RejectMatchModal';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { useMatch } from 'api/useMatch';
import { Button } from 'components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ChatIcon from '@mui/icons-material/Chat';

type UseMatchFunctionalityPropsType = {
  userId: string;
  myStatus?: string;
  userStatus?: string;
};

export const useMatchFunctionality = ({
  userId,
  myStatus,
  userStatus,
}: UseMatchFunctionalityPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();
  const { mutateAsync, isLoading } = useMatch(userId);
  const { addRequestedUserHandler, removeRequestedUserHandler } =
    useSuggestionsContext();

  const navigateToChatHandler = () => navigate(`/chat/${userId}`);

  const navigateToProfileHandler = () => navigate(`/profile/${userId}`);

  const changeModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  const requestMatchHandler = () =>
    mutateAsync({ userId, status: 'request' }).then(() => {
      addRequestedUserHandler(userId);
    });

  const rejectMatchHandler = () =>
    mutateAsync({ userId, status: 'reject' }).then(() => {
      removeRequestedUserHandler(userId);
    });

  const cancelMatchHandler = () =>
    mutateAsync({ userId, status: 'none' }).then(() => {
      removeRequestedUserHandler(userId);
    });

  const isMatch = myStatus
    ? userStatus === 'match' && myStatus === 'match'
    : userStatus === 'match';

  const profileButtons = () => {
    if (isAdmin) {
      return null;
    }

    if (
      !myStatus ||
      myStatus === 'reject' ||
      (myStatus === 'none' && userStatus === 'none') ||
      myStatus === 'left' ||
      myStatus === 'right' ||
      userStatus === 'left' ||
      userStatus === 'right'
    ) {
      return (
        <Button
          onClick={requestMatchHandler}
          Icon={<FavoriteIcon />}
          text="Wyślij prośbę o dopasowanie"
          buttonStyleType="primary"
          testId="match-request-button"
        />
      );
    }

    if (userStatus === 'request') {
      return (
        <>
          <Button
            onClick={rejectMatchHandler}
            Icon={<HeartBrokenIcon />}
            text="Odrzuć prośbę"
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={requestMatchHandler}
            Icon={<FavoriteIcon />}
            text="Akceptuj prośbę"
            buttonStyleType="primary"
            testId="match-accept-button"
          />
        </>
      );
    }

    if (isMatch) {
      return (
        <>
          <Button
            onClick={changeModalVisibilityHandler}
            Icon={<HeartBrokenIcon />}
            text="Anuluj dopasowanie"
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={navigateToChatHandler}
            Icon={<ChatIcon />}
            text="Czat"
            buttonStyleType="primary"
            testId="match-chat-button"
          />
          {isModalOpen && (
            <RejectMatchModal
              isLoading={isLoading}
              isOpen={isModalOpen}
              rejectMatch={rejectMatchHandler}
              onClose={changeModalVisibilityHandler}
            />
          )}
        </>
      );
    }

    if (userStatus === 'reject') {
      return null;
    }

    if (myStatus === 'request') {
      return (
        <Button
          onClick={cancelMatchHandler}
          Icon={<HeartBrokenIcon />}
          text="Anuluj prośbę"
          buttonStyleType="mandy"
          testId="match-reject-button"
        />
      );
    }
    return null;
  };

  const matchButtons = () => {
    if (userStatus === 'request') {
      return (
        <>
          <Button
            onClick={rejectMatchHandler}
            Icon={<HeartBrokenIcon />}
            text="Odrzuć"
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={requestMatchHandler}
            Icon={<FavoriteIcon />}
            text="Akceptuj"
            buttonStyleType="primary"
            testId="match-accept-button"
          />
        </>
      );
    }
    if (isMatch) {
      return (
        <>
          <Button
            onClick={changeModalVisibilityHandler}
            Icon={<HeartBrokenIcon />}
            text="Anuluj"
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={navigateToChatHandler}
            Icon={<ChatIcon />}
            text="Czat"
            buttonStyleType="primary"
            testId="match-chat-button"
          />
          {isModalOpen && (
            <RejectMatchModal
              isLoading={isLoading}
              isOpen={isModalOpen}
              rejectMatch={rejectMatchHandler}
              onClose={changeModalVisibilityHandler}
            />
          )}
        </>
      );
    }
    return (
      <Button
        onClick={cancelMatchHandler}
        Icon={<HeartBrokenIcon />}
        text="Anuluj"
        buttonStyleType="mandy"
        testId="match-reject-button"
      />
    );
  };

  const matchStatus = () => {
    if (userStatus === 'none') {
      return 'Wysłano prośbe o dopasowanie';
    }
    if (userStatus === 'request') {
      return 'Otrzymano prośbe o dopasowanie';
    }
    return 'Dopasowanie';
  };

  return {
    isMatch,
    navigateToProfileHandler,
    matchButtons: myStatus ? profileButtons : matchButtons,
    matchStatus,
    requestMatchHandler,
    rejectMatchHandler,
    cancelMatchHandler,
  };
};

import { useState } from 'react';
import { useSuggestionsContext } from 'contexts/SuggestionsContext';
import { RejectMatchModal } from 'shared/features/useMatchFunctionality/RejectMatchModal/RejectMatchModal';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { useMatch } from 'api/useMatch';
import { Button } from 'components';
import { useQueryClient } from 'react-query';
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
  const [requestStatus, setRequestStatus] = useState<
    'request' | 'reject' | null
  >(null);
  const { mutateAsync, isLoading } = useMatch(userId);
  const { addRequestedUserHandler, removeRequestedUserHandler } =
    useSuggestionsContext();
  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['user', userId]);
    queryClient.invalidateQueries('matches');
  };

  const navigateToChatHandler = () => navigate(`/chat/${userId}`);

  const navigateToProfileHandler = () => navigate(`/profile/${userId}`);

  const changeModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  const requestMatchHandler = () => {
    setRequestStatus('request');

    return mutateAsync({ userId, status: 'request' }).then(() => {
      invalidateQueries();
      addRequestedUserHandler(userId);
    });
  };

  const rejectMatchHandler = () => {
    setRequestStatus('reject');

    return mutateAsync({ userId, status: 'reject' }).then(() => {
      invalidateQueries();
      removeRequestedUserHandler(userId);
    });
  };

  const cancelMatchHandler = () => {
    return mutateAsync({ userId, status: 'none' }).then(() => {
      invalidateQueries();
      removeRequestedUserHandler(userId);
    });
  };

  const isMatch = myStatus
    ? userStatus === 'match' && myStatus === 'match'
    : userStatus === 'match';

  const isAcceptButtonLoading =
    requestStatus !== 'reject' && (requestStatus === 'request' || isLoading);

  const isRejectButtonLoading =
    requestStatus !== 'request' && (requestStatus === 'reject' || isLoading);

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
          isLoading={isLoading}
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
            isLoading={isRejectButtonLoading}
            isDisabled={Boolean(requestStatus)}
            text="Odrzuć prośbę"
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={requestMatchHandler}
            Icon={<FavoriteIcon />}
            isLoading={isAcceptButtonLoading}
            text="Akceptuj prośbę"
            isDisabled={Boolean(requestStatus)}
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
      if (requestStatus) {
        setRequestStatus(null);
      }

      return null;
    }

    if (myStatus === 'request') {
      return (
        <Button
          onClick={cancelMatchHandler}
          Icon={<HeartBrokenIcon />}
          isLoading={isLoading}
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
            isLoading={isRejectButtonLoading}
            isDisabled={Boolean(requestStatus)}
            buttonStyleType="mandy"
            testId="match-reject-button"
          />
          <Button
            onClick={requestMatchHandler}
            text="Akceptuj"
            Icon={<FavoriteIcon />}
            isLoading={isAcceptButtonLoading}
            isDisabled={Boolean(requestStatus)}
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

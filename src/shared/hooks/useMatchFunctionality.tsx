import { useSuggestionsContext } from 'contexts/SuggestionsContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { mutateAsync } = useMatch(userId);
  const { addRequestedUser, removeRequestedUser } = useSuggestionsContext();

  const navigateToChat = () => navigate(`/chat/${userId}`);

  const navigateToProfile = () => navigate(`/profile/${userId}`);

  const requestMatch = () => {
    mutateAsync({ userId, status: 'request' }).then(() => {
      addRequestedUser(userId);
    });
  };

  const rejectMatch = () => {
    mutateAsync({ userId, status: 'reject' }).then(() => {
      removeRequestedUser(userId);
    });
  };

  const cancelMatch = () => {
    mutateAsync({ userId, status: 'none' }).then(() => {
      removeRequestedUser(userId);
    });
  };

  const isMatch = myStatus
    ? userStatus === 'match' && myStatus === 'match'
    : userStatus === 'match';

  const profileButtons = () => {
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
          onClick={requestMatch}
          Icon={<FavoriteIcon />}
          text="Wyślij prośbę o dopasowanie"
          buttonStyleType="primary"
        />
      );
    }

    if (userStatus === 'request') {
      return (
        <>
          <Button
            onClick={requestMatch}
            Icon={<FavoriteIcon />}
            text="Akceptuj prośbę"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Odrzuć prośbę"
            buttonStyleType="mandy"
          />
        </>
      );
    }

    if (isMatch) {
      return (
        <>
          <Button
            onClick={navigateToChat}
            Icon={<ChatIcon />}
            text="Czat"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Anuluj dopasowanie"
            buttonStyleType="mandy"
          />
        </>
      );
    }

    if (userStatus === 'reject') {
      return null;
    }

    if (myStatus === 'request') {
      return (
        <Button
          onClick={cancelMatch}
          Icon={<HeartBrokenIcon />}
          text="Anuluj prośbę"
          buttonStyleType="mandy"
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
            onClick={requestMatch}
            Icon={<FavoriteIcon />}
            text="Akceptuj"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Odrzuć"
            buttonStyleType="mandy"
          />
        </>
      );
    }
    if (isMatch) {
      return (
        <>
          <Button
            onClick={navigateToChat}
            Icon={<ChatIcon />}
            text="Czat"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Anuluj"
            buttonStyleType="mandy"
          />
        </>
      );
    }
    return (
      <Button
        onClick={cancelMatch}
        Icon={<HeartBrokenIcon />}
        text="Anuluj"
        buttonStyleType="mandy"
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
    navigateToProfile,
    matchButtons: myStatus ? profileButtons : matchButtons,
    matchStatus,
    requestMatch,
    rejectMatch,
  };
};

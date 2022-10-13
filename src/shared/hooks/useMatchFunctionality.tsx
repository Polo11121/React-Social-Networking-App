import { useNavigate } from 'react-router-dom';
import { useMatch } from 'api/useMatch';
import { Button } from 'components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ChatIcon from '@mui/icons-material/Chat';

type UseMatchFunctionalityType = {
  userId: string;
  myStatus?: string;
  userStatus?: string;
};

export const useMatchFunctionality = ({
  userId,
  myStatus,
  userStatus,
}: UseMatchFunctionalityType) => {
  const navigate = useNavigate();
  const { mutate } = useMatch(userId);

  const goToChat = () => navigate(`/chat/${userId}`);

  const goToProfile = () => navigate(`/profile/${userId}`);

  const requestMatch = () => mutate({ userId, status: 'request' });

  const rejectMatch = () => mutate({ userId, status: 'reject' });

  const isMatch = myStatus
    ? userStatus === 'match' && myStatus === 'match'
    : userStatus === 'match';

  const profileButtons = () => {
    if (
      !myStatus ||
      myStatus === 'reject' ||
      (myStatus === 'none' && userStatus === 'none')
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
            onClick={goToChat}
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
          onClick={rejectMatch}
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
            onClick={goToChat}
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
        onClick={rejectMatch}
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
    goToProfile,
    matchButtons: myStatus ? profileButtons : matchButtons,
    matchStatus,
  };
};

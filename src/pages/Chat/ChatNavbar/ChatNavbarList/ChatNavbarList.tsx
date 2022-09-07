import { useParams } from 'react-router-dom';
import { ChatNavbarListItem } from 'pages/Chat/ChatNavbar/ChatNavbarList/ChatNavbarListItem/ChatNavbarListItem';

export const ChatNavbarList = () => {
  const { id } = useParams();

  return (
    <div style={{ overflowY: 'auto', margin: '1rem 0' }}>
      <ChatNavbarListItem
        isActive={id === '63161b5577b19063105bb89b'}
        userId="63161b5577b19063105bb89b"
        avatar="https://i1.fdbimg.pl/x1/07jzjf32/680x986_r5llfk.jpg"
        fullName="Katie KoX"
        lastMessage="elo"
      />
      <ChatNavbarListItem
        isActive={id === '6316481a1b793e25dc9c2345'}
        userId="6316481a1b793e25dc9c2345"
        avatar="https://i1.fdbimg.pl/x1/07jzjf32/680x986_r5llfk.jpg"
        fullName="Katie KoX"
        lastMessage="elo"
      />
    </div>
  );
};

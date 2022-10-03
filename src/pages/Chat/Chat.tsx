import { ChatNavbar } from 'pages/Chat/ChatNavbar/ChatNavbar';
import { ChatContent } from 'pages/Chat/ChatContent/ChatContent';
import './Chat.scss';

export const Chat = () => (
  <div className="chat">
    <ChatNavbar />
    <ChatContent />
  </div>
);

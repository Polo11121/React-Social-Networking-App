import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChatNavbar } from 'pages/Chat/ChatNavbar/ChatNavbar';
import { ChatContent } from 'pages/Chat/ChatContent/ChatContent';
import { useAuthContext } from 'contexts/AuthContext';
import { useQueryClient } from 'react-query';
import './Chat.scss';

export const Chat = () => {
  const { socket } = useAuthContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (userId: string) =>
        queryClient.invalidateQueries(['messages', userId])
      );
    }
  });

  return (
    <div className="chat">
      <ChatNavbar />
      <Routes>
        <Route path=":id" element={<ChatContent />} />
      </Routes>
    </div>
  );
};

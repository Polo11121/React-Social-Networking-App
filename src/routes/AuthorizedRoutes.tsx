import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Profile } from 'pages/Profile/Profile';
import { Chat } from 'pages/Chat/Chat';
import { Matches } from 'pages/Matches/Matches';
import { ProposedPeople } from 'pages/ProposedPeople/ProposedPeople';
import { AppTopHeader } from 'shared/fixtures/AppTopHeader/AppTopHeader';
import { AppBottomHeader } from 'shared/fixtures/AppBottomHeader/AppBottomHeader';

export const AuthorizedRoutes = () => (
  <>
    <AppTopHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="chat" element={<Chat />} />
      <Route path="chat/:id" element={<Chat />} />
      <Route path="profile/:id/*" element={<Profile />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/proposedPeople" element={<ProposedPeople />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <AppBottomHeader />
  </>
);

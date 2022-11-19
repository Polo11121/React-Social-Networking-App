import { ProfileDetailsOverview } from 'pages/Profile/ProfileDetails/ProfileDetailsOverview/ProfileDetailsOverview';
import { ProfileWorkAndEducation } from 'pages/Profile/ProfileDetails/ProfileWorkAndEducation/ProfileWorkAndEducation';
import { ProfileDetailsPlaces } from 'pages/Profile/ProfileDetails/ProfileDetailsPlaces/ProfileDetailsPlaces';
import { ProfileDetailsContactAndBasicInfo } from 'pages/Profile/ProfileDetails/ProfileDetailsContactAndBasicInfo/ProfileDetailsContactAndBasicInfo';
import { ProfileDetailsChangePassword } from 'pages/Profile/ProfileDetails/ProfileDetailsChangePassword/ProfileDetailsChangePassword';
import { ProfileDetailsDeleteAccount } from 'pages/Profile/ProfileDetails/ProfileDetailsDeleteAccount/ProfileDetailsDeleteAccount';
import { ProfilePhotos } from 'pages/Profile/ProfilePhotos/ProfilePhotos';
import { ProfileInfo } from 'pages/Profile/ProfileInfo/ProfileInfo';
import { ProfilePosts } from 'pages/Profile/ProfilePosts/ProfilePosts';
import { ProfileDetails } from 'pages/Profile/ProfileDetails/ProfileDetails';
import { Navigate } from 'react-router-dom';
import { Chat } from 'pages/Chat/Chat';
import { Swipe } from 'pages/Swipe/Swipe';
import { Matches } from 'pages/Matches/Matches';
import { Profile } from 'pages/Profile/Profile';
import { Suggestions } from 'pages/Suggestions/Suggestions';
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword';
import { Main } from 'pages/Main/Main';
import { ResetPassword } from 'pages/ResetPassword/ResetPassword';
import { ConfirmAccount } from 'pages/ConfirmAccount/ConfirmAccount';
import { ProfileDetailsChangeEmail } from 'pages/Profile/ProfileDetails/ProfileDetailsChangeEmail/ProfileDetailsChangeEmail';
import { ChangeEmail } from 'pages/ChangeEmail/ChangeEmail';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { AllReports } from 'pages/AllReports/AllReports';
import { NewReports } from 'pages/NewReports/NewReports';
import { SolvedReports } from 'pages/SolvedReports/SolvedReports';
import { MyReports } from 'pages/MyReports/MyReports';
import { Users } from 'pages/Users/Users';
import { Administrators } from 'pages/Administrators/Administrators';
import { AdminProfile } from 'pages/AdminProfile/AdminProfile';

export const profileDetailsRoutes = [
  {
    path: 'overview',
    Component: <ProfileDetailsOverview />,
  },
  {
    path: 'work-and-education',
    Component: <ProfileWorkAndEducation />,
  },
  {
    path: 'places',
    Component: <ProfileDetailsPlaces />,
  },
  {
    path: 'contact-and-basic-info',
    Component: <ProfileDetailsContactAndBasicInfo />,
  },
  {
    path: 'change-password',
    Component: <ProfileDetailsChangePassword />,
  },
  {
    path: 'change-email',
    Component: <ProfileDetailsChangeEmail />,
  },
  {
    path: 'delete-account',
    Component: <ProfileDetailsDeleteAccount />,
  },
  {
    path: '*',
    Component: <Navigate to="overview" replace />,
  },
];

export const profileContentRoutes = [
  {
    path: 'posts',
    Component: (
      <>
        <ProfileInfo />
        <ProfilePosts />
      </>
    ),
  },
  {
    path: 'photos',
    Component: <ProfilePhotos />,
  },
  {
    path: 'details/*',
    Component: <ProfileDetails />,
  },
  {
    path: '*',
    Component: <Navigate to="posts" replace />,
  },
];

export const userAuthorizedRoutes = (userId: string) => [
  {
    path: '/swipe',
    Component: <Swipe />,
  },
  {
    path: 'chat',
    Component: <Chat />,
  },
  {
    path: 'chat/:id',
    Component: <Chat />,
  },
  {
    path: 'profile/:id/*',
    Component: <Profile />,
  },
  {
    path: '/matches',
    Component: <Matches />,
  },
  {
    path: '/suggestions',
    Component: <Suggestions />,
  },
  {
    path: '/suggestions/:id/*',
    Component: <Suggestions />,
  },
  {
    path: '/change-email/:token',
    Component: <ChangeEmail />,
  },
  {
    path: '*',
    Component: <Navigate to={`/profile/${userId}`} replace />,
  },
];

export const adminAuthorizedRoutes = () => [
  {
    path: '',
    Component: <Dashboard />,
  },
  {
    path: '/all-reports',
    Component: <AllReports />,
  },
  {
    path: '/new-reports',
    Component: <NewReports />,
  },
  {
    path: '/solved-reports',
    Component: <SolvedReports />,
  },
  {
    path: '/my-reports',
    Component: <MyReports />,
  },
  {
    path: '/users',
    Component: <Users />,
  },
  {
    path: 'profile/:id/*',
    Component: <Profile />,
  },
  {
    path: '/administrators',
    Component: <Administrators />,
  },
  {
    path: 'admin-profile/:id',
    Component: <AdminProfile />,
  },
  {
    path: '*',
    Component: <Navigate to="" replace />,
  },
];

export const unauthorizedRoutes = [
  {
    path: '/',
    Component: <Main />,
  },
  {
    path: '/forgot-password',
    Component: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    Component: <ResetPassword />,
  },
  {
    path: '/confirm-account/:token',
    Component: <ConfirmAccount />,
  },
  {
    path: '/change-email/:token',
    Component: <ChangeEmail />,
  },
  {
    path: '*',
    Component: <Navigate to="/" replace />,
  },
];

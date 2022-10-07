import { Header } from 'components';
import { AvatarDropdown } from 'shared/fixtures/AvatarDropdown/AvatarDropdown';
import { HeaderNavigation } from 'shared/fixtures/HeaderNavigation/HeaderNavigation';
import { UsersSearch } from 'shared/fixtures/UsersSearch/UsersSearch';

export const AppTopHeader = () => (
  <Header search={<UsersSearch />}>
    <HeaderNavigation />
    <AvatarDropdown />
  </Header>
);

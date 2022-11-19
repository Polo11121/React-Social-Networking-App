import { Header } from 'components';
import { AvatarDropdown } from 'shared/features/AvatarDropdown/AvatarDropdown';
import { HeaderNavigation } from 'shared/features/HeaderNavigation/HeaderNavigation';
import { UsersSearch } from 'shared/features/UsersSearch/UsersSearch';

export const AppTopHeader = () => (
  <Header isLink={false} search={<UsersSearch />}>
    <HeaderNavigation />
    <AvatarDropdown />
  </Header>
);

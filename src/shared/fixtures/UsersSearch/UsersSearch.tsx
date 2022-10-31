import { useRef } from 'react';
import { useGetUsersBySearchTerm } from 'api/useGetUsersBySearchTerm';
import { Spinner } from 'components';
import { useNavigate } from 'react-router-dom';
import { useSearch } from 'shared/hooks/useSearch';
import SearchIcon from '@mui/icons-material/Search';
import './UsersSearch.scss';

export const UsersSearch = () => {
  const { value, resetValueHandler, debouncedChangeValueHandler } = useSearch();
  const { data: users, isLoading } = useGetUsersBySearchTerm(value);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navigateToUser = (userId: string) => {
    navigate(`/profile/${userId}`);
    resetValueHandler();

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <div className="users-search">
      <div className="users-search__container">
        <SearchIcon
          className="users-search__icon"
          data-testid="loupe-icon-users-search"
        />
        <input
          ref={searchRef}
          onChange={debouncedChangeValueHandler}
          placeholder="Znajdź użytkownika"
          type="text"
          className="users-search__input"
          data-testid="users-header-search-input"
        />
        {isLoading && <Spinner size={20} />}
      </div>
      <div className="users-search__hints">
        {!value || users.length || isLoading ? (
          users.map(({ name, surname, profileImage, _id }) => (
            <div
              key={_id}
              onClick={() => navigateToUser(_id)}
              className="users-search__hint"
              data-testid={`users-header-search-${name}-${surname}-hint`}
            >
              <img
                src={profileImage}
                alt=""
                className="users-search__hint-avatar"
              />
              <span>
                {name} {surname}
              </span>
            </div>
          ))
        ) : (
          <div className="users-search__hint users-search__hint--empty">
            Brak pasujących wyszukiwań
          </div>
        )}
      </div>
    </div>
  );
};

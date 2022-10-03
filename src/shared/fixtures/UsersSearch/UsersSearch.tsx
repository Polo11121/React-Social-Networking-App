import { useRef } from 'react';
import { getUsers } from 'api/getUsersBySearchTerm';
import { Search, Spinner } from 'components';
import { useNavigate } from 'react-router-dom';
import { useSearch } from 'shared/hooks/useSearch';
import './UsersSearch.scss';

export const UsersSearch = () => {
  const { value, resetValue, debouncedOnChange } = useSearch();
  const searchRef = useRef<HTMLInputElement>(null);
  const { data: users, isLoading } = getUsers(value);
  const navigate = useNavigate();

  const navigateToUser = (userId: string) => {
    navigate(`/profile/${userId}`);
    resetValue();

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Search
      placeholder="Znajdź użytkownika"
      ref={searchRef}
      style={{ width: '240px' }}
      onChange={debouncedOnChange}
      hints={
        !value || users.length ? (
          users.map(({ name, surname, profileImage, _id }) => (
            <div
              key={_id}
              onClick={() => navigateToUser(_id)}
              className="users-search__hint"
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
        )
      }
    >
      {isLoading && <Spinner size={20} />}
    </Search>
  );
};

import { ReactNode } from 'react';
import { BouncingDotsLoader } from 'components';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import './List.scss';

type ListPropsType = {
  children: ReactNode;
  isLoading?: boolean;
  headers: string[];
  hasNextPage?: boolean;
  dataLength: number;
  fetchNextPage?: () => void;
  isFilters?: boolean;
  noItems?: ReactNode;
};

export const List = ({
  children,
  headers,
  hasNextPage,
  dataLength,
  fetchNextPage,
  isFilters,
  noItems,
  isLoading = false,
}: ListPropsType) => (
  <div className="list">
    <div className="list__headers">
      {headers.map((header) => (
        <div key={header} className="list__header">
          {header}
        </div>
      ))}
    </div>
    <WithLoader isLoading={isLoading}>
      {dataLength ? (
        <div
          className={classNames('list__content', {
            'list__content--small': isFilters,
          })}
          id="scrollableDiv"
        >
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: '1rem',
              gap: '1rem',
            }}
            dataLength={dataLength}
            next={fetchNextPage as () => void}
            hasMore={Boolean(hasNextPage)}
            loader={<BouncingDotsLoader testId="list" />}
          >
            {children}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="list__no-items">{noItems}</div>
      )}
    </WithLoader>
  </div>
);

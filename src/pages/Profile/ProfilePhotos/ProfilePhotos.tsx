import { Photos } from 'components';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions';
import './ProfilePhotos.scss';

const getPhotoSize = (screenWidth: number) => {
  if (screenWidth > 1500) {
    return { colsNum: 5, maxHeight: 605, rowHeight: 300 };
  }

  if (screenWidth > 1200) {
    return { colsNum: 4, maxHeight: 505, rowHeight: 250 };
  }

  if (screenWidth > 800) {
    return { colsNum: 3, maxHeight: 505, rowHeight: 250 };
  }

  return { colsNum: 3, maxHeight: 305, rowHeight: 150 };
};

export const ProfilePhotos = () => {
  const { userPhotos } = useProfileInfo();
  const { width } = useWindowDimensions();

  const photoSize = getPhotoSize(width);

  return (
    <div className="profile-photos">
      <Photos
        colsNum={photoSize.colsNum}
        maxHeight={photoSize.maxHeight}
        rowHeight={photoSize.rowHeight}
        photosList={userPhotos.filter(({ type }) => type === 'post')}
        title="Zdjęcia"
      />
      <Photos
        colsNum={photoSize.colsNum}
        maxHeight={photoSize.maxHeight}
        rowHeight={photoSize.rowHeight}
        photosList={userPhotos.filter(({ type }) => type === 'profile')}
        title="Zdjęcia profilowe"
      />
      <Photos
        colsNum={photoSize.colsNum}
        maxHeight={photoSize.maxHeight}
        rowHeight={photoSize.rowHeight}
        photosList={userPhotos.filter(({ type }) => type === 'background')}
        title="Zdjęcia w tle"
      />
    </div>
  );
};

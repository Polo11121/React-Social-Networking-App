import { ChangeEvent, useState } from 'react';
import { Avatar, IconButton, Modal } from '@mui/material';
import { Button, Textarea, ImagePicker, ImageCarousel } from 'components';
import { useEditPost } from 'api/useEditPost';
import { useAuthContext } from 'contexts/AuthContext';
import ClearIcon from '@mui/icons-material/Clear';
import './EditModal.scss';

type EditPostModalType = {
  text: string;
  photos: string[];
  postId: string | null;
  onClose: () => void;
};

export const EditModal = ({
  text,
  photos,
  postId,
  onClose,
}: EditPostModalType) => {
  const { userInfo } = useAuthContext();
  const [postValues, setPostValues] = useState<{
    text: string;
    photos: null | FileList;
  }>({
    text,
    photos: null,
  });

  const changeInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setPostValues((prevState) => ({ ...prevState, text: event.target.value }));

  const changPhotoHandler = (postPhotos: File | FileList | null) =>
    setPostValues((prevState) => ({
      ...prevState,
      photos: postPhotos as FileList,
    }));

  const { mutate, isLoading } = useEditPost({
    postId: postId as string,
    afterUpdate: onClose,
  });

  const addPostHandler = () => {
    const formData = new FormData();
    if (postValues.photos?.length) {
      Array.from(postValues.photos as FileList).forEach((photo) =>
        formData.append('images', photo as Blob)
      );
    }
    formData.append('description', postValues.text);

    mutate(formData);
  };

  const isButtonDisabled =
    (postValues.text.trim() === text && !postValues?.photos) || isLoading;

  return (
    <Modal
      open={Boolean(postId)}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="edit-post__container">
        <div className="edit-post">
          <IconButton className="edit-post__exit-button" onClick={onClose}>
            <ClearIcon />
          </IconButton>
          <div className="edit-post__text">
            <div style={{ padding: '1rem' }}>
              <h1>Edycja przemyślenia</h1>
            </div>
          </div>
          <div className="edit-post__input-container">
            <Avatar src={userInfo.profileImage} />
            <Textarea
              placeholder="O czym myślisz ?"
              value={postValues.text}
              onChange={changeInputHandler}
              name="post"
              maxRows={5}
            />
          </div>
          <ImageCarousel
            imageStyle={{
              maxHeight: '50vh',
            }}
            images={
              postValues.photos
                ? Array.from(postValues.photos as FileList).map((photo) =>
                    URL.createObjectURL(photo)
                  )
                : photos
            }
          />
          <div className="edit-post__buttons">
            <ImagePicker
              isMultiple
              text="Edytuj zdjęcia"
              handleFile={changPhotoHandler}
            />
            <Button
              isDisabled={isButtonDisabled}
              onClick={addPostHandler}
              text="Edtyuj przemyślenie"
              buttonStyleType="primary"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
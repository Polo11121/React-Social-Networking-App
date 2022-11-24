import { ChangeEvent, useMemo, useState } from 'react';
import { IconButton, Modal, Avatar } from '@mui/material';
import { Button, Textarea, ImagePicker, ImageCarousel } from 'components';
import { useEditPost } from 'api/useEditPost';
import { useAuthContext } from 'contexts/AuthContext';
import ClearIcon from '@mui/icons-material/Clear';
import './EditPostModal.scss';

type EditPostModalPropsType = {
  text: string;
  photos: string[];
  postId: string | null;
  onClose: () => void;
};

export const EditPostModal = ({
  text,
  photos,
  postId,
  onClose,
}: EditPostModalPropsType) => {
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
    method: 'patch',
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

  const carouselImages = useMemo(
    () =>
      postValues.photos
        ? Array.from(postValues.photos).map((photo) =>
            URL.createObjectURL(photo)
          )
        : photos,
    [postValues.photos, photos]
  );

  return (
    <Modal
      open={Boolean(postId)}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="edit-post-modal__container" data-testid="edit-post-modal">
        <div className="edit-post-modal">
          <IconButton
            className="edit-post-modal__exit-button"
            onClick={onClose}
            data-testid="cancel-edit-post-button"
          >
            <ClearIcon />
          </IconButton>
          <div className="edit-post-modal__text">
            <div style={{ padding: '1rem' }}>
              <h1>Edytuj post</h1>
            </div>
          </div>
          <div className="edit-post-modal__input-container">
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
            images={carouselImages}
          />
          <div className="edit-post-modal__footer">
            <ImagePicker
              testId="edit-post-photo"
              isMultiple
              text="Edytuj zdjęcia"
              onChooseFile={changPhotoHandler}
            />
            <div className="edit-post-modal__buttons">
              <Button onClick={onClose} text="Anuluj" buttonStyleType="mandy" />
              <Button
                isDisabled={isButtonDisabled}
                onClick={addPostHandler}
                text="Edtyuj"
                buttonStyleType="primary"
                testId="submit-edit-post-button"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

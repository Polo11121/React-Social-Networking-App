import { useState } from 'react';
import { Button, Textarea } from 'components';
import { useForm } from 'shared/hooks/useForm';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useUpdateUser } from 'api/useUpdateUser';

export const ProfileDescription = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const {
    user: { description },
    isOwner,
  } = useProfileInfo();

  const afterUpdate = () => setIsDescriptionOpen(false);

  const { mutate, isLoading } = useUpdateUser({
    afterUpdate,
    toastText: 'Pomyślnie zaktualizowano opis',
  });

  const formik = useForm({
    initialValues: { description },
    mutate,
  });

  const descriptionVisibilityHandler = () => {
    setIsDescriptionOpen((prevState) => !prevState);
    formik.setFieldValue('description', description);
  };

  return isDescriptionOpen ? (
    <form onSubmit={formik.handleSubmit}>
      <Textarea
        name="description"
        placeholder="Opisz siebie"
        minRows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <div className="about-me__desc-buttons">
        <Button
          onClick={descriptionVisibilityHandler}
          text="Anuluj"
          buttonStyleType="mandy"
          testId="cancel-description-button"
        />
        <Button
          isDisabled={
            formik.values.description.trim() === description || isLoading
          }
          type="submit"
          text="Zapisz"
          buttonStyleType="primary"
          testId="submit-description-button"
        />
      </div>
    </form>
  ) : (
    <>
      {description && (
        <>
          <h2 className="about-me__subTitle">Opis</h2>
          <p className="about-me__desc">{description}</p>
        </>
      )}
      {isOwner && (
        <Button
          onClick={descriptionVisibilityHandler}
          buttonStyleType="secondary"
          text={`${description ? 'Edytuj' : 'Dodaj'} opis`}
          fullWidth
          testId="edit-description-button"
        />
      )}
    </>
  );
};

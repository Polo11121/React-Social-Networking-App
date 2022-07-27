import { useState } from 'react';
import { SectionCard, Button, Textarea } from 'components';
import { useForm } from 'shared/hooks/useForm';
import { useUpdateMe } from 'api/useUpdateMe';
import './AboutMe.scss';

export const AboutMe = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const { mutate, isLoading } = useUpdateMe(() =>
    setIsDescriptionOpen((prevState) => !prevState)
  );

  const formik = useForm({
    initialValues: { description: '' },
    mutate,
  });

  const toggleDescriptionVisibility = () => {
    setIsDescriptionOpen((prevState) => !prevState);
    formik.resetForm();
  };

  return (
    <SectionCard sectionTitle="O mnie">
      <div className="about-me">
        {isDescriptionOpen ? (
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
                onClick={toggleDescriptionVisibility}
                text="Anuluj"
                buttonStyleType="mandy"
              />
              <Button
                isDisabled={!formik.values.description.length || isLoading}
                type="submit"
                text="Zapisz"
                buttonStyleType="primary"
              />
            </div>
          </form>
        ) : (
          <Button
            onClick={toggleDescriptionVisibility}
            buttonStyleType="secondary"
            text="Dodaj opis"
            fullWidth
          />
        )}
        <Button buttonStyleType="secondary" text="Edytuj szczegóły" fullWidth />
        <Button buttonStyleType="secondary" text="Dodaj opis" fullWidth />
      </div>
    </SectionCard>
  );
};

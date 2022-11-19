import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc, Input } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';

export const ProfileWorkAndEducation = () => {
  const { adHocsWorkAndEducation, isLoading, isOwner } = useProfileDetails();

  return (
    <>
      <h2>Praca i wykształcenie</h2>
      {adHocsWorkAndEducation.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          Icon,
          displayText,
          changeHandler,
          submitHandler,
          closeHandler,
          deleteHandler,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            key={name}
            isDisabled={
              isLoading ||
              value === initialValue ||
              (!initialValue && !value.trim())
            }
            onSubmit={submitHandler}
            onDelete={deleteHandler}
            onClose={closeHandler}
            placeholder={placeholder}
            value={value}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
            testId={name}
          >
            <Input
              style={{ margin: '0' }}
              placeholder={capitalizeFirstLetter(placeholder)}
              value={value}
              onChange={changeHandler}
              name={name}
              testId={`addHoc-${name}-input`}
            />
          </AddHoc>
        )
      )}
    </>
  );
};

import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc, CitySelect } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';

export const ProfileDetailsPlaces = () => {
  const { adHocsPlaces, isLoading, isOwner } = useProfileDetails();

  return (
    <>
      <h2>Wcześniejsze miejsca zamieszkania</h2>
      {adHocsPlaces.map(
        ({
          initialValue,
          value,
          displayValue,
          name,
          placeholder,
          Icon,
          displayText,
          changeHandler,
          submitHandler,
          closeHandler,
          deleteHandler,
        }) => (
          <AddHoc
            value={value?.label}
            displayValue={displayValue}
            displayOnly={!isOwner}
            key={name}
            placeholder={placeholder}
            isLoading={isLoading}
            isDisabled={
              value?.label === // @ts-ignore
              (initialValue?.label || initialValue?.city)
            }
            onSubmit={submitHandler}
            onDelete={deleteHandler}
            onClose={closeHandler}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
            testId={name}
          >
            <CitySelect
              value={value}
              placeholder={capitalizeFirstLetter(placeholder)}
              onChange={changeHandler}
              testId={`addHoc-${name}-select`}
            />
          </AddHoc>
        )
      )}
    </>
  );
};

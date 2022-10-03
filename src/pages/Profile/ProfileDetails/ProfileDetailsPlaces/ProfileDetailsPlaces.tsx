import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';
import { CitySelect } from 'shared/fixtures/CitySelect/CitySelect';

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
          onChange,
          onSubmit,
          onDelete,
          onClose,
        }) => (
          <AddHoc
            value={value?.label}
            displayValue={displayValue}
            displayOnly={!isOwner}
            key={name}
            placeholder={placeholder}
            isDisabled={isLoading || value === initialValue}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onClose={onClose}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          >
            <CitySelect
              value={value}
              placeholder={capitalizeFirstLetter(placeholder)}
              setSelectedOption={onChange}
            />
          </AddHoc>
        )
      )}
    </>
  );
};

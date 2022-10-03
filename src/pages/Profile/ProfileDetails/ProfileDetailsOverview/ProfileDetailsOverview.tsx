import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc, Input } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';
import { CitySelect } from 'shared/fixtures/CitySelect/CitySelect';

export const ProfileDetailsOverview = () => {
  const { adHocsOverviewInputs, adHocsOverviewSelects, isLoading, isOwner } =
    useProfileDetails();

  return (
    <>
      {adHocsOverviewInputs.map(
        ({
          initialValue,
          name,
          label,
          placeholder,
          value,
          onChange,
          Icon,
          displayText,
          onSubmit,
          onDelete,
          onClose,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            key={name}
            isDisabled={isLoading || value === initialValue}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onClose={onClose}
            placeholder={placeholder}
            value={value}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          >
            <Input
              style={{ margin: '0' }}
              placeholder={label || capitalizeFirstLetter(placeholder)}
              value={value as string}
              onChange={onChange}
              name={name}
            />
          </AddHoc>
        )
      )}
      {adHocsOverviewSelects.map(
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
            displayValue={displayValue}
            displayOnly={!isOwner}
            key={name}
            placeholder={placeholder}
            value={value?.label}
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

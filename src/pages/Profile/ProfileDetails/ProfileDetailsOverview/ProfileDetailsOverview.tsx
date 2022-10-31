import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc, Input, CitySelect } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';

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
            isDisabled={isLoading || value === initialValue}
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
              placeholder={label || capitalizeFirstLetter(placeholder)}
              value={value as string}
              onChange={changeHandler}
              name={name}
              testId={`addHoc-${name}-input`}
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
          changeHandler,
          submitHandler,
          closeHandler,
          deleteHandler,
        }) => (
          <AddHoc
            displayValue={displayValue}
            displayOnly={!isOwner}
            key={name}
            placeholder={placeholder}
            value={value?.label}
            isDisabled={isLoading || value?.label === initialValue?.label}
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

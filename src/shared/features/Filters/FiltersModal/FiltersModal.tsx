import { useFilters } from 'shared/features/Filters/useFilters';
import { IconButton, Modal } from '@mui/material';
import {
  ageOptions,
  cityMaxDistance,
  interestedGendersOptions,
} from 'shared/constants/options';
import { Button, Select, CitySelect } from 'components';
import { useQueryClient } from 'react-query';
import ClearIcon from '@mui/icons-material/Clear';
import './FiltersModal.scss';

export const FiltersModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const afterUpdate = () => {
    onClose();
    queryClient.invalidateQueries('suggestions');
  };

  const {
    formik,
    changeInterestedGendersHandler,
    changeInterestedAgeHandler,
    changeInterestedCityHandler,
    changeInterestedCityMaxDistanceHandler,
    isLoading,
    isDisabled,
  } = useFilters(afterUpdate);

  return (
    <Modal
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      open={isOpen}
      onClose={onClose}
    >
      <div className="filters-modal" data-testid="filters-modal">
        <IconButton className="filters-modal__exit-button" onClick={onClose}>
          <ClearIcon />
        </IconButton>
        <div className="filters-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Filtry</h1>
          </div>
        </div>
        <form className="filters-modal__form" onSubmit={formik.handleSubmit}>
          <Select
            value={formik.values.interestedGenders}
            placeholder="Osoby, które Cię interesują"
            onChange={changeInterestedGendersHandler}
            options={interestedGendersOptions}
            isClearable
            inputId="filters-interested-genders-select"
          />
          <Select
            value={formik.values.interestedAge}
            placeholder="Interesujący Cię wiek"
            onChange={changeInterestedAgeHandler}
            options={ageOptions}
            isClearable
            inputId="filters-interested-age-select"
          />
          <CitySelect
            onChange={changeInterestedCityHandler}
            placeholder="Interesujące Cię miasto"
            value={formik.values.interestedCity}
            testId="filters-interested-city-select"
          />
          <Select
            value={formik.values.interestedCityMaxDistance}
            placeholder="Maksymalna odległość od miasta"
            onChange={changeInterestedCityMaxDistanceHandler}
            options={cityMaxDistance}
            isClearable
            inputId="filters-interested-city-max-distance-select"
          />
          <Button
            size="big"
            fullWidth
            isDisabled={isLoading || isDisabled}
            buttonStyleType="primary"
            type="submit"
            text="Zapisz"
            testId="filters-submit-button"
          />
        </form>
      </div>
    </Modal>
  );
};

import { useFilters } from 'shared/fixtures/Filters/useFilters';
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
    onInterestedGendersChange,
    onInterestedAgeChange,
    onInterestedCityChange,
    onInterestedCityMaxDistanceChange,
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
      <div className="filters-modal">
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
            onChange={onInterestedGendersChange}
            options={interestedGendersOptions}
          />
          <Select
            value={formik.values.interestedAge}
            placeholder="Interesujący Cię wiek"
            onChange={onInterestedAgeChange}
            options={ageOptions}
          />
          <CitySelect
            onChange={onInterestedCityChange}
            placeholder="Interesujące Cię miasto"
            value={formik.values.interestedCity}
          />
          <Select
            value={formik.values.interestedCityMaxDistance}
            placeholder="Maksymalna odległość od miasta"
            onChange={onInterestedCityMaxDistanceChange}
            options={cityMaxDistance}
          />
          <Button
            size="big"
            fullWidth
            isDisabled={isLoading || isDisabled}
            buttonStyleType="primary"
            type="submit"
            text="Zapisz"
          />
        </form>
      </div>
    </Modal>
  );
};

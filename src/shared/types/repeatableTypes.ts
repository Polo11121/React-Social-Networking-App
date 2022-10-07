import { CityType } from 'shared/types/responseTypes';

export type PhotosModalType = {
  selectedPhoto: null | number;
  photos: {
    image: string;
    label?: string;
  }[];
};

export type SelectOptionType = {
  label: string;
  value: string;
  location?: number[];
};

export type FiltersType = {
  interestedGenders: 'females' | 'males' | 'femalesAndMales';
  interestedCity: CityType;
  interestedAge: '18-26' | '27-34' | '35-44' | '45-54' | '55-64';
  interestedCityMaxDistance: '0' | '10' | '50' | '100' | '200' | '300';
};

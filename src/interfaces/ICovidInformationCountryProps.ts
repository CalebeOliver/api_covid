interface ICovidInformationCountryProps {
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    flag: string;
  };
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

export default ICovidInformationCountryProps;
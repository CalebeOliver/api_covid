import api from '../providers/CovidAPI';
import { getRepository } from 'typeorm';

import Country from '../models/Country';
import CovidInformation from '../models/CovidInformation';

import ICovidInformationCountryProps from '../interfaces/ICovidInformationCountryProps';

interface ResponseProps {
  data: ICovidInformationCountryProps[];
}

class updateCovidInformationsCountry {
	async execute(): Promise<void> {
		try {
			const { data }: ResponseProps = await api.get('/v3/covid-19/countries');
			const countryRepository = getRepository(Country);
			const covidInformationRepository = getRepository(CovidInformation);

			await Promise.all(
				data.map(async (item: ICovidInformationCountryProps) => {

					if(!item.countryInfo.iso3)item.countryInfo.iso3=item.country;

					const countryAux = await countryRepository.findOne({ where:{initials: item.countryInfo.iso3 },relations:['covidInformation']});

					if (countryAux) {
						const covidInformation = countryAux.covidInformation;

						covidInformation.cases = item.cases;
						covidInformation.active = item.active;
						covidInformation.deaths = item.deaths;
						covidInformation.recovered = item.recovered;

						await covidInformationRepository.save(covidInformation);
						return;
					}
        
					const covidInformation = covidInformationRepository.create({
						active:item.active,
						cases:item.cases,
						deaths:item.deaths,
						recovered:item.recovered,
						country_id:item.countryInfo._id,
					});
				
					await covidInformationRepository.save(covidInformation);
				
					const country = countryRepository.create({
						_id: item.countryInfo._id,
						name: item.country,
						initials: item.countryInfo.iso3,
						flag: item.countryInfo.flag,
					});
				
					country.covidInformation = covidInformation;
				
					await countryRepository.save(country);
					return;
				})
			);
    
			console.log('atualização terminada');
		} catch (err) {
			console.log('🧨 ', err);
		}}
}

export default updateCovidInformationsCountry;

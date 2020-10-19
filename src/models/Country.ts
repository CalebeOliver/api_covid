import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import CovidInformation from './CovidInformation';

import ICountry from '../interfaces/ICountry';

@Entity('countries')
class Country implements ICountry{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  _id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  initials: string;

  @Column({nullable:true})
  flag: string;

  @Column()
  covid_informations_id:string;

  @OneToOne(() => CovidInformation,covidInformation=>covidInformation.id)
  @JoinColumn({ name: 'covid_informations_id' })
  covidInformation: CovidInformation;
}

export default Country;

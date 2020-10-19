import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import ICovidInformation from '../interfaces/ICovidInformation';

@Entity('covid_informations')
class CovidInformation implements ICovidInformation {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  cases: number;

  @Column()
  deaths: number;

  @Column()
  recovered: number;

  @Column()
  active: number;

  @Column({nullable:true})
  country_id: number;
}

export default CovidInformation;

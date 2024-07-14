import { DataSourceOptions, DataSource } from 'typeorm';
import { dbConfig } from './db.config';

export const dataSourceOptions: DataSourceOptions = {
  ...dbConfig(),
  type: 'postgres',
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  ssl: true,
  
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

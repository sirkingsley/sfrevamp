import { recentlyViewedStoreSchema } from './../utils/data-warehouse/dbase-schemas/recently-viewed-schema';
import { localStoreNames } from '../utils/data-warehouse/localStoreNames';
import { NgxIndexedDBModule,DBConfig } from 'ngx-indexed-db';
import { orderStoreSchema } from '../utils/data-warehouse/order-schema';


export const dbName = 'StoreFrontMall';
export const dbConfig: DBConfig = {
  name: dbName,
  version: 7,
  objectStoresMeta: [{
    store: localStoreNames.order,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: orderStoreSchema
  },
  {
    store: localStoreNames.recently_viewed,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: recentlyViewedStoreSchema
  }]};

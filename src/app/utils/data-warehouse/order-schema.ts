export const orderStoreSchema = [
  { name: 'item', keypath: 'item', options: { unique: false } },
  { name: 'quantity', keypath: 'quantity', options: { unique: false } },
  { name: 'total_amount', keypath: 'total_amount', options: { unique: false } },
  { name: 'is_out_of_stock', keypath: 'is_out_of_stock', options: { unique: false } },
  { name: 'date_added', keypath: 'date_added', options: { unique: false } },
  { name: 'country', keypath: 'country', options: { unique: false } },
  { name: 'variant', keypath: 'variant', options: { unique: false } }
];

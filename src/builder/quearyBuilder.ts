import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFeilds: string[]) {
    if (this?.query.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFeilds.map(
          (field) =>
            ({
              [field]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filterQuery: FilterQuery<T> = {};
   

    Object.keys(queryObj).forEach((key) => {
      if (key.includes('min') || key.includes('max')) {
        const field = key.replace('min', '').replace('max', '');
        if (!(filterQuery as any)[field]) (filterQuery as any)[field] = {};

        if (key.startsWith('min')) {
          filterQuery[field]['$gte'] = Number(queryObj[key]);
        }
        if (key.startsWith('max')) {
          filterQuery[field]['$lte'] = Number(queryObj[key]);
        }
      } else {
        (filterQuery as any)[key] = queryObj[key];
      }
    });

    this.modelQuery = this.modelQuery.find(filterQuery);
    return this;
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
export default QueryBuilder;

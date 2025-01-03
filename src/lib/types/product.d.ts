declare type Product = {
  category: Category;
  subCategory: SubCategory;
  cover: string;
  gallery?: {
    image: string;
    _id: string;
  }[];
  price: number;
  stock: number;
  sales: number;
  translations: Translations<{
    name: string;
    slug: string;
    overview: string;
  }> &
    Pick<DatabaseFields, "_id">;
  ratings: {
    count: number;
    average: number;
  };
} & DatabaseFields;

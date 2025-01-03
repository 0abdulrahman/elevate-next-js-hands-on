declare type Category = {
  image: string;
  translations: Translations<{
    name: string;
    slug: string;
  }>;
} & DatabaseFields;

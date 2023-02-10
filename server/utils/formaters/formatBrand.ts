const formatBrand = (e): any => {
  return {
    name: e.name,
    id: e.id,
    description: e.description,
    logo: e.logo,
    categories: e.categories
      ? e.categories.map((e) => {
          return {
            name: e.category.name,
            id: e.category.id,
          };
        })
      : undefined,
    createdAt: e.createdAt,
  };
};

export default formatBrand;

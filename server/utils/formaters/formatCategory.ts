const formatCategory = (e): any => {
  return {
    name: e.name,
    id: e.id,
    description: e.description,
    parent_id: e.parent_id,
    createdAt: e.createdAt,
    photo: e.photo,
    subCategories: e.subCategories
      ? e.subCategories.map((e) => formatCategory(e))
      : undefined,
    parent: e.parent ? formatCategory(e.parent) : undefined,
  };
};

export default formatCategory;

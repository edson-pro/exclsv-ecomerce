const formatSupplier = (e) => {
  return {
    id: e.id,
    name: e.name,
    photo: e.photo,
    country: e.country,
    phone: e.phone,
    email: e.email,
    address: e.address,
    createdAt: e.createdAt,
  };
};

export default formatSupplier;

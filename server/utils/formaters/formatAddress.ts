import formatUser from "./formatUser";

const formatAddress = (e) => {
  return {
    id: e.id,
    street_1: e.street_1,
    street_2: e.street_2,
    first_name: e.first_name,
    last_name: e.last_name,
    city: e.city,
    province: e.province,
    zip_code: e.zip_code,
    phone: e.phone,
    createdAt: e.createdAt,
  };
};

export default formatAddress;

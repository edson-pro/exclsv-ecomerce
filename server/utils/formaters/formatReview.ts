import formatUser from "./formatUser";

const formatReview = (e) => {
  return {
    id: e.id,
    user: formatUser(e.user),
    rating: e.rating,
    message: e.message,
    createdAt: e.createdAt,
  };
};

export default formatReview;

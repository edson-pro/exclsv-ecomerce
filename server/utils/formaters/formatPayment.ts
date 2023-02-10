import formatOrder from "./formatOrder";
import formatUser from "./formatUser";

const formatPayment = (e) => {
  return {
    id: e.id,
    status: e.status,
    method: e.method,
    amount: e.amount,
    user: e.user ? formatUser(e.user) : undefined,
    order: e.order ? e.order : undefined,
    createdAt: e.createdAt,
  };
};

export default formatPayment;

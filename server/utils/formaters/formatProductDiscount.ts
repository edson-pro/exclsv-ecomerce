const formatProductDiscount = (e) => {
  return {
    id: e.id,
    start: e.start,
    end: e.end,
    type: e.type,
    usages: e?._count?.orders,
    value: e.value,
  };
};

export default formatProductDiscount;

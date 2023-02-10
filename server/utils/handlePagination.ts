import { formatFilters } from "./handleCursor";

export const handlePagination = async ({
  req,
  res,
  format,
  obj,
  table,
  name,
  filter,
  orderBy,
  extra,
  noQuery,
  filters,
}: any) => {
  const { page = 1, limit = 15, query } = req.query;
  const startIndex = (Number(page) - 1) * Number(limit);

  const filts = formatFilters({
    name,
    filter,
    orderBy,
    filters,
    query,
    queryObj: req.query,
    noQuery,
  });

  const dd = {
    ...filts,
    ...obj,

    skip: startIndex,
    take: Number(limit),
  };

  if (filter) {
    dd["where"] = {
      ...dd["where"],
      ...filter,
    };
  }

  const records = await table.findMany({
    ...dd,
  });

  const total = await table.count({
    where: dd.where,
  });

  return res.json({
    extra,
    data: records.map((e) => format(e)),
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / Number(limit)),
    total: total,
  });
};

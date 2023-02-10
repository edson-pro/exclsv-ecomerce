function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}
export const formatFilters = ({
  name,
  filter,
  orderBy,
  filters,
  query,
  queryObj,
  noQuery,
}: any) => {
  const dd = {};
  if (filter) {
    dd["where"] = {
      ...dd["where"],
      ...filter,
    };
  }
  if (orderBy) {
    dd["orderBy"] = orderBy;
  }

  if (filters) {
    filters.forEach((element) => {
      if (element === "date" && queryObj.date) {
        const start = new Date(queryObj[element][0]);
        const end = new Date(queryObj[element][1]);
        dd["where"] = {
          createdAt:
            start.toDateString() === end.toDateString()
              ? clean({
                  gte: new Date(start.setDate(start.getDate() - 1)),
                  lte: new Date(end.setDate(start.getDate() + 2)),
                })
              : clean({
                  gte: start,
                  lte: queryObj[element][1] ? end : undefined,
                }),
          ...dd["where"],
        };
      } else {
        if (queryObj[element]) {
          dd["where"] = {
            [element]: queryObj[element],
            ...dd["where"],
          };
        }
      }
    });
  }

  if (query) {
    const where = {};
    if (name) {
      if (name === "id") {
        where[name] = Number(query);
      } else {
        where[name] = {
          search: query.toString(),
        };
      }
    } else if (!noQuery) {
      where["name"] = {
        search: query.toString(),
      };
    }
    dd["where"] = where;
  }

  return dd;
};

export const handleCursor = async ({
  req,
  res,
  format,
  obj,
  table,
  name,
  filter,
  orderBy,
  filters,
}: any) => {
  const { limit = 24, query } = req.query;

  const filts = formatFilters({
    name,
    filter,
    orderBy,
    filters,
    query,
    queryObj: req.query,
  });

  const cursor = req.query.cursor ?? "";
  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string, 10) };

  const dd = {
    ...filts,
    ...obj,
    skip: cursor !== "" ? 1 : 0,
    cursor: cursorObj,
    take: Number(limit),
  };

  const records = await table.findMany({
    ...dd,
  });

  return res.json({
    nextId:
      records.length === Number(limit)
        ? records[Number(limit) - 1].id
        : undefined,
    results: records.map((e) => {
      return format(e);
    }),
  });
};

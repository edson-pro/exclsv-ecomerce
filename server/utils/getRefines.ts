const getRefines = (req) => {
  const filterQueries = req.query;

  const filter = {};
  const sort = {};

  Object.keys(filterQueries).forEach((e) => {
    switch (e) {
      case "brand":
        filter["brand_id"] = filterQueries["brand"];
        break;
      case "query":
        if (filterQueries["query"]) {
          filter["name"] = {
            search: filterQueries["query"].split(" ").join(" & "),
          };
        }
        break;
      case "condition":
        filter["condition"] = filterQueries["condition"];
        break;
      case "color":
        filter["color"] = filterQueries["color"];
        break;
      case "free_shipping":
        filter["free_shipping"] =
          filterQueries["free_shipping"] === "yes" ? true : false;
        break;
      case "low_price":
        filter["price"] = {
          ...filter["price"],
          gte: Number(filterQueries["low_price"]),
        };
      case "high_price":
        filter["price"] = {
          ...filter["price"],
          lte: Number(filterQueries["high_price"]),
        };
        break;
      case "in_stock":
        filter["inventory"] = {
          stock: {
            gte: 1,
          },
        };
        break;
      case "sort":
        if (filterQueries["sort"] === "high-price") {
          sort["price"] = "desc";
        } else if (filterQueries["sort"] === "low-price") {
          sort["price"] = "asc";
        } else if (filterQueries["sort"] === "best-selling") {
          sort["orders"] = {
            _count: "desc",
          };
        } else if (filterQueries["sort"] === "new-arrivas") {
          sort["createdBy"] = "desc";
        }
        break;
      default:
        break;
    }
  });

  return {
    filter,
    sort,
  };
};

export default getRefines;

const prods = [];

const fetchCategoryData = async ({ id, categories }) => {
  const data = await fetch(
    `/api/category/getProductsList/?cat_id=${id}&filter_value=&pagesize=10`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const products = await data.json().then((e) => {
    return e.result.list.map((i) => {
      return {
        id: i.products_id,
        category_name: e.result.baseData.cat_name,
        category_id: e.result.baseData.cur_cat,
      };
    });
  });
  products.forEach((e) => {
    return fetch(`/api/ajax/quickPurchaseView/?products_id=${e.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        prods.push({
          categories: categories,
          html: e.html,
        });
      });
  });
};
const categories = [
  {
    id: 12208,
    categories: ["fashion", "men", "tops", "men-s-shirts"],
  },
  {
    id: 12209,
    categories: ["fashion", "men", "tops", "men-s-t-shirts"],
  },
  {
    id: 4975,
    categories: ["fashion", "men", "bottoms", "men-s-pants"],
  },
  {
    id: 4976,
    categories: ["fashion", "men", "bottoms", "men-s-shorts"],
  },
  {
    id: 4290,
    categories: ["fashion", "men", "bottoms", "men-s-underwears"],
  },
  {
    id: 12212,
    categories: ["fashion", "men", "coats-jackets", "overcoats"],
  },
  {
    id: 3586,
    categories: ["fashion", "men", "coats-jackets", "suits"],
  },
  {
    id: 4272,
    categories: ["fashion", "men", "coats-jackets", "jackets"],
  },
  {
    id: 3622,
    categories: ["fashion", "men", "shoes", "men-s-sneakers"],
  },
  {
    id: 4188,
    categories: ["fashion", "men", "shoes", "men-s-sandals"],
  },
  {
    id: 3357,
    categories: ["fashion", "men", "shoes", "business-casual"],
  },
  {
    id: 4189,
    categories: ["fashion", "men", "accessories", "belts"],
  },
  {
    id: 3614,
    categories: ["fashion", "men", "accessories", "wallets"],
  },
  {
    id: 3591,
    categories: ["fashion", "women", "accessories", "bags"],
  },

  {
    id: 3689,
    categories: ["fashion", "women", "tops", "women-shirts"],
  },
  {
    id: 3666,
    categories: ["fashion", "men", "tops", "women-t-shirts"],
  },

  {
    id: 3943,
    categories: ["fashion", "women", "tops", "sweaters"],
  },
  {
    id: 3674,
    categories: ["fashion", "women", "bottoms", "women-pants"],
  },

  {
    id: 5073,
    categories: ["fashion", "women", "dresses", "casual-dresses"],
  },
  {
    id: 3664,
    categories: ["fashion", "women", "dresses", "vintage-dresses"],
  },
  {
    id: 4995,
    categories: ["fashion", "women", "sweamwers", "bikinis"],
  },
  {
    id: 4996,
    categories: ["fashion", "women", "sweamwers", "cover-ups"],
  },

  {
    id: 3600,
    categories: ["fashion", "women", "shoes", "women-slipers"],
  },
  {
    id: 3601,
    categories: ["fashion", "women", "shoes", "women-sandals"],
  },
  {
    id: 3599,
    categories: ["fashion", "women", "shoes", "women-boots"],
  },
  {
    id: 3598,
    categories: ["fashion", "women", "shoes", "heels"],
  },

  {
    id: 4000,
    categories: ["fashion", "women", "beauty", "makeups"],
  },
  {
    id: 4177,
    categories: ["fashion", "women", "beauty", "hair-wigs"],
  },
  {
    id: 4325,
    categories: ["fashion", "women", "beauty", "skin-care"],
  },
  {
    id: 4143,
    categories: ["fashion", "women", "beauty", "hair-care"],
  },
].forEach((e) => {
  fetchCategoryData({
    id: e.id,
    categories: e.categories,
  });
});

setInterval(() => {
  console.log(prods);
}, 5000);

import axios from "axios";
const categories = [
  {
    name: "fashion",
    subCategories: [
      {
        name: "men",
        subCategories: [
          {
            name: "tops",
            subCategories: [
              { name: "men's shirts" },
              { name: "men's t-shirts" },
            ],
          },
          {
            name: "bottoms",
            subCategories: [
              { name: "men's pants" },
              { name: "men's shorts" },
              { name: "men's underwears" },
            ],
          },
          {
            name: "coats & jackets",
            subCategories: [
              { name: "overcoats" },
              { name: "jackets" },
              { name: "underwears" },
            ],
          },
          {
            name: "shoes",
            subCategories: [
              { name: "men's sneakers" },
              { name: "men's sandals" },
              { name: "men's boots" },
              { name: "business & casual" },
            ],
          },
          {
            name: "accessories",
            subCategories: [
              { name: "belts" },
              { name: "wallets" },
              { name: "bags" },
              { name: "sun glasses" },
              { name: "hats" },
            ],
          },
        ],
      },
      {
        name: "women",
        subCategories: [
          {
            name: "tops",
            subCategories: [
              { name: "women's shirts" },
              { name: "women's t-shirts" },
              { name: "sweaters" },
            ],
          },
          {
            name: "dresses",
            subCategories: [
              { name: "casual dresses" },
              { name: "vintage dresses" },
            ],
          },
          {
            name: "bottoms",
            subCategories: [
              { name: "women's pants" },
              { name: "skirts" },
              { name: "women's underwears" },
            ],
          },
          {
            name: "sweamwers  ",
            subCategories: [{ name: "bikinis" }, { name: "cover ups" }],
          },
          {
            name: "shoes",
            subCategories: [
              { name: "women's sneakers" },
              { name: "women's slipers" },
              { name: "women's sandals" },
              { name: "women's boots" },
              { name: "heels" },
            ],
          },
          {
            name: "beauty",
            subCategories: [
              { name: "makeups" },
              { name: "hair wigs" },
              { name: "skin care" },
              { name: "hair care" },
            ],
          },
        ],
      },
      {
        name: "watch & jewely",
        subCategories: [
          {
            name: "men's watches",
          },
          {
            name: "men's jewely",
            subCategories: [
              { name: "men's necklases" },
              { name: "men'srings" },
              { name: "men'sbracelets" },
            ],
          },
          {
            name: "women's watches",
          },
          {
            name: "women's jewely",
            subCategories: [
              { name: "women's earings" },
              { name: "women's necklases" },
              { name: "women's rings" },
              { name: "women's bracelets" },
            ],
          },
        ],
      },
      {
        name: "kids & toys",
        subCategories: [
          {
            name: "kid's wears",
          },
          {
            name: "kid's toys",
          },
          {
            name: "mom's tools",
          },
          {
            name: "kid's shoes",
          },
        ],
      },
    ],
  },
  {
    name: "electronics & media",
    subCategories: [
      {
        name: "computers",
      },
      {
        name: "tv & video",
      },
      {
        name: "cell phone",
      },
      {
        name: "audio devices",
      },
      {
        name: "tablets",
      },
      {
        name: "accessories",
      },
    ],
  },
  {
    name: "foods & drinks",
    subCategories: [
      {
        name: "milk",
      },
      {
        name: "grocery",
      },
      {
        name: "snacks",
      },
      {
        name: "alchol & beverages",
      },
      {
        name: "organic foods",
      },
      {
        name: "backing",
      },
    ],
  },
  {
    name: "home & furnitures",
    subCategories: [
      {
        name: "decor",
      },
      {
        name: "chairs",
      },
      {
        name: "tables",
      },
      {
        name: "bedding",
      },
      {
        name: "kitchen & dinning",
      },
      {
        name: "accessories",
      },
      {
        name: "bath",
      },
    ],
  },
  {
    name: "Health & mediacal",
    subCategories: [
      {
        name: "proteins",
      },
      {
        name: "home health care",
      },
      {
        name: "gloves",
      },
      {
        name: "face masks",
      },
      {
        name: "fitness tools",
      },
      {
        name: "vitamins",
      },
      {
        name: "pharmacy",
      },
    ],
  },
  {
    name: "Appliances",
    subCategories: [],
  },
  {
    name: "Pets & animals",
    subCategories: [],
  },
];

const getMembers = (members) => {
  let subCategories = [];

  return members
    .map((mem) => {
      const m = { ...mem }; // use spread operator
      if (m.subCategories && m.subCategories.length) {
        subCategories = [
          ...subCategories,
          ...m.subCategories.map((e) => {
            return {
              ...e,
              parent_id: convertToSlug(m.name),
            };
          }),
        ];
      }
      delete m.subCategories; // this will not affect the original array object
      return m;
    })
    .concat(subCategories.length ? getMembers(subCategories) : subCategories);
};

const flated = getMembers(categories);

function convertToSlug(str) {
  //replace all special characters | symbols with a space
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();

  // trim spaces at start and end of string
  str = str.replace(/^\s+|\s+$/gm, "");

  // replace space with dash/hyphen
  str = str.replace(/\s+/g, "-");
  return str;
}

const newCategories = flated.map((e) => {
  return {
    ...e,
    id: convertToSlug(e.name),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ",
  };
});

const seedCategories = () => {
  newCategories.forEach((e) => {
    return axios
      .post(`http://localhost:4000/categories`, e)
      .then((i) => {
        console.log("category saved");
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

seedCategories();

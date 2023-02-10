import axios from "axios";

const formater = (e) => {
  const price =
    typeof e.price.formatted_current_price === "number"
      ? Math.floor(Number(e.price.formatted_current_price.split("$")[1]))
      : 0;

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }
  const imgs = e.item.enrichment?.images?.alternate_image_urls || [];
  return {
    images: [e.item.enrichment.images.primary_image_url, ...imgs],
    price: price,
    free_shipping: Math.random() < 0.3,

    name: e.item.product_description.title,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud`,
    status: Math.random() < 0.1 ? "draft" : "active",

    initial_price: Math.floor(price - (price * 15) / 100),
    content: `<ul>${e.item.product_description?.soft_bullets?.bullets
      .map((e) => `<li>${e}</li>`)
      .join("")}</ul>`,
    stock: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    low_stock: Math.floor(Math.random() * (15 - 5 + 1) + 5),
    metadata: e.item.product_description.bullet_descriptions.map((e) => {
      return {
        key: e.split("</B> ")[0].split("<B>")[1].split(":")[0],
        value: e.split("</B> ")[1],
      };
    }),
    variants: [],
    brand: e.item.primary_brand.name,
    currency: "USD",
    manufacturer: "",
    tags: getMultipleRandom(
      e.item.product_description.title.split(" "),
      e.item.product_description.title.split(" ").length < 2 ? 2 : 3
    ),
  };
};

const products = [
  {
    __typename: "ProductSummary",
    tcin: "86741164",
    original_tcin: "86741164",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/microsoft-surface-pro-7-bundle-12-3-touch-screen-intel-core-i5-8gb-ram-128gb-ssd-platinum-with-black-surface-type-cover-11th-gen-i5-quad-core/-/A-86741164",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_adff24e9-eba1-45b9-9b16-84fe7170dc14",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_3b499ad7-2357-4b10-8636-0676724eea26",
            "https://target.scene7.com/is/image/Target/GUEST_92df65e2-11f6-44eb-a47e-077f1ad6af51",
          ],
        },
      },
      compliance: {},
      cart_add_on_threshold: 35,
      product_description: {
        title:
          'Microsoft Surface Pro 7+ Bundle 12.3" Touch Screen Intel Core i5 8GB RAM 128GB SSD Platinum with Black Surface Type Cover - 11th Gen i5 Quad Core',
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .33 inches (H) x 11.5 inches (W) x 7.9 inches (D)",
          "<B>Weight:</B> 1.7 pounds",
          "<B>Electronics Condition:</B> New",
          "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax)",
          "<B>Data storage type:</B> SSD (NVMe)",
          "<B>Operating System:</B> Windows 11 Home",
          "<B>Aspect Ratio:</B> 3:2 Aspect Ratio",
          "<B>Video Recording Resolution:</B> 1080p",
          "<B>Data Storage Drive Capacity:</B> 128GB Solid State Disk",
          "<B>Megapixels:</B> 8 mp",
          "<B>Screen Size:</B> 12.3 inches",
          "<B>System RAM:</B> 8 gb",
          "<B>Processor Speed:</B> 2.4 ghz",
          "<B>Maximum Battery Charge Life:</B> 15 hours",
          "<B>Processor model:</B> 282-00001",
          "<B>Model name:</B> 282-00001",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Processor: Intel Core i5 2.40 GHz",
            "Memory: 8 GB LPDDR4X",
            'Display: 12.3" 2736 x 1824',
            "Graphics: Intel Intel Iris Xe Graphics",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "antonline",
          id: "10001980",
        },
      ],
      fulfillment: {
        is_marketplace: true,
      },
      primary_brand: {
        canonical_url: "/b/microsoft/-/N-5y4xk",
        linking_id: "5y4xk",
        name: "Microsoft",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$699.99",
      formatted_current_price_type: "sale",
      formatted_comparison_price: "$1,029.98",
      formatted_comparison_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 0,
          count: 0,
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "54184180",
    original_tcin: "54184180",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 10,
        department_id: 57,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/apple-ipad-10-2-inch-wi-fi-256gb-2021-model-space-gray/-/A-54184180",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_70f36c20-1d4a-484b-b16e-8c3f01929758",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_ff5c0dbc-b4e4-4875-a69a-ae24892afe62",
            "https://target.scene7.com/is/image/Target/GUEST_6de78bda-5a76-4c84-8504-66e860b48ddf",
            "https://target.scene7.com/is/image/Target/GUEST_6fd3ca96-426d-465e-b480-7c928627cc3c",
            "https://target.scene7.com/is/image/Target/GUEST_e6a5286e-d77d-44d4-b891-cf8f8bb9f984",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_fb303115-237d-4655-b6da-b9a4dac57161_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "057-10-0652",
      mmbv_content: {
        street_date: "2021-09-24",
      },
      cart_add_on_threshold: 35,
      product_description: {
        title: "Apple iPad 10.2-inch Wi-Fi 256GB (2021 Model) - Space Gray",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 9.8 Inches (H) x 6.8 Inches (W) x .29 Inches (D)",
          "<B>Weight:</B> 1.07 Pounds",
          "<B>Product Model:</B> Apple iPad 10.2-inch (9th generation, 2021)",
          "<B>Camera Features:</B> Slow Motion Recording, Five Element Lens, Auto Focus, Face Detection Technology",
          "<B>Electronics Condition:</B> New",
          "<B>Electronics Features:</B> Front-Facing Camera, IPS Panel, Fingerprint Reader, Retina Display, Built-In Speaker, Built-In Bluetooth",
          "<B>Megapixels:</B> 8 MP",
          "<B>Operating System:</B> Apple iPadOS",
          "<B>Data Storage Drive Capacity:</B> 256GB Hard Drive Capacity",
          "<B>Includes:</B> USB Charger, Lightning-To-USB Cable",
          "<B>Connection Types:</B> Apple Lightning Connector",
          "<B>Video Recording Resolution:</B> 1080p",
          "<B>Wireless Technology:</B> Bluetooth 4.2, Wi-Fi 5 (IEEE 802.11ac)",
          "<B>Screen Size:</B> 10.2 Inches",
          "<B>System RAM:</B> 4 gigabyte",
          "<B>Data storage type:</B> HDD",
          "<B>Processor model:</B> A13 Bionic chip with 64-bit architecture",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Gorgeous 10.2-inch Retina display with True Tone",
            "A13 Bionic chip with Neural Engine",
            "8MP Wide back camera, 12MP Ultra Wide front camera with Center Stage",
            "Up to 256GB storage",
            "Stereo speakers",
            "Touch ID for secure authentication and Apple Pay",
            "802.11ac Wi-Fi",
            "Up to 10 hours of battery life²",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "APPLE COMPUTER INC",
          id: "1113705",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/apple/-/N-5y3ej",
        linking_id: "5y3ej",
        name: "Apple",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "84761708",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 10,
          department_id: 57,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/apple-ipad-10-2-inch-wi-fi-2021-model/-/A-84761708",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_fd674b4f-c03d-4004-9cc5-6a1077935c35",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_b172c4b4-7f80-459a-9bc8-ca36948ab8a3",
              "https://target.scene7.com/is/image/Target/GUEST_28dbc476-62ae-44ef-ac14-9e7cc3f11572",
              "https://target.scene7.com/is/image/Target/GUEST_e849134f-2040-40aa-91c9-795e36897a5f",
              "https://target.scene7.com/is/image/Target/GUEST_d296a198-e29d-41eb-aa17-884798a07f87",
              "https://target.scene7.com/is/image/Target/GUEST_45aa6a36-571d-489c-81db-2272937676d6",
              "https://target.scene7.com/is/image/Target/GUEST_6fd3ca96-426d-465e-b480-7c928627cc3c",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_fb303115-237d-4655-b6da-b9a4dac57161_Flash9_Autox720p_2600k",
                },
              ],
            },
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        is_limited_time_offer: false,
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Apple iPad 10.2-inch Wi-Fi (2021 Model)",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 9.8 Inches (H) x 6.8 Inches (W) x .29 Inches (D)",
            "<B>Weight:</B> 1.07 Pounds",
            "<B>Product Model:</B> Apple iPad 10.2-inch (9th generation, 2021)",
            "<B>Camera Features:</B> Slow Motion Recording, Five Element Lens, Auto Focus, Face Detection Technology",
            "<B>Electronics Condition:</B> New",
            "<B>Electronics Features:</B> Front-Facing Camera, IPS Panel, Fingerprint Reader, Retina Display, Built-In Speaker, Built-In Bluetooth",
            "<B>Megapixels:</B> 8 MP",
            "<B>Operating System:</B> Apple iPadOS",
            "<B>Data Storage Drive Capacity:</B> 256GB Hard Drive Capacity",
            "<B>Includes:</B> USB Charger, Lightning-To-USB Cable",
            "<B>Connection Types:</B> Apple Lightning Connector",
            "<B>Video Recording Resolution:</B> 1080p",
            "<B>Wireless Technology:</B> Bluetooth 4.2, Wi-Fi 5 (IEEE 802.11ac)",
            "<B>Screen Size:</B> 10.2 Inches",
            "<B>System RAM:</B> 4 gigabyte",
            "<B>Data storage type:</B> HDD",
            "<B>Processor model:</B> A13 Bionic chip with 64-bit architecture",
            "<B>Maximum Battery Charge Life:</B> 10 Hours",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
        },
        primary_brand: {
          canonical_url: "/b/apple/-/N-5y3ej",
          linking_id: "5y3ej",
          name: "Apple",
        },
      },
      promotions: [
        {
          plp_message: "4 months of Apple Music for free with Target Circle",
          promotion_id: "312158828",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message: "6 months of Apple Arcade for free with Target Circle",
          promotion_id: "513129132",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message:
            "Get Digital Pencil for $59.49 with select iPad purchase",
          promotion_id: "179407909",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "FixedPrice",
          reward_value: 59.49,
          circle_offer: false,
        },
        {
          plp_message:
            "Get a Combo Touch for $127.49 with iPad 10.2 in purchase",
          promotion_id: "127576089",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "FixedPrice",
          reward_value: 127.49,
          circle_offer: false,
        },
      ],
      price: {
        formatted_current_price: "$279.99 - $429.99",
        formatted_current_price_type: "sale",
        formatted_comparison_price: "$329.99 - $479.99",
        formatted_comparison_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.81,
            count: 196,
            secondary_averages: [
              {
                id: "display",
                label: "display",
                value: 4.96,
              },
              {
                id: "Value",
                label: "value",
                value: 4.84,
              },
              {
                id: "EaseOfUse",
                label: "ease of use",
                value: 4.91,
              },
              {
                id: "Features",
                label: "features",
                value: 4.88,
              },
              {
                id: "speed",
                label: "speed",
                value: 4.9,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Silver",
                first_child: {
                  tcin: "54184185",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_fd674b4f-c03d-4004-9cc5-6a1077935c35",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_b172c4b4-7f80-459a-9bc8-ca36948ab8a3",
                    "https://target.scene7.com/is/image/Target/GUEST_28dbc476-62ae-44ef-ac14-9e7cc3f11572",
                    "https://target.scene7.com/is/image/Target/GUEST_e849134f-2040-40aa-91c9-795e36897a5f",
                    "https://target.scene7.com/is/image/Target/GUEST_d296a198-e29d-41eb-aa17-884798a07f87",
                    "https://target.scene7.com/is/image/Target/GUEST_45aa6a36-571d-489c-81db-2272937676d6",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_b73c902f-7033-4518-ad84-3557ad33d86a",
                },
              },
              {
                value: "Space Gray",
                first_child: {
                  tcin: "54184180",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_70f36c20-1d4a-484b-b16e-8c3f01929758",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_ff5c0dbc-b4e4-4875-a69a-ae24892afe62",
                    "https://target.scene7.com/is/image/Target/GUEST_6de78bda-5a76-4c84-8504-66e860b48ddf",
                    "https://target.scene7.com/is/image/Target/GUEST_6fd3ca96-426d-465e-b480-7c928627cc3c",
                    "https://target.scene7.com/is/image/Target/GUEST_e6a5286e-d77d-44d4-b891-cf8f8bb9f984",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_c4c40027-9679-4952-bdfe-8f5a037d032c",
                },
              },
            ],
          },
          {
            name: "Size",
            has_swatch: true,
            swatches: [
              {
                value: "256GB",
                first_child: {
                  tcin: "54184185",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_fd674b4f-c03d-4004-9cc5-6a1077935c35",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_b172c4b4-7f80-459a-9bc8-ca36948ab8a3",
                    "https://target.scene7.com/is/image/Target/GUEST_28dbc476-62ae-44ef-ac14-9e7cc3f11572",
                    "https://target.scene7.com/is/image/Target/GUEST_e849134f-2040-40aa-91c9-795e36897a5f",
                    "https://target.scene7.com/is/image/Target/GUEST_d296a198-e29d-41eb-aa17-884798a07f87",
                    "https://target.scene7.com/is/image/Target/GUEST_45aa6a36-571d-489c-81db-2272937676d6",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_b73c902f-7033-4518-ad84-3557ad33d86a",
                },
              },
              {
                value: "64GB",
                first_child: {
                  tcin: "54184190",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_fd674b4f-c03d-4004-9cc5-6a1077935c35",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_b172c4b4-7f80-459a-9bc8-ca36948ab8a3",
                    "https://target.scene7.com/is/image/Target/GUEST_28dbc476-62ae-44ef-ac14-9e7cc3f11572",
                    "https://target.scene7.com/is/image/Target/GUEST_e849134f-2040-40aa-91c9-795e36897a5f",
                    "https://target.scene7.com/is/image/Target/GUEST_d296a198-e29d-41eb-aa17-884798a07f87",
                    "https://target.scene7.com/is/image/Target/GUEST_45aa6a36-571d-489c-81db-2272937676d6",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_b73c902f-7033-4518-ad84-3557ad33d86a",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [
      {
        plp_message: "4 months of Apple Music for free with Target Circle",
        promotion_id: "312158828",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "6 months of Apple Arcade for free with Target Circle",
        promotion_id: "513129132",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "Get Digital Pencil for $59.49 with select iPad purchase",
        promotion_id: "179407909",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "FixedPrice",
        reward_value: 59.49,
        circle_offer: false,
      },
      {
        plp_message: "Get a Combo Touch for $127.49 with iPad 10.2 in purchase",
        promotion_id: "127576089",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "FixedPrice",
        reward_value: 127.49,
        circle_offer: false,
      },
    ],
    price: {
      formatted_current_price: "$429.99",
      formatted_current_price_type: "sale",
      formatted_comparison_price: "$479.99",
      formatted_comparison_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82569467",
    original_tcin: "82569467",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-15-6-34-touchscreen-laptop-with-windows-home-in-s-mode-intel-pentium-processor-8gb-ram-256gb-ssd-storage-8211-silver-15-dy2005tg/-/A-82569467",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_b6ec6278-6616-4f0d-8093-d4681239e0c3",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_d417f5e6-6186-485a-a12c-4e4070c7ea56",
            "https://target.scene7.com/is/image/Target/GUEST_e03aecb1-f654-4626-9de9-282018d08128",
            "https://target.scene7.com/is/image/Target/GUEST_20ff1747-c8c6-402b-b294-b68e7fa193ec",
            "https://target.scene7.com/is/image/Target/GUEST_37bcefc0-a586-4608-81bf-2aa0d9971eff",
            "https://target.scene7.com/is/image/Target/GUEST_44923919-f12f-467c-b178-dde5145a46b5",
            "https://target.scene7.com/is/image/Target/GUEST_c16dd229-a1a9-4467-b8f7-673b99d7d177",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_1aaa7bc8-eb60-436a-84de-57672f3901b5_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-01-4935",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 15.6&#34; Touchscreen Laptop with Windows Home in S Mode Intel Pentium Processor 8GB RAM 256GB SSD Storage &#8211; Silver (15-dy2005tg)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 14.11 Inches (W) x 9.53 Inches (D)",
          "<B>Weight:</B> 3.75 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> Microsoft 365 Compatible, Numeric Keypad, High Definition Audio, Multi-Touch Gesture Support, Built-In Bluetooth, High Definition Display, Built-In Webcam, Dual Speakers",
          "<B>Processor Type:</B> Intel Pentium",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 256GB Solid State Drive",
          "<B>Includes:</B> Power cord",
          "<B>Screen Resolution:</B> 1366 x 768",
          "<B>Connection Types:</B> USB, SD, USB-C, HDMI",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Native screen refresh rate:</B> 60 Hz",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 15.6 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 3.5 GHz",
          "<B>System RAM:</B> 8 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x8GB",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 15-dy2005tg",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> SSD (NVMe)",
          "<B>Graphics card model:</B> Intel UHD Graphics",
          "<B>Processor model:</B> Intel Pentium® Gold 7505",
          "<B>Touchscreen:</B> Touchscreen Display",
          "<B>Data storage capacity:</B> 256 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 11 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "15.6-inch diagonal HD micro-edge BrightView touchscreen display",
            "Windows Home in S mode operating system, Microsoft 365 compatible",
            "Intel® Pentium® Gold 7505 with Intel® UHD Graphics",
            "8 GB DDR4-3200 memory and 256 GB PCIe® NVMe™ M.2 SSD internal storage",
            "Backlit keyboard, HP Fast Charge, HP True Vision HD Camera",
            "Up to 11 hours of battery life",
            "1 SuperSpeed USB Type-C®, 2 SuperSpeed USB Type-A, 1 HDMI, 1 Multi-format SD media card reader, 1 Headphone/microphone combo, 1 AC Smart pin",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$489.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.34,
          count: 141,
          secondary_averages: [
            {
              id: "Quality",
              label: "quality",
              value: 4.18,
            },
            {
              id: "Value",
              label: "value",
              value: 4.2,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "51021396",
    original_tcin: "51021396",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-65-single-ink-cartridge-black-n9k02an-14/-/A-51021396",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_da1d505a-75c2-4998-9a39-321aed5da858",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_76200768-cc4b-4166-92b8-f3fe785e3cb5",
            "https://target.scene7.com/is/image/Target/GUEST_f033749f-d829-4958-aa78-54420b111052",
            "https://target.scene7.com/is/image/Target/GUEST_2b62c0cd-f11c-4695-a532-afb1cc17f990",
            "https://target.scene7.com/is/image/Target/GUEST_7a75d6f2-66c7-4c72-b91b-3124c9ab1bd7",
            "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2d9a7a23-f18c-4650-940f-8a4b044f0bd3_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-07-0270",
      cart_add_on_threshold: 35,
      product_description: {
        title: "HP 65 Single Ink Cartridge - Black (N9K02AN#14)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> HP 65 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 1",
          "<B>Printer Ink Color:</B> Black",
          "<B>Page Yield:</B> Standard Yield",
          "<B>Count:</B> 1 cartridges",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Original HP 65 ink cartridges work with HP DeskJet 3723, 3752, 3755",
            "Get up to 2X more prints with Original HP Ink vs. non-Original HP Ink",
            "HP 65 Black ink cartridge yield (approx.): 120 pages",
            "Color: Black",
            "Original HP ink cartridges: genuine ink for your HP printer",
            "What's in the box: 1 New Original HP 65 Black ink cartridge (N9K02AN)",
            "Buy Original HP Ink Cartridges or save up to 50% and never run out with HP Instant Ink, the Smart Ink Subscription",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "Essendant",
          id: "1973458",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "53550142",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/hp-65-ink-cartridge-series/-/A-53550142",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_da1d505a-75c2-4998-9a39-321aed5da858",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_76200768-cc4b-4166-92b8-f3fe785e3cb5",
              "https://target.scene7.com/is/image/Target/GUEST_f033749f-d829-4958-aa78-54420b111052",
              "https://target.scene7.com/is/image/Target/GUEST_2b62c0cd-f11c-4695-a532-afb1cc17f990",
              "https://target.scene7.com/is/image/Target/GUEST_7a75d6f2-66c7-4c72-b91b-3124c9ab1bd7",
              "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_2d9a7a23-f18c-4650-940f-8a4b044f0bd3_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "HP 65 Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> HP 65 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 1",
            "<B>Printer Ink Color:</B> Black",
            "<B>Page Yield:</B> Standard Yield",
            "<B>Count:</B> 1 cartridges",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Pack includes 2 easy-to-install ink cartridges",
              "Features ink in 4 colors- black and tricolor",
              "Compatible with HP Deskjet- 3722, 3723, 3752 & 3755",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/hp-inc/-/N-p6y7m",
          linking_id: "p6y7m",
          name: "HP Inc.",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$16.99 - $37.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.45,
            count: 3792,
            secondary_averages: [
              {
                id: "Quality",
                label: "quality",
                value: 4.44,
              },
              {
                id: "Value",
                label: "value",
                value: 4.24,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black (65)",
                first_child: {
                  tcin: "51021396",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_da1d505a-75c2-4998-9a39-321aed5da858",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_76200768-cc4b-4166-92b8-f3fe785e3cb5",
                    "https://target.scene7.com/is/image/Target/GUEST_f033749f-d829-4958-aa78-54420b111052",
                    "https://target.scene7.com/is/image/Target/GUEST_2b62c0cd-f11c-4695-a532-afb1cc17f990",
                    "https://target.scene7.com/is/image/Target/GUEST_7a75d6f2-66c7-4c72-b91b-3124c9ab1bd7",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_8bc87973-32e9-4db9-8f9b-74804a2de8e4",
                },
              },
              {
                value: "Tri-color (65)",
                first_child: {
                  tcin: "51440487",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3c51b689-d670-44cf-9d72-85dc51e7771a",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_d245dce9-d30b-4682-ac8a-7c9da70ca511",
                    "https://target.scene7.com/is/image/Target/GUEST_4c53d274-a625-45e9-8a7e-6cc8b768bea2",
                    "https://target.scene7.com/is/image/Target/GUEST_2b62c0cd-f11c-4695-a532-afb1cc17f990",
                    "https://target.scene7.com/is/image/Target/GUEST_127ec1a2-6d85-4206-a99c-d5545f11678c",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f19f7f19-8bff-4bfe-add2-cfc80a85b7b3",
                },
              },
              {
                value: "Black Combo (65)",
                first_child: {
                  tcin: "51021606",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4ec20340-58d1-45bd-8b70-6a9aa4d7f856",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_81908438-429d-4d03-b732-01490dcbfe7f",
                    "https://target.scene7.com/is/image/Target/GUEST_366d91bd-56f6-463b-86f0-79725e29e36a",
                    "https://target.scene7.com/is/image/Target/GUEST_45cf9f80-fb21-4699-a384-dd77561c6d3d",
                    "https://target.scene7.com/is/image/Target/GUEST_7a75d6f2-66c7-4c72-b91b-3124c9ab1bd7",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f2db4853-9ddb-4030-a367-4db0823890fd",
                },
              },
              {
                value: "Tri-color 65 (XL)",
                first_child: {
                  tcin: "52216233",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_8c384445-f047-49d7-bd2c-d743a32e64bb",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_937f2907-ce28-4486-913d-b8d87e8998b9",
                    "https://target.scene7.com/is/image/Target/GUEST_58f57287-c77a-410c-9358-753c630af413",
                    "https://target.scene7.com/is/image/Target/GUEST_ece130ee-479a-4d21-94ef-1f289d2dc4f8",
                    "https://target.scene7.com/is/image/Target/GUEST_ebe8470c-21f0-4784-b796-a88ef41c140d",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_0b23ff8b-e392-4be9-b445-e15ee482a699",
                },
              },
              {
                value: "Black 65 (XL)",
                first_child: {
                  tcin: "52216247",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4f237e8d-9005-4029-8333-9d9ca39e3d66",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_e5ba7d21-5abb-400c-9bcc-2b859a125b83",
                    "https://target.scene7.com/is/image/Target/GUEST_6a393637-d24d-4cb0-9a16-4c6b77b41cf4",
                    "https://target.scene7.com/is/image/Target/GUEST_ece130ee-479a-4d21-94ef-1f289d2dc4f8",
                    "https://target.scene7.com/is/image/Target/GUEST_7a75d6f2-66c7-4c72-b91b-3124c9ab1bd7",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_e71470c5-97d6-45a8-b4b9-7e9e335949e8",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$16.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "77616903",
    original_tcin: "77616903",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 10,
        department_id: 57,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/apple-ipad-pro-11-inch-wi-fi-only-128gb-space-gray/-/A-77616903",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_169e7082-e9e2-4af9-85f8-a961046d4d92",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_6aaa3d4f-719f-46ec-a288-315ca5718784",
            "https://target.scene7.com/is/image/Target/GUEST_8ab32880-267f-479b-a473-d90ba173bd23",
            "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
            "https://target.scene7.com/is/image/Target/GUEST_8d9277fa-5076-452d-9bb4-47ff25a080c2",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_11881ecb-b25f-47ef-8d5b-a276604bd071_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "057-10-0421",
      mmbv_content: {
        street_date: "2021-05-25",
      },
      cart_add_on_threshold: 35,
      product_description: {
        title: "Apple iPad Pro 11-inch Wi-Fi Only 128GB - Space Gray",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 9.74 Inches (H) x 7.02 Inches (W) x .23 Inches (D)",
          "<B>Weight:</B> 1.03 Pounds",
          "<B>Product Model:</B> Apple iPad Pro 11-inch (3rd generation, 2021)",
          "<B>Camera Features:</B> Geotagging, Dual Microphones, Slow Motion Recording, HDR Imaging, Time Lapse Recording, Auto Focus, Face Detection Technology, Front and Rear Facing Cameras",
          "<B>Electronics Condition:</B> New",
          "<B>Electronics Features:</B> IPS Panel, Touchscreen Display, Retina Display, Built-In Speaker, Built-In Microphone, Built-In Bluetooth, Fully Laminated Display, High Definition Display",
          "<B>Megapixels:</B> 12 MP",
          "<B>Operating System:</B> Apple iPadOS",
          "<B>Data Storage Drive Capacity:</B> 128GB Hard Drive Capacity",
          "<B>Includes:</B> USB Power Adapter, USB Cable",
          "<B>Connection Types:</B> USB-C",
          "<B>Video Recording Resolution:</B> 4K",
          "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax), Bluetooth 5.0",
          "<B>Screen Size:</B> 11 Inches",
          "<B>System RAM:</B> 8 gigabyte",
          "<B>Data storage type:</B> HDD",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Apple M1 chip for next-level performance",
            "Stunning 11-inch Liquid Retina display¹ with ProMotion, True Tone, and P3 wide color",
            "TrueDepth camera system featuring Ultra Wide front camera with Center Stage",
            "12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR",
            "Stay connected with ultrafast Wi-Fi 6",
            "Go further with all-day battery life²",
            "Thunderbolt port for connecting to fast external storage, displays, and docks",
            "Face ID for secure authentication and Apple Pay",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "APPLE COMPUTER INC",
          id: "1113705",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/apple/-/N-5y3ej",
        linking_id: "5y3ej",
        name: "Apple",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "82866372",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 10,
          department_id: 57,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/apple-ipad-pro-11-inch-wi-fi-only/-/A-82866372",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
              "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
              "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
              "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_11881ecb-b25f-47ef-8d5b-a276604bd071_Flash9_Autox720p_2600k",
                },
              ],
            },
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        is_limited_time_offer: false,
        compliance: {},
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Apple iPad Pro 11-inch Wi-Fi Only",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 9.74 Inches (H) x 7.02 Inches (W) x .23 Inches (D)",
            "<B>Weight:</B> 1.03 Pounds",
            "<B>Product Model:</B> Apple iPad Pro 11-inch (3rd generation, 2021)",
            "<B>Camera Features:</B> Geotagging, Dual Microphones, Slow Motion Recording, HDR Imaging, Time Lapse Recording, Auto Focus, Face Detection Technology, Front and Rear Facing Cameras",
            "<B>Electronics Condition:</B> New",
            "<B>Electronics Features:</B> IPS Panel, Touchscreen Display, Retina Display, Built-In Speaker, Built-In Microphone, Built-In Bluetooth, Fully Laminated Display, High Definition Display",
            "<B>Megapixels:</B> 12 MP",
            "<B>Operating System:</B> Apple iPadOS",
            "<B>Data Storage Drive Capacity:</B> 128GB Hard Drive Capacity",
            "<B>Includes:</B> USB Power Adapter, USB Cable",
            "<B>Connection Types:</B> USB-C",
            "<B>Video Recording Resolution:</B> 4K",
            "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax), Bluetooth 5.0",
            "<B>Screen Size:</B> 11 Inches",
            "<B>System RAM:</B> 8 gigabyte",
            "<B>Data storage type:</B> HDD",
            "<B>Maximum Battery Charge Life:</B> 10 Hours",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Stunning 11-inch Liquid Retina display1 with ProMotion,",
              "12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR",
              "5G for superfast downloads and high-quality streaming2",
              "Thunderbolt port for connecting to fast external storage, displays, and docks",
              "Face ID for secure authentication and Apple Pay",
              "Four speaker audio and five studio-quality microphones",
              "Support for Apple Pencil (2nd generation), Magic Keyboard, and Smart Keyboard Folio4",
              "iPadOS is powerful, intuitive, and designed specifically for iPad",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/apple/-/N-5y3ej",
          linking_id: "5y3ej",
          name: "Apple",
        },
      },
      promotions: [
        {
          plp_message: "Save $30 on an Apple Pencil 2 with iPad Pro purchase",
          promotion_id: "110176011",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "DollarOff",
          reward_value: 30,
          circle_offer: false,
        },
        {
          plp_message:
            "4 months of Apple Music for free with Target Circle on select items",
          promotion_id: "312158828",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message: "6 months of Apple Arcade for free with Target Circle",
          promotion_id: "513129132",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message: "Get a Combo Touch for $169.99 with iPad Pro purchase",
          promotion_id: "688404662",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "FixedPrice",
          reward_value: 169.99,
          circle_offer: false,
        },
      ],
      price: {
        formatted_current_price: "$799.99 - $1,499.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.68,
            count: 22,
            secondary_averages: [
              {
                id: "display",
                label: "display",
                value: 4.94,
              },
              {
                id: "Value",
                label: "value",
                value: 4.69,
              },
              {
                id: "Features",
                label: "features",
                value: 4.92,
              },
              {
                id: "speed",
                label: "speed",
                value: 5,
              },
              {
                id: "EaseOfUse",
                label: "ease of use",
                value: 5,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Silver",
                first_child: {
                  tcin: "77616904",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
                    "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_93c135b8-17f1-4aa8-b6dc-afc49351c897",
                },
              },
              {
                value: "Space Gray",
                first_child: {
                  tcin: "77616903",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_169e7082-e9e2-4af9-85f8-a961046d4d92",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_6aaa3d4f-719f-46ec-a288-315ca5718784",
                    "https://target.scene7.com/is/image/Target/GUEST_8ab32880-267f-479b-a473-d90ba173bd23",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_8d9277fa-5076-452d-9bb4-47ff25a080c2",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_e8f2e0f3-118b-4022-9da5-19b6988b4b67",
                },
              },
            ],
          },
          {
            name: "Size",
            has_swatch: true,
            swatches: [
              {
                value: "128GB",
                first_child: {
                  tcin: "77616904",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
                    "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_93c135b8-17f1-4aa8-b6dc-afc49351c897",
                },
              },
              {
                value: "256GB",
                first_child: {
                  tcin: "77616906",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
                    "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_93c135b8-17f1-4aa8-b6dc-afc49351c897",
                },
              },
              {
                value: "512GB",
                first_child: {
                  tcin: "77616908",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
                    "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_93c135b8-17f1-4aa8-b6dc-afc49351c897",
                },
              },
              {
                value: "1TB",
                first_child: {
                  tcin: "77616910",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6ba5a97e-a44d-40e6-bfef-01e22e65abaf",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_46c6fb69-10ac-4bb2-908d-a98f3781b49a",
                    "https://target.scene7.com/is/image/Target/GUEST_ef248bac-4e71-40d0-b2fe-de2c09394805",
                    "https://target.scene7.com/is/image/Target/GUEST_c2d759af-386c-42c0-8088-71dd1908e072",
                    "https://target.scene7.com/is/image/Target/GUEST_640c8f49-1417-4f32-b192-adaa3962ecbf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_93c135b8-17f1-4aa8-b6dc-afc49351c897",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [
      {
        plp_message: "Save $30 on an Apple Pencil 2 with iPad Pro purchase",
        promotion_id: "110176011",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "DollarOff",
        reward_value: 30,
        circle_offer: false,
      },
      {
        plp_message: "4 months of Apple Music for free with Target Circle",
        promotion_id: "312158828",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "6 months of Apple Arcade for free with Target Circle",
        promotion_id: "513129132",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "Get a Combo Touch for $169.99 with iPad Pro purchase",
        promotion_id: "688404662",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "FixedPrice",
        reward_value: 169.99,
        circle_offer: false,
      },
    ],
    price: {
      formatted_current_price: "$799.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82457998",
    original_tcin: "82457998",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-15-6-34-laptop-with-windows-home-in-s-mode-8211-intel-pentium-processor-8gb-ram-256gb-ssd-storage-8211-silver-15-dy0025tg/-/A-82457998",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_3326f728-c205-4b20-8b11-6f27d38dba62",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_c94bf541-8cf8-42ee-bce7-a9cbcf0a8dc8",
            "https://target.scene7.com/is/image/Target/GUEST_e9e29b0e-52d8-483b-8ce7-a5e7d7775204",
            "https://target.scene7.com/is/image/Target/GUEST_20ff1747-c8c6-402b-b294-b68e7fa193ec",
            "https://target.scene7.com/is/image/Target/GUEST_37bcefc0-a586-4608-81bf-2aa0d9971eff",
            "https://target.scene7.com/is/image/Target/GUEST_44923919-f12f-467c-b178-dde5145a46b5",
            "https://target.scene7.com/is/image/Target/GUEST_c16dd229-a1a9-4467-b8f7-673b99d7d177",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_641e6254-1987-4f0f-8bf0-f3a5d0f57941_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-01-0101",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 15.6&#34; Laptop with Windows Home in S Mode &#8211; Intel Pentium Processor - 8GB RAM - 256GB SSD Storage &#8211; Silver (15-dy0025tg)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 14.11 Inches (W) x 9.53 Inches (D)",
          "<B>Weight:</B> 3.75 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> Microsoft 365 Compatible, Numeric Keypad, High Definition Audio, Multi-Touch Gesture Support, Built-In Bluetooth, Touchpad, High Definition Display, Built-In Webcam, Dual Speakers",
          "<B>Processor Type:</B> Intel Pentium",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 256GB Solid State Drive",
          "<B>Includes:</B> Power cord",
          "<B>Screen Resolution:</B> 1368 x 768",
          "<B>Connection Types:</B> USB, SD, USB-C, HDMI",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Native screen refresh rate:</B> 60 Hz",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 15.6 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 1.1 GHz",
          "<B>System RAM:</B> 8 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x8GB",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 15-dy0025tg",
          "<B>Number of cores:</B> 4",
          "<B>Data storage type:</B> SSD (NVMe)",
          "<B>Graphics card model:</B> Intel UHD Graphics 605",
          "<B>Processor model:</B> Intel Pentium Silver N5030 Processor",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 256 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 11 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> No Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "15.6-inch diagonal HD micro-edge BrightView display",
            "Windows Home in S mode operating system, Microsoft 365 compatible",
            "Intel® Pentium® Silver N5030 with Intel® UHD Graphics 605",
            "8 GB DDR4-2400 memory and 256 GB PCIe® NVMe™ M.2 SSD internal storage",
            "HP Fast Charge, HP True Vision HD Camera",
            "Up to 11 hours of battery life",
            "1 SuperSpeed USB Type-C®, 2 SuperSpeed USB Type-A, 1 HDMI, 1 Multi-format SD media card reader, 1 Headphone/microphone combo, 1 AC Smart pin",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "86911963",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 1,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/hp-15-6-laptop-with-windows-home-in-s-mode-intel-pentium-processor-8gb-ram-256gb-ssd-storage/-/A-86911963",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_3bb8b683-f0a7-4b7e-8207-ea716a72f41d",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_23069a99-5978-40fd-a236-acd2809eb615",
              "https://target.scene7.com/is/image/Target/GUEST_e2f6801d-984b-4239-b7ce-d85a23f22478",
              "https://target.scene7.com/is/image/Target/GUEST_3a20a452-84f2-4449-abc4-5e2fcd0b94d6",
              "https://target.scene7.com/is/image/Target/GUEST_1defd1b2-5f69-47c3-87b3-0a0d189d98f5",
              "https://target.scene7.com/is/image/Target/GUEST_d3ba3cb9-9f6e-4d26-aa16-99093feac3b0",
            ],
          },
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title:
            'HP 15.6" Laptop with Windows Home in S Mode – Intel Pentium Processor - 8GB RAM - 256GB SSD Storage',
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> .71 Inches (H) x 14.11 Inches (W) x 9.53 Inches (D)",
            "<B>Weight:</B> 3.75 Pounds",
            "<B>Hard Drive Speed:</B> No Rotation",
            "<B>Electronics Condition:</B> New",
            "<B>Number of USB ports:</B> 3",
            "<B>Electronics Features:</B> Touchpad, High Definition Audio, Microsoft 365 Compatible, Island-Style Keyboard, Video Conferencing Capable, Built-In Webcam, High Definition Display, Numeric Keypad, Built-In Bluetooth",
            "<B>Processor Type:</B> Intel Pentium",
            "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
            "<B>Operating System:</B> Windows 11 Home in S mode",
            "<B>Data Storage Drive Capacity:</B> 256GB Solid State Drive",
            "<B>Includes:</B> AC Power Adapter",
            "<B>Screen Resolution:</B> 1366 x 768",
            "<B>Connection Types:</B> USB, USB-C, SD, HDMI",
            "<B>Video Recording Resolution:</B> 720p",
            "<B>Native screen refresh rate:</B> 60 Hz",
            "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
            "<B>Screen Size:</B> 15.6 Inches",
            "<B>Drive Type:</B> No Optical Disc Drive",
            "<B>Processor Speed:</B> 1.1 GHz",
            "<B>System RAM:</B> 8 GB",
            "<B>Memory RAM Type:</B> DDR4",
            "<B>RAM Configuration:</B> 1x8GB",
            "<B>Display Type:</B> IPS Panel",
            "<B>Primary use:</B> Home",
            "<B>Model name:</B> 15-dy0700tg",
            "<B>Number of cores:</B> 4",
            "<B>Data storage type:</B> SSD (NVMe)",
            "<B>Graphics card model:</B> Intel UHD Graphics 605",
            "<B>Processor model:</B> Intel Pentium Silver N5030",
            "<B>Touchscreen:</B> No Touchscreen Display",
            "<B>Data storage capacity:</B> 256 GB",
            "<B>Microphone:</B> Built-In Microphone",
            "<B>Maximum Battery Charge Life:</B> 11 Hours",
            "<B>RAM Slots (Total):</B> 1",
            "<B>Backlit Keyboard:</B> No Backlit Keyboard",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
        },
        primary_brand: {
          canonical_url: "/b/hp-inc/-/N-p6y7m",
          linking_id: "p6y7m",
          name: "HP Inc.",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$439.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 3.61,
            count: 59,
            secondary_averages: [
              {
                id: "Quality",
                label: "quality",
                value: 3.78,
              },
              {
                id: "Value",
                label: "value",
                value: 3.93,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Blue (15-dy0700tg)",
                first_child: {
                  tcin: "86725039",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3bb8b683-f0a7-4b7e-8207-ea716a72f41d",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_23069a99-5978-40fd-a236-acd2809eb615",
                    "https://target.scene7.com/is/image/Target/GUEST_e2f6801d-984b-4239-b7ce-d85a23f22478",
                    "https://target.scene7.com/is/image/Target/GUEST_3a20a452-84f2-4449-abc4-5e2fcd0b94d6",
                    "https://target.scene7.com/is/image/Target/GUEST_1defd1b2-5f69-47c3-87b3-0a0d189d98f5",
                    "https://target.scene7.com/is/image/Target/GUEST_d3ba3cb9-9f6e-4d26-aa16-99093feac3b0",
                  ],
                },
              },
              {
                value: "Silver (15-dy0025tg)",
                first_child: {
                  tcin: "82457998",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3326f728-c205-4b20-8b11-6f27d38dba62",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_c94bf541-8cf8-42ee-bce7-a9cbcf0a8dc8",
                    "https://target.scene7.com/is/image/Target/GUEST_e9e29b0e-52d8-483b-8ce7-a5e7d7775204",
                    "https://target.scene7.com/is/image/Target/GUEST_20ff1747-c8c6-402b-b294-b68e7fa193ec",
                    "https://target.scene7.com/is/image/Target/GUEST_37bcefc0-a586-4608-81bf-2aa0d9971eff",
                    "https://target.scene7.com/is/image/Target/GUEST_44923919-f12f-467c-b178-dde5145a46b5",
                    "https://target.scene7.com/is/image/Target/GUEST_c16dd229-a1a9-4467-b8f7-673b99d7d177",
                  ],
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$439.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "79804382",
    original_tcin: "79804382",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-67-black-ink-cartridge/-/A-79804382",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_fa1b7288-7f7b-4f67-aee4-191511e13500",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_62f5d310-9503-4752-ae09-b0a3948c7da1",
            "https://target.scene7.com/is/image/Target/GUEST_498494d2-c15b-4bd4-9214-1e5a81fcc683",
            "https://target.scene7.com/is/image/Target/GUEST_6bb78303-2621-448e-819d-55f833a3d6a6",
            "https://target.scene7.com/is/image/Target/GUEST_781785a9-dce7-40ce-a24b-214d2053c910",
            "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
          ],
        },
      },
      compliance: {},
      dpci: "056-07-5901",
      cart_add_on_threshold: 35,
      product_description: {
        title: "HP 67 Black Ink Cartridge",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> HP 67 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 1",
          "<B>Printer Ink Color:</B> Black",
          "<B>Page Yield:</B> Standard Yield",
          "<B>Count:</B> 1 cartridges",
          "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Be assured that Original HP Cartridges will consistently deliver quality results and premium performance.",
            "Experience premium print quality with Original HP Cartridges designed for crisp text and rich blacks for big impact.",
            "Print with confidence—Original HP Cartridges designed with the planet in mind for easy recycling and less waste.",
            "Print the high-quality documents and store-quality photos you need, using Original HP ink cartridges.",
            "Original HP Cartridges are the only cartridges precisely developed with HP printers for reliable quality, results, and consistent performance.",
            "For use with HP Printers: HP Envy 6055, 6052, 6058, HP ENVY Pro 6455, 6475, 6452, 6458, 6454.",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "Essendant",
          id: "1973458",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "86882062",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/hp-67-ink-cartridge-series/-/A-86882062",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_a7b3c757-da51-4d15-8499-73f2df806ec1",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_1dac2ecf-a17c-4bd5-be01-c4cf18200a79",
              "https://target.scene7.com/is/image/Target/GUEST_3add2285-a81e-4d24-b756-aff518482e40",
              "https://target.scene7.com/is/image/Target/GUEST_6bb78303-2621-448e-819d-55f833a3d6a6",
              "https://target.scene7.com/is/image/Target/GUEST_a2656274-cfd1-46aa-839e-fe414182b942",
              "https://target.scene7.com/is/image/Target/GUEST_e1d3af19-2896-444c-b2f1-4df2897df1db",
            ],
          },
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "HP 67 Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> HP 67 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 1",
            "<B>Printer Ink Color:</B> Black",
            "<B>Page Yield:</B> Standard Yield",
            "<B>Count:</B> 1 cartridges",
            "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
        },
        primary_brand: {
          canonical_url: "/b/hp-inc/-/N-p6y7m",
          linking_id: "p6y7m",
          name: "HP Inc.",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$15.99 - $29.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.18,
            count: 1191,
            secondary_averages: [
              {
                id: "Quality",
                label: "quality",
                value: 3.94,
              },
              {
                id: "Value",
                label: "value",
                value: 3.69,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black",
                first_child: {
                  tcin: "79804382",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_fa1b7288-7f7b-4f67-aee4-191511e13500",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_62f5d310-9503-4752-ae09-b0a3948c7da1",
                    "https://target.scene7.com/is/image/Target/GUEST_498494d2-c15b-4bd4-9214-1e5a81fcc683",
                    "https://target.scene7.com/is/image/Target/GUEST_6bb78303-2621-448e-819d-55f833a3d6a6",
                    "https://target.scene7.com/is/image/Target/GUEST_781785a9-dce7-40ce-a24b-214d2053c910",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_a2d21585-c2d6-43f7-a89d-dc4d97989aef",
                },
              },
              {
                value: "Black XL",
                first_child: {
                  tcin: "79804381",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_607f6c7a-9526-4b9d-bd3b-f3dc22957464",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_e4d26089-9e91-4522-8109-9779691dde68",
                    "https://target.scene7.com/is/image/Target/GUEST_f1a461af-50fc-4e66-beaa-586157682d45",
                    "https://target.scene7.com/is/image/Target/GUEST_a3b419cd-5f92-45f9-a17b-f95d4670151a",
                    "https://target.scene7.com/is/image/Target/GUEST_781785a9-dce7-40ce-a24b-214d2053c910",
                    "https://target.scene7.com/is/image/Target/GUEST_a6bbd33a-84b4-4d22-a70b-d75e3840081b",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_1427e2d5-23af-44b4-ac5b-24fd39d43f5b",
                },
              },
              {
                value: "Tri-Color",
                first_child: {
                  tcin: "79804379",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_a7b3c757-da51-4d15-8499-73f2df806ec1",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_1dac2ecf-a17c-4bd5-be01-c4cf18200a79",
                    "https://target.scene7.com/is/image/Target/GUEST_3add2285-a81e-4d24-b756-aff518482e40",
                    "https://target.scene7.com/is/image/Target/GUEST_6bb78303-2621-448e-819d-55f833a3d6a6",
                    "https://target.scene7.com/is/image/Target/GUEST_a2656274-cfd1-46aa-839e-fe414182b942",
                    "https://target.scene7.com/is/image/Target/GUEST_e1d3af19-2896-444c-b2f1-4df2897df1db",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_2fac3da2-87fb-42ff-a21e-35fc2bbe2a36",
                },
              },
              {
                value: "Tri-Color XL",
                first_child: {
                  tcin: "79804384",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_9d2d286f-21f6-4e0b-9d25-666ed0d0d2c7",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_6024244d-7d85-4a07-858a-dc961e4246f6",
                    "https://target.scene7.com/is/image/Target/GUEST_4a846f72-7dc4-4f92-a30d-1a6f03c24546",
                    "https://target.scene7.com/is/image/Target/GUEST_295d2dbd-8cf0-4c09-9f81-7f576282bd30",
                    "https://target.scene7.com/is/image/Target/GUEST_1ef4db23-7a41-4a82-98ec-56cc287d585f",
                    "https://target.scene7.com/is/image/Target/GUEST_89312faf-61fa-4ca1-baea-461f22891809",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_74d3e432-64b4-4fcb-a1cb-10ca78e98a33",
                },
              },
              {
                value: "Tri-Color/Black",
                first_child: {
                  tcin: "79804386",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_17d08fe1-07c1-469d-a074-eefb220dd9c4",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_952af0b8-348d-488e-b621-39cce0000b6a",
                    "https://target.scene7.com/is/image/Target/GUEST_9d7b0113-c6b4-4dad-80a0-cde86d0f7624",
                    "https://target.scene7.com/is/image/Target/GUEST_b42260c8-a5a8-471f-a299-fdc103750add",
                    "https://target.scene7.com/is/image/Target/GUEST_781785a9-dce7-40ce-a24b-214d2053c910",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_08a7fe2b-e25a-4e72-8f1e-7cb0b556278b",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$15.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "77616341",
    original_tcin: "77616341",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 10,
        department_id: 57,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/apple-ipad-air-10-9-inch-wi-fi-only-2022-model-256gb-blue/-/A-77616341",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_f9cfd735-0a85-49f3-b343-def2bc63ec65",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_e8c2cf46-4129-4ea0-865c-21a6262be1a6",
            "https://target.scene7.com/is/image/Target/GUEST_2713a5f4-7318-4d97-9492-0fef3bced8f6",
            "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
            "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
            "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_b50d35aa-2b54-4411-9a12-29aad4d8f865_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "057-10-0321",
      mmbv_content: {
        street_date: "2022-03-18",
      },
      cart_add_on_threshold: 35,
      product_description: {
        title: "Apple iPad Air 10.9-inch Wi-Fi Only (2022 Model) 256GB - Blue",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 9.74 Inches (H) x 7.02 Inches (W) x .24 Inches (D)",
          "<B>Weight:</B> 1.02 Pounds",
          "<B>Product Model:</B> Apple iPad Air 10.9-inch (5th generation, 2022)",
          "<B>Camera Features:</B> Digital Image Stabilization, Auto Focus",
          "<B>Electronics Condition:</B> New",
          "<B>Electronics Features:</B> Rear-Facing Camera, Fingerprint Reader, Front-Facing Camera, Retina Display, Quick Charge, Built-In Bluetooth, High Definition Display",
          "<B>Megapixels:</B> 12 MP",
          "<B>Operating System:</B> Apple iPadOS",
          "<B>Data Storage Drive Capacity:</B> 256GB Hard Drive Capacity",
          "<B>Screen Resolution:</B> 2360 x 1640",
          "<B>Connection Types:</B> USB-C",
          "<B>Video Recording Resolution:</B> 4K",
          "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax)",
          "<B>Screen Size:</B> 10.9 Inches",
          "<B>System RAM:</B> 8 gigabyte",
          "<B>Data storage type:</B> HDD",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "10.9-inch Liquid Retina display¹ with True Tone, P3 wide color, and an antireflective coating",
            "Apple M1 chip with Neural Engine",
            "12MP Wide camera",
            "12MP Ultra Wide front camera with Center Stage",
            "Up to 256GB of storage",
            "Available in blue, purple, pink, starlight, and space gray",
            "Stereo landscape speakers",
            "Touch ID for secure authentication and Apple Pay",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "APPLE COMPUTER INC",
          id: "1113705",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/apple/-/N-5y3ej",
        linking_id: "5y3ej",
        name: "Apple",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "86136914",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 10,
          department_id: 57,
        },
        eligibility_rules: {},
        enrichment: {
          buy_url:
            "https://www.target.com/p/apple-ipad-air-10-9-inch-wi-fi-only-2022-model/-/A-86136914",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_f9cfd735-0a85-49f3-b343-def2bc63ec65",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_e8c2cf46-4129-4ea0-865c-21a6262be1a6",
              "https://target.scene7.com/is/image/Target/GUEST_2713a5f4-7318-4d97-9492-0fef3bced8f6",
              "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
              "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
              "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_b50d35aa-2b54-4411-9a12-29aad4d8f865_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        is_limited_time_offer: false,
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Apple iPad Air 10.9-inch Wi-Fi Only (2022 Model)",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 9.74 Inches (H) x 7.02 Inches (W) x .24 Inches (D)",
            "<B>Weight:</B> 1.02 Pounds",
            "<B>Product Model:</B> Apple iPad Air 10.9-inch (5th generation, 2022)",
            "<B>Camera Features:</B> Digital Image Stabilization, Auto Focus",
            "<B>Electronics Condition:</B> New",
            "<B>Electronics Features:</B> Rear-Facing Camera, Fingerprint Reader, Front-Facing Camera, Retina Display, Quick Charge, Built-In Bluetooth, High Definition Display",
            "<B>Megapixels:</B> 12 MP",
            "<B>Operating System:</B> Apple iPadOS",
            "<B>Data Storage Drive Capacity:</B> 64GB Hard Drive Capacity",
            "<B>Screen Resolution:</B> 2360 x 1640",
            "<B>Connection Types:</B> USB-C",
            "<B>Video Recording Resolution:</B> 4K",
            "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax)",
            "<B>Screen Size:</B> 10.9 Inches",
            "<B>System RAM:</B> 8 gigabyte",
            "<B>Data storage type:</B> HDD",
            "<B>Maximum Battery Charge Life:</B> 10 Hours",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "10.9-inch Liquid Retina display1 with True Tone, P3 wide color, and an antireflective coating",
              "Apple M1 chip with Neural Engine",
              "12MP Wide camera",
              "12MP Ultra Wide front camera with Center Stage",
              "Up to 256GB of storage",
              "Available in blue, purple, pink, starlight, and space gray",
              "Stereo landscape speakers",
              "Touch ID for secure authentication and Apple Pay",
              "All-day battery life4",
              "USB-C connector for charging and accessories",
              "Works with Magic Keyboard, Smart Keyboard Folio, and Apple Pencil (2nd generation)3",
              "iPadOS 15 is uniquely powerful, easy to use, and designed for the versatility of iPad",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/apple/-/N-5y3ej",
          linking_id: "5y3ej",
          name: "Apple",
        },
      },
      promotions: [
        {
          plp_message: "4 months of Apple Music for free with Target Circle",
          promotion_id: "312158828",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message:
            "Get Digital Pencil for $59.49 with select iPad purchase",
          promotion_id: "179407909",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "FixedPrice",
          reward_value: 59.49,
          circle_offer: false,
        },
      ],
      price: {
        formatted_current_price: "$599.99 - $749.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.38,
            count: 26,
            secondary_averages: [
              {
                id: "Features",
                label: "features",
                value: 4.42,
              },
              {
                id: "speed",
                label: "speed",
                value: 4.77,
              },
              {
                id: "EaseOfUse",
                label: "ease of use",
                value: 4.75,
              },
              {
                id: "display",
                label: "display",
                value: 4.85,
              },
              {
                id: "Value",
                label: "value",
                value: 3.83,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Blue",
                first_child: {
                  tcin: "77616349",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f9cfd735-0a85-49f3-b343-def2bc63ec65",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_e8c2cf46-4129-4ea0-865c-21a6262be1a6",
                    "https://target.scene7.com/is/image/Target/GUEST_2713a5f4-7318-4d97-9492-0fef3bced8f6",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3e8ec3f9-67f3-4d20-aa92-7605ab0e850c",
                },
              },
              {
                value: "Pink",
                first_child: {
                  tcin: "77616348",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_435f77f6-7e22-47fc-9b04-211b5337acf2",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_4d4e7cb5-8f75-4c7e-b8e5-e961ccb07d2f",
                    "https://target.scene7.com/is/image/Target/GUEST_f87b520d-ebd3-4115-8986-6a7f1d1700ae",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_71e9b0f2-45ad-442d-8822-85102b6374f3",
                },
              },
              {
                value: "Purple",
                first_child: {
                  tcin: "77616339",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_05a0f592-f288-4d8f-94b7-0a8a3c3adf86",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_837a4e63-8cb6-4c6d-b63a-a3bc9117ff75",
                    "https://target.scene7.com/is/image/Target/GUEST_88182b2a-d503-49a5-9c11-179fead1681c",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4210b6ee-8178-47bc-aa9f-98fa7ddfa306",
                },
              },
              {
                value: "Space Gray",
                first_child: {
                  tcin: "77616337",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_e219f6a8-c3ef-4123-a9bb-0e0deea0758c",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_45388b2a-5001-4691-88f9-83ccabc2b705",
                    "https://target.scene7.com/is/image/Target/GUEST_f00d21a9-ac80-4031-95b0-9a93f6801a75",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_cb1cb3e3-e77e-4361-9f10-b3c0e4d54a9f",
                },
              },
              {
                value: "Starlight",
                first_child: {
                  tcin: "77616338",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f117f8b0-330e-46b8-b3c5-c87922a8cfc9",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_eb0a263e-e80a-455a-8fab-0d746b22ead5",
                    "https://target.scene7.com/is/image/Target/GUEST_2dd09d4f-9259-4044-b11f-60f59cf2da7a",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_d167214e-bed1-4057-b9cf-a7302b2472ab",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_0cc3af18-386c-4eb0-8bea-f71d61d6e35d",
                },
              },
            ],
          },
          {
            name: "Size",
            has_swatch: true,
            swatches: [
              {
                value: "64GB",
                first_child: {
                  tcin: "77616349",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f9cfd735-0a85-49f3-b343-def2bc63ec65",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_e8c2cf46-4129-4ea0-865c-21a6262be1a6",
                    "https://target.scene7.com/is/image/Target/GUEST_2713a5f4-7318-4d97-9492-0fef3bced8f6",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3e8ec3f9-67f3-4d20-aa92-7605ab0e850c",
                },
              },
              {
                value: "256GB",
                first_child: {
                  tcin: "77616341",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f9cfd735-0a85-49f3-b343-def2bc63ec65",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_e8c2cf46-4129-4ea0-865c-21a6262be1a6",
                    "https://target.scene7.com/is/image/Target/GUEST_2713a5f4-7318-4d97-9492-0fef3bced8f6",
                    "https://target.scene7.com/is/image/Target/GUEST_2f25f8b8-718d-4b14-8140-9036fa8026b3",
                    "https://target.scene7.com/is/image/Target/GUEST_8f121566-5159-4a8b-8ae9-18b994494006",
                    "https://target.scene7.com/is/image/Target/GUEST_2cfb77b1-b40e-427f-bc21-2769de92c57f",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_3e8ec3f9-67f3-4d20-aa92-7605ab0e850c",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [
      {
        plp_message: "4 months of Apple Music for free with Target Circle",
        promotion_id: "312158828",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "Get Digital Pencil for $59.49 with select iPad purchase",
        promotion_id: "179407909",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "FixedPrice",
        reward_value: 59.49,
        circle_offer: false,
      },
    ],
    price: {
      formatted_current_price: "$749.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "79847600",
    original_tcin: "79847600",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/acer-11-6-34-chromebook-laptop-32gb-storage-intel-processor-silver-cb311-9h-c1jw/-/A-79847600",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_b387ecf9-7a4d-4fdc-853f-61b06b65781b",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_c4b0d930-8ce0-4a37-9984-cc206e7c7896",
            "https://target.scene7.com/is/image/Target/GUEST_da30b282-3781-406b-bcc0-408f53926aee",
            "https://target.scene7.com/is/image/Target/GUEST_d074e700-d206-435b-a321-60e1f250d4e1",
            "https://target.scene7.com/is/image/Target/GUEST_164e9b2b-027f-45ef-a13f-63c93c4c363e",
            "https://target.scene7.com/is/image/Target/GUEST_fb2bd0b5-6073-456d-a49f-e0c4bbd20c7f",
            "https://target.scene7.com/is/image/Target/GUEST_ec71ff92-564f-43b6-a68e-59bdf2339674",
            "https://target.scene7.com/is/image/Target/GUEST_5114cbd5-4d37-49ed-8753-03510c208206",
            "https://target.scene7.com/is/image/Target/GUEST_fbaf148b-4ad9-4d23-961e-073dea86c5ae",
            "https://target.scene7.com/is/image/Target/GUEST_a9877a48-214d-4283-9c5f-d668f58bb0cb",
            "https://target.scene7.com/is/image/Target/GUEST_0afbccd5-7c13-4e8a-b176-7e51c6e0f30a",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_a0d6f770-9e19-4136-a14a-bfdb153b2dbf_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-01-0025",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "Acer 11.6&#34; Chromebook Laptop, 32GB Storage, Intel Processor, Silver (CB311-9H-C1JW)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 11.65 Inches (W) x 7.83 Inches (D)",
          "<B>Weight:</B> 2.34 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 4",
          "<B>Electronics Features:</B> Backlit Display, Built-In Bluetooth, Built-In Webcam, Built-In Speaker, Video Conferencing Capable",
          "<B>Processor Type:</B> Intel Celeron",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Google Chrome OS",
          "<B>Data Storage Drive Capacity:</B> 32GB eMMC",
          "<B>Includes:</B> Power cord, AC Power Adapter",
          "<B>Screen Resolution:</B> 1366 x 768",
          "<B>Connection Types:</B> 3.5mm Jack, USB, USB-C",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Wireless Technology:</B> Bluetooth 5.0",
          "<B>Screen Size:</B> 11.6 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 2.6 GHz",
          "<B>System RAM:</B> 4 GB",
          "<B>Memory RAM Type:</B> LPDDR4",
          "<B>RAM Configuration:</B> 1x4GB",
          "<B>Display Type:</B> IPS Panel",
          "<B>Primary use:</B> Home",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> EMMC",
          "<B>Graphics card model:</B> Intel® UHD Graphics 600",
          "<B>Processor model:</B> Intel Celeron N4000",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 4 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> No Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Intel Celeron processor provides crisp video playback and enables multitasking effortessly.",
            "Flexible Connectivity with two USB Type-C ports provide ultra-quick data transfer, video streaming and battery charging.",
            "Effortless Mobility - just 0.71 inches thin and weighing less than 2.35lbs this Chromebook can go everywhere with you.",
            "Powerful Wireless with Intel Gigabit WiFi and 802.11 ac antena ensure rapid and reliable wireless signal.",
            "All day battery life, up to 10 hours.",
            "Access to millios of apps from the Google Play Store including Microsoft Office.",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "ACER AMERICA CORP",
          id: "1250383",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/acer/-/N-5y5b4",
        linking_id: "5y5b4",
        name: "Acer",
      },
    },
    cgi_asset: {
      experiences: [
        "android",
        "see_it_in_your_space",
        "spinner",
        "ios",
        "ios_quicklook",
      ],
      formats: {
        glb: "https://digitalcontent.target.com/vault/1641513600/CLOUD_5cbbec3a-c752-4ea7-a057-4303d7a28cb3.glb",
        usdz: "https://digitalcontent.target.com/vault/1641513600/CLOUD_15d1bb5e-fdec-4687-99e8-02148520aa5a.usdz",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$99.99",
      formatted_current_price_type: "sale",
      formatted_comparison_price: "$179.99",
      formatted_comparison_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.21,
          count: 220,
          secondary_averages: [
            {
              id: "Quality",
              label: "quality",
              value: 4.11,
            },
            {
              id: "Value",
              label: "value",
              value: 4.21,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "17079447",
    original_tcin: "17079447",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-63xl-single-ink-cartridge-black-f6u64an-140/-/A-17079447",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_09d8e650-a470-4262-ab46-a8c10e00ca1f",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_1ec7dfc3-147f-4631-b210-4602e07032da",
            "https://target.scene7.com/is/image/Target/GUEST_c53f13c5-14b8-4f51-b1b1-5764e3954750",
            "https://target.scene7.com/is/image/Target/GUEST_755310b4-d38e-4fa9-a7a3-6cdc5b72db9b",
            "https://target.scene7.com/is/image/Target/GUEST_786bec80-90fb-4ced-a39a-6eeb76bd78d4",
            "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2d9a7a23-f18c-4650-940f-8a4b044f0bd3_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-07-0068",
      cart_add_on_threshold: 35,
      product_description: {
        title: "HP 63XL Single Ink Cartridge - Black (F6U64AN_140)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> HP 63 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 1",
          "<B>Printer Ink Color:</B> Black",
          "<B>Page Yield:</B> High Yield",
          "<B>Count:</B> 1 cartridges",
          "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Original HP 63XL ink cartridges work with HP Deskjet 1112, 2130, 2132, 3630, 3632. HP ENVY 4512, 4520. HP Officejet 3830, 4650",
            "Get up to 2X more prints with Original HP Ink vs. non-Original HP Ink",
            "HP 63XL Black ink cartridge yield (approx.): 430 pages",
            "Color: Black",
            "What's in the box: 1 New Original HP 63XL Black ink cartridges (F6U64AN)",
            "Buy Original HP Ink Cartridges or save up to 50% and never run out with HP Instant Ink, the Smart Ink Subscription",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "Essendant",
          id: "1973458",
        },
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "53550124",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/hp-63-ink-cartridge-series/-/A-53550124",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_6621600a-3a4f-4331-8a03-d9c69e18099e",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_a7ed6bf1-8061-4031-9336-7a2d48035a20",
              "https://target.scene7.com/is/image/Target/GUEST_2188a8d9-908e-4c78-91e3-63bd9cafd7c5",
              "https://target.scene7.com/is/image/Target/GUEST_4de753a4-ae26-46b4-9fe9-ebdd58dec914",
              "https://target.scene7.com/is/image/Target/GUEST_786bec80-90fb-4ced-a39a-6eeb76bd78d4",
              "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_2d9a7a23-f18c-4650-940f-8a4b044f0bd3_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "HP 63 Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> HP 63 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 1",
            "<B>Printer Ink Color:</B> Black",
            "<B>Page Yield:</B> Standard Yield",
            "<B>Count:</B> 1 cartridges",
            "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Set of four",
              "Features ink print high-quality photos and documents",
              "Best prints for home, school, and work",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/hp-inc/-/N-p6y7m",
          linking_id: "p6y7m",
          name: "HP Inc.",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$21.99 - $48.99",
        formatted_current_price_type: "reg",
        formatted_comparison_price: "$20.99 - $48.99",
        formatted_comparison_price_type: "msrp",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.49,
            count: 5242,
            secondary_averages: [
              {
                id: "Value",
                label: "value",
                value: 4.02,
              },
              {
                id: "Quality",
                label: "quality",
                value: 4.33,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black (63)",
                first_child: {
                  tcin: "17079443",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ee152203-fd40-4d93-a068-4aba6edf263e",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_a7ed6bf1-8061-4031-9336-7a2d48035a20",
                    "https://target.scene7.com/is/image/Target/GUEST_2188a8d9-908e-4c78-91e3-63bd9cafd7c5",
                    "https://target.scene7.com/is/image/Target/GUEST_4de753a4-ae26-46b4-9fe9-ebdd58dec914",
                    "https://target.scene7.com/is/image/Target/GUEST_786bec80-90fb-4ced-a39a-6eeb76bd78d4",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6540f8a3-3404-4492-ae59-ab9d01a73390",
                },
              },
              {
                value: "Tri-color (63)",
                first_child: {
                  tcin: "17079445",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_263c1185-ecb7-4e50-bf77-c6363e2a42d8",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_0277bd33-7310-47c7-9840-fd389d48c6dc",
                    "https://target.scene7.com/is/image/Target/GUEST_17267b6e-cfc9-4897-b0b3-311405f0b89e",
                    "https://target.scene7.com/is/image/Target/GUEST_4de753a4-ae26-46b4-9fe9-ebdd58dec914",
                    "https://target.scene7.com/is/image/Target/GUEST_1be2c116-629a-4be8-a49f-effd6a4fded3",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_c2c90403-a139-45e7-a12e-927c39014ff5",
                },
              },
              {
                value: "Black (63 XL)",
                first_child: {
                  tcin: "17079447",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_09d8e650-a470-4262-ab46-a8c10e00ca1f",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_1ec7dfc3-147f-4631-b210-4602e07032da",
                    "https://target.scene7.com/is/image/Target/GUEST_c53f13c5-14b8-4f51-b1b1-5764e3954750",
                    "https://target.scene7.com/is/image/Target/GUEST_755310b4-d38e-4fa9-a7a3-6cdc5b72db9b",
                    "https://target.scene7.com/is/image/Target/GUEST_786bec80-90fb-4ced-a39a-6eeb76bd78d4",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f620bd9a-81f3-439e-ad47-b75784f3e9d1",
                },
              },
              {
                value: "Tri-color (63 XL)",
                first_child: {
                  tcin: "17079454",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ba5841c3-2461-4732-895c-d9a0c03eb6d5",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_30ad2ea1-336a-434d-a21d-bde84efcd09f",
                    "https://target.scene7.com/is/image/Target/GUEST_39c180b7-8657-4b35-8cce-5ed62fc40f58",
                    "https://target.scene7.com/is/image/Target/GUEST_755310b4-d38e-4fa9-a7a3-6cdc5b72db9b",
                    "https://target.scene7.com/is/image/Target/GUEST_1be2c116-629a-4be8-a49f-effd6a4fded3",
                    "https://target.scene7.com/is/image/Target/GUEST_423b7433-a65f-4110-bef0-ae253b73987c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_21574a78-481b-4eeb-9261-98ee5fbfdcd3",
                },
              },
              {
                value: "Black, Tri-color (63)",
                first_child: {
                  tcin: "17089053",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_43640c5a-dc18-4618-b3a9-ee768fcc1d98",
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_23594f88-9df6-4d54-bfbb-fc4ba6dedbaa",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$41.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "13646060",
    original_tcin: "13646060",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 15,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/texas-instruments-graphing-calculator-black-ti-84/-/A-13646060",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_5c5bc3dd-cc11-406e-aa9f-2b467b733a5a",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_01760f94-f045-4a2b-82f1-0032daa4954b",
            "https://target.scene7.com/is/image/Target/GUEST_4708b2dc-55ca-4dd6-a9aa-8828b9f29562",
          ],
        },
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-15-0005",
      cart_add_on_threshold: 35,
      product_description: {
        title: "Texas Instruments Graphing Calculator - Black (TI-84+)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 7.5 Inches (H) x 3.3 Inches (W) x .9 Inches (D)",
          "<B>Electronics Features:</B> Approved for SAT II Math IIC, Approved for AP Chemistry, Approved for ACT, Approved for AP Physics, Approved for PSAT, Approved for SAT II Math IC, Approved for AP Calculus, Approved for SAT I",
          "<B>Data storage capacity:</B> 24 KB",
          "<B>Battery:</B> 4 AAA Lithium, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Make those complex math problems super easy",
            "Offers a multi-line display with diverse graph styles",
            "Features: 200+ functions, multi-line display",
            "Includes: Unit-to-unit link cable, USB cable, instruction guide",
            "Tests approved for: SAT I, SAT II Math IIC, SAT II Math IC, AP Physics, AP Calculus, AP Chemistry, ACT, PSAT",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "TEXAS INSTRUMENTS INC",
          id: "4531520",
        },
        {
          vendor_name: "STORE ONLY DUMMY VENDOR",
          id: "1213676",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/texas-instruments/-/N-5vpvl",
        linking_id: "5vpvl",
        name: "Texas Instruments",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$139.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.7,
          count: 251,
          secondary_averages: [
            {
              id: "Value",
              label: "value",
              value: 4.41,
            },
            {
              id: "Quality",
              label: "quality",
              value: 4.62,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "80339962",
    original_tcin: "80339962",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-14-34-stream-touchscreen-laptop-with-windows-home-in-s-mode-amd-processor-4gb-ram-memory-64gb-flash-storage-indigo-blue-14-fq0037nr/-/A-80339962",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_c677abd3-8bdf-4090-ab1d-59d8c618a74a",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_cb0f31af-23e6-49cb-b29a-cff98665c588",
            "https://target.scene7.com/is/image/Target/GUEST_eb70ad8f-74e4-42b6-94a4-9344e2d9448f",
            "https://target.scene7.com/is/image/Target/GUEST_1b70369a-7a68-4463-8eee-b2be7c2593f6",
            "https://target.scene7.com/is/image/Target/GUEST_5416ba81-516b-4dd5-800e-84a3c6969475",
            "https://target.scene7.com/is/image/Target/GUEST_5df86e88-617f-4a69-abbe-4817c04c4598",
            "https://target.scene7.com/is/image/Target/GUEST_db5701ad-7008-43e4-8b39-109e4f03aa33",
            "https://target.scene7.com/is/image/Target/GUEST_f0710789-2c18-4757-afad-16b1a4b54712",
            "https://target.scene7.com/is/image/Target/GUEST_a446070c-de2f-4d2f-979f-ba63126decaf",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_66dd348c-3b76-4878-9d48-5083a939df89_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_673f0a68-0a7a-4c3c-bed6-7bc3637b7612_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-01-0011",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 14&#34; Stream Touchscreen Laptop with Windows Home in S mode - AMD Processor - 4GB RAM Memory - 64GB Flash Storage - Indigo Blue (14-fq0037nr)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 12.76 Inches (W) x 8.86 Inches (D)",
          "<B>Weight:</B> 3.24 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> Microsoft 365 Compatible, Multi-Touch Gesture Support, Built-In Bluetooth, High Definition Display, Built-In Webcam, Dual Speakers, Video Conferencing Capable",
          "<B>Processor Type:</B> AMD Athlon",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 64GB eMMC",
          "<B>Includes:</B> Power cord",
          "<B>Screen Resolution:</B> 1366 x 768",
          "<B>Connection Types:</B> USB, USB-C, HDMI",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Native screen refresh rate:</B> 60 Hz",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 14 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 1.2 GHz",
          "<B>System RAM:</B> 4 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x4GB",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 14-fq0037nr",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> EMMC",
          "<B>Graphics card model:</B> AMD Radeon Graphics",
          "<B>Processor model:</B> 3020e Dual core",
          "<B>Touchscreen:</B> Touchscreen Display",
          "<B>Data storage capacity:</B> 64 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> No Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "14.0-inch diagonal HD, Touchscreen, micro-edge, BrightView display",
            "Windows Home in S Mode operating system",
            "Microsoft 365 included for one year",
            "AMD 3020e processor with AMD Radeon™ Graphics",
            "4 GB GDDR4-2400 SDRAM memory and 64 GB eMMC internal storage",
            "Up to 10 hours and 30 minutes of  battery life",
            "1 USB Type-C, 2 USB Type-A and 1 HDMI port; 1 Headphone/microphone combo",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    cgi_asset: {
      experiences: [
        "android",
        "see_it_in_your_space",
        "spinner",
        "ios",
        "ios_quicklook",
      ],
      formats: {
        glb: "https://digitalcontent.target.com/vault/1642032000/CLOUD_6aa1d0e4-a8ca-4a47-b36c-51e16c85a44c.glb",
        usdz: "https://digitalcontent.target.com/vault/1642032000/CLOUD_022002a4-b797-432e-9878-964c7c1c9324.usdz",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$249.99",
      formatted_current_price_type: "sale",
      formatted_comparison_price: "$299.99",
      formatted_comparison_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 3.88,
          count: 256,
          secondary_averages: [
            {
              id: "Quality",
              label: "quality",
              value: 3,
            },
            {
              id: "Value",
              label: "value",
              value: 2.98,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "14101836",
    original_tcin: "14101836",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/canon-240xl-single-ink-cartridge-black-5206b011/-/A-14101836",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_cbb1a6e0-a4fe-44a4-9670-01337bcf80e6",
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-07-1040",
      cart_add_on_threshold: 35,
      product_description: {
        title: "Canon 240XL Single Ink Cartridge - Black (5206B011)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> Canon 240/241 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 1",
          "<B>Printer Ink Color:</B> Black",
          "<B>Page Yield:</B> High Yield",
          "<B>Count:</B> 1 cartridges",
          "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "The PG-240 XL Black ink is used for printing documents on plain paper and ensures sharp black text, and the CL-241 XL Color ink is used for printing vibrant photos and images.",
            "XL capacity ink cartridges can help you save money, print more when you need to and extend the time between replacing ink cartridges.",
            "Combined with Genuine Canon photo paper this ink protects your photos from fading for longer, thanks to the ChromaLife100 System.",
            "Genuine Canon inks provide peak performance that is specifically designed for compatible Canon printers.",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "CANON U.S.A. INC.",
          id: "1563274",
        },
        {
          vendor_name: "STORE ONLY DUMMY VENDOR",
          id: "1213676",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/canon/-/N-5y3et",
        linking_id: "5y3et",
        name: "Canon",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "53550435",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/canon-240-241-ink-cartridge-series/-/A-53550435",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_cf387600-76a4-4e2f-a1ad-fdaa15a91a75",
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
                },
              ],
            },
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Canon 240/241 Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> Canon 240/241 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 1",
            "<B>Printer Ink Color:</B> Black",
            "<B>Page Yield:</B> High Yield",
            "<B>Count:</B> 1 cartridges",
            "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "The PG-240 XL Black ink is used for printing documents on plain paper and ensures sharp black text, and the CL-241 XL Color ink is used for printing vibrant photos and images.",
              "XL capacity ink cartridges can help you save money, print more when you need to and extend the time between replacing ink cartridges.",
              "Combined with Genuine Canon photo paper this ink protects your photos from fading for longer, thanks to the ChromaLife100 System.",
              "Genuine Canon inks provide peak performance that is specifically designed for compatible Canon printers.",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/canon/-/N-5y3et",
          linking_id: "5y3et",
          name: "Canon",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$24.99 - $58.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.77,
            count: 186,
            secondary_averages: [
              {
                id: "Quality",
                label: "quality",
                value: 4.82,
              },
              {
                id: "Value",
                label: "value",
                value: 4.76,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black (240XL)",
                first_child: {
                  tcin: "14101836",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_cbb1a6e0-a4fe-44a4-9670-01337bcf80e6",
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_1cd28bd0-9d2b-47b8-98da-6c719002ff20",
                },
              },
              {
                value: "Tri-color (241XL)",
                first_child: {
                  tcin: "14101837",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4e6b0fc4-60bd-4c1a-a1f1-5532c2a8571a",
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ccecc4e9-ccf3-47c5-baa9-fd166db63e86",
                },
              },
              {
                value: "Black (240XL), Tri-color (241XL)",
                first_child: {
                  tcin: "14101838",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_51223ec4-b7f0-4161-8772-3511bc9a9ef0",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_ec94cfa3-4691-414f-a4b3-e9e6d44f98af",
                    "https://target.scene7.com/is/image/Target/GUEST_e4e4b47b-2edb-4ff6-ba51-74f77c6c025e",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_018b26c3-11c4-418f-9e48-7b8dfeaac8f8",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$24.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "77615850",
    original_tcin: "77615850",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 10,
        department_id: 57,
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/apple-ipad-mini-wi-fi-64gb-2021-model-pink/-/A-77615850",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_f1924f8e-17ae-4bb5-a493-b54cef8fce3c",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_fa943e7e-072a-44e5-aab4-50e962b36567",
            "https://target.scene7.com/is/image/Target/GUEST_14467344-c6c6-4a4f-b62c-770b669c534f",
            "https://target.scene7.com/is/image/Target/GUEST_fa376ca2-8714-442c-81b6-a4fc794db07c",
            "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_ff709538-e501-4998-98a5-0e60d293f7b2_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "057-10-0273",
      mmbv_content: {
        street_date: "2021-09-24",
      },
      cart_add_on_threshold: 35,
      product_description: {
        title: "Apple iPad mini Wi-Fi 64GB (2021 Model) - Pink",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 7.69 Inches (H) x 5.3 Inches (W) x .25 Inches (D)",
          "<B>Weight:</B> .65 Pounds",
          "<B>Electronics Condition:</B> New",
          "<B>Electronics Features:</B> Front-Facing Camera, Retina Display, Touchscreen Display",
          "<B>Megapixels:</B> 7 MP",
          "<B>Data Storage Drive Capacity:</B> 64GB Hard Drive Capacity",
          "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax)",
          "<B>Screen Size:</B> 8.3 Inches",
          "<B>System RAM:</B> 4 gigabyte",
          "<B>Data storage type:</B> HDD",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "8.3-inch Liquid Retina display with True Tone and wide color¹",
            "A15 Bionic chip with Neural Engine",
            "Touch ID for secure authentication and Apple Pay",
            "12MP Wide back camera, 12MP Ultra Wide front camera with Center Stage",
            "Available in purple, starlight, pink, and space gray",
            "Landscape stereo speakers",
            "Stay connected with ultrafast Wi-Fi 6",
            "Up to 10 hours of battery life³",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "APPLE COMPUTER INC",
          id: "1113705",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/apple/-/N-5y3ej",
        linking_id: "5y3ej",
        name: "Apple",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "84619867",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 10,
          department_id: 57,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/apple-ipad-mini-wi-fi-2021-model/-/A-84619867",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_f1924f8e-17ae-4bb5-a493-b54cef8fce3c",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_fa943e7e-072a-44e5-aab4-50e962b36567",
              "https://target.scene7.com/is/image/Target/GUEST_14467344-c6c6-4a4f-b62c-770b669c534f",
              "https://target.scene7.com/is/image/Target/GUEST_fa376ca2-8714-442c-81b6-a4fc794db07c",
              "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_ff709538-e501-4998-98a5-0e60d293f7b2_Flash9_Autox720p_2600k",
                },
              ],
            },
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        is_limited_time_offer: false,
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Apple iPad mini Wi-Fi (2021 Model)",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 7.69 Inches (H) x 5.3 Inches (W) x .25 Inches (D)",
            "<B>Weight:</B> .65 Pounds",
            "<B>Electronics Condition:</B> New",
            "<B>Electronics Features:</B> Front-Facing Camera, Retina Display, Touchscreen Display",
            "<B>Megapixels:</B> 7 MP",
            "<B>Data Storage Drive Capacity:</B> 64GB Hard Drive Capacity",
            "<B>Wireless Technology:</B> Wi-Fi 6 (IEEE 802.11ax)",
            "<B>Screen Size:</B> 8.3 Inches",
            "<B>System RAM:</B> 4 gigabyte",
            "<B>Data storage type:</B> HDD",
            "<B>Maximum Battery Charge Life:</B> 10 Hours",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "8.3-inch Liquid Retina display with True Tone and wide color",
              "A15 Bionic chip with Neural Engine",
              "Touch ID for secure authentication and Apple Pay",
              "12MP Wide back camera, 12MP Ultra Wide front camera with Center Stage",
              "Available in purple, starlight, pink, and space gray",
              "Landscape stereo speakers",
              "Stay connected with ultrafast Wi-Fi",
              "Up to 10 hours of battery life",
              "USB-C connector for charging and accessories",
              "Works with Apple Pencil (2nd generation)",
              "iPadOS 15 is uniquely powerful, easy to use, and designed for the versatility of iPad",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/apple/-/N-5y3ej",
          linking_id: "5y3ej",
          name: "Apple",
        },
      },
      promotions: [
        {
          plp_message:
            "4 months of Apple Music for free with Target Circle on select items",
          promotion_id: "312158828",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message: "6 months of Apple Arcade for free with Target Circle",
          promotion_id: "513129132",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
      ],
      price: {
        formatted_current_price: "$499.99 - $649.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.13,
            count: 54,
            secondary_averages: [
              {
                id: "display",
                label: "display",
                value: 4.63,
              },
              {
                id: "EaseOfUse",
                label: "ease of use",
                value: 4.74,
              },
              {
                id: "Features",
                label: "features",
                value: 4.66,
              },
              {
                id: "speed",
                label: "speed",
                value: 4.66,
              },
              {
                id: "Value",
                label: "value",
                value: 4.38,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Pink",
                first_child: {
                  tcin: "77615850",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f1924f8e-17ae-4bb5-a493-b54cef8fce3c",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_fa943e7e-072a-44e5-aab4-50e962b36567",
                    "https://target.scene7.com/is/image/Target/GUEST_14467344-c6c6-4a4f-b62c-770b669c534f",
                    "https://target.scene7.com/is/image/Target/GUEST_fa376ca2-8714-442c-81b6-a4fc794db07c",
                    "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_638fda1f-6e50-4f4a-bb4c-a709c2ce432b",
                },
              },
              {
                value: "Purple",
                first_child: {
                  tcin: "77615851",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_da4ec532-2af8-48d3-bea6-eb6e28b5ccb3",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_ce1c17a9-d3ca-4028-936b-6685e314c5cc",
                    "https://target.scene7.com/is/image/Target/GUEST_1999f94d-d781-40cb-babe-e7320cd71c71",
                    "https://target.scene7.com/is/image/Target/GUEST_bf8568b1-7f19-4800-bb62-e046bc63f060",
                    "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_0799d40d-87fd-4c73-a4c0-d5f555f140b9",
                },
              },
              {
                value: "Space Gray",
                first_child: {
                  tcin: "77615852",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_0d23fbaa-8448-42f6-a193-004fd77e9090",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_007c375d-35a0-4bb7-90f3-57d0e20dc598",
                    "https://target.scene7.com/is/image/Target/GUEST_c105780f-e4bf-4970-93ab-6a30452d26c8",
                    "https://target.scene7.com/is/image/Target/GUEST_85667118-2053-46dc-a425-b3bdaea90a3d",
                    "https://target.scene7.com/is/image/Target/GUEST_6728315b-61ed-4bea-8cf5-3da544e6f21b",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6f4bf1e3-277a-4f47-8f4a-1480c9555b68",
                },
              },
              {
                value: "Starlight",
                first_child: {
                  tcin: "77615842",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_bc76352e-57c1-42af-82a1-c401ff7a6237",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_cd6864b0-1d05-4e90-a30b-cc08734f20ad",
                    "https://target.scene7.com/is/image/Target/GUEST_c933ef14-d86a-4bd8-a0b5-e339ff0c041d",
                    "https://target.scene7.com/is/image/Target/GUEST_fd5f14da-232c-4d0a-af0b-2157a997eae2",
                    "https://target.scene7.com/is/image/Target/GUEST_3a0a176c-5943-4cba-a5e2-e7b2a92b00fc",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_deaabd13-e9e8-49d5-a2a7-9681075cd21b",
                },
              },
            ],
          },
          {
            name: "Size",
            has_swatch: true,
            swatches: [
              {
                value: "64GB",
                first_child: {
                  tcin: "77615850",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f1924f8e-17ae-4bb5-a493-b54cef8fce3c",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_fa943e7e-072a-44e5-aab4-50e962b36567",
                    "https://target.scene7.com/is/image/Target/GUEST_14467344-c6c6-4a4f-b62c-770b669c534f",
                    "https://target.scene7.com/is/image/Target/GUEST_fa376ca2-8714-442c-81b6-a4fc794db07c",
                    "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_638fda1f-6e50-4f4a-bb4c-a709c2ce432b",
                },
              },
              {
                value: "256GB",
                first_child: {
                  tcin: "77615839",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_da4ec532-2af8-48d3-bea6-eb6e28b5ccb3",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_ce1c17a9-d3ca-4028-936b-6685e314c5cc",
                    "https://target.scene7.com/is/image/Target/GUEST_1999f94d-d781-40cb-babe-e7320cd71c71",
                    "https://target.scene7.com/is/image/Target/GUEST_bf8568b1-7f19-4800-bb62-e046bc63f060",
                    "https://target.scene7.com/is/image/Target/GUEST_fb2b93ae-3b8c-48fa-8f55-77db32037bf1",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_0799d40d-87fd-4c73-a4c0-d5f555f140b9",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [
      {
        plp_message: "4 months of Apple Music for free with Target Circle",
        promotion_id: "312158828",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "6 months of Apple Arcade for free with Target Circle",
        promotion_id: "513129132",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
    ],
    price: {
      formatted_current_price: "$499.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "83240820",
    original_tcin: "83240820",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-14-34-chromebook-laptop-with-chrome-os-intel-processor-4gb-ram-memory-64gb-flash-storage-silver-14a-na0052tg/-/A-83240820",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_5d4351db-81ee-4896-8739-ce917c698e31",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_48690dce-3721-4869-96cd-eb119a5ea905",
            "https://target.scene7.com/is/image/Target/GUEST_3a2e9151-84d8-41c5-b588-aefb370d6704",
            "https://target.scene7.com/is/image/Target/GUEST_3b10d6cb-0af8-469b-9cf2-9b706a27e989",
            "https://target.scene7.com/is/image/Target/GUEST_310c3db1-e18e-456a-b12b-669ecee07e5a",
            "https://target.scene7.com/is/image/Target/GUEST_83189bbd-4716-4ba7-b19e-c4b5b84fe0f4",
            "https://target.scene7.com/is/image/Target/GUEST_76e4312d-3233-4a2e-9832-4bb1b4600eb8",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_c3fef8a4-d0c9-49ee-854d-737669ee2129_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-01-4294",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 14&#34; Chromebook Laptop with Chrome OS - Intel Processor - 4GB RAM Memory - 64GB Flash Storage - Silver (14a-na0052tg)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .7 Inches (H) x 12.82 Inches (W) x 8.6 Inches (D)",
          "<B>Weight:</B> 3.24 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> High Definition Audio, Built-In Bluetooth, High Definition Display, Built-In Speaker, Built-In Webcam, Touchpad",
          "<B>Processor Type:</B> Intel Celeron",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Google Chrome OS",
          "<B>Data Storage Drive Capacity:</B> 64GB eMMC",
          "<B>Includes:</B> AC Power Adapter",
          "<B>Screen Resolution:</B> 1366 x 768",
          "<B>Connection Types:</B> USB, USB-C",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Native screen refresh rate:</B> 60 Hz",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 14 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 1.1 GHz",
          "<B>System RAM:</B> 4 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x4GB",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 14a-na0052tg",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> EMMC",
          "<B>Graphics card model:</B> Intel® UHD Graphics 600",
          "<B>Processor model:</B> Intel® Celeron® N4020",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 64 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 13.5 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "14-inch diagonal HD micro-edge anti-glare display",
            "Chrome operating system, Google Assistant",
            "Intel® Celeron® N4020 with Intel® UHD Graphics 600",
            "4 GB DDR4-2400 memory and 64 GB eMMC internal storage",
            "Access to millions of apps from the Google Play Store including Microsoft Word, Excel and PowerPoint",
            "Up to 13 hours and 30 minutes of battery life",
            "2 SuperSpeed USB Type-C®, 1 SuperSpeed USB Type-A, 1 Headphone/microphone combo",
            "Includes 45 W USB Type-C® power adapter, setup poster",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$319.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.37,
          count: 68,
          secondary_averages: [
            {
              id: "Value",
              label: "value",
              value: 4.64,
            },
            {
              id: "Quality",
              label: "quality",
              value: 4.29,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "76457041",
    original_tcin: "76457041",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/canon-pg-243-black-244-color-combo-2pk-ink-cartridges-black-tri-color-1287c006/-/A-76457041",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_76ae8957-31fc-46c7-bae8-3008edb87b6f",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_e4e4b47b-2edb-4ff6-ba51-74f77c6c025e",
            "https://target.scene7.com/is/image/Target/GUEST_ec94cfa3-4691-414f-a4b3-e9e6d44f98af",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-07-0494",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "Canon PG-243 Black 244 Color Combo 2pk Ink Cartridges - Black Tri-color (1287C006)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> Canon 243/244 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 4",
          "<B>Printer Ink Color:</B> Multiple Colors",
          "<B>Page Yield:</B> Standard Yield",
          "<B>Count:</B> 2 cartridges",
          "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "CANON PG-243/CL-244 - Great Quality & Durability",
            "PG-243 pigment black ensures sharp text",
            "CL-244 color ink is for printing photos & images",
            "Genuine Canon inks provide peak performance",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "CANON U.S.A. INC.",
          id: "1563274",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/canon/-/N-5y3et",
        linking_id: "5y3et",
        name: "Canon",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$29.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.56,
          count: 242,
          secondary_averages: [
            {
              id: "Quality",
              label: "quality",
              value: 3.78,
            },
            {
              id: "Value",
              label: "value",
              value: 3.96,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "80601875",
    original_tcin: "80601875",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 10,
        department_id: 57,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/apple-ipad-pro-12-9-inch-wi-fi-only-256gb-space-gray/-/A-80601875",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_19cac683-572e-4f5d-9c7b-75ff18e1f605",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_dc596683-cb04-47b7-b283-d969c6434cf1",
            "https://target.scene7.com/is/image/Target/GUEST_1a14aee1-200a-4b0c-83d1-a3129eeceb92",
            "https://target.scene7.com/is/image/Target/GUEST_bc187a78-ce25-4645-ac5a-92e1aae2ec47",
            "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
            "https://target.scene7.com/is/image/Target/GUEST_b08bd2dd-c601-4a2d-817b-70d04de427eb",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_11881ecb-b25f-47ef-8d5b-a276604bd071_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "057-10-2298",
      mmbv_content: {
        street_date: "2021-05-27",
      },
      cart_add_on_threshold: 35,
      product_description: {
        title: "Apple iPad Pro 12.9-inch Wi-Fi Only 256GB - Space Gray",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 11.04 Inches (H) x 8.46 Inches (W) x .25 Inches (D)",
          "<B>Weight:</B> 1.51 Pounds",
          "<B>Product Model:</B> Apple 12.9-inch iPad Pro",
          "<B>Electronics Condition:</B> New",
          "<B>Electronics Features:</B> Front-Facing Camera",
          "<B>Megapixels:</B> 12 MP",
          "<B>Data Storage Drive Capacity:</B> 256GB Hard Drive Capacity",
          "<B>Wireless Technology:</B> Bluetooth 5.0",
          "<B>Screen Size:</B> 12.9 Inches",
          "<B>System RAM:</B> 8 GB",
          "<B>Data storage type:</B> HDD",
          "<B>Maximum Battery Charge Life:</B> 10 Hours",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Apple M1 chip for next-level performance",
            "Brilliant 12.9-inch Liquid Retina XDR display¹ with ProMotion, True Tone, and P3 wide color",
            "TrueDepth camera system featuring Ultra Wide camera with Center Stage",
            "12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR",
            "Stay connected with ultrafast Wi-Fi 6",
            "Go further with all-day battery life²",
            "Thunderbolt port for connecting to fast external storage, displays, and docks",
            "Face ID for secure authentication and Apple Pay",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "APPLE COMPUTER INC",
          id: "1113705",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/apple/-/N-5y3ej",
        linking_id: "5y3ej",
        name: "Apple",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "82866370",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 10,
          department_id: 57,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/apple-ipad-pro-12-9-inch-wi-fi-only/-/A-82866370",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
              "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
              "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
              "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_11881ecb-b25f-47ef-8d5b-a276604bd071_Flash9_Autox720p_2600k",
                },
              ],
            },
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_e7475c4d-4d0d-436d-812d-91924adcdf49_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        is_limited_time_offer: false,
        compliance: {},
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Apple iPad Pro 12.9-inch Wi-Fi Only",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 11.04 Inches (H) x 8.46 Inches (W) x .25 Inches (D)",
            "<B>Weight:</B> 1.51 Pounds",
            "<B>Product Model:</B> Apple 12.9-inch iPad Pro",
            "<B>Electronics Condition:</B> New",
            "<B>Electronics Features:</B> Front-Facing Camera",
            "<B>Megapixels:</B> 12 MP",
            "<B>Data Storage Drive Capacity:</B> 128GB Hard Drive Capacity",
            "<B>Wireless Technology:</B> Bluetooth 5.0",
            "<B>Screen Size:</B> 12.9 Inches",
            "<B>System RAM:</B> 8 GB",
            "<B>Data storage type:</B> HDD",
            "<B>Maximum Battery Charge Life:</B> 10 Hours",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Brilliant 12.9-inch Liquid Retina XDR display1 with ProMotion, True Tone, and P3 wide color",
              "12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR",
              "5G for superfast downloads and high-quality streaming2",
              "Thunderbolt port for connecting to fast external storage, displays, and docks",
              "Face ID for secure authentication and Apple Pay",
              "Four speaker audio and five studio-quality microphones",
              "Support for Apple Pencil (2nd generation), Magic Keyboard, and Smart Keyboard Folio4",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/apple/-/N-5y3ej",
          linking_id: "5y3ej",
          name: "Apple",
        },
      },
      promotions: [
        {
          plp_message:
            "Save $30 on an Apple Pencil 2 with iPad Pro purchase on select items",
          promotion_id: "110176011",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "DollarOff",
          reward_value: 30,
          circle_offer: false,
        },
        {
          plp_message:
            "4 months of Apple Music for free with Target Circle on select items",
          promotion_id: "312158828",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message:
            "6 months of Apple Arcade for free with Target Circle on select items",
          promotion_id: "513129132",
          promotion_class: "No Discount",
          subscription_type: "ALL",
          threshold_type: "none",
          threshold_value: 1,
          reward_type: "NoDiscount",
          reward_value: 0,
          circle_offer: false,
        },
        {
          plp_message:
            "Get a Combo Touch for $195.49 with iPad Pro purchase on select items",
          promotion_id: "768536527",
          promotion_class: "BOGO",
          subscription_type: "ALL",
          threshold_type: "quantity",
          threshold_value: 1,
          reward_type: "FixedPrice",
          reward_value: 195.49,
          circle_offer: false,
        },
      ],
      price: {
        formatted_current_price: "$1,099.99 - $1,799.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.67,
            count: 24,
            secondary_averages: [
              {
                id: "Features",
                label: "features",
                value: 5,
              },
              {
                id: "speed",
                label: "speed",
                value: 5,
              },
              {
                id: "EaseOfUse",
                label: "ease of use",
                value: 5,
              },
              {
                id: "display",
                label: "display",
                value: 5,
              },
              {
                id: "Value",
                label: "value",
                value: 4.87,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Silver",
                first_child: {
                  tcin: "80601874",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
                    "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6682f123-dc80-41cd-a603-cd253cb26afb",
                },
              },
              {
                value: "Space Gray",
                first_child: {
                  tcin: "80601872",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_19cac683-572e-4f5d-9c7b-75ff18e1f605",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_dc596683-cb04-47b7-b283-d969c6434cf1",
                    "https://target.scene7.com/is/image/Target/GUEST_1a14aee1-200a-4b0c-83d1-a3129eeceb92",
                    "https://target.scene7.com/is/image/Target/GUEST_bc187a78-ce25-4645-ac5a-92e1aae2ec47",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_b08bd2dd-c601-4a2d-817b-70d04de427eb",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ad2bbd24-3463-4f55-b6b7-98adeb8914a0",
                },
              },
            ],
          },
          {
            name: "Size",
            has_swatch: true,
            swatches: [
              {
                value: "128GB",
                first_child: {
                  tcin: "80601874",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
                    "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6682f123-dc80-41cd-a603-cd253cb26afb",
                },
              },
              {
                value: "256GB",
                first_child: {
                  tcin: "80601876",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
                    "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6682f123-dc80-41cd-a603-cd253cb26afb",
                },
              },
              {
                value: "512GB",
                first_child: {
                  tcin: "77616882",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
                    "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6682f123-dc80-41cd-a603-cd253cb26afb",
                },
              },
              {
                value: "1TB",
                first_child: {
                  tcin: "77616884",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_ec8dcdff-f785-4676-ad42-85b15691f372",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_2b26e2e9-7062-4165-893d-8331f95af488",
                    "https://target.scene7.com/is/image/Target/GUEST_d32d3ba7-d750-481b-b190-bfdd2d47dfdb",
                    "https://target.scene7.com/is/image/Target/GUEST_217bd933-47a0-4d99-8f65-d2258aa422e1",
                    "https://target.scene7.com/is/image/Target/GUEST_464d5067-95d4-4ada-9db7-b431c4a91a05",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6682f123-dc80-41cd-a603-cd253cb26afb",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [
      {
        plp_message: "Save $30 on an Apple Pencil 2 with iPad Pro purchase",
        promotion_id: "110176011",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "DollarOff",
        reward_value: 30,
        circle_offer: false,
      },
      {
        plp_message: "4 months of Apple Music for free with Target Circle",
        promotion_id: "312158828",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "6 months of Apple Arcade for free with Target Circle",
        promotion_id: "513129132",
        promotion_class: "No Discount",
        subscription_type: "ALL",
        threshold_type: "none",
        threshold_value: 1,
        reward_type: "NoDiscount",
        reward_value: 0,
        circle_offer: false,
      },
      {
        plp_message: "Get a Combo Touch for $195.49 with iPad Pro purchase",
        promotion_id: "768536527",
        promotion_class: "BOGO",
        subscription_type: "ALL",
        threshold_type: "quantity",
        threshold_value: 1,
        reward_type: "FixedPrice",
        reward_value: 195.49,
        circle_offer: false,
      },
    ],
    price: {
      formatted_current_price: "$1,199.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82457999",
    original_tcin: "82457999",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-15-6-34-laptop-with-windows-home-in-s-mode-intel-core-i3-11th-gen-processor-8gb-ram-memory-256gb-ssd-storage-silver-15-dy2035tg/-/A-82457999",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_6e76db20-5e1b-4112-97c6-3e6c3924e817",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_f2ed1b98-76a6-48f9-81b7-14dbbd16d5ec",
            "https://target.scene7.com/is/image/Target/GUEST_eaacdb4e-a2bf-4c4d-9b13-96c56c9c50f6",
            "https://target.scene7.com/is/image/Target/GUEST_91a4efc4-9ce6-4260-8973-4567f34d9aa9",
            "https://target.scene7.com/is/image/Target/GUEST_20ff1747-c8c6-402b-b294-b68e7fa193ec",
            "https://target.scene7.com/is/image/Target/GUEST_c16dd229-a1a9-4467-b8f7-673b99d7d177",
            "https://target.scene7.com/is/image/Target/GUEST_37bcefc0-a586-4608-81bf-2aa0d9971eff",
            "https://target.scene7.com/is/image/Target/GUEST_44923919-f12f-467c-b178-dde5145a46b5",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_0a622f38-2244-4089-98c5-986a39538db5_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_1a80b40b-4df9-4cd9-b6bb-722d9fc2fd20_Flash9_Autox720p_2600k",
              },
            ],
          },
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_bb62f2b4-399a-4218-8ef6-5fae24a5c390_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-01-5560",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 15.6&#34; Laptop with Windows Home in S mode - Intel Core i3 11th Gen Processor - 8GB RAM Memory - 256GB SSD Storage - Silver (15-dy2035tg)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 14.11 Inches (W) x 9.53 Inches (D)",
          "<B>Weight:</B> 3.75 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> Fingerprint Reader, High Definition Audio, Numeric Keypad, Microsoft 365 Compatible, Multi-Touch Gesture Support, Built-In Bluetooth, High Definition Display, Built-In Webcam, Built-In Speaker, Dual Speakers",
          "<B>Processor Type:</B> Intel Core i3",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 256GB Solid State Drive",
          "<B>Includes:</B> Power cord",
          "<B>Screen Resolution:</B> 1920 x 1080",
          "<B>Connection Types:</B> USB, USB-C, SD, HDMI",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 15.6 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 3.7 GHz",
          "<B>System RAM:</B> 8 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x8GB",
          "<B>Display Type:</B> IPS Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 15-dy2035tg",
          "<B>Number of cores:</B> 4",
          "<B>Data storage type:</B> SSD (NVMe)",
          "<B>Graphics card model:</B> Intel UHD Graphics",
          "<B>Processor model:</B> 11th Generation Intel Core i3-1125G4",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 256 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 9 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "15.6-inch diagonal Full HD micro-edge anti-glare display",
            "Windows Home in S mode operating system",
            "11th Generation Intel® Core™ i3-1125G4 with Intel® UHD Graphics",
            "8 GB DDR4-2666 memory and 256 GB PCIe® NVMe™ M.2 SSD internal storage",
            "Backlit Keyboard, Fingerprint reader, HP Fast Charge",
            "Up to 9 hours and 15 minutes of battery life",
            "1 SuperSpeed USB Type-C®, 2 SuperSpeed USB Type-A, 1 Headphone/microphone combo, 1 HDMI",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    cgi_asset: {
      experiences: [
        "android",
        "see_it_in_your_space",
        "spinner",
        "ios",
        "ios_quicklook",
      ],
      formats: {
        glb: "https://digitalcontent.target.com/vault/1642032000/CLOUD_86883eb0-f738-491a-a271-20a33184f5fa.glb",
        usdz: "https://digitalcontent.target.com/vault/1642032000/CLOUD_fba3ab46-d6ba-48a9-b7c7-2a6d181d33ba.usdz",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$519.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.18,
          count: 213,
          secondary_averages: [
            {
              id: "Value",
              label: "value",
              value: 4.67,
            },
            {
              id: "Quality",
              label: "quality",
              value: 4.38,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "17079455",
    original_tcin: "17079455",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/canon-245xl-black-246xl-color-combo-2pk-ink-cartridges-black-tri-color-8278b005/-/A-17079455",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_a940dd0e-80ef-4eb8-83ca-bf7868245a07",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_b2af2f02-540c-441c-99b6-06b2a5742d16",
            "https://target.scene7.com/is/image/Target/GUEST_3cc39fd4-51b9-46d4-b642-c408424811fd",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      compliance: {},
      dpci: "056-07-0073",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "Canon 245XL Black, 246XL Color Combo 2pk Ink Cartridges - Black, Tri-color (8278B005)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> Canon 245/246 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 2",
          "<B>Printer Ink Color:</B> Multiple Colors",
          "<B>Page Yield:</B> High Yield",
          "<B>Count:</B> 2 cartridges",
          "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Set of two",
            "Feature black and multicolored cartridge",
            "Perfect for glossy photo paper Genuine Canon ink tanks                          Dye based ink formulation for beautiful",
            "Special ink formulation for long lasting prints",
            "Exceptional quality, remarkable durability",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "CANON U.S.A. INC.",
          id: "1563274",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/canon/-/N-5y3et",
        linking_id: "5y3et",
        name: "Canon",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "53550512",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/canon-245xl-246xl-ink-cartridge-series/-/A-53550512",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_a940dd0e-80ef-4eb8-83ca-bf7868245a07",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_b2af2f02-540c-441c-99b6-06b2a5742d16",
              "https://target.scene7.com/is/image/Target/GUEST_3cc39fd4-51b9-46d4-b642-c408424811fd",
            ],
          },
          videos: [
            {
              is_list_page_eligible: false,
              video_files: [
                {
                  mime_type: "video/mp4",
                  video_url:
                    "https://target.scene7.com/is/content/Target/GUEST_2bada370-ba4c-4fd0-9542-b66bfc2a70d8_Flash9_Autox720p_2600k",
                },
              ],
            },
          ],
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Canon 245XL/246XL Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> Canon 245/246 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 2",
            "<B>Printer Ink Color:</B> Multiple Colors",
            "<B>Page Yield:</B> High Yield",
            "<B>Count:</B> 2 cartridges",
            "<B>Warranty:</B> No Applicable Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Set of two",
              "Feature black and multicolored cartridge",
              "Perfect for glossy photo paper Genuine Canon ink tanks                          Dye based ink formulation for beautiful",
              "Special ink formulation for long lasting prints",
              "Exceptional quality, remarkable durability",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/canon/-/N-5y3et",
          linking_id: "5y3et",
          name: "Canon",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$26.99 - $56.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.71,
            count: 138,
            secondary_averages: [
              {
                id: "Value",
                label: "value",
                value: 4.58,
              },
              {
                id: "Quality",
                label: "quality",
                value: 4.86,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black (245XL), Tri-color (246XL)",
                first_child: {
                  tcin: "17079455",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_a940dd0e-80ef-4eb8-83ca-bf7868245a07",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_b2af2f02-540c-441c-99b6-06b2a5742d16",
                    "https://target.scene7.com/is/image/Target/GUEST_3cc39fd4-51b9-46d4-b642-c408424811fd",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4ae4cb39-8b6d-4862-99b5-64799ef0b2a8",
                },
              },
              {
                value: "Tri-color (246XL)",
                first_child: {
                  tcin: "17079456",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_83f64ea8-9c06-4be6-9f82-df57422206c5",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_576fe8ee-605a-48b4-bbd1-2aba597b2a66",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_894af9e8-9a4a-4775-baa8-d225a4e192ba",
                },
              },
              {
                value: "Black (245XL)",
                first_child: {
                  tcin: "17079457",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_07e41925-37c1-4f0e-8945-8738d94eae09",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_dd15b48e-5126-437a-a4cc-f9e321150ccf",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_8d703768-046a-49ef-834a-cf9e197dab2a",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$56.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82545755",
    original_tcin: "82545755",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 15,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/texas-instruments-84-plus-ce-graphing-calculator-black/-/A-82545755",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_4e3e9c1a-de32-4b29-a0e4-b72175784a43",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_e259dfad-258d-4e27-93ef-b29625a84611",
            "https://target.scene7.com/is/image/Target/GUEST_3176a851-1920-4b84-b3d1-355af561bd59",
          ],
        },
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-15-0253",
      cart_add_on_threshold: 35,
      product_description: {
        title: "Texas Instruments 84 Plus CE Graphing Calculator - Black",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 7.59 Inches (H) x 3.42 Inches (W) x .8 Inches (D)",
          "<B>Electronics Features:</B> Approved for SAT II Math IIC, Approved for AP Chemistry, Approved for ACT, Approved for AP Physics, Approved for PSAT, Approved for SAT II Math IC, Approved for AP Calculus, Approved for SAT I",
          "<B>Data storage capacity:</B> 3.5 MB",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Built-in MathPrint™ functionality allows you to input and view math symbols, formulas and stacked fractions exactly as they appear in textbooks.",
            "High-resolution, full-color backlit display.",
            "TI Rechargeable battery included.",
            "30% lighter and thinner than earlier generation TI-84 Plus models.",
            "Preloaded apps and images.",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "TEXAS INSTRUMENTS INC",
          id: "4531520",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/texas-instruments/-/N-5vpvl",
        linking_id: "5vpvl",
        name: "Texas Instruments",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$149.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 4.84,
          count: 161,
          secondary_averages: [
            {
              id: "Quality",
              label: "quality",
              value: 4.94,
            },
            {
              id: "Value",
              label: "value",
              value: 4.56,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82483191",
    original_tcin: "82483191",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/asus-14-34-fhd-laptop-windows-home-in-s-mode-intel-processor-4gb-ram-64gb-flash-storage-black-model-l410ma-tb02/-/A-82483191",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_ac42baf7-ebf6-4733-839a-e19f32417b27",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_81e9979b-534f-4000-852b-4e65f823b32e",
            "https://target.scene7.com/is/image/Target/GUEST_906d888d-465c-436a-ab59-f67b4d285826",
            "https://target.scene7.com/is/image/Target/GUEST_deab9a8f-7543-412e-b6af-0fad8211ac4a",
            "https://target.scene7.com/is/image/Target/GUEST_cc698d98-eab2-4507-88c7-c38ae09c7798",
            "https://target.scene7.com/is/image/Target/GUEST_aa8ef943-13c2-4200-9a2a-43fbf51bfebf",
            "https://target.scene7.com/is/image/Target/GUEST_6091c356-a369-434d-9911-5cb83eeb1460",
            "https://target.scene7.com/is/image/Target/GUEST_313289e7-6440-4d3d-a120-b783f96a152e",
          ],
        },
        videos: [
          {
            is_list_page_eligible: false,
            video_files: [
              {
                mime_type: "video/mp4",
                video_url:
                  "https://target.scene7.com/is/content/Target/GUEST_9ad33019-1310-4f32-acfa-dd6b47a03e60_Flash9_Autox720p_2600k",
              },
            ],
          },
        ],
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-01-0050",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "ASUS 14&#34; FHD Laptop Windows Home in S Mode Intel Processor 4GB RAM 64GB Flash Storage - Black - Model L410MA-TB02",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 8.54 Inches (W) x 12.8 Inches (D)",
          "<B>Weight:</B> 2.87 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> Anti-Glare Coating, Microsoft 365 Compatible, Backlit Display, Built-In Bluetooth, Touchpad, Built-In Speaker, Built-In Webcam",
          "<B>Processor Type:</B> Intel Celeron",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 64GB eMMC",
          "<B>Includes:</B> Battery, Owner's Manual, Power cord, AC Power Adapter",
          "<B>Screen Resolution:</B> 1920 x 1080",
          "<B>Connection Types:</B> 3.5mm Jack, MicroSD, USB, USB-C, HDMI",
          "<B>Video Recording Resolution:</B> 480p",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 4.1",
          "<B>Screen Size:</B> 14 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 1.1 GHz",
          "<B>System RAM:</B> 4 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x4GB",
          "<B>Industry or Government Certifications:</B> Energy Star Certified",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> L410MA-TB02",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> EMMC",
          "<B>Graphics card model:</B> Intel UHD Graphics 600",
          "<B>Processor model:</B> N4020",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 64 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 12 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Stunning 14-inch FHD display",
            "Windows 10 Home in S Mode operating system",
            "Free upgrade to Windows 11 when available*",
            "Full-size backlit keyboard and large 6-inch TouchPad.",
            "Efficient Intel® Celeron® N4020 Processor",
            "4GB DDR4 RAM and 64GB Storage",
            "Innovative NumberPad Design for convenient numerical input to boost productivity",
            "Experience up to 12 hours of battery life* to stay active all day",
            "Perfectly compact and lightweight at 2.87 lbs. makes it easy to carry",
            "Effortless collaboration with the 180-degree hinge",
            "USB 3.2 Gen 1 Type-C, USB 3.2 Gen 1 Type-A, HDMI, MicroSD Connectivity",
            "Fanless design to reduce noise",
            "Microsoft 365 Personal 1-year included",
            "*Battery life may vary based on usage, environment and other factors.",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "ASUS COMPUTER INTL",
          id: "1213155",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/asus/-/N-5y1f9",
        linking_id: "5y1f9",
        name: "ASUS",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$249.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 3.7,
          count: 102,
          secondary_averages: [
            {
              id: "Value",
              label: "value",
              value: 3.26,
            },
            {
              id: "Quality",
              label: "quality",
              value: 3.09,
            },
          ],
        },
      },
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "14240074",
    original_tcin: "14240074",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 7,
        department_id: 56,
      },
      eligibility_rules: {
        scheduled_delivery: {
          is_active: true,
        },
      },
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-61xl-single-ink-cartridge-black-ch563wn-140/-/A-14240074",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_c9394a2d-e3ec-48d5-bb14-e771d01543a7",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_bd8204a5-0f14-4725-8ee4-0226ebe5460f",
            "https://target.scene7.com/is/image/Target/GUEST_82780413-516e-449b-b4bd-0b4ca75b37fa",
            "https://target.scene7.com/is/image/Target/GUEST_935d8799-4cf7-4380-8afb-4cbd20d71069",
            "https://target.scene7.com/is/image/Target/GUEST_50a59cb0-ada1-4441-8b63-0aa53ad9b8cf",
            "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
          ],
        },
      },
      compliance: {},
      dpci: "056-07-1138",
      cart_add_on_threshold: 35,
      product_description: {
        title: "HP 61XL Single Ink Cartridge - Black (CH563WN#140)",
        bullet_descriptions: [
          "<B>Compatible Ink Cartridges:</B> HP 61 series",
          "<B>Electronics Condition:</B> New",
          "<B>Number of Ink Colors:</B> 1",
          "<B>Printer Ink Color:</B> Black",
          "<B>Page Yield:</B> High Yield",
          "<B>Count:</B> 1 cartridges",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Original HP 61XL ink cartridges work with HP Deskjet 1056, 1510, 1512, 2050, 2510, 2512, 2514, 2540, 2542, 2544, 3000, 3050, 3051, 3052, 3054, 3510, 3511, 3512. HP ENVY 4500, 4501, 4502, 5530, 5531, 5532, 5534, 5535, 5539. HP Officejet 2620, 2621, 4630, 4632, 4635",
            "Up to 2X more pages with Original HP XL ink than standard cartridges",
            "HP 61XL ink cartridge yield (approx.): 430 pages",
            "Color: Black",
            "Original HP ink cartridges: genuine ink for your HP printer",
            "What's in the box: 1 New Original HP 61XL black ink cartridge (CH563WN)",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "Essendant",
          id: "1973458",
        },
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "53550100",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 7,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/hp-61-ink-cartridge-series/-/A-53550100",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_cc7caa92-071f-4eb9-b4f2-962bea8f3373",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_5776f65e-d023-4289-a5a1-45c0ad7d4dc6",
              "https://target.scene7.com/is/image/Target/GUEST_91f141bf-b0d5-445c-a60a-bbcd477c06c8",
            ],
          },
        },
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "HP 61 Ink Cartridge Series",
          bullet_descriptions: [
            "<B>Compatible Ink Cartridges:</B> HP 61 series",
            "<B>Electronics Condition:</B> New",
            "<B>Number of Ink Colors:</B> 3",
            "<B>Printer Ink Color:</B> Multiple Colors",
            "<B>Count:</B> 2 cartridges",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
          soft_bullets: {
            bullets: [
              "Resists smudging on smooth and glossy pages",
              "Includes two cartridges",
              "Contains multiple colors",
            ],
          },
        },
        primary_brand: {
          canonical_url: "/b/hp-inc/-/N-p6y7m",
          linking_id: "p6y7m",
          name: "HP Inc.",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$21.99 - $48.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.56,
            count: 5431,
            secondary_averages: [
              {
                id: "Quality",
                label: "quality",
                value: 4.47,
              },
              {
                id: "Value",
                label: "value",
                value: 4.15,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Black (61 Single)",
                first_child: {
                  tcin: "12763404",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_bdaa5fe2-a14d-41d8-8744-c9bebf0d8d4d",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_5bc52f5c-d465-49fa-b789-ea9262105001",
                    "https://target.scene7.com/is/image/Target/GUEST_7ce29db0-b0b6-4a85-b8e1-1accfbd5ab55",
                    "https://target.scene7.com/is/image/Target/GUEST_a51e2e3b-5f4b-4311-9a62-0e0e8c1addb6",
                    "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4cfd755d-7213-4467-81c5-172317aa366e",
                },
              },
              {
                value: "Tri-color (61 Single)",
                first_child: {
                  tcin: "12763401",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_8731b7aa-9102-4775-8bfa-da2af4585b58",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_bfd81dd9-2809-479b-94ab-97bc8d78cd8b",
                    "https://target.scene7.com/is/image/Target/GUEST_7ce29db0-b0b6-4a85-b8e1-1accfbd5ab55",
                    "https://target.scene7.com/is/image/Target/GUEST_e04d9481-99e7-40ab-8bc7-3e78f92fdfae",
                    "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_39df04e3-8bd7-46b7-8e7f-9ee2cbe777b1",
                },
              },
              {
                value: "Black, Tri-color (61)",
                first_child: {
                  tcin: "13103221",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_90f8abbc-36dd-4b93-b1b1-eb602563e3b7",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_65bd976b-f7ec-4535-b512-fb2c883ade89",
                    "https://target.scene7.com/is/image/Target/GUEST_690fafc1-0a87-4a7f-8699-d3a6398b4406",
                    "https://target.scene7.com/is/image/Target/GUEST_2a70402c-7599-449b-a96e-0c73077bdf42",
                    "https://target.scene7.com/is/image/Target/GUEST_23d6e485-0527-433e-bf9a-2c137306ff65",
                    "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_649d3cdf-e5f7-4943-8a25-b6e5494885b4",
                },
              },
              {
                value: "Black (61XL)",
                first_child: {
                  tcin: "14240074",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_c9394a2d-e3ec-48d5-bb14-e771d01543a7",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_bd8204a5-0f14-4725-8ee4-0226ebe5460f",
                    "https://target.scene7.com/is/image/Target/GUEST_82780413-516e-449b-b4bd-0b4ca75b37fa",
                    "https://target.scene7.com/is/image/Target/GUEST_935d8799-4cf7-4380-8afb-4cbd20d71069",
                    "https://target.scene7.com/is/image/Target/GUEST_50a59cb0-ada1-4441-8b63-0aa53ad9b8cf",
                    "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_8e6aa66b-64eb-4b44-a1bf-5623d08708db",
                },
              },
              {
                value: "Tri-color (61XL)",
                first_child: {
                  tcin: "14240065",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_75072f02-345b-493a-9bb0-a96c05b662c2",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_c27d58ad-f303-42b3-863f-3b2464de4b33",
                    "https://target.scene7.com/is/image/Target/GUEST_b663dffd-a1d0-4a29-b6a4-1dd81c601e9f",
                    "https://target.scene7.com/is/image/Target/GUEST_f286c428-d20a-43eb-9e86-f8f4e8a81db1",
                    "https://target.scene7.com/is/image/Target/GUEST_2b03250d-773b-49ea-8002-8e06201e5f49",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_4b4db0ef-edfd-453d-88db-7444336e2034",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$45.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "85667246",
    original_tcin: "85667246",
    item: {
      relationship_type: "Variation Child",
      relationship_type_code: "VC",
      merchandise_classification: {
        class_id: 15,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/texas-instruments-84-plus-ce-graphing-calculator-red/-/A-85667246",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_f381aee5-6164-491c-a8e6-bf81d3a3422f",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_91d69334-a2cc-46ff-9238-767b2d2f3de6",
            "https://target.scene7.com/is/image/Target/GUEST_19187cae-8b09-49b8-8ad4-6efe338e202c",
          ],
        },
      },
      is_limited_time_offer: false,
      compliance: {},
      dpci: "056-15-1156",
      cart_add_on_threshold: 35,
      product_description: {
        title: "Texas Instruments 84 Plus CE Graphing Calculator - Red",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> 7.59 Inches (H) x 3.42 Inches (W) x .8 Inches (D)",
          "<B>Weight:</B> .44 Pounds",
          "<B>Electronics Features:</B> ACT, Approved for ACT, Approved for SAT II Math IC, Approved for AP Calculus, Approved for SAT II Math IIC, Approved for SAT I, Approved for AP Physics, Approved for AP Chemistry, Approved for PSAT",
          "<B>Data storage capacity:</B> 3 MB",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "Lightweight, yet durable enough to withstand the demands of the classroom year after year",
            "Graph in vibrant colors to make faster, stronger connections",
            "Powered by a TI Rechargeable Battery that can last up to one month on a single charge",
            "Distraction-free (no Bluetooth, Wi-Fi, internet access) to keep students focused on learning",
            "Code on the go — students can code anytime, anywhere with the power of portable programming",
            "Ideal for students to use in any learning environment, virtual or in person",
            "Display expressions, symbols and fractions just as you write them",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "TEXAS INSTRUMENTS INC",
          id: "4531520",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/texas-instruments/-/N-5vpvl",
        linking_id: "5vpvl",
        name: "Texas Instruments",
      },
    },
    parent: {
      __typename: "ParentProductSummary",
      tcin: "86853308",
      item: {
        relationship_type: "Variation Parent",
        relationship_type_code: "VAP",
        merchandise_classification: {
          class_id: 15,
          department_id: 56,
        },
        enrichment: {
          buy_url:
            "https://www.target.com/p/texas-instruments-84-plus-ce-graphing-calculator/-/A-86853308",
          images: {
            primary_image_url:
              "https://target.scene7.com/is/image/Target/GUEST_d7c96f92-b487-455d-8a0d-d0505017fe29",
            alternate_image_urls: [
              "https://target.scene7.com/is/image/Target/GUEST_3b888c8b-0200-48f9-91c9-0108571b3633",
              "https://target.scene7.com/is/image/Target/GUEST_ae4927d4-ebc2-4469-84ee-fa505587dc63",
            ],
          },
        },
        is_limited_time_offer: false,
        has_extended_sizing: false,
        cart_add_on_threshold: 35,
        product_description: {
          title: "Texas Instruments 84 Plus CE Graphing Calculator ",
          bullet_descriptions: [
            "<B>Dimensions (Overall):</B> 7.59 Inches (H) x 3.42 Inches (W) x .8 Inches (D)",
            "<B>Weight:</B> .44 Pounds",
            "<B>Electronics Features:</B> ACT, Approved for ACT, Approved for SAT II Math IC, Approved for AP Calculus, Approved for SAT II Math IIC, Approved for SAT I, Approved for AP Physics, Approved for AP Chemistry, Approved for PSAT",
            "<B>Data storage capacity:</B> 3 MB",
            "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
            "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
          ],
        },
        primary_brand: {
          canonical_url: "/b/texas-instruments/-/N-5vpvl",
          linking_id: "5vpvl",
          name: "Texas Instruments",
        },
      },
      promotions: [],
      price: {
        formatted_current_price: "$149.99",
        formatted_current_price_type: "reg",
        location_id: 3991,
      },
      ratings_and_reviews: {
        statistics: {
          rating: {
            average: 4.82,
            count: 17,
            secondary_averages: [
              {
                id: "Value",
                label: "value",
                value: 4.77,
              },
              {
                id: "Quality",
                label: "quality",
                value: 5,
              },
            ],
          },
        },
      },
      variation_summary: {
        themes: [
          {
            name: "Color",
            has_swatch: true,
            swatches: [
              {
                value: "Blue",
                first_child: {
                  tcin: "85667247",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_d7c96f92-b487-455d-8a0d-d0505017fe29",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_3b888c8b-0200-48f9-91c9-0108571b3633",
                    "https://target.scene7.com/is/image/Target/GUEST_ae4927d4-ebc2-4469-84ee-fa505587dc63",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_6a25cf78-4fb3-4985-a620-35244fb8a332",
                },
              },
              {
                value: "Red",
                first_child: {
                  tcin: "85667246",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_f381aee5-6164-491c-a8e6-bf81d3a3422f",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_91d69334-a2cc-46ff-9238-767b2d2f3de6",
                    "https://target.scene7.com/is/image/Target/GUEST_19187cae-8b09-49b8-8ad4-6efe338e202c",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_492571d3-78c0-4338-958c-449840d66cf7",
                },
              },
              {
                value: "White",
                first_child: {
                  tcin: "85667245",
                  primary_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_569446a9-661b-46d7-8aa2-481a0f3b172f",
                  alternate_image_urls: [
                    "https://target.scene7.com/is/image/Target/GUEST_f1d5ce06-9802-4a47-a2b3-103c33b5fa28",
                    "https://target.scene7.com/is/image/Target/GUEST_fa8a6cc2-f80f-4b66-a768-b4f8b5bc5506",
                  ],
                  swatch_image_url:
                    "https://target.scene7.com/is/image/Target/GUEST_919426b6-92e1-4add-bbfd-debcf88dff79",
                },
              },
            ],
          },
        ],
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$149.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
  },
  {
    __typename: "ProductSummary",
    tcin: "82569469",
    original_tcin: "82569469",
    item: {
      relationship_type: "Stand Alone",
      relationship_type_code: "SA",
      merchandise_classification: {
        class_id: 1,
        department_id: 56,
      },
      eligibility_rules: {},
      enrichment: {
        buy_url:
          "https://www.target.com/p/hp-14-34-laptop-with-windows-home-in-s-mode-intel-processor-4gb-ram-64gb-flash-storage-8211-indigo-blue-14-dq0005tg/-/A-82569469",
        images: {
          primary_image_url:
            "https://target.scene7.com/is/image/Target/GUEST_4eef5e4a-752c-49ef-a2e6-4b97ecab7be7",
          alternate_image_urls: [
            "https://target.scene7.com/is/image/Target/GUEST_be38a4ec-06ba-4ebd-9fd6-c51773a96014",
            "https://target.scene7.com/is/image/Target/GUEST_d52a9a26-063b-4a34-97fc-3794f75f9910",
            "https://target.scene7.com/is/image/Target/GUEST_cd01391d-5bb7-46b9-89d1-f03d8707bf53",
            "https://target.scene7.com/is/image/Target/GUEST_91a1dfe3-bf57-40e7-90a3-287a244cb25f",
            "https://target.scene7.com/is/image/Target/GUEST_576c3dee-94c9-4cab-980a-1a3eb8519501",
            "https://target.scene7.com/is/image/Target/GUEST_1b905ade-d1b1-4c14-8da9-b311b9620c3b",
          ],
        },
      },
      compliance: {},
      dpci: "056-01-0164",
      cart_add_on_threshold: 35,
      product_description: {
        title:
          "HP 14&#34; Laptop with Windows Home in S Mode - Intel Processor - 4GB RAM - 64GB Flash Storage &#8211; Indigo Blue (14-dq0005tg)",
        bullet_descriptions: [
          "<B>Dimensions (Overall):</B> .71 Inches (H) x 12.76 Inches (W) x 8.86 Inches (D)",
          "<B>Weight:</B> 3.24 Pounds",
          "<B>Hard Drive Speed:</B> No Rotation",
          "<B>Electronics Condition:</B> New",
          "<B>Number of USB ports:</B> 3",
          "<B>Electronics Features:</B> High Definition Audio, Microsoft 365 Compatible, Multi-Touch Gesture Support, Built-In Bluetooth, High Definition Display, Touchpad, Built-In Webcam, Dual Speakers",
          "<B>Processor Type:</B> Intel Celeron",
          "<B>Aspect Ratio:</B> 16:9 Aspect Ratio",
          "<B>Operating System:</B> Windows 10 Home in S mode",
          "<B>Data Storage Drive Capacity:</B> 64GB eMMC",
          "<B>Includes:</B> Power cord",
          "<B>Screen Resolution:</B> 1366 x 768",
          "<B>Connection Types:</B> USB, USB-C, SD, HDMI",
          "<B>Video Recording Resolution:</B> 720p",
          "<B>Native screen refresh rate:</B> 60 Hz",
          "<B>Wireless Technology:</B> Wi-Fi 5 (IEEE 802.11ac), Bluetooth 5.0",
          "<B>Screen Size:</B> 14 Inches",
          "<B>Drive Type:</B> No Optical Disc Drive",
          "<B>Processor Speed:</B> 1.1 GHz",
          "<B>System RAM:</B> 4 GB",
          "<B>Memory RAM Type:</B> DDR4",
          "<B>RAM Configuration:</B> 1x4GB",
          "<B>Display Type:</B> TN Panel",
          "<B>Primary use:</B> Home",
          "<B>Model name:</B> 14-dq0005tg",
          "<B>Number of cores:</B> 2",
          "<B>Data storage type:</B> EMMC",
          "<B>Graphics card model:</B> Intel UHD Graphics 600",
          "<B>Processor model:</B> Intel Celeron® N4020",
          "<B>Touchscreen:</B> No Touchscreen Display",
          "<B>Data storage capacity:</B> 64 GB",
          "<B>Microphone:</B> Built-In Microphone",
          "<B>Maximum Battery Charge Life:</B> 10.5 Hours",
          "<B>RAM Slots (Total):</B> 1",
          "<B>Backlit Keyboard:</B> No Backlit Keyboard",
          "<B>Battery:</B> 1 Non-Universal Lithium Ion, Required, Included",
          "<B>Warranty:</B> 1 Year Limited Warranty. To obtain a copy of the manufacturer's or supplier's warranty for this item prior to purchasing the item, please call Target Guest Services at 1-800-591-3869",
        ],
        soft_bullets: {
          bullets: [
            "14-inch diagonal HD micro-edge BrightView display",
            "Windows 10 Home (S mode) operating system",
            "Free upgrade to Windows 11 (when available*)",
            "Microsoft 365 included for one year",
            "Intel® Celeron® N4020 with Intel® UHD Graphics 600",
            "4 GB DDR4-2400 memory and 64 GB eMMC internal storage",
            "Up to 10 hours and 30 minutes of battery life and HP Fast Charge",
            "1 SuperSpeed USB Type-C®, 2 SuperSpeed USB Type-A, 1 HDMI, 1 Headphone/microphone combo, 1 AC Smart pin,  1 SD media card reader",
          ],
        },
      },
      product_vendors: [
        {
          vendor_name: "HP INC",
          id: "1017995",
        },
      ],
      fulfillment: {},
      primary_brand: {
        canonical_url: "/b/hp-inc/-/N-p6y7m",
        linking_id: "p6y7m",
        name: "HP Inc.",
      },
    },
    promotions: [],
    price: {
      formatted_current_price: "$249.99",
      formatted_current_price_type: "reg",
      location_id: 3991,
    },
    ratings_and_reviews: {
      statistics: {
        rating: {
          average: 3.83,
          count: 63,
          secondary_averages: [
            {
              id: "Value",
              label: "value",
              value: 3.11,
            },
            {
              id: "Quality",
              label: "quality",
              value: 2.94,
            },
          ],
        },
      },
    },
  },
].map((e) => formater(e));

const seed = async (products) => {
  const catId = "computers-S11h";
  const tree = await axios
    .get(`http://localhost:4000/categories/${catId}`)
    .then((e) => {
      const getTree = (dd) => {
        const dvd = [];
        const tree = (e) => {
          dvd.push({
            id: e.id,
            name: e.name,
          });
          if (e.parent_id) {
            tree(e.parent);
          }
        };
        tree(dd);
        return dvd;
      };

      return getTree(e.data);
    });

  const prds = products.map((e) => {
    return {
      ...e,
      categories: tree.map((e) => e.id).reverse(),
    };
  });

  return prds.forEach((e) => {
    return axios
      .post(`http://localhost:4000/products`, e)
      .then((e) => {
        console.log(e.data.name);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  });
};

seed(products);

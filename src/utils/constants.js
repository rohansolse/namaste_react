export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const TOP_RATING_CUTOFF = 4.5;

export const SWIGGY_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING";

export const CORS_PROXIES = [
  { prefix: "https://api.allorigins.win/raw?url=", encode: true },
  { prefix: "https://proxy.cors.sh/", encode: false, headers: { "x-cors-api-key": "temp" } },
  { prefix: "https://thingproxy.freeboard.io/fetch/", encode: false },
  { prefix: "https://corsproxy.io/?", encode: true },
];
export const NO_RESULTS_COUNTDOWN = 5;

export const MENU_SECTIONS = [
  {
    title: "Popular Picks",
    items: [
      "Classic Margherita Pizza",
      "Paneer Tikka Wrap",
      "Spicy Ramen Bowl",
      "Loaded Nachos",
    ],
  },
  {
    title: "Healthy Bites",
    items: [
      "Grilled Veggie Salad",
      "Quinoa Power Bowl",
      "Fresh Fruit Platter",
      "Avocado Toast",
    ],
  },
  {
    title: "Desserts",
    items: ["Chocolate Lava Cake", "Blueberry Cheesecake", "Tiramisu"],
  },
];

export const RESTAURANT_MENU_API =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=";

export const FALLBACK_MENU_ITEMS = [
  {
    id: "sample-1",
    name: "Signature Veggie Pizza",
    description: "Wood-fired thin crust with fresh mozzarella and basil.",
    isVeg: true,
    price: 29900,
  },
  {
    id: "sample-2",
    name: "Tandoori Paneer Wrap",
    description: "Smoky paneer with mint chutney and fresh veggies.",
    isVeg: true,
    price: 24900,
  },
  {
    id: "sample-3",
    name: "Butter Chicken Bowl",
    description: "Creamy tomato gravy, char-grilled chicken, and rice.",
    isVeg: false,
    price: 32900,
  },
  {
    id: "sample-4",
    name: "Gulab Jamun Sundae",
    description: "Warm gulab jamun served over vanilla ice cream.",
    isVeg: true,
    price: 15900,
  },
];

export { default as FALLBACK_RESTAURANTS } from "./mockData";

import { FoodItem } from "@/types/types";

const makeFood = (partial: Partial<FoodItem>): FoodItem => ({
  id: cryptoRandomId(),
  name: "",
  description: "",
  preparation_time: 10,
  rating_description: "Popular",
  calories: 350,
  ingredients: "",
  foodType: ["Vegetarian"],
  rating: 4.5,
  price: 9.99,
  image_url:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80&auto=format&fit=crop",
  category_id: "",
  ...partial,
});

function cryptoRandomId() {
  // Small cross-platform random ID (no external deps)
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const mockSectionFoodData: {
  title: string;
  icon?: React.ReactNode;
  data: FoodItem[];
}[] = [
  { title: "introduction", data: [] },
  {
    title: "🥇 Popular Dishes 🥇",
    data: [
      makeFood({
        name: "Grilled Chicken Bowl",
        description:
          "Grilled chicken with quinoa, greens, and a tangy dressing.",
        preparation_time: 15,
        calories: 540,
        ingredients: "Chicken, quinoa, lettuce, tomatoes, dressing",
        foodType: ["Non-Vegetarian"],
        rating: 4.7,
        price: 12.99,
        image_url:
          "https://images.unsplash.com/photo-1604908554027-685f1b417c41?w=1200&q=80&auto=format&fit=crop",
        category_id: "popular",
      }),
      makeFood({
        name: "Vegan Buddha Bowl",
        description:
          "Roasted chickpeas, sweet potato, avocado, and tahini drizzle.",
        preparation_time: 12,
        calories: 480,
        ingredients: "Chickpeas, sweet potato, avocado, tahini, greens",
        foodType: ["Vegan"],
        rating: 4.6,
        price: 11.49,
        image_url:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop",
        category_id: "popular",
      }),
    ],
  },
  {
    title: "🥗 Salads 🥗",
    data: [
      makeFood({
        name: "Spicy Tuna Wrap",
        description: "Seared tuna, spicy mayo, and crunchy veggies in a wrap.",
        preparation_time: 10,
        calories: 420,
        ingredients: "Tuna, tortilla, cabbage, carrots, spicy mayo",
        foodType: ["Non-Vegetarian"],
        rating: 4.2,
        price: 10.99,
        image_url:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop",
        category_id: "new",
      }),
      makeFood({
        name: "Pesto Pasta Salad",
        description:
          "Fusilli tossed with basil pesto, cherry tomatoes, and feta.",
        preparation_time: 9,
        calories: 510,
        ingredients: "Pasta, basil, olive oil, tomatoes, feta",
        foodType: ["Vegetarian"],
        rating: 4.3,
        price: 9.49,
        image_url:
          "https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?w=1200&q=80&auto=format&fit=crop",
        category_id: "new",
      }),
    ],
  },
  {
    title: "💪 Gym food 💪",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "❤️ Sides ❤️",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "🌯 Rainbow Wraps 🌯",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "🔥 Hot Power Bowls 🔥",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "Smoothies, shakes & juice",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "Snacks",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "Platters",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "Desserts",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
  {
    title: "Cold Drinks",
    data: [
      makeFood({
        name: "Herb-Crusted Salmon",
        description:
          "Oven-baked salmon with herbs, served with lemon butter and greens.",
        preparation_time: 18,
        calories: 600,
        ingredients: "Salmon, herbs, butter, lemon, salad",
        foodType: ["Non-Vegetarian"],
        rating: 4.8,
        price: 15.99,
        image_url:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
      makeFood({
        name: "Truffle Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms and a hint of truffle.",
        preparation_time: 20,
        calories: 580,
        ingredients: "Arborio rice, mushrooms, parmesan, truffle oil",
        foodType: ["Vegetarian"],
        rating: 4.9,
        price: 14.49,
        image_url:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
        category_id: "specials",
      }),
    ],
  },
];

export const footerLinks = [
  {
    title: "Discover Deliveroo",
    links: [
      { label: "Investors", href: "/investors" },
      { label: "About us", href: "/about" },
      { label: "Takeaway", href: "/takeaway" },
      { label: "More", href: "/blog" },
      { label: "Newsroom", href: "/blog" },
      { label: "Engineering blog", href: "/blog" },
      { label: "Design blog", href: "/blog" },
      { label: "Gift Cards", href: "/blog" },
      { label: "Deliveroo Students", href: "/blog" },
      { label: "Careers", href: "/blog" },
      { label: "Restaurant signup", href: "/blog" },
      { label: "Become a rider", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms and conditions", href: "/terms-and-conditions" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Modern Slavery Statement", href: "/modern-slavery-statement" },
      { label: "Tax Strategy", href: "/tax-strategy" },
      { label: "Section 172 Statement", href: "/tax-strategy" },
      {
        label: "Public Authority Requests",
        href: "/public-authority-requests",
      },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/support" },
      { label: "FAQs", href: "/faqs" },
      { label: "Cuisines", href: "/cuisines" },
      { label: "Brands", href: "/brands" },
    ],
  },
];

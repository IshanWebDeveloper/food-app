export const queryKeys = {
  userProfile: ["userProfile"],
  allCategories: ["allCategories"],
  allDishes: ["allDishes"],
  dishById: (id: string) => ["dishById", id],
  allDishesByCategories: ["allDishesByCategories"],
  dishesByCategory: (categoryId: string) => ["dishesByCategory", categoryId],
};

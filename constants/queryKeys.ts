export const queryKeys = {
  userProfile: ["userProfile"],
  allCategories: ["allCategories"],
  allFoods: ["allFoods"],
  foodById: (id: string) => ["foodById", id],
  userFavoriteFoods: ["userFavoriteFoods"],
  isFoodFavorite: (foodId: string) => ["isFoodFavorite", foodId],
};

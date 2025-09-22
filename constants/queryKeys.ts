export const queryKeys = {
  userProfile: ["userProfile"],
  allCategories: ["allCategories"],
  allDishes: ["allDishes"],
  dishById: (id: string) => ["dishById", id],
  allDishesByCategories: ["allDishesByCategories"],
  dishesByCategory: (categoryId: string) => ["dishesByCategory", categoryId],
  // Reports / Analytics
  topSellingDishes: (params: {
    status: string;
    metric: string;
    startDate: string;
    endDate: string;
    limit?: number;
  }) => [
    "topSellingDishes",
    params.status,
    params.metric,
    params.startDate,
    params.endDate,
    params.limit ?? "no-limit",
  ],
};

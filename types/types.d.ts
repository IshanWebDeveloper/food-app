import {
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  delivery_address?: string;
  phone_number?: string;
}

declare enum Category {
  All = "All",
  Combos = "Combos",
  Sliders = "Sliders",
  Classics = "Classics",
}

declare type foodTags = "Vegan" | "Vegetarian" | "Non-Vegetarian";

declare interface Restaurant {
  name: string;
  address: string;
  deliveryTime: string;
  tags: foodTags[];
  distance: string;
  closingTime: string;
  minimumOrder: string;
  deliveryFee: string;
  rating: {
    score: number;
    text: string;
    reviewCount: number;
  };
  deliveryInfo: {
    time: string;
    changeOption: boolean;
  };
  groupOrderOption: boolean;
}
declare interface FoodItem {
  id: string;
  name: string;
  description: string;
  preparation_time: number;
  rating_description: "Highly Rated" | "Popular" | "Recommended" | "New";
  calories: number;
  ingredients: string;
  foodType: foodTags[];
  rating: number;
  price: number;
  image_url: string;
  category_id: string;
}

declare interface OrderItem {
  food: FoodItem;
  quantity: number;
  taxes: number;
  delivery_fee: number;
  total_price: number;
}

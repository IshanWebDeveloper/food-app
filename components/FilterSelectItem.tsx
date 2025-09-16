import { Text, TouchableOpacity } from "react-native";

interface FilterSelectItemProps {
  filter: {
    name: string;
    selected: boolean;
  };
  handleFilterSelect: (filterName: string) => void;
}

const FilterSelectItem = ({
  filter,
  handleFilterSelect,
}: FilterSelectItemProps) => {
  return (
    <TouchableOpacity
      onPress={handleFilterSelect.bind(null, filter.name)}
      className={`p-2 w-[75px] h-[50px]  rounded-[20px] shadow-md ${
        filter.selected ? "bg-[#EF2A39]" : "bg-[#F0F0F0]"
      } items-center justify-center m-2`}
    >
      <Text className={`${filter.selected ? "text-white" : "text-[#6A6A6A]"}`}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterSelectItem;

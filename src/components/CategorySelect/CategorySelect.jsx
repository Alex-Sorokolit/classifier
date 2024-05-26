import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
// import { StyledSelect } from "./CategorySelect.styled";
import { makeOptions } from "../../services";
import { searchMaterialByDescription } from "../../services";
import { toast } from "react-toastify";
import CustomOption from "../CustomOption/CustomOption";
const CategorySelect = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const loadOptions = async (inputValue) => {
    const normalizedQuery = inputValue.toLowerCase().trim();

    if (normalizedQuery.length < 1) {
      toast.error("Введіть запит в поле пошуку");
      return [];
    }

    try {
      // Виконати запит до сервера для отримання даних на основі введеного тексту
      const response = await searchMaterialByDescription(normalizedQuery);
      console.log("response: ", response.data);

      // відфільтрувати тільки категорії
      const category = response.data.filter((item) => item.Unit === "category");
      console.log("category: ", category);

      return makeOptions(category);
    } catch (error) {
      toast.error(`Не вдалось знайти ${normalizedQuery}`);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Викликати функцію з пропсів для передачі вибраного значення
    console.log("selectedOption: ", selectedOption);
    onSelect(selectedOption);
  };

  const handleInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setSelectedOption(null);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      value={selectedOption}
      onInputChange={handleInputChange}
      components={{ Option: CustomOption }} // Передача кастомного компонента для опцій
    />
  );
};

export default CategorySelect;

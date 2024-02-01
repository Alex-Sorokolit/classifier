import React, { useState } from "react";
import { FormStyled, Input } from "./Search.styled";
import { SearchButton, BackButton } from "../Button/Button";

import { IoSearch } from "react-icons/io5";
import { IoMdBackspace } from "react-icons/io";
import { toast } from "react-toastify";
import ShowError from "../../components/ShowError/ShowError";

const Search = ({ submit, isLoading, error, back }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    const normalizedQuery = event.currentTarget.value.toLowerCase();
    setSearchValue(normalizedQuery);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchValue.trim().length < 1) {
      toast.error("Введіть запит в поле пошуку");
      return;
    } else submit(searchValue.trim());
  };

  const clearQuery = () => {
    setSearchValue("");
    back();
  };

  return (
    <>
      <FormStyled onSubmit={handleSubmit}>
        <BackButton
          icon={IoMdBackspace}
          type="button"
          onClick={clearQuery}
        ></BackButton>
        <label>
          <Input
            name="search"
            type="text"
            onChange={handleChange}
            value={searchValue}
          ></Input>
        </label>
        <SearchButton
          icon={IoSearch}
          type="submit"
          onClick={handleSubmit}
        ></SearchButton>
      </FormStyled>
      {isLoading && <p>Loading...</p>}
      {error !== null && <ShowError>{error}</ShowError>}
    </>
  );
};

export default Search;

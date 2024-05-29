import React, { useState } from "react";
import MaterialTable from "../../components/MaterialTable/MaterialTable";
import Section from "../../components/Section/Section";
import Search from "../../components/Search/Search";
import {
  searchMaterialByDescription,
  searchMaterialByCode,
} from "../../services/api";
import { checkIsString, parseNumber } from "../../services";
import { MainTableWrapper, SearchWrapper } from "./MaterialPage.styled";
import { toast } from "react-toastify";
import SearchResults from "../../components/SearchResults/SearchResults";
import UnitSelect from "../../components/UnitSelect/UnitSelect";

const MaterialPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Виклика8ється під час відправлення форми

  const backToTable = () => {
    setSearchResult([]);
  };

  // Пошук елементів
  const submit = (searchValue) => {
    // console.log("searchValue: ", searchValue);

    const isString = checkIsString(searchValue);
    const codeNumber = parseNumber(searchValue);

    if (isString) {
      setQuery(searchValue);

      // console.log(`search ${searchValue} by description`);
      async function search(searchValue) {
        setIsLoading(true);
        setSearchResult([]);
        try {
          const response = await searchMaterialByDescription(searchValue);
          if (response) {
            // console.log(response.data);
            setSearchResult(response.data);
          }
        } catch {
          toast.error(`Не вдалось знайти ${searchValue}`, { autoClose: 3000 });
        } finally {
          setIsLoading(false);
        }
      }
      search(searchValue);
    } else {
      async function search(codeNumber) {
        // console.log(`search ${codeNumber} by code`);
        setIsLoading(true);
        setSearchResult([]);
        try {
          const response = await searchMaterialByCode(codeNumber);
          // console.log(response.data);
          if (response) {
            setSearchResult(response.data);
          }
        } catch {
          toast.error(`Не вдалось знайти ${searchValue}`, { autoClose: 3000 });
        } finally {
          setIsLoading(false);
        }
      }
      search(codeNumber);
    }
  };

  return (
    <>
      <Section>
        <SearchWrapper>
          <Search
            submit={submit}
            isLoading={isLoading}
            back={backToTable}
            isSubmiting={isLoading}
          />
          {searchResult.length > 0 && <UnitSelect />}
        </SearchWrapper>
      </Section>
      <Section>
        <MainTableWrapper>
          {searchResult.length > 0 ? (
            <SearchResults
              results={searchResult}
              query={query}
              variant="material"
            />
          ) : (
            <MaterialTable />
          )}
        </MainTableWrapper>
      </Section>
    </>
  );
};

export default MaterialPage;

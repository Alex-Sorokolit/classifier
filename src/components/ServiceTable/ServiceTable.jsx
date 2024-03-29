import React, { useEffect, useState } from "react";
import ServiceList from "../ServiceList/ServiceList";
import { getServiceByParentCode } from "../../services/api";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { ListWrapper } from "./ServiceTable.styled";

const ServiceTable = () => {
  const [mainCategory, setMainCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Запит по всі головні категорії при монтуванні компонента
  useEffect(() => {
    const controller = new AbortController();
    async function getCategory() {
      try {
        setIsLoading(true);
        const response = await getServiceByParentCode(
          "46000000-2",
          controller.signal
        );
        setMainCategory(response.data);
      } catch {
        toast.error("Щось пішло не так, спробуйте перезавантажити сторінку");
      } finally {
        setIsLoading(false);
      }
    }
    getCategory();
    return () => {
      setMainCategory([]);
      controller.abort();
    };
  }, [setMainCategory]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ListWrapper>
          {" "}
          <ServiceList items={mainCategory} style={{ padding: 0 }} />
        </ListWrapper>
      )}
    </>
  );
};

export default ServiceTable;

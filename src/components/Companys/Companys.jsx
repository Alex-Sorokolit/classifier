import React, { useEffect, useState } from "react";
import { getAllCompanys } from "../../services";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";

const Companys = () => {
  const [companys, setCopanys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Запит по компанії
  useEffect(() => {
    const controller = new AbortController();

    async function allCompanys() {
      try {
        setIsLoading(true);

        const response = await getAllCompanys(controller.signal);
        setCopanys(response.data);
      } catch (error) {
        toast.error("Не вдалось завантажити компанії");
      } finally {
        setIsLoading(false);
      }
    }
    allCompanys();
  }, []);

  return (
    <>
      {isLoading ? (
        <BarLoader color="#125b56" width="100%" />
      ) : (
        <ul>
          {companys.map((company) => (
            <li key={company._id}>{company.companyName}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Companys;

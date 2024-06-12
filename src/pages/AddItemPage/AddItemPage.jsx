import React, { useState, useEffect } from "react";
import Section from "../../components/Section/Section";
import MaterialList from "../../components/MaterialList/MaterialList";
import { IconButton } from "../../components/Button/Button";
import { Layout, Content, Menu } from "./AddItemPage.styled";
import { toast } from "react-toastify";
import { getByUser, getMaterialById } from "../../services";
import { IoMdBackspace } from "react-icons/io";

const AddItemPage = () => {
  const [userMaterials, setUserMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("userMaterials");
  const [material, setMaterial] = useState([]);

  // Запит по матеріали користувача
  useEffect(() => {
    const controller = new AbortController();

    async function userMaterials(selectedId) {
      setIsLoading(true);
      try {
        const response = await getByUser(selectedId, controller.signal);
        setUserMaterials(response.data);
      } catch (error) {
        toast.error("Не вдалось завантажити матеріали");
      } finally {
        setIsLoading(false);
      }
    }

    userMaterials();

    return () => {
      controller.abort();
    };
  }, []);

  // Отримати по id
  const materialById = (id) => {
    setStatus("material");
    const controller = new AbortController();
    async function getMaterial(id) {
      try {
        //  setIsLoading(true);
        const response = await getMaterialById(id, controller.signal);

        setMaterial([response.data]);
      } catch {
        toast.error("Не вдалось отримати матеріал");
      } finally {
        //  setIsLoading(false);
      }
    }
    getMaterial(id);
    return () => {
      controller.abort();
    };
  };

  const backToUserMaterials = () => {
    setStatus("userMaterials");
  };
  return (
    <>
      <Section>
        <Menu>
          {status === "material" && (
            <IconButton
              onClick={backToUserMaterials}
              variant="dark"
              tooltip="Повернутись"
              icon={IoMdBackspace}
              iconSize="40px"
            ></IconButton>
          )}
        </Menu>
        <Layout>
          <Content>
            {!isLoading && (
              <Section>
                {userMaterials.length < 1 && (
                  <p>
                    Тут будуть відображатись ваші матеріали, створіть перший
                    матеріал
                  </p>
                )}

                {status === "userMaterials" && (
                  <MaterialList items={userMaterials} byId={materialById} />
                )}

                {status === "material" && (
                  <MaterialList items={material} byId={materialById} />
                )}
              </Section>
            )}
          </Content>
        </Layout>
      </Section>
    </>
  );
};

export default AddItemPage;

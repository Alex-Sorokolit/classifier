import React, { useState, useContext } from "react";
import { authContext as context } from "../../context/authContext";
import { Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { validationColor } from "../../services/utility";
import { Button, IconButton } from "../Button/Button";
import { CloseButton } from "../Button/Button";
import { CgClose } from "react-icons/cg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PulseLoader } from "react-spinners";

// import CategorySelect from "../CategorySelect/CategorySelect";
import UnitSelect from "../UnitSelect/UnitSelect";
import {
  InputWrapper,
  StyledForm,
  TextArea,
  InputGroup,
  Input,
  DescriptionWrapper,
  ErrorMessageStyled,
  ButtonWrapper,
  CheckBox,
  StyledSelect,
} from "./AddMaterialForm.styled";

const AddMaterialForm = ({ onClose, id, create }) => {
  const [additionalFields, setAdditionalFields] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [reset, setReset] = useState(false);
  const { role } = useContext(context);
  const [isLoading, setIsLoading] = useState(false);

  // const unitTypes = ["category", "m", "m2", "m3", "t", "kg", "pcs."];
  const currencyType = ["UAH", "EUR", "USD"];

  // Початкові значення
  const initialValues = {
    DescriptionUA: "",
    DescriptionEN: "",
    Code: "",
    Price: "",
    Currency: "UAH",
    Unit: "",
    Length: "",
    Width: "",
    Height: "",
    Density: "",
    WeightElement: "",
    Perimeter: "",
    Area: "",
    Volume: "",
    WriteOffCoefficient: "",
    Consumption: "",
    ConsumptionPer1m2: "",
    ConsumptionPer1m3: "",
    ConsumptionPer1m: "",
    ConsumptionPer1t: "",
    OwnerBarcode: "",
    Comment: "",
    Origin: false,
  };

  // Масив для рендеру інпутів
  const inputs = [
    {
      label: "Довжина, мм",
      id: "Length",
    },
    {
      label: "Ширина, мм",
      id: "Width",
    },
    {
      label: "Висота, мм",
      id: "Height",
    },
    {
      label: "Щільність, кг/м3",
      id: "Density",
    },
    {
      label: "Вага, кг",
      id: "WeightElement",
    },
    {
      label: "Периметр, мм",
      id: "Perimeter",
    },
    {
      label: "Площа, м2",
      id: "Area",
    },
    {
      label: "Об'єм, м3",
      id: "Volume",
    },
    {
      label: "Коефіціент витрати",
      id: "WriteOffCoefficient",
    },
    {
      label: "Витрата",
      id: "Consumption",
    },
    {
      label: "Витрата 1/m2",
      id: "ConsumptionPer1m2",
    },
    {
      label: "Витрата 1/m3",
      id: "ConsumptionPer1m3",
    },
    {
      label: "Витрата 1/m",
      id: "ConsumptionPer1m",
    },
    {
      label: "Витрата 1/t",
      id: "ConsumptionPer1t",
    },
    {
      label: "Власний код",
      id: "OwnerBarcode",
    },
  ];

  // Схема валідації
  const addMaterialSchema = yup.object().shape({
    DescriptionUA: yup
      .string()
      .min(3, "Занадто короткий опис")
      .max(500, "Занадто довкий опис")
      .required("Опис обов'язкове поле"),
    DescriptionEN: yup
      .string()
      .min(3, "Занадто короткий опис")
      .max(500, "Занадто довкий опис"),
    Code: yup
      .string()
      .matches(
        /^\d{8}-\d$/,
        "Код повине бути довжиною 8 цифр, дефіс, 1 цифра, наприклад 47000000-6"
      ),
    Price: yup.number().typeError("Введіть число").positive(),
    Currency: yup.string().oneOf(currencyType, "Недопустима валюта"),
    // Unit: yup
    //   .string()
    //   .oneOf(unitTypes, "Недопустимий тип одиниці виміру")
    //   .required("Оберіть одиниці виміру"),
    Length: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним")
      .integer("Число повинне бути цілим"),
    Width: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним")
      .integer("Число повинне бути цілим"),

    Height: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним")
      .integer("Число повинне бути цілим"),
    Density: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    WeightElement: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    Perimeter: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним")
      .integer("Число повинне бути цілим"),
    Area: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    Volume: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    WriteOffCoefficient: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    Consumption: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    ConsumptionPer1m2: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    ConsumptionPer1m3: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    ConsumptionPer1m: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    ConsumptionPer1t: yup
      .number()
      .typeError("Введіть число")
      .positive("Число повинне бути додатним"),
    OwnerBarcode: yup
      .string()
      .min(3, "Занадто короткий опис")
      .max(500, "Занадто довкий опис"),
  });

  // Показує або приховує додаткові параметри
  function toggleAdditionalFields() {
    setAdditionalFields(!additionalFields);
  }

  // Очистка react input
  // const clearSelect = () => {};

  const handleSubmit = async (values, actions) => {
    // formik метод очистки форми
    const { resetForm } = actions;
    setIsLoading(true);
    // фільтрація заповнених полів
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    const additionalElement = {
      ParentElementId: id,
      Unit: selectedUnit,
      ...filteredValues,
    };
    try {
      setIsLoading(true);
      await create(additionalElement);
      resetForm();
      setReset(true);
      onClose();
    } catch (error) {
      console.error("Error creating material:", error);
    } finally {
      setIsLoading(false);
    }
    // await create(additionalElement);
    // setIsLoading(false);
    // // Очистка форми
    // resetForm();
    // setReset(true);
    // onClose();
  };

  // const categorySelect = (data) => {
  //   if (data) {
  //     setSelectedId(data.value._id);
  //   }
  //   return;
  // };

  const onUnitSelect = (data) => {
    if (data) {
      setSelectedUnit(data.value);
    }
    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={addMaterialSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <StyledForm>
            <CloseButton onClick={onClose} icon={CgClose}></CloseButton>

            <DescriptionWrapper>
              <label htmlFor="DescriptionUA">Опис UA</label>
              <TextArea
                // autoFocus={true}
                name="DescriptionUA"
                id="DescriptionUA"
                placeholder="Введіть опис українською мовою"
                type="text"
                bordercolor={validationColor(
                  props.errors.DescriptionUA,
                  props.values.DescriptionUA
                )}
              />
              <ErrorMessage
                name="DescriptionUA"
                render={(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}
              />
            </DescriptionWrapper>
            <DescriptionWrapper>
              <label htmlFor="DescriptionEN">Опис EN</label>
              <TextArea
                name="DescriptionEN"
                id="DescriptionEN"
                placeholder="Введіть опис англійською мовою"
                type="text"
                bordercolor={validationColor(
                  props.errors.DescriptionEN,
                  props.values.DescriptionEN
                )}
              />
              <ErrorMessage
                name="DescriptionEN"
                render={(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}
              />
            </DescriptionWrapper>

            <InputWrapper>
              <label htmlFor="Unit">Одиниці виміру</label>
              <Field
                as={UnitSelect}
                name="Unit"
                onSelect={onUnitSelect}
                variant="add"
                reset={reset}
              ></Field>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="Currency">Валюта</label>
              <Field
                as={StyledSelect}
                name="Currency"
                bordercolor={validationColor(
                  props.errors.Unit,
                  props.values.Unit
                )}
              >
                <option value="" disabled hidden>
                  Оберіть грошову одиницю
                </option>
                <option value="UAH">Гривня</option>
                <option value="EUR">Євро</option>
                <option value="USD">Долар</option>
              </Field>

              <ErrorMessage
                name="Currency"
                render={(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="PriseUAH">Ціна</label>
              <Input
                type="text"
                placeholder="Ціна"
                name="PriceUAH"
                id="PriceUAH"
                bordercolor={validationColor(
                  props.errors.PriceUAH,
                  props.values.PriceUAH
                )}
              />
              <ErrorMessage
                name="PriceUAH"
                render={(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="Url">Посилання</label>
              <Input
                type="text"
                placeholder="Посилання на сайт виробника"
                name="Url"
                id="Url"
                bordercolor={validationColor(
                  props.errors.Url,
                  props.values.Url
                )}
              />
              <ErrorMessage
                name="Url"
                render={(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}
              />
            </InputWrapper>
            <ButtonWrapper>
              <IconButton
                type="button"
                visibility="visible"
                variant="dark"
                tooltip={"Додаткові властивості"}
                iconSize="40px"
                icon={
                  additionalFields ? MdKeyboardArrowUp : MdKeyboardArrowDown
                }
                onClick={() => toggleAdditionalFields()}
              ></IconButton>
            </ButtonWrapper>
            {additionalFields && (
              <>
                {role === "admin" && (
                  <InputWrapper>
                    <label htmlFor="Code">Код</label>
                    <Input
                      type="text"
                      placeholder="Код"
                      name="Code"
                      id="Code"
                      bordercolor={validationColor(
                        props.errors.Code,
                        props.values.Code
                      )}
                    />
                    <ErrorMessage
                      name="Code"
                      render={(msg) => (
                        <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                      )}
                    />
                  </InputWrapper>
                )}

                <InputGroup>
                  {inputs.map(({ id, label }) => (
                    <InputWrapper key={id}>
                      <label htmlFor={id}>{label}</label>
                      <Input
                        type="text"
                        placeholder={label}
                        name={id}
                        id={id}
                        bordercolor={validationColor(
                          props.errors[id],
                          props.values[id]
                        )}
                      />
                      <ErrorMessage
                        name={id}
                        render={(msg) => (
                          <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                        )}
                      />
                    </InputWrapper>
                  ))}
                </InputGroup>
                <DescriptionWrapper>
                  <label htmlFor="Comment">Коментар</label>
                  <TextArea
                    name="Comment"
                    id="Comment"
                    placeholder="Введіть коментар"
                    type="text"
                    bordercolor={validationColor(
                      props.errors.Comment,
                      props.values.Comment
                    )}
                  />
                  <ErrorMessage
                    name="Comment"
                    render={(msg) => (
                      <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                    )}
                  />
                </DescriptionWrapper>
                {role === "admin" && (
                  <div>
                    <label htmlFor="Origin">cpv</label>
                    <CheckBox
                      type="checkbox"
                      name="Origin"
                      id="Origin"
                    ></CheckBox>
                  </div>
                )}
              </>
            )}

            <ButtonWrapper>
              <Button
                type="submit"
                disabled={Object.keys(props.errors).length > 0}
                isLoading={true}
              >
                Створити
                {isLoading && <PulseLoader color="#ffffff" size={5} />}
              </Button>
            </ButtonWrapper>
          </StyledForm>
        )}
      </Formik>
      {/* {isLoading && <BarLoader color="#125b56" width="100%" />} */}
    </>
  );
};

export default AddMaterialForm;

import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { validationColor } from "../../services/utility";
import { Button } from "../Button/Button";
import { PulseLoader } from "react-spinners";
import InputDatePicker from "../DatePicker/InputDatePicker";

import {
  StyledForm,
  FormTitle,
  InputWrapper,
  MessageVrapper,
  Input,
  TextArea,
  ErrorMessageStyled,
  ButtonWrapper,
} from "../CommonFormStyles/CommonFormStyles.styled";

const AddCompanyForm = ({ onClose, create }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Початкові значення
  const initialValues = {
    companyName: "",
    edrpo: "",
    licenseCount: "",
    licenseStartTime: null,
    licenseEndTime: null,
  };
  // Схема валідації
  const addCompanySchema = yup.object().shape({
    companyName: yup
      .string()
      .min(3, "Повинно бути мінімум 3 символи")
      .max(500, "Допустимо не більше 500 символів")
      .required("Назва компанії обов'язкове поле"),
    edrpo: yup
      .string()
      .matches(
        /^\d{8}$/,
        "Код повинен складатися з 8 цифр наприклад: 12345678"
      ),
    licenseCount: yup
      .number()
      .typeError("Введіть число")
      .positive("Введіть число більше 0"),
    licenseStartTime: yup
      .date()
      .typeError("Оберіть дату")
      .required("Дата початку є обов’язковою"),

    licenseEndTime: yup
      .date()
      .typeError("Оберіть дату")
      .required("Дата завершення є обов’язковою"),
  });

  const handleSubmit = async (values, actions) => {
    // console.log("values: ", values);
    // console.log("actions: ", actions);
    const { resetForm } = actions;
    try {
      setIsLoading(true);
      await create({ ...values });
      resetForm();
      onClose();
    } catch (error) {
      console.log("Не вдалось створити компанію");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FormTitle>Створення нової компанії</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={addCompanySchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <StyledForm>
            <InputWrapper>
              <MessageVrapper>
                <label htmlFor="companyName">Назва компанії</label>
                <ErrorMessage
                  name="companyName"
                  render={(msg) => (
                    <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                  )}
                />
              </MessageVrapper>

              <TextArea
                name="companyName"
                id="companyName"
                placeholder="Введіть назву компанії"
                type="text"
                bordercolor={validationColor(
                  props.errors.companyName,
                  props.values.companyName
                )}
              />
            </InputWrapper>
            <InputWrapper>
              <MessageVrapper>
                <label htmlFor="edrpo">Код ЄДРПОУ</label>
                <ErrorMessage
                  name="edrpo"
                  render={(msg) => (
                    <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                  )}
                />
              </MessageVrapper>

              <Input
                name="edrpo"
                id="edrpo"
                placeholder="Введіть код ЄДРПОУ"
                type="text"
                bordercolor={validationColor(
                  props.errors.edrpo,
                  props.values.edrpo
                )}
              />
            </InputWrapper>
            <InputWrapper>
              <MessageVrapper>
                <label htmlFor="licenseCount">Кількість ліцензій</label>
                <ErrorMessage
                  name="licenseCount"
                  render={(msg) => (
                    <ErrorMessageStyled>{msg}</ErrorMessageStyled>
                  )}
                />
              </MessageVrapper>

              <Input
                name="licenseCount"
                id="licenseCount"
                placeholder="Введіть кількість ліцензій для компанії"
                type="text"
                bordercolor={validationColor(
                  props.errors.licenseCount,
                  props.values.licenseCount
                )}
              />
            </InputWrapper>
            <InputWrapper>
              <MessageVrapper>
                <label htmlFor="licenseStartTime">
                  Дата початку дії ліцензій
                </label>
              </MessageVrapper>
              <InputDatePicker name="licenseStartTime" id="licenseStartTime" />
            </InputWrapper>

            <InputWrapper>
              <MessageVrapper>
                <label htmlFor="licenseEndTime">
                  Дата завершення дії ліцензій
                </label>
              </MessageVrapper>
              <InputDatePicker name="licenseEndTime" id="licenseEndTime" />
            </InputWrapper>
            <div style={{ fontSize: "12px", color: "#666" }}>
              <strong>Підказка:</strong> Коли активний календар, Ви можете:
              <ul style={{ margin: 0, paddingLeft: "18px" }}>
                <li>← → — переміщення по днях</li>
                <li>↑ ↓ — переміщення по тижнях</li>
                <li>PageUp / PageDown — по місяцях</li>
                <li>Shift+PageUp / Shift+PageDown — по роках</li>
                <li>Enter — вибрати дату</li>
                {/* <li>Esc — закрити календар</li> */}
              </ul>
            </div>
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
    </div>
  );
};

export default AddCompanyForm;

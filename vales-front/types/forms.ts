import * as yup from "yup";

export const imageSchema = yup
  .mixed<FileList>()
  .test({
    name: "fileSize",
    message: "La imagen no debe superar los 2MB",
    test: (value) => {
      if (!value) return true;
      if (value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    },
  })
  .test({
    name: "fileType",
    message: "El archivo debe ser una imagen",
    test: (value) => {
      if (!value) return true;
      if (value.length === 0) return true;
      return value[0].type.startsWith("image/");
    },
  });

export const requiredImageSchema = imageSchema.test({
  name: "required",
  message: "La imagen es obligatoria",
  test: (value) => {
    return value instanceof FileList && value.length > 0;
  },
});

export const singleImageSchema = imageSchema.test({
  name: "single",
  message: "Debe seleccionar solo una imagen",
  test: (value) => {
    return value instanceof FileList && value.length === 1;
  },
});

export const documentSchema = yup.mixed<FileList>().test({
  name: "fileSize",
  message: "El documento no debe superar los 10MB",
  test: (value) => {
    if (!value) return true;
    if (value.length === 0) return true;
    return value[0].size <= 10 * 1024 * 1024;
  },
});

export const requiredDocumentSchema = documentSchema.test({
  name: "required",
  message: "El documento es obligatorio",
  test: (value) => {
    return value instanceof FileList && value.length > 0;
  },
});

export const singleDocumentSchema = documentSchema
  .test({
    name: "single",
    message: "Debe seleccionar solo un documento",
    test: (value) => {
      return value instanceof FileList && value.length === 1;
    },
  })
  .transform((value) => value[0]);

export const optionSchema = yup
  .object()
  .shape({
    value: yup.string().required(),
    label: yup.string().required(),
  })
  .transform((value) => (value === "" ? undefined : value));

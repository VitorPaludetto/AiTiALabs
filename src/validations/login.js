import * as Yup from "yup";

export const LoginSchema = Yup.object({
  Email: Yup.string().required("Este campo é obrigatório"),
  Senha: Yup.string().required("Este campo é obrigatório"),
});

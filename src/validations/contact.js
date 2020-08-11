import * as Yup from "yup";

export const ContactSchema = Yup.object({
  Nome: Yup.string().required("Este campo é obrigatório"),
  Email: Yup.string()
    .email("Digite um email válido")
    .required("Este campo é obrigatório"),
  Telefone: Yup.string().required("Este campo é obrigatório"),
  Estado: Yup.string().required("Este campo é obrigatório"),
  Cidade: Yup.string().required("Este campo é obrigatório"),
  Assunto: Yup.string().required("Este campo é obrigatório"),
  Mensagem: Yup.string().required("Este campo é obrigatório"),
});

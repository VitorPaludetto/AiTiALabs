import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  Nome: Yup.string().required("Este campo é obrigatório"),
  Sobrenome: Yup.string().required("Este campo é obrigatório"),
  CPF: Yup.string().required("Este campo é obrigatório"),
  Email: Yup.string().required("Este campo é obrigatório"),
  Telefone: Yup.string().required("Este campo é obrigatório"),
  NomeEmpresa: Yup.string().required("Este campo é obrigatório"),
  CNPJ: Yup.string().required("Este campo é obrigatório"),
  CEP: Yup.string().required("Este campo é obrigatório"),
  Endereco: Yup.string().required("Este campo é obrigatório"),
  Numero: Yup.string().required("Este campo é obrigatório"),
  Complemento: Yup.string(),
  Estado: Yup.string().required("Este campo é obrigatório"),
  Cidade: Yup.string().required("Este campo é obrigatório"),
  Senha: Yup.string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .matches(/^(?=.*[a-z])/, "Insira ao menos uma letra minúscula")
    .matches(/^(?=.*[A-Z])/, "Insira ao menos uma letra maiúscula")
    .required("Este campo é obrigatório"),
  ConfirmarSenha: Yup.string()
    .oneOf(
      [Yup.ref("Senha"), null],
      "Os campos Senha e Confirmar Senha devem ser iguais"
    )
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .matches(/^(?=.*[a-z])/, "Insira ao menos uma letra minúscula")
    .matches(/^(?=.*[A-Z])/, "Insira ao menos uma letra maiúscula")
    .required("Este campo é obrigatório"),
});

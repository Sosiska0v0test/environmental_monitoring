import * as yup from "yup";

const productValidation = yup.object().shape({
  name: yup
    .string()
    .required("Введіть найменування забруднюючої речовини")
    .max(100, "Назва забруднюючої речовини має містити менше 100 символів"),
  language: yup.string().required("Введіть середню фактичну концентрація"),
  year: yup.string().required("Введіть дозволену для скиду концентрацію"),
  tax: yup.string().required("Введіть масу наднормативного скиду"),
  waste: yup.string().required("Введіть фактичні витрати зворотних вод"),
  concentration: yup.string().required("Введіть обсяг викидів забруднюючо ї речовини (т / рік)"),
  normative: yup.string().required("Введіть нормативний викид речовини (т / рік)"),
  duration: yup.string().required("Введіть тривалість"),
  gas_dust_flow_rate: yup.string().required("Введіть значення об'ємної витрати газопилового потоку"),
  category: yup.string().required("Виберіть об'єкт"),
});

export { productValidation };

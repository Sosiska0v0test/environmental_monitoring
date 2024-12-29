import React, { useEffect, useState } from "react";
import { Input, Select } from "../../../Components/UsedInputs";
import SideBar from "../SideBar";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidation } from "../../../Components/Validation/ProductValidation";
import {
  getProductByIdAction,
  updateProductAction,
} from "../../../Redux/Actions/ProductsActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notification/Loader";
import { InlineError } from "../../../Components/Notification/Error";

function EditProduct() {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // use Selectors
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, product } = useSelector(
    (state) => state.getProductById
  );
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateProduct);

  // validate product
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      updateProductAction(product?._id, {
        ...data,
      })
    );
  };


  useEffect(() => {
    if (product?._id !== id) {
      dispatch(getProductByIdAction(id));
    } else {
      setValue("name", product?.name);
      setValue("language", product?.language);
      setValue("year", product?.year);
      setValue("tax", product?.tax);
      setValue("waste", product?.waste);
      setValue("concentration", product?.concentration);
      setValue("normative", product?.normative);
      setValue("duration", product?.duration);
      setValue("gas_dust_flow_rate", product?.gas_dust_flow_rate);
      setValue("category", product?.category);
    }
    // if its success then reset form and navigate to editproduct
    if (isSuccess) {
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
      navigate(`/edit/${id}`);
    }
    // if error then show error
    if (editError) {
      toast.error("Щось пішло не так😯");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [
    dispatch,
    id,
    product,
    modalOpen,
    setValue,
    isSuccess,
    editError,
    navigate,
  ]);

  return (
    <SideBar>
      { isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={ sameClass }>
          <p className="text-border text-sm">Щось пішло не так😯</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Редагувати "{ product?.name }"</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full ">
              <Input
                label="Найменування забруднюючої речовини"
                placeholder="Азот амонійний"
                type="text"
                bg={ true }
                name="name"
                register={ register("name") }
              />
              { errors.name && <InlineError text={ errors.name.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Маса наднормативного скиду M_i(т)"
                placeholder="0"
                type="number"
                bg={ true }
                name="tax"
                register={ register("tax") }
              />
              { errors.tax && <InlineError text={ errors.tax.message } /> }
            </div>
          </div>
          <div className='w-full grid md:grid-cols-2 gap-6'>
            <div className="w-full">
              <Input
                label="Середня фактична концентрація C_iф(г/м^3)"
                placeholder="0.3"
                type="number"
                bg={ true }
                name="language"
                register={ register("language") }
              />
              { errors.language && <InlineError text={ errors.language.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Дозволена для скиду концентрація C_iд(г/м^3)"
                placeholder="20000"
                type="number"
                bg={ true }
                name="year"
                register={ register("year") }
              />
              { errors.year && <InlineError text={ errors.year.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Фактичні витрати зворотних вод Q_iф(м^3/год)"
                placeholder="5760"
                type="number"
                bg={ true }
                name="waste"
                register={ register("waste") }
              />
              { errors.waste && <InlineError text={ errors.waste.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Тривалість (год)"
                placeholder="60"
                type="number"
                bg={ true }
                name="duration"
                register={ register("duration") }
              />
              { errors.duration && <InlineError text={ errors.duration.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Середня масова концентрація p_ВІ(мг/м^3) (Київводоканал)"
                placeholder="0,88"
                type="number"
                bg={ true }
                name="concentration"
                register={ register("concentration") }
              />
              { errors.concentration && <InlineError text={ errors.concentration.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Нормативний викид речовини p_Внорм(мг/м^3) (Київводоканал) "
                placeholder="0,86"
                type="number"
                bg={ true }
                name="normative"
                register={ register("normative") }
              />
              { errors.normative && <InlineError text={ errors.normative.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Значення об'ємної витрати газопилового потоку q_v0 (м^3/с) (Київводоканал)"
                placeholder="0,564"
                type="number"
                bg={ true }
                name="gas_dust_flow_rate"
                register={ register("gas_dust_flow_rate") }
              />
              { errors.gas_dust_flow_rate && <InlineError text={ errors.gas_dust_flow_rate.message } /> }
            </div>
          </div>
          {/* CATEGORY */ }
          <div className="text-sm w-full">
            <Select
              label="Об'єкт"
              options={ categories?.length > 0 ? categories : [] }
              name="category"
              register={ { ...register("category") } }
            />
            { errors.category && <InlineError text={ errors.category.message } /> }
          </div>
          {/* SUBMIT */ }
          <button
            disabled={ editLoading }
            onClick={ handleSubmit(onSubmit) }
            className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
          >
            { editLoading ? (
              "Updating..."
            ) : (
              <>
                <ImUpload /> Оновити таблицю
              </>
            ) }
          </button>
        </div>
      ) }
    </SideBar>
  );
}

export default EditProduct;

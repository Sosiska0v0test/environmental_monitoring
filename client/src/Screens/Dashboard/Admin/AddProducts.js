import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { Input, Select } from '../../../Components/UsedInputs';
import { ImUpload } from 'react-icons/im';
import { createProductAction } from '../../../Redux/Actions/ProductsActions';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidation } from "../../../Components/Validation/ProductValidation";
import { InlineError } from "./../../../Components/Notification/Error";

function AddProducts() {
	const [modalOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// use Selectors
	const { categories } = useSelector((state) => state.categoryGetAll);
	const { isLoading, isError, isSuccess } = useSelector(
		(state) => state.createProduct
	);

	// validate products
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(productValidation),
	});

	// on submit
	const onSubmit = (data) => {
		dispatch(
			createProductAction({
				...data,
			})
		);
	};

	useEffect(() => {

		if (isSuccess) {
			reset({
				name: "",
				language: 0,
				year: 0,
				tax: 0,
				waste: 0,
				concentration: 0,
				normative: 0,
				duration: 0,
				gas_dust_flow_rate: 0,
				category: "",
			});
			dispatch({ type: "CREATE_PRODUCT_RESET" });
			navigate("/addProduct");
		}
		// if error then show error
		if (isError) {
			toast.error("Щось пішло не так");
			dispatch({ type: "CREATE_PRODUCT_RESET" });
		}
	}, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

	return (
		<SideBar>
			<div className='flex  flex-col gap-6'>
				<h2 className='text-xl text-white font-bold'>Додати таблицю</h2>
				<div className='w-full  grid md:grid-cols-2 gap-6'>
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
					disabled={ isLoading }
					onClick={ handleSubmit(onSubmit) }
					className="bg-subMain w-full flex-rows gap-6 font-medium text-main py-4 rounded"
				>
					{ isLoading ? (
						"Зачекайте, йде завантаження..."
					) : (
						<>
							<ImUpload /> Опублікувати
						</>
					) }
				</button>
			</div>
		</SideBar>
	);
}

export default AddProducts;

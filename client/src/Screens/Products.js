import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Components/Filters';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import Loader from '../Components/Notification/Loader';
import { getAllProductsAction } from '../Redux/Actions/ProductsActions';
import Table from '../Components/Table';
import {
  LanguageData,
  YearData,
} from '../Data/FilterData';
import { useParams } from 'react-router-dom';
import CalculateModal from '../Components/Modals/CalculateModal'; // Import the new modal component


function ProductsPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "Усі об'єкти" });
  const [year, setYear] = useState(YearData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass =
    'text-mainText py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain';
  const { isLoading, isError, products, pages, page } = useSelector(
    (state) => state.getAllProducts
  );
  const { categories } = useSelector((state) => state.categoryGetAll);


  const handleCalculate = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const queries = useMemo(() => {
    const query = {
      category: category?.title === "Усі об'єкти" ? '' : category?.title,
      language: language?.title === 'Клас небезпеки' ? '' : language?.title,
      year: year?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    return query;
  }, [category, language, year, search]);

  useEffect(() => {
    const query = {
      category: category?.title === "Усі об'єкти" ? '' : category?.title,
      language: language?.title === 'Клас небезпеки' ? '' : language?.title,
      year: year?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    dispatch(getAllProductsAction(query));
  }, [dispatch, category, language, year, search]);

  const nextPage = () => {
    dispatch(
      getAllProductsAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllProductsAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    year: year,
    setYear: setYear,
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);


  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={ datas } />
        <p className="text-lg font-medium my-6">
          Всього{ ' ' }
          <span className="font-bold text-subMain">
            { products ? products?.length : 0 }
          </span>{ ' ' }
          таблиць знайдено { search && `за запитом "${search}"` }
        </p>
        { isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : products?.length > 0 ? (
          <>
            {/* Відображаємо таблицю замість сітки з картками продуктів */ }
            <Table data={ products } admin={ false } handleCalculate={ handleCalculate } />
            <CalculateModal
              modalOpen={ modalOpen }
              setModalOpen={ setModalOpen }
              product={ selectedProduct }
            />
            <div className="w-full flex-rows gap-6 md:my-20 my-10 ">
              <button
                onClick={ prevPage }
                disabled={ page === 1 }
                className={ sameClass }
              >
                <TbPlayerTrackPrev className="text-xl hover:text-main" />
              </button>
              <button
                onClick={ nextPage }
                disabled={ page === pages }
                className={ sameClass }
              >
                <TbPlayerTrackNext className="text-xl hover:text-main" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <p className="text-mainText text-sm">
              Оберіть об'єкт
            </p>
          </div>
        ) }
      </div>
    </Layout>
  );
}

export default ProductsPage;

import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Head = 'text-xs text-left text-dry font-semibold px-5 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

//rows
const Rows = (product, i, onDeleteHandler, admin, handleCalculate) => {
  return (
    <tr key={ i }>
      <td className={ `${Text} truncate` }>{ product.name }</td>
      <td className={ `${Text}` }>{ product.category }</td>
      <td className={ `${Text}` }>{ product.language }</td>
      <td className={ `${Text}` }>{ product.year }</td>
      <td className={ `${Text}` }>{ product.tax }</td>
      <td className={ `${Text}` }>{ product.waste }</td>
      <td className={ `${Text}` }>{ product.concentration }</td>
      <td className={ `${Text}` }>{ product.duration }</td>
      <td className={ `${Text}` }>{ product.gas_dust_flow_rate }</td>
      <td className={ `${Text}` }>{ product.normative }</td>
      <td className={ `${Text} float-right flex-rows gap-2` }>
        { admin && (
          <>
            <Link
              to={ `/edit/${product?._id}` }
              className="border border-border bg-dry flex-rows gap-2 text-white rounded py-1 px-2"
            >
              Редагувати <FaEdit className="text-orange-400" />
            </Link>
            <button
              onClick={ () => onDeleteHandler(product?._id) }
              className="bg-delete text-white rounded flex-colo w-7 h-7"
            >
              <MdDelete />
            </button>
          </>
        ) }
        {/* Add the "Розрахувати" button */ }
        <button
          onClick={ () => handleCalculate(product) }
          className="border border-border bg-dry flex-rows gap-2 text-white rounded py-1 px-2"
        >
          Розрахувати
        </button>
      </td>
    </tr>
  );
};

//table
function Table({ data, admin, onDeleteHandler, progress, handleCalculate }) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
            <th scope='col' className={ `${Head}` }>
              Найменування забруднюючих речовин
            </th>
            <th scope='col' className={ `${Head}` }>
              Об'єкт
            </th>
            <th scope='col' className={ `${Head}` }>
              Середня фактична концентрація
            </th>
            <th scope='col' className={ `${Head}` }>
              Дозволена для скиду концентрація
            </th>
            <th scope='col' className={ `${Head}` }>
              Маса наднормативного скиду
            </th>
            <th scope='col' className={ `${Head}` }>
              Фактичні витрати зворотних вод
            </th>
            <th scope='col' className={ `${Head}` }>
              Середня масова концентрація
            </th>
            <th scope='col' className={ `${Head}` }>
              Тривалість
            </th>
            <th scope='col' className={ `${Head}` }>
              Значення об'ємної витрати газопилового потоку
            </th>
            <th scope='col' className={ `${Head}` }>
              Нормативний викид речовини
            </th>
            <th scope='col' className={ `${Head} text-end` }>
              Дія
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          { data.map((product, i) =>
            Rows(product, i, onDeleteHandler, admin, handleCalculate)
          ) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;

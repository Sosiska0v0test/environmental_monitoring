import React, { useState } from 'react';
import MainModal from './MainModal';

function CalculateModal({ modalOpen, setModalOpen, product }) {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'mass', 'compensation'
  const [resultMass, setResultMass] = useState(null);
  const [resultAirPollution, setResultAirPollution] = useState(null);
  const [formData, setFormData] = useState({
    Kcat: '', // Коефіцієнт категорії водного об'єкта
    Kp: '', // Регіональний коефіцієнт
    k3: '', // Коефіцієнт врахування водної екосистеми
    Mi: '', // Маса наднормативного скиду
    y: '', // Штучний економічний збиток
  });
  const [resultCompensation, setResultCompensation] = useState(null);
  const [formData1, setFormData1] = useState({
    mi: '', // Маса наднормативного викиду (т)
    salary: '', // Розмір мінімальної заробітної плати (грн/т)
    gdk: '', // ГДКі (середньодобова гранично допустима концентрація)
    pbi: '', // Середньорічна концентрація забруднюючої речовини
    gdk_sdi: '', // Середньодобова гранично допустима концентрація для Кзi
    knas: '', // Коефіцієнт Kнас
    kf: '', // Коефіцієнт Kф
  });
  const [resultCompensationAir, setResultCompensationAir] = useState(null);

  // Обробка зміни в полях введення
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Обробка зміни в полях введення
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Розрахунок маси наднормативного скиду забруднюючої речовини
  const handleMassCalculation = () => {
    if (!product) return;
    const {
      language: Cif, // Середня фактична концентрація (C_іф)
      year: Cid, // Дозволена для скиду концентрація (C_ід)
      waste: Qif, // Фактичні витрати зворотних вод (Q_іф)
      duration: t, // Тривалість (t)
    } = product;
    const Mi = (Cif - Cid) * Qif * t * Math.pow(10, -6);
    setResultMass(Mi.toFixed(6));
    setCurrentView('mass');
  };

  // Розрахунок розміру відшкодування збитків
  const handleCompensationCalculation = () => {
    const { Kcat, Kp, k3, Mi, y } = formData;
    if (Kcat && Kp && k3 && Mi && y) {
      const Z = parseFloat(Kcat) * parseFloat(Kp) * parseFloat(k3) * parseFloat(Mi) * parseFloat(y);
      setResultCompensation(Z.toFixed(2)); // Округлення до 2 знаків після коми
    } else {
      setResultCompensation('Будь ласка, заповніть усі поля!');
    }
  };

  // Розрахунок маси наднормативних викидів забруднюючих речовин в атмосферне повітря
  const handleAirPollutionCalculation = () => {
    if (!product) return;
    const {
      concentration: pBi, // Середня масова концентрація p_ВІ
      normative: pNorm, // Нормативний викид p_Внорм
      gas_dust_flow_rate: qv0, // Об'ємна витрата q_v0
      duration: T, // Час роботи T
    } = product;

    if (pBi && pNorm && qv0 && T) {
      const mi = 3.6 * Math.pow(10, -6) * (pBi - pNorm) * qv0 * T; // Формула
      setResultAirPollution(mi.toFixed(6)); // Округлення до 6 знаків після коми
    } else {
      setResultAirPollution('Будь ласка, перевірте, чи всі дані введені коректно.');
    }
  };

  // Розрахунок розміру відшкодування збитків
  const handleCompensationAirCalculation = () => {
    const { mi, salary, gdk, pbi, gdk_sdi, knas, kf } = formData1;

    if (mi && salary && gdk && pbi && gdk_sdi && knas && kf) {
      // Перетворення даних на числа
      const miValue = parseFloat(mi);
      const salaryValue = parseFloat(salary);
      const gdkValue = parseFloat(gdk);
      const pbiValue = parseFloat(pbi);
      const gdkSdiValue = parseFloat(gdk_sdi);
      const knasValue = parseFloat(knas);
      const kfValue = parseFloat(kf);

      // Обчислення Ai
      const Ai = 1 / gdkValue;

      // Обчислення Kзi
      const Kzi = pbiValue / gdkSdiValue;

      // Обчислення KT
      const KT = knasValue * kfValue;

      // Обчислення Z
      const Z = miValue * salaryValue * 1.1 * Ai * KT * Kzi;
      setResultCompensationAir(Z.toFixed(2));
    } else {
      setResultCompensationAir('Будь ласка, заповніть усі поля!');
    }
  };


  const handleBack = () => {
    setCurrentView('main');
    setResultCompensation(null);
    setResultAirPollution(null);
    setFormData({
      Kcat: '',
      Kp: '',
      k3: '',
      Mi: '',
      y: '',
    });
  };


  return (
    <MainModal modalOpen={ modalOpen } setModalOpen={ setModalOpen }>
      <div className="inline-block sm:w-4/5 border border-subMain md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-modal text-white rounded-2xl">
        { currentView === 'main' && (
          <>
            <h2 className="text-lg font-bold text-center mb-4">Розрахунки</h2>
            <div className="mb-4">
              <button
                className="w-full py-3 bg-subMain text-white rounded mb-2"
                onClick={ handleMassCalculation }
              >
                Розрахунок маси наднормативного скиду забруднюючої речовини (Кривбасшахтозакриття)
              </button>
            </div>
            <div className="mb-4">
              <button
                className="w-full py-3 bg-subMain text-white rounded mb-2"
                onClick={ () => setCurrentView('compensation') }
              >
                Розрахунок розмірів відшкодування збитків заподіяних водним об'єктам
              </button>
            </div>
            <div className="mb-4">
              <button
                className="w-full py-3 bg-subMain text-white rounded mb-2"
                onClick={ () => setCurrentView('airPollution') }
              >
                Розрахунок маси наднормативних викидів забруднюючих речовин в атмосферне повітря
              </button>
            </div>
            <div className="mb-4">
              <button
                className="w-full py-3 bg-subMain text-white rounded mb-2"
                onClick={ () => setCurrentView('compensationAir') }
              >
                Розрахунок розміру відшкодування збитків за наднормативний викид
              </button>
            </div>
          </>
        ) }

        { currentView === 'mass' && (
          <>
            <h2 className="text-lg font-bold text-center mb-4">
              Розрахунок маси наднормативного скиду
            </h2>
            <div className="text-green-500 text-center mb-4">
              Маса наднормативного скиду: { resultMass }
            </div>
            <button
              className="w-full py-3 bg-orange-300 text-black rounded"
              onClick={ handleBack }
            >
              Назад
            </button>
          </>
        ) }

        { currentView === 'compensation' && (
          <>
            <h2 className="text-lg font-bold text-center mb-4">
              Розрахунок розмірів відшкодування збитків
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-400">Коефіцієнт категорії водного об'єкта (Kcat):</label>
                <input
                  type="number"
                  name="Kcat"
                  value={ formData.Kcat }
                  onChange={ handleChange }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Kcat"
                />
              </div>
              <div>
                <label className="block text-gray-400">Регіональний коефіцієнт (Kp):</label>
                <input
                  type="number"
                  name="Kp"
                  value={ formData.Kp }
                  onChange={ handleChange }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Kp"
                />
              </div>
              <div>
                <label className="block text-gray-400">Коефіцієнт врахування водної екосистеми (k3):</label>
                <input
                  type="number"
                  name="k3"
                  value={ formData.k3 }
                  onChange={ handleChange }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть k3"
                />
              </div>
              <div>
                <label className="block text-gray-400">Маса наднормативного скиду (Mi):</label>
                <input
                  type="number"
                  name="Mi"
                  value={ formData.Mi }
                  onChange={ handleChange }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Mi"
                />
              </div>
              <div>
                <label className="block text-gray-400">Штучний економічний збиток (y):</label>
                <input
                  type="number"
                  name="y"
                  value={ formData.y }
                  onChange={ handleChange }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть y"
                />
              </div>
            </div>
            <button
              className="w-full py-3 bg-subMain text-black rounded mt-4"
              onClick={ handleCompensationCalculation }
            >
              Розрахувати
            </button>
            { resultCompensation && (
              <div className="text-green-500 text-center mt-4">
                Результат: { resultCompensation } грн
              </div>
            ) }
            <button
              className="w-full py-3 bg-orange-300 text-black rounded mt-4"
              onClick={ handleBack }
            >
              Назад
            </button>
          </>
        ) }

        { currentView === 'airPollution' && (
          <>
            <h2 className="text-lg font-bold text-center mb-4">
              Розрахунок маси наднормативних викидів
            </h2>
            <button
              className="w-full py-3 bg-subMain text-black rounded mt-4"
              onClick={ handleAirPollutionCalculation }
            >
              Розрахувати
            </button>
            { resultAirPollution && (
              <div className="text-green-500 text-center mt-4">
                Результат: { resultAirPollution }
              </div>
            ) }
            <button
              className="w-full py-3 bg-orange-300 text-black rounded mt-4"
              onClick={ handleBack }
            >
              Назад
            </button>
          </>
        ) }
        { currentView === 'compensationAir' && (
          <>
            <h2 className="text-lg font-bold text-center mb-4">
              Розрахунок розміру відшкодування збитків
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-400">Маса наднормативного викиду (т):</label>
                <input
                  type="number"
                  name="mi"
                  value={ formData1.mi }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть масу (т)"
                />
              </div>
              <div>
                <label className="block text-gray-400">Розмір мінімальної заробітної плати (грн):</label>
                <input
                  type="number"
                  name="salary"
                  value={ formData1.salary }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть зарплату (грн)"
                />
              </div>
              <div>
                <label className="block text-gray-400">ГДКі (мг/м³):</label>
                <input
                  type="number"
                  name="gdk"
                  value={ formData1.gdk }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть ГДКі"
                />
              </div>
              <div>
                <label className="block text-gray-400">Середньорічна концентрація Pбі (мг/м³):</label>
                <input
                  type="number"
                  name="pbi"
                  value={ formData1.pbi }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Pбі"
                />
              </div>
              <div>
                <label className="block text-gray-400">Середньодобова концентрація ГДКсді (мг/м³):</label>
                <input
                  type="number"
                  name="gdk_sdi"
                  value={ formData1.gdk_sdi }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть ГДКсді"
                />
              </div>
              <div>
                <label className="block text-gray-400">Коефіцієнт Kнас:</label>
                <input
                  type="number"
                  name="knas"
                  value={ formData1.knas }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Kнас"
                />
              </div>
              <div>
                <label className="block text-gray-400">Коефіцієнт Kф:</label>
                <input
                  type="number"
                  name="kf"
                  value={ formData1.kf }
                  onChange={ handleChange1 }
                  className="w-full p-2 border rounded text-black"
                  placeholder="Введіть Kф"
                />
              </div>
            </div>
            <button
              className="w-full py-3 bg-subMain text-black rounded mt-4"
              onClick={ handleCompensationAirCalculation }
            >
              Розрахувати
            </button>
            { resultCompensationAir && (
              <div className="text-green-500 text-center mt-4">
                Результат: { resultCompensationAir } грн
              </div>
            ) }
            <button
              className="w-full py-3 bg-orange-300 text-black rounded mt-4"
              onClick={ handleBack }
            >
              Назад
            </button>
          </>
        ) }
      </div>
    </MainModal >
  );
}

export default CalculateModal;

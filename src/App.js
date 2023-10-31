import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [firstCurrency, setFirstCurrency] = useState('USD');
  const [secondCurrency, setSecondCurrency] = useState('EUR');
  const [thirdCurrency, setThirdCurrency] = useState('BYN');
  const [firstPrice, setFirstPrice] = useState(1);
  const [secondPrice, setSecondPrice] = useState(0);
  const [thirdPrice, setThirdPrice] = useState(0);

  const ratesRef = useRef({});

  // const [state, setState] = useState({});

  // const callBackendAPI = async () => {
  //   const response = await fetch('http://localhost:5000/currencies');
  //   response.json().then(response => {
  //     console.log("Here", response.rates)
  //   })
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };
  
  // // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  // useEffect(() => {
  //   callBackendAPI()
  //     .then(res => {
  //       ratesRef.current = res.rates;
  //     })
  //   .catch(err => console.log(err));
  // }, [])

  useEffect(() => {
    fetch('http://localhost:5000/currencies')
      .then((res) => {
        res.json()
      })
      .then((json) => {
        console.log(json.rates);
        ratesRef.current = json.rates;
        onChangeFirstPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      })
  }, []);

  const onChangeFirstPrice = (value) => {
    const result1 = value / ratesRef.current[firstCurrency] * ratesRef.current[secondCurrency];
    const result2 = value / ratesRef.current[firstCurrency] * ratesRef.current[thirdCurrency];
    setSecondPrice(result1.toFixed(4));
    setThirdPrice(result2.toFixed(4));
    setFirstPrice(value);
  };

  const onChangeSecondPrice = (value) => {
    const result1 = ratesRef.current[firstCurrency] / ratesRef.current[secondCurrency] * value;
    const result2 = ratesRef.current[thirdCurrency] / ratesRef.current[secondCurrency] * value;
    setFirstPrice(result1.toFixed(4));
    setThirdPrice(result2.toFixed(4));
    setSecondPrice(value);
  };

  const onChangeThirdPrice = (value) => {
    const result1 = ratesRef.current[firstCurrency] / ratesRef.current[thirdCurrency] * value;
    const result2 = ratesRef.current[secondCurrency] / ratesRef.current[thirdCurrency] * value;
    setFirstPrice(result1.toFixed(4));
    setSecondPrice(result2.toFixed(4));
    setThirdPrice(value);
  };

  useEffect(() => {
    onChangeFirstPrice(firstPrice);
  }, [firstCurrency]);

  useEffect(() => {
    onChangeSecondPrice(secondPrice);
  }, [secondCurrency]);

  useEffect(() => {
    onChangeThirdPrice(thirdPrice);
  }, [thirdCurrency]);

  return (
    <div className="App">
      <Block
        value={firstPrice}
        currency={firstCurrency}
        onChangeCurrency={setFirstCurrency}
        onChangeValue={onChangeFirstPrice} />
          <p className='text-under-input'>доллар США</p>

      <Block
        value={secondPrice}
        currency={secondCurrency}
        onChangeCurrency={setSecondCurrency}
        onChangeValue={onChangeSecondPrice} />
          <p className='text-under-input'>евро</p>

      <Block
        value={thirdPrice}
        currency={thirdCurrency}
        onChangeCurrency={setThirdCurrency}
        onChangeValue={onChangeThirdPrice} />
          <p className='text-under-input'>белорусский рубль</p>
    </div>
  );
}

export default App;
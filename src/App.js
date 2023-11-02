import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';
import Select from 'react-select';
import MyComponent from './MyComponent';

function App() {
  const [firstCurrency, setFirstCurrency] = useState('USD');
  const [secondCurrency, setSecondCurrency] = useState('EUR');
  const [thirdCurrency, setThirdCurrency] = useState('BYN');
  const [fourthCurrency, setFourthCurrency] = useState('RUB');
  const [firstPrice, setFirstPrice] = useState(1);
  const [secondPrice, setSecondPrice] = useState(0);
  const [thirdPrice, setThirdPrice] = useState(0);
  const [fourthPrice, setFourthPrice] = useState(0);

  const ratesRef = useRef({});


  const callBackendAPI = async () => {
    const response = await fetch('http://localhost:5000/currencies');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        ratesRef.current = res.rates;
        onChangeFirstPrice(1);
      })
    .catch(err => console.log(err));
  }, [])

    
  const onChangeFirstPrice = (value) => {
    const result1 = ratesRef.current[secondCurrency] / ratesRef.current[firstCurrency] * value;
    const result2 = ratesRef.current[thirdCurrency] / ratesRef.current[firstCurrency] * value;
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

  const showSelect = () => {
    const div = document.querySelector('.select-opt')
    div.style.display = div.style.display === 'none' ? 'block' : 'none'
  }

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

      <MyComponent />

      <button onClick={showSelect}>Добавить валюту</button>
      
    </div>
  );
}

export default App;
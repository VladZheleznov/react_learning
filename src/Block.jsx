import React from 'react';

const defaultCurrencies = ['USD', 'EUR', 'RUB', 'BYN'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  
  <div>
    <div className='block-model'>
      <p>{currency }</p>
      <div className="block">
        <input
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          type="number"
          placeholder={0}
        />
      </div>
    </div>
  </div>
  
);
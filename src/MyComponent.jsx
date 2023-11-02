import React, { useState, useEffect } from 'react';

const MyComponent = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:5000/currencies')
      .then(response => response.json())
      .then(data => {
        setOptions(Object.keys(data.rates))
      })
      .catch(error => console.log(error));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    const div = document.querySelector('.select-opt')
    div.style.display = div.style.display === 'none' ? 'block' : 'none'
  };

  
  return (
    <div className='select-opt'>
      <select value={selectedValue} onChange={handleSelectChange}>
        {options.map((option, id) => (
          <option key={id} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default MyComponent;
import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then(json => {
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch(err => {
        console.warn(err);
        alert('Error')
      });
  }, []);

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(()=>{
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  const INPUT_TYPE_MAPPING = {
    from: {
      currency: setFromCurrency,
      value: onChangeFromPrice
    },
    to: {
      currency: setToCurrency,
      value: onChangeToPrice
    }
  }

  const handleInputValueChange = (type) => (e) => {
    const value = e.target.value
    INPUT_TYPE_MAPPING[type].value(value)
  }

  const handleCurrencyChange = (type) => (value) => () => {
    INPUT_TYPE_MAPPING[type].currency(value)
  }

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={handleCurrencyChange('from')}
        onChangeValue={handleInputValueChange('from')}
      />

      <Block
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={handleCurrencyChange('to')}
        onChangeValue={handleInputValueChange('to')}
      />
    </div>
  );
}

export default App;

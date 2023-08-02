const extractData = (data) => {
  const baseData = data.historical.slice(0,150);
  const allClosingPrices = baseData.map(day => Number(day.close.toFixed(2)));
  const initialClose = allClosingPrices[149];
  const lastClose = allClosingPrices[0];
  const longTermReturn = (((lastClose - initialClose)*100)/initialClose).toFixed(2);
  const priceSum = allClosingPrices.reduce((sum, price) => sum + price, 0);
  const average = (priceSum/150).toFixed(2);
  const changePercent = baseData[0].changePercent.toFixed(2);
  const extraction = {
    lastClose: lastClose,
    changePercent: changePercent,
    average: average,
    longTermReturn: longTermReturn
  }
  
  return extraction;
}

export {extractData}
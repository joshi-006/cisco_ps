// App.jsx

import React, { useState } from 'react';
import { getBuiltInOrders } from './data/sampleOrders.js';
import { validateOrders } from './domain/validate.js';
import { consolidate } from './domain/consolidate.js';
import VendorTable from './components/VendorTable.jsx';
import OrderTable from './components/OrderTable.jsx';
import Controls from './components/Controls.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import ResultTable from './components/ResultTable.jsx';
import TotalsCard from './components/TotalsCard.jsx';

function App() {
  const [orders, setOrders] = useState(getBuiltInOrders());
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleOrdersChange = (updatedOrders) => {
    setOrders(updatedOrders);
    setResult(null);
    setError(null);
  };

  const handleAddOrder = () => {
    const newOrder = {
      uid: `u${Date.now()}`,
      orderId: '',
      member: '',
      item: '',
      size: '',
      colour: '',
      quantity: '',
    };
    handleOrdersChange([...orders, newOrder]);
  };

  const handleConsolidate = () => {
    const validationError = validateOrders(orders);
    if (validationError) {
      setError(validationError);
      setResult(null);
    } else {
      const consolidatedResult = consolidate(orders);
      setResult(consolidatedResult);
      setError(null);
    }
  };

  const handleReset = () => {
    setOrders(getBuiltInOrders());
    setResult(null);
    setError(null);
  };

  const handleClearAll = () => {
    setOrders([]);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <h1 className="app-title">Club Merch Order Consolidator</h1>
      <section className="section">
        <h2>Vendor Catalog</h2>
        <VendorTable />
      </section>
      <section className="section">
        <h2>Member Orders</h2>
        <OrderTable
          orders={orders}
          onOrdersChange={handleOrdersChange}
          onAddOrder={handleAddOrder}
        />
      </section>
      <Controls
        onConsolidate={handleConsolidate}
        onReset={handleReset}
        onClearAll={handleClearAll}
      />
      {error && <ErrorBanner error={error} />}
      {result && (
        <>
          <section className="section">
            <h2>Consolidated Summary</h2>
            <ResultTable result={result} />
          </section>
          <TotalsCard result={result} />
        </>
      )}
    </>
  );
}

export default App;
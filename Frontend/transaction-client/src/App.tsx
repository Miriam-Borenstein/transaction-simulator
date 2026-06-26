import { useState, useEffect } from 'react';
import TransactionSimulatorPage from './pages/TransactionSimulatorPage';
import { createTransaction, getApprovedTransactions } from './services/transactionService';
import type { TransactionResponse } from './services/transactionTypes';
import { createUtcTimestamp, getStartOfDay } from './utils/dateUtils';
import './App.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date>(getStartOfDay());
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    getApprovedTransactions().then(setTransactions);
  }, []);

  const handleSubmit = async () => {
    if (!selectedRegion) {
      console.warn('Region is not selected');
      return;
    }
    
    const payload = { 
      region: selectedRegion, 
      submittedTimeUtc: createUtcTimestamp(selectedTime)
    };
    
    console.log("Create Transaction ", payload);
    await createTransaction(payload);
    const updatedTransactions = await getApprovedTransactions();
    setTransactions(updatedTransactions);
  };

  return (
    <TransactionSimulatorPage
      selectedRegion={selectedRegion}
      selectedTime={selectedTime}
      transactions={transactions}
      onRegionChange={setSelectedRegion}
      onTimeChange={setSelectedTime}
      onSubmit={handleSubmit}
    />
  );
}

export default App;

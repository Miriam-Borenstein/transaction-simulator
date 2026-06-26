import type { TransactionResponse } from '../services/transactionTypes';
import Header from '../components/Header';
import RegionSelector from '../components/RegionSelector';
import TimePicker from '../components/TimePicker';
import TransactionList from '../components/TransactionList';
import SimulatorContent from '../components/SimulatorContent';
import { getStartOfDay } from '../utils/dateUtils';
import './TransactionSimulatorPage.css';

type Props = {
  selectedRegion: string;
  selectedTime: Date;
  transactions: TransactionResponse[];
  onRegionChange: (region: string) => void;
  onTimeChange: (time: Date) => void;
  onSubmit: () => void;
};

export default function TransactionSimulatorPage({
  selectedRegion,
  selectedTime,
  transactions,
  onRegionChange,
  onTimeChange,
  onSubmit,
}: Props) {
  const handleCancel = () => {
    onRegionChange('');
    onTimeChange(getStartOfDay());
  };

  return (
    <div className="simulator-page">
      <Header />
      <div className="simulator-page__content">
        <div className="simulator-page__main">
          <div className="simulator-page__controls">
            <RegionSelector selected={selectedRegion} onSelect={onRegionChange} />
            <TimePicker
              value={selectedTime}
              onChange={onTimeChange}
              onCancel={handleCancel}
              onOk={onSubmit}
            />
          </div>
          <SimulatorContent />
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

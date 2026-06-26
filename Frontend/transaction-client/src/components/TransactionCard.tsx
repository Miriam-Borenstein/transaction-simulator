import type { TransactionResponse } from '../services/transactionTypes';
import './TransactionCard.css';

type Props = {
  transaction: TransactionResponse;
};

export default function TransactionCard({ transaction }: Props) {
  return (
    <div className="transaction-card">
      <div className="transaction-card__body">
        <h3 className="transaction-card__time">Time: {transaction.localTimeAtRegion.slice(11, 16)}</h3>
        <p className="transaction-card__region">Time Zone: {transaction.region}</p>
      </div>
    </div>
  );
}

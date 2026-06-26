import { useState } from 'react';
import type { TransactionResponse } from '../services/transactionTypes';
import TransactionCard from './TransactionCard';
import './TransactionList.css';

type Props = {
  transactions: TransactionResponse[];
};

const PAGE_SIZE = 3;

export default function TransactionList({ transactions }: Props) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const visible = transactions.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="transaction-list">
      <h2 className="transaction-list__heading">Approved Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="transaction-list__carousel">
          <button
            className="transaction-list__arrow"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >←</button>

          <div className="transaction-list__cards">
            {visible.map((t) => (
              <TransactionCard key={t.id} transaction={t} />
            ))}
          </div>

          <button
            className="transaction-list__arrow"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >→</button>
        </div>
      )}
    </div>
  );
}

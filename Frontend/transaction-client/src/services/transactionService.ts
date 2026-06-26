import api from './api';
import type { CreateTransactionRequest, TransactionResponse } from './transactionTypes';

export const createTransaction = async (
  dto: CreateTransactionRequest
): Promise<TransactionResponse> => {
  try {
    const { data } = await api.post<TransactionResponse>('/api/Transactions/create', dto);
    return data;
  } catch (error) {
    console.error('Failed to create transaction:', error);
    throw error;
  }
};

export const getApprovedTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const { data } = await api.get<TransactionResponse[]>('/api/Transactions/approved');
    return data;
  } catch (error) {
    console.error('Failed to fetch approved transactions:', error);
    throw error;
  }
};

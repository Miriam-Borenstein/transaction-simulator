export type CreateTransactionRequest = {
  region: string;
  submittedTimeUtc: string;
};

export type TransactionResponse = {
  id: string;
  region: string;
  localTimeAtRegion: string;
  status: 'approved' | 'rejected';
};

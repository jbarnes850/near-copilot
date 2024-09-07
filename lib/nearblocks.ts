import axios from 'axios';

const NEARBLOCKS_API_BASE_URL = 'https://api.nearblocks.io/v1';

const nearBlocksApi = axios.create({
  baseURL: NEARBLOCKS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEARBLOCKS_API_KEY,
  },
});

export async function getLatestBlocks(limit: number = 5) {
  const response = await nearBlocksApi.get(`/blocks?limit=${limit}`);
  return response.data;
}

export async function getAccountInfo(accountId: string) {
  const response = await nearBlocksApi.get(`/account/${accountId}`);
  return response.data;
}

export async function getTransactionInfo(txHash: string) {
  const response = await nearBlocksApi.get(`/txns/${txHash}`);
  return response.data;
}

// Add more functions as needed for other NEARBlocks API endpoints
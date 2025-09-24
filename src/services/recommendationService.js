import { postRecommendations } from './apiClient.js';

export async function getTopRecommendations(farm){
  const data = await postRecommendations(farm);
  return data.map((c, i) => ({ ...c, rank: i + 1 }));
}

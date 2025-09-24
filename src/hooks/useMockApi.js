import useOffline from './useOffline.js';
import * as api from '../services/apiClient.js';

export default function useMockApi() {
  const { isOffline } = useOffline();
  const guard = async (fn) => {
    if (isOffline) throw new Error('Offline: action unavailable');
    await new Promise((r) => setTimeout(r, 400));
    return fn();
  };
  return {
    getUserProfile: () => guard(api.getUserProfile),
    getSoilByLocation: (loc) => guard(() => api.getSoilByLocation(loc)),
    postRecommendations: (payload) => guard(() => api.postRecommendations(payload)),
    postPestScan: (file) => guard(() => api.postPestScan(file)),
    getMarkets: (crop, near) => guard(() => api.getMarkets(crop, near)),
  };
}

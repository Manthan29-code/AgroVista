import user from '../mocks/data/user.json';
import crops from '../mocks/data/crops.json';
import markets from '../mocks/data/markets.json';
import feedback from '../mocks/data/feedback.json';

export async function getUserProfile(){
  return user;
}

export async function getSoilByLocation(location){
  return {
    ph: 6.8,
    moisturePercent: 28,
    N: 120,
    P: 45,
    K: 70,
    lastTestDate: '2025-05-20',
    location,
  };
}

export async function postRecommendations(payload){
  return crops.slice(0, 3);
}

export async function postPestScan(file){
  const sizeMB = file?.size ? file.size / (1024*1024) : 1;
  if (sizeMB < 0.1) {
    return { detectedName: 'Low-confidence: Blight?', confidencePercent: 42, suggestedActions: ['Retake photo in daylight', 'Check leaf underside'], severity: 'low' };
  }
  return { detectedName: 'Aphids', confidencePercent: 92, suggestedActions: ['Use neem oil spray', 'Introduce ladybugs'], severity: 'medium' };
}

export async function getMarkets(crop, near){
  return markets;
}

export async function getFeedbackList(){
  return feedback;
}

export async function postFeedback(entry){
  return {
    id: `fb-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    ...entry,
  };
}

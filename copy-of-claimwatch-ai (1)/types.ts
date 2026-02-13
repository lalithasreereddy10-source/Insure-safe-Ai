
export interface ClaimDetails {
  policyNumber: string;
  claimAmount: number;
  incidentType: string;
  location: string;
  policyAge: number;
  previousClaims: number;
  incidentDate: string;
}

export interface PredictionResult {
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  isFraud: boolean;
  explanation: string;
}

export interface DashboardStats {
  totalClaims: number;
  fraudDetected: number;
  fraudRate: number;
  averageClaim: number;
}

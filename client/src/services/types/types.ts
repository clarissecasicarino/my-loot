// Types
export interface Member {
  id: number;
  username: string;
  coins_earned: number;
  contribution_percentage: number;
}

export interface Team {
  id: number;
  name: string;
  total_coins: number;
}

export interface TeamStats {
  team: Team;
  members: Member[];
  period?: {
    from: string | null;
    to: string | null;
  };
}

export interface CoinEarning {
  user_id: number;
  amount: number;
  timestamp?: string;
}

export interface CoinEarningResponse {
  id: number;
  user_id: number;
  amount: number;
  description: string;
  message: string;
}
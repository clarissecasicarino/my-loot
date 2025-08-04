import axios from "axios";
import { TeamStats } from "./types/types";

const API_BASE = process.env.REACT_APP_API_URL || "https://my-loot.vercel.app";

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE) {
    this.baseURL = baseURL;
  }

  // Get team statistics
  async getTeamStats(teamId: number): Promise<TeamStats> {
    try {
      const response = await axios.get<TeamStats>(
        `${this.baseURL}/api/teams/${teamId}/stats`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching team stats:", error);
      throw new Error("Failed to fetch team statistics");
    }
  }

  // Get team leaderboard with optional date filters
  async getTeamLeaderboard(
    teamId: number,
    fromDate?: string,
    toDate?: string
  ): Promise<TeamStats> {
    try {
      let url = `${this.baseURL}/teams/${teamId}/leaderboard`;

      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get<TeamStats>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching team leaderboard:", error);
      throw new Error(
        "Sorry, there are no team leaderboards within this period. Please try a different date range."
      );
    }
  }

  // Combined method that chooses between stats and leaderboard based on filters
  async fetchTeamData(
    teamId: number,
    useFilters: boolean,
    fromDate?: string,
    toDate?: string
  ): Promise<TeamStats> {
    if (useFilters && (fromDate || toDate)) {
      return this.getTeamLeaderboard(teamId, fromDate, toDate);
    } else {
      return this.getTeamStats(teamId);
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await axios.get(`${this.baseURL}/health`);
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      throw new Error("API health check failed");
    }
  }
}

export const apiService = new ApiService();
export default apiService;

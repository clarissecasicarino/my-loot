import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { TeamStats } from "./services/types/types";
import apiService from "./services";
import TeamLeaderboard from "./components/TeamLeaderboard";
import TeamControls from "./components/TeamControls";

function App() {
  const [teamId, setTeamId] = useState<number>(1);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [useFilters, setUseFilters] = useState<boolean>(false);

  const fetchTeamStats = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiService.fetchTeamData(
        teamId,
        useFilters,
        fromDate,
        toDate
      );
      setTeamStats(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team statistics"
      );
    } finally {
      setLoading(false);
    }
  }, [teamId, useFilters, fromDate, toDate]);

  useEffect(() => {
    fetchTeamStats();
  }, [fetchTeamStats]);

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setUseFilters(false);
    setError(""); // hide error when cleared
    setTimeout(() => fetchTeamStats(), 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyLOOT.gg Team Dashboard</h1>
      </header>

      <main className="main-content">
        <TeamControls
          teamId={teamId}
          onTeamChange={setTeamId}
          useFilters={useFilters}
          onUseFiltersChange={setUseFilters}
          fromDate={fromDate}
          onFromDateChange={setFromDate}
          toDate={toDate}
          onToDateChange={setToDate}
          onClearFilters={clearFilters}
          loading={loading}
          error={error}
        />

        {teamStats && <TeamLeaderboard teamStats={teamStats} />}
      </main>
    </div>
  );
}

export default App;

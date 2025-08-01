import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { TeamStats } from "./services/types/types";
import apiService from "./services";
import { dateTimeUtility } from "./utils/datetime";

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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTeamStats();
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setUseFilters(false);
    setTimeout(() => fetchTeamStats(), 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyLOOT.gg Team Dashboard</h1>
      </header>

      <main className="main-content">
        <div className="controls">
          <div className="team-selector">
            <label htmlFor="teamId">Select Team: </label>
            <select
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(Number(e.target.value))}
            >
              <option value={1}>Venom Vipers</option>
              <option value={2}>Fury Dragons</option>
              <option value={3}>Mystic Wolves</option>
            </select>
          </div>

          <form onSubmit={handleFilterSubmit} className="date-filters">
            <div className="filter-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={useFilters}
                  onChange={(e) => setUseFilters(e.target.checked)}
                />
                Use date filters
              </label>
            </div>

            {useFilters && (
              <>
                <div className="date-input">
                  <label htmlFor="fromDate">From: </label>
                  <input
                    type="datetime-local"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div className="date-input">
                  <label htmlFor="toDate">To: </label>
                  <input
                    type="datetime-local"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <button type="submit" className="filter-btn">
                  Apply Filters
                </button>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="clear-btn"
                >
                  Clear Filters
                </button>
              </>
            )}
          </form>
        </div>

        {loading && <div className="loading">Loading...</div>}

        {error && <div className="error">{error}</div>}

        {teamStats && (
          <div className="team-stats">
            <div className="team-header">
              <h2>{teamStats.team.name}</h2>
              <div className="total-coins">
                <span className="coins-label">Total Coins:</span>
                <span className="coins-value">
                  {teamStats.team.total_coins.toLocaleString()}
                </span>
              </div>
              {teamStats.period &&
                (teamStats.period.from || teamStats.period.to) && (
                  <div className="period-info">
                    Period: {dateTimeUtility(teamStats.period.from ?? 'Start')} -{" "}
                    {dateTimeUtility(teamStats.period.to ?? '')}
                  </div>
                )}
            </div>

            <div className="leaderboard">
              <h3>Member Leaderboard</h3>

              {/* Podium for top 3 */}
              {teamStats.members.length > 0 && (
                <div className="podium-container">
                  <div className="podium">
                    {/* Second place - Left */}
                    {teamStats.members[1] && (
                      <div className="podium-position second">
                        <div className="podium-card">
                          <div className="rank-badge">#2</div>
                          <div className="avatar">
                            {teamStats.members[1].username
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div className="username">
                            {teamStats.members[1].username}
                          </div>
                          <div className="points">
                            {teamStats.members[1].coins_earned.toLocaleString()}{" "}
                            coins
                          </div>
                          <div className="percentage">
                            {teamStats.members[1].contribution_percentage}%
                          </div>
                        </div>
                        <div className="podium-base second-place"></div>
                      </div>
                    )}

                    {/* First place - Center */}
                    {teamStats.members[0] && (
                      <div className="podium-position first">
                        <div className="podium-card winner">
                          <div className="rank-badge gold">#1</div>
                          <div className="trophy">🏆</div>
                          <div className="avatar winner-avatar">
                            {teamStats.members[0].username
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div className="username">
                            {teamStats.members[0].username}
                          </div>
                          <div className="points">
                            {teamStats.members[0].coins_earned.toLocaleString()}{" "}
                            coins
                          </div>
                          <div className="percentage">
                            {teamStats.members[0].contribution_percentage}%
                          </div>
                        </div>
                        <div className="podium-base first-place"></div>
                      </div>
                    )}

                    {/* Third place - Right */}
                    {teamStats.members[2] && (
                      <div className="podium-position third">
                        <div className="podium-card">
                          <div className="rank-badge">#3</div>
                          <div className="avatar">
                            {teamStats.members[2].username
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div className="username">
                            {teamStats.members[2].username}
                          </div>
                          <div className="points">
                            {teamStats.members[2].coins_earned.toLocaleString()}{" "}
                            coins
                          </div>
                          <div className="percentage">
                            {teamStats.members[2].contribution_percentage}%
                          </div>
                        </div>
                        <div className="podium-base third-place"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Remaining members (4th place and below) */}
              {teamStats.members.length > 3 && (
                <div className="remaining-members">
                  <h4>Other Team Members</h4>
                  <div className="members-list">
                    {teamStats.members.slice(3).map((member, index) => (
                      <div key={member.id} className="member-card">
                        <div className="member-rank">#{index + 4}</div>
                        <div className="member-avatar">
                          {member.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="member-info">
                          <div className="member-name">{member.username}</div>
                          <div className="member-stats">
                            <span className="coins">
                              {member.coins_earned.toLocaleString()} coins
                            </span>
                            <span className="percentage">
                              {member.contribution_percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

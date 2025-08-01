import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TeamStats } from './services/types/types';
import apiService from './services';

function App() {

  const [teamId, setTeamId] = useState<number>(1);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [useFilters, setUseFilters] = useState<boolean>(false);
  

  const fetchTeamStats = async () => {
  setLoading(true);
  setError('');
  
  try {
    const data = await apiService.fetchTeamData(teamId, useFilters, fromDate, toDate);
    setTeamStats(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch team statistics');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTeamStats();
  }, [fetchTeamStats]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTeamStats();
  };

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
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
                
                <button type="button" onClick={clearFilters} className="clear-btn">
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
                <span className="coins-value">{teamStats.team.total_coins.toLocaleString()}</span>
              </div>
              {teamStats.period && (teamStats.period.from || teamStats.period.to) && (
                <div className="period-info">
                  Period: {teamStats.period.from || 'Start'} - {teamStats.period.to || 'Now'}
                </div>
              )}
            </div>

            <div className="leaderboard">
              <h3>Member Leaderboard</h3>
              <div className="members-list">
                {teamStats.members.map((member, index) => (
                  <div key={member.id} className="member-card">
                    <div className="member-rank">#{index + 1}</div>
                    <div className="member-info">
                      <div className="member-name">{member.username}</div>
                      <div className="member-stats">
                        <span className="coins">{member.coins_earned.toLocaleString()} coins</span>
                        <span className="percentage">
                          ({member.contribution_percentage}% of team total)
                        </span>
                      </div>
                    </div>
                    <div className="contribution-bar">
                      <div 
                        className="contribution-fill"
                        style={{ width: `${member.contribution_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

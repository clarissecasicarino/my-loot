import React from "react";
import "../../App.css";

interface Team {
  id: number;
  name: string;
}

interface TeamControlsProps {
  teamId: number;
  onTeamChange: (teamId: number) => void;
  teams?: Team[];
  useFilters: boolean;
  onUseFiltersChange: (useFilters: boolean) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
  onClearFilters: () => void;
  loading?: boolean;
  error?: string;
}

const TeamControls = ({
  teamId,
  onTeamChange,
  teams = [
    { id: 1, name: "Venom Vipers" },
    { id: 2, name: "Fury Dragons" },
    { id: 3, name: "Mystic Wolves" },
  ],
  useFilters,
  onUseFiltersChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClearFilters,
  loading,
  error,
}: TeamControlsProps) => {

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTeamChange(Number(e.target.value));
  };

  const handleUseFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUseFiltersChange(e.target.checked);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    onFromDateChange(newFromDate);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;
    onToDateChange(newToDate);
  };

  return (
    <div className="controls">
      <div className="team-selector">
        <label htmlFor="teamId">Select Team: </label>
        <select id="teamId" value={teamId} onChange={handleTeamChange}>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <form className="date-filters">
        <div className="filter-toggle">
          <label>
            <input
              type="checkbox"
              checked={useFilters}
              onChange={handleUseFiltersChange}
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
                onChange={handleFromDateChange}
              />
            </div>

            <div className="date-input">
              <label htmlFor="toDate">To: </label>
              <input
                type="datetime-local"
                id="toDate"
                value={toDate}
                onChange={handleToDateChange}
              />
            </div>

            <button
              type="button"
              onClick={onClearFilters}
              className="clear-btn"
            >
              Clear Filters
            </button>
          </>
        )}
      </form>

      {loading && <div className="loading">Loading...</div>}

      {error && fromDate && toDate && <div className="error">{error}</div>}
    </div>
  );
};

export default TeamControls;

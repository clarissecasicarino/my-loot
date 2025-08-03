import { TeamStats } from "../../services/types/types";
import { dateTimeUtility } from "../../utils/datetime";

interface TeamLeaderboardProps {
  teamStats?: TeamStats;
}

export default function TeamLeaderboard({ teamStats }: TeamLeaderboardProps) {
  if (!teamStats) {
    return null;
  }

  return (
    <div className="team-stats">
      <div className="team-header">
        <h2 style={{ color: "#667eea" }}>{teamStats.team.name}</h2>
        <div className="total-coins">
          <span className="coins-label">Total Coins:</span>
          <span className="coins-value">
            {teamStats.team.total_coins.toLocaleString()}
          </span>
        </div>
        {teamStats.period && (teamStats.period.from || teamStats.period.to) && (
          <div className="period-info">
            Period: {dateTimeUtility(teamStats.period.from ?? "Start")} -{" "}
            {dateTimeUtility(teamStats.period.to ?? "")}
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
                      {teamStats.members[1].username.charAt(0).toUpperCase()}
                    </div>
                    <div className="username">
                      {teamStats.members[1].username}
                    </div>
                    <div className="points">
                      {teamStats.members[1].coins_earned.toLocaleString()} coins
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
                      {teamStats.members[0].username.charAt(0).toUpperCase()}
                    </div>
                    <div className="username">
                      {teamStats.members[0].username}
                    </div>
                    <div className="points">
                      {teamStats.members[0].coins_earned.toLocaleString()} coins
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
                      {teamStats.members[2].username.charAt(0).toUpperCase()}
                    </div>
                    <div className="username">
                      {teamStats.members[2].username}
                    </div>
                    <div className="points">
                      {teamStats.members[2].coins_earned.toLocaleString()} coins
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
  );
}

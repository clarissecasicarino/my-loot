const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3301;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "myloot_test",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// GET /teams/:id/stats
app.get("/teams/:id/stats", async (req, res) => {
  const teamId = req.params.id;

  try {
    // Get team info and total coins
    const teamQuery = `
      SELECT 
        t.id,
        t.name,
        COALESCE(SUM(ce.amount), 0) as total_coins
      FROM teams t
      LEFT JOIN users u ON t.id = u.team_id
      LEFT JOIN coin_earnings ce ON u.id = ce.user_id
      WHERE t.id = ?
      GROUP BY t.id, t.name
    `;

    const [teamResult] = await db.promise().query(teamQuery, [teamId]);

    if (teamResult.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const team = teamResult[0];

    // Get member contributions
    const membersQuery = `
      SELECT 
        u.id,
        u.username,
        COALESCE(SUM(ce.amount), 0) as coins_earned,
        CASE 
          WHEN ? > 0 THEN ROUND((COALESCE(SUM(ce.amount), 0) * 100.0) / ?, 2)
          ELSE 0 
        END as contribution_percentage
      FROM users u
      LEFT JOIN coin_earnings ce ON u.id = ce.user_id
      WHERE u.team_id = ?
      GROUP BY u.id, u.username
      ORDER BY coins_earned DESC
    `;

    const [members] = await db
      .promise()
      .query(membersQuery, [team.total_coins, team.total_coins, teamId]);

    res.json({
      team: {
        id: team.id,
        name: team.name,
        total_coins: team.total_coins,
      },
      members: members,
    });
  } catch (error) {
    console.error("Error fetching team stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /teams/:id/leaderboard?from=...&to=...
app.get("/teams/:id/leaderboard", async (req, res) => {
  const teamId = req.params.id;
  const { from, to } = req.query;

  try {
    let dateCondition = "";
    let queryParams = [teamId];

    if (from && to) {
      dateCondition = "AND ce.earned_at BETWEEN ? AND ?";
      queryParams.push(from, to);
    } else if (from) {
      dateCondition = "AND ce.earned_at >= ?";
      queryParams.push(from);
    } else if (to) {
      dateCondition = "AND ce.earned_at <= ?";
      queryParams.push(to);
    }

    // Get team total for the period
    const teamQuery = `
      SELECT 
        t.id,
        t.name,
        COALESCE(SUM(ce.amount), 0) as total_coins
      FROM teams t
      LEFT JOIN users u ON t.id = u.team_id
      LEFT JOIN coin_earnings ce ON u.id = ce.user_id
      WHERE t.id = ? ${dateCondition}
      GROUP BY t.id, t.name
    `;

    const [teamResult] = await db.promise().query(teamQuery, queryParams);

    if (teamResult.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const team = teamResult[0];

    // Get member contributions for the period
    const membersQuery = `
      SELECT 
        u.id,
        u.username,
        COALESCE(SUM(ce.amount), 0) as coins_earned,
        CASE 
          WHEN ? > 0 THEN ROUND((COALESCE(SUM(ce.amount), 0) * 100.0) / ?, 2)
          ELSE 0 
        END as contribution_percentage
      FROM users u
      LEFT JOIN coin_earnings ce ON u.id = ce.user_id
      WHERE u.team_id = ? ${dateCondition}
      GROUP BY u.id, u.username
      ORDER BY coins_earned DESC
    `;

    queryParams = [team.total_coins, team.total_coins, teamId];
    if (from && to) {
      queryParams.push(from, to);
    } else if (from) {
      queryParams.push(from);
    } else if (to) {
      queryParams.push(to);
    }

    const [members] = await db.promise().query(membersQuery, queryParams);

    res.json({
      team: {
        id: team.id,
        name: team.name,
        total_coins: team.total_coins,
      },
      members: members,
      period: { from: from || null, to: to || null },
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

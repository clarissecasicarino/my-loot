-- MyLOOT.gg Database Schema
DROP DATABASE IF EXISTS myloot_test;
CREATE DATABASE myloot_test;
USE myloot_test;

-- Teams table
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_teams_name (name)
);

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    team_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
    INDEX idx_users_team (team_id),
    INDEX idx_users_username (username)
);

-- Coin earnings table
CREATE TABLE coin_earnings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount INT NOT NULL CHECK (amount > 0),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_earnings_user (user_id),
    INDEX idx_earnings_date (earned_at),
    INDEX idx_earnings_user_date (user_id, earned_at)
);

-- Sample data for testing
INSERT INTO teams (name) VALUES 
('Venom Vipers'), 
('Fury Dragons'), 
('Mystic Wolves');

INSERT INTO `users` (`id`, `username`, `email`, `team_id`, `created_at`) VALUES
(1, 'alice', 'alice@test.com', 1, '2025-08-01 15:05:41'),
(2, 'bob', 'bob@test.com', 1, '2025-08-01 15:05:41'),
(3, 'charlie', 'charlie@test.com', 1, '2025-08-01 15:05:41'),
(4, 'diana', 'diana@test.com', 2, '2025-08-01 15:05:41'),
(5, 'eve', 'eve@test.com', 2, '2025-08-01 15:05:41'),
(6, 'mark', 'mark@test.com', 3, '2025-08-01 15:37:36'),
(7, 'suzie', 'suzie@test.com', 3, '2025-08-01 15:37:36'),
(8, 'ada', 'ada@test.com', 2, '2025-08-01 15:37:36'),
(9, 'john', 'john@test.com', 3, '2025-08-01 18:19:31'),
(10, 'max', 'max@test.com', 1, '2025-08-01 18:52:56'),
(11, 'luna', 'luna@test.com', 1, '2025-08-01 18:52:56'),
(12, 'kai', 'kai@test.com', 1, '2025-08-01 18:52:56'),
(13, 'zoe', 'zoe@test.com', 1, '2025-08-01 18:52:56'),
(14, 'alex', 'alex@test.com', 2, '2025-08-01 18:52:56'),
(15, 'mia', 'mia@test.com', 2, '2025-08-01 18:52:56'),
(16, 'leo', 'leo@test.com', 2, '2025-08-01 18:52:56'),
(17, 'ivy', 'ivy@test.com', 2, '2025-08-01 18:52:56'),
(18, 'rio', 'rio@test.com', 3, '2025-08-01 18:52:56'),
(19, 'nova', 'nova@test.com', 3, '2025-08-01 18:52:56'),
(20, 'ace', 'ace@test.com', 3, '2025-08-01 18:52:56'),
(21, 'sky', 'sky@test.com', 3, '2025-08-01 18:52:56');


INSERT INTO `coin_earnings` (`id`, `user_id`, `amount`, `earned_at`, `description`) VALUES
(1, 1, 100, '2025-08-01 08:00:00', 'Daily quest'),
(2, 1, 50, '2025-08-02 12:30:00', 'Battle win'),
(3, 2, 200, '2025-08-03 09:00:00', 'Tournament'),
(4, 2, 75, '2025-08-04 07:15:00', 'Achievement'),
(5, 3, 150, '2025-08-05 14:45:00', 'Boss kill'),
(6, 4, 300, '2025-08-06 10:00:00', 'Raid completion'),
(7, 5, 125, '2025-08-07 11:20:00', 'PvP victory'),
(8, 6, 150, '2025-07-01 12:30:00', 'Battle win'),
(9, 7, 300, '2025-07-02 09:00:00', 'Tournament'),
(10, 8, 250, '2025-07-03 14:45:00', 'Boss kill'),
(11, 3, 250, '2025-07-04 13:00:00', 'Epic battle'),
(12, 9, 180, '2025-07-05 10:30:00', 'Quest completion'),
(13, 10, 320, '2025-07-06 07:30:00', 'Morning raid'),
(14, 11, 275, '2025-07-07 12:15:00', 'Guild quest'),
(15, 12, 145, '2025-07-08 14:00:00', 'PvP match'),
(16, 13, 85, '2025-07-09 18:15:00', 'Mini game'),
(17, 14, 290, '2025-07-10 08:45:00', 'Epic battle'),
(18, 15, 75, '2025-07-11 19:15:00', 'Night raid'),
(19, 16, 185, '2025-07-12 13:20:00', 'Solo challenge'),
(20, 17, 220, '2025-07-13 16:10:00', 'Achievement unlock'),
(21, 10, 320, '2025-07-14 07:30:00', 'Morning raid'),
(22, 11, 275, '2025-07-15 12:15:00', 'Guild quest'),
(23, 12, 145, '2025-07-16 14:00:00', 'PvP match'),
(24, 13, 85, '2025-07-17 18:15:00', 'Mini game'),
(25, 14, 290, '2025-07-18 08:45:00', 'Epic battle'),
(26, 15, 75, '2025-07-19 19:15:00', 'Night raid'),
(27, 16, 185, '2025-07-20 13:20:00', 'Solo challenge'),
(28, 17, 220, '2025-07-21 16:10:00', 'Achievement unlock'),
(29, 18, 350, '2025-07-22 09:15:00', 'Legendary drop'),
(30, 19, 175, '2025-07-23 17:10:00', 'Combat mastery'),
(31, 20, 310, '2025-07-24 15:45:00', 'Perfect score'),
(32, 21, 210, '2025-07-25 19:35:00', 'Night mission');
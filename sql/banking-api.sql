-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2025 at 07:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banking-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_tokens`
--

CREATE TABLE `access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `exp_date` datetime NOT NULL,
  `status` enum('active','used') NOT NULL DEFAULT 'active',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_tokens`
--

INSERT INTO `access_tokens` (`id`, `token`, `user_id`, `exp_date`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTk2MjI4LCJleHAiOjE3MzI2ODI2Mjh9.1wsXkfISvjcYudkPGqcal6JmzCpZUY40QFR8Ti2ciHY', 1, '2024-11-27 04:43:48', 'used', NULL, '2024-11-26 04:43:48', '2025-06-08 04:53:21'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTk3MTM3LCJleHAiOjE3MzI2ODM1Mzd9.vqB3p9MzBwC73zaZDcHmk8GVdjk-9IyLseLR_DqYZXg', 1, '2024-11-27 04:58:57', 'used', NULL, '2024-11-26 04:58:57', '2025-06-08 04:53:21'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTk3ODI5LCJleHAiOjE3MzI2ODQyMjl9.NDUc9JTlBBkUtvxlaBc1runOLEznOsOHFb9E47l6Auo', 1, '2024-11-26 05:12:29', 'used', NULL, '2024-11-26 05:10:29', '2025-06-08 04:53:21'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTk4OTg3LCJleHAiOjE3MzI2ODUzODd9.8YIkr36G8R4WGsw8dx1SW6hG_M-wSYFBO1kCZYce37Q', 1, '2024-11-26 05:31:47', 'used', NULL, '2024-11-26 05:29:47', '2025-06-08 04:53:21'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNTk5MzU4LCJleHAiOjE3MzI2ODU3NTh9.Au0O-NtWPOuv1xY_P9RXCbdZZj2Q86-liasMpFBBtgg', 1, '2024-11-26 05:35:58', 'used', NULL, '2024-11-26 05:35:58', '2025-06-08 04:53:21'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAwMjAyLCJleHAiOjE3MzI2ODY2MDJ9.DIEEsc51OGwSOrcOxE3DXhkjWwHneDU1OXZAkulOcQg', 1, '2024-11-26 05:50:02', 'used', NULL, '2024-11-26 05:50:02', '2025-06-08 04:53:21'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAwNDYzLCJleHAiOjE3MzI2ODY4NjN9.Qvpc2d54OyGaiJipEcQuTODCQDZB3HTIEp5E6QuC0S8', 1, '2024-11-26 05:54:23', 'used', NULL, '2024-11-26 05:54:23', '2025-06-08 04:53:21'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAyNDk0LCJleHAiOjE3MzI2ODg4OTR9.uKy0yI9I7f0qxEEBVseQZ64OMAz923aTvlHofWWZQY0', 1, '2024-11-27 06:28:14', 'used', NULL, '2024-11-26 06:28:14', '2025-06-08 04:53:21'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAyODkyLCJleHAiOjE3MzI2ODkyOTJ9.JdpfbmDTQnAgfheRlt0erJUhgSvFTaMlykfTs9wHZPU', 1, '2024-11-27 06:34:52', 'used', NULL, '2024-11-26 06:34:52', '2025-06-08 04:53:21'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAzMjE1LCJleHAiOjE3MzI2ODk2MTV9.F0htso1Nm6mekHm8D9d9aNCMtfw7flYl27FXmt944mw', 1, '2024-11-27 06:40:15', 'used', NULL, '2024-11-26 06:40:15', '2025-06-08 04:53:21'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAzNDA1LCJleHAiOjE3MzI2ODk4MDV9.Sqj7P8MimQiC5UCuDAZRr9NlNWxiTnbpwgPyzm6XYLw', 1, '2024-11-27 06:43:25', 'used', NULL, '2024-11-26 06:43:25', '2025-06-08 04:53:21'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAzNDk2LCJleHAiOjE3MzI2ODk4OTZ9.jo0mI2bqg6Itzewhc5iRzq7rAAfDrkd3HCe0FoSmmxU', 1, '2024-11-27 06:44:56', 'used', NULL, '2024-11-26 06:44:56', '2025-06-08 04:53:21'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjAzNTY3LCJleHAiOjE3MzI2ODk5Njd9.9IejGQvr7GBJJWsOmSxbhhQzG9If0JpvlakLR9bPz54', 1, '2024-11-27 06:46:07', 'used', NULL, '2024-11-26 06:46:07', '2025-06-08 04:53:21'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODQ1NTEwLCJleHAiOjE3MzI5MzE5MTB9.f6oNkpfv5cZxIEA4xstidzRPL5G93AB3OAsYH-JOb7w', 1, '2024-11-30 01:58:30', 'used', NULL, '2024-11-29 01:58:30', '2025-06-08 04:53:21'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODQ1NjI1LCJleHAiOjE3MzI5MzIwMjV9.5wLhUMjvUBAc507_SKa90wxiUCfkkhzJa4zn0-AT7B4', 1, '2024-11-30 02:00:25', 'used', NULL, '2024-11-29 02:00:25', '2025-06-08 04:53:21'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODQ1ODQzLCJleHAiOjE3MzI5MzIyNDN9.m9XLiOw4670nhOkmFLx0rTsXoHYdy6hRACLF4ryJcvg', 1, '2024-11-30 02:04:03', 'used', NULL, '2024-11-29 02:04:03', '2025-06-08 04:53:21'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUyODQwLCJleHAiOjE3MzI5MzkyNDB9.zRW-ZLwDP7O6QdKB0OBo79-gmzwnZY1F9kb3Pr_9N_A', 1, '2024-11-30 04:00:40', 'used', NULL, '2024-11-29 04:00:40', '2025-06-08 04:53:21'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUzMDE0LCJleHAiOjE3MzI5Mzk0MTR9.uQDdIW0RXR1pxu-i58TzCrOtqaG7aiq0HEZOQmHdm1s', 1, '2024-11-30 04:03:34', 'used', NULL, '2024-11-29 04:03:34', '2025-06-08 04:53:21'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUzMDgzLCJleHAiOjE3MzI5Mzk0ODN9.zKfyzvkYO7d_VhS7E6HvOu8qj1KNR_1J4n3MzmD3frc', 1, '2024-11-30 04:04:43', 'used', NULL, '2024-11-29 04:04:43', '2025-06-08 04:53:21'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUzMTkxLCJleHAiOjE3MzI5Mzk1OTF9.ZgixX79Aa94ZTTSDHfWD0S_UW6DSG4ySb5rTsjv0E6k', 1, '2024-11-30 04:06:31', 'used', NULL, '2024-11-29 04:06:31', '2025-06-08 04:53:21'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUzMzE2LCJleHAiOjE3MzI5Mzk3MTZ9.U7pU_XQ1iot8kXYLOIXpLNLDsZqSlT98wy_HH9wtCgg', 1, '2024-11-30 04:08:36', 'used', NULL, '2024-11-29 04:08:36', '2025-06-08 04:53:21'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyODUzNDY4LCJleHAiOjE3MzI5Mzk4Njh9.Na1eKL3dIYdjxRrXNM3nybTGH0SqgvOSEUWes99G1qg', 2, '2024-11-30 04:11:08', 'used', NULL, '2024-11-29 04:11:08', '2024-12-01 21:08:15'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODUzNTczLCJleHAiOjE3MzI5Mzk5NzN9.4kTJkpz6OsoxWdwyOZQTw1gnN356P7I3l3DEAsDdAps', 1, '2024-11-30 04:12:53', 'used', NULL, '2024-11-29 04:12:53', '2025-06-08 04:53:21'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMzMDg4Mzc1LCJleHAiOjE3MzMxNzQ3NzV9.CK4kziOagwOej_5bb60YjrM03p93OIpIVe1ECGK4A90', 3, '2024-12-02 21:26:15', 'used', NULL, '2024-12-01 21:26:15', '2024-12-01 23:06:05'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzMDk0ODcxLCJleHAiOjE3MzMxODEyNzF9.KeFxgt2z_dYVFGnsYXbxF1Z5UwfbYvKbjXeNED3HKVI', 1, '2024-12-02 23:14:31', 'used', NULL, '2024-12-01 23:14:31', '2025-06-08 04:53:21'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzMTgyNTUzLCJleHAiOjE3MzMyNjg5NTN9.Ig36vRPqyj47YkcjSvUOCiBoFTIS5SsGOCk6M2z3esM', 1, '2024-12-03 23:35:53', 'used', NULL, '2024-12-02 23:35:53', '2025-06-08 04:53:21'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzMzY4Nzk5LCJleHAiOjE3MzM0NTUxOTl9.KyYOvOexp6i96AcCXA2pn-FsZnXIqnhtZqk5vwy1CG8', 1, '2024-12-06 03:19:59', 'used', NULL, '2024-12-05 03:19:59', '2025-06-08 04:53:21'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNTIyMDczLCJleHAiOjE3MzM2MDg0NzN9.gniRMRKCrWNURZ7e4q3H_wsmduVIU7Gh0Os5BS_qSN0', 1, '2024-12-07 21:54:33', 'used', NULL, '2024-12-06 21:54:33', '2025-06-08 04:53:21'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0MDE1OTM0LCJleHAiOjE3MzQxMDIzMzR9.h4t_LSyOYlMGAvbJ2NxhznymrQ1CgG3QpN1rqcIGI7o', 1, '2024-12-13 15:05:34', 'used', NULL, '2024-12-12 15:05:34', '2025-06-08 04:53:21'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NDE1NjM0LCJleHAiOjE3MzU1MDIwMzR9.SZjZRxnwSTFh-n0BWn5c5xeb4ys6Xl1K3AZlrOfdPbc', 1, '2024-12-29 19:53:54', 'used', NULL, '2024-12-28 19:53:54', '2025-06-08 04:53:21'),
(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NjgwNDE4LCJleHAiOjE3MzU3NjY4MTh9.v0R3H-4jw0aK6JPQ8qcR22P-iTKSxQLXpRavs1-j1tM', 1, '2025-01-01 21:26:58', 'used', NULL, '2024-12-31 21:26:58', '2025-06-08 04:53:21'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1ODMxNDcyLCJleHAiOjE3MzU5MTc4NzJ9.Lpg89Mps5Ff9BHdO7h56qPS_b3OpvIyDaflHrQ2aT50', 1, '2025-01-03 15:24:32', 'used', NULL, '2025-01-02 15:24:32', '2025-06-08 04:53:21'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM3MjMyNTg0LCJleHAiOjE3MzczMTg5ODR9.L2g8VotB_WPQXNJFAOonwW3ZkJHM0s546MfbjaDEgxM', 1, '2025-01-19 20:36:24', 'used', NULL, '2025-01-18 20:36:24', '2025-06-08 04:53:21'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ5MzUwOTQ3LCJleHAiOjE3NDk0MzczNDd9.hOxm191qIzaTCBE4_cvNeKxvlZjcKw_1iQhU5k2xDp8', 4, '2025-06-09 02:49:07', 'used', NULL, '2025-06-08 02:49:08', '2025-06-08 04:22:55'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MzU2Mzg1LCJleHAiOjE3NDk0NDI3ODV9.e_qwLg6x-GAsPBfs5NXGO4k55TLCEp3tXmdf-VFfBMk', 1, '2025-06-09 04:19:45', 'used', NULL, '2025-06-08 04:19:45', '2025-06-08 04:53:21'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MzU4NTIzLCJleHAiOjE3NDk0NDQ5MjN9.JHPA-gyudSkcCiN7ZUXgklzwcGzwebs7DBmutM2KFC4', 1, '2025-06-09 04:55:23', 'used', NULL, '2025-06-08 04:55:23', '2025-06-09 23:49:44'),
(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ5MzYxODI4LCJleHAiOjE3NDk0NDgyMjh9.788O_KIqqXaa7EQscsqd9gFoOdWU_d-Hw17HK0wp-B4', 4, '2025-06-09 05:50:28', 'active', NULL, '2025-06-08 05:50:28', '2025-06-08 05:50:28'),
(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5NTEyOTg0LCJleHAiOjE3NDk1OTkzODR9.d3c_6WlTu8mxXwh405XoKInBt7OHShuw1JpPcquuMmQ', 1, '2025-06-10 23:49:44', 'active', NULL, '2025-06-09 23:49:44', '2025-06-09 23:49:44');

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_password` longtext DEFAULT NULL,
  `transit_number` int(5) NOT NULL,
  `institution_number` int(10) NOT NULL,
  `status` enum('active','pending','closed') NOT NULL DEFAULT 'pending',
  `currency_type` enum('cad','pounds','usd','naira') NOT NULL DEFAULT 'usd',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bank_account_balances`
--

CREATE TABLE `bank_account_balances` (
  `id` int(11) NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(11,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bank_account_id` bigint(20) UNSIGNED NOT NULL,
  `reference_number` varchar(255) NOT NULL,
  `bill_name` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `frequency` enum('week','month','year','day') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bank_account_id` bigint(20) UNSIGNED NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `exp_date` datetime NOT NULL,
  `cvv` varchar(3) NOT NULL,
  `card_type` enum('visa','master') NOT NULL,
  `status` enum('active','pending','suspended') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `state_id` bigint(20) UNSIGNED NOT NULL,
  `city` varchar(255) NOT NULL,
  `abbreviation` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bank_account_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `frequency` enum('week','month','year','day') DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `auto_deposit` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country` varchar(255) NOT NULL,
  `abbreviation` varchar(255) NOT NULL,
  `phone_code` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240729150809-create-user.js'),
('20240730000548-create-access-token.js'),
('20240730220158-create-bank-account.js'),
('20240907222021-create-country.js'),
('20240907222115-create-state.js'),
('20240907222157-create-city.js'),
('20240908015444-create-card.js'),
('20240908045231-create-transaction-history.js'),
('20240908045530-create-bank-account-balance.js'),
('20240910040145-create-bill.js'),
('20240910043221-create-contact.js');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `state` varchar(255) NOT NULL,
  `abbreviation` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_histories`
--

CREATE TABLE `transaction_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction` varchar(255) NOT NULL,
  `is_expense` tinyint(1) NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `balance` decimal(11,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `phone` mediumtext NOT NULL,
  `address` longtext DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `first_name`, `last_name`, `password`, `phone`, `address`, `is_active`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'bchanan.boss@gmail.com', '@benchanan08', 'Benchanan', 'Ken-Idehen', '$2a$10$G7XETyT/VVnWdSpxlb8.Rut7LlVyho.Spn98Q8Do5Qu7oI.iIWFqi', '6393849638', NULL, 1, NULL, '2024-11-26 04:43:48', '2024-11-26 04:43:48'),
(2, 'dums@gmail.com', '@dums', 'Dumski', 'Idehen', '$2a$10$sVzNF5p2U1olJMPW0sc09OeuKPFkzxFw.lnXLo5OqWx0/xgI0UAHC', '6395258865', NULL, 1, NULL, '2024-11-29 04:11:08', '2024-11-29 04:11:08'),
(3, 'dev@pixlr.com', '@@pixlrdeb', 'Developer', 'Account', '$2a$10$0Bd2ULvy5psV99C7m7Zgleq4JH8QqZJL7UDnMSfnvjzmBSGulpbHS', '6393849638', NULL, 1, NULL, '2024-12-01 21:26:15', '2024-12-01 21:26:15'),
(4, 'ben@mail.com', '@ben_chanan', 'Ben', 'Ken', '$2a$10$f14/X1T5kJFFr59am41/Ke5il5kLstzY.fCwWJs1JX3um3g6LVKSq', '08036703674', NULL, 1, NULL, '2025-06-08 02:49:07', '2025-06-08 02:49:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bank_account_balances`
--
ALTER TABLE `bank_account_balances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `card_id` (`card_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_account_id` (`bank_account_id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_account_id` (`bank_account_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_account_id` (`bank_account_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `transaction_histories`
--
ALTER TABLE `transaction_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `card_id` (`card_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_tokens`
--
ALTER TABLE `access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bank_account_balances`
--
ALTER TABLE `bank_account_balances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_histories`
--
ALTER TABLE `transaction_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD CONSTRAINT `access_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD CONSTRAINT `bank_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `bank_account_balances`
--
ALTER TABLE `bank_account_balances`
  ADD CONSTRAINT `bank_account_balances_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `states`
--
ALTER TABLE `states`
  ADD CONSTRAINT `states_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaction_histories`
--
ALTER TABLE `transaction_histories`
  ADD CONSTRAINT `transaction_histories_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

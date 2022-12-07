-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Gru 2022, 09:23
-- Wersja serwera: 10.4.19-MariaDB
-- Wersja PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `projekt_zespolowy`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `activities`
--

INSERT INTO `activities` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'activity 1', 'opis activity 1', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(2, 'activity 2', 'opis activity 2', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(3, 'activity 3', 'opis activity 3', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `building_number` varchar(5) NOT NULL,
  `apartment_number` varchar(5) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `street_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `addresses`
--

INSERT INTO `addresses` (`id`, `building_number`, `apartment_number`, `createdAt`, `updatedAt`, `street_id`) VALUES
(1, '3', NULL, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1),
(2, '15', '3', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1),
(3, '140', '2', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 'Artykuł 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  1', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 2),
(2, 'Artykuł 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  2', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3),
(3, 'Artykuł 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  3', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `voivodeship_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `cities`
--

INSERT INTO `cities` (`id`, `name`, `createdAt`, `updatedAt`, `voivodeship_id`) VALUES
(1, 'Lublin', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `code` varchar(5) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'Poland', 'PL', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `deparments`
--

CREATE TABLE `deparments` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `deparments`
--

INSERT INTO `deparments` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'dep1', 'opis department 1', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(2, 'dep2', 'opis department 2', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(3, 'dep3', 'opis department 3', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `deparment_has_addresses`
--

CREATE TABLE `deparment_has_addresses` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `address_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `deparment_has_addresses`
--

INSERT INTO `deparment_has_addresses` (`id`, `createdAt`, `updatedAt`, `address_id`, `department_id`) VALUES
(1, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1, 1),
(2, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 2, 2),
(3, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `harmonograms`
--

CREATE TABLE `harmonograms` (
  `id` int(11) NOT NULL,
  `begin_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `admin_consent` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `serial_number` varchar(45) NOT NULL,
  `possesion_date` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `item_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `items`
--

INSERT INTO `items` (`id`, `name`, `serial_number`, `possesion_date`, `createdAt`, `updatedAt`, `item_type_id`) VALUES
(1, 'Kule', '8', '2022-12-07', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3),
(2, 'Wózek', '20', '2022-12-07', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1),
(3, 'Kule', '15', '2022-12-07', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `item_types`
--

CREATE TABLE `item_types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `item_types`
--

INSERT INTO `item_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Personalny', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(2, 'Specjalny', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(3, 'Standardowy', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(2, 'employee', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(3, 'admin', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `department_has_address_id` int(11) NOT NULL,
  `room_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `capacity`, `createdAt`, `updatedAt`, `department_has_address_id`, `room_type_id`) VALUES
(1, 'S102', 8, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1, 1),
(2, 'G204', 20, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 2, 2),
(3, 'A21', 15, '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Wykładowa', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(2, 'Ćwiczeniowa', '2022-12-07 08:21:55', '2022-12-07 08:21:55'),
(3, 'Standardowa', '2022-12-07 08:21:55', '2022-12-07 08:21:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `harmonogram_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `streets`
--

CREATE TABLE `streets` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `streets`
--

INSERT INTO `streets` (`id`, `name`, `createdAt`, `updatedAt`, `city_id`) VALUES
(1, 'Jana Sawy', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(35) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `birth_date` date NOT NULL,
  `pesel` varchar(11) NOT NULL,
  `contact_number` varchar(9) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `birth_date`, `pesel`, `contact_number`, `createdAt`, `updatedAt`, `role_id`, `address_id`) VALUES
(1, 'jan', 'jan@kowalski.pl', '$2a$08$HHafX.QQ3pfwCIq6Or8H7uMuLfhgJ9vPvUxX.JNe3nKVFSER0yHt2', 'Jan', 'Kowalski', '2022-12-07', '02321299999', '505303202', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3, NULL),
(2, 'adam', 'adam@nowak.pl', '$2a$08$dOss1TzwH8RoB0GDkMS91O3f9Q.IxYtumTTBQrctgMGrsfvmB9ECa', 'Adam', 'Nowak', '2022-12-07', '98021099999', '503503202', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 2, NULL),
(3, 'anna', 'anna@grodzka.pl', '$2a$08$tw13uwmpH8x8u6uCAkNe1eB6z8YfMUIyBDv0KhU.86mOMHgpXbLsm', 'Anna', 'Grodzka', '2022-12-07', '70081523235', '098098098', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_descriptions`
--

CREATE TABLE `user_descriptions` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user_descriptions`
--

INSERT INTO `user_descriptions` (`id`, `title`, `description`, `author`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 'zdolny', 'lorem ipsum', '1', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3),
(2, 'nagana', 'opis użytkownika', '1', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 2),
(3, 'pochwała', 'bardzo dobrze', '2', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_has_schedule`
--

CREATE TABLE `user_has_schedule` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `voivodeships`
--

CREATE TABLE `voivodeships` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `voivodeships`
--

INSERT INTO `voivodeships` (`id`, `name`, `code`, `createdAt`, `updatedAt`, `country_id`) VALUES
(1, 'Lubelskie', 'Lub', '2022-12-07 08:21:55', '2022-12-07 08:21:55', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `street_id` (`street_id`);

--
-- Indeksy dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `voivodeship_id` (`voivodeship_id`);

--
-- Indeksy dla tabeli `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `country_name` (`name`),
  ADD UNIQUE KEY `country_id` (`code`);

--
-- Indeksy dla tabeli `deparments`
--
ALTER TABLE `deparments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `department_name` (`name`);

--
-- Indeksy dla tabeli `deparment_has_addresses`
--
ALTER TABLE `deparment_has_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indeksy dla tabeli `harmonograms`
--
ALTER TABLE `harmonograms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_type_id` (`item_type_id`);

--
-- Indeksy dla tabeli `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_type_name` (`name`);

--
-- Indeksy dla tabeli `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`name`);

--
-- Indeksy dla tabeli `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room_name` (`name`),
  ADD KEY `department_has_address_id` (`department_has_address_id`),
  ADD KEY `room_type_id` (`room_type_id`);

--
-- Indeksy dla tabeli `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room_type_name` (`name`);

--
-- Indeksy dla tabeli `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `harmonogram_id` (`harmonogram_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indeksy dla tabeli `streets`
--
ALTER TABLE `streets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pesel` (`pesel`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indeksy dla tabeli `user_descriptions`
--
ALTER TABLE `user_descriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `user_has_schedule`
--
ALTER TABLE `user_has_schedule`
  ADD PRIMARY KEY (`user_id`,`schedule_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indeksy dla tabeli `voivodeships`
--
ALTER TABLE `voivodeships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `voivodeship_name` (`name`),
  ADD KEY `country_id` (`country_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `deparments`
--
ALTER TABLE `deparments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `deparment_has_addresses`
--
ALTER TABLE `deparment_has_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `harmonograms`
--
ALTER TABLE `harmonograms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `streets`
--
ALTER TABLE `streets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `user_descriptions`
--
ALTER TABLE `user_descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `voivodeships`
--
ALTER TABLE `voivodeships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`street_id`) REFERENCES `streets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`voivodeship_id`) REFERENCES `voivodeships` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `deparment_has_addresses`
--
ALTER TABLE `deparment_has_addresses`
  ADD CONSTRAINT `deparment_has_addresses_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `deparment_has_addresses_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `deparments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `harmonograms`
--
ALTER TABLE `harmonograms`
  ADD CONSTRAINT `harmonograms_ibfk_4` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `harmonograms_ibfk_5` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `harmonograms_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_3` FOREIGN KEY (`department_has_address_id`) REFERENCES `deparment_has_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_4` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`harmonogram_id`) REFERENCES `harmonograms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_4` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `streets`
--
ALTER TABLE `streets`
  ADD CONSTRAINT `streets_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `user_descriptions`
--
ALTER TABLE `user_descriptions`
  ADD CONSTRAINT `user_descriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `user_has_schedule`
--
ALTER TABLE `user_has_schedule`
  ADD CONSTRAINT `user_has_schedule_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_has_schedule_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `voivodeships`
--
ALTER TABLE `voivodeships`
  ADD CONSTRAINT `voivodeships_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

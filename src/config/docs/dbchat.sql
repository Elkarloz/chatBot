-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2023 a las 06:00:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbchat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbladmin`
--

CREATE TABLE `tbladmin` (
  `AdmUser` varchar(255) DEFAULT NULL,
  `AdmPass` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tbladmin`
--

INSERT INTO `tbladmin` (`AdmUser`, `AdmPass`) VALUES
('admin', '$2b$10$JcP3j0wRC14Mt59GpOxuGOjfIa75mbtagvnxeTdPK1mYUNrE6mM6O');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblchat`
--

CREATE TABLE `tblchat` (
  `chatId` int(11) NOT NULL,
  `chatClient` int(11) NOT NULL,
  `chatBody` text DEFAULT NULL,
  `chatDate` datetime NOT NULL DEFAULT current_timestamp(),
  `chatStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblclient`
--

CREATE TABLE `tblclient` (
  `CliId` int(11) NOT NULL,
  `CliName` varchar(255) DEFAULT NULL,
  `CliAddress` varchar(255) DEFAULT NULL,
  `CliPhone` varchar(255) DEFAULT NULL,
  `CliLocation` text DEFAULT NULL,
  `CliObservation` text DEFAULT NULL,
  `CliDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldelivery`
--

CREATE TABLE `tbldelivery` (
  `DelId` int(11) NOT NULL,
  `DelName` varchar(255) DEFAULT NULL,
  `DelPhone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblresponse`
--

CREATE TABLE `tblresponse` (
  `ResId` int(11) NOT NULL,
  `ResTitle` varchar(255) DEFAULT NULL,
  `ResResponse` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblsale`
--

CREATE TABLE `tblsale` (
  `SaleId` int(11) NOT NULL,
  `SaleDelivery` int(11) NOT NULL,
  `SaleClient` int(11) NOT NULL,
  `SaleDate` date NOT NULL DEFAULT current_timestamp(),
  `SaleResume` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tblchat`
--
ALTER TABLE `tblchat`
  ADD PRIMARY KEY (`chatId`) USING BTREE,
  ADD KEY `clientId` (`chatClient`) USING BTREE;

--
-- Indices de la tabla `tblclient`
--
ALTER TABLE `tblclient`
  ADD PRIMARY KEY (`CliId`) USING BTREE;

--
-- Indices de la tabla `tbldelivery`
--
ALTER TABLE `tbldelivery`
  ADD PRIMARY KEY (`DelId`) USING BTREE;

--
-- Indices de la tabla `tblresponse`
--
ALTER TABLE `tblresponse`
  ADD PRIMARY KEY (`ResId`) USING BTREE;

--
-- Indices de la tabla `tblsale`
--
ALTER TABLE `tblsale`
  ADD PRIMARY KEY (`SaleId`),
  ADD KEY `SaleDelivery` (`SaleDelivery`),
  ADD KEY `SaleClient` (`SaleClient`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tblchat`
--
ALTER TABLE `tblchat`
  MODIFY `chatId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblclient`
--
ALTER TABLE `tblclient`
  MODIFY `CliId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbldelivery`
--
ALTER TABLE `tbldelivery`
  MODIFY `DelId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblresponse`
--
ALTER TABLE `tblresponse`
  MODIFY `ResId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblsale`
--
ALTER TABLE `tblsale`
  MODIFY `SaleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblsale`
--
ALTER TABLE `tblsale`
  ADD CONSTRAINT `tblsale_ibfk_1` FOREIGN KEY (`SaleClient`) REFERENCES `tblclient` (`CliId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

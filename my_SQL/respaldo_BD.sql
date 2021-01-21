-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: blore0txwork1nobrsy0-mysql.services.clever-cloud.com:3306
-- Generation Time: Jan 21, 2021 at 01:40 AM
-- Server version: 8.0.13-3
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blore0txwork1nobrsy0`
--

-- --------------------------------------------------------

--
-- Table structure for table `TIPO_LINEA`
--

CREATE TABLE `TIPO_LINEA` (
  `ID_LINEA` int(5) NOT NULL,
  `DESC_LINEA` varchar(200) DEFAULT NULL,
  `ID_MARCA` int(5) DEFAULT NULL,
  `ACTIVO` enum('S','N') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TIPO_LINEA`
--

INSERT INTO `TIPO_LINEA` (`ID_LINEA`, `DESC_LINEA`, `ID_MARCA`, `ACTIVO`) VALUES
(1, 'A1 Sportback', 1, 'S'),
(2, 'A3 Sedán', 1, 'S'),
(3, 'A3 cabrio', 1, 'S'),
(4, 'S3 Sedán', 1, 'S'),
(5, 'California', 2, 'S'),
(6, 'F430 Scuderia', 2, 'S'),
(7, '599 GTB', 2, 'S'),
(8, '575GT Zagato', 2, 'S'),
(9, 'EcoSport', 3, 'S'),
(10, 'Galaxy', 3, 'S'),
(11, 'Mustang', 3, 'S'),
(12, 'Fiesta', 3, 'S'),
(13, 'Bayon', 4, 'S'),
(14, 'Elantra', 4, 'S'),
(15, 'Genesis', 4, 'S'),
(16, 'Grand Santa Fe', 4, 'S'),
(17, 'Picanto', 5, 'S'),
(18, 'Sorento', 5, 'S'),
(19, 'Grand Carnival', 5, 'S'),
(20, 'Stinger', 5, 'S');

-- --------------------------------------------------------

--
-- Table structure for table `TIPO_MARCA`
--

CREATE TABLE `TIPO_MARCA` (
  `ID_MARCA` int(5) NOT NULL,
  `DESC_MARCA` varchar(200) DEFAULT NULL,
  `ACTIVO` enum('S','N') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TIPO_MARCA`
--

INSERT INTO `TIPO_MARCA` (`ID_MARCA`, `DESC_MARCA`, `ACTIVO`) VALUES
(1, 'Audi', 'S'),
(2, 'Ferrari', 'S'),
(3, 'Ford', 'S'),
(4, 'Hyundai', 'S'),
(5, 'Kia', 'S');

-- --------------------------------------------------------

--
-- Table structure for table `VEHICULOS`
--

CREATE TABLE `VEHICULOS` (
  `NRO_PLACA` varchar(20) NOT NULL,
  `ID_LINEA` int(5) DEFAULT NULL,
  `MODELO` enum('1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021') DEFAULT NULL,
  `FECHA_VEN_SEGURO` date DEFAULT NULL,
  `FECHA_VEN_TECNOMECANICA` date DEFAULT NULL,
  `FECHA_VEN_CONTRATODO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `VEHICULOS`
--

INSERT INTO `VEHICULOS` (`NRO_PLACA`, `ID_LINEA`, `MODELO`, `FECHA_VEN_SEGURO`, `FECHA_VEN_TECNOMECANICA`, `FECHA_VEN_CONTRATODO`) VALUES
('AAE-999', 3, '2010', '2010-02-15', '2010-04-21', '2010-10-11'),
('AEF-173', 1, '2020', '2020-01-16', '2020-01-13', '2021-01-10'),
('ASD-746', 8, '2015', '2015-05-30', '2017-03-20', '2018-12-24'),
('AUX-319', 12, '2012', '2012-08-01', '2012-11-26', '2012-12-31'),
('BAL-734', 1, '2006', '2006-02-15', '2006-04-21', '2006-10-11'),
('BDY-326', 5, '2020', '2020-05-30', '2020-03-20', '2020-12-24'),
('CAT-190', 18, '2003', '2003-01-01', '2003-05-01', '2003-08-01'),
('DFH-827', 3, '2021', '2021-03-16', '2021-06-13', '2022-01-10'),
('EOO-667', 13, '2014', '2014-08-01', '2014-11-26', '2014-12-31'),
('ERF-638', 6, '2000', '2000-05-30', '2000-03-20', '2000-12-24'),
('FFO-187', 8, '2013', '2013-02-04', '2013-04-09', '2013-10-03'),
('GHJ-546', 10, '2021', '2021-08-01', '2021-11-26', '2021-12-31'),
('HTE-348', 2, '2020', '2020-06-16', '2020-04-13', '2021-09-10'),
('ISS-094', 16, '2001', '2001-01-01', '2001-05-01', '2001-08-01'),
('IUU-111', 11, '2011', '2011-08-01', '2011-11-26', '2011-12-31'),
('JAC-777', 14, '2019', '2019-01-01', '2019-05-01', '2019-08-01'),
('LPÑ-091', 7, '2010', '2010-05-30', '2011-03-20', '2011-12-24'),
('MAM-082', 9, '2014', '2014-02-04', '2015-04-09', '2015-10-03'),
('OAL-744', 5, '2010', '2010-02-15', '2010-04-21', '2010-10-11'),
('PAC-301', 19, '2004', '2004-01-01', '2004-05-01', '2004-08-01'),
('PAM-309', 10, '2015', '2015-02-04', '2016-04-09', '2016-10-03'),
('PIT-029', 4, '2010', '2010-02-15', '2010-04-21', '2010-10-11'),
('PLS-343', 7, '2012', '2012-02-04', '2012-04-09', '2012-10-03'),
('SAR-897', 15, '2017', '2017-01-01', '2017-05-01', '2017-08-01'),
('SEB-634', 2, '2007', '2007-02-15', '2007-04-21', '2007-10-11'),
('SUB-407', 17, '2002', '2002-01-01', '2002-05-01', '2002-08-01'),
('TAF-402', 20, '2005', '2005-01-01', '2005-05-01', '2005-08-01'),
('WEY-109', 8, '2018', '2019-05-30', '2019-03-20', '2019-12-24'),
('XCV-987', 9, '2020', '2020-08-01', '2020-11-26', '2020-12-31'),
('YAA-268', 6, '2011', '2011-02-15', '2011-04-21', '2011-10-11'),
('YIA-923', 4, '2020', '2020-01-16', '2020-05-13', '2020-10-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `TIPO_LINEA`
--
ALTER TABLE `TIPO_LINEA`
  ADD PRIMARY KEY (`ID_LINEA`),
  ADD KEY `ID_MARCA` (`ID_MARCA`);

--
-- Indexes for table `TIPO_MARCA`
--
ALTER TABLE `TIPO_MARCA`
  ADD PRIMARY KEY (`ID_MARCA`);

--
-- Indexes for table `VEHICULOS`
--
ALTER TABLE `VEHICULOS`
  ADD PRIMARY KEY (`NRO_PLACA`),
  ADD KEY `ID_LINEA` (`ID_LINEA`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `TIPO_LINEA`
--
ALTER TABLE `TIPO_LINEA`
  MODIFY `ID_LINEA` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `TIPO_MARCA`
--
ALTER TABLE `TIPO_MARCA`
  MODIFY `ID_MARCA` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `TIPO_LINEA`
--
ALTER TABLE `TIPO_LINEA`
  ADD CONSTRAINT `TIPO_LINEA_ibfk_1` FOREIGN KEY (`ID_MARCA`) REFERENCES `TIPO_MARCA` (`id_marca`) ON UPDATE CASCADE;

--
-- Constraints for table `VEHICULOS`
--
ALTER TABLE `VEHICULOS`
  ADD CONSTRAINT `VEHICULOS_ibfk_1` FOREIGN KEY (`ID_LINEA`) REFERENCES `TIPO_LINEA` (`id_linea`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

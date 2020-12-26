CREATE DATABASE  IF NOT EXISTS `otodna-patients` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `otodna-patients`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: otodna-patients
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `allergy_severity`
--

DROP TABLE IF EXISTS `allergy_severity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `allergy_severity` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy_severity`
--

LOCK TABLES `allergy_severity` WRITE;
/*!40000 ALTER TABLE `allergy_severity` DISABLE KEYS */;
INSERT INTO `allergy_severity` VALUES (1,'Mild'),(2,'Mild To Modrate'),(3,'Modrate'),(4,'Modrate To Severe'),(5,'Severe'),(6,'Fatal');
/*!40000 ALTER TABLE `allergy_severity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergy_status`
--

DROP TABLE IF EXISTS `allergy_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `allergy_status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy_status`
--

LOCK TABLES `allergy_status` WRITE;
/*!40000 ALTER TABLE `allergy_status` DISABLE KEYS */;
INSERT INTO `allergy_status` VALUES (1,'Active'),(2,'Inactive'),(3,'Resolved');
/*!40000 ALTER TABLE `allergy_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergy_type`
--

DROP TABLE IF EXISTS `allergy_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `allergy_type` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy_type`
--

LOCK TABLES `allergy_type` WRITE;
/*!40000 ALTER TABLE `allergy_type` DISABLE KEYS */;
INSERT INTO `allergy_type` VALUES (1,'Unknown'),(2,'Food'),(3,'Enviromental'),(4,'Medication');
/*!40000 ALTER TABLE `allergy_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_member_relation_type`
--

DROP TABLE IF EXISTS `family_member_relation_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `family_member_relation_type` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `family_member_relation_type`
--

LOCK TABLES `family_member_relation_type` WRITE;
/*!40000 ALTER TABLE `family_member_relation_type` DISABLE KEYS */;
INSERT INTO `family_member_relation_type` VALUES (1,'Father'),(2,'Mother'),(3,'Brother'),(4,'Sister'),(5,'Grand Father'),(6,'Grand Mother'),(7,'Uncle');
/*!40000 ALTER TABLE `family_member_relation_type` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `immunization_status`
--

DROP TABLE IF EXISTS `immunization_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `immunization_status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `immunization_status`
--

LOCK TABLES `immunization_status` WRITE;
/*!40000 ALTER TABLE `immunization_status` DISABLE KEYS */;
INSERT INTO `immunization_status` VALUES (1,'Active'),(2,'Inactive'),(3,'Pending'),(4,'Completed');
/*!40000 ALTER TABLE `immunization_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication_status`
--

DROP TABLE IF EXISTS `medication_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `medication_status` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication_status`
--

LOCK TABLES `medication_status` WRITE;
/*!40000 ALTER TABLE `medication_status` DISABLE KEYS */;
INSERT INTO `medication_status` VALUES (1,'Active'),(2,'On Hold'),(3,'Prior History'),(4,'No Longer Active');
/*!40000 ALTER TABLE `medication_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter_value`
--

DROP TABLE IF EXISTS `parameter_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `parameter_value` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parameter_name` varchar(250) NOT NULL,
  `sub_parameter_name` varchar(250) DEFAULT NULL,
  `parameter_type` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `ear` char(5) NOT NULL,
  `session_test_id` int DEFAULT NULL,
  `session_treatment_id` int DEFAULT NULL,
  `session_pathology_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `equipment_parameter_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `equipment_parameter_value` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parameter_name` varchar(45) NOT NULL,
  `sub_parameter_name` varchar(45) DEFAULT NULL,
  `parameter_type` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `ear` char(5) NOT NULL,
  `equipment_test_id` int DEFAULT NULL,
  `equipment_treatment_id` int DEFAULT NULL,
  `equipment_pathology_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_number` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) NOT NULL,
  `date_of_birth` dateTime NOT NULL,
  `gender` char(1) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `team_id` int NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `created_at` dateTime NOT NULL,
  `last_modified_by` varchar(45) NOT NULL,
  `last_modified_at` dateTime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_allergy`
--

DROP TABLE IF EXISTS `patient_allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_allergy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `allergy_type_id` int NOT NULL,
  `substance` varchar(45) DEFAULT NULL,
  `reaction` varchar(45) DEFAULT NULL,
  `allergy_severity_id` int NOT NULL,
  `allergy_status_id` int NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_family_member`
--

DROP TABLE IF EXISTS `patient_family_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_family_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_member_name` varchar(45) NOT NULL,
  `family_member_relation_type_id` int NOT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_immunization`
--

DROP TABLE IF EXISTS `patient_immunization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_immunization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vaccine_name` varchar(45) NOT NULL,
  `immunization_status_id` int NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_referral`
--

DROP TABLE IF EXISTS `patient_referral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_referral` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `team_name` varchar(45) NOT NULL,
  `team_id` int NOT NULL,
  `date` dateTime NOT NULL,
  `active` varchar(5) DEFAULT 'true',
  `referral_message` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` dateTime NOT NULL,
  `team_id` int NOT NULL,
  `team_owner_id` int NOT NULL,
  `notification_text` varchar(500) DEFAULT NULL,
  `seen` varchar(5) DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `patient_lab_result`
--

DROP TABLE IF EXISTS `patient_lab_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_lab_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lab_test` varchar(45) NOT NULL,
  `value` int NOT NULL,
  `unit` varchar(10) NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_medical_info`
--

DROP TABLE IF EXISTS `patient_medical_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_medical_info` (
  `patient_id` int NOT NULL,
  `blood_type` varchar(3) DEFAULT NULL,
  `emergency_contact` varchar(45) DEFAULT NULL,
  `emergency_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_medication`
--

DROP TABLE IF EXISTS `patient_medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_medication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `medication` varchar(45) NOT NULL,
  `start_date` dateTime NOT NULL,
  `end_date` dateTime DEFAULT NULL,
  `quantity` int NOT NULL,
  `medication_status_id` int NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_problem`
--

DROP TABLE IF EXISTS `patient_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_problem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_status_id` int NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_session`
--

DROP TABLE IF EXISTS `patient_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `display_name` varchar(45) NOT NULL,
  `date` dateTime NOT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_at` dateTime DEFAULT NULL,
  `session_type_id` int NOT NULL,
  `performer` varchar(45) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  `department_id` int NOT NULL,
  `ended` varchar(5) DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_session_pathology`
--

DROP TABLE IF EXISTS `patient_session_pathology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_session_pathology` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desease_id` varchar(45) NOT NULL,
  `desease_name` varchar(45) NOT NULL,
  `ear` varchar(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_session_symptom`
--

DROP TABLE IF EXISTS `patient_session_symptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_session_symptom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_session_id` int NOT NULL,
  `ear` varchar(5) NOT NULL DEFAULT 'BOTH',
  `symptom_id` varchar(300) NOT NULL,
  `summary_name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_vital_record`
--

DROP TABLE IF EXISTS `patient_vital_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patient_vital_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vital_record_type_id` int NOT NULL,
  `vital_record_value` int NOT NULL,
  `noted_date` dateTime NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `problem_status`
--

DROP TABLE IF EXISTS `problem_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `problem_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_status`
--

LOCK TABLES `problem_status` WRITE;
/*!40000 ALTER TABLE `problem_status` DISABLE KEYS */;
INSERT INTO `problem_status` VALUES (1,'Active'),(2,'Inactive'),(3,'Resolved');
/*!40000 ALTER TABLE `problem_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_test`
--

DROP TABLE IF EXISTS `session_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `session_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_id` varchar(45) NOT NULL,
  `test_name` varchar(45) NOT NULL,
  `ear` varchar(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_test_equipment`
--

DROP TABLE IF EXISTS `session_test_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `session_test_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipment_id` varchar(45) NOT NULL,
  `equipment_name` varchar(45) NOT NULL,
  `session_test_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_treatment`
--

DROP TABLE IF EXISTS `session_treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `session_treatment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `treatment_id` varchar(45) NOT NULL,
  `treatment_name` varchar(45) NOT NULL,
  `candidancy` tinyint NOT NULL DEFAULT '0',
  `ear` varchar(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_treatment_equipment`
--

DROP TABLE IF EXISTS `session_treatment_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `session_treatment_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipment_id` varchar(45) NOT NULL,
  `equipment_name` varchar(45) NOT NULL,
  `session_treatment_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vital_record_type`
--

DROP TABLE IF EXISTS `vital_record_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `vital_record_type` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `unit` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clinical_history`
--

DROP TABLE IF EXISTS `clinical_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `clinical_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `treatment_id` varchar(45) DEFAULT NULL,
  `treatment_name` varchar(45) DEFAULT NULL,
  `pathology_id` varchar(45) DEFAULT NULL,
  `pathology_name` varchar(45) DEFAULT NULL,
  `ear` varchar(5) NOT NULL DEFAULT 'BOTH',
  `right_date` dateTime DEFAULT NULL,
  `left_date` dateTime DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `diagnosis_equipment`
--

DROP TABLE IF EXISTS `diagnosis_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `diagnosis_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipment_name` varchar(45) NOT NULL,
  `manufacturer_name` varchar(45) NOT NULL,
  `serial_number` int NOT NULL,
  `test_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- View structure for view `tests_count_by_department`
--

DROP VIEW IF EXISTS `tests_count_by_department`;

CREATE VIEW `tests_count_by_department` AS
    SELECT 
        `ps`.`department_id` AS `department_id`,
        `st`.`test_name` AS `test_name`,
        `st`.`test_id`,
        COUNT(`st`.`id`) AS `count`
    FROM
        (`session_test` `st` JOIN `patient_session` `ps` ON ((`ps`.`id` = `st`.`patient_session_id`)))
    GROUP BY `ps`.`department_id` , `st`.`test_name`,`st`.`test_id`
    ORDER BY `count` DESC;

--
-- View structure for view `pathologies_count_by_department`
--

DROP VIEW IF EXISTS `pathologies_count_by_department`;

CREATE VIEW `pathologies_count_by_department` AS
    SELECT 
        `ps`.`department_id` AS `department_id`,
        `sp`.`desease_name` AS `desease_name`,
        `sp`.`desease_id`,
        COUNT(`sp`.`id`) AS `count`
    FROM
        (`patient_session_pathology` `sp` JOIN `patient_session` `ps` ON ((`ps`.`id` = `sp`.`patient_session_id`)))
    GROUP BY `ps`.`department_id` , `sp`.`desease_name`,`sp`.`desease_id`
    ORDER BY `count` DESC;


--
-- View structure for view `treatments_count_by_department`
--

DROP VIEW IF EXISTS `treatments_count_by_department`;

CREATE VIEW `treatments_count_by_department` AS
    SELECT 
        `ps`.`department_id` AS `department_id`,
        `st`.`treatment_name` AS `treatment_name`,
        `st`.`treatment_id`,
        COUNT(`st`.`id`) AS `count`
    FROM
        (`session_treatment` `st` JOIN `patient_session` `ps` ON ((`ps`.`id` = `st`.`patient_session_id`)))
    WHERE `st`.`candidancy` = 0
    GROUP BY `ps`.`department_id` , `st`.`treatment_name`,`st`.`treatment_id`
    ORDER BY `count` DESC;


--
-- View structure for view `candidacies_count_by_department`
--

DROP VIEW IF EXISTS `candidacies_count_by_department`;

CREATE VIEW `candidacies_count_by_department` AS
    SELECT 
        `ps`.`department_id` AS `department_id`,
        `st`.`treatment_name` AS `treatment_name`,
        `st`.`treatment_id`,
        COUNT(`st`.`id`) AS `count`
    FROM
        (`session_treatment` `st` JOIN `patient_session` `ps` ON ((`ps`.`id` = `st`.`patient_session_id`)))
    WHERE `st`.`candidancy` = 1
    GROUP BY `ps`.`department_id` , `st`.`treatment_name`,`st`.`treatment_id`
    ORDER BY `count` DESC;


LOCK TABLES `vital_record_type` WRITE;
/*!40000 ALTER TABLE `vital_record_type` DISABLE KEYS */;
INSERT INTO `vital_record_type` VALUES (1,'Body Tempreture','°C'),(2,'Blood pressure','mmHg'),(3,'Heart Rate',' bpm'),(4,'Height','cm'),(5,'Respiration rate','breaths/m'),(6,'Weight','Kg'),(7,'Oxygen saturation','Percent');
/*!40000 ALTER TABLE `vital_record_type` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-08 23:32:50

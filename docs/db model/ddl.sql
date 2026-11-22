-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema otodna
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `otodna` ;

-- -----------------------------------------------------
-- Schema otodna
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `otodna` DEFAULT CHARACTER SET utf8 ;
USE `otodna` ;

-- -----------------------------------------------------
-- Table `otodna`.`patient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `middle_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `mobile` VARCHAR(45) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `country` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `team_id` INT NOT NULL,
  `created_by` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `last_modified_by` VARCHAR(45) NOT NULL,
  `last_modified_at` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_medical_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_medical_info` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_medical_info` (
  `patient_id` INT NOT NULL,
  `blood_type` VARCHAR(3) NULL,
  `emergency_contact` VARCHAR(45) NULL,
  `emergency_phone` VARCHAR(45) NULL,
  PRIMARY KEY (`patient_id`),
  CONSTRAINT `patient_medical_info_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`family_member_relation_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`family_member_relation_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`family_member_relation_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_family_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_family_member` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_family_member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `family_member_name` VARCHAR(45) NOT NULL,
  `family_member_relation_type_id` INT NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `family_member_relatio_relation_type_idx` (`family_member_relation_type_id` ASC) VISIBLE,
  INDEX `patient_family_member_patient_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `patient_family_member_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `family_member_relatio_relation_type`
    FOREIGN KEY (`family_member_relation_type_id`)
    REFERENCES `otodna`.`family_member_relation_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`vital_record_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`vital_record_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`vital_record_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `unit` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_vital_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_vital_record` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_vital_record` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vital_record_type_id` INT NOT NULL,
  `vital_record_value` INT NOT NULL,
  `noted_date` DATE NOT NULL,
  `comment` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_vital_record_record_type_idx` (`vital_record_type_id` ASC) VISIBLE,
  INDEX `patient_vital_record_patient_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `patient_vital_record_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `patient_vital_record_record_type`
    FOREIGN KEY (`vital_record_type_id`)
    REFERENCES `otodna`.`vital_record_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`allergy_severity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`allergy_severity` ;

CREATE TABLE IF NOT EXISTS `otodna`.`allergy_severity` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`allergy_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`allergy_status` ;

CREATE TABLE IF NOT EXISTS `otodna`.`allergy_status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`allergy_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`allergy_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`allergy_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_allergy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_allergy` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_allergy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `allergy_type_id` INT NOT NULL,
  `substance` VARCHAR(45) NULL,
  `reaction` VARCHAR(45) NULL,
  `allergy_severity_id` INT NOT NULL,
  `allergy_status_id` INT NOT NULL,
  `noted_date` DATE NOT NULL,
  `comment` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_allergy_patient_idx` (`patient_id` ASC) VISIBLE,
  INDEX `patient_allergy_allergy_severity_idx` (`allergy_severity_id` ASC) VISIBLE,
  INDEX `patient_allergy_allergy_status_idx` (`allergy_status_id` ASC) VISIBLE,
  INDEX `patient_allergy_allergy_type_idx` (`allergy_type_id` ASC) VISIBLE,
  CONSTRAINT `patient_allergy_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `patient_allergy_allergy_severity`
    FOREIGN KEY (`allergy_severity_id`)
    REFERENCES `otodna`.`allergy_severity` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `patient_allergy_allergy_status`
    FOREIGN KEY (`allergy_status_id`)
    REFERENCES `otodna`.`allergy_status` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `patient_allergy_allergy_type`
    FOREIGN KEY (`allergy_type_id`)
    REFERENCES `otodna`.`allergy_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_lab_result`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_lab_result` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_lab_result` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lab_test` VARCHAR(45) NOT NULL,
  `value` INT NOT NULL,
  `unit` VARCHAR(10) NOT NULL,
  `noted_date` DATE NOT NULL,
  `comment` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_lab_result_patient_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `patient_lab_result_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`immunization_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`immunization_status` ;

CREATE TABLE IF NOT EXISTS `otodna`.`immunization_status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_immunization`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_immunization` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_immunization` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vaccine_name` VARCHAR(45) NOT NULL,
  `immunization_status_id` INT NOT NULL,
  `noted_date` DATE NOT NULL,
  `comments` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_immunization_patient_idx` (`patient_id` ASC) VISIBLE,
  INDEX `patient_immunization_status_idx` (`immunization_status_id` ASC) VISIBLE,
  CONSTRAINT `patient_immunization_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `patient_immunization_status`
    FOREIGN KEY (`immunization_status_id`)
    REFERENCES `otodna`.`immunization_status` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`medication_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`medication_status` ;

CREATE TABLE IF NOT EXISTS `otodna`.`medication_status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_medication` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_medication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medication` VARCHAR(45) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `quantity` INT NOT NULL,
  `medication_status_id` INT NOT NULL,
  `noted_date` DATE NOT NULL,
  `comment` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_medication_patient_idx` (`patient_id` ASC) VISIBLE,
  INDEX `patient_medication_medication_status_idx` (`medication_status_id` ASC) VISIBLE,
  CONSTRAINT `patient_medication_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `patient_medication_medication_status`
    FOREIGN KEY (`medication_status_id`)
    REFERENCES `otodna`.`medication_status` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`problem_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`problem_status` ;

CREATE TABLE IF NOT EXISTS `otodna`.`problem_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_problem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_problem` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_problem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `problem_status_id` INT NOT NULL,
  `noted_date` DATE NOT NULL,
  `comment` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_problem_patient_idx` (`patient_id` ASC) VISIBLE,
  INDEX `patient_problem_problem_status_idx` (`problem_status_id` ASC) VISIBLE,
  CONSTRAINT `patient_problem_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `patient_problem_problem_status`
    FOREIGN KEY (`problem_status_id`)
    REFERENCES `otodna`.`problem_status` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`category` ;

CREATE TABLE IF NOT EXISTS `otodna`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL DEFAULT 'TESTS',
  `type` VARCHAR(45) NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  `category_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_parent_category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_parent_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `otodna`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`test_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`test_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`test_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`test`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`test` ;

CREATE TABLE IF NOT EXISTS `otodna`.`test` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `test_type_id` INT NOT NULL,
  `per_ear` CHAR(1) NOT NULL,
  `category_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `test_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `test_test_type_idx` (`test_type_id` ASC) VISIBLE,
  CONSTRAINT `test_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `otodna`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `test_test_type`
    FOREIGN KEY (`test_type_id`)
    REFERENCES `otodna`.`test_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`treatment_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`treatment_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`treatment_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`treatment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`treatment` ;

CREATE TABLE IF NOT EXISTS `otodna`.`treatment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `per_ear` CHAR(1) NOT NULL,
  `treatment_type_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `treatment_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `treatment_treatment_type_idx` (`treatment_type_id` ASC) VISIBLE,
  CONSTRAINT `treatment_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `otodna`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `treatment_treatment_type`
    FOREIGN KEY (`treatment_type_id`)
    REFERENCES `otodna`.`treatment_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`parameter_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`parameter_type` ;

CREATE TABLE IF NOT EXISTS `otodna`.`parameter_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`parameter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`parameter` ;

CREATE TABLE IF NOT EXISTS `otodna`.`parameter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parameter_type_id` INT NOT NULL,
  `units` VARCHAR(100) NULL,
  `minimum` INT NOT NULL,
  `maximum` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  `test_id` INT NULL,
  `treatment_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `text_parameter_test_idx` (`test_id` ASC) VISIBLE,
  INDEX `text_parameter_treatment_idx` (`treatment_id` ASC) VISIBLE,
  INDEX `parameter_parameter_type_idx` (`parameter_type_id` ASC) VISIBLE,
  CONSTRAINT `parameter_test`
    FOREIGN KEY (`test_id`)
    REFERENCES `otodna`.`test` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `parameter_treatment`
    FOREIGN KEY (`treatment_id`)
    REFERENCES `otodna`.`treatment` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `parameter_parameter_type`
    FOREIGN KEY (`parameter_type_id`)
    REFERENCES `otodna`.`parameter_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`list_parameter_value`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`list_parameter_value` ;

CREATE TABLE IF NOT EXISTS `otodna`.`list_parameter_value` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parameter_id` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `list_parameter_value_parameter_idx` (`parameter_id` ASC) VISIBLE,
  CONSTRAINT `list_parameter_value_parameter`
    FOREIGN KEY (`parameter_id`)
    REFERENCES `otodna`.`parameter` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`graph_parameter_axis_point`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`graph_parameter_axis_point` ;

CREATE TABLE IF NOT EXISTS `otodna`.`graph_parameter_axis_point` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `axis` CHAR(1) NOT NULL,
  `parameter_id` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `graph_parameter_axis_point_parameter_idx` (`parameter_id` ASC) VISIBLE,
  CONSTRAINT `graph_parameter_axis_point_parameter`
    FOREIGN KEY (`parameter_id`)
    REFERENCES `otodna`.`parameter` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_session` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `display_name` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `created_by` VARCHAR(45) NULL,
  `created_at` DATE NULL,
  `session_type_id` INT NOT NULL,
  `performer` VARCHAR(45) NULL,
  `notes` VARCHAR(500) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_session_patient_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `patient_session_patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `otodna`.`patient` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`session_test`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`session_test` ;

CREATE TABLE IF NOT EXISTS `otodna`.`session_test` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `test_id` INT NOT NULL,
  `test_name` VARCHAR(45) NOT NULL,
  `ear` VARCHAR(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `session_test_patient_session_idx` (`patient_session_id` ASC) VISIBLE,
  CONSTRAINT `session_test_patient_session`
    FOREIGN KEY (`patient_session_id`)
    REFERENCES `otodna`.`patient_session` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`session_treatment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`session_treatment` ;

CREATE TABLE IF NOT EXISTS `otodna`.`session_treatment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `treatment_id` INT NOT NULL,
  `treatment_name` VARCHAR(45) NOT NULL,
  `candidancy` TINYINT NOT NULL DEFAULT 0,
  `ear` VARCHAR(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `session_treatment_patient_session_idx` (`patient_session_id` ASC) VISIBLE,
  CONSTRAINT `session_treatment_patient_session`
    FOREIGN KEY (`patient_session_id`)
    REFERENCES `otodna`.`patient_session` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`parameter_value`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`parameter_value` ;

CREATE TABLE IF NOT EXISTS `otodna`.`parameter_value` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parameter_id` INT NOT NULL,
  `parameter_name` VARCHAR(45) NOT NULL,
  `parameter_type` VARCHAR(45) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  `unit` VARCHAR(45) NULL,
  `session_test_id` INT NULL,
  `session_treatment_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `parameter_value_session_test_idx` (`session_test_id` ASC) VISIBLE,
  INDEX `parameter_value_session_treatment_idx` (`session_treatment_id` ASC) VISIBLE,
  CONSTRAINT `parameter_value_session_test`
    FOREIGN KEY (`session_test_id`)
    REFERENCES `otodna`.`session_test` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `parameter_value_session_treatment`
    FOREIGN KEY (`session_treatment_id`)
    REFERENCES `otodna`.`session_treatment` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`graph_parameter_point`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`graph_parameter_point` ;

CREATE TABLE IF NOT EXISTS `otodna`.`graph_parameter_point` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parameter_value_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_session_symptom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_session_symptom` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_session_symptom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_session_id` INT NOT NULL,
  `ear` VARCHAR(5) NOT NULL DEFAULT 'BOTH',
  `symptom_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_session_symptom_patient_session_idx` (`patient_session_id` ASC) VISIBLE,
  CONSTRAINT `patient_session_symptom_patient_session`
    FOREIGN KEY (`patient_session_id`)
    REFERENCES `otodna`.`patient_session` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`symptom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`symptom` ;

CREATE TABLE IF NOT EXISTS `otodna`.`symptom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`desease`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`desease` ;

CREATE TABLE IF NOT EXISTS `otodna`.`desease` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `desease_category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `desease_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `otodna`.`category` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`patient_session_pathology`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`patient_session_pathology` ;

CREATE TABLE IF NOT EXISTS `otodna`.`patient_session_pathology` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desease_id` INT NOT NULL,
  `desease_name` VARCHAR(45) NOT NULL,
  `ear` VARCHAR(5) NOT NULL DEFAULT 'BOTH',
  `patient_session_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `patient_session_pathology_patient_session_idx` (`patient_session_id` ASC) VISIBLE,
  CONSTRAINT `patient_session_pathology_patient_session`
    FOREIGN KEY (`patient_session_id`)
    REFERENCES `otodna`.`patient_session` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`equipment` ;

CREATE TABLE IF NOT EXISTS `otodna`.`equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  `test_id` INT NULL,
  `treatment_id` INT NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `equipment_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `equipment_test_idx` (`test_id` ASC) VISIBLE,
  INDEX `equipment_treatment_idx` (`treatment_id` ASC) VISIBLE,
  CONSTRAINT `equipment_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `otodna`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `equipment_test`
    FOREIGN KEY (`test_id`)
    REFERENCES `otodna`.`test` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `equipment_treatment`
    FOREIGN KEY (`treatment_id`)
    REFERENCES `otodna`.`treatment` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`session_test_equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`session_test_equipment` ;

CREATE TABLE IF NOT EXISTS `otodna`.`session_test_equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `equipment_id` INT NOT NULL,
  `equipment_name` VARCHAR(45) NOT NULL,
  `session_test_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `session_test_equipment_session_test_idx` (`session_test_id` ASC) VISIBLE,
  CONSTRAINT `session_test_equipment_session_test`
    FOREIGN KEY (`session_test_id`)
    REFERENCES `otodna`.`session_test` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`session_treatment_equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`session_treatment_equipment` ;

CREATE TABLE IF NOT EXISTS `otodna`.`session_treatment_equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `equipment_id` INT NOT NULL,
  `equipment_name` VARCHAR(45) NOT NULL,
  `session_treatment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `session_treatment_equipment_session_treatment_idx` (`session_treatment_id` ASC) VISIBLE,
  CONSTRAINT `session_treatment_equipment_session_treatment`
    FOREIGN KEY (`session_treatment_id`)
    REFERENCES `otodna`.`session_treatment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`role` ;

CREATE TABLE IF NOT EXISTS `otodna`.`role` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`user` ;

CREATE TABLE IF NOT EXISTS `otodna`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `full_name` VARCHAR(90) NOT NULL,
  `email_address` VARCHAR(45) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_role_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `user_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `otodna`.`role` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`department` ;

CREATE TABLE IF NOT EXISTS `otodna`.`department` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`team` ;

CREATE TABLE IF NOT EXISTS `otodna`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `owner_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `team_department_idx` (`department_id` ASC) VISIBLE,
  INDEX `team_owner_idx` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `team_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `otodna`.`department` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `team_owner`
    FOREIGN KEY (`owner_id`)
    REFERENCES `otodna`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`team_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`team_member` ;

CREATE TABLE IF NOT EXISTS `otodna`.`team_member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `team_member_team_idx` (`team_id` ASC) VISIBLE,
  INDEX `team_member_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `team_member_team`
    FOREIGN KEY (`team_id`)
    REFERENCES `otodna`.`team` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `team_member_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `otodna`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otodna`.`invitation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otodna`.`invitation` ;

CREATE TABLE IF NOT EXISTS `otodna`.`invitation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email_address` VARCHAR(45) NOT NULL,
  `invitation_date` DATE NOT NULL,
  `full_name` VARCHAR(45) NOT NULL,
  `role_name` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

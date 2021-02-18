CREATE TABLE `grafluxe_jetred`.`spaceports` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(4) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `location` VARCHAR(64) NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
CHARSET=utf8
COLLATE utf8_general_ci
;

INSERT INTO `spaceports` (`code`, `name`, `location`)
  VALUES
    ("MIS", "Mars Interplanetary Spaceport", "Olympus Mons"),
    ("VMI", "Valles Marineris Interplanetary Spaceport", "Valles Marineris"),
    ("APP", "Aeolis Palus Interplanetary Spaceport", "Aeolis Palus"),
    ("HPT", "High Point Interplanetary Spaceport", "Tharsis Upland"),
    ("NPB", "North Polar Basin Interplanetary Spaceport", "Planum Boreum"),
    ("MFO", "Medusae Fossae Interplanetary Spaceport", "Medusae Fossae"),
    ("HSL", "Hale Slope Lineae Interplanetary Spaceport", "Hale Crater"),
    ("HPB", "Hellas Planitia Basin Interplanetary Spaceport", "Noctis Labyrinthus")
  ;

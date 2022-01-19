--
-- File generated with SQLiteStudio v3.3.3 on Wed Jan 19 01:58:14 2022
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: ActualizariTarife
CREATE TABLE ActualizariTarife (ID INTEGER PRIMARY KEY, Data TEXT);
INSERT INTO ActualizariTarife (ID, Data) VALUES (1, '2022-01-01');
INSERT INTO ActualizariTarife (ID, Data) VALUES (2, '2021-12-12');

-- Table: Confort
CREATE TABLE Confort (ID INTEGER PRIMARY KEY, Denumire TEXT);
INSERT INTO Confort (ID, Denumire) VALUES (1, 'I');
INSERT INTO Confort (ID, Denumire) VALUES (2, 'II');
INSERT INTO Confort (ID, Denumire) VALUES (3, 'III');
INSERT INTO Confort (ID, Denumire) VALUES (4, 'IV');

-- Table: Etaje
CREATE TABLE Etaje (ID INTEGER PRIMARY KEY, UnitateID REFERENCES Unitati (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Denumire TEXT);
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (1, 1, 'Parter');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (2, 1, 'I');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (3, 1, 'II');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (4, 1, 'III');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (5, 1, 'IV');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (6, 1, 'V');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (7, 1, 'VI');
INSERT INTO Etaje (ID, UnitateID, Denumire) VALUES (8, 1, 'VII');

-- Table: Module
CREATE TABLE Module (ID INTEGER PRIMARY KEY, Denumire TEXT);
INSERT INTO Module (ID, Denumire) VALUES (1, 'cameră');
INSERT INTO Module (ID, Denumire) VALUES (2, 'garsonieră');
INSERT INTO Module (ID, Denumire) VALUES (3, 'apartament');

-- Table: Paturi
CREATE TABLE Paturi (ID INTEGER PRIMARY KEY, Denumire TEXT, Locuri INTEGER);
INSERT INTO Paturi (ID, Denumire, Locuri) VALUES (1, 'individual', 1);
INSERT INTO Paturi (ID, Denumire, Locuri) VALUES (2, 'dublu', 2);

-- Table: Rezervari
CREATE TABLE Rezervari (ID INTEGER PRIMARY KEY, _ctime TEXT, _mtime TEXT, Status INTEGER);

-- Table: Rezervari_Spatii
CREATE TABLE Rezervari_Spatii (ID INTEGER PRIMARY KEY, RezervareID INTEGER REFERENCES Rezervari (ID) ON DELETE RESTRICT ON UPDATE CASCADE, SpatiuID INTEGER REFERENCES Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE);

-- Table: Rezervari_Spatii_Turisti
CREATE TABLE Rezervari_Spatii_Turisti (ID INTEGER PRIMARY KEY, RezervareSpatiuID INTEGER REFERENCES Rezervari_Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE, TuristID INTEGER REFERENCES Turisti (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ScopSosire TEXT, DataInceput TEXT, DataSfarsit TEXT, NumarZile INTEGER, TarifPerZi REAL, TotalPlata REAL, NumarChitanta TEXT, Observatii);

-- Table: Spatii
CREATE TABLE Spatii (ID INTEGER PRIMARY KEY, EtajID INTEGER REFERENCES Etaje (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Numar TEXT, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Status INTEGER);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (1, 1, '1', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (2, 2, '100', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (3, 2, '101', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (4, 2, '102', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (5, 2, '103', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (6, 2, '104', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (7, 2, '105', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (8, 2, '106', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (9, 2, '107', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (10, 2, '108', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (11, 2, '109', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (12, 2, '110', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (13, 2, '111', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (14, 2, '112', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (15, 2, '113', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (16, 2, '114', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (17, 2, '115', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (18, 2, '116', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (19, 2, '117', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (20, 2, '118', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (21, 2, '119', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (22, 3, '200', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (23, 3, '201', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (24, 3, '202', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (25, 3, '203', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (26, 3, '204', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (27, 3, '205', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (28, 3, '206', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (29, 3, '207', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (30, 3, '208', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (31, 3, '209', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (32, 3, '210', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (33, 3, '211', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (34, 3, '212', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (35, 3, '213', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (36, 3, '214', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (37, 3, '215', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (38, 3, '216', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (39, 3, '217', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (40, 3, '218', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (41, 3, '219', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (42, 3, '220', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (43, 3, '221', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (44, 3, '222', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (45, 3, '223', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (46, 3, '224', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (47, 3, '225', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (48, 3, '226', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (49, 3, '227', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (50, 3, '228', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (51, 3, '229', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (52, 3, '230', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (53, 3, '231', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (54, 3, '232', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (55, 3, '233', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (56, 3, '234', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (57, 3, '235', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (58, 3, '236', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (59, 3, '237', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (60, 3, '238', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (61, 3, '239', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (62, 3, '240', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (63, 3, '241', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (64, 3, '242', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (65, 3, '243', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (66, 3, '244', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (67, 3, '245', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (68, 3, '246', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (69, 3, '247', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (70, 3, '248', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (71, 3, '249', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (72, 3, '250', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (73, 3, '251', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (74, 3, '252', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (75, 3, '253', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (76, 3, '254', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (77, 3, '255', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (78, 3, '256', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (79, 3, '257', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (80, 3, '258', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (81, 3, '259', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (82, 3, '260', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (83, 3, '261', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (84, 3, '262', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (85, 3, '263', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (86, 3, '264', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (87, 3, '265', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (88, 3, '266', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (89, 3, '267', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (90, 3, '268', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (91, 3, '269', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (92, 3, '270', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (93, 3, '271', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (94, 3, '272', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (95, 3, '273', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (96, 3, '274', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (97, 3, '275', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (98, 3, '276', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (99, 3, '277', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (100, 3, '278', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (101, 3, '279', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (102, 3, '280', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (103, 3, '281', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (104, 3, '282', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (105, 3, '283', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (106, 3, '284', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (107, 3, '285', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (108, 3, '286', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (109, 3, '287', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (110, 3, '288', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (111, 3, '289', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (112, 3, '290', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (113, 3, '291', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (114, 3, '292', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (115, 3, '293', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (116, 3, '294', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (117, 3, '295', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (118, 3, '296', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (119, 3, '297', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (120, 3, '298', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (121, 3, '299', 2, 0);

-- Table: Tarife
CREATE TABLE Tarife (ID INTEGER PRIMARY KEY, ActualizareID INTEGER REFERENCES ActualizariTarife (ID) ON DELETE RESTRICT ON UPDATE CASCADE, NumarCurent INTEGER, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Valoare REAL);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (1, 1, 1, 1, 39.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (2, 1, 2, 2, 66.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (3, 1, 3, 5, 118.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (4, 2, 1, 1, 29.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (5, 2, 2, 2, 56.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (6, 2, 3, 5, 108.0);

-- Table: TipuriModul
CREATE TABLE TipuriModul (ID INTEGER PRIMARY KEY, ModulID INTEGER REFERENCES Module (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Paturi INTEGER, PatID INTEGER REFERENCES Paturi (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ConfortID INTEGER REFERENCES Confort (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Denumire TEXT);
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (1, 1, 1, 1, 2, 'Cameră cu 1 loc');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (2, 1, 2, 1, 2, 'Cameră cu 2 locuri');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (3, 3, 2, 1, 2, 'Apartament cu 2 locuri (paturi individuale)');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (5, 3, 1, 2, 1, 'Apartament cu 2 locuri (pat dublu)');

-- Table: Turisti
CREATE TABLE Turisti (ID INTEGER PRIMARY KEY, CNP TEXT, Nume TEXT, Prenume TEXT, Grad TEXT, Institutie TEXT, NumarDocumentMilitar TEXT, SerieNumarCI TEXT);

-- Table: Unitati
CREATE TABLE Unitati (ID INTEGER PRIMARY KEY, Tip TEXT, Judet TEXT, Localitate TEXT, Strada TEXT, Numar TEXT, CodPostal TEXT, Telefon TEXT, Fax TEXT, Email TEXT, Website TEXT);
INSERT INTO Unitati (ID, Tip, Judet, Localitate, Strada, Numar, CodPostal, Telefon, Fax, Email, Website) VALUES (1, 'Hotel', 'Sector 6', 'București', 'Haiducului', '2', '---', '---', '---', '---', '---');

-- Index: index_cnp
CREATE UNIQUE INDEX index_cnp ON Turisti (CNP);

-- Index: index_data_actualizari_tarife
CREATE INDEX index_data_actualizari_tarife ON ActualizariTarife (Data);

-- Index: index_denumire
CREATE UNIQUE INDEX index_denumire ON TipuriModul (Denumire);

-- Index: index_numar
CREATE UNIQUE INDEX index_numar ON Spatii (Numar);

-- Index: index_rezervari_spatii
CREATE UNIQUE INDEX index_rezervari_spatii ON Rezervari_Spatii (RezervareID, SpatiuID);

-- Index: index_rezervari_spatii_turisti
CREATE UNIQUE INDEX index_rezervari_spatii_turisti ON Rezervari_Spatii_Turisti (RezervareSpatiuID, TuristID);

-- Index: index_specificatii_modul
CREATE UNIQUE INDEX index_specificatii_modul ON TipuriModul (ModulID, Paturi, PatID, ConfortID);

-- Index: index_specificatii_tarife
CREATE UNIQUE INDEX index_specificatii_tarife ON Tarife (ActualizareID, TipModulID);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

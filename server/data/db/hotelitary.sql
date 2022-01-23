--
-- File generated with SQLiteStudio v3.3.3 on dum. ian. 23 17:32:51 2022
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: ActualizariTarife
CREATE TABLE ActualizariTarife (ID INTEGER PRIMARY KEY, Data TEXT);
INSERT INTO ActualizariTarife (ID, Data) VALUES (1, '2022-01-01');

-- Table: Confort
CREATE TABLE Confort (ID INTEGER PRIMARY KEY, Denumire TEXT);
INSERT INTO Confort (ID, Denumire) VALUES (1, 'I');
INSERT INTO Confort (ID, Denumire) VALUES (2, 'II');
INSERT INTO Confort (ID, Denumire) VALUES (3, 'III');
INSERT INTO Confort (ID, Denumire) VALUES (4, 'IV');

-- Table: DateRezervari
CREATE TABLE DateRezervari (ID INTEGER PRIMARY KEY, Data DATE);

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
CREATE TABLE Rezervari (ID INTEGER PRIMARY KEY, DataInceput TEXT, DataSfarsit TEXT, Status INTEGER);
INSERT INTO Rezervari (ID, DataInceput, DataSfarsit, Status) VALUES (1, '2022-01-23', '2022-01-23', NULL);
INSERT INTO Rezervari (ID, DataInceput, DataSfarsit, Status) VALUES (2, '2022-01-23', '2022-01-24', NULL);

-- Table: Rezervari_Spatii
CREATE TABLE Rezervari_Spatii (ID INTEGER PRIMARY KEY, RezervareID INTEGER REFERENCES Rezervari (ID) ON DELETE CASCADE ON UPDATE CASCADE, SpatiuID INTEGER REFERENCES Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE);
INSERT INTO Rezervari_Spatii (ID, RezervareID, SpatiuID) VALUES (2, 1, 2);
INSERT INTO Rezervari_Spatii (ID, RezervareID, SpatiuID) VALUES (3, 2, 3);

-- Table: Rezervari_Spatii_Turisti
CREATE TABLE Rezervari_Spatii_Turisti (ID INTEGER PRIMARY KEY, RezervareSpatiuID INTEGER REFERENCES Rezervari_Spatii (ID) ON DELETE CASCADE ON UPDATE CASCADE, TuristID INTEGER REFERENCES Turisti (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ScopSosire TEXT, DataInceput TEXT, DataSfarsit TEXT, NumarZile INTEGER, TarifPerZi REAL, TotalPlata REAL, NumarChitanta TEXT, Observatii);
INSERT INTO Rezervari_Spatii_Turisti (ID, RezervareSpatiuID, TuristID, ScopSosire, DataInceput, DataSfarsit, NumarZile, TarifPerZi, TotalPlata, NumarChitanta, Observatii) VALUES (2, 2, 2, '1', '2022-01-23', '2022-01-23', 1, 10.0, 10.0, NULL, NULL);
INSERT INTO Rezervari_Spatii_Turisti (ID, RezervareSpatiuID, TuristID, ScopSosire, DataInceput, DataSfarsit, NumarZile, TarifPerZi, TotalPlata, NumarChitanta, Observatii) VALUES (3, 3, 3, '1', NULL, NULL, 1, 20.0, 20.0, NULL, NULL);

-- Table: Spatii
CREATE TABLE Spatii (ID INTEGER PRIMARY KEY, EtajID INTEGER REFERENCES Etaje (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Numar TEXT, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Status INTEGER);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (1, 1, '1', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (2, 1, '2', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (3, 1, '3', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (4, 1, '4', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (5, 1, '5', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (6, 1, '6', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (7, 1, '7', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (8, 1, '8', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (9, 1, '9', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (10, 1, '10', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (11, 1, '11', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (12, 1, '12', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (13, 1, '13', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (14, 1, '14', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (15, 1, '15', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (16, 1, '16', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (17, 1, '17', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (18, 1, '18', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (19, 1, '19', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (20, 1, '20', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (21, 2, '100', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (22, 2, '101', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (23, 2, '102', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (24, 2, '103', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (25, 2, '104', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (26, 2, '105', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (27, 2, '106', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (28, 2, '107', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (29, 2, '108', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (30, 2, '109', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (31, 2, '110', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (32, 2, '111', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (33, 2, '112', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (34, 2, '113', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (35, 2, '114', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (36, 2, '115', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (37, 2, '116', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (38, 2, '117', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (39, 2, '118', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (40, 2, '119', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (41, 2, '120', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (42, 2, '121', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (43, 2, '122', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (44, 2, '123', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (45, 2, '124', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (46, 2, '125', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (47, 2, '126', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (48, 2, '127', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (49, 2, '128', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (50, 2, '129', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (51, 2, '130', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (52, 2, '131', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (53, 2, '132', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (54, 2, '133', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (55, 2, '134', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (56, 2, '135', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (57, 2, '136', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (58, 2, '137', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (59, 2, '138', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (60, 2, '139', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (61, 2, '140', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (62, 3, '200', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (63, 3, '201', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (64, 3, '202', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (65, 3, '203', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (66, 3, '204', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (67, 3, '205', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (68, 3, '206', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (69, 3, '207', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (70, 3, '208', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (71, 3, '209', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (72, 3, '210', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (73, 3, '211', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (74, 3, '212', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (75, 3, '213', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (76, 3, '214', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (77, 3, '215', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (78, 3, '216', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (79, 3, '217', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (80, 3, '218', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (81, 3, '219', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (82, 3, '220', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (83, 4, '300', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (84, 4, '301', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (85, 4, '302', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (86, 4, '303', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (87, 4, '304', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (88, 4, '305', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (89, 4, '306', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (90, 4, '307', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (91, 4, '308', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (92, 4, '309', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (93, 4, '310', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (94, 4, '311', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (95, 4, '312', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (96, 4, '313', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (97, 4, '314', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (98, 4, '315', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (99, 4, '316', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (100, 4, '317', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (101, 4, '318', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (102, 4, '319', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (103, 4, '320', 5, 0);

-- Table: Tarife
CREATE TABLE Tarife (ID INTEGER PRIMARY KEY, ActualizareID INTEGER REFERENCES ActualizariTarife (ID) ON DELETE RESTRICT ON UPDATE CASCADE, NumarCurent INTEGER, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Valoare REAL);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (1, 1, 1, 1, 10.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (2, 1, 2, 2, 20.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (3, 1, 3, 3, 100.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (4, 1, 4, 5, 200.0);

-- Table: TipuriModul
CREATE TABLE TipuriModul (ID INTEGER PRIMARY KEY, ModulID INTEGER REFERENCES Module (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Paturi INTEGER, PatID INTEGER REFERENCES Paturi (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ConfortID INTEGER REFERENCES Confort (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Denumire TEXT);
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (1, 1, 1, 1, 2, 'Cameră cu 1 loc');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (2, 1, 2, 1, 2, 'Cameră cu 2 locuri');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (3, 3, 2, 1, 2, 'Apartament cu 2 locuri (paturi individuale)');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (5, 3, 1, 2, 1, 'Apartament cu 2 locuri (pat dublu)');

-- Table: Turisti
CREATE TABLE Turisti (ID INTEGER PRIMARY KEY, CNP TEXT, Nume TEXT, Prenume TEXT, Grad TEXT, Institutie TEXT, NumarDocumentMilitar TEXT, SerieNumarCI TEXT, Nationalitate INTEGER);
INSERT INTO Turisti (ID, CNP, Nume, Prenume, Grad, Institutie, NumarDocumentMilitar, SerieNumarCI, Nationalitate) VALUES (1, '1920923152504', 'Turist', 'Unu', 'Lt.', 'UM 01616', NULL, 'DD 891651', 1);
INSERT INTO Turisti (ID, CNP, Nume, Prenume, Grad, Institutie, NumarDocumentMilitar, SerieNumarCI, Nationalitate) VALUES (2, '1931017152493', 'Turistescu', 'Doi', '-', 'Deloitte', NULL, 'DD 123456', 1);
INSERT INTO Turisti (ID, CNP, Nume, Prenume, Grad, Institutie, NumarDocumentMilitar, SerieNumarCI, Nationalitate) VALUES (3, '2881113100185', 'Turistel', 'Trei', '-', 'Antena 1 TV', NULL, 'XZ 456789', 1);
INSERT INTO Turisti (ID, CNP, Nume, Prenume, Grad, Institutie, NumarDocumentMilitar, SerieNumarCI, Nationalitate) VALUES (4, '1920924152505', 'Touristy', 'Four', '-', 'Microsoft', NULL, 'PQ 345678', 0);
INSERT INTO Turisti (ID, CNP, Nume, Prenume, Grad, Institutie, NumarDocumentMilitar, SerieNumarCI, Nationalitate) VALUES (5, '1901212123456', 'Touriste', 'Cinque', '-', 'Avalon', NULL, 'YY 123456', 0);

-- Table: Unitati
CREATE TABLE Unitati (ID INTEGER PRIMARY KEY, Tip TEXT, Judet TEXT, Localitate TEXT, Strada TEXT, Numar TEXT, CodPostal TEXT, Telefon TEXT, Fax TEXT, Email TEXT, Website TEXT);
INSERT INTO Unitati (ID, Tip, Judet, Localitate, Strada, Numar, CodPostal, Telefon, Fax, Email, Website) VALUES (1, 'Hotel', 'Sector 6', 'București', 'Haiducului', '2', '---', '---', '---', '---', '---');

-- Index: index_cnp
CREATE UNIQUE INDEX index_cnp ON Turisti (CNP);

-- Index: index_data
CREATE UNIQUE INDEX index_data ON DateRezervari (Data);

-- Index: index_data_actualizari_tarife
CREATE UNIQUE INDEX index_data_actualizari_tarife ON ActualizariTarife (Data);

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

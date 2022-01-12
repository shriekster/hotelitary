--
-- File generated with SQLiteStudio v3.3.3 on mie. ian. 12 23:16:33 2022
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
CREATE TABLE Rezervari (ID INTEGER PRIMARY KEY, _ctime TEXT, _mtime TEXT);

-- Table: Rezervari_Spatii
CREATE TABLE Rezervari_Spatii (ID INTEGER PRIMARY KEY, RezervareID INTEGER REFERENCES Rezervari (ID) ON DELETE RESTRICT ON UPDATE CASCADE, SpatiuID INTEGER REFERENCES Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE);

-- Table: Rezervari_Spatii_Turisti
CREATE TABLE Rezervari_Spatii_Turisti (ID INTEGER PRIMARY KEY, RezervareSpatiuID INTEGER REFERENCES Rezervari_Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE, TuristID INTEGER REFERENCES Turisti (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ScopSosire TEXT, DataInceput TEXT, DataSfarsit TEXT, NumarZile INTEGER, TarifPerZi REAL, TotalPlata REAL, NumarChitanta TEXT, Observatii);

-- Table: Spatii
CREATE TABLE Spatii (ID INTEGER PRIMARY KEY, EtajID INTEGER REFERENCES Etaje (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Numar TEXT, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (1, 1, '10', 1);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (2, 1, '20', 2);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (3, 2, '101', 1);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (4, 3, '202', 2);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (5, 4, '303', 3);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (6, 5, '404', 4);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (7, 6, '505', 5);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (8, 7, '606', 1);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID) VALUES (9, 8, '707', 2);

-- Table: Tarife
CREATE TABLE Tarife (ID INTEGER PRIMARY KEY, ActualizareID INTEGER REFERENCES ActualizariTarife (ID) ON DELETE RESTRICT ON UPDATE CASCADE, NumarCurent INTEGER, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Valoare REAL);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (1, 1, 1, 1, 39.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (2, 1, 2, 2, 66.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (3, 1, 3, 3, 118.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (4, 1, 4, 4, 118.0);
INSERT INTO Tarife (ID, ActualizareID, NumarCurent, TipModulID, Valoare) VALUES (5, 1, 5, 5, 158.0);

-- Table: TipuriModul
CREATE TABLE TipuriModul (ID INTEGER PRIMARY KEY, ModulID INTEGER REFERENCES Module (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Paturi INTEGER, PatID INTEGER REFERENCES Paturi (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ConfortID INTEGER REFERENCES Confort (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Denumire TEXT);
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (1, 1, 1, 1, 2, 'Cameră cu 1 loc');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (2, 1, 2, 1, 2, 'Cameră cu 2 locuri');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (3, 3, 2, 1, 2, 'Apartament cu 2 locuri (paturi individuale)');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (4, 3, 1, 2, 2, 'Apartament cu 2 locuri (pat dublu)');
INSERT INTO TipuriModul (ID, ModulID, Paturi, PatID, ConfortID, Denumire) VALUES (5, 3, 1, 2, 1, 'Apartament cu 2 locuri (pat dublu)');

-- Table: Turisti
CREATE TABLE Turisti (ID INTEGER PRIMARY KEY, CNP TEXT, Nume TEXT, Prenume TEXT, Grad TEXT, Institutie TEXT, NumarDocumentMilitar TEXT, SerieNumarCI TEXT);

-- Table: Unitati
CREATE TABLE Unitati (ID INTEGER PRIMARY KEY, Tip TEXT, Judet TEXT, Localitate TEXT, Strada TEXT, Numar TEXT, CodPostal TEXT, Telefon TEXT, Fax TEXT, Email TEXT, Website TEXT);
INSERT INTO Unitati (ID, Tip, Judet, Localitate, Strada, Numar, CodPostal, Telefon, Fax, Email, Website) VALUES (1, 'Hotel', 'Sector 6', 'București', 'Haiducului', NULL, NULL, NULL, NULL, NULL, NULL);

-- Index: index_cnp
CREATE UNIQUE INDEX index_cnp ON Turisti (CNP);

-- Index: index_rezervari_spatii
CREATE UNIQUE INDEX index_rezervari_spatii ON Rezervari_Spatii (RezervareID, SpatiuID);

-- Index: index_rezervari_spatii_turisti
CREATE UNIQUE INDEX index_rezervari_spatii_turisti ON Rezervari_Spatii_Turisti (RezervareSpatiuID, TuristID);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

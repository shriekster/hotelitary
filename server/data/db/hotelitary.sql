--
-- File generated with SQLiteStudio v3.3.3 on dum. ian. 23 20:07:17 2022
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
INSERT INTO Rezervari (ID, DataInceput, DataSfarsit, Status) VALUES (1, '2022-01-23', '2022-01-24', 1);
INSERT INTO Rezervari (ID, DataInceput, DataSfarsit, Status) VALUES (2, '2022-01-25', '2022-01-26', 0);

-- Table: Rezervari_Spatii
CREATE TABLE Rezervari_Spatii (ID INTEGER PRIMARY KEY, RezervareID INTEGER REFERENCES Rezervari (ID) ON DELETE CASCADE ON UPDATE CASCADE, SpatiuID INTEGER REFERENCES Spatii (ID) ON DELETE RESTRICT ON UPDATE CASCADE);
INSERT INTO Rezervari_Spatii (ID, RezervareID, SpatiuID) VALUES (1, 1, 3);
INSERT INTO Rezervari_Spatii (ID, RezervareID, SpatiuID) VALUES (2, 2, 9);

-- Table: Rezervari_Spatii_Turisti
CREATE TABLE Rezervari_Spatii_Turisti (ID INTEGER PRIMARY KEY, RezervareSpatiuID INTEGER REFERENCES Rezervari_Spatii (ID) ON DELETE CASCADE ON UPDATE CASCADE, TuristID INTEGER REFERENCES Turisti (ID) ON DELETE RESTRICT ON UPDATE CASCADE, ScopSosire TEXT, NumarZile INTEGER, TarifPerZi REAL, TotalPlata REAL, NumarChitanta TEXT, Observatii);
INSERT INTO Rezervari_Spatii_Turisti (ID, RezervareSpatiuID, TuristID, ScopSosire, NumarZile, TarifPerZi, TotalPlata, NumarChitanta, Observatii) VALUES (1, 1, 1, 'misiune', 2, 10.0, 20.0, '123Q', NULL);
INSERT INTO Rezervari_Spatii_Turisti (ID, RezervareSpatiuID, TuristID, ScopSosire, NumarZile, TarifPerZi, TotalPlata, NumarChitanta, Observatii) VALUES (2, 2, 2, 'misiune', 2, 20.0, 40.0, NULL, NULL);

-- Table: Spatii
CREATE TABLE Spatii (ID INTEGER PRIMARY KEY, EtajID INTEGER REFERENCES Etaje (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Numar TEXT, TipModulID INTEGER REFERENCES TipuriModul (ID) ON DELETE RESTRICT ON UPDATE CASCADE, Status INTEGER);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (1, 1, '1', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (2, 1, '2', 1, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (3, 1, '3', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (4, 1, '4', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (5, 1, '5', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (6, 1, '6', 2, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (7, 1, '7', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (8, 1, '8', 3, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (9, 1, '9', 5, 0);
INSERT INTO Spatii (ID, EtajID, Numar, TipModulID, Status) VALUES (10, 1, '10', 5, 0);

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

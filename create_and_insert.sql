DROP TABLE transaksi;
DROP TABLE akun;
DROP TABLE nasabah;

CREATE TABLE nasabah (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
	telphone int NOT NULL,
	address varchar (255)
);
ALTER TABLE nasabah
ALTER COLUMN address TYPE text;

CREATE TABLE akun (
    akun_id SERIAL PRIMARY KEY NOT NULL,
    jenis_akun VARCHAR(50) NOT NULL,
    saldo INT NOT NULL,
	id_nasabah INT NOT NULL,
	FOREIGN KEY (id_nasabah) REFERENCES nasabah (id)
);

CREATE TABLE transaksi (
    transaksi_id SERIAL PRIMARY KEY NOT NULL,
    tipe_transaksi VARCHAR(50) NOT NULL,
    saldo INT NOT NULL,
	transaksi_date DATE NOT NULL,
	akun_id INT NOT NULL,
	FOREIGN KEY (akun_id)
	REFERENCES akun (akun_id)
);
INSERT INTO nasabah
	VALUES 
		('1', 'jaka', 'jaka@gmail.com', 0823509689, 'jln sm raja'),
		('2', 'siti', 'siti@gmail.com', 0898235096, 'jln sm raja'),
		('3', 'nana', 'nana@gmail.com', 0823506756, 'jln gatot subroto'),
		('4', 'rusiana', 'rusiana@gmail.com', 08234096,'jln sutomo'),
		('5', 'andi', 'andi@gmail.com', 085098765, 'jln gatot subroto');
		
INSERT INTO akun 
	VALUES 
		('101', 'DEPOSIT', '200000', 1),
		('102', 'TABUNGAN', '15000000', 2),
		('103', 'DEPOSIT', '2000000', 3),
		('104', 'TABUNGAN', '3000000', 4),
		('105', 'tabungan', '500000', 5);
	
INSERT INTO transaksi (transaksi_id,tipe_transaksi,saldo, transaksi_date,akun_id)
	VALUES 
		(001,'tabungan', '5000000','2023-05-30',101),
		(002,'deposit', '10000000','2023-07-05',105),
		(003,'tabungan', '30000000','2023-05-30',104),
		(004,'deposit', '3000000','2023-05-30',102),
		(005,'giro', '1000000','2023-05-30',103);
		

-- indexing
-- membuat indexing kolom name pada nasabah
CREATE INDEX idx_nasabah_name ON nasabah (name);
CREATE INDEX idx_akun_id ON akun(akun_id);
-- CREATE INDEX idx_transaksi_transaksi_id on transaksi (akun);
CREATE INDEX idx_transaksi_transaksi_date on transaksi (transaksi_date);

-- SELECT transaksi.transaksi_date, akun.jenis_akun, nasabah.name
-- FROM transaksi
-- INNER JOIN akun ON transaksi.id_akun = akun.akun_id
-- INNER JOIN nasabah ON akun.id_nasabah = nasabah.id_nasabah;


-- memanggil dari nomor transaksi berdasarkan nama nasabah
SELECT t.transaksi_date
FROM nasabah n
JOIN akun a ON n.id = a.id
JOIN transaksi t ON a.akun_id = t.akun_id
WHERE n.name = 'rusiana';

-- memanggil nama berdasarkan alamat yang sama
SELECT name from nasabah WHERE address ='jln sm raja'

-- melihat saldo berdasarkan nama
SELECT t.saldo
FROM nasabah n
JOIN akun a ON n.id = a.id
JOIN transaksi t ON a.akun_id = t.akun_id
WHERE n.name = 'rusiana';

-- total sum
SELECT SUM (saldo) FROM transaksi;

-- CTE
WITH akun AS (
    SELECT jenis_akun, saldo
    FROM akun
    WHERE jenis_akun = 'tabungan'
)
SELECT jenis_akun, saldo
FROM akun;

-- procedure
CREATE PROCEDURE GetTabungan()
AS
$$
BEGIN
    SELECT jenis_akun, saldo
    FROM akun
    WHERE jenis_akun = 'tabungan' AND saldo > 100000;
END;
$$
LANGUAGE plpgsql;




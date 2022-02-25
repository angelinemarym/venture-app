CREATE DATABASE ProjectAkhirITDiv
USE ProjectAkhirITDiv
-- DROP DATABASE ProjectAkhirITDiv

BEGIN TRAN
CREATE TABLE msCustomer (
	CustomerID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	Gender CHAR(6) CHECK(Gender IN('MALE','FEMALE'))NOT NULL,
	Email VARCHAR(50) UNIQUE NOT NULL,
	[Password] VARCHAR(255) NOT NULL,
	Phone VARCHAR(50) UNIQUE NOT NULL,
	DateOfBirth DATE NOT NULL,
	Stsrc CHAR(1) NOT NULL,
	UserIn VARCHAR(50) NOT NULL,
	UserUp VARCHAR(50) NULL,
	DateIn DATETIME NOT NULL,
	DateUp DATETIME NULL
)
-- DROP TABLE msCustomer

CREATE TABLE msHotel (
	HotelID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	HotelName VARCHAR (50) NOT NULL,
	HotelDescription VARCHAR (255) NOT NULL,
	PhoneNumber VARCHAR (50) UNIQUE NOT NULL,
	Email VARCHAR (50) UNIQUE NOT NULL,
	[Address] VARCHAR (50) NOT NULL,
	[Rating] DECIMAL(3, 2) NOT NULL,
	Image1 VARCHAR(255) NOT NULL,
	Image2 VARCHAR(255) NOT NULL,
	Image3 VARCHAR(255) NULL,
	Image4 VARCHAR(255) NULL,
	Stsrc CHAR(1) NOT NULL,
	UserIn VARCHAR(50) NOT NULL,
	UserUp VARCHAR(50) NULL,
	DateIn DATETIME NOT NULL,
	DateUp DATETIME NULL
)
-- DROP TABLE msHotel

CREATE TABLE msRoomType (
	RoomTypeID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	HotelID INT FOREIGN KEY REFERENCES msHotel(HotelID) ON UPDATE CASCADE NOT NULL,
	RoomDescription VARCHAR(255) NOT NULL,
	Price INT NOT NULL,
	TotalRoom INT NOT NULL,
	RoomName VARCHAR(50) NOT NULL,
	Image1 VARCHAR(255) NOT NULL,
	Image2 VARCHAR(255) NOT NULL,
	Image3 VARCHAR(255) NULL,
	Image4 VARCHAR(255) NULL,
	BedType VARCHAR(50) NOT NULL,
	TotalGuest INT NOT NULL,
	[Rating] DECIMAL(3, 2) NOT NULL,
	Stsrc CHAR(1) NOT NULL,
	UserIn VARCHAR(50) NOT NULL,
	UserUp VARCHAR(50) NULL,
	DateIn DATETIME NOT NULL,
	DateUp DATETIME NULL
)
-- DROP TABLE msRoomType

/* 
	Modified By: Rafi Muhammad
	Date: February 8, 2022
	Purpose: Add table msHotelImage and msRoomImage

	Modified By: Rafi Muhammad
	Date: Feb 8, 2022
	Purpose: Backup table msHotelImage and msRoomImage

	CREATE TABLE msHotelImage (
		HotelImageID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
		HotelID INT FOREIGN KEY REFERENCES msHotel(HotelID) ON UPDATE CASCADE NOT NULL,
		[Image] VARCHAR(50) NOT NULL,
		Stsrc CHAR(1) NOT NULL,
		UserIn VARCHAR(50) NOT NULL,
		UserUp VARCHAR(50) NULL,
		DateIn DATETIME NOT NULL,
		DateUp DATETIME NULL
	);
	-- DROP TABLE msHotelImage


	--SELECT DISTINCT
	--	msHotel.HotelID, HotelName, HotelDescription,
	--	PhoneNumber, Email, [Address], Rating, HotelImageID, msHotelImage.[Image]
	--FROM msHotel
	--INNER JOIN msHotelImage ON msHotel.HotelID = msHotelImage.HotelID

	CREATE TABLE msRoomImage (
		RoomImageID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
		RoomTypeID INT REFERENCES msRoomType(RoomTypeID) ON UPDATE CASCADE NOT NULL,
		[Image] VARCHAR(50) NOT NULL,
		Stsrc CHAR(1) NOT NULL,
		UserIn VARCHAR(50) NOT NULL,
		UserUp VARCHAR(50) NULL,
		DateIn DATETIME NOT NULL,
		DateUp DATETIME NULL
	);
	-- DROP TABLE msRoomImage
*/

CREATE TABLE trCustomerBooking (
	BookingID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	CustomerID INT REFERENCES msCustomer(CustomerID) ON UPDATE CASCADE NOT NULL,
	RoomTypeID INT REFERENCES msRoomType(RoomTypeID) ON UPDATE CASCADE NOT NULL,
	TransactionDate DATETIME NOT NULL, 
	CheckInDate DATETIME NOT NULL,
	CheckOutDate DATETIME NOT NULL,
	TotalPrice INT NOT NULL,
	PaymentMethod VARCHAR(50) NOT NULL,
	Stsrc CHAR(1) NOT NULL,
	UserIn VARCHAR(50) NOT NULL,
	UserUp VARCHAR(50) NULL,
	DateIn DATETIME NOT NULL,
	DateUp DATETIME NULL
)
-- DROP TABLE trCustomerBooking

/*
	Modified By : Rafi Muhammad
	Date : February 6, 2022
	Purpose : Backup table trCustomerPayment and move PaymentMethod to trCustomerBooking table

	Modified By : Rafi Muhammad
	Date : February 8, 2022
	Purpose : Delete Backup trCustomerPayment table
*/

-- DROP TABLE trCustomerPayment

--INSERT DATA (BELUM DIGANTI)

INSERT INTO msCustomer (
	FirstName, 
	LastName, 
	Gender, 
	Email, 
	[Password], 
	Phone, 
	DateOfBirth, 
	Stsrc, UserIn, 
	DateIn) 
VALUES
(
	'Admin', '', 'MALE', 'admin@admin.com', 
	'202cb962ac59075b964b07152d234b70', '08788901929', '1999-02-19', 'A', 'Admin', GETDATE()
);

INSERT INTO msHotel (
	HotelName,
	HotelDescription,
	PhoneNumber,
	Email,
	[Address],
	Rating,
	Image1,
	Image2,
	Image3,
	Image4,
	Stsrc,
	UserIn,
	DateIn
)
VALUES
(
	'Royal Safari', 'Royal Safari is a luxury, yet cozy hotel.', '02518253000', 'reservation@royalsafari.com', 'Menes Street No. 2, Jakarta Barat, DKI Jakarta', 4.7,'https://bit.ly/3Jh4LPX','https://bit.ly/3Jb7D0t', null, null, 'A', 'Admin', GETDATE()
), 
(
	'Horizon Bandung', 'Horizon Bandung is a quiet, comfortable hotel.', '0217568930', 'customer@horiszon.com', 'Elang Street, Bandung, West Java', 4.8,'https://bit.ly/3uLG5uU','https://bit.ly/33fmMi0', null, null, 'A', 'Admin', GETDATE()
),
(
	'Welcome Inns', 'Comfort and convenience at an affordable price.', '0217566322', 'hotline@welcomeinns.com', 'Soekarno-Hatta Street Number 21, Banda Aceh, Aceh', 4.87,'https://bit.ly/3LpsBuJ','https://bit.ly/33gjKKx', null, null, 'A', 'Admin', GETDATE()
),
(
	'Jakarta Season', 'A 2012 renovation brought all rooms and services up to modern day scratch and guestrooms come equipped with free Wi-Fi and all the usual amenities required for a comfortable stay.', '0215912383', 'customer@season.com', 'Jelambar Selatan, Jakarta, Jakarta Barat', 4.68,'https://bit.ly/3GKSwcH','https://bit.ly/3rIxreA', null, null, 'A', 'Admin', GETDATE()
),
(
	'Fonda Menta', 'The Hotel Fonda Menta is located in cengkareng, famous for its rare and gorgeous cloud forest and friendly community.', '02169102312', 'customerFonda@menta.com', 'Jl Cinere 340, Cengkareng', 4.89,'https://bit.ly/3GLAZRz','https://bit.ly/35WKy3g', null, null, 'A', 'Admin', GETDATE()
),
(
	'Calton Jakarta Park', 'Only a few steps from Central Mall, renowned art galleries and museums, the major business district of Montréal, as well as the world-famous underground shopping malls', '02151233212', 'customer@calton.com', 'Tanjung Pepaya, Grogol Pertamburan, West Jakarta', 4.74,'https://bit.ly/3rIJ1GH','https://bit.ly/3su8enk', null, null, 'A', 'Admin', GETDATE()
),
(
	'Mercure Hotel', 'our hotel in the Frankfurter Ring all include high-speed Wi-Fi, so you can stay connected throughout your stay. Our daily breakfast buffet sets you up for a successful day of business meetings or sightseeing.', '0216786672', 'customer@mercure.com', 'Tanah Kucinta, dutamas, South Jakarta', 4.72,'https://bit.ly/3BdB6UK','https://bit.ly/3oHcO0e', null, null, 'A', 'Admin', GETDATE()
),
(
	'Hotel Lichtenberg', 'The Comfort Hotel Lichtenberg is located in the northeast part of Jakarta, All standard guest rooms are equipped with private bathrooms, hair dryers, spacious work desks, direct-dial telephones and satellite television.  ', '02189829312', 'customer@lichtenberg.com', 'Kelapa Gading, Sunter, NorthEast Jakarta', 4.74,'https://bit.ly/3GJWwdh','https://bit.ly/34AFXn9', null, null, 'A', 'Admin', GETDATE()
),
(
	'Ibis Jakarta', 'The Hotel Ibis Jakarta is situated in the 17th arrondissement in the north of Jakarta, It has 688 rooms with air-conditioning and free Wi-FI.', '0218382393', 'customer@ibis.com', 'Jembatan tiga, angke, North Jakarta', 4.2,'https://bit.ly/3HNqPRH','https://bit.ly/34Tt07y', null, null, 'A', 'Admin', GETDATE()
);

INSERT INTO msRoomType(
	HotelID,
	RoomDescription,
	Price,
	TotalRoom,
	RoomName,
	Image1,
	Image2,
	Image3,
	Image4,
	BedType,
	TotalGuest,
	Rating,
	Stsrc,
	UserIn,
	DateIn
)
VALUES
(1, 'Clean room with all the basic stuff you need.', 450000, 2, 'Standard','https://bit.ly/3srxESq','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(1, 'Comfortable room that will make you feel loved.', 800000, 1, 'Premium','https://bit.ly/3oIq4C9','http://bitly.ws/osYP', null, null, '2 Single Bed', 2, 4.7,'A', 'Admin', GETDATE()),
(2, 'Simple and clean room. Just like home.', 375000, 45, 'Standard','https://bit.ly/3Jhft8S','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(2, 'The best room that we can give.', 1350000, 34, 'Deluxe', 'https://bit.ly/362bWgl','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(2, 'An artistic room that gives you a gallery vibes.', 725000, 40, 'Premium', 'https://bit.ly/3srxESq','http://bitly.ws/osYP', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(3, 'The best service is here', 1400000, 25, 'Deluxe', 'https://bit.ly/3uOMO7n','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(3, 'Clean and comfortable with a great view.', 500000, 37, 'Standard', 'https://bit.ly/3srxESq','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(3, 'A very good room for you to stay', 700000, 32, 'Premium', 'https://bit.ly/34AOsyr','http://bitly.ws/osYP', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(4, 'All rooms have cable TV and wireless internet access', 400000, 23, 'Standard', 'https://bit.ly/33fjb3D','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(4, 'A revitalizing rainforest shower and underfloor heating guarantee relaxing moments.', 700000, 20, 'Deluxe', 'https://bit.ly/34xE0b7','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(5, 'Good rooms and breakfast. Also enjoyed free Wi-Fi.', 400000, 19, 'Standard', 'https://bit.ly/3GIHGUC','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(5, 'Comfortable beds and nice ambiance/atmosphere.', 599999, 40, 'Deluxe', 'https://bit.ly/3LuuLsG','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(5, 'Highly recommended Room', 900000, 15, 'Premium', 'https://bit.ly/3Be743p','http://bitly.ws/osYP', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(6, 'modern and cozy, with a comfortable bed.', 250000, 20, 'Standard', 'https://bit.ly/3HWMI0Q','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(6, 'Modern Room and Simple', 400000, 17, 'Deluxe', 'https://bit.ly/33inxXM','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(7, 'A very comfortable.', 375000, 45, 'Standard', 'https://bit.ly/3rJqN80','http://bitly.ws/osYJ', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(7, 'The best service and A very comfortable is here', 699000, 12, 'Deluxe', 'https://bit.ly/3sCHj8K','http://bitly.ws/osYT', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(8, 'It also has elegant, spacious bedrooms, each with comfortable seating areas, a television, air conditioning', 399.999, 24, 'Standard', 'https://bit.ly/3oJFkyv%27,%27https://bit.ly/3sBuCv5', 'https://bit.ly/3sCHj8K', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(8, 'Inviting, modern and cozy, with a comfortable bed and a functional bathroom, everything you need for a pleasant stay.', 599.999, 16, 'Premium', 'https://bit.ly/3BffBmu%27,%27http://bitly.ws/osYT', 'https://bit.ly/3sCHj8K', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(8, 'For families and groups, multi-bed rooms are available.', 899.999, 8, 'Deluxe', 'https://bit.ly/3rK3jzp%27,%27https://bit.ly/34RRSg0', 'https://bit.ly/3sCHj8K', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(9, 'All guestrooms are elegantly furnished with handmade furniture', 799000, 13, 'Deluxe', 'http://bitly.ws/otCg%27,%27https://bit.ly/3LxgGuA', 'https://bit.ly/3sCHj8K', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE()),
(9, 'Packed our rooms with authentic and comfy ambience', 599000, 10, 'Premium', 'https://bit.ly/3I0dkhT%27,%27http://bitly.ws/otC6', 'https://bit.ly/3sCHj8K', null, null, '2 Single Bed', 2, 4.7, 'A', 'Admin', GETDATE())

/*
	Modified By: Rafi Muhammad
	Date: Feb 8, 2022
	Purpose: Add msHotelImage and msRoomImage INSERT query

	Modified By: Rafi Muhammad
	Date: Feb 12, 2022
	Purpose: Delete msHotelImage and msRoomImage INSERT query
*/

INSERT INTO trCustomerBooking (
	CustomerID,
	RoomTypeID,
	TransactionDate,
	TotalPrice,
	CheckInDate,
	CheckOutDate,
	PaymentMethod,
	Stsrc,
	UserIn,
	DateIn
)
VALUES
(
	1, 1, GETDATE(), 450000, '2022-02-5', 
	'2022-02-10 13:00:05', 'Virtual Account', 'A', 'Admin', GETDATE()
), 
(
	1, 1, GETDATE(), 450000, '2022-02-5', 
	'2022-02-10 13:00:05', 'Virtual Account', 'A', 'Admin', GETDATE()
), 
(
	1, 2, GETDATE(), 800000, '2022-02-5', 
	'2022-02-10 13:00:05', 'Virtual Account', 'A', 'Admin', GETDATE()
);

/*
	Modified By : Rafi Muhammad
	Date : Feb 6, 2022
	Purpose : Backup trCustomerPayment INSERT query

	Modified By : Rafi Muhammad
	Date : Feb 8, 2022
	Purpose: Delete trCustomerPayment INSERT query backup
*/

/*
	Modified By : Rafi Muhammad
	Date : Feb 8, 2022
	Purpose: Delete UPDATE and ALTER TABLE query
*/

Use ProjectAkhirITDiv
GO
sp_changedbowner 'sa'
GO
ROLLBACK
SELECT * FROM msCustomer
SELECT * FROM trCustomerBooking
SELECT * FROM msRoomType
SELECT * FROM msHotel

SELECT * 
FROM trCustomerBooking 
/*
	Modified By: Rafi Muhammad
	Date: Feb 12, 2022
	Purpose: Backup Get Rooms Available query

	SELECT *
	FROM msRoomType r
	WHERE HotelID = 1 AND r.RoomTypeID NOT IN
	(
		SELECT b.RoomTypeID FROM trCustomerBooking b
		WHERE b.RoomTypeID = r.RoomTypeID
		AND 
		(
			 '2022-02-11' BETWEEN b.CheckInDate AND b.CheckOutDate OR
			 '2022-02-12' BETWEEN b.CheckInDate AND b.CheckOutDate OR 
			 ('2022-02-11' <= b.CheckInDate AND '2022-02-12' >= b.CheckOutDate)
		)
		GROUP BY RoomTypeID
		HAVING COUNT(*) >= r.TotalRoom
	)

	SELECT * 
		FROM trCustomerBooking 
*/
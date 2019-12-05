-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: localhost
-- Χρόνος δημιουργίας: 05 Δεκ 2019 στις 09:18:35
-- Έκδοση διακομιστή: 8.0.13-4
-- Έκδοση PHP: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `***REMOVED***`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `social` varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `img` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `agents`
--

INSERT INTO `agents` (`id`, `name`, `description`, `tel`, `email`, `social`, `img`) VALUES
(1, 'Olympia Xenidou', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In est ante in nibh. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.', '+30 6981135717', 'olyxen@gmail.com', 'https://www.facebook.com/olympia.xenidou', '/olympia.jpg'),
(2, 'Stela Nistikaki', 'Proin libero nunc consequat interdum varius. Aliquet eget sit amet tellus cras. Habitant morbi tristique senectus et. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.', '+30 6984656256', 'stelanis@hotmail.com', 'https://www.facebook.com/profile.php?id=100003477699851', '/stela.jpg'),
(3, 'Dimitris Vavatsioulas', 'Tellus at urna condimentum mattis pellentesque id nibh tortor. Lorem ipsum dolor sit amet. Fermentum iaculis eu non diam. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta.', '+30 6946945112', 'dimvav@gmail.com', 'https://www.facebook.com/dvavatsioulas', '/dimitris.jpg'),
(4, 'Eleni Charitou', 'Quis eleifend quam adipiscing vitae proin sagittis nisl. Eros donec ac odio tempor orci dapibus. Et molestie ac feugiat sed lectus. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Mattis molestie a iaculis at erat.', '+30 6984854225', 'charitou@yahoo.com', 'https://www.facebook.com/elencharitou98', '/eleni.jpg'),
(5, 'Dionisis Korkoutis', 'Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Id interdum velit laoreet id donec ultrices tincidunt arcu. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Lorem ipsum dolor sit amet. Ullamcorper morbi tincidunt ornare massa eget egestas.', '+30 6978824551', 'dionkor@gmail.com', 'https://www.facebook.com/dionisis.kor1', '/dionis.jpg'),
(6, 'Konstantinos Kamperidis', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus sit amet est placerat in egestas. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet.', '+30 6996975537', 'kkamper@yahoo.com', 'https://www.facebook.com/kwstas.kamper', '/kwstas.jpg');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `sqm` int(11) NOT NULL,
  `location` varchar(45) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `property_type` varchar(20) NOT NULL,
  `floor` int(11) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `sale_type` varchar(5) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `img_url` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `furnitured` varchar(4) DEFAULT NULL,
  `heating_type` varchar(30) NOT NULL,
  `built_year` int(11) NOT NULL,
  `parking` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `properties`
--

INSERT INTO `properties` (`id`, `price`, `sqm`, `location`, `bedrooms`, `bathrooms`, `property_type`, `floor`, `description`, `sale_type`, `phone`, `email`, `img_url`, `furnitured`, `heating_type`, `built_year`, `parking`) VALUES
(1, 350, 60, 'Thessaloniki', 2, 1, 'Apartment', 2, 'The apartment consists of a contemporary open plan living room with fitted kitchen area, family bathroom and one double bedroom with fitted wardrobe. A smart home system puts control of lighting, climate and blinds in the palm of your hand.', 'Rent', '6972562547', 'olyxen@gmail.com', 'https://lc.zoocdn.com/ad1449330f98810303b2f0992f014ba83f6e0327.jpg', 'Yes', 'Gas', 1993, 'No'),
(2, 78000, 90, 'Thessaloniki', 2, 2, 'Apartment', 1, 'Immaculate two bedroom flat arranged over the eleventh floor of this modern riverside development and offering stunning Thessaloniki views. The apartment offers an open plan reception room, smart kitchen with built in appliances, master bedroom with en-suite bathroom, further double bedroom and luxury bathroom and a good size balcony.', 'Sale', '6985351425', 'maria@gmail.com', 'https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/v1548955387/g5/g5-c-ipa80i9e-robbins-property-associates/g5-cl-1i4tf0rctl-arbor-village/uploads/01_gykx7a.jpg', 'No', 'Gas', 1980, 'No'),
(3, 160000, 140, 'Larisa', 4, 2, 'House', 3, 'Well presented throughout, this stunning 4 bedroom house is arranged over 3 floors and benefits from bright living space, large reception room, master bedroom with en-suite and a conservatory.\r\n', 'Sale', '6925149867', 'ria@gmail.com', 'https://media.onthemarket.com/properties/5985431/1123785671/image-0-480x320.jpg', 'No', 'Gas', 2002, 'Yes'),
(4, 290, 48, 'Kavala', 1, 1, 'Apartment', 1, 'A quiet 1 bedroom apartment with garden access ideal for a single or couple.', 'Rent', '6945369867', 'popi@hotmail.com', 'https://m1.spitogatos.gr/183168540_900x675.jpg?v=20140916', 'Yes', 'Diesel', 1986, 'No'),
(5, 650, 120, 'Larisa', 3, 2, 'House', 2, 'Short let. Situated in the center of town, this fantastic 3 bedroom Duplex apartment provides spacious and unique accommodation within a smart warehouse conversion.', 'Rent', '6973688542', 'john@outlook.com', 'http://www.oikies.net/appFol/appDetails/EstatePhotos/fol1611/img_2.jpg', 'No', 'Diesel', 2005, 'Yes'),
(25, 350, 48, 'Halkidiki', 1, 1, 'Apartment', 2, 'An iconic building defined by arching elevations and a curvingfaçade, Bézier offers a portfolio of luxurious two-bedroomPremier apartments with outstanding panoramic city views.', 'Rent', '6985463254', 'maraki@yahoo.com', 'https://m2.spitogatos.gr/182621221_900x675.jpg?v=20140916', 'No', 'Diesel', 2002, 'No'),
(28, 380, 56, 'Athens', 1, 1, 'Apartment', 2, 'Located in the Xalandri neighbourhood. This 1 bed property covers 56 sq meters, comes fully furnished and has plenty built in storage space.', 'Rent', '69853254', 'hetrtehre@yahoo.com', 'https://www.blue-bay.gr/wp-content/uploads/sites/123/2016/11/maisonette-blue-bay-sofa-1280x853.jpg', 'Yes', 'Gas', 2002, 'No'),
(29, 300, 60, 'Thessaloniki', 2, 1, 'Apartment', 1, 'A well presented one double bedroom apartment arranged over first floor of this well maintained purpose built block.', 'Rent', '6972547', 'lebron@gmail.com', 'http://www.westsquareboston.com/imgs/Residences/west-square-residences-2.jpg', 'Yes', 'Diesel', 1993, 'No'),
(30, 75000, 90, 'Athens', 2, 2, 'Apartment', 1, 'A superb, contemporary two bedroom apartment within the Atlas Building, a striking new development located in the heart of Athens\'s most vibrant district.\r\n', 'Sale', '69851425', 'bryant@gmail.com', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/06/35/7b/44.jpg', 'No', 'Gas', 1980, 'No'),
(31, 160000, 140, 'Athens', 4, 2, 'House', 3, 'A beautifully refurbished split level apartment that is incredibly bright, offering high ceilings and generously proportioned rooms.', 'Sale', '6925167', 'silensio@gmail.com', 'http://www.christakis-construction.gr/sites/www.christakis-construction.gr/files/styles/slideshow_project/public/images/project/slideshow/%CE%94%CE%91%CE%A1%CE%91%CE%A3%203.jpg?itok=d72CgDJf', 'No', 'Diesel', 2002, 'Yes'),
(32, 240, 35, 'Kavala', 1, 1, 'Apartment', 3, 'A stylish 1 bedroom apartment with its own private garden and plenty of charm located in a sought after period conversion.', 'Rent', '6945867', 'bryanti@hotmail.com', 'https://wp.zillowstatic.com/streeteasy/2/studio_tips-321ecc-1024x612.png', 'No', 'Gas', 1986, 'No'),
(33, 600, 120, 'Patra', 3, 2, 'House', 2, '100% Ready For LivingFully furnished: Beds and bedding, linen, cutlery, towels, wifi…All inclusive: From bills to a weekly cleanStay-to-the-day – no fixed contractsEnd-To-End', 'Rent', '6978542', 'karl@outlook.com', 'https://www.skourasrealestate.gr/img/o681971_1.jpg', 'Yes', 'Diesel', 2005, 'Yes'),
(34, 420, 55, 'Thessaloniki', 1, 1, 'Apartment', 5, 'One bedroom, 5th floor apartment near Rotonta.', 'Rent', '6985454', 'heyeyi@yahoo.com', 'https://m3.spitogatos.gr/182370950_900x675.jpg?v=20140916', 'No', 'Diesel', 2002, 'No'),
(35, 410, 48, 'Halkidiki', 1, 1, 'Apartment', 2, 'Located in the heart of the Kalithea, this contemporary studio flat (with lift and porter) is presented in excellent condition throughout and benefits from private balcony.', 'Rent', '587546', 'asdasdi@yahoo.com', 'https://m3.spitogatos.gr/180471017_900x675.jpg?v=20140916', 'No', 'Gas', 2002, 'No'),
(39, 70000, 100, 'Thessaloniki', 3, 2, 'House', 2, 'This modernised house on Thessaloniki, arranged over three floors, this three bedroom, two bathroom family home benefits from a large rear west facing garden and garage which can be converted to provide a further bedroom.', 'Sale', '697120', 'kaasdcrl@outlook.com', 'https://images1.forrent.com/i2/Jg-nldGYY4eTQFu9dx3dKiJmUYVz89Los8S2557mS5E/117/image.jpg', 'No', 'Diesel', 1995, 'Yes'),
(40, 630, 85, 'Patra', 2, 1, 'Apartment', 5, 'Short let. A two bedroom house located only moments from Patra\'s central park. This property comes fully furnished and fully equipped.', 'Rent', '6987458785', 'helen@yahoo.com', 'https://cdngeneral.rentcafe.com/dmslivecafe/3/1087708/Crew_Apartments%20Living%20Room.jpg?crop=(0,54,300,200)&cropxunits=300&cropyunits=200&quality=85&scale=both&', 'Yes', 'Gas', 2005, 'Yes'),
(42, 110000, 80, 'Patra', 3, 2, 'House', 2, 'A large and comfortable house for a big family', 'Sale', '2055614793', 'heyhey@skg.com', 'https://iconsgalore.com/wp-content/uploads/2018/10/house-1-featured-2.png', NULL, 'Gas', 1980, NULL),
(43, 110000, 80, 'Larisa', 3, 2, 'House', 2, 'A large and comfortable house for a big family', 'Sale', '2055614793', 'heyhey@skg.com', 'https://iconsgalore.com/wp-content/uploads/2018/10/house-1-featured-2.png', NULL, 'Gas', 1980, NULL);

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT για πίνακα `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

using Binus.WS.Pattern.Entities;
using BookingAppITDiv.Model;
using BookingAppITDiv.Model.Request;
using BookingAppITDiv.Output;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BookingAppITDiv.Helper
{
    public class BookingHelper
    {
        public static int AddNewBooking(TrBooking Data)
        {
            try
            {
                var DateDiff = (Data.CheckOutDate - Data.CheckInDate).TotalDays;
                var RoomData = RoomHelper.GetSpecificRoom(Data.RoomTypeID);
                EntityHelper.Add(new TrBooking()
                {
                    CustomerID = Data.CustomerID,
                    RoomTypeID = Data.RoomTypeID,
                    TransactionDate = DateTime.Now,
                    TotalPrice = (int)(DateDiff * RoomData.Price),
                    PaymentMethod = Data.PaymentMethod,
                    CheckInDate = Data.CheckInDate,
                    CheckOutDate = Data.CheckOutDate,
                    Stsrc = 'A',
                    UserIn = Data.UserIn,
                    DateIn = DateTime.Now
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return 1;
        }


        public static Boolean CheckBooking(TrBooking Booking, DateTime CheckOutDate)
        {
            return true;
        }

        public static List<BookingData> GetBookingByCustomerID(int customerID, bool isActive)
        {
            var RetVal = new List<BookingData>();
            try
            {
                //DateTime date2 = new DateTime(2022, 12, 2, 22, 59, 00);
                var roomTypeID = new List<int>();
                var Bookings = EntityHelper.Get<TrBooking>(Booking => Booking.CustomerID == customerID && Booking.Stsrc == 'A' && (isActive ? Booking.CheckOutDate.Date >= DateTime.Now.Date : Booking.CheckOutDate.Date < DateTime.Now.Date)).ToList();
                //if (true) throw new Exception(Bookings[0].CheckOutDate.ToUniversalTime() + "   " + DateTime.Now.ToUniversalTime());
                  
                Bookings.ForEach(e => roomTypeID.Add(e.RoomTypeID));

                var Room = EntityHelper.Get<MsRoomType>(room => roomTypeID.Contains(room.RoomTypeID)).ToList();

                var hotelID = new List<int>();
                Room.ForEach(e => hotelID.Add(e.HotelID));

                var hotel = EntityHelper.Get<MsHotel>(hotel => hotelID.Contains(hotel.HotelID)).ToList();

                RetVal = Bookings.Join(
                    Room,
                        bk => bk.RoomTypeID,
                        rm => rm.RoomTypeID,
                        (bk, rm) => new { bk, rm }
                    ).Join(
                        hotel,
                            jt => jt.rm.HotelID,
                            ht => ht.HotelID,
                            (jt, ht) => new BookingData()
                            {
                                BookingID = jt.bk.BookingID,
                                CustomerID = jt.bk.CustomerID,
                                RoomTypeID = jt.bk.RoomTypeID,
                                TransactionDate = jt.bk.TransactionDate,
                                TotalPrice = jt.bk.TotalPrice,
                                PaymentMethod = jt.bk.PaymentMethod,
                                CheckInDate = jt.bk.CheckInDate,
                                CheckOutDate = jt.bk.CheckOutDate,
                                HotelName = ht.HotelName,
                                HotelID = ht.HotelID,
                                HotelAddress = ht.Address,
                                RoomType = Room.Select(Room => new RoomData()
                                {
                                    RoomTypeID = Room.RoomTypeID,
                                    HotelID = Room.HotelID,
                                    RoomDescription = Room.RoomDescription,
                                    Price = Room.Price,
                                    TotalRoom = Room.TotalRoom,
                                    RoomName = Room.RoomName,
                                    Image1 = Room.Image1,
                                    Image2 = Room.Image2,
                                    Image3 = Room.Image3,
                                    Image4 = Room.Image4,
                                    BedType = Room.BedType,
                                    Rating = Room.Rating,
                                    TotalGuest = Room.TotalGuest
                                }).FirstOrDefault()
                            }).OrderByDescending(x => x.TransactionDate).ToList();

               

                if (RetVal.Capacity == 0) throw new Exception("404-Booking Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static BookingData GetSpecificBooking(int id)
        {
            var RetVal = new BookingData();

            try
            {
                RetVal = EntityHelper.Get<TrBooking>(
                    Booking => Booking.BookingID == id && Booking.Stsrc == 'A'
                ).Select(Booking => new BookingData()
                    {
                        BookingID = Booking.BookingID,
                        CustomerID = Booking.CustomerID,
                        RoomTypeID = Booking.RoomTypeID,
                        TransactionDate = Booking.TransactionDate,
                        TotalPrice = Booking.TotalPrice,
                        PaymentMethod = Booking.PaymentMethod,
                        CheckInDate = Booking.CheckInDate,
                        CheckOutDate = Booking.CheckOutDate
                    }
                ).FirstOrDefault();
                if (RetVal == null) throw new Exception("404-Booking Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }


        public static int UpdateSpecificBooking(TrBooking Data)
        {
            try
            {
                var SingleBooking = EntityHelper.Get<TrBooking>(
                    Booking => Booking.BookingID == Data.BookingID
                ).FirstOrDefault();

                // Check if the customer change room type or not
                if (!SingleBooking.RoomTypeID.Equals(Data.RoomTypeID))
                {
                    var RoomToBeChanged = EntityHelper.Get<MsRoomType>(
                        Room => Room.RoomTypeID == Data.RoomTypeID
                    ).FirstOrDefault();

                    if (RoomToBeChanged.Stsrc == 'D') throw new Exception("404-The room is already deleted");
                }

                if (SingleBooking == null) throw new Exception("404-Booking Not Found");

                EntityHelper.Update(new TrBooking()
                {
                    BookingID = Data.BookingID,
                    CustomerID = Data.CustomerID,
                    RoomTypeID = Data.RoomTypeID,
                    TransactionDate = Data.TransactionDate,
                    TotalPrice = Data.TotalPrice,
                    PaymentMethod = Data.PaymentMethod,
                    CheckInDate = Data.CheckInDate,
                    CheckOutDate = Data.CheckOutDate,
                    Stsrc = SingleBooking.Stsrc,
                    UserIn = SingleBooking.UserIn,
                    DateIn = SingleBooking.DateIn,
                    UserUp = Data.UserUp,
                    DateUp = DateTime.Now
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }

        public static int DeleteSpecificBooking(int id)
        {
            try
            {
                var SingleBooking = EntityHelper.Get<TrBooking>(
                    Booking => Booking.BookingID == id
                ).FirstOrDefault();

                if (SingleBooking == null) throw new Exception("404-Booking Not Found");

                EntityHelper.Update(new TrBooking()
                {
                    BookingID = SingleBooking.BookingID,
                    CustomerID = SingleBooking.CustomerID,
                    RoomTypeID = SingleBooking.RoomTypeID,
                    TransactionDate = SingleBooking.TransactionDate,
                    TotalPrice = SingleBooking.TotalPrice,
                    PaymentMethod = SingleBooking.PaymentMethod,
                    CheckInDate = SingleBooking.CheckInDate,
                    CheckOutDate = SingleBooking.CheckOutDate,
                    Stsrc = 'D',
                    UserIn = SingleBooking.UserIn,
                    DateIn = SingleBooking.DateIn,
                    UserUp = "Admin",
                    DateUp = DateTime.Now
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }
    }
}

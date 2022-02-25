using Binus.WS.Pattern.Output;
using BookingAppITDiv.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookingAppITDiv.Output
{
    public class TrBookingOutput : OutputBase
    {
        public List<BookingData> Bookings { get; set; }

        public TrBookingOutput()
        {
            this.Bookings = new List<BookingData>();
        }
    }

    public class SpecificBookingOutput : OutputBase
    {
        public BookingData Booking { get; set; }

        public SpecificBookingOutput()
        {
            this.Booking = new BookingData();
        }
    }

    public class AddEditDeleteBookingOutput : OutputBase
    {
        public int Success { get; set; }

        public AddEditDeleteBookingOutput()
        {
            this.Success = 0;
        }
    }

    public class BookingData
    {
        public int BookingID { get; set; }
        public int CustomerID { get; set; }
        public int RoomTypeID { get; set; }
        public DateTime TransactionDate { get; set; }
        public int TotalPrice { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string HotelName { get; set; }
        public string HotelAddress { get; set; }
        public int HotelID { get; set; }
        public RoomData RoomType { get; set; }

        //public int TotalNights { get; set; }
    }
}

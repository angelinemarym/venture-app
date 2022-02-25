using Binus.WS.Pattern.Output;
using BookingAppITDiv.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookingAppITDiv.Output
{
    public class HotelOutput : OutputBase
    {
        public List<HotelData> Hotels { get; set; }

        public HotelOutput()
        {
            this.Hotels = new List<HotelData>();
        }
    }

    public class SpecificHotelOutput : OutputBase
    {
        public HotelAndRoomsData Data { get; set; }

        public SpecificHotelOutput()
        {
            this.Data = new HotelAndRoomsData();
        }
    }

    public class AddEditDeleteHotelOutput : OutputBase
    {
        public int Success { get; set; }

        public AddEditDeleteHotelOutput()
        {
            this.Success = 0;
        }
    }

    public class HotelData
    {
        public int HotelID { get; set; }
        public string HotelName { get; set; }
        public string HotelDescription { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public decimal Rating { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        #nullable enable
        public string? Image3 { get; set; }
        public string? Image4 { get; set; }
        #nullable disable
    }

    public class HotelAndRoomsData
    {
        public int HotelID { get; set; }
        public string HotelName { get; set; }
        public string HotelDescription { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public decimal Rating { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        #nullable enable
        public string? Image3 { get; set; }
        public string? Image4 { get; set; }
        #nullable disable
        public List<RoomData> Rooms { get; set; }
    }
}

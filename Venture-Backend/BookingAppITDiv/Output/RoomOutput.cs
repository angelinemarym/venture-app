using Binus.WS.Pattern.Output;
using BookingAppITDiv.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookingAppITDiv.Output
{
    public class RoomOutput : OutputBase
    {
        public List<RoomData> Rooms { get; set; }

        public RoomOutput()
        {
            this.Rooms = new List<RoomData>();
        }
    }

    public class SpecificRoomOutput : OutputBase
    {
        public RoomData Room { get; set; }

        public SpecificRoomOutput()
        {
            this.Room = new RoomData();
        }
    }

    public class AddEditDeleteRoomOutput : OutputBase
    {
        public int Success { get; set; }

        public AddEditDeleteRoomOutput()
        {
            this.Success = 0;
        }
    }

    public class RoomData
    {
        public int RoomTypeID { get; set; }
        public int HotelID { get; set; }
        public string RoomDescription { get; set; }
        public int Price { get; set; }
        public int TotalRoom { get; set; }
        public string RoomName { get; set; }
        public string BedType { get; set; }
        public int TotalGuest { get; set; }
        public decimal Rating { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public bool AvailableOrNot { get; set; }
        #nullable enable
        public string? Image3 { get; set; }
        public string? Image4 { get; set; }

    }
}

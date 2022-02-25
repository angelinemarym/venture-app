using Binus.WS.Pattern.Output;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookingAppITDiv.Output
{
    // Get All Customer Registered
    public class HotelSearchOutput : OutputBase
    {
        public List<HotelSearchData> Hotels { get; set; }

        public HotelSearchOutput()
        {
            this.Hotels = new List<HotelSearchData>();
        }
    }


    public class HotelSearchData
    {
        public int HotelID { get; set; }
        public string Address { get; set; }
        public string HotelName { get; set; }
        public string Image { get; set; }
    }
}

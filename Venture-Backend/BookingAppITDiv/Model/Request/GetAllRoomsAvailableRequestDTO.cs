using System;

namespace BookingAppITDiv.Model.Request
{
    public class GetAllRoomsAvailableRequestDTO
    {
        public int HotelID { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
    }
}

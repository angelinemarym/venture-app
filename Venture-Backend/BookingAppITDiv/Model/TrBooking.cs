using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("trCustomerBooking")]
    public class TrBooking : BaseModel
    {
        [Key]
        [Column("BookingID")]
        public int BookingID { get; set; }
        [ForeignKey("CustomerID")]
        [Column("CustomerID")]
        public int CustomerID { get; set; }
        [ForeignKey("RoomTypeID")]
        [Column("RoomTypeID")]
        public int RoomTypeID { get; set; }
        [Column("TransactionDate")]
        public DateTime TransactionDate { get; set; }
        [Column("TotalPrice")]
        public int TotalPrice { get; set; }
        [Column("CheckInDate")]
        public DateTime CheckInDate { get; set; }
        [Column("CheckOutDate")]
        public DateTime CheckOutDate { get; set; }
        [Column("PaymentMethod")]
        public string PaymentMethod { get; set; }
        [Column("Stsrc")]
        public char Stsrc { get; set; }
        [Column("UserIn")]
        public string UserIn { get; set; }
        [Column("DateIn")]
        public DateTime DateIn { get; set; }
        #nullable enable
        [Column("UserUp")]
        public string? UserUp { get; set; }
        [Column("DateUp")]
        public DateTime? DateUp { get; set; }
    }
}

using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("msHotel")]
    public class MsHotel : BaseModel
    {
        [Key]
        [Column("HotelID")]
        public int HotelID { get; set; }
        [Column("HotelName")]
        public string HotelName { get; set; }
        [Column("HotelDescription")]
        public string HotelDescription { get; set; }
        [Column("PhoneNumber")]
        public string PhoneNumber { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("Address")]
        public string Address { get; set; }
        [Column("Rating")]
        public decimal Rating { get; set; }
        [Column("Image1")]
        public string Image1 { get; set; }
        [Column("Image2")]
        public string Image2 { get; set; }
        [Column("Stsrc")]
        public char Stsrc { get; set; }
        [Column("UserIn")]
        public string UserIn { get; set; }
        [Column("UserUp")]
        #nullable enable
        public string? UserUp { get; set; }
        [Column("DateIn")]
        public DateTime DateIn { get; set; }
        [Column("DateUp")]
        public DateTime? DateUp { get; set; }
        [Column("Image3")]
        public string? Image3 { get; set; }
        [Column("Image4")]
        public string? Image4 { get; set; }
    }
}

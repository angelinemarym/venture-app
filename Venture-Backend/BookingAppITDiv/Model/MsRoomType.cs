using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("msRoomType")]
    public class MsRoomType : BaseModel
    {
        [Key]
        [Column("RoomTypeID")]
        public int RoomTypeID { get; set; }
        [ForeignKey("HotelID")]
        [Column("HotelID")]
        public int HotelID { get; set; }
        [Column("RoomDescription")]
        public string RoomDescription { get; set; }
        [Column("Price")]
        public int Price { get; set; }
        [Column("TotalRoom")]
        public int TotalRoom { get; set; }
        [Column("RoomName")]
        public string RoomName { get; set; }
        [Column("Image1")]
        public string Image1 { get; set; }
        [Column("Image2")]
        public string Image2 { get; set; }
        [Column("BedType")]
        public string BedType { get; set; }
        [Column("TotalGuest")]
        public int TotalGuest { get; set; }
        [Column("Rating")]
        public decimal Rating { get; set; }
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
        [Column("Image3")]
        public string? Image3 { get; set; }
        [Column("Image4")]
        public string? Image4 { get; set; }
    }
}

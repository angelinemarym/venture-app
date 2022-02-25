using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("msHotelImage")]
    public class MsHotelImage : BaseModel
    {
        [Key]
        [Column("HotelImageID")]
        public int HotelImageID { get; set; }
        [ForeignKey("HotelID")]
        [Column("HotelID")]
        public int HotelID { get; set; }
        [Column("Image")]
        public string Image { get; set; }
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
    }
}

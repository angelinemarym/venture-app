using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("msRoomImage")]
    public class MsRoomImage : BaseModel
    {
        [Key]
        [Column("RoomImageID")]
        public int RoomImageID { get; set; }
        [ForeignKey("RoomTypeID")]
        [Column("RoomTypeID")]
        public int RoomTypeID { get; set; }
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

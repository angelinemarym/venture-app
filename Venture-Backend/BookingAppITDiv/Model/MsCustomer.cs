using Binus.WS.Pattern.Model;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppITDiv.Model
{
    [DatabaseName("DB")]
    [Table("msCustomer")]
    public class MsCustomer : BaseModel
    {
        [Key]
        [Column("CustomerID")]
        public int CustomerID { get; set; }
        [Column("FirstName")]
        public string FirstName { get; set; }
        [Column("LastName")]
        public string LastName { get; set; }
        [Column("Gender")]
        public string Gender { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("Password")]
        public string Password { get; set; }
        [Column("Phone")]
        public string Phone { get; set; }
        [Column("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }
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

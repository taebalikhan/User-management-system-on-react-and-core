using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public required string firstName { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public required string lastName { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public required string phoneNo { get; set; }

        [Required]
        [EmailAddress]
        public required string emailID { get; set; }

        [Required]
        [MinLength(6)]
        public required string password { get; set; }
    }
}

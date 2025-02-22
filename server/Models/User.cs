using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        
        [Column(TypeName = "varchar(100)")]
        public required string firstName { get; set; }

        
        [Column(TypeName = "varchar(100)")]
        public required string lastName { get; set; }

        
        [Column(TypeName = "varchar(10)")]
        public required string phoneNo { get; set; }

        
        [EmailAddress]
        public required string emailID { get; set; }

        
        [MinLength(6)]
        public required string password { get; set; }
    }
}

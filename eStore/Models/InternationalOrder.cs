using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Models
{
    public partial class InternationalOrder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int OrderID { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomsDescription { get; set; }

        [Column(TypeName = "money")]
        public decimal ExciseTax { get; set; }

        public virtual Order Order { get; set; }
    }
}

using Sabio.Models.Domain.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Message
    {   
        public int Id { get; set; }
        public string MessageContent { get; set; }
        public int RecipientId { get; set; }
        public int SenderId { get; set; }
        public DateTime? DateSent { get; set; }
        public bool isDeleted { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateCreated { get; set; }
        public RecipientUser Recipient { get; set; }
    }
}

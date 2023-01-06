using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.SurveyQuestions
{
    public class SurveyQuestionAnswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public int NextQuestionId { get; set; }
        public string AdditionalInfo { get; set; }
        public int AnswerRequirementId { get; set; }
        public string AnswerRequirementName { get; set; }
        public string AnswerRequirementDescription { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

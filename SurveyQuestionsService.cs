using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Messages;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Messages;
using Sabio.Models.Requests.SurveyQuestions;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.SurveyQuestions;
using Newtonsoft.Json;

namespace Sabio.Services
{
    public class SurveyQuestionsService : ISurveyQuestionsService
    {
        IDataProvider _data = null;

        public SurveyQuestionsService(IDataProvider data)
        {
            _data = data;
        }

        public void DeleteSurveyQuestion(int id)
        {
            string procName = "dbo.SurveyQuestions_Delete_ById";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("id", id);
            }, returnParameters: null);

        }

        public void DeleteSurveyQuestionAnswer(int id)
        {
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("id", id);
            }, returnParameters: null);

        }

        public int AddSurveyQuestion(SurveyQuestionAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[SurveyQuestions_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        public List<SurveyQuestion> GetBySurveyId(int surveyId)
        {
            string procName = "[dbo].[SurveyQuestions_Select_BySurveyId]";

            List<SurveyQuestion> friends = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("SurveyId", surveyId);
            }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SurveyQuestion friend = MapSurveyQuestionsAndAnswers(reader);

                    if (friends == null)
                    {
                        friends = new List<SurveyQuestion>();
                    }
                    friends.Add(friend);
                });
            return friends;
        }

        public void UpdateSurveyQuestion(SurveyQuestionUpdateRequest model)
        {
            string procName = "[dbo].[SurveyQuestions_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                AddCommonParams(model, col);
                
            }, returnParameters: null);
        }


        private static void AddCommonParams(SurveyQuestionAddRequest model, SqlParameterCollection col)
        {
            DataTable dt = MapAnswers(model.Answers);

            col.AddWithValue("@Answers", dt);
            col.AddWithValue("@Question", model.Question);
            col.AddWithValue("@HelpText", model.HelpText);
            col.AddWithValue("@SurveyId", model.SurveyId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@SortOrder", model.SortOrder);
           
        }

        private static SurveyQuestion MapSurveyQuestionsAndAnswers(IDataReader reader)
        {
            SurveyQuestion surveyQuestion = new SurveyQuestion();
            
            int idx = 0;

            surveyQuestion.Id = reader.GetSafeInt32(idx++);
            surveyQuestion.Question = reader.GetSafeString(idx++);  
            surveyQuestion.HelpText = reader.GetSafeString(idx++);
            surveyQuestion.SurveyId = reader.GetSafeInt32(idx++);
            surveyQuestion.StatusId = reader.GetSafeInt32(idx++);
            surveyQuestion.SortOrder = reader.GetSafeInt32(idx++);
            surveyQuestion.DateCreated = reader.GetSafeDateTime(idx++);
            surveyQuestion.DateModified = reader.GetSafeDateTime(idx++);
            surveyQuestion.SurveyQuestionAnswers = reader.DeserializeObject<List<SurveyQuestionAnswer>>(idx++);
         



            return surveyQuestion;
        }
        private static DataTable MapAnswers(List<SurveyQuestionAnswerAddRequest> model)
        {
            var dt = new DataTable();

            dt.Columns.Add("Text", typeof(string));
            dt.Columns.Add("NextQuestionId", typeof(int));
            dt.Columns.Add("AnswerRequirementId", typeof(int));
            dt.Columns.Add("AdditionalInfo", typeof(string));

            foreach (SurveyQuestionAnswerAddRequest answer in model)
            {
                DataRow dr = dt.NewRow();

                int idx = 0;
                dr.SetField(idx++, answer.Text);
                dr.SetField(idx++, answer.NextQuestionId);  
                dr.SetField(idx++, answer.AnswerRequirementId);
                dr.SetField(idx++, answer.AdditionalInfo);

                dt.Rows.Add(dr);
            }

             return dt;
        }
    }
}


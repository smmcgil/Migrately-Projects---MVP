using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Sabio.Models.Domain.SurveyQuestions;
using Sabio.Models.Requests.SurveyQuestions;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{

    [Route("api/surveys/questions")]
    [ApiController]
    public class SurveyQuestionsApiController : BaseApiController
    {
        private ISurveyQuestionsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyQuestionsApiController(ISurveyQuestionsService service
           , ILogger<SurveyQuestionsApiController> logger
           , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{surveyId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<SurveyQuestion>> Get(int surveyId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<SurveyQuestion> friends = _service.GetBySurveyId(surveyId);
                if (friends == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");
                }
                else
                {
                    response = new ItemsResponse<SurveyQuestion> { Items = friends };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult DeleteSurveyQuestion(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteSurveyQuestion(id);

                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("answers/{id:int}")]
        public ActionResult DeleteSurveyQuestionAnswer(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteSurveyQuestionAnswer(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        
        [HttpPost]
        public ActionResult<ItemResponse<int>> CreateSurveyQuestion(SurveyQuestionAddRequest model)
        {
            ObjectResult result = null;
            
            try
            {

                int id = _service.AddSurveyQuestion(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateSurveyQuestion(SurveyQuestionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSurveyQuestion(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }



}

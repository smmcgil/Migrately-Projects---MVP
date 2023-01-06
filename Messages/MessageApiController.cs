using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.Messages;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Data.SqlClient;
using System.Data;
using System.Xml.Linq;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;  
using Sabio.Models.Domain;
using System.Collections.Generic;
using Sabio.Web.Models;

namespace Sabio.Web.Api.Controllers.Messages
{
    [Route("api/messages")]
    [ApiController]
    public class MessageApiController : BaseApiController
    {
        private IMessageService _service = null;
        private IAuthenticationService<int> _authService = null;

        public MessageApiController(IMessageService service
            , ILogger<MessageApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<ItemResponse<int>> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(MessageAddRequest model)
        {

            ObjectResult result = null;

            try
            {

                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model);
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
        public ActionResult<ItemResponse<int>> Update(MessageUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<Message>> GetByRecipientId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Message> msgs = _service.GetByRecipientId(id);

                if (msgs == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = msgs };
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

        [HttpGet("latest/{id:int}")]
        public ActionResult<ItemsResponse<List<Message>>> GetLatest(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Message> msgs = _service.SelectLatestMessages(id);

                if (msgs == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = msgs };
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

    }
}

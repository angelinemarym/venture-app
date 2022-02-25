using Binus.WS.Pattern.Output;
using Binus.WS.Pattern.Service;
using BookingAppITDiv.Model;
using BookingAppITDiv.Model.Request;
using BookingAppITDiv.Output;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace BookingAppITDiv.Services
{
    [ApiController]
    [Route("room")]
    public class RoomService : BaseService
    {
        public RoomService(ILogger<BaseService> logger) : base(logger)
        {
        }

        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteRoomOutput), StatusCodes.Status200OK)]
        public IActionResult AddNewRoom([FromBody] MsRoomType Data)
        {
            try
            {
                // Value verification
                if (
                    Data.HotelID == 0 || Data.RoomDescription == null ||
                    Data.Price == 0 || Data.TotalRoom == 0 ||
                    Data.RoomName == null || Data.UserIn == null ||
                    Data.RoomDescription == "" || Data.RoomName == "" ||
                    Data.UserIn == ""
                ) throw new Exception("Please fill all fields");

                // Value length verification
                if (
                    Data.RoomDescription.Length > 50 || Data.RoomName.Length > 50 ||
                    Data.UserIn.Length > 50
                ) throw new Exception("Data cannot be more than 50 characters");

                var objJSON = new AddEditDeleteRoomOutput();
                objJSON.Success = Helper.RoomHelper.AddNewRoom(Data);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OutputBase(ex));
            }
        }


        [HttpPost]
        [Route("available")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(RoomOutput), StatusCodes.Status200OK)]
        public IActionResult GetAllRoomsAvailable([FromBody] GetAllRoomsAvailableRequestDTO Data)
        {
            try
            {
                if (Data.HotelID == 0 || Data.CheckInDate == new DateTime() || Data.CheckOutDate == new DateTime())
                    throw new Exception("Please insert all fields");

                var objJSON = new RoomOutput();
                objJSON.Rooms = Helper.RoomHelper.GetAllRoomsAvailable(Data.HotelID, Data.CheckInDate, Data.CheckOutDate);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                var exc = new OutputBase(ex);
                if (ex.Message.Contains("404"))
                {
                    // Taking Status Code
                    exc.ResultCode = int.Parse(ex.Message[..3]);
                    // Taking Error Message
                    exc.ErrorMessage = ex.Message.Remove(0, 4);
                }
                return StatusCode(exc.ResultCode, exc);
            }
        }

        [HttpGet]
        [Route("specific")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(SpecificRoomOutput), StatusCodes.Status200OK)]
        public IActionResult GetSpecificRoom([FromQuery] int id)
        {
            try
            {
                if (id == 0)throw new Exception("404-Please Insert RoomID");

                var objJSON = new SpecificRoomOutput();
                objJSON.Room = Helper.RoomHelper.GetSpecificRoom(id);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                var exc = new OutputBase(ex);
                if (ex.Message.Contains("404"))
                {
                    // Taking Status Code
                    exc.ResultCode = int.Parse(ex.Message[..3]);
                    // Taking Error Message
                    exc.ErrorMessage = ex.Message.Remove(0, 4);
                }
                return StatusCode(exc.ResultCode, exc);
            }
        }



        [HttpPatch]
        [Route("specific")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteRoomOutput), StatusCodes.Status200OK)]
        public IActionResult UpdateSpecificRoom([FromBody] MsRoomType Data)
        {
            try
            {
                if (Data.RoomTypeID == 0) throw new Exception("404-Please Insert RoomID");

                var objJSON = new AddEditDeleteRoomOutput();
                objJSON.Success = Helper.RoomHelper.UpdateSpecificRoom(Data);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                var exc = new OutputBase(ex);
                if (ex.Message.Contains("404"))
                {
                    // Taking Status Code
                    exc.ResultCode = int.Parse(ex.Message[..3]);
                    // Taking Error Message
                    exc.ErrorMessage = ex.Message.Remove(0, 4);
                }
                return StatusCode(exc.ResultCode, exc);
            }
        }

        [HttpPatch]
        [Route("specific/delete")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteRoomOutput), StatusCodes.Status200OK)]
        public IActionResult DeleteSpecificRoom([FromQuery] int id)
        {
            try
            {
                if (id == 0) throw new Exception("404-Please Insert RoomID");

                var objJSON = new AddEditDeleteRoomOutput();
                objJSON.Success = Helper.RoomHelper.DeleteSpecificRoom(id);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                var exc = new OutputBase(ex);
                if (ex.Message.Contains("404"))
                {
                    // Taking Status Code
                    exc.ResultCode = int.Parse(ex.Message[..3]);
                    // Taking Error Message
                    exc.ErrorMessage = ex.Message.Remove(0, 4);
                }
                return StatusCode(exc.ResultCode, exc);
            }
        }
    }
}

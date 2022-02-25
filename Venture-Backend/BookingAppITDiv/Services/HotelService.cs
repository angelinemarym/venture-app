using Binus.WS.Pattern.Output;
using Binus.WS.Pattern.Service;
using BookingAppITDiv.Model;
using BookingAppITDiv.Output;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace BookingAppITDiv.Services
{
    [ApiController]
    [Route("hotel")]
    public class HotelService : BaseService
    {
        public HotelService(ILogger<BaseService> logger) : base(logger)
        {
        }

        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteHotelOutput), StatusCodes.Status200OK)]
        public IActionResult AddNewHotel([FromBody] MsHotel Data)
        {
            try
            {
                // Value verification
                if (
                    Data.HotelName == null || Data.HotelDescription == null ||
                    Data.PhoneNumber == null || Data.Email == null ||
                    Data.Address == null || Data.Rating == 0 ||
                    Data.UserIn == null || Data.HotelName == "" || Data.HotelDescription == "" ||
                    Data.PhoneNumber == "" || Data.Email == "" ||
                    Data.Address == "" || Data.UserIn == ""
                ) throw new Exception("Please fill all fields");

                // Value length verification
                if (
                    Data.HotelName.Length > 50 || Data.HotelDescription.Length > 50 ||
                    Data.PhoneNumber.Length > 50 || Data.Email.Length > 50 ||
                    Data.Address.Length > 50 || Data.UserIn.Length > 50
                ) throw new Exception("Data cannot be more than 50 characters");

                var objJSON = new AddEditDeleteHotelOutput();
                objJSON.Success = Helper.HotelHelper.AddNewHotel(Data);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OutputBase(ex));
            }
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(HotelOutput), StatusCodes.Status200OK)]
        public IActionResult GetAllHotel()
        {
            try
            {
                var objJSON = new HotelOutput();
                objJSON.Hotels = Helper.HotelHelper.GetAllHotel();
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
        [Produces("application/json")]
        [Route("search")]
        [ProducesResponseType(typeof(HotelSearchOutput), StatusCodes.Status200OK)]
        public IActionResult GetHotelByAddress([FromQuery] string address)
        {
            try
            {
                var objJSON = new HotelSearchOutput();
                objJSON.Hotels = Helper.HotelHelper.GetHotelByAddress(address);
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
        [ProducesResponseType(typeof(SpecificHotelOutput), StatusCodes.Status200OK)]
        public IActionResult GetSpecificHotelAndRooms([FromQuery] int id)
        {
            try
            {
                if (id == 0) throw new Exception("404-Please Insert HotelID");

                var objJSON = new SpecificHotelOutput();
                objJSON.Data = Helper.HotelHelper.GetSpecificHotelAndRooms(id);
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
        [ProducesResponseType(typeof(AddEditDeleteHotelOutput), StatusCodes.Status200OK)]
        public IActionResult UpdateSpecificHotel([FromBody] MsHotel Data)
        {
            try
            {
                if (Data.HotelID == 0) throw new Exception("404-Please Insert HotelID");

                var objJSON = new AddEditDeleteHotelOutput();
                objJSON.Success = Helper.HotelHelper.UpdateSpecificHotel(Data);
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
        [ProducesResponseType(typeof(AddEditDeleteHotelOutput), StatusCodes.Status200OK)]
        public IActionResult DeleteSpecificHotel([FromQuery] int id)
        {
            try
            {
                if (id == 0) throw new Exception("404-Please Insert HotelID");

                var objJSON = new AddEditDeleteHotelOutput();
                objJSON.Success = Helper.HotelHelper.DeleteSpecificHotel(id);
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

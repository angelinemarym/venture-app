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
    [Route("booking")]
    public class BookingService : BaseService
    {
        public BookingService(ILogger<BaseService> logger) : base(logger)
        {
        }

        [HttpPost]
        [Route("add")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteBookingOutput), StatusCodes.Status200OK)]
        public IActionResult AddNewBooking([FromBody] TrBooking Data, [FromHeader] string Authorization)
        {
            try
            {
                if (!Helper.ValidateCustomerHelper.ValidateCustomer(Data.CustomerID, Authorization))
                {
                    throw new Exception("404-Wrong Header Credential");
                }
                // Value Verification
                if (
                    Data.CustomerID == 0 || Data.RoomTypeID == 0 ||
                   /* Data.TransactionDate == new DateTime() || Data.TotalPrice == 0 || */
                    Data.CheckInDate == new DateTime() ||
                    Data.CheckOutDate == new DateTime() ||
                    Data.UserIn == null || Data.PaymentMethod == null ||
                    Data.UserIn == "" || Data.PaymentMethod == ""
                ) throw new Exception("Please fill all fields");

                // Value length verification
                if (Data.UserIn.Length > 50)
                    throw new Exception("Data cannot be more than 50 characters");
                
                var objJSON = new AddEditDeleteCustomerOutput();
                objJSON.Success = Helper.BookingHelper.AddNewBooking(Data);
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OutputBase(ex));
            }
        }
        
        [HttpGet]
        [Route("customer")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(TrBookingOutput), StatusCodes.Status200OK)]
        public IActionResult GetBookingByCustomerID([FromQuery] int customerID, [FromQuery] bool isActive, [FromHeader] string Authorization)
        {
            try
            {
                //if (!Helper.ValidateCustomerHelper.ValidateCustomer(customerID, Authorization))
                //{
                //    throw new Exception("404-Wrong Header Credential");
                //}
                var objJSON = new TrBookingOutput();
                objJSON.Bookings = Helper.BookingHelper.GetBookingByCustomerID(customerID, isActive);
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
        [ProducesResponseType(typeof(TrBookingOutput), StatusCodes.Status200OK)]
        public IActionResult GetSpecificBooking([FromQuery] int bookingID, [FromQuery] int customerID, [FromHeader] string Authorization)
        {
            try
            {
                if (!Helper.ValidateCustomerHelper.ValidateCustomer(customerID, Authorization))
                {
                    throw new Exception("404-Wrong Header Credential");
                }
                var objJSON = new SpecificBookingOutput();
                objJSON.Booking = Helper.BookingHelper.GetSpecificBooking(bookingID);
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
        [ProducesResponseType(typeof(AddEditDeleteBookingOutput), StatusCodes.Status200OK)]
        public IActionResult UpdateSpecificBooking([FromBody] TrBooking Data)
        {
            try
            {
                if (Data.BookingID == 0) throw new Exception("404-Please Insert CustomerID");

                var objJSON = new AddEditDeleteBookingOutput();
                objJSON.Success = Helper.BookingHelper.UpdateSpecificBooking(Data);
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
        [ProducesResponseType(typeof(AddEditDeleteBookingOutput), StatusCodes.Status200OK)]
        public IActionResult DeleteSpecificBooking([FromQuery] int id)
        {
            try
            {
                if (id == 0) throw new Exception("404-Please Insert CustomerID");

                var objJSON = new AddEditDeleteBookingOutput();
                objJSON.Success = Helper.BookingHelper.DeleteSpecificBooking(id);
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

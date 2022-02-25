using Binus.WS.Pattern.Output;
using Binus.WS.Pattern.Service;
using BookingAppITDiv.Model;
using BookingAppITDiv.Model.Request;
using BookingAppITDiv.Output;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Cryptography;
using System.Text;


namespace BookingAppITDiv.Services
{
    [ApiController]
    [Route("customer")]
    public class CustomerService : BaseService
    {
        public CustomerService(ILogger<BaseService> logger) : base(logger)
        {
        }

        [HttpPost]
        [Route("login")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteCustomerOutput), StatusCodes.Status200OK)]
        public IActionResult LoginCustomer([FromBody] LoginCustomerRequestDTO Data)
        {
            try
            {
                var objJSON = new AddEditDeleteCustomerOutput();
                objJSON.UserID = Helper.CustomerHelper.LoginCustomer(Data);
                objJSON.Success = 1;
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

        [HttpPost]
        [Route("register")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(AddEditDeleteCustomerOutput), StatusCodes.Status200OK)]
        public IActionResult AddNewCustomer([FromBody] MsCustomer Data)
        {
            try
            {
                // Value verification
                if (Data.FirstName == "" || Data.LastName == "" ||
                    Data.Gender == "" || Data.Email == "" ||
                    Data.Password == "" || Data.Phone == "" ||
                    Data.UserIn == "" || Data.DateOfBirth == new DateTime() ||
                    Data.FirstName == null || Data.LastName == null ||
                    Data.Gender == null || Data.Email == null ||
                    Data.Password == null || Data.Phone == null ||
                    Data.UserIn == null
                ) throw new Exception("Please fill all fields");

                // Value length verification
                if (
                    Data.FirstName.Length > 50 || Data.LastName.Length > 50 ||
                    Data.Gender.Length > 50 || Data.Email.Length > 50 ||
                    Data.Password.Length > 50 || Data.Phone.Length > 50 ||
                    Data.UserIn.Length > 50
                ) throw new Exception("Data cannot be more than 50 characters");

                // Age Verification (Must be >= 17 years old)
                var DateNow = DateTime.Today;
                var DateNowCalculation = (DateNow.Year * 100 + DateNow.Month) * 100 + DateNow.Day;
                var DOBCalculation = (Data.DateOfBirth.Year * 100 + Data.DateOfBirth.Month) * 100 + Data.DateOfBirth.Day;
                int age = (DateNowCalculation - DOBCalculation) / 10000;
                if (age < 17) throw new Exception("Customer cannot be underage");

                var objJSON = new AddEditDeleteCustomerOutput();
                objJSON.UserID = Helper.CustomerHelper.AddNewCustomer(Data);
                objJSON.Success = 1;
                return new OkObjectResult(objJSON);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new OutputBase(ex));
            }
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CustomersOutput), StatusCodes.Status200OK)]
        public IActionResult GetAllCustomer()
        {
            try
            {
                var objJSON = new CustomersOutput();
                objJSON.Customers = Helper.CustomerHelper.GetAllCustomer();
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
        [ProducesResponseType(typeof(SpecificCustomerOutput), StatusCodes.Status200OK)]
        public IActionResult GetSpecificCustomer([FromQuery] int id, [FromHeader] string Authorization)
        {
            try
            {
                if(!Helper.ValidateCustomerHelper.ValidateCustomer(id, Authorization))
                {
                    throw new Exception("404-Wrong Header Credential");
                }

                if (id == 0) throw new Exception("404-Please Insert CustomerID");

                var objJSON = new SpecificCustomerOutput();
                objJSON.Customer = Helper.CustomerHelper.GetSpecificCustomer(id);
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
        [ProducesResponseType(typeof(AddEditDeleteCustomerOutput), StatusCodes.Status200OK)]
        public IActionResult UpdateSpecificCustomer([FromBody] MsCustomer Data, [FromHeader] string Authorization)
        {
            try
            {
                if (!Helper.ValidateCustomerHelper.ValidateCustomer(Data.CustomerID, Authorization))
                {
                    throw new Exception("404-Wrong Header Credential");
                }

                if (Data.CustomerID == 0) throw new Exception("404-Please Insert CustomerID");

                var objJSON = new AddEditDeleteCustomerOutput();
                objJSON.Success = Helper.CustomerHelper.UpdateSpecificCustomer(Data);
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
        [ProducesResponseType(typeof(AddEditDeleteCustomerOutput), StatusCodes.Status200OK)]
        public IActionResult DeleteSpecificCustomer([FromQuery] int id, [FromHeader] string Authorization)
        {   
            try
            {
                if (!Helper.ValidateCustomerHelper.ValidateCustomer(id, Authorization))
                {
                    throw new Exception("404-Wrong Header Credential");
                }
                if (id == 0) throw new Exception("404-Please Insert CustomerID");

                var objJSON = new AddEditDeleteCustomerOutput();
                objJSON.Success = Helper.CustomerHelper.DeleteSpecificCustomer(id);
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

        public static string Encrypt(string x)
        {
            var ByteArrayResultRawData = Encoding.UTF8.GetBytes(x);
            var ByteArrayResult = MD5.Create().ComputeHash(ByteArrayResultRawData);
            var Result = string.Concat(Array.ConvertAll(ByteArrayResult, hash => hash.ToString("X2")));
            return Result;
        }
    }
}

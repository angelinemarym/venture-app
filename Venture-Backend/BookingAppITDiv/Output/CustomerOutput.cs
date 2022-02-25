using Binus.WS.Pattern.Output;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookingAppITDiv.Output
{
    // Get All Customer Registered
    public class CustomersOutput : OutputBase
    {
        public List<CustomerData> Customers { get; set; }

        public CustomersOutput()
        {
            this.Customers = new List<CustomerData>();
        }
    }

    // Get Specific Customer
    public class SpecificCustomerOutput : OutputBase
    {
        public CustomerData Customer { get; set; }

        public SpecificCustomerOutput()
        {
            this.Customer = new CustomerData();
        }
    }

    // Add Customer to be an User
    public class AddEditDeleteCustomerOutput : OutputBase
    {
        public int Success { get; set; }
        public int UserID { get; set; }

        public AddEditDeleteCustomerOutput()
        {
            this.Success = 0;
            this.UserID = 0;
        }
    }

    public class CustomerData
    {
        public int CustomerID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        #nullable enable
        public string? DateOfBirth { get; set; }
    }
}

using Binus.WS.Pattern.Entities;
using BookingAppITDiv.Model;
using BookingAppITDiv.Model.Request;
using BookingAppITDiv.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using BookingAppITDiv.Helper;

namespace BookingAppITDiv.Helper
{
    public class CustomerHelper
    {
        public static int LoginCustomer(LoginCustomerRequestDTO Data)
        {
            var Customer = new MsCustomer();
            try
            {               
                if (Data.UserID != 0 && Data.AuthKey != null)
                {

                    if(!Helper.ValidateCustomerHelper.ValidateCustomer(Data.UserID, Data.AuthKey))
                    {
                        throw new Exception("404-Wrong Credential");
                    }

                    Customer = EntityHelper.Get<MsCustomer>(
                        Customer => Customer.CustomerID == Data.UserID
                    ).FirstOrDefault();
                }
                else
                {
                    Customer = EntityHelper.Get<MsCustomer>(
                        Customer => Customer.Email == Data.Email && Customer.Password == Data.Password
                    ).FirstOrDefault();
                }

                if (Customer == null) throw new Exception("404-Account Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return Customer.CustomerID;
        }

        public static int AddNewCustomer(MsCustomer Data)
        {
            var Customer = new MsCustomer();
            try
            {
                Customer = EntityHelper.Get<MsCustomer>(
                   Customer => Customer.Email == Data.Email || Customer.Phone == Data.Phone
               ).FirstOrDefault();

                if (Customer != null) throw new Exception("Invalid Input");

                EntityHelper.Add(new MsCustomer()
                {
                    FirstName = Data.FirstName,
                    LastName = Data.LastName,
                    Gender = Data.Gender,
                    Email = Data.Email,
                    Password = Data.Password,
                    Phone = Data.Phone,
                    Stsrc = 'A',
                    UserIn = Data.UserIn,
                    DateIn = DateTime.Now,
                    DateOfBirth = Data.DateOfBirth
                });

                Customer = EntityHelper.Get<MsCustomer>(
                  Customer => Customer.Email == Data.Email
              ).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return Customer.CustomerID;
        }

        public static List<CustomerData> GetAllCustomer()
        {
            var RetVal = new List<CustomerData>();

            try
            {
                RetVal = EntityHelper.Get<MsCustomer>(
                    Customer => Customer.Stsrc == 'A'
                ).Select(
                    Customer => new CustomerData()
                    {
                        CustomerID = Customer.CustomerID,
                        FirstName = Customer.FirstName,
                        LastName = Customer.LastName,
                        Gender = Customer.Gender,
                        Email = Customer.Email,
                        Phone = Customer.Phone,
                        DateOfBirth = Customer.DateOfBirth.ToString()
                    }
                ).ToList();
                
                if (RetVal.Capacity == 0) throw new Exception("404-Account not found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static CustomerData GetSpecificCustomer(int CustomerID)
        {
            var RetVal = new CustomerData();

            try
            {
                RetVal = EntityHelper.Get<MsCustomer>(
                    Customer => Customer.CustomerID == CustomerID && Customer.Stsrc == 'A'
                ).Select(Customer => new CustomerData()
                    {
                        CustomerID = Customer.CustomerID,
                        FirstName = Customer.FirstName,
                        LastName = Customer.LastName,
                        Gender = Customer.Gender,
                        Email = Customer.Email,
                        Phone = Customer.Phone,
                        DateOfBirth = Customer.DateOfBirth.ToString()
                    }
                ).FirstOrDefault();

                if (RetVal == null) throw new Exception("404-Account Not Found");
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static int UpdateSpecificCustomer(MsCustomer Data)
        {
            try
            {
                var SingleCustomer = EntityHelper.Get<MsCustomer>(
                    Customer => Customer.CustomerID == Data.CustomerID && Customer.Stsrc == 'A'
                ).FirstOrDefault();

                if (SingleCustomer == null) throw new Exception("404-Account Not Found");

                if (Data.DateOfBirth == new DateTime()) Data.DateOfBirth = SingleCustomer.DateOfBirth;

                EntityHelper.Update(new MsCustomer()
                {
                    CustomerID = Data.CustomerID,
                    FirstName = Data.FirstName,
                    LastName = Data.LastName,
                    Gender = Data.Gender ?? SingleCustomer.Gender,
                    Email = Data.Email,
                    Password = Data.Password??SingleCustomer.Password,
                    Phone = Data.Phone ?? SingleCustomer.Phone,
                    Stsrc = SingleCustomer.Stsrc,
                    UserIn = SingleCustomer.UserIn,
                    DateIn = SingleCustomer.DateIn,
                    UserUp = Data.UserUp,
                    DateUp = DateTime.Now,
                    DateOfBirth = Data.DateOfBirth
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }

        public static int DeleteSpecificCustomer(int id)
        {
            try
            {
                var ToBeDeleted = EntityHelper.Get<MsCustomer>(
                    Customer => Customer.CustomerID == id && Customer.Stsrc == 'A'
                ).FirstOrDefault();

                if (ToBeDeleted == null) throw new Exception("404-Account Not Found");

                EntityHelper.Update(new MsCustomer()
                {
                    CustomerID = id,
                    FirstName = ToBeDeleted.FirstName,
                    LastName = ToBeDeleted.LastName,
                    Gender = ToBeDeleted.Gender,
                    Email = ToBeDeleted.Email,
                    Password = ToBeDeleted.Password,
                    Phone = ToBeDeleted.Phone,
                    Stsrc = 'D',
                    UserIn = ToBeDeleted.UserIn,
                    DateIn = ToBeDeleted.DateIn,
                    UserUp = "Admin",
                    DateUp = DateTime.Now,
                    DateOfBirth = ToBeDeleted.DateOfBirth
                });
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }
    }
}

using Binus.WS.Pattern.Entities;
using BookingAppITDiv.Model;
using BookingAppITDiv.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace BookingAppITDiv.Helper
{
    public class ValidateCustomerHelper
    {
        public static string Encrypt(string x)
        {
            var ByteArrayResultRawData = Encoding.UTF8.GetBytes(x);
            var ByteArrayResult = MD5.Create().ComputeHash(ByteArrayResultRawData);
            var Result = string.Concat(Array.ConvertAll(ByteArrayResult, hash => hash.ToString("X2")));
            return Result;
        }

        public static bool ValidateCustomer(int customerID, string Authorization)
        {
            var SingleCustomer = EntityHelper.Get<MsCustomer>(
                Customer => Customer.CustomerID == customerID && Customer.Stsrc == 'A'
            ).FirstOrDefault();

            var MD5Encrypt = Encrypt(SingleCustomer.CustomerID + SingleCustomer.Password).ToUpper();
            if (!MD5Encrypt.Equals(Authorization.ToUpper()))
            {
                return false;
            }

            return true;
        }
    }
}

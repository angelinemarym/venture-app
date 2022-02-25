using Binus.WS.Pattern.Entities;
using BookingAppITDiv.Model;
using BookingAppITDiv.Output;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookingAppITDiv.Helper
{
    public class HotelHelper
    {
        public static int AddNewHotel(MsHotel Data)
        {
            try
            {
                EntityHelper.Add(new MsHotel()
                {
                    HotelName = Data.HotelName,
                    HotelDescription = Data.HotelDescription,
                    PhoneNumber = Data.PhoneNumber,
                    Email = Data.Email,
                    Address = Data.Address,
                    Rating = Data.Rating,
                    Image1 = Data.Image1,
                    Image2 = Data.Image2,
                    Image3 = Data.Image3,
                    Image4 = Data.Image4,
                    Stsrc = 'A',
                    UserIn = Data.UserIn,
                    DateIn = DateTime.Now,
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return 1;
        }

        public static List<HotelSearchData> GetHotelByAddress(string Address)
        {

            var RetVal = new List<HotelSearchData>();

            try
            {
                var MsHotel = EntityHelper.Get<MsHotel>(Hotel => Hotel.Stsrc == 'A' && Hotel.Address.Contains(Address)).ToList();

                RetVal = MsHotel.Select(Hotel => new HotelSearchData()
                {
                    HotelID = Hotel.HotelID,
                    HotelName = Hotel.HotelName,
                    Image = Hotel.Image1,
                    Address = Hotel.Address
                }).ToList();

                if (RetVal.Capacity == 0) throw new Exception("404-Hotel Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static List<HotelData> GetAllHotel()
        {

            var RetVal = new List<HotelData>();

            try
            {
                var MsHotel = EntityHelper.Get<MsHotel>(Hotel => Hotel.Stsrc == 'A').ToList();

                RetVal = MsHotel.Select(Hotel => new HotelData()
                {
                    HotelID = Hotel.HotelID,
                    HotelName = Hotel.HotelName,
                    HotelDescription = Hotel.HotelDescription,
                    PhoneNumber = Hotel.PhoneNumber,
                    Email = Hotel.Email,
                    Address = Hotel.Address,
                    Rating = Hotel.Rating,
                    Image1 = Hotel.Image1,
                    Image2 = Hotel.Image2,
                    Image3 = Hotel.Image3,
                    Image4 = Hotel.Image4
                }).ToList();
                if (RetVal.Capacity == 0) throw new Exception("404-Hotel Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static HotelAndRoomsData GetSpecificHotelAndRooms(int HotelID)
        {
            var RetVal = new HotelAndRoomsData();

            try
            {
                var MsRoomType = EntityHelper.Get<MsRoomType>(Room => Room.HotelID == HotelID).ToList().
                    Select(
                    Room => new RoomData()
                    {
                        RoomTypeID = Room.RoomTypeID,
                        HotelID = Room.HotelID,
                        RoomDescription = Room.RoomDescription,
                        Price = Room.Price,
                        TotalRoom = Room.TotalRoom,
                        RoomName = Room.RoomName,
                        Image1 = Room.Image1,
                        Image2 = Room.Image2,
                        Image3 = Room.Image3,
                        Image4 = Room.Image4,
                        BedType = Room.BedType,
                        TotalGuest = Room.TotalGuest
                    }).ToList();

                RetVal = EntityHelper.Get<MsHotel>(Hotel => Hotel.HotelID == HotelID && Hotel.Stsrc == 'A').ToList().
                    Select(
                    Hotel => new HotelAndRoomsData(){
                        HotelID = Hotel.HotelID,
                        HotelName = Hotel.HotelName,
                        HotelDescription = Hotel.HotelDescription,
                        PhoneNumber = Hotel.PhoneNumber,
                        Email = Hotel.Email,
                        Address = Hotel.Address,
                        Rating = Hotel.Rating,
                        Image1 = Hotel.Image1,
                        Image2 = Hotel.Image2,
                        Image3 = Hotel.Image3,
                        Image4 = Hotel.Image4,
                        Rooms = MsRoomType
                    }).FirstOrDefault();

                if (RetVal == null) throw new Exception("404-Hotel Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static int UpdateSpecificHotel(MsHotel Data)
        {
            try
            {
                var Hotel = EntityHelper.Get<MsHotel>(Hotel => Hotel.HotelID == Data.HotelID && Hotel.Stsrc == 'A').FirstOrDefault();

                if (Hotel == null) throw new Exception("404-Hotel Not Found");

                EntityHelper.Update(new MsHotel()
                {
                    HotelID = Data.HotelID,
                    HotelName = Data.HotelName,
                    HotelDescription = Data.HotelDescription,
                    PhoneNumber = Data.PhoneNumber,
                    Email = Data.Email,
                    Address = Data.Address,
                    Rating = Data.Rating,
                    Stsrc = Hotel.Stsrc,
                    UserIn = Hotel.UserIn,
                    DateIn = Hotel.DateIn,
                    UserUp = "Admin",
                    DateUp = DateTime.Now,
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }

        public static int DeleteSpecificHotel(int id)
        {
            try
            {
                var Hotel = EntityHelper.Get<MsHotel>(Hotel => Hotel.HotelID == id && Hotel.Stsrc == 'A').FirstOrDefault();

                if (Hotel == null) throw new Exception("404-Hotel Not Found");

                EntityHelper.Update(new MsHotel()
                {
                    HotelID = Hotel.HotelID,
                    HotelName = Hotel.HotelName,
                    HotelDescription = Hotel.HotelDescription,
                    PhoneNumber = Hotel.PhoneNumber,
                    Email = Hotel.Email,
                    Address = Hotel.Address,
                    Rating = Hotel.Rating,
                    Stsrc = 'D',
                    UserIn = Hotel.UserIn,
                    DateIn = Hotel.DateIn,
                    UserUp = "Admin",
                    DateUp = DateTime.Now,
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return 1;
        }

    }
}

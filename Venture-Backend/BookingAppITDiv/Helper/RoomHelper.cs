using Binus.WS.Pattern.Entities;
using BookingAppITDiv.Model;
using BookingAppITDiv.Output;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookingAppITDiv.Helper
{
    public class RoomHelper
    {
        public static int AddNewRoom(MsRoomType Data)
        {
            try
            {
                EntityHelper.Add(new MsRoomType()
                {
                    HotelID = Data.HotelID,
                    RoomDescription = Data.RoomDescription,
                    Price = Data.Price,
                    TotalRoom = Data.TotalRoom,
                    RoomName = Data.RoomName,
                    Image1 = Data.Image1,
                    Image2 = Data.Image2,
                    Image3 = Data.Image3,
                    Image4 = Data.Image4,
                    BedType = Data.BedType,
                    TotalGuest = Data.TotalGuest,
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


        public static List<RoomData> GetAllRoomsAvailable(int HotelID, DateTime CheckInDate, DateTime CheckOutDate)
        {
            var RetVal = new List<RoomData>();

            try
            {
                var HotelRooms = EntityHelper.Get<MsRoomType>(e => e.Stsrc == 'A' && e.HotelID == HotelID).ToList();

                var HotelRoomID = new List<int>();
                HotelRooms.ForEach(e => HotelRoomID.Add(e.RoomTypeID));

                var BookedRoom = EntityHelper.Get<TrBooking>(
                    Room => Room.Stsrc == 'A' 
                    && HotelRoomID.Contains(Room.RoomTypeID) 
                    && CheckInDate >= Room.CheckInDate && CheckInDate <= Room.CheckOutDate
                    || CheckOutDate >= Room.CheckInDate && CheckOutDate <= Room.CheckOutDate
                    || (CheckInDate <= Room.CheckInDate && CheckOutDate >= Room.CheckOutDate)
                ).ToList();

                var NotAvailableRoom = new List<int>();
                BookedRoom.ForEach(e =>
                {
                    HotelRooms.ForEach(ef => 
                    {
                        if (e.RoomTypeID.Equals(ef.RoomTypeID))
                        {
                            ef.TotalRoom--;
                            if(ef.TotalRoom == 0)
                            {
                                NotAvailableRoom.Add(ef.RoomTypeID);
                            }
                        }
                    });
                });

                RetVal = EntityHelper.Get<MsRoomType>(e => e.HotelID == HotelID && !NotAvailableRoom.Contains(e.RoomTypeID)).Select(Room => new RoomData()
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
                    Rating = Room.Rating,
                    TotalGuest = Room.TotalGuest
                }).ToList();

                if (RetVal.Capacity == 0) throw new Exception("404-Room Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static RoomData GetSpecificRoom(int RoomID)
        {
            var RetVal = new RoomData();

            try
            {
                var MsRoom = EntityHelper.Get<MsRoomType>(
                    Room => Room.RoomTypeID == RoomID && Room.Stsrc == 'A'
                ).ToList();

                RetVal = MsRoom.Select(Room => new RoomData()
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
                    Rating = Room.Rating,
                    TotalGuest = Room.TotalGuest
                }).FirstOrDefault();

                if (RetVal == null) throw new Exception("404-Room Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return RetVal;
        }

        public static int UpdateSpecificRoom(MsRoomType Data)
        {
            try
            {
                var Room = EntityHelper.Get<MsRoomType>(Room => Room.RoomTypeID == Data.RoomTypeID && Room.Stsrc == 'A').FirstOrDefault();

                if (Room == null) throw new Exception("404-Room Not Found");

                EntityHelper.Update(new MsRoomType()
                {
                    RoomTypeID = Data.RoomTypeID,
                    HotelID = Room.HotelID,
                    RoomDescription = Data.RoomDescription,
                    Price = Data.Price,
                    TotalRoom = Data.TotalRoom,
                    RoomName = Data.RoomName,
                    Image1 = Data.Image1,
                    Image2 = Data.Image2,
                    Image3 = Data.Image3,
                    Image4 = Data.Image4,
                    BedType = Data.BedType,
                    Rating = Data.Rating,
                    TotalGuest = Data.TotalGuest,
                    Stsrc = Room.Stsrc,
                    UserIn = Room.UserIn,
                    DateIn = Room.DateIn,
                    UserUp = Data.UserUp,
                    DateUp = DateTime.Now,
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return 1;
        }

        public static int DeleteSpecificRoom(int id)
        {
            try
            {
                var Room = EntityHelper.Get<MsRoomType>(Room => Room.RoomTypeID == id && Room.Stsrc == 'A').FirstOrDefault();

                if (Room == null) throw new Exception("404-Room Not Found");

                EntityHelper.Update(new MsRoomType()
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
                    Rating = Room.Rating,
                    TotalGuest = Room.TotalGuest,
                    Stsrc = 'D',
                    UserIn = Room.UserIn,
                    DateIn = Room.DateIn,
                    UserUp = "Admin",
                    DateUp = DateTime.Now
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

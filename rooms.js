const OBJECT_ROOM_LISTING = new HTMLObjectTemplate(`<p>%room_name%</p>`, "%room_name%")

window.addEventListener('load', function () {
    GetRooms();
})

function GetRooms()
{
    API.GetAllRooms().then(rooms => {
        rooms.forEach(room => {
            HTMLObjects.RoomsListing.append(OBJECT_ROOM_LISTING.Paste(room.room_name));
        });
    })
}
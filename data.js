
const API = {
    GetItem: async function (id) {
        const a = await fetch('https://3c60tmkszb.execute-api.us-west-2.amazonaws.com/default/getchat?table=MurderMystery&id=' + id);
        const data = await a.json();
        return data;
    },

    SendItem: async function(id, data) {
        const a = await fetch('https://3c60tmkszb.execute-api.us-west-2.amazonaws.com/default/updatechat?table=MurderMystery&id=' + id + "&data=" + data);
        return a;
    },

 
    GetAllRooms: async function () {
        this.ScanAttempts = 0;

        const data = await fetch('https://tjdzerjw9f.execute-api.us-west-2.amazonaws.com/default?table=MurderMystery');

        const u = await data.json();

        if(u == null || u == "null" || u == undefined)
        {
            if(this.ScanAttempts > 10){ return null; }
            this.ScanAttempts++;
            return await this.GetAllRooms();
        }

        var roomArray = []
        for(var i = 0; i < u.Count; i++)
        {
            var item = u.Items[i];
            if(item.id.startsWith("room_"))
            {
                const u = JSON.parse(atob(item.data));
                u.room_name = item.id.replace("room_", "");
                roomArray.push(u);
            }
        }

        return roomArray;
    },

    UpdateRoom: async function (newRoom) {
        var room = JSON.parse(JSON.stringify(newRoom));
        delete room.room_name;

        const a = await this.SendItem("room_" + newRoom.room_name, btoa(JSON.stringify(room)));
        return a;
    },

    GetRoom: async function(roomId)
    {
        var data = await this.GetItem("room_" + roomId);
        if(data == null){return null;}

        const u = JSON.parse(atob(data.data));
        u.room_name = roomId;
        
        return u;
    }
}

function GetURLParam(param)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if(!urlParams.has(param))
    {
        return null;
    }

    return urlParams.get(param);
}
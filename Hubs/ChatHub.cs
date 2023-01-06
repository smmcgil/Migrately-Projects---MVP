using Microsoft.AspNetCore.SignalR;
using Microsoft.Build.Utilities;
using Sabio.Models.Domain.Messages;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace Sabio.Web.Api.Hubs
{
    public class ChatHub : Hub
    {

        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string,UserConnection> con)
        {
            _botUser = "MyChat Bot";
            _connections = con; 
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
               .SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left.");
            }
                return base.OnDisconnectedAsync(exception); 
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                await Clients.Group(userConnection.Room)
                    .SendAsync("receiveMessage", userConnection.User, message);
            }
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser,
                $"{userConnection.User} has joined.");
        }

    }
}

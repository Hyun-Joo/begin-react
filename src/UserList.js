import React from 'react';

function User({ user }){
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    )
}

function UserList({ users }){
    return (
        <div>
            {
                users.map(user => //(user,index) 식으로 해도 되지만 웬만하면 id값을...
                    (<User user={user} key={user.id} />)
                )
            }
        </div>
    )
}

export default UserList;


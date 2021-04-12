import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }){
    const { username, email, id, active } = user;
    //mounted
    useEffect(() => {
        console.log(user);
        //unmounted (클리너 함수)
        //return () => {}
    }, [user]); //deps(의존되는 값)
    return (
        <div>
            <b style={{
                color: active ? 'green' : 'black',
                cursor: 'pointer'
                }}
               onClick={() => onToggle(id)}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            &nbsp;
            {/*onRemove(id)로 하면 컴포넌트가 렌더링될 시 onRemove 호출, 함수를 호출하는 함수를 넣어줘야 함*/}
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
}

function UserList({ users, onRemove, onToggle }){
    return (
        <div>
            {
                users.map(user => (//(user,index) 식으로 해도 되지만 웬만하면 id값을...
                        <User
                            user={user}
                            key={user.id}
                            onRemove={onRemove}
                            onToggle={onToggle}
                        />
                    )
                )
            }
        </div>
    )
}

export default UserList;


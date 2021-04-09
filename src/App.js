import React, { useRef, useState } from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'hyunjoo',
            email: 'dlguswn714@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'grace',
            email: 'gracekelly@gmail.com',
            active: false
        }
    ]);

    const nextId = useRef(4); // 컴포넌트가 리렌더링되어도 남아있는 값 관리...
    //push, splice, sort 지양!
    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email
        };
        setUsers([...users, user]); // 기존 배열 복사
        //setUsers(users.concat(user)); // push를 쓰면 업데이트 되지 않음
        setInputs({
            username: '',
            email: ''
        })
        //console.log(nextId.current); // 4
        nextId.current += 1;
    };

    const onRemove = id => {
        setUsers(users.filter(user => user.id !== id));
    };

    const onToggle = id => {
        setUsers(users.map(
            user => user.id === id
                ? { ...user, active: !user.active }
                : user
        ));
    };

    return (
        <>
            <CreateUser username={username}
                        email={email}
                        onChange={onChange}
                        onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default App;

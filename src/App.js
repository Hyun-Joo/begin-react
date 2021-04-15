import React, { useRef, useState, useMemo, useCallback } from 'react';
// useMemo, useCallback, React.memo : 정말 최적화가 필요할 때만 사용하는 게 좋음
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users){
    console.log('활성 사용자 수를 세는 중...');
    return users.filter(user => user.active).length;
}

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }, [inputs]);

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
    const onCreate = useCallback(() => {
        const user = {
            id: nextId.current,
            username,
            email
        };
        //setUsers([...users, user]); // 기존 배열 복사
        // 최적화 (함수형 업데이트, deps에 users를 넣지 않아도 됨)
        setUsers(users => users.concat(user)); // push를 쓰면 업데이트 되지 않음
        setInputs({
            username: '',
            email: ''
        })
        //console.log(nextId.current); // 4
        nextId.current += 1;
    }, [username, email]);

    const onRemove = useCallback(id => {
        // 함수형 업데이트
        setUsers(users => users.filter(user => user.id !== id));
    }, []); // 디펜던시가 바뀌면 함수도 새로 바뀌는 문제 -> 최적화 필요

    const onToggle = useCallback(id => {
        setUsers(users => users.map(
            user => user.id === id
                ? { ...user, active: !user.active }
                : user
        ));
    }, []);

    //필요한 연산을 필요할 때만 할 수 있음(필요에 따라 재사용 가능)
    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser username={username}
                        email={email}
                        onChange={onChange}
                        onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성 사용자 수: {count}명</div>
        </>
    );
}

export default App;

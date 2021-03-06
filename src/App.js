import React, {useRef, useReducer, useMemo, useCallback} from 'react';
// useMemo, useCallback, React.memo : 정말 최적화가 필요할 때만 사용하는 게 좋음
import produce from 'immer';
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./js/useInputs";

//window.produce = produce;

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는 중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    users: [
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
    ]
}

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            };
            // return produce(state, draft => {
            //     draft.users.push(action.user);
            // });
        case 'TOGGLE_USER':
            //이미 코드가 깔끔할 경우 굳이 immer를 적용할 필요가 없음
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            });
            // return {
            //     ...state,
            //     users: state.users.map(user =>
            //         user.id === action.id
            //             ? {...user, active: !user.active}
            //             : user
            //     )
            // }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
            // return produce(state, draft => {
            //     const index = draft.users.findIndex(user => user.id === action.id);
            //     draft.users.splice(index, 1);
            // });
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [form, onChange, reset] = useInputs({
        username:'', email: ''
    });
    const { username, email } = form;
    const nextId = useRef(4);
    const {users} = state;

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        nextId.current += 1;
        reset();
    }, [username, email, reset]); // esLint 규칙상 reset 추가

    const onToggle = useCallback(id => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
            <div>활성 사용자 수: {count}명</div>
        </>
    );
}

export default App;

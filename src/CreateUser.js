import React from 'react';

function CreateUser({ username, email, onChange, onCreate }){
    //console.log('create user');
    return (
        <div>
            <input name="username"
                   placeholder="계정명"
                   onChange={onChange}
                   value={username}
            />
            <input name="email"
                   placeholder="이메일"
                   onChange={onChange}
                   value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default React.memo(CreateUser); // 이전에 렌더링한 것을 재사용할 수 있게 함
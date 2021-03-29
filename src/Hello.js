import React from 'react';

function Hello({ color, name, isSpecial }){ // 비구조화 할당(props 대신...)
    console.log(color, name);
    return (
        <div style={{color}}>{/* 객체 형태 => {color: color} */}
            {/* 삼항연산자 대신 && 사용(단순 보여줌 or 숨김시) */}
            {isSpecial && <b>*</b>}
            사랑의 배신자여, {name}
        </div>);
}

Hello.defaultProps = {
    name: '무명'
}
export default Hello;
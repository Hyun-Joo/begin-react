import React, { useState } from 'react';

function Counter() {
    const [number, setNumber] = useState(0);
    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1); // 업데이트 함수(최적화에 좋음)
    }
    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1); // 함수형 업데이트(성능 최적화...)
    }
    return (
        <div>
            <h1>{number}</h1>
            {/* 함수를 '호출'하면(onIncrease()) 렌더링 시 실행해 버림 */}
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;
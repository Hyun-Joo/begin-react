import React, { Component } from 'react';

class Counter extends Component {
    // 정석
    // constructor(props) {
    //     super(props);
    //     this.state = { counter: 0 }; //state는 객체 형태여야 함
    // }
    state = {
        counter: 0,
        fixed: 1,
        updateMe: {
            toggleMe: false,
            dontChangeMe: 1
        }
    };
    handleIncrease = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // });
        this.setState(state => ({ // 함수형 업데이트를 해야 동기적으로 업데이트가 이루어짐
            counter: state.counter + 1
        }));
    }
    handleDecrease = () => {
        this.setState({
            counter: this.state.counter - 1
        });
    }
    handleToggle = () => {
        this.setState({
            updateMe: {
                ...this.state.updateMe,
                toggleMe: !this.state.updateMe.toggleMe,
            }
        })
    }
    render(){
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <p>고정된 값: {this.state.fixed}</p>
            </div>
        )
    }
}

// function reducer(state, action){
//     switch (action.type){
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             throw new Error('Unhandled action');
//     }
// }
//
// function Counter() {
//     const [number, dispatch] = useReducer(reducer, 0);
//     const onIncrease = () => {
//         dispatch({ type: 'INCREMENT' });
//     }
//     const onDecrease = () => {
//         dispatch({ type: 'DECREMENT' });
//     }
//     return (
//         <div>
//             <h1>{number}</h1>
//             {/* 함수를 '호출'하면(onIncrease()) 렌더링 시 실행해 버림 */}
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     )
// }

export default Counter;
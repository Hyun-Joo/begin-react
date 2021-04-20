import {useReducer, useCallback} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {...state, [action.name]: action.value};
        case 'RESET_INPUT':
            return Object.keys(state).reduce((acc, curr) => {
                acc[curr] = '';
                return acc;
            }, {});
        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        });
    }, []);

    const reset = useCallback(() => dispatch({type: 'RESET_INPUT'}), []);

    return [form, onChange, reset];
}

export default useInputs;
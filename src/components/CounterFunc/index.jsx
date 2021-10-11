import React, {useState} from 'react'
import '../Counter/Counter.css';

export default function CounterFunc() {
    
    const [state, setState] = useState({
        counterValue: 0,
        step: 1,
        value: "",
        timeStep: 1,
        timerValue: 30,
        active: false
    })
   
    const PlusValue = () => {
       setState({
        ...state,   
        counterValue: state.counterValue + Number(state.step)})
       //console.log(state.counterValue);
    }

    const DeleteValue = () => {
        setState({
            ...state,   
            counterValue: state.counterValue - Number(state.step)})
        console.log(state.counterValue);
    }
    
    const handleChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        setState(() => ({
            ...state, 
            step: state.value,
        }));
        event.preventDefault();
        console.log(state.step);
    };

    const AutoClick = () => {

        const {timeStep} = state
        const tick = setInterval(PlusValue(),timeStep * 1000
        );
        console.log(tick);
        const time = setInterval(() => {
                setState((prevState) => ({
                    ...state, 
                    timerValue: prevState.timerValue - 1,
                }));
        }, 1000);
        setTimeout(() => clearInterval(tick), state.timerValue * 1000);
        setTimeout(() => clearInterval(time), state.timerValue * 1000);
     };
     
    const ChangeButtonStyle = () =>{
        setState(prevState =>({
            ...state, 
            active: !prevState.active,
        }))
        console.log(state.active);
    }
     
    const ButtonOnClick = () =>{
        ChangeButtonStyle();
        AutoClick()
    }
    const ButtonStatus = state.active === true ? 'btnActive' : 'btnDissable'
    return (
        <div>
            <div className="counter">
                <button onClick={DeleteValue}>Отнять <b>{state.step}</b></button>
                <div className="scoreBoard">{state.counterValue}</div>
                <button onClick={PlusValue}>Добавить <b>{state.step}</b></button>
            </div>
            <form onSubmit={handleSubmit} className="CounterForm">
                <input
                    type="number"
                    name="value"
                    placeholder="Введите шаг"
                    value={state.value}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="timeStep"
                    placeholder="Время шага автоклика"
                    value={state.timeStep}
                    onChange={handleChange}
                />
                <button type="submit">Изменить</button>
            </form>
            <div className='timerDisplay'>{state.timerValue} s</div>
            <button className={ButtonStatus} onClick={ButtonOnClick}>autoClick</button>
        </div>
    )
}

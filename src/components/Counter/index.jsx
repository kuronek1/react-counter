import React, { Component } from "react";
import "./Counter.css";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterValue: 0,
            step: 1,
            value: "",
            timeStep: 1,
            timerValue: 30,
            active: false
        };
    }

    /* 
        
    */

    PlusValue = () => {
        this.setState((prevState) => ({
            counterValue: prevState.counterValue + Number(this.state.step),
        }));
    };
    DeleteValue = () => {
        this.setState((prevState) => ({
            counterValue: prevState.counterValue - Number(this.state.step),
        }));
    };

    handleChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        this.setState(() => ({
            step: this.state.value,
        }));
        event.preventDefault();
        //console.log(this.state.step);
    };

    AutoClick = () => {
        const tick = setInterval(
            () => this.PlusValue(),
            this.state.timeStep * 1000
        );
        const time = setInterval(() => {
                this.setState((prevState) => ({
                    timerValue: prevState.timerValue - 1,
                }));
        }, 1000);
        setTimeout(() => clearInterval(tick), this.state.timerValue * 1000);
        setTimeout(() => clearInterval(time), this.state.timerValue * 1000);
    };
    
    ChangeButtonStyle = () =>{
        this.setState(prevState =>({
            active: !prevState.active,
        }))
        //console.log(this.state.active);
    }

    ButtonOnClick = () =>{
        this.ChangeButtonStyle();
        this.AutoClick()
    }

    render() {
        const ButtonStatus = this.state.active === true ? 'btnActive' : 'btnDissable'
        return (
            <div>
                <div className="counter">
                    <button onClick={this.DeleteValue}>
                        Отнять
                        <b> - {this.state.step}</b>
                    </button>
                    <div className="scoreBoard">{this.state.counterValue}</div>
                    <button onClick={this.PlusValue}>
                        Добавить
                        <b> + {this.state.step}</b>
                    </button>
                </div>

                <form onSubmit={this.handleSubmit} className="CounterForm">
                    <input
                        type="number"
                        name="value"
                        placeholder="Введите шаг"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <input
                        type="number"
                        name="timeStep"
                        placeholder="Время шага автоклика"
                        value={this.state.timeStep}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Изменить</button>
                </form>
                <div className='timerDisplay'>{this.state.timerValue} s</div>
                <button className={ButtonStatus} onClick={this.ButtonOnClick}>autoClick</button>
            </div>
        );
    }
}

export default Counter;

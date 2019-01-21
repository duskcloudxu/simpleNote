import React, {Component} from 'react';
import close from '../img/close.svg'
import {toggleInfoBar} from "../Actions/Actions";

let store;
export default class InfoTab extends Component {
    constructor(props) {
        super(props);
        store = this.props.store;
        this.state = store.getState();
        store.subscribe(this.onChange);
    }

    onChange = () => {
        this.setState(store.getState());
    }

    closeInfoBar = () => {
        store.dispatch(toggleInfoBar());
    }

    render() {

        let words = document.querySelector('.words')?  document.querySelector('.words').innerText:-1;
        let time;
        if (this.state.noteIndex[this.state.currentMdIndex] !== undefined) time = this.state.noteIndex[this.state.currentMdIndex].lastModifiedTime;
        let date = new Date("NAN");
        if (time !== undefined) date = new Date(time);
        let string = date.toDateString();
        string += " ";
        string += date.getHours();
        string += ":";
        string += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        string += ":";
        string += date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return (
            <div className={"infoTab " + (this.state.isInfoBarHidden === true ? "infoTab-hidden" : "")}>
                <div className="title">
                    <div>INFO</div>
                    <div className="m-closeBtn Btn" onClick={this.closeInfoBar}>
                        <img src={close} alt=""/>
                    </div>
                </div>
                <div className="lastModifiedTime">
                    <div>Modified</div>
                    <div className={"time"}>{string}</div>
                </div>
                <div className="words">
                    {words} words
                </div>
            </div>
        );
    }
}

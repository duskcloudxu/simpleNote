import React, {Component} from 'react'
import {clearAllTab} from '../Actions/Actions'

let store;

export default class Mask extends Component {
    constructor(props) {
        super(props);
        store = props.store;
        this.state = store.getState();
        store.subscribe(this.onChange)
    }

    onChange = () => {
        this.setState(store.getState());
    }

    clickMask = () => {
        store.dispatch(clearAllTab());
    }

    render() {
        let show = !this.state.isManageBarHidden||!this.state.isInfoBarHidden||this.state.isAddingNewNote||this.state.isDeletingNote;
        if (!show) return (<div/>)
        else
            return (
                <div className={"mask"} onClick={this.clickMask}>

                </div>
            );
    }
}


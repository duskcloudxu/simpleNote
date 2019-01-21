import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Textview from './Component/Textview'
import Navigator from "./Component/Navigator"
import InfoTab from './Component/InfoTab'
import ManageTab from './Component/ManageTab'
import Mask from './Component/Mask'
import {createStore} from 'redux'
import Reducer from './Reducer/reducer'
import './App.css';
import * as Commu from './Communication-method/Communication-method';
import * as Actions from './Actions/Actions'
import PromptWindow from "./Component/PromptWindow";
import MediaQuery from 'react-responsive'

let host="http://118.126.64.186:5000/";//我服务器的公网ip地址


let initState = {
    isManageBarHidden: true,
    isInfoBarHidden: true,
    isNavHidden: false,
    isAddingNewNote: false,
    isDeletingNote: false,
    isSharing: false,
    isSaved: false,
    isSearching: false,
    isMobile: !window.matchMedia("(min-width: 800px)").matches,
    MobileOnIndex:true,
    noteIndex: [],
    currentMdIndex: 0,
    currentMd: ""
};
export const store = createStore(Reducer, initState);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        Commu.getIndex(this.afterGetIndex);
        window.addEventListener("resize",this.checkIfMobile,false);
        store.subscribe(this.onChange)
    }

    checkIfMobile = () => {
        store.dispatch(Actions.checkIfMobile());
    }
    onChange = () => {
       this.setState(store.getState());
    }


    afterGetIndex = (data) => {
        console.log("data fetched");
        console.log(data.noteIndex);
        store.dispatch(Actions.getIndex(data));
        Commu.getMd(this.setMarkdown, data.noteIndex[0].topic);

    }
    setMarkdown = (data) => {
        store.dispatch(Actions.updateMarkdown(data));
    }

    render() {
        return (
            <div className={this.state.isMobile?"App-mobile":"App"}>
                <ManageTab store={store}/>
                <Navigator store={store}/>
                <PromptWindow store={store}/>
                <Textview store={store}/>
                <InfoTab store={store}/>
            </div>
        );
    }
}

export default App;
export {host}

import React, {Component} from 'react';
import {connect} from 'react-redux'
import Remarkable from 'remarkable'
import test from '../data/test.md'
import hideNavi from '../img/hideNavigator.svg'
import revert from '../img/revert.svg'
import share from '../img/share.svg'
import trash from '../img/trash.svg'
import info from '../img/info.svg'
import save from '../img/save.svg'
import download from '../img/download.svg'
import db from '../data/db'
import Mask from './Mask'
import * as actions from "../Actions/Actions"
import * as Commu from "../Communication-method/Communication-method"
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import closeGrey from '../img/close-grey.svg'
import {host} from "../App";


let store;

export default class Textview extends Component {
    constructor(props) {
        super(props);
        store = this.props.store;
        this.state = store.getState();
        store.subscribe(this.onChange)
    }

    onChange = () => {
        this.setState(store.getState());
    }


    render() {
        return (
            <div className={"textview " + ((this.state.isMobile && this.state.MobileOnIndex) ? "textview-hidden" : "")}>
                <Mask store={this.props.store}/>
                <Menu/>
                <TextContainer/>
                <TagBar/>
            </div>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onChange);
        this.state = {downloadName: "error.md", downloadLink: ""}
    }


    onChange = () => {
        this.setState({...store.getState()});
        this.setState({
            downloadName: this.state.noteIndex[this.state.currentMdIndex].topic,
            downloadLink: host + "downloadMd?title=" + this.state.noteIndex[this.state.currentMdIndex].topic
        })
    }

    clickInfoBtn = () => {
        store.dispatch(actions.toggleInfoBar());
    }

    clickHideNavBtn = () => {
        if (!this.state.isMobile) store.dispatch(actions.toggleNav())
        else {
            store.dispatch(actions.toggleMobileOnIndex());
        }

    }
    clickSaveBtn = () => {
        store.dispatch(actions.postMd());
        store.dispatch(actions.toggleSaved());
        setTimeout(() => {
                window.location.reload()
            }
            , 100);
        setTimeout(() => {
                store.dispatch(actions.toggleSaved());
            }, 1000
        )
    }

    clickDeleteBtn = () => {
        store.dispatch(actions.toggleDeleteMd());
    }


    render() {
        return (
            <div className="menu">
                <div className="hideNavigatorBtn Btn" onClick={this.clickHideNavBtn}>
                    <img src={hideNavi} alt=""/>
                </div>
                <div className="saveBtn Btn" onClick={this.clickSaveBtn}>
                    <img src={save} alt=""/>
                </div>
                <a className="downloadBtn Btn" download={this.state.downloadName} href={this.state.downloadLink}>
                    <img src={download} alt=""/>
                </a>
                <div className="deleteBtn Btn" onClick={this.clickDeleteBtn}>
                    <img src={trash} alt=""/>
                </div>
                <div className="infoBtn Btn" onClick={this.clickInfoBtn}>
                    <img src={info} alt=""/>
                </div>
            </div>
        );
    }
}

class TextContainer extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onChange);
        this.state = {...store.getState()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    onChange = () => {
        this.setState(store.getState());
    }
    emitChange = (val) => {
        store.dispatch(actions.updateCurrentMdCache(val));
    }

    render() {
        let md = this.state.currentMd;
        console.log(md);
        return (
            <div className="textContainer">
                <SimpleMDE value={md}
                           toolbar={false}
                           className={"MDE"}
                           id={"MDE"}
                           onChange={this.emitChange}
                />
            </div>
        );
    }
}

class TagBar extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(this.onChange);
    }

    onChange = () => {
        this.setState(store.getState());
    }

    addTag = (e) => {
        if (e.key === "Enter") {
            let newTag = document.querySelector("#tagAdder").value;
            document.querySelector("#tagAdder").value = "";
            store.dispatch(actions.addTag(newTag))
        }
    }

    render() {
        let noteList = this.state.noteIndex;
        let currentNote = this.state.currentMdIndex;
        let tagList = [];
        if (noteList.length !== 0) tagList = noteList[currentNote].tagList;

        return (
            <div className="tagBar">
                {
                    tagList.map((item, index) => {
                            return (

                                <div className="tag-item" data-id={index}>{item}
                                    <div className="closeBtn" onClick={() => {
                                        store.dispatch(actions.deleteTag(index));
                                    }
                                    }>
                                        <img src={closeGrey} alt=""/>
                                    </div>
                                </div>

                            )

                        }
                    )
                }
                <input type="text" placeholder="add a tag..." id={"tagAdder"} onKeyPress={this.addTag}/>
                <div className={"saveNotification " + (this.state.isSaved ? "" : "saveNotification-hidden")}>保存完成</div>
            </div>

        );
    }
}
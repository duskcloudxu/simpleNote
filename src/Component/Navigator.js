import React, {Component} from 'react'
import bookMark from '../img/bookMark.svg'
import add from '../img/add.svg'
import closeGrey from '../img/close-grey.svg'
import {toggleManageBar} from '../Actions/Actions'
import Mask from "./Mask";
import * as actions from "../Actions/Actions"
import * as Commu from '../Communication-method/Communication-method'

let store;

export default class Navigator extends Component {
    constructor(props) {
        super(props);
        store = this.props.store;
        store.subscribe(this.onChange);
        this.state = Object.assign({}, store.getState());
    }


    onChange = () => {
        this.setState(store.getState());
    }

    render() {
        return (
            <div className={"navigator " + (this.state.isNavHidden||this.state.isMobile&&!this.state.MobileOnIndex ? "navigator-hidden" : "")}>
                <Mask store={store}/>
                <SearchBar/>
                <Index noteIndex={this.props.noteIndex}/>
            </div>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onChange);
        this.state=store.getState();
    }

    onChange = () => {
        this.setState(store.getState());
    }

    clickManageBtn = () => {
        store.dispatch(toggleManageBar());
    }
    clickAddNoteBtn = () => {
        store.dispatch(actions.toggleNewNote())
    }
    checkContent = () => {
        let value = document.querySelector("#searchBar").value;
        if (this.state.isSearching && value === "") {
            store.dispatch(actions.stopSearching());
            document.removeEventListener("keydown", this.checkKey, false);

        }
        if (value !== "") {
            store.dispatch(actions.search(value));
            document.addEventListener("keydown", this.checkKey, false);
        }
    }
    checkKey = (e) => {
        if (e.key === "Escape") {
           this.stopSearching();
        }
    }
    stopSearching=()=>{
        let input = document.querySelector("#searchBar");
        input.value = "";
        store.dispatch(actions.stopSearching());
    }



    render() {
        return (
            <div className="searchBar">
                <div className="manageBtn Btn" onClick={this.clickManageBtn}>
                    <img src={bookMark} alt=""/>
                </div>
                <input type="text" id={"searchBar"} onChange={this.checkContent}/>
                <div className={"clearBtn "+(this.state.isSearching?"":"clearBtn-hidden")} onClick={this.stopSearching}>
                    <img src={closeGrey} alt=""/>
                </div>

                <div className="addNoteBtn Btn" onClick={this.clickAddNoteBtn}>
                    <img src={add} alt=""/>
                </div>
            </div>
        );
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onChange);
        this.state = store.getState();
    }

    onChange = () => {

        this.setState(store.getState());
    }


    render() {
        let noteindex = this.state.noteIndex;
        if (noteindex === undefined) noteindex = [];
        let key = "";
        if (this.state.isSearching) key = this.state.key;
        return (
            <div className="index">

                {
                    noteindex.map((item, index) => {
                        if (item.topic.search(key) !== -1)
                            return (
                                <IndexItem isTop={item.isTop} topic={item.topic} index={index} itemInfo={item}/>
                            )
                        else return (<div></div>)


                    })
                }
            </div>
        );
    }
}

class IndexItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        }
        store.subscribe(this.onChange);
    }

    onHover = () => {
        this.setState({isHovered: true});
    }

    offHover = () => {
        this.setState({isHovered: false});
    }
    changeCurrentMd = () => {
        store.dispatch(actions.toggleMobileOnIndex());
        Commu.getMd(this.ejectStore, this.props.topic);
        store.dispatch(actions.updateMdIndex(this.props.index));
    }

    ejectStore = (data) => {
        store.dispatch(actions.updateMarkdown(data))
    };

    onChange = () => {
        this.setState(store.getState());

    }


    render() {

        return (
            <div
                className={"index-item " + (this.props.isTop ? "index-item-pinned " : "") + (this.state.currentMdIndex === this.props.index ? "index-item-selected" : "")}
                data-id={this.props.index}
                onMouseOver={this.onHover}
                onMouseOut={this.offHover}
                onClick={this.changeCurrentMd}
            >
                <TopBtn topic={this.props.topic} isSelected={this.props.isTop} isHovered={this.state.isHovered}
                        index={this.props.index}/>
                <div
                    className="index-item-text">{(this.props.topic.length > 15 ? (this.props.topic.substring(0, 15) + "...") : this.props.topic)}</div>
            </div>
        );
    }
}

class TopBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBlockHovered: false
        }
    }

    toggle = () => {
        store.dispatch(actions.backupCurrentMdName(this.props.topic));
        store.dispatch(actions.togglePinNote(this.props.index))
    }
    onBlockHovered = () => {//控制
        this.setState({isBlockHovered: true})
    }
    offBlockHovered = () => this.setState({isBlockHovered: false})

    render() {

        let isHovered = this.props.isHovered;
        let isSelected = this.props.isSelected;
        let isBlockHovered = this.state.isBlockHovered;
        if (isSelected) {
            return (
                <div className="topBtn topBtn-selected" onClick={this.toggle}>
                    <div className={"topBtn-centerBlock"} onMouseOver={this.onBlockHovered}
                         onMouseOut={this.offBlockHovered}/>
                </div>
            );

        }
        else if (isHovered) {
            return (
                <div className="topBtn"
                     onClick={this.toggle}
                     onMouseOver={this.onBlockHovered}
                     onMouseOut={this.offBlockHovered}>
                    <div className={isBlockHovered === true ? "topBtn-centerBlock" : "topBtn-centerBlock-off"}
                    />
                </div>
            );
        }
        else
            return (
                <div className="topBtn topBtn-hidden"
                     onMouseOver={this.onBlockHovered}
                     onMouseOut={this.offBlockHovered}>
                    <div className={isBlockHovered === true ? "topBtn-centerBlock" : "topBtn-centerBlock-off"}
                    />
                </div>
            );
    }
}

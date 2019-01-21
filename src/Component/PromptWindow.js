import React, {Component} from 'react'
import * as actions from '../Actions/Actions'
import * as Commu from "../Communication-method/Communication-method";
let store;
export default class PromptWindow extends Component {
    constructor(props) {
        super(props);
        store = this.props.store;
        store.subscribe(this.onChange);
        this.state = store.getState();
    }

    onChange = () => {
        this.setState(store.getState());
    }
    addNewNote=()=>{
        let newNoteName=document.querySelector("#newNoteName").value;
        if(newNoteName===""){
            alert("文件名不能为空");
            return;
        }
        for (let item of this.state.noteIndex){
            if(item.topic===newNoteName){
                alert("禁止重名文件！");
                return;
            }
        }
        console.log(newNoteName);
        store.dispatch(actions.addNewNote(newNoteName))
    }
    checkKey=(e)=>{
        console.log(e.key);
        if(this.state.isAddingNewNote===true&&e.key==="Enter")this.addNewNote();
        if(e.key==="Escape")this.leave();
    }
    componentDidMount(){
       document.addEventListener("keydown",this.checkKey,false)
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.checkKey, false);
    }

    DeleteMd = () => {
        Commu.getMd(this.prepareDel,this.state.currentMdIndex===0?this.state.noteIndex[1].topic:this.state.noteIndex[0].topic);
    }
    prepareDel=(data)=>{
        store.dispatch(actions.deleteMd(data));
    }

    leave=()=>{
        store.dispatch(actions.clearAllTab());
    }


    render() {
        if (this.state.isAddingNewNote)
            return (
                <div className={"promptWindow"} >
                    Enter the name of new note
                    <input id={"newNoteName"} type="text" autoFocus={true}/>
                    <div className={"Btn"} onClick={this.addNewNote} >Enter</div>
                </div>
            );
        else if(this.state.isDeletingNote ){
            return(
                <div className={"promptWindow"}  >
                    Are you sure to delete this note?
                   <button className={"yes Btn"} onClick={this.DeleteMd}>Yes</button>
                    <button autoFocus={true} className={"no Btn"} onClick={this.leave} >No</button>
                </div>
            );
        }
        else
            return(<div/>)
    }

}
import React, {Component} from 'react';
import db from '../data/db'
import noteBlack from '../img/note-black.svg'
import icon from '../img/icon.png'
import trash from '../img/trash.svg'
import trashBlack from '../img/trash-black.svg'
let store;

export default class ManageTab extends Component {
    constructor(props) {
        super(props);
        store= this.props.store;
        this.state=store.getState();
        store.subscribe(this.onChange);
    }
    onChange=()=>{
        this.setState(store.getState());
    }

    render() {
        let noteList=this.state.noteIndex;
        let currentNote=this.state.currentMdIndex;
        let tagList = [];
        if(noteList.length!==0)tagList=noteList[currentNote].tagList;
        return (
            <div className={"manageTab "+ (this.state.isManageBarHidden===true?"manageTab-hidden":"")}>
                <div className="btnList">

                    <div className="btn">
                        <img src={icon} alt=""/>
                        SimpleNotes
                    </div>
                    <div className="btn">
                        Startup React Application By duskcloudxu
                    </div>
                </div>
                <div className="tagList">
                    <h3>Tags</h3>
                    {
                        tagList.map((item, index) => {
                                return (
                                    <div className="tag-item" data-id={index}>{item}</div>
                                )

                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

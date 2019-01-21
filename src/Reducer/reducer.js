import * as Commu from '../Communication-method/Communication-method'

export default function Reducer(state, action) {
    console.log(state);
    switch (action.type) {
        case 'toggleManageBar': {
            return Object.assign({}, state, {isManageBarHidden: !state.isManageBarHidden})
        }
        case 'toggleInfoBar': {
            return Object.assign({}, state, {isInfoBarHidden: !state.isInfoBarHidden})
        }
        case 'clearAllTab': {
            return Object.assign({}, state, {
                isInfoBarHidden: true,
                isManageBarHidden: true,
                isAddingNewNote: false,
                isDeletingNote: false,
                isSharing: false
            })
        }
        case 'toggleNav': {
            return Object.assign({}, state, {
                isNavHidden: !state.isNavHidden
            })
        }
        case 'getIndex': {
            for (let i = 0; i < action.noteIndex.noteIndex.length; i++)
                if (action.noteIndex.noteIndex[i].topic === state.formerMdName)
                    state.currentMdIndex = i;

            return {...state, noteIndex: action.noteIndex.noteIndex}
        }
        case 'updateMarkdown': {
            return {...state, currentMd: action.currentMd, currentMdCache: action.currentMd}
        }
        case 'updateCurrentMdCache': {
            return {...state, currentMdCache: action.mdCache}
        }
        case 'updateMdIndex': {

            return {...state, currentMdIndex: action.Info}
        }
        case 'togglePinNote': {
            state.noteIndex[action.Index].isTop = !state.noteIndex[action.Index].isTop;
            Commu.postIndex(state.noteIndex);

            return state;
        }
        case 'postMd': {
            state.noteIndex[state.currentMdIndex].lastModifiedTime = new Date().toString();
            Commu.postMd(state.noteIndex[state.currentMdIndex].topic, state.currentMdCache);
            return state;
        }
        case 'backupCurrentMdName': {
            return {...state, formerMdName: action.topic}
        }
        case 'toggleNewNote': {
            return {...state, isAddingNewNote: !state.isAddingNewNote}
        }
        case 'addNewNote': {
            state.currentMdIndex = state.noteIndex.length;
            state.currentMd = "# " + action.newNoteName;
            state.noteIndex.push({
                topic: action.newNoteName,
                isTop: false,
                words: 0,
                lastModifiedTime: new Date().toString(),
                tagList: []
            });
            Commu.postIndex(state.noteIndex);
            Commu.postMd(action.newNoteName, state.currentMd);
            state.isAddingNewNote = false;
            return state;

        }
        case 'toggleDeleteMd': {
            return {...state, isDeletingNote: !state.isDeletingNote}
        }
        case 'deleteMd': {
            Commu.deleteMd(state.noteIndex[state.currentMdIndex].topic);
            state.noteIndex.splice(state.currentMdIndex, 1);
            Commu.postIndex(state.noteIndex);
            state.currentMdIndex = 0;
            state.currentMd = action.firstNote;
            state.isDeletingNote = false;
            return state;
        }
        case 'toggleSaved': {
            return {...state, isSaved: !state.isSaved}
        }
        case 'downloadCurrentMd': {
            return state;
        }
        case 'deleteTag': {
            state.noteIndex[state.currentMdIndex].tagList.splice(action.tagIndex, 1);
            Commu.postIndex(state.noteIndex);
            return state;
        }
        case 'addTag': {
            state.noteIndex[state.currentMdIndex].tagList.push(action.tagName);
            Commu.postIndex(state.noteIndex);
            return state;
        }
        case 'search': {
            state.isSearching = true;
            state.key = action.key;
            return state;
        }
        case 'stopSearching': {
            state.isSearching = false;
            return state;
        }
        case 'checkIfMobile': {
            state.isMobile = !window.matchMedia("(min-width: 800px)").matches;
            return state;
        }
        case 'toggleMobileOnIndex': {
            state.MobileOnIndex = !state.MobileOnIndex;
            return state;
        }
        default:
            return state;
    }

}



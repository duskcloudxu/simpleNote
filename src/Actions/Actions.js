let toggleManageBar = () => {
    return {
        type: "toggleManageBar"
    }
}
let toggleInfoBar=()=>{
   return{
       type:"toggleInfoBar"
   }
}
let toggleNav=()=>{
   return{
       type:"toggleNav"
   }
}

let clearAllTab=()=>{
   return{
       type:"clearAllTab"
   }
}
let getIndex=(index)=>{
    return{
        type:"getIndex",
        noteIndex:index
    }
}

let updateMarkdown=(markdown)=>{
    return{
        type:"updateMarkdown",
        currentMd:markdown
    }
}
let updateMdIndex=(Info)=>{
   return{
       type:"updateMdIndex",
       Info:Info
   }
}

let togglePinNote=(index)=>{
   return{
       type:"togglePinNote",
       Index:index
   }
}

let postMd=()=>{
    return{
        type:"postMd"
    }
}

let backupCurrentMdName=(topic)=>{
   return{
       type:"backupCurrentMdName",
       topic:topic
   }
}

let toggleNewNote=()=>{
    return{
        type:"toggleNewNote"
    }
}

let addNewNote=(newNoteName)=>{
   return{
       type:"addNewNote",
       newNoteName:newNoteName
   }
}

let toggleDeleteMd=()=>{
    return{
        type:"toggleDeleteMd"
    }
}

let toggleSaved=()=>{
    return{
        type:"toggleSaved"
    }
}

let deleteMd=(data)=>{
   return{
       type:"deleteMd",
       firstNote:data
   }
}
let downloadCurrentMd=()=>{
   return{
       type:"downloadCurrentMd"
   }

}

let deleteTag=(index)=>{
   return{
       type:"deleteTag",
       tagIndex:index
   }
}

let addTag=(tagName)=>{
   return{
       type:"addTag",
       tagName:tagName
   }
}
let search=(value)=>{
   return{
       type:"search",
       key:value
   }
}
let stopSearching=()=>{
   return{
       type:"stopSearching",
   }
}

let checkIfMobile=()=>{
    return{
        type:"checkIfMobile"
    }
}

let toggleMobileOnIndex=()=>{
   return{
       type:"toggleMobileOnIndex"
   }
}

let updateCurrentMdCache=(Cache)=>{
   return{
       type:"updateCurrentMdCache",
       mdCache:Cache
   }
}








export{updateCurrentMdCache,toggleMobileOnIndex,checkIfMobile,stopSearching,search,addTag,deleteTag,downloadCurrentMd,toggleSaved,toggleDeleteMd,deleteMd,toggleManageBar,toggleInfoBar,clearAllTab,toggleNav,getIndex,updateMarkdown,updateMdIndex,togglePinNote,postMd,backupCurrentMdName,toggleNewNote, addNewNote}

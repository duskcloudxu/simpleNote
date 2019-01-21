import axios from 'axios'
import {updateAll} from '../Component/updater'
import {host} from '../App'

let getIndex = (callBack) => {
    axios.get(host+"getIndex")
        .then(function (res) {
            return res.data;
        })
        .then((data) => {
                data.noteIndex = data.noteIndex.sort((a, b) => {
                    return b.isTop - a.isTop;
                });
                callBack(data);
            }
        )
};

let getMd = (callBack, title) => {
    axios.get(host+"getMd", {
        params: {
            title: title
        }
    })
        .then((res) => {
            return res.data;
        })
        .then((data) => {
            callBack(data);
        })
}

let postIndex = (index) => {
    axios.post(host+"postIndex", {
        noteIndex: index
    }).then((res) => {
            console.log(res);
            updateAll();
        }
    )
}

let postMd = (mdName, mdContent) => {
    axios.post(host+"postMd", {
        mdName: mdName,
        mdContent: mdContent
    }).then((res) => {
            console.log(res);
        }
    )

}

let deleteMd=(mdName)=>{
    axios.post(host+"deleteMd",{
        mdName:mdName
    }).then((res)=>{
        console.log(res);
    }
    )
}



export {getIndex, getMd, postIndex,postMd,deleteMd}
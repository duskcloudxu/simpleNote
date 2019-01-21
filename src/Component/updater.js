import React, {Component} from 'react';
import * as Commu from '../Communication-method/Communication-method'
import * as Actions from '../Actions/Actions'
import {store} from '../App'


let updateAll = () => {
    Commu.getIndex(ejectIndex);
}

let ejectIndex = (data) => {
    store.dispatch(Actions.getIndex(data));
}

export {updateAll}



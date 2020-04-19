import React, { useEffect } from 'react';
import CardStoragesContainer from '../containers/CardStorages';
import { connect } from 'react-redux';
import * as action from '../store/storage/action';

const CardStoragesView = (props) => {
    useEffect(() => {
        document.title = 'Хранилища | MELA'
    })
    return <CardStoragesContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingTypes  : state.storage.loadingTypes,
        loadingStorage: state.storage.loadingStorage,
        loadingDelete : state.storage.loadingDelete,

        data          : state.storage.data,
        types         : state.storage.types,
        listAids      : state.storage.listAids,
        viewForm      : state.storage.viewForm,

        error         : state.storage.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setViewForm  : async(isView) => {await dispatch(action.setViewForm(isView))},
        
        onLoadList    : async()     => {await dispatch(action.storageLoad())},
        onLoadTypes   : async()     => {await dispatch(action.getTypeStorage())},
        onLoadAidList : async(id)   => {await dispatch(action.storageLoadAidList(id))},
        onDelete      : async(id)   => {await dispatch(action.storageDelete(id))},
        onAdd         : async(data) => {await dispatch(action.addStorage(data))},
        onPatch       : async(id, data) => {await dispatch(action.storagePatch(id, data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStoragesView);
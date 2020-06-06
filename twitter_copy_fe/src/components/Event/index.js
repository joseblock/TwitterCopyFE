import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import Navbar from '../Navbar';
import Events from '../Events'
import { v4 as uuidv4 } from 'uuid';

import './styles.css'; 

const labelInput = (labelText, value, onChange) => {
	return (
		<div className="input-register">
            <label className="Label-user">
	            {labelText}
            </label>
            <input className="input-user"
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}/>
        </div>
	)
};

const MainEvents = ({ 
    onSubmit,  
    user
}) => {
    const [description, changeDescription] = useState('');
    const [ubication, changeUbication] = useState('');
    return (
        <Fragment>
            <Navbar/>
            <div className= "enventCenter">
                <div className= "eventmaking-container">
                    <div className = "event-inputs">
                        <div className="input-container">
                            {labelInput("Description",description,changeDescription)}
                            {labelInput("Ubication",ubication,changeUbication)}
                        </div>
                    </div>
                    <button className = "eventbtn" type="submit" onClick={
                        () => onSubmit(user,description, ubication)}>
                        {'Publicar Evento'}
                    </button>
                </div>
                <Events/>
            </div>

        </Fragment>
    );  
};

export default connect(
    (state) => ({
        user: selectors.getAuthUserID(state),
    }),
    dispatch => ({
        onSubmit(user, description, ubication) {
            dispatch(actions.startAddingEvent({
                id: uuidv4(),
                user,
                ubication,
                description, 
            }));
        },
    }),
)(MainEvents);
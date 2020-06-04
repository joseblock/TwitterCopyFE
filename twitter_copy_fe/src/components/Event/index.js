import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import * as selectors from '../../reducers';
import * as actions from '../../actions/register';

import { Link } from 'react-router-dom';

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

const Event = ({ onSubmit, isLoading }) => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const [name, changeName] = useState('');
    const [lastname, changeLastname] = useState('');
    const [mail, changeMail] = useState('');
    const [confirmPassword, changeConfirmPassword] = useState('');
    return (
        <Fragment>
            <div className="background">
                <div className="form-user">
                    <div className="tittle-container">
                        <p className="tittle">
                            Register:
                        </p>
                    </div>
                    <div className="input-container">
                        <div className="p-inputs-user">
                            {labelInput("Nombre",name,changeName)}
                            {labelInput("Apellido",lastname,changeLastname)}
                        </div>
                        <div className="p-inputs-user">
                            {labelInput("Usuario",username,changeUsername)}
                            {labelInput("Correo",mail,changeMail)}
                        </div>
                        <div className="p-inputs-user">
                            {labelInput("Contraseña",password,changePassword)}
                            {labelInput("Confirmar contraseña",confirmPassword,changeConfirmPassword)}
                        </div>
                    </div>
                    <div className="register-button">
                        <button className="register-user-button" type="submit"
                            onClick = {() => onSubmit(username, password, name, lastname, mail)}>
                            {'registrarme'}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );  
};

export default connect(
    (state) => ({
        isLoading: selectors.getIsRegistering(state),
    }),
    dispatch => ({
        onSubmit(username, password,name, lastname, mail) {
            dispatch(actions.startRegister(username, password, name, lastname,mail));
        },
    }),
)(Event);
import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import * as selectors from '../../reducers';
import * as actions from '../../actions/register';

import { Link } from 'react-router-dom';

import './styles.css'; 

const labelInput = (labelText, value, onChange, tipo) => {
	return (
		<div className="input-register">
            <label className="Label-user">
	            {labelText}
            </label>
            <input className="input-user"
              type= {tipo}
              value={value}
              onChange={e => onChange(e.target.value)}/>
        </div>
	)
};

const Register = ({ onSubmit, isLoading }) => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const [first_name, changeName] = useState('');
    const [last_name, changeLastname] = useState('');
    const [email, changeMail] = useState('');
    const [confirmPassword, changeConfirmPassword] = useState('');
    return (
        <Fragment>
            <div className="background">
                <div className="form-user">
                    <Link to=''>
                        <button className="close">{ "x" }</button>
                    </Link>
                    <div className="tittle-container">
                        <p className="tittle">
                            Register:
                        </p>
                    </div>
                    <div className="input-container">
                        <div className="p-inputs-user">
                            {labelInput("Nombre",first_name,changeName,"text")}
                            {labelInput("Apellido",last_name,changeLastname,"text")}
                        </div>
                        <div className="p-inputs-user">
                            {labelInput("Usuario",username,changeUsername,"text")}
                            {labelInput("Correo",email,changeMail,"text")}
                        </div>
                        <div className="p-inputs-user">
                            {labelInput("Contraseña",password,changePassword,"password")}
                            {labelInput("Confirmar contraseña",confirmPassword,changeConfirmPassword,"password")}
                        </div>
                    </div>
                    <div className="register-button">
                        <button className="register-user-button" type="submit"
                            onClick = {() => onSubmit(username, password, first_name, last_name, email)}>
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
        onSubmit(username, password,first_name, last_name, email) {
            dispatch(actions.startRegister({
                username, 
                password, 
                first_name, 
                last_name, 
                email
            }));
        },
    }),
)(Register);
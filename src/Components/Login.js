import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

import isEmpty from 'is-empty';
const Validator=require('validator');

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            errors:{},
            err:{}
        }
    }
    onChangeValues=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    validateInput=(data) =>{
        let errors={};
        data.email=!isEmpty(data.email)? data.email:"";
        data.password= !isEmpty(data.password) ? data.password : ""

        if(Validator.isEmpty(data.email)){
            errors.email="Email is required"
        }

        if(Validator.isEmpty(data.password)){
            errors.password="password is required"
        } else if(!Validator.isLength(data.password, { min: 8, max: 128 })){
            errors.invalidPassword="password must be 128 chars"
        }

        return {errors,isValid:isEmpty(errors)}
        
    }

    handleSubmit=(e) =>{
        e.preventDefault();
        let data={
            email:this.state.email,
            password:this.state.password
        }

        let validations=this.validateInput(data);
        console.log(validations)
        if(validations.isValid){
            this.setState({errors:{},err:{}})
            axios.post('http://localhost:3003/users/login',data)
        .then(response =>{
            console.log(response)
            if(response.headers && response.headers[('x-auth')]){
                localStorage.setItem('x-auth',response.headers[('x-auth')]);
                this.props.history.push('/tickets')
            }
        }).catch(err =>{
            console.log(err);
        })
    }else{
        this.setState(() =>({errors:validations.errors}))
    }

    }
    render(){
        return(
            <div>
                <Container>
                <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                <Label for="exampleEmail" hidden>Email</Label>
                <Input type="email" name="email" onChange={this.onChangeValues} id="exampleEmail" placeholder="Email" />
                <span>{this.state.errors.email}</span>
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="examplePassword" hidden>Password</Label>
                <Input type="password" name="password" onChange={this.onChangeValues} id="examplePassword" placeholder="Password" />
                <span>{this.state.errors.password}{this.state.errors.invalidPassword}</span>
                </FormGroup>
                {' '}
                <Button>Submit</Button>
                </Form>
                <Link to="/signup">SignUp</Link>
                </Container>
            </div>
        );
    }
}
import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

import isEmpty from 'is-empty';
import validator from 'validator';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            mobile:"",
            errors:{},
            err:{}
        }
    }
    onChangeValues=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    validateInput=data =>{
        let errors={};
        data.username=!isEmpty(data.username) ? data.username : "";
        data.email=!isEmpty(data.email) ? data.email : "";
        data.password=!isEmpty(data.password) ? data.password : "";
        data.mobile=!isEmpty(data.mobile) ? data.mobile : "";

        if(validator.isEmpty(data.username)){
            errors.username="Please fill your name"
        } 
        if(validator.isEmpty(data.email)){
            errors.email="Email is required"
        }
        if(validator.isEmpty(data.password)){
            errors.password="password is required"
        }else if(!validator.isLength(data.password,{min:8,max:128})){
            errors.invalidpassword="length will be max 128 min 8"
        }
        if(validator.isEmpty(data.mobile)){
            errors.mobile="mobile number is required"
        }else if(!validator.isLength(data.mobile,{min:10,max:10})){
            errors.inValidmobile="must be 10 digits"
        }
        return {errors,isValid:isEmpty(errors)}
    }

    handleSubmit=(e) =>{
        e.preventDefault();
        const data={
            username:this.state.name,
            email:this.state.email,
            password:this.state.password,
            mobile:this.state.mobile
        }
        let validations=this.validateInput(data);
        if(validations.isValid){
            this.setState({errors:{},err:{}})
            axios.post('http://localhost:3003/users',data)
        .then(res =>{
            console.log(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
        }else{
            this.setState({errors:validations.errors})
        }
    }

    render(){
        return(
            <div>
                <Container>
                <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                <Label for="exampleUser" hidden>Name</Label>
                <Input type="text" name="name" onChange={this.onChangeValues} id="exampleUser" placeholder="Username" />
                  <span>{this.state.errors.username}</span>
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exampleEmail" hidden>Email</Label>
                <Input type="email" name="email" onChange={this.onChangeValues} id="exampleEmail" placeholder="Email" />
                <span>{this.state.errors.email}</span>
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="examplePassword" hidden>Password</Label>
                <Input type="password" name="password" onChange={this.onChangeValues} id="examplePassword" placeholder="Password" />
                <span>{this.state.errors.password}</span>
                <span>{this.state.errors.inValidpassword}</span>
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exmobile" hidden>Mobile</Label>
                <Input type="text" name="mobile" onChange={this.onChangeValues} id="exmobile" placeholder="mobile" />
                <span>{this.state.errors.mobile}</span>
                <span>{this.state.errors.inValidmobile}</span>
                </FormGroup>
                {' '}
                <Button>Submit</Button>
                </Form>
                <Link to="/login">login</Link>
                </Container>
            </div>
        );
    }
}
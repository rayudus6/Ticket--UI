import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navbar';
import decodeToken from '../helpers/token';

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            department:"",
            subject:"",
            description:"",
            priority:""
        }
    }
    onChangeValues=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitData=(e) =>{
        e.preventDefault();
        const data={
            appName:this.state.name,
            department:this.state.department,
            subject:this.state.subject,
            description:this.state.description,
            priority:this.state.priority,
        }
        axios.post('http://localhost:3003/tickets',data)
        .then(response =>{
            console.log(response.data);
        }).catch(err =>{
            console.log(err)
        })
        
    }
    render(){
        if(!decodeToken()){
            return <Redirect to="/login" />
        }
        return(
            <div>
                <Container>
                <Navigation />
                <Form inline onSubmit={this.submitData}>
                <FormGroup>
                <Label for="exampleApp" hidden>appName</Label>
                <Input type="text" onChange={this.onChangeValues} name="name" id="exampleApp" placeholder="appName" />
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exDepartment" hidden>Department</Label>
                <Input type="text" onChange={this.onChangeValues} name="department" id="exDepartment" placeholder="Department" />
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exSubject" hidden>Subject</Label>
                <Input type="text" onChange={this.onChangeValues} name="subject" id="exSubject" placeholder="Subject" />
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exDescription" hidden>Description</Label>
                <Input type="text" onChange={this.onChangeValues} name="description" id="exDescription" placeholder="Description" />
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="exPriority" hidden>Priority</Label>
                <Input type="text" onChange={this.onChangeValues} name="priority" id="exPriority" placeholder="Priority" />
                </FormGroup>
                {' '}
                
                <Button>Submit</Button>
                </Form>
                </Container>
            </div>
        );
    }
}
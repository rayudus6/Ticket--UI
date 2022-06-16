import React,{Component} from 'react';
import axios from 'axios';
import decodeToken from '../helpers/token';
import {Redirect } from 'react-router-dom'


export default class MyTicket extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            myTicket:{}
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3003/tickets/${this.state.id}`,{headers:{'x-auth':localStorage.getItem('x-auth')}})
        .then(res =>{
            this.setState({
                myTicket:res.data
            })
        })
    }
    render(){
       if(!decodeToken()){
           return <Redirect to="/login" />
       }
        return(
            <div>
                <ul>
                <li>{this.state.myTicket.appName}</li>
                <li>{this.state.myTicket.status}</li>
                <li>{this.state.myTicket.priority}</li>
                <li>{this.state.myTicket.department}</li>
                <li>{this.state.myTicket.description}</li>
                </ul>
            </div>
        )
    }
}
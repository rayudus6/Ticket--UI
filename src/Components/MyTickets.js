import React,{Component} from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom'
import decodeToken from '../helpers/token';
import Navigation from './Navbar';
import {Redirect} from 'react-router-dom';
export default class MyTickets extends Component{
    constructor(props){
        super(props);
        this.state={
            myTickets:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3003/tickets',{headers:{'x-auth':localStorage.getItem('x-auth')}})
        .then(res =>{
            this.setState({
                myTickets:res.data
            })
        })
        .catch(err =>{
            console.log(err);
        }) 
    }
    render(){
        if(!decodeToken()){
           return <Redirect to="/login" />      
          }
        return(
            <div className="container">
                <Navigation />
            <Table>
            <thead>
            <tr>
            <th>#</th>
            <th>appName</th>
            <th>Department</th>
            <th>Priority</th>
            <th>Subject</th>
            <th>Description</th>
            <th>View</th>
            </tr>
            </thead>
            <tbody>
            {this.state.myTickets.map((data,index) =>{
                return(
                    <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.appName}</td>
                    <td>{data.department}</td>
                    <td>{data.priority}</td>
                    <td>{data.subject}</td>
                    <td>{data.description}</td>
                    <td><Link to={`/tickets/${data._id}`}>View</Link></td>
                    </tr>
                )
            })}
            </tbody>
            </Table>
            </div>
        )
    }
}
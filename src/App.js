import logo from './logo.svg';
import './App.css';
import React, { useState,Component  } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import {API,graphqlOperation} from 'aws-amplify';

const listTodos = `query getTodo
{
  listTodos {
    items {
      id name description completed
    }
  }
  
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

class App extends Component {

  
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {

    const items = await API.graphql(graphqlOperation(listTodos));
    this.setState({ data: items.data.listTodos.items });
    var t=this.state;
    console.log("hello");
  }

  render() {
    return (
      <div className="App">
      <header className="App-header" style={{minHeight: "10%"}}>
      <img src={logo} className="App-logo" alt="logo" />
        <h1 className='App-title'> Test App 
        </h1>

      </header>
      <div>
        
          {this.state.data.map(el => (
          <div>
          <h3> {el.name}</h3>
          <p> {el.description}</p>
</div>
          ))}
        
      </div>
      </div>
    );
  }
}

export default App;


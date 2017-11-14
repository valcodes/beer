import React, { Component } from 'react';
import axios from 'axios';
import './LandingPage.css';
import {Link} from 'react-router-dom';


export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer:[],
    };

  }

  componentWillMount(){
    axios.get('https://api.punkapi.com/v2/beers').then(results=>{
        this.setState({
             beer: results.data
        });
   
 }).catch(console.log) ;
 
  }
  render() 
  {
    const beer= this.state.beer.map((beer)=><ul>
    <li key={beer.id}>{beer.name}</li>
  <li key={beer.id}><img src ={beer.image_url}/></li>
  </ul>
  )
   
    return (
      <div className="landing">
      <div className='beer'>
      {beer}
      </div>
      
      <Link to='/login'>
       <div className='login'><button>Login Here</button></div>
       </Link>
      </div>
    );
  }
  
}




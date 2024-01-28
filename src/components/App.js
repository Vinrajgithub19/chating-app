import React, { useState, useEffect} from 'react';
import {getPosts} from '../Api';
import {Home,Login,Signup,Settings, Userprofile} from '../pages';
import { Navbar, Loader} from './';
import{BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute({Children, ...rest}){
  const auth = useAuth();

 return(
  <Route  
  {...rest}
  render={()=>{
    if(auth.user){
      return Children;
    }
  return <Redirect to ='/login' />;
  }}
  />
 )
}

const About =() =>{
  return<h1>about</h1>
};


const Page404 = () => {
  return <h1>error 404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect ( ()=>{ 
  const fetchPosts = async() =>{
  const response =await getPosts();
    
  if(response.success){
    setPosts(response.data.posts);
  }
  setLoading(false);
  };
  fetchPosts();
  }, [] )

 if(loading){
  return <Loader />
 }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
          <Route>
          <PrivateRoute exact path='/user/:userId'>
            <Userprofile/>
            </PrivateRoute>       

          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export {App} ;

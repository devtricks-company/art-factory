import React from 'react';
import ReactDOM from 'react-dom';
import 'libj-iransans/index.css'
import App from './App';
import './index.scss'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ApolloProvider from './ApolloProvider';
import  '../node_modules/jquery/dist/jquery';
import '../node_modules/popper.js/dist/popper';
import '../node_modules/bootstrap/dist/js/bootstrap';

ReactDOM.render(
  ApolloProvider,
  document.getElementById('root')
);

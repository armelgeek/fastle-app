import React, { useState } from 'react'
import './App.css'
import Navbar from './components/partials/Navbar'
import {
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Projects from './components/Operations/Projects';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
          <Route path="/" components={Home} />
          <Route path="/projects" components={Projects} />
      </Switch>
    </>
  )
}

export default App

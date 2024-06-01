import React from "react";
import './App.css';
import SalaryCalculator from "./components/SalaryCalculator";
import {Container, CssBaseline} from "@mui/material";



function App() {
  return (
       <Container>
         <CssBaseline />
         <SalaryCalculator />
       </Container>
  );
}

export default App;

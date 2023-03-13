import React from 'react';
import {MentalMain} from "./components/MentalMain";
import {Container} from "react-bootstrap";


function App() {

  return (
      <Container className="p-3">
              <h1 className="header">Pranglimine</h1>
      <MentalMain  />
      </Container>
  );
}

export default App;

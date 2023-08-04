import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) ?? [])
  const [patient, setPatient] = useState({})

  const deletePatient = id => {
    const patientLS = patients.filter(patient => patient.id !== id)
    setPatients(patientLS)
  }

  useEffect(()=>{
    localStorage.setItem('patients', JSON.stringify(patients))
  },[patients])


  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-10 md:flex">
        <Formulario
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <ListadoPacientes 
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  );
}

export default App;

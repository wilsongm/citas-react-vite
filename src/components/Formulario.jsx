import { useState, useEffect } from "react";
import Error from "./Error";


function Formulario({patients, setPatients, patient, setPatient}) {


  const [name, setName ] = useState('')
  const [owner, setOwner ] = useState('')
  const [email, setEmail ] = useState('')
  const [date, setDate ] = useState('')
  const [symptoms, setSymptoms ] = useState('')

  const [error, setError ] = useState(false)

  useEffect(() => {
      if(Object.keys(patient).length > 0){
         setName(patient.name)
         setOwner(patient.owner)
         setEmail(patient.email)
         setDate(patient.date)
         setSymptoms(patient.symptoms)
      }
  }, [patient])

  const generalId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    //validar formulario
    if([name, owner, email, date, symptoms].includes('')){
     setError(true)
     return;
    }
    setError(false)

    //object of patients
    const objectPatients = {
      name,
      owner,
      email,
      date,
      symptoms
    }

    if(patient.id){
      //Editando
      
      objectPatients.id = patient.id
      const patientUpDate = patients.map( patientState => patientState.id === patient.id 
        ? objectPatients : patientState )

      setPatients (patientUpDate)
      setPatient({})

    }else{
      //Nuevo Paciente
      objectPatients.id = generalId()
      setPatients([...patients, objectPatients])
    }
    
   
    


    // Reiniciar Form
    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 h-screen">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Adminístralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

          {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={ e => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={ e => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={ e => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe Los Sintomas"
            value={symptoms}
            onChange={ e => setSymptoms(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
          hover:bg-indigo-700 cursor-pointer transition-all"
          value={patient.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  );
}

export default Formulario;

import { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem'
import { usePatientsStore } from '../store/store'
import { toast } from 'react-toastify'

type PatientDetailProps={
    patient: Patient
}
export default function PatientDetail({patient}:PatientDetailProps) {
    const deletePatient=usePatientsStore((state)=>state.deletePatient)
    const getPatientByID=usePatientsStore((state)=>state.getPatientById)
   
    const handleClick=()=>{
      deletePatient(patient.id)
      toast('Paciente eliminado correctamente',{type:'error'})
    }
  return (
    <div className='mx-5 my-10 px-5 py-5 bg-white shadow-md rounded-xl'>
        <PatientDetailItem label='ID'data={patient.id}></PatientDetailItem>
        <PatientDetailItem label='Nombre'data={patient.name}></PatientDetailItem>
        <PatientDetailItem label='Propietario'data={patient.caretaker}></PatientDetailItem>
        <PatientDetailItem label='Email'data={patient.email}></PatientDetailItem>
        <PatientDetailItem label='Fecha Alta'data={patient.date.toString()}></PatientDetailItem>
        <PatientDetailItem label='Sintomas'data={patient.symptoms}></PatientDetailItem>
        <div className=' flex flex-col md:flex-row justify-between gap-3 mt-10'>
            <button
            type='button'
            className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 gap-3 text-white rounded-lg font-bold uppercase'
            onClick={()=>getPatientByID(patient.id)}>Editar</button>

            <button
            type='button'
            className='py-2 px-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg' onClick={()=>handleClick()}>Eliminar</button>
        </div>
    </div>
  )
}

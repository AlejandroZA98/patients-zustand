// funciona de manera similar a UseReducer ya que maneja el estado global
import { create } from "zustand";
import { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import {devtools,persist} from 'zustand/middleware'
type PatientState={
    patients: Patient[]
    addPatient: (data: DraftPatient)=>void // toma los datos enviados por el formulario
    deletePatient: (id: Patient['id'])=>void // para eliminar paciente
    activeId: Patient['id']
    getPatientById: (id: Patient['id'])=>void
    updatePatient: (data: DraftPatient)=>void
}

const createPatient=(patient:DraftPatient):Patient=>{
return {...patient, id: uuidv4()}
}

export const usePatientsStore= create<PatientState>()(
    devtools(persist((set)=>({
        patients: [],// persist es para almacenar en local storage
        activeId:'',
        addPatient:(data)=>{
            console.log('Registrando Paciente desde store',data)
            const newPatient=createPatient(data)
            set((state)=>({
                patients: [...state.patients, newPatient] // agregar al array de pacientes
            }))
        },
        deletePatient: (id) => {
            console.log(id)
            set((state)=>({
                patients: state.patients.filter(patient=>patient.id!==id) // filtrar paciente
            }))
        },
        getPatientById: (id)=>{
            console.log(id)
            set(()=>({
                activeId: id
            }))
        },
        updatePatient: (data) => {
            console.log('Actualizando Paciente desde store',data)
            set((state)=>({
                patients: state.patients.map(patient=> patient.id === state.activeId ? {id:state.activeId,...data}:patient),
                activeId: ''
            }))

        }
    }),{
        name: 'patients-storage',// almacenamiento local storage
        //storage: createJSONStorage(()=>sessionStorage),
    })
))

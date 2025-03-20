import {useForm} from 'react-hook-form' 
import { DraftPatient } from '../types'
import { usePatientsStore } from '../store/store'
import Error from './Error'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
export default function PatientForm() {
  //  const {addPatient}= usePatientsStore() // sintaxis similar a la linea debajo
    const addPatient= usePatientsStore(state => state.addPatient)// usando funcion de store
    const activeId=usePatientsStore(state=>state.activeId)
    const patients=usePatientsStore(state=>state.patients)
    const updatePatient=usePatientsStore(state=>state.updatePatient)

    // El siguiente hook debe tener el mismo type de 
    const {register,handleSubmit,formState:{errors},reset,setValue}=useForm<DraftPatient>() // extrayendo imformacion de libreria de Formularios

    useEffect(()=>{
        if(activeId){
            const activePatient=patients.filter(patient=>patient.id===activeId)[0]
            console.log('Editando',activePatient)
            setValue('name',activePatient.name)
            setValue('caretaker',activePatient.caretaker)
            setValue('email',activePatient.email)
            setValue('date',activePatient.date)
            setValue('symptoms',activePatient.symptoms)
        }
        },[activeId])

    const registerPatient=(data:DraftPatient)=>{// se recibe lo que contiene el formulario
        console.log("ActiveID",activeId)
        if(activeId){
            console.log('Editando...')
            toast.success('Paciente editado correctamente')

            updatePatient(data)

        }else{
            console.log('Registrando...')

            addPatient(data)
            //toast('Paciente registrado correctamente')
            toast.success('Paciente registrado correctamente')

        }
        reset() // limpiar formulario

       

    }
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name',{
                            required:'Nombre es obligatorio',
                            maxLength:{value:8,message:'No más de 8 caracteres'}
                        })}
                    />
                    {
                        //Sintaxis de linbreria}
                        errors.name &&(
                            <Error> {errors.name?.message?.toString()} </Error>
        
                        )
                        
                    }
                  
                  {
                        //Sintaxis de linbreria}
                        errors.maxLength &&(
                            <Error> {errors.maxLength?.message?.toString()} </Error>
        
                        )
                        
                    }
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario" 
                      {...register('caretaker',{
                        required:'Propietario obligatorio',
                        maxLength:{value:8,message:'No más de 8 caracteres'}
                    })}
                  />
                    {
                            //Sintaxis de linbreria}
                            errors.caretaker &&(
                                <Error> {errors.caretaker?.message?.toString()} </Error>
            
                            )
                            
                        }
                        {
                            //Sintaxis de linbreria}
                            errors.maxLength &&(
                                <Error> {errors.maxLength?.message?.toString()} </Error>
            
                            )
                            
                        }
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email No Válido'
                        }
                      })} 
                />
                   {
                            //Sintaxis de linbreria}
                            errors.email &&(
                                <Error> {errors.email?.message?.toString()} </Error>
            
                            )
                            
                        }
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date',{
                        required:'Fecha obligatoria',
                    })}
                  />
                   {
                    //Sintaxis de linbreria}
                    errors.date &&(
                        <Error> {errors.date?.message?.toString()} </Error>
    
                    )
                          
                    }
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms',{
                        required:'Sintomas obligatorios',
                    })}
                  ></textarea>
                  {
                    //Sintaxis de linbreria}
                    errors.symptoms &&(
                        <Error> {errors.symptoms?.message?.toString()} </Error>
    
                    )
                          
                    }
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }
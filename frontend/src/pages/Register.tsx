
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';



const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await api.post('/auth/register', { email, password, firstName, lastName });
    navigate('/login');
  } catch (error) {
    console.error('Register error', error);
  }
};


export default function Register() {

    return (
      <form onSubmit={handleSubmit}>
       <label className="">First Name</label>

)}

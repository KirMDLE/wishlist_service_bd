
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';


export default function Register() {
  const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();}
 







    return (
      <form onSubmit={handleSubmit}>
       <label className="">First Name</label>

)}
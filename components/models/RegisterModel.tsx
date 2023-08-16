import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModal from "@/hooks/useRegisterModel";

import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast'
import { signIn } from "next-auth/react"; 
import Modal from "../Model";
import Input from "../Input";
import axios from "axios";

const RegisterModel = ()=> {
    const loginModel = useLoginModel();
    const registerModal = useRegisterModal();


  const [name, setName] = useState('');  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
        

    registerModal.onClose();
    loginModel.onOpen();
  }, [loginModel, registerModal])


    const onSubmit = useCallback(async ()=>{
        try{
            setIsLoading(true);

            await axios.post('/api/register',{
              email,
              password,
              username,
              name,
            })
            toast.success("Account created Successfully!");
            signIn('credentials',{
              email,
              password
            });

            registerModal.onClose(); 
        }
        catch(error){
            toast.error('Something went wrong');
            console.log(error)
        } finally{
            setIsLoading(false);
        }

    },[email,password,username,name,registerModal]); 

   

    const bodyContent=(
        
        <div className="flex flex-col gap-4">
        
        <Input 
        disabled={isLoading}
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        />
        
        <Input 
        disabled={isLoading}
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        />            
        <Input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        />

        <Input
        type="password" 
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        />
      
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Sign in</span>
      </p>
    </div>
  )




  return (
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Create an account"
    actionLabel="Register"
    onClose={registerModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
   
}

export default RegisterModel;

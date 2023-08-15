import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModal from "@/hooks/useRegisterModel";

import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast'

import Modal from "../Model";
import Input from "../Input";
import { signIn } from "next-auth/react";

const LoginModel = ()=> {
    const loginModel = useLoginModel();
    const registerModal = useRegisterModal();


    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async ()=>{
        try{
            setIsLoading(true);

            await signIn('credentials',{
              email,
              password

            });
            toast.success("Login sucessfully!")
            loginModel.onClose(); 
        }
        catch(error){
            console.log(error)
        } finally{
            setIsLoading(false);
        }

    },[loginModel,email,password]); 

    const onToggle = useCallback(() => {

        loginModel.onClose();
        registerModal.onOpen();
      }, [loginModel, registerModal])

    const bodyContent=(
        <div className="flex flex-col gap-3">
            
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
      <p>New User?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
      </p>
    </div>
  )


  return (
    <Modal
    disabled={isLoading}
    isOpen={loginModel.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModel.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
   
}

export default LoginModel;

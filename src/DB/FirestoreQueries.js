import {
    doc,
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc
  } from "firebase/firestore";
import {db} from '../firebase'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'
export const Signup=(name,email,password)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            const SignupAuth=await createUserWithEmailAndPassword(auth,email,password)
            const user = SignupAuth.user;
            console.log(user.uid)
            const body={
                name:name,
                email:email,
                password:password,
                uid:user.uid
            }
            const addUser = await setDoc(doc(db, 'Users', user.uid), body);

            const SignInAuth=await  signInWithEmailAndPassword(auth,email,password)
            resolve()
        }
        catch(e)
        {
            reject(e)
        }
          
        
        })
}

export const Signin=(email,password)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
           const SignInAuth=await signInWithEmailAndPassword(auth,email,password)
           resolve()
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}

export const AddPayment=(body)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            console.log(body)
            const paymentRef = doc(
                db,
                'Users',
                '4CAcgjJuS1cH0Czj9UMoZLYzEvA3',
                'Payments'
              );
             
            const addUser = await addDoc(paymentRef, body);
            
           resolve()
        }
        catch(e)
        {
            console.log(e)
            reject(e)
        }
    })
   
}
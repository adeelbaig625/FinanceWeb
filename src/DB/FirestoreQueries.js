import {
    doc,
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    updateDoc,
    getDoc
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
            const docRef = doc(db, "Users", '4CAcgjJuS1cH0Czj9UMoZLYzEvA3');
            const colRef = collection(docRef, "Payments") 
            const addUser = await addDoc(colRef, {...body,status:false,isDelete:false});
           resolve()
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}




export const UpdatePayment=(paymentId,body)=>
{
    console.log(body)
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            const  docRef   = doc(db, "Users", '4CAcgjJuS1cH0Czj9UMoZLYzEvA3','Payments',paymentId);
            const addUser = await updateDoc(docRef, body);
           resolve()
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}

export const GetSinglePayment=(paymentId)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            const  docRef   = doc(db, "Users", '4CAcgjJuS1cH0Czj9UMoZLYzEvA3','Payments',paymentId);
          
            const docSnap  = await getDoc(docRef);
           resolve(docSnap.data())
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}
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
    getDoc,
    arrayUnion,
    arrayRemove
  } from "firebase/firestore";
import {db} from '../firebase'
import { deleteToken } from "firebase/messaging";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,getAuth ,onAuthStateChanged,signOut } from 'firebase/auth'
import {getToken1,onMessageListener} from '../firebase'
import {auth} from '../firebase'
import {messaging} from '../firebase'
export const Signup=(name,email,password)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            const token=await getToken1()
            const SignupAuth=await createUserWithEmailAndPassword(auth,email,password)
            const user = SignupAuth.user;
            console.log(user.uid)
            const body={
                name:name,
                email:email,
                password:password,
                uid:user.uid,
                token:[token?token:'']
            }
            const addUser = await setDoc(doc(db, 'Users', user.uid), body);
          
            const SignInAuth=await  signInWithEmailAndPassword(auth,email,password)
            resolve()
        }
        catch(e)
        {
            console.log(e)
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
            const token=await getToken1()
           const SignInAuth=await signInWithEmailAndPassword(auth,email,password)
        
         const authref =await getAuth();
        onAuthStateChanged(authref, async(user) => {
        if (user) {
            const uid = user.uid;
            const  docRef   = doc(db, "Users", uid);
            const addUser = await updateDoc(docRef, {token:arrayUnion(token)});
               resolve()
        } 
});
        
        
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
            const authref =  getAuth();
            onAuthStateChanged(authref, async(user) => {
                if(user)
                {
                    const docRef = doc(db, "Users", user.uid);
                    console.log(user.uid)
                    const colRef = collection(docRef, "Payments") 
                    const addUser = await addDoc(colRef, {...body,status:false,isDelete:false});
                   resolve()
                }
            
            })
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}




export const UpdatePayment=(paymentId,body)=>
{
  
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            const authref =  getAuth();
            onAuthStateChanged(authref, async(user) => {
           
            const  docRef   = doc(db, "Users",user.uid,'Payments',paymentId);
            const addUser = await updateDoc(docRef, body);
           resolve()
            })
        }
        catch(e)
        {
            console.log(e)
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
            const authref =  getAuth();
            onAuthStateChanged(authref, async(user) => {
                
            const  docRef   = doc(db, "Users", user.uid,'Payments',paymentId);
          
            const docSnap  = await getDoc(docRef);
            console.log(docSnap.data())
           resolve(docSnap.data())
        })
        }
        catch(e)
        {
            reject(e)
        }
    })
   
}

export const Logout=()=>
{ 
    return new Promise((resolve,reject)=>
    {
        const auth = getAuth();
        onAuthStateChanged(auth, async(user) => {
            try{
                const token=await getToken1()
                console.log(token)
                const deleteTokenRef=await deleteToken(messaging);
                        const  docRef   = doc(db, "Users", user.uid);
            const DeleteTokenUser = await updateDoc(docRef, {token:arrayRemove(token.toString())});
          const signoutref=await  signOut(auth)
          resolve()
            }
            catch(e)
            {
                    console.log(e)
                    reject(e)
            }
        })
    })
  
}
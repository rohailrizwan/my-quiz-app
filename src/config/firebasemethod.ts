import React from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { getDatabase, ref, set, onValue, get, DataSnapshot, push, child,query,equalTo, orderByChild } from "firebase/database";
import { app } from "./firebaseconfig";
import { resolve } from 'path';
import { rejects } from 'assert';


let auth = getAuth(app)
let db = getDatabase(app)


export let FbLogin = (body: any) => {
  return new Promise((resolve, reject) => {
    if (!body.email || !body.password) {
      reject("Email and Password are Required");
    }
    else {
      signInWithEmailAndPassword(auth, body.email, body.password)
        .then((res) => {
          const id = res.user.uid;
          const reference = ref(db, `users ${id}`);
          onValue(reference, (data) => {
            if (data.exists()) {
              resolve(data.val())
            }
            else {
              reject('no data found')
            }
          })

        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};


export let FbSignup = (body: any) => {
  return (
    new Promise((resolve, reject) => {
      if (!body.username || !body.email || !body.password || !body.fullName) {
        reject("fill form correctly")
      }
      else {
        createUserWithEmailAndPassword(auth, body.email, body.password).then((success) => {
          let userid = success.user.uid
          body.id = userid

          const reference = ref(db, `users ${userid}`)
          set(reference, body).then(() => {
            resolve("user created")
          })
            .catch(() => {
              reject("not created")
            })
        })
      }
    })
  )
}

export let Fbsignout=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}


export let addquiz = (body: any) => {
  return new Promise((resolve, rejects) => {
    const refkey=push(ref(db,'quiz')).key
    const reference = ref(db, 'quiz')
    set(reference, body).then((res) => {
        resolve('created')
    }).catch((err:any)=>{
      rejects(err)
    })
  })
}

export const getquiz = () => {
  return new Promise((resolve, rejects) => {
    const reference = ref(db, `quiz`)
    onValue(reference, (data) => {
      if (data) {
        resolve(Object.values(data.val()))
        // console.log(Object.values(data.val()))
        return
      } else {
        rejects('error')
        return
      }
    })
  })
}


export const fbgetquiz=(index:any)=>{
      return new Promise((resolve,rejects)=>{
        const quizref=ref(db,`quiz/${index}`)
        onValue(quizref,(data)=>{
          if(data.exists()){
            resolve(data.val())
          }
          else{
            rejects("not exist")
          }
        })
      })
}
import React from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, get, DataSnapshot, push, child } from "firebase/database";
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
      if (!body.username || !body.email || !body.password || !body.fullName ) {
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


const dbRef = ref(db);


export const addQuiz = (quizData: any) => {
  // Push a new quiz under a unique key
  const newQuizRef = push(ref(db, 'quizzes'));
  // const newQuizKey = newQuizRef.key; 
  //   quizData.id=newQuizKey
  // Set the quiz data under the generated key
  set(newQuizRef, quizData)
    .then((res) => {
      console.log("quiz created")
    })
    .catch((error) => {
      console.error('Error adding quiz: ', error);
    });
};


export const getquiz = () => {
  return new Promise((resolve, rejects) => {
    const reference = ref(db, `quizzes`)
    onValue(reference, (data) => {
      // const allData = data.val()
      if (data) {
        resolve(data.val())
        return
      } else {
        rejects('error')
        return
      }
    })
  })
}
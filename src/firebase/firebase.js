import * as firebase from 'firebase'
import expenses from '../tests/dummyData/expenses'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database()


export {firebase, database as default}

// let expensesFromFirebase

// database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//       console.log(snapshot.key, snapshot.val());
//     })
// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//       console.log(snapshot.key, snapshot.val());
//     })
// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//       console.log(snapshot.key, snapshot.val());
//     })

// database.ref('expenses').once('value').then((snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     expensesFromFirebase.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
//   console.log(expensesFromFirebase);
// })

// database.ref('expenses')
//     .on('value', (snapshot) => {
//       expensesFromFirebase = []
//       snapshot.forEach((childSnapshot) => {
//             expensesFromFirebase.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             })
//       })
//       console.log(expensesFromFirebase);
//     })








// const onValueCahnge = database.ref().on('value',(snapshot) => {
//   console.log(snapshot.val());
//  })
//
// setTimeout(() => {
//   database.ref().off('value', onValueCahnge);
// }, 3500)


// database.ref().set({
//   name: 'Abdullah Alhassan',
//   age: 22,
//   isSingle: true,
//   stressLeve: 6,
//   job: {
//    title: "Software Engingeer",
//    company: "Boxed"
//   },
//   location: {
//     city: 'Boston',
//     country: 'US'
//   }
// }).then(() => {
//   console.log("data written successfully");
// }).catch((error) => {
//   console.log(error);
// })

// database.ref('name')
//   .remove()
//   .then(() => {
//       console.log("deleted");
//   }).catch((e) => {
//       console.log(e);
//   })

// database.ref().update({
//   stressLeve: 9,
//   'location/city': 'Seattle',
//   'job/company': 'Amazon'
// })


// database.ref()
//     .once('value')
//     .then((snapshot) => {
//       console.log(snapshot.val());
//     }).catch((error) => {
//       console.log('error fetching data', error);
//     })

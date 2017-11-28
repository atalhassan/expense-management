const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise resolved")
    reject("Promise rejected")
  }, 1500)
})


promise.then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
})

function hello() {
  console.log("hello")
}

function call(a, callback) {
  console.log(a)

}

call(2, hello())

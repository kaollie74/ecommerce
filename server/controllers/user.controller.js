 const sayHi = (req, res) => {
  res.json({ message: 'hello from controller' })
}

// wouldn't initially work when I had just 'sayHi'
// because i need to export it as an object. 
module.exports = {sayHi};
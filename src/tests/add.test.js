const add = (a ,b) => (a + b)
const generateGreeting = (name = 'Anonymos') => `Hello ${name}`

test('should add two numbers', () => {
  const result = add(2, 4)

  expect(result).toBe(6)
})
test('should greet', () => {
  let result = generateGreeting('Abdullah')

  expect(result).toBe(`Hello Abdullah`)
  result = generateGreeting()

  expect(result).toBe(`Hello Anonymos`)
})

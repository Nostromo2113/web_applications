const now = new Date();

var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
let otherDate = new Date("2024-01-04"); // Предположим, что это другая дата

console.log(today)
console.log(otherDate)
console.log(today.toDateString() === otherDate.toDateString());
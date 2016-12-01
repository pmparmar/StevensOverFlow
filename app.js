// Siddharth Contractor #10402206

const file = require("./fileData");
const metric = require("./textMetrics");

metric.createMetrics("Hello, my friends! This is a great day to say hello.")
.catch(error => {
    console.log(error);
});

file.getFileAsString('chapter1.txt')
.then(data => {
	console.log('createMetrics on chapter1.txt')
    console.log(typeof data)
    
	let obj = metric.createMetrics(data);
    obj.then(data2 => {
        console.log(data2);
    }).catch(err => {
        console.log(err)
    })
})
.catch(err => {
	console.log(err);
})


file.getFileAsString('chapter2.txt')
.then(data => {
	console.log('createMetrics on chapter2.txt')
    console.log(typeof data)
    
	let obj = metric.createMetrics(data);
    obj.then(data2 => {
        console.log(data2);
    }).catch(err => {
        console.log(err)
    })
})
.catch(err => {
	console.log(err);
})


file.getFileAsString('chapter3.txt')
.then(data => {
	console.log('createMetrics on chapter3.txt')
    console.log(typeof data)
    
	let obj = metric.createMetrics(data);
    obj.then(data2 => {
        console.log(data2);
    }).catch(err => {
        console.log(err)
    })
})
.catch(err => {
	console.log(err);
})

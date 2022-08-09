//logging or printing
console.log("string in console")

//single line comment
/*  multiple
    line
    comment
*/

//declaring various dataTypes
boolData = true

//simple if statement
if(boolData){console.log('boolData was true')}
else{console.log('boolData was false')}

//and && or ||

//fuction
function circleArea(r){
    return Math.PI*r**2
}
console.log(circleArea(1))

//creating obj
studentA = {
    name: "Amen",
    age: 18,
    address: {
        aptNum: '601',
        zipCode: 'N5X 3H6'
    },
    introduce(){
        console.log(studentA)
    }
}
studentA.introduce()

//function typeof ~~ returns datatype of ~~


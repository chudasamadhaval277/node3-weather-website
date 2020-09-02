//console.log('java script is loaded')


/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{

    response.json().then((data) => {
        console.log(data)
    }) 
})*/

/*fetch('http://localhost:3000/weather?address=!').then((response)=>{

response.json().then((data1) => {
    if(data1.error){
        console.log(data1.error)
    }else{
        console.log(data1.location)

        console.log(data1.forcast)
        //console.log(data1)
    }
})
})*/
var weatherform = document.querySelector('form')
var search = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'from java script'

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    var location = search.value;
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+ location +'').then((response)=>{


    response.json().then((data)=>{

        if(data.error){
            messageOne.textContent = data.error
            //console.log(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast

            //console.log(data.location)
            //console.log(data.forcast)
        }
        
    })
    })
})
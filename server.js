const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('player' in params){
      // const playC = document.querySelector("#userName").value;
      if((params['player']=== 'Rock')||
      (params['player']=== 'Paper')||(params['player']=== 'Scissors')){
        res.writeHead(200, {'Content-Type': 'application/json'});
        function randomByBot(){
          let ran = Math.random()
          if(ran < .33){
            return 'Rock'
          }else if(ran < .66){
            return 'Papper'
          }else{
            return 'Scissors'
          }
         }
         let botChoice = randomByBot()
        
         function CheckWin(playerChoice){

          
          if((playerChoice === 'Rock' && botChoice === 'Papper')
          ||(playerChoice === 'Papper' && botChoice === 'Scissors')
          ||(playerChoice === 'Scissors' && botChoice ==='Rock')){
            console.log('Player Won!!!')
          }else if(playerChoice === botChoice){
            console.log('Game Tied')
          }else{
            console.log('Bot Won')
          }
         }
       CheckWin('Rock')
        const objToJson = {
          name: "Bot choice:"+ botChoice,
          status: "Boss Man" + player,
          currentOccupation:'baller:'
         
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if((params['player'] != 'Rock')||
      (params['player'] != 'Paper')||(params['player'] != 'Scissors')){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

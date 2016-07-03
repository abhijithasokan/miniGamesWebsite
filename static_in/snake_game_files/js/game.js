var s_b = 20,w=1000,h=600;

var bodyPiece = document.createElement('img');
bodyPiece.src = url+'body.png'
bodyPiece.style.position = "absolute";

var message = document.getElementById("message");
var controls = document.getElementById("controls");

var score = document.getElementById('score');
var foodEaten =document.getElementById('food');

var headPiece = document.createElement('img');
headPiece.src = url+'head.png'
headPiece.style.position = "absolute";

var food1 = document.createElement('img');
food1.src = url+'candy.gif'
food1.style.position = "absolute";

var food2 = document.createElement('img');
food2.src = url+'strawberry.gif'
food2.style.position = "absolute";

var food3 = document.createElement('img');
food3.src = url+'cup.gif'
food3.style.position = "absolute";

var gameBox = document.getElementById('game_box');
var LEFT = 65;
var RIGHT = 68;
var DOWN = 83;
var UP = 87;
var direction;
var cur_cor,temp;
var cont_mover;
var time_step ;
var occupied;
var foodCor ;
var food_timers;
var cur_score,foodEatenNo;
var func;

function abs(coordinates)
{
	return coordinates[0]*1000+coordinates[1];
}

function makePiece(coordinates){
	piece = bodyPiece.cloneNode();
	piece.style.left = coordinates[0]+"px";
	piece.style.top = coordinates[1]+"px";
	return piece;
}

function makeHead(coordinates){
	piece = headPiece.cloneNode();
	piece.style.left = coordinates[0]+"px";
	piece.style.top = coordinates[1]+"px";
	return piece;
}

function doMover(ret)
{
	if(!ret)
	{var snkp=document.getElementsByTagName("img");
		gameBox.removeChild(snkp[3]);
		occupied.splice(0,1);
	}
	gameBox.removeChild(gameBox.lastChild);			
	gameBox.appendChild(makePiece(temp));
	gameBox.appendChild(makeHead(cur_cor));	

	occupied.push(abs(cur_cor));
}

function getFoodCor()
{
	var x=Math.floor(Math.random()*50)*20;
	var y=Math.floor(Math.random()*30)*20;
	var fcor = x*1000+y;
	if(occupied.indexOf(fcor)==-1 && foodCor.indexOf(fcor)==-1)
		return [x,y,fcor];
	else
		return getFoodCor();

}




function placeNewFood(foodTouched)
{
	var newFoodNo = Math.floor(Math.random(0)*10);
	var newFood;
	switch(newFoodNo)
	{
		case 0: case 1: case 2: case 3: case 4: case 5: case 6:
			newFood=food1.cloneNode();
			break;
		case 7:
			newFood=food2.cloneNode();
			food_timers[foodTouched] = setTimeout(function(){
			gameBox.removeChild(document.getElementById(""+foodTouched));
			clearTimeout(food_timers[foodTouched]);placeNewFood(foodTouched);},7000);
			break;
		case 8: case 9:
			newFood=food3.cloneNode();
			food_timers[foodTouched] = setTimeout(function(){
			gameBox.removeChild(document.getElementById(""+foodTouched));
			clearTimeout(food_timers[foodTouched]);placeNewFood(foodTouched);},5000);
			break;
	}
	
	newFoodCor = getFoodCor();
	newFood.style.left=newFoodCor[0]+"px";
	newFood.style.top =newFoodCor[1]+"px";
	newFood.setAttribute("id",""+foodTouched);
	gameBox.insertBefore(newFood,gameBox.firstChild);
	foodCor[foodTouched] = newFoodCor[2];
}

function handleFood(){
	var ret=false;

	foodTouched=foodCor.indexOf(abs(cur_cor));
	if(foodTouched!=-1){
		time_step-=5;
		ret = true;
		foodInMouth = document.getElementById(""+foodTouched);
		gameBox.removeChild(foodInMouth);
		if(foodInMouth.src.endsWith("candy.gif"))
			cur_score+=5;
		else if(foodInMouth.src.endsWith("cup.gif"))
			{ cur_score+=15; occupied.splice(0,1); 
			  gameBox.removeChild(document.getElementsByTagName("img")[3]);
			  ret = false;
			  time_step+=10;
			}
		else{
			cur_score+=25;
			time_step+=20;
			}

		clearTimeout(food_timers[parseInt(foodInMouth.id)]);
		clearInterval(cont_mover);
		cont_mover = setInterval(func,time_step);
		foodEatenNo++;
		updateScoreBoard();
		placeNewFood(foodTouched);

	}
	return ret;
}

function nextStep()
{
	ret = handleFood();
	doMover(ret);
}


function move()
{
	switch(direction)
	{
		case LEFT:
			return function(){
				temp = cur_cor.slice();
				cur_cor[0]-=s_b;
				
				if(cur_cor[0]<0 || occupied.indexOf(abs(cur_cor))!=-1 || occupied.length<3)
					{ stopGame();  return ; }

				nextStep();
			}


		case RIGHT:
			return function(){
				temp = cur_cor.slice();
				cur_cor[0]+=s_b;

				if(cur_cor[0]>=w || occupied.indexOf(abs(cur_cor))!=-1 || occupied.length<3)
					{ stopGame();  return; }	
				
				nextStep();
			}


		case UP:
			return function(){
				temp = cur_cor.slice();
				cur_cor[1]-=s_b;

				if(cur_cor[1]<0  || occupied.indexOf(abs(cur_cor))!=-1 || occupied.length<3)
					{ stopGame(); return; }	


				nextStep();		
			}


		case DOWN:
			return function(){
				temp = cur_cor.slice();
				cur_cor[1]+=s_b;

				if(cur_cor[1]>=h  || occupied.indexOf(abs(cur_cor))!=-1 || occupied.length<3)
					{ stopGame();  return; }
				
				nextStep();
			}
	}
}


	


function updateScoreBoard()
{
	score.innerHTML="Score: "+cur_score;
	foodEaten.innerHTML="Food eaten: "+foodEatenNo;
}

function stopGame()
{	
	clearInterval(cont_mover);
	update();
	clearTimeout(food_timers[0]); clearTimeout(food_timers[1]); clearTimeout(food_timers[2]);
	document.onkeyup = null;
	message.innerHTML = "You Lost the Game! Press this button to start again";
	gameBox.style.backgroundColor = "#006700";
	gameBox.appendChild(controls);
	
}

function motion()
{
	func=move();
	clearInterval(cont_mover);
	cont_mover = setInterval(func,time_step);
	func();
}

function makeMove(e){
	switch(e.keyCode)
	{
		case LEFT:
			if(direction!=RIGHT)
				direction = LEFT;
			break;

		case RIGHT:
			if(direction!=LEFT)
				direction = RIGHT;
			break;

		case UP:
			if(direction!=DOWN)
				direction = UP;
			break;

		case DOWN:
			if(direction!=UP)
				direction = DOWN;
			break;
	}
	motion();
	
}


function setGame(){
	gameBox.style.backgroundColor = "green";
	while(gameBox.firstChild)
		gameBox.removeChild(gameBox.firstChild);

	food_timers=[0,0,0];
	cur_cor = [w/2,h/2];
	direction = RIGHT;
	cur_score = foodEatenNo = 0;
	updateScoreBoard();
	document.onkeyup = makeMove;
	time_step = 150;
	occupied=[];
	foodCor = [0,0,0];

	var coordinates = cur_cor.slice();
	occupied.push(abs(coordinates));
	gameBox.insertBefore(makeHead(coordinates),gameBox.firstChild);
	coordinates[0]-=s_b;

	for(var i=0;i<4;i++)
	{
		gameBox.insertBefore(makePiece(coordinates),gameBox.firstChild);
		occupied.push(abs(coordinates));
		coordinates[0]-=s_b;
	}
	placeNewFood(0);
	placeNewFood(1);
	placeNewFood(2);

	motion(move());
}

var bgreader;
var leaderData = document.getElementById('leaderboard');

function setUp()
{
	if(window.XMLHttpRequest)
		bgreader = new XMLHttpRequest();
	else
		bgreader = new ActiveXObject("Microsoft.XMLHTTP");
	bgreader.onreadystatechange = function() {
        if (bgreader.readyState == 4 && bgreader.status == 200)
            buildLeaderBoard(bgreader.responseText);
    };
    initial();
}

function buildLeaderBoard(str){
	var leaderData = document.getElementById('leaderboard');
	data_items = str.split('|');
	var i=0;
	while(leaderData.childNodes.length>1)
		leaderData.removeChild(leaderData.lastChild);
	for(var data of data_items){
		
		row=leaderData.insertRow(i);
		arr = data.split(',');
		i++;
		row.insertCell(0).innerHTML = i;
		row.insertCell(1).innerHTML = arr[0];
		row.insertCell(2).innerHTML = arr[1];
		row.insertCell(3).innerHTML = arr[2];	
	}
}

function update(){
	bgreader.open("POST",lr+'glb',true);
	//bgreader.setRequestHeader("X-CSRFToken", csrf);
	bgreader.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	bgreader.send("score="+cur_score);
}

function initial(){
	bgreader.open("GET",lr+'glb',true);
	bgreader.send();
}


window.onload=setUp;
let score = 0;
let questions = [];
let answer="";


loadQuestions();

function loadQuestions(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let responseObject = JSON.parse(xhttp.responseText);
			questions = responseObject.results;
			render();
		}
	};

	xhttp.open("GET", "https://opentdb.com/api.php?amount=1&type=multiple", true);
	xhttp.send();
}

function render(){
	let content = "";

	questions.forEach(question =>{
		answer=`${question.correct_answer}`;
		let shuffledQuestions =[];
		shuffledQuestions[0]=`${question.correct_answer}`;
		shuffledQuestions[1]=`${question.incorrect_answers[0]}`;
		shuffledQuestions[2]=`${question.incorrect_answers[1]}`;
		shuffledQuestions[3]=`${question.incorrect_answers[2]}`;
		shuffledQuestions.sort(() => Math.random() - 0.5);
		content += `
        <form name = "quiz" id="quiz">
			<div>
				<p> Question: ${question.question}</p>
				<input type="radio" id="1" name="question" value="${shuffledQuestions[0]}">${shuffledQuestions[0]}</input>
				<br/>
				<input type="radio" name="question" value="${shuffledQuestions[1]}">${shuffledQuestions[1]}</input>
				<br/>
				<input type="radio" name="question" value="${shuffledQuestions[2]}">${shuffledQuestions[2]}</input>
				<br/>
				<input type="radio" name="question" value="${shuffledQuestions[3]}">${shuffledQuestions[3]}</input>
				<br>
			</div>
        </form>    
		`
	})
	document.getElementById("question").innerHTML = content;
    

    

}

document.getElementById("submitButton").addEventListener("click", checkAnswer);
    function checkAnswer(){
       let selection = document.getElementById("quiz").question.value;
	   if(selection==answer){
        	score++;
		}
		document.getElementById("scoreBoard").innerHTML=`Score: ${score}`;
		loadQuestions();
   }



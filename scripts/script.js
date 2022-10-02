const questions = [{
        question: "1. Какой из вариантов является одним из видов графики",
        answers: ["Пиксельная", "Векторная", "Линейная ", "Цветная"],
        correct: 2,
    },
    {
        question: "2. Сколько способов создания «холста» в оконном приложении",
        answers: ["5", "3 полных", "4", "2"],
        correct: 3,
    },
    {
        question: "3. С помощью чего можно создать «холст»",
        answers: ["PictureBox", "ImageList", "Panel", "Layout panel"],
        correct: 1,
    },
    {
        question: "4. Какой класс предоставляет методы рисования на устройстве",
        answers: ["Draw", "Pens", "Graphics", "Graphicon"],
        correct: 3,
    },
    {
        question: "5. Наследуется ли класс Graphics?",
        answers: ["Да", "Нет", "Не знаю", "Думаю"],
        correct: 2,
    },
    {
        question: "6. Какой метод рисует набор сегментов линий, которые соединяют массив структур Point.",
        answers: ["DrawLine(Pen, Point, Point[ ])", "DrawLines(Pen, Point[ ])", "DrawSegments(Pen, Point[ ])", "DrawLines(Pen, Point)"],
        correct: 2,
    },
    {
        question: "7. Какое максимально число перегрузок имеют методы класса Graphics",
        answers: ["23", "30", "33", "32"],
        correct: 2,
    },
    {
        question: "8. Какой метод рисует набор прямоугольников, определяемых структурами Rectangle.",
        answers: ["	DrawRectangle(Pen, Rectangle)", "DrawRectangles(Pen, Rectangle[])", "DrawRectangles(Rectangle[])", "DrawRectangle(Pen, Rectangle[])"],
        correct: 2,
    },
    {
        question: "9. С помощью чего в примере создается «холст» для рисование объектов",
        answers: ["Window", "	ImageList", "Panel", "PictureBox"],
        correct: 4,
    },
    {
        question: "10. Как обозначаются координаты начала",
        answers: ["xe,ye", "xs,ys", "xn,yn", "x,y"],
        correct: 3,
    }
]
const testDiv = document.querySelector('#test');
const headerCont = document.querySelector('#header');
const listCont = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let questionIndex = 0;
let score = 0;


function clearHTML() {
    header.innerHTML = '';
    list.innerHTML = '';
}

function clearList() {
    list.innerHTML = '';
}

function showQuestion() {

    const headerTempl = '<h2 class="title_test">%title%</h2>';
    const title = headerTempl.replace('%title%', questions[questionIndex]['question']);
    headerCont.innerHTML = title;

    let answerNum = 1;
    for (i of questions[questionIndex]['answers']) {
        const listTempl = '<li><label><input value="%num%" type="radio" class="answer" name="answer"><span>%answer%</span></label></li>';
        const answerHTML = listTempl.replace('%answer%', i).replace('%num%', answerNum);
        listCont.innerHTML += answerHTML;
        answerNum++;
    }
}

function showResult() {
    console.log(score);
    const resultTempl = `<h2 class="title_test">%title%</h2>
    <h3 class="summary">%mess%</h3>
    <h4 class="result">%result%</h4>`;

    let title, mess;
    if (score == 10) {
        title = 'Молодец!';
        mess = 'Ты ответил все верно &#127942 &#127882';
    } else if (score > 5) {
        title = 'Почти почти...';
        mess = 'Ты ответил верно больше половины 	&#128077';
    } else if (score = 5) {
        title = 'На половинку)';
        mess = 'Ты ответил верно половину вопросов &#128076';
    } else {
        title = 'Почитай теорию еще раз :(';
        mess = 'Ты ответил верно меньше половины &#128078 	&#128580';
    }

    let result = `${score} из 10`;

    const resultMess = resultTempl.replace('%title%', title).replace('%mess%', mess).replace('%result%', result);
    headerCont.innerHTML = resultMess;
    console.log(result);

    submitBtn.innerText = 'Пройти заново';
    submitBtn.onclick = function() {
        history.go();
    }
}

green = 'color_green';
red = 'color_red'

function checkAnswer() {
    const choosenRadio = listCont.querySelector('input[type="radio"]:checked')

    if (!choosenRadio) {
        return
    }

    userAnswer = parseInt(choosenRadio.value);

    if (userAnswer == questions[questionIndex]['correct']) {
        score++;
    }
    clearList();
    let answerNum = 1;
    for (i of questions[questionIndex]['answers']) {
        var listTempl = '<li><label class="%class%"><input value="%num%" type="radio" class="answer" name="answer"><span>%answer%</span></label></li>';

        if (answerNum === questions[questionIndex]['correct']) {
            listTempl = listTempl.replace('%class%', green);
        } else {
            listTempl = listTempl.replace('%class%', red);

        }
        const answerHTML = listTempl.replace('%answer%', i).replace('%num%', answerNum);
        listCont.innerHTML += answerHTML;
        answerNum++;
        console.log(answerHTML);
    }
    setTimeout(nextQuestion, 1000)

    function nextQuestion() {
        if (questions.length - 1 != questionIndex) {
            questionIndex++;
            clearHTML();
            showQuestion();
        } else {
            clearHTML();
            showResult();

        }
    }


}


clearHTML();
showQuestion();
submitBtn.onclick = checkAnswer;
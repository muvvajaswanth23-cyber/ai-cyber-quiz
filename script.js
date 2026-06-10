let topics = {
    ai: [
        {
            question: "What is AI?",
            options: ["Smart machines", "Internet", "Typing"],
            answer: "Smart machines"
        },
        {
            question: "AI is used in?",
            options: ["Chatbots", "Books", "Pens"],
            answer: "Chatbots"
        }
    ],

    cyber: [
        {
            question: "What is phishing?",
            options: ["Cyber attack", "Game", "App"],
            answer: "Cyber attack"
        },
        {
            question: "What protects data?",
            options: ["Cyber Security", "Music", "Typing"],
            answer: "Cyber Security"
        }
    ],

    safety: [
        {
            question: "Should you share OTP?",
            options: ["Yes", "No", "Sometimes"],
            answer: "No"
        },
        {
            question: "Best password?",
            options: ["123456", "abc", "Abc@123"],
            answer: "Abc@123"
        }
    ]
};

let quizData = [];
let currentQuestion = 0;
let score = 0;

function loadTopic(topic) {
    quizData = topics[topic];
    currentQuestion = 0;
    score = 0;

    // Learning content
    if (topic === "ai") {
        document.getElementById("learnContent").innerHTML =
            "AI means machines that can think and learn like humans.";
    }

    if (topic === "cyber") {
        document.getElementById("learnContent").innerHTML =
            "Cyber Security protects systems and data from attacks.";
    }

    if (topic === "safety") {
        document.getElementById("learnContent").innerHTML =
            "Never share OTP or passwords with anyone.";
    }

    loadQuestion();
}

function loadQuestion() {
    let q = quizData[currentQuestion];

    document.getElementById("question").innerHTML = q.question;

    let buttons = document.querySelectorAll(".option");
    buttons.forEach((btn, index) => {
        btn.innerHTML = q.options[index];
    });

    document.getElementById("result").innerHTML = "";

    let progress = document.getElementById("progress");
    progress.style.width =
        (currentQuestion / quizData.length) * 100 + "%";
}

function checkAnswer(index) {
    let correct = quizData[currentQuestion].answer;
    let selected = quizData[currentQuestion].options[index];

    if (selected === correct) {
        score++;
        speak("Correct Answer");
        document.getElementById("result").innerHTML = "✅ Correct!";
    } else {
        speak("Wrong Answer");
        document.getElementById("result").innerHTML = "❌ Wrong!";
    }

    currentQuestion++;

    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            let message = score === quizData.length
                ? "🔥 Excellent!"
                : "👍 Keep Learning!";

            document.getElementById("question").innerHTML =
                "🎉 Quiz Completed!";
            document.getElementById("result").innerHTML =
                "Score: " + score + "/" + quizData.length + "<br>" + message;
        }
    }, 800);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

/* Voice */
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* Drag Drop */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");

    if (data === "safe") {
        document.getElementById("dragResult").innerHTML =
            "✅ Correct! Strong passwords keep your data safe.";
        speak("Good job");
    } else {
        document.getElementById("dragResult").innerHTML =
            "❌ Wrong! Weak passwords are risky.";
        speak("Wrong choice");
    }
}
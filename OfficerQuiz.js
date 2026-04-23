const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const resultScreen = document.getElementById('result-screen')
const playerName = document.getElementById('player-name')
const playerRank = document.getElementById('player-rank')
const startBtn = document.getElementById('start-btn')
const questionCounter = document.getElementById('question-counter')
const categoryLabel = document.getElementById('category-label')
const questionText = document.getElementById('question-text')
const answerOptions = document.getElementById('answer-options')
const nextBtn = document.getElementById('next-btn')
const resultName = document.getElementById('result-name')
const resultScore = document.getElementById('result-score')
const resultDetails = document.getElementById('result-details')
const restartBtn = document.getElementById('restart-btn')

const questions = [
    {
        question: "What is the name of the guild?",
        answers: ["The Bear Company", "The Moff Company", "Allied Vanguard", "The Lion Company"],
        correct: 3,
        category: "general",
        forPlayer: null
    }
]

let currentQuestion = 0
let playerAnswers = []
let activeQuestions = []
let shadeLocked = false
let shadeAttempts = 0

const shadeMessages = [
    "You think you can just take the test as the Shadiest rogue? As if he hasn't put in security measures for this?",
    "Nope!",
    "You're not Shade!",
    "You tried to be Shade(y)!",
    "Okay okay. If you want to take the test... Just refresh the page."
]

const knownPlayers = {
    'shadesliverg': { rank: 'officer-event', name: 'ShadesliverG' },
    'chennoa': { rank: 'officer-intro', name: 'Chennoa' },
    'chenn': { rank: 'officer-intro', name: 'Chennoa' },
    'chen': { rank: 'officer-intro', name: 'Chennoa' },
    'lianhua': { rank: 'officer-training', name: 'Lianhua' },
    'lia': { rank: 'officer-training', name: 'Lianhua' },
    'líanhua': { rank: 'officer-training', name: 'Lianhua' },
    'lía': { rank: 'officer-training', name: 'Lianhua' },
    'ale': { rank: 'officer-training', name: 'Lianhua' },
    'alethea': { rank: 'officer-training', name: 'Lianhua' },
    'olath': { rank: 'officer-training', name: 'Olath' },
    'olathus': { rank: 'officer-training', name: 'Olath' },
    'pilkin': { rank: ['officer-event', 'officer'], name: 'Pilkin' },
    'leylnaari': { rank: ['officer-event', 'officer'], name: 'Pilkin' },
    'thalryssla': { rank: 'commander', name: 'Thalryssla' },
    'thal': { rank: 'commander', name: 'Thalryssla' },
    'moff': { rank: 'commander', name: 'Thalryssla' }
}

const blockedNames = ['shadesliver', 'shade']

function isBlockedName(name) {
    return blockedNames.includes(name.toLowerCase())
}

function checkPlayerIdentity(name, rank) {
    const lower = name.toLowerCase()

    if (isBlockedName(lower)) {
        shadeLocked = true
        alert(shadeMessages[0])
        return false
    }

    if (shadeLocked) {
        const msg = shadeMessages[Math.min(shadeAttempts + 1, shadeMessages.length - 1)]
        shadeAttempts++
        alert(msg)
        return false
    }

    if (lower.endsWith('athus') && !knownPlayers[lower]) {
        alert("I just knew you'd do that.")
    }

    const player = knownPlayers[lower]

    if (!player && rank === 'commander') {
        alert('The Moff has seen you as... Not a moff!')
        return false
    }

    if (player) {
        const allowedRanks = Array.isArray(player.rank) ? player.rank : [player.rank]

        if (player.name === 'Thalryssla' && !allowedRanks.includes(rank)) {
            alert('Nice try, Commander Moff!')
            playerRank.value = 'commander'
            return false
        }

        if (player.name === 'Chennoa' && !allowedRanks.includes(rank)) {
            alert("Hah! You thought you could out smart me? Shade? No no no! Try again Chenn!")
            return false
        }

        if (player.name === 'Lianhua' && !allowedRanks.includes(rank)) {
            alert("Hey! I know you're training officer! Don't try to cheat the system! (I'm joking, change your name to something else to test other things!)")
            return false
        }

        if (player.name === 'Olath' && !allowedRanks.includes(rank)) {
            alert("Hey, Olath. I know you're training officer, come on. Wait did you try the test already? Uhhh... try another name!")
            return false
        }

        if (player.name === 'Pilkin' && !allowedRanks.includes(rank)) {
            alert("Pilkin! You're not this rank!")
            return false
        }
    }

    return true
}

function getQuestionsForPlayer(name, rank) {
    return questions.filter(function(q) {
        if (q.forPlayer && q.forPlayer.toLowerCase() !== name.toLowerCase()) {
            return false
        }
        if (q.category === 'general') return true
        if (q.category === 'officer') return true
        if (q.category === rank) return true
        if (rank === 'commander') return true
        return false
    })
}

function showQuestion() {
    const q = activeQuestions[currentQuestion]
    questionCounter.textContent = 'Question ' + (currentQuestion + 1) + ' / ' + activeQuestions.length
    categoryLabel.textContent = q.category
    questionText.textContent = q.question
    nextBtn.hidden = true
    answerOptions.innerHTML = ''
    q.answers.forEach(function(answer, index) {
        const btn = document.createElement('button')
        btn.textContent = answer
        btn.addEventListener('click', function() {
            playerAnswers[currentQuestion] = index
            Array.from(answerOptions.children).forEach(function(b) {
                b.style.backgroundColor = ''
                b.style.borderColor = ''
            })
            btn.style.backgroundColor = '#2a4060'
            btn.style.borderColor = '#5080b0'
            nextBtn.hidden = false
        })
        answerOptions.appendChild(btn)
    })
}

function showResults() {
    const name = playerName.value.trim()
    let score = 0
    activeQuestions.forEach(function(q, i) {
        if (playerAnswers[i] === q.correct) {
            score++
        }
    })

    resultName.textContent = name
    resultScore.textContent = score + ' / ' + activeQuestions.length

    resultDetails.innerHTML = ''
    activeQuestions.forEach(function(q, i) {
        const item = document.createElement('div')
        const isCorrect = playerAnswers[i] === q.correct
        const playerAnswer = q.answers[playerAnswers[i]]
        const correctAnswer = q.answers[q.correct]

        let html = '<p style="color: ' + (isCorrect ? '#60b080' : '#c06060') + ';">'
        html += (isCorrect ? '✓' : '✗') + ' ' + q.question + '</p>'
        html += '<p style="margin-left: 20px; color: #98a8c0;">Your answer: ' + playerAnswer + '</p>'

        if (!isCorrect) {
            html += '<p style="margin-left: 20px; color: #60b080; font-style: italic;">Correct: ' + correctAnswer + '</p>'
        }

        if (name.toLowerCase() === 'thalryssla' && q.question === "What is the name of the guild?" && playerAnswer === "The Moff Company") {
            html += '<p style="margin-left: 20px; color: #c0a860; font-style: italic;">I just knew you would pick that one!</p>'
        }

        item.innerHTML = html
        item.style.marginBottom = '15px'
        resultDetails.appendChild(item)
    })
}

startBtn.addEventListener('click', function() {
    const name = playerName.value.trim()
    const rank = playerRank.value

    if (name === '' || rank === '') {
        alert('Please enter your name and select a rank')
        return
    }

    if (!checkPlayerIdentity(name, rank)) {
        return
    }

    activeQuestions = getQuestionsForPlayer(name, rank)
    currentQuestion = 0
    playerAnswers = []
    startScreen.hidden = true
    quizScreen.hidden = false
    showQuestion()
})

nextBtn.addEventListener('click', function() {
    currentQuestion++
    if (currentQuestion < activeQuestions.length) {
        showQuestion()
    } else {
        quizScreen.hidden = true
        resultScreen.hidden = false
        showResults()
    }
})

restartBtn.addEventListener('click', function() {
    resultScreen.hidden = true
    startScreen.hidden = false
    currentQuestion = 0
    playerAnswers = []
    playerName.value = ''
    playerRank.value = ''
    nextBtn.hidden = true
})

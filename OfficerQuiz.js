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
const quizName = document.getElementById('quiz-name')

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

const questions = [
    {
        question: "What is the name of the guild?",
        answers: ["The Bear Company", "The Moff Company", "Allied Vanguard", "The Lion Company"],
        correct: 3,
        category: "general",
        forPlayer: null
    },
    {
        question: "When was The Lion Company founded?",
        answers: ["November 23rd, 2004", "May 2nd, 2011", "April 21st, 2025", "December 12th, 2025"],
        correct: 2,
        category: "general",
        forPlayer: null
    },
    {
        question: "What is the primary purpose of The Lion Company?",
        answers: ["A mercenary unit with the mission of blowing up Goldshire", "A military unit defending the King and Stormwind", "A group of adventurers seeking treasure", "Moff Thalryssla's personal fan club"],
        correct: 1,
        category: "general",
        forPlayer: null
    },
    {
        question: "Which rule must all guild members follow?",
        answers: ["No Goldshire", "Every Saturday, people need to have glaives on the ready to test Dave", "No playing gnomes", "Always carry a Moff repellent in your bags"],
        correct: 0,
        category: "general",
        forPlayer: null
    },
    {
        question: "What must a new member complete before joining any event?",
        answers: ["A 500-word essay on why they love Thing", "An IC Intro", "Defeat an officer in a spar", "A blood oath sworn in the name of Pilkin Tinkelbinn"],
        correct: 1,
        category: "general",
        forPlayer: null
    },
    {
        question: "Who is the current leader of The Lion Company?",
        answers: ["Chennoa", "Pilkin", "Thalryssla", "Dave"],
        correct: 2,
        category: "general",
        forPlayer: null,
        excludePlayer: "Thalryssla"
    },
    {
        question: "Who is the current leader of The Lion Company?",
        answers: ["MOFF!", "MOFF!", "MOFF!", "MOFF!"],
        correct: [0, 1, 2, 3],
        category: "general",
        forPlayer: "Thalryssla"
    },
    {
        question: "What does IC Intro stand for?",
        answers: ["An introduction to Icecrown Citadel", "An In-Character Introduction where recruits share their character's background", "An Inspection Check for new members' gear", "An Ice Cream social in Stormwind"],
        correct: 1,
        category: "officer",
        forPlayer: null
    },
    {
        question: "When are the weekly events scheduled?",
        answers: ["Tuesday Training 9pm, Friday Event 9pm, Saturday Raid 8pm", "Tuesday Training 8pm, Friday Event 8pm, Saturday Raid 9pm", "Every day at 9pm, the Lion Company never rests", "Whenever Dave manages to dodge glaives"],
        correct: 0,
        category: "officer",
        forPlayer: null
    },
    {
        question: "What clan did the fire shaman Mork'ragan lead?",
        answers: ["The Warsong Clan", "The Frostwolf Clan", "The Blackrock Clan", "The Moff'ragan Clan"],
        correct: 2,
        category: "officer",
        forPlayer: null
    },
    {
        question: "Where is The Lion Company's HQ located?",
        answers: ["Goldshire Inn", "Near the Embassy in Stormwind", "Ironforge Great Forge", "On top of Icecrown Citadel, that's why it's called IC Intro, duuh!"],
        correct: 1,
        category: "officer",
        forPlayer: null
    },
    {
        question: "What is the correct structure of a Friday event?",
        answers: ["Briefing at HQ, mission, debrief", "Briefing at HQ, mission, loot rolls, debrief", "Mission first, briefing after, debrief optional", "Briefing at Goldshire, mission to find Dave's missing glaive awareness"],
        correct: 0,
        category: "officer-event",
        forPlayer: null
    },
    {
        question: "What are the two combat styles used during events?",
        answers: ["RP-PvP with auto attacks and one ability every 10 seconds, or DnD-style with roll-based turns", "Standard battleground rules, or arena 1v1s", "Whoever types /yell the loudest wins, or rock-paper-scissors in whispers", "Full DPS rotation parsing through Warcraft Logs, or whoever the Moff points at dies"],
        correct: 0,
        category: "officer-event",
        forPlayer: null
    },
    {
        question: "What must members wear when meeting up for an event?",
        answers: ["Their most expensive transmog", "Uniform", "The mandatory \"Pilkin is love, Tinkelbinn is life\" T-shirt", "Nothing, freedom of expression is key"],
        correct: 1,
        category: "officer-event",
        forPlayer: null
    },
    {
        question: "In the DnD-style combat, what is the turn order?",
        answers: ["Melee, ranged, healers, then enemy", "Healers, ranged, melee, then enemy", "Melee, ranged, enemy, then healers pray it's enough", "The Moff goes first, everyone else fights over what's left"],
        correct: 0,
        category: "officer-event",
        forPlayer: null
    },
    {
        question: "What information should be covered during an IC Intro?",
        answers: ["Name, age, birthplace, residence, special skills, and reason for enlisting", "Name, favourite colour, and whether they've been to Goldshire", "Just their name and a firm handshake", "A full 30-minute presentation about their character's childhood trauma"],
        correct: 0,
        category: "officer-intro",
        forPlayer: null
    },
    {
        question: "Which of these would be a red flag during an IC Intro?",
        answers: ["Someone who is clearly trolling and not showing interest in military RP", "The recruit is nervous and speaks quietly", "The recruit asks questions about the company", "The recruit brought Dave as a reference"],
        correct: 0,
        category: "officer-intro",
        forPlayer: null
    },
    {
        question: "What is Chennoa's role within The Lion Company besides Officer-Intro?",
        answers: ["She is the guild's head chef", "She is a scout", "She is Thalryssla's personal bodyguard", "She is the official Goldshire ambassador"],
        correct: 1,
        category: "officer-intro",
        forPlayer: null
    },
    {
        question: "What does a typical Tuesday training start with?",
        answers: ["A 1v1 RP sparring match between attendees", "A 5km jog around Stormwind", "Reading from the Lion Company handbook, chapter by chapter", "Dave's glaive dodging drills"],
        correct: 0,
        category: "officer-training",
        forPlayer: null
    },
    {
        question: "What is the correct combat formation?",
        answers: ["Melee in a line in front, ranged and healers behind melee, Commander in the middle", "Everyone in a circle around the Commander", "Ranged in front so they can hit first, melee protects the healers from behind", "No formation, just charge and hope for the best"],
        correct: 0,
        category: "officer-training",
        forPlayer: null
    },
    {
        question: "What is the correct marching formation?",
        answers: ["One leader in front, two officers in the far back with Alliance flags, Commander on the side", "Single file line, tallest in front, shortest in back", "The Moff leads, everyone else follows at a safe distance", "Two lines with Dave in the middle for glaive protection"],
        correct: 0,
        category: "officer-training",
        forPlayer: null
    },
    {
        question: "What does a typical Tuesdathus Trainathus start with?",
        answers: ["A 1v1 RP sparrathus match", "A lecture on the history of Stormwindathus", "Formathus drills until someone faintathus", "Daveathus tries to dodge glaivathus"],
        correct: 0,
        category: "officer-training",
        forPlayer: "Olath"
    },
    {
        question: "Who has the final say on approving events?",
        answers: ["Any officer can approve events", "The Commander", "It's decided by a coin flip at HQ", "The new recruit who hasn't done their intro yet even though it's been months since they joined"],
        correct: 1,
        category: "commander",
        forPlayer: null
    },
    {
        question: "How should the Commander handle a major change in the guild?",
        answers: ["Just do it and inform the officers later", "Discuss it with the officers first", "Post a notice on the HQ bulletin board and hope everyone reads it", "Send a letter to the King and wait the required 4-5 months for it to be denied"],
        correct: 1,
        category: "commander",
        forPlayer: null
    },
    {
        question: "How is a new Commander appointed?",
        answers: ["The previous Commander picks their successor", "Whoever has the best transmog", "The officers vote on it", "Whoever comes out unscarred from Goldshire Inn"],
        correct: 2,
        category: "commander",
        forPlayer: null
    },
    {
        question: "How does the Commander oversee the other officer branches?",
        answers: ["They trust the officers to handle their branch and step in only when needed", "They send a moff to each officer every morning with a to-do list", "They assign daily reports to each officer", "They don't — the Commander only handles paperwork"],
        correct: 0,
        category: "commander",
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
    'shadesliverg': { rank: 'officer-event', name: 'Shadesliver' },
    'shadeg': { rank: 'officer-event', name: 'Shadesliver' },
    'chennoa': { rank: 'officer-intro', name: 'Chennoa' },
    'chenn': { rank: 'officer-intro', name: 'Chennoa' },
    'chen': { rank: 'officer-intro', name: 'Chennoa' },
    'lianhua': { rank: 'officer-training', name: 'Lianhua' },
    'lia': { rank: 'officer-training', name: 'Lianhua' },
    'líanhua': { rank: 'officer-training', name: 'Lianhua' },
    'lía': { rank: 'officer-training', name: 'Lianhua' },
    'ale': { rank: 'officer-training', name: 'Lianhua' },
    'alethea': { rank: 'officer-training', name: 'Lianhua' },
    'olath': { rank: 'officer-training', name: 'Olathus' },
    'olathus': { rank: 'officer-training', name: 'Olathus' },
    'pilkin': { rank: ['officer-event', 'officer'], name: 'Pilkin' },
    'leylnaari': { rank: ['officer-event', 'officer'], name: 'Pilkin' },
    'thalryssla': { rank: 'commander', name: 'Thalryssla' },
    'thal': { rank: 'commander', name: 'Thalryssla' },
    'moff': { rank: 'commander', name: 'Thalryssla' },
    'moth': { rank: 'commander', name: 'Thalryssla' }
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

function isAnswerCorrect(playerAnswer, correct) {
    if (Array.isArray(correct)) {
        return correct.includes(playerAnswer)
    }
    return playerAnswer === correct
}

function getQuestionsForPlayer(name, rank) {
    var player = knownPlayers[name.toLowerCase()]
    var displayName = player ? player.name : name

    return questions.filter(function(q) {
        if (q.excludePlayer && q.excludePlayer === displayName) {
            return false
        }
        if (q.forPlayer && q.forPlayer !== displayName) {
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
    var shuffledIndexes = [0, 1, 2, 3]
    shuffle(shuffledIndexes)
    shuffledIndexes.forEach(function(index) {
        const btn = document.createElement('button')
        btn.textContent = q.answers[index]
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

function pulseNumber(element) {
    element.style.transform = 'scale(1.3)'
    setTimeout(function() {
        element.style.transform = 'scale(1)'
    }, 80)
}

function countDown(start, end, delay, callback) {
    var current = start
    var timer = setInterval(function() {
        resultScore.textContent = current + ' / 10'
        pulseNumber(resultScore)
        current--
        if (current < end) {
            clearInterval(timer)
            if (callback) callback()
        }
    }, delay)
}

function animateScore(score, total) {
    resultScore.style.fontSize = '4rem'
    resultScore.style.transition = 'font-size 0.3s, transform 0.1s'

    if (score === 0) {
        countDown(20, 0, 100, function() {
            resultScore.textContent = '0 / ' + total
            resultScore.style.fontSize = '2.5rem'
            pulseNumber(resultScore)
        })
    } else if (score <= 4) {
        countDown(20, 10, 100, function() {
            resultScore.textContent = '10 / ' + total
            pulseNumber(resultScore)
            setTimeout(function() {
                countDown(9, score, 100, function() {
                    resultScore.textContent = score + ' / ' + total
                    resultScore.style.fontSize = '2.5rem'
                    pulseNumber(resultScore)
                })
            }, 1000)
        })
    } else {
        countDown(20, score - 1, 100, function() {
            resultScore.textContent = (score - 1) + ' / ' + total
            pulseNumber(resultScore)
            setTimeout(function() {
                resultScore.textContent = score + ' / ' + total
                resultScore.style.fontSize = '2.5rem'
                pulseNumber(resultScore)
            }, 800)
        })
    }
}

function showResults() {
    const name = playerName.value.trim()
    let score = 0
    activeQuestions.forEach(function(q, i) {
        if (isAnswerCorrect(playerAnswers[i], q.correct)) {
            score++
        }
    })

    resultName.textContent = name
    animateScore(score, activeQuestions.length)

    resultDetails.innerHTML = ''
    activeQuestions.forEach(function(q, i) {
        const item = document.createElement('div')
        const isCorrect = isAnswerCorrect(playerAnswers[i], q.correct)
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
    activeQuestions = shuffle(activeQuestions)
    activeQuestions = activeQuestions.slice(0, 10)
    currentQuestion = 0
    playerAnswers = []
        var player = knownPlayers[name.toLowerCase()]
        var displayName = player ? player.name : name
    quizName.textContent = displayName
    startScreen.style.opacity = '0'
    setTimeout(function() {
    startScreen.hidden = true
    quizScreen.style.opacity = '0'
    quizScreen.hidden = false
    setTimeout(function() {
    quizScreen.style.opacity = '1'
    }, 50)
    showQuestion()
    }, 500)
})

nextBtn.addEventListener('click', function() {
    currentQuestion++
    if (currentQuestion < activeQuestions.length) {
        answerOptions.style.opacity = '0'
        questionText.style.opacity = '0'
        setTimeout(function() {
      showQuestion()
      answerOptions.style.opacity = '1'
      questionText.style.opacity = '1'
  }, 500)
    } else {
        quizScreen.style.opacity = '0'
          setTimeout(function() {
              quizScreen.hidden = true
              resultScreen.style.opacity = '0'
              resultScreen.hidden = false
              setTimeout(function() {
                  resultScreen.style.opacity = '1'
              }, 50)
              showResults()
          }, 500)
    }
})

restartBtn.addEventListener('click', function() {
    resultScreen.style.opacity = '0'
    setTimeout(function () {
    resultScreen.hidden = true
    startScreen.style.opacity = '0'
    startScreen.hidden = false
    currentQuestion = 0
    playerAnswers = []
    playerName.value = ''
    playerRank.value = ''
    nextBtn.hidden = true
    setTimeout(function() {
        startScreen.style.opacity = '1'
    }, 50)
}, 500)
})

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const uuid = require('uuid/v4');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let QUESTIONS = [
  {
    id: 1,
    question: 'What are your thoughts on having more than ONE bank account to split your funds?',
    content: `Hi, I was chatting with my friend and he brought up having a different bank account for your savings (eg. UOB One + OCBC Bonus+ Savings) just in case one bank faces crisis. My initial thought was, what about the interest I lose from the UOB One?
    May i check if anyone here has more than one bank account? Or what does the community think about his idea?`,
    tags: ['Savings', 'Lifestyle'],
    viewed: 20,
    answers: Array(10).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  },
  {
    id: 2,
    question: 'In Savings future?',
    content: "Because the stocks are undervalued now, should I put in more money to StashAway and Syfe (REITs) now? I have no plans to take them out for the near future",
    tags: ['Savings'],
    viewed: 3,
    answers: Array(3).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  },
  {
    id: 3,
    question: 'Should I put more money into roboadvisor during this period of Covid-19 chaos?',
    content: "Because the stocks are undervalued now, should I put in more money to StashAway and Syfe (REITs) now? I have no plans to take them out for the near future.",
    tags: ['COVID-19', 'Savings'],
    viewed: 5,
    answers: Array(5).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  },
  {
    id: 4,
    question: 'During this period of COVID-19, how is my Allied World Travel Protector policy being affected?',
    content: "During this period, they will not provide cover under its travel insurance policies for any claims related directly or indirectly to the pandemic.",
    tags: ['COVID-19', 'Savings'],
    viewed: 10,
    answers: Array(6).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  },
  {
    id: 5,
    question: `Generally a frugal person but now I'm back to square one as a bulk of savings were used for wedding and study loans. Might lose my full-time job soon, what should I do?`,
    content: "I'm working part-time over weekends still. How should I approach this situation? What should I do if I lose my job?",
    tags: ['COVID-19', 'Savings'],
    viewed: 10,
    answers: Array(10).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  },
  {
    id: 6,
    question: `I earn x3 of my bf but he insists to "overspend" his salary on me and refuses to stop cause he wants to keep up with me. How do I tell him nicely that he can't keep up?`,
    content: `Me: O levels. Work almost daily, up to 16hrs/day (ft/pt/freelance/etc) paid off and now I "live a good lifestyle" not crazy rich Asian

    Bf: Uni grad, Job hopped and got his "first job" (a 9-5) 3 yrs ago

    Was introed by a friend. We hit it off. Didn't think money needed to be mentioned then

    He can't keep up with my lifestyle. I don't blame him but he buys me things he can't afford? He also poor thing cuz he knows I'm used to being pampered. My main concern now is his future... Can't save what u spend`,
    tags: ['Lifestyle'],
    viewed: 10,
    answers: Array(10).fill().map(() => {
      return {
        name: faker.name.firstName(),
        group: faker.company.companyName(),
        answer: faker.lorem.sentence()
      }
    })
  }
];

let TOPICS = [
  'COVID-19',
  'Savings',
  'Lifestyle',
];

app.get('/', (req, res) => {
  res.send('Welcome to a dummy server')
})

app.get('/questions', (req, res) => {
  res.json(QUESTIONS)
});

app.get('/topics', (req, res) => {
  res.json(TOPICS)
});

app.get('/questions/:topic', (req, res) => {
  let filtered = QUESTIONS.map(q => q);
  if (req.params.topic !== 'all') {
    filtered = QUESTIONS.filter(q => q.tags.includes(req.params.topic) > 0 && q);
  }
  return res.json(filtered)
})

app.post('/questions', (req, res) => {
  const newQuestion = {
    id: uuid(),
    ...req.body,
  };

  addQuestions(newQuestion);
  addTag(req.body.tags);

  res.json(newQuestion)
});

function addQuestions(question) {
  QUESTIONS = [
    ...QUESTIONS,
    question
  ];
}

function addTag(tags) {
  TOPICS = [...new Set([...TOPICS, ...tags])]
}

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
});
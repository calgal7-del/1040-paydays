    import React, { useEffect, useMemo, useRef, useState } from "react";
    import {
      CalendarDays,
      CircleDotDashed,
      UserRound,
      Sun,
      Lock,
      Heart,
      Mail,
      Camera,
      Facebook,
      Instagram,
      Youtube,
      ShieldAlert,
      SlidersHorizontal,
      X,
      Menu,
      BookOpen,
      BarChart3,
    } from "lucide-react";
    import "./App.css";
    import { LEARN_EDITORIAL_CONFIG } from "./learnConfig.mjs";
    import { PHILOSOPHY_PAGES } from "./philosophyConfig.mjs";

    const PAYDAYS_TOTAL = 1040;
    const STORAGE_KEY = "1040-paydays-settings";
    const ONBOARDING_KEY = "1040-paydays-onboarding-seen";
    const MAILING_LIST_CONSENT_TEXT =
      "Join the 1040 Paydays mailing list for new articles, practical financial ideas, calculators, and occasional updates. You can unsubscribe at any time.";
    const SITE_URL = "https://www.1040paydays.com";
    const PAYDAY_PRINCIPLE_ICONS = {
      liveToday: Sun,
      protectTomorrow: Lock,
      planYourFuture: BarChart3,
      chooseWhatMatters: Heart,
    };

    const DEFAULT_SETTINGS = {
      currency: "USD",
      starting: 10000,
      contribution: 250,
      frequency: "Biweekly",
      age: 35,
      retireAge: 65,
      returnRate: 7,
      withdrawalRate: 4,
      lifespan: 95,
      inflation: 2.5,
      feeRate: 0.5,
      contributionGrowth: 0,
      snapshots: [],
    };

   const FEATURED_ARTICLE = {
  id: "you-only-get-about-1040-paydays",
  title: "You Only Get About 1,040 Paydays",
  summary:
    "Most people think about money in dollars. I think about it in paydays.",
  image: "/article-1040-paydays.png",
  readTime: "4 min read",
  category: "Payday philosophy",
  kicker: "THE PAYDAY PHILOSOPHY",
  alt: "A woman sitting at her office desk during the workday",
  caption:
    "Most people think about money in dollars. I think about it in paydays.",
  quote: {
    strong: "One paycheck rarely changes your life.",
    text: "Hundreds of them can.",
  },
  sections: [
    {
      heading: "The Day Everything Changed",
      paragraphs: [
        "Most people think about money in dollars.",
        "I think about it in paydays.",
        "That shift didn't come from a finance book or a spreadsheet.",
        "It began on my very first day at a new job.",
        "As I was getting settled, I noticed something unusual.",
        "There was an energy around one woman's cubicle.",
        "People kept glancing over.",
        "Some stopped to talk to her.",
        "Others simply watched from across the office.",
        "I had no idea what was happening.",
        "Finally, someone leaned over and quietly said,",
        "\"Today's her last day.\"",
        "I assumed she had found another job.",
        "\"No,\" they said.",
        "\"She's retiring.\"",
        "I looked back at her.",
        "She looked too young.",
        "Not young enough to be starting her career.",
        "Too young to be finishing it.",
        "I remember looking around the office.",
        "People weren't just congratulating her.",
        "They were imagining themselves in her place.",
        "For the first time, retirement stopped feeling like something that happened to old people.",
        "It looked like freedom.",
        "Driving home that evening, one question stayed with me.",
        "\"How do you get there?\"",
        "Not how do you dream about retirement.",
        "How do you reach the point where work becomes a choice?",
      ],
    },
    {
      heading: "About 1,040 Decisions",
      paragraphs: [
        "A few weeks later, while reading about retirement planning, I came across a number that changed the way I looked at money.",
        "Most people who work full-time receive about 26 paychecks each year.",
        "Over a forty-year career, that's roughly 1,040 paydays.",
        "About 1,040 decisions.",
        "Until then, retirement had always felt like one enormous goal somewhere in the distance.",
        "Now it felt different.",
        "It wasn't built all at once.",
        "It was built one payday at a time.",
        "For the first time, retirement wasn't measured in decades.",
        "It was measured by what I chose to do with my next paycheck.",
        "Everyone starts somewhere.",
        "Some people are opening their first paycheck.",
        "Others have already received hundreds.",
        "Where you begin matters far less than what you do with your next payday.",
      ],
    },
    {
      heading: "Think in Paydays",
      paragraphs: [
        "For years I asked myself,",
        "\"How much money do I need?\"",
        "Eventually I realized there was a better question.",
        "\"What can this payday become?\"",
        "Maybe it becomes the last payment on a credit card.",
        "Maybe it becomes your first investment.",
        "Maybe it becomes the emergency fund that helps you sleep better at night.",
        "Those moments rarely feel important when they're happening.",
        "Looking back, they often turn out to be the paydays that changed everything.",
        "Most people think in dollars.",
        "I prefer to think in paydays.",
        "Because dollars come and go.",
        "A payday is a decision.",
        "And enough good decisions can quietly change the direction of an entire life.",
      ],
    },
    {
      heading: "Why 1040 Paydays Exists",
      paragraphs: [
        "That's why I created 1040 Paydays.",
        "Not because I think life is about saving every dollar.",
        "And not because I believe people should feel guilty for enjoying the money they've earned.",
        "I created it because changing the way I looked at a payday changed the way I looked at my future.",
        "Every article on this site comes back to the same idea.",
        "Every payday gives us another decision.",
        "Another opportunity to move a little closer to the life we hope to build.",
        "I still think about that woman sometimes.",
        "I never learned her story.",
        "I don't know what sacrifices she made.",
        "I don't know how much she earned.",
        "I don't know what her investment returns were.",
        "What I do know is that on my very first day, she showed me what financial freedom looked like.",
        "She never said a word to me.",
        "She didn't have to.",
        "She simply walked away.",
        "None of us knows exactly how many paydays we'll receive.",
        "We only know that every one of them is a decision.",
        "Every payday is a decision.",
        "Choose yours.",
      ],
    },
  ],
};
    const SECOND_ARTICLE = {
  id: "who-wants-to-go-home",
  title: "Who Wants to Go Home? The Hidden Cost of Leaving Work Early",
  summary:
    "Leaving work early can feel like a reward, but every lost hour affects your paycheck, savings, and future. One simple question changed the way I value every hour I work.",
  image: "/article-who-wants-to-go-home.png",
  readTime: "5 min read",
  category: "Payday philosophy",
  kicker: "WORK · TIME · PAYDAYS",
  alt: "Call centre employee volunteering to leave work early and give up an hour of pay",
  caption:
    "Every hour funds something. Make sure it's funding the life you actually want.",
  quote: {
    strong: "Every hour funds something.",
    text: "Make sure it's funding the life you actually want.",
  },
  sections: [
    {
      heading: "Who wants to go home?",
      paragraphs: [
        "I still remember working in a call centre in my twenties.",
        "The work could be busy, stressful, and mentally exhausting.",
        "Near the end of the day, if call volumes were lower than expected, our supervisor would stand up and ask one simple question.",
        "\"Who wants to go home?\"",
        "Hands would shoot into the air.",
        "People couldn't volunteer fast enough. Leaving an hour early felt like winning. One less hour answering phones and one more hour at home. Who wouldn't want that?",
        "At first, I raised my hand too.",
        "An hour didn't seem like much. I had already worked most of the day. What difference could sixty minutes really make?",
        "But in an hourly job, sixty minutes is never just sixty minutes.",
        "It is another hour of pay that either reaches your paycheck or doesn't.",
      ],
    },
    {
      heading: "The company had already done the math",
      paragraphs: [
        "After a while, I noticed something.",
        "The same people volunteered almost every time.",
        "An hour today. Another hour next week. Sometimes two.",
        "No one walked out thinking they had just given up part of their retirement. They were simply happy to be leaving work early.",
        "Then something else occurred to me.",
        "The company wasn't offering early departures to be generous. It was saving money.",
        "One employee leaving an hour early wasn't a big deal. Twenty employees leaving an hour early was.",
        "For the company, fewer paid hours meant lower payroll costs. For employees, those same hours meant smaller paychecks, even if the difference didn't feel significant that day.",
        "Week after week, those savings added up.",
        "The company understood something I hadn't.",
        "It wasn't really about one hour. It was about the same decision being made over and over again.",
        "Walking home that afternoon, something clicked.",
        "If one hour mattered enough for the company to save the money...",
        "Maybe I shouldn't be so quick to give it away.",
        "Every hour I worked had value, not only because of the money I earned that afternoon, but because of what those earnings could become over time.",
      ],
    },
    {
      heading: "What is this hour worth?",
      paragraphs: [
        "From that day forward, I stopped reacting automatically whenever the question was asked.",
        "Before I raised my hand, I asked myself a different question.",
        "\"What is this hour worth to me?\"",
        "Sometimes the answer was obvious.",
        "I was tired. The sun was shining. Walking home instead of sitting under fluorescent lights for another hour felt like the right choice.",
        "Those were easy decisions.",
        "Other days, I stayed.",
        "Not because the company wanted me to, but because I knew exactly what that hour was buying.",
        "An extra payment on a bill.",
        "A little more money in my savings account.",
        "A slightly larger paycheck at the end of the pay period.",
        "Another small step toward the future I wanted.",
        "There wasn't a right answer.",
        "What mattered was knowing why I made the choice.",
        "I wasn't simply deciding whether to work another hour. I was deciding what that hour of pay was worth to my future.",
      ],
    },
    {
      heading: "Every hour funds something",
      paragraphs: [
        "That question stayed with me long after I left the call centre.",
        "Not because of the job, but because of what it taught me.",
        "Every hour funds something.",
        "Some days, going home early is exactly the right decision.",
        "Other days, another hour of pay might cover groceries, add a little more to your savings, or help pay for something you'll appreciate long after that afternoon is forgotten.",
        "Every paycheck is made up of ordinary hours that most of us barely notice.",
        "One hour rarely changes your finances, but hundreds of hours can quietly shape where you'll be years from now.",
        "Even now, whenever I hear someone say,",
        "\"Who wants to go home?\"",
        "my mind still answers with a different question.",
        "\"What is this hour worth to me?\"",
        "Sometimes the extra pay is worth staying.",
        "Sometimes getting home an hour earlier is worth far more.",
        "I've done both.",
        "The difference is that now I decide before everyone else's hands go up.",
        "Every hour funds something.",
        "I learned that in a call centre many years ago.",
        "I've never looked at an hour of work the same way since.",
      ],
    },
  ],
};

   const THIRD_ARTICLE = {
  id: "one-hundred-dollars-one-lifetime-lesson",
  title: "One Hundred Dollars. One Lifetime Lesson.",
  summary: "A $100 loan that was never repaid taught me a lesson worth far more than the money itself. When you lend money to someone you care about, give only what you can afford never to receive again.",
  image: "/article-one-hundred-dollars.png",
  readTime: "4 min read",
  category: "Payday philosophy",
  kicker: "MONEY · BOUNDARIES · PEACE",
  alt: "Two people at a kitchen table signing a handwritten promissory note beside a one-hundred-dollar bill",
  caption: "The money disappeared, but the lesson stayed with me.",
  quote: {
    strong: "Treat a personal loan like a gift.",
    text: "Only give what you can afford never to receive again.",
  },
  sections: [
    {
      heading: "A promise on paper",
      paragraphs: [
        "I never expected $100 to teach me one of the most valuable financial lessons of my life.",
        "It wasn't an investment that went wrong.",
        "It wasn't an expensive purchase I regretted.",
        "It was a loan.",
        "Someone I knew asked if they could borrow $100.",
        "They promised they would pay me back.",
        "To make the arrangement feel official, they suggested writing a promissory note.",
        "We both signed it.",
        "I remember thinking the promissory note changed everything.",
        "Surely someone willing to put a promise in writing intended to keep it.",
      ],
    },
    {
      heading: "The money was gone",
      paragraphs: [
        "Weeks passed.",
        "Then months.",
        "Whenever I asked about the money, there was another excuse.",
        "Eventually, the excuses stopped.",
        "When I brought up the promissory note, the answer surprised me.",
        "\"It isn't legally enforceable anyway.\"",
        "That was the end of the conversation.",
        "The money was gone.",
        "Later, I found out it had been used to go to a party.",
        "I wasn't angry because of the money.",
        "I was angry because someone had asked for help, made a promise, and then decided that promise no longer mattered.",
      ],
    },
    {
      heading: "The rule I never forgot",
      paragraphs: [
        "Years later, I realized the experience had given me a rule I would never forget.",
        "When you lend money to a friend or family member, there is always a chance you will not get it back.",
        "A promise does not remove that risk.",
        "Neither does a piece of paper.",
        "Circumstances change.",
        "Priorities change.",
        "Sometimes people simply choose not to repay what they owe.",
        "That is why I now treat a personal loan like a gift from the moment I hand over the money.",
        "If it comes back, I am grateful.",
        "If it does not, I have already accepted the loss.",
        "That does not mean I lend money freely.",
        "It means I never lend money I still need for my own future.",
      ],
    },
    {
      heading: "What could that $100 have become?",
      paragraphs: [
        "For a long time, I focused on what the other person had done with the money.",
        "Eventually, I started asking a more useful question.",
        "\"What could that $100 have done for me?\"",
        "It could have paid for something I genuinely valued.",
        "It could have covered an unexpected bill.",
        "It could have gone into savings.",
        "It could have started growing inside an investment account.",
        "It could have become part of my future instead of someone else's night out.",
        "One hundred dollars may not feel significant.",
        "But small amounts rarely reveal their value immediately.",
        "Their power comes from repetition.",
        "One hundred dollars saved today.",
        "Another hundred next month.",
        "Another after that.",
        "Over time, ordinary amounts can become something much larger.",
      ],
    },
    {
      heading: "A lesson worth more than the money",
      paragraphs: [
        "For years, I thought I had lost $100.",
        "In reality, I had paid $100 for a lesson that has saved me far more since.",
        "Now, when someone asks to borrow money, I do not begin by asking whether I trust them to repay it.",
        "I ask whether losing the money would damage my own plans.",
        "If the answer is yes, I say no.",
        "If the answer is no, I may lend it or give it freely, knowing I may never receive it again.",
        "That question has protected my finances, my relationships, and my peace.",
        "A promissory note could not guarantee that I would be repaid.",
        "A clear boundary could guarantee that I would not give away money I needed for my own future.",
        "Every payday asks a question.",
        "\"Will this decision strengthen my future or weaken it?\"",
        "That is the question the $100 taught me to ask.",
        "Every payday is a decision.",
        "Choose yours.",
      ],
    },
  ],
};
  
 const FOURTH_ARTICLE = {
  id: "when-extra-money-isnt-really-extra",
  title: "When Extra Money Isn't Really Extra",
  summary:
    "After receiving a severance payment, I thought I had extra money. Years later, I realized unexpected money is one of the biggest opportunities you'll ever have to build your future.",
  image: "/article-extra-money.png",
  readTime: "4 min read",
  category: "Payday philosophy",
  kicker: "WINDFALLS · CHOICES · BALANCE",
  alt: "Freshly installed hardwood floors with a steam mop, renovation supplies, and rolled pale pink carpet",
  caption:
    "A beautiful renovation and a lasting lesson about giving unexpected money more than one purpose.",
  quote: {
    strong: "How much of this belongs to my future?",
    text: "Your future deserves a seat at the table before your spending does.",
  },
  sections: [
    {
      heading: "It didn't feel like a paycheck",
      paragraphs: [
        "Years ago, I was laid off.",
        "Like most people, I worried about what would happen next.",
        "Fortunately, I found another job much sooner than I expected.",
        "Then my severance payment arrived.",
        "It was the first large deposit I'd ever received that didn't feel like a paycheck.",
        "It simply appeared in my account.",
        "That made it feel different.",
        "It didn't feel like income.",
        "It felt like extra money.",
        "Looking back, that's where I made my first mistake.",
      ],
    },
    {
      heading: "The Mocha Oak floors",
      paragraphs: [
        "At the time, our home still had pale pink carpet and perfectly good linoleum throughout much of the main floor.",
        "Nothing was broken.",
        "Nothing needed replacing.",
        "We simply wanted something nicer.",
        "So we renovated.",
        "The carpet came out.",
        "The linoleum disappeared.",
        "Beautiful Mocha Oak hardwood floors went in.",
        "I even bought a steam mop because I wanted to keep them looking perfect.",
        "I remember standing in the living room after everything was finished.",
        "The house felt completely different.",
        "I still smile when I walk across those floors today.",
        "I don't regret renovating.",
        "I regret believing every dollar of that severance belonged to today.",
      ],
    },
    {
      heading: "The question I never asked",
      paragraphs: [
        "At no point did I stop and ask myself a simple question.",
        "How much of this belongs to my future?",
        "It seems obvious now.",
        "It never occurred to me then.",
        "If I had invested even part of that money, it would have had years to grow.",
        "Instead, I treated the entire payment like spending money simply because it had arrived all at once.",
        "That was the real mistake.",
        "Not the floors.",
        "The way I thought about the money.",
      ],
    },
    {
      heading: "Windfalls deserve a plan",
      paragraphs: [
        "Unexpected money doesn't arrive very often.",
        "A bonus.",
        "A tax refund.",
        "An inheritance.",
        "A severance payment.",
        "Most of us make plans for every regular paycheck.",
        "Ironically, we often give far less thought to the largest deposits we'll ever receive.",
        "Today, I handle those moments differently.",
        "Before I spend a dollar, I ask one question.",
        "How much of this belongs to my future?",
        "Sometimes the answer is a little.",
        "Sometimes it's a lot.",
        "The important thing is that my future gets a seat at the table before my spending does.",
      ],
    },
    {
      heading: "Let your future celebrate too",
      paragraphs: [
        "There is nothing wrong with celebrating unexpected money.",
        "Take the trip.",
        "Improve your home.",
        "Buy something you've wanted for years.",
        "Just don't let today be the only one that benefits.",
        "Your future should celebrate too.",
        "The hardwood floors still make me happy.",
        "Sometimes I wonder how different my finances would look today if I had invested part of that severance instead of spending all of it.",
        "That is the lesson the severance payment taught me.",
        "Unexpected money isn't extra.",
        "It's one of the few times in life you get to decide whether today or your future gets the bigger share.",
        "Every payday is a decision.",
        "Choose yours.",
     
 
       
          ],
        },
      ],
    };

const FIFTH_ARTICLE = {
  id: "rich-enough",
  title: "Rich Enough",
  summary:
    "One sentence during a performance review changed the way I think about wealth forever. Real wealth isn't owning everything. It's reaching the point where your life becomes a choice.",
  image: "/article-rich-enough.png",
  readTime: "4 min read",
  category: "Payday philosophy",
  kicker: "FINANCIAL FREEDOM · ENOUGH · CHOICE",
  alt: "Person sitting in a cave looking out at a mountain lake at sunset",
  caption:
    "Financial freedom isn't about having everything. It's about having enough choices.",
  quote: {
    strong: "Having enough means having choices.",
    text: "Financial freedom begins the day work becomes a choice instead of a necessity.",
  },
  sections: [
    {
      heading: "The sentence I wasn't supposed to say",
      paragraphs: [
        "It was just another performance review.",
        "We were talking about goals, career plans, and where I saw myself in the future.",
        "Then my manager asked a simple question.",
        "\"Where do you see yourself a few years from now?\"",
        "Without thinking, I answered.",
        "\"I could retire if I wanted to.\"",
        "The room became very quiet.",
        "I regretted saying it almost immediately.",
        "It sounded like I was bragging.",
        "I wasn't.",
        "After years of saving, investing, and living below my means, work had quietly become a choice instead of a necessity.",
        "That was all I meant.",
      ],
    },
    {
      heading: "The day success changed meaning",
      paragraphs: [
        "For years I measured progress by numbers.",
        "How much I had saved.",
        "How much I had invested.",
        "How much farther I had to go.",
        "Then, somewhere along the way, I realized I had been measuring the wrong thing.",
        "The real milestone wasn't reaching a certain balance.",
        "It was reaching a point where I had options.",
        "For years I thought becoming wealthy meant having more money.",
        "One day I realized it meant needing less.",
      ],
    },
    {
      heading: "What enough feels like",
      paragraphs: [
        "People often picture wealth as something everyone else can see.",
        "A larger house.",
        "A luxury car.",
        "An expensive vacation.",
        "That isn't what it looked like for me.",
        "It looked like sleeping well.",
        "It looked like knowing an unexpected expense wouldn't become a crisis.",
        "It looked like realizing that one difficult day at work wouldn't decide the rest of my life.",
        "One day I noticed I had stopped worrying about money.",
        "Not because I had become rich.",
        "Because I had finally become secure.",
        "That feeling was worth more than anything I could have bought.",
      ],
    },
    {
      heading: "Built one payday at a time",
      paragraphs: [
        "None of this happened because of one extraordinary decision.",
        "There wasn't a winning lottery ticket.",
        "There wasn't one perfect investment.",
        "There wasn't one massive promotion.",
        "It happened one payday at a time.",
        "Saving a little.",
        "Investing a little.",
        "Waiting instead of buying.",
        "Most of those decisions felt ordinary.",
        "Looking back, they were anything but.",
        "They quietly built a life with more choices than I ever imagined.",
      ],
    },
    {
      heading: "Rich enough",
      paragraphs: [
        "When people hear the word rich, they often picture things.",
        "I picture choices.",
        "Being able to leave a job that no longer fits.",
        "Helping family without putting my own future at risk.",
        "Taking time away from work when life asks you to.",
        "Sleeping peacefully because money isn't keeping you awake.",
        "That became my definition of wealth.",
        "Not having everything.",
        "Having enough.",
        "I still work.",
        "I still enjoy solving problems.",
        "I still enjoy learning.",
        "I still enjoy building things.",
        "The difference is that I know I don't have to.",
        "Looking back, I don't remember the day my investments reached a certain number.",
        "I remember the day I realized I was going to be okay.",
        "That turned out to be the richest feeling of all.",
        "You don't have to become the richest person in the room.",
        "You only have to build a life where your choices belong to you.",
        "Every payday funds a future.",
        "Choose yours.",
 
      ],
    },
  ],
};

  const SIXTH_ARTICLE = {
  id: "youre-not-too-late",
  title: "You're Not Too Late",
  summary:
    "Saving my first $1,000 didn't make me wealthy. It changed the way I saw myself and proved that my future didn't have to look like my past.",
  image: "/article-youre-not-too-late.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · STARTING · MOMENTUM",
  alt: "Savings jar with bills and coins beside a notebook and pen",
  caption:
    "The first milestone matters because it proves that progress belongs to you, too.",
  quote: {
    strong: "Your future doesn't need a perfect beginning.",
    text: "It only needs a beginning.",
  },
  sections: [
    {
      heading: "My first four digits",
      paragraphs: [
        "I still remember saving my first $1,000.",
        "It didn't happen overnight.",
        "At the time, I was working in a call centre. The pay wasn't remarkable, and there certainly wasn't extra money sitting around waiting to be saved.",
        "So I made a decision.",
        "Every payday, before I spent anything else, I would save a little.",
        "Some paydays that was easy.",
        "Other times it wasn't.",
        "There were things I wanted.",
        "But I wanted to see four digits in my account even more.",
        "Progress felt slow.",
        "Some weeks the balance barely moved.",
        "Then one payday, I logged into my bank account.",
        "Four digits.",
        "One thousand dollars.",
        "I just sat there staring at the screen.",
        "Not because $1,000 would change my life.",
        "Because, for the first time, I had kept a promise to myself.",
      ],
    },
    {
      heading: "The real milestone",
      paragraphs: [
        "That first thousand didn't change my finances.",
        "It changed the way I saw myself.",
        "Until then, saving money had always felt like something disciplined people did.",
        "Now it was simply something I did.",
        "The number mattered because it proved I could begin.",
        "The second thousand no longer felt impossible.",
        "Neither did investing.",
        "That first milestone gave me more than money.",
        "It gave me evidence that I could build something different.",
      ],
    },
    {
      heading: "The next payday is still yours",
      paragraphs: [
        "Sometimes I wish I had started earlier.",
        "Most people do.",
        "Starting earlier would have helped.",
        "But regretting the years behind me does nothing for the payday ahead.",
        "Yesterday doesn't accept deposits.",
        "The only payday I can still influence is the next one.",
        "The same is true for you.",
        "You may not be starting at the ideal time.",
        "You may not be starting with much.",
        "Starting now still matters.",
      ],
    },
    {
      heading: "Build the proof first",
      paragraphs: [
        "Before my money could grow, I needed to prove that I could leave some of it alone.",
        "That was the habit behind the first thousand.",
        "It wasn't dramatic.",
        "It was one small transfer repeated often enough to become part of my life.",
        "You don't need to wait until you earn more.",
        "You don't need a perfect month.",
        "You need a first deposit and another payday.",
        "The amount can be small.",
        "What matters is beginning to become someone who saves.",
      ],
    },
    {
      heading: "Your first milestone",
      paragraphs: [
        "Maybe your first goal is $100.",
        "Maybe it's $500.",
        "Maybe it's $1,000, like mine.",
        "The number matters less than the promise behind it.",
        "My first thousand did not make me wealthy.",
        "It showed me that I could begin.",
        "Years later, I don't remember every dollar I saved.",
        "I remember looking at those four digits and realizing my future did not have to look like my past.",
        "Starting earlier would have helped.",
        "Starting now still matters.",
        "Your next payday is still yours.",
        "Choose yours.",
        ],
        },
      ],
    };
   const SEVENTH_ARTICLE = {
  id: "love-is-wonderful-it-just-isnt-a-financial-plan",
  title: "Love Is Wonderful. It Just Isn't a Financial Plan.",
  summary:
    "A kind coworker's unwavering belief that someone would always take care of her stayed with me for years. It changed the way I think about love, hope, and preparing for the future.",
  image: "/article-love-isnt-a-financial-plan.png",
  readTime: "5 min read",
  category: "Financial independence",
  kicker: "LOVE · INDEPENDENCE · SECURITY",
  alt: "A couple walking together while one quietly reviews long-term financial plans",
  caption: "Love and preparation can exist side by side.",
  quote: {
    strong: "Love and preparation aren't opposites.",
    text: "You can trust someone completely and still prepare for tomorrow.",
  },
  sections: [
    {
      heading: "The conversation",
      paragraphs: [
        "She was one of the kindest people I've ever worked with.",
        "She loved talking about her kids and grandkids. If she asked how you were doing, she genuinely wanted to know the answer. And if you complained a little too much, she'd probably show up the next day with a copy of The Secret or another positive-thinking book because she honestly believed it might help.",
        "She looked for the good in people.",
        "One afternoon we were talking about retirement savings at work.",
        "I asked if she was contributing.",
        "She smiled as though the answer was obvious.",
        "\"I won't need it. There will always be a man to take care of me.\"",
        "For a second, I just sat there with my mouth hanging open.",
        "I honestly didn't know what to say.",
        "I'd never heard anyone talk about their future that way.",
        "She wasn't joking.",
        "She believed it completely.",
        "Looking back, what stayed with me wasn't the sentence.",
        "It was the certainty.",
      ],
    },
    {
      heading: "Years later",
      paragraphs: [
        "I've replayed that conversation in my mind more times than I can count.",
        "Not because I thought she was foolish.",
        "Because I understood where it came from.",
        "She believed in people.",
        "She believed in love.",
        "She believed things would work out.",
        "There's something beautiful about that.",
        "I hope life unfolded exactly the way she imagined.",
      ],
    },
    {
      heading: "What life taught me",
      paragraphs: [
        "Over the years I've watched coworkers retire.",
        "I've watched others work years longer than they expected.",
        "I've watched marriages end.",
        "I've watched people lose spouses.",
        "I've watched illness change futures that once seemed certain.",
        "None of those people thought those chapters were coming.",
        "Life simply turned the page.",
        "Every time something like that happened, I found myself thinking about that conversation again.",
        "Not because I wanted to prove her wrong.",
        "Because none of us gets to choose which chapter life turns to next.",
      ],
    },
    {
      heading: "They're not opposites",
      paragraphs: [
        "This isn't about whether one parent stays home to raise children.",
        "It isn't about which spouse earns more.",
        "It isn't even about how couples choose to build a life together.",
        "I've known wonderful families who have made all of those choices.",
        "It's about recognizing that love and financial independence can exist side by side.",
        "Preparing for tomorrow isn't a sign that you expect the worst.",
        "It's simply acknowledging that life doesn't always ask permission before it changes.",
        "The strongest relationships aren't built on dependence.",
        "They're built on two people choosing each other, even though each could stand on their own.",
      ],
    },
    {
      heading: "If we ever had that conversation again",
      paragraphs: [
        "I don't know what happened to that coworker.",
        "Every once in a while I'd see her face pop up on LinkedIn.",
        "She should be nearing retirement now.",
        "I hope life unfolded the way she imagined.",
        "I hope she was surrounded by the people she loved.",
        "I hope there really was someone beside her every step of the way.",
        "I still think about that conversation from time to time.",
        "Not because I wanted to prove her wrong.",
        "Because life has a way of teaching all of us the same lesson eventually.",
        "If we ever had that conversation again, I don't think I'd try to change her mind.",
        "I'd probably smile.",
        "Then I'd tell her something life has taught me since that afternoon.",
        "Love is one of life's greatest gifts.",
        "I hope everyone finds it.",
        "I also hope everyone builds a future they can stand on themselves.",
        "Because love should be something you choose every day.",
        "Not something your financial future depends on.",
        "Every payday funds a future.",
        "Choose yours.",
   
      ]
        },
      ],
    };

    const EIGHTH_ARTICLE = {
  id: "the-biggest-lie-about-retirement",
  title: "The Biggest Lie About Retirement",
  summary:
    "Retirement does not begin at a certain age. It begins when working becomes a choice. A quiet coworker taught me that I had been thinking about retirement all wrong.",
  image: "/article-biggest-lie-retirement.png",
  readTime: "4 min read",
  category: "Retirement",
  kicker: "RETIREMENT · FREEDOM · CHOICE",
  alt: "An older gentleman quietly organizing paper files in an office",
  caption:
    "I assumed I knew why he was still working. The truth was, I knew nothing about his life.",
  quote: {
    strong: "Retirement is not an age.",
    text: "It is the freedom to choose what comes next.",
  },
  sections: [
    {
      heading: "The gentleman I never forgot",
      paragraphs: [
        "Early in my career, there was a gentleman I noticed almost every day.",
        "His hair was white.",
        "His suit hung a little too loosely, as though it had been tailored for a younger version of himself years earlier.",
        "He was quiet, polite, and always on time.",
        "The kind of person you almost forgot was there.",
        "Sometimes I'd see him filing paper documents long after most of us had stopped using filing cabinets altogether.",
        "For some reason, I often wondered why he was still working.",
        "I assumed he had to be there.",
        "It never occurred to me that I might be wrong.",
        "Then one day, he was simply gone.",
        "I don't remember a retirement announcement.",
        "I don't remember a farewell.",
        "Maybe there was one.",
        "Maybe I missed it.",
        "All I know is that one day I stopped seeing him.",
        "I've wondered about him ever since.",
      ],
    },
    {
      heading: "The story I could never finish",
      paragraphs: [
        "Did he finally retire?",
        "Did he find another job?",
        "Was he relieved to leave?",
        "Or did he wish he could have stayed?",
        "I'll never know.",
        "At the time, I'd looked at his white hair and loose suit and decided I understood his situation.",
        "I didn't.",
        "I knew nothing about his life outside the office.",
        "Nothing about the future he'd prepared for.",
        "Nothing about whether he was working because he had to or because he genuinely wanted to.",
        "That question stayed with me.",
      ],
    },
    {
      heading: "The biggest lie",
      paragraphs: [
        "For most of my life, I thought retirement was an age.",
        "Sixty-five.",
        "That was the number everyone talked about.",
        "Some people said sixty.",
        "Others said seventy.",
        "It sounded as though retirement happened automatically once enough birthdays had passed.",
        "But birthdays don't create freedom.",
        "Choice does.",
        "Two people can celebrate their sixty-fifth birthday on the same day.",
        "One can walk away from work without worrying about money.",
        "The other can't afford to miss a paycheque.",
        "Their age is the same.",
        "Their freedom is not.",
      ],
    },
    {
      heading: "The problem isn't working",
      paragraphs: [
        "There is nothing wrong with working later in life.",
        "Some people enjoy the routine.",
        "Some like feeling useful.",
        "Some would miss the conversations, the friendships, or simply having somewhere to be each morning.",
        "I hope I still have work that interests me when I'm older.",
        "But there is a world of difference between saying, \"I'd like to keep working,\" and saying, \"I have to keep working.\"",
        "The problem isn't work.",
        "The problem is having no choice.",
      ],
    },
    {
      heading: "Choice is built quietly",
      paragraphs: [
        "Nobody wakes up one morning with the freedom to retire.",
        "That freedom is built across hundreds of ordinary paydays.",
        "Sometimes it's putting a little into savings.",
        "Sometimes it's contributing to a pension.",
        "Sometimes it's investing instead of spending.",
        "Sometimes it's paying off debt so it doesn't follow you into the next chapter of your life.",
        "None of those decisions feels life changing on its own.",
        "Most won't make any difference this month.",
        "But year after year, payday after payday, they begin to buy something far more valuable than money.",
        "They buy options.",
        "The option to reduce your hours.",
        "The option to leave work that's making you miserable.",
        "The option to keep working because you enjoy it.",
        "The option to stop.",
      ],
    },
    {
      heading: "I hope I was wrong",
      paragraphs: [
        "I still think about that gentleman.",
        "I hope I was completely wrong.",
        "I hope he wasn't working because he had to.",
        "I hope he was there because he wanted to be.",
        "I hope that when he quietly disappeared from our office, he stepped into a life he'd been preparing for all along.",
        "I'll never know.",
        "Maybe that's why I still remember him.",
        "I still don't know whether he stayed because he wanted to or because he needed to.",
        "I hope he had a choice.",
        "That's the future every payday quietly builds.",
        "Not a future decided by your employer.",
        "Not a future decided by your age.",
        "A future where work is a choice, not a necessity.",
        "Every payday funds a future.",
        "Choose yours.",
    
     ],
        },
      ],
    };

   const NINTH_ARTICLE = {
  id: "everyone-needs-a-float",
  title: "Everyone Needs a Float",
  summary:
    "A float isn't about earning the highest return. It's about creating enough breathing room that life's unexpected expenses don't become financial emergencies. Sometimes the best investment is peace of mind.",
  image: "/article-everyone-needs-a-float.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · RESILIENCE · PEACE OF MIND",
  alt: "Vintage cash register drawer with bills and coins labeled float",
  caption:
    "A quiet cash cushion can keep an ordinary problem from becoming a financial crisis.",
  quote: {
    strong: "A float isn't money waiting to be spent.",
    text: "It's money waiting to protect you.",
  },
  sections: [
    {
      heading: "The cash drawer lesson",
      paragraphs: [
        "One of my first jobs was working as a cashier.",
        "Every morning before the store opened, we'd head downstairs to collect the cash for our register.",
        "Inside every cash drawer was something called a float.",
        "It wasn't there to spend.",
        "It wasn't profit.",
        "It had one job:",
        "To make sure we could make change throughout the day.",
        "As customers came and went, money constantly moved in and out of the drawer. At the end of every shift, we counted everything. The sales had to match. The cash had to match. And the float had to still be there.",
        "If the float was short, something had gone wrong.",
        "It wasn't meant to disappear.",
        "It was meant to be ready for tomorrow morning.",
        "Years later, I realized our personal finances aren't much different.",
      ],
    },
    {
      heading: "Your life needs a float",
      paragraphs: [
        "Every payday, money arrives.",
        "Bills get paid.",
        "Groceries get bought.",
        "The mortgage comes out.",
        "The phone bill is due.",
        "Life keeps moving.",
        "But life has something stores don't:",
        "Unexpected expenses.",
        "The furnace stops working.",
        "Your car needs a repair.",
        "The dog gets sick.",
        "You lose your job.",
        "The washing machine quits.",
        "Emergencies never check your calendar.",
        "They simply show up.",
        "That's why every household needs a float.",
        "We usually call it an emergency fund.",
        "I still like the word float because that's exactly what it is.",
      ],
    },
    {
      heading: "The money waiting to protect you",
      paragraphs: [
        "One of the biggest mistakes people make is looking at an emergency fund and thinking,",
        "\"I have all that money sitting there doing nothing.\"",
        "That's exactly the wrong way to see it.",
        "A float isn't money waiting to be spent.",
        "It's money waiting to protect you.",
        "The cash drawer at work wasn't considered wasted because it wasn't used every minute of the day. Its value came from being there when it was needed.",
        "Your emergency fund works the same way.",
        "Most days, nothing happens, and that's the goal.",
        "But when life surprises you, your float quietly steps in and does the job it was created to do.",
      ],
    },
    {
      heading: "Who do you turn to?",
      paragraphs: [
        "Imagine your transmission fails tomorrow.",
        "Or your furnace quits in the middle of winter.",
        "If you have a float, the problem is expensive.",
        "If you don't, the problem becomes something much bigger.",
        "Now you're trying to borrow money.",
        "Maybe from family.",
        "Maybe from friends.",
        "Maybe from the bank.",
        "Maybe from a credit card.",
        "The emergency hasn't changed.",
        "Only the way you have to deal with it has.",
        "A float gives you options.",
        "It gives you breathing room.",
        "Most importantly, it lets you solve one problem without creating another.",
      ],
    },
    {
      heading: "Build it one payday at a time",
      paragraphs: [
        "People often think they need thousands of dollars before starting an emergency fund.",
        "You don't.",
        "You simply need to begin.",
        "Maybe it's twenty-five dollars from this payday.",
        "Maybe it's fifty.",
        "Maybe it's one hundred.",
        "The amount matters far less than the habit.",
        "Every payday adds another layer of protection.",
        "Over time, that protection becomes confidence.",
        "Eventually, something interesting happens.",
        "You stop worrying quite as much.",
        "Not because emergencies stop happening.",
        "Because you know you're ready when they do.",
      ],
    },
    {
      heading: "The best money you never spend",
      paragraphs: [
        "The best emergency fund is the one you rarely touch.",
        "Not because it isn't useful.",
        "Because its greatest value comes from quietly waiting in the background.",
        "Just like the float in a cash drawer.",
        "Always there.",
        "Always ready.",
        "Hopefully, never needed.",
        "And if one day you do need it, you'll be grateful you built it one payday at a time.",
      ],
    },
    {
      heading: "Money with a purpose",
      paragraphs: [
        "At 1040 Paydays, we believe every payday has a purpose.",
        "Some dollars pay today's bills.",
        "Some dollars build tomorrow's retirement.",
        "And some dollars simply wait, not because they're forgotten, but because they're protecting everything else you've worked so hard to build.",
        "Most of us only receive about 1,040 paydays during our working lives.",
        "Use a few of them to build your float.",
        "One day, you'll be thankful it's there.",
        "Because every payday funds a future.",
        "Choose yours.",
  ],
        },
      ],
    };

   const TENTH_ARTICLE = {
  id: "the-number-that-really-matters",
  title: "The Number That Really Matters",
  summary:
    "A strong salary may look impressive, but the number that shapes your future is what actually reaches your account and what you choose to do with every payday.",
  image: "/article-number-that-really-matters.png",
  readTime: "5 min read",
  category: "Financial Basics",
  kicker: "TAKE-HOME PAY · CHOICES · CONSISTENCY",
  alt: "Man reviewing a pay statement and writing notes at a kitchen table",
  caption:
    "Your gross salary is a promise. Your take-home pay is the money you get to put to work.",
  quote: {
    strong: "There are really two salaries.",
    text: "The one you earn and the one you actually get to use.",
  },

  sections: [
    {
      heading: "Waiting for the number",
      paragraphs: [
        "Every year around bonus season, you could feel the curiosity building at work.",
        "People were not talking about what they planned to buy.",
        "They were wondering whether we were going to receive a bonus at all.",
        "Had anyone heard anything?",
        "When would it be announced?",
        "Then the announcement finally arrived.",
        "The bonus would be paid as a percentage of our base salaries.",
        "People were happy.",
        "After weeks of wondering whether it would happen, we finally had a number.",
        "Now I just had to wait for the money to arrive.",
        "On payday, I checked my bank account.",
        "Then I checked it again.",
        "Eventually, the deposit appeared.",
        "My first thought was simple.",
        "\"That does not look like as much as I expected.\"",
        "So I opened my pay statement.",
        "Nothing was wrong.",
        "Taxes had been deducted.",
        "Money had gone toward my pension.",
        "Other payroll deductions had been taken.",
        "Everything was exactly as it should have been.",
        "Still, I could not stop looking at the difference between the bonus I had been thinking about and the amount that had actually reached my account.",
        "For weeks, I had been thinking about the bonus.",
        "That day, I realized I should have been thinking about the deposit.",
        "It was such a simple realization, but I had never thought about money that way before.",
        "There are really two salaries.",
        "The one you earn.",
        "And the one you actually get to use.",
        "Only one of them builds your life."
      ]
    },
    {
      heading: "The salary nobody compares",
      paragraphs: [
        "Whenever someone starts a new job, people usually ask the same question.",
        "\"How much does it pay?\"",
        "It is a fair question.",
        "Your annual salary is easy to compare.",
        "It is printed on the job posting.",
        "It is written in your employment contract.",
        "It is the number people proudly share.",
        "But it is not the number your mortgage cares about.",
        "It is not the number that buys your groceries.",
        "It is not the number that builds your emergency fund or pays for your retirement.",
        "Those things are built with the money that actually reaches your account.",
        "We negotiate our gross salary.",
        "We live on our take-home pay.",
        "The distance between those two numbers is where our financial decisions begin."
      ]
    },
    {
      heading: "Two people can earn very different futures",
      paragraphs: [
        "Imagine two people.",
        "One earns $120,000 a year.",
        "The other earns $75,000.",
        "Who becomes wealthier?",
        "Most people immediately choose the person with the higher salary.",
        "Maybe they are right.",
        "But maybe they are not.",
        "What if the first person spends nearly everything that reaches their account?",
        "What if the second person consistently saves and invests part of every payday?",
        "Twenty years later, who has more choices?",
        "Who worries less?",
        "A higher salary creates more opportunity.",
        "What you do with your take-home pay determines what that opportunity becomes.",
        "Your future is not built by the number on your employment contract.",
        "It is built by the choices you make after payday."
      ]
    },
    {
      heading: "Every raise asks the same question",
      paragraphs: [
        "Getting a raise feels good.",
        "It should.",
        "You earned it.",
        "But every raise quietly asks the same question.",
        "\"What are you going to do with me?\"",
        "Will every dollar disappear into a more expensive lifestyle?",
        "Or will some of it build something your future self will appreciate?",
        "Raises rarely disappear through one dramatic purchase.",
        "They disappear a little at a time.",
        "A nicer vehicle.",
        "A slightly larger mortgage.",
        "More meals out.",
        "A better phone.",
        "Another subscription.",
        "None of those choices is automatically wrong.",
        "The problem is when every raise becomes another permanent expense.",
        "Then your income grows, but your freedom stays exactly the same.",
        "Keeping even part of every raise means every payday after that becomes a little more powerful than the one before."
      ]
    },
    {
      heading: "The number that really matters",
      paragraphs: [
        "Most people spend their careers trying to increase the salary they earn.",
        "There is nothing wrong with that.",
        "I hope you do.",
        "But do not spend so much time chasing a bigger salary that you ignore the one you are actually living on.",
        "Pay attention to what reaches your bank account.",
        "That is the money that pays your bills.",
        "Builds your savings.",
        "Reduces your debt.",
        "Creates your options.",
        "Buys peace of mind.",
        "One day, if you are intentional with it, it may even buy your freedom.",
        "At 1040 Paydays, we believe financial freedom is not built by the largest number printed on an employment contract.",
        "It is built one payday at a time through the choices you make with the money you actually receive.",
        "Most of us will experience only about 1,040 paydays during our working lives.",
        "We cannot control exactly how many we will receive.",
        "But we can choose what each one builds.",
        "The number that changes your life is not the one announced in a meeting, printed on your job offer, or calculated as a percentage of your salary.",
        "It is the one that quietly arrives in your bank account every payday."
      ]
    }
  ],

  faqs: [
    {
      question:
        "What is the difference between gross salary and take-home pay?",
      answer:
        "Gross salary is the amount you earn before taxes, pension contributions, benefits, and other payroll deductions. Take-home pay is the amount that actually reaches your bank account."
    },
    {
      question: "Are payroll deductions always a bad thing?",
      answer:
        "No. Payroll deductions may pay taxes, fund a pension, provide benefits, or cover other valuable programs. The important lesson is to build your spending and saving decisions around the amount you actually receive."
    },
    {
      question:
        "Why can someone with a lower salary build more wealth?",
      answer:
        "A person with a lower income may build more wealth if they consistently save and invest a greater portion of their take-home pay. Income creates opportunity, but repeated decisions determine the result."
    },
    {
      question: "What is a smart way to handle a raise?",
      answer:
        "Decide in advance how much of the raise you will save, invest, or use to reduce debt. This prevents the entire increase from quietly becoming part of your regular spending."
    },
    {
      question: "Which payday numbers should I track?",
      answer:
        "Track your take-home pay, savings contributions, investment contributions, debt payments, and the amount left after essential expenses. These numbers show what each payday is actually building."
 
        },
      ],
    };

    const TWELFTH_ARTICLE = {
  id: "the-month-i-accidentally-saved-money",
  title: "The Month I Accidentally Saved Money",
  summary:
    "I changed a few habits to feel healthier and discovered that my bank balance improved too. Sometimes the best financial changes begin somewhere else entirely.",
  image: "/article-accidentally-saved-money.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "HEALTH · HABITS · SAVING",
  alt: "Woman writing in a notebook at a kitchen table with packed food and coffee nearby",
  caption:
    "A packed lunch, coffee from home, and a few ordinary choices quietly changed two things at once.",
  quote: {
    strong: "I never set out to save money.",
    text: "I set out to feel better. The money simply followed.",
  },

  sections: [
    {
      heading: "A healthier goal",
      paragraphs: [
        "A few years ago, I decided it was time to lose a few pounds.",
        "Not because anyone told me to.",
        "Not because it was January.",
        "I simply wanted to feel healthier.",
        "So I made a few small changes.",
        "I packed my lunch instead of buying one at work.",
        "I filled a travel mug before leaving the house instead of stopping for coffee.",
        "The afternoon chocolate bar that had quietly become part of my routine disappeared.",
        "After long days, I cooked dinner instead of ordering takeout.",
        "None of those choices were about money.",
        "They were simply healthier habits.",
        "About a month later, I logged into my bank account.",
        "There was more money sitting there than I expected.",
        "For a moment, I wondered if I'd forgotten to pay a bill.",
        "I checked everything.",
        "Nothing was missing.",
        "There hadn't been a raise.",
        "There hadn't been a bonus.",
        "I'd simply spent less without noticing.",
        "That was the month I accidentally saved money.",
      ],
    },
    {
      heading: "The unexpected side effect",
      paragraphs: [
        "We often assume better finances begin with a budget or a spreadsheet.",
        "Sometimes they begin with a different routine.",
        "My lunch bag replaced the food court.",
        "Coffee from home replaced the drive-through.",
        "Cooking dinner became easier than deciding what to order.",
        "By the third week, those choices no longer felt like discipline.",
        "They just felt normal.",
        "The savings happened quietly in the background.",
      ],
    },
    {
      heading: "Good habits don't stay put",
      paragraphs: [
        "One good habit has a way of pulling another behind it.",
        "Planning lunches meant planning groceries.",
        "Planning groceries meant wasting less food.",
        "Cooking more often meant fewer impulse purchases on the way home.",
        "Without planning it, my health and my finances started improving together.",
        "Looking back, that's the part that surprised me most.",
      ],
    },
    {
      heading: "The results were never about one lunch",
      paragraphs: [
        "No single lunch changed anything.",
        "Neither did one coffee made at home.",
        "Or one dinner cooked instead of ordered.",
        "The change came from repeating those ordinary choices until they became routine.",
        "A month later, I felt better.",
        "My bank account did too.",
      ],
    },
    {
      heading: "A better question",
      paragraphs: [
        "When we want to save money, the question is usually,",
        "\"How can I spend less?\"",
        "I've started asking something different.",
        "\"What habit would make everyday life a little better?\"",
        "Maybe it's meal planning.",
        "Maybe it's getting enough sleep.",
        "Maybe it's spending less time wandering through stores because you're bored.",
        "The habit doesn't have to begin with money.",
        "Sometimes the financial benefit arrives later.",
      ],
    },
    {
      heading: "The lesson I didn't expect",
      paragraphs: [
        "I never set out to save money.",
        "I set out to feel better.",
        "The money simply followed.",
        "That experience changed the way I think about personal finance.",
        "Sometimes the smartest financial decision isn't a financial decision at all.",
        "It's one small habit that quietly makes tomorrow a little better than today.",
        "After enough tomorrows, the difference becomes impossible to ignore.",
        "One ordinary payday at a time.",
      ],
    },
  ],
};

    const THIRTEENTH_ARTICLE = {
  id: "your-routine-was-spending-your-money",
  title: "Your Routine Was Spending Your Money",
  summary:
    "A prepaid vacation showed me that little spending can add up because my everyday routine had been quietly spending money before I noticed.",
  image: "/article-routine-spending-money.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · PERSPECTIVE · PAYDAYS",
  alt: "Man sitting alone in a cafe looking out the window with a coffee",
  caption:
    "Sometimes stepping outside your routine shows you what it has been quietly spending.",
  quote: {
    strong: "I hadn't become better with money.",
    text: "I had simply stepped outside the routine that had been spending it.",
  },
  sections: [
    {
      heading: "The surprise waiting at home",
      paragraphs: [
        "When I came home from a prepaid vacation, I expected my bank account to look exactly the way it always did.",
        "Instead, there was more money waiting for me than I expected.",
        "I hadn't earned a bonus.",
        "I hadn't tried to save.",
        "Yet somehow, I had more money.",
        "For two weeks, I had simply stopped living my normal routine.",
        "That was enough.",
        "At first, I thought the vacation had saved me money.",
        "Looking back, I don't think that's what happened.",
        "The vacation did something much more valuable.",
        "It showed me what my routine had been quietly spending.",
      ],
    },
    {
      heading: "What Tuesday looks like",
      paragraphs: [
        "Think about an ordinary workday.",
        "The alarm goes off.",
        "You grab a coffee.",
        "Maybe breakfast on the way.",
        "Lunch because it's easier than packing one.",
        "A quick stop at the grocery store after work.",
        "Takeout because it's been a long day.",
        "None of those purchases feel unusual.",
        "In fact, they barely feel like decisions.",
        "They're just what Tuesday looks like.",
      ],
    },
    {
      heading: "Outside the routine",
      paragraphs: [
        "Then you step outside that routine.",
        "Suddenly, many of the opportunities to spend disappear.",
        "The coffee shop isn't on your way.",
        "The grocery stop never happens.",
        "Neither does the automatic takeout.",
        "When I came home, my bank account showed me something I hadn't noticed before.",
        "I hadn't become better with money.",
        "I had simply stepped outside the routine that had been spending it.",
        "That realization has stayed with me far longer than the vacation itself.",
      ],
    },
    {
      heading: "Which part of my routine spent it?",
      paragraphs: [
        "That realization changed the question I ask every payday.",
        "I no longer ask,",
        "\"Where did all my money go?\"",
        "I ask,",
        "\"Which part of my routine spent it?\"",
        "The answers are surprisingly consistent.",
        "Convenience.",
        "Habit.",
        "Momentum.",
        "Not necessity.",
      ],
    },
    {
      heading: "Interrupt the routine",
      paragraphs: [
        "Every now and then, I interrupt my own routine on purpose.",
        "I take a different route home.",
        "I bring lunch instead of buying it.",
        "I skip the automatic stop for coffee.",
        "Not because coffee is bad.",
        "Not because spending money is bad.",
        "Because I want to know which choices are actually mine.",
        "Routine is useful.",
        "But it should not be making financial decisions for me.",
        "The vacation revealed something I had not noticed before.",
        "Many of my purchases were not driven by need.",
        "They were driven by repetition.",
        "Once I saw that, I could not unsee it.",
      ],
    },
    {
      heading: "Make sure the choice is yours",
      paragraphs: [
        "You do not need to book a vacation to discover the same thing.",
        "Interrupt your routine for a day.",
        "Pack your lunch.",
        "Take a different road home.",
        "Skip the purchase you always make without thinking.",
        "Then pay attention.",
        "You might discover that your routine has been spending more money than you ever realized.",
        "I used to think I spent my money.",
        "Now I think my routine spent much of it first.",
        "The day I recognized the difference, I became far more intentional with every payday.",
        "Most of us only receive about 1,040 paydays during our working lives.",
        "Make sure your routine is not spending them for you.",
        "Because every payday funds a future.",
        "Choose yours.",
      ],
    },
  ],
};

    const FOURTEENTH_ARTICLE = {
  id: "the-grocery-store-in-my-cupboard",
  title: "The Grocery Store in My Cupboard",
  summary:
    "A month of shopping from my own pantry changed the way I think about groceries, saving money, and every payday. Sometimes the richest grocery store is the one you've already paid for.",
  image: "/article-grocery-store-cupboard.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · ABUNDANCE · EVERYDAY MONEY",
  alt: "Man looking into a stocked kitchen cupboard filled with pantry staples",
  caption:
    "Sometimes the richest grocery store is the one you have already paid for.",
  quote: {
    strong: "Every item on those shelves came from an old payday.",
    text: "I wasn't looking at groceries anymore. I was looking at my own time and effort.",
  },
  sections: [
    {
      heading: "A small experiment",
      paragraphs: [
        "I like small experiments with money.",
        "Not because I'm trying to spend as little as possible.",
        "I enjoy questioning habits most of us never think about.",
        "One month I gave myself a simple challenge.",
        "I would only buy fresh milk, fruit, vegetables, and anything truly perishable.",
        "Everything else had to come from my own cupboard, fridge, or freezer.",
        "I thought it would make meal planning more interesting.",
        "I had no idea it would change the way I looked at groceries forever.",
      ],
    },
    {
      heading: "I started shopping in my own kitchen",
      paragraphs: [
        "The first few days were easy.",
        "Pasta.",
        "Rice.",
        "Frozen chicken.",
        "Soup.",
        "A loaf of bread in the freezer.",
        "A bag of vegetables I had forgotten about.",
        "Every meal came from something I'd already bought.",
        "Instead of asking,",
        "\"What should I buy tonight?\"",
        "I started asking,",
        "\"What have I already paid for?\"",
        "That one question changed everything.",
      ],
    },
    {
      heading: "Then I saw something I had never noticed before",
      paragraphs: [
        "One evening I opened the cupboard and just stood there.",
        "Rows of cans.",
        "Boxes of pasta.",
        "Rice.",
        "Coffee.",
        "Peanut butter.",
        "Nothing special.",
        "Then a different thought crossed my mind.",
        "Every item on those shelves came from an old payday.",
        "The soup came from a Tuesday I'd almost forgotten.",
        "The pasta came from another payday.",
        "The coffee came from one before that.",
        "Every shelf represented hours I had already worked.",
        "I wasn't looking at groceries anymore.",
        "I was looking at my own time and effort.",
      ],
    },
    {
      heading: "My past self had been helping me all along",
      paragraphs: [
        "Every time I put groceries away, I wasn't just stocking a cupboard.",
        "I was helping a future version of myself.",
        "Someone who would eventually come home tired after work.",
        "Someone who wouldn't feel like stopping at the grocery store.",
        "Someone who simply needed dinner.",
        "Without realizing it, I'd been taking care of that person for years.",
        "That thought stayed with me.",
      ],
    },
    {
      heading: "The richest grocery store I know",
      paragraphs: [
        "Today, before I write a grocery list, I open every cupboard.",
        "I check the freezer.",
        "I look in the fridge.",
        "Not because I'm trying to spend less.",
        "Because I want to respect money that's already been earned.",
        "It usually takes five minutes.",
        "Sometimes it saves twenty dollars.",
        "Sometimes it saves a hundred.",
        "The money is nice.",
        "The reminder is worth even more.",
      ],
    },
    {
      heading: "The lesson I wasn't expecting",
      paragraphs: [
        "We spend so much of life chasing the next paycheck, the next purchase, and the next thing we believe will make life easier.",
        "Sometimes we forget to notice everything our previous paydays have already provided.",
        "The next time you think you need groceries, open your cupboard first.",
        "Stand there for a moment.",
        "Every can.",
        "Every box.",
        "Every forgotten meal.",
        "They're reminders that a past version of you worked hard so today's version would have enough.",
        "Sometimes abundance doesn't arrive with your next payday.",
        "Sometimes it's already waiting on the shelf.",
      ],
    },
  ],
};
   const FIFTEENTH_ARTICLE = {
  id: "your-house-is-full-of-money-you-just-cant-see-it-yet",
  title: "Your House Is Full of Money. You Just Can't See It Yet.",
  summary:
    "A search for a flashlight became a reminder that forgotten gift cards, pantry food, clothes, and everyday possessions already hold value. Sometimes the easiest money to find is already under your own roof.",
  image: "/article-house-full-of-money.png",
  readTime: "5 min read",
  category: "Saving",
  kicker: "SAVING · HOME · HIDDEN VALUE",
  alt: "Household items arranged on a table with cash, gift cards, folded clothes, shoes, books, and a treasure hunt list",
  caption:
    "Sometimes the money you are looking for is already sitting under your own roof.",
  quote: {
    strong: "Most of us are living in a house full of money.",
    text: "It just doesn't look like money anymore.",
  },
  sections: [
    {
      heading: "The flashlight I never found",
      paragraphs: [
        "Last Saturday I wasn't trying to save money.",
        "I was looking for a flashlight.",
        "Instead, I found twenty dollars tucked inside an old wallet.",
        "That little surprise made me stop.",
        "How many other things had I forgotten?",
        "So instead of cleaning the house, I went on a treasure hunt.",
        "Not for antiques.",
        "Not for collectibles.",
        "For value.",
        "By the end of the afternoon, I realized something I'd never thought about before.",
        "Most of us are living in a house full of money.",
        "It just doesn't look like money anymore.",
      ],
    },
    {
      heading: "The first stop was a kitchen drawer",
      paragraphs: [
        "I opened the drawer where random things seem to collect over the years.",
        "Pens.",
        "Rubber bands.",
        "Old batteries.",
        "Receipts.",
        "And gift cards.",
        "Lots of gift cards.",
        "Some still had their full balance.",
        "Others only had a few dollars left.",
        "Individually they didn't seem important.",
        "Together they were enough to buy groceries, pay for coffee, and cover a birthday gift I was planning to buy anyway.",
        "That wasn't free money.",
        "It was money I'd forgotten I already had.",
      ],
    },
    {
      heading: "Then I walked into the pantry",
      paragraphs: [
        "The shelves were fuller than I expected.",
        "Pasta.",
        "Rice.",
        "Soup.",
        "Frozen vegetables.",
        "Frozen meat.",
        "Enough meals to last much longer than I would have guessed.",
        "How many times had I said,",
        "\"We need groceries,\"",
        "without really looking?",
        "Sometimes the cheapest grocery trip is the one you never take.",
      ],
    },
    {
      heading: "Dollars hanging on hangers",
      paragraphs: [
        "The closet told the same story.",
        "A jacket I'd worn twice.",
        "Shoes I'd forgotten about.",
        "A sweater that still had the tags attached.",
        "Those weren't just clothes.",
        "They were value waiting to be used.",
        "Some could be sold.",
        "Some donated.",
        "Some simply worn instead of buying something new.",
        "The money hadn't disappeared.",
        "It had changed form.",
      ],
    },
    {
      heading: "The candle that changed my mind",
      paragraphs: [
        "Then I found something almost everyone has.",
        "The good candle.",
        "The expensive one.",
        "The one saved for someday.",
        "We've all done it.",
        "The nice soap.",
        "The special dishes.",
        "The fancy blanket.",
        "We wait for the perfect moment.",
        "The truth is, life rarely sends invitations saying today is special enough.",
        "So I lit the candle.",
        "It smelled amazing.",
        "That's when another thought hit me.",
        "Sometimes wasting money doesn't mean spending it.",
        "Sometimes wasting money means never enjoying what you already bought.",
      ],
    },
    {
      heading: "Your house has been taking care of you",
      paragraphs: [
        "That afternoon didn't make me rich.",
        "I didn't uncover thousands of hidden dollars.",
        "What I found was something better.",
        "Gift cards I could finally use.",
        "Food that delayed another grocery trip.",
        "Clothes I could wear or sell.",
        "Things I'd forgotten I already owned.",
        "Every room reminded me that previous paydays were still working for me.",
        "I'd simply stopped noticing.",
      ],
    },
    {
      heading: "Take your own treasure hunt",
      paragraphs: [
        "This weekend, give yourself thirty minutes.",
        "Walk through your home one room at a time.",
        "Open the drawers.",
        "Look in the closets.",
        "Check the jacket pockets.",
        "Ask yourself one question.",
        "\"What value have I forgotten?\"",
        "You might find cash.",
        "You might find gift cards.",
        "You might find enough food to skip your next grocery trip.",
        "You might find things worth selling.",
        "Or you might simply rediscover something that brings you joy without spending another dollar.",
        "We spend so much time chasing the next paycheck that we forget to notice what our previous paydays have already provided.",
        "Sometimes the money you're looking for isn't waiting at work.",
        "Sometimes it's already waiting at home.",
      ],
    },
  ],
};
    const SIXTEENTH_ARTICLE = {
  id: "the-biggest-retirement-mistake-has-nothing-to-do-with-investing",
  title: "The Biggest Retirement Mistake Has Nothing to Do With Investing",
  summary:
    "Retirement doesn't begin when you stop working. It begins with your very first paycheque. Every payday quietly shapes the freedom your future self will one day have.",
  image: "/article-biggest-retirement-mistake.png",
  readTime: "5 min read",
  category: "Retirement",
  kicker: "RETIREMENT · PAYDAYS · HABITS",
  alt: "Retired man relaxing on a couch with a cup of coffee",
  caption:
    "Retirement is built long before the retirement party, one ordinary payday at a time.",
  quote: {
    strong: "The biggest retirement mistake isn't choosing the wrong investment.",
    text: "It's believing retirement starts when you stop working.",
  },
  sections: [
    {
      heading: "Your first paycheque",
      paragraphs: [
        "Nobody hands you a retirement application on your first day of work.",
        "They hand you a paycheque.",
        "Most of us celebrate that first one.",
        "Maybe we buy something we've wanted for a while.",
        "Maybe we take friends out for dinner.",
        "Retirement feels impossibly far away.",
        "It's something older people think about.",
        "Looking back, I think that's the biggest misunderstanding we have.",
        "Retirement doesn't begin when you leave your job.",
        "It begins the first time someone pays you.",
      ],
    },
    {
      heading: "One payday doesn't feel important",
      paragraphs: [
        "A single payday rarely feels life changing.",
        "The bills get paid.",
        "Groceries fill the fridge.",
        "The credit card balance shrinks.",
        "Maybe there's enough left for something you've been wanting.",
        "Then life moves on.",
        "That's what makes paydays so easy to underestimate.",
        "One payday won't decide your retirement.",
        "But over an entire career, ordinary paydays quietly become extraordinary results.",
      ],
    },
    {
      heading: "The mistake almost everyone makes",
      paragraphs: [
        "Most people think retirement begins at sixty-five.",
        "I don't.",
        "By then, most of the important decisions have already been made.",
        "Not in one dramatic moment.",
        "In hundreds of ordinary ones.",
        "The choice to save a little instead of spending everything.",
        "The decision to increase retirement contributions after a raise.",
        "The habit of thinking about your future self every payday.",
        "Retirement isn't created at the end of a career.",
        "It's built quietly throughout one.",
      ],
    },
    {
      heading: "The people who seem lucky",
      paragraphs: [
        "Whenever someone retires comfortably, people often assume they found the perfect investment.",
        "Maybe they did.",
        "But that's rarely the story they tell.",
        "More often they describe years of consistency.",
        "They kept saving.",
        "They kept investing.",
        "They kept showing up for their future even when it didn't feel urgent.",
        "None of it sounded exciting.",
        "That's because building wealth usually isn't.",
      ],
    },
    {
      heading: "The retirement party",
      paragraphs: [
        "One day there will be a retirement party.",
        "There might be cake.",
        "Someone will probably make a speech.",
        "People will congratulate you on a career well done.",
        "What they won't see are the hundreds of ordinary paydays that quietly built the freedom you're about to enjoy.",
        "Retirement isn't created during the celebration.",
        "It's created during all the ordinary Fridays that came before it.",
      ],
    },
    {
      heading: "What this payday is really buying",
      paragraphs: [
        "The next time you get paid, remember that your paycheque has more than one job.",
        "Part of it takes care of today's life.",
        "Another part has the chance to take care of tomorrow's.",
        "Every dollar you save is buying something your future self can't purchase later.",
        "Time.",
        "Choices.",
        "Freedom.",
        "The biggest retirement mistake isn't choosing the wrong investment.",
        "It's believing you have plenty of time before retirement begins.",
        "In reality, it already has.",
      ],
    },
  ],
};

    const SEVENTEENTH_ARTICLE = {
  id: "the-best-age-to-retire-isnt-an-age",
  title: "The Best Age to Retire Isn't an Age",
  summary:
    "Everyone wants to know the best age to retire. I used to think the answer was a number too. Then I realized retirement has far less to do with birthdays than the life your investments will eventually need to support.",
  image: "/article-best-age-to-retire.png",
  readTime: "5 min read",
  category: "Retirement",
  kicker: "RETIREMENT · LIFESTYLE · CHOICE",
  alt: "Older woman gardening outside a modest home",
  caption:
    "Retirement isn't defined by your birthday. It's defined by the life you've built.",
  quote: {
    strong: "Retirement doesn't begin with a birthday.",
    text: "It begins with the life you've been building every payday.",
  },
  sections: [
    {
      heading: "The question everyone asks",
      paragraphs: [
        "Whenever retirement comes up, someone eventually asks the same question.",
        "\"When's the best age to retire?\"",
        "Fifty-five.",
        "Sixty.",
        "Sixty-five.",
        "Everyone is looking for the magic number.",
        "For a long time, I thought I was too.",
        "Then one day I realized I had been asking the wrong question.",
      ],
    },
    {
      heading: "Imagine retiring tomorrow",
      paragraphs: [
        "Imagine someone walked up to you tomorrow morning and said,",
        "\"You never have to work another day in your life.\"",
        "At first, it sounds incredible.",
        "Then something occurs to you.",
        "The paycheques stop.",
        "Everything else keeps arriving.",
        "The mortgage.",
        "The property taxes.",
        "The insurance.",
        "The internet bill.",
        "The groceries.",
        "The phone bill.",
        "Your retirement doesn't erase your lifestyle.",
        "It has to pay for it.",
        "That changed the way I think about retirement forever.",
      ],
    },
    {
      heading: "Your investments don't retire",
      paragraphs: [
        "Most people think retirement is about building a big enough investment portfolio.",
        "It is.",
        "But that's only half the story.",
        "Your investments have one job.",
        "To pay for the life you've already created.",
        "If you've built an expensive life, they have expensive work to do.",
        "If you've built a simple, intentional life, they don't have to work nearly as hard.",
        "That's why two people with the same amount of savings can retire at completely different times.",
        "Not because they invested differently.",
        "Because they lived differently.",
      ],
    },
    {
      heading: "The years when life is changing",
      paragraphs: [
        "Most of us don't live the same life for forty years.",
        "We buy our first home.",
        "We raise children.",
        "We pay for daycare.",
        "Then sports.",
        "Then braces.",
        "Then college.",
        "Life keeps changing.",
        "So do our expenses.",
        "Trying to decide when you can retire during those years is like trying to measure something that's still moving.",
        "Eventually, though, life begins to settle.",
        "The kids leave home.",
        "The mortgage balance shrinks.",
        "The house finally feels finished.",
        "You stop replacing furniture simply because the trend changed.",
        "You begin to understand what it actually costs to live a life that already makes you happy.",
        "That is a powerful place to be.",
      ],
    },
    {
      heading: "A different retirement question",
      paragraphs: [
        "I don't spend much time wondering what age I'll retire.",
        "I think about something else instead.",
        "\"What kind of life am I asking my retirement to pay for?\"",
        "That question changed everything.",
        "Because every decision I make today quietly follows me into retirement.",
        "The truck I finance.",
        "The subscription I forget to cancel.",
        "The larger house.",
        "The smaller house.",
        "The vacation I finance.",
        "The debt I eliminate.",
        "Every one of those choices becomes part of the life my investments will someday have to support.",
      ],
    },
    {
      heading: "Predictable is powerful",
      paragraphs: [
        "One of the greatest gifts you can give your future self isn't necessarily another investment.",
        "It's a lifestyle you understand.",
        "When your expenses are predictable, retirement becomes easier to plan.",
        "You aren't guessing anymore.",
        "You know what it costs to be you.",
        "That confidence is worth more than most people realize.",
      ],
    },
    {
      heading: "So what's the best age to retire?",
      paragraphs: [
        "I don't think it's fifty-five.",
        "Or sixty.",
        "Or sixty-five.",
        "I think it's the day your investments can comfortably support the life you've intentionally built.",
        "A life that reflects what matters to you.",
        "A life that isn't weighed down by unnecessary obligations.",
        "A life that gives you choices instead of bills.",
        "That life isn't built during your final year at work.",
        "It's built quietly over hundreds of ordinary paydays.",
        "One debt you decide to eliminate.",
        "One unnecessary payment you never take on.",
        "One investment instead of one impulse purchase.",
        "One ordinary payday at a time.",
        "That's why I don't believe the best age to retire is an age at all.",
        "I believe it's the moment your life and your finances finally meet.",
      ],
    },
  ],
};


   const EIGHTEENTH_ARTICLE = {
  id: "the-wealth-you-build-before-you-build-wealth",
  title: "The Wealth You Build Before You Build Wealth",
  summary:
    "Long before an investment account grows, something else has to grow first. Wealth often begins with learning, judgment, and becoming ready for opportunity before the money arrives.",
  image: "/article-wealth-before-wealth.png",
  readTime: "5 min read",
  category: "Investing",
  kicker: "WEALTH · PREPARATION · GROWTH",
  alt:
    "Person reading financial notes and learning about investing beside a notebook and cup of coffee",
  caption:
    "The investment account is the part everyone sees. The real wealth was built long before it appeared.",
  quote: {
    strong: "The investment account is the part everyone sees.",
    text: "The real wealth was built long before it appeared.",
  },
  sections: [
    {
      heading: "The things I walked past every day",
      paragraphs: [
        "For years, I worked in an office where stock prices were everywhere.",
        "Numbers scrolled across computer screens.",
        "People talked about shares, dividends, earnings, and markets as casually as they talked about the weather.",
        "I heard the conversations.",
        "I saw the numbers.",
        "I ignored all of it.",
        "Not because I thought investing was a bad idea.",
        "I just assumed it wasn't relevant to me yet.",
        "I didn't have money to invest, so I convinced myself I didn't need to understand investing.",
        "Looking back, I had it completely backwards.",
      ],
    },
    {
      heading: "I thought the money came first",
      paragraphs: [
        "My plan was simple.",
        "Work hard.",
        "Earn more.",
        "Then learn about investing.",
        "It sounded sensible.",
        "After all, why spend time learning something I couldn't afford to do?",
        "The problem was that life doesn't work that way.",
        "Opportunities don't arrive when it's convenient.",
        "They arrive when they arrive.",
        "If you're still trying to learn the basics after the opportunity shows up, you're already behind.",
      ],
    },
    {
      heading: "Learning before I needed it",
      paragraphs: [
        "Eventually curiosity got the better of me.",
        "I started reading.",
        "At first it was frustrating.",
        "I'd finish an article and realize I understood almost none of it.",
        "So I'd read another.",
        "Then another.",
        "Slowly, things that had sounded complicated started making sense.",
        "I stopped seeing a stock as a number on a screen.",
        "I understood that it represented ownership.",
        "Dividends stopped being another financial buzzword.",
        "They became part of a business sharing its success with the people who owned it.",
        "Compound growth stopped sounding like something from a textbook.",
        "I began to see it everywhere.",
        "The interesting part wasn't that I had learned about investing.",
        "It was that I had started thinking differently.",
      ],
    },
    {
      heading: "Nobody notices this part",
      paragraphs: [
        "People notice the investment account.",
        "They notice the promotion.",
        "They notice the house.",
        "They notice the retirement account that has quietly grown over twenty years.",
        "They almost never notice what came first.",
        "The evenings spent reading when nobody was watching.",
        "The questions that felt embarrassing to ask.",
        "The first automatic contribution that seemed too small to matter.",
        "The mistakes made while the dollar amounts were still small enough to forgive.",
        "None of those moments look impressive.",
        "They're also the moments that make everything else possible.",
      ],
    },
    {
      heading: "Knowledge compounds too",
      paragraphs: [
        "We talk a lot about compound interest.",
        "I think knowledge compounds in much the same way.",
        "One article makes the next one easier to understand.",
        "One lesson helps you recognize the next opportunity.",
        "One good decision gives you the confidence to make another.",
        "For a long time it doesn't feel like much is happening.",
        "Then one day someone starts talking about investing, and you realize you're no longer trying to keep up with the conversation.",
        "You're part of it.",
      ],
    },
    {
      heading: "By the time opportunity arrives",
      paragraphs: [
        "Years later your income grows.",
        "A bonus shows up.",
        "A promotion comes along.",
        "Maybe your mortgage payment disappears.",
        "Maybe your children become more independent.",
        "For the first time, you have money available to invest.",
        "From the outside, it looks as though your financial life changed overnight.",
        "It didn't.",
        "The money simply caught up with the person you had already become.",
      ],
    },
    {
      heading: "Build yourself first",
      paragraphs: [
        "I don't think wealth begins with a bigger paycheque.",
        "I think it begins much earlier.",
        "It begins with curiosity.",
        "With asking questions.",
        "With reading things you don't fully understand yet.",
        "With making small mistakes while the consequences are still small.",
        "Those ordinary decisions rarely feel important at the time.",
        "But they add up, just like money does.",
        "One payday you buy a book instead of another impulse purchase.",
        "Another payday you start investing a small amount automatically.",
        "Another payday you understand something that used to confuse you.",
        "Looking back, those were the moments that mattered.",
        "The investment account was simply the visible result.",
        "The real wealth had been growing long before anyone, including me, could see it.",
      ],
    },
  ],
};
    const NINETEENTH_ARTICLE = {
      id: "the-little-grocery-store",
      title: "The Little Grocery Store",
      summary: "A specialty grocery store, a glass bottle of chocolate milk, and one funny comment revealed how quietly our definition of normal can become more expensive.",
      image: "/article-when-normal-gets-expensive.png",
      readTime: "5 min read",
      category: "Saving",
      kicker: "LIFESTYLE CREEP · CONTENTMENT · CHOICE",
      alt: "Woman looking at a glass bottle of chocolate milk in a specialty grocery store",
      caption: "Success is having the freedom to choose what is worth upgrading and what is not.",
      quote: {
        strong: "Success had not changed who I was.",
        text: "It had quietly changed what felt normal.",
      },
      sections: [
        {
          heading: "The little grocery store",
          paragraphs: [
            "A few years ago, my sister and I wandered into one of those little specialty grocery stores that felt more like a boutique than a supermarket.",
            "It was not where we bought our weekly groceries.",
            "It was the kind of place you visited once or twice a year if you wanted something special for Christmas, a birthday, or another occasion.",
            "The shelves were neatly stocked instead of overflowing.",
            "The employees wore crisp white uniforms.",
            "The fresh mozzarella sat on display with cracked pepper sprinkled over the top like little pieces of art.",
            "Everything looked beautiful.",
            "Everything also seemed to cost just a little more than it probably needed to.",
          ],
        },
        {
          heading: "Not my kinds of problems",
          paragraphs: [
            "As we wandered through the refrigerated section, we spotted chocolate milk in glass bottles.",
            "We picked one up and laughed about buying it.",
            "Then somehow our conversation drifted to getting massages.",
            "I looked at my sister and started laughing.",
            "She asked what was so funny.",
            "I said,",
            "\"Who am I? These are not my kinds of problems.\"",
            "Years earlier I had been standing on my feet all day working as a cashier.",
            "Back then I never would have imagined spending an afternoon in a specialty grocery store talking about chocolate milk in glass bottles and whether we should book massages.",
            "Not because either of those things is wrong.",
            "They are not.",
            "They just were not part of my world.",
          ],
        },
        {
          heading: "What felt normal",
          paragraphs: [
            "That afternoon stayed with me for years.",
            "Not because of the chocolate milk.",
            "Not because of the massages.",
            "Because I realized something I had never really thought about before.",
            "Success had not changed who I was.",
            "It had quietly changed what felt normal.",
            "I think that happens to all of us.",
            "Not just with money.",
            "With life.",
            "The first apartment that felt huge eventually feels small.",
            "The first new vehicle eventually becomes just your vehicle.",
            "The first nice vacation eventually becomes the vacation you expect every year.",
            "Normal has a funny way of changing.",
          ],
        },
        {
          heading: "Lifestyle creep",
          paragraphs: [
            "Financial experts call this lifestyle creep.",
            "That is probably the right name for it.",
            "As our income grows, our spending quietly grows with it.",
            "Things that once felt like luxuries slowly become everyday purchases.",
            "The funny part is that we rarely notice it happening.",
            "Nobody wakes up one morning and decides they want a more expensive life.",
            "It happens one small decision at a time.",
            "A nicer grocery store.",
            "A slightly better hotel.",
            "A subscription that seems harmless.",
            "An upgraded version because it is only a little more.",
            "Each decision feels reasonable.",
            "On its own, none of them changes your financial future.",
            "Together, they slowly redefine what feels normal.",
            "That is the part I find fascinating.",
            "Lifestyle creep does not feel extravagant.",
            "It feels ordinary.",
          ],
        },
        {
          heading: "The choice to notice",
          paragraphs: [
            "That afternoon in the grocery store made me realize something else.",
            "There is nothing wrong with enjoying the rewards of your hard work.",
            "If you have worked for years to improve your finances, you should enjoy them.",
            "The goal is not to feel guilty every time you spend money.",
            "The goal is simply to notice.",
            "Notice when something that once felt special has quietly become an expectation.",
            "Notice when convenience becomes a habit.",
            "Notice when an upgrade stops feeling like an upgrade.",
            "Because once you notice it, you get to decide whether it is actually making your life better.",
            "That is a choice.",
            "And that choice matters a lot more than a bottle of chocolate milk ever will.",
          ],
        },
        {
          heading: "Choosing your normal",
          paragraphs: [
            "As I have gotten older, I have realized something.",
            "Some things are absolutely worth spending more money on.",
            "A good mattress.",
            "Comfortable shoes.",
            "A reliable vehicle.",
            "A warm winter coat.",
            "Those purchases improve your life almost every day.",
            "They are not just things.",
            "They make everyday life a little easier.",
            "But not every upgrade deserves a place in your budget.",
            "Sometimes the regular version does exactly what you need.",
            "Sometimes paying twice as much gives you very little in return.",
            "The difficult part is knowing the difference.",
          ],
        },
        {
          heading: "The question I ask",
          paragraphs: [
            "These days, before I buy something, I ask myself one simple question.",
            "\"Is this making my life better, or has it simply become my new normal?\"",
            "That question has saved me from more unnecessary purchases than I can count.",
            "Sometimes the answer is obvious.",
            "A quality tool that I will use for years.",
            "Money well spent.",
            "Something that improves my health, comfort, or saves me time every day.",
            "Also money well spent.",
            "Other times I realize I am about to spend more simply because I have become used to spending more.",
            "That is when I stop.",
            "Not because I cannot afford it.",
            "Because I want my money working toward something bigger.",
          ],
        },
        {
          heading: "Contentment is a financial habit",
          paragraphs: [
            "Building wealth is rarely about one big decision.",
            "Most of us already know we should save for retirement.",
            "We know we should invest.",
            "We know we should avoid unnecessary debt.",
            "The challenge is that those goals compete with hundreds of little decisions every month.",
            "None of them feels important on its own.",
            "Together they shape the life we build.",
            "That is why I believe contentment is one of the most valuable financial habits a person can develop.",
            "Contentment does not mean settling.",
            "It does not mean buying the cheapest option every time.",
            "It simply means being able to say,",
            "\"This is enough.\"",
            "That is a powerful sentence.",
          ],
        },
        {
          heading: "The moving finish line",
          paragraphs: [
            "There will always be a newer version.",
            "A better version.",
            "A premium version.",
            "There will always be someone with a bigger house, a nicer vehicle, or a more expensive vacation.",
            "If we keep measuring ourselves against everyone else, the finish line keeps moving.",
            "Learning to appreciate enough is one of the few ways to stop chasing it.",
            "Ironically, the people who seem the most financially secure are often the ones who are perfectly comfortable saying,",
            "\"This one is good enough.\"",
            "That leaves room for something much more valuable.",
            "Choices.",
            "Freedom.",
            "Peace of mind.",
            "Those things rarely happen because of one brilliant financial decision.",
            "They usually happen because of years of ordinary ones.",
          ],
        },
        {
          heading: "The regular one is just fine",
          paragraphs: [
            "I still think about that afternoon with my sister from time to time.",
            "Not because of the chocolate milk.",
            "Not because of the grocery store.",
            "Because it reminds me how quietly our definition of normal can change.",
            "Sometimes I buy the nicer version.",
            "Sometimes I do not.",
            "The important part is that I stop long enough to decide.",
            "I do not want habit making my financial decisions.",
            "I want my goals making them.",
            "That little grocery store taught me something I never expected.",
            "Success is not when you can finally afford the premium version of everything.",
            "Success is having the freedom to choose what is worth upgrading and what is not.",
            "There is a big difference.",
          ],
        },
        {
          heading: "Choose yours",
          paragraphs: [
            "The next time you find yourself reaching for the more expensive option, pause for a moment.",
            "Ask yourself,",
            "\"Is this truly making my life better, or has my definition of normal quietly become more expensive?\"",
            "You might still buy it.",
            "You might decide it is worth every penny.",
            "Or you might discover that the regular one is just fine.",
            "Either way, the decision will be yours.",
            "And that is what building wealth has always been about.",
            "Not saying no to everything.",
            "Not buying the cheapest option every time.",
            "Making intentional choices that move you closer to the life you actually want.",
            "Because every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

   const TWENTIETH_ARTICLE= {
  id: "the-hidden-paycheque-at-work",
  title: "The Hidden Paycheque at Work",
  summary:
    "Your salary is only part of what your job pays. Workplace benefits, retirement matching, employee discounts, and other perks can quietly leave more money in your pocket.",
  image: "/article-work-perks-paycheque.png",
  readTime: "5 min read",
  category: "Workplace Money",
  kicker: "WORKPLACE BENEFITS · COMPENSATION · SAVING",
  alt:
    "Employee reviewing workplace benefits and compensation information at a desk",
  caption:
    "Some of the most valuable parts of a job never appear on a pay stub.",
  quote:
    "Your salary is only part of what your job pays. The rest often shows up as money you never had to spend.",
  sections: [
    {
      heading: "The 9-to-5 Club",
      paragraphs: [
        "Most people think the only thing they earn at work is a paycheque.",
        "Over the years, I've realized that's only part of the story.",
        "Some of the most valuable things I've received from work never appeared on my pay stub.",
        "Retirement matching. Health benefits. Employee discounts. Professional development. The occasional free lunch. More coffee than I should probably admit to. Even a surprising collection of stainless steel travel mugs.",
        "I like to think of it as belonging to the 9-to-5 Club.",
        "Some people argue that employers offer workplace perks instead of paying higher salaries. Maybe they're right. Either way, if someone wants to help pay for my retirement, cover an expense I already have, or buy me lunch, I'm happy to accept it."
      ]
    },
    {
      heading: "The Benefits You Forgot You Had",
      paragraphs: [
        "Every workplace is different, but many compensation packages are worth far more than the salary printed on the job offer.",
        "Some employers negotiate discounts on hotels, insurance, electronics, cell phone plans, vehicles, and gym memberships. Others help pay for professional development, retirement savings, counselling, dental care, physiotherapy, prescription costs, or wellness expenses.",
        "The surprising part isn't that these benefits exist. It's how often they go unused.",
        "Some companies have employee discount programs that employees never open. Others offer health and wellness benefits that quietly expire at the end of the year.",
        "One day a coworker mentioned they had just bought new tires through our employee discount program.",
        "I stopped.",
        "\"We have an employee discount program?\"",
        "I had worked there for years and somehow missed it.",
        "That conversation sent me looking.",
        "I found discounts on hotels, insurance, electronics, and even the mattress company I was already planning to buy from.",
        "It felt like finding money in the pocket of a jacket I hadn't worn since last winter.",
        "It also made me wonder how many people pay full price simply because they never think to look.",
        "Before making a large purchase, spend a few minutes checking what your employer already offers. It may be one of the easiest ways to save money without changing your lifestyle.",
        "Your salary is only part of what your job pays.",
        "The rest often shows up as money you never had to spend."
      ]
    },
    {
      heading: "The Best Workplace Benefit",
      paragraphs: [
        "If I had to choose one workplace benefit above all the others, employer retirement matching would win.",
        "There aren't many financial opportunities where someone voluntarily helps pay for your future simply because you decided to save.",
        "Yet many employees leave matching contributions unclaimed every year.",
        "If your employer is willing to contribute to your retirement because you contribute too, don't leave that opportunity behind.",
        "Health benefits deserve the same attention.",
        "Before paying out of pocket for massage therapy, prescription glasses, counselling, physiotherapy, dental care, or medication, check your plan first.",
        "You've already earned those benefits.",
        "Make sure you use them."
      ]
    }  ,
    {
      heading: "Enjoy the Little Extras",
      paragraphs: [
        "Not every workplace benefit has to save hundreds of dollars to be worthwhile.",
        "Sometimes it's a free lunch during a busy week.",
        "Sometimes it's coffee in the break room instead of stopping at a café on the way to work.",
        "Years ago, I bought a new SUV through my employer's vehicle discount program. The savings were substantial, but what I remember most wasn't the amount. It was the satisfaction of knowing that a benefit I'd already earned had made one of the biggest purchases of my life a little easier.",
        "Together, these benefits quietly reduce the amount of money that has to leave your bank account."
      ]
    },
    {
      heading: "My New Habit",
      paragraphs: [
        "Whenever I'm about to make a major purchase, I spend a few minutes checking whether my employer offers a discount.",
        "Sometimes the answer is yes.",
        "It might be cheaper insurance, a lower hotel rate, employee pricing on electronics, or a discounted gym membership.",
        "Other times there's nothing available, and that's fine.",
        "The search only takes a few minutes, and every once in a while it saves far more than I'd expected.",
        "Those are savings I never would have found if I hadn't looked."
      ]
    },
    {
      heading: "Your Job Pays More Than You Think",
      paragraphs: [
        "Two people can earn exactly the same salary and still end up in very different financial positions.",
        "One uses every workplace benefit available.",
        "The other ignores them.",
        "The difference isn't what they earned.",
        "It's what they kept.",
        "That's the hidden paycheque.",
        "It doesn't arrive as a deposit in your bank account.",
        "It appears as money that never had to leave.",
        "The dollars you don't spend because your employer helped cover a cost are just as real as the dollars deposited into your account every payday.",
        "The only difference is that they often go unnoticed."
      ]
    },
    {
      heading: "Before You Wait for a Raise",
      paragraphs: [
        "Most people wait for a raise before they expect to feel wealthier.",
        "Sometimes the easiest raise you'll ever receive is already available through your employer.",
        "Before assuming your salary is the only thing your job pays, explore your benefits, retirement plan, employee discounts, and professional development opportunities.",
        "Use what improves your life.",
        "Claim the employer match.",
        "Check the discount before paying full price.",
        "Enjoy the occasional free lunch.",
        "Then give the money you saved a purpose.",
        "Some of the best parts of a job never appear on a pay stub.",
        "They show up as money that never had to leave.",
        "The next time your paycheque lands in your account, remember that it might not be the only thing your job paid you that month.",
        "Because when you only get about 1,040 paydays, every dollar you earn—and every dollar you don't have to spend—deserves to work as hard as you did."
      ]
    }
  ]
};
    const TWENTY_FIRST_ARTICLE = {
  id: "why-saying-no-feels-so-hard",
  title: "Why Saying No Feels So Hard",
  summary:
    "Saying no to spending can feel harder than spending itself, but every no protects a yes that matters more.",
  image: "/article-why-saying-no-feels-hard.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAYING NO · INTENTIONAL SPENDING · FINANCIAL CONFIDENCE",
  alt: "Couple standing in a furniture store looking at a sectional couch",
  caption:
    "Every no protects a yes that matters more.",
  quote: {
    strong: "Other people may only hear the word no.",
    text: "You know what your yes is.",
  },
  sections: [
    {
      heading: "The uncomfortable part",
      paragraphs: [
        "When I was younger, I thought spending money was the uncomfortable part.",
        "It turns out saying no can feel even harder.",
        "Not because of the money.",
        "Because of what we think other people might think.",
      ],
    },
    {
      heading: "Six thousand dollars?",
      paragraphs: [
        "A while back, we wandered into a furniture store just to look.",
        "We found a beautiful sectional.",
        "Sat down.",
        "Looked at each other.",
        "Then we saw the price.",
        "Before I could say anything, the person I was with said exactly what both of us were thinking.",
        "\"Six thousand dollars?\"",
        "For a second, neither of us said a word.",
        "Then we laughed as we walked back to the car.",
        "On the drive home, something kept bothering me.",
        "Why had that felt embarrassing?",
        "We hadn't done anything wrong.",
        "We looked at a couch and decided it wasn't worth six thousand dollars to us.",
        "Somehow, saying that out loud felt more uncomfortable than quietly walking away.",
      ],
    },
    {
      heading: "The thirty-second feeling",
      paragraphs: [
        "Money has a strange way of becoming emotional.",
        "We don't want to look cheap.",
        "We don't want people to think we can't afford something.",
        "Sometimes we spend money just to avoid a feeling that lasts thirty seconds.",
        "The purchase lasts a whole lot longer.",
      ],
    },
    {
      heading: "Most people move on",
      paragraphs: [
        "The funny thing is, most people aren't paying nearly as much attention to us as we imagine.",
        "The salesperson has already moved on to the next customer.",
        "Your friends aren't keeping score.",
        "The server isn't judging what you ordered.",
        "Most people are too busy living their own lives to think much about yours.",
      ],
    },
    {
      heading: "Someone else might relax",
      paragraphs: [
        "I've noticed something else.",
        "Whenever one person is honest about money, someone else usually relaxes.",
        "One friend suggests grabbing coffee instead of going out for dinner.",
        "Another admits they've been trying to save too.",
        "Someone else says they've been thinking the exact same thing.",
        "All it took was one person saying it first.",
      ],
    },
    {
      heading: "What loud budgeting really means",
      paragraphs: [
        "Maybe that's why I like the idea of loud budgeting.",
        "Not because it's loud.",
        "Because it's honest.",
        "Instead of pretending every purchase makes sense, you simply admit your money already has another purpose.",
        "A vacation.",
        "An emergency fund.",
        "Paying off debt.",
        "Retirement.",
        "Peace of mind.",
        "Those things deserve a voice too.",
      ],
    },
    {
      heading: "What your no protects",
      paragraphs: [
        "I've realized that saying no isn't really about rejecting what's in front of you.",
        "It's about protecting what you've already decided matters more.",
        "Once I started looking at it that way, saying no became a lot easier.",
        "Not because I cared less about the couch.",
        "Because I cared more about what that six thousand dollars could do for my future.",
      ],
    },
    {
      heading: "You know what your yes is",
      paragraphs: [
        "Most of us only receive about 1,040 paydays during our working lives.",
        "Every time you say no to one purchase, you're saying yes to something else.",
        "Other people may only hear the word no.",
        "You know what your yes is.",
        "And that's the one that matters.",
        "Every payday is a decision.",
        "Choose yours.",
      ],
    },
  ],
};

    const TWENTY_SECOND_ARTICLE = {
  id: "ai-is-changing-the-9-to-5-club-heres-how-to-stay-in-it",
  title: "AI Is Changing the 9-to-5 Club. Here's How to Stay In It.",
  summary:
    "Artificial intelligence is changing the workplace, but it is not the first tool to reshape our careers. The people who keep learning usually keep earning.",
  image: "/article-ai-9-to-5-club.png",
  readTime: "5 min read",
  category: "Knowledge & Insights",
  kicker: "AI · CAREER DEVELOPMENT · EARNING POWER",
  alt: "Office worker reviewing paper files beside a laptop with an AI chat open",
  caption:
    "The tools change. The lesson doesn't. The people who keep learning usually keep earning.",
  quote: {
    strong: "Maybe AI isn't changing the rules of work.",
    text: "Maybe it's simply introducing the next tool we all need to learn.",
  },
  sections: [
    {
      heading: "The old way of finding things",
      paragraphs: [
        "When I first started working in the corporate world, finding information wasn't as simple as opening a browser or asking artificial intelligence a question.",
        "You actually had to go looking for it.",
        "One office had an entire wall made of enormous sliding filing cabinets covered in thick grey fabric.",
        "To get to the files, you'd grab the handle and slowly pull the wall open.",
        "Behind it sat row after row of neatly labelled folders.",
        "If someone filed one in the wrong place, good luck.",
        "It wasn't really lost.",
        "It was simply hiding somewhere nobody thought to look.",
        "Today I can ask an AI tool the same question and usually have an answer in seconds.",
        "That contrast made me realize something.",
        "Maybe AI isn't changing the rules of work.",
        "Maybe it's simply introducing the next tool we all need to learn.",
      ],
    },
    {
      heading: "The 9-to-5 Club is changing",
      paragraphs: [
        "Not long after I started using AI at work, something happened that made me laugh.",
        "I opened it one morning, and it was down.",
        "For a few seconds I just stared at the screen.",
        "Then I laughed at myself.",
        "It felt like walking into the office and discovering the lights wouldn't turn on.",
        "You can still do your job.",
        "It's just harder than it was yesterday.",
        "That was the moment I realized I'd already begun relying on a tool that hadn't existed for most of my career.",
        "And honestly, that's probably how every generation has felt.",
        "People once learned computers after using typewriters.",
        "They learned email after paper memos.",
        "They learned internet search after filing cabinets.",
        "Now we're learning artificial intelligence.",
        "The tools keep changing.",
        "The lesson doesn't.",
      ],
    },
    {
      heading: "Your greatest investment",
      paragraphs: [
        "When people think about investing, they usually picture stocks, ETFs, retirement accounts, or real estate.",
        "Those investments matter.",
        "But every one of them depends on something that comes first.",
        "Your ability to earn.",
        "Every dollar you will ever save or invest begins with a paycheque.",
        "Learning a new skill, earning a promotion, or becoming more valuable at work doesn't just improve your résumé.",
        "It increases your earning power.",
        "Higher earning power quietly makes almost every financial goal easier to achieve.",
        "The people who keep learning usually keep earning.",
      ],
    },
    {
      heading: "Don't compete with AI",
      paragraphs: [
        "Whenever a new technology appears, people usually ask the same question.",
        "\"Will it replace my job?\"",
        "History suggests technology changes jobs far more often than it eliminates work altogether.",
        "A better question might be,",
        "\"How can this help me become better at what I already do?\"",
        "If AI gives you back an hour, don't spend that hour doing less.",
        "Spend it solving better problems, learning another skill, improving a process, or helping someone on your team.",
        "That's how technology becomes an advantage instead of a threat.",
      ],
    },
    {
      heading: "Become more valuable",
      paragraphs: [
        "One of my favourite financial strategies is letting someone else pay.",
        "That applies to learning too.",
        "Before spending money on a course, check what your employer already offers.",
        "Many companies reimburse tuition or provide access to learning platforms that employees never use.",
        "Governments regularly fund career training and professional development.",
        "Then there's YouTube, which has quietly become one of the biggest classrooms in the world.",
        "There has never been a better time to improve your skills without spending much money.",
        "You don't need to announce every course you complete or every certificate you earn.",
        "Just keep becoming a little more valuable.",
        "One book.",
        "One tutorial.",
        "One course.",
        "Small improvements rarely feel dramatic in the moment.",
        "Years later, they often explain why one career kept growing while another stood still.",
      ],
    },
    {
      heading: "Don't forget the human skills",
      paragraphs: [
        "While everyone is talking about artificial intelligence, I think there's another opportunity that's easy to overlook.",
        "Become better at being human.",
        "Communicate clearly.",
        "Build trust.",
        "Listen carefully.",
        "Solve problems that don't fit neatly into a prompt.",
        "AI can help you write faster.",
        "It can't build your reputation.",
        "It can summarize a meeting.",
        "It can't replace the confidence people gain from working with someone they trust.",
        "Technical skills may open doors.",
        "Character and relationships often determine how far you walk through them.",
     ],
    },
    
    {
      heading: "The lesson hasn't changed",
      paragraphs: [
        "When I think back to those giant filing cabinets, they don't feel old-fashioned.",
        "They remind me that work has always changed.",
        "The people who adapted kept moving forward.",
        "The people who refused usually had a harder time.",
        "Artificial intelligence feels new today.",
        "One day it won't.",
        "It will become another ordinary tool, just like computers, email, and internet search before it.",
        "Something else will eventually replace it.",
        "The lesson won't change.",
        "Protect your ability to earn.",
        "Stay curious.",
        "Keep learning.",
        "Because the people who keep learning usually keep earning.",
      ],
    },
   ],
};const TWENTY_THIRD_ARTICLE = {
  id: "the-10000-blueprint",
  title: "The $10,000 Blueprint",
  summary:
    "Saving $10,000 isn't about luck or extraordinary discipline. It's about building a framework that quietly turns small decisions into a big result.",
  image: "/article-10000-blueprint.png",
  readTime: "6 min read",
  category: "Saving",
  kicker: "SAVING · FRAMEWORKS · MOMENTUM",
  alt: "Notebook with a ten-thousand-dollar savings goal beside a calculator, coffee, and a savings jar",
  caption:
    "Most people don't accidentally save $10,000. They build it one decision at a time.",
  quote: {
    strong: "Don't pick the deadline first.",
    text: "Build the framework first. Then let the framework choose the date.",
  },

  sections: [
    {
      heading: "The money that disappears",
      paragraphs: [
        "Ten thousand dollars is a lot of money.",
        "Whether you have one hundred dollars in the bank or one million, losing $10,000 would get your attention.",
        "You wouldn't throw it away. You wouldn't leave it sitting in a shopping cart. You certainly wouldn't set it on fire.",
        "Yet many people spend that much without ever noticing it.",
        "Not in one afternoon, but over hundreds of ordinary decisions.",
        "It disappears quietly: dinner because nobody felt like cooking, a subscription that renews every month, a grocery trip that costs more than expected, or something that felt like a bargain because it was on sale.",
        "None of those decisions seems expensive on its own.",
        "Together, they can quietly become $10,000.",
        "The surprising part isn't that people spend the money.",
        "It's that most of them never intended to.",
      ],
    },

    {
      heading: "The good news",
      paragraphs: [
        "Saving money works exactly the same way.",
        "Almost nobody wakes up one morning and discovers an extra $10,000 sitting in a savings account.",
        "They build it.",
        "Not through one heroic decision, but through hundreds of ordinary ones.",
        "This article isn't really about budgeting.",
        "It's about creating a framework that makes those ordinary decisions easier to repeat.",
        "Wealth usually isn't built by one spectacular choice.",
        "It's built through small choices that hardly feel important until you look back.",
      ],
    },

    {
      heading: "The blueprint",
      paragraphs: [
        "If you wanted to build a house, you wouldn't begin with the roof.",
        "You'd start with a blueprint.",
        "If you were planning a road trip across the country, you wouldn't simply start driving and hope you ended up in the right place.",
        "You'd map the route first.",
        "Saving money deserves the same approach.",
        "Most people decide they want to save more and hope everything somehow works out.",
        "Hope isn't what gets you there.",
        "A framework does.",
      ],
    },

    {
      heading: "Don't pick the date first",
      paragraphs: [
        "This is where I think most savings goals go wrong.",
        "People start with a deadline.",
        "\"I want to save $10,000 by the end of the year.\"",
        "Maybe they will.",
        "Maybe they won't.",
        "The date is only a guess until you know how you're actually going to get there.",
        "Instead, grab a blank sheet of paper.",
        "At the top, write one line.",
        "\"Goal: $10,000.\"",
        "Nothing else.",
        "Don't write today's date.",
        "Don't write a completion date.",
        "Not yet.",
        "Now answer one simple question.",
        "Where is every dollar going to come from?",
      ],
    },

    {
      heading: "Build your framework",
      paragraphs: [
        "This is where the goal becomes real.",
        "Instead of writing \"spend less,\" write specific actions.",
        "Your list might include returning bottles, packing lunch twice a week, selling things you no longer use, setting aside part of every tax refund, or automatically transferring money from each payday.",
        "Keep adding ideas until you've accounted for the entire $10,000.",
        "The numbers don't need to be perfect.",
        "Life will change, and you'll adjust the plan as you go.",
        "The important thing is that you've stopped wishing and started designing.",
      ],
    },

    {
      heading: "Let the framework choose the date",
      paragraphs: [
        "Once you've built the framework, read through it again.",
        "Some savings will happen once. Others will happen every payday or every month.",
        "Now something interesting happens.",
        "Your framework starts answering the question that most people simply guess at.",
        "\"How long will this actually take?\"",
        "Only now should you write a start date and a target date.",
        "You didn't choose them because they sounded motivating.",
        "You let your plan choose them.",
        "Maybe your goal takes nine months.",
        "Maybe it takes eighteen.",
        "Maybe it takes longer.",
        "That's not failure.",
        "That's reality.",
        "Your income, responsibilities, and life are different from everyone else's.",
        "There's no reason your timeline should look exactly like theirs.",
      ],
    },

    {
      heading: "Protect what you build",
      paragraphs: [
        "Once your framework is in place, make it as easy as possible to follow.",
        "Open a separate no-fee savings account that isn't used for groceries, gas, or everyday spending.",
        "Then automate what you can.",
        "If part of every payday is supposed to go toward your goal, arrange for it to happen automatically.",
        "When unexpected money arrives, decide where it belongs before it reaches your everyday account.",
        "A tax refund, overtime payment, birthday gift, or something you sold can disappear surprisingly quickly when it lands in chequing.",
        "Money without a purpose has a habit of quietly disappearing.",
        "Money with a purpose starts building your future.",
      ],
    },

    {
      heading: "Life won't follow the blueprint perfectly",
      paragraphs: [
        "No framework survives real life unchanged.",
        "The furnace may break. The dog may need the vet. The car may need new tires.",
        "You might forget your lunch one morning and buy one instead.",
        "None of that means you've failed.",
        "It means you're living a normal life.",
        "Don't throw away the framework because one month didn't go according to plan.",
        "Adjust it.",
        "Maybe you save a little less this month and a little more next month.",
        "The goal was never perfection.",
        "The goal was progress.",
      ],
    },

    {
      heading: "The finish line belongs to you",
      paragraphs: [
        "One person might save $10,000 in eight months.",
        "Another might need two years.",
        "Neither timeline is right or wrong.",
        "Your income, responsibilities, and priorities are different from everyone else's.",
        "The only comparison that matters is whether you're making better decisions than you were before.",
        "Financial progress isn't measured against strangers.",
        "It's measured against the life you were living yesterday.",
      ],
    },

    {
      heading: "One day you'll notice something different",
      paragraphs: [
        "One morning you'll log into your savings account for no particular reason.",
        "You'll simply be checking the balance as you've done dozens of times before.",
        "Then you'll notice something.",
        "There's more money there than you've ever had before.",
        "Not because of one extraordinary decision.",
        "Because hundreds of ordinary ones quietly added together.",
        "Looking back, it won't be one moment you remember.",
        "It will be the framework that kept you moving forward one payday at a time.",
      ],
    },

    {
      heading: "You built it",
      paragraphs: [
        "People often ask how someone manages to save $10,000.",
        "They're usually expecting a secret.",
        "There isn't one.",
        "They built a framework and trusted it long enough for the results to appear.",
        "One day you'll look at your savings account and see five figures staring back at you.",
        "Not because you found the money.",
        "Not because someone gave it to you.",
        "Because you built it.",
        "One decision at a time.",
      ],
    },
  ],
};
 
   const TWENTY_FOURTH_ARTICLE = {
  id: "you-saved-3-and-lost-30000",
  title: "You Saved $3 and Lost $30,000",
  summary:
    "The little savings feel good, but the biggest financial decisions deserve the most attention.",
  image: "/article-saved-3-lost-30000.png",
  readTime: "4 min read",
  category: "Financial Basics",
  kicker: "FINANCIAL BASICS · RENEWALS · ATTENTION",
  alt: "Man reviewing mortgage renewal paperwork at a kitchen table",
  caption:
    "The biggest financial decisions we make should get the most attention, not the least.",
  quote: {
    strong: "The biggest financial decisions we make should get the most attention,",
    text: "not the least.",
  },
  sections: [
    {
      heading: "The easiest paperwork to ignore",
      paragraphs: [
        "Most of us will spend twenty minutes trying to save three dollars.",
        "We'll drive across town because one store has shampoo on sale.",
        "We'll compare two almost identical bottles.",
        "We'll search for a coupon before we get to the checkout.",
        "Then we'll walk out feeling like we made a smart financial decision.",
        "A week later, a mortgage renewal arrives in the mail.",
        "We spend thirty seconds looking at it.",
        "I think we've got that backwards.",
      ],
    },
    {
      heading: "Why mortgage renewals feel ordinary",
      paragraphs: [
        "Every few years my mortgage comes up for renewal.",
        "The paperwork arrives almost completely filled out.",
        "The bank has already done the work.",
        "In many cases, all I have to do is sign it and send it back.",
        "It's easy.",
        "Almost too easy.",
        "Buying a house feels important.",
        "Renewing a mortgage doesn't.",
        "There are no open houses.",
        "No moving truck.",
        "No new keys.",
        "No pizza on the living room floor while you wait for the furniture to arrive.",
        "Just another envelope sitting on the counter after work.",
        "That's exactly why it deserves more attention than it usually gets.",
      ],
    },
    {
      heading: "Why we chase the small wins",
      paragraphs: [
        "Saving three dollars feels good.",
        "You see it immediately.",
        "The receipt proves it.",
        "You leave the store feeling smart.",
        "Saving thousands on a mortgage renewal doesn't feel the same.",
        "Nothing changes that afternoon.",
        "Nobody congratulates you.",
        "Your banking app doesn't flash a message saying,",
        "\"Congratulations. You just saved $8,700.\"",
        "The biggest financial wins are usually the quiet ones.",
        "Maybe that's why we ignore them.",
      ],
    },
    {
      heading: "A mortgage renewal is only an offer",
      paragraphs: [
        "Every time my mortgage comes up for renewal, I remind myself of one thing.",
        "The renewal letter isn't a decision.",
        "It's an offer.",
        "It might be competitive.",
        "It might not.",
        "I won't know until I spend a few minutes looking.",
        "So I compare current mortgage rates.",
        "I call my bank.",
        "I ask if they can do better.",
        "Sometimes I also speak with a mortgage broker who can compare offers from several lenders.",
        "It usually takes less time than my Saturday trip to buy discounted shampoo.",
      ],
    },
    {
      heading: "Twenty minutes that can save thousands",
      paragraphs: [
        "Imagine you have a $450,000 mortgage.",
        "Your renewal offer is 5.5%.",
        "After comparing mortgage rates, you find another lender offering 5.0%.",
        "Half a percent doesn't sound exciting.",
        "On a mortgage that size, it could save thousands of dollars over the next five-year term.",
        "Keep making thoughtful renewal decisions throughout the life of your mortgage and those savings can grow into tens of thousands of dollars.",
        "That's an incredible return on twenty minutes.",
      ],
    },
    {
      heading: "Insurance deserves the same attention",
      paragraphs: [
        "Mortgage renewals aren't unique.",
        "The same thing happens with home insurance and car insurance.",
        "A renewal notice arrives.",
        "The premium went up.",
        "We assume that's just how it is.",
        "Maybe it is.",
        "Maybe it isn't.",
        "Before accepting the renewal, ask a few simple questions.",
        "\"Has anything changed that qualifies me for a discount?\"",
        "\"Is this still the right coverage?\"",
        "\"Can you offer a better rate?\"",
        "\"What would another company charge someone with my driving record or claims history?\"",
        "Sometimes your current insurer really is the best choice.",
        "The important part isn't switching.",
        "The important part is knowing.",
      ],
    },
    {
      heading: "Make it your decision",
      paragraphs: [
        "Your bank already has your mortgage.",
        "Your insurance company already has your business.",
        "Convenience quietly encourages us to do nothing.",
        "That doesn't mean your lender or insurer is treating you unfairly.",
        "They may already be offering an excellent rate.",
        "But you'll never know if you don't ask.",
        "Stay because it's the best option.",
        "Not because it was the easiest.",
      ],
    },
    {
      heading: "One last thought",
      paragraphs: [
        "I'll probably keep celebrating when I save three dollars on shampoo.",
        "Every little bit helps.",
        "But I never want the small victories to distract me from the big ones.",
        "The biggest financial decisions rarely announce themselves.",
        "They arrive in ordinary envelopes.",
        "They show up as routine renewal emails.",
        "They look like paperwork.",
        "The next time your mortgage renewal or insurance renewal arrives, don't treat it like another item on your to-do list.",
        "Treat it like one of the most valuable twenty minutes of your year.",
        "Sometimes you'll save three dollars.",
        "Sometimes you'll save three hundred.",
        "Over a lifetime of paying attention, you might save thirty thousand.",
      ],
    },
  ],
};
     const TWENTY_FIFTH_ARTICLE = {
  id: "my-sofa-isnt-broken",
  title: "My Sofa Isn't Broken",
  summary:
    "Home decorating trends can make perfectly good furniture feel outdated. My worn leather sofa taught me the difference between something that is used and something that truly needs replacing.",
  image: "/article-my-sofa-isnt-broken.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · CONTENTMENT · INTENTION",
  alt:
    "Worn brown leather sofa with a dog resting in his favourite spot beside a window",
  caption:
    "A sofa does not need to look new to keep doing its job.",
  quote: {
    strong: "My sofa isn't worn out.",
    text: "It simply looks like people have lived here.",
  },
  sections: [
    {
      heading: "Let me tell you about my sofa",
      paragraphs: [
        "Before this sofa, I owned a big, fluffy brown fabric one that I bought at a garage sale.",
        "It had already seen plenty of life before it came home with me, and it saw plenty more afterward. It moved with me, held friends during hockey games and survived late nights, lazy Sundays and more than a few takeout meals.",
        "Eventually I sold it, but not because it had stopped being useful. It was enormous, I needed the space and someone else was happy to give it another home.",
        "That sofa did exactly what a sofa is supposed to do. It gave people a comfortable place to sit for far longer than anyone probably expected.",
      ],
    },
    {
      heading: "The sofa I have now",
      paragraphs: [
        "The leather sofa in my living room today was not the most expensive one in the store, and it certainly is not the nicest leather sofa available now.",
        "It has loose threads. The leather has softened and wrinkled after years of movie nights, afternoon naps and ordinary family life.",
        "My dog has claimed the corner beside the window. The cushion beneath him has a permanent dent from the countless hours he has spent there watching people pass the house.",
        "Someone else might look at it and decide it is time to shop.",
        "I look at it and think it is still a very comfortable place to sit.",
      ],
    },
    {
      heading: "When normal wear starts looking wrong",
      paragraphs: [
        "Somewhere along the way, many of us began treating normal wear as evidence that something needs replacing.",
        "A wrinkle appears in the leather. A scratch marks the dining table. A finish is no longer fashionable.",
        "None of those things changes what the furniture was built to do.",
        "The trouble usually begins when we compare it with something newer. A renovation show announces that brown furniture is dated. A magazine introduces another decorating trend. Social media serves up living rooms that look as though nobody has ever eaten, slept, spilled anything or owned a dog.",
        "Soon, the furniture in your own home begins to look worse even though nothing about it has changed.",
        "The furniture stayed the same. The standard moved.",
      ],
    },
    {
      heading: "New does not stay new for long",
      paragraphs: [
        "I understand why new furniture is tempting.",
        "You picture how it will look in the room. You imagine the cleaner lines, the untouched cushions and the feeling that the entire space has somehow improved.",
        "Then people begin living with it.",
        "The dog finds his corner. Someone spills coffee. The cushions soften and the leather creases.",
        "Before long, the beautiful new sofa becomes what every sofa eventually becomes: the place where your family sits.",
        "The excitement fades much faster than the payment plan.",
      ],
    },
    {
      heading: "Furniture was supposed to show its age",
      paragraphs: [
        "Furniture used to be purchased with the expectation that it would last.",
        "A dining table collected scratches from decades of family meals. A rocking chair stayed in the same corner for years. A dresser moved from one generation to the next.",
        "Those marks were not treated as design failures. They were evidence that the furniture had been useful.",
        "Today, even a small sign of age can become an excuse to replace something that still works perfectly well.",
        "There is a difference between furniture that is deteriorating and furniture that no longer looks untouched.",
      ],
    },
    {
      heading: "When I will replace it",
      paragraphs: [
        "My sofa will not last forever.",
        "One day the springs may give up. The frame might crack. The leather could wear through badly enough that repairing it no longer makes sense.",
        "When that day comes, I will replace it.",
        "But a wrinkle is not structural damage. A loose thread is not a broken frame. A dent made by a sleepy dog is not a financial emergency.",
        "The sofa can stay until it finishes doing the job I bought it to do.",
      ],
    },
    {
      heading: "The money can do something else",
      paragraphs: [
        "Replacing a perfectly usable sofa could cost several thousand dollars.",
        "That money has other options.",
        "It could reduce the mortgage, grow in an investment account, pay for a family trip or remain available for the day something in the house actually breaks.",
        "Keeping the sofa does not feel like a sacrifice to me. I still have a comfortable place to sit, my dog still has his window and the money stays where it can serve a more important purpose.",
        "There is a quiet satisfaction in realizing that something does not need to be replaced simply because you can afford to replace it.",
      ],
    },
    {
      heading: "My sofa isn't broken",
      paragraphs: [
        "The next time something in your home starts looking old, it may be worth asking what has actually changed.",
        "Is it damaged?",
        "Does it no longer work?",
        "Is it uncomfortable, unsafe or beyond repair?",
        "Or have you simply seen enough newer versions that the one you own has started to feel inadequate?",
        "My sofa has wrinkles, loose threads and a cushion shaped around a small dog.",
        "It also gives us somewhere to sit every day.",
        "That is not a broken sofa.",
        "That is a sofa doing its job.",
      ],
    },
  ],
};   const TWENTY_SEVENTH_ARTICLE = {
  id: "the-most-valuable-asset-youll-ever-own",
  title: "The Most Valuable Asset You'll Ever Own",
  summary:
    "Your most valuable asset is not your house or investment account. It is your ability to earn the paychecks that fund everything else.",
  image: "/article-most-valuable-asset.png",
  readTime: "5 min read",
  category: "Financial Basics",
  kicker: "FINANCIAL BASICS · CAREER · INCOME",
  alt:
    "A desk with a paycheck, resume, notebook, and simple chart showing income growth",
  caption: "Before you buy another investment, invest in the person buying it.",
  quote: {
    strong: "Your paycheck is the engine behind every financial goal you have.",
    text: "Without it, everything else eventually runs out of fuel.",
  },
  sections: [
    {
      heading: "The Paycheck That Didn't Arrive",
      paragraphs: [
        "Early in my career, I worked through a temporary employment agency.",
        "One week, my manager went on vacation. There was just one problem. No one else could approve my hours.",
        "My paycheck was delayed.",
        "It wasn't delayed for long, but it didn't take long for my priorities to change.",
        "I wasn't thinking about buying a house, investing, or retirement. I was thinking about my paycheck.",
        "Until that moment, I had always assumed money started with the dollars sitting in my bank account.",
        "It doesn't.",
        "Money starts with your ability to earn it.",
        "That delayed paycheck taught me something I'll never forget.",
        "Your ability to earn an income is the asset that pays for every other asset you'll ever own.",
      ],
    },
    {
      heading: "The Asset That Pays for Everything Else",
      paragraphs: [
        "Ask someone what their most valuable asset is and you'll probably hear the same answers: their house, their investment portfolio, or maybe their business.",
        "Those are all valuable.",
        "But none of them produced the money used to buy them.",
        "Your house doesn't make the mortgage payment. Your investment account doesn't buy the next investment.",
        "Before you could invest a dollar, take a vacation, or make a car payment, you first had to earn that dollar.",
        "Everything begins with your ability to earn an income.",
        "It's easy to forget because earning a paycheck eventually feels routine.",
        "The deposit arrives every two weeks. The bills get paid. Life moves on.",
        "But if that income suddenly disappeared, every other financial goal would eventually begin to stall.",
        "That's why I believe your earning ability is your greatest financial asset.",
        "It quietly funds almost everything else.",
      ],
    },
    {
      heading: "The Engine Behind Your Financial Life",
      paragraphs: [
        "People spend thousands of dollars maintaining their homes.",
        "They maintain their vehicles and check their investment accounts.",
        "All of those things deserve attention.",
        "But the asset responsible for paying for every one of them often receives the least attention.",
        "You.",
        "Your skills, experience, reputation, and ability to solve problems are what generate the income behind every payday.",
        "Before you invest in another asset, spend some time investing in the one that makes all the others possible.",
        "Because every investment account, mortgage payment, family vacation, and financial goal begins the same way.",
        "Someone earns the next paycheck.",
      ],
    },
    {
      heading: "Invest in the Person Earning the Money",
      paragraphs: [
        "When people hear the word investment, they usually think about stocks, real estate, or retirement accounts.",
        "I think about something else.",
        "The person earning the money to buy those things.",
        "One of the simplest ways to increase the value of that investment is to become a little more valuable each year.",
        "Sometimes that's learning a new piece of software. Sometimes it's earning a certification.",
        "Sometimes it's improving how you communicate, solve problems, or work with people.",
        "You don't always need another degree.",
        "You just need to keep growing.",
        "The more problems you can solve, the more valuable you become to the people who pay you.",
      ],
    },
    {
      heading: "Don't Waste Your Performance Review",
      paragraphs: [
        "Most performance reviews happen once a year.",
        "Most people prepare for them the night before.",
        "That never made much sense to me.",
        "I've seen people spend weeks researching the perfect barbecue or their next vehicle, then walk into the meeting that could influence hundreds of future paydays with little more than a vague idea of what they've accomplished.",
        "Throughout the year, keep a simple record of your work.",
        "Write down the projects you completed, the problems you solved, and the money or time you saved.",
        "Record positive feedback, extra responsibilities, training, and certifications.",
        "When review season arrives, you won't be trying to remember everything you've done.",
        "You'll already have the evidence.",
      ],
    },
    {
      heading: "Small Raises Have a Long Memory",
      paragraphs: [
        "A three percent raise doesn't usually make headlines.",
        "On a $60,000 salary, it's another $1,800 a year.",
        "On its own, that doesn't sound life changing.",
        "But raises are different from one-time bonuses.",
        "They become part of your salary.",
        "Every future raise builds on the one before it, and every future paycheck becomes a little larger.",
        "If you choose to invest some of that extra income, the difference grows even more over time.",
        "That's why preparing for one conversation each year can quietly influence hundreds of future paydays.",
        "The raise may feel small today.",
        "Its impact often isn't.",
      ],
    },
    {
      heading: "Keep Your Resume Alive",
      paragraphs: [
        "Most people update their resume after they've decided it's time to look for another job.",
        "By then they're in a hurry.",
        "They've forgotten projects they completed, training they finished, and problems they solved along the way.",
        "I think it's easier to spend ten minutes updating it every few months.",
        "Add a new responsibility. Record a successful project. Include a course or certification you completed.",
        "Opportunity doesn't always announce itself months in advance.",
        "Sometimes it arrives with a phone call, a conversation, or a job posting you weren't expecting.",
        "It's easier to stay ready than it is to get ready.",
      ],
    },
    {
      heading: "Know What Your Experience Is Worth",
      paragraphs: [
        "Loyalty is a good quality.",
        "Complacency isn't.",
        "Every few years, spend a little time finding out what someone with your experience is earning.",
        "Look at job postings. Talk to a recruiter. Apply for a position that genuinely interests you.",
        "Not because you're determined to leave.",
        "Because it's useful to know what the market thinks your skills are worth.",
        "Sometimes you'll discover you're being paid fairly.",
        "Sometimes you'll discover you're not.",
        "Either way, knowledge puts you in a better position than assumptions ever will.",
      ],
    },
    {
      heading: "The Asset That Makes Everything Else Possible",
      paragraphs: [
        "I've spent years thinking about investing.",
        "Like many people, I used to think first about retirement accounts, houses, and growing my savings.",
        "Those things matter.",
        "But they're only possible because someone earns the money to pay for them.",
        "I learned that lesson on the day my paycheck didn't arrive.",
        "For a few hours, every financial goal I had suddenly felt much farther away.",
        "Nothing else had changed.",
        "My investments hadn't disappeared. The value of houses hadn't fallen.",
        "What changed was my appreciation for the income that made those things possible in the first place.",
        "I've never forgotten that.",
        "Whenever I think about improving my finances, I still come back to the same question.",
        "How can I become a little more valuable than I was last year?",
        "Because the greatest investment I've ever made wasn't my first investment account.",
        "It was continuing to invest in the person earning the money to build it.",
        "Your house may become more valuable. Your investments may grow. Your savings account may get larger.",
        "But the asset that gives every one of them a chance to exist is still the person who earns the next paycheck.",
        "Take care of the person earning your paycheck.",
        "Everything else has a better chance of taking care of itself.",
      ],
    },
  ],
};const TWENTY_EIGHTH_ARTICLE = {
  id: "the-years-when-compound-interest-feels-like-nothing",
  title: "The Years When Compound Interest Feels Like Nothing",
  summary:
    "The early years of investing can feel slow, but those quiet years build the foundation that makes compound growth visible later.",
  image: "/article-compound-interest-quiet-years.png",
  readTime: "5 min read",
  category: "Investing",
  kicker: "INVESTING · COMPOUNDING · PATIENCE",
  alt:
    "Man reviewing investment performance papers at a kitchen table beside a laptop",
  caption:
    "The quiet years are where the habit and foundation are built.",
  quote: {
    strong: "Those quiet years were never wasted.",
    text: "They were building the foundation.",
  },

  sections: [
    {
      heading: "The hard part",
      paragraphs: [
        "The hardest part of investing is not getting started.",
        "It's continuing when it feels like nothing is happening.",
        "Compound interest is usually explained with a chart.",
        "Your money earns a return.",
        "That return stays invested.",
        "Then it begins earning money too.",
        "Given enough time, your investments may eventually earn more in a year than you contribute.",
        "That's the exciting part.",
        "What people rarely talk about are the years before that happens.",
        "The years when you keep investing, open your account, and wonder if any of it is making a difference.",
      ],
    },
    {
      heading: "In the beginning, you do most of the work",
      paragraphs: [
        "Early on, most of your growth comes from your own contributions.",
        "Imagine you invest $2,000 over the course of a year and your account earns $100.",
        "The following year, you invest another $2,000, but the market falls.",
        "Your balance may barely change even though you kept doing everything right.",
        "That can feel frustrating.",
        "Not because the plan stopped working.",
        "Because the account is still too small for compound growth to stand out.",
        "A 6 percent return on $5,000 is only $300.",
        "The same return on $100,000 is $6,000.",
        "The percentage never changed.",
        "The balance did.",
        "Before your investments can do more of the work, you have to build something worth compounding.",
      ],
    },
    {
      heading: "Boring is usually a good sign",
      paragraphs: [
        "There isn't much excitement in long term investing.",
        "You contribute.",
        "You buy the investment.",
        "Then you leave it alone.",
        "You repeat that over and over.",
        "There are no dramatic moves.",
        "No perfect timing.",
        "No exciting story to tell.",
        "It almost feels too ordinary to matter.",
        "But that's exactly how many large investment accounts are built.",
        "The results show up years after the habit is established.",
      ],
    },
    {
      heading: "Markets will test your patience",
      paragraphs: [
        "Compound interest is often shown as a smooth curve.",
        "Real life looks nothing like that.",
        "Markets rise.",
        "Markets fall.",
        "Sometimes your account grows quickly.",
        "Sometimes it gives back months of gains.",
        "That doesn't mean the plan failed.",
        "It means investing has never moved in a straight line.",
        "This is also why money you'll need in the next few years shouldn't be invested as though time will solve every problem.",
        "Investments need time to grow.",
        "Sometimes they also need time to recover.",
      ],
    },
    {
      heading: "Doing less is often the harder choice",
      paragraphs: [
        "When markets become unpredictable, it's easy to feel like you should be doing something.",
        "Changing investments.",
        "Reading predictions.",
        "Moving money around.",
        "But activity and progress are not the same thing.",
        "Sometimes the best decision is to keep following the plan you already made.",
        "Keep contributing.",
        "Keep costs low.",
        "Keep enough cash set aside that you won't be forced to sell investments when life gets expensive.",
        "Your investments may change every day.",
        "Your plan doesn't have to.",
      ],
    },
    {
      heading: "One day the math changes",
      paragraphs: [
        "For years, your contributions may account for most of your growth.",
        "Then something interesting happens.",
        "Your investments earn $1,000.",
        "Later they earn $3,000.",
        "Then maybe $8,000.",
        "Eventually there may be a year when your account earns more than you contributed.",
        "Nothing magical happened.",
        "You simply reached the point where your balance became large enough for compound growth to become noticeable.",
        "Those quiet years were never wasted.",
        "They were building the foundation.",
      ],
    },
    {
      heading: "Don't underestimate the quiet years",
      paragraphs: [
        "The early years are the least exciting part of investing.",
        "They're also the most important.",
        "This is where you build the habit.",
        "This is where you learn not to panic during market declines.",
        "This is where you prove to yourself that consistency matters more than excitement.",
        "One day you'll probably look back and realize the hardest part wasn't choosing an investment.",
        "It was believing in the process before the results were obvious.",
        "Until then, slow progress is still progress.",
        "Every payday is a decision.",
        "Choose yours.",
      ],
    },
  ],
};
   
    const TWENTY_NINTH_ARTICLE = {
  id: "how-to-spot-an-investment-scam-before-it-costs-you-everything",
  title: "How to Spot an Investment Scam Before It Costs You Everything",
  summary:
    "Scams change, but the way they earn your trust rarely does. Learning how scammers think can help protect the money you worked so hard to build.",
  image: "/article-investment-scam.png",
  readTime: "5 min read",
  category: "Investing",
  kicker: "INVESTING · PROTECTION · SCAMS",
  alt: "A laptop with a warning symbol beside investment documents",
  caption: "Investment scams rarely begin with money. They begin with trust.",
  quote: {
    strong: "Making money takes years.",
    text: "Losing it can happen in a single conversation.",
  },

  sections: [
    {
      heading: "Protecting what you build",
      paragraphs: [
        "Most of us spend our working lives learning how to earn money.",
        "Very few of us spend much time learning how to protect it.",
        "We probably should.",
        "Investment scams don't usually begin with someone asking for your money.",
        "They begin with someone earning your trust.",
        "I didn't fully understand that until it almost happened to me.",
      ],
    },

    {
      heading: "It happened to me",
      paragraphs: [
        "Years ago, I worked with one of the nicest coworkers you could imagine.",
        "She was kind, thoughtful, and open about her faith.",
        "We often talked about our families, and sometimes she'd share a Bible verse that had encouraged her.",
        "I still remember one conversation where she asked me whether it was safe to buy a tablet online.",
        "She wasn't impulsive.",
        "She was careful.",
        "Eventually she retired.",
        "Like many former coworkers, we stayed connected on Facebook but rarely spoke.",
        "Then one day, completely out of the blue, I received a message from her.",
        "We caught up on life for a while.",
        "Then she asked whether I'd ever thought about investing in Bitcoin.",
        "I stopped reading.",
        "Not because there was anything wrong with Bitcoin.",
        "Because it didn't sound like her.",
        "I remember thinking, 'Is this really the same woman who once asked me if it was safe to buy a tablet online?'",
        "A little while later, I found out she was on vacation and her Facebook account had been compromised.",
        "The person messaging me wasn't my former coworker.",
        "It was a scammer using her name, her photograph, and the trust she'd spent a lifetime earning.",
        "I remember sitting there thinking...",
        "\"I had just been catfished.\"",
        "Not for a relationship.",
        "For an investment.",
        "That's when something clicked.",
        "The Bitcoin wasn't the first scam.",
        "The first scam was convincing me I was talking to someone I already trusted.",
        "Everything that followed depended on that one lie.",
      ],
    },{
  heading: "Did you catch them in a lie?",
  paragraphs: [
    "That experience left me with one question I still ask today.",
    "\"Did I catch them in a lie?\"",
    "Not a big lie.",
    "A small one.",
    "Maybe they claimed to work for a company they didn't.",
    "Maybe they gave you a name that wasn't really theirs.",
    "Maybe they said they were licensed but couldn't prove it.",
    "Maybe they guaranteed a return.",
    "Maybe they insisted there was no risk.",
    "Maybe they told you there were only a few hours left to decide.",
    "Most people brush those things aside.",
    "I don't.",
    "Because if someone lies about one thing, why would I trust them with my money?",
    "I've learned to pay attention when the story stops making sense.",
    "The details don't line up.",
    "The answers become vague.",
    "Something feels rehearsed.",
    "Most of us have experienced that feeling.",
    "The mistake is ignoring it."
  ],
},
{
  heading: "Real investing doesn't promise certainty",
  paragraphs: [
    "Think about the people who manage money for a living.",
    "Not influencers.",
    "Not people renting exotic cars for social media videos.",
    "Real portfolio managers.",
    "Many have spent decades studying economics, accounting, business, and financial markets.",
    "Some manage hundreds of millions of dollars.",
    "Others manage billions.",
    "Even with all of that knowledge and experience, they still can't tell you what the market will do next year.",
    "Some years they'll outperform the market.",
    "Some years they won't.",
    "That's investing.",
    "So when someone you've just met promises guaranteed returns, no risk, or a secret investment almost nobody knows about, ask yourself one question.",
    "\"Why do they know something the world's best investors don't?\"",
    "The answer is usually simple.",
    "They don't.",
    "They're selling certainty because certainty is easier to sell than honesty."
  ],
},
{
  heading: "Professional scammers study people",
  paragraphs: [
    "We often picture scammers sitting behind old computers sending thousands of emails and hoping someone replies.",
    "Some do.",
    "But the successful ones are professionals.",
    "This is their career.",
    "Professional investors study markets.",
    "Professional scammers study people.",
    "They study what creates urgency.",
    "What builds trust.",
    "What gives people hope.",
    "They're not looking for foolish people.",
    "They're looking for moments when good people are hopeful, lonely, grieving, excited, or worried about their future.",
    "That's why they rarely begin by asking for your money.",
    "They begin by earning your confidence.",
    "Once they have that, asking for your money becomes much easier."
  ],
},{
  heading: "Slow down",
  paragraphs: [
    "I've never regretted waiting one more day before making a financial decision.",
    "I have regretted making one too quickly.",
    "Scammers almost always create urgency.",
    "\"This opportunity ends tonight.\"",
    "\"There are only a few spots left.\"",
    "\"Everyone else is already investing.\"",
    "\"Don't miss out.\"",
    "Pressure isn't proof.",
    "It's pressure.",
    "Whenever someone wants your money immediately, slow the conversation down.",
    "Go home.",
    "Sleep on it.",
    "Read about it.",
    "Ask questions.",
    "Talk to someone you trust.",
    "A legitimate investment should still make sense tomorrow.",
    "A scam often won't survive the night."
  ],
},
{
  heading: "Understand what you're buying",
  paragraphs: [
    "Before I invest in anything, I try to answer three simple questions.",
    "How does it make money?",
    "Where does the return come from?",
    "Why should it become more valuable over time?",
    "If I can't explain the answers in plain English, I keep asking questions.",
    "If nobody can explain them, I walk away.",
    "There will always be another investment.",
    "There may not be another chance to recover your savings."
  ],
},
{
  heading: "Verify first. Invest second.",
  paragraphs: [
    "Trust should never replace verification.",
    "If someone claims to be licensed, check.",
    "If they say they work for a well-known company, contact that company using the phone number on its official website.",
    "Not the number they gave you.",
    "Not the link they sent you.",
    "If you're in Canada, you can verify whether an individual or firm is registered to sell investments through the Canadian Securities Administrators' National Registration Search.",
    "A legitimate investment professional won't be offended because you asked questions.",
    "They should expect you to."
  ],
},
{
  heading: "One final thought",
  paragraphs: [
    "Making money takes years.",
    "Sometimes decades.",
    "Protecting it deserves just as much attention.",
    "The biggest lesson I learned wasn't about Bitcoin.",
    "It was about trust.",
    "Someone had borrowed the trust my former coworker spent a lifetime earning.",
    "They hoped that trust would stop me from asking questions.",
    "It didn't.",
    "Now, whenever someone presents an incredible investment opportunity, I don't look at the promised return first.",
    "I look at the person.",
    "I listen carefully.",
    "I pay attention to the details.",
    "And I ask myself one question.",
    "\"Did I catch them in a lie?\"",
    "If the answer is yes, the conversation is over.",
    "Because if someone is willing to lie to earn your trust, they've already told you everything you need to know.",
    "Your money deserves more than promises.",
    "It deserves proof."
          ],
    },
  ],
};

const THIRTIETH_ARTICLE = {
  id: "the-safest-envelope-is-at-the-bank",
  title: "The Safest Envelope Is at the Bank",
  summary:
    "Cash can feel safe when it is close by, but long-term savings deserve more protection than a hiding place can offer.",
  image: "/article-safest-envelope-bank.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · SAFETY · PROTECTION",
  alt: "A bank envelope, savings account record, and a small stack of cash on a desk",
  caption: "Long-term savings deserve records, interest, and protection.",
  quote: {
    strong: "Some things take years to save...",
    text: "and only seconds to lose.",
  },

  sections: [
    {
      heading: "Some things take years to save",
      paragraphs: [
        "Some things take years to save.",
        "An emergency fund.",
        "A down payment.",
        "Money for retirement.",
        "Money for someone you love.",
        "They all have one thing in common.",
        "They can disappear much faster than they were earned.",
        "A friend told me a story years ago that I've never forgotten.",
        "Every time someone tells me they keep years of savings hidden somewhere in their house, I think about that morning.",
      ],
    },
    {
      heading: "The truck was gone",
      paragraphs: [
        "One morning she walked toward the garage to leave for work.",
        "Then she stopped.",
        "Her husband's work truck was gone.",
        "For a split second she wondered if he'd left early.",
        "Then she remembered.",
        "He was still asleep.",
        "She ran back into the house.",
        "\"Where's your truck?\"",
        "Still half asleep, he looked at her.",
        "\"What do you mean?\"",
        "\"It's gone.\"",
        "He was out of bed in seconds.",
        "They rushed outside together.",
        "The truck was gone.",
        "So were thousands of dollars' worth of tools inside it.",
        "Years of work had disappeared before breakfast.",
      ],
    },
    {
      heading: "Then they found the filing cabinet",
      paragraphs: [
        "As they walked around the property, something else caught their attention.",
        "The filing cabinet.",
        "It was sitting in the backyard.",
        "The drawers had been pulled open.",
        "Papers were scattered everywhere.",
        "The police later explained that thieves sometimes steal business records to commit identity fraud.",
        "Then they both thought about something else.",
        "The cash.",
        "She ran inside and checked the hiding place.",
        "It was empty.",
        "For years she had quietly tucked away every extra dollar she could.",
        "She wasn't saving for a vacation.",
        "She was saving to buy an electric wheelchair for her father as his health continued to decline.",
        "Insurance helped replace some of the value of the truck and tools.",
        "It couldn't replace the cash.",
        "Years of sacrifice disappeared in a single night.",
      ],
    },
    {
      heading: "I almost ignored the lesson",
      paragraphs: [
        "I'd like to tell you her story changed me immediately.",
        "It didn't.",
        "I convinced myself my situation was different.",
        "So I kept doing what I'd always done.",
        "I rolled up cash, tucked it into the broom closet, and told myself nobody would ever think to look there.",
        "Every now and then I'd take it out, count it, smile, and hide it again.",
        "It felt safe.",
        "Looking back, I realize what really felt safe wasn't the hiding place.",
        "It was the illusion that nothing bad would ever happen.",
      ],
    },
    {
      heading: "Then someone found it",
      paragraphs: [
        "One day some family came to stay.",
        "While I was out, they decided to surprise me by cleaning the house.",
        "When I got home they were smiling.",
        "\"We found your stash!\" one of them laughed.",
        "I laughed too.",
        "But inside, one thought immediately crossed my mind.",
        "If people trying to help me could find it...",
        "Who else could?",
        "A burglar.",
        "A contractor.",
        "A visitor.",
        "Someone cleaning the house with the best of intentions.",
        "My hiding place suddenly didn't feel nearly as clever as I thought it was.",
      ],
    },
    {
      heading: "Long-term savings deserve protection",
      paragraphs: [
        "Cash envelopes can be incredibly useful.",
        "They're one of the simplest ways to manage everyday spending.",
        "Groceries.",
        "Entertainment.",
        "Eating out.",
        "But that's very different from storing years of savings.",
        "If you're saving for retirement...",
        "A down payment...",
        "Your child's education...",
        "Or something deeply personal, like an electric wheelchair for someone you love...",
        "Those dollars represent more than money.",
        "They represent overtime worked.",
        "Vacations postponed.",
        "Little luxuries passed up.",
        "Thousands of ordinary decisions to put tomorrow ahead of today.",
        "Years of sacrifice deserve more than a clever hiding place.",
        "They deserve to survive the worst day of your life.",
      ],
    },
    {
      heading: "The safest envelope I own",
      paragraphs: [
        "That experience changed the way I think about saving.",
        "A savings account isn't just somewhere to store money.",
        "It's protection.",
        "Every deposit leaves a record.",
        "Every dollar is where I expect it to be.",
        "My savings have the opportunity to earn interest.",
        "Depending on the financial institution and the type of account, they may also be protected by deposit insurance.",
        "Most importantly, my future no longer depends on hoping nobody opens the right drawer or looks in the right closet.",
        "The safest envelope I own isn't hidden in my house.",
        "It's at my bank.",
      ],
    },
    {
      heading: "One final thought",
      paragraphs: [
        "Some things take years to save.",
        "An emergency fund.",
        "A down payment.",
        "Money for retirement.",
        "Money set aside for someone you love.",
        "Whatever you're building, don't let years of sacrifice depend on the hope that nobody opens the right drawer.",
        "Because some things take years to save...",
        "and only seconds to lose.",
      ],
    },
  ],
};

const ELEVENTH_ARTICLE = {
  id: "the-safest-envelope-is-at-the-bank",
  title: "The Safest Envelope Is at the Bank",
  summary:
    "Cash can feel safe when it is close by, but long-term savings deserve more protection than a hiding place can offer.",
  image: "/article-safest-envelope-bank.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · SAFETY · PROTECTION",
  alt: "A bank envelope, savings account record, and a small stack of cash on a desk",
  caption: "Long-term savings deserve records, interest, and protection.",
  quote: {
    strong: "Some things take years to save...",
    text: "and only seconds to lose.",
  },

  sections: [
    {
      heading: "Some things take years to save",
      paragraphs: [
        "Some things take years to save.",
        "An emergency fund.",
        "A down payment.",
        "Money for retirement.",
        "Money for someone you love.",
        "They all have one thing in common.",
        "They can disappear much faster than they were earned.",
        "A friend told me a story years ago that I've never forgotten.",
        "Every time someone tells me they keep years of savings hidden somewhere in their house, I think about that morning.",
      ],
    },
    {
      heading: "The truck was gone",
      paragraphs: [
        "One morning she walked toward the garage to leave for work.",
        "Then she stopped.",
        "Her husband's work truck was gone.",
        "For a split second she wondered if he'd left early.",
        "Then she remembered.",
        "He was still asleep.",
        "She ran back into the house.",
        "\"Where's your truck?\"",
        "Still half asleep, he looked at her.",
        "\"What do you mean?\"",
        "\"It's gone.\"",
        "He was out of bed in seconds.",
        "They rushed outside together.",
       "The truck was gone.",
      "So were thousands of dollars' worth of tools inside it.",
"They thought that was the end of it.",
"Then something else caught their attention.",
   ],
},
{
  heading: "Then they found the filing cabinet",
    paragraphs: [
      "As they walked around the property, something else caught their attention.",
      "The filing cabinet.",
      "It was sitting in the backyard.",
      "The drawers had been pulled open.",
      "Papers were scattered everywhere.",
      "The police later explained that thieves sometimes steal business records to commit identity fraud.",
      "Then they both thought about something else.",
      "The cash.",
      "She ran inside and checked the hiding place.",
      "It was empty.",
      "For years she had quietly tucked away every extra dollar she could.",
      "She wasn't saving for a vacation.",
      "She was saving to buy an electric wheelchair for her father as his health continued to decline.",
      "Insurance helped replace some of the value of the truck and many of the tools.",
      "It couldn't replace the cash.",
      "Years of sacrifice disappeared in a single night.",
        ],
},
{
  heading: "I almost ignored the lesson",
  paragraphs: [
    "I'd like to tell you her story changed me immediately.",
    "It didn't.",
    "I convinced myself my situation was different.",
    "I didn't own a business.",
    "I didn't have thousands of dollars' worth of tools sitting in a garage.",
    "So I kept doing what I'd always done.",
    "I rolled up cash, tucked it into the broom closet, and told myself nobody would ever think to look there.",
    "Every now and then I'd take it out, count it, smile, and hide it again.",
    "It felt safe.",
    "Looking back, I realize what really felt safe wasn't the hiding place.",
    "It was the illusion that nothing bad would ever happen."
  ],
},
{
 
  heading: "I almost ignored the lesson",
  paragraphs: [
    "I'd like to tell you her story changed me immediately.",
    "It didn't.",
    "I convinced myself my situation was different.",
    "I didn't own a business.",
    "I didn't have thousands of dollars' worth of tools sitting in a garage.",
    "So I kept doing what I'd always done.",
    "I rolled up cash, tucked it into the broom closet, and told myself nobody would ever think to look there.",
    "Every now and then I'd take it out, count it, smile, and hide it again.",
    "It felt safe.",
    "Looking back, I realize what really felt safe wasn't the hiding place.",
    "It was the illusion that nothing bad would ever happen."
  ],
},
{
  heading: "Then someone found it",
  paragraphs: [
    "One day some family came to stay.",
    "While I was out, they decided to surprise me by cleaning the house.",
    "When I got home they were smiling.",
    "\"We found your stash!\" one of them laughed.",
    "I laughed too.",
    "What else could I do?",
    "But inside, one thought immediately crossed my mind.",
    "If people trying to help me could find it...",
    "Who else could?",
    "A burglar.",
    "A contractor.",
    "A visitor.",
    "Even someone cleaning the house with the best of intentions.",
    "My hiding place suddenly didn't feel nearly as clever as I thought it was."
  ],
},
{
  heading: "Long-term savings deserve protection",
  paragraphs: [
    "Cash envelopes can be incredibly useful.",
    "I still think they're one of the simplest ways to manage everyday spending.",
    "Groceries.",
    "Entertainment.",
    "Eating out.",
    "Giving every dollar a job before payday arrives.",
    "But that's very different from storing years of savings.",
    "If you're saving for retirement...",
    "A down payment...",
    "Your child's education...",
    "Or something deeply personal, like an electric wheelchair for someone you love...",
    "Those dollars represent more than money.",
    "They represent overtime worked.",
    "Vacations postponed.",
    "Little luxuries passed up.",
    "Thousands of ordinary decisions to put tomorrow ahead of today.",
    "Years of sacrifice deserve more than a clever hiding place.",
    "They deserve to survive the worst day of your life."
  ],
},
{
  heading: "The safest envelope I own",
  paragraphs: [
    "Today, I still think about my friend's story.",
    "I still remember the filing cabinet sitting open in the backyard.",
    "I still remember hearing about the empty hiding place.",
    "Those images changed the way I think about saving.",
    "A savings account isn't just somewhere to store money.",
    "It's where my paydays leave a history.",
    "Every deposit is recorded.",
    "My savings have the opportunity to earn interest.",
    "Depending on the financial institution and the type of account, they may also be protected by deposit insurance.",
    "Most importantly, they're protected from the simple risk of someone finding the place I thought nobody else would ever look.",
    "The safest envelope I own isn't hidden in my house.",
    "It's at my bank."
  ],
},
{
  heading: "One final thought",
  paragraphs: [
    "Some things take years to save.",
    "An emergency fund.",
    "A down payment.",
    "A retirement account.",
    "Money set aside for someone you love.",
    "Whatever you're building, don't let years of sacrifice depend on the hope that nobody opens the right drawer.",
    "Because some things take years to save...",
    "and only seconds to lose."
  ],
},
{
  heading: "The safest envelope I own",
  paragraphs: [
    "That was the day my thinking changed.",
    "I stopped looking at a savings account as just another bank account.",
    "I started seeing it as protection.",
    "Every deposit leaves a record.",
    "Every dollar is exactly where I expect it to be.",
    "My savings have a chance to earn interest instead of sitting idle.",
    "Depending on the financial institution and the type of account, they may also be protected by deposit insurance.",
    "Most importantly, my future no longer depends on hoping nobody opens the right drawer or looks in the right closet.",
    "The safest envelope I own isn't hidden in my house.",
    "It's at my bank."
         ],
        },
      ],
    };
    const THIRTY_FIRST_ARTICLE = {
  id: "the-day-your-credit-score-speaks-before-you-do",
  title: "The Day Your Credit Score Speaks Before You Do",
  summary:
    "Your credit score is a quiet financial reputation, built through ordinary decisions long before you need it to open an important door.",
  image: "/article-credit-score-speaks.png",
  readTime: "5 min read",
  category: "Financial basics",
  kicker: "FINANCIAL BASICS · CREDIT · REPUTATION",
  alt: "A banker helping a customer review mortgage paperwork at a desk",
  caption:
    "The financial reputation you build quietly today may open an important door years from now.",
  quote: {
    strong: "I thought I was building credit.",
    text: "Looking back, I was really building a reputation.",
  },
  sections: [
    {
      heading: "Where my financial reputation began",
      paragraphs: [
        "When I was just starting out, I couldn't qualify for a traditional credit card.",
        "I didn't have bad credit.",
        "I simply didn't have much of a credit history.",
        "So I opened what I remember being called a secured credit card.",
        "I put down a deposit, and that became my credit limit.",
        "It wasn't exciting.",
        "It wasn't a sign that I had made it.",
        "It was simply where my financial reputation began.",
        "At the time, I wasn't thinking about buying a house.",
        "I wasn't thinking about mortgages or interest rates.",
        "I was just trying to make good decisions with the opportunity I had.",
        "I used the card carefully and paid the balance in full.",
        "I thought I was building credit.",
        "Looking back, I was really building a reputation.",
      ],
    },
    {
      heading: "The reputation nobody sees",
      paragraphs: [
        "Most reputations are public.",
        "People talk about them.",
        "Your friends know them.",
        "Your coworkers may know them.",
        "A financial reputation is different.",
        "It is almost completely invisible.",
        "No one whispers about your credit score.",
        "Your neighbours don't know your payment history.",
        "Your friends probably don't know whether your credit is excellent, poor, or somewhere in between.",
        "It stays quietly in the background while you live your life.",
        "Until one day, it matters.",
        "You apply for a mortgage.",
        "You want to rent an apartment.",
        "You finance a vehicle.",
        "You need to borrow money.",
        "In some situations, a credit check may even be part of a job application.",
        "Suddenly, the reputation nobody could see becomes difficult to ignore.",
        "Before you have explained your plans or told anyone your story, your financial history has already introduced you.",
      ],
    },
    {
      heading: "The day it mattered",
      paragraphs: [
        "Years after opening that secured credit card, I sat in a bank applying for my first mortgage.",
        "The banker handed me a form authorizing her to check my credit.",
        "I signed it.",
        "Then she stood up and left the office.",
        "For a few minutes, there was nothing I could do but wait.",
        "When she returned, she was smiling.",
        "\"You have great credit,\" she said.",
        "The tension disappeared almost instantly.",
        "The conversation lasted less than five minutes.",
        "The reputation behind it had taken years to build.",
        "That was when the importance of those earlier decisions became clear.",
        "The little secured card I had opened when I was starting out had become the beginning of something much larger.",
        "It had helped me establish a history.",
        "That history had built trust.",
        "Years later, that trust helped me buy my own home.",
      ],
    },
    {
      heading: "More than a number",
      paragraphs: [
        "A credit score is not a measure of your worth.",
        "It does not tell anyone whether you are generous, hardworking, intelligent, or kind.",
        "It reflects part of your financial history.",
        "Those are two very different things.",
        "A lender does not know every circumstance behind every decision you have made.",
        "They may not know how hard you have worked or what you have overcome.",
        "They see the record available to them.",
        "Your credit report tells the longer story.",
        "Your credit score summarizes part of it.",
        "Together, they help answer the question that matters to the person considering your application.",
        "\"Based on this person's history, can we trust them to repay what they borrow?\"",
        "That is why the number can influence whether you are approved, how much you can borrow, and what interest rate you may be offered.",
        "The score itself is not the opportunity.",
        "It is one of the things that may help determine whether the opportunity opens.",
      ],
    },
    {
      heading: "Long before you need it",
      paragraphs: [
        "Some people choose not to use credit.",
        "Others believe you should not pay much attention to a credit score.",
        "I am not here to settle that debate.",
        "I am simply telling you what happened in my own life.",
        "The financial reputation I began building with a small secured credit card eventually helped me qualify for a mortgage.",
        "When I opened that account, I could not have imagined where it might lead.",
        "That is often how financial decisions work.",
        "Their importance is not always obvious when you make them.",
        "Paying a bill on time can feel routine.",
        "Keeping a balance manageable may not feel like an accomplishment.",
        "Waiting to buy something until you can afford it rarely earns applause.",
        "But those ordinary decisions can become part of a history you may rely on later.",
        "A financial reputation is usually built long before anyone asks to see it.",
      ],
    },
    {
      heading: "The doors you cannot see yet",
      paragraphs: [
        "When I filled out the paperwork for that secured credit card, I thought I was opening an account.",
        "Looking back, I was opening a door that would not fully reveal itself for years.",
        "It is easy to believe today's payment does not matter.",
        "It is easy to think one responsible decision will not change anything.",
        "Usually, one decision does not.",
        "But one decision becomes another.",
        "Then another.",
        "Over time, those choices begin to form a history.",
        "Years from now, you may find yourself sitting across from someone who is deciding whether to offer you a home, a loan, a vehicle, or another opportunity you cannot yet imagine.",
        "When that moment arrives, some of the decisions you make today may already have helped open the door.",
      ],
    },
  ],
};
const THIRTY_SECOND_ARTICLE = {
  id: "debt-grows-best-in-the-dark",
  title: "Debt Grows Best in the Dark",
  summary:
    "Years ago, a manager taught me that financial problems are easier to address when people keep talking instead of disappearing.",
  image: "/article-debt-grows-dark.png",
  readTime: "4 min read",
  category: "Debt",
  kicker: "DEBT · COMMUNICATION · COMPASSION",
  alt: "A telephone and an overdue heating bill resting on an office desk",
  caption:
    "The person calling about the account will eventually go home. The person carrying the debt still has to live with it.",
  quote: {
    strong: "Most of the time...",
    text: "we just wanted people to answer the phone.",
  },
  sections: [
    {
      heading: "Nobody freezes to death",
      paragraphs: [
        "Many years ago, I worked managing accounts receivable for a heating oil company.",
        "People ordered heating oil, received their deliveries, and paid their bills. Most accounts took care of themselves. Some did not, and those became my responsibility.",
        "On my first day, my manager explained how the job worked. Then he gave me one instruction I have never forgotten.",
        "\"This is our job,\" he said. \"Remember, nobody freezes to death.\"",
        "I knew exactly what he meant.",
        "Collect the money. Do your job. But do not hurt anyone doing it.",
        "We were not going to become the company on the evening news because someone had lost their heat in the middle of winter.",
        "The account still had to be dealt with. We simply had to remember that there was a person attached to it.",
      ],
    },
    {
      heading: "The calls we wanted",
      paragraphs: [
        "Before working there, I assumed people in Accounts Receivable spent their days chasing money.",
        "The truth was much less dramatic.",
        "Most of the time, we just wanted people to answer the phone.",
        "When someone called and explained what was happening, the conversation was usually straightforward.",
        "Maybe payday was still a week away. Maybe an unexpected expense had thrown everything off. Maybe they simply needed a little more time.",
        "We would make a note on the account, explain what could be done within company policy, delay the next step when appropriate, and move on to the next file.",
        "Nobody sat at their desk hoping to make a customer's life worse.",
        "We had work to do, and hearing from the customer usually made that work easier.",
      ],
    },
    {
      heading: "The customers I cannot remember",
      paragraphs: [
        "I tried to remember a particular customer from those years while writing this.",
        "I could not.",
        "Not because the conversations did not matter, but because they were not my life.",
        "To me, each account was one part of a workday. I answered the phone, updated the file, explained the available options, and moved on.",
        "At the end of the day, I shut down my computer and went home.",
        "The customers were still living with the bill.",
        "They were still wondering how they would pay it. They were still carrying the stress that I had left behind at the office.",
        "The person collecting the debt was rarely thinking about it over dinner.",
        "The person who owed it often was.",
      ],
    },
    {
      heading: "The silent accounts",
      paragraphs: [
        "The hardest accounts were not always the ones with the largest balances.",
        "They were the silent ones.",
        "The calls went unanswered. The statements were ignored. The customer disappeared.",
        "That did not make the account disappear.",
        "It only meant there was less information, less time, and often less room to help.",
        "The balance could continue to grow. The account could move further through the collection process. Options that may have existed earlier could become harder to offer later.",
        "Not because someone in the office had become personally invested in punishing the customer.",
        "The process simply kept moving when no one interrupted it with a conversation.",
      ],
    },
    {
      heading: "The conversation feels bigger than it is",
      paragraphs: [
        "People often avoid financial calls because they imagine a confrontation waiting on the other end.",
        "Sometimes the conversation may be uncomfortable. Some companies and collectors are more difficult than others.",
        "But many of the people answering those calls are simply working through a list.",
        "They want to know whether a payment is coming, whether something has changed, or whether the account needs to be handled differently.",
        "Once the call ends, they update the file and move on.",
        "The customer is the one who carries the fear before the call and the consequences after it.",
        "That is why silence usually costs the customer more than it costs the company.",
      ],
    },
    {
      heading: "Before the problem gets bigger",
      paragraphs: [
        "That job changed the way I think about overdue bills.",
        "Calling does not guarantee that a payment will be delayed or that every problem can be fixed. There are limits, policies, and consequences.",
        "But communication gives both sides something to work with.",
        "It may lead to a payment arrangement, a short extension, a clear explanation of what happens next, or simply a note showing that the customer has not disappeared.",
        "Even when the answer is not the one you hoped for, knowing where you stand is better than allowing fear to make every decision for you.",
        "Problems are easier to address while there are still choices available.",
      ],
    },
    {
      heading: "The instruction I remember",
      paragraphs: [
        "I do not remember the account numbers.",
        "I do not remember the balances.",
        "I do not remember the names of the customers I spoke with.",
        "I remember what my manager told me on my first day.",
        "\"Remember, nobody freezes to death.\"",
      ],
    },
  ],
};
    
   const THIRTY_THIRD_ARTICLE = {
  id: "the-language-of-money",
  title: "The Language of Money",
  summary:
    "For years I was surrounded by conversations about investing without realizing they mattered to me. The biggest barrier wasn't money. It was vocabulary.",
  image: "/article-language-of-money.png",
  readTime: "5 min read",
  category: "Financial Basics",
  kicker: "FINANCIAL BASICS · LEARNING · OPPORTUNITY",
  alt: "Television showing stock prices while coworkers discuss the markets",
  caption:
    "Sometimes opportunity isn't hidden. We simply don't understand the language being spoken.",
  quote: {
    strong: "You can't recognize an opportunity...",
    text: "until you understand the language surrounding it.",
  },
  sections: [
    {
      heading: "The conversations I ignored",
      paragraphs: [
        "For years, I worked in an office where stock prices were everywhere.",
        "The television in the lunchroom always seemed to be tuned to a business channel.",
        "A ticker crawled across the bottom of the screen all day.",
        "\"Buy.\"",
        "\"Sell.\"",
        "Company names.",
        "Stock symbols.",
        "Numbers changing every few seconds.",
        "Around me, people talked about shares, dividends, earnings, and markets as casually as they talked about the weather.",
        "I heard the conversations.",
        "I watched the television.",
        "I ignored all of it.",
        "Not because I thought investing was a bad idea.",
        "I simply assumed it wasn't relevant to me.",
      ],
    },
    {
      heading: "A language I didn't speak",
      paragraphs: [
        "The conversations sounded like another language.",
        "\"The market is bullish.\"",
        "\"I'm buying another ETF.\"",
        "\"That company just increased its dividend.\"",
        "Everyone else seemed to understand.",
        "I didn't.",
        "So I stayed quiet.",
        "Looking back, I wasn't avoiding investing.",
        "I was avoiding embarrassment.",
        "It's easier to stay silent than admit you don't understand something.",
      ],
    },
    {
      heading: "The mistake I made",
      paragraphs: [
        "For years, I thought investing wasn't for people like me.",
        "That wasn't because of money.",
        "It was because of vocabulary.",
        "Every unfamiliar word convinced me there was a world I wasn't part of.",
        "The truth was much simpler.",
        "I just hadn't learned the language yet.",
      ],
    },
    {
      heading: "One word at a time",
      paragraphs: [
        "Eventually I started looking things up.",
        "A bull market simply describes prices generally moving higher.",
        "A bear market describes prices generally moving lower.",
        "An ETF is simply a collection of investments you can buy together.",
        "A dividend is money some companies pay to their shareholders.",
        "The words sounded complicated.",
        "The ideas usually weren't.",
        "With every definition, the conversations around me became a little easier to follow.",
      ],
    },
    {
      heading: "The opportunity I couldn't see",
      paragraphs: [
        "The biggest lesson had nothing to do with bulls or bears.",
        "It was about opportunity.",
        "I had spent years surrounded by people talking about money.",
        "The information wasn't hidden.",
        "It was right in front of me every single day.",
        "I simply didn't understand enough of the language to recognize its value.",
        "Opportunity isn't always invisible.",
        "Sometimes it's simply untranslated.",
      ],
    },
    {
      heading: "Learning enough",
      paragraphs: [
        "You don't need a finance degree to understand money.",
        "You don't need to memorize hundreds of financial terms.",
        "You only need enough knowledge to ask the next question.",
        "Every word you learn makes the next conversation a little easier.",
        "Eventually you stop hearing jargon.",
        "You start hearing ideas.",
      ],
    },
    {
      heading: "The language of money",
      paragraphs: [
        "I still think about those televisions.",
        "The ticker never stopped scrolling.",
        "The conversations never stopped happening.",
        "For years, I watched them without realizing they were speaking to me too.",
        "The language of money isn't reserved for experts.",
        "Like every language, it is learned one word at a time.",
      ],
    },
  ],
};
const THIRTY_FOURTH_ARTICLE = {
  id: "your-house-is-not-your-retirement-plan",
  title: "Your House Is Not Your Retirement Plan",
  summary:
    "Owning a home can build wealth, but home equity is not the same as retirement income. Understanding the difference can lead to better long-term financial decisions.",
  image: "/article-house-retirement-plan.png",
  readTime: "5 min read",
  category: "Retirement",
  kicker: "RETIREMENT · HOME EQUITY · PLANNING",
  alt: "Older couple standing outside their home in a quiet neighbourhood",
  caption:
    "A home can become an important asset, but retirement usually needs more than a valuable house.",
  quote: {
    strong: "A valuable house doesn't automatically create retirement income.",
    text: "They're related, but they aren't the same thing.",
  },
  sections: [
    {
      heading: "My first place",
      paragraphs: [
        "When I left for university, I couldn't wait to have a place of my own.",
        "It was a small apartment that had seen better days.",
        "The kitchen was tiny.",
        "The carpet was worn.",
        "I eventually discovered I had a few mice for roommates.",
        "None of that mattered.",
        "For the first time, I had a place that felt like mine.",
        "Looking back, renting taught me something I didn't fully appreciate at the time.",
        "A home is where you live.",
        "Building wealth is a separate decision.",
      ],
    },
    {
      heading: "One house, two purposes",
      paragraphs: [
        "People often expect a house to do two jobs.",
        "First, it provides a place to live.",
        "Second, they hope it will build wealth.",
        "Sometimes it does both.",
        "Sometimes it doesn't.",
        "The mistake is assuming the second automatically follows the first.",
      ],
    },
    {
      heading: "Equity isn't income",
      paragraphs: [
        "Imagine retiring with a house worth two million dollars and very little invested anywhere else.",
        "On paper, you're wealthy.",
        "But the grocery store doesn't accept home equity.",
        "Neither does the pharmacy.",
        "The money is tied to the house.",
        "To use it, you may have to sell, downsize, or borrow against it.",
        "Those are perfectly reasonable choices for some people.",
        "But they are still choices, not guarantees.",
      ],
    },
    {
      heading: "The assumption",
      paragraphs: [
        "Many people never consciously decide to make their house their retirement plan.",
        "It happens slowly.",
        "The mortgage gets paid.",
        "Retirement savings get postponed.",
        "The house keeps rising in value.",
        "Eventually, the house becomes the plan.",
        "Whether that works depends on things nobody can control.",
        "Future home prices.",
        "Interest rates.",
        "The cost of the next place.",
        "Your willingness to move.",
      ],
    },
    {
      heading: "The part nobody talks about",
      paragraphs: [
        "Selling a house isn't always a financial decision.",
        "It's often an emotional one.",
        "It may be where you raised your children.",
        "Where you know every neighbour.",
        "Where your life happened.",
        "A retirement strategy shouldn't depend entirely on a decision that may be difficult to make when the time comes.",
      ],
    },
    {
      heading: "Renting isn't the answer either",
      paragraphs: [
        "None of this means renting is automatically better.",
        "Renters don't build home equity unless they buy something else.",
        "If the money saved by renting is simply spent, retirement becomes difficult for a different reason.",
        "Owning and renting both work.",
        "Owning and renting can both fail.",
        "The difference isn't the address.",
        "It's whether you're consistently building assets somewhere.",
      ],
    },
    {
      heading: "A better plan",
      paragraphs: [
        "A paid-off house can reduce your expenses.",
        "Investments can provide income.",
        "Savings can cover unexpected costs.",
        "A pension can provide stability.",
        "The strongest retirement plans rarely depend on one asset doing everything.",
      ],
    },
    {
      heading: "One question",
      paragraphs: [
        "Here's the question I would ask myself.",
        "\"If I never sold this house, would I still have enough to retire?\"",
        "Your answer tells you whether your home is one part of your retirement plan or the whole thing.",
      ],
    },
  ],
};
   
   const THIRTY_FIFTH_ARTICLE = {
  id: "the-best-financial-decision-is-the-one-you-only-make-once",
  title: "The Best Financial Decision Is the One You Only Make Once",
  summary:
    "Every payday comes with enough decisions already. Automating the important ones can make saving and investing more consistent, as long as you remember to check that everything is still working.",
  image: "/article-one-decision-once.png",
  readTime: "5 min read",
  category: "Saving",
  kicker: "SAVING · AUTOMATION · HABITS",
  alt: "Coffee, keys and a pay statement on a kitchen table before work",
  caption:
    "A good financial system removes unnecessary decisions without removing your attention.",
  quote: {
    strong: "Automation works best when you occasionally check the dashboard.",
    text: "Good systems still deserve a quick look once in a while.",
  },
  sections: [
    {
      heading: "Payday",
      paragraphs: [
        "Some paydays are exciting.",
        "Some are ordinary.",
        "Sometimes I don't even notice until I check my bank account.",
        "Other paydays bring something else entirely.",
        "Relief.",
        "The account isn't overdrawn anymore.",
        "The credit card gets paid.",
        "You can stop watching every purchase quite so closely.",
        "Whatever payday feels like, life usually moves on pretty quickly.",
      ],
    },
    {
      heading: "The promise I kept making",
      paragraphs: [
        "Mine usually sounded the same.",
        "\"I'll move some money into savings later.\"",
        "\"I'll make an extra payment on the credit card.\"",
        "\"I'll invest whatever is left.\"",
        "Sometimes I followed through.",
        "Often I didn't.",
        "Not because I didn't care.",
        "Because by the time later arrived, something else had become more important.",
      ],
    },
    {
      heading: "The thing I finally noticed",
      paragraphs: [
        "Then something obvious occurred to me.",
        "My employer deposited my pay automatically.",
        "My mortgage payment was automatic.",
        "My insurance came out automatically.",
        "My phone bill never forgot.",
        "Neither did my streaming subscriptions.",
        "The only payment still depending on my memory was the one going to my future.",
      ],
    },
    {
      heading: "One decision",
      paragraphs: [
        "So I stopped relying on motivation.",
        "I scheduled an automatic transfer for every payday.",
        "The money moved before I had the chance to spend it.",
        "I wasn't becoming more disciplined.",
        "I was simply removing one decision from a day that already had enough of them.",
      ],
    },
    {
      heading: "Trust, but verify",
      paragraphs: [
        "Automation isn't something you set up and forget forever.",
        "A while ago I noticed my credit card had built up a surprisingly large credit balance.",
        "Somehow I had been paying more than I needed to for months.",
        "It wasn't a disaster.",
        "I eventually got the money back.",
        "But it made me think.",
        "If I could accidentally overpay without noticing for that long...",
        "What if I had been underpaying instead?",
        "What if interest had been quietly building while I assumed everything was working?",
        "That experience changed the way I think about automation.",
        "I trust it.",
        "I just make a habit of checking that everything is still doing what I asked it to do.",
      ],
    },
    {
      heading: "One less decision",
      paragraphs: [
        "I still look forward to payday.",
        "Sometimes because it feels like progress.",
        "Sometimes because it feels like relief.",
        "The difference now is that saving no longer depends on how I feel that day.",
        "That decision was made a long time ago.",
        "Now I simply check in once in a while to make sure the system is still working the way I expect.",
      ],
    },
  ],
};
const THIRTY_SIXTH_ARTICLE = {
  id: "the-most-expensive-word-in-personal-finance-is-later",
  title: "The Most Expensive Word in Personal Finance Is 'Later'",
  summary:
    "Many expensive financial mistakes begin as small jobs we planned to do later. The longer they wait, the more likely they are to grow.",
  image: "/article-expensive-word-later.png",
  readTime: "5 min read",
  category: "Payday Philosophy",
  kicker: "PAYDAY PHILOSOPHY · PROCRASTINATION · MOMENTUM",
  alt: "A small chip spreading across a vehicle windshield",
  caption:
    "Small problems rarely announce when they're about to become expensive.",
  quote: {
    strong: "Most expensive problems start out surprisingly small.",
    text: "The mistake is believing they'll stay that way.",
  },
  sections: [
    {
      heading: "A tiny chip",
      paragraphs: [
        "A small rock hit my windshield one afternoon.",
        "It left a chip no bigger than a pencil eraser.",
        "I looked at it and thought, \"I'll deal with it later.\"",
        "For weeks it stayed exactly the same.",
        "Then one cold morning I turned on the defroster and watched a crack slowly spread across the glass.",
        "The repair I had been putting off had become a brand-new windshield.",
      ],
    },
    {
      heading: "Money has its own windshield chips",
      paragraphs: [
        "I've noticed personal finances have plenty of small jobs that feel just as easy to postpone.",
        "A credit card statement that should probably be reviewed.",
        "An insurance renewal sitting unopened.",
        "A subscription you meant to cancel.",
        "Updating an automatic payment.",
        "None of them feel urgent.",
        "That's exactly why they get pushed to another day.",
      ],
    },
    {
      heading: "Waiting changes the problem",
      paragraphs: [
        "The statement is still waiting next week.",
        "The renewal date still arrives.",
        "The subscription keeps charging.",
        "The problem doesn't disappear because I stopped looking at it.",
        "Sometimes it stays the same.",
        "Sometimes it quietly becomes more expensive.",
      ],
    },
    {
      heading: "I've done it too",
      paragraphs: [
        "I've told myself I'd deal with something after the weekend.",
        "After vacation.",
        "After work settled down.",
        "The problem is that life rarely settles down.",
        "There is always another email, another bill, another project competing for attention.",
      ],
    },
    {
      heading: "Five minutes",
      paragraphs: [
        "One habit has helped me more than any budgeting trick.",
        "If a financial task will take about five minutes, I try to do it now.",
        "Read the statement.",
        "Review the renewal.",
        "Cancel the subscription.",
        "Move the money.",
        "Book the appointment.",
        "Most of the time, the hardest part was simply starting.",
      ],
    },
    {
      heading: "Every time I say 'later'",
      paragraphs: [
        "I eventually replaced the windshield.",
        "It cost far more than repairing the original chip would have.",
        "Now, whenever I catch myself saying, \"I'll deal with it later,\" I think about that little crack spreading across the glass.",
      ],
    },
  ],
};
   const THIRTY_SEVENTH_ARTICLE = {
  id: "i-have-a-chequebook-somewhere",
  title: "I Have a Chequebook Somewhere",
  summary:
    "I never decided to stop using cheques. One day I simply realized I already had. It made me wonder what other financial habits I had stopped questioning.",
  image: "/article-chequebook-somewhere.png",
  readTime: "5 min read",
  category: "Financial Basics",
  kicker: "FINANCIAL BASICS · CHANGE · LEARNING",
  alt: "An old chequebook tucked into the back of a desk drawer",
  caption:
    "Some financial habits disappear quietly. Others stay because we never reconsider them.",
  quote: {
    strong: "I never decided to stop writing cheques.",
    text: "One day, I simply realized I already had.",
  },
  sections: [
    {
      heading: "Somewhere in a drawer",
      paragraphs: [
        "I have a chequebook somewhere.",
        "I'm just not exactly sure where.",
        "It used to live in the top drawer of my desk.",
        "Now it's probably buried in a filing cabinet, packed inside a moving box, or tucked into the back of a closet.",
        "The last cheque I clearly remember writing wasn't to pay anyone.",
        "I wrote one word across the front.",
        "\"VOID.\"",
        "The bank needed it so my pay could be deposited automatically.",
        "That may have been the last useful thing my chequebook ever did.",
      ],
    },
    {
      heading: "I never decided to stop",
      paragraphs: [
        "There wasn't a final cheque.",
        "There wasn't a moment when I announced I was finished with them.",
        "My pay began arriving by direct deposit.",
        "Bills moved to automatic withdrawal.",
        "Friends started asking for e-transfers.",
        "The chequebook stayed in the drawer a little longer each time.",
        "Eventually, I stopped opening the drawer.",
      ],
    },
    {
      heading: "Nothing was wrong with it",
      paragraphs: [
        "The chequebook didn't fail.",
        "It didn't become useless overnight.",
        "Something easier gradually took its place.",
        "That made me wonder how many financial habits stay with us for the opposite reason.",
        "Not because they still work well.",
        "Because nothing has forced us to reconsider them.",
      ],
    },
    {
      heading: "The habits we stop questioning",
      paragraphs: [
        "It is easy to leave money sitting in a chequing account because that is where it has always been.",
        "It is easy to avoid investing because it once seemed complicated.",
        "It is easy to renew the same insurance, bank account, or financial product without checking whether it still fits.",
        "None of those choices begin as obvious mistakes.",
        "They simply become familiar.",
      ],
    },
    {
      heading: "Familiar is not the same as useful",
      paragraphs: [
        "I don't think every new financial product deserves attention.",
        "Some deserve to disappear as quickly as they arrived.",
        "But familiarity is not proof that something still makes sense.",
        "Every so often, I try to ask myself one question.",
        "\"If I were starting from scratch today, would I still do it this way?\"",
      ],
    },
    {
      heading: "The drawer",
      paragraphs: [
        "I'll probably find that old chequebook someday.",
        "I doubt I'll throw it away.",
        "Not because I expect to use it again.",
        "Every now and then I think about that drawer.",
        "Not because of what's inside it.",
        "Because it makes me wonder what else in my financial life I've stopped opening.",
      ],
    },
  ],
};const THIRTY_EIGHTH_ARTICLE = {
  id: "the-drawer-full-of-phone-chargers",
  title: "The Drawer Full of Phone Chargers",
  summary:
    "Cleaning out a drawer full of old chargers made me realize how often I keep things—not because I need them, but because I might someday.",
  image: "/article-phone-chargers-drawer.png",
  readTime: "5 min read",
  category: "Payday Philosophy",
  kicker: "PAYDAY PHILOSOPHY · DECISIONS · SIMPLICITY",
  alt: "A drawer overflowing with old phone chargers and cables",
  caption:
    "Sometimes what we're really holding onto isn't the object. It's the possibility.",
  quote: {
    strong: "I wasn't keeping them because I needed them.",
    text: "I was keeping them because I thought I might someday.",
  },

  sections: [
    {
      heading: "The junk drawer",
      paragraphs: [
        "I recently learned you can get a little money for old phone chargers because of the copper inside them.",
        "It isn't much.",
        "Still, it sounded like a good excuse to finally clean out the electronics drawer.",
        "So I dumped everything onto the kitchen table.",
        "Phone chargers.",
        "USB cables.",
        "Old earbuds.",
        "Random adapters.",
        "A charger from a phone I haven't owned in years.",
        "A cable for a GPS that used to come on every road trip.",
        "Then I found four identical chargers.",
        "\"Why do I have four of these?\"",
      ],
    },

    {
      heading: "Four words",
      paragraphs: [
        "The answer came almost immediately.",
        "\"I might need it someday.\"",
        "I'd probably said those four words every time I tossed another charger into the drawer.",
        "Not because I expected to use it tomorrow.",
        "Because throwing it away felt like closing a door I wasn't ready to close.",
      ],
    },

    {
      heading: "It's rarely about the charger",
      paragraphs: [
        "As I stood there looking at that pile of cables, I realized those same four words had quietly followed me into other parts of my life.",
        "Not because I was disorganized.",
        "Because keeping something asks almost nothing of us.",
        "Letting it go asks us to decide.",
      ],
    },

    {
      heading: "Money has drawers too",
      paragraphs: [
        "The longer I thought about it, the more I wondered what was sitting in the financial version of that drawer.",
        "Not because I still needed it.",
        "Because I had never stopped to ask if I did.",
        "Sometimes we hold onto financial decisions for exactly the same reason we keep old chargers.",
        "Not because they're wrong.",
        "Because they've become familiar.",
      ],
    },

    {
      heading: "One question",
      paragraphs: [
        "Before I put everything back, I started asking one question.",
        "\"If I didn't already own this, would I keep it today?\"",
        "It's a harder question than it sounds.",
        "It turns out it has very little to do with chargers.",
      ],
    },

    {
      heading: "One charger",
      paragraphs: [
        "I recycled almost everything.",
        "Almost.",
        "I kept one charger.",
        "The embarrassing part is that I'm not even sure what it fits anymore.",
        "Apparently, 'I might need it someday' is harder to recycle than copper.",
      ],
    },
  ],
};
    const THIRTY_NINTH_ARTICLE = {
  id: "retirement-belonged-to-another-season",
  title: "Retirement Belonged to Another Season",
  summary:
    "Looking back, I wasn't ignoring retirement when I was younger. I was simply living a season where other financial questions mattered more.",
  image: "/article-financial-seasons.png",
  readTime: "5 min read",
  category: "Financial Basics",
  kicker: "FINANCIAL BASICS · LIFE STAGES · PERSPECTIVE",
  alt: "A quiet park bench beside a lake with trees beginning to change colour",
  caption: "The questions that matter change as life changes.",
  quote: {
    strong: "I didn't ignore retirement.",
    text: "I was simply living a different season.",
  },

  sections: [
    {
      heading: "Retirement felt like someone else's problem",
      paragraphs: [
        "When I was in my twenties, retirement barely crossed my mind.",
        "Not because I thought it wasn't important.",
        "It simply belonged to a different chapter of life.",
        "I was trying to make rent.",
        "Figure out my career.",
        "Keep enough money in my account until the next payday.",
        "If someone had asked how much I had saved for retirement, I probably would have laughed.",
        "I had more immediate problems to solve.",
      ],
    },

    {
      heading: "The questions changed",
      paragraphs: [
        "Years passed without me noticing.",
        "The things that worried me at twenty-five weren't the things that worried me at thirty-five.",
        "Or forty.",
        "Somewhere along the way I stopped wondering whether I could afford furniture and started wondering whether I was saving enough for the future.",
        "It didn't happen overnight.",
        "The questions simply changed.",
      ],
    },

    {
      heading: "Looking back",
      paragraphs: [
        "That's when something finally clicked.",
        "Money changes as life changes.",
        "When you're starting out, retirement can feel almost imaginary.",
        "Later, it doesn't.",
        "The things that deserve your attention naturally change as the years pass.",
      ],
    },

    {
      heading: "Comparison misses one thing",
      paragraphs: [
        "I used to look at people who seemed financially ahead of me.",
        "They owned homes.",
        "Their investments were growing.",
        "Everything looked more settled.",
        "What I didn't appreciate at the time was that many of them had simply been living that part of life longer than I had.",
        "We weren't answering the same financial questions yet.",
      ],
    },

    {
      heading: "A different season",
      paragraphs: [
        "Looking back, I don't wish I'd spent my twenties worrying more about retirement.",
        "I do wish I'd understood that the questions would eventually change.",
        "Rent became a mortgage.",
        "Paying bills became planning ahead.",
        "The future slowly stopped feeling so far away.",
      ],
    },

    {
      heading: "One final thought",
      paragraphs: [
        "The funny thing about seasons is that they don't announce themselves.",
        "One morning feels almost the same as the one before.",
        "Then you notice the leaves beginning to change.",
        "Life works like that too.",
        "One day you're saving for your first apartment.",
        "Years later you're wondering whether you've saved enough to stop working.",
        "I didn't become a different person.",
        "My season did.",
      ],
    },
  ],
};
    
    const FORTIETH_ARTICLE = {
  id: "the-potatoes-i-forgot-about",
  title: "The Potatoes I Forgot About",
  summary:
    "A forgotten bag of potatoes kept growing in the dark while the flowers I carefully planted died within a week. It made me think about how unpredictable growth can be.",
  image: "/article-forgotten-potatoes.png",
  readTime: "4 min read",
  category: "Payday Philosophy",
  kicker: "PAYDAY PHILOSOPHY · GROWTH · CONSISTENCY",
  alt: "A brown paper bag filled with sprouting potatoes beside wilted flowers in garden pots",
  caption:
    "Growth does not always happen where we expect it.",
  quote: {
    strong: "The forgotten potatoes kept growing.",
    text: "The flowers I carefully planted did not.",
  },

  sections: [
    {
      heading: "The bag in the pantry",
      paragraphs: [
        "Every now and then I forget about a bag of potatoes in the pantry.",
        "Weeks later, I open the brown paper bag and find them covered in long white sprouts.",
        "They have been sitting in the dark.",
        "No sunlight.",
        "No water.",
        "Nobody checking on them.",
        "And somehow, they are still trying to grow.",
      ],
    },

    {
      heading: "Then spring arrives",
      paragraphs: [
        "A few months later, I go to the garden centre.",
        "The flowers are already arranged in perfect pots with fresh soil.",
        "They look healthy.",
        "They look easy.",
        "I bring them home.",
        "I water them.",
        "I move them around the yard looking for the best spot.",
        "I check on them every day.",
        "A week later, they are dead.",
      ],
    },

    {
      heading: "That never seems fair",
      paragraphs: [
        "The potatoes I forgot about kept growing in a paper bag in the dark.",
        "The flowers I paid for, watered, and watched carefully did not.",
        "That never seems fair.",
        "But it does remind me that growth is not always as predictable as we want it to be.",
      ],
    },

    {
      heading: "The quiet things",
      paragraphs: [
        "We spend a lot of time looking for the perfect way to grow our money.",
        "The perfect investment.",
        "The perfect time to begin.",
        "The perfect plan.",
        "Sometimes those choices work.",
        "Sometimes they do not.",
        "Meanwhile, the quieter things keep going.",
        "The automatic contribution that leaves every payday.",
        "The pension deposit you barely notice.",
        "The small amount that keeps moving into savings while you are busy living your life.",
      ],
    },

    {
      heading: "Not everything grows on schedule",
      paragraphs: [
        "Some efforts show results quickly.",
        "Others seem to do nothing for years.",
        "Some plans fail even when we do everything right.",
        "Others become more valuable than we expected.",
        "That does not mean preparation is pointless.",
        "It means growth has its own timing.",
      ],
    },

    {
      heading: "One final thought",
      paragraphs: [
        "I still do not understand why forgotten potatoes can be so determined while expensive flowers sometimes give up after a week.",
        "But they remind me of something.",
        "The things that shape our future are not always the things that look most promising at the beginning.",
        "Sometimes they are the quiet things that keep growing while we are busy looking somewhere else.",
      ],
    },
  ],
};

    const FORTY_FIRST_ARTICLE = {
  id: "why-money-flows-downhill",
  title: "Why Money Flows Downhill",
  summary:
    "After a heavy rain, water always seems to find the same path. Over time I realized money isn't much different.",
  image: "/article-money-flows-downhill.png",
  readTime: "4 min read",
  category: "Payday Philosophy",
  kicker: "PAYDAY PHILOSOPHY · HABITS · SYSTEMS",
  alt: "Rainwater flowing through shallow channels on a hillside",
  caption: "Money usually follows the paths we've already created.",
  quote: {
    strong: "Money follows the easiest path.",
    text: "Usually the one we built without realizing it.",
  },

  sections: [
    {
      heading: "After the rain",
      paragraphs: [
        "After a heavy rain, water doesn't stop to think about where it should go.",
        "It simply follows the easiest path downhill.",
        "The first time, those paths are barely visible.",
        "But every rainfall makes them a little deeper.",
        "Before long, the water doesn't have much choice.",
        "The path is already there.",
      ],
    },

    {
      heading: "Money isn't much different",
      paragraphs: [
        "The older I get, the more I think money behaves the same way.",
        "Most spending isn't a brand-new decision.",
        "It's yesterday's decision happening again.",
        "The coffee you always buy.",
        "The takeout after a busy day.",
        "The subscription you forgot was still there.",
        "None of them feel important on their own.",
        "But every payday, the path becomes a little deeper.",
      ],
    },

    {
      heading: "Convenience is powerful",
      paragraphs: [
        "I don't think the biggest battle is between spending and saving.",
        "I think it's between convenience and intention.",
        "Convenience asks nothing from us.",
        "It simply repeats what we've already been doing.",
        "Choosing something different takes effort.",
        "Repeating yesterday doesn't.",
      ],
    },

    {
      heading: "Changing the path",
      paragraphs: [
        "Years ago I started moving a little money automatically after every payday.",
        "It wasn't because I suddenly became disciplined.",
        "It was because I knew I probably wouldn't make the same good decision every two weeks.",
        "So I made it once.",
        "After a while, saving became the easier path instead of spending.",
        "Not because I had more willpower.",
        "Because I'd changed the landscape.",
      ],
    },

    {
      heading: "One final thought",
      paragraphs: [
        "Your next payday will follow a path.",
        "Maybe one you chose.",
        "Maybe one you built without noticing.",
        "Like rainwater, money usually follows the landscape.",
      ],
    },
  ],
};
    const FORTY_SECOND_ARTICLE = {
  id: "money-has-a-memory",
  title: "Money Has a Memory",
  summary:
    "I can't remember what I gave up to pay for my MBA. I remember exactly what it gave me. Some spending disappears. Some stays with you for the rest of your life.",
  image: "/article-money-has-memory.png",
  readTime: "4 min read",
  category: "Payday Philosophy",
  kicker: "PAYDAY PHILOSOPHY · CHOICES · LONG-TERM THINKING",
  alt: "A notebook beside graduation papers representing an investment in learning",
  caption: "The money is gone. What it left behind isn't.",
  quote: {
    strong: "The money is gone.",
    text: "What it left behind isn't.",
  },

  sections: [
    {
      heading: "I can't remember the cost",
      paragraphs: [
        "A few years ago, I decided to earn my MBA while continuing to work full-time.",
        "It wasn't cheap.",
        "The funny thing is, I honestly can't remember what I gave up to pay for it.",
        "Maybe it was part of a bonus.",
        "Maybe it was a vacation I never booked.",
        "Maybe it was dozens of small decisions spread over a few years.",
        "I couldn't tell you anymore.",
        "What I do remember is everything that came after.",
        "The conversations.",
        "The opportunities.",
        "The confidence to tackle problems that once felt out of reach.",
        "The money is long gone.",
        "What it left behind isn't.",
      ],
    },

    {
      heading: "Some spending lasts",
      paragraphs: [
        "Most things we buy slowly disappear.",
        "Phones become outdated.",
        "Clothes wear out.",
        "The excitement of something new usually fades faster than we expect.",
        "But every now and then, money buys something that keeps giving long after we've forgotten paying for it.",
        "Sometimes it's an education.",
        "Sometimes it's a skill.",
        "Sometimes it's simply seeing the world a little differently than you did before.",
      ],
    },

    {
      heading: "The opposite is true too",
      paragraphs: [
        "Of course, the opposite happens as well.",
        "A credit card purchase takes only a few seconds.",
        "The payments can stay with you for years.",
        "Putting something off because it can wait sometimes turns into a much bigger bill later.",
        "Money has a way of carrying yesterday's decisions into tomorrow.",
      ],
    },

    {
      heading: "Looking back",
      paragraphs: [
        "The older I get, the less I think about what something cost.",
        "I think about what it became.",
        "Some purchases become clutter.",
        "Some become stories.",
        "Some become opportunities you never saw coming.",
        "Looking back, my MBA wasn't just something I bought.",
        "It became part of who I am.",
      ],
    },

    {
      heading: "One final thought",
      paragraphs: [
        "Every payday eventually becomes a memory.",
        "The dollars themselves won't last.",
        "What they leave behind just might.",
      ],
    },
  ],
};

    const FORTY_THIRD_ARTICLE = {
  id: "fixed-vs-variable-mortgage-rates-which-one-is-right-for-you",
  title: "Fixed vs. Variable Mortgage Rates: Which One Is Right for You?",
  summary:
    "Fixed and variable mortgage rates both have trade-offs. The better choice depends on your budget, your comfort with uncertainty, and the life you are actually living.",
  image: "/article-fixed-variable-mortgage.png",
  readTime: "5 min read",
  category: "Home Buying",
  kicker: "MORTGAGES · HOME BUYING · RATES",
  alt: "A couple comparing fixed and variable mortgage options at a kitchen table",
  caption:
    "The best mortgage is the one your budget can still handle if life does not go exactly as planned.",
  quote: {
    strong: "Choosing a mortgage is not really about predicting interest rates.",
    text: "It is about deciding how much uncertainty you are comfortable living with.",
  },

  sections: [
    {
      heading: "Choosing a mortgage",
      paragraphs: [
        "Buying your first home is exciting.",
        "Choosing the mortgage usually is not.",
        "Most people spend months comparing neighbourhoods, floor plans, and backyards.",
        "Then someone asks a question that could affect their finances for years.",
        "\"Would you like a fixed rate or a variable rate?\"",
        "When I bought my first home, I was not making much money.",
        "Every dollar mattered.",
        "An unexpected increase in my mortgage payment would have changed what the rest of the month looked like.",
        "So I chose a fixed rate.",
        "Looking back, a variable rate might have saved me money.",
        "Maybe.",
        "I will never know.",
        "What I do know is that I never worried about my payment changing during the term.",
        "For me, that peace of mind was worth something.",
        "Since then, I have realized that choosing a mortgage is not really about predicting interest rates.",
        "It is about deciding how much uncertainty you are comfortable living with.",
      ],
    },

    {
      heading: "What is a fixed-rate mortgage?",
      paragraphs: [
        "With a fixed-rate mortgage, your interest rate stays the same for the length of your mortgage term.",
        "That makes your regular mortgage payments easier to plan for because rising interest rates will not change your rate during that term.",
        "This predictability is the main reason many people choose a fixed mortgage.",
        "It can be especially helpful when your budget has little room for surprises.",
        "Fixed rates sometimes begin higher than variable rates.",
        "Sometimes they do not.",
        "What you are choosing is certainty.",
        "You know what your mortgage rate will be until the term ends.",
        "A fixed-rate mortgage may suit you if predictable payments help you budget, changing payments would create stress, or you simply value stability more than the possibility of saving money.",
      ],
    },

    {
      heading: "What is a variable-rate mortgage?",
      paragraphs: [
        "A variable-rate mortgage moves with your lender's prime rate or another reference rate set out in the mortgage agreement.",
        "If rates fall, you may pay less interest.",
        "If they rise, your mortgage could cost more.",
        "The way that change appears depends on the mortgage product.",
        "In some places, your monthly mortgage payment may rise or fall as rates change.",
        "In others, the payment may stay the same while more of it goes toward interest and less goes toward paying down the mortgage.",
        "With some products, rates can rise far enough that the regular payment no longer covers all of the interest being charged.",
        "That is an important detail to understand before you sign.",
        "A variable-rate mortgage may suit you if your budget can absorb higher costs, you are comfortable with changing rates, and the possibility of paying less interest matters more to you than complete payment certainty.",
      ],
    },

    {
      heading: "Why can fixed rates be higher?",
      paragraphs: [
        "People often ask why a fixed mortgage rate can be higher than a variable rate.",
        "One way to think about it is that you may be paying for certainty.",
        "You are locking in your mortgage interest rate for the length of the term.",
        "Sometimes that costs a little more.",
        "Sometimes market conditions mean it does not.",
        "Either way, a fixed mortgage protects you from rate changes during the term.",
        "A variable mortgage leaves more of that uncertainty with you.",
      ],
    },

    {
      heading: "The lowest rate is not the only number",
      paragraphs: [
        "It is easy to focus on the lowest advertised mortgage rate.",
        "The rate matters, but it is not the only part of the mortgage that can affect you.",
        "Ask what happens if you sell your home, refinance, or break the mortgage before the term ends.",
        "Some mortgage penalties are relatively modest.",
        "Others can be expensive.",
        "You should also understand your prepayment options, how often you can increase your payment, and whether you can make lump-sum payments without a penalty.",
        "A slightly lower rate may not save you much if the mortgage is expensive or difficult to leave.",
      ],
    },

    {
      heading: "Common mortgage mistakes",
      paragraphs: [
        "Most mortgage mistakes do not happen because someone chose the wrong interest rate.",
        "They happen because the borrower did not fully understand what they were signing.",
        "Some people focus only on getting the lowest rate.",
        "Some borrow the maximum amount a lender approves instead of choosing a payment that comfortably fits their budget.",
        "Others assume they know where interest rates are headed.",
        "Some never ask what it would cost to break the mortgage if their job, family, or housing needs changed.",
        "Those questions may not feel important on signing day.",
        "They can become very important later.",
      ],
    },

    {
      heading: "Questions worth asking",
      paragraphs: [
        "Before choosing between a fixed and variable mortgage, ask yourself a few honest questions.",
        "If rates increased next year, would my budget still work?",
        "Would a changing mortgage payment keep me awake at night?",
        "Do I value certainty more than the possibility of paying less interest?",
        "How long do I realistically expect to stay in this home?",
        "Could I afford the mortgage if another major expense arrived at the same time?",
        "What would it cost to sell, refinance, or break the mortgage early?",
        "The answers matter more than anyone's prediction about where interest rates may go.",
      ],
    },

    {
      heading: "Fixed or variable?",
      paragraphs: [
        "A fixed-rate mortgage may be the better fit when payment stability matters most.",
        "It can make budgeting easier and protect you from rising rates during the term.",
        "A variable-rate mortgage may be the better fit when your budget has room to move and you are comfortable accepting uncertainty.",
        "It may cost less if rates fall or remain favourable.",
        "It may cost more if rates rise.",
        "Neither option is automatically better.",
        "The right choice depends on what your finances can handle, not on which option appears smartest in hindsight.",
      ],
    },

    {
      heading: "The bottom line",
      paragraphs: [
        "Nobody knows exactly where interest rates will be a few years from now.",
        "If they did, choosing a mortgage would be easy.",
        "What you do know is your own financial situation.",
        "Some people sleep better knowing their rate will not change during the term.",
        "Others are comfortable accepting more uncertainty in exchange for the possibility of paying less interest.",
        "The lowest rate on signing day is not automatically the best mortgage.",
        "The better choice is the one your budget can handle and you can still live with if rates or life move against you.",
        "Take the time to understand the mortgage before you sign it.",
      ],
    },
  ],
};

    const FORTY_FOURTH_ARTICLE = {
      id: "what-do-you-do-when-you-have-almost-nothing-left",
      title: "What Do You Do When You Have Almost Nothing Left?",
      summary: "When payday is still days away and your account is almost empty, the goal is not to fix everything. It is to protect your next payday.",
      image: "/article-almost-nothing-left.png",
      readTime: "4 min read",
      category: "Debt",
      kicker: "SURVIVAL · CASH FLOW · NEXT PAYDAY",
      alt: "A person sitting at a kitchen table reviewing bills with a calculator",
      caption: "Sometimes the bravest financial plan is simply making it to your next payday.",
      quote: {
        strong: "Your bank balance tells you where you are.",
        text: "It isn't who you are.",
      },
      sections: [
        {
          heading: "When payday is still days away",
          paragraphs: [
            "Most personal finance advice assumes you have money.",
            "Money to invest.",
            "Money to save.",
            "Money to budget.",
            "But what if payday is still five days away?",
            "What if your bank account is almost empty?",
            "What if you're wondering how you're going to make it until your next paycheck?",
            "If that's where you are today, this article is for you.",
            "It won't solve everything.",
            "But it might help you make it through this week.",
          ],
        },
        {
          heading: "Protect your next payday",
          paragraphs: [
            "When money gets this tight, don't try to solve the next five years.",
            "Protect your next payday.",
            "Every decision you make this week should help you get there.",
            "That means avoiding choices that make next week even harder.",
            "The biggest one?",
            "Payday loans.",
            "When you're desperate, they can feel like a lifeline.",
            "They aren't.",
            "They solve today's problem by creating a bigger one next payday.",
            "The interest is so high that many people end up borrowing again just to repay the first loan.",
            "Before long, they're working to pay for yesterday instead of building tomorrow.",
            "If you can avoid a payday loan, do everything you can to avoid it.",
          ],
        },
        {
          heading: "Don't disappear",
          paragraphs: [
            "Years ago, I worked in accounts receivable and collections for a company that delivered heating oil.",
            "On my first day, my manager told me something I've never forgotten.",
            "He said,",
            "\"This is our job, but remember one thing. Nobody freezes to death.\"",
            "I knew exactly what he meant.",
            "Our job was to collect money.",
            "Our job was never to hurt people.",
            "Over the years, I noticed something.",
            "People rarely got into the most trouble because they couldn't pay.",
            "They got into the most trouble because they stopped talking.",
            "They stopped answering the phone.",
            "The mail piled up unopened.",
            "Emails went unread because every notification brought more stress.",
            "They hoped the problem would somehow disappear.",
            "It almost never did.",
            "Silence is one of the most expensive financial decisions you can make.",
            "If you're overwhelmed, make the call today.",
            "Call your landlord.",
            "Call your utility company.",
            "Call your phone company.",
            "Tell them what's going on.",
            "They may not be able to change anything.",
            "But they might.",
            "Many companies offer payment plans or financial hardship programs you'll never hear about unless you ask.",
            "One phone call won't solve everything.",
            "But it can replace uncertainty with a plan.",
          ],
        },
        {
          heading: "Spend money where it matters most",
          paragraphs: [
            "If you only have twenty dollars left, don't ask yourself what you want.",
            "Ask yourself what protects your next paycheck.",
            "A tank of gas.",
            "A bus pass.",
            "A packed lunch for work.",
            "Work boots that get you through another shift.",
            "Protect the thing that earns tomorrow's money.",
            "Without your next paycheck, every other problem becomes harder to solve.",
            "Every dollar you spend this week has one job.",
            "Help you make it to your next payday.",
          ],
        },
        {
          heading: "Use what you already have",
          paragraphs: [
            "Before you buy groceries, look through your cupboards.",
            "The rice you forgot about.",
            "The can of soup at the back of the shelf.",
            "Half a box of pasta.",
            "Frozen vegetables.",
            "This isn't the week to make exciting meals.",
            "It's the week to make what you already have last.",
            "If you run out of food, go to the food bank.",
            "That's exactly why it exists.",
            "I've heard people joke that they're \"having sleep for dinner.\"",
            "It's funny until it isn't.",
            "There is no shame in accepting help.",
            "One day, when life looks different, you may be the person filling those shelves for someone else.",
          ],
        },
        {
          heading: "One good decision at a time",
          paragraphs: [
            "When money gets this tight, your world naturally becomes smaller.",
            "That's okay.",
            "You don't have to solve your entire financial future today.",
            "You only have to make the next good decision.",
            "Then the one after that.",
            "Then the next one.",
            "Sometimes surviving a difficult season is nothing more than refusing to make tomorrow harder than today.",
            "I remember what it felt like when every dollar already had a job before payday arrived.",
            "I remember hoping nothing unexpected would happen because there wasn't room in the budget for surprises.",
            "If that's where you are today, remember this.",
            "Your bank balance tells you where you are.",
            "It isn't who you are.",
            "Don't disappear.",
            "Answer the phone.",
            "Ask for help if you need it.",
            "Protect your next payday.",
            "One day you'll look back and realize you survived something you once believed would never end.",
            "Sometimes victory isn't getting ahead.",
            "Sometimes the bravest financial plan you can make is simply making it to your next payday.",
          ],
        },
      ],
    };

    const FORTY_FIFTH_ARTICLE = {
      id: "the-most-valuable-coat-i-never-owned",
      title: "The Most Valuable Coat I Never Owned",
      summary: "Sometimes the smartest financial decision is changing your mind while you still have the chance.",
      image: "/article-most-valuable-coat.png",
      readTime: "3 min read",
      category: "Saving",
      kicker: "RETURNS · INTENTIONAL SPENDING · CHANGING YOUR MIND",
      alt: "A dark wool winter coat hanging on a wooden chair near a window",
      caption: "Sometimes the smartest financial decision is changing your mind.",
      quote: {
        strong: "Keeping the item doesn't bring the money back.",
        text: "Sometimes it just keeps reminding you of a decision you wish you had made differently.",
      },
      sections: [
        {
          heading: "The coat I thought I needed",
          paragraphs: [
            "Being careful with money doesn't mean every purchase has to work out.",
            "There was a time when I decided I needed a proper winter coat.",
            "Not another casual jacket.",
            "A wool coat I could wear to work.",
            "The kind that makes you feel like you've finally become an adult.",
            "I found one almost immediately.",
            "A sales associate helped me find the right size.",
            "It fit perfectly.",
            "The color looked great.",
            "Standing in front of the mirror, I thought,",
            "\"This is exactly what I came for.\"",
            "It wasn't cheap.",
            "If anything, the price made me feel better about buying it.",
            "I convinced myself I was paying for quality.",
            "I brought it home, hung it in the closet, and felt good about the purchase.",
          ],
        },
        {
          heading: "Five minutes",
          paragraphs: [
            "The next time I wore it, I lasted about five minutes.",
            "It itched.",
            "Not the kind of itch you eventually stop noticing.",
            "The kind that makes you want to take it off immediately.",
            "Maybe it was the wool.",
            "Maybe I was allergic.",
            "It didn't matter.",
            "I knew I wasn't going to wear it.",
            "So I took it back.",
          ],
        },
        {
          heading: "The harder decision",
          paragraphs: [
            "Returning it felt much harder than buying it.",
            "The excitement from the day I bought it had disappeared.",
            "Now there were suggestions.",
            "Maybe I'd get used to it.",
            "Maybe I should exchange it.",
            "Maybe I could wear it around the house for a while.",
            "For a moment, I almost talked myself into keeping it.",
            "Then I looked at the coat.",
            "Nothing had changed.",
            "It still looked great.",
            "I still didn't want to wear it.",
            "So I asked for the refund.",
            "I walked out without the coat.",
          ],
        },
        {
          heading: "Already paid for",
          paragraphs: [
            "At the time, it felt like a frustrating afternoon.",
            "Looking back, I think it was one of the better financial decisions I've made.",
            "We keep a surprising number of things for one reason.",
            "We've already paid for them.",
            "The shoes that hurt your feet.",
            "The kitchen gadget you never use.",
            "The subscription you forgot to cancel.",
            "The purchase that looked perfect in the store but never fit your real life.",
            "The money is already gone.",
            "Keeping the item doesn't bring it back.",
            "Sometimes it just keeps reminding you of a decision you wish you had made differently.",
          ],
        },
        {
          heading: "Changing your mind",
          paragraphs: [
            "The smartest financial decision isn't always making the perfect purchase.",
            "Sometimes it's admitting a purchase wasn't right while you still have the chance to change your mind.",
            "I never think about the money I got back.",
            "I think about the hundreds of dollars I didn't leave hanging in my closet for the next ten years.",
            "That coat turned out to be valuable for a reason I never expected.",
            "I never owned it long enough to wear it.",
            "But I kept every dollar it would have quietly taken from my future.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_SIXTH_ARTICLE = {
      id: "the-habit-that-outlived-the-electric-bill",
      title: "The Habit That Outlived the Electric Bill",
      summary: "Some habits outlive the reasons we first learned them.",
      image: "/article-habit-outlived-electric-bill.png",
      readTime: "3 min read",
      category: "Saving",
      kicker: "HABITS · GRATITUDE · WASTE",
      alt: "A dim hallway looking toward a warmly lit kitchen at evening",
      caption: "Some habits outlive the reasons we first learned them.",
      quote: {
        strong: "The electric bill isn't the point anymore.",
        text: "The habit is.",
      },
      sections: [
        {
          heading: "The light switch",
          paragraphs: [
            "I still turn off the lights when I leave a room.",
            "I don't stop to think about it.",
            "My hand just reaches for the switch.",
            "That's how I grew up.",
            "If nobody was in the room, the light went off.",
            "Simple.",
            "The funny part is that today's LED bulbs use so little electricity that leaving one on for a while probably won't change my life.",
            "I still turn it off.",
            "Not because I have to.",
            "Because it feels wrong not to.",
            "Looking back, it was never really about the light.",
          ],
        },
        {
          heading: "Little habits",
          paragraphs: [
            "Growing up, our house was full of little habits like that.",
            "When the evening cooled down, we'd open the windows.",
            "Before the air conditioner came on, we'd close them again.",
            "The thermostat went down before bed.",
            "Why heat an empty house when everyone was under warm blankets?",
            "None of those habits felt unusual.",
            "They were simply the way things were done.",
            "Years later, I realized they all had the same purpose.",
            "Not to make us rich.",
            "To teach us not to waste what we already had.",
          ],
        },
        {
          heading: "The habit stayed. The reason changed.",
          paragraphs: [
            "Today I could leave a light on.",
            "I could turn the thermostat up another degree.",
            "I could forget to close a window before the air conditioner starts.",
            "None of those choices would change my financial future.",
            "But I still don't do them.",
            "Not because I'm trying to save a few dollars.",
            "Because those habits became part of how I think.",
            "When you've worked hard to build a comfortable life, taking care of it becomes second nature.",
            "Not because you're afraid of losing it.",
            "Because you respect it.",
          ],
        },
        {
          heading: "Respect what you already have",
          paragraphs: [
            "I've noticed those same habits showing up in other parts of my life.",
            "I finish the leftovers.",
            "I wear things until they're actually worn out.",
            "I don't replace something that's still doing its job.",
            "None of those choices feels like a sacrifice.",
            "If anything, they remind me to appreciate what I already have.",
            "The older I get, the more I think good financial habits aren't really about money.",
            "They're about gratitude.",
            "They're about treating the things you've earned with the same care you used when you were still working toward them.",
          ],
        },
        {
          heading: "The habit is",
          paragraphs: [
            "Maybe that's what my parents were teaching all along.",
            "Not with lectures.",
            "Not with spreadsheets.",
            "Just by reaching for the light switch every time they left a room.",
            "Now I do the same.",
            "The electric bill isn't the point anymore.",
            "The habit is.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_SEVENTH_ARTICLE = {
      id: "the-room-i-chose-to-leave",
      title: "The Room I Chose to Leave",
      summary: "Sometimes savings are not about buying more. They are about having enough freedom to walk away.",
      image: "/article-room-i-chose-to-leave.png",
      readTime: "4 min read",
      category: "Payday Philosophy",
      kicker: "CHOICE · SAFETY · MOVING FORWARD",
      alt: "A dim hallway in an old residence beside a small room with a bed, sink, and chair",
      caption: "Savings buy the freedom to choose a different path.",
      quote: {
        strong: "Savings buy the freedom to choose a different path.",
        text: "Not as the ability to buy more. As the freedom to say no.",
      },
      sections: [
        {
          heading: "Arriving too late",
          paragraphs: [
            "Years ago, a few weeks before school started, I returned to the city where I was studying.",
            "Finding a place to live before classes began had become part of my routine.",
            "I'd usually arrive, spend a day or two looking at apartment postings, and find a room without much trouble.",
            "This year was different.",
            "I'd left it too late.",
            "Classes were about to start, and most of the good places were already gone.",
            "For my first week, I rented a room in an old nurses' residence.",
            "Rooms were rented by the week while people looked for something more permanent.",
          ],
        },
        {
          heading: "The old residence",
          paragraphs: [
            "I carried my suitcase up a wide, polished stone staircase.",
            "The building still felt like what it had once been.",
            "The hallway was dimly lit.",
            "The walls were painted that faded institutional pink you used to see in older buildings.",
            "There was a small sink in my room.",
            "The toilets and showers were down the hall.",
            "A wall phone hung in the hallway for everyone to use.",
            "It wasn't home.",
            "I was young.",
            "That didn't bother me.",
          ],
        },
        {
          heading: "Everyone had a story",
          paragraphs: [
            "Most evenings, the men staying there gathered in the TV room.",
            "I joined them.",
            "Everyone seemed to have a story.",
            "One young guy was in the city to take a forklift course.",
            "When he finished, he was heading north.",
            "\"You can make big money up there,\" he said.",
            "One night I came back with Chinese food.",
            "The guys laughed.",
            "\"You know how much rice we could buy for what you paid for that?\"",
            "We all laughed.",
          ],
        },
        {
          heading: "The hallway phone",
          paragraphs: [
            "A few nights later, I was using the hallway phone when one of the men walked over.",
            "He demanded to know who I was talking to.",
            "Not asked.",
            "Demanded.",
            "My gut said, run.",
            "Instead, I smiled.",
            "\"Just my mom,\" I said.",
            "We talked for another minute.",
            "Then I hung up and walked back to my room.",
            "I remember looking at the chair and wondering if I should wedge it against the door.",
            "I don't remember whether I actually did.",
            "I remember sitting on the edge of the bed.",
            "Every sound in the hallway suddenly seemed louder.",
            "For the first time since I'd arrived, I was scared.",
          ],
        },
        {
          heading: "Enough to walk away",
          paragraphs: [
            "What frightened me wasn't what he said.",
            "It was the feeling.",
            "For a brief moment, it felt as though he thought I belonged to him.",
            "It felt as though he was trying to figure out who I was before deciding what came next.",
            "That was enough.",
            "Right then and there, I knew I was leaving.",
            "Until then, I hadn't stopped to think about what kind of place I was living in, or who I was living with.",
          ],
        },
        {
          heading: "The search",
          paragraphs: [
            "The next morning, I started the desperate search for somewhere else to live.",
            "I didn't have a car.",
            "I took the bus or walked from apartment posting to apartment posting.",
            "Whenever I found a place that looked promising, I called the landlord or knocked on the door.",
            "A few days later, on the other side of town, I found an old Victorian house that had been divided into student apartments.",
            "There were shops on the main floor.",
            "Students lived upstairs.",
            "The bathroom was shared.",
            "In the middle of it sat an old claw-foot bathtub.",
            "The place wasn't fancy.",
            "It felt safe.",
          ],
        },
        {
          heading: "The room I chose to leave",
          paragraphs: [
            "I've forgotten almost everything about that apartment.",
            "I haven't forgotten the room I chose to leave.",
            "That week taught me something no finance book ever could.",
            "Savings buy the freedom to choose a different path.",
            "I could leave because I had enough money to keep looking.",
            "Enough to pay for another room.",
            "Enough to walk away.",
            "Not as the ability to buy more.",
            "And the freedom to say no.",
            "Not me, not today"
          ],
        },
      ],
    };

    const FORTY_EIGHTH_ARTICLE = {
      id: "the-raise-you-already-got",
      title: "The Raise You Already Got",
      summary: "Sometimes making more money starts with noticing the benefits and discounts you have already earned.",
      image: "/article-raise-you-already-got.png",
      readTime: "3 min read",
      category: "Work",
      kicker: "BENEFITS · DISCOUNTS · KEEPING MORE",
      alt: "A man reviewing pension and benefit paperwork at a wooden table with a laptop and notes",
      caption: "Your paycheck may not change, but how much of it you keep can.",
      quote: {
        strong: "My paycheck hadn't changed.",
        text: "What changed was how much of it I got to keep.",
      },
      sections: [
        {
          heading: "Another way to make more",
          paragraphs: [
            "Whenever people talk about making more money, the advice is familiar.",
            "Ask for a raise.",
            "Find a better-paying job.",
            "Work overtime.",
            "Start a side hustle.",
            "All of that can help.",
            "But there's another way to end up with more money, and almost nobody talks about it.",
          ],
        },
        {
          heading: "The discount I did not know about",
          paragraphs: [
            "A few years ago, a coworker mentioned buying new tires through an employee discount.",
            "I didn't even know our company offered one.",
            "So I started looking.",
            "Within minutes I found discounts on hotels, insurance, electronics, vehicles, and the same mattress I was already planning to buy.",
            "I realized I'd been ignoring part of my compensation for years.",
            "My paycheck hadn't changed.",
            "What changed was how much of it I got to keep.",
          ],
        },
        {
          heading: "The raise you already got",
          paragraphs: [
            "Imagine your employer gave you a $500 raise.",
            "You'd notice.",
            "Now imagine they helped you save that same $500 over the course of a year.",
            "Financially, there's no difference.",
            "Employee discounts.",
            "Retirement matching.",
            "Health benefits.",
            "Professional training.",
            "Legal services.",
            "Preferred insurance rates.",
            "Most employers offer more than people realize.",
            "Most employees never look.",
          ],
        },
        {
          heading: "Keeping more matters",
          paragraphs: [
            "For years, I believed getting ahead meant earning more.",
            "Now I think it also means wasting less.",
            "Before I make an expensive purchase, I check whether my employer already has a discount.",
            "Before paying for a course, I check whether it's covered.",
            "Before buying insurance, I compare the employee rate.",
            "Sometimes I find nothing.",
            "Sometimes I save hundreds of dollars.",
            "Those few minutes are worth it.",
          ],
        },
        {
          heading: "Pay attention",
          paragraphs: [
            "Two people can earn the same salary for twenty years and finish in very different financial positions.",
            "The difference isn't always income.",
            "Sometimes it's simply paying attention.",
            "I've stopped thinking of workplace benefits as extras.",
            "They're part of my pay.",
            "I've already earned them.",
            "If I don't use them, I'm choosing to leave money behind.",
            "Most of us only get about 1,040 paydays during our working lives.",
            "Your salary matters.",
            "Keeping more of it matters just as much.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_NINTH_ARTICLE = {
      id: "has-this-payday-finished-its-job",
      title: "Has This Payday Finished Its Job?",
      summary: "A thoughtful way to look at the things we own: every payday is supposed to solve a problem, and once that problem is solved, its job may be finished.",
      image: "/article-has-this-payday-finished-its-job.png",
      readTime: "4 min read",
      category: "Payday Philosophy",
      kicker: "PURPOSE · POSSESSIONS · RETURNING MONEY",
      alt: "A man gently placing a teddy bear into a box marked for sale in a warm living room",
      caption: "Some purchases are not mistakes. They simply finish the work they came to do.",
      quote: {
        strong: "We don't spend money to own things.",
        text: "We spend money to solve problems.",
      },
      sections: [
        {
          heading: "The paydays around the house",
          paragraphs: [
            "One afternoon I was walking through my house when I noticed something I'd never thought about before.",
            "Some of my paydays had already finished their job.",
            "The winter coat hanging in the closet had kept me warm through three winters.",
            "The baby toys packed away in storage had filled our home with laughter.",
            "The old coffee maker in the basement had carried us through years of early mornings before we replaced it.",
            "None of those purchases were mistakes.",
            "They had simply completed the work they were meant to do.",
          ],
        },
        {
          heading: "When a purchase has delivered",
          paragraphs: [
            "That made me wonder why so many of us feel guilty about letting things go.",
            "We often act as though selling something means we shouldn't have bought it in the first place.",
            "But that's only true if the purchase failed.",
            "Most don't.",
            "A stroller isn't meant to last forever.",
            "Neither is a child's bicycle.",
            "Or a college textbook.",
            "They exist for a season of life.",
            "When that season ends, the purchase hasn't lost its value.",
            "It has delivered it.",
          ],
        },
        {
          heading: "The solution was the purchase",
          paragraphs: [
            "That's when I realized something.",
            "We don't spend money to own things.",
            "We spend money to solve problems.",
            "A winter coat buys warmth.",
            "A stroller buys easier walks with a young family.",
            "A coffee maker buys thousands of ordinary mornings.",
            "The object was never the real purchase.",
            "The solution was.",
          ],
        },
        {
          heading: "Returning money",
          paragraphs: [
            "I sold an old piece of exercise equipment that had been sitting untouched in the corner for months.",
            "It had already done everything I'd asked of it.",
            "Someone else was excited to take it home.",
            "I was happy to see it go.",
            "The money didn't feel like profit.",
            "It felt like something returning.",
            "Then it hit me.",
            "It wasn't found money.",
            "It was returning money.",
          ],
        },
        {
          heading: "Changing shape again",
          paragraphs: [
            "Years earlier, that payday had changed into something useful.",
            "Now that its work was finished, it was simply changing shape again.",
            "Money rarely disappears.",
            "It becomes groceries.",
            "A bicycle.",
            "A winter coat.",
            "A dining room table where birthdays are celebrated.",
            "Sometimes, years later, it quietly becomes money again.",
          ],
        },
        {
          heading: "The question",
          paragraphs: [
            "Now, every few months, I walk through my house and ask myself one question.",
            "Has this payday finished its job?",
            "The next time you open a closet, don't just see an old jacket or a forgotten appliance.",
            "See the payday behind it.",
            "Ask yourself one question.",
            "Has this payday finished its job?",
            "Because every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FIFTIETH_ARTICLE = {
      id: "the-kitchen-i-coveted",
      title: "The Kitchen I Coveted",
      summary: "Sometimes we do not need a different life. We need to see the one we already have again.",
      image: "/article-kitchen-i-coveted.png",
      readTime: "4 min read",
      category: "Payday Philosophy",
      kicker: "COMPARISON · GRATITUDE · HOME",
      alt: "A woman holding a mug in a warm kitchen beside a stove and window",
      caption: "It was not a showroom. It was my life.",
      quote: {
        strong: "Nothing in my kitchen had changed.",
        text: "Only what I'd been comparing it to.",
      },
      sections: [
        {
          heading: "Saturday mornings",
          paragraphs: [
            "For a while, Saturday mornings followed the same routine.",
            "I'd climb into my little black Chevy and drive to Tim Hortons.",
            "I'd wait in the drive-through line for a sausage breakfast sandwich, an orange juice and, if I was feeling a little greedy, an apple fritter.",
            "Then I'd head home, settle onto the couch and turn on a home renovation show.",
            "One episode became two.",
            "Sometimes two turned into four.",
          ],
        },
        {
          heading: "The same kitchen",
          paragraphs: [
            "A few hours later, I'd get up for a glass of water or whatever had me wandering into the kitchen.",
            "Almost every time, I'd look around and think my kitchen didn't seem quite as nice as it had that morning.",
            "It never made much sense.",
            "Nothing had changed.",
            "The cupboards were the same.",
            "The mocha oak floor I'd been so excited to install was still there.",
            "The stove still made breakfast.",
            "The room was exactly the same one I'd been proud of.",
            "Still, every Saturday it seemed to lose a little something.",
          ],
        },
        {
          heading: "The renovation I imagined",
          paragraphs: [
            "I started thinking about what it would cost to renovate.",
            "A brand-new kitchen.",
            "New cabinets.",
            "New countertops.",
            "New appliances.",
            "A complete gut remodel.",
            "Thirty thousand dollars.",
            "And for what?",
            "My kitchen still worked.",
            "I just couldn't see it the way I used to.",
          ],
        },
        {
          heading: "The stove on the screen",
          paragraphs: [
            "Then one Saturday, something caught my attention.",
            "A couple stood in the middle of their newly renovated kitchen while the camera slowly pulled back to reveal the finished room.",
            "The host was talking.",
            "I wasn't really listening.",
            "I was looking at the stove.",
            "It looked familiar.",
            "I leaned forward.",
            "Then I picked up the remote and paused the show.",
            "It was my stove.",
            "Not one that looked like mine.",
            "My stove.",
            "I actually got up and walked into my own kitchen.",
            "There it was.",
            "The same knobs.",
            "The same handle.",
            "The same oven door.",
            "I laughed.",
          ],
        },
        {
          heading: "What changed",
          paragraphs: [
            "For months, I'd been convinced my kitchen looked dated.",
            "Meanwhile, my stove had just been featured in someone's dream renovation.",
            "Nothing in my kitchen had changed.",
            "Only what I'd been comparing it to.",
            "Every Saturday, I'd spend hours looking at homes that had been cleaned, painted, staged and professionally lit.",
            "Then I'd walk into the room where breakfast had been made.",
            "Where groceries were unpacked.",
            "Where yesterday's mail sat on the counter.",
            "Where a dish towel hung over the oven handle.",
            "Where my little rescue dog had left toys across the floor.",
            "It wasn't a showroom.",
            "It was my life.",
          ],
        },
        {
          heading: "Seeing it again",
          paragraphs: [
            "For years, I thought I wanted a different kitchen.",
            "Looking back, I don't think I did.",
            "I wanted the feeling I had when this one was still new.",
            "The funny thing is, if I walked into someone else's house tomorrow and they had my kitchen, I'd probably think it looked beautiful.",
            "Not because it was different.",
            "Because it wasn't mine.",
            "That's the trap.",
            "We don't always replace things because they're worn out.",
            "Sometimes we replace them because we've stopped seeing them.",
            "I still enjoy watching home renovation shows.",
            "I still admire beautiful homes.",
            "But I'm not trying to live in a showroom.",
            "I'm trying to build a life.",
          ],
        },
      ],
    };

    const FIFTY_FIRST_ARTICLE = {
      id: "should-you-save-or-pay-off-debt-first",
      title: "Should You Save or Pay Off Debt First?",
      summary: "If you have high interest debt and little or no savings, your first priority is usually to build a small emergency fund before putting every extra dollar toward debt.",
      image: "/article-save-or-pay-off-debt-first.png",
      readTime: "6 min read",
      category: "Debt",
      kicker: "SAVING · DEBT",
      alt: "A savings piggy bank and a stone marked debt balanced on a seesaw",
      intro: [
        "Not a large emergency fund. Just enough to keep the next ordinary problem from becoming another balance on your credit card.",
        "After that, shift your focus to paying off the debt.",
        "On paper, the math is simple. If your credit card charges 20 percent interest while your savings account earns only a few percent, every extra dollar belongs on the card.",
        "Real life is rarely that simple.",
        "You can spend months paying down a balance only to face an $800 car repair the following week. Without any savings, that repair goes right back on the credit card. The balance climbs again, and much of your progress disappears.",
        "The numbers may have been right, but the plan was fragile.",
        "Sometimes the best financial decision is the one that keeps you from borrowing again.",
      ],
      sections: [
        {
          heading: "Why Saving First Can Make Sense",
          paragraphs: [
            "A small emergency fund is not a luxury. It is a cushion between you and the next unexpected expense.",
            "It will not earn much interest, and it is never going to make you feel wealthy. That is not its purpose. Its job is to keep an unexpected bill from becoming more debt.",
            "When the furnace stops working, the tire blows out, the dog needs emergency surgery, or your hours at work are cut, having cash on hand gives you options.",
            "The better question is not simply, \"Should I save or pay off debt first?\"",
            "It is, \"Which choice makes my finances stronger next month?\"",
            "Putting an extra $2,000 toward debt while leaving your bank account empty can improve the numbers today. It can also leave you one unexpected expense away from borrowing all over again.",
            "The opposite can happen too. Keeping $20,000 in cash while paying 20 percent interest on a credit card gives you plenty of security, but you are paying a high price for it.",
            "Most people need something between those two extremes.",
          ],
        },
        {
          heading: "How Much Emergency Fund Should You Have Before Paying Off Debt?",
          paragraphs: [
            "There is no single number that works for everyone.",
            "For some people, $1,000 is enough to start attacking debt with confidence. For others, that amount barely covers one repair. If you own an older vehicle, have children, own a home, or have income that changes from month to month, your first layer of savings may need to be larger.",
            "Many people think about emergency savings in broad terms.",
            "Something might happen.",
            "That is true, but it is not very useful.",
            "A better question is this:",
            "What is most likely to happen next?",
            "An older vehicle is probably going to need repairs.",
            "A roof with worn shingles will eventually need replacing.",
            "A twenty five year old furnace is not an unexpected problem waiting somewhere in the future. It is simply waiting for the wrong day.",
            "The same goes for an aging pet, uneven income, or a home filled with appliances that are all reaching the end of their lives.",
            "Your emergency fund should reflect the life you actually have, not the life you wish you had.",
            "Ask yourself:",
            "What is wearing out?",
            "What expense would force me to borrow tomorrow?",
            "What problem can I already see coming?",
            "Those questions usually produce a much better savings target than choosing an arbitrary number.",
            "The goal is not to prepare for every possible disaster.",
            "The goal is to keep predictable problems from becoming expensive financial setbacks.",
          ],
        },
        {
          heading: "Emergency Fund or Future Expenses?",
          paragraphs: [
            "There is an important difference between an emergency and an expense you know is coming.",
            "Losing your job is an emergency.",
            "A family crisis can be an emergency.",
            "A medical bill that could not have been predicted is an emergency.",
            "Replacing worn brake pads is not.",
            "Neither is your annual insurance premium, a laptop that is nearing the end of its life, or a roof that has been showing its age for years.",
            "These are future expenses. They may arrive at inconvenient times, but they should not come as surprises.",
            "Treating every large bill as an emergency makes it much harder to know how much emergency savings you actually need.",
            "It helps to separate these expenses in your mind.",
            "Keep one fund for true emergencies.",
            "Then gradually build smaller reserves for the costs you know are coming. Vehicle repairs. Home maintenance. Medical and dental expenses. Pet care. Annual insurance premiums. Even months when your income is lower than usual.",
            "You do not have to fully fund every category before paying off debt. If you wait until every future expense is covered, you may never get around to paying it down.",
            "The goal is simply to recognize what is coming and give those expenses a place in your plan.",
          ],
        },
        {
          heading: "Look for Money You Already Have",
          paragraphs: [
            "Before trying to cut another $300 from your budget, take a look around.",
            "Many households already have money they have forgotten about.",
            "There may be an old refund you never claimed, a reimbursement waiting to be submitted, store credit you forgot about, gift cards sitting in a drawer, reward points that can cover an upcoming purchase, or a subscription you no longer use.",
            "You might also have an old phone, bicycle, or piece of furniture collecting dust that could be sold.",
            "None of this is free money.",
            "It has always been yours.",
            "When money is tight, though, recovering a few hundred dollars is often easier than squeezing another few hundred dollars out of next month's budget.",
            "That extra cash can cover a repair, pay an insurance deductible, or buy groceries during an expensive week.",
            "More importantly, it can keep you from reaching for a credit card when something goes wrong.",
            "That is exactly what your first emergency fund is supposed to do.",
          ],
        },
        {
          heading: "Why Paying Off Debt Without Savings Can Backfire",
          paragraphs: [
            "Imagine you owe $5,000 on a credit card and have no savings.",
            "After months of hard work, you reduce the balance to $3,500.",
            "Then your transmission fails and the repair costs $1,500.",
            "Without cash set aside, the repair goes on the same credit card.",
            "You are right back where you started.",
            "Now imagine the same situation with $1,500 in emergency savings.",
            "The repair is still frustrating.",
            "It still costs money.",
            "But it does not increase your debt.",
            "You use the emergency fund, rebuild it over the next few months, and continue paying down the balance.",
            "The savings did not produce the highest return on paper.",
            "They protected the progress you had already made.",
          ],
        },
        {
          heading: "When to Stop Saving and Start Paying Off Debt",
          paragraphs: [
            "Your emergency fund needs a finish line.",
            "Without one, it is easy to keep saving because it feels safer than making a large debt payment.",
            "Cash provides comfort.",
            "Sending money to a credit card rarely does.",
            "But holding far more cash than you actually need while paying high interest on debt quietly works against you.",
            "Choose a savings target that fits your situation.",
            "It might be enough to cover a major vehicle repair.",
            "One month of essential expenses.",
            "Your insurance deductible.",
            "Replacing an aging furnace.",
            "Whatever amount gives you confidence that one setback will not send you back into debt.",
            "Once you reach that number, direct most of your extra money toward your highest interest debt.",
            "Every dollar of credit card interest reduces what a future paycheck can do for you.",
            "Keep the emergency fund intact.",
            "It exists for a reason.",
            "Everything above that target can go toward eliminating expensive debt.",
          ],
        },
      ],
    };

    const ARTICLES = [FEATURED_ARTICLE, SECOND_ARTICLE, THIRD_ARTICLE, FOURTH_ARTICLE, FIFTH_ARTICLE, SIXTH_ARTICLE, SEVENTH_ARTICLE, EIGHTH_ARTICLE, NINTH_ARTICLE, TENTH_ARTICLE, ELEVENTH_ARTICLE, TWELFTH_ARTICLE, THIRTEENTH_ARTICLE, FOURTEENTH_ARTICLE, FIFTEENTH_ARTICLE, SIXTEENTH_ARTICLE, SEVENTEENTH_ARTICLE, EIGHTEENTH_ARTICLE, NINETEENTH_ARTICLE, TWENTIETH_ARTICLE, TWENTY_FIRST_ARTICLE, TWENTY_SECOND_ARTICLE, TWENTY_THIRD_ARTICLE, TWENTY_FOURTH_ARTICLE, TWENTY_FIFTH_ARTICLE, TWENTY_SEVENTH_ARTICLE, TWENTY_EIGHTH_ARTICLE, TWENTY_NINTH_ARTICLE, THIRTY_FIRST_ARTICLE, THIRTY_SECOND_ARTICLE, THIRTY_THIRD_ARTICLE, THIRTY_FOURTH_ARTICLE, THIRTY_FIFTH_ARTICLE, THIRTY_SIXTH_ARTICLE, THIRTY_SEVENTH_ARTICLE, THIRTY_EIGHTH_ARTICLE, THIRTY_NINTH_ARTICLE, FORTIETH_ARTICLE, FORTY_FIRST_ARTICLE, FORTY_SECOND_ARTICLE, FORTY_THIRD_ARTICLE, FORTY_FOURTH_ARTICLE, FORTY_FIFTH_ARTICLE, FORTY_SIXTH_ARTICLE, FORTY_SEVENTH_ARTICLE, FORTY_EIGHTH_ARTICLE, FORTY_NINTH_ARTICLE, FIFTIETH_ARTICLE, FIFTY_FIRST_ARTICLE];
    const ARTICLE_BY_ID = new Map(ARTICLES.map((article) => [article.id, article]));
    const UNIQUE_ARTICLES = Array.from(ARTICLE_BY_ID.values());
    const PHILOSOPHY_BY_SLUG = new Map(
      PHILOSOPHY_PAGES.map((page) => [page.slug, page])
    );
    const LEARN_CLUSTER_BY_SLUG = new Map(
      LEARN_EDITORIAL_CONFIG.clusters.map((cluster) => [cluster.slug, cluster])
    );

    function configuredArticles(slugs, label) {
      const missingSlugs = slugs.filter((slug) => !ARTICLE_BY_ID.has(slug));

      if (missingSlugs.length && import.meta.env.DEV) {
        console.warn(
          `[Learn configuration] ${label} contains unknown article slug(s): ${missingSlugs.join(", ")}`
        );
      }

      return slugs.map((slug) => ARTICLE_BY_ID.get(slug)).filter(Boolean);
    }

    function articlesForCluster(cluster) {
      if (!cluster) return [];
      const configuredSlugs = new Set(cluster.articleSlugs || []);
      const configuredCategories = new Set(cluster.categories || []);
      return UNIQUE_ARTICLES.filter(
        (article) =>
          configuredSlugs.has(article.id) ||
          configuredCategories.has(article.category)
      );
    }

    function clusterForArticle(article) {
      if (!article) return null;
      return (
        LEARN_EDITORIAL_CONFIG.clusters.find((cluster) =>
          (cluster.articleSlugs || []).includes(article.id)
        ) ||
        LEARN_EDITORIAL_CONFIG.clusters.find((cluster) =>
          (cluster.categories || []).includes(article.category)
        ) ||
        null
      );
    }

    const LEARN_START_HERE_ARTICLES = configuredArticles(
      LEARN_EDITORIAL_CONFIG.startHereSlugs,
      "startHereSlugs"
    ).slice(0, 3);
    const LEARN_START_HERE_IDS = new Set(
      LEARN_START_HERE_ARTICLES.map((article) => article.id)
    );
    const publicationDateForArticle = (article) =>
      LEARN_EDITORIAL_CONFIG.verifiedPublicationDates[article.id] || "";
    if (import.meta.env.DEV) {
      const configuredDateSlugs = Object.keys(
        LEARN_EDITORIAL_CONFIG.verifiedPublicationDates
      );
      const unknownDateSlugs = configuredDateSlugs.filter(
        (slug) => !ARTICLE_BY_ID.has(slug)
      );
      const missingDateSlugs = UNIQUE_ARTICLES
        .filter((article) => !publicationDateForArticle(article))
        .map((article) => article.id);

      if (unknownDateSlugs.length || missingDateSlugs.length) {
        console.warn(
          `[Learn configuration] Verified publication dates are out of sync. Unknown: ${unknownDateSlugs.join(", ") || "none"}. Missing: ${missingDateSlugs.join(", ") || "none"}.`
        );
      }
    }
    const formatPublicationDate = (date) =>
      new Intl.DateTimeFormat("en-CA", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${date}T00:00:00Z`));
    const LEARN_MORE_ARTICLES = UNIQUE_ARTICLES
      .filter((article) => !LEARN_START_HERE_IDS.has(article.id))
      .sort((left, right) =>
        publicationDateForArticle(right).localeCompare(
          publicationDateForArticle(left)
        )
      );
    const HOME_CORNERSTONE_ARTICLE_ID =
      "the-wealth-you-build-before-you-build-wealth";
    const HOME_PAGE_FIXED_ARTICLE_IDS = new Set([
      HOME_CORNERSTONE_ARTICLE_ID,
      ...LEARN_START_HERE_ARTICLES.map((article) => article.id),
    ]);
    const HOME_DAILY_ARTICLE_POOL = ARTICLES.filter(
      (article) =>
        article.image &&
        article.alt &&
        article.summary &&
        article.readTime &&
        article.category &&
        !HOME_PAGE_FIXED_ARTICLE_IDS.has(article.id)
    );

    function homeArticleForDate(date) {
      if (!HOME_DAILY_ARTICLE_POOL.length) return null;
      const localDayNumber = Math.floor(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
      );
      return HOME_DAILY_ARTICLE_POOL[
        localDayNumber % HOME_DAILY_ARTICLE_POOL.length
      ];
    }

    const ARTICLE_FAQS = {
      "you-only-get-about-1040-paydays": [
        {
          question: "Is 1,040 paydays an exact number?",
          answer: "No. It is a helpful illustration based on roughly 26 paychecks a year across a 40-year career. Your total will vary depending on how often you are paid and how long you work.",
        },
        {
          question: "Why think in paydays instead of dollars?",
          answer: "Dollars can feel endless, but paydays are limited. Thinking in paydays turns each paycheck into a clear decision point.",
        },
        {
          question: "What can one payday do for my future?",
          answer: "One payday might pay down debt, buy an investment, build emergency savings, or simply move you a little closer to freedom. One may not change everything, but hundreds can.",
        },
        {
          question: "What if I'm already far into my working life?",
          answer: "Wherever you are on your 1,040-payday journey, your next payday is still an opportunity to move in the right direction.",
        },
        {
          question: "What is the payday philosophy?",
          answer: "It is the idea that every paycheck is a choice. You may not control how many paydays you get, but you can decide what each one becomes.",
        },
      ],
      "who-wants-to-go-home": [
        {
          question: "Does this mean I should never leave work early?",
          answer: "No. Family, health, and rest matter. The point is to understand the trade-off and make the decision on purpose.",
        },
        {
          question: "What is the hidden cost of leaving early?",
          answer: "If the time is unpaid, every hour you leave early is income you do not receive. One hour may not matter much, but repeated often, those hours can add up.",
        },
        {
          question: "How do I know if leaving early is worth it?",
          answer: "Ask what you are getting in return for the hour. Sometimes rest or family time is worth more than the pay. Other times your future self may need that hour.",
        },
        {
          question: "Can small work decisions really affect my future?",
          answer: "One decision rarely changes everything. Repeated hundreds of times, small choices around time, spending, saving, and earning can quietly shape your future.",
        },
        {
          question: "What question should I ask before raising my hand?",
          answer: "Ask, \"What is this hour worth to me?\" The answer should be yours, not the crowd's and not just a habit.",
        },
      ],
      "one-hundred-dollars-one-lifetime-lesson": [
        {
          question: "Should I never lend money to friends or family?",
          answer: "That is a personal choice. A helpful boundary is to lend only an amount you could lose without damaging your own finances or the relationship.",
        },
        {
          question: "Does a written promissory note guarantee repayment?",
          answer: "No. Laws and enforceability vary, and a written agreement cannot guarantee that someone will pay. Seek qualified legal advice when the stakes are significant.",
        },
        {
          question: "Why treat a personal loan like a gift?",
          answer: "It helps you decide whether you can truly afford the risk and can reduce long-term resentment if repayment never arrives.",
        },
        {
          question: "How can I politely say no to a loan request?",
          answer: "Keep it simple and honest: explain that you are not able to lend money without putting your own financial plans at risk.",
        },
        {
          question: "What should I consider before lending money?",
          answer: "Consider your emergency savings, upcoming obligations, the impact of non-repayment, and whether clear expectations could protect the relationship.",
        },
      ],
      "when-extra-money-isnt-really-extra": [
        {
          question: "What counts as a financial windfall?",
          answer: "A windfall is money outside your normal expected income, such as a bonus, tax refund, inheritance, severance payment, or unexpected gift.",
        },
        {
          question: "Is it wrong to spend some unexpected money?",
          answer: "Not at all. The point is to make the decision intentionally and consider giving both your present life and your future a share.",
        },
        {
          question: "How should I divide a windfall?",
          answer: "There is no single correct split. Consider immediate needs, emergency savings, high-cost debt, longer-term goals, and something you will genuinely enjoy.",
        },
        {
          question: "Should severance money be treated differently?",
          answer: "Severance may need to replace income while you search for work. Protecting essential expenses and maintaining a cash buffer usually deserves careful consideration first.",
        },
        {
          question: "What question should I ask before spending it?",
          answer: "Ask: “How much of this belongs to my future?” That pause can keep an unexpected opportunity from becoming automatic spending.",
        },
      ],
      "rich-enough": [
        {
          question: "What does it mean to be rich enough?",
          answer: "It means having enough financial security and flexibility to make meaningful choices without money controlling every decision. The number will be different for every person.",
        },
        {
          question: "Is being rich enough the same as retiring early?",
          answer: "Not necessarily. Financial freedom can mean continuing to work because you enjoy it while knowing that work is no longer your only option.",
        },
        {
          question: "How can ordinary paydays create financial freedom?",
          answer: "Consistently saving, investing, and spending intentionally can compound across hundreds of paydays. The individual choices may feel small, but the repeated pattern can become powerful.",
        },
        {
          question: "How do I know how much is enough for me?",
          answer: "Start with the life you want to support, your essential expenses, a margin for unexpected events, and the choices you hope money will make possible. A qualified financial professional can help with a personalized plan.",
        },
        {
          question: "Do I need a high income to begin building more choices?",
          answer: "No. Income affects the pace, but the habit can begin with any sustainable amount. Protect the essentials, start where you are, and increase your saving or investing when your circumstances allow.",
        },
      ],
      "youre-not-too-late": [
        {
          question: "Is it really worth starting to save later in life?",
          answer: "Yes. Starting today cannot change the past, but it can improve every payday that follows. Even a shorter period of consistent saving can strengthen your options and resilience.",
        },
        {
          question: "What should my first savings goal be?",
          answer: "Choose a milestone that feels meaningful and achievable, such as $100, $500, or $1,000. Reaching it helps build confidence and creates momentum for the next goal.",
        },
        {
          question: "What if I can only save a small amount each payday?",
          answer: "A small sustainable amount is a real beginning. The habit matters, and you can increase the amount later when your income or expenses change.",
        },
        {
          question: "Should I save or invest first?",
          answer: "Many people begin with accessible emergency savings before investing for longer-term goals. The right order depends on your needs, debts, time horizon, and comfort with risk.",
        },
        {
          question: "How can I make saving more consistent?",
          answer: "Set aside money as soon as you are paid, automate the transfer when possible, and use a clear milestone so each deposit feels connected to visible progress.",
        },
      ],
      "love-is-wonderful-it-just-isnt-a-financial-plan": [
        {
          question: "Does financial independence mean keeping money separate from a partner?",
          answer: "Not necessarily. Couples can combine finances, keep some accounts separate, or use a mixture. The important part is that each person understands the plan and has meaningful financial awareness and security.",
        },
        {
          question: "How can partners build financial security together?",
          answer: "Talk openly about income, debt, saving, insurance, retirement, and shared goals. A strong joint plan can still respect each person's need for knowledge, access, and a voice in decisions.",
        },
        {
          question: "What should I build in my own name?",
          answer: "Needs vary, but accessible savings, retirement assets, credit history, and a clear understanding of household finances can all strengthen your foundation. Consider professional advice for your circumstances.",
        },
        {
          question: "Is planning for unexpected life changes pessimistic?",
          answer: "No. Planning is not predicting that something will go wrong. It is creating options so you and the people you love are better protected if life changes.",
        },
        {
          question: "What is one step I can take on my next payday?",
          answer: "Choose one foundation-building action: contribute to retirement, add to emergency savings, reduce debt, review insurance, or learn where important household accounts and documents are kept.",
        },
      ],
      "the-biggest-lie-about-retirement": [
        {
          question: "Is retirement an age or a financial position?",
          answer: "Retirement eligibility may involve ages and rules, but the freedom to choose whether you work depends more broadly on your resources, expenses, goals, health, and personal circumstances.",
        },
        {
          question: "How do I estimate how much retirement freedom I need?",
          answer: "Start with the life and expenses you want to support, then consider inflation, taxes, healthcare, longevity, other income sources, and a margin for uncertainty. Personalized professional advice can help.",
        },
        {
          question: "Can working in retirement still count as retirement?",
          answer: "Absolutely. If work is a choice rather than a financial requirement, part-time work, consulting, or a meaningful second career can all fit your version of retirement.",
        },
        {
          question: "What can I do if retirement feels impossibly far away?",
          answer: "Measure smaller gains in freedom: an emergency fund, lower debt, growing investments, or the ability to handle a setback. Those milestones make progress visible before your final working day.",
        },
        {
          question: "What can my next payday do for retirement?",
          answer: "It can fund a retirement contribution, reduce expensive debt, strengthen emergency savings, or simply reinforce the habit of giving part of today's income to your future choices.",
        },
      ],
      "everyone-needs-a-float": [
        {
          question: "Is a float the same as an emergency fund?",
          answer: "They serve a similar purpose: accessible cash that keeps unexpected expenses from becoming debt. You may call it a float, emergency fund, buffer, or cash cushion.",
        },
        {
          question: "How much money should I keep in my float?",
          answer: "There is no universal number. A first milestone might be $500 or $1,000, followed by one month of essential expenses and, over time, a larger cushion suited to your risks and responsibilities.",
        },
        {
          question: "Where should I keep this money?",
          answer: "A float generally belongs somewhere safe, accessible, and separate from everyday spending, such as an insured savings account. Accessibility usually matters more than chasing a high return.",
        },
        {
          question: "Should I build a float before investing?",
          answer: "Many people benefit from creating at least a starter cushion before taking more investment risk. Your priorities may also depend on expensive debt, employer matching, and personal circumstances.",
        },
        {
          question: "What should I do after I use part of my float?",
          answer: "Use it for the problem it was built to solve, then make replenishing it a payday priority. The fund did its job; rebuilding it prepares you for the next surprise.",
        },
      ],
      "the-number-that-really-matters": [
        {
          question: "What is the difference between gross salary and take-home pay?",
          answer: "Gross salary is your pay before deductions. Take-home pay is what reaches your account after taxes, pension or retirement contributions, insurance, benefits, and other deductions.",
        },
        {
          question: "Are payroll deductions always a bad thing?",
          answer: "No. Some deductions pay required taxes or fund valuable benefits and retirement savings. Understanding each deduction helps you see where your compensation is going.",
        },
        {
          question: "Why can someone with a lower salary build more wealth?",
          answer: "Income provides opportunity, but spending, saving, investing, debt, taxes, and time all affect the outcome. Someone who consistently keeps and invests part of their pay may build more choices than a higher earner who spends nearly everything.",
        },
        {
          question: "What is a smart way to handle a raise?",
          answer: "Decide in advance how much will improve life today and how much will support savings, investing, or debt repayment. Directing part of a raise toward the future can limit automatic lifestyle inflation.",
        },
        {
          question: "Which payday numbers should I track?",
          answer: "Useful measures include take-home pay, savings rate, investment contributions, debt reduction, and progress toward specific goals. Choose a small set that helps you make better decisions.",
        },
      ],
      "the-language-i-wish-id-learned-sooner": [
        {
          question: "Which financial terms should a beginner learn first?",
          answer: "Start with interest, compound growth, inflation, shares, bonds, diversification, fees, risk, and the difference between saving and investing. A few core ideas make many later decisions easier.",
        },
        {
          question: "What does owning a share mean?",
          answer: "A share represents a small ownership interest in a company. Its value can rise or fall, and some companies may distribute part of their profits to shareholders through dividends.",
        },
        {
          question: "What is compound interest?",
          answer: "Compounding happens when your money earns a return and future returns are earned on both the original amount and earlier gains. Time and consistency can make the effect powerful.",
        },
        {
          question: "Do I need to understand individual stocks before investing?",
          answer: "No. Many beginners use diversified funds rather than selecting individual companies. Understanding goals, risk, diversification, time horizon, and fees is more important than memorizing stock symbols.",
        },
        {
          question: "How can I start improving my financial literacy?",
          answer: "Choose one concept at a time, use trustworthy educational sources, review your own pension or investment documents, and ask questions whenever a term or fee is unclear.",
        },
      ],
      "the-month-i-accidentally-saved-money": [
        {
          question: "Can healthier habits really make a noticeable financial difference?",
          answer: "They can. Replacing repeated convenience purchases with planned meals, coffee from home, walking, or other routines may reduce spending without making saving the primary goal.",
        },
        {
          question: "Do I still need a budget if better habits reduce my spending?",
          answer: "Helpful habits and a budget can work together. Habits reduce friction, while a simple plan helps you notice the extra money and direct it toward goals instead of letting it disappear elsewhere.",
        },
        {
          question: "What should I do with money I save accidentally?",
          answer: "Give it a job. You might build your emergency fund, reduce debt, invest for a longer-term goal, or intentionally use part of it for something meaningful.",
        },
        {
          question: "Which habit should I change first?",
          answer: "Choose one frequent routine that would improve your life and feels realistic to repeat. Small, sustainable changes usually last longer than an ambitious overhaul.",
        },
        {
          question: "How long should I try a new habit before evaluating it?",
          answer: "A month is often long enough to observe patterns without demanding perfection. Look at how you feel, what you spent, and whether the habit is sustainable.",
        },
      ],
      "has-this-payday-finished-its-job": [
        {
          question: "What does it mean for a payday to finish its job?",
          answer: "It means the money you spent solved the problem it was meant to solve. The item may no longer be needed, but that does not mean the original purchase was a mistake.",
        },
        {
          question: "Is this article saying I should sell everything I do not use?",
          answer: "No. The point is not constant selling. The point is noticing whether something still serves a purpose in your life or whether its season has ended.",
        },
        {
          question: "How can this idea help financially?",
          answer: "It helps you see unused items as old paydays that may still have value. Selling, donating, or repurposing them can turn clutter into usefulness again.",
        },
        {
          question: "What if an item has sentimental value?",
          answer: "Sentimental value can be a real purpose. If something still brings comfort, memory, or meaning, it may not be finished at all.",
        },
        {
          question: "How often should I ask this question?",
          answer: "A few times a year is enough for most people. Closets, storage rooms, basements, and garages often reveal paydays that quietly completed their job long ago.",
        },
      ],
      "the-kitchen-i-coveted": [
        {
          question: "What is the main lesson in this story?",
          answer: "The story is about how comparison can make a perfectly good life feel lacking. Sometimes the problem is not what we own, but the way we have stopped seeing it.",
        },
        {
          question: "Does this mean home improvements are bad?",
          answer: "No. Renovating can make sense when something is broken, unsafe, inefficient, or truly important to your daily life. The key is knowing whether the desire comes from need or comparison.",
        },
        {
          question: "Why do renovation shows make people want to spend?",
          answer: "They show homes that have been cleaned, staged, edited, and professionally lit. After watching that, an ordinary lived-in room can start to feel worse even when nothing about it changed.",
        },
        {
          question: "How can I avoid expensive comparison spending?",
          answer: "Pause before replacing something that still works. Ask whether you would admire it in someone else's home and whether you are buying a real improvement or trying to recover a feeling.",
        },
        {
          question: "What is the takeaway?",
          answer: "You do not have to live in a showroom to build a beautiful life. Sometimes gratitude starts by seeing the room you already have with fresh eyes.",
        },
      ],
      "your-routine-was-spending-your-money": [
        {
          question: "How much should I save before trying to bank an entire paycheck?",
          answer: "Start by building enough to comfortably cover your normal expenses. The goal is to create flexibility, not financial stress.",
        },
        {
          question: "What if I can't save a whole paycheck yet?",
          answer: "Start with part of one. The habit matters far more than the amount.",
        },
        {
          question: "Why did stepping outside my routine reveal spending?",
          answer: "Because many everyday spending cues disappeared. It revealed how much spending was tied to habit, convenience, and repetition.",
        },
        {
          question: "Should I save the money or invest it?",
          answer: "Build an emergency fund first. After that, investing allows time and compound growth to work in your favour.",
        },
        {
          question: "What's the real lesson?",
          answer: "The biggest financial breakthroughs often begin with noticing patterns. Once you see which parts of your routine spend money automatically, you can choose more intentionally.",
        },
      ],
      "the-grocery-store-in-my-cupboard": [
        {
          question: "What is a cupboard challenge?",
          answer: "It is a simple experiment where you buy only true essentials for a short time and build meals from what you already have in your cupboard, fridge, or freezer.",
        },
        {
          question: "Is this just about spending less on groceries?",
          answer: "Not entirely. Saving money can happen, but the bigger lesson is noticing and respecting what your previous paydays have already provided.",
        },
        {
          question: "How long should I try it?",
          answer: "A week is a good starting point. A month can reveal bigger patterns, but the goal is awareness, not making life unnecessarily difficult.",
        },
        {
          question: "What should I still buy fresh?",
          answer: "Buy what genuinely cannot wait, such as milk, fruit, vegetables, or other basics your household needs. The challenge works best when it stays realistic.",
        },
        {
          question: "What should I do with the money I save?",
          answer: "Give it a purpose before it disappears elsewhere. Add it to savings, pay down debt, invest it, or use it for something that genuinely matters.",
        },
      ],
      "your-house-is-full-of-money-you-just-cant-see-it-yet": [
        {
          question: "How can my house be full of money?",
          answer: "Some value is hiding in things you already own: unused gift cards, food in the pantry, clothes you could sell, returnable items, spare change, books, tools, or things you can finally enjoy instead of buying more.",
        },
        {
          question: "Where should I start looking?",
          answer: "Start with one small area: a junk drawer, wallet, pantry shelf, closet, freezer, or entryway basket. A focused thirty-minute search is usually enough to find something useful.",
        },
        {
          question: "What should I do with things I no longer use?",
          answer: "Sell, donate, return, recycle, or give them away depending on their condition and value. The goal is to turn forgotten value into something useful again.",
        },
        {
          question: "Is using what I already own really a financial habit?",
          answer: "Yes. Noticing what you already have can delay unnecessary spending, reduce duplicate purchases, and help you respect the money you have already traded time to earn.",
        },
        {
          question: "What if I don't find much money?",
          answer: "You may still find value: a meal you can make, a book to reread, a candle to enjoy, or one less thing to buy. The awareness is often worth as much as the cash.",
        },
      ],
      "the-biggest-retirement-mistake-has-nothing-to-do-with-investing": [
        {
          question: "Is the biggest retirement mistake really not about investing?",
          answer: "Investing matters, but every investment begins with money that was not spent. The habits around ordinary paydays often decide whether retirement gets funded at all.",
        },
        {
          question: "How can one payday affect retirement?",
          answer: "One payday will not decide everything. Hundreds of paydays, handled with the same intention over many years, can quietly become a very different future.",
        },
        {
          question: "What if I can only save a small amount?",
          answer: "Start with an amount you can repeat. Fifty dollars, one hundred dollars, or even a small percentage increase after a raise can matter when the habit lasts.",
        },
        {
          question: "Should I save or invest first?",
          answer: "Build a basic emergency fund and deal with high-cost debt first. After that, investing can help your future self benefit from time and compound growth.",
        },
        {
          question: "What question should I ask on payday?",
          answer: "Ask, \"What will this payday do for my future?\" That simple question can turn an ordinary paycheque into a decision point.",
        },
      ],
      "the-best-age-to-retire-isnt-an-age": [
        {
          question: "What is the best age to retire?",
          answer: "There is no single best age. A better signal is when your investments can comfortably support the stable life you have intentionally built.",
        },
        {
          question: "Why does lifestyle matter so much?",
          answer: "Your lifestyle determines how much your investments need to provide. A lower, more predictable cost of living can make retirement easier to plan.",
        },
        {
          question: "Does this mean I should spend as little as possible?",
          answer: "No. The goal is not deprivation. It is keeping what genuinely improves your life and letting go of payments that do not add lasting value.",
        },
        {
          question: "How do I know what retirement will cost me?",
          answer: "Start by tracking your recurring monthly expenses and noticing which ones are stable, which ones are temporary, and which ones you can intentionally reduce over time.",
        },
        {
          question: "What can I do on my next payday?",
          answer: "Use your next payday to make one future-friendly decision: avoid a new payment, pay down debt, increase savings, or invest before extra spending begins.",
        },
      ],
      "the-wealth-you-build-before-you-build-wealth": [
        {
          question: "What is a wealth framework?",
          answer: "A wealth framework is the simple system that gives your money a purpose before it arrives: savings, investing, emergency money, debt payments, and a written plan.",
        },
        {
          question: "Why prepare before I have a lot of money?",
          answer: "Because more money moves through the habits you already have. Practicing with smaller amounts helps you make better decisions when larger opportunities arrive.",
        },
        {
          question: "Do I need to be wealthy to start building this?",
          answer: "No. You can begin with one account, one automatic transfer, one written rule, or one payday habit. The framework grows as your money grows.",
        },
        {
          question: "What is the first habit to build?",
          answer: "Give every payday a job before it gets spent. Even a small automatic transfer can start training the system that future wealth will rely on.",
        },
        {
          question: "How does confidence fit into building wealth?",
          answer: "Confidence helps you stay patient, avoid panic, and keep following the plan when markets, income, or life feel uncertain.",
        },
      ],
      "the-little-grocery-store": [
        {
          question: "What is lifestyle creep?",
          answer: "Lifestyle creep is the gradual increase in spending as income rises. Things that once felt special can quietly become part of everyday life.",
        },
        {
          question: "Is lifestyle creep always bad?",
          answer: "No. Enjoying the rewards of your hard work is part of life. The goal is to notice when an upgrade has become automatic and decide whether it still matters.",
        },
        {
          question: "How can I avoid lifestyle creep?",
          answer: "Before buying something, ask whether it truly makes your life better or whether it has simply become your new normal.",
        },
        {
          question: "Should I always buy the cheapest version?",
          answer: "No. Spend more on things that improve daily life, such as a good mattress, comfortable shoes, a reliable vehicle, or a warm winter coat. The point is intention, not deprivation.",
        },
        {
          question: "What's the biggest lesson from this story?",
          answer: "Success is not affording the premium version of everything. It is having the freedom to choose what is worth upgrading and what is not.",
        },
      ],
      "the-hidden-paycheque-at-work": [
        {
          question: "What is the hidden paycheque at work?",
          answer: "It is the value you receive beyond salary, such as retirement matching, health benefits, employee discounts, professional development, free meals, and money you did not have to spend.",
        },
        {
          question: "Which workplace benefit should I check first?",
          answer: "Start with retirement matching. If your employer contributes because you contribute, it can be one of the easiest financial wins available to you.",
        },
        {
          question: "Why do people miss workplace perks?",
          answer: "Many benefits are tucked away in portals, discount websites, plan booklets, or HR emails. A five-minute search can reveal savings people forget to use.",
        },
        {
          question: "What should I do with money saved through benefits?",
          answer: "Give it a purpose before it disappears. Save it, invest it, or use it to pay down debt.",
        },
        {
          question: "How often should I check my employer benefits?",
          answer: "Check at least once a year, before major purchases, and whenever your workplace updates benefit plans, discount programs, or wellness accounts.",
        },
      ],
      "why-saying-no-feels-so-hard": [
        {
          question: "What is loud budgeting?",
          answer: "Loud budgeting means being honest about where you do and do not want your money to go instead of pretending every invitation or purchase fits your priorities.",
        },
        {
          question: "Is loud budgeting the same as being cheap?",
          answer: "No. It is about spending intentionally. You can still buy things you value while saying no to things that do not fit your goals.",
        },
        {
          question: "What can I say instead of I can't afford that?",
          answer: "Try saying, \"That's not where I want my money to go.\" It keeps the focus on your priorities instead of shame or excuses.",
        },
        {
          question: "How can I use loud budgeting with friends?",
          answer: "Suggest an option that still lets you connect, such as coffee instead of dinner, a simpler hotel, or inviting someone over instead of going out.",
        },
        {
          question: "Why does saying no matter?",
          answer: "Every no creates room for a yes somewhere else, such as paying down debt, saving for retirement, building an emergency fund, or sleeping better at night.",
        },
      ],
      "ai-is-changing-the-9-to-5-club-heres-how-to-stay-in-it": [
        {
          question: "Is AI going to replace every office job?",
          answer: "Not every job, but it may change parts of many jobs. A better question is how you can use AI to become better, faster, and more valuable at the work you already do.",
        },
        {
          question: "Why is learning AI a financial decision?",
          answer: "Your ability to earn a paycheque is one of your biggest financial assets. Learning new tools can help protect and grow that earning power.",
        },
        {
          question: "Where can I learn new skills without spending much money?",
          answer: "Check your employer, government training programs, and YouTube before paying for a course. Many useful skills can be learned for free or at a low cost.",
        },
        {
          question: "What should I do if AI saves me time at work?",
          answer: "Use the time to solve bigger problems, learn another skill, help your team, or improve the quality of your work instead of simply filling the time.",
        },
        {
          question: "Do human skills still matter?",
          answer: "Yes. Communication, trust, listening, and problem solving become more valuable as technical tools become easier for everyone to access.",
        },
      ],
      "the-10000-blueprint": [
        {
          question: "How do I start saving $10,000?",
          answer: "Start by writing the goal at the top of a page, then list exactly where each dollar will come from before choosing a target date.",
        },
        {
          question: "Do I need to save $10,000 in one year?",
          answer: "No. Let your actual plan choose the timeline. Your income, bills, responsibilities, and opportunities are different from everyone else's.",
        },
        {
          question: "Where should I keep the money?",
          answer: "Use a separate no-fee savings account so the money is not mixed with everyday spending for groceries, gas, and bills.",
        },
        {
          question: "What if I cannot follow the plan perfectly?",
          answer: "Adjust it. Life will happen. The goal is progress, not perfection, and a good framework can bend without breaking.",
        },
        {
          question: "What should I do with unexpected money?",
          answer: "Give it a job before it reaches your everyday account. A tax refund, bonus, birthday money, or sale proceeds can move you closer to the finish line.",
        },
      ],
      "you-saved-3-and-lost-30000": [
        {
          question: "Why should I review renewals instead of just signing them?",
          answer: "Renewals are offers. A few minutes of attention can confirm you are getting a fair deal or reveal savings you would have missed.",
        },
        {
          question: "Do I have to switch providers every time?",
          answer: "No. The point is not to switch automatically. The point is to compare, ask questions, and make sure staying is an intentional decision.",
        },
        {
          question: "Can a small rate difference really matter?",
          answer: "Yes. On large financial commitments like a mortgage, even a small rate difference can add up to thousands of dollars over time.",
        },
        {
          question: "What should I ask my provider?",
          answer: "Ask whether there is flexibility on the rate or premium, whether discounts apply, and whether your coverage or terms still fit your life.",
        },
        {
          question: "What is the main lesson?",
          answer: "Celebrate small savings, but do not let them distract you from the bigger financial decisions that can change your future.",
        },
      ],
      "my-sofa-isnt-broken": [
        {
          question: "Does this mean I should never replace furniture?",
          answer: "No. Replace things when they no longer work, no longer fit your life, or are truly worn out. The point is not to replace something just because it is no longer perfect.",
        },
        {
          question: "How do I know if something is worn out?",
          answer: "Ask whether it still does the job you bought it to do. A wrinkle, scratch, or dent may be normal use, not failure.",
        },
        {
          question: "Why do trends make us spend more?",
          answer: "Trends can make perfectly useful things feel outdated. Noticing that pressure helps you decide whether you actually need something new.",
        },
        {
          question: "What should I do with money I do not spend replacing something?",
          answer: "Give it a purpose. Use it for savings, debt repayment, investing, a meaningful experience, or keep it available until you truly need it.",
        },
        {
          question: "What is the main lesson?",
          answer: "Normal wear is not always a reason to buy again. Sometimes the best financial decision is letting something useful keep doing its job.",
        },
      ],
      "buying-clothes-didnt-use-to-be-a-hobby": [
        {
          question: "Does this mean I should never buy new clothes?",
          answer: "No. Clothes wear out, sizes change, jobs change, and special occasions happen. The point is to buy clothes for a reason, not just because shopping became a habit.",
        },
        {
          question: "Why can clothing spending add up so quietly?",
          answer: "Most clothing purchases feel small on their own. When they become monthly routines, those ordinary purchases can turn into hundreds or thousands of dollars a year.",
        },
        {
          question: "What is a no clothes shopping challenge?",
          answer: "It is a short period where you pause clothing purchases to notice what you already own and reset the habit. The deeper goal is making intentional buying feel normal.",
        },
        {
          question: "How do I know if I need clothes or just want to shop?",
          answer: "Ask whether something is worn out, missing from your wardrobe, needed for a real event, or simply appealing because you are bored or scrolling.",
        },
        {
          question: "What should I do with money I do not spend on clothes?",
          answer: "Give it a job. Use it for savings, investing, debt repayment, an emergency fund, or something more meaningful than another item hanging in the closet.",
        },
      ],
      "the-most-valuable-asset-youll-ever-own": [
        {
          question: "Why is my ability to earn an income so valuable?",
          answer: "Your income funds nearly every other financial goal: bills, savings, investing, debt repayment, housing, and future choices.",
        },
        {
          question: "How can I invest in my earning power?",
          answer: "Prepare for reviews, track accomplishments, learn useful skills, improve communication, update your resume, and understand what your experience is worth.",
        },
        {
          question: "Do small raises really matter?",
          answer: "Yes. A small raise can affect every paycheck that follows, and investing that extra income can compound over many years.",
        },
        {
          question: "Why should I keep my resume updated?",
          answer: "Opportunity rarely gives much notice. Keeping your resume current helps you stay ready instead of rushing when a job change becomes important.",
        },
        {
          question: "What is the main lesson?",
          answer: "Before you focus only on buying assets, remember to protect and grow the asset that earns the money to buy them.",
        },
      ],
      "the-years-when-compound-interest-feels-like-nothing": [
        {
          question: "Why does compound interest feel slow at first?",
          answer: "Because your account is still small. In the beginning, most of the growth comes from your own contributions, not your investment returns.",
        },
        {
          question: "Does a market decline stop compound interest?",
          answer: "No. Market declines reduce the value of your investments, sometimes significantly. Long term results depend on what happens over many years, not a single market cycle.",
        },
        {
          question: "How often should I check my investments?",
          answer: "Most long term investors gain very little from watching daily market movements. Reviewing your investments periodically is usually more useful than reacting to every change.",
        },
        {
          question: "What matters most during the early years?",
          answer: "Consistent contributions, low investment costs, an appropriate level of risk, and enough emergency savings that you don't have to sell investments when you least want to.",
        },
        {
          question: "What is the biggest lesson?",
          answer: "The years that feel the least rewarding are often the years that make future compound growth possible.",
        },
      ],
      "how-to-spot-an-investment-scam-before-it-costs-you-everything": [
        {
          question: "What is one of the biggest warning signs of an investment scam?",
          answer: "Guaranteed high returns with little or no risk are a major warning sign. Real investing involves uncertainty.",
        },
        {
          question: "Why do scammers create urgency?",
          answer: "Urgency gives you less time to ask questions, verify details, or talk to someone you trust before sending money.",
        },
        {
          question: "Can scammers pretend to be people I know?",
          answer: "Yes. Compromised social media accounts and fake profiles can make scams feel safer because the message appears to come from someone familiar.",
        },
        {
          question: "What should I verify before investing?",
          answer: "Verify who the company or advisor is, whether they are registered, who holds your money, whether you can withdraw it, and whether independent information or complaints exist.",
        },
        {
          question: "What is the simplest rule to remember?",
          answer: "Never invest because someone wants an answer today. Sleep on it, research it, and ask questions first.",
        },
      ],
      "the-safest-envelope-is-at-the-bank": [
        {
          question: "Are cash envelopes bad?",
          answer: "No. Cash envelopes can be useful for short-term budget categories like groceries, entertainment, or spending money.",
        },
        {
          question: "Why is hidden cash risky?",
          answer: "Cash hidden at home can be stolen, lost, damaged, or found by someone else. If it disappears, there may be no record and no way to recover it.",
        },
        {
          question: "Why can a savings account be safer?",
          answer: "A savings account creates records, may earn interest, and may be protected by deposit insurance depending on the institution and account type.",
        },
        {
          question: "Should I keep any cash at home?",
          answer: "Some people keep a small amount for emergencies. Long-term savings, however, usually deserve stronger protection than a hiding place.",
        },
        {
          question: "What is the main lesson?",
          answer: "Short-term cash can help with budgeting, but money saved for important long-term goals deserves records, interest, protection, and a safer home.",
        },
      ],
      "the-day-your-credit-score-speaks-before-you-do": [
        {
          question: "What does a credit score measure?",
          answer: "A credit score does not measure your worth. It summarizes parts of your financial history, including how you have managed credit and payments over time.",
        },
        {
          question: "Why does credit matter before I apply for something?",
          answer: "By the time you apply for a mortgage, vehicle loan, apartment, or other credit, your history has already been recorded. That history can influence approvals, interest rates, and terms.",
        },
        {
          question: "How can I strengthen my credit score?",
          answer: "Pay bills on time, avoid maxing out credit cards, pay down debt when you can, and use credit responsibly over time.",
        },
        {
          question: "When should I start thinking about credit?",
          answer: "Before you need it. Credit is built payday after payday and month after month, not in the week before a major application.",
        },
        {
          question: "What is the main lesson?",
          answer: "Every payment and every credit decision helps write your financial reputation. The goal is to build a story that speaks well for you when it matters.",
        },
      ],
      "debt-grows-best-in-the-dark": [
        {
          question: "Why does ignoring debt make it worse?",
          answer: "Interest and fees can keep adding up whether you check the balance or not. Avoiding the number may feel easier briefly, but it usually delays the plan you need.",
        },
        {
          question: "What is the first step if I'm scared to look?",
          answer: "Open the statement and write down the current balance, interest rate, and minimum payment. Knowing the number gives you something real to work with.",
        },
        {
          question: "Do I need a perfect debt plan right away?",
          answer: "No. A simple first plan might be making payments on time, adding a little extra when you can, and choosing one balance to focus on first.",
        },
        {
          question: "Why should I check debt every payday?",
          answer: "Payday is a natural decision point. Looking regularly keeps the debt visible and lets you turn progress into a habit.",
        },
        {
          question: "What is the main lesson?",
          answer: "Debt grows best in the dark. Progress begins when you stop looking away, open the envelope, and make the next payment on purpose.",
        },
      ],
      "the-language-of-money": [
        {
          question: "Why does financial language feel intimidating?",
          answer: "Most of the words are not complicated once they are explained. They feel intimidating because they are unfamiliar at first.",
        },
        {
          question: "What is a bull market?",
          answer: "A bull market generally means stock prices are rising over a sustained period. The image comes from a bull driving its horns upward.",
        },
        {
          question: "What is a bear market?",
          answer: "A bear market generally means stock prices are falling over a sustained period. The image comes from a bear swiping downward.",
        },
        {
          question: "Do I need to know every financial term before I begin?",
          answer: "No. You can learn one word at a time. Each term you understand becomes another tool you can use in future money decisions.",
        },
        {
          question: "What is the main lesson?",
          answer: "Money has its own vocabulary. Once you learn a few words, conversations that once felt foreign begin to make sense.",
        },
      ],
      "your-house-is-not-your-retirement-plan": [
        {
          question: "Is buying a home a bad financial decision?",
          answer: "No. A home can be a meaningful place to live and may build equity. The point is that buying a home does not automatically replace saving and investing.",
        },
        {
          question: "Can renters still build wealth?",
          answer: "Yes. Renting does not prevent wealth if someone consistently saves, invests, avoids unnecessary debt, and makes intentional payday decisions.",
        },
        {
          question: "Does owning a home guarantee retirement security?",
          answer: "No. A home may become a valuable asset, but retirement security usually depends on a broader plan, including savings, investments, expenses, and income needs.",
        },
        {
          question: "What is the better question than rent versus buy?",
          answer: "Ask whether you are building your future where you live today. The habits matter more than the address.",
        },
        {
          question: "What is the main lesson?",
          answer: "Your house may be where you live, but it should not be the only place your future lives. Make sure every payday is building more than an address.",
        },
      ],
      "the-best-financial-decision-is-the-one-you-only-make-once": [
        {
          question: "Why does automation help with saving?",
          answer: "Automation removes the need to remake the same decision every payday. Money moves before life has a chance to spend it elsewhere.",
        },
        {
          question: "What does pay yourself first mean?",
          answer: "It means sending money to savings, investments, or debt repayment before treating the rest as available spending money.",
        },
        {
          question: "Does automation mean I can stop watching my money?",
          answer: "No. Automation supports good habits, but you still need to review accounts, adjust when life changes, and catch mistakes.",
        },
        {
          question: "What can I automate?",
          answer: "You can automate savings transfers, investment contributions, bill payments, and extra debt payments when your cash flow supports it.",
        },
        {
          question: "What is the main lesson?",
          answer: "Sometimes the best financial decision is the one you make once and let repeat. A simple system can carry your plan forward every payday.",
        },
      ],
      "the-most-expensive-word-in-personal-finance-is-later": [
        {
          question: "Why is later such an expensive word?",
          answer: "Later delays the small actions that build momentum. The cost is easy to miss because it is spread across ordinary paydays.",
        },
        {
          question: "Do I need to fix everything right away?",
          answer: "No. One useful payday decision is enough to begin: save a little, invest a little, pay extra on debt, or look at the number you have been avoiding.",
        },
        {
          question: "Why does waiting feel so harmless?",
          answer: "Nothing dramatic happens when you wait one more payday. That is why the habit is so easy to repeat until months quietly become years.",
        },
        {
          question: "What if life is too busy right now?",
          answer: "Tomorrow often looks a lot like today. Starting small can help you build the habit before everything feels perfect.",
        },
        {
          question: "What is the main lesson?",
          answer: "Do not let later quietly become never. Every payday is a chance to do one thing your future self will thank you for.",
        },
      ],
      "i-have-a-chequebook-somewhere": [
        {
          question: "Why write about cheques if people barely use them anymore?",
          answer: "That is the point. Cheques show how quietly money habits can become outdated when the world changes around us.",
        },
        {
          question: "Does this mean old financial habits are always bad?",
          answer: "No. Some old habits are useful. The risk is never questioning whether a habit still serves your life today.",
        },
        {
          question: "How can learning improve my finances?",
          answer: "Learning helps you notice better tools, safer options, simpler systems, and opportunities you might otherwise miss.",
        },
        {
          question: "Should I follow every new financial trend?",
          answer: "No. Curiosity does not mean chasing every trend. It means understanding enough to decide what is useful and what is worth ignoring.",
        },
        {
          question: "What is the main lesson?",
          answer: "Money never stands still. The people who usually do well are not the ones who know everything, but the ones who keep learning.",
        },
      ],
      "the-drawer-full-of-phone-chargers": [
        {
          question: "What is a financial junk drawer?",
          answer: "It is a collection of old accounts, subscriptions, cards, habits, or money decisions that may have made sense once but have not been reviewed in a long time.",
        },
        {
          question: "Does this mean I should close every old account?",
          answer: "No. Some old financial tools still serve a purpose. The point is to review them before assuming they still belong in your life.",
        },
        {
          question: "What should I look for first?",
          answer: "Look for unused subscriptions, forgotten accounts, old credit cards, bank fees, low-interest savings accounts, or anything you keep only because it feels familiar.",
        },
        {
          question: "How often should I review my financial habits?",
          answer: "A simple review once or twice a year can help. Payday is also a good reminder to ask whether your current setup still works for you.",
        },
        {
          question: "What is the main lesson?",
          answer: "Old habits can quietly outlive their usefulness. Sometimes progress means letting go of something that stopped serving you.",
        },
      ],
      "nobody-talks-about-financial-seasons": [
        {
          question: "What are financial seasons?",
          answer: "Financial seasons are the different stages of life where your money questions, priorities, risks, and goals naturally change.",
        },
        {
          question: "Why does financial advice depend on my season of life?",
          answer: "Advice that helps someone just starting out may not fit someone close to retirement. Your plan should reflect where you are today.",
        },
        {
          question: "Should my financial plan change over time?",
          answer: "Yes. As income, family, debt, goals, and retirement timelines change, your plan may need to shift with your life.",
        },
        {
          question: "Is it bad if my timeline looks different from someone else's?",
          answer: "No. People buy homes, have families, change careers, retire, and build wealth on different timelines. Comparing seasons rarely helps.",
        },
        {
          question: "What is the main lesson?",
          answer: "Every season asks something different of you. The best financial plan is the one that fits the life you are actually living today.",
        },
      ],
      "seeds-for-a-future-you-cannot-see-yet": [
        {
          question: "What is seed money?",
          answer: "Seed money is money used to plant something for the future, such as emergency savings, education, investing, debt reduction, or protection from risk.",
        },
        {
          question: "Does every financial seed grow?",
          answer: "No. Some choices will not produce the result you hoped for. The goal is to plant thoughtfully and consistently, knowing a few good seeds can matter a lot.",
        },
        {
          question: "What can I plant with my next payday?",
          answer: "You might start an emergency fund, reduce debt, invest, learn a new skill, help a child, or protect something important.",
        },
        {
          question: "Why think of a paycheck as seed money?",
          answer: "It helps you see every payday as more than money to spend. It becomes a chance to build something that may help your future self.",
        },
        {
          question: "What is the main lesson?",
          answer: "You may not know which seed will become tomorrow's harvest. The important thing is to keep planting.",
        },
      ],
      "why-money-flows-downhill": [
        {
          question: "What does it mean that money flows downhill?",
          answer: "It means money tends to follow the easiest existing path, such as convenience, habits, subscriptions, or spending routines, unless you direct it somewhere else.",
        },
        {
          question: "How can I change where my money flows?",
          answer: "Use systems such as automatic savings, investing, debt payments, and separate accounts so money moves toward your goals before convenience claims it.",
        },
        {
          question: "What are financial leaks?",
          answer: "Financial leaks are small recurring costs, forgotten subscriptions, fees, delivery charges, upgrades, or impulse purchases that quietly drain money over time.",
        },
        {
          question: "What is a financial float?",
          answer: "A financial float is money set aside in the background so unexpected expenses do not immediately become debt.",
        },
        {
          question: "What is the main lesson?",
          answer: "Your next paycheck is going somewhere. The more you shape the path before payday arrives, the more likely your money flows toward the future you want.",
        },
      ],
      "money-has-a-memory": [
        {
          question: "What does it mean that money has a memory?",
          answer: "It means some financial choices keep affecting your life long after the money is spent, through debt, growth, skills, opportunity, confidence, or regret.",
        },
        {
          question: "What kinds of money decisions echo for years?",
          answer: "Education, useful tools, investing, paying down high-interest debt, starting a business, and helping people grow can all create benefits that last.",
        },
        {
          question: "How does neglect have a memory?",
          answer: "Putting off maintenance, health care, debt, or saving may feel harmless at first, but the cost can arrive later in a larger and harder form.",
        },
        {
          question: "Can I change my financial story?",
          answer: "Yes. You cannot change yesterday's decisions, but each payday gives you another chance to save, invest, reduce debt, learn, or make a more thoughtful choice.",
        },
        {
          question: "What is the main lesson?",
          answer: "Every dollar is about to become a memory. Some disappear quickly, while others can keep helping your future self for years.",
        },
      ],
      "fixed-vs-variable-mortgage-rates-which-one-is-right-for-you": [
        {
          question: "What is the main difference between a fixed and variable mortgage rate?",
          answer: "A fixed rate stays the same for the mortgage term, while a variable rate moves with your lender's prime rate.",
        },
        {
          question: "Why might someone choose a fixed mortgage rate?",
          answer: "A fixed rate can make sense when predictable payments matter, your budget has little room for surprises, or rising payments would create stress.",
        },
        {
          question: "Why might someone choose a variable mortgage rate?",
          answer: "A variable rate may start lower and can benefit you if rates fall, but it requires comfort with uncertainty and the possibility of higher payments.",
        },
        {
          question: "Should I choose based only on the lowest rate?",
          answer: "No. Consider payment stability, your budget, risk tolerance, how long you expect to own the home, and what happens if you need to break the mortgage.",
        },
        {
          question: "What is the main lesson?",
          answer: "The best mortgage is not always the lowest rate. It is the one that fits your financial life and still works if conditions change.",
        },
      ],
      "what-do-you-do-when-you-have-almost-nothing-left": [
        {
          question: "What should I focus on when I have almost no money left?",
          answer: "Focus on protecting your next payday. Spend only on what helps you get there, such as transportation, food, work needs, or essentials.",
        },
        {
          question: "Why are payday loans so risky?",
          answer: "They can solve today's shortage by creating a bigger problem next payday because the interest and fees can be extremely high.",
        },
        {
          question: "What should I do if I cannot pay a bill?",
          answer: "Contact the company as early as possible. Some landlords, utilities, lenders, and service providers offer payment plans or hardship options if you ask.",
        },
        {
          question: "Is it okay to use a food bank?",
          answer: "Yes. Food banks exist for exactly these moments. There is no shame in accepting help when you need it.",
        },
        {
          question: "What is the main lesson?",
          answer: "When money is extremely tight, you do not have to fix everything at once. Make the next good decision and protect your next payday.",
        },
      ],
      "the-most-valuable-coat-i-never-owned": [
        {
          question: "Why can returning something feel hard?",
          answer: "Because buying often comes with excitement, while returning means admitting the purchase did not fit your real life. That can feel uncomfortable even when it is the right decision.",
        },
        {
          question: "What if I already paid for it?",
          answer: "The money is already gone. Keeping something you will not use does not bring the money back, and returning it while you still can may protect your future cash.",
        },
        {
          question: "How do I know if I should return something?",
          answer: "Ask whether you would buy it again today knowing what you know now. If the answer is no and it is still returnable, a refund may be the better choice.",
        },
        {
          question: "Is changing my mind a bad financial habit?",
          answer: "No. Changing your mind can be wise when new information shows a purchase was not right for you.",
        },
        {
          question: "What is the main lesson?",
          answer: "The smartest financial decision is not always making the perfect purchase. Sometimes it is correcting a purchase while you still have the chance.",
        },
      ],
      "the-habit-that-outlived-the-electric-bill": [
        {
          question: "Why keep small habits if they do not save much money?",
          answer: "Small habits can represent respect for what you already have. The dollar amount may be small, but the mindset can shape bigger financial decisions.",
        },
        {
          question: "Is this article really about electricity?",
          answer: "Not really. The light switch is the example. The larger lesson is about avoiding waste, appreciating what you have, and caring for the life you have built.",
        },
        {
          question: "Can frugal habits go too far?",
          answer: "Yes. A habit should support your life, not make it smaller or more stressful. The goal is gratitude and intention, not fear.",
        },
        {
          question: "What are other examples of habits like this?",
          answer: "Finishing leftovers, closing windows before running air conditioning, using something until it is truly worn out, or not replacing items that still do their job.",
        },
        {
          question: "What is the main lesson?",
          answer: "Some financial habits begin as necessity and later become values. They remind you not to waste what you worked hard to build.",
        },
      ],
      "the-room-i-chose-to-leave": [
        {
          question: "What is the main money lesson in this story?",
          answer: "Savings are not only for buying things. They can give you the freedom to leave a place, situation, or choice that no longer feels right.",
        },
        {
          question: "Why does having savings create more choices?",
          answer: "Even a small cushion can buy time, transportation, another room, or the ability to keep looking instead of accepting the first option available.",
        },
        {
          question: "Does this mean money solves every unsafe situation?",
          answer: "No. Safety can depend on many things, including support, timing, and outside help. But having some money available can make it easier to act when you need to leave.",
        },
        {
          question: "What if I cannot save much right now?",
          answer: "Start with what is possible. Even small amounts can build a little more flexibility over time.",
        },
        {
          question: "What is the main takeaway?",
          answer: "Financial progress is not always about having more. Sometimes it is about having enough freedom to say no and choose a different path.",
        },
      ],
      "the-raise-you-already-got": [
        {
          question: "How can workplace benefits feel like a raise?",
          answer: "If a benefit or discount saves you money you would have spent anyway, it has a similar effect to earning more because more of your paycheck stays with you.",
        },
        {
          question: "What benefits should I check first?",
          answer: "Start with retirement matching, health benefits, employee discounts, professional training, insurance rates, legal services, and any employee discount website your workplace offers.",
        },
        {
          question: "What if my employer does not offer many perks?",
          answer: "That can happen. The habit is still useful because checking first only takes a few minutes and may occasionally save you money.",
        },
        {
          question: "Should I spend the money I save?",
          answer: "If possible, give the savings a purpose. Save it, invest it, pay down debt, or use it for something that matters more than the purchase you avoided.",
        },
        {
          question: "What is the main lesson?",
          answer: "Your salary matters, but so does keeping more of it. Benefits you have already earned can quietly improve your financial position if you use them.",
        },
      ],
    };

    const currencies = [
      ["USD", "🇺🇸 USD"], ["CAD", "🇨🇦 CAD"], ["EUR", "🇪🇺 EUR"], ["GBP", "🇬🇧 GBP"],
      ["JPY", "🇯🇵 JPY"], ["CNY", "🇨🇳 CNY"], ["AUD", "🇦🇺 AUD"], ["CHF", "🇨🇭 CHF"],
      ["HKD", "🇭🇰 HKD"], ["SGD", "🇸🇬 SGD"], ["SEK", "🇸🇪 SEK"], ["KRW", "🇰🇷 KRW"],
      ["NOK", "🇳🇴 NOK"], ["NZD", "🇳🇿 NZD"], ["MXN", "🇲🇽 MXN"],
    ];

    function projectFuture(starting, contribution, years, periodsPerYear, returnRate, contributionGrowth = 0) {
      const periods = Math.max(years * periodsPerYear, 0);
      const rate = Math.max(returnRate, 0) / 100 / periodsPerYear;
      const growRate = contributionGrowth / 100 / periodsPerYear;
      let balance = Number(starting) || 0;
      let pay = Number(contribution) || 0;

      for (let i = 0; i < periods; i++) {
        balance = balance * (1 + rate) + pay;
        pay = pay * (1 + growRate);
      }

      return Math.max(balance, 0);
    }

    function loadSettings() {
      if (typeof window === "undefined") return DEFAULT_SETTINGS;

      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) return DEFAULT_SETTINGS;

        const parsed = JSON.parse(saved);
        if (!parsed || typeof parsed !== "object") return DEFAULT_SETTINGS;

        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          withdrawalRate: Number(parsed.withdrawalRate) > 0
            ? Number(parsed.withdrawalRate)
            : DEFAULT_SETTINGS.withdrawalRate,
          lifespan: Number(parsed.lifespan) >= 75
            ? Number(parsed.lifespan)
            : DEFAULT_SETTINGS.lifespan,
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }

    function NewsletterSignup({
      email,
      setEmail,
      newsletterStatus,
      setNewsletterStatus,
      setNewsletterError,
      newsletterError,
      newsletterMessageRef,
      submitNewsletter,
      idPrefix = "newsletter",
      buttonLabel = "Join",
      placeholder = "Enter your email",
    }) {
      const emailId = `${idPrefix}-email`;
      const consentId = `${idPrefix}-consent`;
      const messageId = `${idPrefix}-message`;

      if (newsletterStatus === "success") {
        return (
          <div
            className="newsletter-success-panel"
            ref={newsletterMessageRef}
            tabIndex="-1"
            role="status"
            aria-live="polite"
          >
            <strong>✓ You're on the list.</strong>
            <p>Thanks for joining 1040 Paydays.</p>
            <span>I'll occasionally send thoughtful articles, practical financial ideas, and useful calculators. No spam. Unsubscribe anytime.</span>
          </div>
        );
      }

      return (
        <form className="newsletter-signup" onSubmit={submitNewsletter} noValidate>
          <label className="sr-only" htmlFor={emailId}>Email address</label>
          <div className="email-row">
            <input
              id={emailId}
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (newsletterStatus === "error") {
                  setNewsletterStatus("idle");
                  setNewsletterError("");
                }
              }}
              placeholder={placeholder}
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={newsletterStatus === "error" ? "true" : "false"}
              aria-describedby={`${consentId} ${messageId}`}
              disabled={newsletterStatus === "loading"}
            />
            <input
              className="newsletter-honeypot"
              type="text"
              name="company"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />
            <button type="submit" disabled={newsletterStatus === "loading"}>
              {newsletterStatus === "loading" ? "Joining..." : buttonLabel}
            </button>
          </div>
          <small id={consentId}>{MAILING_LIST_CONSENT_TEXT}</small>
          <p
            id={messageId}
            className="newsletter-message"
            role={newsletterStatus === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {newsletterStatus === "error" ? newsletterError : ""}
          </p>
        </form>
      );
    }

    function CalculatorNumberField({
      id,
      label,
      value,
      setValue,
      error = "",
      prefix = "",
      suffix = "",
      min,
      max,
      step = "1",
    }) {
      const errorId = `${id}-error`;

      return (
        <label className="final-calculator-field" htmlFor={id}>
          <span>{label}</span>
          <div className="final-calculator-input-wrap">
            {prefix && <span aria-hidden="true">{prefix}</span>}
            <input
              id={id}
              type="number"
              value={value}
              min={min}
              max={max}
              step={step}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => {
                const nextValue = event.target.value;
                setValue(nextValue === "" ? "" : Number(nextValue));
              }}
              onBlur={() => {
                if (value === "") setValue(0);
              }}
            />
            {suffix && <span aria-hidden="true">{suffix}</span>}
          </div>
          {error && <small id={errorId} className="final-calculator-error">{error}</small>}
        </label>
      );
    }

    const LEGAL_PAGE_CONFIG = {
      "/privacy-policy": {
        key: "privacy",
        title: "Privacy Policy",
        metaTitle: "Privacy Policy | 1040 Paydays",
        description:
          "Read the 1040 Paydays Privacy Policy and learn how information, cookies, analytics, and third-party services may be handled.",
      },
      "/terms-of-use": {
        key: "terms",
        title: "Terms of Use",
        metaTitle: "Terms of Use | 1040 Paydays",
        description:
          "Read the terms governing the use of the 1040 Paydays website, articles, tools, and educational content.",
      },
      "/contact": {
        key: "contact",
        title: "Contact",
        metaTitle: "Contact | 1040 Paydays",
        description:
          "Contact 1040 Paydays with questions, feedback, corrections, or general inquiries.",
      },
    };

    const PRIMARY_NAV_LINKS = [
      { label: "Home", href: "/" },
      { label: "Learn", href: "/learn" },
      { label: "Calculator", href: "/calculator" },
      { label: "About", href: "/about" },
    ];

    function FooterPrimaryLinks({ separated = false }) {
      return PRIMARY_NAV_LINKS.map((link, index) => (
        <React.Fragment key={link.href}>
          {index > 0 && separated && <span aria-hidden="true">·</span>}
          <a href={link.href}>{link.label}</a>
        </React.Fragment>
      ));
    }

    function FooterLegalLinks() {
      return (
        <>
          <FooterPrimaryLinks separated />
          <span aria-hidden="true">·</span>
          <a href="/privacy-policy">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms-of-use">Terms of Use</a>
          <span aria-hidden="true">·</span>
          <a href="/contact">Contact</a>
        </>
      );
    }

    function LegalPage({
      page,
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
    }) {
      return (
        <div className="legal-page-shell">
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("/");
                }}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" onClick={() => navigateTo("/")}>Home</button>
                <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                <button type="button" onClick={() => navigateTo("/about")}>About</button>
              </nav>

              <div className="learn-index-actions">
                <a className="learn-index-subscribe" href="/#home-newsletter">
                  <Mail size={16} aria-hidden="true" />
                  Subscribe
                </a>
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="legal-page-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="legal-page-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" onClick={() => navigateTo("/")}>Home</button>
                    <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                    <button type="button" onClick={() => navigateTo("/about")}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main className="legal-page-main">
            <article className="legal-page-content">
              <header className="legal-page-heading">
                <p>1040 PAYDAYS</p>
                <h1>{page.title}</h1>
              </header>
              {page.key === "privacy" && <PrivacyPolicyContent />}
              {page.key === "terms" && <TermsOfUseContent />}
              {page.key === "contact" && <ContactContent />}
            </article>
          </main>

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">© 2026 1040 Paydays. All rights reserved.</p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function CalculatorPage({
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
      setPanel,
      currency,
      setCurrency,
      newsletterProps,
      panel,
      money,
      projection,
      compare,
      values,
      setters,
      paydaysUsed,
      paydaysRemaining,
      yearsRemaining,
      hasRetirementPlan,
      investedShare,
      snapshots,
      setSnapshots,
    }) {
      const [saveStatus, setSaveStatus] = useState("idle");
      const [saveMessage, setSaveMessage] = useState("");
      const [newsletterHighlighted, setNewsletterHighlighted] = useState(false);
      const [logScale, setLogScale] = useState(false);
      const [inflationAdjusted, setInflationAdjusted] = useState(false);
      const newsletterHighlightTimer = useRef(null);

      useEffect(() => (
        () => window.clearTimeout(newsletterHighlightTimer.current)
      ), []);

      const {
        starting,
        contribution,
        frequency,
        age,
        retireAge,
        returnRate,
        inflation,
      } = values;
      const {
        setStarting,
        setContribution,
        setFrequency,
        setAge,
        setRetireAge,
        setReturnRate,
      } = setters;

      const errors = {
        starting: Number(starting) < 0 ? "Starting balance cannot be negative." : "",
        contribution: Number(contribution) < 0 ? "Contribution cannot be negative." : "",
        age: Number(age) < 16 || Number(age) > 99 ? "Enter an age between 16 and 99." : "",
        retireAge: Number(retireAge) <= Number(age) || Number(retireAge) > 100
          ? "Retirement age must be greater than current age and no more than 100."
          : "",
        returnRate: Number(returnRate) < -20 || Number(returnRate) > 30
          ? "Expected return must be between -20% and 30%."
          : "",
      };
      const hasErrors = Object.values(errors).some(Boolean);
      const scenarioB = compare.find((item) => item.label.startsWith("Save +$")) || compare[1];
      const displayBalance = inflationAdjusted && yearsRemaining > 0
        ? Math.round(projection.balance / Math.pow(1 + Math.max(Number(inflation), 0) / 100, yearsRemaining))
        : projection.balance;
      const displayGrowth = Math.max(displayBalance - projection.invested, 0);
      const displayMonthly = Math.round((displayBalance * (values.withdrawalRate / 100)) / 12);
      const currencySymbol = {
        USD: "$",
        EUR: "€",
        GBP: "£",
      }[currency] || "$";

      const openPanel = (name) => {
        setMobileMenuOpen(false);
        setPanel(name);
      };

      const savePlan = () => {
        if (hasErrors) {
          setSaveStatus("error");
          setSaveMessage("Correct the highlighted calculator fields before saving.");
          return;
        }

        const savedProjection = {
          id: Date.now(),
          balance: projection.balance,
          monthly: projection.monthly,
          date: new Date().toLocaleDateString(),
          inputs: {
            starting,
            contribution,
            frequency,
            age,
            retireAge,
            returnRate,
            currency,
          },
        };

        try {
          setSnapshots([savedProjection, ...snapshots]);
          setSaveStatus("success");
          setSaveMessage("Your plan is saved on this device.");
        } catch {
          setSaveStatus("error");
          setSaveMessage("This browser could not save your plan. Please check its storage settings.");
        }
      };

      const focusNewsletter = (event) => {
        event.preventDefault();
        setMobileMenuOpen(false);
        setNewsletterHighlighted(true);
        window.clearTimeout(newsletterHighlightTimer.current);

        document.getElementById("calculator-newsletter")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        window.requestAnimationFrame(() => {
          document.getElementById("calculator-footer-email")?.focus({ preventScroll: true });
        });

        newsletterHighlightTimer.current = window.setTimeout(
          () => setNewsletterHighlighted(false),
          1800
        );
      };

      const runProjection = () => {
        if (hasErrors) {
          document.querySelector(".final-calculator-field [aria-invalid='true']")?.focus();
          return;
        }
        document.querySelector(".final-calculator-projection")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      };

      const principles = [
        [PAYDAY_PRINCIPLE_ICONS.liveToday, "Live Today", "Make the most of the life you have now."],
        [PAYDAY_PRINCIPLE_ICONS.protectTomorrow, "Protect Tomorrow", "Prepare for life's ups and downs."],
        [PAYDAY_PRINCIPLE_ICONS.planYourFuture, "Plan Your Future", "Save and invest one payday at a time to create more choices."],
        [PAYDAY_PRINCIPLE_ICONS.chooseWhatMatters, "Choose What Matters", "Align your money with your values and goals."],
      ];

      return (
        <div className={`final-calculator-page ${panel ? "is-obscured" : ""}`}>
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("/");
                }}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" onClick={() => navigateTo("/")}>Home</button>
                <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" className="active" aria-current="page">Calculator</button>
                <button type="button" onClick={() => navigateTo("/about")}>About</button>
              </nav>

              <div className="learn-index-actions">
                <a
                  className="learn-index-subscribe"
                  href="#calculator-newsletter"
                  onClick={focusNewsletter}
                >
                  <Mail size={16} aria-hidden="true" />
                  Subscribe
                </a>
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="calculator-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="calculator-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" onClick={() => navigateTo("/")}>Home</button>
                    <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" aria-current="page" onClick={() => setMobileMenuOpen(false)}>Calculator</button>
                    <button type="button" onClick={() => navigateTo("/about")}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main className="final-calculator-main">
            <div className="final-calculator-container">
              <div className="final-calculator-shell">
                <section className="final-calculator-card final-calculator-inputs">
                  <header>
                    <h1>Build your payday plan.</h1>
                    <p>Just a few numbers to see your future.</p>
                  </header>

                  <div className="final-calculator-fields">
                    <CalculatorNumberField
                      id="calculator-starting"
                      label="Starting balance"
                      value={starting}
                      setValue={setStarting}
                      error={errors.starting}
                      prefix={currencySymbol}
                      min="0"
                    />
                    <CalculatorNumberField
                      id="calculator-contribution"
                      label="Contribution each payday"
                      value={contribution}
                      setValue={setContribution}
                      error={errors.contribution}
                      prefix={currencySymbol}
                      min="0"
                    />
                    <label className="final-calculator-field" htmlFor="calculator-frequency">
                      <span>Pay frequency</span>
                      <select
                        id="calculator-frequency"
                        value={frequency}
                        onChange={(event) => setFrequency(event.target.value)}
                      >
                        <option>Biweekly</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </label>
                    <div className="final-calculator-field-split">
                      <CalculatorNumberField
                        id="calculator-age"
                        label="Current age"
                        value={age}
                        setValue={setAge}
                        error={errors.age}
                        min="16"
                        max="99"
                      />
                      <CalculatorNumberField
                        id="calculator-retirement-age"
                        label="Retire at age"
                        value={retireAge}
                        setValue={setRetireAge}
                        error={errors.retireAge}
                        min="17"
                        max="100"
                      />
                    </div>
                    <CalculatorNumberField
                      id="calculator-return"
                      label="Expected return (annual)"
                      value={returnRate}
                      setValue={setReturnRate}
                      error={errors.returnRate}
                      suffix="%"
                      min="-20"
                      max="30"
                      step="0.1"
                    />
                  </div>

                  <button
                    type="button"
                    className="final-calculator-advanced"
                    onClick={() => openPanel("advanced")}
                  >
                    <SlidersHorizontal size={15} aria-hidden="true" />
                    Advanced assumptions
                  </button>

                  <div className="final-calculator-trust">
                    <span><Lock size={13} aria-hidden="true" /> No account needed</span>
                    <span><BookOpen size={13} aria-hidden="true" /> Saved on your device</span>
                    <a href="/privacy-policy">
                      <ShieldAlert size={13} aria-hidden="true" /> Privacy settings
                    </a>
                  </div>

                  <button
                    type="button"
                    className="final-calculator-primary final-calculator-run"
                    onClick={runProjection}
                  >
                    Run projection
                  </button>
                </section>

                <div className="final-calculator-centre">
                  <section className="final-calculator-card final-payday-result">
                    <div className="final-payday-result-heading">
                      <h2>
                        You’ve already used <strong>{paydaysUsed.toLocaleString("en-CA")}</strong> paydays.
                        <br />
                        <span>{paydaysRemaining.toLocaleString("en-CA")}</span> remain.
                      </h2>
                      <label className="final-currency-picker" htmlFor="calculator-currency">
                        <span className="sr-only">Currency symbol</span>
                        <select
                          id="calculator-currency"
                          value={currency}
                          onChange={(event) => setCurrency(event.target.value)}
                          aria-label="Currency symbol"
                          title="Changes the displayed symbol without converting exchange rates"
                        >
                          <option value="USD">$</option>
                          <option value="EUR">€</option>
                          <option value="GBP">£</option>
                        </select>
                      </label>
                    </div>
                    <div className="final-payday-summary" aria-label="Payday summary">
                      <div><CalendarDays aria-hidden="true" /><span>Paydays used<strong>{paydaysUsed.toLocaleString("en-CA")}</strong></span></div>
                      <div><CircleDotDashed aria-hidden="true" /><span>Paydays remaining<strong>{paydaysRemaining.toLocaleString("en-CA")}</strong></span></div>
                      <div><UserRound aria-hidden="true" /><span>Current age<strong>{age}</strong></span></div>
                      <div><Sun aria-hidden="true" /><span>Years remaining<strong>{yearsRemaining}</strong></span></div>
                    </div>
                  </section>

                  <section className="final-calculator-card final-calculator-projection">
                    <div className="final-projection-heading">
                      <div>
                        <h2>Your projected future value</h2>
                        <p>(payday by payday)</p>
                      </div>
                      <div className="final-projection-toggles">
                        <label>
                          <input
                            type="checkbox"
                            checked={logScale}
                            onChange={(event) => setLogScale(event.target.checked)}
                          />
                          Log scale
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={inflationAdjusted}
                            onChange={(event) => setInflationAdjusted(event.target.checked)}
                          />
                          Inflation adjusted
                        </label>
                      </div>
                      <div className="final-projection-total">
                        <span>At age {retireAge}</span>
                        <strong>{money(displayBalance)}</strong>
                      </div>
                    </div>

                    <p className="sr-only">
                      At age {retireAge}, the projected account value is {money(displayBalance)},
                      consisting of {money(projection.invested)} in contributions and
                      {" "}{money(displayGrowth)} in projected investment growth.
                    </p>

                    <div className={`final-projection-chart ${logScale ? "is-log-scale" : ""}`}>
                      <ProjectionChart
                        age={age}
                        retireAge={retireAge}
                        money={money}
                        balance={displayBalance}
                        invested={projection.invested}
                        starting={starting}
                        paydaysUsed={paydaysUsed}
                        hasPlan={hasRetirementPlan}
                      />
                    </div>

                    <div className="final-projection-legend" aria-label="Chart legend">
                      <span><i className="contributions" />Your contributions</span>
                      <span><i className="growth" />Investment growth</span>
                      <span><i className="range" />Projected range</span>
                    </div>

                    <div className="final-projection-controls">
                      <button type="button" className="active">Scenario A</button>
                      <button
                        type="button"
                        onClick={() => setContribution(Math.max(0, Number(contribution) + 100))}
                      >
                        Scenario B: +$100 per payday
                        {scenarioB && <span>{money(scenarioB.value)}</span>}
                      </button>
                      <button type="button" className="link" onClick={() => openPanel("compare")}>
                        View math →
                      </button>
                    </div>
                  </section>
                </div>

                <aside className="final-calculator-sidebar">
                  <section className="final-outlook-card">
                    <div className="final-outlook-topline">
                      <span>Your outlook</span>
                      <em>Projection</em>
                    </div>
                    <p>At age {retireAge}</p>
                    <strong className="final-outlook-value">{money(displayBalance)}</strong>
                    <p>Projected future value</p>

                    <div className="final-outlook-mix">
                      <div><span>Your contributions</span><span>Investment growth</span></div>
                      <div
                        className="final-outlook-bar"
                        role="img"
                        aria-label={`${Math.round(investedShare)} percent contributions and ${Math.round(100 - investedShare)} percent growth`}
                      >
                        <span style={{ width: `${investedShare}%` }} />
                        <span style={{ width: `${100 - investedShare}%` }} />
                      </div>
                    </div>

                    <dl>
                      <div><dt>You invested</dt><dd>{money(projection.invested)}</dd></div>
                      <div><dt>Growth</dt><dd>{money(displayGrowth)}</dd></div>
                      <div><dt>Est. monthly income</dt><dd>{money(displayMonthly)}/mo</dd></div>
                      <div><dt>Paydays remaining</dt><dd>{paydaysRemaining.toLocaleString("en-CA")}</dd></div>
                    </dl>
                  </section>

                  <section className="final-calculator-card final-save-plan">
                    <span className="final-save-eyebrow">Save your payday plan</span>
                    <h2>Keep it for later.</h2>
                    <p>Save your inputs and projection on this device so you can return and track your progress.</p>
                    <div className="final-save-actions">
                      <button type="button" onClick={savePlan}>Save your plan</button>
                      {snapshots.length > 0 && (
                        <button
                          type="button"
                          className="final-view-plans"
                          onClick={() => openPanel("journal")}
                        >
                          View saved plans ({snapshots.length})
                        </button>
                      )}
                    </div>
                    <p className="final-save-privacy"><Lock size={13} aria-hidden="true" /> Saved privately in this browser.</p>
                    <p
                      id="save-plan-message"
                      className={`final-save-message ${saveStatus}`}
                      role={saveStatus === "error" ? "alert" : "status"}
                      aria-live="polite"
                    >
                      {saveMessage}
                    </p>
                  </section>
                </aside>
              </div>

              <section className="final-calculator-philosophy" aria-label="The 1040 Paydays philosophy">
                {principles.map(([Icon, title, description]) => (
                  <div key={title}>
                    <Icon size={24} fill="none" aria-hidden="true" />
                    <span><strong>{title}</strong><p>{description}</p></span>
                  </div>
                ))}
              </section>
            </div>
          </main>

          <section
            className={`reference-home-newsletter final-calculator-newsletter ${newsletterHighlighted ? "is-highlighted" : ""}`}
            id="calculator-newsletter"
            aria-labelledby="calculator-newsletter-title"
          >
            <div className="reference-home-container reference-home-newsletter-inner">
              <h2 id="calculator-newsletter-title">Get new ideas in your inbox.</h2>
              <NewsletterSignup
                {...newsletterProps}
                idPrefix="calculator-footer"
                buttonLabel="Subscribe"
                placeholder="Enter your email"
              />
            </div>
          </section>

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">© 2026 1040 Paydays. All rights reserved.</p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function AboutPage({
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
      newsletterProps,
      panel,
    }) {
      const principles = [
        [PAYDAY_PRINCIPLE_ICONS.liveToday, "LIVE TODAY", "Make the most of the life you have now."],
        [PAYDAY_PRINCIPLE_ICONS.protectTomorrow, "PROTECT TOMORROW", "Prepare for life’s ups and downs."],
        [PAYDAY_PRINCIPLE_ICONS.planYourFuture, "PLAN YOUR FUTURE", "Save and invest one payday at a time."],
        [PAYDAY_PRINCIPLE_ICONS.chooseWhatMatters, "CHOOSE WHAT MATTERS", "Align your money with your values and goals."],
      ];

      return (
        <div className={`about-page ${panel ? "is-obscured" : ""}`}>
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("/");
                }}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" onClick={() => navigateTo("/")}>Home</button>
                <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                <button type="button" className="active" aria-current="page">About</button>
              </nav>

              <div className="learn-index-actions">
                <a className="learn-index-subscribe" href="#about-newsletter">
                  <Mail size={16} aria-hidden="true" />
                  Subscribe
                </a>
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="about-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="about-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" onClick={() => navigateTo("/")}>Home</button>
                    <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                    <button type="button" aria-current="page" onClick={() => setMobileMenuOpen(false)}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main className="about-page-main">
            <div className="reference-home-container about-page-container">
              <section className="about-page-top" aria-labelledby="about-page-title">
                <div className="about-page-copy">
                  <h1 id="about-page-title">Our Philosophy</h1>
                  <div className="about-page-rule" aria-hidden="true" />

                  <div className="about-page-prose">
                    <p>
                      Most people think about money in dollars.<br />
                      <strong>We think about it in paydays.</strong>
                    </p>
                    <p>
                      Over a working life, most people receive about 1,040 paydays.<br />
                      Each one is a limited opportunity to shape the life you want.<br />
                      Once a payday passes, the decision that came with it is gone.
                    </p>
                    <p className="about-page-belief-label">1040 Paydays was built around a simple belief:</p>
                    <blockquote className="about-page-belief">
                      Small decisions, made consistently, have far more power<br />
                      than dramatic changes that rarely last.
                    </blockquote>
                    <ul className="about-page-statements">
                      <li>Live well today.</li>
                      <li>Protect yourself from tomorrow’s uncertainties.</li>
                      <li>Save and invest so future opportunities become possible.</li>
                      <li>Spend with intention on what matters most.</li>
                    </ul>
                  </div>
                </div>

                <figure className="about-calculator-frame">
                  <div className="about-browser-bar" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <div className="about-calculator-viewport">
                    <iframe
                      src="/calculator"
                      title="1040 Paydays calculator showing payday inputs, projected future value, and investment growth"
                      loading="lazy"
                      tabIndex="-1"
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    className="about-calculator-link"
                    href="/calculator"
                    aria-label="Open the 1040 Paydays calculator"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo("/calculator");
                    }}
                  />
                  <figcaption className="sr-only">
                    1040 Paydays calculator showing payday inputs, projected future value, and investment growth.
                  </figcaption>
                </figure>
              </section>

              <section className="about-principles" aria-label="The 1040 Paydays philosophy">
                {principles.map(([Icon, title, description]) => (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </article>
                ))}
              </section>
            </div>
          </main>

          <section
            className="reference-home-newsletter"
            id="about-newsletter"
            aria-labelledby="about-newsletter-title"
          >
            <div className="reference-home-container reference-home-newsletter-inner">
              <h2 id="about-newsletter-title">Get new ideas in your inbox.</h2>
              <NewsletterSignup
                {...newsletterProps}
                idPrefix="about"
                buttonLabel="Subscribe"
                placeholder="Enter your email"
              />
            </div>
          </section>

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">© 2026 1040 Paydays. All rights reserved.</p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function PhilosophyPage({
      page,
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
    }) {
      const articles = configuredArticles(
        page.articleSlugs,
        `philosophy page "${page.slug}"`
      ).slice(0, 3);
      const otherPages = PHILOSOPHY_PAGES.filter(
        (item) => item.slug !== page.slug
      );
      const Icon = PAYDAY_PRINCIPLE_ICONS[page.iconKey];
      const followLink = (event, path) => {
        event.preventDefault();
        navigateTo(path);
      };

      return (
        <div className="philosophy-page-shell">
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => followLink(event, "/")}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" onClick={() => navigateTo("/")}>Home</button>
                <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                <button type="button" onClick={() => navigateTo("/about")}>About</button>
              </nav>

              <div className="learn-index-actions">
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="philosophy-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="philosophy-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" onClick={() => navigateTo("/")}>Home</button>
                    <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                    <button type="button" onClick={() => navigateTo("/about")}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main className="philosophy-page-main">
            <div className="reference-home-container">
              <nav className="philosophy-breadcrumbs" aria-label="Breadcrumb">
                <a href="/" onClick={(event) => followLink(event, "/")}>Home</a>
                <span aria-hidden="true">/</span>
                <span>Philosophy</span>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{page.title}</span>
              </nav>

              <section className="philosophy-page-intro" aria-labelledby="philosophy-page-title">
                <div className="philosophy-page-number" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.7} fill="none" />
                  <span>{page.number}</span>
                </div>
                <h1 id="philosophy-page-title">{page.title}</h1>
                <p className="philosophy-page-statement">{page.statement}</p>
                <div className="philosophy-page-description">
                  {page.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {page.slug === "plan-your-future" && (
                <figure className="about-calculator-frame philosophy-calculator-frame">
                  <div className="about-browser-bar" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <div className="about-calculator-viewport">
                    <iframe
                      src="/calculator"
                      title="1040 Paydays calculator showing payday inputs, projected future value, and investment growth"
                      loading="lazy"
                      tabIndex="-1"
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    className="about-calculator-link"
                    href="/calculator"
                    aria-label="Open the 1040 Paydays calculator"
                    onClick={(event) => followLink(event, "/calculator")}
                  />
                  <figcaption className="sr-only">
                    1040 Paydays calculator showing payday inputs, projected future value, and investment growth.
                  </figcaption>
                </figure>
              )}

              <section className="philosophy-page-articles" aria-labelledby="philosophy-start-title">
                <header>
                  <p>PAYDAY JOURNAL</p>
                  <h2 id="philosophy-start-title">Start here</h2>
                </header>
                <div className="reference-home-latest-grid">
                  {articles.map((article) => (
                    <article key={article.id}>
                      <a
                        className="reference-home-latest-image"
                        href={`/learn/${article.id}`}
                        aria-label={`Read ${article.title}`}
                        onClick={(event) =>
                          followLink(event, `/learn/${article.id}`)
                        }
                      >
                        <img
                          src={article.image}
                          alt={article.alt}
                          width="800"
                          height="450"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                      <div className="reference-home-latest-copy">
                        <p className="reference-home-latest-category">
                          {article.category} <span aria-hidden="true">·</span> {article.readTime}
                        </p>
                        <h3>
                          <a
                            href={`/learn/${article.id}`}
                            onClick={(event) =>
                              followLink(event, `/learn/${article.id}`)
                            }
                          >
                            {article.title}
                          </a>
                        </h3>
                        <p>{article.summary}</p>
                        <a
                          className="reference-home-latest-link"
                          href={`/learn/${article.id}`}
                          aria-label={`Read article: ${article.title}`}
                          onClick={(event) =>
                            followLink(event, `/learn/${article.id}`)
                          }
                        >
                          Read article <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                <a
                  className="philosophy-view-all"
                  href="/learn"
                  onClick={(event) => followLink(event, "/learn")}
                >
                  View all articles <span aria-hidden="true">→</span>
                </a>
              </section>

              <section className="philosophy-page-more" aria-labelledby="philosophy-more-title">
                <h2 id="philosophy-more-title">Explore the other philosophies</h2>
                <div>
                  {otherPages.map((item) => {
                    const OtherIcon = PAYDAY_PRINCIPLE_ICONS[item.iconKey];
                    return (
                      <a
                        key={item.slug}
                        href={`/philosophy/${item.slug}`}
                        onClick={(event) =>
                          followLink(event, `/philosophy/${item.slug}`)
                        }
                      >
                        <OtherIcon size={26} strokeWidth={1.7} fill="none" aria-hidden="true" />
                        <span>{item.number}</span>
                        <strong>{item.title}</strong>
                      </a>
                    );
                  })}
                </div>
              </section>
            </div>
          </main>

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">© 2026 1040 Paydays. All rights reserved.</p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function ReferenceHomePage({
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
      newsletterProps,
      panel,
    }) {
      const followLink = (event, path) => {
        event.preventDefault();
        navigateTo(path);
      };

      const principles = PHILOSOPHY_PAGES.map((page) => ({
        ...page,
        Icon: PAYDAY_PRINCIPLE_ICONS[page.iconKey],
      }));

      return (
        <div className={`reference-home ${panel ? "is-obscured" : ""}`}>
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => followLink(event, "/")}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" className="active" aria-current="page">Home</button>
                <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                <button type="button" onClick={() => navigateTo("/about")}>About</button>
              </nav>

              <div className="learn-index-actions">
                <a className="learn-index-subscribe" href="#home-newsletter">
                  <Mail size={16} aria-hidden="true" />
                  Subscribe
                </a>
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="learn-index-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="learn-index-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" aria-current="page" onClick={() => setMobileMenuOpen(false)}>Home</button>
                    <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                    <button type="button" onClick={() => navigateTo("/about")}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main>
            <section className="reference-home-hero" aria-labelledby="reference-home-title">
              <img
                src="/home-mountain-sunrise-hero.png"
                alt="Sunrise over a mountain valley with evergreen trees in the foreground"
                width="1983"
                height="793"
                fetchpriority="high"
              />
              <div className="reference-home-hero-overlay" aria-hidden="true" />
              <div className="reference-home-hero-copy">
                <h1 id="reference-home-title">You only get about 1,040 paydays.</h1>
                <p>Every payday is a decision. Choose yours.</p>
                <a
                  href="/about"
                  onClick={(event) => followLink(event, "/about")}
                >
                  Explore the Philosophy
                </a>
              </div>
            </section>

            <section
              className="reference-home-introduction reference-home-container"
              aria-labelledby="reference-home-introduction-title"
            >
              <h2 id="reference-home-introduction-title">What is 1040 Paydays?</h2>
              <div>
                <p>
                  Most people will receive only about 1,040 paydays during their working lives.
                  1040 Paydays is a personal finance resource with practical articles,
                  interactive calculators, and tools to help you make every payday count.
                </p>
              </div>
            </section>

            <section
              className="reference-home-philosophy reference-home-container"
              id="home-philosophy"
              aria-labelledby="reference-philosophy-title"
            >
              <div className="reference-home-philosophy-heading">
                <span aria-hidden="true" />
                <h2 id="reference-philosophy-title">The 1040 Paydays Philosophy</h2>
                <span aria-hidden="true" />
              </div>
              <ol>
                {principles.map(({ slug, title, statement, Icon }) => (
                  <li key={slug}>
                    <a
                      href={`/philosophy/${slug}`}
                      onClick={(event) =>
                        followLink(event, `/philosophy/${slug}`)
                      }
                    >
                      <Icon
                        size={32}
                        strokeWidth={1.7}
                        fill="none"
                        aria-hidden="true"
                      />
                      <div>
                        <strong>{title}</strong>
                        <p>{statement}</p>
                        <span>Explore</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <section
              className="reference-home-latest"
              aria-labelledby="reference-latest-title"
            >
              <div className="reference-home-container">
                <header className="reference-home-latest-heading">
                  <div>
                    <h2 id="reference-latest-title">Latest Ideas</h2>
                    <p>Fresh perspectives to help you make the most of every payday.</p>
                  </div>
                  <a
                    href="/learn"
                    onClick={(event) => followLink(event, "/learn")}
                  >
                    Explore all articles <span aria-hidden="true">→</span>
                  </a>
                </header>

                <div className="reference-home-latest-grid">
                  {LEARN_START_HERE_ARTICLES.map((article) => (
                    <article key={article.id}>
                      <a
                        className="reference-home-latest-image"
                        href={`/learn/${article.id}`}
                        aria-label={`Read ${article.title}`}
                        onClick={(event) =>
                          followLink(event, `/learn/${article.id}`)
                        }
                      >
                        <img
                          src={article.image}
                          alt={article.alt}
                          width="800"
                          height="450"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                      <div className="reference-home-latest-copy">
                        <p className="reference-home-latest-category">
                          {article.category}
                        </p>
                        <h3>
                          <a
                            href={`/learn/${article.id}`}
                            onClick={(event) =>
                              followLink(event, `/learn/${article.id}`)
                            }
                          >
                            {article.title}
                          </a>
                        </h3>
                        <p>{article.summary}</p>
                        <a
                          className="reference-home-latest-link"
                          href={`/learn/${article.id}`}
                          aria-label={`Read article: ${article.title}`}
                          onClick={(event) =>
                            followLink(event, `/learn/${article.id}`)
                          }
                        >
                          Read article <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section
              className="reference-home-newsletter"
              id="home-newsletter"
              aria-labelledby="reference-newsletter-title"
            >
              <div className="reference-home-container reference-home-newsletter-inner">
                <h2 id="reference-newsletter-title">Get new ideas in your inbox.</h2>
                <NewsletterSignup
                  {...newsletterProps}
                  idPrefix="home-reference"
                  buttonLabel="Subscribe"
                  placeholder="Enter your email"
                />
              </div>
            </section>
          </main>

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">
                © 2026 1040 Paydays. All rights reserved.
              </p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function EditorialHomePage({
      currency,
      setCurrency,
      mobileMenuOpen,
      setMobileMenuOpen,
      navigateTo,
      setPanel,
      newsletterProps,
      panel,
    }) {
      const cornerstoneArticle = ARTICLE_BY_ID.get(HOME_CORNERSTONE_ARTICLE_ID);
      const [dailyArticle, setDailyArticle] = useState(() =>
        homeArticleForDate(new Date())
      );
      const dailyRotationPaused = useRef(false);

      useEffect(() => {
        const now = new Date();
        const nextLocalMidnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1
        );
        const timer = window.setTimeout(() => {
          if (!dailyRotationPaused.current) {
            setDailyArticle(homeArticleForDate(new Date()));
          }
        }, nextLocalMidnight.getTime() - now.getTime() + 1000);

        return () => window.clearTimeout(timer);
      }, [dailyArticle?.id]);

      const resumeDailyRotation = () => {
        dailyRotationPaused.current = false;
        const currentDailyArticle = homeArticleForDate(new Date());
        if (currentDailyArticle?.id !== dailyArticle?.id) {
          setDailyArticle(currentDailyArticle);
        }
      };

      const followLink = (event, path) => {
        event.preventDefault();
        navigateTo(path);
      };

      const openPanel = (name) => {
        setMobileMenuOpen(false);
        setPanel(name);
      };

      return (
        <div className={`editorial-home ${panel ? "is-obscured" : ""}`}>
          <header className="editorial-home-header">
            <div className="editorial-home-header-inner editorial-page-width">
              <a
                className="editorial-home-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => followLink(event, "/")}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="editorial-home-nav" aria-label="Primary navigation">
                <a href="/learn" onClick={(event) => followLink(event, "/learn")}>
                  Learn <span aria-hidden="true">⌄</span>
                </a>
                <button type="button" onClick={() => openPanel("calculator")}>Calculator</button>
                <button type="button" onClick={() => openPanel("compare")}>Compare</button>
                <button type="button" onClick={() => openPanel("how")}>How it works</button>
              </nav>

              <div className="editorial-home-actions">
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  aria-label="Currency"
                >
                  {currencies.map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
                <button
                  className="editorial-home-menu"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="editorial-home-mobile-nav"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
                {mobileMenuOpen && (
                  <nav
                    className="editorial-home-mobile-nav"
                    id="editorial-home-mobile-nav"
                    aria-label="Mobile navigation"
                  >
                    <a href="/learn" onClick={(event) => followLink(event, "/learn")}>Learn</a>
                    <button type="button" onClick={() => openPanel("calculator")}>Calculator</button>
                    <button type="button" onClick={() => openPanel("compare")}>Compare</button>
                    <button type="button" onClick={() => openPanel("how")}>How it works</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          <main>
            <section className="editorial-hero editorial-page-width" aria-labelledby="editorial-home-title">
              <div className="editorial-hero-copy">
                <h1 id="editorial-home-title">
                  You only get<br />
                  about <span>1,040</span><br />
                  paydays.
                </h1>
                <p className="editorial-hero-deck">
                  Every payday is a decision. Make yours count.
                </p>
                <span className="editorial-gold-rule" aria-hidden="true" />

                <div className="editorial-actions">
                  <a
                    className="editorial-primary-action"
                    href="/learn"
                    onClick={(event) => followLink(event, "/learn")}
                  >
                    Start reading <span aria-hidden="true">→</span>
                  </a>
                  <button type="button" onClick={() => openPanel("calculator")}>
                    Explore your paydays <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>

              {dailyArticle && (
                <figure className="editorial-hero-image">
                  <a
                    className="editorial-hero-article"
                    href={`/learn/${dailyArticle.id}`}
                    aria-label={`Read ${dailyArticle.title}`}
                    onMouseEnter={() => {
                      dailyRotationPaused.current = true;
                    }}
                    onMouseLeave={resumeDailyRotation}
                    onFocus={() => {
                      dailyRotationPaused.current = true;
                    }}
                    onBlur={resumeDailyRotation}
                    onClick={(event) =>
                      followLink(event, `/learn/${dailyArticle.id}`)
                    }
                  >
                    <span className="editorial-hero-article-image">
                      <img
                        src={dailyArticle.image}
                        alt={dailyArticle.alt}
                        width="1200"
                        height="800"
                      />
                    </span>
                    <figcaption>
                      <p className="editorial-hero-article-label">
                        FEATURED ARTICLE
                      </p>
                      <h2>{dailyArticle.title}</h2>
                      <p className="editorial-hero-article-description">
                        {dailyArticle.summary}
                      </p>
                      <div className="editorial-hero-article-meta">
                        <span>{dailyArticle.readTime}</span>
                        <span aria-hidden="true">|</span>
                        <span>{dailyArticle.category}</span>
                        <span className="editorial-hero-article-arrow" aria-hidden="true">
                          →
                        </span>
                      </div>
                    </figcaption>
                  </a>
                </figure>
              )}

              <ol className="editorial-pillars">
                <li>
                  <span>01</span>
                  <strong>Live Today.</strong>
                  <p>Make the most of the life you have now.</p>
                </li>
                <li>
                  <span>02</span>
                  <strong>Protect Tomorrow.</strong>
                  <p>Prepare for life’s ups and downs.</p>
                </li>
                <li>
                  <span>03</span>
                  <strong>Plan Your Future.</strong>
                  <p>Save and invest one payday at a time to create more choices.</p>
                </li>
                <li>
                  <span>04</span>
                  <strong>Choose What Matters.</strong>
                  <p>Align your money with your values and goals.</p>
                </li>
              </ol>
            </section>

            {cornerstoneArticle && (
              <section className="editorial-cornerstone editorial-page-width" aria-labelledby="cornerstone-title">
                <div className="editorial-cornerstone-copy">
                  <p className="editorial-kicker">Cornerstone article</p>
                  <h2 id="cornerstone-title">{cornerstoneArticle.title}</h2>
                  <p>{cornerstoneArticle.summary}</p>
                  <a
                    href={`/learn/${cornerstoneArticle.id}`}
                    onClick={(event) => followLink(event, `/learn/${cornerstoneArticle.id}`)}
                  >
                    Read the essay <span aria-hidden="true">→</span>
                  </a>
                </div>
                <a
                  className="editorial-cornerstone-image"
                  href={`/learn/${cornerstoneArticle.id}`}
                  onClick={(event) => followLink(event, `/learn/${cornerstoneArticle.id}`)}
                  aria-label={`Read ${cornerstoneArticle.title}`}
                >
                  <img
                    src="/home-cornerstone-reading.jpg"
                    alt="An open book on a sunlit wooden table beside a ceramic cup and small plant"
                    width="1792"
                    height="887"
                    loading="lazy"
                  />
                </a>
              </section>
            )}

            <section className="editorial-start editorial-page-width" aria-labelledby="editorial-start-title">
              <div className="editorial-section-heading">
                <div>
                  <p className="editorial-kicker">Start here</p>
                  <h2 id="editorial-start-title">Three essays to understand our approach to money.</h2>
                </div>
                <a href="/learn" onClick={(event) => followLink(event, "/learn")}>
                  View all articles <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="editorial-start-grid">
                {LEARN_START_HERE_ARTICLES.map((article) => (
                  <article key={article.id}>
                    <a
                      className="editorial-start-image"
                      href={`/learn/${article.id}`}
                      onClick={(event) => followLink(event, `/learn/${article.id}`)}
                      aria-label={`Read ${article.title}`}
                    >
                      <img
                        src={article.image}
                        alt={article.alt}
                        width="800"
                        height="450"
                        loading="lazy"
                      />
                    </a>
                    <div>
                      <p className="editorial-article-meta">
                        {article.category} <span>·</span> {article.readTime}
                      </p>
                      <h3>
                        <a
                          href={`/learn/${article.id}`}
                          onClick={(event) => followLink(event, `/learn/${article.id}`)}
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p>{article.summary}</p>
                      <a
                        className="editorial-read-link"
                        href={`/learn/${article.id}`}
                        onClick={(event) => followLink(event, `/learn/${article.id}`)}
                      >
                        Read the essay <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="editorial-newsletter editorial-page-width" aria-labelledby="editorial-newsletter-title">
              <div className="editorial-envelope" aria-hidden="true"><Mail size={30} /></div>
              <div className="editorial-newsletter-copy">
                <h2 id="editorial-newsletter-title">Thoughts worth bringing to your next payday.</h2>
                <p>Essays, ideas and practical money decisions.</p>
                <p>No spam. Just thoughtful writing about making every payday count.</p>
              </div>
              <NewsletterSignup
                {...newsletterProps}
                idPrefix="home-editorial"
                buttonLabel="Join 1040 Paydays"
                placeholder="Your email address"
              />
            </section>

            <section className="editorial-calculator editorial-page-width" aria-labelledby="editorial-calculator-title">
              <div className="editorial-calculator-copy">
                <p className="editorial-kicker">Explore your future</p>
                <h2 id="editorial-calculator-title">See what your choices could become.</h2>
                <p>Use the 1040 Paydays calculator to explore different paths and make every payday count.</p>
                <button className="editorial-primary-action" type="button" onClick={() => openPanel("calculator")}>
                  Open the calculator <span aria-hidden="true">→</span>
                </button>
              </div>
              <figure>
                <img
                  src="/home-calculator-planning.jpg"
                  alt="A planning notebook, phone, and fountain pen with simple navy and gold growth lines"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </figure>
            </section>

            <section className="editorial-topics editorial-page-width" aria-labelledby="editorial-topics-title">
              <p className="editorial-kicker" id="editorial-topics-title">Browse by topic</p>
              <div className="editorial-topic-list">
                {LEARN_EDITORIAL_CONFIG.clusters.map((cluster, index) => (
                  <a
                    key={cluster.slug}
                    href={`/learn/${cluster.slug}`}
                    onClick={(event) => followLink(event, `/learn/${cluster.slug}`)}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{cluster.title}</strong>
                  </a>
                ))}
                <a href="/learn" onClick={(event) => followLink(event, "/learn")}>
                  <span aria-hidden="true">05</span>
                  <strong>All Essays</strong>
                </a>
              </div>
            </section>
          </main>

          <footer className="editorial-home-footer">
            <div className="editorial-footer-inner editorial-page-width">
              <div>
                <h2>Make Every Payday Count.</h2>
                <p>One payday at a time. Build consistency.</p>
              </div>
              <nav className="editorial-footer-nav" aria-label="Footer navigation">
                <FooterPrimaryLinks />
                <a href="/privacy-policy">Privacy</a>
                <a href="/terms-of-use">Terms</a>
                <a href="/contact">Contact</a>
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    export default function App() {
      const [initialSettings] = useState(loadSettings);
      const [route, setRoute] = useState(() => window.location.pathname);
      const [currency, setCurrency] = useState(initialSettings.currency);
      const [starting, setStarting] = useState(initialSettings.starting);
      const [contribution, setContribution] = useState(initialSettings.contribution);
      const [frequency, setFrequency] = useState(initialSettings.frequency);
      const [age, setAge] = useState(initialSettings.age);
      const [retireAge, setRetireAge] = useState(initialSettings.retireAge);
      const [returnRate, setReturnRate] = useState(initialSettings.returnRate);

      const [withdrawalRate, setWithdrawalRate] = useState(initialSettings.withdrawalRate);
      const [lifespan, setLifespan] = useState(initialSettings.lifespan);
      const [inflation, setInflation] = useState(initialSettings.inflation);
      const [feeRate, setFeeRate] = useState(initialSettings.feeRate);
      const [contributionGrowth, setContributionGrowth] = useState(initialSettings.contributionGrowth);

      const [panel, setPanel] = useState(null);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const mobileArticleStripRef = useRef(null);
      const [email, setEmail] = useState("");
      const [newsletterStatus, setNewsletterStatus] = useState("idle");
      const [newsletterError, setNewsletterError] = useState("");
      const newsletterMessageRef = useRef(null);
      const [snapshots, setSnapshots] = useState(initialSettings.snapshots);
      const [showStartTip, setShowStartTip] = useState(() => {
        if (typeof window === "undefined") return false;
        try {
          return window.localStorage.getItem(ONBOARDING_KEY) !== "seen";
        } catch {
          return true;
        }
      });
      const [tipLeaving, setTipLeaving] = useState(false);
      const [introPulse, setIntroPulse] = useState(true);
      const hasTrackedInitialPageView = useRef(false);

      const [compareExtraSavings, setCompareExtraSavings] = useState(50);
      const [compareReturn, setCompareReturn] = useState(8);
      const [compareRetireAge, setCompareRetireAge] = useState(70);
      const [compareWaitYears, setCompareWaitYears] = useState(5);

      const paydaysPerYear = frequency === "Weekly" ? 52 : frequency === "Monthly" ? 12 : 26;
      const hasRetirementPlan = Number(age) > 0 && Number(retireAge) > Number(age);
      const yearsRemaining = hasRetirementPlan ? Math.max(retireAge - age, 0) : 0;
      const retirementYears = Math.max(lifespan - retireAge, 0);
      const paydaysRemaining = Math.round(yearsRemaining * paydaysPerYear);
      const paydaysUsed = hasRetirementPlan ? Math.max(PAYDAYS_TOTAL - paydaysRemaining, 0) : 0;

      useEffect(() => {
        const timer = window.setTimeout(() => setIntroPulse(false), 1100);
        return () => window.clearTimeout(timer);
      }, []);

      useEffect(() => {
        const handlePopState = () => {
          setRoute(window.location.pathname);
          setPanel(null);
          setMobileMenuOpen(false);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
      }, []);

      useEffect(() => {
        const normalizedPath = route.length > 1 ? route.replace(/\/+$/, "") : route;
        const routeSlug = normalizedPath.startsWith("/learn/")
          ? normalizedPath.slice("/learn/".length)
          : "";
        const cluster = LEARN_CLUSTER_BY_SLUG.get(routeSlug);
        const article = ARTICLE_BY_ID.get(routeSlug);
        const philosophySlug = normalizedPath.startsWith("/philosophy/")
          ? normalizedPath.slice("/philosophy/".length)
          : "";
        const philosophyPage = PHILOSOPHY_BY_SLUG.get(philosophySlug);
        const isLearnIndex = normalizedPath === "/learn";
        const isCalculatorRoute = normalizedPath === "/calculator";
        const isAboutRoute = normalizedPath === "/about";
        const legalPage = LEGAL_PAGE_CONFIG[normalizedPath];
        const isLearnRoute = isLearnIndex || Boolean(cluster) || Boolean(article);
        const title = article
          ? `${article.title} | 1040 Paydays`
          : philosophyPage
            ? philosophyPage.metaTitle
            : cluster
              ? `${cluster.title} | Learn | 1040 Paydays`
              : isLearnIndex
                ? "Learn | 1040 Paydays"
                : isCalculatorRoute
                  ? "Calculator | 1040 Paydays"
                  : isAboutRoute
                    ? "About 1040 Paydays | Our Philosophy"
                    : legalPage
                      ? legalPage.metaTitle
                      : "1040 Paydays | Savings and Retirement Calculator by Paycheck";
        const description = article
          ? article.summary
          : philosophyPage
            ? philosophyPage.metaDescription
            : cluster
              ? cluster.intro
              : isLearnIndex
                ? "Thoughtful articles and stories to help you make better financial decisions—one payday at a time."
                : isCalculatorRoute
                  ? "Build a payday-by-payday savings plan and explore how regular contributions may grow over time."
                  : isAboutRoute
                    ? "Learn the philosophy behind 1040 Paydays and how small, consistent financial decisions can help create more freedom, security, and choice over time."
                    : legalPage
                      ? legalPage.description
                      : "Estimate how much you can save from every paycheck. Use 1040 Paydays to plan savings, retirement, and future growth with a simple calculator.";
        const canonicalPath =
          isLearnRoute || philosophyPage || isCalculatorRoute || isAboutRoute || legalPage
            ? normalizedPath
            : "/";
        const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;

        const setMeta = (selector, attribute, value) => {
          let element = document.head.querySelector(selector);
          if (!element) {
            element = document.createElement("meta");
            const [name, key] = attribute;
            element.setAttribute(name, key);
            document.head.appendChild(element);
          }
          element.setAttribute("content", value);
        };

        document.title = title;
        setMeta('meta[name="description"]', ["name", "description"], description);
        setMeta('meta[property="og:title"]', ["property", "og:title"], title);
        setMeta('meta[property="og:description"]', ["property", "og:description"], description);
        setMeta('meta[property="og:type"]', ["property", "og:type"], article ? "article" : "website");
        setMeta('meta[property="og:url"]', ["property", "og:url"], canonicalUrl);
        const publicationDate = article ? publicationDateForArticle(article) : "";
        if (publicationDate) {
          setMeta(
            'meta[property="article:published_time"]',
            ["property", "article:published_time"],
            publicationDate
          );
        } else {
          document.head
            .querySelector('meta[property="article:published_time"]')
            ?.remove();
        }

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.setAttribute("rel", "canonical");
          document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", canonicalUrl);

        const existingStructuredData = document.getElementById("learn-structured-data");
        const collectionArticles = isLearnIndex
          ? UNIQUE_ARTICLES
          : philosophyPage
            ? configuredArticles(
                philosophyPage.articleSlugs,
                `philosophy page "${philosophyPage.slug}"`
              )
          : cluster
            ? articlesForCluster(cluster)
            : [];

        if (article) {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            url: canonicalUrl,
            mainEntityOfPage: canonicalUrl,
            image: new URL(article.image, SITE_URL).href,
            author: {
              "@type": "Organization",
              name: "1040 Paydays Editorial Team",
              url: `${SITE_URL}/`,
            },
            publisher: {
              "@type": "Organization",
              name: "1040 Paydays",
              url: `${SITE_URL}/`,
            },
            ...(publicationDate ? { datePublished: publicationDate } : {}),
          };
          const script = existingStructuredData || document.createElement("script");
          script.id = "learn-structured-data";
          script.type = "application/ld+json";
          script.textContent = JSON.stringify(structuredData);
          if (!existingStructuredData) document.head.appendChild(script);
        } else if (collectionArticles.length) {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: cluster ? cluster.title : "Learn",
            description,
            url: canonicalUrl,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: collectionArticles.length,
              itemListElement: collectionArticles.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}/learn/${item.id}`,
                name: item.title,
              })),
            },
          };
          const script = existingStructuredData || document.createElement("script");
          script.id = "learn-structured-data";
          script.type = "application/ld+json";
          script.textContent = JSON.stringify(structuredData);
          if (!existingStructuredData) document.head.appendChild(script);
        } else {
          existingStructuredData?.remove();
        }
      }, [route]);

      useEffect(() => {
        if (!hasTrackedInitialPageView.current) {
          hasTrackedInitialPageView.current = true;
          return;
        }

        if (typeof window.gtag !== "function") return;

        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
          page_path: route,
        });
      }, [route]);

      useEffect(() => {
        if (Number(withdrawalRate) <= 0) setWithdrawalRate(DEFAULT_SETTINGS.withdrawalRate);
        if (Number(lifespan) < 75) setLifespan(DEFAULT_SETTINGS.lifespan);
      }, []);

      useEffect(() => {
        if (newsletterStatus === "success") {
          newsletterMessageRef.current?.focus();
        }
      }, [newsletterStatus]);

      useEffect(() => {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currency,
            starting,
            contribution,
            frequency,
            age,
            retireAge,
            returnRate,
            withdrawalRate,
            lifespan,
            inflation,
            feeRate,
            contributionGrowth,
            snapshots,
          }));
        } catch {
          // The calculator still works when browser storage is unavailable.
        }
      }, [
        currency,
        starting,
        contribution,
        frequency,
        age,
        retireAge,
        returnRate,
        withdrawalRate,
        lifespan,
        inflation,
        feeRate,
        contributionGrowth,
        snapshots,
      ]);

      const dismissStartTip = () => {
        if (!showStartTip || tipLeaving) return;

        setTipLeaving(true);
        try {
          window.localStorage.setItem(ONBOARDING_KEY, "seen");
        } catch {
          // The prompt can still dismiss when browser storage is unavailable.
        }
        window.setTimeout(() => setShowStartTip(false), 260);
      };

      const projection = useMemo(() => {
        const balance = projectFuture(starting, contribution, yearsRemaining, paydaysPerYear, returnRate - feeRate, contributionGrowth);
        const periods = yearsRemaining * paydaysPerYear;
        let invested = Number(starting) || 0;
        let pay = Number(contribution) || 0;
        const growRate = contributionGrowth / 100 / paydaysPerYear;

        for (let i = 0; i < periods; i++) {
          invested += pay;
          pay = pay * (1 + growRate);
        }

        return {
          balance: Math.round(balance),
          invested: Math.round(invested),
          growth: Math.round(balance - invested),
          monthly: Math.round((balance * (withdrawalRate / 100)) / 12),
        };
      }, [starting, contribution, yearsRemaining, paydaysPerYear, returnRate, withdrawalRate, feeRate, contributionGrowth]);

      const investedShare = projection.balance > 0
        ? Math.min(100, Math.max(0, (projection.invested / projection.balance) * 100))
        : 0;

      const compare = useMemo(() => {
        const current = projection.balance;
        const monthly = (value) => Math.round((value * (withdrawalRate / 100)) / 12);
        const scenario = (label, value, tone = "up") => ({
          label,
          value: Math.round(value),
          monthly: monthly(value),
          diff: Math.round(value - current),
          monthlyDiff: Math.round(monthly(value) - projection.monthly),
          tone,
        });

        const netReturn = returnRate - feeRate;
        const extra = projectFuture(starting, contribution + compareExtraSavings, yearsRemaining, paydaysPerYear, netReturn, contributionGrowth);
        const customReturn = projectFuture(starting, contribution, yearsRemaining, paydaysPerYear, compareReturn - feeRate, contributionGrowth);
        const customRetireYears = Math.max(compareRetireAge - age, 0);
        const customRetire = projectFuture(starting, contribution, customRetireYears, paydaysPerYear, netReturn, contributionGrowth);

        const waitYears = Math.min(compareWaitYears, yearsRemaining);
        const waitValue = projectFuture(starting, contribution, Math.max(yearsRemaining - waitYears, 0), paydaysPerYear, netReturn, contributionGrowth);

        return [
          scenario("Current plan", current, "base"),
          scenario(`Save +$${compareExtraSavings}/payday`, extra, "up"),
          scenario(`${compareReturn}% expected return`, customReturn, compareReturn >= returnRate ? "up" : "down"),
          scenario(`Retire at ${compareRetireAge}`, customRetire, compareRetireAge >= retireAge ? "up" : "down"),
          scenario(`Wait ${compareWaitYears} years`, waitValue, "down"),
        ];
      }, [
        projection,
        withdrawalRate,
        starting,
        contribution,
        yearsRemaining,
        paydaysPerYear,
        returnRate,
        feeRate,
        contributionGrowth,
        compareExtraSavings,
        compareReturn,
        compareRetireAge,
        compareWaitYears,
        age,
        retireAge,
      ]);

      const money = (n) => {
        const value = Number(n) || 0;

        if (currency === "USD" || currency === "CAD") {
          return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
        }

        return value.toLocaleString("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        });
      };

      const navigateTo = (path) => {
        if (window.location.pathname !== path) window.history.pushState({}, "", path);
        setRoute(path);
        setPanel(null);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "auto" });
      };

      const submitNewsletter = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const trimmedEmail = email.trim();

        if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
          setNewsletterStatus("error");
          setNewsletterError("Please enter a valid email address.");
          return;
        }

        setNewsletterStatus("loading");
        setNewsletterError("");

        try {
          const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: trimmedEmail,
              company: String(formData.get("company") || ""),
              signupPage: window.location.pathname,
            }),
          });

          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.ok) {
            throw new Error(result.message || "We couldn't add you right now. Please try again.");
          }

          setEmail("");
          form.reset();
          setNewsletterStatus("success");
        } catch (error) {
          setNewsletterStatus("error");
          setNewsletterError(error.message || "We couldn't add you right now. Please try again.");
        }
      };

      const scrollMobileArticles = (position) => {
        const strip = mobileArticleStripRef.current;
        if (!strip) return;
        const maxScroll = strip.scrollWidth - strip.clientWidth;
        strip.scrollTo({ left: maxScroll * position, behavior: "smooth" });
      };

      const openHomePanel = (destination) => {
        if (window.location.pathname !== "/") window.history.pushState({}, "", "/");
        setRoute("/");
        setMobileMenuOpen(false);
        setPanel(destination);
      };

      const normalizedRoute = route.length > 1 ? route.replace(/\/+$/, "") : route;
      const legalPage = LEGAL_PAGE_CONFIG[normalizedRoute];
      const newsletterProps = {
        email,
        setEmail,
        newsletterStatus,
        setNewsletterStatus,
        setNewsletterError,
        newsletterError,
        newsletterMessageRef,
        submitNewsletter,
      };

      if (legalPage) {
        return (
          <LegalPage
            page={legalPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigateTo={navigateTo}
          />
        );
      }

      if (normalizedRoute.startsWith("/philosophy/")) {
        const philosophyPage = PHILOSOPHY_BY_SLUG.get(
          normalizedRoute.slice("/philosophy/".length)
        );

        if (!philosophyPage) {
          return <NotFoundPage navigateTo={navigateTo} />;
        }

        return (
          <PhilosophyPage
            page={philosophyPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigateTo={navigateTo}
          />
        );
      }

      if (normalizedRoute === "/learn" || normalizedRoute.startsWith("/learn/")) {
        const isNestedLearnRoute = normalizedRoute.startsWith("/learn/");
        const routeSlug = isNestedLearnRoute ? normalizedRoute.slice("/learn/".length) : "";
        const activeCluster = isNestedLearnRoute ? LEARN_CLUSTER_BY_SLUG.get(routeSlug) : null;
        const activeArticle = isNestedLearnRoute && !activeCluster ? ARTICLE_BY_ID.get(routeSlug) : null;
        const notFound = isNestedLearnRoute && !activeCluster && !activeArticle;

        return (
          <LearnRoute
            currency={currency}
            setCurrency={setCurrency}
            article={activeArticle}
            cluster={activeCluster}
            notFound={notFound}
            navigateTo={navigateTo}
            openHomePanel={openHomePanel}
            newsletterProps={newsletterProps}
          />
        );
      }

      if (normalizedRoute === "/calculator") {
        return (
          <div className="home-page-host">
            {panel && (
              <SlidePanel
                panel={panel}
                close={() => setPanel(null)}
                navigate={setPanel}
                money={money}
                projection={projection}
                compare={compare}
                snapshots={snapshots}
                setSnapshots={setSnapshots}
                compareControls={{
                  compareExtraSavings,
                  setCompareExtraSavings,
                  compareReturn,
                  setCompareReturn,
                  compareRetireAge,
                  setCompareRetireAge,
                  compareWaitYears,
                  setCompareWaitYears,
                }}
                values={{ starting, contribution, frequency, age, retireAge, returnRate, withdrawalRate, lifespan, inflation, feeRate, contributionGrowth, retirementYears }}
                setters={{ setStarting, setContribution, setFrequency, setAge, setRetireAge, setReturnRate, setWithdrawalRate, setLifespan, setInflation, setFeeRate, setContributionGrowth }}
              />
            )}

            <CalculatorPage
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              navigateTo={navigateTo}
              setPanel={setPanel}
              currency={currency}
              setCurrency={setCurrency}
              newsletterProps={newsletterProps}
              panel={panel}
              money={money}
              projection={projection}
              compare={compare}
              values={{ starting, contribution, frequency, age, retireAge, returnRate, withdrawalRate, lifespan, inflation, feeRate, contributionGrowth, retirementYears }}
              setters={{ setStarting, setContribution, setFrequency, setAge, setRetireAge, setReturnRate, setWithdrawalRate, setLifespan, setInflation, setFeeRate, setContributionGrowth }}
              paydaysUsed={paydaysUsed}
              paydaysRemaining={paydaysRemaining}
              yearsRemaining={yearsRemaining}
              hasRetirementPlan={hasRetirementPlan}
              investedShare={investedShare}
              snapshots={snapshots}
              setSnapshots={setSnapshots}
            />
          </div>
        );
      }

      if (normalizedRoute === "/about") {
        return (
          <div className="home-page-host">
            {panel && (
              <SlidePanel
                panel={panel}
                close={() => setPanel(null)}
                navigate={setPanel}
                money={money}
                projection={projection}
                compare={compare}
                snapshots={snapshots}
                setSnapshots={setSnapshots}
                compareControls={{
                  compareExtraSavings,
                  setCompareExtraSavings,
                  compareReturn,
                  setCompareReturn,
                  compareRetireAge,
                  setCompareRetireAge,
                  compareWaitYears,
                  setCompareWaitYears,
                }}
                values={{ starting, contribution, frequency, age, retireAge, returnRate, withdrawalRate, lifespan, inflation, feeRate, contributionGrowth, retirementYears }}
                setters={{ setStarting, setContribution, setFrequency, setAge, setRetireAge, setReturnRate, setWithdrawalRate, setLifespan, setInflation, setFeeRate, setContributionGrowth }}
              />
            )}
            <AboutPage
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              navigateTo={navigateTo}
              newsletterProps={newsletterProps}
              panel={panel}
            />
          </div>
        );
      }

      return (
        <div className="home-page-host">
          {panel && (
            <SlidePanel
              panel={panel}
              close={() => setPanel(null)}
              navigate={setPanel}
              money={money}
              projection={projection}
              compare={compare}
              snapshots={snapshots}
              setSnapshots={setSnapshots}
              compareControls={{
                compareExtraSavings,
                setCompareExtraSavings,
                compareReturn,
                setCompareReturn,
                compareRetireAge,
                setCompareRetireAge,
                compareWaitYears,
                setCompareWaitYears,
              }}
              values={{ starting, contribution, frequency, age, retireAge, returnRate, withdrawalRate, lifespan, inflation, feeRate, contributionGrowth, retirementYears }}
              setters={{ setStarting, setContribution, setFrequency, setAge, setRetireAge, setReturnRate, setWithdrawalRate, setLifespan, setInflation, setFeeRate, setContributionGrowth }}
            />
          )}

          <ReferenceHomePage
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigateTo={navigateTo}
            newsletterProps={newsletterProps}
            panel={panel}
          />

          {false && (
            <>
          <header className="topbar">
            <a className="brand" href="#calculator">
              <strong>1040</strong><span>PAYDAYS</span>
            </a>

            <nav className="topnav">
              <button className="active" onClick={() => setPanel("calculator")}>Calculator</button>
              <button onClick={() => setPanel("how")}>How it works</button>
              <button onClick={() => setPanel("compare")}>Compare</button>
              <button onClick={() => navigateTo("/learn")}>Learn</button>
            </nav>

            <div className="top-actions">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="currency-select">
                {currencies.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
              </select>
              <button
                className="mobile-menu-button"
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>

              {mobileMenuOpen && (
                <nav className="mobile-nav-menu" id="mobile-navigation" aria-label="Mobile navigation">
                  {[
                    ["Calculator", "calculator"],
                    ["How it works", "how"],
                    ["Compare", "compare"],
                    ["Learn", "/learn"],
                  ].map(([label, destination]) => (
                    <button
                      type="button"
                      key={destination}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (destination === "/learn") navigateTo(destination);
                        else setPanel(destination);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </header>

          <main className={`dashboard ${panel ? "blurred" : ""}`} id="calculator">
            <aside className="story-panel card">
              <div className="short-line" />

              <h1>You only get about <span>1,040</span> paydays.</h1>
              <h2>Make the <span>next one</span> count.</h2>

              <div className="story-stack">
                <StoryItem tone="blue" icon="●●" title={`${paydaysUsed} paydays behind you.`} text="They brought you here." />
                <StoryItem tone="teal" icon="□" title={`${paydaysRemaining} opportunities ahead.`} text="Give the next one a job." />
                <StoryItem tone="gold" icon="↗" title="Time is your advantage." text="Starting sooner matters." />
                <StoryItem tone="purple" icon="◇" title="Small choices compound." text="Consistency wins." />
              </div>

              <div className="feature-lead">
                <span>Every payday is a decision.</span>
                <strong>Choose yours.</strong>
              </div>

              <button className="feature-placeholder feature-article-card" type="button" onClick={() => setPanel(`article:${FEATURED_ARTICLE.id}`)}>
                <img src={FEATURED_ARTICLE.image} alt={FEATURED_ARTICLE.alt} />
                <span>FEATURED ARTICLE</span>
                <strong>{FEATURED_ARTICLE.title}</strong>
                <em>Read article →</em>
              </button>
              <div className="home-article-dots" aria-label="Featured article position">
                <span className="is-active" />
                <span />
                <span />
              </div>
            </aside>

            <section className="middle-column">
              <section className={`assumptions-card card ${introPulse ? "intro-pulse" : ""}`}>
                <div className="assumptions-heading">
                  <div>
                    <p className="eyebrow">START HERE · YOUR NUMBERS</p>
                    <h2>Build your payday plan.</h2>
                    <p>Replace the example values below—your results update instantly.</p>
                  </div>
                  {showStartTip && (
                    <div className={`start-tooltip ${tipLeaving ? "is-leaving" : ""}`} role="status">
                      <strong>Start here</strong>
                      <span>Enter your numbers to see your future.</span>
                    </div>
                  )}
                  <button className="assumption-title" onClick={() => setPanel("advanced")} type="button">
                    Advanced assumptions <SlidersHorizontal size={14} />
                  </button>
                </div>

                <div className="input-grid">
                  <Input label="Starting balance" value={starting} setValue={setStarting} onInteract={dismissStartTip} />
                  <Input label="Contribution each payday" value={contribution} setValue={setContribution} onInteract={dismissStartTip} />
                  <label className="field">
                    <span>Pay frequency</span>
                    <select
                      value={frequency}
                      onChange={(e) => {
                        dismissStartTip();
                        setFrequency(e.target.value);
                      }}
                    >
                      <option>Biweekly</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </label>
                  <Input label="Current age" value={age} setValue={setAge} onInteract={dismissStartTip} />
                  <Input label="Retire at age" value={retireAge} setValue={setRetireAge} onInteract={dismissStartTip} />
                  <Input
                    label="Expected return"
                    value={returnRate}
                    setValue={setReturnRate}
                    step="0.1"
                    hint="Adjust return rate ↗"
                    onInteract={dismissStartTip}
                  />
                </div>

                <div className="privacy-row">
                  <span><Lock size={12} /> No account needed</span>
                  <span>•</span>
                  <span>Saved on your device</span>
                  <span>•</span>
                  <a href="/privacy-policy">Privacy settings</a>
                </div>
              </section>

              <section className="journey-card card results-card">
                <div className="results-heading">
                  <p className="eyebrow">CALCULATED RESULT · YOUR 1,040 PAYDAY JOURNEY</p>
                  <span className="locked-badge"><Lock size={11} /> Read-only results</span>
                </div>
                <h2>You’ve already used <span>{paydaysUsed}</span> paydays. <strong>{paydaysRemaining}</strong> remain.</h2>

                <div className="journey-stats">
                  <Stat icon={<CalendarDays />} label="Paydays used" value={paydaysUsed} />
                  <Stat icon={<CircleDotDashed />} label="Paydays remaining" value={paydaysRemaining} teal />
                  <Stat icon={<UserRound />} label="Current age" value={age} />
                  <Stat icon={<Sun />} label="Years remaining" value={yearsRemaining} gold />
                </div>
              </section>

              <section className="projection-card card">
                <div className="chart-top">
                  <div>
                    <p className="eyebrow muted">YOUR PROJECTION</p>
                    <h2>Your projected future value</h2>
                    <div className="legend">
                      <span className="sample balance" /> Balance
                      <span className="sample contrib" /> Contributions
                    </div>
                  </div>

                  <div className="chart-total">
                    <small>Future value at age {retireAge}</small>
                    <strong>{money(projection.balance)}</strong>
                  </div>
                </div>

                <ProjectionChart age={age} retireAge={retireAge} money={money} balance={projection.balance} invested={projection.invested} starting={starting} paydaysUsed={paydaysUsed} hasPlan={hasRetirementPlan} />
              </section>
            </section>

            <aside className="right-column">
              <section className="future-card">
                <div className="future-title-row">
                  <p className="eyebrow gold">YOUR FUTURE ✧</p>
                  <span><Lock size={11} /> Projection</span>
                </div>
                <h3>Your calculated outlook.</h3>
                <div className="money-number">{money(projection.balance)}</div>

                <div className="portfolio-mix">
                  <div>
                    <span>Your contributions</span>
                    <span>Investment growth</span>
                  </div>
                  <div
                    className="portfolio-mix-bar"
                    role="img"
                    aria-label={`${Math.round(investedShare)} percent contributions and ${Math.round(100 - investedShare)} percent growth`}
                  >
                    <span className="mix-contributions" style={{ width: `${investedShare}%` }} />
                    <span className="mix-growth" style={{ width: `${100 - investedShare}%` }} />
                  </div>
                </div>

                <div className="future-grid">
                  <MiniStat label="You invested" value={money(projection.invested)} />
                  <MiniStat label="Growth" value={money(projection.growth)} />
                  <MiniStat label="Est. monthly income" value={`${money(projection.monthly)}/mo`} />
                  <MiniStat label="Paydays remaining" value={paydaysRemaining} />
                </div>
              </section>

              <section className="side-card card">
                <div className="side-title">
                  <p className="eyebrow muted">PAYDAY JOURNAL</p>
                  <button type="button" onClick={() => setPanel("journal")}>View all</button>
                </div>

                <h3>Track your real progress.</h3>

                <div className="empty-state">
                  <Camera size={22} />
                  {snapshots.length ? (
                    <>
                      <strong>{snapshots.length} projection saved.</strong>
                      <p>Latest: {money(snapshots[0].balance)} saved today.</p>
                    </>
                  ) : (
                    <>
                      <strong>No snapshots saved yet.</strong>
                      <p>Compare how your investments grow over time.</p>
                    </>
                  )}
                  <button type="button" onClick={() => setSnapshots([{ id: Date.now(), balance: projection.balance, monthly: projection.monthly, date: new Date().toLocaleDateString() }, ...snapshots])}>
                    Save your projection
                  </button>
                </div>
              </section>

              <section className="side-card signup-card card">
                <div className="mail-icon"><Mail size={18} /></div>
                <div>
                  <p className="eyebrow muted">STAY ON TRACK</p>
                  <h3>Get your 1,040 Payday Plan.</h3>

                  <NewsletterSignup {...newsletterProps} />
                </div>
              </section>
            </aside>

            <section className="mobile-story-summary card">
              <p className="eyebrow">WHY 1,040 PAYDAYS?</p>
              <h2>Your next payday is a decision point.</h2>
              <div className="mobile-story-metrics">
                <div><strong>{paydaysUsed}</strong><span>behind you</span></div>
                <div><strong>{paydaysRemaining}</strong><span>opportunities ahead</span></div>
              </div>
              <p>Small choices compound. Consistency wins.</p>
            </section>

            <section className="mobile-featured-reading card">
              <p className="eyebrow">FEATURED READING</p>
              <h2>Every payday is a decision. <span>Choose yours.</span></h2>
              <p>Swipe through practical stories about the choices that shape your financial future.</p>
              <div className="mobile-home-article-strip" ref={mobileArticleStripRef}>
                {ARTICLES.map((article) => (
                  <button type="button" key={article.id} onClick={() => setPanel(`article:${article.id}`)}>
                    <img src={article.image} alt={article.alt} />
                    <span>{article.category} · {article.readTime}</span>
                    <strong>{article.title}</strong>
                    <em>Read article →</em>
                  </button>
                ))}
              </div>
              <div className="mobile-home-article-dots" aria-label="Scroll featured articles">
                <button type="button" aria-label="Show first articles" onClick={() => scrollMobileArticles(0)} />
                <button type="button" aria-label="Show middle articles" onClick={() => scrollMobileArticles(0.5)} />
                <button type="button" aria-label="Show last articles" onClick={() => scrollMobileArticles(1)} />
              </div>
            </section>
          </main>

          <footer className={`footer ${panel ? "blurred" : ""}`}>
            <div>
              <strong>1040 Paydays</strong>
              <p>One payday at a time.<br />Build consistency.</p>
            </div>

            <nav>
              <FooterPrimaryLinks />
              <a href="/privacy-policy">Privacy</a>
              <a href="/terms-of-use">Terms</a>
              <a href="/contact">Contact</a>
            </nav>

            <div className="socials">
              <a href="#facebook"><Facebook size={22} /></a>
              <a href="#instagram"><Instagram size={22} /></a>
              <a href="#youtube"><Youtube size={22} /></a>
              <a href="/contact" aria-label="Contact 1040 Paydays"><Mail size={22} /></a>
            </div>
          </footer>
            </>
          )}
        </div>
      );
    }

    function SlidePanel({ panel, close, navigate, money, projection, compare, snapshots, setSnapshots, compareControls, values, setters }) {
      const isAdvanced = panel === "advanced";
      const isCompare = panel === "compare";
      const isCalculator = panel === "calculator";
      const isLearn = panel === "learn";
      const isArticle = panel?.startsWith("article:");
      const activeArticle = isArticle
        ? ARTICLES.find((article) => article.id === panel.slice("article:".length)) || FEATURED_ARTICLE
        : null;
      const panelRef = useRef(null);

      useEffect(() => {
        panelRef.current?.scrollTo({ top: 0, behavior: "auto" });
      }, [panel]);

      return (
        <div className="overlay">
          <aside key={panel} ref={panelRef} className={`slide-panel ${isAdvanced || isCompare || isCalculator || isLearn || isArticle ? "wide-panel" : ""} ${isLearn || isArticle ? "article-panel" : ""} ${isLearn ? "learn-library-panel" : ""}`}>
            <button className="close-panel" type="button" aria-label="Close" onClick={close}><X size={18} /></button>

            {isAdvanced && (
              <>
                <p className="eyebrow">ADVANCED ASSUMPTIONS</p>
                <h2>Fine-tune your payday plan.</h2>
                <Slider label="Current age" value={values.age} setValue={setters.setAge} min={18} max={75} />
                <Slider label="Retire at age" value={values.retireAge} setValue={setters.setRetireAge} min={45} max={90} />
                <Slider label="Withdrawal rate" value={values.withdrawalRate} setValue={setters.setWithdrawalRate} min={2} max={8} step={0.1} suffix="%" />
                <Slider label="Lifespan" value={values.lifespan} setValue={setters.setLifespan} min={75} max={110} />
                <Slider label="Inflation" value={values.inflation} setValue={setters.setInflation} min={0} max={8} step={0.1} suffix="%" />
                <Slider label="Investment fees" value={values.feeRate} setValue={setters.setFeeRate} min={0} max={3} step={0.1} suffix="%" />
                <Slider label="Contribution growth" value={values.contributionGrowth} setValue={setters.setContributionGrowth} min={0} max={10} step={0.1} suffix="%" />
                <div className="panel-note">Monthly income uses your withdrawal rate. Retirement age can now go up to 90.</div>
                <button className="ok-button" onClick={close}>OK</button>
              </>
            )}

            {isCompare && (
              <ComparePanel
                money={money}
                projection={projection}
                compare={compare}
                controls={compareControls}
              />
            )}

            {isCalculator && (
              <CalculatorPanel
                money={money}
                projection={projection}
                values={values}
                setters={setters}
                close={close}
              />
            )}

            {panel === "how" && (
              <HowItWorksPanel close={close} />
            )}

            {isLearn && <LearnLibrary onOpenArticle={(article) => navigate(`article:${article.id}`)} close={close} />}

            {isArticle && (
              <ArticlePanel
                article={activeArticle}
                close={close}
                backToLearn={() => navigate("learn")}
                openArticle={(nextArticle) => navigate(`article:${nextArticle.id}`)}
              />
            )}

            {panel === "journal" && (
              <>
                <p className="eyebrow">SAVED PROJECTIONS</p>
                <h2>Your saved projections.</h2>
                {snapshots?.length ? (
                  <div className="saved-list">
                    {snapshots.map((item) => (
                      <div className="saved-row" key={item.id}>
                        <span>{item.date}</span>
                        <strong>{money(item.balance)}</strong>
                        <em>{money(item.monthly)}/mo</em>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="panel-text">No plans have been saved yet. Save one from the Calculator page to compare your progress later.</p>
                )}
                <button className="danger-button" onClick={() => setSnapshots([])}>Erase past projections</button>
                <button className="ok-button" onClick={close}>OK</button>
              </>
            )}

            {!isArticle && !["advanced", "calculator", "how", "learn", "compare", "journal", "about"].includes(panel) && (
              <PanelContent icon={<BookOpen />} title="Coming soon" text="This section can be expanded with formulas, examples, articles, and more payday planning tools." />
            )}
          </aside>
        </div>
      );
    }

    function CalculatorPanel({ money, projection, values, setters, close }) {
      return (
        <>
          <p className="eyebrow">CALCULATOR · LIVE PLAN</p>
          <h2>Shape your payday future.</h2>

          <div className="calculator-panel-hero">
            <span>Current projection</span>
            <strong>{money(projection.balance)}</strong>
            <em>{money(projection.monthly)}/mo estimated income</em>
          </div>

          <section className="calculator-panel-section">
            <div className="panel-section-heading">
              <div>
                <span>YOUR NUMBERS</span>
                <strong>Core assumptions</strong>
              </div>
              <small>Updates instantly</small>
            </div>

            <div className="calculator-panel-grid">
              <PanelNumberInput label="Starting balance" value={values.starting} setValue={setters.setStarting} />
              <PanelNumberInput label="Contribution each payday" value={values.contribution} setValue={setters.setContribution} />
              <label className="panel-field">
                <span>Pay frequency</span>
                <select value={values.frequency} onChange={(event) => setters.setFrequency(event.target.value)}>
                  <option>Biweekly</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </label>
              <PanelNumberInput label="Current age" value={values.age} setValue={setters.setAge} />
              <PanelNumberInput label="Retire at age" value={values.retireAge} setValue={setters.setRetireAge} />
              <PanelNumberInput label="Expected return" value={values.returnRate} setValue={setters.setReturnRate} step="0.1" suffix="%" />
            </div>
          </section>

          <section className="calculator-panel-section advanced-panel-section">
            <div className="panel-section-heading">
              <div>
                <span>ADVANCED</span>
                <strong>Fine-tune the projection</strong>
              </div>
            </div>

            <div className="calculator-slider-grid">
              <Slider label="Withdrawal rate" value={values.withdrawalRate} setValue={setters.setWithdrawalRate} min={2} max={8} step={0.1} suffix="%" />
              <Slider label="Lifespan" value={values.lifespan} setValue={setters.setLifespan} min={75} max={110} />
              <Slider label="Inflation" value={values.inflation} setValue={setters.setInflation} min={0} max={8} step={0.1} suffix="%" />
              <Slider label="Investment fees" value={values.feeRate} setValue={setters.setFeeRate} min={0} max={3} step={0.1} suffix="%" />
              <Slider label="Contribution growth" value={values.contributionGrowth} setValue={setters.setContributionGrowth} min={0} max={10} step={0.1} suffix="%" />
            </div>
          </section>

          <div className="calculator-disclaimer">
            <ShieldAlert size={18} />
            <p>
              <strong>Projection only. Not financial advice.</strong>
              Actual returns, taxes, fees, inflation, and government benefits may vary.
            </p>
          </div>

          <div className="panel-note">Every change updates the dashboard and is saved on this device.</div>
          <button className="ok-button" onClick={close}>Done</button>
        </>
      );
    }

    function LearnRoute({
      currency,
      setCurrency,
      article,
      cluster,
      notFound,
      navigateTo,
      openHomePanel,
      newsletterProps,
    }) {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const goHomePanel = (panelName) => {
        setMobileMenuOpen(false);
        openHomePanel(panelName);
      };

      return (
        <div className="learn-route-shell">
          <header className="learn-index-header">
            <div className="learn-index-container learn-index-header-inner">
              <a
                className="learn-index-brand"
                href="/"
                aria-label="1040 Paydays home"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("/");
                }}
              >
                <strong>1040</strong>
                <span>PAYDAYS</span>
              </a>

              <nav className="learn-index-nav" aria-label="Primary navigation">
                <button type="button" onClick={() => navigateTo("/")}>Home</button>
                <button type="button" className="active" aria-current="page" onClick={() => navigateTo("/learn")}>Learn</button>
                <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                <button type="button" onClick={() => navigateTo("/about")}>About</button>
              </nav>

              <div className="learn-index-actions">
                <a
                  className="learn-index-subscribe"
                  href={article ? "#article-newsletter" : "#learn-newsletter"}
                >
                  <Mail size={16} aria-hidden="true" />
                  Subscribe
                </a>
                <button
                  className="learn-index-menu-button"
                  type="button"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="learn-index-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  <span>Menu</span>
                </button>

                {mobileMenuOpen && (
                  <nav
                    className="learn-index-mobile-nav"
                    id="learn-index-mobile-navigation"
                    aria-label="Mobile navigation"
                  >
                    <button type="button" onClick={() => navigateTo("/")}>Home</button>
                    <button type="button" aria-current="page" onClick={() => navigateTo("/learn")}>Learn</button>
                    <button type="button" onClick={() => navigateTo("/calculator")}>Calculator</button>
                    <button type="button" onClick={() => navigateTo("/about")}>About</button>
                  </nav>
                )}
              </div>
            </div>
          </header>

          {notFound ? (
            <NotFoundPage navigateTo={navigateTo} />
          ) : article ? (
            <main className="learn-route-article">
              <ArticlePanel
                article={article}
                close={() => goHomePanel(null)}
                backToLearn={() => navigateTo("/learn")}
                openArticle={(nextArticle) => navigateTo(`/learn/${nextArticle.id}`)}
                navigateTo={navigateTo}
                newsletterProps={newsletterProps}
              />
            </main>
          ) : cluster ? (
            <LearnClusterPage
              cluster={cluster}
              navigateTo={navigateTo}
              newsletterProps={newsletterProps}
            />
          ) : (
            <LearnPage
              navigateTo={navigateTo}
              newsletterProps={newsletterProps}
              openAbout={() => navigateTo("/about")}
            />
          )}

          <footer className="reference-home-footer">
            <div className="reference-home-footer-inner">
              <p className="reference-home-copyright">© 2026 1040 Paydays. All rights reserved.</p>
              <p>
                The content, design, illustrations, branding, and original editorial articles on this website are protected by copyright and may not be reproduced or distributed without written permission.
              </p>
              <p>
                1040 Paydays is for educational purposes only and does not provide financial, tax, legal, or investment advice.
              </p>
              <nav className="reference-home-footer-nav" aria-label="Legal and contact navigation">
                <FooterLegalLinks />
              </nav>
            </div>
          </footer>
        </div>
      );
    }

    function NotFoundPage({ navigateTo }) {
      useEffect(() => {
        const previousTitle = document.title;
        let robots = document.querySelector('meta[name="robots"]');
        const previousRobots = robots?.getAttribute("content") || "";
        const createdRobots = !robots;

        if (!robots) {
          robots = document.createElement("meta");
          robots.setAttribute("name", "robots");
          document.head.appendChild(robots);
        }

        document.title = "Page not found | 1040 Paydays";
        robots.setAttribute("content", "noindex, follow");

        return () => {
          document.title = previousTitle;
          if (createdRobots) robots.remove();
          else robots.setAttribute("content", previousRobots);
        };
      }, []);

      return (
        <main className="not-found-page" aria-labelledby="not-found-title">
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1 id="not-found-title">This article is not here.</h1>
          <p>
            The link may be old, mistyped, or no longer available. The Learn library has the current articles.
          </p>
          <div className="not-found-actions">
            <button type="button" onClick={() => navigateTo("/learn")}>Go to Learn</button>
            <button type="button" className="secondary" onClick={() => navigateTo("/")}>Back to calculator</button>
          </div>
        </main>
      );
    }

    function LearnArticleLink({ article, navigateTo, className = "", children }) {
      return (
        <a
          className={className}
          href={`/learn/${article.id}`}
          onClick={(event) => {
            event.preventDefault();
            navigateTo(`/learn/${article.id}`);
          }}
        >
          {children || article.title}
        </a>
      );
    }

    function LearnStartHere({ navigateTo }) {
      if (!LEARN_START_HERE_ARTICLES.length) return null;

      return (
        <section className="learn-library-start" aria-labelledby="start-here-heading">
          <header className="learn-library-section-heading">
            <p>START HERE</p>
            <h2 id="start-here-heading">New to 1040 Paydays? Begin with these 3 articles.</h2>
          </header>
          <div className="learn-library-start-grid">
            {LEARN_START_HERE_ARTICLES.map((article, index) => (
              <article key={article.id}>
                <a
                  className="learn-library-start-image"
                  href={`/learn/${article.id}`}
                  aria-label={`Read ${article.title}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(`/learn/${article.id}`);
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.alt}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </a>
                <div>
                  <h3><LearnArticleLink article={article} navigateTo={navigateTo} /></h3>
                  <p>{article.summary}</p>
                  <LearnArticleLink
                    article={article}
                    navigateTo={navigateTo}
                    className="learn-library-read-link"
                  >
                    Read more <span aria-hidden="true">→</span>
                  </LearnArticleLink>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    function LearnTopics({ navigateTo }) {
      return (
        <section className="learn-library-topics" aria-labelledby="topics-heading">
          <header className="learn-library-section-heading">
            <p>EXPLORE BY TOPIC</p>
            <h2 id="topics-heading">Browse lessons and stories organized by what matters most.</h2>
          </header>
          <div className="learn-library-topic-grid">
            {LEARN_EDITORIAL_CONFIG.topics.map((topic) => {
              const cluster = LEARN_CLUSTER_BY_SLUG.get(topic.clusterSlug);
              const topicArticle = articlesForCluster(cluster)[0];
              if (!cluster || !topicArticle) return null;

              return (
                <a
                  href={`/learn/${cluster.slug}`}
                  key={topic.clusterSlug}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(`/learn/${cluster.slug}`);
                  }}
                >
                  <img
                    src={topicArticle.image}
                    alt=""
                    width="360"
                    height="220"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <strong>{topic.title}</strong>
                    <small>{topic.description}</small>
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      );
    }

    function LearnArticleArchive({ navigateTo }) {
      return (
        <section className="learn-library-archive" id="all-articles" aria-labelledby="archive-heading">
          <header className="learn-library-section-heading">
            <p>LATEST ARTICLES</p>
            <h2 id="archive-heading">Fresh ideas and stories to help you on your journey.</h2>
          </header>
          <div className="learn-library-article-list">
            {LEARN_MORE_ARTICLES.map((article) => {
              const publicationDate = publicationDateForArticle(article);

              return (
                <article key={article.id}>
                  <a
                    className="learn-library-article-image"
                    href={`/learn/${article.id}`}
                    aria-label={`Read ${article.title}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(`/learn/${article.id}`);
                    }}
                  >
                    <img
                      src={article.image}
                      alt={article.alt}
                      width="320"
                      height="180"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <div>
                    <small>
                      {article.category}
                      {publicationDate && (
                        <> · <time dateTime={publicationDate}>
                          Published {formatPublicationDate(publicationDate)}
                        </time></>
                      )}
                      {" · "}{article.readTime}
                    </small>
                    <h3><LearnArticleLink article={article} navigateTo={navigateTo} /></h3>
                    <p>{article.summary}</p>
                  </div>
                  <LearnArticleLink
                    article={article}
                    navigateTo={navigateTo}
                    className="learn-library-row-link"
                  >
                    Read <span aria-hidden="true">→</span>
                  </LearnArticleLink>
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    function LearnPhilosophy() {
      const principles = [
        {
          title: "Live Today",
          description: "Make the most of the life you have now.",
          Icon: PAYDAY_PRINCIPLE_ICONS.liveToday,
        },
        {
          title: "Protect Tomorrow",
          description: "Prepare for life’s ups and downs.",
          Icon: PAYDAY_PRINCIPLE_ICONS.protectTomorrow,
        },
        {
          title: "Plan Your Future",
          description: "Save and invest one payday at a time to create more choices.",
          Icon: PAYDAY_PRINCIPLE_ICONS.planYourFuture,
        },
        {
          title: "Choose What Matters",
          description: "Align your money with your values and goals.",
          Icon: PAYDAY_PRINCIPLE_ICONS.chooseWhatMatters,
        },
      ];

      return (
        <section className="learn-library-sidebar-card learn-library-philosophy" aria-labelledby="philosophy-heading">
          <h2 id="philosophy-heading">The 1040 Paydays Philosophy</h2>
          <ol>
            {principles.map(({ title, description, Icon }) => (
              <li key={title}>
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    }

    function LearnNewsletter({ newsletterProps }) {
      return (
        <section
          className="learn-library-sidebar-card learn-library-newsletter"
          id="learn-newsletter"
          aria-labelledby="learn-newsletter-heading"
        >
          <h2 id="learn-newsletter-heading">Get new ideas in your inbox</h2>
          <p>Thoughtful articles about money, choices, and building a life that matters—one payday at a time.</p>
          <NewsletterSignup
            {...newsletterProps}
            idPrefix="learn-sidebar"
            buttonLabel="Subscribe"
            placeholder="Your email address"
          />
        </section>
      );
    }

    function LearnAbout({ openAbout }) {
      return (
        <section className="learn-library-sidebar-card learn-library-about" aria-labelledby="learn-about-heading">
          <h2 id="learn-about-heading">About 1040 Paydays</h2>
          <strong>A new way to think about money and life.</strong>
          <p>You do not need more financial noise. You need a clearer way to make decisions across the paydays you have.</p>
          <button type="button" onClick={openAbout}>
            Learn more about the mission <span aria-hidden="true">→</span>
          </button>
        </section>
      );
    }

    function LearnPage({ navigateTo, newsletterProps, openAbout }) {
      return (
        <main className="learn-page learn-library-page">
          <section className="learn-library-intro learn-index-container" aria-labelledby="learn-title">
            <h1 id="learn-title">Payday Journal</h1>
            <p>Thoughtful lessons and stories to help you make the most of your 1,040 paydays.</p>
          </section>

          <div className="learn-library-layout learn-index-container" id="learn-content">
            <div className="learn-library-main">
              <LearnStartHere navigateTo={navigateTo} />
              <LearnTopics navigateTo={navigateTo} />
              <LearnArticleArchive navigateTo={navigateTo} />
            </div>

            <aside className="learn-library-sidebar" aria-label="About 1040 Paydays">
              <LearnPhilosophy />
              <LearnNewsletter newsletterProps={newsletterProps} />
              <LearnAbout openAbout={openAbout} />
            </aside>
          </div>
        </main>
      );
    }

    function LearnClusterPage({ cluster, navigateTo, newsletterProps }) {
      const clusterArticles = articlesForCluster(cluster);
      const featuredArticle = clusterArticles[0];
      const essentialArticles = clusterArticles.slice(1);
      const relatedClusters = LEARN_EDITORIAL_CONFIG.clusters.filter(
        (item) => item.slug !== cluster.slug && articlesForCluster(item).length
      );

      return (
        <main className="learn-cluster-page">
          <nav className="learn-breadcrumbs" aria-label="Breadcrumb">
            <a
              href="/learn"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("/learn");
              }}
            >
              Learn
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{cluster.title}</span>
          </nav>

          <header className="learn-cluster-hero">
            <p className="eyebrow">1040 PAYDAYS TOPIC</p>
            <h1>{cluster.title}</h1>
            <p className="learn-cluster-thesis">{cluster.thesis}</p>
            <p>{cluster.intro}</p>
          </header>

          {featuredArticle && (
            <section className="learn-cluster-feature" aria-labelledby="cluster-start-heading">
              <a
                href={`/learn/${featuredArticle.id}`}
                aria-label={`Read ${featuredArticle.title}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(`/learn/${featuredArticle.id}`);
                }}
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.alt}
                  decoding="async"
                />
              </a>
              <div>
                <p className="article-section-kicker">START HERE</p>
                <h2 id="cluster-start-heading">
                  <LearnArticleLink article={featuredArticle} navigateTo={navigateTo} />
                </h2>
                <p>{featuredArticle.summary}</p>
                <small>
                  {featuredArticle.category} · {featuredArticle.readTime}
                </small>
              </div>
            </section>
          )}

          {essentialArticles.length > 0 && (
            <section className="learn-cluster-index" aria-labelledby="cluster-articles-heading">
              <h2 id="cluster-articles-heading">Essentials</h2>
              <div>
                {essentialArticles.map((article, index) => (
                <article key={article.id}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <a
                    className="learn-cluster-article-image"
                    href={`/learn/${article.id}`}
                    aria-label={`Read ${article.title}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(`/learn/${article.id}`);
                    }}
                  >
                    <img
                      src={article.image}
                      alt={article.alt}
                      width="720"
                      height="480"
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </a>
                  <div className="learn-cluster-article-copy">
                    <small>
                      {article.category}
                      {publicationDateForArticle(article) && (
                        <> · <time dateTime={publicationDateForArticle(article)}>
                          Published {formatPublicationDate(publicationDateForArticle(article))}
                        </time></>
                      )}
                      {" · "}{article.readTime}
                    </small>
                    <h3><LearnArticleLink article={article} navigateTo={navigateTo} /></h3>
                    <p>{article.summary}</p>
                  </div>
                </article>
              ))}
              </div>
            </section>
          )}

          <section className="learn-cluster-companions" aria-label="Tools and newsletter">
            <div className="learn-cluster-tool">
              <p className="article-section-kicker">1040 PAYDAYS CALCULATOR</p>
              <h2>See what one payday decision could become.</h2>
              <p>Explore how regular saving or investing may grow over time.</p>
              <a
                href="/calculator"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("/calculator");
                }}
              >
                Open Calculator <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="learn-cluster-newsletter" id="learn-newsletter">
              <h2>Get new ideas in your inbox.</h2>
              <NewsletterSignup
                {...newsletterProps}
                idPrefix={`cluster-${cluster.slug}`}
                buttonLabel="Subscribe"
                placeholder="Enter your email"
              />
            </div>
          </section>

          <nav className="learn-related-topics" aria-label="Related topics">
            <strong>Explore another topic</strong>
            <div>
              {relatedClusters.map((item) => (
                <a
                  href={`/learn/${item.slug}`}
                  key={item.slug}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(`/learn/${item.slug}`);
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>
        </main>
      );
    }

    function LearnLibrary({ onOpenArticle, close }) {
      return (
        <section className="learn-library">
          <div className="learn-library-toolbar">
            <div>
              <p className="eyebrow">LEARN · KNOWLEDGE &amp; INSIGHTS</p>
              <h1>Make every payday smarter.</h1>
              <p>Clear, practical ideas for building wealth one decision at a time.</p>
            </div>
            <button type="button" onClick={close}>Back to calculator</button>
          </div>

          <div className="learn-filter-row" aria-label="Article categories">
            <span className="is-active">All articles</span>
            <span>Payday philosophy</span>
            <span>Saving</span>
            <span>Investing</span>
            <span>Retirement</span>
          </div>

          <div className="learn-article-grid">
            {ARTICLES.map((article) => (
              <button className="learn-article-card" type="button" key={article.id} onClick={() => onOpenArticle(article)}>
                <img src={article.image} alt={article.alt} />
                <div className="learn-card-content">
                  <span>{article.category} · {article.readTime}</span>
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <strong>Read article <span aria-hidden="true">→</span></strong>
                </div>
              </button>
            ))}
          </div>

          <div className="learn-library-note">
            <strong>More knowledge is on the way.</strong>
            <span>New articles will appear here as the 1040 Paydays library grows.</span>
          </div>
        </section>
      );
    }

    function ArticleSidebar({
      article,
      cluster,
      recommendedArticles,
      relatedArticles,
      navigateTo,
      newsletterProps,
    }) {
      return (
        <aside className="article-sidebar" aria-label="More from 1040 Paydays">
          {cluster && (
            <section>
              <p className="article-sidebar-label">ABOUT THIS TOPIC</p>
              <h2>About {cluster.title}</h2>
              <p>{cluster.intro}</p>
              <a
                href={`/learn/${cluster.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(`/learn/${cluster.slug}`);
                }}
              >
                Explore all {cluster.title.toLowerCase()} articles <span aria-hidden="true">→</span>
              </a>
            </section>
          )}

          {recommendedArticles.length > 0 && (
            <section>
              <p className="article-sidebar-label">RECOMMENDED</p>
              <h2>Continue exploring</h2>
              <ol className="article-sidebar-numbered">
                {recommendedArticles.map((item, index) => (
                  <li key={item.id}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <LearnArticleLink article={item} navigateTo={navigateTo} />
                  </li>
                ))}
              </ol>
            </section>
          )}

          {relatedArticles.length > 0 && (
            <section>
              <p className="article-sidebar-label">MORE TO READ</p>
              <h2>From the journal</h2>
              <div className="article-sidebar-stories">
                {relatedArticles.map((item) => (
                  <article key={item.id}>
                    <LearnArticleLink article={item} navigateTo={navigateTo}>
                      <img
                        src={item.image}
                        alt=""
                        width="180"
                        height="120"
                        loading="lazy"
                        decoding="async"
                      />
                    </LearnArticleLink>
                    <div>
                      <small>{item.category} · {item.readTime}</small>
                      <h3><LearnArticleLink article={item} navigateTo={navigateTo} /></h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="article-sidebar-calculator">
            <p className="article-sidebar-label">USE THE CALCULATOR</p>
            <h2>See what one payday decision could become.</h2>
            <p>Explore how regular saving or investing may grow over time.</p>
            <a
              href="/calculator"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("/calculator");
              }}
            >
              Open Calculator <span aria-hidden="true">→</span>
            </a>
          </section>

          <section className="article-sidebar-newsletter" id="article-newsletter">
            <p className="article-sidebar-label">STAY IN TOUCH</p>
            <h2>Get new ideas in your inbox.</h2>
            <NewsletterSignup
              {...newsletterProps}
              idPrefix={`article-${article.id}`}
              buttonLabel="Subscribe"
              placeholder="Enter your email"
            />
          </section>
        </aside>
      );
    }

    function EditorialBio({ navigateTo }) {
      return (
        <aside className="article-author" aria-labelledby="editorial-bio-heading">
          <div className="article-author-mark" aria-hidden="true">1040</div>
          <div>
            <p className="article-section-kicker">ABOUT THE PUBLICATION</p>
            <h2 id="editorial-bio-heading">About 1040 Paydays</h2>
            <p>
              1040 Paydays is an independent personal finance publication focused on the small
              decisions people make with each paycheck. Its articles and tools explore saving,
              investing, financial resilience and the choices that can create greater freedom
              over time.
            </p>
            <a
              href="/about"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("/about");
              }}
            >
              Read our philosophy <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      );
    }

    function ArticlePanel({
      article,
      close,
      backToLearn,
      openArticle,
      navigateTo,
      newsletterProps,
    }) {
      const publicationDate = publicationDateForArticle(article);
      const faqs = ARTICLE_FAQS[article.id] || [];
      const articleIndex = ARTICLES.findIndex((item) => item.id === article.id);
      const previousArticle = ARTICLES[(articleIndex - 1 + ARTICLES.length) % ARTICLES.length];
      const nextArticle = ARTICLES[(articleIndex + 1) % ARTICLES.length];
      const cluster = clusterForArticle(article);
      const sameTopicArticles = articlesForCluster(cluster).filter(
        (item) => item.id !== article.id
      );
      const fallbackArticles = ARTICLES.filter(
        (item) =>
          item.id !== article.id &&
          !sameTopicArticles.some((sameTopic) => sameTopic.id === item.id)
      );
      const recommendedArticles = [...sameTopicArticles, ...fallbackArticles].slice(0, 5);
      const relatedArticles = [...sameTopicArticles, ...fallbackArticles].slice(0, 3);
      const jumpToArticle = (nextItem) => {
        openArticle(nextItem);
        requestAnimationFrame(() => {
          document.querySelector(".learn-route-shell")?.scrollTo({ top: 0, behavior: "smooth" });
        });
      };

      return (
        <div className="article-editorial-layout">
          <article className="learn-article">
            <nav className="article-breadcrumbs" aria-label="Breadcrumb">
              <button type="button" onClick={backToLearn}>Learn</button>
              <span aria-hidden="true">/</span>
              {cluster && (
                <>
                  <a
                    href={`/learn/${cluster.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(`/learn/${cluster.slug}`);
                    }}
                  >
                    {cluster.title}
                  </a>
                  <span aria-hidden="true">/</span>
                </>
              )}
              <span aria-current="page">{article.title}</span>
            </nav>

            <header className="article-header">
              <p className="article-kicker">{article.kicker || article.category}</p>
              <h1>{article.title}</h1>
              {article.summary && <p className="article-summary">{article.summary}</p>}
              <div className="article-meta">
                <span>By 1040 Paydays Editorial Team</span>
                {publicationDate && (
                  <>
                    <span aria-hidden="true">•</span>
                    <time dateTime={publicationDate}>
                      Published {formatPublicationDate(publicationDate)}
                    </time>
                  </>
                )}
                <span aria-hidden="true">•</span>
                <span>{article.readTime}</span>
              </div>
            </header>

            <figure className="article-hero">
              <img
                src={article.image}
                alt={article.alt}
                decoding="async"
              />
              {article.caption && <figcaption>{article.caption}</figcaption>}
            </figure>

            <div className="article-share" aria-label="Share this article">
              <span>SHARE</span>
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${SITE_URL}/learn/${article.id}`)}`}
              >
                Email
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(`${SITE_URL}/learn/${article.id}`)}
              >
                Copy link
              </button>
            </div>

            <div className="article-body">
              {article.intro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {article.sections.map((section, sectionIndex) => (
                <React.Fragment key={section.heading}>
                  <section>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </section>
                  {sectionIndex === 1 && article.quote && (
                    <blockquote>
                      <strong>{article.quote.strong}</strong>
                      <span>{article.quote.text}</span>
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </div>

            <EditorialBio navigateTo={navigateTo} />

            {faqs.length > 0 && (
              <section className="article-faqs">
                <p className="article-section-kicker">FREQUENTLY ASKED QUESTIONS</p>
                <h2>Questions to take with you.</h2>
                <div>
                  {faqs.map((faq) => (
                    <details key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <nav className="article-previous-next" aria-label="Previous and next articles">
              <button type="button" onClick={() => jumpToArticle(previousArticle)}>
                <span>Previous article</span>
                <strong>{previousArticle.title}</strong>
              </button>
              <button type="button" onClick={() => jumpToArticle(nextArticle)}>
                <span>Next article</span>
                <strong>{nextArticle.title}</strong>
              </button>
            </nav>

            <section className="related-articles" aria-labelledby="continue-learning-heading">
              <div className="related-heading">
                <div>
                  <p className="article-section-kicker">CONTINUE LEARNING</p>
                  <h2 id="continue-learning-heading">More from the Payday Journal</h2>
                </div>
              </div>
              <div className="related-article-grid">
                {relatedArticles.map((related) => (
                  <article key={related.id}>
                    <LearnArticleLink article={related} navigateTo={navigateTo}>
                      <img
                        src={related.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </LearnArticleLink>
                    <small>{related.category} · {related.readTime}</small>
                    <h3><LearnArticleLink article={related} navigateTo={navigateTo} /></h3>
                  </article>
                ))}
              </div>
            </section>

          </article>

          <ArticleSidebar
            article={article}
            cluster={cluster}
            recommendedArticles={recommendedArticles}
            relatedArticles={relatedArticles}
            navigateTo={navigateTo}
            newsletterProps={newsletterProps}
          />
        </div>
      );
    }

    function PanelNumberInput({ label, value, setValue, step = "1", suffix = "" }) {
      return (
        <label className="panel-field">
          <span>{label}</span>
          <div className="panel-input-wrap">
            <input
              type="number"
              step={step}
              value={value}
              onChange={(event) => {
                const nextValue = event.target.value;
                setValue(nextValue === "" ? "" : Number(nextValue));
              }}
              onBlur={() => {
                if (value === "") setValue(0);
              }}
            />
            {suffix && <small>{suffix}</small>}
          </div>
        </label>
      );
    }

    function ComparePanel({ money, projection, compare, controls }) {
      const maxValue = Math.max(...compare.map((row) => row.value), 1);

      return (
        <>
          <p className="eyebrow gold">COMPARE YOUR FUTURE ✧</p>
          <h2>Small changes. Monthly impact.</h2>

          <div className="compare-hero">
            <span>Current plan</span>
            <strong>{money(projection.balance)}</strong>
            <em>{money(projection.monthly)}/mo</em>
          </div>

          <div className="compare-sliders">
            <Slider label="Extra savings per payday" value={controls.compareExtraSavings} setValue={controls.setCompareExtraSavings} min={0} max={500} step={10} prefix="$" />
            <Slider label="Expected return scenario" value={controls.compareReturn} setValue={controls.setCompareReturn} min={1} max={15} step={0.1} suffix="%" />
            <Slider label="Retire at age" value={controls.compareRetireAge} setValue={controls.setCompareRetireAge} min={45} max={90} />
            <Slider label="Wait before starting" value={controls.compareWaitYears} setValue={controls.setCompareWaitYears} min={0} max={20} />
          </div>

          <div className="compare-list premium">
            {compare.map((row) => (
              <div className={`compare-card ${row.tone}`} key={row.label}>
                <div className="compare-card-top">
                  <span>{row.label}</span>
                  <strong>{money(row.value)}</strong>
                </div>

                <div className="compare-bar">
                  <i style={{ width: `${Math.max((row.value / maxValue) * 100, 4)}%` }} />
                </div>

                <div className="compare-metrics">
                  <span>
                    Monthly income
                    <b>{money(row.monthly)}/mo</b>
                  </span>
                  <span>
                    Difference
                    <b>{row.diff >= 0 ? "+" : ""}{money(row.diff)}</b>
                  </span>
                  <span>
                    Monthly change
                    <b>{row.monthlyDiff >= 0 ? "+" : ""}{money(row.monthlyDiff)}/mo</b>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="panel-note">Monthly income is estimated using your selected withdrawal rate.</div>
        </>
      );
    }

    function PanelContent({ icon, title, text }) {
      return (
        <>
          <div className="panel-icon">{icon}</div>
          <h2>{title}</h2>
          <p className="panel-text">{text}</p>
          <button className="ok-button" onClick={() => document.querySelector(".close-panel")?.click()}>OK</button>
        </>
      );
    }

    function HowItWorksPanel({ close }) {
      return (
        <section className="about-panel how-panel">
          <div className="panel-icon"><BookOpen /></div>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>See what each payday could become.</h2>

          <p>
            Most people will receive about <strong>1,040 paydays</strong> during their
            working lives.
          </p>
          <p>
            That number surprised me the first time I heard it. It also changed the way I
            looked at money.
          </p>
          <p>
            Every payday gives us a choice. We can spend it without thinking, save part of
            it for the future, pay down debt, invest for retirement, or work toward a goal
            that matters to us. One decision will not change your life, but hundreds of
            small decisions often do.
          </p>
          <p>
            The calculator on this site is designed to help you see what those decisions
            could mean over time. Change the numbers, explore different ideas, and see how
            small increases in saving or investing may affect your future.
          </p>
          <p>
            The articles are written with the same goal. They are not about getting rich
            overnight or finding the next financial shortcut. They are about building good
            habits, making thoughtful decisions, and understanding how money works one
            payday at a time.
          </p>
          <p>
            Whether you are just getting started or have been investing for years, I hope
            this site gives you ideas, encouragement, and a different way to think about
            every paycheck.
          </p>

          <div className="about-progress">
            <strong>After all, every payday is a decision.</strong>
            <span>Choose yours.</span>
          </div>

          <button className="ok-button" type="button" onClick={close}>Try the calculator</button>
        </section>
      );
    }

    function PrivacyPolicyContent() {
      return (
        <div className="legal-policy-copy">
          <p><strong>Last updated:</strong> July 2026</p>
          <p>
            1040 Paydays is built to help you explore payday planning, saving, and retirement
            ideas. We try to collect as little personal information as possible.
          </p>

          <h2>Information you enter into the calculator</h2>
          <p>
            The numbers you enter into the calculator, comparison tools, and saved projections are
            stored in your browser on your own device using local storage. They are not sent to us
            through the calculator.
          </p>

          <h2>Analytics and advertising</h2>
          <p>
            We use Google Analytics to understand how visitors use the site, such as which pages
            are visited and which features are used. We may also use Google AdSense to show ads.
            Google and its partners may use cookies or similar technologies to serve and measure ads.
          </p>
          <p>
            You can manage advertising preferences through your browser settings and Google's ad
            settings. Blocking cookies may affect some site features, but the main articles and
            calculator should still be available.
          </p>

          <h2>Third-party links</h2>
          <p>
            The site may link to third-party websites or services. Their privacy practices are
            controlled by their own policies, not this one.
          </p>
        </div>
      );
    }

    function TermsOfUseContent() {
      return (
        <div className="legal-policy-copy">
          <p><strong>Last updated:</strong> July 2026</p>
          <p>
            By using 1040 Paydays, you agree to use the site for personal, educational, and
            informational purposes.
          </p>

          <h2>Educational content only</h2>
          <p>
            The calculator, articles, examples, and projections are provided for general education.
            They are not financial, investment, tax, legal, mortgage, or retirement advice. Your
            financial situation is personal, and you should speak with a qualified professional
            before making important decisions.
          </p>

          <h2>Calculator estimates</h2>
          <p>
            Results are estimates based on the numbers and assumptions you enter. Actual outcomes
            can be different because of market returns, fees, inflation, taxes, income changes,
            contribution changes, timing, and other life events.
          </p>

          <h2>Your responsibility</h2>
          <p>
            You are responsible for the decisions you make using the information on this site.
            Please review your own numbers carefully and do not rely on any example as a guarantee
            of future results.
          </p>

          <h2>Site availability and accuracy</h2>
          <p>
            We do our best to keep the site useful and accurate, but we cannot promise that every
            feature, calculation, article, or link will always be complete, current, or error-free.
            The site may change or be unavailable from time to time.
          </p>

          <h2>Advertising and third-party services</h2>
          <p>
            The site may display ads or link to third-party websites. We are not responsible for the
            content, products, services, or policies of third-party sites.
          </p>

        </div>
      );
    }

    function ContactContent() {
      return (
        <div className="contact-panel legal-contact-copy">
          <h2>I'd love to hear from you.</h2>
          <p className="contact-intro">
            Whether you have a question, found an error, want to share your own payday story,
            or just want to say hello, I'd be happy to hear from you.
          </p>

          <a className="contact-email-card" href="mailto:hello@1040paydays.com">
            <span>Email</span>
            <strong>hello@1040paydays.com</strong>
            <em>Write to me →</em>
          </a>

          <p>I read every message personally and do my best to respond as time allows.</p>

          <div className="contact-disclaimer">
            <ShieldAlert size={20} />
            <p>
              Please note that I can't provide personalized financial, legal, or tax advice.
              The articles and tools on 1040 Paydays are intended for educational and
              informational purposes only.
            </p>
          </div>

          <p>Thank you for being part of the 1040 Paydays community.</p>

          <div className="contact-signoff">
            <span>Every payday funds a future.</span>
            <strong>Choose yours.</strong>
          </div>
        </div>
      );
    }

    function Input({ label, value, setValue, step = "1", hint = "", onInteract }) {
      return (
        <label className="field">
          <span>{label}</span>
          <input
            type="number"
            step={step}
            value={value}
            onChange={(e) => {
              const nextValue = e.target.value;
              onInteract?.();
              setValue(nextValue === "" ? "" : Number(nextValue));
            }}
            onBlur={() => {
              if (value === "") setValue(0);
            }}
          />
          {hint && <small className="field-nudge">{hint}</small>}
        </label>
      );
    }

    function Slider({ label, value, setValue, min, max, step = 1, suffix = "", prefix = "" }) {
      return (
        <label className="slider">
          <div><span>{label}</span><strong>{prefix}{value}{suffix}</strong></div>
          <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </label>
      );
    }

    function StoryItem({ tone, icon, title, text }) {
      return (
        <div className="story-item static">
          <div className={`story-icon ${tone}`}>{icon}</div>
          <div><strong>{title}</strong><p>{text}</p></div>
        </div>
      );
    }

    function Stat({ icon, label, value, sub, teal, gold }) {
      return (
        <div className="stat static">
          <div className={`stat-icon ${teal ? "teal" : ""} ${gold ? "goldish" : ""}`}>{icon}</div>
          <div><small>{label}</small><strong>{value}</strong><span>{sub}</span></div>
        </div>
      );
    }

    function MiniStat({ label, value }) {
      return <div className="mini-stat static"><small>{label}</small><strong>{value}</strong></div>;
    }

    function wrapChartText(value, maxCharacters = 22) {
      const words = String(value).split(/\s+/);
      const lines = [];

      words.forEach((word) => {
        const current = lines[lines.length - 1];
        if (!current) {
          lines.push(word);
        } else if (`${current} ${word}`.length <= maxCharacters) {
          lines[lines.length - 1] = `${current} ${word}`;
        } else if (lines.length < 2) {
          lines.push(word);
        } else {
          lines[1] = `${lines[1].replace(/…$/, "")}…`;
        }
      });

      return lines.slice(0, 2);
    }

    function ProjectionChart({ age, retireAge, money, balance, invested, starting, paydaysUsed, hasPlan }) {
      const [hoveredBar, setHoveredBar] = useState(null);
      const yearsRemaining = Math.max(Number(retireAge) - Number(age), 0);
      const remainingPaydays = Math.max(PAYDAYS_TOTAL - paydaysUsed, 0);
      const retirementPayday = hasPlan ? PAYDAYS_TOTAL : 0;
      const startingValue = Math.max(Number(starting) || 0, 0);
      const finalInvested = Math.max(Number(invested) || 0, startingValue);
      const finalBalance = Math.max(Number(balance) || 0, finalInvested);
      const finalGrowth = Math.max(finalBalance - finalInvested, 0);

      const makeBars = (count, left, right, baseline, maxHeight, width) => (
        Array.from({ length: count }, (_, index) => {
          const t = count === 1 ? 1 : index / (count - 1);
          const contributions = startingValue + (finalInvested - startingValue) * t;
          const growth = finalGrowth * Math.pow(t, 1.72);
          const total = contributions + growth;
          const totalHeight = finalBalance > 0
            ? Math.max(24, (total / finalBalance) * maxHeight)
            : 24;
          const contributionHeight = total > 0
            ? Math.max(7, totalHeight * (contributions / total))
            : 7;

          return {
            index,
            t,
            x: left + ((right - left) / Math.max(count - 1, 1)) * index,
            width,
            total,
            contributions,
            growth,
            totalHeight,
            contributionHeight,
            growthHeight: Math.max(totalHeight - contributionHeight, 0),
            top: baseline - totalHeight,
            contributionTop: baseline - contributionHeight,
            payday: Math.round(paydaysUsed + remainingPaydays * t),
            year: Math.round(yearsRemaining * t),
          };
        })
      );

      const desktopBarSpecs = [
        [38, 64], [111, 36], [154, 38], [199, 43], [249, 64],
        [321, 45], [373, 44], [424, 66], [498, 43], [548, 43],
        [598, 43], [648, 67], [724, 43], [774, 43], [914, 65],
      ];
      const bars = makeBars(desktopBarSpecs.length, 0, 1, 250, 170, 1)
        .map((bar, index) => ({
          ...bar,
          x: desktopBarSpecs[index][0],
          width: desktopBarSpecs[index][1],
        }));
      const mobileBars = makeBars(8, 27, 322, 166, 122, 29);
      const tooltipBar = bars[Math.min(3, bars.length - 1)];
      const moneyMilestones = [50000, 100000, 250000, 500000, 1000000]
        .filter((target) => target > startingValue && target < finalBalance)
        .map((target) => ({
          target,
          bar: bars.find((bar) => bar.total >= target),
        }))
        .filter((item) => item.bar)
        .filter((item, index, array) => index === 0 || item.bar.index - array[index - 1].bar.index >= 3)
        .slice(0, 2);
      const yearsLeftBar = yearsRemaining > 5
        ? bars[Math.min(bars.length - 2, Math.max(1, Math.round(((yearsRemaining - 5) / yearsRemaining) * (bars.length - 1))))]
        : null;
      const guidePoints = bars.slice(0, -1).map((bar) => `${bar.x + bar.width / 2},${bar.top}`).join(" ");
      const timelineStops = [0, .2, .4, .6, .8, 1];
      const ribbonColors = ["#0a1a2f", "#132a47", "#1c3a5f", "#294b70", "#8f6d2f", "#d9a441"];
      const envelopeStart = bars[bars.length - 2];
      const finalBar = bars[bars.length - 1];

      return (
        <>
          <div className="chart-box payday-bar-chart desktop-projection-chart">
            <svg viewBox="0 0 1000 340" role="img" aria-label={`Projected contributions and growth from age ${age} to age ${retireAge}`}>
              <defs>
                <linearGradient id="barGrowth" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#d9a441" />
                  <stop offset="100%" stopColor="#efd18f" />
                </linearGradient>
                <filter id="barShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#071936" floodOpacity=".13" />
                </filter>
              </defs>

              <g className="bar-grid">
                {[80, 122, 164, 206, 250].map((y) => <line key={y} x1="38" y1={y} x2="980" y2={y} />)}
              </g>

              <polyline points={guidePoints} className="bar-guide-line" />
              <polygon
                className="growth-gap-area"
                points={[
                  `${envelopeStart.x + envelopeStart.width},${envelopeStart.top}`,
                  `${finalBar.x},${finalBar.top}`,
                  `${finalBar.x},${finalBar.contributionTop}`,
                  `${envelopeStart.x + envelopeStart.width},${envelopeStart.contributionTop}`,
                ].join(" ")}
              />
              <g className="growth-envelope">
                <line
                  x1={envelopeStart.x + envelopeStart.width}
                  y1={envelopeStart.top}
                  x2={finalBar.x}
                  y2={finalBar.top}
                />
                <line
                  x1={envelopeStart.x + envelopeStart.width}
                  y1={envelopeStart.contributionTop}
                  x2={finalBar.x}
                  y2={finalBar.contributionTop}
                />
              </g>

              <g className="projection-bars">
                {bars.map((bar) => (
                  <g
                    key={bar.index}
                    className={`projection-bar ${hoveredBar?.index === bar.index ? "is-hovered" : ""}`}
                    style={{ "--bar-index": bar.index }}
                    tabIndex="0"
                    role="img"
                    aria-label={`Year ${bar.year}, payday ${bar.payday}, contributions ${money(bar.contributions)}, growth ${money(bar.growth)}`}
                    onMouseEnter={() => setHoveredBar(bar)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onPointerEnter={() => setHoveredBar(bar)}
                    onPointerLeave={() => setHoveredBar(null)}
                    onFocus={() => setHoveredBar(bar)}
                    onBlur={() => setHoveredBar(null)}
                  >
                    <title>{`Year ${bar.year} · Payday #${bar.payday} · Contributions ${money(bar.contributions)} · Growth ${money(bar.growth)}`}</title>
                    <rect x={bar.x} y={bar.contributionTop} width={bar.width} height={bar.contributionHeight} className="bar-contribution" />
                    {bar.growthHeight > 0 && (
                      <rect x={bar.x} y={bar.top} width={bar.width} height={bar.growthHeight + 1} rx="3" className="bar-growth" />
                    )}
                    <rect
                      x={bar.x}
                      y={bar.top}
                      width={bar.width}
                      height={bar.totalHeight}
                      rx="3"
                      className="bar-outline"
                      onMouseEnter={() => setHoveredBar(bar)}
                      onMouseLeave={() => setHoveredBar(null)}
                      onPointerEnter={() => setHoveredBar(bar)}
                      onPointerLeave={() => setHoveredBar(null)}
                    />
                  </g>
                ))}
              </g>

              <g className="chart-today-label">
                <text x="44" y="182">Today</text>
                <text x="44" y="200">Age {age}</text>
                <text x="44" y="216">Payday #{paydaysUsed}</text>
              </g>

              {moneyMilestones.map(({ target, bar }, index) => (
                <g className="bar-milestone" key={target} style={{ "--milestone-index": index }}>
                  <line x1={bar.x + bar.width / 2} y1={bar.top - 2} x2={bar.x + bar.width / 2} y2={bar.top - 19} />
                  <circle cx={bar.x + bar.width / 2} cy={bar.top - 2} r="4" />
                  <text x={bar.x + bar.width / 2} y={bar.top - 25} textAnchor="middle">First {money(target).replace(/,000$/, "k")}</text>
                  <text x={bar.x + bar.width / 2} y={bar.top - 12} textAnchor="middle">Payday #{bar.payday}</text>
                </g>
              ))}

              {yearsLeftBar && (
                <g className="bar-time-marker">
                  <line x1={yearsLeftBar.x + yearsLeftBar.width / 2} y1={yearsLeftBar.top - 2} x2={yearsLeftBar.x + yearsLeftBar.width / 2} y2={yearsLeftBar.top - 39} />
                  <text x={yearsLeftBar.x + yearsLeftBar.width / 2} y={yearsLeftBar.top - 64} textAnchor="middle">5 years left</text>
                  <text x={yearsLeftBar.x + yearsLeftBar.width / 2} y={yearsLeftBar.top - 48} textAnchor="middle">Age {retireAge - 5}</text>
                </g>
              )}

              <g className="bar-detail-card" filter="url(#barShadow)">
                <rect x="38" y="62" width="222" height="84" rx="11" />
                <path d="M198 146 l11 11 11 -11" className="detail-pointer" />
                <text x="55" y="84" className="bar-detail-title">At year {tooltipBar.year} / Payday #{tooltipBar.payday}</text>
                <rect x="55" y="100" width="10" height="10" rx="2" className="detail-contribution-swatch" />
                <text x="73" y="109">Contributions</text>
                <text x="240" y="109" textAnchor="end">{money(tooltipBar.contributions)}</text>
                <rect x="55" y="120" width="10" height="10" rx="2" className="detail-growth-swatch" />
                <text x="73" y="129">Growth</text>
                <text x="240" y="129" textAnchor="end">{money(tooltipBar.growth)}</text>
              </g>

              {hoveredBar && (
                <g className="bar-hover-card" pointerEvents="none">
                  <rect x={hoveredBar.index > 7 ? 250 : 650} y="52" width="235" height="88" rx="13" />
                  <text x={hoveredBar.index > 7 ? 268 : 668} y="76" className="hover-card-title">
                    Year {hoveredBar.year} · Payday #{hoveredBar.payday}
                  </text>
                  <rect x={hoveredBar.index > 7 ? 268 : 668} y="91" width="11" height="11" rx="2" className="detail-contribution-swatch" />
                  <text x={hoveredBar.index > 7 ? 286 : 686} y="101">Contributions</text>
                  <text x={hoveredBar.index > 7 ? 468 : 868} y="101" textAnchor="end">{money(hoveredBar.contributions)}</text>
                  <rect x={hoveredBar.index > 7 ? 268 : 668} y="116" width="11" height="11" rx="2" className="detail-growth-swatch" />
                  <text x={hoveredBar.index > 7 ? 286 : 686} y="126">Growth</text>
                  <text x={hoveredBar.index > 7 ? 468 : 868} y="126" textAnchor="end">{money(hoveredBar.growth)}</text>
                </g>
              )}

              <g className="retirement-marker">
                <text x="980" y="28" textAnchor="end">Retirement</text>
                <text x="980" y="46" textAnchor="end">Payday #{retirementPayday}</text>
                <circle cx={bars[bars.length - 1].x + bars[bars.length - 1].width / 2} cy={bars[bars.length - 1].top} r="5" />
              </g>

              <g className="payday-ribbon">
                {timelineStops.map((stop, index) => (
                  <g key={stop}>
                    {index < timelineStops.length - 1 && (
                      <path
                        className="timeline-chevron"
                        fill={ribbonColors[index]}
                        d={`M${38 + stop * 942} 267 H${38 + timelineStops[index + 1] * 942 - 13} L${38 + timelineStops[index + 1] * 942} 282 L${38 + timelineStops[index + 1] * 942 - 13} 297 H${38 + stop * 942} L${38 + stop * 942 + 13} 282 Z`}
                      />
                    )}
                    <text x={38 + stop * 942} y="318" textAnchor={index === 0 ? "start" : index === timelineStops.length - 1 ? "end" : "middle"}>
                      {index === 0 ? "Your 1" : index === timelineStops.length - 1 ? "Retirement" : `Year ${Math.max(1, Math.round(yearsRemaining * stop))}`}
                    </text>
                    <text x={38 + stop * 942} y="334" textAnchor={index === 0 ? "start" : index === timelineStops.length - 1 ? "end" : "middle"}>
                      {index === 0 ? `Payday #${paydaysUsed}` : index === timelineStops.length - 1 ? `Age ${retireAge} · Payday #${retirementPayday}` : `Payday #${Math.round(paydaysUsed + remainingPaydays * stop)}`}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          <div className="chart-box mobile-projection-chart mobile-payday-bars">
            <svg viewBox="0 0 360 226" role="img" aria-label={`Mobile contributions and growth projection from age ${age} to age ${retireAge}`}>
              <defs>
                <linearGradient id="mobileBarGrowth" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#d9a441" />
                  <stop offset="100%" stopColor="#efd18f" />
                </linearGradient>
                <linearGradient id="mobileRibbon" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0a1a2f" />
                  <stop offset="65%" stopColor="#294b70" />
                  <stop offset="100%" stopColor="#d9a441" />
                </linearGradient>
              </defs>

              <g className="mobile-bar-grid">
                {[44, 84, 124, 166].map((y) => <line key={y} x1="20" y1={y} x2="340" y2={y} />)}
              </g>

              <polyline
                points={mobileBars.map((bar) => `${bar.x + bar.width / 2},${bar.top}`).join(" ")}
                className="mobile-bar-guide"
              />

              {mobileBars.map((bar) => (
                <g key={bar.index} className="mobile-projection-bar" style={{ "--bar-index": bar.index }}>
                  <rect x={bar.x} y={bar.contributionTop} width={bar.width} height={bar.contributionHeight} className="bar-contribution" />
                  {bar.growthHeight > 0 && <rect x={bar.x} y={bar.top} width={bar.width} height={bar.growthHeight + 1} rx="3" className="mobile-bar-growth" />}
                  <rect x={bar.x} y={bar.top} width={bar.width} height={bar.totalHeight} rx="3" className="bar-outline" />
                </g>
              ))}

              <text x="20" y="181" className="mobile-end-label">Today · Age {age}</text>
              <text x="340" y="181" textAnchor="end" className="mobile-end-label">Retirement · Age {retireAge}</text>
              <rect x="20" y="192" width="320" height="13" rx="7" fill="url(#mobileRibbon)" />
              {[20, 100, 180, 260, 340].map((x) => <circle key={x} cx={x} cy="198.5" r="3.5" className="mobile-ribbon-stop" />)}
              <text x="20" y="220" className="mobile-payday-label">#{paydaysUsed}</text>
              <text x="180" y="220" textAnchor="middle" className="mobile-payday-label">Your payday timeline</text>
              <text x="340" y="220" textAnchor="end" className="mobile-payday-label">#{retirementPayday}</text>
            </svg>
          </div>
        </>
      );
    }

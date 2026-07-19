    import React, { useEffect, useMemo, useRef, useState } from "react";
    import {
      CalendarDays,
      CircleDotDashed,
      UserRound,
      Sun,
      Lock,
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
      Search,
    } from "lucide-react";
    import "./App.css";

    const PAYDAYS_TOTAL = 1040;
    const STORAGE_KEY = "1040-paydays-settings";
    const ONBOARDING_KEY = "1040-paydays-onboarding-seen";

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
  id: "the-vacation-that-showed-me-how-small-spending-adds-up",
  title: "The Vacation That Showed Me How Small Spending Adds Up",
  summary:
    "A prepaid two week vacation showed me how much everyday spending can disappear when your routine changes. It completely changed the way I think about every payday.",
  image: "/article-vacation-changed-money.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "SAVING · PERSPECTIVE · PAYDAYS",
  alt: "Woman sitting in a beach chair looking at the ocean beside a palm tree",
  caption:
    "Sometimes stepping out of your normal routine shows you how much choice was there all along.",
  quote: {
    strong: "The vacation did not make me wealthier.",
    text: "It showed me that my routine had been spending money for me.",
  },
  sections: [
    {
      heading: "The surprise waiting at home",
      paragraphs: [
        "I didn't come home from vacation with more money.",
        "At least, that's not what happened on paper.",
        "A few years ago, I took a prepaid two week vacation. The flights were booked. The hotel was paid for. Most of the meals were included. For two weeks, I stepped away from my normal routine.",
        "When I got home, I opened my bank account.",
        "I was shocked.",
        "There was far more money sitting there than I expected. Not because I'd earned more, but because for two weeks I hadn't been spending money the way I normally did.",
        "There had been no grocery trips.",
        "No quick stops at the store.",
        "No takeout because we were tired.",
        "No Amazon purchases that somehow seemed urgent at the time.",
        "For the first time in a long time, my routine wasn't spending money for me.",
        "That simple realization stayed with me.",
      ],
    },
    {
      heading: "The thought I couldn't shake",
      paragraphs: [
        "After the surprise wore off, one question kept running through my mind.",
        "What if I could create that same result without leaving home?",
        "Not another vacation.",
        "The saving part.",
        "What if I built up enough money to comfortably cover two weeks of normal living expenses, then treated one entire paycheck as untouchable?",
        "Instead of spending it, I would save the whole thing.",
        "The more I thought about it, the more I wondered why I had never considered it before.",
      ],
    },
    {
      heading: "One paycheck can become something remarkable",
      paragraphs: [
        "Imagine saving one entire paycheck.",
        "Not forever.",
        "Just once.",
        "Instead of disappearing into another month of spending, it begins working for your future.",
        "Over time, that one ordinary paycheck can grow into something far greater than the amount that first landed in your account.",
        "That is easy to overlook because the decision feels so ordinary.",
        "Most wealth is not built through one extraordinary moment.",
        "It is built through ordinary decisions repeated consistently over many years.",
      ],
    },
    {
      heading: "It changed the way I look at every payday",
      paragraphs: [
        "Before that vacation, every paycheck felt like money that needed to be spent.",
        "Afterward, I realized something different.",
        "Many purchases are not carefully planned.",
        "They are simply part of our routine.",
        "Step away from that routine for a while and you begin to notice how much spending happens almost automatically.",
        "The vacation did not make me wealthier.",
        "It showed me that I had more control than I realized.",
        "It reminded me that every payday represents a choice.",
        "Spend it.",
        "Save it.",
        "Invest it.",
        "Or use it to buy yourself a little more freedom.",
      ],
    },
    {
      heading: "Your next payday is an opportunity",
      paragraphs: [
        "You do not need a prepaid vacation to learn the same lesson.",
        "You can create it yourself.",
        "What would happen if you saved enough to cover two weeks of everyday life?",
        "What if, just once, you banked an entire paycheck instead of letting it disappear into another month of spending?",
        "Maybe it becomes your emergency fund.",
        "Maybe it becomes your first investment.",
        "Maybe it quietly grows into something your future self will thank you for.",
        "One paycheck probably will not make you wealthy.",
        "But it might change the way you think about every paycheck that follows.",
        "Sometimes that is exactly where real wealth begins.",
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

   const THE_HIDDEN_PAYCHEQUE_AT_WORK = {
  id: "the-hidden-paycheque-at-work",
  title: "The Hidden Paycheque at Work",
  summary:
    "Your salary is only part of what your job pays. Workplace benefits, retirement matching, employee discounts, and other perks can quietly leave more money in your pocket.",
  image: "/article-hidden-paycheque-at-work.png",
  readTime: "5 min read",
  category: "Workplace Money",
  kicker: "WORKPLACE BENEFITS · COMPENSATION · SAVING",
  alt:
    "Employee reviewing workplace benefits and compensation information at a desk",
  caption:
    "Some of the most valuable parts of a job never appear on a pay stub.",
  quote:
    "Your salary is only part of what your job pays. The rest often shows up as money you never had to spend.",
  content: [
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
  id: "loud-budgeting-thats-not-where-i-want-my-money-to-go",
  title: "Loud Budgeting: That's Not Where I Want My Money to Go",
  summary:
    "Loud budgeting is not about being cheap. It is about choosing where your money goes and feeling comfortable saying so.",
  image: "/article-loud-budgeting.png",
  readTime: "4 min read",
  category: "Saving",
  kicker: "LOUD BUDGETING · INTENTIONAL SPENDING · FINANCIAL CONFIDENCE",
  alt: "Couple laughing while walking through a furniture store past a white sectional couch",
  caption:
    "Sometimes the smartest financial decision is simply saying what matters more.",
  quote: {
    strong: "That's not where I want my money to go.",
    text: "Being able to afford something doesn't mean it's the right place to spend your money.",
  },
  sections: [
    {
      heading: "Just to look",
      paragraphs: [
        "A few months ago, my husband and I wandered into a furniture store just to look.",
        "You know how that usually ends.",
        "Near the back of the showroom was a beautiful sectional with what felt like a hundred perfectly arranged cushions.",
        "We sat down, looked at each other, and agreed it was comfortable.",
        "Then we looked at the price tag.",
        "Before I could say anything, my husband blurted out a little louder than he probably intended,",
        "\"Six thousand dollars?\"",
        "The salespeople disappeared so quickly it was almost impressive.",
        "I remember thinking, Oh no... we're those customers.",
        "We laughed all the way back to the car, but one question stayed with me.",
        "Why was I embarrassed?",
        "We didn't think the couch was worth six thousand dollars.",
        "We weren't buying it.",
        "So why did saying that out loud feel uncomfortable?",
      ],
    },
    {
      heading: "Loud budgeting",
      paragraphs: [
        "Apparently there's a name for moments like that.",
        "It's called loud budgeting.",
        "Personally, I like a slightly different version.",
        "Instead of saying,",
        "\"I can't afford that,\"",
        "I'd rather say,",
        "\"That's not where I want my money to go.\"",
        "There's a big difference.",
        "One suggests you don't have enough money.",
        "The other says you've already decided what matters more.",
      ],
    },
    {
      heading: "The pressure to spend",
      paragraphs: [
        "It's surprising how often we spend money simply because we don't want to appear cheap.",
        "A friend suggests dinner at an expensive restaurant.",
        "Instead of quietly hoping they choose somewhere else, what if you said,",
        "\"I'd love to catch up. Would you be open to grabbing coffee instead?\"",
        "Or maybe everyone wants the luxury hotel for a weekend away.",
        "There's nothing wrong with saying,",
        "\"I'd rather stay somewhere simpler and spend the extra money making memories together.\"",
        "The funny part is that someone else in the group might have been hoping you'd say it first.",
      ],
    },
    {
      heading: "Money doesn't have to be a secret",
      paragraphs: [
        "For years we've treated money like something we're not supposed to talk about.",
        "Don't admit you're saving.",
        "Don't admit something feels too expensive.",
        "Don't let anyone think you're doing anything other than keeping up.",
        "Maybe that's part of the problem.",
        "We've spent decades trying to keep up with the Joneses.",
        "I've always found that expression amusing.",
        "I've never actually met a Jones.",
        "Maybe we've all been chasing the wrong people.",
      ],
    },
    {
      heading: "Normalize intentional spending",
      paragraphs: [
        "What if we stopped measuring success by how easily we spend money and started measuring it by how intentionally we spend it?",
        "Imagine if saying,",
        "\"That's not where I want my money to go,\"",
        "felt as natural as saying,",
        "\"I'm busy that day.\"",
        "No elaborate excuses.",
        "No pretending.",
        "Just an honest answer.",
      ],
    },
    {
      heading: "Intentional is not the same as cheap",
      paragraphs: [
        "The people I've met who quietly build wealth rarely seem interested in impressing anyone.",
        "They're investing for the future.",
        "They're paying down debt.",
        "They're building emergency funds.",
        "They're creating options for themselves.",
        "None of that looks exciting in the moment.",
        "Years later, it often looks remarkably wise.",
        "I'm not saying you should never buy the beautiful couch.",
        "If it genuinely fits your priorities and your budget, enjoy it.",
        "Just don't buy it because saying no feels awkward.",
      ],
    },
    {
      heading: "Every no has a yes behind it",
      paragraphs: [
        "Every time we say no to one purchase, we're quietly saying yes to something else.",
        "Maybe that's becoming debt free.",
        "Maybe it's retiring a little earlier.",
        "Maybe it's taking your family on the trip you've been dreaming about.",
        "Maybe it's simply sleeping better because your emergency fund is finally where you want it to be.",
        "Every dollar can only be spent once.",
        "Choosing where it goes is one of the most powerful financial decisions you'll ever make.",
      ],
    },
    {
      heading: "Say it anyway",
      paragraphs: [
        "The next time something doesn't fit your priorities, try saying it out loud.",
        "\"That's not where I want my money to go.\"",
        "You might discover that someone else was thinking exactly the same thing.",
        "We walked out of the furniture store without buying the couch.",
        "We also walked out without regret.",
        "We hadn't really said no to a sectional.",
        "We'd said yes to something that mattered more.",
        "That's what loud budgeting sounds like.",
        "Not embarrassment.",
        "Clarity.",
        "Because every payday is a decision.",
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
  id: "the-simplest-explanation-of-compound-interest",
  title: "The Simplest Explanation of Compound Interest (And Why I Wish I'd Heard It Sooner)",
  summary:
    "Compound interest isn't complicated. It's growth creating more growth, and time is what allows that growth to become extraordinary.",
  image: "/article-compound-interest.png",
  readTime: "6 min read",
  category: "Investing",
  kicker: "INVESTING · COMPOUNDING · TIME",
  alt:
    "A simple illustration of a snowball rolling downhill beside an investment growth chart",
  caption:
    "Compound interest begins when the money you've already earned starts earning money too.",
  quote: {
    strong: "Growth creates more growth.",
    text: "That's the whole idea.",
  },

  sections: [
    {
      heading: "The Advice I Misunderstood",
      paragraphs: [
        "When I was about twenty-four, my employer invited a financial advisor to speak to a room full of young employees.",
        "I don't remember every slide she showed us, but I still remember her big blond perm and one sentence that changed the way I think about investing.",
        "She stood at the front of the meeting room and smiled.",
        "\"Don't worry,\" she said. \"You're all so young. You have lots of time.\"",
        "She was right.",
        "The problem wasn't what she said.",
        "The problem was what I heard.",
        "I heard, \"I can start later.\"",
        "So I did.",
        "It took me almost four years to understand what she had actually meant.",
        "Those four years became some of the most expensive years of my financial life.",
        "Not because I wasn't earning money.",
        "Because my money wasn't.",
        "Every year I waited was another year my investments never had the chance to grow.",
        "If I could teach my younger self one financial concept, it wouldn't be budgeting.",
        "It wouldn't be debt.",
        "It wouldn't even be investing.",
        "It would be compound interest.",
      ],
    },

    {
      heading: "What Is Compound Interest?",
      paragraphs: [
        "Most people have heard the term.",
        "People call it the secret to building wealth.",
        "Some even call it the eighth wonder of the world.",
        "But if you asked ten people to explain what it actually means, I think most would struggle.",
        "The truth is that compound interest isn't complicated.",
        "It is simply growth creating more growth.",
        "Once you understand it, you'll probably wonder why nobody explained it this way before.",
      ],
    },

    {
      heading: "What Is Interest?",
      paragraphs: [
        "Before we talk about compound interest, let's start with something even simpler.",
        "Imagine I lend you $100.",
        "A year later you give me back my $100.",
        "Plus another $5 for letting you use my money.",
        "That extra $5 is called interest.",
        "Interest is simply the price someone pays to use another person's money.",
        "It works the other way around too.",
        "When you put money into a savings account, buy a Guaranteed Investment Certificate, purchase a bond, or invest in the stock market, your money has the opportunity to earn money instead of costing you money.",
        "Instead of paying someone else for the use of their money, someone is paying you for the use of yours.",
      ],
    },

    {
      heading: "What Is an Interest Rate?",
      paragraphs: [
        "An interest rate tells you how much money you earn or pay over a period of time.",
        "If an investment earns 5% over one year, you'll earn about $5 for every $100 invested.",
        "If it earns 10%, you'll earn about $10 for every $100 invested.",
        "The higher the return, the faster your money has the potential to grow.",
        "There's a reason I keep using the word potential.",
        "Some investments have a guaranteed rate of return.",
        "Others don't.",
        "The stock market doesn't promise you'll earn the same return every year.",
        "Some years your investments might lose 25%.",
        "Other years they might gain 30%.",
        "Most years fall somewhere in between.",
        "That's completely normal.",
      ],
    },

    {
      heading: "What Is the S&P 500?",
      paragraphs: [
        "When people talk about the stock market, they're often referring to the S&P 500.",
        "The S&P 500 isn't one company.",
        "It's an index made up of approximately 500 of the largest publicly traded companies in the United States.",
        "That includes companies such as Apple, Microsoft, Amazon, Costco, Visa, Coca-Cola, and hundreds of others.",
        "Over the last several decades, the S&P 500 has averaged roughly a 10% annual return, including reinvested dividends.",
        "The important words are long-term average.",
        "That doesn't mean the market earns 10% every year.",
        "It doesn't.",
      ],
    },

    {
      heading: "Long Term Does Not Mean Every Year",
      paragraphs: [
        "Some years are fantastic.",
        "Some years are painful.",
        "Some years you'll wonder why you invested at all.",
        "The average comes from decades of good years, bad years, and everything in between.",
        "Nobody knows what next year will bring.",
        "That's why investing should always be measured over years and decades instead of weeks and months.",
        "Past performance is never a guarantee of future results.",
      ],
    },
    {
      heading: "How Compound Interest Builds Wealth",
      paragraphs: [
        "Compound interest begins when the money you've already earned starts earning money too.",
        "That's it.",
        "That's the whole idea.",
        "Imagine standing at the top of a snowy hill holding a snowball.",
        "You give it a push.",
        "At first, it barely changes.",
        "It rolls a little farther and picks up a little more snow.",
        "The larger it becomes, the more snow it collects.",
        "Eventually, it starts growing faster simply because it's already larger.",
        "By the time it reaches the bottom of the hill, it has become something you couldn't lift if you tried.",
        "Compound interest works the same way.",
        "At first, your money earns a little money.",
        "Then the money it earned begins earning money too.",
        "Growth creates more growth.",
        "That's the whole idea.",
      ],
    },

    {
      heading: "The $1,000 Example",
      paragraphs: [
        "Let's go back to that same $1,000 investment.",
        "Imagine the market has a great year and your investment earns a 10% return.",
        "You make $100.",
        "Your investment is now worth $1,100.",
        "The following year, imagine the market earns another 10%.",
        "You don't make another $100.",
        "You make $110.",
        "Because you're now earning a return on $1,100 instead of $1,000.",
        "The year after that you're earning a return on $1,210.",
        "Then on $1,331.",
        "Then on $1,464.",
        "Every year there is a little more money working for you.",
        "At first, it doesn't feel very exciting.",
        "The numbers are still small.",
        "The snowball still fits in your hands.",
        "But something important has changed.",
        "Your money is beginning to help grow itself.",
      ],
    },

    {
      heading: "When the Amount Starts Doing the Work",
      paragraphs: [
        "Now let's put that into perspective.",
        "Imagine you have $1,000 invested.",
        "If the market has a 10% year, your investment grows by $100.",
        "That's nice.",
        "Now imagine you've spent years investing and your portfolio has grown to $450,000.",
        "If the market has that very same 10% year, your investments grow by about $45,000.",
        "Both investors earned the exact same return.",
        "Ten percent.",
        "One made $100.",
        "The other made $45,000.",
        "The investment didn't change.",
        "The investor didn't change.",
        "The amount of money doing the work did.",
        "That's why the beginning feels so slow.",
        "Early on, most of the progress comes from the money you contribute.",
        "But every year your investments become a little larger.",
        "Every year they have a little more opportunity to earn even more.",
        "Then one day something remarkable happens.",
        "You open your investment account and realize it earned more money than you were able to contribute that year.",
        "Think about that for a moment.",
        "For years, every dollar in that account came from your paycheque.",
        "Now your money is helping build itself.",
        "It won't happen overnight.",
        "It may take many years.",
        "But when it does, compound interest stops being a definition.",
        "It becomes something you can actually see.",
        "Your investments have quietly become another income earner in your life.",
      ],
    },
    {
      heading: "You Cannot Earn Back Time",
      paragraphs: [
        "You can always earn more money.",
        "You can work overtime.",
        "You can ask for a raise.",
        "You can even change careers.",
        "The one thing you can never earn back is time.",
        "That's why compound interest is so powerful.",
        "It rewards people who start before they think they're ready.",
        "The S&P 500 has produced strong long-term returns throughout history.",
        "That doesn't mean it always will.",
        "No one knows what next year will bring.",
        "Past performance is never a guarantee of future results.",
        "If someone promises you guaranteed investment returns...",
        "Run.",
      ],
    },

    {
      heading: "You Don't Need to Be Rich",
      paragraphs: [
        "One of the biggest myths about investing is that you need thousands of dollars before you begin.",
        "You don't.",
        "Compound interest doesn't care whether your first investment is $100 or $1,000.",
        "It cares that you started.",
        "A small amount invested consistently over many years often accomplishes more than a large amount invested after years of waiting.",
        "People spend too much time wondering how much they should invest.",
        "A better question is whether they have started at all.",
        "The first dollar is rarely the most important.",
        "The first habit is.",
      ],
    },

    {
      heading: "One Last Thought",
      paragraphs: [
        "When I left that meeting in my twenties, I thought I had plenty of time.",
        "Now I realize time was the whole point.",
        "Compound interest is often described as money making money.",
        "That's true.",
        "But the lesson I wish someone had impressed upon me is simpler than that.",
        "Time is doing most of the work.",
        "Money simply gives time something to work with.",
        "The remarkable thing about compound interest is that it doesn't care whether you're paying attention to it.",
        "It keeps working while you're busy building a career, raising children, taking vacations, or simply living your life.",
        "If you're waiting until you know more...",
        "If you're waiting until you earn more...",
        "If you're waiting until life finally feels settled...",
        "Remember the snowball.",
        "It never becomes enormous with the first push.",
        "It becomes enormous because nobody stopped it halfway down the hill.",
        "The best time to start was years ago.",
        "The second-best time is the next payday.",
      ],
    },
    {
      heading: "The Lesson I Wish I'd Understood",
      paragraphs: [
        "I still think about that financial advisor.",
        "She gave good advice.",
        "I misunderstood it.",
        "Waiting four years didn't seem like a big decision at the time.",
        "Life was busy.",
        "Bills came first.",
        "Retirement felt far away.",
        "I thought I would catch up later.",
        "The problem with compound interest is that it doesn't reward good intentions.",
        "It rewards time.",
        "Those four years didn't just cost me four years of contributions.",
        "They cost me four years of growth.",
        "Then years of growth on that growth.",
        "That's the part I didn't understand.",
        "You can always earn more money.",
        "You cannot earn another year.",
        "Every year you wait is another year your investments never had the opportunity to grow.",
      ],
    },
    {
      heading: "What Is Simple Interest?",
      paragraphs: [
        "Before we talk about compound interest, let's look at simple interest.",
        "Imagine you invest $1,000 and somehow earn a guaranteed 10% simple interest every year.",
        "At the end of the first year you've earned $100.",
        "The second year you earn another $100.",
        "The third year you earn another $100.",
        "Every year you earn exactly the same amount because the interest is calculated only on your original investment.",
        "After ten years you've earned $1,000 in interest.",
        "Your investment is worth $2,000.",
        "Simple.",
        "Predictable.",
        "Compound interest works differently.",
        "Instead of paying you only on your original investment, it begins paying you on the money you've already earned.",
        "That's where things start to get interesting.",
           ],
        },
      ],
    };
   
    const TWENTY_NINTH_ARTICLE = {
      id: "how-to-spot-an-investment-scam-before-it-costs-you-everything",
      title: "How to Spot an Investment Scam Before It Costs You Everything",
      summary: "Scams change, but the warning signs repeat. Learning how scammers think can help protect the money you worked so hard to build.",
      image: "/article-investment-scam.png",
      readTime: "5 min read",
      category: "Investing",
      kicker: "INVESTING · PROTECTION · SCAMS",
      alt: "A laptop with a warning symbol, checklist, phone, and investment documents",
      caption: "Scammers sell certainty. Real investing never does.",
      quote: {
        strong: "Compound interest can spend decades building your wealth.",
        text: "A scam can destroy it in a single conversation.",
      },
      sections: [
        {
          heading: "Protecting what you build",
          paragraphs: [
            "We spend years learning how to make money.",
            "We spend far less time learning how to protect it.",
            "That's a problem.",
            "Compound interest can spend decades building your wealth.",
            "A scam can destroy it in a single conversation.",
            "Every few months there's another headline.",
            "Someone lost their retirement savings.",
            "Someone clicked the wrong link.",
            "Someone trusted the wrong person.",
            "Every time I read one of those stories, I think the same thing.",
            "Most of these people weren't greedy.",
            "They weren't trying to get rich overnight.",
            "They were simply trying to improve their financial future.",
          ],
        },
        {
          heading: "The names will change",
          paragraphs: [
            "Crypto scams will change.",
            "AI scams will change.",
            "The next investment scam probably hasn't even been invented yet.",
            "What won't change is how scammers think.",
            "Once you understand that, you'll start recognizing the warning signs long before you hear the name of the latest scam.",
          ],
        },
        {
          heading: "It almost happened to me",
          paragraphs: [
            "Years ago, I worked with one of the nicest coworkers you could imagine.",
            "She was always smiling.",
            "Always kind.",
            "The type of person everyone enjoyed working with.",
            "She retired in her late sixties, and although we didn't keep in touch very often, we stayed connected on Facebook.",
            "One day, completely out of the blue, she sent me a message.",
            "She asked how I was doing.",
            "She gave me an update on her family.",
            "We chatted back and forth for a few days.",
            "Nothing seemed unusual.",
            "Then the conversation changed.",
            "She asked if I had ever thought about investing in Bitcoin.",
          ],
        },
        {
          heading: "Something did not feel right",
          paragraphs: [
            "That immediately caught my attention.",
            "Not because there's anything wrong with Bitcoin.",
            "But because it didn't sound anything like her.",
            "The woman I remembered liked talking about baking.",
            "Exercise.",
            "Her church.",
            "Her family.",
            "Not cryptocurrency.",
            "Something didn't feel right.",
            "A little while later I found out what had happened.",
            "Her Facebook account had been compromised while she was away on vacation.",
            "The person I had been talking to wasn't my former coworker.",
            "It was a scammer pretending to be her.",
            "And I wasn't the only person receiving those messages.",
            "The scammer was contacting everyone on her friends list, hoping someone would trust a familiar face.",
          ],
        },
        {
          heading: "A familiar face can still be a warning sign",
          paragraphs: [
            "That experience taught me something I'll never forget.",
            "Scammers don't always pretend to be strangers.",
            "Sometimes they pretend to be someone you already trust.",
            "That's why taking your time can be one of the best financial decisions you'll ever make.",
          ],
        },
        {
          heading: "If professionals cannot guarantee returns",
          paragraphs: [
            "Think about the people who manage money for a living.",
            "This isn't their hobby.",
            "It's their career.",
            "Many have university degrees in finance, economics, accounting, or mathematics.",
            "They spend their days reading financial statements, studying companies, following economic news, and trying to understand where the markets might go next.",
            "Some manage hundreds of millions of dollars.",
            "Some manage billions.",
            "Many are paid hundreds of thousands of dollars a year because people trust them to make investment decisions.",
            "Despite all of that education and experience, they still can't tell you what the market will do next year.",
            "If they could, every investment they made would make money.",
            "They'd never have a losing year.",
            "That's simply not how investing works.",
          ],
        },
        {
          heading: "Why can this person guarantee it?",
          paragraphs: [
            "So when someone promises guaranteed 15% returns...",
            "Or a secret investment.",
            "Or no risk.",
            "Ask yourself one question.",
            "If professional investors who have spent decades studying the markets can't guarantee returns...",
            "Why can your friend's friend's uncle?",
            "Or the stranger who messaged you on social media.",
            "Or the person inviting you into an exclusive investment opportunity.",
            "If the investment is really that incredible, why are they spending so much time trying to convince strangers instead of quietly becoming wealthy themselves?",
          ],
        },
        {
          heading: "The scammer is a professional too",
          paragraphs: [
            "I think most of us picture a scammer sitting behind an old computer somewhere, sending random emails and hoping someone replies.",
            "That's probably one of the biggest mistakes we make.",
            "The scammer is a professional too.",
            "This is their full-time job.",
            "While professional investors spend their careers studying markets...",
            "Professional scammers spend theirs studying people.",
            "They build fake websites.",
            "They write convincing emails.",
            "They make phone calls.",
            "Then they spend hours looking for people who are going through major life changes.",
            "Retirement.",
            "An inheritance.",
            "Starting a business.",
            "Receiving a severance package.",
            "Talking online about wanting to make more money.",
            "Those moments often come with hope.",
            "Scammers know that.",
          ],
        },
        {
          heading: "They study people",
          paragraphs: [
            "They study what gets people to respond.",
            "What creates urgency.",
            "What builds trust.",
            "Professional investors study markets.",
            "Professional scammers study people.",
            "That's a dangerous combination.",
            "They don't need to fool everyone.",
            "They only need to fool enough people.",
            "If one scam convinces just 100 people to send $10,000 each, that's one million dollars.",
            "Every dollar they make is a dollar someone else spent years earning.",
            "They don't create wealth.",
            "They move it.",
            "Usually from the pockets of hardworking people into their own.",
            "Their business is deception.",
            "Understanding how scammers think is only half the battle.",
            "The other half is recognizing the promises they make.",
          ],
        },
        {
          heading: "Is the return too good to be true?",
          paragraphs: [
            "One of the biggest warning signs of an investment scam is a return that's almost impossible to ignore.",
            "Maybe it's 15%.",
            "Maybe it's 20%.",
            "Maybe it's even more.",
            "The number isn't what should concern you.",
            "The guarantee is.",
            "Every legitimate investment comes with risk.",
            "Every single one.",
            "Stocks.",
            "Real estate.",
            "Businesses.",
            "Bonds.",
            "Even cash sitting in a savings account slowly loses purchasing power because of inflation.",
            "When someone promises high returns with little or no risk, compare that promise to reality.",
          ],
        },
        {
          heading: "Certainty is not investing",
          paragraphs: [
            "The S&P 500 has averaged roughly 10% per year over the long term, including reinvested dividends.",
            "It didn't get there by earning 10% every year.",
            "Some years investors made excellent returns.",
            "Some years they lost money.",
            "Some years almost nothing happened.",
            "That's investing.",
            "No one can tell you exactly what next year will bring.",
            "If someone says they can...",
            "They're no longer describing an investment.",
            "They're selling certainty.",
          ],
        },
        {
          heading: "Verify before you invest",
          paragraphs: [
            "Before you send a dollar to anyone, spend a few minutes finding out who you're dealing with.",
            "Who is the company?",
            "Who is holding your money?",
            "Are they registered with the securities regulator where you live?",
            "Can you find independent information about them?",
            "Can you find complaints?",
            "Can you withdraw your money if you change your mind?",
            "Five minutes of research today could save you five years of trying to recover your money.",
            "A legitimate investment shouldn't be afraid of questions.",
            "A legitimate advisor should expect them.",
            "In Canada, you can verify whether an individual or firm is registered to sell investments through the Canadian Securities Administrators' National Registration Search.",
            "If you can't verify who you're dealing with...",
            "Don't verify them with your money.",
          ],
        },
        {
          heading: "Never let someone rush your decision",
          paragraphs: [
            "Scammers hate one thing.",
            "Time.",
            "They'll tell you there are only a few spots left.",
            "The opportunity ends tonight.",
            "You need to act before everyone else finds out.",
            "Don't overthink it.",
            "Just trust me.",
            "The faster you decide, the less time you have to ask questions.",
            "The less time you have to ask questions, the less likely you are to discover the truth.",
            "A legitimate investment will still be there tomorrow.",
            "A scammer hopes you never wait that long.",
            "Whenever someone asks you to invest immediately, ask yourself one question.",
            "Who benefits if I don't take the time to think?",
            "It usually isn't you.",
          ],
        },
        {
          heading: "Understand what you're buying",
          paragraphs: [
            "Here's a simple test.",
            "Could you explain the investment to a fifteen-year-old?",
            "Not every detail.",
            "Just the basics.",
            "How does it make money?",
            "Where does the return come from?",
            "Why should it increase in value?",
            "If you can't explain it in plain English, don't invest until you can.",
            "Confusion has emptied a lot of bank accounts.",
            "Understanding is one of the best forms of protection.",
          ],
        },
        {
          heading: "Can you get your money back?",
          paragraphs: [
            "There's one more question I'd ask.",
            "If you wanted your money back tomorrow...",
            "Could you get it?",
            "How long would it take?",
            "Would there be reasonable fees?",
            "Or would the excuses begin?",
            "Many investment scams work perfectly...",
            "Right up until someone asks for their money back.",
            "That's when emails stop getting answered.",
            "Phone calls go unanswered.",
            "Websites disappear.",
            "Always understand how you'll access your money before you invest.",
          ],
        },
        {
          heading: "Sleep on it",
          paragraphs: [
            "This might be the simplest rule in this article.",
            "Never invest because someone wants an answer today.",
            "Go home.",
            "Sleep on it.",
            "Read about it.",
            "Ask questions.",
            "Talk to someone you trust.",
            "The best investment decisions are rarely made in a hurry.",
            "The worst ones often are.",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "Making money is hard.",
            "Keeping it is just as important.",
            "Most people spend decades building their savings.",
            "Don't let someone talk you out of them in forty minutes.",
            "Scammers sell certainty.",
            "Real investing never does.",
            "Real investing isn't exciting most of the time.",
            "It's earning a paycheck.",
            "Investing consistently.",
            "Ignoring the noise.",
            "Giving compound interest enough time to do its job.",
            "That probably won't make headlines.",
            "But it has built far more wealth than shortcuts ever have.",
            "Protect your money with the same effort you use to earn it.",
            "If something sounds too good to be true...",
            "It isn't an opportunity.",
          ],
        },
      ],
    };

    const THIRTIETH_ARTICLE = {
      id: "the-safest-envelope-is-at-the-bank",
      title: "The Safest Envelope Is at the Bank",
      summary: "Cash can feel safe when it is close by, but long-term savings deserve more protection than a hiding place can offer.",
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
          heading: "Cash envelopes are everywhere",
          paragraphs: [
            "Cash envelopes are everywhere right now.",
            "Some people use them to budget.",
            "Others use them to store years of savings in a drawer, under a mattress, or in a home office.",
            "It feels safe because you always know where it is.",
            "But a story a friend shared with me has stayed with me for years.",
          ],
        },
        {
          heading: "The truck was gone",
          paragraphs: [
            "One morning she left the house for work like she always did.",
            "As she walked toward the garage, she stopped.",
            "Her husband's work truck was gone.",
            "At first she thought maybe he had left early.",
            "Then she remembered.",
            "He was still asleep inside.",
            "She ran back into the house and woke him up.",
            "\"Where's your truck?\"",
            "Still half asleep, he looked at her.",
            "\"What do you mean?\"",
            "\"Your truck isn't in the garage.\"",
            "He was out of bed in seconds.",
            "The two of them ran outside.",
            "The truck was gone.",
            "Along with thousands of dollars' worth of tools.",
          ],
        },
        {
          heading: "Then they noticed the filing cabinet",
          paragraphs: [
            "Then they noticed the filing cabinet.",
            "It was sitting in the backyard.",
            "The drawers had been pulled open.",
            "And it was almost empty.",
            "The police later explained that thieves sometimes steal business records to commit fraud using someone else's identity.",
            "Then they both thought of the same thing.",
            "The cash.",
            "She ran inside and checked the place where she had been hiding it.",
            "It was empty.",
            "For years she had quietly tucked away every extra dollar she could.",
            "She wasn't saving for a vacation.",
            "She was saving to buy an electric wheelchair for her ailing father.",
            "Insurance helped recover some of the value of the truck and the tools.",
            "But it didn't replace the cash.",
            "Years of sacrifice disappeared overnight.",
          ],
        },
        {
          heading: "My own hiding place",
          paragraphs: [
            "That story stayed with me.",
            "But if I'm being honest, it didn't change my habits immediately.",
            "I knew what had happened to my friend while she slept just a few rooms away.",
            "Still, I told myself my situation was different.",
            "I didn't own a business.",
            "I didn't have a work truck full of expensive tools.",
            "Before I knew better, I used to roll up cash and hide it in my broom closet.",
            "Every once in a while I'd pull it out, count it, smile, and tuck it back where I thought nobody would ever find it.",
          ],
        },
        {
          heading: "Who else could find it?",
          paragraphs: [
            "Then one day some family came to stay.",
            "While I was out, they decided to surprise me by cleaning the house.",
            "When I got home they were smiling.",
            "\"We found your stash!\" they laughed.",
            "I laughed too.",
            "But inside I was thinking...",
            "If someone trying to help could find it...",
            "Who else could?",
            "That's when it finally clicked.",
            "It doesn't matter how clever you think your hiding place is.",
            "Eventually someone else may find it.",
            "A burglar.",
            "A contractor.",
            "A visitor.",
            "A moment of bad luck.",
          ],
        },
        {
          heading: "The safest envelope I own",
          paragraphs: [
            "Unlike cash hidden around the house, money in a savings account leaves a record of every deposit, can earn interest, and may be protected by deposit insurance, depending on your financial institution and the type of account.",
            "Hidden cash doesn't earn interest.",
            "And if it disappears, it's gone forever.",
            "That's why I no longer think of a savings account as just another account.",
            "I think of it as the safest envelope I own.",
            "It keeps a record of every dollar I save.",
            "It gives my money a chance to grow.",
            "And it helps protect years of effort from disappearing because of one bad day.",
          ],
        },
        {
          heading: "Long-term savings deserve protection",
          paragraphs: [
            "If you're saving for retirement...",
            "A down payment...",
            "Your child's education...",
            "Or an electric wheelchair for someone you love...",
            "Your future deserves more protection than a hiding place can offer.",
            "Cash envelopes are great for groceries.",
            "They're great for entertainment.",
            "They're great for helping you stick to a budget.",
            "But long-term savings deserve long-term protection.",
            "They deserve records.",
            "They deserve interest.",
            "They deserve insurance.",
            "Most of all, they deserve to still be there when you need them.",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "The safest envelope isn't in your house.",
            "It's at your bank.",
            "Because some things take years to save...",
            "And only seconds to lose.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_FIRST_ARTICLE = {
      id: "the-day-your-credit-score-speaks-before-you-do",
      title: "The Day Your Credit Score Speaks Before You Do",
      summary: "Your credit score is not a measure of your worth. It is the financial history that can introduce you before you walk through the door.",
      image: "/article-credit-score-speaks.png",
      readTime: "4 min read",
      category: "Financial basics",
      kicker: "FINANCIAL BASICS · CREDIT · REPUTATION",
      alt: "A banker helping a customer sign paperwork at a desk",
      caption: "Your credit score can quietly open doors long before you walk through them.",
      quote: {
        strong: "A credit score isn't a measure of your worth.",
        text: "It's a measure of your financial history.",
      },
      sections: [
        {
          heading: "Imagine this",
          paragraphs: [
            "You've been thinking about a new vehicle for weeks.",
            "You finally find the right one.",
            "You take it for a test drive.",
            "You picture it in your driveway.",
            "You imagine taking your family on weekend trips.",
            "You can already see yourself driving it home.",
            "The salesperson smiles and says,",
            "\"Let's see what we can do.\"",
            "You fill out a few forms.",
            "Then you wait.",
            "A few minutes later, the salesperson walks back toward you with a smile.",
            "\"Good news,\" they say.",
            "\"You've been approved.\"",
            "Relief.",
            "Excitement.",
            "You smile too.",
            "Then they slide the paperwork across the desk.",
            "The interest rate is much higher than you expected.",
            "\"What happened?\" you ask.",
            "The salesperson points to one number.",
            "Your credit score.",
            "In that moment, you realize something.",
            "Long before you walked into the dealership...",
            "Your credit score had already introduced you.",
          ],
        },
        {
          heading: "More than just a number",
          paragraphs: [
            "That number isn't random.",
            "It's the story of where you've been financially...",
            "and how you've behaved along the way.",
            "It remembers whether you paid your bills on time.",
            "Whether you borrowed more than you could comfortably repay.",
            "Whether you managed your credit responsibly over months and years.",
            "Every payment you make.",
            "Every payment you miss.",
            "Every credit card you manage.",
            "Every loan you repay.",
            "Every financial decision quietly writes another line of your story.",
            "A credit score isn't a measure of your worth.",
            "It's a measure of your financial history.",
            "Those are two very different things.",
          ],
        },
        {
          heading: "Your financial reputation",
          paragraphs: [
            "Think of your credit score as your financial reputation.",
            "When you apply to rent an apartment, there isn't a meeting where every landlord you've ever had gathers around a table to discuss whether you always paid your rent.",
            "When you apply for a loan, there isn't a room full of bankers sharing stories about whether you made every payment on time.",
            "They don't know you.",
            "They've never met you.",
            "All they have is your financial history.",
            "Your credit report tells the story.",
            "Your credit score summarizes it.",
            "Together, they help answer one simple question:",
            "\"Based on this person's history, how much risk are we taking by lending them money or doing business with them?\"",
            "The lower the risk, the more doors begin to open.",
            "That's why a credit score is one of the most valuable financial assets you can build.",
            "Not because the number itself has value.",
            "Because it can quietly open doors long before you ever walk through them.",
          ],
        },
        {
          heading: "The day it mattered",
          paragraphs: [
            "When I bought my first house, I remember sitting in the bank waiting for my mortgage application.",
            "The banker handed me a form authorizing her to check my credit.",
            "I signed it.",
            "Then she stood up and left the office.",
            "For a few minutes, all I could do was wait.",
            "When she came back, she was smiling.",
            "\"You have great credit,\" she said.",
            "I remember feeling relieved.",
            "But if I'm being honest...",
            "I wasn't surprised.",
            "I already knew.",
            "Long before I walked into that office, I had decided my credit score was something worth protecting.",
            "I paid every bill on time.",
            "I paid down debt whenever I could.",
            "I never treated my credit cards like free money.",
            "I avoided carrying large balances.",
            "I understood that every financial decision was helping write my story.",
            "None of those choices felt exciting at the time.",
            "Most of them happened quietly.",
            "Payday after payday.",
            "Month after month.",
            "Year after year.",
            "The conversation in the bank lasted only a few minutes.",
            "The habits that made it possible took years.",
          ],
        },
        {
          heading: "Before you need it",
          paragraphs: [
            "Most people don't think about their credit score until they need it.",
            "That's usually too late.",
            "A credit score isn't something you build the week before applying for a mortgage.",
            "Or a vehicle loan.",
            "Or an apartment.",
            "By then, the story has already been written.",
            "You build it every time you make a payment.",
            "Every time you choose not to max out a credit card.",
            "Every time you pay down debt instead of letting it grow.",
            "Every payday is another opportunity to strengthen your financial reputation.",
            "Because one day you'll sit across from a lender.",
            "Or a landlord.",
            "Or someone deciding whether to trust you with credit.",
            "Before you shake hands...",
            "Before you answer a single question...",
            "Before you explain your plans...",
            "Your credit score will have already spoken for you.",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "The question is...",
            "What story do you want it to tell?",
            "Every payday writes your financial reputation.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_SECOND_ARTICLE = {
      id: "debt-grows-best-in-the-dark",
      title: "Debt Grows Best in the Dark",
      summary: "Ignoring debt can feel easier for a while, but progress begins the moment you open the envelope and face the number.",
      image: "/article-debt-grows-dark.png",
      readTime: "4 min read",
      category: "Debt",
      kicker: "DEBT · AWARENESS · PROGRESS",
      alt: "A pile of unopened envelopes sitting on a hallway table",
      caption: "Debt grows best in the dark. Progress grows in the light.",
      quote: {
        strong: "While you avoid the debt...",
        text: "the debt doesn't avoid you.",
      },
      sections: [
        {
          heading: "The unopened envelope",
          paragraphs: [
            "Imagine this.",
            "Every month an envelope arrives in the mail.",
            "You already know what it is.",
            "Another credit card statement.",
            "You don't open it.",
            "You set it on the counter.",
            "A few days later, you move it to a pile.",
            "The next month another one arrives.",
            "You don't open that one either.",
            "It feels easier not to know.",
            "After all, the balance hasn't magically disappeared.",
            "You already know you owe money.",
            "Why ruin your evening by looking at the number again?",
            "So the envelopes keep piling up.",
            "Each one contains the same uncomfortable truth.",
            "How much you owe.",
            "How much interest was added.",
            "How little the balance has changed.",
          ],
        },
        {
          heading: "The debt doesn't avoid you",
          paragraphs: [
            "Meanwhile, the interest keeps going to work.",
            "It doesn't care whether you opened the envelope.",
            "It doesn't care whether you checked the balance.",
            "It doesn't care whether you were busy, stressed, or hoping things would somehow work themselves out.",
            "While you avoid the debt...",
            "The debt doesn't avoid you.",
          ],
        },
        {
          heading: "The cost of peace of mind",
          paragraphs: [
            "Every once in a while, we used to get a phone call from a collection agency.",
            "They weren't looking for us.",
            "They were trying to reach someone we knew.",
            "They simply asked if we could have that person call them.",
            "It was a short conversation.",
            "But every time I hung up, I found myself thinking the same thing.",
            "I can't imagine what that must feel like.",
            "Knowing someone is trying to reach you because of a debt.",
            "Wondering if they'll call again.",
            "Wondering whether the debt has started following you into other parts of your life.",
            "Debt doesn't just cost money.",
            "Sometimes it costs peace of mind.",
          ],
        },
        {
          heading: "Six small months",
          paragraphs: [
            "Six months later, you finally decide to open one of those envelopes.",
            "The number isn't as scary as you imagined.",
            "It's worse.",
            "Not because one month changed everything.",
            "Because six small months did.",
            "That's how debt usually grows.",
            "Quietly.",
            "One statement.",
            "One interest charge.",
            "One avoided decision at a time.",
            "Ignoring it feels like relief.",
            "But it's only temporary.",
          ],
        },
        {
          heading: "The moment you face the number",
          paragraphs: [
            "The moment you finally face the number...",
            "Something changes.",
            "You stop guessing.",
            "You stop worrying about what it might be.",
            "You stop avoiding it.",
            "You start making a plan.",
            "That plan may not be dramatic.",
            "It may simply be setting up automatic payments.",
            "Adding a little extra whenever you can.",
            "Choosing one balance to pay off first.",
            "Checking the total every payday.",
            "Then waiting.",
            "Debt usually takes time to build.",
            "It often takes time to remove.",
            "There is rarely a miracle.",
            "No secret trick.",
            "No investment that suddenly makes everything disappear.",
            "There is only the next payment.",
            "Then the one after that.",
          ],
        },
        {
          heading: "Progress is faithful",
          paragraphs: [
            "At first, progress feels painfully slow.",
            "The balance barely moves.",
            "You wonder whether it's even making a difference.",
            "Then one day you notice something.",
            "The balance has dropped below a number you haven't seen in years.",
            "Eventually, one credit card reaches zero.",
            "Then another.",
            "The pile of statements gets smaller.",
            "So does the debt.",
            "That's when you realize something.",
            "Progress isn't fast.",
            "It's faithful.",
            "It quietly shows up every payday.",
          ],
        },
        {
          heading: "Open the envelope",
          paragraphs: [
            "One of the most powerful financial habits isn't making the biggest possible payment.",
            "It's refusing to look away.",
            "Know what you owe.",
            "Look at it every payday.",
            "Watch it go down.",
            "Celebrate every payment.",
            "Every hundred dollars.",
            "Every account that reaches zero.",
            "Because every payment proves something.",
            "You are no longer avoiding the problem.",
            "You are changing it.",
            "Debt grows best in the dark.",
            "Progress grows in the light.",
            "Sometimes the hardest financial decision you'll make isn't sending the payment.",
            "It's opening the envelope.",
            "Open the envelope.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_THIRD_ARTICLE = {
      id: "the-language-of-money",
      title: "The Language of Money",
      summary: "Money has its own vocabulary, but the words only sound intimidating until someone translates them.",
      image: "/article-language-of-money.png",
      readTime: "4 min read",
      category: "Financial basics",
      kicker: "FINANCIAL BASICS · LANGUAGE · CONFIDENCE",
      alt: "A group of professionals sitting around a table in a financial conversation",
      caption: "The language of money only sounds foreign until you learn your first few words.",
      quote: {
        strong: "Money isn't difficult because it's complicated.",
        text: "It's difficult because it has its own vocabulary.",
      },
      sections: [
        {
          heading: "The language you haven't learned yet",
          paragraphs: [
            "Imagine sitting around a table where everyone is speaking a language you've never heard before.",
            "One person says they're bullish.",
            "Another says the market has entered a bear market.",
            "Someone else starts talking about yield, dividends, capital gains, and ETFs.",
            "Everyone nods.",
            "You nod too.",
            "Not because you understand.",
            "Because you don't want to interrupt the conversation.",
            "Money has its own language.",
            "At first, it can sound complicated.",
            "The good news is that it usually isn't.",
          ],
        },
        {
          heading: "Two animals that explain the market",
          paragraphs: [
            "Take bull and bear markets.",
            "If you didn't grow up around investing, those names sound ridiculous.",
            "What do two animals have to do with the stock market?",
            "Quite a bit, actually.",
            "No one knows their exact origin, but the most common explanation comes from the way the animals attack.",
            "A bull charges forward and drives its horns upward.",
            "Up.",
            "A bear stands on its back legs and swipes its paws downward.",
            "Down.",
            "Over time, those movements became symbols for the direction of the market.",
            "When stock prices are generally rising over a sustained period, it's called a bull market.",
            "When prices are generally falling over a sustained period, it's called a bear market.",
            "Two animals.",
            "One goes up.",
            "One goes down.",
            "That's it.",
            "What sounds like complicated financial jargon is really just a simple picture.",
          ],
        },
        {
          heading: "The moment it clicked for me",
          paragraphs: [
            "I remember the first time I heard someone say,",
            "\"The market is bearish.\"",
            "I had no idea what they meant.",
            "I thought about asking.",
            "Instead, I nodded as though I understood.",
            "Later that evening I looked it up.",
            "It took less than a minute.",
            "I actually laughed.",
            "I'd spent far longer worrying about asking the question than it took to find the answer.",
            "That's when it hit me.",
            "Most financial language isn't complicated.",
            "It's just unfamiliar.",
            "Once someone explains it, you wonder why it ever sounded intimidating in the first place.",
          ],
        },
        {
          heading: "It isn't really about bulls and bears",
          paragraphs: [
            "That reminded me of something completely unrelated to money.",
            "You don't need to speak Italian before ordering a plate of pasta.",
            "You simply learn one word at a time.",
            "Money works the same way.",
            "You don't need to understand every financial term before you begin learning.",
            "Nobody is born knowing what an ETF is.",
            "Or a dividend.",
            "Or compound interest.",
            "Or asset allocation.",
            "Those words only sound intimidating because they're unfamiliar.",
            "Once someone explains them, they're often much simpler than they first appeared.",
            "Money isn't difficult because it's complicated.",
            "It's difficult because it has its own vocabulary.",
          ],
        },
        {
          heading: "The language gets easier",
          paragraphs: [
            "I've learned that most financial language is like that.",
            "It sounds intimidating...",
            "Until someone translates it.",
            "Then you wonder why it ever seemed complicated in the first place.",
            "ETF.",
            "Compound interest.",
            "Diversification.",
            "Capital gains.",
            "One by one, they stop sounding like jargon and start becoming useful tools.",
            "Learning the language of money is a lot like learning a second language.",
            "At first, every sentence feels confusing.",
            "Then one day, you catch yourself understanding a conversation that once made no sense at all.",
            "Not because the language changed.",
            "Because you did.",
          ],
        },
        {
          heading: "Don't let the words stop you",
          paragraphs: [
            "One of the biggest mistakes people make is believing that finance is only for experts.",
            "It isn't.",
            "Every financial advisor...",
            "Every investor...",
            "Every accountant...",
            "Every financially confident person...",
            "Heard these words for the first time at some point.",
            "They weren't born speaking the language of money.",
            "They learned it.",
            "One word at a time.",
            "Every financial word you understand becomes another tool you'll use for the rest of your life.",
            "Then one day you'll hear someone say,",
            "\"The market is bullish.\"",
            "And instead of wondering what they mean...",
            "You'll simply smile.",
            "Because the language that once sounded foreign has quietly become your own.",
            "The language of money only sounds foreign until you learn your first few words.",
            "Every payday teaches something.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_FOURTH_ARTICLE = {
      id: "your-house-is-not-your-retirement-plan",
      title: "Your House Is Not Your Retirement Plan",
      summary: "A home can be a wonderful place to live, but housing and wealth are not automatically the same thing.",
      image: "/article-house-retirement-plan.png",
      readTime: "4 min read",
      category: "Retirement",
      kicker: "RETIREMENT · HOUSING · WEALTH",
      alt: "Neighbours waving outside homes on a sunny residential street",
      caption: "Your house may be where you live. It shouldn't be the only place your future lives.",
      quote: {
        strong: "A home and wealth aren't the same thing.",
        text: "One is where you live. The other is what you're building.",
      },
      sections: [
        {
          heading: "My first place",
          paragraphs: [
            "I grew up in a house.",
            "So when I went away to university and had the chance to rent my own little apartment, I couldn't wait.",
            "It wasn't fancy.",
            "The carpet had seen better days.",
            "The kitchen was tiny.",
            "And yes...",
            "It didn't take long before I discovered there were a few mice living there too.",
            "It certainly wasn't my dream home.",
            "But it was mine.",
            "For the first time, I had a place of my own.",
            "Looking back, I'm glad I rented.",
            "Not because renting is better than owning.",
            "But because it taught me something.",
            "A home and wealth aren't the same thing.",
            "One is where you live.",
            "The other is what you're building.",
            "Sometimes those two things grow together.",
            "Sometimes they don't.",
          ],
        },
        {
          heading: "A house does two jobs",
          paragraphs: [
            "A house is first and foremost...",
            "A place to live.",
            "Some people also hope it will build wealth.",
            "Sometimes it does.",
            "Sometimes it doesn't.",
            "Those are two different goals.",
            "The mistake is assuming they're always the same.",
            "Buying a home doesn't automatically make someone wealthy.",
            "Neither does renting automatically hold someone back.",
          ],
        },
        {
          heading: "The question few people ask",
          paragraphs: [
            "Imagine two people each have $500 left at the end of the month.",
            "One uses it to make extra mortgage payments.",
            "The other invests it.",
            "Ten...",
            "Twenty...",
            "Thirty years pass.",
            "Who ends up with more money?",
            "The honest answer is...",
            "It depends.",
            "It depends on home prices.",
            "Investment returns.",
            "Interest rates.",
            "Maintenance.",
            "Property taxes.",
            "How long they stay.",
            "No one can answer that question with certainty.",
            "That's why the rent-versus-buy debate never really ends.",
          ],
        },
        {
          heading: "The bigger question",
          paragraphs: [
            "I've noticed something interesting.",
            "People spend hours arguing about whether renting or buying is better.",
            "Very few ask a much more important question.",
            "Am I building wealth at all?",
            "Because someone can rent for thirty years and faithfully invest every payday.",
            "Someone else can own a home for thirty years and never invest another dollar.",
            "The address doesn't determine the outcome.",
            "The habits do.",
          ],
        },
        {
          heading: "The trap",
          paragraphs: [
            "Sometimes people buy more house than they can comfortably afford because they believe every dollar going into a mortgage is automatically an investment.",
            "Sometimes people rent because they think buying is impossible, then spend every extra dollar instead of investing it.",
            "Both people can make the same mistake.",
            "They confuse housing with wealth.",
            "A home may become one of your biggest assets.",
            "But it isn't the only way to build one.",
          ],
        },
        {
          heading: "Where wealth really comes from",
          paragraphs: [
            "Wealth usually isn't built by one decision.",
            "It's built by thousands of small ones.",
            "Living below your means.",
            "Saving consistently.",
            "Investing patiently.",
            "Avoiding unnecessary debt.",
            "Making intentional choices every payday.",
            "Whether those choices happen in a rented apartment...",
            "A townhouse...",
            "Or a paid-off home...",
            "Matters less than many people think.",
            "Your house may be where you live.",
            "It shouldn't be the only place your future lives.",
          ],
        },
        {
          heading: "The better question",
          paragraphs: [
            "Instead of asking,",
            "\"Should I rent or should I buy?\"",
            "Try asking,",
            "\"Am I building my future where I live today?\"",
            "Because that's the question that really matters.",
            "A house can build equity.",
            "Investments can build wealth.",
            "Both can work.",
            "Neither is automatic.",
            "Renting doesn't prevent wealth.",
            "Buying doesn't guarantee it.",
            "The people who usually succeed aren't the ones arguing over which path is perfect.",
            "They're the ones faithfully moving forward on the path they've chosen.",
          ],
        },
        {
          heading: "Build more than an address",
          paragraphs: [
            "You can own the house you live in...",
            "Or you can own the future you'll live with.",
            "The luckiest people build both.",
            "Every payday builds something.",
            "A mortgage.",
            "Investments.",
            "Or neither.",
            "Make sure you're building more than an address.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_FIFTH_ARTICLE = {
      id: "the-best-financial-decision-is-the-one-you-only-make-once",
      title: "The Best Financial Decision Is the One You Only Make Once",
      summary: "Automation turns good intentions into a system, so one smart decision can repeat every payday.",
      image: "/article-one-decision-once.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · AUTOMATION · HABITS",
      alt: "A quiet kitchen table with a coffee, work bag, keys, and travel mug ready for the day",
      caption: "Sometimes the smartest financial decision is the one you only have to make once.",
      quote: {
        strong: "A good system beats good intentions.",
        text: "It keeps your plan moving when life gets busy.",
      },
      sections: [
        {
          heading: "Good intentions every payday",
          paragraphs: [
            "Every payday used to begin with good intentions.",
            "I'd tell myself this would be the payday I finally saved a little more.",
            "Maybe I'd pay extra on my credit card.",
            "Maybe I'd put something into my investment account.",
            "Then the week would unfold.",
            "A bill would show up.",
            "Someone would suggest going out for dinner.",
            "Something around the house would need replacing.",
            "By the time the next payday arrived, nothing had changed.",
            "The problem wasn't that I didn't know what I should do.",
            "The problem was that I had to make the same decision over and over again.",
          ],
        },
        {
          heading: "The conversation I kept having",
          paragraphs: [
            "Every payday sounded almost the same.",
            "\"I'll move some money into savings after I pay these bills.\"",
            "\"I'll put a little extra on my credit card next time.\"",
            "\"I'll start investing once things settle down.\"",
            "The conversation changed.",
            "The outcome didn't.",
            "There was always another reason to wait.",
            "Next payday became the one after that.",
            "Then the one after that.",
            "I wasn't failing at money.",
            "I was failing at repetition.",
          ],
        },
        {
          heading: "One decision instead of fifty",
          paragraphs: [
            "Eventually I stopped trying to motivate myself every two weeks.",
            "I set up an automatic transfer.",
            "On payday, part of my paycheque moved straight into savings before I had a chance to spend it.",
            "I didn't suddenly become more disciplined.",
            "I simply stopped asking myself the same question every payday.",
            "After a few months, I barely noticed the money was gone.",
            "Saving had quietly become part of my routine.",
            "Just like paying my phone bill.",
            "Just like paying my insurance.",
            "It was no longer a decision.",
            "It was a system.",
          ],
        },
        {
          heading: "Pay yourself first",
          paragraphs: [
            "One of the oldest ideas in personal finance is also one of the simplest.",
            "Pay yourself first.",
            "Not after you've paid every bill.",
            "Not if there's money left over.",
            "First.",
            "Automation makes that possible.",
            "Your savings become another scheduled payment.",
            "So do your investments.",
            "Even an extra payment on your debt can happen automatically.",
            "The difference is that this payment goes to your future.",
          ],
        },
        {
          heading: "A good system beats good intentions",
          paragraphs: [
            "Automation doesn't mean you stop paying attention to your money.",
            "You still need a budget.",
            "You still need to review your accounts.",
            "You still need to catch mistakes or unexpected charges.",
            "Automation doesn't replace good financial habits.",
            "It supports them.",
            "It keeps your plan moving forward when life gets busy.",
            "It protects your future from your excuses.",
          ],
        },
        {
          heading: "The quiet habit that builds wealth",
          paragraphs: [
            "People often think disciplined savers have extraordinary willpower.",
            "I'm not convinced that's true.",
            "Many of them simply removed the decision.",
            "They made it once...",
            "Then let the system repeat it every payday.",
            "Wealth usually isn't built by making hundreds of perfect decisions.",
            "It's often built by making one good decision...",
            "And allowing it to happen again...",
            "And again...",
            "And again.",
            "Quietly.",
            "Predictably.",
            "Without having to convince yourself every two weeks.",
            "Sometimes the smartest financial decision...",
            "Is the one you only have to make once.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_SIXTH_ARTICLE = {
      id: "the-most-expensive-word-in-personal-finance-is-later",
      title: "The Most Expensive Word in Personal Finance Is \"Later.\"",
      summary: "Later sounds harmless, but waiting quietly moves the finish line one payday at a time.",
      image: "/article-expensive-word-later.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "PAYDAY PHILOSOPHY · TIME · MOMENTUM",
      alt: "A man standing outside a bank with coffee in hand",
      caption: "Later does not sound expensive. That is what makes it so easy to accept.",
      quote: {
        strong: "Most financial mistakes don't begin with one terrible decision.",
        text: "They begin with a decision that never gets made.",
      },
      sections: [
        {
          heading: "Later doesn't sound expensive",
          paragraphs: [
            "Later doesn't sound expensive.",
            "If anything, it sounds sensible.",
            "\"I'll start investing later.\"",
            "\"I'll make a budget later.\"",
            "\"I'll look at that credit card statement later.\"",
            "None of those decisions feel permanent.",
            "That's what makes them so easy to accept.",
          ],
        },
        {
          heading: "Time never sends you an invoice",
          paragraphs: [
            "If someone handed you a bill for ten thousand dollars, you'd notice.",
            "You'd want to know where it came from.",
            "You'd wonder what happened.",
            "Time doesn't work that way.",
            "It never sends an invoice.",
            "It never tells you what waiting cost.",
            "It just keeps moving.",
            "One payday becomes the next.",
            "Then another.",
            "Months quietly become years.",
            "By the time you finally get around to starting, you realize you've been meaning to do it for a long time.",
          ],
        },
        {
          heading: "I've said it too",
          paragraphs: [
            "I've caught myself doing exactly the same thing.",
            "\"I'll wait until things settle down.\"",
            "\"I'll save more after Christmas.\"",
            "\"I'll start investing once I understand it better.\"",
            "At the time, every one of those reasons felt perfectly reasonable.",
            "Life was busy.",
            "There were bills to pay.",
            "Something around the house always needed fixing.",
            "I never decided my future wasn't important.",
            "I simply kept moving it one payday further away.",
            "What felt temporary slowly became normal.",
          ],
        },
        {
          heading: "The finish line keeps moving",
          paragraphs: [
            "Have you ever noticed how often people say they'll start saving when they earn more?",
            "Sometimes they do earn more.",
            "Then life quietly expands to match it.",
            "The apartment gets bigger.",
            "The vehicle gets newer.",
            "The grocery bill creeps up.",
            "Before long, the extra income has already found somewhere to go.",
            "The savings plan is still waiting.",
          ],
        },
        {
          heading: "The cost is easy to ignore",
          paragraphs: [
            "Skipping one investment doesn't seem like much.",
            "Neither does putting off your emergency fund until next month.",
            "Or making the minimum payment one more time.",
            "Nothing dramatic happens.",
            "That's why it's so easy to keep waiting.",
            "The cost doesn't arrive in one big moment.",
            "It builds quietly across dozens of ordinary paydays that never felt important on their own.",
            "Looking back, they were.",
          ],
        },
        {
          heading: "Tomorrow usually looks like today",
          paragraphs: [
            "It's easy to believe the future version of ourselves will have more time.",
            "More time.",
            "More discipline.",
            "More money.",
            "Then tomorrow arrives.",
            "Life is still busy.",
            "Unexpected expenses still appear.",
            "The washing machine still breaks.",
            "Birthdays still come around.",
            "Tomorrow looks a lot like today.",
            "Only the date has changed.",
          ],
        },
        {
          heading: "Start before it feels perfect",
          paragraphs: [
            "I've learned that good financial habits rarely begin because everything finally falls into place.",
            "They begin because someone gets tired of waiting.",
            "The first investment is rarely perfect.",
            "The first budget usually isn't either.",
            "That doesn't matter.",
            "Progress almost always begins before confidence does.",
          ],
        },
        {
          heading: "One payday is enough",
          paragraphs: [
            "You don't have to transform your financial life today.",
            "Just change one payday.",
            "Move twenty dollars into savings.",
            "Pay a little extra on your debt.",
            "Increase your retirement contribution by one percent.",
            "Do one thing your future self will appreciate.",
            "Then repeat it next payday.",
            "Because most financial mistakes don't begin with one terrible decision.",
            "They begin with a decision that never gets made.",
            "It almost always sounds the same.",
            "\"Later.\"",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_SEVENTH_ARTICLE = {
      id: "i-have-a-chequebook-somewhere",
      title: "I Have a Chequebook Somewhere",
      summary: "An old chequebook is a quiet reminder that money never stands still, and our financial habits need to keep learning too.",
      image: "/article-chequebook-somewhere.png",
      readTime: "4 min read",
      category: "Financial basics",
      kicker: "FINANCIAL BASICS · CHANGE · LEARNING",
      alt: "An older man paying by card while holding a wallet with cheques",
      caption: "Money never stands still. Your habits should keep learning with it.",
      quote: {
        strong: "Sometimes the habit holding us back isn't a bad one.",
        text: "It's a habit we've never stopped questioning.",
      },
      sections: [
        {
          heading: "The chequebook somewhere",
          paragraphs: [
            "I have a chequebook somewhere.",
            "I'm just not exactly sure where.",
            "It used to live in the top drawer of my desk.",
            "Now it's probably in a filing cabinet, a moving box, or tucked away at the back of a closet.",
            "The funny thing is, I can't remember the last time I actually used it.",
            "The last cheque I clearly remember writing wasn't to pay anyone.",
            "I wrote one word across the front.",
            "VOID.",
            "The bank wanted it so I could set up direct deposit.",
            "That might have been the last important job my chequebook ever had.",
          ],
        },
        {
          heading: "When cheques were normal",
          paragraphs: [
            "There was a time when writing a cheque was just part of life.",
            "Rent.",
            "The power bill.",
            "School fees.",
            "The local plumber.",
            "You filled in the date, wrote the amount, signed your name, slipped it into an envelope, and dropped it in the mailbox.",
            "Nobody thought it was old-fashioned.",
            "It was simply how money worked.",
          ],
        },
        {
          heading: "I never really stopped using them",
          paragraphs: [
            "Looking back, I don't remember deciding to stop writing cheques.",
            "One bill became automatic.",
            "Then another.",
            "My pay started arriving by direct deposit.",
            "Friends began asking for e-transfers instead.",
            "Little by little, the chequebook stayed in the drawer.",
            "Not because I made a conscious decision.",
            "Because life quietly changed around me.",
          ],
        },
        {
          heading: "That's the part I almost missed",
          paragraphs: [
            "One day it occurred to me that my chequebook hadn't become outdated overnight.",
            "The world had simply moved on.",
            "Then another thought followed.",
            "If I wasn't willing to keep learning, one day my financial habits could become outdated too.",
            "That had nothing to do with cheques.",
            "It had everything to do with staying open to change.",
          ],
        },
        {
          heading: "Money doesn't stay the same",
          paragraphs: [
            "Think about how much has changed.",
            "People once stood in line at the bank to deposit a cheque.",
            "Now many of us do it with a phone while sitting in our driveway.",
            "Years ago, balancing a chequebook was a monthly routine.",
            "Today, most people can see their account balance in seconds.",
            "The way we save, spend, borrow, and invest continues to evolve.",
            "It always will.",
          ],
        },
        {
          heading: "Old habits can become expensive",
          paragraphs: [
            "I've met people who still think investing is only for wealthy families.",
            "Others keep large amounts of money sitting in a chequing account because that's what they've always done.",
            "Some avoid online banking or newer investment options simply because they feel unfamiliar.",
            "Being careful is a good thing.",
            "Refusing to learn is different.",
            "Sometimes the habit holding us back isn't a bad one.",
            "It's a habit we've never stopped questioning.",
          ],
        },
        {
          heading: "Keep learning",
          paragraphs: [
            "You don't have to follow every financial trend.",
            "Some ideas are worth ignoring.",
            "Others can make your financial life simpler, safer, or more rewarding.",
            "The challenge is knowing the difference.",
            "That only happens if you stay curious.",
            "Ask questions.",
            "Read.",
            "Learn.",
            "Be willing to replace an old habit when a better one comes along.",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "I'll probably never throw that old chequebook away.",
            "Not because I expect to use it again.",
            "Because it reminds me that money never stands still.",
            "One day, today's financial tools will seem just as old-fashioned.",
            "The people who usually succeed with money aren't the ones who already know everything.",
            "They're the ones who keep learning.",
            "The world will keep changing.",
            "Your finances should keep growing with it.",
            "Every payday teaches something.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_EIGHTH_ARTICLE = {
      id: "the-drawer-full-of-phone-chargers",
      title: "The Drawer Full of Phone Chargers",
      summary: "A drawer full of old cables can teach the same lesson as old financial habits: every once in a while, ask whether this still works for you.",
      image: "/article-phone-chargers-drawer.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "PAYDAY PHILOSOPHY · HABITS · CLUTTER",
      alt: "Hands sorting through a drawer full of old phone chargers and cables",
      caption: "Sometimes the smartest financial decision is letting go of something that stopped serving you.",
      quote: {
        strong: "It's easy to carry old habits longer than we need to.",
        text: "That's true for phone chargers. And it's true for money.",
      },
      sections: [
        {
          heading: "The drawer full of chargers",
          paragraphs: [
            "I recently learned you can get a little money for old phone chargers and cables because of the copper inside them.",
            "It won't make you rich.",
            "But I figured I might as well clean out the drawer and see what was in there.",
            "So I walked over to our overstuffed electronics junk drawer and started sorting through it.",
            "What I found wasn't just a pile of old chargers.",
            "It was a little collection of my life.",
            "There was a charger from my favourite phone.",
            "I still remember buying that phone.",
            "I carried it everywhere.",
            "At the time, I couldn't imagine ever replacing it.",
            "There was another charger from an old GPS that came with us on road trips before every destination lived in our phones.",
            "Then I started laughing.",
            "Why do I have four of the same charger?",
            "Do any of these even work anymore?",
          ],
        },
        {
          heading: "Every one made sense at the time",
          paragraphs: [
            "The funny thing is, I didn't keep them on purpose.",
            "I just never got around to getting rid of them.",
            "Every charger in that drawer once had a job.",
            "Every one belonged to something I used almost every day.",
            "Then life moved on.",
            "The phones disappeared.",
            "The chargers stayed.",
          ],
        },
        {
          heading: "Then I started thinking about money",
          paragraphs: [
            "Standing there with a handful of old cables, something occurred to me.",
            "I wondered if I had a financial junk drawer too.",
            "Not a real drawer.",
            "The kind filled with old decisions I hadn't looked at in years.",
            "Maybe it was the savings account I opened when I got my first job.",
            "A credit card I keep \"just in case\" even though I never use it.",
            "The same bank I've always used because changing it sounds like too much work.",
            "Or a subscription that quietly renews every month because I forgot it was there.",
            "None of those were bad decisions.",
            "They simply hadn't been questioned in a long time.",
          ],
        },
        {
          heading: "Some things stay because they're familiar",
          paragraphs: [
            "The chargers weren't sitting in that drawer because I still needed them.",
            "They were there because I never stopped to ask if I did.",
            "Money has a way of working like that too.",
            "Some financial habits deserve to stay with us for life.",
            "Others quietly outlive their usefulness.",
            "The hard part is knowing the difference.",
          ],
        },
        {
          heading: "Open the drawer once in a while",
          paragraphs: [
            "Every now and then it's worth taking another look.",
            "Not just at the junk drawer in your house.",
            "At the one in your financial life.",
            "Ask yourself:",
            "Does this account still make sense?",
            "Am I paying for something I no longer use?",
            "Could my money be working harder somewhere else?",
            "Is there a simpler way to manage this today than there was five or ten years ago?",
            "You don't have to change everything.",
            "But every once in a while, it's worth asking one simple question.",
            "Does this still work for me?",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "I'll probably find another old charger the next time I open that drawer.",
            "Maybe I'll finally recycle a few of them.",
            "Maybe I'll keep one or two for reasons I can't quite explain.",
            "Either way, that drawer reminds me of something.",
            "It's easy to carry old habits longer than we need to.",
            "That's true for phone chargers.",
            "And it's true for money.",
            "Sometimes the smartest financial decision isn't adding something new.",
            "It's letting go of something that stopped serving you a long time ago.",
            "Every payday is a good time to ask, \"Does this still work for me?\"",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTY_NINTH_ARTICLE = {
      id: "nobody-talks-about-financial-seasons",
      title: "Nobody Talks About Financial Seasons",
      summary: "Money changes as life changes. The best financial plan is not the same one forever, but the one that fits the season you are actually living in.",
      image: "/article-financial-seasons.png",
      readTime: "4 min read",
      category: "Financial basics",
      kicker: "FINANCIAL BASICS · LIFE STAGES · PLANNING",
      alt: "A quiet park bench beside water in warm morning light",
      caption: "Every season asks something different of us.",
      quote: {
        strong: "Money has seasons.",
        text: "Just like life does.",
      },
      sections: [
        {
          heading: "Retirement belonged to another season",
          paragraphs: [
            "When I was younger, retirement barely crossed my mind.",
            "Not because I thought it wasn't important.",
            "It just felt so far away that I couldn't picture it.",
            "I was thinking about paying rent.",
            "Buying groceries.",
            "Finding a steady job.",
            "Trying to save for my next vehicle.",
            "Retirement belonged to another season of life.",
            "Not this one.",
          ],
        },
        {
          heading: "The seasons change",
          paragraphs: [
            "Looking back, I've realized something.",
            "Money changes as life changes.",
            "The financial questions I had in my twenties aren't the ones I have today.",
            "And I suspect they'll change again.",
            "We talk a lot about budgeting, investing, and retirement.",
            "We don't spend much time talking about when each of those things naturally becomes more important.",
            "Money has seasons.",
            "Just like life does.",
          ],
        },
        {
          heading: "Spring",
          paragraphs: [
            "Spring is where most of us begin.",
            "I still remember getting my first paycheque.",
            "For a couple of days I felt rich.",
            "Then I started paying bills and quickly realized where money goes.",
            "There was a first apartment.",
            "A first credit card.",
            "The first time I tried to save money.",
            "And plenty of mistakes.",
            "Looking back, I wouldn't change any of them.",
            "They taught me lessons I still use today.",
          ],
        },
        {
          heading: "Summer",
          paragraphs: [
            "Then life starts getting busier.",
            "Careers grow.",
            "Maybe there's a mortgage.",
            "Children.",
            "Home repairs.",
            "Vacations to save for.",
            "The list gets longer.",
            "This is the season where money often feels stretched in every direction.",
            "You don't always notice progress because life is happening so quickly.",
            "But these are the years when ordinary habits quietly shape the future.",
          ],
        },
        {
          heading: "Autumn",
          paragraphs: [
            "One day retirement doesn't seem so far away anymore.",
            "You catch yourself wondering whether you've saved enough.",
            "Paying off debt feels more important than taking on more of it.",
            "Protecting what you've built begins to matter just as much as building it.",
            "The questions change.",
            "So should the plan.",
          ],
        },
        {
          heading: "Winter",
          paragraphs: [
            "If everything goes according to plan, your money starts doing what it was meant to do.",
            "Supporting your life.",
            "Giving you choices.",
            "Giving you time.",
            "The goal was never to have the biggest investment account.",
            "It was to build enough freedom that work becomes something you choose, not something you have to do.",
          ],
        },
        {
          heading: "No two lives follow the same calendar",
          paragraphs: [
            "Some people buy a home at twenty-five.",
            "Others never do.",
            "Some retire early.",
            "Others keep working because they enjoy it.",
            "There isn't one timetable for a successful financial life.",
            "That's why comparing yourself to someone else rarely helps.",
            "You're living your season.",
            "Not theirs.",
          ],
        },
        {
          heading: "Know what season you're in",
          paragraphs: [
            "One mistake I think people make is following advice meant for someone in a completely different stage of life.",
            "Advice that fits someone just starting out may not fit someone five years from retirement.",
            "The opposite is true too.",
            "Good financial advice isn't one-size-fits-all.",
            "It depends on where you are today.",
          ],
        },
        {
          heading: "One final thought",
          paragraphs: [
            "The funny thing about seasons is that you rarely notice them changing.",
            "One day it's summer.",
            "Then the mornings get cooler.",
            "The leaves begin to turn.",
            "Before long, it's autumn.",
            "Life changes the same way.",
            "One day you're saving for your first apartment.",
            "Then you're saving for your children's future.",
            "Then you're wondering whether you've saved enough for your own.",
            "Every season asks something different of us.",
            "Every once in a while, it's worth stopping to ask:",
            "Am I still making financial decisions for the season of life I'm actually living in?",
            "Because the best financial plan isn't the same one forever.",
            "It's the one that fits your life today.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTIETH_ARTICLE = {
      id: "seeds-for-a-future-you-cannot-see-yet",
      title: "Seeds for a Future You Cannot See Yet",
      summary: "Every payday can plant something for a future that has not arrived yet, even when you cannot see which seeds will grow.",
      image: "/article-seed-money-future.png",
      readTime: "3 min read",
      category: "Payday philosophy",
      kicker: "PAYDAY PHILOSOPHY · SEED MONEY · FUTURE",
      alt: "A farmer planting seeds in a field at sunset",
      caption: "Start seeing each payday as seed money for a future you cannot see yet.",
      quote: {
        strong: "Not every seed will grow.",
        text: "The answer isn't to stop planting.",
      },
      sections: [
        {
          heading: "A future you cannot see yet",
          paragraphs: [
            "Some of the most important things you plant won't have an obvious purpose at first.",
            "An emergency fund may sit untouched for years.",
            "A relationship you build today may open a door years from now.",
            "A skill that seems unrelated to your current job may become exactly what your next opportunity requires.",
            "That's the nature of seed money.",
            "You're investing in a future that hasn't arrived yet.",
          ],
        },
        {
          heading: "Not every seed will grow",
          paragraphs: [
            "Not every seed will grow.",
            "Some courses won't lead to better opportunities.",
            "Some investments will disappoint.",
            "Some business ideas won't succeed.",
            "Some plans will change because life changes.",
            "That's true for every farmer.",
            "The answer isn't to stop planting.",
            "It's to plant thoughtfully, plant consistently, and understand that you never know which seed will become tomorrow's harvest.",
            "Fortunately, it only takes a few good seeds to make years of careful planting worthwhile.",
          ],
        },
        {
          heading: "Look at your next payday differently",
          paragraphs: [
            "The next time you're paid, most of that money already has a purpose.",
            "Food.",
            "Housing.",
            "Transportation.",
            "Utilities.",
            "The ordinary costs of life.",
            "But perhaps a small part of it can do something more.",
            "It can begin an emergency fund.",
            "Reduce a debt.",
            "Buy an investment.",
            "Pay for a new skill.",
            "Help educate a child.",
            "Protect something you can't afford to replace.",
          ],
        },
        {
          heading: "Seed money",
          paragraphs: [
            "Most people see a paycheck as money to spend.",
            "Start seeing it as seed money.",
            "You only get about 1,040 paydays during your working life.",
            "Every one of them is an opportunity to plant something that can make the next payday a little better.",
            "Some seeds won't grow.",
            "Some will surprise you.",
            "The important thing is to keep planting.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_FIRST_ARTICLE = {
      id: "why-money-flows-downhill",
      title: "Why Money Flows Downhill",
      summary: "Money follows the easiest path unless you shape where it should go before habit and convenience claim it.",
      image: "/article-money-flows-downhill.png",
      readTime: "5 min read",
      category: "Payday philosophy",
      kicker: "PAYDAY PHILOSOPHY · HABITS · SYSTEMS",
      alt: "Water flowing through channels carved into a hillside at sunset",
      caption: "Money follows the paths we've already created.",
      quote: {
        strong: "The real competition isn't between spending and saving.",
        text: "It's between convenience and intention.",
      },
      sections: [
        {
          heading: "Money follows the path",
          paragraphs: [
            "After a heavy rain, water doesn't stop to think about where it should go.",
            "It follows the easiest path.",
            "Over time, those paths become deeper.",
            "The next rainfall follows the same channels because they're already there.",
            "Money often behaves the same way.",
            "If you don't decide where it should go, it usually finds its own destination.",
            "A rideshare home instead of the bus.",
            "Takeout after a busy day.",
            "A few drinks with friends.",
            "An online purchase that seemed like a bargain.",
            "Another subscription that looked useful.",
            "None of those choices are necessarily mistakes.",
            "The problem is that they quietly become habits.",
            "Before long, payday arrives and part of your income already has somewhere to go.",
            "Not because you made a decision today.",
            "Because you made one weeks, months, or even years ago.",
            "Money follows the paths we've already created.",
          ],
        },
        {
          heading: "The channels we build",
          paragraphs: [
            "Think about your own spending for a moment.",
            "Some bills are unavoidable.",
            "Housing.",
            "Utilities.",
            "Insurance.",
            "Groceries.",
            "Those aren't the problem.",
            "The rest of your money, however, will usually drift toward whatever has become familiar.",
            "Convenience.",
            "Entertainment.",
            "Small rewards after a long day.",
            "Habits rarely feel expensive because they happen a little at a time.",
            "Like water slowly carving a channel through the ground, those small decisions become easier to repeat with every payday.",
          ],
        },
        {
          heading: "Convenience usually wins",
          paragraphs: [
            "The real competition isn't between spending and saving.",
            "It's between convenience and intention.",
            "Convenience asks for nothing.",
            "Saving asks you to wait.",
            "Investing asks you to think long term.",
            "Paying down debt asks you to sacrifice today for tomorrow.",
            "The easiest choice usually wins unless you've already decided otherwise.",
            "Many people save whatever is left after spending.",
            "Successful savers usually spend what's left after saving.",
            "That one decision completely changes where the money flows.",
          ],
        },
        {
          heading: "Changing the landscape",
          paragraphs: [
            "Farmers don't stand beside a field hoping water ends up where it's needed.",
            "They shape the land so the water naturally moves in the right direction.",
            "Your finances deserve the same kind of planning.",
            "Automatic savings.",
            "Automatic investing.",
            "Extra mortgage payments.",
            "Debt reduction.",
            "An education fund.",
            "When those happen automatically after every payday, you're no longer relying on willpower.",
            "You've changed the landscape.",
            "Your money starts flowing toward your future before convenience has a chance to claim it.",
          ],
        },
        {
          heading: "Watch for the leaks",
          paragraphs: [
            "Not every financial problem arrives all at once.",
            "Some arrive a few dollars at a time.",
            "The subscription you forgot to cancel.",
            "Delivery fees that seemed insignificant.",
            "Impulse purchases while waiting in line.",
            "Premium upgrades you barely use.",
            "None of them feel important on their own.",
            "Together, they slowly drain money that could have been working somewhere else.",
            "Every few months it's worth asking yourself one simple question:",
            "Where is my money quietly leaking away?",
          ],
        },
        {
          heading: "Build a financial float",
          paragraphs: [
            "Life has a way of showing up unannounced.",
            "The vehicle needs repairs.",
            "The furnace quits in the middle of winter.",
            "A tire blows out.",
            "Your hours get reduced.",
            "None of these expenses ask whether you're ready.",
            "That's why I like the idea of building a financial float.",
            "A financial float is simply money sitting quietly in the background, waiting for the day you need it.",
            "Most of the time, you hope it never has to do anything at all.",
            "But when life throws you a surprise, that float keeps the rest of your finances from sinking.",
            "Without one, unexpected expenses often become credit card debt.",
            "With one, they're usually just another bill to pay.",
            "Building a financial float isn't exciting.",
            "Neither is replacing a furnace.",
            "But you'll be glad the money was already there.",
          ],
        },
        {
          heading: "More money doesn't always mean more freedom",
          paragraphs: [
            "Many people assume a higher income automatically creates a better financial life.",
            "Sometimes it simply creates bigger spending.",
            "A raise becomes a newer vehicle.",
            "A bonus becomes a more expensive vacation.",
            "A promotion becomes a larger mortgage.",
            "Like a river after heavy rain, extra income simply finds larger channels.",
            "Income grows.",
            "Expenses grow.",
            "Freedom stays exactly where it was.",
          ],
        },
        {
          heading: "Direct the flow",
          paragraphs: [
            "Here's the encouraging part.",
            "Water follows the landscape.",
            "Change the landscape and the water changes direction.",
            "Money does the same.",
            "You don't have to make perfect decisions every day.",
            "You only need to make a few good decisions before payday arrives.",
            "Create systems that quietly move money toward the things that matter most.",
            "Then let those systems do the work.",
          ],
        },
        {
          heading: "Look at your next payday differently",
          paragraphs: [
            "Your next paycheck is going somewhere.",
            "The only question is whether you chose the destination.",
            "If you don't direct it, habit will.",
            "If you do, every payday becomes another opportunity to build the future you want instead of simply paying for the present.",
            "You only get about 1,040 paydays during your working life.",
            "Where each one flows matters.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_SECOND_ARTICLE = {
      id: "money-has-a-memory",
      title: "Money Has a Memory",
      summary: "Some money decisions disappear quickly. Others keep echoing for years through opportunity, confidence, debt, growth, or regret.",
      image: "/article-money-has-memory.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "PAYDAY PHILOSOPHY · CHOICES · LEGACY",
      alt: "A jar of coins beside family photos and a notebook of goals",
      caption: "Every dollar is about to become a memory.",
      quote: {
        strong: "Money has a memory.",
        text: "The question is which memories you're creating.",
      },
      sections: [
        {
          heading: "The money is long gone",
          paragraphs: [
            "A few years ago, I decided to earn my MBA.",
            "I wanted to keep learning, and I wanted to finish it while continuing to work full-time.",
            "I found an online program that fit my goals and got started.",
            "I honestly don't remember what I gave up to pay for it.",
            "Maybe it was part of my annual bonus.",
            "Maybe it was a vacation I never took.",
            "Maybe it was dozens of little things I chose not to buy along the way.",
            "I couldn't tell you.",
            "What I do remember are the opportunities it created.",
            "The conversations it opened.",
            "The confidence it gave me.",
            "The way it changed how I approached problems.",
            "The money I spent is long gone.",
            "What it left behind isn't.",
            "That's when I realized something.",
            "Money has a memory.",
          ],
        },
        {
          heading: "Some decisions echo for years",
          paragraphs: [
            "Most purchases disappear surprisingly quickly.",
            "The new phone eventually becomes an old phone.",
            "The fashionable clothes leave your closet.",
            "The excitement of an impulse purchase fades.",
            "The money is gone.",
            "Some decisions, however, refuse to disappear.",
            "Learning a new skill.",
            "Buying quality tools.",
            "Starting a business.",
            "Investing consistently.",
            "Paying down high-interest debt.",
            "Those decisions keep paying you back long after you've forgotten making them.",
            "The opposite is true as well.",
            "One swipe of a credit card takes only seconds.",
            "The payments can last for years.",
            "Interest has a remarkable way of keeping yesterday's decisions alive.",
            "Investing works in the opposite direction.",
            "A small investment today may not seem impressive next month, or even next year.",
            "But given enough time, today's decision can quietly grow into something your future self will be grateful for.",
            "Money remembers both good decisions and bad ones.",
            "The question is which memories you're creating.",
          ],
        },
        {
          heading: "Neglect has a memory too",
          paragraphs: [
            "Not every financial lesson comes from spending money.",
            "Some come from avoiding it.",
            "Skipping vehicle maintenance.",
            "Ignoring a leaking roof.",
            "Putting off a dental appointment.",
            "Waiting one more year to begin saving for retirement.",
            "At first, nothing seems to happen.",
            "Then one day the bill arrives.",
            "Money remembers neglect just as faithfully as it remembers good decisions.",
            "Sometimes the cheapest choice today becomes the most expensive choice tomorrow.",
          ],
        },
        {
          heading: "People can be your best investment",
          paragraphs: [
            "Some of the best financial decisions don't look financial at all.",
            "Helping a child through school.",
            "Supporting a spouse while they earn a certification.",
            "Buying books.",
            "Paying for lessons.",
            "Mentoring someone.",
            "Building meaningful relationships.",
            "Not every investment earns interest.",
            "Some earn opportunity.",
            "Some earn confidence.",
            "Some earn trust.",
            "Some change the direction of a life.",
            "Those returns will never appear on a financial statement.",
            "That doesn't make them any less valuable.",
            "Money remembers those decisions too.",
          ],
        },
        {
          heading: "Fortunately, money also forgives",
          paragraphs: [
            "Here's the encouraging part.",
            "Money has a memory.",
            "But every payday gives you a chance to create a better one.",
            "You can't change yesterday's decisions.",
            "You can change today's.",
            "Every investment.",
            "Every extra payment on debt.",
            "Every dollar saved.",
            "Every new skill you learn.",
            "Every thoughtful purchase.",
            "Little by little, you're writing a different financial story.",
            "One payday at a time.",
          ],
        },
        {
          heading: "Look at your next payday differently",
          paragraphs: [
            "The next time you're paid, remember this:",
            "Every dollar is about to become a memory.",
            "Some memories last an afternoon.",
            "Others last for decades.",
            "The decision belongs to you.",
            "You only get about 1,040 paydays during your working life.",
            "What your money buys today may be forgotten tomorrow.",
            "What your money builds can last a lifetime.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FORTY_THIRD_ARTICLE = {
      id: "fixed-vs-variable-mortgage-rates-which-one-is-right-for-you",
      title: "Fixed vs. Variable Mortgage Rates: Which One Is Right for You?",
      summary: "Fixed and variable mortgage rates both have trade-offs. The better choice depends on your budget, comfort with uncertainty, and the life you are actually living.",
      image: "/article-fixed-variable-mortgage.png",
      readTime: "5 min read",
      category: "Home buying",
      kicker: "MORTGAGES · HOME BUYING · RATES",
      alt: "A couple reviewing mortgage paperwork at a kitchen table",
      caption: "The best mortgage is the one you can still feel good about if life does not go exactly as planned.",
      quote: {
        strong: "Choosing a mortgage isn't really about predicting interest rates.",
        text: "It's about choosing the level of uncertainty you're comfortable living with.",
      },
      sections: [
        {
          heading: "Choosing a mortgage",
          paragraphs: [
            "Buying a home is exciting.",
            "Choosing a mortgage usually isn't.",
            "Most people spend months looking at neighbourhoods, comparing houses, and imagining where they'll put the furniture.",
            "Then they're asked one of the biggest financial questions they'll face:",
            "Do you want a fixed rate or a variable rate?",
            "There's no universal right answer.",
            "Both have advantages.",
            "Both have drawbacks.",
            "The better choice depends less on where interest rates are headed and more on what fits your financial life.",
            "When I bought my first home, I wasn't making much money.",
            "Every dollar mattered, and an unexpected bill could throw my budget off for weeks.",
            "The idea of my mortgage payment suddenly increasing made me nervous.",
            "So I chose a fixed rate.",
            "Looking back, a variable rate might have saved me money.",
            "Maybe not.",
            "I'll never know.",
            "What I do know is that I slept well because I knew exactly what my payment would be every month.",
            "That was worth something too.",
            "Over the years I've realized that choosing a mortgage isn't really about trying to predict interest rates.",
            "It's about choosing the level of uncertainty you're comfortable living with.",
          ],
        },
        {
          heading: "What is a fixed mortgage rate?",
          paragraphs: [
            "With a fixed-rate mortgage, your interest rate stays the same for the length of your mortgage term.",
            "Whether interest rates rise or fall, your mortgage payment stays predictable.",
            "That's the biggest reason people choose a fixed rate.",
            "They know exactly what to expect every month.",
            "The trade-off is that fixed rates usually begin a little higher than variable rates because you're paying for certainty.",
            "A fixed rate often makes sense if:",
            "You prefer predictable monthly payments.",
            "Your budget has little room for surprises.",
            "Rising payments would cause financial stress.",
            "You expect to keep your mortgage for several years.",
          ],
        },
        {
          heading: "What is a variable mortgage rate?",
          paragraphs: [
            "A variable mortgage moves with your lender's prime rate.",
            "If borrowing costs fall, you'll usually benefit.",
            "If they rise, you'll feel that too.",
            "Depending on the mortgage, your payment may increase when rates rise, or your payment may stay the same while more of it goes toward interest instead of paying down your mortgage.",
            "That's something worth understanding before you sign.",
            "Variable rates often start lower because you're accepting more uncertainty.",
            "Sometimes that uncertainty works in your favour.",
            "Sometimes it doesn't.",
            "A variable rate may suit you if:",
            "Your budget can absorb higher payments.",
            "You're comfortable with some uncertainty.",
            "You understand that interest rates move over time.",
            "Potential savings matter more to you than payment stability.",
          ],
        },
        {
          heading: "Why are fixed rates usually higher?",
          paragraphs: [
            "Think of it this way.",
            "A fixed mortgage shifts more of the interest-rate risk to the lender.",
            "A variable mortgage leaves more of that risk with you.",
            "Neither option is free.",
            "You're simply deciding who carries more of the uncertainty over the next few years.",
          ],
        },
        {
          heading: "Common mistakes",
          paragraphs: [
            "People often make the same mistakes when choosing a mortgage.",
            "They focus only on the lowest interest rate.",
            "They assume they know where rates are headed.",
            "They borrow the maximum amount they're approved for instead of what comfortably fits their budget.",
            "They forget to ask what happens if they need to break the mortgage before the term ends.",
            "None of those decisions seem important on signing day.",
            "Some become very important later.",
          ],
        },
        {
          heading: "Questions worth asking yourself",
          paragraphs: [
            "Before you decide, ask yourself a few honest questions.",
            "If interest rates increased next year, could I still comfortably afford my payments?",
            "Would changing mortgage payments cause me stress?",
            "Do I value certainty more than the possibility of saving money?",
            "How long do I expect to own this home?",
            "The answers to those questions matter far more than anyone's prediction about where interest rates might go.",
          ],
        },
        {
          heading: "The bottom line",
          paragraphs: [
            "Nobody knows where interest rates will be two or three years from now.",
            "There are economists who spend their entire careers trying to answer that question, and they're often surprised.",
            "What you do know is your own financial situation.",
            "If a stable payment helps you budget and sleep better at night, a fixed mortgage may be the right choice.",
            "If your budget has room for higher payments and you're comfortable with uncertainty, a variable mortgage may suit you better.",
            "The best mortgage isn't always the one with the lowest interest rate.",
            "It's the one you'll still feel good about if life doesn't go exactly as planned.",
            "A mortgage will affect hundreds of future paydays.",
            "Take the time to understand your options before you choose one.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const ARTICLES = [FEATURED_ARTICLE, SECOND_ARTICLE, THIRD_ARTICLE, FOURTH_ARTICLE, FIFTH_ARTICLE, SIXTH_ARTICLE, SEVENTH_ARTICLE, EIGHTH_ARTICLE, NINTH_ARTICLE, TENTH_ARTICLE, TWELFTH_ARTICLE, THIRTEENTH_ARTICLE, FOURTEENTH_ARTICLE, FIFTEENTH_ARTICLE, SIXTEENTH_ARTICLE, SEVENTEENTH_ARTICLE, EIGHTEENTH_ARTICLE, NINETEENTH_ARTICLE, TWENTIETH_ARTICLE, TWENTY_FIRST_ARTICLE, TWENTY_SECOND_ARTICLE, TWENTY_THIRD_ARTICLE, TWENTY_FOURTH_ARTICLE, TWENTY_FIFTH_ARTICLE, TWENTY_SIXTH_ARTICLE, TWENTY_SEVENTH_ARTICLE, TWENTY_EIGHTH_ARTICLE, TWENTY_NINTH_ARTICLE, THIRTIETH_ARTICLE, THIRTY_FIRST_ARTICLE, THIRTY_SECOND_ARTICLE, THIRTY_THIRD_ARTICLE, THIRTY_FOURTH_ARTICLE, THIRTY_FIFTH_ARTICLE, THIRTY_SIXTH_ARTICLE, THIRTY_SEVENTH_ARTICLE, THIRTY_EIGHTH_ARTICLE, THIRTY_NINTH_ARTICLE, FORTIETH_ARTICLE, FORTY_FIRST_ARTICLE, FORTY_SECOND_ARTICLE, FORTY_THIRD_ARTICLE];

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
      "the-vacation-that-showed-me-how-small-spending-adds-up": [
        {
          question: "How much should I save before trying to bank an entire paycheck?",
          answer: "Start by building enough to comfortably cover your normal expenses. The goal is to create flexibility, not financial stress.",
        },
        {
          question: "What if I can't save a whole paycheck yet?",
          answer: "Start with part of one. The habit matters far more than the amount.",
        },
        {
          question: "Why did a vacation make saving easier?",
          answer: "Because many everyday expenses disappeared. It revealed how much of our spending is simply part of our normal routine.",
        },
        {
          question: "Should I save the money or invest it?",
          answer: "Build an emergency fund first. After that, investing allows time and compound growth to work in your favour.",
        },
        {
          question: "What's the real lesson?",
          answer: "The biggest financial breakthroughs often begin with a shift in perspective. Sometimes seeing your money differently changes what you do with your next payday.",
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
      "loud-budgeting-thats-not-where-i-want-my-money-to-go": [
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
      "the-simplest-explanation-of-compound-interest": [
        {
          question: "What is compound interest?",
          answer: "Compound interest is growth on growth. Your money earns a return, then future returns can be earned on both the original money and the money it already earned.",
        },
        {
          question: "How is compound interest different from simple interest?",
          answer: "Simple interest is calculated only on the original amount. Compound interest also includes the interest or returns that have already accumulated.",
        },
        {
          question: "Does the stock market earn the same return every year?",
          answer: "No. Long-term averages come from many good, bad, and ordinary years. Past performance is not a guarantee of future results.",
        },
        {
          question: "Why does starting early matter?",
          answer: "Time gives compounding more room to work. Money invested earlier has more years for growth to create more growth.",
        },
        {
          question: "What is the main lesson?",
          answer: "Compound interest is simple, but powerful. The sooner you understand it, the easier it becomes to see why every payday matters.",
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
        const metaDescription = document.querySelector('meta[name="description"]');
        const isLearnRoute = route === "/learn" || route.startsWith("/learn/");

        document.title = isLearnRoute ? "Learn | 1040 Paydays" : "1040 Paydays";
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            isLearnRoute
              ? "Browse practical personal finance articles about saving, investing, retirement, debt, and making the most of every payday."
              : "See how every payday can move you closer to financial freedom with the 1040 Paydays calculator."
          );
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

      if (normalizedRoute === "/learn" || normalizedRoute.startsWith("/learn/")) {
        const isArticleRoute = normalizedRoute.startsWith("/learn/");
        const articleId = isArticleRoute ? normalizedRoute.slice("/learn/".length) : "";
        const activeArticle = isArticleRoute ? ARTICLES.find((article) => article.id === articleId) : null;
        const notFound = isArticleRoute && !activeArticle;

        return (
          <LearnRoute
            currency={currency}
            setCurrency={setCurrency}
            article={activeArticle}
            notFound={notFound}
            navigateTo={navigateTo}
            openHomePanel={openHomePanel}
          />
        );
      }

      return (
        <div className="app-shell">
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
                  <button onClick={() => setPanel("privacy")}>Privacy settings</button>
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

                  <div className="email-row">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    <button type="button" onClick={() => email && alert(`Joined: ${email}`)}>Join</button>
                  </div>
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
              <button onClick={() => setPanel("about")}>About</button>
              <button onClick={() => setPanel("privacy")}>Privacy</button>
              <button onClick={() => setPanel("terms")}>Terms</button>
              <button onClick={() => setPanel("contact")}>Contact</button>
            </nav>

            <div className="socials">
              <a href="#facebook"><Facebook size={22} /></a>
              <a href="#instagram"><Instagram size={22} /></a>
              <a href="#youtube"><Youtube size={22} /></a>
              <a href="#contact"><Mail size={22} /></a>
            </div>
          </footer>
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
            <button className="close-panel" onClick={close}><X size={18} /></button>

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
                  <p className="panel-text">No projections have been saved yet. Save one from the Payday Journal card to compare your progress later.</p>
                )}
                <button className="danger-button" onClick={() => setSnapshots([])}>Erase past projections</button>
                <button className="ok-button" onClick={close}>OK</button>
              </>
            )}

            {panel === "about" && (
              <AboutPanel close={close} />
            )}

            {panel === "privacy" && (
              <PrivacyPanel close={close} />
            )}

            {panel === "terms" && (
              <TermsPanel close={close} />
            )}

            {panel === "contact" && (
              <ContactPanel close={close} />
            )}

            {!isArticle && !["advanced", "calculator", "how", "learn", "compare", "journal", "about", "privacy", "terms", "contact"].includes(panel) && (
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

    const LEARN_CATEGORIES = [
      "Getting Started",
      "Financial Basics",
      "Saving",
      "Investing",
      "Retirement",
      "Debt",
      "Payday Philosophy",
    ];

    function articleCategory(article) {
      return article.category.replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    function LearnRoute({ currency, setCurrency, article, notFound, navigateTo, openHomePanel }) {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      const goHomePanel = (panelName) => {
        setMobileMenuOpen(false);
        openHomePanel(panelName);
      };

      return (
        <div className="learn-route-shell">
          <header className="topbar">
            <a
              className="brand"
              href="/"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("/");
              }}
            >
              <strong>1040</strong><span>PAYDAYS</span>
            </a>

            <nav className="topnav" aria-label="Primary navigation">
              <button onClick={() => goHomePanel("calculator")}>Calculator</button>
              <button onClick={() => goHomePanel("how")}>How it works</button>
              <button onClick={() => goHomePanel("compare")}>Compare</button>
              <button className="active" onClick={() => navigateTo("/learn")}>Learn</button>
            </nav>

            <div className="top-actions">
              <select value={currency} onChange={(event) => setCurrency(event.target.value)} className="currency-select" aria-label="Currency">
                {currencies.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
              </select>
              <button
                className="mobile-menu-button"
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="learn-mobile-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>

              {mobileMenuOpen && (
                <nav className="mobile-nav-menu" id="learn-mobile-navigation" aria-label="Mobile navigation">
                  <button type="button" onClick={() => goHomePanel("calculator")}>Calculator</button>
                  <button type="button" onClick={() => goHomePanel("how")}>How it works</button>
                  <button type="button" onClick={() => goHomePanel("compare")}>Compare</button>
                  <button type="button" onClick={() => navigateTo("/learn")}>Learn</button>
                </nav>
              )}
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
              />
            </main>
          ) : (
            <LearnPage navigateTo={navigateTo} />
          )}

          <footer className="footer">
            <div>
              <strong>1040 Paydays</strong>
              <p>One payday at a time.<br />Build consistency.</p>
            </div>

            <nav aria-label="Footer navigation">
              <button onClick={() => goHomePanel("about")}>About</button>
              <button onClick={() => goHomePanel("privacy")}>Privacy</button>
              <button onClick={() => goHomePanel("terms")}>Terms</button>
              <button onClick={() => goHomePanel("contact")}>Contact</button>
            </nav>

            <div className="socials">
              <a href="#facebook" aria-label="Facebook"><Facebook size={22} /></a>
              <a href="#instagram" aria-label="Instagram"><Instagram size={22} /></a>
              <a href="#youtube" aria-label="YouTube"><Youtube size={22} /></a>
              <a href="mailto:hello@1040paydays.com" aria-label="Email"><Mail size={22} /></a>
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

    function LearnPage({ navigateTo }) {
      const [query, setQuery] = useState("");
      const [category, setCategory] = useState("All");
      const [sort, setSort] = useState("Newest");

      const filteredArticles = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const results = ARTICLES.filter((article) => {
          const displayCategory = articleCategory(article);
          const matchesCategory = category === "All" || displayCategory === category;
          const searchable = `${article.title} ${article.summary} ${displayCategory}`.toLowerCase();
          return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
        });

        return [...results].sort((first, second) => {
          if (sort === "Oldest") return ARTICLES.indexOf(first) - ARTICLES.indexOf(second);
          if (sort === "Reading Time") return parseInt(first.readTime, 10) - parseInt(second.readTime, 10);
          return ARTICLES.indexOf(second) - ARTICLES.indexOf(first);
        });
      }, [query, category, sort]);

      const featuredArticles = ARTICLES.slice(0, 5);
      const filterOptions = ["All", ...LEARN_CATEGORIES];

      return (
        <main className="learn-page">
          <section className="learn-page-hero" aria-labelledby="learn-title">
            <div>
              <p className="eyebrow">KNOWLEDGE &amp; INSIGHTS</p>
              <h1 id="learn-title">Learn</h1>
            </div>
            <p>Real stories for better payday decisions.</p>
          </section>

          <section className="learn-featured-gallery" aria-label="Featured articles">
            {featuredArticles.map((item, index) => (
              <article className={index === 0 ? "is-featured" : ""} key={item.id}>
                <a
                  href={`/learn/${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(`/learn/${item.id}`);
                  }}
                >
                  <img src={item.image} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                  <div>
                    <span>{articleCategory(item)} · {item.readTime}</span>
                    <h2>{item.title}</h2>
                    {index === 0 && <p>{item.summary}</p>}
                  </div>
                </a>
              </article>
            ))}
          </section>

          <section className="learn-articles-section" id="learn-articles" aria-labelledby="articles-heading">
            <div className="learn-section-heading">
              <div>
                <p className="eyebrow muted">ALL ARTICLES</p>
                <h2 id="articles-heading">Choose what to read next.</h2>
              </div>
              <p>{filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}</p>
            </div>

            <div className="learn-controls">
              <label className="learn-search">
                <Search size={19} aria-hidden="true" />
                <span className="sr-only">Search articles</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles"
                />
              </label>

              <label className="learn-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Reading Time</option>
                </select>
              </label>
            </div>

            <nav className="learn-filter-chips" aria-label="Filter articles">
              {filterOptions.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? "is-active" : ""}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </nav>

            {filteredArticles.length ? (
              <div className="learn-page-grid">
                {filteredArticles.map((item) => (
                  <article className="learn-page-card" key={item.id}>
                    <a
                      href={`/learn/${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateTo(`/learn/${item.id}`);
                      }}
                    >
                      <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      <div>
                        <span className="learn-category-badge">{articleCategory(item)}</span>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <footer>
                          <small>{item.readTime}</small>
                          <strong>Read Article →</strong>
                        </footer>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="learn-empty-state">
                <h3>No articles found.</h3>
                <p>Try a different search or choose another category.</p>
                <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Show all articles</button>
              </div>
            )}
          </section>
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

    function ArticlePanel({ article, close, backToLearn, openArticle }) {
      const relatedArticles = ARTICLES.filter((item) => item.id !== article.id);
      const faqs = ARTICLE_FAQS[article.id] || [];
      const articleIndex = ARTICLES.findIndex((item) => item.id === article.id);
      const previousArticle = ARTICLES[(articleIndex - 1 + ARTICLES.length) % ARTICLES.length];
      const nextArticle = ARTICLES[(articleIndex + 1) % ARTICLES.length];
      const jumpToArticle = (nextItem) => {
        openArticle(nextItem);
        requestAnimationFrame(() => {
          document.querySelector(".learn-route-shell")?.scrollTo({ top: 0, behavior: "smooth" });
        });
      };
      const renderArticlePager = () => (
        <nav className="article-dot-nav" aria-label="Article navigation">
          <button type="button" onClick={() => jumpToArticle(previousArticle)} aria-label={`Previous article: ${previousArticle.title}`} />
          <button type="button" className="is-current" aria-current="page" aria-label={`Current article: ${article.title}`} disabled />
          <button type="button" onClick={() => jumpToArticle(nextArticle)} aria-label={`Next article: ${nextArticle.title}`} />
          <span>Next: {nextArticle.title}</span>
        </nav>
      );

      return (
        <article className="learn-article">
          <div className="article-toolbar">
            <button type="button" onClick={backToLearn}>← All articles</button>
            <span>LEARN · KNOWLEDGE &amp; INSIGHTS</span>
          </div>

          <header className="article-header">
            <p className="article-kicker">{article.kicker}</p>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-meta">
              <span>1040 Paydays</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          <figure className="article-hero">
            <img src={article.image} alt={article.alt} />
            <figcaption>{article.caption}</figcaption>
          </figure>

          <div className="article-quick-pager">
            <p>Tap a dot to keep reading</p>
            {renderArticlePager()}
          </div>

          <div className="article-body">
            {article.sections.map((section, sectionIndex) => (
              <React.Fragment key={section.heading}>
                <section>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
                {sectionIndex === 1 && (
                  <blockquote>
                    <strong>{article.quote.strong}</strong>
                    <span>{article.quote.text}</span>
                  </blockquote>
                )}
              </React.Fragment>
            ))}
          </div>

          {renderArticlePager()}

          <section className="article-faqs">
            <p className="article-section-kicker">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Five questions to take with you.</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="related-articles">
            <div className="related-heading">
              <div>
                <p className="article-section-kicker">KEEP READING</p>
                <h2>Another payday. Another perspective.</h2>
              </div>
              <span>Swipe to explore →</span>
            </div>
            <div className="related-article-strip">
              {relatedArticles.map((related) => (
                <button type="button" key={related.id} onClick={() => openArticle(related)}>
                  <img src={related.image} alt="" />
                  <span>{related.readTime}</span>
                  <strong>{related.title}</strong>
                  <em>Read next →</em>
                </button>
              ))}
            </div>
          </section>

          <footer className="article-footer-cta">
            <p>See where you are on your own 1,040-payday journey.</p>
            <button type="button" onClick={close}>Back to the calculator</button>
          </footer>
        </article>
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

    function AboutPanel({ close }) {
      return (
        <section className="about-panel">
          <div className="panel-icon"><BookOpen /></div>
          <p className="eyebrow">ABOUT</p>
          <h2>Founder, 1040 Paydays</h2>

          <p>
            1040 Paydays is a passion project created by someone with an MBA and a lifelong
            interest in personal finance, investing, and the power of small financial decisions.
          </p>
          <p>
            The idea is simple: most of us receive only about <strong>1,040 paydays</strong>
            {" "}during our working lives. Every paycheck is a decision—one that can move us
            closer to financial freedom or further away from it.
          </p>
          <p>
            This site was created to make those decisions a little easier through practical
            articles, interactive calculators, and thoughtful tools that help people build
            wealth one payday at a time.
          </p>
          <p>
            Whether you're saving for your first emergency fund, investing for retirement,
            paying off debt, or simply trying to make smarter choices with each paycheck,
            the goal is the same:
          </p>

          <div className="about-progress">
            <strong>Every payday is a decision.</strong>
            <span>Choose yours.</span>
          </div>

          <button className="ok-button" type="button" onClick={close}>Back to the calculator</button>
        </section>
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

    function PrivacyPanel({ close }) {
      return (
        <section className="about-panel policy-panel">
          <div className="panel-icon"><BookOpen /></div>
          <p className="eyebrow">PRIVACY</p>
          <h2>Privacy Policy</h2>

          <p><strong>Last updated:</strong> July 2026</p>
          <p>
            1040 Paydays is built to help you explore payday planning, saving, and retirement
            ideas. We try to collect as little personal information as possible.
          </p>

          <h3>Information you enter into the calculator</h3>
          <p>
            The numbers you enter into the calculator, comparison tools, and saved projections are
            stored in your browser on your own device using local storage. They are not sent to us
            through the calculator.
          </p>

          <h3>Analytics and advertising</h3>
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

          <h3>Email and contact</h3>
          <p>
            If you contact us by email, we will use your email address and message only to respond
            to you. If a newsletter or email list is offered, you can unsubscribe using the
            instructions provided in those emails.
          </p>

          <h3>Third-party links</h3>
          <p>
            The site may link to third-party websites or services. Their privacy practices are
            controlled by their own policies, not this one.
          </p>

          <h3>Contact</h3>
          <p>
            For privacy questions, contact <a href="mailto:hello@1040paydays.com">hello@1040paydays.com</a>.
          </p>

          <button className="ok-button" onClick={close}>OK</button>
        </section>
      );
    }

    function TermsPanel({ close }) {
      return (
        <section className="about-panel policy-panel">
          <div className="panel-icon"><BookOpen /></div>
          <p className="eyebrow">TERMS</p>
          <h2>Terms of Use</h2>

          <p><strong>Last updated:</strong> July 2026</p>
          <p>
            By using 1040 Paydays, you agree to use the site for personal, educational, and
            informational purposes.
          </p>

          <h3>Educational content only</h3>
          <p>
            The calculator, articles, examples, and projections are provided for general education.
            They are not financial, investment, tax, legal, mortgage, or retirement advice. Your
            financial situation is personal, and you should speak with a qualified professional
            before making important decisions.
          </p>

          <h3>Calculator estimates</h3>
          <p>
            Results are estimates based on the numbers and assumptions you enter. Actual outcomes
            can be different because of market returns, fees, inflation, taxes, income changes,
            contribution changes, timing, and other life events.
          </p>

          <h3>Your responsibility</h3>
          <p>
            You are responsible for the decisions you make using the information on this site.
            Please review your own numbers carefully and do not rely on any example as a guarantee
            of future results.
          </p>

          <h3>Site availability and accuracy</h3>
          <p>
            We do our best to keep the site useful and accurate, but we cannot promise that every
            feature, calculation, article, or link will always be complete, current, or error-free.
            The site may change or be unavailable from time to time.
          </p>

          <h3>Advertising and third-party services</h3>
          <p>
            The site may display ads or link to third-party websites. We are not responsible for the
            content, products, services, or policies of third-party sites.
          </p>

          <h3>Contact</h3>
          <p>
            For questions about these terms, contact <a href="mailto:hello@1040paydays.com">hello@1040paydays.com</a>.
          </p>

          <button className="ok-button" onClick={close}>OK</button>
        </section>
      );
    }

    function ContactPanel({ close }) {
      return (
        <section className="contact-panel">
          <div className="panel-icon"><Mail /></div>
          <p className="eyebrow">CONTACT</p>
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

          <button className="ok-button" type="button" onClick={close}>Back to the calculator</button>
        </section>
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
      const ribbonColors = ["#0b2858", "#17457d", "#2c75aa", "#3f9dbe", "#72aaa2", "#f0b73a"];
      const envelopeStart = bars[bars.length - 2];
      const finalBar = bars[bars.length - 1];

      return (
        <>
          <div className="chart-box payday-bar-chart desktop-projection-chart">
            <svg viewBox="0 0 1000 340" role="img" aria-label={`Projected contributions and growth from age ${age} to age ${retireAge}`}>
              <defs>
                <linearGradient id="barGrowth" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#176bff" />
                  <stop offset="100%" stopColor="#55c3d8" />
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
                  <stop offset="0%" stopColor="#176bff" />
                  <stop offset="100%" stopColor="#55c3d8" />
                </linearGradient>
                <linearGradient id="mobileRibbon" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0c3470" />
                  <stop offset="58%" stopColor="#00a6a6" />
                  <stop offset="100%" stopColor="#f5a400" />
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

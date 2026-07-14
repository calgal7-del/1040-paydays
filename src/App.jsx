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
      title: "The Payday Philosophy",
      summary: "Most people think about money in dollars. The payday philosophy asks what each paycheck can do for your future.",
      image: "/article-1040-paydays.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "THE PAYDAY PHILOSOPHY",
      alt: "A woman sitting at her office desk during the workday",
      caption: "Most people think about money in dollars. I think about it in paydays.",
      quote: {
        strong: "One paycheck rarely changes your life.",
        text: "Hundreds of them can.",
      },
      sections: [
        {
          heading: "You Only Get About 1,040 Paydays",
          paragraphs: [
            "Most people think about money in dollars.",
            "I think about it in paydays.",
            "That shift didn't come from a finance book or a spreadsheet.",
            "It came from a moment I'll never forget.",
            "During my first week at a new job, I noticed a woman a few cubicles away who seemed happier than everyone else.",
            "People kept stopping by to congratulate her.",
            "She was smiling, laughing, and talking about what came next.",
            "It was her last day before retirement.",
            "Not a dramatic exit.",
            "Not a lottery win.",
            "Just an ordinary woman finishing an ordinary career and stepping into a future she had quietly built over decades.",
            "Later that day, one question stayed with me.",
            "How did she get here?",
            "Not just to retirement, but to the point where work had become optional.",
            "Where her time belonged entirely to her.",
            "She wasn't wealthy in any flashy way.",
            "She wasn't famous.",
            "She wasn't lucky.",
            "She was simply done.",
            "That moment changed the way I look at every paycheck.",
          ],
        },
        {
          heading: "A finite number of opportunities",
          paragraphs: [
            "As I learned more about saving, investing, and retirement planning, I came across a number that completely changed how I thought about money.",
            "Most people who work a full-time career receive about 26 paychecks each year.",
            "Work for roughly 40 years, and you'll collect about 1,040 paydays.",
            "About 1,040 opportunities to build your future.",
            "Some readers are on payday number 40.",
            "Others are on payday number 800.",
            "Wherever you are, your next payday is still an opportunity to move in the right direction.",
            "Retirement no longer felt like one giant, impossible mountain.",
            "It became something I could work toward every two weeks.",
          ],
        },
        {
          heading: "Think in paydays, not just dollars",
          paragraphs: [
            "Every payday asks the same quiet question:",
            "Will this paycheck disappear without changing your future?",
            "Or will a small piece of it buy you freedom later?",
            "Most financial advice focuses on dollars.",
            "I prefer to think about paydays.",
            "Because dollars feel endless.",
            "Paydays don't.",
            "Everyone has different incomes.",
            "Different goals.",
            "Different expenses.",
            "But every one of us has a limited number of chances to decide what each paycheck will do.",
            "That simple shift changed everything for me.",
            "Instead of asking,",
            "\"How much do I need to retire?\"",
            "I started asking,",
            "\"What can this payday do for my future?\"",
            "Maybe it buys another share of an investment.",
            "Maybe it pays down a little more debt.",
            "Maybe it adds to an emergency fund.",
            "None of those decisions seem life-changing on their own.",
            "That's the point.",
            "One paycheck rarely changes your life.",
            "Hundreds of them can.",
          ],
        },
        {
          heading: "Why I created 1040 Paydays",
          paragraphs: [
            "I didn't create 1040 Paydays to tell people they can't enjoy life.",
            "I didn't create it to make anyone feel guilty for spending money.",
            "I created it because I wanted people to see the opportunity hiding inside an ordinary payday.",
            "The future usually isn't built by one massive financial decision.",
            "It's built quietly.",
            "One payday.",
            "Then another.",
            "Then another.",
            "Nobody remembers their 143rd paycheck.",
            "But one of those paychecks might be the one that paid off a credit card.",
            "Or bought your first investment.",
            "Or started your emergency fund.",
            "Or made the final mortgage payment.",
            "Looking back, those ordinary paydays won't seem ordinary at all.",
            "That's what this website is about.",
            "Helping people understand where they are on their own 1,040-payday journey.",
            "Showing how today's decisions become tomorrow's freedom.",
            "Reminding us that one ordinary payday can quietly change the direction of an entire life.",
            "You don't control how many paydays you get.",
            "You only control what each one becomes.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const SECOND_ARTICLE = {
      id: "who-wants-to-go-home",
      title: "Who Wants to Go Home? The Hidden Cost of Leaving Work Early",
      summary: "A simple question at the end of a call-centre shift revealed the hidden cost of unpaid hours and the power of making small money decisions on purpose.",
      image: "/article-who-wants-to-go-home.png",
      readTime: "5 min read",
      category: "Payday philosophy",
      kicker: "WORK · TIME · PAYDAYS",
      alt: "A call centre employee raises his hand while a supervisor asks who wants to leave early",
      caption: "Every hour helps build a future. The question is whose future you are funding.",
      quote: {
        strong: "It was never about one hour.",
        text: "It was about hundreds of them.",
      },
      sections: [
        {
          heading: "Who wants to go home?",
          paragraphs: [
            "I still remember working in a call centre in my twenties.",
            "The days could be busy, stressful, and exhausting.",
            "Near the end of the shift, the supervisor would stand up, look across the room, and ask the question everyone hoped to hear.",
            "\"Who wants to go home?\"",
            "Hands would shoot into the air.",
            "Some people couldn't raise them fast enough.",
            "If call volumes were low enough, a few employees would be allowed to leave early.",
            "It felt like winning.",
            "An extra hour at home.",
            "Less stress.",
            "One less hour answering phones.",
            "Who wouldn't want that?",
            "In the beginning, I wanted to go home too.",
            "An hour didn't seem like much.",
            "Besides, I'd already worked most of the day.",
            "What difference could one hour really make?",
          ],
        },
        {
          heading: "The hidden cost",
          paragraphs: [
            "After a while I started noticing something.",
            "The same people volunteered almost every time.",
            "An hour here.",
            "Two hours there.",
            "Another hour the following week.",
            "Every hour they left early was an hour they weren't being paid.",
            "Nobody walked out the door thinking,",
            "\"There goes another hour of my retirement.\"",
            "They were just happy to be heading home.",
            "The cost didn't show up all at once.",
            "It showed up a little bit at a time.",
            "Then something else occurred to me.",
            "The company wasn't asking people to leave early for fun.",
            "They were doing it because those wages added up.",
            "One hour of pay may not seem like much.",
            "Multiply it across dozens of employees several times a week, and suddenly it becomes real money.",
            "They weren't trying to save one hour.",
            "They were trying to save hundreds of them.",
            "That's when I realized I should probably start thinking the same way.",
            "If every hour mattered that much to the company...",
            "Maybe it should matter that much to me too.",
          ],
        },
        {
          heading: "It was never about one hour",
          paragraphs: [
            "Nobody gets rich because they worked one extra hour.",
            "Nobody goes broke because they left one hour early.",
            "It was never about one hour.",
            "It was about hundreds of them.",
            "Little decisions have a funny way of piling up.",
            "One hour today.",
            "Another next week.",
            "A shorter shift next month.",
            "By the end of a career, those hours can add up to weeks or even months of income.",
            "Most of us never notice because the decisions happen one at a time.",
            "They're easy to justify.",
            "\"I'm tired.\"",
            "\"I've earned it.\"",
            "\"It's only an hour.\"",
            "Sometimes those reasons are completely valid.",
            "Family comes first.",
            "Health comes first.",
            "Rest has value too.",
            "This isn't a story about working yourself into the ground.",
            "The important thing wasn't whether I stayed or left.",
            "It was knowing why I made the decision.",
            "That's a question I still ask myself today.",
          ],
        },
        {
          heading: "The real decision",
          paragraphs: [
            "That's what I learned from one simple question.",
            "\"Who wants to go home?\"",
            "It wasn't really a question about going home.",
            "It was a question about what that hour was worth to me.",
            "The older I get, the more I realize most financial decisions aren't dramatic.",
            "They're ordinary.",
            "Bring lunch or buy it.",
            "Cancel the subscription or keep it.",
            "Work the extra shift or leave early.",
            "Save part of this paycheque or spend all of it.",
            "None of those decisions will change your life on their own.",
            "But repeated hundreds of times over a career, they quietly shape your future.",
            "That's how wealth is usually built.",
            "Not through one brilliant decision.",
            "Through ordinary decisions made consistently over time.",
          ],
        },
        {
          heading: "Whose future are you funding?",
          paragraphs: [
            "Watching people leave early changed the way I thought about money.",
            "It also changed the way I thought about time.",
            "Every hour builds something.",
            "Sometimes it builds memories with your family.",
            "Sometimes it builds better health.",
            "Sometimes it builds your career.",
            "Sometimes it builds your retirement account.",
            "None of those are the wrong choice.",
            "The important thing is knowing what you're choosing.",
            "There were days I left early.",
            "There were days spending an extra hour with family was worth far more than another hour's pay.",
            "There were days I needed the break.",
            "I don't regret those decisions.",
            "The difference was that I stopped making them on autopilot.",
            "Before I raised my hand, I started asking myself one simple question.",
            "\"What am I getting in return for this hour?\"",
            "Sometimes the answer was easy.",
            "Other times I stayed.",
            "Not because my employer wanted me to.",
            "Because my future self deserved that hour.",
          ],
        },
        {
          heading: "The lesson I took with me",
          paragraphs: [
            "That little question followed me long after I left the call centre.",
            "Now, whenever I make a financial decision, I try to look beyond today.",
            "Will I even remember buying this a month from now?",
            "Will I appreciate having the extra money five years from now?",
            "Will this decision move me a little closer to the life I want...",
            "Or a little farther away?",
            "Most of the time there isn't a right or wrong answer.",
            "There is only the answer that's right for you.",
            "Making the decision on purpose is what matters.",
            "Not simply following the crowd because everyone else has their hand in the air.",
          ],
        },
        {
          heading: "One last thought",
          paragraphs: [
            "I still smile whenever I hear someone ask,",
            "\"Who wants to go home?\"",
            "Because now I hear a different question.",
            "\"What is this hour worth to you?\"",
            "Only you can answer that.",
            "Just make sure the answer is yours.",
            "Not the crowd's.",
            "Not a habit.",
            "Yours.",
            "Every hour helps build a future.",
            "Whose future are you funding?",
            "Every payday is a decision.",
          ],
        },
      ],
    };

    const THIRD_ARTICLE = {
      id: "one-hundred-dollars-one-lifetime-lesson",
      title: "One Hundred Dollars. One Lifetime Lesson.",
      summary: "A $100 loan that was never repaid taught me a lesson worth far more than the money itself. If you choose to lend money, do it only if you're comfortable never getting it back—and never lose sight of what that money could have done for your own future.",
      image: "/article-one-hundred-dollars.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "MONEY · BOUNDARIES · PEACE",
      alt: "Two people at a kitchen table signing a handwritten promissory note beside a one-hundred-dollar bill",
      caption: "A small loan, a written promise, and a lesson that proved far more valuable than the money.",
      quote: {
        strong: "Treat a personal loan like a gift.",
        text: "Only give what you can afford never to receive again.",
      },
      sections: [
        {
          heading: "A promise on paper",
          paragraphs: [
            "I never expected $100 to teach me one of the most valuable financial lessons of my life.",
            "It wasn't a large amount of money.",
            "It wasn't an investment that went wrong.",
            "It wasn't a bad purchase.",
            "It was a loan.",
            "Someone I knew asked if they could borrow $100.",
            "They promised they would pay me back.",
            "To make me feel more comfortable, they even suggested writing out a promissory note.",
            "We both signed it.",
            "I remember thinking that was a smart idea. Surely someone who was willing to put it in writing intended to keep their word.",
          ],
        },
        {
          heading: "The money was gone",
          paragraphs: [
            "Weeks passed.",
            "Then months.",
            "Every time I asked about the money, there was another excuse.",
            "Eventually, the excuses stopped altogether.",
            "When I mentioned the promissory note, I was told something I never expected.",
            "\"It isn't legally enforceable anyway.\"",
            "That was the end of the conversation.",
            "The money was gone.",
            "Later I found out they had used the money to go to a party.",
            "At first, I was angry.",
            "Not because of the amount.",
            "Because of the principle.",
            "Someone had asked for help, made a promise, and then decided the promise didn't matter.",
          ],
        },
        {
          heading: "A simple rule for lending",
          paragraphs: [
            "As the years passed, I realized I had learned a lesson that was worth far more than $100.",
            "Whenever you lend money to friends or family, there's always a chance you won't see it again.",
            "It doesn't matter what is promised.",
            "It doesn't matter what's written on paper.",
            "People's circumstances change.",
            "Sometimes their priorities change.",
            "Sometimes they simply choose not to pay.",
            "That's why I now have one simple rule.",
            "If I lend money, I do it knowing there's a real possibility I'll never get it back.",
            "In my mind, I treat it as a gift from the moment I hand it over.",
            "If it comes back, that's wonderful.",
            "If it doesn't, I won't let resentment grow for years over something I could have planned for.",
          ],
        },
        {
          heading: "What could that $100 have done?",
          paragraphs: [
            "The other lesson came much later.",
            "I stopped thinking about what the other person did with the money.",
            "Instead, I started asking a different question.",
            "What could that $100 have done for me?",
            "It could have paid for a memorable dinner with my family.",
            "It could have become part of a weekend getaway.",
            "It could have bought a few great books that changed the way I think.",
            "It could have started growing inside an investment account.",
            "It could have quietly become part of my future instead of someone else's night out.",
            "One hundred dollars isn't life-changing.",
            "But neither is one payday.",
            "The power comes from what happens over and over again.",
            "One hundred dollars invested today.",
            "Another hundred next month.",
            "Another after that.",
            "Small amounts, repeated consistently, have a way of becoming something much bigger than they first appear.",
          ],
        },
        {
          heading: "A lesson worth far more",
          paragraphs: [
            "That's what 1040 Paydays is really about.",
            "Every payday gives you choices.",
            "Some choices build someone else's future.",
            "Some choices build your own.",
            "For years I thought I'd lost $100.",
            "I hadn't.",
            "I had paid $100 for a lesson that has saved me thousands since.",
            "Today, when someone asks to borrow money, I don't ask whether they'll pay me back.",
            "I ask whether losing that money would hurt my own future.",
            "If the answer is yes, I politely say no.",
            "If the answer is no, I may lend it—or give it freely—and expect nothing in return.",
            "That one decision has brought me more peace than any promissory note ever could.",
            "Every payday gives us choices.",
            "Some choices cost us today.",
            "Others protect tomorrow.",
            "Every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FOURTH_ARTICLE = {
      id: "when-extra-money-isnt-really-extra",
      title: "When Extra Money Isn't Really Extra",
      summary: "After receiving a severance payment, I treated it like free money and spent it renovating my home. Years later, I realized unexpected money isn't \"extra\"—it's one of the greatest opportunities you'll ever have to build your future.",
      image: "/article-extra-money.png",
      readTime: "3 min read",
      category: "Payday philosophy",
      kicker: "WINDFALLS · CHOICES · BALANCE",
      alt: "Freshly installed hardwood floors with a steam mop, renovation supplies, and rolled pale pink carpet",
      caption: "A beautiful renovation—and a lasting lesson about giving unexpected money more than one purpose.",
      quote: {
        strong: "How much of this belongs to my future?",
        text: "A windfall can improve today and the next twenty years.",
      },
      sections: [
        {
          heading: "When money feels different",
          paragraphs: [
            "There are only a handful of times in life when a large sum of money lands in your bank account unexpectedly.",
            "A bonus.",
            "A tax refund.",
            "An inheritance.",
            "A severance package.",
            "When it happens, it's easy to think of it as extra money.",
            "That's exactly what I did.",
            "Years ago, I was laid off from my job.",
            "Like most people, I was worried about what came next.",
            "Fortunately, I found another job much sooner than I expected.",
            "Then my severance payment arrived.",
            "Because I was already working again, the money felt different.",
            "It didn't feel like income.",
            "It felt like a bonus.",
            "Extra money.",
          ],
        },
        {
          heading: "The Mocha Oak floors",
          paragraphs: [
            "Around that time, our house still had pale pink carpet and perfectly good linoleum throughout much of the main floor.",
            "It wasn't damaged.",
            "It wasn't falling apart.",
            "It just wasn't what we wanted.",
            "So we made the decision to renovate.",
            "Out came the carpet.",
            "Out came the linoleum.",
            "In went beautiful Mocha Oak hardwood floors.",
            "I even bought a special steam mop to keep them looking their best.",
            "To this day, I still love those floors.",
          ],
        },
        {
          heading: "What I really regret",
          paragraphs: [
            "I don't regret making our home nicer.",
            "What I regret is believing I had to spend all of that unexpected money.",
            "At the time, it never crossed my mind to divide the severance into two purposes.",
            "Enjoy some of it.",
            "Invest the rest.",
            "Had I invested even part of that money, it would have had years to grow.",
            "Instead, I treated every dollar like spending money.",
            "Looking back, I realize the biggest mistake wasn't buying hardwood floors.",
            "The mistake was believing a windfall should be treated differently than every other payday.",
          ],
        },
        {
          heading: "Give the money two purposes",
          paragraphs: [
            "Unexpected money deserves even more thought than expected money.",
            "It doesn't arrive very often.",
            "Each time it does, it gives you a rare opportunity to move your future forward in a meaningful way.",
            "Today, if I receive a bonus, tax refund, or any other unexpected payment, I ask myself one question before I spend a dollar.",
            "How much of this belongs to my future?",
            "Sometimes the answer is half.",
            "Sometimes it's more.",
            "Sometimes it's all of it.",
            "The important thing is asking the question.",
          ],
        },
        {
          heading: "Let your future celebrate too",
          paragraphs: [
            "There's nothing wrong with enjoying unexpected money.",
            "Celebrate it.",
            "Take a trip.",
            "Buy something you've been wanting.",
            "Improve your home.",
            "Just remember that your future deserves to celebrate too.",
            "A windfall can improve today.",
            "Or it can improve the next twenty years.",
            "The best choice is often to let it do a little of both.",
            "That's one of the biggest lessons I've learned about money.",
            "Extra money isn't really extra.",
            "It's simply another opportunity.",
            "And opportunities are too valuable to waste.",
            "Every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const FIFTH_ARTICLE = {
      id: "rich-enough",
      title: "Rich Enough",
      summary: "A simple comment during a performance review revealed what financial freedom really means. Wealth isn't about owning everything. It's about having enough choices to live life on your own terms.",
      image: "/article-rich-enough.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "FINANCIAL FREEDOM · ENOUGH · CHOICE",
      alt: "Person sitting in a cave looking out at a mountain lake at sunset",
      caption: "Financial freedom is not about having everything. It is about having enough choices.",
      quote: {
        strong: "The goal was never to collect as much money as possible.",
        text: "The goal was to buy freedom.",
      },
      sections: [
        {
          heading: "The sentence I wasn't supposed to say",
          paragraphs: [
            "I wasn't supposed to say it out loud.",
            "It was just a routine performance review. We were talking about goals, career plans, and what I wanted to accomplish over the next few years.",
            "At one point my manager asked where I saw myself in the future.",
            "Without thinking, I answered.",
            "\"I could retire if I wanted to.\"",
            "The room went quiet.",
            "I wasn't trying to brag. In fact, I regretted saying it almost immediately. I could tell it sounded very different than I intended.",
            "What I meant was simple.",
            "After years of working, saving, investing, and living below my means, I had finally reached a point where work had become a choice instead of a necessity.",
          ],
        },
        {
          heading: "What enough really feels like",
          paragraphs: [
            "That doesn't mean I own a yacht.",
            "It doesn't mean I fly on private jets.",
            "It doesn't mean I buy everything I want.",
            "It means something much more valuable.",
            "I have enough.",
            "Enough to sleep well at night.",
            "Enough to handle life's surprises.",
            "Enough to know that if tomorrow didn't go according to plan, my future wouldn't fall apart.",
          ],
        },
        {
          heading: "Built from ordinary paydays",
          paragraphs: [
            "That feeling didn't come from one big paycheck.",
            "It wasn't the result of a lucky investment or a winning lottery ticket.",
            "It came from thousands of ordinary paydays.",
            "Paydays where I saved before I spent.",
            "Paydays where I invested when it would have been easier to buy something else.",
            "Paydays where I made small decisions that didn't seem important at the time.",
            "Looking back, none of those decisions changed my life on their own.",
            "Together, they changed everything.",
          ],
        },
        {
          heading: "A different definition of rich",
          paragraphs: [
            "When people hear the word \"rich,\" they often picture mansions, luxury cars, and extravagant vacations.",
            "I've learned that being rich has less to do with what other people see and much more to do with the choices you have.",
            "Being able to leave a job you no longer enjoy.",
            "Being able to help your family without creating hardship for yourself.",
            "Being able to take time off when life demands it.",
            "Being able to sleep peacefully because money isn't keeping you awake.",
            "That's the kind of wealth I wanted.",
            "Money is a tool.",
            "The goal was never to collect as much of it as possible.",
            "The goal was to buy freedom.",
            "Freedom to choose.",
            "Freedom to say yes.",
            "Freedom to say no.",
            "Freedom to spend my time on the things that matter most.",
          ],
        },
        {
          heading: "Rich enough to choose",
          paragraphs: [
            "I still work.",
            "I enjoy having projects, solving problems, and learning new things.",
            "But there's a quiet confidence that comes from knowing I don't have to.",
            "That feeling wasn't built overnight.",
            "It was built one payday at a time.",
            "One decision at a time.",
            "One ordinary habit repeated over and over again.",
            "You don't have to become the richest person in the room.",
            "You just have to become rich enough to live life on your own terms.",
            "Because in the end, wealth isn't about having everything.",
            "It's about having enough choices.",
            "And every payday gives you another chance to build them.",
          ],
        },
      ],
    };

    const SIXTH_ARTICLE = {
      id: "youre-not-too-late",
      title: "You're Not Too Late",
      summary: "Saving my first $1,000 didn't make me wealthy, but it changed how I thought about money forever. It's never too late to begin because every financial journey starts with a single payday.",
      image: "/article-youre-not-too-late.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · STARTING · MOMENTUM",
      alt: "Savings jar with bills and coins beside a notebook and pen",
      caption: "The first milestone matters because it proves that progress belongs to you, too.",
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
            "Every payday, I'd set a little aside before I spent the rest. Some paydays it felt easy. Other times it meant saying no to things I wanted.",
            "Progress was slow.",
            "There were weeks when the balance barely seemed to move.",
            "Then one day, I looked at my account and saw four digits.",
            "One thousand dollars.",
            "To someone else, it might not have seemed like much.",
            "To me, it felt enormous.",
          ],
        },
        {
          heading: "The proof mattered more than the amount",
          paragraphs: [
            "Not because of the amount.",
            "Because it proved something.",
            "I could do this.",
            "That first thousand wasn't life changing financially.",
            "It was life changing mentally.",
            "For the first time, saving money wasn't something other people did.",
            "It was something I did.",
            "That small victory gave me confidence to save the next thousand.",
            "Then the next.",
            "Eventually, I started investing.",
            "Years passed.",
            "Those small, ordinary decisions kept adding up.",
          ],
        },
        {
          heading: "The next payday is still yours",
          paragraphs: [
            "People sometimes tell me they wish they had started saving twenty years ago.",
            "I understand that feeling.",
            "But wishing doesn't change yesterday.",
            "The only payday you can still influence is the next one.",
            "The best time to start may have been years ago.",
            "The second best time is your next payday.",
            "I've met people who started investing in their twenties.",
            "I've met others who didn't begin until their forties or fifties.",
            "The ones who made progress weren't the ones who started the earliest.",
            "They were the ones who finally started.",
          ],
        },
        {
          heading: "Grow the habit first",
          paragraphs: [
            "Money has an incredible ability to grow.",
            "But before your investments can grow, your habits have to grow first.",
            "Every saver has a first payday.",
            "Every investor buys a first investment.",
            "Every retirement account begins with a balance of zero.",
            "No one skips those first steps.",
            "If you're waiting until you have more money...",
            "If you're waiting until life settles down...",
            "If you're waiting until next year...",
            "You may be waiting forever.",
            "Your future doesn't need a perfect beginning.",
            "It only needs a beginning.",
          ],
        },
        {
          heading: "Choose your first milestone",
          paragraphs: [
            "Maybe your first goal is $100.",
            "Maybe it's $500.",
            "Maybe it's your first $1,000, just like mine.",
            "The amount doesn't matter nearly as much as the habit you're building.",
            "One payday becomes two.",
            "Two becomes ten.",
            "Ten becomes a year.",
            "Years become decades.",
            "One ordinary decision repeated hundreds of times quietly changes your future.",
            "If you're reading this and wondering whether you've missed your chance, let me answer that for you.",
            "You haven't.",
            "Your next payday is still coming.",
            "And that's all you need.",
          ],
        },
      ],
    };

    const SEVENTH_ARTICLE = {
      id: "love-is-wonderful-it-just-isnt-a-financial-plan",
      title: "Love Is Wonderful. It Just Isn't a Financial Plan.",
      summary: "A conversation with a kind coworker revealed an important lesson: love and financial security are not the same thing. The strongest relationships are built when both people have a solid financial foundation of their own.",
      image: "/article-love-isnt-a-financial-plan.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "LOVE · INDEPENDENCE · SECURITY",
      alt: "Couple walking together beside a desk with financial planning tools",
      caption: "Love can enrich a life. A financial foundation gives that life choices.",
      quote: {
        strong: "Building your own future doesn't mean you expect to be alone.",
        text: "It means you're giving yourself choices no matter what life brings.",
      },
      sections: [
        {
          heading: "A conversation I never forgot",
          paragraphs: [
            "She was one of the kindest people I've ever worked with.",
            "The type of person who remembered birthdays, asked how your family was doing, and was always willing to help when someone needed it.",
            "One day we were talking about the company's pension plan.",
            "Almost everyone enrolled.",
            "She hadn't.",
            "I asked why.",
            "She smiled and said something I'll never forget.",
            "\"I won't need it. There will always be someone to take care of me.\"",
            "She wasn't joking.",
            "She genuinely believed that her future would always include someone else to provide financial security.",
            "Maybe a partner.",
            "Maybe family.",
            "Maybe someone who loved her enough to make sure she was always okay.",
          ],
        },
        {
          heading: "Love and money are different things",
          paragraphs: [
            "I understood where she was coming from.",
            "Love is one of the greatest gifts in life.",
            "Having people who care about you is something money can never replace.",
            "But as the years passed, I kept thinking about that conversation.",
            "Because love and money are two very different things.",
            "People lose jobs.",
            "Relationships end.",
            "Someone gets sick.",
            "A spouse dies.",
            "Life changes in ways we never expect.",
            "None of those things mean someone failed.",
            "They simply mean life happened.",
          ],
        },
        {
          heading: "Build a foundation for the unknown",
          paragraphs: [
            "The people who seem the most financially secure aren't always the ones with the highest incomes.",
            "Often, they're the people who quietly built their own foundation while hoping they would never need it.",
            "That's what saving really is.",
            "It's not preparing for the worst.",
            "It's preparing for the unknown.",
            "The truth is, building your own financial future doesn't mean you expect to be alone.",
            "It means you're giving yourself choices no matter what life brings.",
            "If everything goes exactly as planned, wonderful.",
            "You'll have more freedom together.",
            "If life takes an unexpected turn, you'll still have a foundation beneath your feet.",
            "That's not a lack of faith.",
            "That's wisdom.",
          ],
        },
        {
          heading: "A gift to the people you love",
          paragraphs: [
            "One of the greatest gifts you can give someone you love isn't asking them to carry your financial future.",
            "It's knowing they don't have to.",
            "Because you've built one of your own.",
            "Every payday is an opportunity to strengthen that foundation.",
            "Sometimes it's a small contribution to a retirement account.",
            "Sometimes it's paying down debt.",
            "Sometimes it's adding a little more to your emergency fund.",
            "The amount matters less than the habit.",
            "You're quietly building independence one decision at a time.",
          ],
        },
        {
          heading: "Love richly. Plan wisely.",
          paragraphs: [
            "Love can make life richer.",
            "It can make difficult days easier.",
            "It can give us strength we never knew we had.",
            "But it should never be the only thing standing between you and financial security.",
            "Build your own foundation.",
            "Share your life with someone if you're fortunate enough to find them.",
            "But make sure your future isn't resting entirely on someone else's shoulders.",
            "Because relationships are wonderful.",
            "They just aren't a financial plan.",
          ],
        },
      ],
    };

    const EIGHTH_ARTICLE = {
      id: "the-biggest-lie-about-retirement",
      title: "The Biggest Lie About Retirement",
      summary: "Most people think retirement begins at a certain age. In reality, retirement starts the moment your money gives you the freedom to choose how you spend your time. Every payday is another step toward that freedom.",
      image: "/article-biggest-lie-retirement.png",
      readTime: "4 min read",
      category: "Retirement",
      kicker: "RETIREMENT · FREEDOM · CHOICE",
      alt: "Retired couple having breakfast on a patio overlooking the coast",
      caption: "Retirement is not a birthday. It is the freedom to choose what comes next.",
      quote: {
        strong: "Retirement isn't an age.",
        text: "It's a financial condition.",
      },
      sections: [
        {
          heading: "The gentleman I never forgot",
          paragraphs: [
            "Early in my career, I worked with a gentleman who stood out.",
            "His hair was white.",
            "His suit hung a little too loosely, as though it had been tailored for a younger version of himself many years earlier.",
            "He was quiet.",
            "Polite.",
            "Always on time.",
            "I remember wondering why he was still working. He looked well past the age I assumed people retired.",
            "At the time, I didn't know anything about his life.",
            "Maybe he enjoyed the routine.",
            "Maybe he liked being around people.",
            "Maybe he simply wasn't ready to retire.",
            "Or maybe there was another reason entirely.",
            "I never asked.",
            "A few months later, the company announced layoffs.",
            "He was one of the people who lost his job.",
            "I remember sitting at my desk thinking about him—not because I knew what he was going through, but because I realized I had no idea.",
            "Was he financially prepared?",
            "Was he worried?",
            "Did he have enough saved?",
            "Or was he wondering where his next paycheque would come from?",
            "I never found out.",
            "But I never forgot him.",
            "He changed the way I thought about retirement.",
          ],
        },
        {
          heading: "The biggest lie",
          paragraphs: [
            "For most of my life, I thought retirement was an age.",
            "Sixty-five.",
            "That was the number everyone talked about. Some people said sixty. Others said seventy. It sounded as though retirement happened simply because enough birthdays had passed.",
            "Then I realized something.",
            "Retirement isn't an age.",
            "It's a financial condition.",
            "Two people can turn sixty-five on the same day.",
            "One can retire.",
            "The other can't.",
            "The calendar didn't make the difference.",
            "The money did.",
          ],
        },
        {
          heading: "Working because you want to",
          paragraphs: [
            "I hope I still have the energy to work when I'm older.",
            "I hope I still enjoy learning new things.",
            "I hope I still feel useful.",
            "There's nothing wrong with working later in life—if it's your choice.",
            "The problem isn't working.",
            "The problem is not having a choice.",
            "There's a world of difference between saying:",
            "\"I'd like to keep working.\"",
            "and",
            "\"I have to keep working.\"",
            "One is freedom.",
            "The other is necessity.",
            "Every payday quietly moves us toward one of those futures.",
          ],
        },
        {
          heading: "Retirement starts much earlier than you think",
          paragraphs: [
            "Most people think retirement begins on the day they stop working.",
            "I don't.",
            "I think retirement begins with your first payday.",
            "Every time you save a little.",
            "Every time you invest.",
            "Every time you decide not to spend every dollar that reaches your account.",
            "You're building options for your future.",
            "Those choices don't seem exciting when you're twenty-five.",
            "Or thirty-five.",
            "Or even forty-five.",
            "But one day, they become incredibly important.",
            "Because retirement isn't built during your last year of work.",
            "It's built during every year that came before it.",
          ],
        },
        {
          heading: "Buying tomorrow's freedom",
          paragraphs: [
            "People often think saving for retirement is about having more money.",
            "I don't think that's the real goal.",
            "The real goal is having more choices.",
            "The choice to spend more time with your family.",
            "The choice to travel.",
            "The choice to volunteer.",
            "The choice to start something new.",
            "The choice to keep working because you enjoy it—not because you have no alternative.",
            "Every dollar you save is quietly buying a little more freedom for your future self.",
            "Not all at once.",
            "One payday at a time.",
          ],
        },
        {
          heading: "One payday at a time",
          paragraphs: [
            "Most of us only receive about 1,040 paydays during our working lives.",
            "Every one of them is an opportunity.",
            "Not just to earn a living.",
            "To build a life.",
            "The biggest lie about retirement isn't that you need a certain age.",
            "It's that retirement begins on your last day of work.",
            "The truth is, retirement begins with your very first payday.",
            "Because every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const NINTH_ARTICLE = {
      id: "everyone-needs-a-float",
      title: "Everyone Needs a Float",
      summary: "A float isn't about earning the highest return. It's about creating enough breathing room that life's unexpected expenses don't become financial emergencies. Sometimes the best investment is peace of mind.",
      image: "/article-everyone-needs-a-float.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · RESILIENCE · PEACE OF MIND",
      alt: "Vintage cash register drawer with bills and coins labeled float",
      caption: "A quiet cash cushion can keep an ordinary problem from becoming a financial crisis.",
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
            "It wasn't extra money.",
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
            "Emergencies don't make appointments.",
            "They simply show up.",
            "That's why every household needs a float.",
            "We usually call it an emergency fund.",
            "I still like the word float—because that's exactly what it is.",
          ],
        },
        {
          heading: "It's not money waiting to be spent",
          paragraphs: [
            "One of the biggest mistakes people make is looking at an emergency fund and thinking,",
            "\"I have all that money sitting there doing nothing.\"",
            "That's exactly the wrong way to see it.",
            "A float isn't money waiting to be spent.",
            "It's money waiting to protect you.",
            "The cash drawer at work wasn't considered wasted because it wasn't used every minute of the day. Its value came from being there when it was needed.",
            "Your emergency fund works the same way.",
            "Most days, nothing happens—and that's the goal.",
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
            "Not because emergencies stopped happening—but because you know you're ready when they do.",
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
          heading: "One payday at a time",
          paragraphs: [
            "At 1040 Paydays, we believe every payday has a purpose.",
            "Some dollars pay today's bills.",
            "Some dollars build tomorrow's retirement.",
            "And some dollars simply wait—not because they're forgotten, but because they're protecting everything else you've worked so hard to build.",
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
      summary: "A strong salary may look impressive, but the number that shapes your future is what actually reaches your account—and what you choose to do with every payday.",
      image: "/article-number-that-really-matters.png",
      readTime: "4 min read",
      category: "Payday philosophy",
      kicker: "TAKE-HOME PAY · CHOICES · CONSISTENCY",
      alt: "Man reviewing a pay statement and writing notes at a kitchen table",
      caption: "Your gross salary is a promise. Your take-home pay is the money you get to put to work.",
      quote: {
        strong: "Income matters.",
        text: "But what you do with the money you actually receive matters even more.",
      },
      sections: [
        {
          heading: "The number on the job posting",
          paragraphs: [
            "Whenever someone starts a new job, there's usually one question people can't wait to ask.",
            "\"How much does it pay?\"",
            "It's understandable.",
            "Salary is easy to compare.",
            "It's the number printed on the job posting.",
            "It's the number we tell our friends.",
            "It's the number we use to judge whether someone is doing well.",
            "For a long time, I thought it was the most important financial number too.",
            "Then I looked at one of my pay stubs.",
            "My salary looked great.",
            "My take-home pay looked very different.",
            "Taxes.",
            "Pension deductions.",
            "Employment insurance.",
            "Benefits.",
            "Other deductions.",
            "By the time my pay reached my bank account, a noticeable portion had already gone somewhere else.",
            "That wasn't a bad thing.",
            "Many of those deductions were building my future.",
            "But it reminded me of something important.",
            "The number that changes your life isn't your gross salary.",
            "It's what actually reaches your account.",
            "Because that's the money you get to make decisions with.",
          ],
        },
        {
          heading: "What you do with it matters more",
          paragraphs: [
            "Every payday, you're faced with a choice.",
            "Spend it.",
            "Save it.",
            "Invest it.",
            "Pay down debt.",
            "Give some away.",
            "Those decisions are made with your take-home pay—not the number on your employment contract.",
            "Imagine two people.",
            "One earns $120,000 a year.",
            "The other earns $75,000.",
            "Who becomes wealthier?",
            "Most people assume it's the person earning more.",
            "Maybe.",
            "But maybe not.",
            "What if the first person spends nearly everything that reaches their account?",
            "What if the second person consistently saves and invests part of every pay?",
            "Twenty years later, who has more choices?",
            "Who worries less?",
            "Who built more security?",
            "Income matters.",
            "But what you do with the money you actually receive matters even more.",
          ],
        },
        {
          heading: "Every raise comes with a choice",
          paragraphs: [
            "A raise feels good.",
            "You earned it.",
            "But every raise quietly asks a question:",
            "\"What are you going to do with me?\"",
            "Spend all of it?",
            "Save some of it?",
            "Invest part of it?",
            "Pay down debt?",
            "Most raises disappear without us noticing—nicer vehicles, larger homes, upgraded phones, extra subscriptions.",
            "None of those things are wrong.",
            "The problem is assuming every raise belongs to today's lifestyle instead of tomorrow's freedom.",
            "Sometimes the smartest financial decision isn't earning more.",
            "It's keeping more.",
          ],
        },
        {
          heading: "Small decisions become big results",
          paragraphs: [
            "People often believe wealth is created by one brilliant investment or one lucky opportunity.",
            "More often, wealth is built quietly.",
            "A little saved today.",
            "A little invested next payday.",
            "Another small contribution the payday after that.",
            "Those decisions don't feel exciting.",
            "They often feel insignificant.",
            "But time rewards consistency.",
            "Money that remains invested begins earning money of its own.",
            "Then those earnings begin earning money.",
            "Years pass.",
            "Then decades.",
            "Eventually you realize something:",
            "Those ordinary decisions were never ordinary at all.",
            "They were building your future while you were busy living your life.",
          ],
        },
        {
          heading: "The number that really matters",
          paragraphs: [
            "The next time someone asks about your new job, you'll probably tell them your annual salary.",
            "That's normal.",
            "It's how the world measures careers.",
            "But privately, measure something different.",
            "Measure how much actually reaches your account.",
            "Measure how much you save.",
            "Measure how much you invest.",
            "Measure how much debt you've paid off.",
            "Measure how much closer each payday brings you to the future you want.",
            "Your gross salary might impress people.",
            "Your take-home pay quietly builds your life.",
            "One is the promise.",
            "The other is reality.",
            "At 1040 Paydays, we believe financial freedom isn't built by the salary printed on an employment contract.",
            "It's built by the choices you make with the money that actually reaches your account.",
            "Most of us only receive about 1,040 paydays during our working lives.",
            "We can't control how many we receive.",
            "We can control what we do with every one of them.",
            "Every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const ELEVENTH_ARTICLE = {
      id: "the-language-i-wish-id-learned-sooner",
      title: "The Language I Wish I'd Learned Sooner",
      summary: "I once looked at a 13-cent stock every day without realizing the opportunity in front of me. Learning the language of money taught me that understanding is often the first and most valuable investment you'll ever make.",
      image: "/article-language-learned-sooner.png",
      readTime: "4 min read",
      category: "Financial Basics",
      kicker: "FINANCIAL BASICS · LEARNING · CONFIDENCE",
      alt: "Financial learning objects on a table, including a compass, stock certificate, savings tote, and growth plant",
      caption: "Sometimes an opportunity looks ordinary until you learn the language needed to recognize it.",
      quote: {
        strong: "The biggest investment I ever made wasn't in a company.",
        text: "It was in learning.",
      },
      sections: [
        {
          heading: "The language I didn't know",
          paragraphs: [
            "Early in my career, I knew how to work.",
            "I knew how to show up on time.",
            "I knew how to meet deadlines.",
            "I knew how to do a good job.",
            "What I didn't know was the language of money.",
            "Words like compound interest, dividends, shares, interest rates, and diversification.",
            "They all sounded important.",
            "But none of them meant anything to me.",
            "When I joined my company's pension plan, I chose my investments using \"eeny, meeny, miny, moe.\"",
            "Not because I didn't care, but because I didn't understand what I was looking at.",
            "The options were just names on a page.",
            "To me, one looked about as good as another.",
          ],
        },
        {
          heading: "The 13-cent number on my screen",
          paragraphs: [
            "Around that same time, our company rolled out a new software system.",
            "Every morning when I logged in, the first screen showed the company's share price.",
            "If my memory is right, it hovered around eleven or thirteen cents.",
            "I saw that number every single day.",
            "Sometimes more than once.",
            "But I never stopped to think about it.",
            "I never wondered what owning a share actually meant.",
            "I never asked why the number mattered.",
            "I didn't even know enough to know it was worth asking.",
            "Years later, the company was acquired.",
            "If I'm remembering correctly, shareholders received somewhere around $3.40 a share.",
            "I wasn't upset that I hadn't bought the stock.",
            "What stayed with me was something much simpler.",
            "I had looked at that number hundreds of times...",
            "...without ever understanding what I was looking at.",
            "That realization changed me.",
          ],
        },
        {
          heading: "You can't recognize what you don't understand",
          paragraphs: [
            "Looking back, I don't blame my younger self.",
            "Nobody had ever taught me how investing worked.",
            "Nobody had explained what a share represented.",
            "Nobody had shown me how compound interest quietly builds wealth over time.",
            "Nobody had explained why understanding money matters just as much as earning it.",
            "So I did what many people do.",
            "I ignored it.",
            "Not because I thought it was unimportant.",
            "But because I didn't know it was important.",
            "There's a big difference.",
          ],
        },
        {
          heading: "Learning the language",
          paragraphs: [
            "A few years later, I went back to school.",
            "Slowly, the words that once felt intimidating started to make sense.",
            "Compound interest wasn't just a term. It was a force.",
            "A share wasn't just a number. It was ownership.",
            "Interest rates weren't abstract. They shaped mortgages, loans, and everyday decisions.",
            "The world hadn't changed.",
            "I had changed.",
            "Because I finally understood the language.",
            "Once you understand the language, you begin to see opportunities that were there all along.",
          ],
        },
        {
          heading: "You don't need to know everything",
          paragraphs: [
            "One of the biggest surprises was realizing you don't need to be an expert to begin.",
            "You don't need to memorize stock symbols.",
            "You don't need to predict markets.",
            "You don't need to understand every chart or every headline.",
            "You just need to understand the basics.",
            "Because once you understand the language, your confidence grows.",
            "Your questions get better.",
            "Your decisions get better.",
            "And over time, your future gets better too.",
          ],
        },
        {
          heading: "One payday at a time",
          paragraphs: [
            "That 13-cent stock taught me something I never forgot.",
            "Opportunities don't always announce themselves.",
            "Sometimes they sit quietly on a screen you see every day.",
            "Sometimes they look ordinary until you understand what you're looking at.",
            "The biggest investment I ever made wasn't in a company.",
            "It was in learning.",
            "Most people only get about 1,040 paydays during their working lives.",
            "Spend some earning money.",
            "Spend some learning about money.",
            "Because every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWELFTH_ARTICLE = {
      id: "the-month-i-accidentally-saved-money",
      title: "The Month I Accidentally Saved Money",
      summary: "I changed a few habits to feel healthier and discovered that my bank balance improved too. Sometimes the most effective financial changes begin with a better decision somewhere else in life.",
      image: "/article-accidentally-saved-money.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · HEALTH · HABITS",
      alt: "Woman writing in a notebook at a kitchen table with packed food and coffee nearby",
      caption: "A packed lunch, coffee from home, and a few ordinary choices quietly changed two things at once.",
      quote: {
        strong: "Money doesn't always improve because we focus on money.",
        text: "Sometimes it improves because we become more intentional about how we live.",
      },
      sections: [
        {
          heading: "A healthier goal",
          paragraphs: [
            "A few years ago, I decided it was time to lose a few pounds.",
            "Not because anyone told me to.",
            "Not because I had made a New Year's resolution.",
            "I simply wanted to feel healthier.",
            "So I made a few small changes.",
            "I packed my lunch instead of buying it.",
            "I stopped grabbing a coffee every morning on the way to work.",
            "I skipped the afternoon chocolate bar that had quietly become part of my routine.",
            "Instead of ordering takeout after a long day, I cooked dinner at home.",
            "None of those decisions had anything to do with saving money.",
            "I wasn't budgeting.",
            "I wasn't trying to spend less.",
            "I wasn't tracking every dollar.",
            "My only goal was to build healthier habits.",
            "About a month later, I logged into my bank account.",
            "There was more money sitting there than I expected.",
            "For a moment, I thought I'd forgotten to pay a bill.",
            "I checked everything.",
            "Nothing was missing.",
            "I hadn't earned any extra money.",
            "I hadn't received a bonus.",
            "I hadn't found money lying around.",
            "I had simply spent less without ever trying to.",
            "That was the month I accidentally saved money.",
          ],
        },
        {
          heading: "Sometimes the best financial plan isn't about money",
          paragraphs: [
            "We often think improving our finances means creating a detailed budget, tracking every purchase, or finding ways to earn more.",
            "Those things certainly help.",
            "But sometimes the biggest financial improvements happen because we change something completely unrelated.",
            "When I started eating healthier, I naturally stopped buying things I didn't really need.",
            "Restaurant meals became groceries.",
            "Coffee shop visits became coffee at home.",
            "Impulse snacks quietly disappeared.",
            "I wasn't making financial decisions.",
            "I was making health decisions.",
            "The financial benefits simply followed.",
          ],
        },
        {
          heading: "Every season has a purpose",
          paragraphs: [
            "Life has seasons.",
            "Sometimes your focus is paying off debt.",
            "Sometimes it's raising children.",
            "Sometimes it's building your career.",
            "Sometimes it's looking after your health.",
            "The interesting thing is that progress in one area often creates progress somewhere else.",
            "Better health can mean fewer impulse purchases.",
            "Less stress can mean fewer emotional shopping trips.",
            "Cooking at home can improve both your waistline and your bank balance.",
            "Good habits rarely stay in just one part of your life.",
            "They have a way of spreading.",
          ],
        },
        {
          heading: "Tiny decisions become big results",
          paragraphs: [
            "None of the choices I made felt significant.",
            "One lunch.",
            "One coffee.",
            "One dinner.",
            "One walk instead of a drive.",
            "On their own, they barely seemed worth mentioning.",
            "But repeated over a month, they quietly changed two things at once.",
            "I felt better.",
            "And my bank account looked better.",
            "That's the funny thing about habits.",
            "You rarely notice them while you're building them.",
            "You notice them later, when the results begin to appear.",
          ],
        },
        {
          heading: "A better question",
          paragraphs: [
            "Instead of asking,",
            "\"How can I save more money?\"",
            "Sometimes it's worth asking,",
            "\"What habit could improve my life?\"",
            "Maybe it's exercising.",
            "Maybe it's sleeping better.",
            "Maybe it's meal planning.",
            "Maybe it's spending less time shopping out of boredom.",
            "You might discover, as I did, that improving one part of your life quietly improves another.",
          ],
        },
        {
          heading: "Healthier. Wealthier. Wiser.",
          paragraphs: [
            "That month taught me something I've never forgotten.",
            "Money doesn't always improve because we focus on money.",
            "Sometimes it improves because we become more intentional about how we live.",
            "Healthier choices.",
            "Better habits.",
            "More thoughtful decisions.",
            "One small change has a way of leading to another.",
            "Before long, your life begins moving in a different direction.",
            "One payday at a time.",
            "At 1040 Paydays, we believe every payday is an opportunity to build a better future.",
            "Sometimes that future begins with a financial decision.",
            "Sometimes it begins with a completely different one.",
            "Either way, the principle is the same.",
            "Small choices, repeated consistently, change your life.",
            "Because every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const THIRTEENTH_ARTICLE = {
      id: "the-vacation-that-showed-me-how-small-spending-adds-up",
      title: "The Vacation That Showed Me How Small Spending Adds Up",
      summary: "A prepaid two-week vacation showed me how much money can disappear through ordinary routines. One paused paycheck can become a powerful reminder that small spending adds up.",
      image: "/article-vacation-changed-money.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · PERSPECTIVE · PAYDAYS",
      alt: "Woman sitting in a beach chair looking at the ocean beside a palm tree",
      caption: "Sometimes stepping out of your normal routine shows you how much choice was there all along.",
      quote: {
        strong: "The vacation didn't make me wealthier.",
        text: "It changed my perspective.",
      },
      sections: [
        {
          heading: "The surprise waiting at home",
          paragraphs: [
            "I didn't come home from vacation with more money.",
            "At least, that's not what happened on paper.",
            "A few years ago, I took a prepaid two-week vacation.",
            "The flights were booked.",
            "The hotel was paid for.",
            "Most of the meals were included.",
            "For two weeks, I wasn't living my normal life.",
            "When I got home, I opened my bank account.",
            "I was shocked.",
            "There was far more money sitting there than I expected.",
            "Not because I'd earned more.",
            "Because, for two weeks, I hadn't been spending money the way I normally did.",
            "No grocery trips.",
            "No quick stops at the store.",
            "No takeout because we were tired.",
            "No Amazon purchases that somehow seemed urgent at the time.",
            "Life had simply paused.",
          ],
        },
        {
          heading: "The thought I couldn't shake",
          paragraphs: [
            "After the surprise wore off, one question kept running through my mind.",
            "What if I did this on purpose?",
            "Not another vacation.",
            "The saving part.",
            "What if I built up enough money to comfortably cover two weeks of normal living expenses, then treated one entire paycheck as untouchable?",
            "Instead of spending it...",
            "I would save the whole thing.",
            "It sounded almost too simple.",
            "But sometimes the simplest ideas are the ones that quietly change your life.",
          ],
        },
        {
          heading: "One paycheck can become something remarkable",
          paragraphs: [
            "Let's imagine that saved paycheck is $1,500.",
            "You invest it instead of spending it.",
            "You don't touch it.",
            "You simply let time do what time does.",
            "At an average annual return of 10%, that single decision could become about $1,650 after one year.",
            "After five years, it could become about $2,416.",
            "After 25 years, it could become about $16,250.",
            "That's from one paycheck.",
            "One ordinary payday that most people would barely remember.",
            "Now imagine doing something similar more than once.",
            "That's how wealth is usually built.",
            "Not through one extraordinary decision.",
            "Through ordinary decisions repeated over and over again.",
          ],
        },
        {
          heading: "It changed the way I look at every payday",
          paragraphs: [
            "Before that vacation, every paycheck felt like money that needed to be spent.",
            "Afterward, I realized something different.",
            "Sometimes we spend simply because we're in our normal routine.",
            "Remove the routine for a while, and you realize how many purchases happen almost automatically.",
            "The vacation didn't make me wealthier.",
            "It changed my perspective.",
            "It showed me that I had more control than I thought.",
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
            "You don't need a prepaid vacation to learn the same lesson.",
            "You can create it yourself.",
            "What would happen if you saved enough to cover two weeks of everyday life?",
            "What if, just once, you banked an entire paycheck instead of letting it disappear into another month of spending?",
            "Maybe it becomes your emergency fund.",
            "Maybe it becomes your first investment.",
            "Maybe it quietly grows into something your future self will thank you for.",
            "One paycheck probably won't make you wealthy.",
            "But it might change the way you think about money.",
            "And sometimes that's where real wealth begins.",
          ],
        },
      ],
    };

    const FOURTEENTH_ARTICLE = {
      id: "the-grocery-store-in-my-cupboard",
      title: "The Grocery Store in My Cupboard",
      summary: "A simple month of shopping from my own kitchen showed me that every forgotten can, box, and bag was really an old payday already taking care of me.",
      image: "/article-grocery-store-cupboard.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · ABUNDANCE · EVERYDAY MONEY",
      alt: "Man looking into a stocked kitchen cupboard filled with pantry staples",
      caption: "Sometimes the richest grocery store is the one you have already paid for.",
      quote: {
        strong: "Every single item on those shelves was an old payday.",
        text: "I wasn't looking at groceries anymore. I was looking at pieces of my own life.",
      },
      sections: [
        {
          heading: "A small experiment",
          paragraphs: [
            "I didn't do it because I needed to save money.",
            "I did it because it sounded like fun.",
            "I've always enjoyed little experiments with money.",
            "Not because I'm trying to spend as little as possible, but because every now and then it's interesting to challenge the way I normally do things.",
            "So I gave myself a challenge.",
            "For one month, I would only buy the essentials.",
            "Fresh milk.",
            "Fresh fruit and vegetables.",
            "The things that couldn't wait.",
            "Everything else had to come from my own cupboard, my fridge, or my freezer.",
            "I thought it would make meal planning more interesting.",
            "I had no idea it would change the way I looked at every grocery trip afterward.",
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
            "A bag of vegetables I had completely forgotten about.",
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
            "One evening, I opened the cupboard and just stood there.",
            "Rows of cans.",
            "Boxes of pasta.",
            "Rice.",
            "Crackers.",
            "Peanut butter.",
            "Coffee.",
            "Nothing special.",
            "Then a strange thought crossed my mind.",
            "Every single item on those shelves was an old payday.",
            "That can of soup...",
            "...was a Tuesday I went to work.",
            "The pasta...",
            "...was part of another paycheck.",
            "The coffee...",
            "...was an ordinary Wednesday from months ago.",
            "Every shelf in front of me represented hours I'd already traded for money.",
            "I wasn't looking at groceries anymore.",
            "I was looking at pieces of my own life.",
          ],
        },
        {
          heading: "My past self had been quietly helping me all along",
          paragraphs: [
            "That's when I realized something.",
            "Every time I'd put groceries away...",
            "...I wasn't just stocking a cupboard.",
            "I was leaving gifts for a future version of myself.",
            "The person standing in front of that cupboard weeks later.",
            "The person who was tired after work.",
            "The person who didn't feel like shopping.",
            "The person who needed dinner but didn't need another trip to the store.",
            "Without realizing it, my past self had been quietly taking care of my future self.",
            "I don't know why that thought affected me so much.",
            "But it did.",
          ],
        },
        {
          heading: "We spend so much time looking for more",
          paragraphs: [
            "Before that month, every grocery trip started the same way.",
            "\"What do we need?\"",
            "Now it starts differently.",
            "\"What do we already have?\"",
            "They're almost the same question.",
            "Almost.",
            "One assumes you have a shortage.",
            "The other starts by recognizing your abundance.",
            "That's a very different way to think about money.",
          ],
        },
        {
          heading: "The richest grocery store I know",
          paragraphs: [
            "Today, before I make a grocery list, I open every cupboard.",
            "I check the freezer.",
            "I look in the fridge.",
            "Not because I'm trying to avoid spending money.",
            "Because I want to respect the money I've already spent.",
            "It usually takes five minutes.",
            "Sometimes it saves twenty dollars.",
            "Sometimes it saves a hundred.",
            "But the money isn't the biggest reward.",
            "The reminder is.",
          ],
        },
        {
          heading: "The lesson I wasn't expecting",
          paragraphs: [
            "Financial freedom isn't only built by earning more.",
            "It's built by noticing more.",
            "We spend so much of life chasing the next paycheck...",
            "...the next purchase...",
            "...the next thing we think will make life easier...",
            "...that we sometimes overlook everything our previous paydays have already given us.",
            "The next time you think you need groceries...",
            "Open your cupboard first.",
            "Stand there for a minute.",
            "Every can.",
            "Every box.",
            "Every bag.",
            "Every forgotten meal.",
            "They're all evidence that a past version of you worked hard so the present version of you would have enough.",
            "Sometimes abundance doesn't arrive with your next payday.",
            "Sometimes...",
            "it's already waiting on the shelf.",
          ],
        },
      ],
    };

    const FIFTEENTH_ARTICLE = {
      id: "your-house-is-full-of-money-you-just-cant-see-it-yet",
      title: "Your House Is Full of Money. You Just Can't See It Yet.",
      summary: "A search for a flashlight turned into a treasure hunt through forgotten gift cards, pantry food, clothes, books, and small luxuries already waiting at home.",
      image: "/article-house-full-of-money.png",
      readTime: "5 min read",
      category: "Saving",
      kicker: "SAVING · HOME · HIDDEN VALUE",
      alt: "Household items arranged on a table with cash, gift cards, folded clothes, shoes, books, and a treasure hunt list",
      caption: "Sometimes the money you are looking for is already sitting under your own roof.",
      quote: {
        strong: "Most of us are living in a house full of money.",
        text: "It just doesn't look like money anymore.",
      },
      sections: [
        {
          heading: "The flashlight I never found",
          paragraphs: [
            "Last Saturday, I wasn't trying to save money.",
            "I was looking for a flashlight.",
            "Instead, I found twenty dollars tucked inside an old wallet.",
            "That little discovery made me stop.",
            "How many other things had I forgotten about?",
            "So, instead of cleaning the house, I decided to go on a treasure hunt.",
            "Not for antiques.",
            "Not for collectibles.",
            "For money.",
            "By the end of the afternoon, I realized something I had never thought about before.",
            "Most of us are living in a house full of money.",
            "It just doesn't look like money anymore.",
          ],
        },
        {
          heading: "The first stop was the kitchen",
          paragraphs: [
            "I opened the drawer where random things seem to collect over the years.",
            "Pens that barely worked.",
            "Rubber bands.",
            "Batteries.",
            "Old receipts.",
            "And gift cards.",
            "Lots of gift cards.",
            "Some still had their full balance.",
            "Others only had a few dollars left.",
            "On their own they didn't seem worth bothering with, but together they added up to enough for groceries, coffee, and a birthday gift I was planning to buy anyway.",
            "That wasn't free money.",
            "It was my money that I'd forgotten to use.",
          ],
        },
        {
          heading: "Next came the pantry",
          paragraphs: [
            "I laughed.",
            "Pasta.",
            "Rice.",
            "Soup.",
            "Canned vegetables.",
            "Baking supplies.",
            "Frozen meat.",
            "Vegetables in the freezer.",
            "Enough food to make meal after meal without another trip to the grocery store.",
            "How many times had I stood in that very kitchen thinking, \"We need groceries,\" without taking a good look at what was already there?",
            "Sometimes the cheapest grocery trip is the one you never take.",
          ],
        },
        {
          heading: "Dollars hanging on hangers",
          paragraphs: [
            "Then I walked into the bedroom and opened the closet.",
            "There was a jacket I'd worn twice.",
            "A pair of shoes I forgot I owned.",
            "A sweater that still had the tags attached.",
            "Those weren't clothes anymore.",
            "They were dollars hanging on hangers.",
            "Someone else could use them.",
            "Someone else would happily pay for them.",
            "The money wasn't gone.",
            "It had simply changed shape.",
          ],
        },
        {
          heading: "Entertainment I had already paid for",
          paragraphs: [
            "As I continued through the house, I started seeing everything differently.",
            "The bookshelf wasn't just filled with books.",
            "It was filled with evenings of entertainment I'd already paid for.",
            "Instead of ordering another book online, I pulled one of my favourites off the shelf.",
            "I'd forgotten enough of the story that it felt almost brand new.",
            "The same thing happened with a stack of DVDs tucked away in a cabinet.",
            "Years ago, I loved those movies.",
            "Why was I paying for more entertainment when I already owned plenty?",
          ],
        },
        {
          heading: "Use the good candle",
          paragraphs: [
            "Then I spotted something that made me smile.",
            "Candles.",
            "Beautiful candles.",
            "The expensive ones.",
            "The ones I had been saving for someday.",
            "We've all done it.",
            "We buy the nice candle.",
            "The fancy soap.",
            "The special dishes.",
            "The good blanket.",
            "Then we wait for the perfect moment.",
            "The truth is, life doesn't send invitations that say, \"Today is special enough.\"",
            "So I lit the candle.",
            "It smelled amazing.",
            "And for the first time, I realized that sometimes wasting money doesn't mean spending it.",
            "Sometimes wasting money means never enjoying what you already bought.",
          ],
        },
        {
          heading: "Every room held something of value",
          paragraphs: [
            "As I kept searching, I found spare change in jars.",
            "Old birthday cards with cash inside.",
            "Unused craft supplies.",
            "Duplicate kitchen gadgets.",
            "Electronics collecting dust.",
            "And a few items that were still within the return window.",
            "Every room held something of value.",
            "Not because I had forgotten how much I spent.",
            "Because I had forgotten I already owned it.",
            "That afternoon didn't make me rich.",
            "I didn't uncover thousands of dollars hidden in the walls.",
            "But I did find enough value to delay shopping trips, use forgotten gift cards, sell items I no longer needed, return things I'd never used, and enjoy possessions that had been collecting dust for years.",
          ],
        },
        {
          heading: "Look at the money that's already there",
          paragraphs: [
            "More importantly, it changed the way I think about money.",
            "We spend a lot of time chasing the next dollar.",
            "Working overtime.",
            "Looking for side hustles.",
            "Waiting for the next paycheque.",
            "Those things all have their place.",
            "But before you focus on bringing more money into your life, take a look at the money that's already there.",
            "It's in the gift cards sitting in a drawer.",
            "It's in the coat you never wear.",
            "It's in the unopened box on a closet shelf.",
            "It's in the book you'll happily read again.",
            "It's in the bike your kids have outgrown.",
            "It's in the food already waiting in your pantry.",
            "It's in the candle you've been saving for the perfect day.",
          ],
        },
        {
          heading: "Your thirty-minute treasure hunt",
          paragraphs: [
            "This weekend, give yourself thirty minutes.",
            "Walk through your home one room at a time.",
            "Open every drawer.",
            "Look in every closet.",
            "Check every jacket pocket.",
            "Search every shelf.",
            "Don't ask yourself, \"What do I own?\"",
            "Ask yourself, \"What value have I forgotten?\"",
            "You might find cash.",
            "You might find gift cards.",
            "You might find things worth selling.",
            "You might find enough food to skip your next grocery trip.",
            "Or you might simply rediscover things that can bring you joy without spending another dollar.",
            "Building wealth isn't always about making more money.",
            "Sometimes it begins by seeing the wealth that's already sitting under your own roof.",
          ],
        },
      ],
    };

    const SIXTEENTH_ARTICLE = {
      id: "the-biggest-retirement-mistake-has-nothing-to-do-with-investing",
      title: "The Biggest Retirement Mistake Has Nothing to Do With Investing",
      summary: "Comfortable retirement is rarely won by one brilliant investment. It is built through ordinary paydays that quietly give your future self more freedom.",
      image: "/article-biggest-retirement-mistake.png",
      readTime: "5 min read",
      category: "Retirement",
      kicker: "RETIREMENT · PAYDAYS · HABITS",
      alt: "Retired man relaxing on a couch with a cup of coffee",
      caption: "Retirement is shaped long before the retirement party, one ordinary payday at a time.",
      quote: {
        strong: "The biggest retirement mistake isn't choosing the wrong investment.",
        text: "It's believing retirement begins at sixty five.",
      },
      sections: [
        {
          heading: "Two very different retirements",
          paragraphs: [
            "Every so often, someone retires.",
            "They stop setting an alarm.",
            "They stop commuting.",
            "They wake up on a Monday morning with nowhere they have to be.",
            "Some spend those years travelling, spoiling their grandchildren, volunteering, picking up old hobbies, or simply enjoying the freedom they spent decades working toward.",
            "Others spend those same years asking very different questions.",
            "Should we start buying the off brand groceries?",
            "Maybe we should check the thrift stores before buying anything new.",
            "Could we rent out a room to help cover the bills?",
            "Should we put off replacing the car for another few years?",
            "Are there government programs or senior benefits we should apply for?",
            "Can we really afford to visit the grandkids this year?",
            "Same stage of life.",
            "Very different retirement.",
          ],
        },
        {
          heading: "Where retirement is really won or lost",
          paragraphs: [
            "That got me thinking.",
            "What separates the people who spend retirement enjoying their freedom from the people who spend it worrying about every dollar?",
            "Most people think the answer is investing.",
            "They assume the people with comfortable retirements picked better stocks.",
            "Found better mutual funds.",
            "Earned higher returns.",
            "Those things certainly help.",
            "But I don't think that's where retirement is won or lost.",
            "I think the biggest retirement mistake happens years before anyone ever retires.",
            "It happens on ordinary paydays.",
          ],
        },
        {
          heading: "Ordinary paydays are powerful",
          paragraphs: [
            "Paydays don't feel important.",
            "They arrive.",
            "The bills get paid.",
            "The groceries get bought.",
            "A few things show up from an online order.",
            "The credit card gets paid.",
            "The weekend comes and goes.",
            "Then another payday arrives.",
            "Nothing about one payday seems capable of changing your future.",
            "That's exactly why they're so powerful.",
            "One payday doesn't decide your retirement.",
            "Neither does the next one.",
            "Or the one after that.",
            "But over an entire working life, those ordinary paydays quietly become your retirement.",
          ],
        },
        {
          heading: "Small decisions become big outcomes",
          paragraphs: [
            "Every payday asks the same question.",
            "Will all of this money be spent making today a little more comfortable?",
            "Or will part of it be set aside to make tomorrow a little more secure?",
            "The answer doesn't have to be dramatic.",
            "It doesn't have to be half your paycheque.",
            "It might be fifty dollars.",
            "It might be one hundred.",
            "It might simply be increasing your savings by one percent after your next raise.",
            "Small decisions repeated hundreds of times have a way of becoming very big outcomes.",
          ],
        },
        {
          heading: "The ordinary stories build retirement",
          paragraphs: [
            "I've noticed something about people who retire comfortably.",
            "They rarely tell stories about one brilliant financial decision.",
            "Instead, they describe years of ordinary habits.",
            "They paid themselves first.",
            "They invested consistently.",
            "They lived just a little below their means.",
            "They let time do the heavy lifting.",
            "It sounds almost boring.",
            "That's because wealth usually is.",
            "The exciting stories make the news.",
            "The ordinary stories build retirement.",
            "The people who struggle in retirement usually didn't wake up one morning and make a terrible financial decision.",
            "Life simply happened.",
            "There was always another expense.",
            "Another reason to wait.",
            "Another payday that would be a better time to start saving.",
            "Then, one day, there weren't any more working years left to catch up.",
          ],
        },
        {
          heading: "Retirement starts earlier than most people think",
          paragraphs: [
            "The biggest retirement mistake isn't choosing the wrong investment.",
            "It's believing retirement begins at sixty five.",
            "It doesn't.",
            "Retirement begins with your very first paycheque.",
            "Every one after that either gives your future self a little more freedom...",
            "...or quietly takes some away.",
            "One decision won't determine how you retire.",
            "Hundreds of them will.",
          ],
        },
        {
          heading: "The question every payday asks",
          paragraphs: [
            "That's why I don't think the most important retirement question is,",
            "\"What's the best investment?\"",
            "I think it's,",
            "\"What will this payday do for my future?\"",
            "Because every investment begins with money that wasn't spent.",
            "Every retirement begins with ordinary paydays.",
            "And every comfortable retirement is built long before the retirement party.",
            "One payday at a time.",
            "One choice at a time.",
            "One future at a time.",
            "The next payday is coming whether you have a plan for it or not.",
            "The only question is this.",
            "Will it help build the retirement you hope for... or the retirement you're hoping to avoid?",
          ],
        },
      ],
    };

    const SEVENTEENTH_ARTICLE = {
      id: "the-best-age-to-retire-isnt-an-age",
      title: "The Best Age to Retire Isn't an Age",
      summary: "The best time to retire may have less to do with birthdays and more to do with building a stable, affordable life your investments can support.",
      image: "/article-best-age-to-retire.png",
      readTime: "5 min read",
      category: "Retirement",
      kicker: "RETIREMENT · LIFESTYLE · CHOICE",
      alt: "Older woman gardening outside a modest home",
      caption: "The best age to retire is when your investments can support the life you intentionally built.",
      quote: {
        strong: "Retirement isn't really a math problem.",
        text: "It's a lifestyle problem.",
      },
      sections: [
        {
          heading: "The question everyone asks",
          paragraphs: [
            "A few years ago, someone asked me a question.",
            "\"What's the best age to retire?\"",
            "My first thought was the same answer most people would probably give.",
            "Sixty-five.",
            "Maybe sixty if you've planned well.",
            "Fifty-five if you're really lucky.",
            "But the more I thought about it, the less those numbers made sense.",
            "I know someone who retired before 55.",
            "I also know someone who is well into their 70s and still goes to work every morning because they need the income.",
            "Same question.",
            "Two completely different answers.",
            "So maybe age isn't the answer at all.",
          ],
        },
        {
          heading: "The real question underneath",
          paragraphs: [
            "That got me thinking.",
            "What if retirement has never been about your age?",
            "What if it's always been about something else?",
            "I grabbed a piece of paper and started writing down all the things that cost me money every month.",
            "Mortgage.",
            "Insurance.",
            "Utilities.",
            "Groceries.",
            "Car.",
            "Phone.",
            "Internet.",
            "Property taxes.",
            "Then I looked at the list again.",
            "Something jumped out at me.",
            "Most of those bills weren't surprises.",
            "They showed up every month.",
            "Almost like clockwork.",
          ],
        },
        {
          heading: "A moving target",
          paragraphs: [
            "Then I thought about the years when life felt the most expensive.",
            "Buying our first home.",
            "Daycare.",
            "Replacing vehicles.",
            "Home renovations.",
            "Sports.",
            "School.",
            "The expenses weren't just higher.",
            "They were changing all the time.",
            "One year it was daycare.",
            "The next year it was hockey.",
            "Then braces.",
            "Then university.",
            "Trying to plan retirement during those years would have been like trying to hit a moving target.",
          ],
        },
        {
          heading: "When life starts to settle",
          paragraphs: [
            "But eventually...",
            "Life starts to settle.",
            "The kids grow up.",
            "The mortgage gets smaller.",
            "The house finally feels finished.",
            "The furniture stops getting replaced every few years.",
            "You realize you've owned the same dining room table for fifteen years and you're perfectly happy with it.",
            "That's when I had the thought that completely changed the way I look at retirement.",
            "Maybe the best time to retire isn't when you've saved enough.",
            "Maybe it's when your life finally stops changing so much.",
            "The more I thought about it, the more it made sense.",
          ],
        },
        {
          heading: "Lifestyle decides more than age",
          paragraphs: [
            "Retirement isn't really a math problem.",
            "It's a lifestyle problem.",
            "Imagine two neighbours.",
            "They've both invested exactly one million dollars.",
            "One spends $4,000 a month.",
            "The other spends $8,000.",
            "Who retires first?",
            "Not the person who made more money.",
            "Not the person who worked harder.",
            "The person whose lifestyle asks less from their investments.",
            "That's when another thought hit me.",
            "Most of us spend decades trying to grow our investments.",
            "Very few of us spend the same amount of time designing the life those investments will eventually need to pay for.",
            "Maybe we should.",
          ],
        },
        {
          heading: "The payments that follow you",
          paragraphs: [
            "Because every monthly payment you add today quietly follows you into retirement.",
            "A newer truck.",
            "A bigger house.",
            "Another subscription.",
            "A financed vacation.",
            "A storage unit full of things you forgot you owned.",
            "None of them look expensive by themselves.",
            "Together, they become a lifestyle your investments have to support for the rest of your life.",
          ],
        },
        {
          heading: "A different question",
          paragraphs: [
            "Then I asked myself a different question.",
            "Instead of asking,",
            "\"How much do I need to retire?\"",
            "What if I asked,",
            "\"How little can I be perfectly happy living on?\"",
            "That's a completely different conversation.",
            "It isn't about giving things up.",
            "It's about keeping the things that actually make your life better and letting go of the rest.",
            "The reliable vehicle you already love.",
            "The home that's already big enough.",
            "The subscriptions you actually use.",
            "The vacations you'll remember twenty years from now instead of the impulse purchases you'll forget by next month.",
          ],
        },
        {
          heading: "Predictable is powerful",
          paragraphs: [
            "Little by little, something remarkable happens.",
            "Your lifestyle becomes predictable.",
            "And predictable is exactly what retirement needs.",
            "Because if your expenses hardly change...",
            "You don't need to guess.",
            "You know.",
            "You know what it costs to be you.",
            "And once you know that, retirement stops feeling like a mystery.",
          ],
        },
        {
          heading: "The best age to retire",
          paragraphs: [
            "So what's the best age to retire?",
            "I don't think it has anything to do with turning 55...",
            "Or 60...",
            "Or 65.",
            "I think the best age to retire is the moment your investments can comfortably support the life you've intentionally built.",
            "A life that's stable.",
            "A life that's affordable.",
            "A life that's designed, not accidentally accumulated.",
            "That's when work becomes optional.",
            "That's when Monday mornings belong to you again.",
            "And the beautiful part is that you don't build that life the day you retire.",
            "You build it every payday before then.",
            "One payment you decide not to take on.",
            "One debt you pay off.",
            "One investment you choose to make instead of another purchase.",
            "One decision at a time.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const EIGHTEENTH_ARTICLE = {
      id: "the-wealth-you-build-before-you-build-wealth",
      title: "The Wealth You Build Before You Build Wealth",
      summary: "Before you build wealth, you build the habits, systems, knowledge, and confidence that know what to do when more money finally arrives.",
      image: "/article-wealth-before-wealth.png",
      readTime: "5 min read",
      category: "Investing",
      kicker: "WEALTH · SYSTEMS · CONFIDENCE",
      alt: "Couple reviewing notes, receipts, and a laptop at a kitchen table",
      caption: "The numbers grow because the framework grows first.",
      quote: {
        strong: "Before you build wealth...",
        text: "You need to build the person who knows what to do with it.",
      },
      sections: [
        {
          heading: "The step people skip",
          paragraphs: [
            "Everyone talks about building wealth.",
            "Save more.",
            "Invest more.",
            "Earn more.",
            "There's nothing wrong with that advice.",
            "But I think it skips the most important step.",
            "Before you build wealth...",
            "You need to build the person who knows what to do with it.",
          ],
        },
        {
          heading: "Would you be ready?",
          paragraphs: [
            "Think about this for a moment.",
            "Imagine someone deposited one million dollars into your bank account tomorrow morning.",
            "Would you be excited?",
            "Of course.",
            "But here's the more interesting question.",
            "Would you be ready?",
            "Not tomorrow afternoon.",
            "Not after reading a few articles.",
            "Right now.",
            "Would you know exactly where every dollar belongs?",
            "How much would you save?",
            "How much would you invest?",
            "How much would you keep available for opportunities?",
            "How much would you use to create another income stream?",
            "Or would you spend weeks trying to figure it out?",
            "That question completely changed the way I think about money.",
            "Because it made me realize something.",
            "Most people spend years trying to earn wealth.",
            "Very few spend time preparing for it.",
          ],
        },
        {
          heading: "More money needs somewhere to go",
          paragraphs: [
            "Imagine turning on a tap without putting a glass underneath it.",
            "The water doesn't stop flowing.",
            "It simply spills everywhere.",
            "Money works the same way.",
            "Without a system, more money doesn't always create more wealth.",
            "Sometimes it simply creates bigger mistakes.",
          ],
        },
        {
          heading: "Build your wealth framework",
          paragraphs: [
            "That's why I believe the most valuable thing you'll ever build isn't your investment account.",
            "It's your wealth framework.",
            "Your wealth framework is simply the system that gives every dollar a purpose before it arrives.",
            "It doesn't need to be complicated.",
            "A savings account.",
            "An investment account.",
            "Automatic transfers every payday.",
            "A written plan.",
            "Learning how investing works.",
            "Reading about businesses.",
            "Understanding different ways people create income.",
            "None of those things require you to be wealthy.",
            "They only require one decision.",
            "To prepare before the money arrives.",
          ],
        },
        {
          heading: "Practice while the stakes are small",
          paragraphs: [
            "Think about learning to drive.",
            "You don't wait until you're halfway down a winding mountain road to figure out how the brakes work.",
            "You learn in an empty parking lot.",
            "Building wealth works exactly the same way.",
            "You practice with small amounts of money.",
            "You make small mistakes.",
            "You learn small lessons.",
            "Because one day those lessons will protect much larger amounts of money.",
          ],
        },
        {
          heading: "The first wealth is internal",
          paragraphs: [
            "People often say the first $100,000 is the hardest.",
            "I think they're only half right.",
            "The money isn't the hardest part.",
            "The hardest part is becoming the person who can build the first $100,000.",
            "Learning patience.",
            "Learning discipline.",
            "Learning consistency.",
            "Learning not to panic when markets fall.",
            "Learning to invest when everyone else is nervous.",
            "Learning to stick with a plan when nobody is cheering you on.",
            "That's the real wealth you're building.",
            "The dollars simply become the scoreboard.",
          ],
        },
        {
          heading: "The money catches up",
          paragraphs: [
            "One day something interesting happens.",
            "Your habits become automatic.",
            "Your framework becomes stronger.",
            "Your investments become larger.",
            "From the outside, it looks like your money suddenly started working for you.",
            "From the inside, you know something different happened.",
            "You became ready.",
            "The money simply caught up.",
          ],
        },
        {
          heading: "Be ready for more",
          paragraphs: [
            "That's why I don't think building wealth starts with earning more.",
            "I think it starts with becoming ready for more.",
            "Ready to save it.",
            "Ready to invest it.",
            "Ready to protect it.",
            "Ready to grow it.",
            "Because when opportunity finally arrives, it rarely waits for you to get organized.",
            "It rewards the people who were already prepared.",
          ],
        },
        {
          heading: "Build the framework first",
          paragraphs: [
            "So don't spend all your time chasing a bigger paycheque.",
            "Spend some of it building your framework.",
            "Build the habits.",
            "Build the knowledge.",
            "Build the system.",
            "Build the confidence.",
            "Then let time do the rest.",
            "One day you'll look back at your investment account and realize something.",
            "The numbers grew because you grew first.",
            "The wealth followed the framework.",
            "And the framework was built one ordinary payday at a time.",
            "Every payday is a decision.",
            "Choose yours.",
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

    const TWENTIETH_ARTICLE = {
      id: "the-hidden-paycheque-at-work",
      title: "The Hidden Paycheque at Work",
      summary: "Salary is only part of what work pays. Benefits, discounts, retirement matching, free lunches, and small everyday perks can quietly become a hidden paycheque.",
      image: "/article-work-perks-paycheque.png",
      readTime: "5 min read",
      category: "Financial Basics",
      kicker: "WORK BENEFITS · HIDDEN PAYCHEQUE · SAVING",
      alt: "Woman pouring hot chocolate at a workplace appreciation lunch",
      caption: "The hidden paycheque shows up as money you did not have to spend.",
      quote: {
        strong: "Most people judge a job by the salary.",
        text: "But salary is only part of the picture.",
      },
      sections: [
        {
          heading: "The 9-to-5 Club",
          paragraphs: [
            "Most people think the only thing they earn at work is a paycheque.",
            "I don't.",
            "Over the years I've realized some of the most valuable things I've received from work never showed up on my pay stub.",
            "Retirement matching.",
            "Employee discounts.",
            "Health benefits.",
            "Professional development.",
            "Free lunches.",
            "Coffee.",
            "Hot chocolate.",
            "Even the occasional stainless steel travel mug.",
            "I like to think of it as belonging to the 9-to-5 Club.",
            "There's no membership card.",
            "No secret handshake.",
            "No monthly meeting.",
            "Apparently all you have to do is show up for work.",
            "Some people say employers offer these perks instead of paying higher salaries.",
            "Maybe they're right.",
            "I don't spend much time thinking about it.",
            "If someone wants to buy me lunch, help pay for my retirement, or save me money on something I was already planning to buy, I'm going to smile, say thank you, and enjoy it.",
            "Besides, life is a lot more enjoyable when you stop worrying about why someone is offering you a perk and simply appreciate that they did.",
          ],
        },
        {
          heading: "The benefits you forgot you had",
          paragraphs: [
            "Every workplace is different.",
            "Some companies offer discounts on vehicles, mattresses, clothing, electronics, insurance, hotels, rental cars, cell phone plans, or gym memberships.",
            "Others help pay for courses or professional development.",
            "Many offer retirement matching, massage therapy, physiotherapy, counselling, nutritionists, vision care, dental benefits, prescription shoes, wellness spending accounts, employee assistance programs, or even legal services.",
            "The surprising part isn't that these benefits exist.",
            "It's how many people never use them.",
            "Some have employee discount websites that most people never even open.",
            "I know people who've worked at the same company for years and had no idea their employer even had a discount website.",
            "One conversation with a coworker completely changed the way I looked at workplace perks.",
            "They mentioned buying new tires using an employee discount.",
            "I had no idea our company even offered one.",
            "That sent me down a rabbit hole.",
            "I discovered discounts on hotels, insurance, electronics, and even a mattress company I'd been planning to buy from anyway.",
            "Finding those discounts felt a little like finding money in the pocket of a jacket you hadn't worn since last winter.",
            "It made me wonder how many people are paying full price simply because they never thought to look.",
            "Before you spend your own money, spend five minutes checking what your employer already offers.",
            "It could be one of the easiest ways you'll ever save money.",
          ],
        },
        {
          heading: "The best workplace benefit",
          paragraphs: [
            "If I had to choose just one workplace benefit, retirement matching wins.",
            "Every time.",
            "Imagine walking past a twenty-dollar bill lying on the sidewalk every payday.",
            "Most of us wouldn't.",
            "Yet thousands of people leave retirement matching on the table every year.",
            "If your employer is willing to contribute to your retirement simply because you did, that's one of the easiest financial wins you'll ever get.",
            "It's free money for doing something that's already good for your future.",
            "Health benefits deserve the same attention.",
            "If your plan covers massage therapy and it helps you feel better, book the appointment.",
            "If you've been putting off seeing a nutritionist, check your coverage first.",
            "If you need orthotics or prescription shoes and your plan helps pay for them, use it.",
            "You've already earned those benefits.",
            "There's no prize for leaving them unused.",
          ],
        },
        {
          heading: "Membership has its perks",
          paragraphs: [
            "I don't remember filling out an application.",
            "Nobody handed me a membership card.",
            "There wasn't even a secret handshake.",
            "Apparently all I had to do was show up for work.",
            "Membership comes with some surprisingly nice perks.",
            "If work is buying lunch...",
            "I'm having lunch.",
            "If there's free coffee...",
            "I'll have a coffee.",
            "If there's hot chocolate...",
            "I'll have a cup.",
            "If there are leftovers at the end of the day...",
            "I'm taking some home.",
            "Want another stainless steel travel mug?",
            "Why yes, I do.",
            "One lives in my vehicle.",
            "One never leaves my desk.",
            "One somehow became the official tea mug at home.",
            "I honestly can't remember the last time I bought one.",
            "If that's one of the perks of membership, I'd say the annual dues are pretty reasonable.",
          ],
        },
        {
          heading: "Enjoy the little extras",
          paragraphs: [
            "A few years ago I attended a company event.",
            "At the end of the evening everyone was offered a ride home.",
            "Normally I'd choose the cheapest option.",
            "That night I decided to enjoy the perk.",
            "For a few dollars more I upgraded to the nicer vehicle.",
            "A black SUV pulled up.",
            "It felt a little fancy.",
            "For twenty minutes I pretended I was far more important than I actually am.",
            "Would I normally spend extra for that?",
            "Probably not.",
            "But that night I didn't have to.",
            "Sometimes it's okay to enjoy the little extras that come with the job.",
            "After all, you've already earned them.",
          ],
        },
        {
          heading: "My new habit",
          paragraphs: [
            "Before I buy something expensive, I ask myself one simple question.",
            "\"Does my employer already have a deal for this?\"",
            "Sometimes the answer is no.",
            "Sometimes it's discounted insurance.",
            "Sometimes it's a cheaper hotel.",
            "Sometimes it's employee pricing on electronics.",
            "Sometimes it's a lower gym membership.",
            "Sometimes it's exactly the mattress I was planning to buy anyway.",
            "It only takes a few minutes to check.",
            "Those few minutes can save hundreds of dollars.",
            "Sometimes even thousands over the course of your career.",
            "I also started paying closer attention to the little things.",
            "Free training that teaches a new skill.",
            "A wellness account that helps pay for something I already needed.",
            "A lunch-and-learn where I actually learn something useful.",
            "None of those things make headlines.",
            "None of them feel life changing on their own.",
            "But together they quietly increase the value of every paycheque.",
          ],
        },
        {
          heading: "The hidden paycheque",
          paragraphs: [
            "Most people judge a job by the salary.",
            "I understand why.",
            "It's the easiest number to compare.",
            "But salary is only part of the picture.",
            "Two people earning the same amount can end up in very different financial positions if one takes advantage of workplace benefits and the other ignores them.",
            "One retires with employer matching.",
            "The other doesn't.",
            "One pays less for insurance.",
            "The other pays full price.",
            "One uses their health benefits every year.",
            "The other lets them expire.",
            "Over time those choices add up.",
            "Not because one person earned more.",
            "Because one person kept more.",
            "That's the hidden paycheque.",
            "It's easy to overlook because it never arrives in your bank account.",
            "It shows up as money you didn't have to spend.",
          ],
        },
        {
          heading: "One last thought",
          paragraphs: [
            "Building wealth isn't always about earning a bigger salary.",
            "Sometimes it's about getting the full value from the one you already have.",
            "Check what your employer already offers.",
            "Use the benefits.",
            "Claim the retirement match.",
            "Take advantage of the discounts.",
            "Enjoy the free lunch.",
            "Drink the coffee.",
            "Smile when someone hands you another stainless steel travel mug.",
            "Then do something even more important.",
            "Don't let the money you saved quietly disappear.",
            "Give it a purpose.",
            "Save it.",
            "Invest it.",
            "Pay down debt.",
            "The hidden paycheque isn't just the perks.",
            "It's what those perks allow you to do with the money you didn't have to spend.",
            "That's how small workplace benefits quietly become long-term wealth.",
            "Because every payday is more than the number on your pay stub.",
            "It's every dollar you earned.",
            "Every benefit you claimed.",
            "Every opportunity you chose not to waste.",
            "Every payday is a decision.",
          ],
        },
      ],
    };

    const TWENTY_FIRST_ARTICLE = {
      id: "loud-budgeting-thats-not-where-i-want-my-money-to-go",
      title: "Loud Budgeting: That's Not Where I Want My Money to Go",
      summary: "Loud budgeting is not about being cheap. It is about saying out loud that your money has a better job than keeping up appearances.",
      image: "/article-loud-budgeting.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "LOUD BUDGETING · CHOICE · INTENTIONAL SPENDING",
      alt: "Couple laughing while walking through a furniture store past a white sectional couch",
      caption: "Sometimes the smartest money decision is simply saying the quiet part out loud.",
      quote: {
        strong: "That's not where I want my money to go.",
        text: "Sometimes you can afford something and still decide it isn't worth it.",
      },
      sections: [
        {
          heading: "Just to look",
          paragraphs: [
            "A few months ago, my husband and I wandered into a furniture store just to look.",
            "You know how that goes.",
            "Near the back of the store was a sectional with what felt like a hundred strategically placed cushions.",
            "We sat down for a minute, looked at each other, and thought, this is pretty nice.",
            "Then we found the price tag.",
            "Before I could say a word, my husband blurted out just a little louder than he probably intended.",
            "\"Six thousand dollars?\"",
            "The salespeople scattered.",
            "It was like he'd just waved a piece of kryptonite around the showroom.",
            "I remember thinking, Oh no... we're those customers.",
            "But as we walked back to the car laughing, something occurred to me.",
            "Why was I embarrassed?",
            "We didn't think the couch was worth six thousand dollars.",
            "We weren't buying it.",
            "So why did it feel awkward to say it out loud?",
          ],
        },
        {
          heading: "Loud budgeting",
          paragraphs: [
            "Apparently there's a name for this now.",
            "It's called loud budgeting.",
            "Instead of making excuses or pretending something fits your budget when it doesn't, you simply say so.",
            "\"I can't afford that.\"",
            "Or maybe an even better phrase...",
            "\"That's not where I want my money to go.\"",
            "I actually like that one better.",
            "Because sometimes you can afford something you just don't think it's worth it.",
            "That's a very different conversation.",
          ],
        },
        {
          heading: "The pressure to spend",
          paragraphs: [
            "Think about how often we spend money because we don't want to look cheap.",
            "A friend asks if you'd like to go out for dinner.",
            "Instead of quietly hoping they don't pick the expensive restaurant, what if you said,",
            "\"I'd love to catch up. Would you be up for grabbing coffee instead?\"",
            "Planning a weekend away?",
            "Maybe everyone wants the luxury hotel.",
            "There's nothing wrong with saying,",
            "\"I'd rather stay somewhere simpler and spend the extra money doing something fun together.\"",
            "Someone asks if you'd like to meet for another $8 coffee.",
            "Maybe today you invite them over to your place instead.",
            "The funny thing is, they might be relieved.",
          ],
        },
        {
          heading: "The money silence",
          paragraphs: [
            "For years we've been taught that money is private.",
            "Don't tell people you're struggling.",
            "Don't tell people you're saving.",
            "Don't tell people you passed on something because it was too expensive.",
            "And definitely don't let anyone think you're not doing as well as everyone else.",
            "We've spent decades trying to keep up with the Joneses.",
            "I've always found that expression funny.",
            "I've never actually met a Jones.",
            "Maybe we've been chasing the wrong thing.",
          ],
        },
        {
          heading: "Normalize smart decisions",
          paragraphs: [
            "Maybe instead of trying to look wealthier than we are, we should normalize making smart financial decisions.",
            "Imagine if saying,",
            "\"That's not where I want my money to go.\"",
            "became as normal as saying,",
            "\"I'm busy that day.\"",
            "No awkward excuses.",
            "No pretending.",
            "No pressure.",
            "Just honesty.",
          ],
        },
        {
          heading: "Intentional, not cheap",
          paragraphs: [
            "Here's something I've noticed.",
            "The people who quietly build wealth usually aren't the ones trying to impress everyone.",
            "They're investing.",
            "They're paying off debt.",
            "They're building emergency funds.",
            "They're saving for retirement.",
            "They're making choices today that give them more freedom tomorrow.",
            "That doesn't make them cheap.",
            "It makes them intentional.",
            "I'm not saying never buy the nice couch.",
            "If it genuinely fits your budget and brings you joy, go for it.",
            "But don't spend money just because you feel uncomfortable saying no.",
          ],
        },
        {
          heading: "Say it out loud",
          paragraphs: [
            "The next time someone suggests something that's outside your budget or simply isn't where you want your money to go, try saying it.",
            "You might be surprised how many people were thinking exactly the same thing but didn't want to be the first to admit it.",
            "Maybe loud budgeting isn't really about saying,",
            "\"I can't afford that.\"",
            "Maybe it's about saying,",
            "\"That's not where I want my money to go.\"",
          ],
        },
        {
          heading: "No to one thing, yes to another",
          paragraphs: [
            "Every time we say no to one thing, we're saying yes to something else.",
            "Maybe that's becoming debt free.",
            "Maybe it's an earlier retirement.",
            "Maybe it's a family vacation you've been dreaming about.",
            "Maybe it's simply having enough in the bank to sleep a little better at night.",
            "Keeping up with the Joneses never made anyone wealthy.",
            "Choosing your own path just might.",
            "Because every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_SECOND_ARTICLE = {
      id: "ai-is-changing-the-9-to-5-club-heres-how-to-stay-in-it",
      title: "AI Is Changing the 9-to-5 Club. Here's How to Stay In It.",
      summary: "AI is not the first tool to change work, and it will not be the last. The people who keep learning usually keep earning.",
      image: "/article-ai-9-to-5-club.png",
      readTime: "5 min read",
      category: "Knowledge & Insights",
      kicker: "AI · CAREER · EARNING POWER",
      alt: "Office worker reviewing paper files beside a laptop with an AI chat open",
      caption: "The tools change. The lesson does not: the people who keep learning usually keep earning.",
      quote: {
        strong: "Maybe AI isn't changing the rules of work.",
        text: "Maybe it's simply introducing the next tool we all need to learn.",
      },
      sections: [
        {
          heading: "The old way of finding things",
          paragraphs: [
            "When I first started working in the corporate world, finding information wasn't as simple as opening a browser or asking AI a question.",
            "You actually had to go looking for it.",
            "In one office I worked in, an entire wall was made up of huge sliding filing cabinets.",
            "The outside was covered in thick grey fabric.",
            "To get to the files, you'd grab the handle and pull.",
            "The whole wall would slowly slide open, revealing row after row of folders.",
            "If someone filed a folder in the wrong place...",
            "Poof.",
            "It was practically gone forever.",
            "You'd slide open one section after another hoping to find it.",
            "Sometimes the file wasn't lost.",
            "It was just hiding where nobody thought to look.",
            "Today, I can open an AI tool, type a question, and have an answer in seconds.",
            "That got me thinking.",
            "Maybe AI isn't changing the rules of work.",
            "Maybe it's simply introducing the next tool we all need to learn.",
          ],
        },
        {
          heading: "The 9-to-5 Club is changing",
          paragraphs: [
            "I'd only been using AI for less than a year when something happened that made me laugh.",
            "I opened it to ask a question.",
            "It was down.",
            "I just stared at the screen for a second.",
            "Then I laughed at myself.",
            "It felt like walking into the office and finding the lights wouldn't come on.",
            "You know you can still work.",
            "It just suddenly got a lot harder.",
            "That was an eye-opener.",
            "Apparently I'd become pretty dependent on a tool that hadn't even existed for most of my career.",
            "Then I realized something.",
            "That isn't necessarily a bad thing.",
            "It's exactly what happened when computers replaced typewriters.",
            "When email replaced interoffice mail.",
            "When search engines replaced filing cabinets.",
            "AI is simply the next tool in the line.",
            "There will be another one after it.",
            "There always is.",
          ],
        },
        {
          heading: "The people who keep learning",
          paragraphs: [
            "Every generation has had a new tool to learn.",
            "Computers.",
            "Email.",
            "The internet.",
            "Smartphones.",
            "Now AI.",
            "The tools change.",
            "The lesson doesn't.",
            "The people who keep learning usually keep earning.",
          ],
        },
        {
          heading: "Your biggest financial asset",
          paragraphs: [
            "When people think about investing, they usually think about stocks.",
            "ETFs.",
            "Real estate.",
            "Retirement accounts.",
            "Those are all important.",
            "But I think there's another investment that's even more valuable.",
            "Your ability to earn a paycheque.",
            "Every dollar you'll ever invest starts with your ability to earn it first.",
            "A promotion.",
            "A better job.",
            "A new skill.",
            "Those things don't just increase your knowledge.",
            "They increase your earning power.",
            "And higher earning power makes almost every financial goal a little easier.",
            "Saving.",
            "Investing.",
            "Paying off debt.",
            "Even retirement.",
            "Protecting your ability to earn may be the smartest financial decision you'll ever make.",
          ],
        },
        {
          heading: "Don't compete with AI",
          paragraphs: [
            "Whenever a new technology appears, people ask the same question.",
            "\"Will it replace my job?\"",
            "Maybe parts of some jobs.",
            "History suggests that's happened many times before.",
            "But I think we're asking the wrong question.",
            "Instead, ask yourself this.",
            "\"How can AI help me become better at my job?\"",
            "That's a completely different conversation.",
            "If AI gives you back an hour...",
            "Don't waste it.",
            "Use it to solve bigger problems.",
            "Learn another skill.",
            "Help your team.",
            "That's how technology becomes an advantage instead of a threat.",
          ],
        },
        {
          heading: "Learn while it's free",
          paragraphs: [
            "One of my favourite financial strategies is letting someone else pay.",
            "That applies to learning too.",
            "Before you spend money on a course, check three places.",
            "Your employer.",
            "Your government.",
            "YouTube.",
            "One of them will probably teach you what you want to learn for free.",
            "Many employers reimburse tuition or provide access to learning platforms that employees rarely use.",
            "Governments regularly offer free career training and skills programs.",
            "And YouTube has become one of the biggest classrooms in the world.",
            "There has never been a better time to improve your skills without spending much money.",
            "Take advantage of it.",
          ],
        },
        {
          heading: "Quietly become more valuable",
          paragraphs: [
            "Here's one piece of advice that has served me well.",
            "You don't need to announce you're taking a course.",
            "You don't need to post every certificate online.",
            "You don't need to tell everyone you're learning AI.",
            "Just quietly become more valuable.",
            "Read a book.",
            "Watch a tutorial.",
            "Take a free course.",
            "Keep getting a little better.",
            "Small improvements don't feel like much.",
            "Neither does saving twenty dollars.",
            "But repeat either one often enough, and the results become surprisingly big.",
            "Just like investing.",
            "One day people will wonder how you became so knowledgeable.",
            "They won't see the hundreds of small decisions that got you there.",
          ],
        },
        {
          heading: "Don't forget the human skills",
          paragraphs: [
            "While everyone is talking about AI, I think there's another opportunity.",
            "Become better at being human.",
            "Learn how to communicate.",
            "Build trust.",
            "Solve problems.",
            "Listen.",
            "Those skills have always mattered.",
            "I think they're becoming even more valuable.",
            "The more time we spend looking at screens, the more valuable genuine communication becomes.",
            "AI can help you write a report.",
            "It can't build your reputation.",
            "AI can summarize a meeting.",
            "It can't replace the trust you build by showing up, listening, and helping people.",
            "Technical skills may help you get noticed.",
            "People skills often help you build lasting careers.",
            "The employees who combine both are incredibly valuable.",
          ],
        },
        {
          heading: "Membership has changed",
          paragraphs: [
            "I don't think the 9-to-5 Club is disappearing.",
            "I think it's evolving.",
            "The people who thrive are usually the ones who never stop learning.",
            "They stay curious.",
            "They adapt.",
            "They see change as an opportunity instead of a threat.",
            "That has been true throughout history.",
            "And I think it will still be true long after today's AI tools have been replaced by something even better.",
          ],
        },
        {
          heading: "One last thought",
          paragraphs: [
            "One day you'll collect your final paycheque.",
            "Hopefully it's because you decided it was time.",
            "Not because the world changed and you didn't.",
            "Protect your ability to earn.",
            "Learn the new tools.",
            "Strengthen the skills technology can't replace.",
            "Take the free course your employer offers.",
            "See what free training your government provides.",
            "Spend a little time learning on YouTube instead of scrolling.",
            "Become a little more valuable every year.",
            "The filing cabinets disappeared.",
            "The computers arrived.",
            "AI has arrived.",
            "The next tool is already on its way.",
            "The people who keep learning usually keep earning.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_THIRD_ARTICLE = {
      id: "the-10000-blueprint",
      title: "The $10,000 Blueprint",
      summary: "Saving $10,000 is not magic. It is a framework built from small, intentional decisions that quietly add up.",
      image: "/article-10000-blueprint.png",
      readTime: "7 min read",
      category: "Saving",
      kicker: "SAVING · FRAMEWORKS · MOMENTUM",
      alt: "Notebook with a ten-thousand-dollar savings goal beside a jar of cash, calculator, coffee, and receipts",
      caption: "You do not accidentally save $10,000. You build it one decision at a time.",
      quote: {
        strong: "Most people don't accidentally save $10,000.",
        text: "They accidentally spend it.",
      },
      sections: [
        {
          heading: "The money that disappears",
          paragraphs: [
            "Ten thousand dollars is a lot of money.",
            "It doesn't matter whether you have $100 in your bank account...",
            "...or one million.",
            "It's still $10,000.",
            "You wouldn't throw it in the garbage.",
            "You wouldn't leave it sitting in a shopping cart and hope it was still there tomorrow.",
            "You wouldn't light it on fire.",
            "Yet every year...",
            "Most people don't accidentally save $10,000.",
            "They accidentally spend it.",
            "The scary part is they never meant to.",
            "One Friday night pizza because everyone was tired.",
            "One streaming service that hasn't had a good movie in months... but you're still paying for it.",
            "One trip to the grocery store for milk that somehow became $142.",
            "One thing you didn't need because it was 40% off.",
            "One payday at a time.",
          ],
        },
        {
          heading: "Small decisions become big money",
          paragraphs: [
            "None of those decisions feels like $10,000.",
            "Because they aren't.",
            "They're twenty dollars.",
            "Fifty dollars.",
            "A hundred dollars.",
            "Repeated often enough, they quietly become $10,000.",
            "The good news?",
            "Saving money works exactly the same way.",
            "Nobody wakes up one morning and magically discovers an extra $10,000 sitting in their savings account.",
            "They build it.",
            "One intentional decision at a time.",
            "That's what this article is about.",
            "Not budgeting.",
            "Not depriving yourself.",
            "Not feeling guilty every time you buy something.",
            "It's about building a simple framework that turns hundreds of small decisions into one very big result.",
            "Because wealth isn't usually built by one giant decision.",
            "It's built by hundreds of little ones that barely seem important at the time.",
          ],
        },
        {
          heading: "The 1040 framework",
          paragraphs: [
            "At 1040 Paydays, we like frameworks.",
            "Not because they're exciting.",
            "Because they work.",
            "If you wanted to build a house, you wouldn't start with the roof.",
            "You'd start with the blueprint.",
            "If you wanted to take a road trip across the country, you wouldn't just start driving and hope you ended up where you wanted to be.",
            "You'd map the route first.",
            "Saving money should be no different.",
            "Most people decide they want to save more.",
            "Then they hope.",
            "Hope they'll spend less.",
            "Hope there will be something left at the end of the month.",
            "Hope they'll somehow become more disciplined.",
            "Hope is not a financial plan.",
            "Instead, build the framework first.",
            "Then follow it.",
          ],
        },
        {
          heading: "Build the plan before you pick the date",
          paragraphs: [
            "Most financial goals start with a deadline.",
            "\"I want to save $10,000 this year.\"",
            "Maybe you will.",
            "Maybe you won't.",
            "Instead, forget the calendar for a few minutes.",
            "Start with a blank piece of paper.",
            "At the top write:",
            "Goal: $10,000",
            "Nothing else.",
            "Don't write a start date.",
            "Don't write a finish date.",
            "Not yet.",
            "Now ask yourself one question.",
            "Where is every dollar going to come from?",
            "Be specific.",
            "Don't write \"spend less.\"",
            "Write exactly what you'll do.",
          ],
        },
        {
          heading: "Find the $10,000",
          paragraphs: [
            "Your list might look something like this:",
            "Return bottles and cans: $42.",
            "Cancel cable TV for two months: $180.",
            "Cancel a streaming service you barely watch: $168.",
            "Pack lunch for work twice a week: $900.",
            "Shop the freezer before buying more groceries: $450.",
            "Sell the old bike collecting dust in the garage: $300.",
            "Put your tax refund into savings: $1,500.",
            "Save $250 from every payday: $6,000.",
            "Keep adding ideas until you know exactly where your $10,000 is going to come from.",
            "The numbers don't have to be perfect.",
            "You'll adjust them as life happens.",
            "The important thing is that you're building a roadmap instead of making a wish.",
          ],
        },
        {
          heading: "Let the plan choose the date",
          paragraphs: [
            "Once you've built your framework, read through it again.",
            "Some savings happen once.",
            "Some happen every payday.",
            "Some happen every month.",
            "Now your framework can answer a question that most people guess at.",
            "How long will this actually take?",
            "Only now should you write:",
            "Start Date: __________________",
            "Target Completion Date: __________________",
            "You didn't pick a random date because it sounded good.",
            "You let your plan choose it.",
            "Maybe your goal takes nine months.",
            "Maybe fourteen.",
            "Maybe two years.",
            "That's okay.",
            "This isn't a competition.",
            "This is reality.",
            "Your income is different.",
            "Your bills are different.",
            "Your responsibilities are different.",
            "So why would your timeline look exactly like someone else's?",
            "Don't borrow another person's finish line.",
            "Build your own.",
            "Then commit to it.",
          ],
        },
        {
          heading: "Keep the finish line",
          paragraphs: [
            "When unexpected money comes in, don't move the goal to $10,500.",
            "A tax refund.",
            "Birthday money.",
            "Overtime.",
            "Something you sold online.",
            "Keep the finish line exactly where it is.",
            "Simply cross another item off your framework.",
            "Progress should make the finish line feel closer, not farther away.",
          ],
        },
        {
          heading: "Protect what you build",
          paragraphs: [
            "As you start checking items off your list, don't leave the money sitting in the same account you use for groceries, gas, and everyday spending.",
            "Open a separate no-fee savings account.",
            "Every dollar you save goes there.",
            "Bottle returns.",
            "Tax refunds.",
            "Bonuses.",
            "Birthday money.",
            "The money from selling things you no longer use.",
            "Everything.",
            "Your everyday account is for spending.",
            "This account is for building your future.",
            "Watching that balance grow is one of the best forms of motivation you'll ever find.",
            "Because after a while, something changes.",
            "You stop hoping you'll save money.",
            "You expect to.",
            "Not because you became richer.",
            "Not because you became luckier.",
            "Because you finally had a plan.",
            "And plans have a funny way of turning ordinary paydays into extraordinary results.",
          ],
        },
        {
          heading: "The small decisions that change everything",
          paragraphs: [
            "One of the biggest mistakes people make is waiting for the perfect time to start saving.",
            "After the next raise.",
            "After the next tax refund.",
            "After the kids are older.",
            "After the car is paid off.",
            "After Christmas.",
            "After summer.",
            "There is always another after.",
            "The problem is that life rarely gets cheaper.",
            "If anything, it gets more expensive.",
            "That's why I like building the framework first.",
            "It doesn't depend on life becoming easier.",
            "It works with the life you have today.",
            "Some of the ideas on your list might save you five dollars.",
            "Some might save you five hundred.",
            "Both matter.",
            "One isn't better than the other.",
            "They're simply different pieces of the same goal.",
          ],
        },
        {
          heading: "Don't chase perfection",
          paragraphs: [
            "Here's something that surprised me.",
            "You don't actually have to follow your framework perfectly to reach your goal.",
            "Life is going to happen.",
            "The furnace will quit.",
            "The dog will need to see the vet.",
            "A tire will need replacing.",
            "Someone will have a birthday.",
            "You'll forget your lunch one morning and buy one instead.",
            "None of that means your framework failed.",
            "It means you're living a normal life.",
            "When something doesn't go according to plan, don't throw away the entire framework.",
            "Adjust it.",
            "Maybe you save a little less this month.",
            "Maybe you make it up next month.",
            "Maybe you sell something you weren't planning to sell.",
            "The goal isn't perfection.",
            "The goal is progress.",
          ],
        },
        {
          heading: "Every unexpected dollar has a job",
          paragraphs: [
            "One of my favourite rules is this:",
            "Before unexpected money reaches your chequing account...",
            "Decide where it's going.",
            "Tax refund?",
            "Savings.",
            "Birthday money?",
            "Savings.",
            "Work bonus?",
            "Savings.",
            "Sold something on Marketplace?",
            "Savings.",
            "Bottle return?",
            "Savings.",
            "If you let unexpected money sit in your everyday account, it quietly becomes part of your spending.",
            "You don't even notice.",
            "One grocery trip.",
            "One weekend.",
            "One online order.",
            "It's gone.",
            "Give those dollars a job before they have a chance to disappear.",
          ],
        },
        {
          heading: "Make saving automatic",
          paragraphs: [
            "If you have to remember to save money every payday, eventually you'll forget.",
            "Or you'll convince yourself you'll do it next time.",
            "Take the decision away.",
            "Set up an automatic transfer.",
            "Even if it's only twenty-five dollars.",
            "The amount matters less than the habit.",
            "Once it becomes automatic, your framework starts working even when you're busy.",
            "That's one less decision you have to make.",
          ],
        },
        {
          heading: "Celebrate the small wins",
          paragraphs: [
            "Most people wait until they've reached the finish line before celebrating.",
            "I think that's backwards.",
            "Celebrate the first hundred dollars.",
            "Celebrate the first thousand.",
            "Celebrate crossing something off your framework.",
            "Not with an expensive shopping trip.",
            "Just take a moment to notice.",
            "Progress feels good.",
            "And people who notice progress usually keep making it.",
          ],
        },
        {
          heading: "Don't compare your framework",
          paragraphs: [
            "Someone else might save $10,000 in six months.",
            "Good for them.",
            "Someone else might need three years.",
            "Good for them too.",
            "Your framework isn't competing with theirs.",
            "It's competing with yesterday's version of you.",
            "If today you're more intentional with your money than you were last month...",
            "You're winning.",
            "If you've stopped wondering where your paycheque went...",
            "You're winning.",
            "If you've started building savings instead of hoping they'll magically appear...",
            "You're winning.",
            "Money isn't about impressing strangers.",
            "It's about creating options for yourself and your family.",
          ],
        },
        {
          heading: "One day you'll notice something strange",
          paragraphs: [
            "One morning you'll log into your savings account.",
            "Not because you're expecting anything special.",
            "Just because you're checking your balance.",
            "And you'll notice something.",
            "There's more money there than you've ever had before.",
            "Not because you won the lottery.",
            "Not because someone left you an inheritance.",
            "Not because you suddenly doubled your salary.",
            "Because hundreds of ordinary decisions quietly added up.",
            "The bottle returns.",
            "The packed lunches.",
            "The cancelled subscriptions.",
            "The freezer meals.",
            "The overtime shift.",
            "The tax refund.",
            "The things you sold instead of storing for another ten years.",
            "None of those decisions changed your life.",
            "Together...",
            "They did.",
          ],
        },
        {
          heading: "You built it",
          paragraphs: [
            "That's why I don't believe people become financially stronger because they're lucky.",
            "I think they become financially stronger because they become intentional.",
            "They stop asking,",
            "\"How am I ever going to save $10,000?\"",
            "And they start asking,",
            "\"What's the next decision that gets me there?\"",
            "That's a question almost everyone can answer.",
            "And when you answer it often enough...",
            "The impossible slowly becomes inevitable.",
            "So build your framework.",
            "Follow it.",
            "Adjust it when life changes.",
            "Protect the money you've already saved.",
            "And don't move the finish line just because you're making progress.",
            "One day you'll write one final checkmark beside the last item on your list.",
            "You'll look at your savings account.",
            "You'll see $10,000 sitting there.",
            "And you'll realize something.",
            "You didn't find it.",
            "You didn't inherit it.",
            "You didn't accidentally save it.",
            "You built it.",
            "One decision at a time.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_FOURTH_ARTICLE = {
      id: "you-saved-3-and-lost-30000",
      title: "You Saved $3 and Lost $30,000",
      summary: "The little savings feel good, but the biggest financial decisions deserve the most attention.",
      image: "/article-saved-3-lost-30000.png",
      readTime: "4 min read",
      category: "Financial Basics",
      kicker: "FINANCIAL BASICS · RENEWALS · ATTENTION",
      alt: "Man reviewing renewal paperwork at a kitchen table with a calculator and bills",
      caption: "The biggest financial decisions we make should get the most attention, not the least.",
      quote: {
        strong: "The biggest financial decisions we make should get the most attention,",
        text: "not the least.",
      },
      sections: [
        {
          heading: "The paperwork that feels too easy",
          paragraphs: [
            "Every few years my mortgage comes up for renewal.",
            "The paperwork arrives already filled out.",
            "The bank has done all the work.",
            "In many cases, all I have to do is sign it and send it back.",
            "Simple.",
            "Convenient.",
            "Maybe a little too convenient.",
            "There's a part of me that just wants to get it over with.",
            "I already own the house.",
            "There's no excitement, no open houses, no moving trucks and no new keys.",
            "No ordering pizza and sitting on the living room floor because the furniture hasn't arrived yet.",
            "It's just another stack of paperwork after a long day at work.",
          ],
        },
        {
          heading: "The backwards part",
          paragraphs: [
            "The funny thing is that many of us will drive across town because one store has shampoo on sale.",
            "We'll stand in the aisle comparing two nearly identical bottles.",
            "We'll check the store app, pull out a coupon and happily spend twenty minutes trying to save three dollars.",
            "We walk out feeling like we won.",
            "Then we come home and give one of the biggest financial decisions of our lives about thirty seconds.",
            "I think we've got that backwards.",
            "The biggest financial decisions we make should get the most attention, not the least.",
          ],
        },
        {
          heading: "The renewal is only an offer",
          paragraphs: [
            "Every time my mortgage comes up for renewal, I remind myself that the paper in my mailbox is simply an offer.",
            "It isn't automatically the best rate.",
            "It isn't the only option.",
            "Before I make a decision, I spend a few minutes doing my homework.",
            "I look up current mortgage rates.",
            "I call my bank and ask if they can do any better.",
            "Sometimes I contact a mortgage broker.",
            "Most brokers don't charge you directly because they're paid by the lender.",
            "They can compare rates from several companies and tell you what else is available.",
            "It doesn't take hours.",
            "You don't have to become a financial expert.",
          ],
        },
        {
          heading: "Twenty minutes can matter",
          paragraphs: [
            "Imagine you have a $450,000 mortgage.",
            "Your bank offers you 5.5% on your renewal.",
            "You spend twenty minutes checking around and find 5.0% instead.",
            "That half percent doesn't sound like much.",
            "On a mortgage that size, it could save you thousands of dollars in interest over the next five years.",
            "Keep making smart renewal decisions over the life of your mortgage and those savings can easily grow into tens of thousands of dollars.",
            "Twenty minutes for thirty thousand dollars.",
            "That's a pretty good hourly wage.",
          ],
        },
        {
          heading: "Insurance works the same way",
          paragraphs: [
            "The exact same thing happens with our home and car insurance.",
            "About a month before your policies renew, a big white envelope shows up in the mailbox.",
            "Inside are pages of changes, an updated premium and the date the new terms take effect.",
            "Most of us don't sit down and read every page.",
            "We glance at the price.",
            "Maybe we notice it went up a little.",
            "Maybe we shrug our shoulders and think, \"Insurance always goes up.\"",
            "Then we put it aside.",
            "You probably won't save thirty thousand dollars on your insurance.",
            "But you might save a few hundred.",
            "The idea is exactly the same.",
          ],
        },
        {
          heading: "Ask before you accept",
          paragraphs: [
            "Instead of assuming the price hike is just the way it is, spend a few minutes asking questions.",
            "Has anything changed that qualifies you for a discount?",
            "Is the coverage still right for you?",
            "Can they offer a loyalty rate?",
            "What are other companies charging for the exact same history?",
            "You don't have to switch companies every year.",
            "Sometimes your current insurer really is the best choice.",
            "The point isn't that you have to switch.",
            "The point is that you looked.",
          ],
        },
        {
          heading: "Why renewals are so quiet",
          paragraphs: [
            "Have you ever wondered why it's so hard to get a mortgage or an insurance policy in the first place?",
            "There are applications to complete, income to verify, credit checks to run and pages of paperwork to sign.",
            "The bank wants to understand every detail before deciding whether to lend you hundreds of thousands of dollars.",
            "Insurance companies ask about your history, your property and a long list of risk factors before they decide what to charge.",
            "They look at everything.",
            "Then renewal time comes.",
            "Suddenly it's effortless.",
            "A letter shows up in the mail.",
            "Or an email lands in your inbox.",
            "\"Here are your new terms.\"",
            "\"Here is your new premium.\"",
            "That's because the hard work has already been done.",
          ],
        },
        {
          heading: "Make it your decision",
          paragraphs: [
            "The lender already has your mortgage.",
            "The insurance company already has your business.",
            "Now the cost of not paying attention falls on you.",
            "If you don't slow down, ask a few questions or compare your options, you could end up paying more than you need to simply because it was easier.",
            "That doesn't mean your current providers are trying to trick you.",
            "They may very well be giving you a fair deal.",
            "But you won't know unless you take a few minutes to find out.",
            "Stay if it's the best deal.",
            "Leave if it isn't.",
            "Just make sure it was your decision.",
          ],
        },
        {
          heading: "How to take your twenty minutes back",
          paragraphs: [
            "The next time a renewal letter lands on your counter, don't just sign it.",
            "Call your current provider, get a real person on the phone and say something like this:",
            "\"I've enjoyed being a customer, but I'm reviewing my expenses and noticed my renewal went up. Before I start calling around, I wanted to see if there's any flexibility on the premium or the interest rate.\"",
            "Maybe nothing changes.",
            "Maybe they tell you the rate is already the best they can offer.",
            "That's okay.",
            "Twenty minutes is a small price to pay for knowing.",
            "Because sometimes you save three dollars.",
            "Sometimes you save three hundred.",
            "And once in a while, you save thirty thousand.",
          ],
        },
        {
          heading: "One last thought",
          paragraphs: [
            "I'm still going to celebrate saving three dollars on shampoo.",
            "Every little bit helps.",
            "I just don't want the little savings to distract me from the massive ones.",
            "If you're willing to spend twenty minutes saving three dollars, be willing to spend twenty minutes saving thirty thousand.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_FIFTH_ARTICLE = {
      id: "my-sofa-isnt-broken",
      title: "My Sofa Isn't Broken",
      summary: "A worn-in sofa can teach a quiet lesson about trends, replacement, and knowing when enough is still enough.",
      image: "/article-my-sofa-isnt-broken.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · CONTENTMENT · INTENTION",
      alt: "A worn brown leather sofa with a dog sleeping by the window",
      caption: "Sometimes the smartest purchase you can make is not making one at all.",
      quote: {
        strong: "My sofa isn't worn out.",
        text: "It's well used. There's a difference.",
      },
      sections: [
        {
          heading: "Let me tell you about my sofa",
          paragraphs: [
            "Let me tell you about my sofa.",
            "It's leather.",
            "Before this one, I had a big, fluffy brown fabric sofa that I bought at a garage sale.",
            "That sofa saw a lot of life before me.",
            "And it saw a lot of life after me.",
            "It moved with me.",
            "Friends sat on it.",
            "I watched hockey games on it.",
            "It survived late nights, lazy Sundays and more than a few takeout meals.",
            "Eventually I let it go, not because it was worn out, but because it was big, bulky and I needed the space.",
            "Someone else bought it and gave it another home.",
          ],
        },
        {
          heading: "Still a comfortable place to sit",
          paragraphs: [
            "Now I have this leather sofa.",
            "It wasn't the most expensive one in the store when I bought it, and it certainly isn't the nicest leather sofa you could buy today.",
            "If you look closely, you'll see a few loose threads.",
            "The leather has wrinkles from years of movie nights, afternoon naps and everyday life.",
            "My dog has claimed one corner by the window as his spot.",
            "That cushion has a permanent dent because that's where he curls up every day to watch the world go by.",
            "Some people would probably look at it and think it's time for a new sofa.",
            "I look at it and think,",
            "\"It's still a pretty comfortable place to sit.\"",
          ],
        },
        {
          heading: "When normal wear starts looking wrong",
          paragraphs: [
            "Somewhere along the way, we started believing that normal wear means it's time to replace something.",
            "A wrinkle in the leather.",
            "A scratch on the dining room table.",
            "Neither one changes what it was made to do.",
            "But turn on the television and a designer is telling you brown furniture is out.",
            "Open a magazine and there's a new decorating trend.",
            "Scroll through social media and every living room looks like nobody has ever actually lived there.",
            "It doesn't take long before you start looking around your own house and thinking something is missing.",
            "The funny thing is, nothing in your house changed.",
            "The trend did.",
          ],
        },
        {
          heading: "The excitement fades",
          paragraphs: [
            "Buying something new feels good.",
            "For a little while.",
            "You picture it in your living room.",
            "You imagine how nice it will look.",
            "Then life happens.",
            "The dog finds his favourite spot.",
            "Someone spills coffee.",
            "The leather wrinkles.",
            "Before long, your brand new sofa is simply... your sofa.",
            "The excitement fades.",
            "The payments don't.",
          ],
        },
        {
          heading: "Furniture used to be expected to last",
          paragraphs: [
            "I think we've forgotten something.",
            "People used to buy furniture expecting it to last.",
            "A dining room table collected scratches from family dinners.",
            "A rocking chair sat in the same corner for decades.",
            "A dresser was handed down to the next generation.",
            "Furniture wasn't expected to stay perfect.",
            "It was expected to last.",
            "Today, it sometimes feels like the smallest sign of wear becomes an excuse to start shopping again.",
          ],
        },
        {
          heading: "Well used is not worn out",
          paragraphs: [
            "My sofa isn't worn out.",
            "It's well used.",
            "There's a difference.",
            "One day it really will wear out.",
            "The springs will give up.",
            "The frame might crack.",
            "The leather may finally wear through.",
            "When that day comes, I'll replace it.",
            "Not because it has wrinkles.",
            "Because it has finished doing the job I bought it to do.",
          ],
        },
        {
          heading: "The money can do something else",
          paragraphs: [
            "Until then, the wrinkles can stay.",
            "The loose threads can stay.",
            "My dog's favourite spot can stay exactly where it is.",
            "Those aren't flaws.",
            "They're reminders that this house has been lived in.",
            "Replacing a perfectly good sofa could easily cost a few thousand dollars.",
            "I'd rather keep that money.",
            "It can help pay down the mortgage.",
            "It can grow in an investment account.",
            "It can pay for a family vacation.",
            "Or it can simply stay in my account until I actually need it.",
          ],
        },
        {
          heading: "One question before you replace it",
          paragraphs: [
            "The next time you find yourself looking at something you own and thinking it doesn't look perfect anymore, ask yourself one question.",
            "Is it worn out?",
            "Or have I just gotten used to looking at it?",
            "Those are two very different things.",
            "Sometimes the smartest purchase you can make...",
            "...isn't making one at all.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_SIXTH_ARTICLE = {
      id: "buying-clothes-didnt-use-to-be-a-hobby",
      title: "Buying Clothes Didn't Use to Be a Hobby",
      summary: "A closet full of clothes can reveal how easily shopping shifts from a need into a routine.",
      image: "/article-buying-clothes-hobby.png",
      readTime: "4 min read",
      category: "Saving",
      kicker: "SAVING · HABITS · CONTENTMENT",
      alt: "A simple closet illustration with shirts, shoes, and a reminder to buy only what is needed",
      caption: "The best shirt in your closet may be the one that is already paid for.",
      quote: {
        strong: "You bought clothes because you needed clothes.",
        text: "Not because buying clothes had become entertainment.",
      },
      sections: [
        {
          heading: "Back to school shopping",
          paragraphs: [
            "When I was a kid, there was back to school shopping.",
            "That was just what you did.",
            "A few new shirts.",
            "A pair of jeans.",
            "Maybe a sweater.",
            "If you were lucky, a new pair of shoes.",
            "Then you wore them.",
            "You didn't expect another shopping trip a month later.",
            "Kids are hard on clothes.",
            "We climbed trees.",
            "We played sports.",
            "We slid across playgrounds.",
            "We ripped the knees out of our jeans.",
            "We actually wore our clothes out.",
          ],
        },
        {
          heading: "My closet has not complained",
          paragraphs: [
            "Things are a little different now.",
            "As an adult, I still have shirts hanging in my closet that I bought years ago.",
            "Some of them are my favourites.",
            "They still fit.",
            "They still look good.",
            "And unlike when I was ten years old, I'm not rolling around on a playground every afternoon wearing holes through my jeans.",
            "So why would I need new clothes every month?",
          ],
        },
        {
          heading: "When did this become normal?",
          paragraphs: [
            "Every so often I see someone online talking about a ninety day no clothes shopping challenge.",
            "Every time I read one, I have the same thought.",
            "When did buying clothes every month become normal?",
            "I don't remember anyone doing that when I was growing up.",
            "You bought clothes because you needed clothes.",
            "Not because another season rolled around.",
            "Not because someone on social media was wearing a different colour.",
            "Not because a magazine said skinny jeans were out and wide leg jeans were in.",
          ],
        },
        {
          heading: "Shopping became entertainment",
          paragraphs: [
            "Somewhere along the way, shopping stopped being something we did when we needed something.",
            "It became entertainment.",
            "It became something to do when we were bored.",
            "It became a reward after a hard week.",
            "It became something to scroll through before bed.",
            "Just because a new style is everywhere doesn't mean I need to own it.",
            "Sometimes I think clothing companies and influencers expect us to dress like we're walking a red carpet every weekend.",
            "The reality is, most of my walking is between my desk, the bathroom and the kitchen.",
            "Nobody has ever chased me with a camera because my shirt was from three years ago.",
          ],
        },
        {
          heading: "Most of us already have clothes",
          paragraphs: [
            "The funny thing is, most of us already have a closet full of clothes.",
            "If someone told me I couldn't buy another shirt for six months, I honestly don't think my life would change very much.",
            "I already have more shirts than I wear.",
            "I think a lot of us do.",
            "I'm not saying never buy new clothes.",
            "Of course we should.",
            "Clothes wear out.",
            "Sometimes you start a new job.",
            "Sometimes your size changes.",
            "Sometimes you need something a little nicer for a wedding or another special occasion.",
            "Those are all good reasons to buy clothes.",
            "Being bored isn't.",
            "Neither is scrolling through your phone on a Tuesday night.",
          ],
        },
        {
          heading: "Forty dollars becomes a routine",
          paragraphs: [
            "Maybe it's only forty dollars here.",
            "Seventy dollars there.",
            "A jacket you didn't really need.",
            "A pair of shoes that looked great in the store but hardly ever leave the closet.",
            "None of those purchases feels like a big deal.",
            "The part that worries me isn't the forty dollars.",
            "It's what happens after that purchase becomes part of your routine.",
            "If buying a new shirt every month starts to feel normal, you'll probably keep doing it next year.",
            "And the year after that.",
            "That's how lifestyle creep works.",
            "Not with one big purchase.",
            "With dozens of little ones that quietly become part of your monthly life.",
          ],
        },
        {
          heading: "Normal stops getting questioned",
          paragraphs: [
            "The funny thing is, once something feels normal, you stop questioning it.",
            "You don't wake up one morning and decide to spend an extra thousand dollars a year on clothes.",
            "It just happens.",
            "One shirt.",
            "One pair of shoes.",
            "One sale.",
            "One online order.",
            "Then one day you open the closet and realize you have more clothes than you could wear in weeks.",
          ],
        },
        {
          heading: "Money waits for something more important",
          paragraphs: [
            "Money doesn't disappear when you decide not to spend it.",
            "It simply waits for something more important.",
            "Maybe that's paying down your mortgage.",
            "Maybe it's replacing your furnace when it finally quits.",
            "Maybe it's taking your family on a vacation you'll still be talking about years from now.",
            "Or maybe it's simply knowing that when life throws you a surprise bill, you don't have to panic.",
            "I think that's a much better feeling than owning another shirt.",
          ],
        },
        {
          heading: "What we call normal",
          paragraphs: [
            "I think the bigger issue isn't even the money.",
            "It's what we've quietly started calling normal.",
            "If buying clothes every month feels normal, then not buying them starts to feel like you're missing out.",
            "But maybe we've just forgotten what normal used to look like.",
            "When I was growing up, back to school shopping wasn't a challenge.",
            "It was simply how people bought clothes.",
            "Maybe we don't need another ninety day challenge.",
            "Challenges end.",
            "Habits don't.",
          ],
        },
        {
          heading: "The one already paid for",
          paragraphs: [
            "I'd rather build a life where buying clothes only when I need them feels normal than spend ninety days counting how long it's been since my last purchase.",
            "My closet certainly hasn't complained.",
            "Neither has my bank account.",
            "In fact, the best shirt in my closet isn't the newest one.",
            "It's the one that's already paid for.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_SEVENTH_ARTICLE = {
      id: "the-most-valuable-asset-youll-ever-own",
      title: "The Most Valuable Asset You'll Ever Own",
      summary: "Your most valuable asset is not your house or investment account. It is your ability to earn the paychecks that fund everything else.",
      image: "/article-most-valuable-asset.png",
      readTime: "4 min read",
      category: "Financial Basics",
      kicker: "FINANCIAL BASICS · CAREER · INCOME",
      alt: "A desk with a paycheck, resume, notebook, and simple chart showing income growth",
      caption: "Before you buy another investment, invest in the person buying it.",
      quote: {
        strong: "Your paycheck is the engine behind every financial goal you have.",
        text: "Without it, everything else eventually runs out of fuel.",
      },
      sections: [
        {
          heading: "The asset that pays for every other asset",
          paragraphs: [
            "Ask someone what their most valuable asset is and you'll probably hear the same answers.",
            "Their house.",
            "Their investments.",
            "Maybe their business.",
            "Those are all valuable.",
            "But there's one asset that quietly pays for every one of them.",
            "It's you.",
            "More specifically, it's your ability to earn an income over your next 1,040 paydays.",
            "Every mortgage payment you've ever made.",
            "Every investment you've ever bought.",
            "Every vacation you've ever taken.",
            "Every dollar started with your ability to earn it.",
          ],
        },
        {
          heading: "The delayed paycheck",
          paragraphs: [
            "I learned that lesson early in my career.",
            "I was working through a temporary agency when my manager went on vacation.",
            "No one else could approve my hours.",
            "My paycheck was delayed.",
            "It didn't take long to figure out what my most valuable asset really was.",
            "I wasn't thinking about buying a house.",
            "I wasn't thinking about retirement.",
            "I wasn't thinking about investing.",
            "I was thinking about my paycheck.",
            "That's when it hit me.",
            "Your paycheck is the engine behind every financial goal you have.",
            "Without it, everything else eventually runs out of fuel.",
            "If you're going to invest in anything, start there.",
          ],
        },
        {
          heading: "The raise that can change hundreds of future paydays",
          paragraphs: [
            "Your performance review is one of the few opportunities each year to increase your salary.",
            "Don't treat it like just another meeting.",
            "I've watched people spend weeks researching the perfect barbecue or the next vehicle they want to buy.",
            "Then they walk into the meeting that determines their salary with no preparation at all.",
            "That never made much sense to me.",
            "If your company provides guidance on how to prepare for your review, follow it.",
            "Throughout the year, keep a record of what you've accomplished.",
            "Write down the projects you completed.",
            "The problems you solved.",
            "Money or time you saved the company.",
            "Positive feedback you received.",
            "Extra responsibilities you accepted.",
            "Training or certifications you completed.",
            "When review time comes, you won't be relying on memory.",
            "You'll have the evidence.",
          ],
        },
        {
          heading: "Small raises keep paying",
          paragraphs: [
            "Maybe the result is only a 3% raise.",
            "That doesn't sound exciting until you do the math.",
            "On a $60,000 salary, that's another $1,800 every year.",
            "If you invested that extra $1,800 every year and earned an average return of 6%, you would have roughly $70,000 after 20 years.",
            "One conversation.",
            "One raise.",
            "One decision that quietly changes hundreds of future paydays.",
            "Small raises don't just increase your next paycheck.",
            "They increase every paycheck that follows.",
          ],
        },
        {
          heading: "Becoming more valuable in a changing workplace",
          paragraphs: [
            "Have you ever noticed your workplace is a little like a television series?",
            "Every season the cast changes.",
            "People retire.",
            "New people get hired.",
            "Managers come and go.",
            "Technology changes.",
            "The story keeps moving whether you're ready or not.",
            "Don't spend your career as the background character who never changes.",
            "Keep learning so you're ready when the next season starts.",
            "That doesn't always mean another degree.",
            "Sometimes it's learning new software.",
            "Taking a certification.",
            "Improving your communication skills.",
            "Learning how AI can make you more productive.",
            "Or simply becoming the person everyone depends on when something goes wrong.",
            "The more problems you can solve, the more valuable you become.",
          ],
        },
        {
          heading: "Keep your resume alive, not archived",
          paragraphs: [
            "Most people update their resume after they've decided they need another job.",
            "By then they're rushing.",
            "Spend ten minutes updating it every few months instead.",
            "Add your newest accomplishments.",
            "New responsibilities.",
            "Training you've completed.",
            "Software you've learned.",
            "Opportunity rarely gives much notice.",
            "It's easier to stay ready than it is to get ready.",
          ],
        },
        {
          heading: "Know what your skills are worth",
          paragraphs: [
            "While you're updating your resume, spend a few minutes looking at what people with your experience are earning.",
            "Comfort is expensive.",
            "Every few years, find out what your skills are worth.",
            "Look at job postings.",
            "Talk to recruiters.",
            "Apply for a position that genuinely interests you.",
            "Not because you're planning to leave.",
            "Because it's important to know what the market thinks your experience is worth.",
            "Sometimes the biggest raise you'll ever receive comes from changing employers.",
            "Even if you stay exactly where you are, knowing your value makes you a better negotiator.",
          ],
        },
        {
          heading: "The investment that funds all your other investments",
          paragraphs: [
            "Most people spend years increasing the value of their house.",
            "Maintaining their vehicle.",
            "Growing their investment portfolio.",
            "Those are all smart financial decisions.",
            "But none of them produce your next paycheck.",
            "You do.",
            "The day my paycheck was delayed at that temporary agency, I learned something I'll never forget.",
            "My house wasn't my most valuable asset.",
            "My vehicle wasn't my most valuable asset.",
            "My retirement account wasn't my most valuable asset.",
            "My ability to earn an income was.",
            "Everything else depended on it.",
            "Twenty years later, I still believe that's true.",
          ],
        },
        {
          heading: "Invest in the person earning the money",
          paragraphs: [
            "The greatest financial investment you can make isn't always in the stock market.",
            "Sometimes it's in the person earning the money to invest.",
            "Before you buy another investment, invest in the person buying it.",
            "Because the most valuable asset you'll ever own is the one that earns every one of your 1,040 paydays.",
            "Every payday is a decision.",
            "Choose yours.",
          ],
        },
      ],
    };

    const TWENTY_EIGHTH_ARTICLE = {
      id: "the-simplest-explanation-of-compound-interest",
      title: "The Simplest Explanation of Compound Interest",
      summary: "Compound interest is not complicated. It is growth creating more growth, and time is what lets it become powerful.",
      image: "/article-compound-interest.png",
      readTime: "5 min read",
      category: "Investing",
      kicker: "INVESTING · COMPOUNDING · TIME",
      alt: "A simple illustration of a snowball rolling downhill beside an investment growth chart",
      caption: "Compound interest begins when the money you've already earned starts earning money too.",
      quote: {
        strong: "Growth creates more growth.",
        text: "That's the whole idea.",
      },
      sections: [
        {
          heading: "The concept I wish I learned sooner",
          paragraphs: [
            "If I could teach my younger self one financial concept, it wouldn't be budgeting.",
            "It wouldn't be debt.",
            "It wouldn't even be investing.",
            "It would be compound interest.",
            "Not because it's complicated.",
            "Because it isn't.",
            "It's because understanding compound interest changes the way you look at money for the rest of your life.",
            "Most people have heard the term.",
            "People say it's the secret to building wealth.",
            "Some even call it the eighth wonder of the world.",
            "But if you asked ten people to explain what it actually means, I think most would struggle.",
            "The truth is, it isn't complicated.",
            "In fact, once you understand it, you'll probably wonder why no one explained it this way before.",
          ],
        },
        {
          heading: "What is interest?",
          paragraphs: [
            "Let's start with something even simpler.",
            "Imagine I lend you $100.",
            "A year later you give me back my $100.",
            "Plus another $5 for letting you use my money.",
            "That extra $5 is called interest.",
            "Interest is simply the cost of borrowing money.",
            "It also works the other way around.",
            "When you put money into a savings account, buy a Guaranteed Investment Certificate, purchase a bond, or invest in the stock market, your money has the opportunity to earn money instead of costing you money.",
            "Instead of paying someone for the use of their money, someone is paying you for the use of yours.",
          ],
        },
        {
          heading: "What is an interest rate?",
          paragraphs: [
            "An interest rate tells you how much you earn or pay over a period of time.",
            "If an investment earns 5% over one year, you'll earn about $5 for every $100 invested.",
            "If it earns 10%, you'll earn about $10 for every $100 invested.",
            "The higher the return, the faster your money has the potential to grow.",
            "Notice I said potential.",
            "That's an important word.",
            "Some investments have a guaranteed interest rate.",
            "Others don't.",
            "The stock market doesn't promise you'll earn the same return every year.",
            "Some years your investments might lose 25%.",
            "Other years they might gain 30%.",
            "Most years fall somewhere in between.",
            "That's normal.",
          ],
        },
        {
          heading: "What is the S&P 500?",
          paragraphs: [
            "When people talk about the stock market, they're often referring to the S&P 500.",
            "The S&P 500 isn't one company.",
            "It's an index made up of approximately 500 of the largest publicly traded companies in the United States.",
            "Companies like Apple.",
            "Microsoft.",
            "Amazon.",
            "Costco.",
            "Visa.",
            "Coca-Cola.",
            "And hundreds more.",
            "Over the last several decades, the S&P 500 has averaged roughly 10% per year, including reinvested dividends.",
            "That long-term average is based on historical total return data published by S&P Dow Jones Indices.",
            "The important words are long-term average.",
            "That doesn't mean the market earns 10% every year.",
            "It doesn't.",
          ],
        },
        {
          heading: "Long term does not mean every year",
          paragraphs: [
            "Some years are fantastic.",
            "Some years are painful.",
            "Some years you wonder why you ever invested in the first place.",
            "The average comes from decades of good years, bad years, and everything in between.",
            "Past performance is not a guarantee of future results.",
            "If someone tells you they can guarantee your investment returns...",
            "We'll come back to that later.",
          ],
        },
        {
          heading: "What is simple interest?",
          paragraphs: [
            "Before we talk about compound interest, let's look at simple interest.",
            "Imagine you invest $1,000 and somehow earn a guaranteed 10% simple interest every year.",
            "At the end of the first year you've earned $100.",
            "The second year you earn another $100.",
            "The third year you earn another $100.",
            "Every year you earn the same amount because the interest is calculated only on your original $1,000.",
            "After ten years you've earned $1,000 in interest.",
            "Your investment is worth $2,000.",
            "Simple.",
            "Predictable.",
            "Compound interest works differently.",
            "Instead of paying you only on your original investment, it starts paying you on the money you've already earned.",
            "That's where things start to get interesting.",
          ],
        },
        {
          heading: "How compound interest builds wealth",
          paragraphs: [
            "Compound interest begins when the money you've already earned starts earning money too.",
            "That's it.",
            "That's the whole idea.",
            "It sounds simple because it is.",
            "Imagine standing at the top of a snowy hill holding a snowball.",
            "You give it a push.",
            "At first it barely changes.",
            "It rolls a little farther and picks up a little more snow.",
            "The bigger it gets, the more snow it collects.",
            "By the time it reaches the bottom of the hill, it has become something you couldn't lift if you tried.",
            "Compound interest works the same way.",
            "Growth creates more growth.",
          ],
        },
        {
          heading: "The $1,000 example",
          paragraphs: [
            "Let's go back to that same $1,000 investment.",
            "Let's imagine the market has a great year and your investment earns a 10% return.",
            "You make $100.",
            "Your investment is now worth $1,100.",
            "The following year, let's imagine the market earns another 10%.",
            "You don't make another $100.",
            "You make $110.",
            "Because you're now earning a return on $1,100 instead of $1,000.",
            "The year after that you're earning a return on $1,210.",
            "Then on $1,331.",
            "Then on $1,464.",
            "Every year there is a little more money working for you.",
            "At first, it doesn't feel very exciting.",
            "Then one day you realize the snowball has become much bigger than you expected.",
          ],
        },
        {
          heading: "The amount doing the work",
          paragraphs: [
            "Now let's put that into perspective.",
            "Imagine you have $1,000 invested.",
            "Let's imagine the market has another 10% year.",
            "Your investment grows by $100.",
            "That's nice.",
            "Now imagine you've spent years investing and your portfolio has grown to $450,000.",
            "Let's imagine the market has the very same 10% year.",
            "This time your investments grow by about $45,000.",
            "Both investors earned the exact same return.",
            "Ten percent.",
            "One made $100.",
            "The other made $45,000.",
            "The investment didn't change.",
            "The investor didn't change.",
            "The amount of money doing the work did.",
          ],
        },
        {
          heading: "When compound interest becomes real",
          paragraphs: [
            "Eventually something remarkable happens.",
            "There comes a year when your investments earn more money than you contribute.",
            "Maybe you invest $10,000 that year.",
            "Your investments earn $12,000.",
            "The following year they earn $18,000.",
            "A few years later they earn $30,000.",
            "One day your investments are doing more of the heavy lifting than you are.",
            "That's the moment compound interest becomes real.",
            "It's no longer a definition you read in a book.",
            "It's something happening in your own investment account.",
          ],
        },
        {
          heading: "The expensive years",
          paragraphs: [
            "When I was about 24, my workplace brought in a financial advisor to talk to us about retirement planning.",
            "Most of us in the room were in our twenties.",
            "At the end of the presentation she smiled and said,",
            "\"Don't worry. You're all so young. You have lots of time.\"",
            "She wasn't wrong.",
            "At 24, I did have a long investing journey ahead of me.",
            "The problem was how I interpreted those words.",
            "Instead of hearing, \"Start now because time is your greatest advantage,\" I heard, \"You can start later.\"",
            "So I did.",
            "I waited about four years before I became serious about investing.",
            "Looking back, those were expensive years.",
            "Not because I missed four years of contributions.",
            "Because I missed four years of compound growth.",
          ],
        },
        {
          heading: "You cannot earn back time",
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
          heading: "One last thought",
          paragraphs: [
            "One day you'll open your investment statement and notice something different.",
            "Your investments made more money this year than you contributed.",
            "That's the day compound interest stops being something you read about.",
            "It becomes something working for you.",
            "That's why, if I could teach my younger self one financial concept, it would be compound interest.",
            "Not because it's complicated.",
            "Because it isn't.",
            "It's one of the simplest ideas in personal finance.",
            "It also happens to be one of the most powerful.",
            "Every payday is a decision.",
            "Choose yours.",
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

    const ARTICLES = [FEATURED_ARTICLE, SECOND_ARTICLE, THIRD_ARTICLE, FOURTH_ARTICLE, FIFTH_ARTICLE, SIXTH_ARTICLE, SEVENTH_ARTICLE, EIGHTH_ARTICLE, NINTH_ARTICLE, TENTH_ARTICLE, ELEVENTH_ARTICLE, TWELFTH_ARTICLE, THIRTEENTH_ARTICLE, FOURTEENTH_ARTICLE, FIFTEENTH_ARTICLE, SIXTEENTH_ARTICLE, SEVENTEENTH_ARTICLE, EIGHTEENTH_ARTICLE, NINETEENTH_ARTICLE, TWENTIETH_ARTICLE, TWENTY_FIRST_ARTICLE, TWENTY_SECOND_ARTICLE, TWENTY_THIRD_ARTICLE, TWENTY_FOURTH_ARTICLE, TWENTY_FIFTH_ARTICLE, TWENTY_SIXTH_ARTICLE, TWENTY_SEVENTH_ARTICLE, TWENTY_EIGHTH_ARTICLE, TWENTY_NINTH_ARTICLE];

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
        const articleId = normalizedRoute.startsWith("/learn/") ? normalizedRoute.slice("/learn/".length) : "";
        const activeArticle = ARTICLES.find((article) => article.id === articleId);

        return (
          <LearnRoute
            currency={currency}
            setCurrency={setCurrency}
            article={activeArticle}
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
              <PanelContent icon={<BookOpen />} title="Privacy" text="Placeholder: Explain what information is stored, what stays on the user's device, what email data is collected, and how people can request deletion or unsubscribe." />
            )}

            {panel === "terms" && (
              <PanelContent icon={<BookOpen />} title="Terms" text="Placeholder: Add your terms of use here. Include educational-use language, no financial-advice wording, user responsibilities, and site limitations." />
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

    function LearnRoute({ currency, setCurrency, article, navigateTo, openHomePanel }) {
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

          {article ? (
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

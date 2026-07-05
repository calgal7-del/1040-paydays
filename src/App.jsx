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
      summary: "1040 Paydays began with a simple question after watching a coworker retire: How did she get there? The answer became a new way of thinking about money—not in dollars, but as approximately 1,040 opportunities to build financial freedom, one payday at a time.",
      image: "/article-1040-paydays.png",
      readTime: "6 min read",
      category: "Payday philosophy",
      kicker: "THE PAYDAY PHILOSOPHY",
      alt: "A woman at her desk during her final week before retirement",
      caption: "One ordinary retirement sparked a different way to think about every paycheck.",
      quote: {
        strong: "About 1,040 opportunities.",
        text: "One paycheck at a time.",
      },
      sections: [
        {
          heading: "The question that started it",
          paragraphs: [
            "The idea for 1040 Paydays didn't come from a finance book.",
            "It didn't come from a spreadsheet, an investment seminar, or a viral social media post.",
            "It started on my first week at a new job.",
            "One morning I noticed something unusual. A woman a few cubicles away seemed happier than everyone else. People kept stopping by to congratulate her. She was smiling, laughing, and talking about what came next.",
            "It was her last day before retirement.",
            "Later that day I found myself wondering a simple question.",
            "How did she get here?",
            "Not just to retirement, but to the point where work had become optional.",
            "She hadn't won the lottery.",
            "She wasn't a celebrity.",
            "She wasn't driving an exotic car.",
            "She was simply finished.",
            "That moment stayed with me.",
          ],
        },
        {
          heading: "A finite number of opportunities",
          paragraphs: [
            "As I learned more about saving, investing, and retirement planning over the following years, I came across a number that completely changed how I thought about money.",
            "Most people who work a full-time career receive about 26 paychecks each year.",
            "Work for roughly 40 years, and you'll collect about 1,040 paydays.",
            "That's it.",
            "Not an unlimited number.",
            "Not \"someday.\"",
            "About 1,040 opportunities.",
            "Suddenly retirement didn't seem like one giant impossible goal anymore.",
            "It became something much smaller.",
            "One paycheck at a time.",
          ],
        },
        {
          heading: "Think in paydays, not just dollars",
          paragraphs: [
            "Every payday asks the same question.",
            "Will this paycheck disappear without changing your future?",
            "Or will a small piece of it buy you freedom later?",
            "Most financial advice focuses on dollars.",
            "I prefer to think about paydays.",
            "Everyone has different incomes.",
            "Different goals.",
            "Different expenses.",
            "But every one of us has a limited number of opportunities to decide what each paycheck will do.",
            "That simple shift changed everything for me.",
            "Instead of asking, \"How much do I need to retire?\"",
            "I started asking, \"What can this payday do for my future?\"",
          ],
        },
        {
          heading: "Why I created 1040 Paydays",
          paragraphs: [
            "That's why I created 1040 Paydays.",
            "Not to tell people they can't enjoy life.",
            "Not to make anyone feel guilty for spending money.",
            "But to help people see the incredible power hidden inside ordinary paydays.",
            "Because the future isn't built in one massive financial decision.",
            "It's built hundreds of times.",
            "One payday after another.",
            "One choice after another.",
            "One deposit after another.",
            "By itself, one paycheck doesn't seem very important.",
            "Multiply that decision across 1,040 opportunities, and it can completely change the direction of your life.",
            "That's what this website is about.",
            "Helping you understand where you are on your own 1,040-payday journey.",
            "Helping you see how today's choices affect tomorrow's freedom.",
            "Helping you make every payday count.",
            "Because every payday funds a future.",
            "Choose yours.",
          ],
        },
      ],
    };

    const SECOND_ARTICLE = {
      id: "who-wants-to-go-home",
      title: "Who Wants to Go Home?",
      summary: "A simple question at the end of every shift taught me one of the biggest lessons about money. Wealth isn't built by one massive decision—it's built through hundreds of small choices that determine what each payday is really worth.",
      image: "/article-who-wants-to-go-home.png",
      readTime: "3 min read",
      category: "Payday philosophy",
      kicker: "SMALL CHOICES · LASTING IMPACT",
      alt: "A call centre employee raises his hand while a supervisor asks who wants to leave early",
      caption: "A small decision at the end of a shift can reveal the hidden value of an ordinary payday.",
      quote: {
        strong: "One choice rarely changes your life.",
        text: "Repeated hundreds of times, those choices quietly shape your future.",
      },
      sections: [
        {
          heading: "The question everyone loved",
          paragraphs: [
            "I still remember working in a call centre in my twenties.",
            "The days could be busy, stressful, and exhausting. Near the end of the shift, the supervisor would stand up and ask a question everyone loved to hear.",
            "\"Who wants to go home?\"",
            "Hands would shoot into the air.",
            "Some people couldn't raise them fast enough.",
            "If call volumes were low enough, a few employees would be allowed to leave early.",
            "At first, it seemed like a reward.",
            "An extra hour at home.",
            "Less stress.",
            "One less hour answering phones.",
            "Who wouldn't want that?",
          ],
        },
        {
          heading: "The hidden cost of leaving early",
          paragraphs: [
            "Then I started noticing something.",
            "The same people volunteered almost every time.",
            "An hour here.",
            "Two hours there.",
            "Another hour the following week.",
            "None of those decisions felt important on their own.",
            "But together, they became something much bigger.",
            "Every hour they left early was an hour they weren't being paid.",
            "Every early departure meant a slightly smaller paycheck.",
            "Every smaller paycheck meant a little less money available to save, invest, or put toward future goals.",
            "The decision wasn't really about going home.",
            "It was about giving up part of today's payday.",
          ],
        },
        {
          heading: "Every decision has a trade-off",
          paragraphs: [
            "That doesn't mean staying at work is always the right answer.",
            "Sometimes your family needs you.",
            "Sometimes your health needs you.",
            "Sometimes rest is the smartest investment you can make.",
            "The lesson isn't that you should always work more.",
            "The lesson is that every financial decision has a trade-off.",
            "Most of us don't make one giant decision that determines our financial future.",
            "We make hundreds of tiny decisions that barely seem worth thinking about.",
            "Bring lunch or buy it.",
            "Cancel the subscription or keep it.",
            "Work the extra shift or leave early.",
            "Save part of this paycheck or spend all of it.",
            "One choice rarely changes your life.",
            "But repeated hundreds of times, those choices quietly shape your future.",
          ],
        },
        {
          heading: "What each payday is worth",
          paragraphs: [
            "That's what I learned from one simple question.",
            "\"Who wants to go home?\"",
            "It wasn't really a question about going home.",
            "It was a question about what each payday was worth to you.",
            "Once I began looking at money that way, I realized wealth isn't built through dramatic moments.",
            "It's built through ordinary decisions repeated over and over again.",
            "That's the idea behind 1040 Paydays.",
            "You only receive about 1,040 paydays during a full career.",
            "Every one of them gives you another opportunity to move a little closer to financial freedom.",
            "Or a little farther away.",
            "Every payday funds a future.",
            "Choose yours.",
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

    const ARTICLES = [FEATURED_ARTICLE, SECOND_ARTICLE, THIRD_ARTICLE, FOURTH_ARTICLE];

    const ARTICLE_FAQS = {
      "you-only-get-about-1040-paydays": [
        {
          question: "Is 1,040 paydays an exact number?",
          answer: "No. It is a useful illustration based on roughly 26 biweekly paychecks a year across a 40-year career. Your total will vary with your pay frequency and years worked.",
        },
        {
          question: "What if I'm paid weekly or monthly?",
          answer: "The same idea still applies: your paydays are finite decision points. The calculator adjusts the timeline using the pay frequency you select.",
        },
        {
          question: "Is it too late to start?",
          answer: "Your best starting point is the next payday available to you. Even modest, consistent choices can improve the future you are building.",
        },
        {
          question: "How much should I save from each paycheck?",
          answer: "There is no universal amount. Start with something sustainable, protect essential expenses, and increase it as your circumstances allow.",
        },
        {
          question: "Is the 1040 Paydays calculator financial advice?",
          answer: "No. It is an educational projection tool. Your actual results will depend on returns, taxes, fees, inflation, and your personal circumstances.",
        },
      ],
      "who-wants-to-go-home": [
        {
          question: "Does this mean I should always work extra hours?",
          answer: "No. Rest, health, and family time matter. The lesson is to recognize the trade-off and make the choice deliberately.",
        },
        {
          question: "How can I estimate the cost of leaving early?",
          answer: "Multiply the unpaid hours by your hourly wage, then consider what that amount could have supported—today or in your longer-term plan.",
        },
        {
          question: "Can a small decision really affect my future?",
          answer: "One decision may not, but a repeated pattern can. Small choices become meaningful when they happen across months and years.",
        },
        {
          question: "Is choosing rest ever a good financial decision?",
          answer: "Absolutely. Protecting your health and avoiding burnout can be valuable. The goal is thoughtful balance, not working at every opportunity.",
        },
        {
          question: "How do I apply this lesson on payday?",
          answer: "Pause before the money disappears and give part of the paycheck a specific job, whether that is saving, debt repayment, investing, or an essential expense.",
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
                <img src={FEATURED_ARTICLE.image} alt="A woman at her desk during her final week before retirement" />
                <span>FEATURED ARTICLE</span>
                <strong>{FEATURED_ARTICLE.title}</strong>
                <em>Read article →</em>
              </button>
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
              <div className="mobile-home-article-strip">
                {ARTICLES.map((article) => (
                  <button type="button" key={article.id} onClick={() => setPanel(`article:${article.id}`)}>
                    <img src={article.image} alt={article.alt} />
                    <span>{article.category} · {article.readTime}</span>
                    <strong>{article.title}</strong>
                    <em>Read article →</em>
                  </button>
                ))}
              </div>
              <small>Swipe to explore more articles →</small>
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

      const selectCategory = (nextCategory) => {
        setCategory(nextCategory);
        document.getElementById("learn-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      return (
        <main className="learn-page">
          <section className="learn-page-hero" aria-labelledby="learn-title">
            <p className="eyebrow">KNOWLEDGE &amp; INSIGHTS</p>
            <h1 id="learn-title">Learn</h1>
            <p>Simple ideas, practical lessons, and real stories to help you make the most of every payday.</p>
          </section>

          <section className="learn-category-section" aria-labelledby="category-heading">
            <div className="learn-section-heading">
              <div>
                <p className="eyebrow muted">EXPLORE BY TOPIC</p>
                <h2 id="category-heading">Build knowledge that compounds.</h2>
              </div>
              <p>Start where you are. Choose the topic that matters most today.</p>
            </div>

            <nav className="learn-category-grid" aria-label="Article categories">
              {LEARN_CATEGORIES.map((item, index) => (
                <button type="button" key={item} onClick={() => selectCategory(item)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                  <small>Explore articles →</small>
                </button>
              ))}
            </nav>
          </section>

          <section className="learn-articles-section" id="learn-articles" aria-labelledby="articles-heading">
            <div className="learn-section-heading">
              <div>
                <p className="eyebrow muted">THE LIBRARY</p>
                <h2 id="articles-heading">Practical ideas for every payday.</h2>
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
              {["All", ...LEARN_CATEGORIES].map((item) => (
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

          <section className="learn-start-here" aria-labelledby="start-here-heading">
            <div className="learn-section-heading">
              <div>
                <p className="eyebrow">START HERE</p>
                <h2 id="start-here-heading">Three stories. One better way to see payday.</h2>
              </div>
              <p>A thoughtful introduction to the 1040 Paydays philosophy.</p>
            </div>

            <div className="learn-start-grid">
              {ARTICLES.slice(0, 3).map((item, index) => (
                <article key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{articleCategory(item)} · {item.readTime}</small>
                    <h3>{item.title}</h3>
                    <a
                      href={`/learn/${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateTo(`/learn/${item.id}`);
                      }}
                    >
                      Read Article →
                    </a>
                  </div>
                </article>
              ))}
            </div>
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

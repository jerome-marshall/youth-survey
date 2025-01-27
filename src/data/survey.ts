import { type Survey } from "types/survey";

export const survey: Survey = {
  questions: [
    {
      id: "q1",
      text: "How did you become an Adventist?",
      type: "single",
      options: [
        { id: "1", text: "I was born into an Adventist home." },
        { id: "2", text: "I became an Adventist." },
      ],
    },
    {
      id: "q1a",
      text: "How did you become an Adventist? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I became an Adventist when my parents converted." },
        {
          id: "2",
          text: "A friend shared the truth with me (personal or group Bible studies).",
        },
        { id: "3", text: "I attended church's evangelistic meetings." },
        {
          id: "4",
          text: "Through Adventist Media Ministries (YouTube and other sources).",
        },
        {
          id: "5",
          text: "I read the Bible, discovered the truth, and joined the church.",
        },
        {
          id: "6",
          text: "Through Adventist institutions (schools, colleges and hospitals).",
        },
        {
          id: "7",
          text: "I became an Adventist through reading Adventist literature.",
        },
        { id: "8", text: "I married an Adventist." },
      ],
      condition: {
        parentId: "q1",
        triggerOptionId: "2",
      },
    },
    {
      id: "q2",
      text: "How is a person saved? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I'm saved through the grace of Christ." },
        {
          id: "2",
          text: "I'm saved when my good deeds outweigh the bad deeds.",
        },
        {
          id: "3",
          text: "I'm saved only by my obedience to the commandments.",
        },
        { id: "4", text: "God will save everyone." },
        {
          id: "5",
          text: "God has already decided who are saved and who are lost.",
        },
        { id: "6", text: "I don't know but I want to know." },
        { id: "7", text: "I don't care." },
      ],
    },
    {
      id: "q3",
      text: "How do you view God? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Loving" },
        { id: "2", text: "Judgmental" },
        { id: "3", text: "Irrelevant" },
        { id: "4", text: "Forgiving" },
        { id: "5", text: "All-Knowing" },
        { id: "6", text: "All-Powerful" },
        { id: "7", text: "All-Present" },
        { id: "8", text: "Friend" },
        { id: "9", text: "Revengeful monster" },
        {
          id: "10",
          text: "He exists, but He doesn't care about what goes on in the world.",
        },
        { id: "11", text: "I don't know but I want to know." },
        { id: "12", text: "I don't know if there is a God." },
        { id: "13", text: "There's no God." },
      ],
    },
    {
      id: "q4",
      text: "What is the Bible to you? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Inspired and authoritative word of God." },
        { id: "2", text: "Irrelevant for the 21st century." },
        { id: "3", text: "It is filled with errors." },
        {
          id: "4",
          text: "It has some good lessons for living but it is like any other spiritual books like Quran or Bhagavad-Gita.",
        },
        {
          id: "5",
          text: "It is mythological and doesn't have any historical value.",
        },
      ],
    },
    {
      id: "q5",
      text: "How many times a week do you do daily devotions? (Study the Bible, Spirit of Prophecy and pray)",
      type: "single",
      options: [
        { id: "1", text: "Never/rarely" },
        { id: "2", text: "1-2 times" },
        { id: "3", text: "3-5 times" },
        { id: "4", text: "6-7 times" },
      ],
    },
    {
      id: "q5a",
      text: "Why do you never/rarely do daily devotions? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I don't have time." },
        { id: "2", text: "I don't know how to do devotions." },
        { id: "3", text: "I don't feel the importance for it." },
      ],
      condition: {
        parentId: "q5",
        triggerOptionId: "1",
      },
    },
    {
      id: "q6",
      text: "Do you believe in the prophetic gift of Ellen White?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q6a",
      text: "Why don't you believe in the prophetic gift of Ellen White? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I have not read any of her writings." },
        { id: "2", text: "I have not tested them to be true." },
        { id: "3", text: "The Bible is enough for me." },
        { id: "4", text: "There are errors in her writings." },
        { id: "5", text: "They are contradicting the Bible." },
        { id: "6", text: "Not interested or do not find any value." },
        { id: "7", text: "I don't know or I haven't heard about Ellen White." },
      ],
      condition: {
        parentId: "q6",
        triggerOptionId: "2",
      },
    },
    {
      id: "q7",
      text: "What is significant about 1844? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Great (Millerite) disappointment." },
        { id: "2", text: "The Adventist Church was officially organized." },
        { id: "3", text: "Ellen White began having visions." },
        {
          id: "4",
          text: "Jesus began His ministry in the Most Holy Place of the Heavenly Sanctuary.",
        },
        {
          id: "5",
          text: "It has no significance. It was a mistake by our pioneers.",
        },
        { id: "6", text: "I don't know what is important about that date." },
      ],
    },
    {
      id: "q8",
      text: "How do you feel about the standards (no jewelry, modest dress, no secular music)? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I don't follow/agree with them." },
        { id: "2", text: "I find them restrictive." },
        { id: "3", text: "I agree with them." },
        {
          id: "4",
          text: "I do them because I'm forced by family/circumstances.",
        },
        {
          id: "5",
          text: "I don't think the Bible has anything to say about this.",
        },
        {
          id: "6",
          text: "The Bible does teach but it doesn't apply to our current generation.",
        },
      ],
    },
    {
      id: "q9",
      text: "What do you think of premarital sex (sex before marriage)? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I know it's wrong but I do it anyway." },
        { id: "2", text: "I do it because of peer pressure." },
        { id: "3", text: "I don't participate because it is a sin." },
        { id: "4", text: "It's not wrong if I plan on marrying the person." },
        {
          id: "5",
          text: "There is no right or wrong. Everyone decides what is right or wrong for themselves.",
        },
        { id: "6", text: "I don't know if it's right or wrong." },
      ],
    },
    {
      id: "q10",
      text: "What is your view about LGBTQ+? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "It doesn't align with the Bible." },
        { id: "2", text: "It is up to people to choose their lifestyle." },
        { id: "3", text: "The Bible doesn't say it's wrong." },
        { id: "4", text: "I don't know if it's right or wrong." },
        { id: "5", text: "I have tendencies myself and find it okay." },
        { id: "6", text: "I have tendencies myself and I want help." },
        { id: "7", text: "I haven't heard of it." },
      ],
    },
    {
      id: "q11",
      text: "Choose what best describes your relationship with God.",
      type: "multiple",
      options: [
        { id: "1", text: "I have an active relationship with God daily." },
        { id: "2", text: "I go through phases of up and down." },
        { id: "3", text: "I do not have a relationship with God." },
        { id: "4", text: "I do not know how to have a relationship with God." },
        {
          id: "5",
          text: "I do not know the importance of having a relationship with God.",
        },
        {
          id: "6",
          text: "I used to have a strong relationship with God but have drifted away.",
        },
        { id: "7", text: "I need help in my spiritual life." },
        { id: "8", text: "I struggle with questions and doubts." },
      ],
    },
    {
      id: "q12",
      text: "What is your attitude towards the Sabbath? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I look forward to the Sabbath." },
        { id: "2", text: "I keep the Sabbath out of compulsion." },
        {
          id: "3",
          text: "I attend church out of habit but not for its spiritual value.",
        },
        { id: "4", text: "It takes away my freedom (restrictive)." },
        { id: "5", text: "It's not necessary for the 21st century." },
        { id: "6", text: "It is a boring routine." },
        { id: "7", text: "I find it a meaningless ritual." },
        { id: "8", text: "It's ok to attend church and work the other time." },
        {
          id: "9",
          text: "I look forward to fellowshipping with like-minded believers.",
        },
      ],
    },
    {
      id: "q13",
      text: "How many times a week do you have family worship?",
      type: "single",
      options: [
        { id: "1", text: "Never/rarely" },
        { id: "2", text: "1-2 times" },
        { id: "3", text: "3-5 times" },
        { id: "4", text: "6-7 times" },
      ],
    },
    {
      id: "q13a",
      text: "Why do you never/rarely have family worship? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "No initiative from family." },
        { id: "2", text: "I'm not currently living with my family." },
        { id: "3", text: "I don't have time." },
        { id: "4", text: "I'm the only Christian." },
      ],
      condition: {
        parentId: "q13",
        triggerOptionId: "1",
      },
    },
    {
      id: "q14",
      text: "Do you feel that you can talk to your family freely about your questions and concerns?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q14a",
      text: "Why can't you talk freely with your family? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "They are non-Adventists." },
        { id: "2", text: "They are judgmental." },
        { id: "3", text: "They don't take interest in my life." },
        { id: "4", text: "They suppress or neglect my concerns." },
        { id: "5", text: "I don't feel like I can trust them." },
        { id: "6", text: "They don't care about my emotions or desires." },
        { id: "7", text: "They try to pressure or control me." },
        { id: "8", text: "My parents are divorced or separated." },
        { id: "9", text: "I know I won't like their counsel, so I don't ask." },
        { id: "10", text: "Their counsel often is not biblical." },
        { id: "11", text: "They don't understand me." },
        {
          id: "12",
          text: "They don't understand the modern issues that I face.",
        },
      ],
      condition: {
        parentId: "q14",
        triggerOptionId: "2",
      },
    },
    {
      id: "q15",
      text: "Is it wrong to enter into a romantic relationship with a non-Adventist/non-Christian?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q15a",
      text: "Why do you think it's not wrong? Select all that apply.",
      type: "multiple",
      options: [
        {
          id: "1",
          text: "I don't think it will affect my relationship with God.",
        },
        { id: "2", text: "The Bible doesn't say it's wrong." },
        { id: "3", text: "There are not many other options." },
        { id: "4", text: "I think it's fine." },
        { id: "5", text: "I can convert them to Adventism." },
        {
          id: "6",
          text: "I'm already in a relationship and don't want to break up.",
        },
      ],
      condition: {
        parentId: "q15",
        triggerOptionId: "2",
      },
    },
    {
      id: "q16",
      text: "Have you ever shared your faith with someone?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q16a",
      text: "Why haven't you shared your faith? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I have no motivation." },
        { id: "2", text: "I have doubts myself." },
        { id: "3", text: "I don't have enough knowledge." },
        { id: "4", text: "I'm fearful to share." },
        { id: "5", text: "I'm afraid I might lose a relationship." },
        {
          id: "6",
          text: "I know the truth, and want to share, but don't have confidence.",
        },
        { id: "7", text: "I don't have anyone to mentor or guide me." },
      ],
      condition: {
        parentId: "q16",
        triggerOptionId: "2",
      },
    },
    {
      id: "q17",
      text: "What are the reasons you go to church? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "To worship God." },
        { id: "2", text: "It's my family tradition." },
        { id: "3", text: "To hear God's word." },
        { id: "4", text: "Fellowship with likeminded believers." },
        { id: "5", text: "Meeting friends." },
        { id: "6", text: "Music" },
        { id: "7", text: "That's what the Bible says to do." },
        { id: "8", text: "Children and Youth programs." },
        { id: "9", text: "I have church responsibility." },
        { id: "10", text: "Out of compulsion." },
        { id: "11", text: "I don't go to church." },
      ],
    },
    {
      id: "q18",
      text: "What are the reasons you don't want to go to church or wouldn't want to go if you had a choice? Select all that apply.",
      type: "single",
      options: [
        { id: "1", text: "I don't go to church." },
        { id: "2", text: "It doesn't apply to me." },
      ],
    },
    {
      id: "q18a",
      text: "Why don't you go to church? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Critical & Judgmental attitude." },
        { id: "2", text: "Hypocritical" },
        { id: "3", text: "Boring" },
        { id: "4", text: "Irrelevant" },
        { id: "5", text: "I don't like the pastor" },
        { id: "6", text: "My expectations are not met." },
        { id: "7", text: "I don't have interest." },
      ],
      condition: {
        parentId: "q18",
        triggerOptionId: "1",
      },
    },
    {
      id: "q19",
      text: "What type of sermons are you interested in?",
      type: "multiple",
      options: [
        {
          id: "1",
          text: "Doctrinal - It deals with the fundamental doctrines of our church.",
        },
        {
          id: "2",
          text: "Topical - It deals with topics from the Bible, such as love, grace, etc.",
        },
        {
          id: "3",
          text: "Everyday issues - It is practical and gives me solution for my everyday struggles.",
        },
        {
          id: "4",
          text: "Prophecy - These type of sermons deals with prophecies from Daniel and Revelation.",
        },
        {
          id: "5",
          text: "Exegetical - These are sermons that takes one passage from the Bible and explains verse by verse.",
        },
        {
          id: "6",
          text: "Apologetics - Sermons/Talks that gives evidence for beliefs in God or the Bible.",
        },
        { id: "7", text: "I do not like sermons." },
      ],
    },
    {
      id: "q20",
      text: "Think of the best sermon you have ever heard. What was in it that drew your attention and got you interested? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Captivating illustrations/examples." },
        { id: "2", text: "Inspiring stories." },
        { id: "3", text: "How simple and practical it was." },
        { id: "4", text: "It dealt with questions I had." },
        {
          id: "5",
          text: "It taught me how to deal with my everyday struggles.",
        },
        { id: "6", text: "It helped me understand a difficult Bible passage." },
        { id: "7", text: "Real life testimonies." },
        { id: "8", text: "The preacher was overall engaging" },
        { id: "9", text: "It was interactive." },
      ],
    },
    {
      id: "q21",
      text: "What type of spiritual programs engage you? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Concert" },
        { id: "2", text: "Skit" },
        { id: "3", text: "Interactive Bible study" },
        { id: "4", text: "Prayer meetings" },
        { id: "5", text: "Seminars" },
        { id: "6", text: "Pathfinders" },
        { id: "7", text: "Workshops" },
        { id: "8", text: "Church social gatherings" },
        { id: "9", text: "Youth camp" },
      ],
    },
    {
      id: "q22",
      text: "Have you ever considered leaving the church?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q22a",
      text: "Why have you considered leaving? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Doctrinal Disagreements" },
        { id: "2", text: "Church Hurt - (Religious abuse)" },
        { id: "3", text: "Hypocritical attitude of others." },
        { id: "4", text: "Rude behavior from other members." },
        { id: "5", text: "Family Issues" },
        { id: "6", text: "Job issues" },
        { id: "7", text: "Financial struggles" },
        { id: "8", text: "I have doubts about God's existence" },
      ],
      condition: {
        parentId: "q22",
        triggerOptionId: "1",
      },
    },
    {
      id: "q23",
      text: "How do you or would like to participate in your local church?",
      type: "single",
      options: [
        { id: "1", text: "I already participate in my local church" },
        { id: "2", text: "I don't participate" },
        {
          id: "3",
          text: "I would like to participate if given an opportunity",
        },
      ],
    },
    {
      id: "q23a",
      text: "How do you participate? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Music team" },
        { id: "2", text: "Media A/V" },
        { id: "3", text: "Sermons" },
        { id: "4", text: "Sabbath school programs" },
        { id: "5", text: "Youth Programs" },
        { id: "6", text: "Children's Programs" },
        { id: "7", text: "Hospitality" },
        { id: "8", text: "Deacons/Deaconess" },
        { id: "9", text: "Leader of a ministry." },
        { id: "10", text: "Giving Bible studies." },
        { id: "11", text: "Being part of a small group Bible study" },
      ],
      condition: {
        parentId: "q23",
        triggerOptionId: "1",
      },
    },
    {
      id: "q23b",
      text: "Why don't you participate? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I was not asked" },
        { id: "2", text: "I'm not interested" },
        { id: "3", text: "I don't feel my talents are valued" },
      ],
      condition: {
        parentId: "q23",
        triggerOptionId: "2",
      },
    },
    {
      id: "q23c",
      text: "How would you like to participate? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Music team" },
        { id: "2", text: "Media A/V" },
        { id: "3", text: "Sermons" },
        { id: "4", text: "Sabbath school programs" },
        { id: "5", text: "Youth Programs" },
        { id: "6", text: "Children's Programs" },
        { id: "7", text: "Hospitality" },
        { id: "8", text: "Deacons/Deaconess" },
        { id: "9", text: "Leader of a ministry." },
        { id: "10", text: "Giving Bible studies." },
        { id: "11", text: "Being part of a small group Bible study" },
      ],
      condition: {
        parentId: "q23",
        triggerOptionId: "3",
      },
    },
    {
      id: "q24",
      text: "Do you feel safe expressing yourself in church?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q24a",
      text: "Why don't you feel safe expressing yourself? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I have the fear of being misunderstood." },
        { id: "2", text: "I worry people may gossip about me." },
        { id: "3", text: "My church members are very judgmental." },
        { id: "4", text: "Nobody wants to listen." },
        { id: "5", text: "I have very few that I can trust and share." },
        { id: "6", text: "I feel like an outsider." },
        { id: "7", text: "I feel that I'm not accepted." },
        { id: "8", text: "I don't feel like I can ask questions." },
        { id: "9", text: "I have had rough experiences in the past." },
      ],
      condition: {
        parentId: "q24",
        triggerOptionId: "2",
      },
    },
    {
      id: "q25",
      text: "What is your belief about the Seventh-day Adventist Church? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "It is God's remnant church." },
        { id: "2", text: "It is the only commandment keeping church." },
        {
          id: "3",
          text: "It is one of many true churches. It's no different than any other.",
        },
        {
          id: "4",
          text: "I used to think it's God's church, but not anymore.",
        },
        {
          id: "5",
          text: "I have doubts about the Church's beliefs and practices.",
        },
        {
          id: "6",
          text: "I believe in the church's beliefs but not in the local leadership.",
        },
        {
          id: "7",
          text: "I believe in the church's beliefs but not in the global leadership.",
        },
        { id: "8", text: "I'm not sure. I want to know." },
        { id: "9", text: "I don't care." },
      ],
    },
    {
      id: "q26",
      text: "Have you ever struggled with any of the following? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Depression" },
        { id: "2", text: "Anxiety" },
        { id: "3", text: "Loneliness" },
        { id: "4", text: "Anger" },
        { id: "5", text: "Guilt" },
        { id: "6", text: "Self-criticism" },
        { id: "7", text: "Rejection" },
        { id: "8", text: "Failure" },
        { id: "9", text: "Emptiness" },
        { id: "10", text: "None" },
      ],
    },
    {
      id: "q27",
      text: "Have you had suicidal thoughts?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q27a",
      text: "What were the reasons for your suicidal thoughts? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Life problems." },
        { id: "2", text: "Relationship problems." },
        { id: "3", text: "Family problems." },
        { id: "4", text: "Mental health problems." },
      ],
      condition: {
        parentId: "q27",
        triggerOptionId: "1",
      },
    },
    {
      id: "q28",
      text: "What is your view on worldly entertainment (movies, TV shows, music, video games)? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I know it's wrong but I do it anyway" },
        { id: "2", text: "I don't engage in it." },
        { id: "3", text: "I don't think it's wrong." },
        { id: "4", text: "I don't know if it's right or wrong." },
      ],
    },
    {
      id: "q29",
      text: "When making an important decision in life, what factors influences you the most?",
      type: "ranking",
      options: [
        { id: "1", text: "What's best for my family." },
        { id: "2", text: "What I think my culture or society expects." },
        { id: "3", text: "What's best for me." },
        { id: "4", text: "What my faith teaches." },
        { id: "5", text: "What my friends will say." },
        { id: "6", text: "What my colleagues/classmates will say." },
      ],
    },
    {
      id: "q30",
      text: "What is your most urgent need in life?",
      type: "ranking",
      options: [
        { id: "1", text: "Having a relationship with God." },
        { id: "2", text: "Choose a partner for marriage." },
        { id: "3", text: "To gain financial freedom." },
        { id: "4", text: "Victory over certain habits." },
        { id: "5", text: "To adopt a healthy lifestyle." },
        { id: "6", text: "Certainty about my future." },
        { id: "7", text: "I have doubts about God that I need clarification." },
        {
          id: "8",
          text: "I need counseling to deal with some of my mental issues.",
        },
        { id: "9", text: "I have doubts about my salvation." },
        { id: "10", text: "To enhance my interpersonal relationships." },
      ],
    },
    {
      id: "q31",
      text: "What influences your sense of right and wrong?",
      type: "ranking",
      options: [
        { id: "1", text: "Family" },
        { id: "2", text: "Friends" },
        { id: "3", text: "Culture and society" },
        { id: "4", text: "Personal desires" },
        { id: "5", text: "Biblical Values" },
        { id: "6", text: "Media and entertainment" },
      ],
    },
    {
      id: "q32",
      text: "What talents has God given you that you have personally realized, or others have identified in you? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "Music (singing, playing instruments, composing)." },
        { id: "2", text: "Public speaking (preaching or teaching)" },
        { id: "3", text: "Artistic skills (drawing, painting, sculpture)." },
        { id: "4", text: "Caring for others (nurturing and compassionate)." },
        { id: "5", text: "Writing (creative writing, poetry, storytelling)." },
        { id: "6", text: "Leadership or influencing others." },
        { id: "7", text: "Problem-solving or critical thinking." },
        { id: "8", text: "Creativity (coming up with new ideas)." },
        { id: "9", text: "Sports or athletic abilities." },
        { id: "10", text: "Organizing or planning events." },
        { id: "11", text: "Craftsmanship (building, creating, crafting)." },
        { id: "12", text: "Hospitality (making others feel welcome)." },
        { id: "13", text: "Counseling." },
        { id: "14", text: "Quick learning or picking up new skills." },
        { id: "15", text: "Empathy or understanding others' feelings." },
        { id: "16", text: "Storytelling or captivating an audience." },
        { id: "17", text: "I don't have any talents" },
        { id: "18", text: "I need help in identifying my talents" },
      ],
    },
    {
      id: "q33",
      text: "Do you know what God has called you to do? Select all that apply.",
      type: "multiple",
      options: [
        {
          id: "1",
          text: "Yes, my profession aligns with God's calling for me.",
        },
        {
          id: "2",
          text: "I feel God is directing me to a field I'm not interested in.",
        },
        {
          id: "3",
          text: "I feel God is leading me to something I'm not skilled in.",
        },
        {
          id: "4",
          text: "I know God's calling, but I'm worried my family won't accept it.",
        },
        {
          id: "5",
          text: "I know God's calling, but I'm concerned about financial stability.",
        },
        { id: "6", text: "I'm unsure of God's calling for my life." },
        { id: "7", text: "I need help identifying God's calling for me." },
        {
          id: "8",
          text: "I'm more focused on earning money to support myself or my family than knowing or following God's call.",
        },
      ],
    },
    {
      id: "q34",
      text: "Maybe you have questions about things but have not known to talk to. Maybe you have concerns in any areas of life that you have not been given a chance to share. We know and understand how you feel. Whatever it is, we want to hear you. Please share:",
      type: "text",
      options: [],
    },
  ],
};

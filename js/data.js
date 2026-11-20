/*
  All site content lives here, taken from Lynn Kim's master portfolio brief
  (November 2026). Only verified facts are written in this file.

  Each project has a `layout` (journey, video, rundown, field, growth, voices),
  so every project is presented as its own editorial spread.

  Media is optional. Each project has typed `media` slots. A slot with no files
  is simply not shown. Add items like { src, alt, width, height, caption }.
  Videos: { type: 'video', src, poster, caption }.
  `lead` is the project's main image, used on its spread and on its card.
*/

export const heroFigures = [
  { value: '3.18M', label: 'views on the top @lynnonmi Reel', slug: 'lynnonmi' },
  { value: '23.4K', label: 'Instagram followers on @lynnonmi', slug: 'lynnonmi' },
  { value: '180', label: 'applicants for the second Solo Party', slug: 'solo-party' },
];

export const site = {
  name: 'Lynn Kim',
  year: 2026,
  headline: 'Content Creator · Marketer · Event Organizer',
  secondary: 'Live Commerce · Photography',
  tagline: 'I create content, build communities, and bring ideas to life through marketing and events.',
  introMore: 'My experience spans social media content, brand campaigns, live commerce, and event operations.',
  email: 'eggielikestaco@gmail.com',
  instagram: { handle: '@lynnonmi', url: 'https://www.instagram.com/lynnonmi/' },
  resume: null, // set to a PDF path such as 'assets/Lynn-Kim-Resume.pdf' when the file is supplied
  asOf: 'November 20, 2026', // verification date for Instagram figures only. It is never an employment date.
  ogImage: 'assets/og-image.png',
};

/* Work archive folders. `all` shows every project. */
export const categories = [
  { id: 'all', label: 'All Work', tone: 'char', note: 'Every project in one folder.' },
  { id: 'content', label: 'Content & Social Media', tone: 'pink', note: 'Channels I create for and accounts I manage.' },
  { id: 'events', label: 'Events & Community', tone: 'blue', note: 'Offline events planned and run.' },
  { id: 'live-commerce', label: 'Live Commerce', tone: 'cream', note: 'Live shopping broadcasts.' },
  { id: 'brand-marketing', label: 'Brand Marketing', tone: 'rose', note: 'Campaigns, activations and brand accounts.' },
];

export const projects = [
  {
    slug: 'solo-party',
    layout: 'journey',
    lead: null,
    journey: [
      { when: 'May 27, 2026', title: 'Event 01', text: 'Co-organized with Hogamdo. I created the promotional Reels and Stories, supported recruitment and secured five sponsors.', stat: '150 applicants, 66 attendees' },
      { when: 'Planning', title: 'Designing Event 02', text: 'Planned the concept and structure, and designed the GUESS ME, FIND ME, and MATCH ME activities.', stat: null },
      { when: 'Recruitment', title: 'Opening applications', text: 'Managed promotion, applications and participant screening.', stat: '180 unique applicants' },
      { when: 'Digital operations', title: 'The web application', text: 'Coordinated a web application built with AI tools for approvals, voting and matching.', stat: null },
      { when: 'August 9, 2026', title: 'Event 02', text: 'Independently organized. Coordinated staff and participants and managed on-site operations.', stat: '84 attendees' },
    ],
    promo: [
      'For Event 01 I created promotional Instagram Reels and Stories and supported participant recruitment.',
      'For Event 02 I managed promotion, applications, participant screening, and communication.',
    ],
    system: [
      'I coordinated the development of a web application using AI tools.',
      'It supported the participant approvals, voting, and matching processes that I managed for Event 02.',
    ],
    categories: ['events'],
    title: 'Solo Party',
    subtitle: 'From co-organizing a social event to independently producing the next edition.',
    org: 'Solo Party',
    role: 'Event Organizer / Project Lead for the second event',
    period: 'May–August 2026',
    summary: 'Co-organized the first Solo Party with Hogamdo, then planned and ran the second edition on my own.',
    metric: { value: '66 → 84', label: 'attendees, first to second event' },
    heading: '66 attendees. Then 84. Two editions of Solo Party.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'Solo Party is an offline social event designed to help participants meet and interact through structured activities.',
          'I co-organized the first event with Hogamdo and independently planned and operated the second edition. My responsibilities covered promotion, participant recruitment, communication, program development, and event-day operations.',
        ],
      },
      {
        type: 'compare',
        title: 'Two editions compared',
        columns: ['Event 01', 'Event 02'],
        rows: [
          ['Date', 'May 27, 2026', 'August 9, 2026'],
          ['Structure', 'Co-organized with Hogamdo', 'Independently organized'],
          ['My role', 'Co-organizer', 'Project lead'],
          ['Applicants', '150', '180 unique'],
          ['Attendees', '66', '84'],
        ],
        notes: [
          'Applicants rose from 150 to 180 and attendance from 66 to 84. No single marketing activity is credited with that increase.',
          'Event 01 was shared work with Hogamdo. Event 02 was independently organized.',
        ],
      },
      {
        type: 'events',
        title: 'What I did at each event',
        events: [
          {
            name: 'Event 01',
            date: 'May 27, 2026',
            role: 'Co-organizer with Hogamdo',
            items: [
              'Created promotional Instagram Reels and Stories',
              'Supported participant recruitment',
              'Managed participant communication',
              'Secured five event sponsors',
              'Helped host and operate the event',
            ],
          },
          {
            name: 'Event 02',
            date: 'August 9, 2026',
            role: 'Independent Organizer',
            items: [
              'Planned the event concept and structure',
              'Managed recruitment and application screening',
              'Designed the GUESS ME, FIND ME, and MATCH ME activities',
              'Coordinated the development of a web application using AI tools',
              'Managed participant approvals, voting, and matching processes',
              'Coordinated staff and participant communication',
              'Managed on-site operations',
            ],
          },
        ],
      },
      {
        type: 'columns',
        title: 'Recruitment and the web application',
        items: [
          { title: 'Recruitment', text: 'Managed promotion, applications, participant screening, and communication. The second event drew 180 unique applicants.' },
          { title: 'Web application', text: 'Coordinated the development of a web application using AI tools. It supported participant approvals, voting, and matching.' },
        ],
      },
      {
        type: 'steps',
        title: 'Process',
        steps: [
          { step: 'Planning', text: 'Developed the event structure and designed activities that encouraged participants to interact.' },
          { step: 'Recruitment', text: 'Managed promotion, applications, participant screening, and communication.' },
          { step: 'Digital operations', text: 'Coordinated an application and matching workflow supported by a web application built with AI tools.' },
          { step: 'Event execution', text: 'Managed staffing, participant experience, and on-site operations.' },
        ],
      },
      {
        type: 'metrics',
        title: 'Results',
        items: [
          { value: '150', label: 'applicants, first event' },
          { value: '66', label: 'attendees, first event' },
          { value: '180', label: 'unique applicants, second event' },
          { value: '84', label: 'attendees, second event' },
        ],
      },
    ],
    media: { promo: [], system: [], photos: [] },
    wanted: ['Promotional Reels', 'Event posters', 'Event photographs', 'Application website screenshots', 'GUESS ME / FIND ME / MATCH ME materials', 'Participant communication examples, private information removed'],
    links: [],
  },
  {
    slug: 'lynnonmi',
    layout: 'video',
    lead: null,
    categories: ['content'],
    title: '@lynnonmi',
    subtitle: 'Building and managing my own social media channels.',
    org: '@lynnonmi, my own channels',
    role: 'Independent Content Creator',
    period: null,
    platform: 'Instagram and YouTube',
    asOf: true,
    summary: 'Plans, films, edits and publishes content on student life, beauty, lifestyle and life in different cities.',
    metric: { value: '23,400', label: 'Instagram followers, as of November 20, 2026' },
    heading: 'Creating content for an audience of 23.4K.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'I plan, film, edit, and publish content for my personal channels, covering student life, beauty, lifestyle, and experiences in different cities.',
          'I manage the creative process from topic selection and content planning to filming, editing, publishing, and reviewing performance.',
        ],
      },
      {
        type: 'metrics',
        title: 'Verified performance',
        items: [
          { value: '23,400', label: 'Instagram followers' },
          { value: '3.18M', label: 'views on the highest-performing Reel' },
        ],
        notes: [
          'Instagram figures are as of November 20, 2026.',
          'Reel numbers are views on individual videos, not total account views.',
        ],
      },
      {
        type: 'reels',
        title: 'Content that performed',
        items: [
          { rank: 'Highest-performing Reel', views: '3.18M', thumb: null, href: null, concept: null, production: null },
          { rank: 'High-performing Reel', views: '1.92M', thumb: null, href: null, concept: null, production: null },
          { rank: 'High-performing Reel', views: '1.39M', thumb: null, href: null, concept: null, production: null },
          { rank: 'High-performing Reel', views: '1.30M', thumb: null, href: null, concept: null, production: null },
        ],
        note: 'Reel links, thumbnails and creative notes appear here as they are added.',
      },
      {
        type: 'columns',
        title: 'Content themes',
        items: [
          { title: 'Student life', text: 'University experiences, academic life, and personal routines.' },
          { title: 'Lifestyle', text: 'Everyday experiences, places, and activities.' },
          { title: 'Beauty', text: 'Beauty-related content and product experiences.' },
          { title: 'Personal experiences', text: 'Content built around real experiences and personal storytelling.' },
        ],
      },
      {
        type: 'steps',
        title: 'Production process',
        steps: [
          { step: 'Idea', text: 'Identify a topic based on personal experience and audience interest.' },
          { step: 'Production', text: 'Plan the format, film the content, and edit for the selected platform.' },
          { step: 'Publishing', text: 'Prepare the final video and accompanying copy.' },
          { step: 'Review', text: 'Compare views and other available performance indicators across posts.' },
        ],
      },
      {
        type: 'list',
        title: 'What I do on the channels',
        items: [
          'Develop content ideas and formats',
          'Plan short-form videos',
          'Film and edit content',
          'Write captions and prepare posts',
          'Manage the publishing process',
          'Review content performance',
          'Work on branded content when applicable',
        ],
      },
    ],
    media: { extra: [] },
    wanted: ['Thumbnails for the four Reels', 'Links to the four Reels', 'Short notes on the creative decisions behind each Reel'],
    links: [{ text: 'Open @lynnonmi on Instagram', href: 'https://www.instagram.com/lynnonmi/' }],
  },
  {
    slug: 'witu-tiktok-live',
    layout: 'rundown',
    lead: null,
    rundown: [
      { step: 'Present', text: 'Present K-beauty products in English and explain their features and usage.' },
      { step: 'Demonstrate', text: 'Demonstrate the products during the livestream.' },
      { step: 'Respond', text: 'Answer viewer questions in real time.' },
      { step: 'Keep it moving', text: 'Adapt explanations to the live audience and keep interaction going throughout the broadcast.' },
    ],
    categories: ['live-commerce'],
    title: 'TikTok LIVE Shopping',
    subtitle: 'Hosting English-language shopping broadcasts for Korean beauty products.',
    org: 'WitU',
    role: 'English Shopping Host',
    period: null,
    periods: ['July–September 2024', 'March–July 2025', 'July–August 2026'],
    periodShort: 'Three engagements, 2024 to 2026',
    spreadStat: { value: '3', label: 'separate engagements as English shopping host, 2024 to 2026' },
    summary: 'Hosted English TikTok LIVE shopping broadcasts featuring Korean beauty products for viewers in Southeast Asia.',
    metric: null,
    heading: 'Presenting Korean beauty products to Southeast Asian audiences through TikTok LIVE.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'I hosted English-language TikTok LIVE shopping broadcasts featuring Korean beauty products for viewers in Southeast Asia.',
          'The role required presenting products, explaining their features, responding to live questions, and maintaining the flow of a shopping broadcast.',
        ],
      },
      {
        type: 'columns',
        title: 'On air',
        items: [
          { title: 'Presenting', text: 'Presented K-beauty products in English and explained product features and usage.' },
          { title: 'Demonstrating', text: 'Demonstrated products during livestreams.' },
          { title: 'Engaging the audience', text: 'Responded to viewer questions in real time, adapted explanations to the live audience, and kept interaction going throughout each broadcast.' },
        ],
      },
      {
        type: 'periods',
        title: 'Three engagements',
        periods: ['July–September 2024', 'March–July 2025', 'July–August 2026'],
        note: 'These are separate engagements, not one continuous appointment. During active periods I hosted approximately two to three broadcasts per week.',
      },
      {
        type: 'chips',
        title: 'Skills demonstrated',
        items: ['Live presentation', 'English-language communication', 'Product storytelling', 'Real-time audience engagement', 'Adaptation during live broadcasts'],
      },
      {
        type: 'callout',
        title: 'About the numbers',
        text: 'No verified sales, conversion, or viewership figures are available for this role, so none are shown.',
      },
    ],
    media: { clips: [], examples: [] },
    wanted: ['Broadcast screenshots', 'Short video clips', 'Product demonstration examples', 'Examples of live presentation'],
    links: [],
  },
  {
    slug: 'red-bull-korea',
    layout: 'field',
    lead: null,
    festivals: 14,
    activities: [
      { title: 'University festivals', text: 'Supported brand activations at university festivals.' },
      { title: 'Product sampling', text: 'Participated in product sampling activities.' },
      { title: 'Sports and music promotions', text: 'Supported sports and music promotions.' },
    ],
    categories: ['brand-marketing'],
    title: 'Red Bull Korea',
    subtitle: 'Campus marketing and brand activations as a Student Marketeer.',
    org: 'Red Bull Korea',
    role: 'Student Marketeer',
    period: 'January–October 2025',
    summary: 'Supported campus marketing and brand activations, including 14 university festivals, product sampling, and sports and music promotions.',
    metric: { value: '14', label: 'university festivals supported' },
    heading: 'Bringing Red Bull activations to 14 university festivals.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'I worked as a Student Marketeer at Red Bull Korea, supporting campus marketing activities and brand activations.',
          'My work included university festivals, product sampling, and sports and music promotions.',
        ],
      },
      {
        type: 'columns',
        title: 'Field marketing activities',
        items: [
          { title: 'University festivals', text: 'Supported brand activations at university festivals.' },
          { title: 'Product sampling', text: 'Participated in product sampling activities.' },
          { title: 'Sports and music promotions', text: 'Supported sports and music promotions.' },
        ],
      },
      {
        type: 'callout',
        title: 'Scope of my participation',
        text: 'I supported activations at 14 university festivals. Fourteen is the number of festivals I was involved in, not the number I organized independently.',
        items: [
          'Coordinated with event staff and university partners',
          'Assisted with on-site execution',
        ],
      },
      {
        type: 'columns',
        title: 'Wings for Life World Run 2025',
        items: [{ title: 'Camera operator', text: 'Operated a camera for the Korean livestream of the event.' }],
      },
      {
        type: 'chips',
        title: 'Skills demonstrated',
        items: ['Field marketing', 'Brand activation', 'Event operations', 'Coordination', 'On-site communication'],
      },
    ],
    media: { activation: [], sampling: [], wings: [] },
    wanted: ['Festival activation photographs', 'Sampling photographs', 'Event materials', 'Wings for Life World Run production images'],
    links: [],
  },
  {
    slug: 'pimadaziwin',
    layout: 'growth',
    lead: null,
    growth: { from: 0, to: 3000, months: 4 },
    pipeline: [
      { step: 'Recruit', text: 'Organized supporter recruitment.' },
      { step: 'Ship', text: 'Coordinated product shipments.' },
      { step: 'Instruct', text: 'Prepared participant instructions.' },
      { step: 'Stay in touch', text: 'Managed supporter communication.' },
    ],
    categories: ['content', 'brand-marketing'],
    title: 'Pimadaziwin',
    subtitle: 'Launching and managing a brand account on X.',
    org: 'Pimadaziwin',
    role: 'X Account Manager',
    period: 'November 2025–October 2026',
    summary: 'Launched and managed the brand\'s X account, supported community engagement, and ran a product supporter program.',
    metric: { value: '3,000', label: 'X followers gained in four months' },
    heading: 'From zero to 3,000 followers in four months.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'I launched and managed Pimadaziwin\'s X account, developing its social media presence and supporting community engagement.',
          'I also organized a product supporter program involving participant recruitment, shipping, and communication.',
        ],
      },
      {
        type: 'metrics',
        title: 'Verified growth',
        items: [{ value: '0 → 3,000', label: 'followers on the brand\'s X account in four months' }],
        notes: [
          'I launched the account and managed its content and community activity during those four months. The growth figure belongs to the account. This record does not credit it to any single post.',
        ],
      },
      {
        type: 'steps',
        title: 'From launch to growth',
        steps: [
          { step: 'Launch', text: 'Established the brand\'s presence on X.' },
          { step: 'Content management', text: 'Managed content and account activity.' },
          { step: 'Community', text: 'Supported engagement and audience growth.' },
          { step: 'Supporter program', text: 'Coordinated recruitment, product distribution, and communication.' },
        ],
      },
      {
        type: 'list',
        title: 'What I did',
        items: [
          'Launched the brand\'s X account',
          'Managed account content and publishing',
          'Supported community growth',
          'Organized supporter recruitment',
          'Coordinated product shipments',
          'Prepared participant instructions',
          'Managed supporter communication',
        ],
      },
    ],
    media: { screenshots: [], content: [], community: [] },
    wanted: ['Account screenshots', 'Follower growth evidence', 'Content examples', 'Supporter program materials'],
    links: [],
  },
  {
    slug: 'constant-refilled',
    layout: 'voices',
    lead: null,
    tiers: [
      { by: 'Lynn', title: 'Brand activity', text: 'Launched and managed brand activity on X, supported influencer seeding, and worked on Instagram content.', stat: null },
      { by: 'Lynn', title: 'Recruitment', text: 'Recruited approximately 20 X users to take part in the Musinsa Beauty Festa activation and supported participant coordination.', stat: '~20 X users' },
      { by: 'Participants', title: 'Organic posts', text: 'Participants generated approximately 100 organic posts. They created them themselves. I did not write them.', stat: '~100 posts' },
    ],
    categories: ['brand-marketing'],
    title: 'Constant / Refilled',
    subtitle: 'Connecting beauty brands with online communities and offline experiences.',
    org: 'Constant and Refilled, beauty brands',
    role: 'Beauty Brand Marketer',
    period: 'July–September 2025',
    summary: 'Supported X, Instagram and influencer marketing for two beauty brands and recruited participants for an offline beauty activation.',
    metric: { value: '~20', label: 'X users I recruited for the Musinsa Beauty Festa activation' },
    heading: 'Connecting beauty brands with online communities and offline experiences.',
    sections: [
      {
        type: 'prose',
        title: 'Overview',
        paragraphs: [
          'I supported social media marketing and influencer activities for the beauty brands Constant and Refilled.',
          'My work included X account management, influencer seeding, Instagram content, and participant recruitment for an offline beauty activation.',
        ],
      },
      {
        type: 'split',
        title: 'Musinsa Beauty Festa activation',
        left: {
          heading: 'What I did',
          items: ['Recruited approximately 20 X users to take part in the activation', 'Supported participant coordination'],
          stat: { value: '~20', label: 'X users recruited' },
        },
        right: {
          heading: 'What participants did',
          items: ['Created approximately 100 organic posts about the activation'],
          stat: { value: '~100', label: 'organic posts, written by participants' },
        },
        note: 'I did not write those posts. They were created by the participants I recruited.',
      },
      {
        type: 'list',
        title: 'Brand marketing work',
        items: ['Launched and managed brand activity on X', 'Supported influencer seeding', 'Worked on Instagram content'],
      },
      {
        type: 'chips',
        title: 'Skills demonstrated',
        items: ['Beauty marketing', 'Social media management', 'Influencer coordination', 'Community recruitment', 'Offline activation support'],
      },
    ],
    media: { influencer: [], campaign: [], participantPosts: [] },
    wanted: ['X content examples', 'Instagram content', 'Musinsa Beauty Festa photographs', 'Participant-generated posts', 'Campaign materials'],
    links: [],
  },
];

/*
  Photographs taken by Lynn. Leave empty until real files exist.
  Add items like:
  { id: 'portrait-01', type: 'portrait', src: 'assets/photos/portrait-01.jpg', width: 1600, height: 2000,
    alt: 'Describe the photograph', caption: 'Verified caption' }
  type is 'portrait' or 'snap'. Add location, date or camera details only when verified.
*/
export const photos = [];

export const about = {
  intro: [
    'I\'m Lynn Kim, a creator and marketer currently studying at Minerva University.',
    'My experience includes producing content for my own channels, hosting TikTok LIVE shopping broadcasts, supporting brand campaigns, and organizing offline events.',
    'I have worked in both established organizations and independent projects. These experiences have involved content planning, social media management, audience communication, event operations, and execution.',
    'Alongside this work, I take portraits and snap photographs.',
  ],
  portrait: { src: null, alt: '' },
  education: [{ school: 'Minerva University', detail: 'Class of 2029', status: 'Currently enrolled' }],
  experience: [
    { role: 'Independent Content Creator', org: '@lynnonmi', period: null, slug: 'lynnonmi' },
    { role: 'Event Organizer', org: 'Solo Party', period: '2026', slug: 'solo-party' },
    { role: 'X Account Manager', org: 'Pimadaziwin', period: 'November 2025–October 2026', slug: 'pimadaziwin' },
    { role: 'Student Marketeer', org: 'Red Bull Korea', period: 'January–October 2025', slug: 'red-bull-korea' },
    { role: 'Beauty Brand Marketer', org: 'Constant / Refilled', period: 'July–September 2025', slug: 'constant-refilled' },
    { role: 'English Shopping Host', org: 'WitU / TikTok LIVE', period: null, periods: ['July–September 2024', 'March–July 2025', 'July–August 2026'], slug: 'witu-tiktok-live' },
  ],
  /* Smaller entries. Each shows only what is verified. Add dates, roles and scope once confirmed. */
  additional: [
    { name: 'Team 1llusion', text: 'Participation in a YouTube channel with approximately 1.1 million subscribers.', note: 'The subscriber count belongs to the channel. My role and dates are to be confirmed.' },
    { name: 'Samsung Electronics', text: 'Advertising model experience.', note: 'Dates and scope to be confirmed.' },
    { name: 'Interpretation', text: 'Interpretation experience.', note: 'Settings and dates to be confirmed.' },
    { name: 'Other roles', text: 'Additional internships and professional roles.', note: 'Organizations, roles and dates to be confirmed.' },
  ],
  skills: [
    { group: 'Content & media', items: ['Content planning', 'Short-form video production', 'Filming', 'Video editing', 'Social media management', 'Photography'] },
    { group: 'Marketing & operations', items: ['Brand activation', 'Event planning and operations', 'Community management', 'Influencer coordination', 'Live commerce', 'Audience communication'] },
    { group: 'Software', items: ['Adobe Premiere Pro', 'Final Cut Pro', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Microsoft Excel', 'Microsoft PowerPoint'] },
    { group: 'Languages', items: ['Korean', 'English', 'Chinese'] },
  ],
};

/* More results, shown after the featured projects. These do not repeat the hero figures. */
export const homeFigures = [
  { value: '84', label: 'attendees at the second Solo Party', note: 'Up from 66 at the first event', slug: 'solo-party' },
  { value: '3,000', label: 'followers gained on Pimadaziwin\'s X account', note: 'In four months, from zero', slug: 'pimadaziwin' },
  { value: '14', label: 'university festivals supported through Red Bull Korea', note: 'Festivals involved in', slug: 'red-bull-korea' },
  { value: '~20', label: 'X users I recruited for the Musinsa Beauty Festa activation', note: 'Participants then wrote ~100 posts', slug: 'constant-refilled' },
];

/* Home page features these three projects, in this order. */
export const homeFeatured = ['solo-party', 'lynnonmi', 'witu-tiktok-live'];

/* Project order used on the Work page and in previous/next links. */
export const order = ['solo-party', 'lynnonmi', 'witu-tiktok-live', 'red-bull-korea', 'pimadaziwin', 'constant-refilled'];

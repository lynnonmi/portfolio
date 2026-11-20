/*
  All site content lives here, taken from Lynn Kim's master portfolio brief
  (November 2026). Only verified facts are written in this file.

  Pending media (photographs, videos, screenshots) is listed under `evidence`
  or `photos` and shows as a labelled placeholder until a real file is set.
  Items not yet confirmed stay out of the site; see `pendingConfirmation`.
*/

export const site = {
  name: 'Lynn Kim',
  year: 2026,
  headline: 'Content Creator · Marketer · Event Organizer',
  secondary: 'Live Commerce · Photography',
  tagline: 'I create content, build communities, and bring ideas to life through marketing and events.',
  intro: [
    'I create content, build communities, and bring ideas to life through marketing and events.',
    'My experience spans social media content, brand campaigns, live commerce, and event operations. I have worked with brands, developed my own projects, and managed the process from planning to execution.',
  ],
  email: 'eggielikestaco@gmail.com',
  instagram: { handle: '@lynnonmi', url: 'https://www.instagram.com/lynnonmi/' },
  resume: null, // set to a PDF path such as 'assets/Lynn-Kim-Resume.pdf' when the file is supplied
  asOf: 'November 20, 2026',
};

/* Work archive folders. `all` shows every project. */
export const categories = [
  { id: 'all', label: 'All Work', tone: 'char', note: 'Every project in one folder.' },
  { id: 'content', label: 'Content & Social Media', tone: 'pink', note: 'Channels I create for and accounts I manage.' },
  { id: 'events', label: 'Events & Community', tone: 'blue', note: 'Offline events planned and run.' },
  { id: 'live-commerce', label: 'Live Commerce', tone: 'cream', note: 'Live shopping broadcasts.' },
  { id: 'brand-marketing', label: 'Brand Marketing', tone: 'rose', note: 'Campaigns, activations and brand accounts.' },
];

/*
  Project fields
  slug, categories[]           folders the project appears in (besides All Work)
  title, subtitle, org, role   identity
  period / periods[]           one period, or several separate ones
  summary, metric              card text; metric is { value, label } or null
  heading                      pull-quote shown on the detail page
  overview[]                   paragraphs
  events[]                     optional, { name, date, role, responsibilities[], results[] }
  responsibilities[]           what Lynn did
  themes[], reels[], extras[]  optional extra blocks
  process[]                    { step, text }
  results[]                    { value, label }
  notes[]                      clarifications shown with the results
  skills[]                     skills demonstrated
  evidence[]                   names of media still to be supplied
  links[]                      { text, href }
*/
export const projects = [
  {
    slug: 'solo-party',
    categories: ['events'],
    title: 'Solo Party',
    subtitle: 'From co-organizing a social event to independently producing the next edition.',
    org: 'Solo Party',
    role: 'Event Organizer / Project Lead for the second event',
    period: 'May–August 2026',
    summary: 'Co-organized the first Solo Party with Hogamdo, then planned and ran the second edition on my own.',
    metric: { value: '66 → 84', label: 'attendees, first to second event' },
    heading: '66 attendees. Then 84. Two editions of Solo Party.',
    overview: [
      'Solo Party is an offline social event designed to help participants meet and interact through structured activities.',
      'I co-organized the first event with Hogamdo and independently planned and operated the second edition. My responsibilities covered promotion, participant recruitment, communication, program development, and event-day operations.',
    ],
    events: [
      {
        name: 'Event 01',
        date: 'May 27, 2026',
        role: 'Co-organizer with Hogamdo',
        responsibilities: [
          'Created promotional Instagram Reels and Stories',
          'Supported participant recruitment',
          'Managed participant communication',
          'Secured five event sponsors',
          'Helped host and operate the event',
        ],
        results: ['150 applicants', '66 attendees', 'Five sponsors secured'],
      },
      {
        name: 'Event 02',
        date: 'August 9, 2026',
        role: 'Independent Organizer',
        responsibilities: [
          'Planned the event concept and structure',
          'Managed recruitment and application screening',
          'Designed the GUESS ME, FIND ME, and MATCH ME activities',
          'Coordinated the development of a web application using AI tools',
          'Managed participant approvals, voting, and matching processes',
          'Coordinated staff and participant communication',
          'Managed on-site operations',
        ],
        results: ['180 unique applicants', '84 attendees'],
      },
    ],
    process: [
      { step: 'Planning', text: 'Developed the event structure and designed activities that encouraged participants to interact.' },
      { step: 'Recruitment', text: 'Managed promotion, applications, participant screening, and communication.' },
      { step: 'Digital operations', text: 'Coordinated an application and matching workflow supported by a web application built with AI tools.' },
      { step: 'Event execution', text: 'Managed staffing, participant experience, and on-site operations.' },
    ],
    results: [
      { value: '150', label: 'applicants, first event' },
      { value: '66', label: 'attendees, first event' },
      { value: '180', label: 'unique applicants, second event' },
      { value: '84', label: 'attendees, second event' },
    ],
    notes: [
      'Applicants rose from 150 to 180 and attendance from 66 to 84. No single marketing activity is credited with that increase.',
      'The first event was co-organized with Hogamdo. The second was independently organized.',
    ],
    skills: [],
    evidence: [
      'Promotional Reels',
      'Event posters',
      'Event photographs',
      'Application website screenshots',
      'GUESS ME / FIND ME / MATCH ME materials',
      'Participant communication examples, private information removed',
    ],
    links: [],
  },
  {
    slug: 'lynnonmi',
    categories: ['content'],
    title: '@lynnonmi',
    subtitle: 'Building and managing my own social media channels.',
    org: '@lynnonmi, my own channels',
    role: 'Independent Content Creator',
    period: null,
    platform: 'Instagram and YouTube',
    summary: 'Plans, films, edits and publishes content on student life, beauty, lifestyle and life in different cities.',
    metric: { value: '23,400', label: 'Instagram followers' },
    heading: 'Creating content for an audience of 23.4K.',
    overview: [
      'I plan, film, edit, and publish content for my personal channels, covering student life, beauty, lifestyle, and experiences in different cities.',
      'I manage the creative process from topic selection and content planning to filming, editing, publishing, and reviewing performance.',
    ],
    responsibilities: [
      'Develop content ideas and formats',
      'Plan short-form videos',
      'Film and edit content',
      'Write captions and prepare posts',
      'Manage the publishing process',
      'Review content performance',
      'Work on branded content when applicable',
    ],
    themes: [
      { name: 'Student life', text: 'University experiences, academic life, and personal routines.' },
      { name: 'Lifestyle', text: 'Everyday experiences, places, and activities.' },
      { name: 'Beauty', text: 'Beauty-related content and product experiences.' },
      { name: 'Personal experiences', text: 'Content built around real experiences and personal storytelling.' },
    ],
    process: [
      { step: 'Idea', text: 'Identify a topic based on personal experience and audience interest.' },
      { step: 'Production', text: 'Plan the format, film the content, and edit for the selected platform.' },
      { step: 'Publishing', text: 'Prepare the final video and accompanying copy.' },
      { step: 'Review', text: 'Compare views and other available performance indicators across posts.' },
    ],
    results: [
      { value: '23,400', label: 'Instagram followers' },
      { value: '3.18M', label: 'views on the highest-performing Reel' },
    ],
    notes: [
      'Instagram figures are as of November 20, 2026.',
      'Reel numbers are views on individual videos, not total account views.',
    ],
    reels: [
      { rank: 'Highest-performing Reel', views: '3.18M' },
      { rank: 'High-performing Reel', views: '1.92M' },
      { rank: 'High-performing Reel', views: '1.39M' },
      { rank: 'High-performing Reel', views: '1.30M' },
    ],
    skills: [],
    evidence: [
      'Thumbnails for the four Reels',
      'Links to the four Reels',
      'Short notes on the creative decisions behind each Reel',
    ],
    links: [{ text: 'Open @lynnonmi on Instagram', href: 'https://www.instagram.com/lynnonmi/' }],
  },
  {
    slug: 'witu-tiktok-live',
    categories: ['live-commerce'],
    title: 'TikTok LIVE Shopping',
    subtitle: 'Hosting English-language shopping broadcasts for Korean beauty products.',
    org: 'WitU',
    role: 'English Shopping Host',
    period: null,
    periods: ['July–September 2024', 'March–July 2025', 'July–August 2026'],
    periodShort: 'Three periods, 2024 to 2026',
    summary: 'Hosted English TikTok LIVE shopping broadcasts featuring Korean beauty products for viewers in Southeast Asia.',
    metric: null,
    heading: 'Presenting Korean beauty products to Southeast Asian audiences through TikTok LIVE.',
    overview: [
      'I hosted English-language TikTok LIVE shopping broadcasts featuring Korean beauty products for viewers in Southeast Asia.',
      'The role required presenting products, explaining their features, responding to live questions, and maintaining the flow of a shopping broadcast.',
    ],
    responsibilities: [
      'Present K-beauty products in English',
      'Demonstrate products during livestreams',
      'Explain product features and usage',
      'Respond to viewer questions in real time',
      'Adapt explanations to the live audience',
      'Maintain audience interaction throughout broadcasts',
    ],
    process: [
      { step: 'Present', text: 'Introduce each product in English.' },
      { step: 'Explain', text: 'Cover features and usage, with product demonstrations on stream.' },
      { step: 'Respond', text: 'Answer viewer questions in real time and adapt the explanation to the audience.' },
      { step: 'Keep the flow', text: 'Maintain interaction so the broadcast keeps moving.' },
    ],
    processTitle: 'What a broadcast involves',
    results: [],
    resultsNote: 'No verified sales, conversion, or viewership figures are available for this role, so none are shown.',
    notes: [
      'Broadcast frequency: approximately two to three broadcasts per week during active engagement periods.',
      'The three periods are separate engagements, not one continuous appointment.',
    ],
    skills: ['Live presentation', 'English-language communication', 'Product storytelling', 'Real-time audience engagement', 'Adaptation during live broadcasts'],
    evidence: ['Broadcast screenshots', 'Short video clips', 'Product demonstration examples', 'Examples of live presentation'],
    links: [],
  },
  {
    slug: 'red-bull-korea',
    categories: ['brand-marketing'],
    title: 'Red Bull Korea',
    subtitle: 'Campus marketing and brand activations as a Student Marketeer.',
    org: 'Red Bull Korea',
    role: 'Student Marketeer',
    period: 'January–October 2025',
    summary: 'Supported campus marketing and brand activations, including 14 university festivals, product sampling, and sports and music promotions.',
    metric: { value: '14', label: 'university festivals supported' },
    heading: 'Bringing Red Bull activations to 14 university festivals.',
    overview: [
      'I worked as a Student Marketeer at Red Bull Korea, supporting campus marketing activities and brand activations.',
      'My work included university festivals, product sampling, and sports and music promotions.',
    ],
    responsibilities: [
      'Supported brand activations at university festivals',
      'Participated in product sampling activities',
      'Supported sports and music promotions',
      'Coordinated with event staff and university partners',
      'Assisted with on-site execution',
    ],
    results: [{ value: '14', label: 'university festivals with supported activations' }],
    notes: ['Fourteen is the number of festivals I was involved in, not the number I organized independently.'],
    extras: [
      { title: 'Wings for Life World Run 2025', text: 'Operated a camera for the Korean livestream of the event.' },
    ],
    skills: ['Field marketing', 'Brand activation', 'Event operations', 'Coordination', 'On-site communication'],
    evidence: ['Festival activation photographs', 'Sampling photographs', 'Event materials', 'Wings for Life World Run production images'],
    links: [],
  },
  {
    slug: 'pimadaziwin',
    categories: ['content', 'brand-marketing'],
    title: 'Pimadaziwin',
    subtitle: 'Launching and managing a brand account on X.',
    org: 'Pimadaziwin',
    role: 'X Account Manager',
    period: 'November 2025–October 2026',
    summary: 'Launched and managed the brand\'s X account, supported community engagement, and ran a product supporter program.',
    metric: { value: '3,000', label: 'X followers gained in four months' },
    heading: 'From zero to 3,000 followers in four months.',
    overview: [
      'I launched and managed Pimadaziwin\'s X account, developing its social media presence and supporting community engagement.',
      'I also organized a product supporter program involving participant recruitment, shipping, and communication.',
    ],
    responsibilities: [
      'Launched the brand\'s X account',
      'Managed account content and publishing',
      'Supported community growth',
      'Organized supporter recruitment',
      'Coordinated product shipments',
      'Prepared participant instructions',
      'Managed supporter communication',
    ],
    process: [
      { step: 'Launch', text: 'Established the brand\'s presence on X.' },
      { step: 'Content management', text: 'Managed content and account activity.' },
      { step: 'Community', text: 'Supported engagement and audience growth.' },
      { step: 'Supporter program', text: 'Coordinated recruitment, product distribution, and communication.' },
    ],
    results: [{ value: '0 → 3,000', label: 'followers on the brand\'s X account in four months' }],
    notes: [],
    skills: [],
    evidence: ['Account screenshots', 'Follower growth evidence', 'Content examples', 'Supporter program materials'],
    links: [],
  },
  {
    slug: 'constant-refilled',
    categories: ['brand-marketing'],
    title: 'Constant / Refilled',
    subtitle: 'Connecting beauty brands with online communities and offline experiences.',
    org: 'Constant and Refilled, beauty brands',
    role: 'Beauty Brand Marketer',
    period: 'July–September 2025',
    summary: 'Supported X, Instagram and influencer marketing for two beauty brands and recruited participants for an offline beauty activation.',
    metric: { value: '~100', label: 'organic posts from about 20 recruited X users' },
    heading: 'Connecting beauty brands with online communities and offline experiences.',
    overview: [
      'I supported social media marketing and influencer activities for the beauty brands Constant and Refilled.',
      'My work included X account management, influencer seeding, Instagram content, and participant recruitment for an offline beauty activation.',
    ],
    responsibilities: [
      'Launched and managed brand activity on X',
      'Supported influencer seeding',
      'Worked on Instagram content',
      'Recruited X users for a beauty event activation',
      'Supported participant coordination',
    ],
    extras: [
      {
        title: 'Musinsa Beauty Festa activation',
        text: 'Recruited approximately 20 X users to take part in the activation. Participants generated approximately 100 organic posts.',
      },
    ],
    results: [
      { value: '~20', label: 'X users recruited for the activation' },
      { value: '~100', label: 'organic posts created by participants' },
    ],
    notes: ['The roughly 100 posts were written by the participants, not by me.'],
    skills: ['Beauty marketing', 'Social media management', 'Influencer coordination', 'Community recruitment', 'Offline activation support'],
    evidence: ['X content examples', 'Instagram content', 'Musinsa Beauty Festa photographs', 'Participant-generated posts', 'Campaign materials'],
    links: [],
  },
];

/*
  Photographs taken by Lynn. type is 'portrait' or 'snap'.
  Add real files by setting src, width, height, alt and caption.
  Only add location, date or camera details that are verified.
*/
const photo = (type, n, shape) => ({
  id: `${type}-${String(n).padStart(2, '0')}`,
  type,
  no: String(n).padStart(2, '0'),
  shape,
  src: null,
  width: null,
  height: null,
  alt: '',
  caption: null,
});

export const photos = [
  photo('portrait', 1, 'tall'),
  photo('portrait', 2, 'wide'),
  photo('snap', 1, 'square'),
  photo('snap', 2, 'square'),
  photo('snap', 3, 'square'),
];

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
  skills: [
    { group: 'Content & media', items: ['Content planning', 'Short-form video production', 'Filming', 'Video editing', 'Social media management', 'Photography'] },
    { group: 'Marketing & operations', items: ['Brand activation', 'Event planning and operations', 'Community management', 'Influencer coordination', 'Live commerce', 'Audience communication'] },
    { group: 'Software', items: ['Adobe Premiere Pro', 'Final Cut Pro', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Microsoft Excel', 'Microsoft PowerPoint'] },
    { group: 'Languages', items: ['Korean', 'English', 'Chinese'] },
  ],
};

/* Home page figures. Each belongs to the project beside it, not to a combined total. */
export const keyFigures = [
  { value: '23,400', label: 'Instagram followers on @lynnonmi', note: `As of ${site.asOf}`, slug: 'lynnonmi' },
  { value: '3.18M', label: 'views on the highest-performing @lynnonmi Reel', note: 'One video, not account total', slug: 'lynnonmi' },
  { value: '180', label: 'applicants for the second Solo Party', note: 'Unique applicants', slug: 'solo-party' },
  { value: '84', label: 'attendees at the second Solo Party', note: 'August 9, 2026', slug: 'solo-party' },
  { value: '14', label: 'university festivals supported through Red Bull Korea', note: 'Festivals involved in', slug: 'red-bull-korea' },
  { value: '3,000', label: 'followers gained on Pimadaziwin\'s X account in four months', note: 'Account launched from zero', slug: 'pimadaziwin' },
];

export const featured = ['solo-party', 'lynnonmi', 'witu-tiktok-live', 'red-bull-korea', 'pimadaziwin', 'constant-refilled'];

/*
  Not shown on the site until Lynn confirms exact dates, scope and wording:
  Team 1llusion (YouTube channel, about 1.1 million subscribers), Samsung
  Electronics advertising model experience, additional internships and
  professional roles, interpretation experience.
*/
export const pendingConfirmation = ['Team 1llusion', 'Samsung Electronics', 'Additional internships and roles', 'Interpretation experience'];

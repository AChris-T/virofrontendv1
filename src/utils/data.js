export const courseCategories = [
  {
    title: 'Foundations',
    description:
      'Start your journey with core teachings on salvation, prayer, and Scripture.',
    image: '/images/home/Foundations.png',
    lessons: 15,
  },
  {
    title: ' Disciple',
    description: 'Learn to follow Jesus daily with obedience and intimacy.',
    image: '/images/home/Disciple.png',
    lessons: 15,
  },
  {
    title: ' Ministry',
    description:
      'Discover your calling and how to serve effectively in the body of Christ.',
    image: '/images/home/Ministry.png',
    lessons: 15,
  },
  {
    title: 'Leadership',
    description:
      'Grow into a Christ-centered leader — humble, bold, and Spirit-led.',
    image: '/images/home/Christ.png',
    lessons: 15,
  },
];

export const courseFeatures = [
  {
    icon: '/images/home/bible_icon.svg',
    alt: 'Bible Icon',
    title: 'Browse Biblical Courses.',
    description: (
      <>
        Explore our free library of Bible-based discipleship
        <br />
        courses created to help you grow in Christ.
      </>
    ),
    linkText: 'Explore Courses →',
    href: '/dashboard/explore-courses',
  },
  {
    icon: '/images/home/video_icon.svg',
    alt: 'Video Icon',
    title: 'Learn At Your Pace.',
    description: (
      <>
        Watch videos, listen to audio teachings, or read
        <br />
        notes all at your convenience.
      </>
    ),
    linkText: 'Browse Library →',
    href: '/dashboard/explore-courses',
  },
  {
    icon: '/images/home/cross_icon.svg',
    alt: 'Cross Icon',
    title: 'Grow In Christ.',
    description: (
      <>
        Apply what you learn as we help you become a
        <br />
        disciple who reflects Jesus in everyday life.
      </>
    ),
    linkText: 'Start Growing →',
    href: '/dashboard/explore-courses',
  },
];

export const switchConfigs = {
  account: [
    {
      key: 'personal',
      label: 'Personal Information',
      description: 'Edit your personal information.',
    },
  ],
  notification: [
    {
      key: 'push',
      label: 'Push Notifications',
      description: 'Control alerts for new activities and updates.',
    },
    {
      key: 'lesson',
      label: 'Lesson Notifications',
      description: 'Receive notifications about your lesson progress.',
    },
    {
      key: 'live',
      label: 'Live & Special Events',
      description:
        'Get notified about special events, fasts, or prayer meetings.',
    },
    {
      key: 'general',
      label: 'General Notifications',
      description: 'Manage announcements and feedback requests.',
    },
  ],
  security: [
    {
      key: 'password',
      label: 'Password Settings',
      description: 'Change to a new password.',
    },
    {
      key: 'delete',
      label: 'Delete Account',
      description: 'Request permanent deletion of my account',
    },
  ],
};

export const notifications = [
  {
    title: 'Start A New Course.',
    description: 'Continue your journey in Christ by starting the next course.',
    time: 'Just Now',
    read: false,
    iconBg: 'bg-gray-100',
    iconColor: 'text-black',
  },
  {
    title: 'Course Completed! 🎉',
    description:
      'Congratulations on completing all lessons in the Foundations Course!',
    time: '1 min',
    read: true,
    iconBg: 'bg-gray-100',
    iconColor: 'text-black',
  },
  {
    title: 'New Milestone! 🔥',
    description: 'You’ve completed 5 lessons in a row! Keep the streak alive',
    time: '1 day',
    read: true,
    iconBg: 'bg-gray-100',
    iconColor: 'text-black',
  },
  {
    title: 'Lesson Reminder',
    description: 'Don’t forget to complete your lesson for this week.',
    time: '1 day',
    read: false,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-400',
  },
];

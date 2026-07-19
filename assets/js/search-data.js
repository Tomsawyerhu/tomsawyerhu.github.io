// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed publications and preprints, listed in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Open-source tools and research software.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Education, experience, honors, and research interests.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-chinese-webnovel-skill",
          title: 'Chinese WebNovel Skill',
          description: "A modular Codex skill for planning, drafting, revising, and reviewing Chinese web fiction. It combines task-specific writing modules with local corpus retrieval to support story concepts, openings, dialogue, transitions, chapter endings, plot and character consistency, long-form outlining, and a more natural narrative voice.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chinese-webnovel-skill/";
            },},{id: "projects-persona-poker",
          title: 'Persona Poker',
          description: "A personalized multi-agent Texas Hold&#39;em simulation framework that gives agents distinct playing styles, memory, and context-aware decision policies for studying bluffing, exploitability, and long-term performance.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/persona-poker/";
            },},{id: "projects-persona-skill",
          title: 'Persona Skill',
          description: "A source-first persona engineering system that turns biographies, interviews, quotes, chat logs, and documents into evidence-grounded personas that can be distilled, switched, fused, and role-played through a unified command workflow.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/persona-skill/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/Haichuan_Hu_Academic_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%61%69%63%68%75%61%6E.%68%75@%63%6F%6E%6E%65%63%74.%70%6F%6C%79%75.%68%6B", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Tomsawyerhu", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=5qJ9w5EAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

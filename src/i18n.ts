type Lang = 'en';

const messages: Record<Lang, Record<string, string>> = {
  en: {
    'status.idle': 'Waiting',
    'status.running': 'Running',
    'status.completed': 'Completed',
    'status.error': 'Error',
    'lang.switch': 'EN',

    'input.label': 'Product Name',
    'input.placeholder': 'Enter product name, e.g. Smart Calendar',
    'input.start': 'Start Planning',
    'input.running': 'Running...',
    'input.examples': 'Quick Examples',
    'example.1': 'Smart Calendar',
    'example.2': 'Online Education Platform',
    'example.3': 'Health Management App',

    'chat.send': 'Send',

    'options.custom': 'Or type your own thought…',
    'options.done': 'Looks good, no changes needed',
    'options.finalize': 'Confirmed. Please output the final PRD and Tech Spec.',

    'empty.title': 'Ready to Plan',
    'empty.step1': 'PM gathers requirements',
    'empty.step2': 'Generate PRD and Tech Spec',
    'empty.step3': 'Iterate and confirm final version',

    'msg.thinking': 'Thinking...',
    'msg.speaking': 'is speaking',
    'msg.ended': 'Conversation ended. Enter a new product name on the left to start again.',

    'phase.discover': 'Discovery',
    'phase.draft': 'Drafting',
    'phase.iterate': 'Iteration',

    'doc.expand': 'expand',
    'doc.collapse': 'collapse',

    'crew.pm.tag': 'PM',
    'crew.tl.tag': 'TL',
    'agent.pm': 'Product Manager',
    'agent.dev': 'Tech Lead',

    'locale.name': 'English',

    'history.title': 'History',
    'history.delete': 'Delete',
    'history.loading': 'Loading...',
    'history.empty': 'This conversation has no history',
    'history.failed': 'Failed to load conversation history',
  },
};

let currentLang: Lang = 'en';
let listeners: Array<() => void> = [];

export function initLang(): void {
  currentLang = 'en';
}

export function getLang(): Lang {
  return 'en';
}

export function toggleLang(): void {
  currentLang = 'en';
  listeners.forEach((fn) => fn());
}

export function onLangChange(fn: () => void): () => void {
  listeners.push(fn);
  return () => { listeners = listeners.filter((f) => f !== fn); };
}

export function getLocaleName(): string {
  return messages[currentLang]['locale.name'];
}

export function t(key: string): string {
  return messages[currentLang][key] || messages['en'][key] || key;
}

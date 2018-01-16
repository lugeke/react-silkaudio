import { FETCH_AUDIOBOOKS } from '../actions';

const audiobooksReducer = (state = [], action) => {
  switch (action.type) {
    case 'AUDIO.pause':
    case 'AUDIO.end': {
      const audiobookIndex = state.findIndex(a => a.audiobook.id === action.id);
      const oldaudiobook = state[audiobookIndex];
      const newaudiobook = {
        ...oldaudiobook,
        progress: progressReducer(
          oldaudiobook.progress,
          { ...action, chapter: oldaudiobook.audiobook.chapter },
        ),
        recentListen: Date.now(),
      };
      const r = [
        ...state.slice(0, audiobookIndex),
        newaudiobook,
        ...state.slice(audiobookIndex + 1, state.length),
      ];
      let list = localStorage.getItem('audiobookIdList');
      if (list) {
        list = JSON.parse(list);
        list = [ ...new Set(list) ];
      } else {
        list = [];
      }
      if (!list.includes(newaudiobook.audiobook.id)) {
        list.push(newaudiobook.audiobook.id);
        localStorage.setItem(`audiobookIdList`, JSON.stringify(list));
      }
      localStorage.setItem(`audiobook_${newaudiobook.audiobook.id}`, JSON.stringify(newaudiobook));
      return r;
    }
    case FETCH_AUDIOBOOKS: {
      return action.audiobooks;
    }
    default: {
      return state;
    }
  }
};


/*
{
  "recentChapter":"01 - Introduction",
  "all":{
      "11 - Ch02 - The Craving Brain; How To Create New Habits - Part 05": 45,
      "05 - Ch01 - The Habit Loop; How Habits Work - Part 03": 90
  }
*/
function progressReducer(state, action) {
  switch (action.type) {
    case 'AUDIO.pause': {
      const t = {};
      t[state.recentChapter] = action.chapterProgress;
      return { ...state, all: { ...state.all, ...t } };
    }
    case 'AUDIO.end': {
      const { recentChapter } = state;
      const { chapter } = action;
      console.log('currentChapter ', recentChapter);
      // choose next chapter
      const nextChapterIndex = chapter.indexOf(recentChapter) + 1;
      const nextChapter = nextChapterIndex === chapter.length ?
        '' : chapter[nextChapterIndex];

      const t = {};
      t[recentChapter] = 0;
      t[nextChapter] = 0;
      console.log('nextChapter ', nextChapter);
      return { recentChapter: nextChapter, all: { ...state.all, ...t } };
    }
    default: {
      return state;
    }
  }
}

export default audiobooksReducer;

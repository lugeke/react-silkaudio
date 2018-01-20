import {
  ADD_RECENT_LISTEN, PAUSE_AUDIO, PLAY_AUDIO,
  ON_AUDIO_END, ON_AUDIO_PAUSE, ON_AUDIO_PLAY,
} from '../actions';

const recentListenReducer = (state = {
  byIds: [],
  allIds: { 0: 0 },
}, action) => {
  switch (action.type) {
    case PLAY_AUDIO: {
      const index = state.byIds.indexOf(action.id);
      if (index === -1) {
        // not found id
        return {
          byIds: [ action.id, ...state.byIds ],
          allIds: {
            ...state.allIds,
            [action.id]: {
              audiobookId: action.id,
              progress: 0,
            },
          },
        };
      } else {
        // id move to first
        const byIds = state.byIds.slice();
        byIds.splice(index, 1);
        return {
          ...state,
          byIds: [ action.id, ...byIds ],
        };
      }
    }
    case ON_AUDIO_PAUSE:
    case ON_AUDIO_END: {
      // let list = localStorage.getItem('audiobookIdList');
      // if (list) {
      //   list = JSON.parse(list);
      //   list = [ ...new Set(list) ];
      // } else {
      //   list = [];
      // }
      // if (!list.includes(newaudiobook.audiobook.id)) {
      //   list.push(newaudiobook.audiobook.id);
      //   localStorage.setItem(`audiobookIdList`, JSON.stringify(list));
      // }
      // localStorage.setItem(`audiobook_${newaudiobook.audiobook.id}`, JSON.stringify(newaudiobook));
      return {
        ...state,
        allIds: {
          ...state.allIds,
          [action.id]: {
            audiobookId: action.id,
            progress: action.progress,
          },
        },
      };
    }
    case ADD_RECENT_LISTEN: {
      return action.recentListen;
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
// function progressReducer(state, action) {
//   switch (action.type) {
//     case AUDIO_PAUSE: {
//       const t = {};
//       t[state.recentChapter] = action.chapterProgress;
//       return { ...state, all: { ...state.all, ...t } };
//     }
//     case AUDIO_END: {
//       const { recentChapter } = state;
//       const { chapter } = action;
//       // choose next chapter
//       const nextChapterIndex = chapter.indexOf(recentChapter) + 1;
//       const nextChapter = nextChapterIndex === chapter.length ?
//         '' : chapter[nextChapterIndex];


//       return {
//         recentChapter: nextChapter,
//         all: {
//           ...state.all,
//           [recentChapter]: 0,
//           [nextChapter]: 0,
//         },
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }

export default recentListenReducer;

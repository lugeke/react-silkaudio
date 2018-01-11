import React, { Component } from 'react';
import { Button, Card, Icon, Image, Menu } from 'semantic-ui-react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const reducer = combineReducers({
  playId: playIdReducer,
  histories: historiesReducer,
});

const store = createStore(reducer);

const AUDIO = {
  play: 'play',
  pause: 'pause',
  end: 'end',
};


function playIdReducer(state = '0', action) {
  console.log(AUDIO);
  if (action.type === 'AUDIO.play') {
    return action.id;
  } else {
    return state;
  }
}

function historiesReducer(state = [
  {
    "audiobook": {
      "id": "3",
      "author": [
        "Neil deGrasse Tyson",
      ],
      "chapter": ["Astrophysics for People in a Hurry-Part01", "Astrophysics for People in a Hurry-Part02", "Astrophysics for People in a Hurry-Part03", "Astrophysics for People in a Hurry-Part04"],
      "description": "What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There's no better guide through these mind-expanding questions than acclaimed astrophysicist and best-selling author Neil deGrasse Tyson.\n\n        But today, few of us have time to contemplate the cosmos. So Tyson brings the universe down to Earth succinctly and clearly, with sparkling wit, in digestible chapters consumable anytime and anywhere in your busy day. While waiting for your morning coffee to brew, or while waiting for the bus, the train, or the plane to arrive, Astrophysics for People in a Hurry will reveal just what you need to be fluent and ready for the next cosmic headlines: from the big bang to black holes, from quarks to quantum mechanics, and from the search for planets to the search for life in the universe.",
      "title": "Astrophysics for People in a Hurry",
      "url": "http://localhost:5000/api/v1.0/audiobooks/?id=1"
    },
    "progress": {
      "recentChapter": "Astrophysics for People in a Hurry-Part01",
      "all": {
        'Astrophysics for People in a Hurry-Part01': 0,
      }
    },
    "recentListen": 0,
  },
  {
    "audiobook": {
      "id": "1",
      "author": [
        "Charles Duhigg",
      ],
      "chapter": [
        "01 - Introduction",
        "02 - Prologue - The Habit Cure",
        "03 - Ch01 - The Habit Loop; How Habits Work - Part 01",
        "04 - Ch01 - The Habit Loop; How Habits Work - Part 02",
        "05 - Ch01 - The Habit Loop; How Habits Work - Part 03",
        "06 - Ch01 - The Habit Loop; How Habits Work - Part 04",
        "07 - Ch02 - The Craving Brain; How To Create New Habits - Part 01",
        "08 - Ch02 - The Craving Brain; How To Create New Habits - Part 02",
        "09 - Ch02 - The Craving Brain; How To Create New Habits - Part 03",
        "10 - Ch02 - The Craving Brain; How To Create New Habits - Part 04",
        "11 - Ch02 - The Craving Brain; How To Create New Habits - Part 05",
        "12 - Ch03 - The Golden Rule of Habit Change; Why Transformation Occurs - Part 01",
        "13 - Ch03 - The Golden Rule of Habit Change; Why Transformation Occurs - Part 02",
        "14 - Ch03 - The Golden Rule of Habit Change; Why Transformation Occurs - Part 03",
        "15 - Ch03 - The Golden Rule of Habit Change; Why Transformation Occurs - Part 04",
        "16 - Ch03 - The Golden Rule of Habit Change; Why Transformation Occurs - Part 05",
        "17 - Ch04 - Keystone Habits, or the Ballad of Paul O'Neil; Which Habits Matter Most - Part 01",
        "18 - Ch04 - Keystone Habits, or the Ballad of Paul O'Neil; Which Habits Matter Most - Part 02",
        "19 - Ch04 - Keystone Habits, or the Ballad of Paul O'Neil; Which Habits Matter Most - Part 03",
        "20 - Ch05 - Starbucks and the Habit of Success; When Willpower Becomes Automatic - Part 01",
        "21 - Ch05 - Starbucks and the Habit of Success; When Willpower Becomes Automatic - Part 02",
        "22 - Ch05 - Starbucks and the Habit of Success; When Willpower Becomes Automatic - Part 03",
        "23 - Ch05 - Starbucks and the Habit of Success; When Willpower Becomes Automatic - Part 04",
        "24 - Ch05 - Starbucks and the Habit of Success; When Willpower Becomes Automatic - Part 05",
        "25 - Ch06 - The Power of A Crisis; How Leaders Create Habit Through Accident and Design - Part 01",
        "26 - Ch06 - The Power of A Crisis; How Leaders Create Habit Through Accident and Design - Part 02",
        "27 - Ch06 - The Power of A Crisis; How Leaders Create Habit Through Accident and Design - Part 03",
        "28 - Ch06 - The Power of A Crisis; How Leaders Create Habit Through Accident and Design - Part 04",
        "29 - Ch07 - How Target Knows What You Want Before You Do; When Companies Predict (and Manipulate) Habits - Part 01",
        "30 - Ch07 - How Target Knows What You Want Before You Do; When Companies Predict (and Manipulate) Habits - Part 02",
        "31 - Ch07 - How Target Knows What You Want Before You Do; When Companies Predict (and Manipulate) Habits - Part 03",
        "32 - Ch07 - How Target Knows What You Want Before You Do; When Companies Predict (and Manipulate) Habits - Part 04",
        "33 - Ch08 - Saddleback Church and the Montgomery Bus Boycott; How Movement Happens - Part 01",
        "34 - Ch08 - Saddleback Church and the Montgomery Bus Boycott; How Movement Happens - Part 02",
        "35 - Ch08 - Saddleback Church and the Montgomery Bus Boycott; How Movement Happens - Part 03",
        "36 - Ch09 - The Neurology of Free Will; Are We Responsible For Our Habits - Part 01",
        "37 - Ch09 - The Neurology of Free Will; Are We Responsible For Our Habits - Part 02",
        "38 - Ch09 - The Neurology of Free Will; Are We Responsible For Our Habits - Part 03",
        "39 - Ch09 - The Neurology of Free Will; Are We Responsible For Our Habits - Part 04"
      ],
      "description": "A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life. She has quit smoking, run a marathon, and been promoted at work. The patterns inside her brain, neurologists discover, have fundamentally changed.\n \nMarketers at Procter & Gamble study videos of people making their beds. They are desperately trying to figure out how to sell a new product called Febreze, on track to be one of the biggest flops in company history. Suddenly, one of them detects a nearly imperceptible pattern—and with a slight shift in advertising, Febreze goes on to earn a billion dollars a year.\n \nAn untested CEO takes over one of the largest companies in America. His first order of business is attacking a single pattern among his employees—how they approach worker safety—and soon the firm, Alcoa, becomes the top performer in the Dow Jones.\n \nWhat do all these people have in common? They achieved success by focusing on the patterns that shape every aspect of our lives. \n \nThey succeeded by transforming habits.\n \nIn The Power of Habit, award-winning New York Times business reporter Charles Duhigg takes us to the thrilling edge of scientific discoveries that explain why habits exist and how they can be changed. With penetrating intelligence and an ability to distill vast amounts of information into engrossing narratives, Duhigg brings to life a whole new understanding of human nature and its potential for transformation. \n \nAlong the way we learn why some people and companies struggle to change, despite years of trying, while others seem to remake themselves overnight. We visit laboratories where neuroscientists explore how habits work and where, exactly, they reside in our brains. We discover how the right habits were crucial to the success of Olympic swimmer Michael Phelps, Starbucks CEO Howard Schultz, and civil-rights hero Martin Luther King, Jr. We go inside Procter & Gamble, Target superstores, Rick Warren’s Saddleback Church, NFL locker rooms, and the nation’s largest hospitals and see how implementing so-called keystone habits can earn billions and mean the difference between failure and success, life and death.\n \nAt its core, The Power of Habit contains an exhilarating argument: The key to exercising regularly, losing weight, raising exceptional children, becoming more productive, building revolutionary companies and social movements, and achieving success is understanding how habits work. \n \nHabits aren’t destiny. As Charles Duhigg shows, by harnessing this new science, we can transform our businesses, our communities, and our lives.' ",
      "title": "The Power of Habit",
      "url": "http://localhost:5000/api/v1.0/audiobooks/?id=1",
    },
    "progress": {
      "recentChapter": "01 - Introduction",
      "all": {
        "01 - Introduction": 0,
      }
    },
    "recentListen": 1,
  },
  {
    "audiobook": {
      "id": "2",
      "author": [
        "Bill Bryson"
      ],
      "chapter": [
        "00 Introduction",
        "01 How To Build A Universe",
        "02 Welcome To The Solar System",
        "03 The Reverend Evans' Universe",
        "04 The Size Of The Earth",
        "05 The Stone Breakers",
        "06 Science Red In Tooth And Claw",
        "07 Elemental Matters",
        "08 A New Age Dawns",
        "09 The Mighty Atom",
        "10 Getting The Lead Out",
        "11 Muster Mark's Quarks",
        "12 The Earth Moves",
        "13 Danerous Planet",
        "14 The Fire Below",
        "15 Dangerous Beauty",
        "16 Lonely Planet",
        "17 Into The Troposphere",
        "18 The Bounding Main",
        "19 The Rise Of Life",
        "20 Small World",
        "21 Life Goes On",
        "22 Goodbye To All That",
        "23 The Richness Of Being",
        "24 Cells",
        "25 Darwin's Singular Notion",
        "26 The Stuff Of Life",
        "27 The Road To Us",
        "28 The Myterious Biped",
        "29 The Restless Ape",
        "30 Goodbye"
      ],
      "description": "Bill Bryson has been an enormously popular author both for his travel books and for his books on the English language. Now, this beloved comic genius turns his attention to science. Although he doesn't know anything about the subject (at first), he is eager to learn, and takes information that he gets from the world's leading experts and explains it to us in a way that makes it exciting and relevant. Even the most pointy-headed, obscure scientist succumbs to the affable Bryson's good nature, and reveals how he or she figures things out. Showing us how scientists get from observations to ideas and theories is Bryson's aim, and he succeeds brilliantly. It is an adventure of the mind, as exciting as any of Bryson's terrestrial journeys.",
      "title": "A Short History of Nearly Everything",
      "url": "http://localhost:5000/api/v1.0/audiobooks/?id=1"
    },
    "progress": {
      "recentChapter": "00 Introduction",
      "all": {
        "00 Introduction": 0
      }
    }

  },
], action) {
  switch (action.type) {
    case 'AUDIO.pause':
    case 'AUDIO.end': {
      const historyIndex = state.findIndex(h => h.audiobook.id === action.id);
      const oldHistory = state[historyIndex];
      const newHistory = {
        ...oldHistory,
        progress: progressReducer(
          oldHistory.progress,
          { ...action, chapter: oldHistory.audiobook.chapter },
        ),
        recentListen: Date.now(),
      };

      return [
        ...state.slice(0, historyIndex),
        newHistory,
        ...state.slice(historyIndex + 1, state.length),
      ];
    }
    default: {
      return state;
    }
  }
}


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
      const { recentChapter } = state;
      const t = {};
      t[state.recentChapter] = action.chapterProgress;
      localStorage.setItem(
        'histories',
        JSON.stringify(store.getState().histories),
      );
      return { ...state, all: { ...state.all, ...t } };
    }
    case 'AUDIO.end': {
      const { h } = action;
      console.log(h);
      const currentChapter = state.recentChapter;
      console.log(currentChapter);
      // choose next chapter
      const nextChapterIndex = action.chapter.indexOf(currentChapter) + 1;
      const nextChapter = nextChapterIndex === action.chapter.length ?
        '' : action.chapter[nextChapterIndex];

      const t = {};
      t[currentChapter] = 0;
      t[nextChapter] = 0;
      return { recentChapter: nextChapter, all: { ...state.all, ...t } };
    }
    default: {
      return state;
    }
  }
}


class App extends Component {
  componentWillMount() {
    // histories = JSON.parse(localStorage.getItem('histories'));
    // console.log(histories)
    let histories = localStorage.getItem('histories');
    if (histories) {
      console.log(histories);
      histories = JSON.parse(histories);
      store.setState({ histories });
    }
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const { playId } = state;
    const { histories } = state;
    console.log('state', state);
    return (
      <HistoryPage playId={playId} histories={histories} />
    );
  }
}


class HistoryPage extends Component {
  render() {
    return (
      <div>
        <AudiobookPlayList
          playId={this.props.playId}
          histories={this.props.histories}
        />
        {/* <PageList count={userHistory.count} /> */}
      </div>

    );
  }
}


// class PageList extends Component {
//   state = { activeItem: '1' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })


//   render() {
//     const { activeItem } = this.state;

//     return (
//       <Menu pagination>
//         <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
//         <Menu.Item disabled>...</Menu.Item>
//         <Menu.Item name='10' active={activeItem === '10'} onClick={this.handleItemClick} />
//         <Menu.Item name='11' active={activeItem === '11'} onClick={this.handleItemClick} />
//         <Menu.Item name='12' active={activeItem === '12'} onClick={this.handleItemClick} />
//       </Menu>
//     )
//   }
// }


class AudiobookPlayList extends Component {
  handlePlayClick = ({ id }) => {
    console.log(`handlePlayClick ${id}`);
    store.dispatch({
      type: 'AUDIO.play',
      id,
    });
  }

  handleAudioEnded = ({ id }) => {
    store.dispatch({
      type: 'AUDIO.end',
      id,
    });
  }

  handlePauseClick = ({ id, chapterProgress }) => {
    console.log(id, chapterProgress);

    store.dispatch({
      type: 'AUDIO.pause',
      id,
      chapterProgress,
    });

    // sort by last_listen and save to localStorage (max history item 9)
    // const sortedHistories = this.props.histories.slice(0).sort((a, b) =>
    //   a.recentListen < b.recentListen)
    // localStorage.setItem('histories', JSON.stringify(sortedHistories));
  }

  render() {
    console.log('AudiobookPlayList render');
    if (this.props.histories) {
      return (
        <Card.Group>
          {this.props.histories.map(h => (
            <AudiobookPlay
              playId={this.props.playId}
              key={h.audiobook.id}
              audiobook={h.audiobook}
              recentChapter={h.progress.recentChapter}
              chapterProgress={h.progress.all[h.progress.recentChapter]}
              onPauseClick={this.handlePauseClick}
              onAudioEnded={this.handleAudioEnded}
              onPlayClick={this.handlePlayClick}
            />))}
        </Card.Group>
      );
    } else {
      return null;
    }
  }
}


class AudiobookPlay extends Component {
  state = {
    pause: true,
    // currentTime: this.props.chapter.recent.time,
  }


  componentDidMount() {
    this.audio = document.createElement('audio');
    this.audio.id = this.props.audiobook.id;
    this.audio.src = `/audio/${this.props.audiobook.id}
    /${this.props.recentChapter}.mp3`;
    console.log('this.audio.src', this.audio.src);
    this.audio.type = 'audio/mpeg';
    this.audio.preload = 'auto';
    this.audio.currentTime = this.props.chapterProgress;
    this.audio.onended = () => this.props.onAudioEnded({
      id: this.props.audiobook.id,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps);

    if (this.props.audiobook.id !== nextProps.playId && !this.state.pause) {
      this.handlePlayClick();
    }

    if (!nextProps.recentChapter) { // audiobook finish
      this.setState({ pause: true });
    } else if (nextProps.recentChapter !== this.props.recentChapter) {
      this.audio.src = `/audio/${this.props.audiobook.id}
      /${this.props.recentChapter}.mp3`;
      console.log('audioPlay');
      this.audio.play();
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.audiobook.id !== nextProps.playId && this.state.pause) {
      return false;
    } else return true;
  }


  handlePlayClick = (e) => {
    console.log('playClick {this.audio.src}');
    if (this.state.pause) {
      this.audio.play();
      this.props.onPlayClick({ id: this.props.audiobook.id });
    } else {
      this.audio.pause();
      this.props.onPauseClick({
        id: this.props.audiobook.id,
        chapterProgress: this.audio.currentTime,
      });
    }
    const pause = !this.state.pause;
    this.setState({ pause });
  }

  render() {
    console.log('AudiobookPlay render');
    const { title, author, description } = this.props.audiobook;

    return (
      <Card className="audiobook">
        <div>
          <Image src={`/audio/${this.props.audiobook.id}/cover.jpg`} />

          <Button
            className='playButton'
            circular
            icon={this.state.pause ? 'play' : 'pause'}
            onClick={this.handlePlayClick}
            size='huge'
          />
        </div>

        <Card.Content>

          <Card.Header>
            <p className='bookTitle'>
              {title}
            </p>

          </Card.Header>

          <Card.Meta>
            <span className=''>
              {author}
            </span>
          </Card.Meta>

          <Card.Description>
            <FlexParagraph text={description} />
          </Card.Description>

        </Card.Content>

      </Card>
    );
  }
}


class FlexParagraph extends Component {
  state = {
    displayLess: true,
  }

  handleModeChange = (e) => {
    this.setState({ displayLess: !this.state.displayLess });
  }

  render() {
    const { text } = this.props;
    const limitLength = 300;
    if (this.state.displayLess) {
      if (text.length > limitLength) {
        return (
          <p>{text.substring(0, limitLength)}
            <button onClick={this.handleModeChange}>
              ...more
            </button>
          </p>
        );
      } else {
        return (<p>{text}</p>);
      }
    } else {
      return (
        <p>{text} <button onClick={this.handleModeChange}>(less)</button></p>
      );
    }
  }
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default WrappedApp;

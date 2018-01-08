import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';

var histories;

class App extends Component {

  componentWillMount() {
    histories = JSON.parse(localStorage.getItem('histories'));
    console.log(histories)
  }

  render() {
    return (
      <HistoryPage histories={histories}/>
    );
  }
}


class HistoryPage extends Component {
  render() {
    return (
      <div>
        <AudiobookPlayList  histories={this.props.histories}/>
        {/* <PageList count={userHistory.count} /> */}
      </div>

    );
  }
}





class PageList extends Component {

  state = { activeItem: '1' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <Menu pagination>
        <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
        <Menu.Item disabled>...</Menu.Item>
        <Menu.Item name='10' active={activeItem === '10'} onClick={this.handleItemClick} />
        <Menu.Item name='11' active={activeItem === '11'} onClick={this.handleItemClick} />
        <Menu.Item name='12' active={activeItem === '12'} onClick={this.handleItemClick} />
      </Menu>
    )


  }
}

class AudiobookPlayList extends Component {

  state = {
    playId: 0,
    chapterHistory: null,
    recentChapter: '',
  }

  handlePlayClick = ({ id }) => {
    console.log(`handlePlayClick ${id}`);
    this.setState({playId:id});
  }

  handleAudioEnded = ({id}) => {
    console.log(`handleAudioEnded ${id}`);
    const h = this.props.histories.find(h => h.audiobook.id === id);
    console.log(h);
    const endChapter = h.recentChapter;
    console.log(endChapter);
    let nextChapterIndex, nextChapter;
    //reset ended chapter time equal = 0
    h.chapterHistory[endChapter] = 0;
    //choose next chapter
    nextChapterIndex = h.audiobook.chapter.indexOf(endChapter) + 1;
    console.log(nextChapterIndex)
    if (nextChapterIndex === h.audiobook.chapter.length) {
      //no more chapter
      h.recentChapter = '';
    } else {
      //reset next chapter startTime = 0
      nextChapter = h.audiobook.chapter[nextChapterIndex];
      h.chapterHistory[nextChapter] = 0;
      h.recentChapter = nextChapter;
    }
    this.setState({recentChapter:h.recentChapter})

  }

  handlePauseClick  = ({ id, chapterProgress }) => {
    console.log(id, chapterProgress);
    const h = this.props.histories.find(h => h.audiobook.id === id);
    
    h.chapterHistory[h.recentChapter] = chapterProgress;
    h.recentListen =  Date.now();

    //sort by last_listen and save to localStorage (max history item 9)
    const sortedHistories = this.props.histories.slice(0).sort((a, b) => 
      a.recentListen < b.recentListen)
    localStorage.setItem('histories', JSON.stringify(sortedHistories));
  }

  render() { 
    console.log('AudiobookPlayList render')
    if (this.props.histories) {
      return (
        <Card.Group>
          {this.props.histories.map(h =>
            <AudiobookPlay 
            playId={this.state.playId} 
            key={h.audiobook.id} 
            audiobook={h.audiobook}
            recentChapter={h.recentChapter} 
            chapterProgress={h.chapterHistory[h.recentChapter]}
            onPauseClick={this.handlePauseClick}
            onAudioEnded={this.handleAudioEnded}
            onPlayClick={this.handlePlayClick} />)}
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
    // currentTime: this.props.chapterHistory.recent.time,
  }


  componentDidMount() {
    this.audio = document.getElementById(this.props.audiobook.id);
    this.audio.currentTime = this.props.chapterProgress;
    this.audio.onended = () => this.props.onAudioEnded({id: this.props.audiobook.id});
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps);
   
    if (this.props.audiobook.id !== nextProps.playId && !this.state.pause) {
      this.handlePlayClick();
    }

    if ( !nextProps.recentChapter) {// audiobook finish
      this.setState({pause:true});
    }

  }


  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.audiobook.id !== nextProps.playId && this.state.pause) {
      return false
    } else return true;
  }


  audioPlay = () => {
    console.log('play');
  }

  handlePlayClick = (e) => {

    
    if (this.state.pause) {
      this.audio.play();
      this.props.onPlayClick({id: this.props.audiobook.id});
    } else {
      this.audio.pause();
      this.props.onPauseClick({ id: this.props.audiobook.id, chapterProgress: this.audio.currentTime })
    }
    var pause = !this.state.pause;
    this.setState({ pause });
    
  }

  render() {
    console.log('AudiobookPlay render');
    const { title, author, description } = this.props.audiobook;

    return (
      <Card className="audiobook">
        <div>
          <Image src={`/${this.props.audiobook.id}/cover.jpg`} />
          <Button className='playButton' circular icon={this.state.pause ? 'play' : 'pause'}
            onClick={this.handlePlayClick} size='huge'>
          </Button>
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
          
          <audio id={this.props.audiobook.id} preload='auto' src={`/${this.props.audiobook.id}/${this.props.recentChapter}.mp3`}></audio>
        </Card.Content>

      </Card>
    )
  }


  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, this.props)
    if (!this.props.recentChapter && prevProps.recentChapter !== this.props.recentChapter ) {
      this.audio.paly();
    }
  }
}



class FlexParagraph extends Component {

  state = {
    displayLess: true
  }

  handleModeChange = (e) => {
    this.setState({ displayLess: !this.state.displayLess })
    
  }

  render() {
    const text = this.props.text;
    const limitLength = 300;
    if (this.state.displayLess) {
      if (text.length > limitLength) {
        return (
          <p>{text.substring(0, limitLength)} <a href="#" onClick={this.handleModeChange}>...more</a></p>
        )
      } else {
        return (<p>{text} </p>)
      }
    } else {
      return (
        <p>{text} <a href="#" onClick={this.handleModeChange}>(less)</a></p>
      )
    }

  }
}
export default App;

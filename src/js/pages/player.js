import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import Player from '../components/player';
import localTrack0 from '../../music/music0.mp3';
import localTrack1 from '../../music/music1.mp3';
import localTrack2 from '../../music/music2.mp3';

export default class PlayerScreen extends React.Component {
  state = {remoteData: {}};

  componentDidMount() {
    fetch('https://imagesapi.osora.ru/?isAudio=true')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.map((item) => {
          return {
            id: +new Date(),
            url: item,
            title: item.title ? item.title : 'undefined',
            artist: item.artist ? item.artist : 'undefined',
          };
        });
      })
      .then((elem) => {
        this.setState({remoteData: elem});
      })
      .catch((err) => {
        alert(err);
      });
    this.setup();
  }
  setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  };
  togglePlayback = async () => {
    this.playbackState = await TrackPlayer.getState();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      if (Object.keys(this.state.remoteData).length) {
        this.state.remoteData.map(async (item) => {
          await TrackPlayer.add({
            id: item.id,
            url: item.url,
            title: item.title,
            artist: item.artist,
          });
        });
      }
      await TrackPlayer.add({
        id: 'local-track0',
        url: localTrack0,
        title: 'Endorphin',
        artist: 'Andy Panda feat. Miyagi',
      });
      await TrackPlayer.add({
        id: 'local-track1',
        url: localTrack1,
        title: 'Восточные сказки',
        artist: 'Блестящие и Arash',
      });
      await TrackPlayer.add({
        id: 'local-track2',
        url: localTrack2,
        title: 'Режиссер',
        artist: 'Градусы',
      });
      await TrackPlayer.play();
    } else {
      if (this.playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  };
  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  };
  render() {
    return (
      <View style={styles.container}>
        <Player
          onNext={this.skipToNext}
          style={styles.player}
          onPrevious={this.skipToPrevious}
          onTogglePlayback={this.togglePlayback}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});

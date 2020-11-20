import React from 'react';
import {View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import styles from '../scss';

import Player from '../components/player';
import data from '../data/data';

export default class PlayerScreen extends React.Component {
  state = {remoteData: {}};
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    fetch('https://imagesapi.osora.ru/?isAudio=true')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.map((item, index) => {
          return {
            id: index,
            url: item,
            title: item.title ? item.title : `remote: ${index + 1}`,
            artist: item.artist ? item.artist : 'no artist',
          };
        });
      })
      .then((elem) => {
        if (this._isMounted) {
          this.setState({remoteData: elem});
        }
      })
      .catch((err) => {
        alert(`Sorry, files were not uploaded, err: ${err}`);
      });
    this.setup();
  }
  componentWillUnmount() {
    this._isMounted = false;
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
      if (this.state.remoteData.length) {
        this.state.remoteData.map(async (item) => {
          await TrackPlayer.add(item);
        });
      }
      if (data.length) {
        data.map(async (item) => {
          await TrackPlayer.add(item);
        });
      }
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
      <View style={[styles.screenContainer, styles.alignCenter]}>
        <Player
          onNext={this.skipToNext}
          style={styles.player}
          onPrevious={this.skipToPrevious}
          onTogglePlayback={this.togglePlayback}
          isPlay={this.state.isPlay}
        />
      </View>
    );
  }
}

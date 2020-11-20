import React from 'react';
import TrackPlayer, {TrackPlayerEvents} from 'react-native-track-player';
import styles from '../scss';

import {AppState, Text, TouchableOpacity, View} from 'react-native';

function ControlButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTitle: '',
      trackArtist: '',
      middleButtonText: '',
      appStateVisible: AppState.currentState,
      middleButtonText: 'Play',
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    AppState.addEventListener('change', this.handleAppStateChange);
    this.onPlay = TrackPlayer.addEventListener('remote-play', async () => {
      await TrackPlayer.play();
    });
    this.onPause = TrackPlayer.addEventListener('remote-pause', async () => {
      await TrackPlayer.pause();
    });
    this.onNext = TrackPlayer.addEventListener('remote-next', async () => {
      try {
        await TrackPlayer.skipToNext();
      } catch (_) {}
    });
    this.onPrevious = TrackPlayer.addEventListener(
      'remote-previous',
      async () => {
        try {
          await TrackPlayer.skipToPrevious();
        } catch (_) {}
      },
    );
    this.onTrackChange = TrackPlayer.addEventListener(
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
      async (data) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        const {title, artist} = track || {};
        if (this._isMounted) {
          this.setState({
            trackTitle: title,
            trackArtist: artist,
          });
        }
      },
    );
    this.onStateChange = TrackPlayer.addEventListener(
      TrackPlayerEvents.PLAYBACK_STATE,
      async () => {
        const playbackState = await TrackPlayer.getState();
        if (this._isMounted) {
          this.setState({middleButtonText: 'Play'});
          if (
            playbackState === TrackPlayer.STATE_PLAYING ||
            playbackState === TrackPlayer.STATE_BUFFERING
          ) {
            this.setState({middleButtonText: 'Pause'});
          }
        }
      },
    );
  }
  async componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.onPlay.remove();
    this.onPause.remove();
    this.onNext.remove();
    this.onPrevious.remove();
    this.onTrackChange.remove();
    this.onStateChange.remove();
    this._isMounted = false;
    await TrackPlayer.stop();
  }
  handleAppStateChange = async () => {
    if (AppState.currentState === 'background') {
      await TrackPlayer.pause();
      if (this._isMounted) {
        this.setState({middleButtonText: 'Play'});
      }
    }
  };
  render() {
    return (
      <View style={[styles.card, this.props.style]}>
        <Text style={styles.playerTitle}>{this.state.trackTitle}</Text>
        <Text style={styles.artist}>{this.state.trackArtist}</Text>
        <View style={styles.controls}>
          <ControlButton title={'<<'} onPress={this.props.onPrevious} />
          <ControlButton
            title={this.state.middleButtonText}
            onPress={this.props.onTogglePlayback}
          />
          <ControlButton title={'>>'} onPress={this.props.onNext} />
        </View>
      </View>
    );
  }
}

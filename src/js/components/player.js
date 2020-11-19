import React from 'react';
import TrackPlayer, {Event} from 'react-native-track-player';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
    };
  }
  async componentDidMount() {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener('remote-previous', () =>
      TrackPlayer.skipToPrevious(),
    );
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async (data) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        const {title, artist} = track || {};
        this.setState({
          trackTitle: title,
          trackArtist: artist,
        });
      },
    );
    this.onTrackState = TrackPlayer.addEventListener(
      'playback-state',
      async () => {
        const playbackState = await TrackPlayer.getState();
        if (
          playbackState === TrackPlayer.STATE_PLAYING ||
          playbackState === TrackPlayer.STATE_BUFFERING
        ) {
          this.setState({middleButtonText: 'Pause'});
        } else {
          this.setState({middleButtonText: 'Play'});
        }
      },
    );
  }
  componentWillUnmount() {
    this.onTrackChange.remove();
    this.onTrackState.remove();
  }
  render() {
    return (
      <View style={[styles.card, this.props.style]}>
        <Text style={styles.title}>{this.state.trackTitle}</Text>
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

const styles = StyleSheet.create({
  card: {
    width: '80%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

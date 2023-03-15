import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

import Button from '../../atoms/Button';
import {
  MdPlayArrow as Play,
  MdPause as Pause
} from 'react-icons/md';
import Menu from '../Menu';

// Helper function
function isDisabled(action, disabled = false) {
  return action === undefined || disabled;
}

const VisualizerControls = ({
  // Actions
  onPlay,
  onPause,
  onAdjustSpeed,

  // States
  playing,
  playDisabled,
  pauseDisabled,
  playbackSpeed
}) => {
  return (
    <div className="VisualizerControls">
      {/* Play or Pause button - context dependent */}
      <Button
        icon={playing ? Pause : Play}
        onClick={playing ? onPause : onPlay}
        disabled={
          playing
            ? isDisabled(onPause, pauseDisabled)
            : isDisabled(onPlay, playDisabled)
        }
        raised
        iconClass="VisualizerControls__Icon"
        className="VisualizerControls__CenterButton"
      />

      {/* Playback Speed */}
      <Menu
        items={['0.25x', '0.5x', '1x', '2x', '4x']}
        placeholder="Speed"
        selected={`${playbackSpeed}x`}
        onSelect={onAdjustSpeed}
        noDropIcon
        className="VisualizerControls__SpeedButton"
      />
    </div>
  );
};

VisualizerControls.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onAdjustSpeed: PropTypes.func,
  playing: PropTypes.bool,
  playDisabled: PropTypes.bool,
  pauseDisabled: PropTypes.bool,
  playbackSpeed: PropTypes.number
};

export default VisualizerControls;

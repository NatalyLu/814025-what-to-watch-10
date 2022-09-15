import {useRef} from 'react';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import Spiner from '../../components/spiner/spiner';
import {useAppSelector} from '../../hooks';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import { getFilm } from '../../store/current-film/selectors';

function Player(): JSX.Element {
  const film = useAppSelector(getFilm);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleFullScreenAction = useFullScreenHandle();

  const {
    isLoading,
    handleVideoLoading,
    handleProgressUpdate,
    progressState,
    handleVideoPlay,
    isPause,
    handleExitClick} = useVideoPlayer(videoRef);

  return (
    film ?
      <FullScreen handle={handleFullScreenAction}>
        <div className="player">
          {isLoading && <Spiner classes='loading-spiner__absolute' />}
          <video
            src={film.videoLink}
            poster={film.posterImage}
            className="player__video"
            autoPlay
            ref={videoRef}
            onWaiting={() => {handleVideoLoading(true);}}
            onCanPlay={() => {handleVideoLoading(false);}}
            onTimeUpdate={handleProgressUpdate}
          >
          </video>

          <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={progressState.progress} max="100"></progress>
                <div className="player__toggler" style={{left: `${Math.trunc(progressState.progress)}%`,}}>Toggler</div>
              </div>
              <div className="player__time-value">{progressState.time}</div>
            </div>

            <div className="player__controls-row">
              {isPause ?
                <button type="button" className="player__play" onClick={handleVideoPlay}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                :
                <button type="button" className="player__play" onClick={handleVideoPlay}>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </button>}
              <div className="player__name">{film.name}</div>

              <button type="button" className="player__full-screen" onClick={handleFullScreenAction.enter}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </FullScreen>
      : <Spiner />
  );
}

export default Player;

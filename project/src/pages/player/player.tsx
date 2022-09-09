import {useRef, useState, useEffect} from 'react';
import Spiner from '../../components/spiner/spiner';
import {useAppSelector} from '../../hooks';

function Player(): JSX.Element {
  const film = useAppSelector((state) => state.film);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const handleVideoLoading = () => {
    setIsLoading(!isLoading);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Тут тоже isLoading наоборот. вначале false
    console.log('isLoading', isLoading);
  };
  
  // Если задавать разные обработчики для onWaiting и onCanPlay, то все работает ожидаемо
  
  // const handleVideoCanPlay = () => {
  //   setIsLoading(false);
  //   console.log('END', isLoading);
  // };

  const getFilmTime = (time: number) => {
    if(time >= 60) {
      return (`${ String(Math.trunc(time / 60)).padStart(2, '0') }:${ String(time % 60).padStart(2, '0') }:${String(time % 1).padStart(2, '0')}`);
    } else {
      return (`${ String(time % 60).padStart(2, '0') }:${String(time % 1).padStart(2, '0')}`);
    }
  };

  // console.log('ttttttttttttt', videoRef.current?.duration);
  // console.log('ttttttttttttt', videoRef.current?.onprogress);
  const filmTime = film && getFilmTime(film.runTime);

  const [isPause, setIsPause] = useState(false);

  const handleVideoPlay = () => {
    setIsPause(!isPause);
    if (!isPause) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  const handleFullScreenClick = () => {

  };

  return (
    <div className="player">
      {film ?
        <>
        {/* Изначально планировалось, что Когда isLoading true спинер должен показываться,
        в консоле он true и спинер показывается при настройке slow3g, но ниже условие обратное записано, что когда isLoading покажи спинер, а работает наоборот
        я не понимаю почему ;( */}
          {!isLoading && <Spiner classes='loading-spiner__absolute' />}
          <video
            src={film.videoLink}
            poster={film.posterImage}
            className="player__video"
            autoPlay
            ref={videoRef}
            onWaiting={handleVideoLoading}
            onCanPlay={handleVideoLoading}
          >
          </video>

          <button type="button" className="player__exit">Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value="30" max="100"></progress>
                <div className="player__toggler" style={{left: '30%',}}>Toggler</div>
              </div>
              <div className="player__time-value">{filmTime}</div>
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
              <div className="player__name">Transpotting</div>

              <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </>
        : <Spiner />}
    </div>
  );
}

export default Player;

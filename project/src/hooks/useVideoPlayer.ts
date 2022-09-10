import { useState, useEffect, RefObject } from 'react';
import { useParams } from 'react-router-dom';
import browserHistory from '../browser-history';
import { useAppDispatch } from '../hooks';
import { getFullTimeFromSeconds } from '../utils/utils';
import useCheckFilmId from '../hooks/useCheckFilmId';
import { fetchCurrentFilmAction } from '../store/api-actions';

function useVideoPlayer(videoRef: RefObject<HTMLVideoElement>) {
  // Проверяем ID
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);
  useCheckFilmId(id);
  useEffect(() => {
    dispatch(fetchCurrentFilmAction(id));
  }, [id]);


  // Меняем флаг загрузки воспроизведенного видео
  const [isLoading, setIsLoading] = useState(true);
  const handleVideoLoading = (waiting: boolean) => {
    setIsLoading(waiting);
  };

  // Прогресс бар
  const filmDuraction = videoRef.current?.duration;
  const filmTime = filmDuraction && getFullTimeFromSeconds(filmDuraction);

  // !!!!!!
  // Ограничить перерисовку до 1 раза в секунду
  // !!!!!!
  const [progressState, setProgressState] = useState({
    progress: 0,
    time: filmTime,
  });
  const handleProgressUpdate = () => {
    if (videoRef.current) {
      setProgressState({
        progress:
          (videoRef.current.currentTime / videoRef.current.duration) * 100,
        time: getFullTimeFromSeconds(
          videoRef.current.duration - videoRef.current.currentTime
        ),
      });
    }
  };

  // Пауза/Воспроизведение
  const [isPause, setIsPause] = useState(false);
  const handleVideoPlay = () => {
    setIsPause(!isPause);
    if (isPause) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  // Закрытие
  const handleExitClick = () => {
    browserHistory.back();
  };

  return {
    isLoading,
    handleVideoLoading,
    handleProgressUpdate,
    progressState,
    handleVideoPlay,
    isPause,
    handleExitClick,
  };
}

export default useVideoPlayer;

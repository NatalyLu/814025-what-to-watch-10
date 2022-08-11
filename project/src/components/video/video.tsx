import {useRef} from 'react';
import {VideoContent} from '../../types/types';

type VideoProps = {
  video: VideoContent;
}

function Video(props: VideoProps): JSX.Element {
  const {poster, link} = props.video;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  let timeHover: ReturnType<typeof setTimeout>;

  const handlerCardHover = () => {
    // Проверяем, что видео есть и запускаем его через 1с удержания указателя мыши над постером
    if (videoRef.current === null) {
      return;
    }

    timeHover = setTimeout(() => {
      videoRef.current && videoRef.current.play();
    }, 1000);
  };

  const handlerCardBlur = () => {
    clearTimeout(timeHover);
    videoRef.current && videoRef.current.load();
  };

  return (
    <video src={link} className="player__video" poster={poster} ref={videoRef} onMouseOver={handlerCardHover} onMouseOut={handlerCardBlur}> </video>
  );
}
export default Video;

import {useRef} from 'react';
import {VideoContent} from '../../types/types';

type VideoProps = {
  video: VideoContent;
}

function Video(props: VideoProps): JSX.Element {
  const {poster, link} = props.video;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeHover = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    // Проверяем, что видео есть и запускаем его через 1с удержания указателя мыши над постером
    if (videoRef.current === null) {
      return;
    }

    timeHover.current = setTimeout(() => {
      videoRef.current?.play();
    }, 1000);
  };

  const handleMouseOut = () => {
    timeHover.current && clearTimeout(timeHover.current);
    videoRef.current?.load();
  };

  return (
    <video src={link} className="player__video" poster={poster} ref={videoRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> </video>
  );
}
export default Video;

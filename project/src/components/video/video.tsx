import {useRef} from 'react';

type VideoProps = {
  posterImage: string | undefined;
  videoLink: string | undefined;
}

function Video(props: VideoProps): JSX.Element {
  const {posterImage, videoLink} = props;
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
    <video src={videoLink} className="player__video" style={ {pointerEvents: 'auto'} } poster={posterImage} ref={videoRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> </video>
  );
}
export default Video;

import {useState, useRef, useEffect} from 'react';
import {VideoContent} from '../../types/types';

type VideoProps = {
  video: VideoContent;
  isPlaying: boolean;
  //оставила для показа значения в панели разработчика в пропсах к Video
  isStillhover: boolean;
  onMouseHover: (ishover: boolean) => void;
  onMouseOut: (ishover: boolean) => void;
}

function Video(props: VideoProps): JSX.Element {
  const {poster, link} = props.video;
  const {isPlaying, isStillhover, onMouseHover, onMouseOut} = props;

  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const handleVideoLoad = () => setIsLoading(false);

    if (isPlaying) {
      videoRef.current.addEventListener('loadeddata', handleVideoLoad);
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.removeEventListener('loadeddata', handleVideoLoad);
    }

  }, [isPlaying]);

  return (
    <video src={link} className="player__video" poster={poster} ref={videoRef} onMouseOver={() => onMouseHover(true)} onMouseOut={() => onMouseOut(false)} > </video>
  );
}
export default Video;

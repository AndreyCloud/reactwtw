import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useApps';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function Player(): JSX.Element {

  const params = useParams();
  const idFilm = params.id ? params.id : '';
  const film = useAppSelector((state) => state.film.films.find((e) => String(e.id) === idFilm));
  const pathFilm = `/films/${idFilm}`;
  const handle = useFullScreenHandle();

  const [player, setPlayer] = useState({
    playing: true,
    played: 0,
  });

  const {
    playing,
    played,
  } = player;

  const handlePlay = () => {
    setPlayer({...player, playing: !player.playing});
  };

  const handleProgress = (e:{played: number}) => {
    setPlayer({...player, played: e.played});
  };

  const btnPlay = (playing)
    ?
    (
      <>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg><span>Pause</span>
      </>
    )
    :
    (
      <>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg><span>Play</span>
      </>
    );

  const progress = `${String(played*100)  }%`;

  return (
    <div>
      <FullScreen handle={handle}>
        <div className="player" style={{ background: '#013869'}}>
          <ReactPlayer
            className="player__video"
            url={film?.video_link}
            playing={playing}
            width={'100%'}
            height={'100%'}
            onProgress={handleProgress}
          // controls
          />

          <Link to={pathFilm}>
            <button type="button" className="player__exit">Exit</button>
          </Link>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={played*100} max="100"></progress>
                <div className="player__toggler" style={{left: progress}}>Toggler</div>
              </div>
              <div className="player__time-value">1:30:29</div>
            </div>

            <div className="player__controls-row">
              <button onClick={handlePlay} type="button" className="player__play">
                {btnPlay}
              </button>
              <div className="player__name">{film?.name}</div>

              <button onClick={handle.enter} type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </FullScreen>
    </div>
  );
}

export default Player;

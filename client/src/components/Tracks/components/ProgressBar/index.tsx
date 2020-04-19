import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Container, Indicator, Knob } from "./ProgressBar.styled";
interface IProps {
  progress: number;
  duration: number;
  state: boolean;
}

export function ProgressBar(props: IProps) {
  const { progress, duration } = props;
  const ref = React.useRef<HTMLElement>(null);
  const knob = React.useRef<HTMLElement>(null);
  const [currentProgress, setCurrentProgress] = React.useState(
    progress / 1000 + 1
  );
  const [touchStart, setTouchStart] = React.useState(0);
  const progressRef = useRef(currentProgress);
  const touchRef = useRef(touchStart);
  touchRef.current = touchStart;
  progressRef.current = currentProgress;
  const { stopTimeout, startTimeout, intervalId } = useTimeout(1000, () => {
    startProgress(duration / 1000);
  });

  useEffect(() => {
    if (!props.state) {
      console.log(">> intervalId", intervalId);
      stopTimeout();
    } else {
      if (intervalId) {
        startTimeout();
      }
    }
    // eslint-disable-next-line
  }, [props.state]);

  useEffect(() => {
    setCurrentProgress(progress / 1000 + 1);
    progressRef.current = progress / 1000 + 1;
  }, [progress]);

  const startProgress = (totalDuration: number) => {
    const increment = 10 / totalDuration;
    const percent = Math.min(increment * progressRef.current * 10, 100);
    if (ref.current && knob.current) {
      ref.current.style.width = `${percent}%`;
      // @ts-ignore
      knob.current.style.left = `${percent}%`;
      setCurrentProgress(progressRef.current + 1);
    }
    if (percent > 100) {
      stopTimeout();
    } else {
      startTimeout();
    }
  };

  const seekToPosition = (event: React.TouchEvent<HTMLElement>) => {
    const clientX = event.changedTouches[0].clientX;
    stopTimeout();
    if (knob.current && ref.current) {
      if (!touchRef.current) {
        touchRef.current = clientX - currentProgress;
      }
      const left = clientX - touchRef.current;
      if (left - progress / 1000 > 0) {
        knob.current.style.left = `${left}px`;
        ref.current.style.width = `${left}px`;
      }
    }
  };
  const seekEnd = (event: React.TouchEvent) => {
    let touchStart = event.changedTouches[0].clientX;
    const knobLeft = parseInt(
      knob.current ? knob.current.style.left.split("px")[0] : "0",
      10
    );
    // @ts-ignore
    window.SpotifyPlayer.seek(knobLeft * 1000);
    // @ts-ignore
    window.SpotifyPlayer.addListener("player_state_changed", (state: any) => {
      if (state.position === knobLeft * 1000) {
        console.log(">> resumed only once");
        setCurrentProgress(state.position / 1000);
        touchStart -= state.position / 1000;
        setTouchStart(touchStart);
        startProgress(duration / 1000);
      }
    });
  };

  return (
    <Container>
      <Indicator ref={ref}></Indicator>
      <Knob ref={knob} onTouchEnd={seekEnd} onTouchMove={seekToPosition} />
    </Container>
  );
}
export function useTimeout(delay: number, callback: () => void) {
  const [intervalId, setIntervalId] = useState<number>(0);
  const startTimeout = () => {
    const id = window.setTimeout(callback, delay);
    setIntervalId(id);
    return id;
  };
  useEffect(() => {
    const id = startTimeout();
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, []);
  return {
    intervalId,
    stopTimeout: () => {
      let ids = intervalId;
      while (ids--) clearInterval(intervalId);
    },
    startTimeout,
  };
}
export default React.memo(ProgressBar);

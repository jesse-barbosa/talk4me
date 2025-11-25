import { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import * as Speech from "expo-speech";
import classifyGesture from "../ml/gestureClassifier";

export default function useHandGesture() {
  const handsRef = useRef<Hands | null>(null);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    hands.onResults((results) => {
      if (!results.multiHandLandmarks[0]) return;

      const landmarks = results.multiHandLandmarks[0];
      const gesture = classifyGesture(landmarks);

      if (gesture) {
        Speech.speak(gesture);
      }
    });

    handsRef.current = hands;
  }, []);

  return handsRef;
}
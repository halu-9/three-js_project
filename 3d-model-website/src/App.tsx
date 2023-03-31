import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";

function App() {
  let canvas: HTMLCanvasElement | null;
  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    // camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent"></div>
    </>
  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  let canvas: HTMLCanvasElement | null;
  let model: THREE.Group;

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
    camera.position.set(-6, 3, 10);

    // renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // 境界のぎざぎざなめらかに
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // gltf（3dモデル）のインポート
    const gltfLoader = new GLTFLoader();

    let mixer: THREE.AnimationMixer;

    // gltfLoader.load("./models/shiba/shiba.gltf", (gltf) => {
    // gltfLoader.load("./models/bond/bond.gltf", (gltf) => {
    // gltfLoader.load("./models/labrador_retriever_puppy/lab.gltf", (gltf) => {
    gltfLoader.load("./models/toon_cat_free/cat.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(1 / 100, 1 / 100, 1 / 100);
      model.rotation.y = -Math.PI / 3;

      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;

      clips.forEach(function (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      });
    });

    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(pointLight);

    // アニメーション
    const tick = () => {
      renderer.render(scene, camera);

      if (mixer) {
        mixer.update(0.025);
      }

      requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        <h3>テストタイトル</h3>
        <p>テストテキスト</p>
      </div>
    </>
  );
}

export default App;

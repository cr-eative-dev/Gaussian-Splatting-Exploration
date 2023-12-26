import * as SPLAT from "gsplat";

const canvas = document.getElementById("canvas");
const progressDialog = document.getElementById("progress-dialog");
const progressIndicator = document.getElementById("progress-indicator");

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
  const url = "./assets/bonsai-7k.splat";

  await SPLAT.Loader.LoadAsync(
    url,
    scene,
    (progress) => (progressIndicator.value = progress * 100)
  );
  progressDialog.close();

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const frame = () => {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(frame);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  requestAnimationFrame(frame);
}

main();

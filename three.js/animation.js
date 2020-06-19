const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(0, 0, 50);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true //background true==transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const handleResize = () => {
  //dopasowanie rozmiaru okna przy wszelkich zmianach 
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  // zmiana aspektu kamery oraz update aby kamera nabrała nowych właściwości (aspekt)
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

const createPivot = (r = .4, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return {
    sphere,
    pivot
  }
}

//creating spheres
const createSphere = (r = 1, color = 0xffffff) => {
  const geometry = new THREE.SphereGeometry(r, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color,
    shininess: 50
  })
  return new THREE.Mesh(geometry, material)
}

const createLight = (int = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, int)
}

const nucleus = createSphere(5);
const light1 = createLight(.9);
const light2 = createLight(.3);

const electron1 = createPivot(.7);
const electron2 = createPivot(.7);
const electron3 = createPivot(.7);
const electron4 = createPivot(.7);

electron1.sphere.position.set(14, 0, 0);
electron2.sphere.position.set(9, 0, 0);
electron3.sphere.position.set(-9, 0, 0);
electron4.sphere.position.set(-14, 0, 0);
// electron1.position.set(10, 0, 0);
// electron2.position.set(-10, 0, 0);
// electron3.position.set(0, 10, 0);
// electron4.position.set(0, -10, 0);

nucleus.add(
  electron1.pivot,
  electron2.pivot,
  electron3.pivot,
  electron4.pivot,
  // electron1,
  // electron2,
  // electron3,
  // electron4,
  // light1,
  // light2
)

light1.position.set(80, 40, 60)
light2.position.set(-60, 0, 20)

scene.add(nucleus, light2);
nucleus.add(light1)

electron1.pivot.rotation.y = 90;
electron2.pivot.rotation.y = 60;
electron3.pivot.rotation.y = -60;
electron4.pivot.rotation.y = -90;

const loop = () => {
  requestAnimationFrame(loop);

  electron1.pivot.rotation.z += 0.04;
  electron2.pivot.rotation.z -= 0.03;
  electron3.pivot.rotation.z += 0.04;
  electron4.pivot.rotation.z -= 0.03;

  nucleus.rotation.x += 0.01;
  // nucleus.rotation.y += 0.01;
  // nucleus.rotation.z += 0.01;

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize)

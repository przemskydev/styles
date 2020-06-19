const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorYellow = new THREE.Color("hsl(40, 100%, 60%)");
const colorPink = new THREE.Color("hsl(350, 100%, 69%)");
const colorLight = new THREE.Color("hsl(40, 100%, 95%)");

const geometry = new THREE.BoxGeometry(2, .7, .7);
const material = new THREE.MeshPhongMaterial({
  color: colorPink,
  shininess: 75
});

const cube = new THREE.Mesh(geometry, material);
const light = new THREE.PointLight(colorLight, 1);
const light2 = new THREE.PointLight(colorLight, 1);

// light.position.x = -40;
// light.position.y = -10;
// light.position.z = 20;
light.position.set(-40, -10, 20)

// light2.position.x = 40;
// light2.position.y = 20;
// light2.position.z = 10;
light2.position.set(40, 20, 10)

scene.add(cube);
scene.add(light);
scene.add(light2);


camera.position.z = 7;

cube.rotation.x = 20;
cube.rotation.z = -20;

const animate = () => {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
};

animate();

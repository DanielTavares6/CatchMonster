var camera, scene, renderer;
var tileMesh,playerMesh;
var grid = new Array();

let PLANE = 60;


init();


function init() {

    const fov = 70;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.01;
    const far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.y = 10;
    camera.lookAt(0, 0, 0);


    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = true;

    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);


    var loader = new THREE.TextureLoader();
    var groundTexture = loader.load('textures/grass.jpg');
    var groundMaterial = new THREE.MeshBasicMaterial({
        map: groundTexture
    });
    makeGrid(groundMaterial);

    var playerTexture = loader.load('textures/player.jpg')
    var playerMaterial = new THREE.MeshBasicMaterial({
        map: playerTexture
    })

    makePlayer(playerMaterial);

    //Events
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener("keydown", onPlayerMovement, false);
}



function makeGrid(material) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var material = new THREE.MeshBasicMaterial( { map: texture } );


    for (let x = 0; x < PLANE; x++) {
        for (let z = 0; z < PLANE; z++) {
            tileMesh = new THREE.Mesh(geometry, material);
            tileMesh.position.x = (x - (PLANE / 2));
            tileMesh.position.y = 0;
            tileMesh.position.z = (z - (PLANE / 2));
            grid.push(tileMesh)
        }
    }

    for (let i = 0; i < grid.length; i++) {
        scene.add(grid[i]);
    }

}

/**
 * Creates a player and adds it to the scene
 * @param {Object} material Contains texture 
 */
function makePlayer(material) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    playerMesh = new THREE.Mesh(geometry, material);
    scene.add(playerMesh);
}

function onPlayerMovement(event) {
    var xMove = 1;
    var zMove = 1;

    var keyCode = event.which;
    if (keyCode == 87) {
        playerMesh.position.z -= zMove;
    } else if (keyCode == 83) {
        playerMesh.position.z += zMove;
    } else if (keyCode == 65) {
        playerMesh.position.x -= xMove;
    } else if (keyCode == 68) {
        playerMesh.position.x += xMove;
    } else if (keyCode == 32) {
        playerMesh.position.set(0, 0, 0);
    }

}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function update(progress) {
    // Update the state of the world for the elapsed time since last render
}

function draw() {
    // Draw the state of the world
}

function render(timestamp) {
    var progress = timestamp - lastRender

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(render)

    
    camera.position.x = playerMesh.position.x;
    camera.position.z = playerMesh.position.z;
    camera.lookAt(playerMesh.position.x,0,playerMesh.position.z) 
    renderer.render(scene, camera);
}
var lastRender = 0
window.requestAnimationFrame(render)
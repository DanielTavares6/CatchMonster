var camera, scene, renderer;
var geometry, material, mesh;
var myBoxes = new Array();

let PLANE = 60;

 
init();


function init() {
 
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10000 );
    
    camera.position.y = 100;
    camera.lookAt(0, 0, 0);
    //camera.position.z = 10;
 
    scene = new THREE.Scene();
    
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshNormalMaterial();

    for (let x = 0; x < PLANE; x++) {
        for(let z = 0; z < PLANE; z++) {
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = (x * PLANE);
            mesh.position.y = 0;
            mesh.position.z = (z * PLANE);
            myBoxes.push(mesh)
        }
    }

    for(let i = 0; i < myBoxes.length; i++) {
        scene.add( myBoxes[i] );
    }
 
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.render( scene, camera );
}

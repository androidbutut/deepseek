class ThreePreview {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.isRotating = true;
        
        this.initializeThreeJS();
        this.setupEventListeners();
    }

    initializeThreeJS() {
        const container = document.getElementById('threePreview');
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1e1e1e);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
        
        // Basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Default cube
        this.addDefaultCube();
        
        // Start animation loop
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    addDefaultCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x007acc,
            specular: 0x555555,
            shininess: 30
        });
        
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.isRotating && this.cube) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const container = document.getElementById('threePreview');
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    setupEventListeners() {
        document.getElementById('rotateToggle').addEventListener('click', () => {
            this.isRotating = !this.isRotating;
            const btn = document.getElementById('rotateToggle');
            btn.innerHTML = this.isRotating ? 
                '<i class="fas fa-pause"></i> Pause Rotation' : 
                '<i class="fas fa-sync"></i> Auto Rotate';
        });

        document.getElementById('resetView').addEventListener('click', () => {
            if (this.cube) {
                this.cube.rotation.x = 0;
                this.cube.rotation.y = 0;
            }
            this.camera.position.set(0, 0, 5);
            this.camera.lookAt(0, 0, 0);
        });
    }

    loadModel(modelData) {
        // Implement model loading logic here
        console.log('Loading model:', modelData);
    }
}

// Initialize Three.js preview when modal opens
document.getElementById('preview3DBtn').addEventListener('click', () => {
    setTimeout(() => {
        new ThreePreview();
    }, 100);
});

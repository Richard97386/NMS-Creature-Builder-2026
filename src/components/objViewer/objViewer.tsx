import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface IObjViewerProps {
  creatureId: string;        // e.g. "FLYINGLIZARD" or "ANTELOPE"
  cameraInitZoom?: number;
  cameraPositionZ?: number;
  initPositionY?: number;
  showStats?: boolean;
  lowQualityMode?: boolean;
  meshesToHide?: string;     // Active comma-separated descriptor part codes
}

export const ObjViewer: React.FC<IObjViewerProps> = (props: IObjViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1a202c'); // Clean dark slate

    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 8); 

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // ORIGINAL COMPONENT VISIBILITY MATRIX
    const syncPartVisibility = () => {
      if (!currentModelRef.current) return;
      const selectedParts = (props.meshesToHide || "").toUpperCase().split(',');

      currentModelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const meshName = child.name.toUpperCase();
          if (meshName.startsWith('_') && meshName.endsWith('_')) {
            child.visible = false; 
          } else {
            // Toggles individual companion sub-meshes live as you change dropdown choices
            const isChosen = selectedParts.some(part => meshName.includes(part) || part.includes(meshName));
            child.visible = isChosen || selectedParts.length === 1; 
          }
        }
      });
    };

    const loader = new GLTFLoader();
    const cleanId = props.creatureId.toLowerCase().replace('rig', '');

    // 🎯 INTENTIONAL RESOLUTION MAPPING
    let filename = cleanId;
    if (cleanId.includes('lizard')) filename = 'flyinglizardglow';

    const tryLoadModel = (extension: string) => {
      const modelPath = `/assets/models/${filename}.${extension}`;
      
      loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        currentModelRef.current = model;
        scene.add(model);

        // Apply clean wireframe overlay matching original layout theme
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x9f7aea, // Neon purple wireframe
              wireframe: true,
              side: THREE.DoubleSide
            });
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.sub(center);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          model.scale.setScalar(4.5 / maxDim);
        }

        syncPartVisibility();
      }, undefined, () => {
        // Casing and extension fallback loop paths
        if (extension === 'gltf') tryLoadModel('glb');
        else if (extension === 'glb') tryLoadModel('GLTF');
        else if (extension === 'GLTF') tryLoadModel('GLB');
      });
    };

    if (cleanId) {
      tryLoadModel('gltf');
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, [props.creatureId, props.meshesToHide]);

  return (
    <div 
      ref={mountRef} 
      style={{ width: '100%', height: '100%', minHeight: '430px', overflow: 'hidden' }} 
    />
  );
};

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Ambient + directional lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0x10B981, 1.2);
    dirLight.position.set(3, 3, 3);
    scene.add(dirLight);
    const blueLight = new THREE.PointLight(0x38BDF8, 1.5, 10);
    blueLight.position.set(-3, 1, 2);
    scene.add(blueLight);

    // Main tooth wireframe geometry (simplified as icosahedron + torus combination)
    const group = new THREE.Group();

    // Core sphere (tooth body)
    const toothGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const toothMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 1.5,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const tooth = new THREE.Mesh(toothGeo, toothMat);
    group.add(tooth);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.22, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    // Floating particles
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(partGeo, partMat);
    group.add(particles);

    // Orbit rings
    const ringGeo = new THREE.TorusGeometry(1.9, 0.008, 2, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.005, 2, 80), new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.25 }));
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    group.add(ring2);

    scene.add(group);

    // Mouse move
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    let t = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;
      group.rotation.y = t * 0.4 + mouseRef.current.x * 0.3;
      group.rotation.x = Math.sin(t * 0.3) * 0.2 + mouseRef.current.y * 0.2;
      particles.rotation.y = -t * 0.15;
      dirLight.position.x = mouseRef.current.x * 4;
      dirLight.position.y = mouseRef.current.y * 4;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] gradient-obsidian overflow-hidden flex items-center">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Atmospheric gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/30 to-transparent pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" style={{ zIndex: 2 }} />

      {/* Hero Content */}
      <div className="relative px-6 md:px-12 lg:px-20 max-w-2xl" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-emerald" />
            <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Advanced Dental Care</span>
          </div>
          <h1 className="font-jakarta font-bold text-white leading-[1.08] mb-6">
            <span className="block text-5xl md:text-7xl">Your Perfect</span>
            <span className="block text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-400">
              Smile Awaits
            </span>
          </h1>
          <p className="text-white/65 font-inter text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Precision dentistry crafted with artistry. From general care to complete smile transformations — experience dental excellence redefined.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic-btn px-8 py-4 bg-emerald text-white font-jakarta font-semibold rounded-full emerald-glow hover:bg-emerald/90 transition-all duration-300"
            >
              Book Appointment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic-btn px-8 py-4 glass text-white font-jakarta font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Our Services
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-10 mt-14"
          >
            {[['5000+', 'Happy Patients'], ['15+', 'Years Experience'], ['98%', 'Success Rate']].map(([num, label]) => (
              <div key={label}>
                <div className="font-jakarta font-bold text-2xl text-white">{num}</div>
                <div className="text-white/50 text-xs font-inter">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
        style={{ zIndex: 3 }}
      >
        <span className="text-xs font-inter tracking-widest uppercase">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
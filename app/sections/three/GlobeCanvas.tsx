"use client";

import { useEffect, useRef } from "react";

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderer: import("three").WebGLRenderer;
    let raf: number;

    const init = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(300, 300);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 2.8;

      scene.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1, 48, 48),
          new THREE.MeshPhongMaterial({
            color: 0x0d1117,
            emissive: 0x1a2332,
            shininess: 30,
            transparent: true,
            opacity: 0.95,
          }),
        ),
      );

      scene.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.001, 24, 24),
          new THREE.MeshBasicMaterial({
            color: 0x30363d,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
          }),
        ),
      );

      scene.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.08, 48, 48),
          new THREE.MeshBasicMaterial({
            color: 0x3fb950,
            transparent: true,
            opacity: 0.03,
            side: THREE.BackSide,
          }),
        ),
      );

      const ll2v = (lat: number, lon: number, r: number) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const th = ((lon + 180) * Math.PI) / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(th),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(th),
        );
      };

      const pins = [
        { lat: 26.35, lon: 92.68, c: 0x3fb950 }, // Nagaon, Assam
        { lat: 26.14, lon: 91.74, c: 0x58a6ff }, // Guwahati, Assam
        // { lat: 26.20, lon: 92.94, c: 0xbc8cff },
      ];

      const dotGroup = new THREE.Group();
      pins.forEach(({ lat, lon, c }) => {
        const pos = ll2v(lat, lon, 1.02);
        const dm = new THREE.Mesh(
          new THREE.SphereGeometry(0.018, 8, 8),
          new THREE.MeshBasicMaterial({ color: c }),
        );
        dm.position.copy(pos);
        dotGroup.add(dm);
        const tm = new THREE.Mesh(
          new THREE.TorusGeometry(0.04, 0.005, 8, 32),
          new THREE.MeshBasicMaterial({
            color: c,
            transparent: true,
            opacity: 0.5,
          }),
        );
        tm.position.copy(pos);
        tm.lookAt(0, 0, 0);
        dotGroup.add(tm);
      });
      scene.add(dotGroup);

      const dl = new THREE.DirectionalLight(0xffffff, 1);
      dl.position.set(5, 3, 5);
      scene.add(dl);
      scene.add(new THREE.AmbientLight(0x8b949e, 0.3));

      let isDrag = false,
        px = 0,
        rv = 0.003;
      canvas.addEventListener("mousedown", (e) => {
        isDrag = true;
        px = e.clientX;
      });
      window.addEventListener("mouseup", () => {
        isDrag = false;
      });
      window.addEventListener("mousemove", (e) => {
        if (isDrag) {
          rv = (e.clientX - px) * 0.005;
          px = e.clientX;
        }
      });

      const animate = () => {
        raf = requestAnimationFrame(animate);
        if (!isDrag) rv += (0.003 - rv) * 0.05;
        scene.children.forEach((c) => {
          c.rotation.y += rv;
        });
        renderer.render(scene, camera);
      };
      animate();
    };

    init();
    return () => {
      cancelAnimationFrame(raf);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Moon, Sun, Sparkles, Eye, EyeOff } from 'lucide-react';

const LINE_NUMBERS = Array.from({ length: 24 }, (_, idx) =>
  String(idx + 1).padStart(2, '0')
);

function createTextSprite(text, color, fontSize = 56) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  return new THREE.Sprite(material);
}

function createHeartSprite(color = '#f497a9') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(64, 96);
  ctx.bezierCurveTo(64, 96, 22, 68, 22, 42);
  ctx.bezierCurveTo(22, 24, 42, 18, 54, 30);
  ctx.lineTo(64, 40);
  ctx.lineTo(74, 30);
  ctx.bezierCurveTo(86, 18, 106, 24, 106, 42);
  ctx.bezierCurveTo(106, 68, 64, 96, 64, 96);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  return new THREE.Sprite(material);
}

export default function SleepingCatCanvas() {
  const mountRef = useRef(null);
  const stateRef = useRef({
    petEnergy: 0,
    awakeTimer: 0,
    isAwake: false,
    nightMode: true,
    pointerX: 0,
    pointerY: 0,
    spawnHeartTrigger: 0,
    purrRingProgress: 1,
  });

  const [petCount, setPetCount] = useState(0);
  const [mood, setMood] = useState('napping · 14 bpm');
  const [isAwake, setIsAwake] = useState(false);
  const [nightMode, setNightMode] = useState(true);

  const triggerPet = () => {
    stateRef.current.petEnergy = Math.min(1.6, stateRef.current.petEnergy + 0.9);
    stateRef.current.spawnHeartTrigger += 1;
    stateRef.current.purrRingProgress = 0;
    setPetCount((c) => c + 1);
    setMood('purring softly');
  };

  const toggleWake = () => {
    const next = !stateRef.current.isAwake;
    stateRef.current.isAwake = next;
    stateRef.current.awakeTimer = next ? 6.5 : 0;
    setIsAwake(next);
    setMood(next ? 'awake · blinking' : 'napping · 14 bpm');
  };

  const toggleLighting = () => {
    const next = !stateRef.current.nightMode;
    stateRef.current.nightMode = next;
    setNightMode(next);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0.15, 2.35, 4.45);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xdbe4ff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffdcb8, 1.35);
    keyLight.position.set(3.2, 4.8, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x7c9cff, 1.25, 12);
    rimLight.position.set(-2.8, 2.2, -2.0);
    scene.add(rimLight);

    const lampLight = new THREE.PointLight(0xffb46b, 1.1, 10);
    lampLight.position.set(2.0, 1.8, 1.6);
    scene.add(lampLight);

    // Root stage
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Subtle floor shadow receiver
    const floorGeo = new THREE.CircleGeometry(2.6, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111217,
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.65,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.22;
    floor.receiveShadow = true;
    stageGroup.add(floor);

    // Cozy cushion
    const cushionGroup = new THREE.Group();
    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x232632,
      roughness: 0.88,
      metalness: 0.04,
    });
    const cushionGeo = new THREE.CylinderGeometry(1.42, 1.52, 0.28, 40);
    const cushion = new THREE.Mesh(cushionGeo, cushionMat);
    cushion.scale.set(1, 0.85, 0.92);
    cushion.position.y = -0.08;
    cushion.receiveShadow = true;
    cushion.castShadow = true;
    cushionGroup.add(cushion);

    const cushionRimGeo = new THREE.TorusGeometry(1.4, 0.14, 18, 48);
    const cushionRimMat = new THREE.MeshStandardMaterial({
      color: 0x2c3040,
      roughness: 0.85,
      metalness: 0.05,
    });
    const cushionRim = new THREE.Mesh(cushionRimGeo, cushionRimMat);
    cushionRim.rotation.x = Math.PI / 2;
    cushionRim.scale.set(1, 0.92, 0.85);
    cushionRim.position.y = 0.02;
    cushionRim.receiveShadow = true;
    cushionGroup.add(cushionRim);
    stageGroup.add(cushionGroup);

    // Purr ripple ring
    const purrRingGeo = new THREE.RingGeometry(1.42, 1.5, 48);
    const purrRingMat = new THREE.MeshBasicMaterial({
      color: 0xf4a6b0,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const purrRing = new THREE.Mesh(purrRingGeo, purrRingMat);
    purrRing.rotation.x = -Math.PI / 2;
    purrRing.position.y = -0.15;
    stageGroup.add(purrRing);

    // Cat materials
    const furCream = new THREE.MeshStandardMaterial({
      color: 0xf0dcc8,
      roughness: 0.82,
      metalness: 0.02,
    });
    const furGinger = new THREE.MeshStandardMaterial({
      color: 0xd99b6c,
      roughness: 0.82,
      metalness: 0.02,
    });
    const innerEarMat = new THREE.MeshStandardMaterial({
      color: 0xf2a7b3,
      roughness: 0.72,
    });
    const darkFeatureMat = new THREE.MeshStandardMaterial({
      color: 0x231d1b,
      roughness: 0.35,
    });
    const openEyeMat = new THREE.MeshStandardMaterial({
      color: 0x241d19,
      roughness: 0.12,
      metalness: 0.15,
    });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Cat root group
    const catGroup = new THREE.Group();
    catGroup.position.set(0, 0.06, 0);
    stageGroup.add(catGroup);

    // Curled body (breathing target)
    const bodyGroup = new THREE.Group();
    catGroup.add(bodyGroup);

    const torsoGeo = new THREE.SphereGeometry(0.76, 32, 24);
    const torso = new THREE.Mesh(torsoGeo, furCream);
    torso.scale.set(1.18, 0.66, 0.96);
    torso.position.set(-0.08, 0.34, -0.05);
    torso.castShadow = true;
    torso.receiveShadow = true;
    bodyGroup.add(torso);

    // Ginger dorsal saddle patch
    const patchGeo = new THREE.SphereGeometry(0.54, 24, 18);
    const patch = new THREE.Mesh(patchGeo, furGinger);
    patch.scale.set(1.05, 0.45, 0.85);
    patch.position.set(-0.22, 0.56, -0.1);
    patch.rotation.z = 0.12;
    bodyGroup.add(patch);

    // Front tucked paws
    const pawGeo = new THREE.SphereGeometry(0.19, 20, 16);
    const leftPaw = new THREE.Mesh(pawGeo, furCream);
    leftPaw.scale.set(1.15, 0.58, 0.95);
    leftPaw.position.set(0.45, 0.11, 0.48);
    leftPaw.castShadow = true;
    catGroup.add(leftPaw);

    const rightPaw = new THREE.Mesh(pawGeo, furCream);
    rightPaw.scale.set(1.15, 0.58, 0.95);
    rightPaw.position.set(0.14, 0.11, 0.62);
    rightPaw.castShadow = true;
    catGroup.add(rightPaw);

    // Head group resting on paws
    const headGroup = new THREE.Group();
    headGroup.position.set(0.56, 0.36, 0.34);
    headGroup.rotation.set(0.12, -0.45, -0.1);
    catGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.44, 30, 24);
    const head = new THREE.Mesh(headGeo, furCream);
    head.scale.set(1.06, 0.92, 0.96);
    head.castShadow = true;
    head.receiveShadow = true;
    headGroup.add(head);

    // Cute ginger forehead marking
    const crownPatch = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 18, 14),
      furGinger
    );
    crownPatch.scale.set(1.1, 0.55, 0.85);
    crownPatch.position.set(-0.08, 0.31, -0.02);
    headGroup.add(crownPatch);

    // Ears
    const createEar = (side) => {
      const earPivot = new THREE.Group();
      earPivot.position.set(side * 0.27, 0.31, -0.02);
      earPivot.rotation.set(0.08, side * -0.15, side * -0.34);

      const outer = new THREE.Mesh(
        new THREE.ConeGeometry(0.17, 0.34, 16),
        side < 0 ? furGinger : furCream
      );
      outer.position.y = 0.12;
      outer.castShadow = true;
      earPivot.add(outer);

      const inner = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.22, 12),
        innerEarMat
      );
      inner.position.set(0, 0.1, 0.055);
      earPivot.add(inner);

      headGroup.add(earPivot);
      return earPivot;
    };

    const leftEar = createEar(-1);
    const rightEar = createEar(1);

    // Tiny pink nose
    const nose = new THREE.Mesh(
      new THREE.SphereGeometry(0.048, 14, 12),
      innerEarMat
    );
    nose.scale.set(1.25, 0.82, 0.8);
    nose.position.set(0, -0.03, 0.42);
    headGroup.add(nose);

    // Closed happy sleeping eyes (curved arcs)
    const closedEyesGroup = new THREE.Group();
    const eyeArcGeo = new THREE.TorusGeometry(0.075, 0.015, 10, 20, Math.PI);
    const leftClosedEye = new THREE.Mesh(eyeArcGeo, darkFeatureMat);
    leftClosedEye.position.set(-0.16, 0.05, 0.39);
    leftClosedEye.rotation.z = Math.PI;
    closedEyesGroup.add(leftClosedEye);

    const rightClosedEye = new THREE.Mesh(eyeArcGeo, darkFeatureMat);
    rightClosedEye.position.set(0.16, 0.05, 0.39);
    rightClosedEye.rotation.z = Math.PI;
    closedEyesGroup.add(rightClosedEye);
    headGroup.add(closedEyesGroup);

    // Open awake eyes (hidden while sleeping)
    const openEyesGroup = new THREE.Group();
    openEyesGroup.visible = false;
    [-0.16, 0.16].forEach((xPos) => {
      const eyeBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.062, 16, 14),
        openEyeMat
      );
      eyeBall.position.set(xPos, 0.06, 0.38);
      openEyesGroup.add(eyeBall);

      const glint = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 10, 10),
        catchlightMat
      );
      glint.position.set(xPos + 0.02, 0.082, 0.432);
      openEyesGroup.add(glint);
    });
    headGroup.add(openEyesGroup);

    // Cheek blush
    [-0.25, 0.25].forEach((xPos) => {
      const blush = new THREE.Mesh(
        new THREE.SphereGeometry(0.058, 12, 10),
        innerEarMat
      );
      blush.scale.set(1.2, 0.65, 0.4);
      blush.position.set(xPos, -0.04, 0.35);
      headGroup.add(blush);
    });

    // Whiskers
    const whiskerMat = new THREE.LineBasicMaterial({
      color: 0xc9bdb2,
      transparent: true,
      opacity: 0.72,
    });
    [-1, 1].forEach((side) => {
      [-0.03, 0.015, 0.06].forEach((yOff, idx) => {
        const pts = [
          new THREE.Vector3(side * 0.18, -0.03 + yOff * 0.45, 0.38),
          new THREE.Vector3(
            side * (0.48 + idx * 0.03),
            -0.05 + yOff * 1.15,
            0.34
          ),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        headGroup.add(new THREE.Line(geo, whiskerMat));
      });
    });

    // Curled tail around the body
    const tailPivot = new THREE.Group();
    tailPivot.position.set(-0.78, 0.22, -0.15);
    catGroup.add(tailPivot);

    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.22, -0.04, 0.42),
      new THREE.Vector3(0.08, -0.07, 0.82),
      new THREE.Vector3(0.55, -0.06, 0.92),
      new THREE.Vector3(0.84, 0.02, 0.76),
    ]);
    const tailGeo = new THREE.TubeGeometry(tailCurve, 32, 0.095, 14, false);
    const tailMesh = new THREE.Mesh(tailGeo, furGinger);
    tailMesh.castShadow = true;
    tailPivot.add(tailMesh);

    const tailTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.098, 14, 12),
      furCream
    );
    tailTip.position.set(0.84, 0.02, 0.76);
    tailPivot.add(tailTip);

    // Floating Zzz sprites
    const zSprites = [
      { sprite: createTextSprite('z', '#93c5fd', 44), phase: 0 },
      { sprite: createTextSprite('Z', '#a5b4fc', 54), phase: 0.33 },
      { sprite: createTextSprite('z', '#c4b5fd', 40), phase: 0.66 },
    ];
    zSprites.forEach(({ sprite }) => {
      sprite.scale.set(0.32, 0.32, 1);
      scene.add(sprite);
    });

    // Heart particle pool for petting
    const hearts = Array.from({ length: 5 }, () => {
      const sprite = createHeartSprite('#f497a9');
      sprite.scale.set(0.28, 0.28, 1);
      scene.add(sprite);
      return { sprite, active: false, age: 0, vx: 0, vz: 0 };
    });

    let lastHeartTrigger = 0;

    // Pointer interaction
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      stateRef.current.pointerX = nx;
      stateRef.current.pointerY = ny;
    };

    const handlePointerDown = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(catGroup.children, true);
      if (hits.length > 0) {
        triggerPet();
      }
    };

    const handleDoubleClick = () => {
      toggleWake();
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('dblclick', handleDoubleClick);

    // ResizeObserver for crisp responsive mobile + desktop rendering
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextW = Math.max(200, Math.floor(entry.contentRect.width));
        const nextH = Math.max(240, Math.floor(entry.contentRect.height));
        camera.aspect = nextW / nextH;
        camera.updateProjectionMatrix();
        renderer.setSize(nextW, nextH);
      }
    });
    resizeObserver.observe(container);

    // Animation loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();
      const st = stateRef.current;

      // Decay pet energy
      if (st.petEnergy > 0) {
        st.petEnergy = Math.max(0, st.petEnergy - dt * 0.45);
        if (st.petEnergy === 0 && !st.isAwake) {
          setMood('napping · 14 bpm');
        }
      }

      // Auto return to sleep after waking
      if (st.isAwake) {
        st.awakeTimer -= dt;
        if (st.awakeTimer <= 0) {
          st.isAwake = false;
          setIsAwake(false);
          setMood('napping · 14 bpm');
        }
      }

      // Breathing & subtle purr vibration
      const breathSpeed = 1.45 + st.petEnergy * 1.1;
      const breath = Math.sin(t * breathSpeed);
      const purrVib = st.petEnergy > 0.05 ? Math.sin(t * 36) * 0.008 * st.petEnergy : 0;

      bodyGroup.scale.set(
        1 + breath * 0.025 + purrVib,
        1 + breath * 0.055,
        1 + breath * 0.028
      );
      bodyGroup.position.y = breath * 0.015;

      // Head motion (lifts gently when awake)
      const targetHeadY = st.isAwake ? 0.54 : 0.36 + breath * 0.012;
      const targetHeadRotX = st.isAwake ? -0.12 : 0.12;
      const targetHeadRotY = st.isAwake
        ? -0.22 + st.pointerX * 0.22
        : -0.45 + st.pointerX * 0.05;
      headGroup.position.y += (targetHeadY - headGroup.position.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;

      // Eyes visibility + occasional blink when awake
      if (st.isAwake) {
        const blinkCycle = t % 3.2;
        const isBlinking = blinkCycle > 3.04;
        openEyesGroup.visible = !isBlinking;
        closedEyesGroup.visible = isBlinking;
      } else {
        openEyesGroup.visible = false;
        closedEyesGroup.visible = true;
      }

      // Ear twitching
      const twitch = Math.pow(Math.max(0, Math.sin(t * 0.85)), 18) * 0.22;
      leftEar.rotation.z = 0.34 + twitch + st.petEnergy * 0.08;
      rightEar.rotation.z = -0.34 - twitch * 0.5 - st.petEnergy * 0.08;

      // Tail gentle swish (faster when petted)
      const tailSpeed = 1.6 + st.petEnergy * 4.5;
      const tailAmp = 0.04 + st.petEnergy * 0.09;
      tailPivot.rotation.y = Math.sin(t * tailSpeed) * tailAmp;
      tailPivot.rotation.z = Math.cos(t * tailSpeed * 0.7) * tailAmp * 0.4;

      // Purr ring expansion
      if (st.purrRingProgress < 1) {
        st.purrRingProgress = Math.min(1, st.purrRingProgress + dt * 1.15);
        const p = st.purrRingProgress;
        const s = 0.95 + p * 0.65;
        purrRing.scale.set(s, s, 1);
        purrRingMat.opacity = (1 - p) * 0.48;
      } else {
        purrRingMat.opacity = 0;
      }

      // Floating Zzz sprites (visible only while asleep)
      zSprites.forEach(({ sprite, phase }) => {
        if (st.isAwake) {
          sprite.material.opacity *= 0.88;
          return;
        }
        const cycle = (t * 0.24 + phase) % 1;
        sprite.position.set(
          0.72 + Math.sin(cycle * Math.PI * 2) * 0.14 + cycle * 0.28,
          0.72 + cycle * 1.08,
          0.25
        );
        const fade = Math.sin(cycle * Math.PI);
        sprite.material.opacity = fade * 0.72;
        const scale = 0.22 + cycle * 0.16;
        sprite.scale.set(scale, scale, 1);
      });

      // Spawn heart sprites when petted
      if (st.spawnHeartTrigger !== lastHeartTrigger) {
        lastHeartTrigger = st.spawnHeartTrigger;
        const slot = hearts.find((h) => !h.active) || hearts[0];
        slot.active = true;
        slot.age = 0;
        slot.vx = (Math.random() - 0.5) * 0.45;
        slot.vz = (Math.random() - 0.5) * 0.3;
        slot.sprite.position.set(0.35 + (Math.random() - 0.5) * 0.4, 0.75, 0.25);
      }

      hearts.forEach((h) => {
        if (!h.active) return;
        h.age += dt;
        if (h.age > 1.35) {
          h.active = false;
          h.sprite.material.opacity = 0;
          return;
        }
        const p = h.age / 1.35;
        h.sprite.position.x += h.vx * dt;
        h.sprite.position.y += dt * 0.78;
        h.sprite.position.z += h.vz * dt;
        h.sprite.material.opacity = Math.sin(p * Math.PI) * 0.92;
        const s = 0.22 + Math.sin(p * Math.PI) * 0.12;
        h.sprite.scale.set(s, s, 1);
      });

      // Smooth lighting transition (Midnight Moon vs Warm Desk Lamp)
      const targetRimIntensity = st.nightMode ? 1.35 : 0.45;
      const targetLampIntensity = st.nightMode ? 0.65 : 1.85;
      const targetKeyIntensity = st.nightMode ? 1.15 : 1.55;
      rimLight.intensity += (targetRimIntensity - rimLight.intensity) * 0.06;
      lampLight.intensity += (targetLampIntensity - lampLight.intensity) * 0.06;
      keyLight.intensity += (targetKeyIntensity - keyLight.intensity) * 0.06;

      // Subtle camera parallax
      const targetCamX = 0.15 + st.pointerX * 0.32;
      const targetCamY = 2.35 + st.pointerY * 0.18;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.28, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('dblclick', handleDoubleClick);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="art-frame" role="region" aria-label="Interactive 3D sleeping cat canvas">
      <div className="art-topbar">
        <div className="art-tab">
          <span className="status-dot" aria-hidden="true" />
          <span className="art-filename">sleepy_cat.three</span>
        </div>

        <div className="art-controls">
          <button
            type="button"
            className="art-chip-btn"
            onClick={triggerPet}
            title="Pet the cat"
          >
            <Sparkles size={12} strokeWidth={2} />
            <span>pet</span>
          </button>

          <button
            type="button"
            className={`art-chip-btn ${isAwake ? 'is-active' : ''}`}
            onClick={toggleWake}
            title={isAwake ? 'Let cat sleep' : 'Gently wake cat'}
          >
            {isAwake ? <EyeOff size={12} strokeWidth={2} /> : <Eye size={12} strokeWidth={2} />}
            <span>{isAwake ? 'nap' : 'wake'}</span>
          </button>

          <button
            type="button"
            className="art-chip-btn"
            onClick={toggleLighting}
            title="Switch lighting ambiance"
            aria-label="Toggle lamp or moonlight"
          >
            {nightMode ? <Moon size={12} strokeWidth={2} /> : <Sun size={12} strokeWidth={2} />}
          </button>
        </div>
      </div>

      <div className="art-body">
        <div className="line-gutter" aria-hidden="true">
          {LINE_NUMBERS.map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>

        <div
          className="cat-canvas-mount"
          ref={mountRef}
          title="Click to pet · Double-click to wake"
        />
      </div>

      <div className="art-footer">
        <span className="art-status">status: {mood}</span>
        <span className="art-hint">
          {petCount > 0 ? `pets: ${petCount}` : 'click cat to pet'}
        </span>
      </div>
    </div>
  );
}

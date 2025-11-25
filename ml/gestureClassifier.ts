export default function classifyGesture(landmarks: any) {
  const thumb = landmarks[4];
  const index = landmarks[8];
  const middle = landmarks[12];
  const ring = landmarks[16];
  const pinky = landmarks[20];

  const dist = (a: any, b: any) =>
    Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);

  const thumbIndex = dist(thumb, index);

  // Gesto 1 — "Olá"
  if (thumbIndex > 0.25) {
    return "Olá, tudo bem com vocês?";
  }

  // Gesto 2 — "Obrigado"
  if (index.y < middle.y && middle.y < ring.y) {
    return "Muito obrigado";
  }

  // Gesto 3 — "Meu nome é..."
  if (index.y < thumb.y) {
    return "Meu nome é Jessé";
  }

  return null;
}
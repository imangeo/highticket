export const CONTENT = {
  // ========== 1. VIDÉOS PRINCIPALES ==========
  videos: {
    hero: {
      type: "file",
      src: "", // <-- Insère ici le lien Cloudinary de la vidéo "hero" quand tu l'auras
      title: "Vidéo de présentation",
    },
    dailyOffer: {
      type: "file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054625/offre_cowai0.mp4",
      title: "Exemple d'offre du jour",
    },
    strategy: {
      type: "file",
      src: "", // <-- Insère ici le lien Cloudinary de la vidéo "hero-call" quand tu l'auras
      title: "Explication Stratégie",
    },
  },

  // ========== 2. TEXTES DES SECTIONS ==========
  dailyOfferSection: {
    badge: "L'écosystème",
    title: "Je t'envoie des offres chaque jour",
    subtitle:
      "Tu n’auras pas besoin de chercher les opportunités seul. Ton seul travail sera de postuler aux offres qui t’intéressent.",
  },

  // ========== 3. PREUVES SOCIALES ==========
  proofs: [
    // --- LES VIDÉOS DE TÉMOIGNAGES (Ordre : v1 -> v5 -> v2 -> v3 -> v4) ---
    {
      id: "v1",
      type: "video-file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054729/v1_oiugms.mp4",
      title: "Témoignage 1"
    },
    
    {
      id: "v2",
      type: "video-file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054732/v3_n32t6f.mp4",
      title: "Témoignage 2"
    },
    {
      id: "v3",
      type: "video-file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054739/v5_stru8d.mp4",
      title: "Témoignage 3"
    },
    {
      id: "v5",
      type: "video-file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054770/v2_qiqbaz.mp4",
      title: "Témoignage 5"
    },
    {
      id: "v4",
      type: "video-file",
      src: "https://res.cloudinary.com/dnn2ptbgd/video/upload/v1791054744/v4_lcjzrd.mp4",
      title: "Témoignage 4"
    },

    // --- LES IMAGES PRIORITAIRES ---
    { id: "r0", type: "image", src: "/r0.jpeg" },
    { id: "r22", type: "image", src: "/r22.png" },
    { id: "r20", type: "image", src: "/r20.png" },

    // --- LE RESTE DES IMAGES (Captures d'écran) ---
    { id: "r1", type: "image", src: "/r1.jpg" },
    { id: "r2", type: "image", src: "/r2.jpg" },
    { id: "r3", type: "image", src: "/r3.PNG" }, // Attention à l'extension en majuscule !
    { id: "r4", type: "image", src: "/r4.jpg" },
    { id: "r5", type: "image", src: "/r5.jpg" },
    { id: "r6", type: "image", src: "/r6.PNG" }, // Attention à l'extension en majuscule !
    { id: "r7", type: "image", src: "/r7.jpg" },
    { id: "r8", type: "image", src: "/r8.png" },
    { id: "r9", type: "image", src: "/r9.png" },
    { id: "r10", type: "image", src: "/r10.jpg" },
    { id: "r11", type: "image", src: "/r11.png" },
    { id: "r12", type: "image", src: "/r12.png" },
    { id: "r13", type: "image", src: "/r13.jpg" },
    { id: "r14", type: "image", src: "/r14.jpg" },
    { id: "r15", type: "image", src: "/r15.jpg" },
    { id: "r16", type: "image", src: "/r16.png" },
    { id: "r17", type: "image", src: "/r17.png" },
    { id: "r18", type: "image", src: "/r18.png" },
    { id: "r19", type: "image", src: "/r19.png" },
    { id: "r21", type: "image", src: "/r21.png" },
    { id: "r23", type: "image", src: "/r23.png" },
  ],
};
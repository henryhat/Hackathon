// ============================================================
//  ADURA — DATA FILE
//  HOW TO CHANGE IMAGES:
//
//  ARTIST AVATAR:  change the `avatar` URL in each artist object below
//  ARTIST COVER:   change the `cover` URL in each artist object below
//  ARTWORK IMAGE:  change the `image` + `images` URLs in each artwork
//
//  You can use:
//    - Any direct image URL from the web
//    - A local file: put it in /public/images/ then use '/images/myfile.jpg'
//    - Unsplash: https://images.unsplash.com/photo-XXXX?w=800&h=600&fit=crop
// ============================================================
import bs from "../assets/art3-4/bs.jpeg"
export const artists = [
  {
    id: "a1",
    name: "Alamu Blessing",
    origin: "Nigeria",
    // ── CHANGE AVATAR: swap this URL with your own artist photo ──────────────
    avatar:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER: swap this URL with a wide banner image (16:5 ratio) ───
    cover:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1400&h=500&fit=crop",
    bio: "Master sculptor working in bronze and reclaimed wood. My work explores the dialogue between ancestral memory and contemporary identity. Each piece is a conversation between what was and what is becoming.",
    totalSales: 142,
    totalRevenue: "₦48.2M",
    verified: true,
    followers: 3800,
    speciality: "Bronze Sculpture",
    rating: 4.9,
  },
  {
    id: "a2",
    name: "Odeyale Ayobami Henry",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1400&h=500&fit=crop",
    bio: "Textile artist and painter. I weave stories of Akan royalty into contemporary mixed-media canvases. My Kente patterns encode messages that only the initiated can read.",
    totalSales: 89,
    totalRevenue: "₦31.7M",
    verified: true,
    followers: 2200,
    speciality: "Textile Art & Painting",
    rating: 4.8,
  },
  {
    id: "a3",
    name: "Ayoola Ibrahim",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1400&h=500&fit=crop",
    bio: "Digital and traditional painter bridging Yoruba iconography with surrealist composition. I trained under Professor Twins Seven Seven in Oshogbo.",
    totalSales: 64,
    totalRevenue: "₦22.1M",
    verified: false,
    followers: 1540,
    speciality: "Oil Paintings",
    rating: 4.7,
  },
  {
    id: "a4",
    name: "Adeyanju Ayotomide",
    origin: "Mali",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1400&h=500&fit=crop",
    bio: "Descendant of Timbuktu scribes, Fatima translates ancient manuscript illumination into contemporary goldwork and mixed-media panels. Her work bridges Islamic and animist West African traditions.",
    totalSales: 53,
    totalRevenue: "₦19.3M",
    verified: true,
    followers: 1890,
    speciality: "Goldwork & Manuscript Art",
    rating: 4.9,
  },
  {
    id: "a5",
    name: "Oluwarinu Oluwaseun",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=500&fit=crop",
    bio: "Igbo carver continuing a lineage of uli body-art practitioners. My wood panels and masks are ritual objects first, art objects second. I refuse to separate aesthetics from function.",
    totalSales: 78,
    totalRevenue: "₦27.6M",
    verified: true,
    followers: 2640,
    speciality: "Wood Carving & Masks",
    rating: 4.8,
  },
  {
    id: "a6",
    name: "Jesu Yanmife",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&h=500&fit=crop",
    bio: "Cairo-born ceramic artist drawing on Pharaonic faience traditions and contemporary Nubian motifs. Each vessel is thrown on a wheel older than my grandmother.",
    totalSales: 41,
    totalRevenue: "₦14.8M",
    verified: false,
    followers: 980,
    speciality: "Ceramics & Pottery",
    rating: 4.6,
  },
  {
    id: "a7",
    name: "Oga Reuben",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&h=500&fit=crop",
    bio: "Zulu beadwork artist from KwaZulu-Natal. My beadwork installations reference love letters, cattle counts, and the language of colours my great-grandmother spoke fluently.",
    totalSales: 35,
    totalRevenue: "₦11.2M",
    verified: true,
    followers: 1120,
    speciality: "Beadwork & Photography",
    rating: 4.7,
  },
  {
    id: "a8",
    name: "Wale Adegboyega",
    origin: "Nigeria",
    // ── CHANGE AVATAR ────────────────────────────────────────────────────────
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop&crop=face",
    // ── CHANGE COVER ─────────────────────────────────────────────────────────
    cover:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1400&h=500&fit=crop",
    bio: "Nairobi-based mixed-media artist combining Kikuyu oral poetry with vivid acrylic abstraction. Shortlisted for the Signature Art Prize 2023.",
    totalSales: 29,
    totalRevenue: "₦9.4M",
    verified: true,
    followers: 870,
    speciality: "Acrylic & Mixed Media",
    rating: 4.8,
  },
];

export const categories = [
  {
    id: "c1",
    name: "Sculptures",
    count: 48,
    image: oowcarv2,
  },
  {
    id: "c2",
    name: "Sculptures",
    count: 73,
    image: bs,
  },
  {
    id: "c3",
    name: "Textiles",
    count: 56,
    image:
      "https://i.pinimg.com/736x/46/ba/06/46ba065b45368be633170f5ed0567b62.jpg",
  },
  {
    id: "c4",
    name: "Ceremonial Beads",
    count: 91,
    image:
      "https://i.pinimg.com/736x/ed/40/9f/ed409f699d1eb737fde5d45a0c069df8.jpg",
  },
  {
    id: "c5",
    name: "Ancient Pottery",
    count: 37,
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=750&fit=crop",
  },
  {
    id: "c6",
    name: "Paintings",
    count: 62,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&h=380&fit=crop",
  },
];

// ============================================================
//  ARTWORKS
//  Each artwork has:
//    image  — the card thumbnail
//    images — array of full-size gallery images (at least 1)
//
//  TO CHANGE AN ARTWORK IMAGE:
//    Find the artwork by its `title`, then replace the URL in
//    `image` and/or `images` array.
//
//  TO ADD YOUR OWN IMAGE:
//    Put it in /public/images/myart.jpg  →  use '/images/myart.jpg'
// ============================================================
import ab1 from "../assets/art1-2/art1.jpeg";
import ab5 from "../assets/art1-2/art5.jpeg";
import ab9 from "../assets/art1-2/art9.jpeg";
import ab17 from "../assets/art1-2/art17.jpeg";
import ab24 from "../assets/art1-2/art24.jpeg";
import ayib from "../assets/art3-4/ayib.jpeg";
import ayibc from "../assets/art3-4/ayibc.png";
import abp from "../assets/art3-4/abp.png";
import abpc from "../assets/art3-4/abpc.png";
import cb1 from "../assets/art3-4/cb1.png";
import cb2 from "../assets/art3-4/cb2.png";
import p1 from "../assets/art3-4/p1.png";
import p2 from "../assets/art3-4/p2.png";
import p3 from "../assets/art3-4/p3.png";
import bead1 from "../assets/7&8/bead1.avif"
import bead2 from "../assets/7&8/bead2.avif"
import Paint from "../assets/7&8/Paint.jpg"
import ooavatar from "../assets/5&6/ooavatar.avif";
import oowcarv1 from "../assets/5&6/oowcarv1.avif";
import oowcarv2 from "../assets/5&6/oowcarv2.jpeg";
import oowcarv4 from "../assets/5&6/oowcarv4.jpg";
import oowcarv5 from "../assets/5&6/oowcarv5.jpg";
import javatar from "../assets/5&6/javatar.avif";
import japot from "../assets/5&6/japot.jpg";
export const artworks = [
  {
    id: "p1",
    title: "Oya — Goddess of Storm",
    artist: artists[0],
    category: "Sculptures",
    // ── ARTWORK CARD IMAGE ────────────────────────────────────────────────────
    image: ab5,
    // ── ARTWORK GALLERY IMAGES (shown on detail page) ─────────────────────────
    images: [ab5],
    isAuction: true,
    currentBid: 2850000,
    startingBid: 1500000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 2 * 3600000 + 14 * 60000),
    bids: 23,
    origin: "Benin Kingdom, 17th Century",
    medium: "Lost-wax bronze casting",
    dimensions: "62cm × 28cm × 22cm",
    provenance: "Private European collection, acquired 1974",
    description:
      "An extraordinary bronze figure embodying Oya, Yoruba deity of wind, storms, and transformation. Cast using the ancient lost-wax technique perfected by Benin artisans.",
    condition: "Excellent",
    certificate: true,
    featured: true,
    hot: true,
  },

  {
    id: "p5",
    title: "Bamana Chiwara Antelope",
    artist: artists[0],
    category: "Sculptures",
    image: ab24,
    images: [ab24],
    isAuction: true,
    currentBid: 980000,
    startingBid: 600000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 9 * 3600000 + 22 * 60000),
    bids: 14,
    origin: "Mali, Bamana people, c.1920",
    medium: "Carved wood, metal accents",
    dimensions: "78cm height",
    provenance: "French colonial officer estate, 1947",
    description:
      "The Chiwara is a mythical being that taught humans to farm. This headdress would be worn during agricultural celebrations, its leaping form evoking abundance.",
    condition: "Very Good",
    certificate: true,
    featured: false,
    hot: false,
  },

  {
    id: "p2",
    title: "Kente Council Cloth",
    artist: artists[1],
    category: "Sculptures",
    image: ab1,
    images: [ab1],

    isAuction: true,
    currentBid: 780000,
    startingBid: 500000,
    buyNowPrice: 1200000,
    endsAt: new Date(Date.now() + 5 * 3600000 + 33 * 60000),
    bids: 11,
    origin: "Ashanti Kingdom, Ghana",
    medium: "Hand-loomed silk and gold thread",
    dimensions: "4.2m × 2.1m",
    provenance: "Gifted by Asantehene court, 1989",
    description:
      "A museum-quality Kente cloth woven for a chief's council. Each strip carries encoded meaning — prosperity, longevity, and unity.",
    condition: "Very Good",
    certificate: true,
    featured: true,
    hot: false,
  },

  {
    id: "p17",
    title: "Adinkra Adire Wrap",
    artist: artists[1],
    category: "Sculptures",
    image: ab17,
    images: [ab17],
    isAuction: true,
    currentBid: 430000,
    startingBid: 280000,
    buyNowPrice: 750000,
    endsAt: new Date(Date.now() + 22 * 3600000),
    bids: 7,
    origin: "Ghana / Nigeria fusion, 2022",
    medium: "Indigo-dyed cotton, stamped adinkra",
    dimensions: "3.6m × 1.8m",
    provenance: "Artist's workshop, Accra",
    description:
      "A contemporary fusion piece merging Akan Adinkra symbolism with Yoruba adire tie-dye.",
    condition: "New",
    certificate: true,
    featured: false,
    hot: false,
  },

  {
    id: "p4",
    title: "Ife Terracotta Head",
    artist: artists[1],
    category: "Ancient Pottery",
    image: ab9,
    images: [ab9],
    isAuction: true,
    currentBid: 5500000,
    startingBid: 3000000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 1 * 3600000 + 8 * 60000),
    bids: 41,
    origin: "Ile-Ife, 12th–15th Century",
    medium: "Terracotta",
    dimensions: "28cm height",
    provenance: "Belgian collection, documented 1951",
    description:
      "Naturalistic terracotta head from the height of Ife civilization. The striation lines across the face represent either scarification or veil markings.",
    condition: "Good",
    certificate: true,
    featured: true,
    hot: true,
  },

  {
    id: "p8",
    title: "Ben Enwonwu – Tutu",
    artist: artists[2],
    category: "Paintings",
    image: p1,
    images: [p1],
    isAuction: true,
    currentBid: 1650000,
    startingBid: 900000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 36 * 3600000),
    bids: 17,
    origin: "Nigeria",
    medium: "Oil on canvas",
    dimensions: "91cm × 61cm",
    provenance:
      "Part of private Nigerian and international collections before reappearing in a major London auction.",
    description:
      "A celebrated portrait of Princess Adetutu Ademiluyi of Ife, painted with graceful brushwork and soft modernist styling. The painting is regarded as one of Nigeria’s most iconic artworks.",
    condition: "Fragile / Stabilised",
    certificate: true,
    featured: false,
    hot: true,
  },
  {
    id: "p11",
    title: "The Elder Speaks",
    artist: artists[2],
    category: "Paintings",
    image: p3,
    images: [p3],
    isAuction: false,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 450000,
    endsAt: null,
    bids: 0,
    origin: "Nigeria",
    medium: "Oil on canvas",
    dimensions: "120cm × 90cm",
    provenance:
      "Part of private Nigerian and international collections before reappearing in a major London auction.",
    description:
      "A celebrated portrait of Princess Adetutu Ademiluyi of Ife, painted with graceful brushwork and soft modernist styling. The painting is regarded as one of Nigeria’s most iconic artworks.",
    condition: "Mint",
    certificate: true,
    featured: false,
    hot: false,
  },
  {
    id: "p12",
    title: "Royal Beaded Crown",
    artist: artists[2],
    category: "Paintings",
    image: p2,
    images: [p2],
    isAuction: false,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 890000,
    endsAt: null,
    bids: 0,
    origin: "Ekiti Kingdom, Nigeria",
    medium: "Glass beads, velvet, wire frame",
    dimensions: "45cm height including veil",
    provenance: "Royal palace estate, 1998",
    description:
      "An Oba's beaded crown in excellent condition. The frontal face — bird atop, faces on all sides — is classical Yoruba royal regalia.",
    condition: "Excellent",
    certificate: false,
    featured: false,
    hot: false,
  },
  {
    id: "p19",
    title: "Royal Ceremonial Coral Beads",
    artist: artists[3],
    category: "Ceremonial Beads",
    image: cb1,
    images: [cb1],
    isAuction: true,
    currentBid: 1100000,
    startingBid: 750000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 42 * 3600000),
    bids: 5,
    origin: "Nigeria",
    medium: "Coral beads, brass, and gold-toned metal fittings",
    dimensions: "80cm lenght",
    provenance:
      "Traditionally worn by royalty, chiefs, and titled families in Edo and Yoruba ceremonial culture during coronations, weddings, and important festivals.",
    description:
      "A luxurious ceremonial bead regalia composed of polished coral beads arranged in layered strands with decorative metallic spacers and pendants. The bright red-orange coral symbolizes wealth, nobility, protection, and spiritual authority in Nigerian royal traditions.",
    condition: "Very Good",
    certificate: true,
    featured: false,
    hot: false,
  },
  {
    id: "p12",
    title: "Ceremonial Coral Bead Regalia",
    artist: artists[3],
    category: "Ceremonial Beads",
    image: cb2,
    images: [cb2],
    isAuction: false,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 89000,
    endsAt: null,
    bids: 0,
    origin: "Ekiti Kingdom, Nigeria",
    medium: "Coral beads, brass, and gold-toned metal fittings",
    dimensions: "70cm long",
    provenance:
      "Traditionally worn by kings, chiefs, brides, and titled individuals during royal and ceremonial occasions among the Edo and Yoruba peoples of Nigeria.",
    description:
      "A ceremonial coral bead regalia featuring polished orange-red beads arranged in layered strands with decorative metal spacers and pendants. The beads symbolize royalty, honor, prosperity, and cultural prestige in Nigerian traditional ceremonies.",
    condition: "Excellent",
    certificate: false,
    featured: false,
    hot: false,
  },

  {
    id: "p3",
    title: "Benin Royal Head",
    artist: artists[4],
    category: "Sculptures",
    image: oowcarv1,
    images: [oowcarv1],
    isAuction: true,
    currentBid: 1200000,
    startingBid: 800000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 18 * 3600000),
    bids: 8,
    origin:
      "Kingdom of Benin (modern day Edo State, especially around Benin City)",
    medium: "Carved wood",
    dimensions: "34cm × 22cm",
    provenance:
      "Studio of Oluwaseun, Nigeria; created in [2000]; offered directly by the artist.",
    description:
      "A silent guardian of history, a masterpiece from the ancient Kingdom of Benin, crafted by the skilled Edo people. The sculpture’s calm expression, symmetrical features, and towering textured crown symbolize royalty, spiritual authority, wisdom, and ancestral reverence. it reflects the sophistication, cultural pride, and artistic brilliance of one of Africa’s most celebrated civilizations.",
    condition: "Good",
    certificate: true,
    featured: false,
    hot: true,
  },

  {
    id: "p9",
    title: "Ceremonial horn (Tika)",
    artist: artists[4],
    category: "Sculptures",
    image: oowcarv4,
    images: [oowcarv4],
    isAuction: true,
    currentBid: 2200000,
    startingBid: 1200000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 7 * 3600000 + 15 * 60000),
    bids: 19,
    origin: "Cameroon, Nigeria, Africa",
    medium: "Carved buffalo horn",
    dimensions: "35cm height",
    provenance:
      "Studio of Oluwaseun, Nigeria; created in [2004]; offered directly by the artist.",
    description:
      "Carved buffalo horns were prestigious objects reserved for nobility, used mainly as ceremonial drinking vessels and symbols of power. They also served as musical instruments for rituals and communication, and occasionally had medicinal or spiritual functions.",
    condition: "Very Good",
    certificate: true,
    featured: false,
    hot: false,
  },

  {
    id: "p7",
    title: "Ère Ìbejì (Twin Figures)",
    artist: artists[4],
    category: "Sculptures",
    image: oowcarv2,
    images: [oowcarv2],
    isAuction: true,
    currentBid: 4100000,
    startingBid: 2800000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 4 * 3600000 + 50 * 60000),
    bids: 29,
    origin: "YorubaTribe, Nigeria 19th C.",
    medium: "Carved wood, Glass beads, Cowrie shells ",
    dimensions: "48cm × 18cm",
    provenance:
      "Studio of Oluwaseun, Nigeria; created in [2010]; offered directly by the artist.",
    description:
      "Ibeji are sacred twin figures revered in Yoruba culture as protectors of children and fertility. Carved from wood and adorned with beads, cowrie shells, and other embellishments, Ibeji figures are believed to embody the spirits of deceased twins and are honored with offerings and rituals.",
    condition: "Good",
    certificate: true,
    featured: true,
    hot: true,
  },

  {
    id: "p16",
    title: "Prestige Staff",
    artist: artists[4],
    category: "Sculptures",
    image: oowcarv5,
    images: [oowcarv5],
    isAuction: true,
    currentBid: 870000,
    startingBid: 600000,
    buyNowPrice: null,
    endsAt: new Date(Date.now() + 11 * 3600000 + 5 * 60000),
    bids: 12,
    origin: "Southeastern or Central Nigeria.",
    medium: "Carved wood",
    dimensions: "42cm length",
    provenance:
      "Studio of Oluwaseun, Nigeria; created in [2003]; offered directly by the artist.",
    description:
      "Prestige Staff is a symbol of authority, in rituals and prayers, for justice and oath-taking, and during ceremonial festivals and ancestral rites.",
    condition: "Good",
    certificate: true,
    featured: false,
    hot: false,
  },

  {
    id: "p10",
    title: "Kuba Royal Cup",
    artist: artists[5],
    category: "Ancient Pottery",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=900&h=1100&fit=crop",
    ],
    isAuction: true,
    currentBid: 720000,
    startingBid: 400000,
    buyNowPrice: 1100000,
    endsAt: new Date(Date.now() + 14 * 3600000 + 40 * 60000),
    bids: 9,
    origin: "DR Congo, Kuba Kingdom, c.1880",
    medium: "Carved wood, geometric incision",
    dimensions: "22cm height",
    provenance: "Belgian missionary estate, 1967",
    description:
      "A Kuba palm wine cup in the form of a human head, covered with interlocking geometric patterns representing the highest Kuba artistic tradition.",
    condition: "Good",
    certificate: false,
    featured: false,
    hot: false,
  },

  {
    id: "p13",
    title: "Lidded Vessel (Eyinle)",
    artist: artists[5],
    category: "Ancient Pottery",
    image: japot,
    images: [japot],
    isAuction: false,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 680000,
    endsAt: null,
    bids: 0,
    origin: "Abeokuta Southwestern Nigeria, 20th.c",
    medium: "Fired faience, Terracotta",
    dimensions: "32cm height",
    provenance:
      "Jesuyanmife workshop, Abeokuta region, Nigeria private collection",
    description:
      "A Yoruba terracotta ceremonial vessel from Abeokuta, Nigeria (19th–20th century), depicting a female figure symbolizing fertility, spiritual power, and ancestral presence. Associated with Eyinle (Erinle) worship, it was used in shrine rituals for offerings, healing substances, or sacred ceremonies.",
    condition: "Good",
    certificate: true,
    featured: false,
    hot: false,
  },

  {
    id: "p6",
    title: "Ndebele Beadwork Panel",
    artist: artists[6],
    category: "Ceremonial Beads",
    image: bead1,
    images: [bead1],
    isAuction: true,
    currentBid: 340000,
    startingBid: 200000,
    buyNowPrice: 550000,
    endsAt: new Date(Date.now() + 28 * 3600000),
    bids: 6,
    origin: "South Africa, Ndebele, c.1985",
    medium: "Czech glass beads, hide, wire",
    dimensions: "90cm × 60cm",
    provenance: "Artist's estate, Pretoria",
    description:
      "A vibrant Ndebele beadwork panel in the classic geometric style. The chevrons and rectangles encode a marriage blessing passed down through generations.",
    condition: "Excellent",
    certificate: false,
    featured: false,
    hot: false,
  },

  {
    id: "p14",
    title: "The Dream Garden",
    artist: artists[7],
    category: "Paintings",
    image: Paint,
    images: [Paint],
    isAuction: true,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 320000,
    endsAt: null,
    bids: 0,
    origin: "Nairobi, Kenya, 2025",
    medium: "Acrylic and collage on board",
    dimensions: "80cm × 100cm",
    provenance: "Artist's studio, Benue",
    description:
      "A soft and calm representation of a shepard and his sheep in a pasture.",
    condition: "Mint",
    certificate: true,
    featured: false,
    hot: false,
  },
  {
    id: "p15",
    title: "Nigeria Royal Beads",
    artist: artists[6],
    category: "Ceremonial Beads",
    image: bead2,
    images: [bead2],
    isAuction: false,
    currentBid: null,
    startingBid: null,
    buyNowPrice: 195000,
    endsAt: null,
    bids: 0,
    origin: "Oyo town, Nigeria",
    medium: "Czech seed beads, sinew",
    dimensions: "58cm length",
    provenance: "Artist's collection",
    description:
      'A traditional Oyo king bead — each color and pattern encoding a message. This piece translates to: "My heart is patient for you."',
    condition: "New",
    certificate: false,
    featured: false,
    hot: false,
  },
];

export const recentlySold = [
  { title: "Benin Bronze Warrior", price: "₦3.2M", buyer: "Lagos" },
  { title: "Ndebele Beadwork Panel", price: "₦890K", buyer: "Accra" },
  { title: "Bamana Chiwara Antelope", price: "₦1.45M", buyer: "London" },
  { title: "Zulu Love Letter Beads", price: "₦320K", buyer: "New York" },
  { title: "Fang Reliquary Head", price: "₦2.1M", buyer: "Paris" },
  { title: "Senufo Poro Helmet", price: "₦760K", buyer: "Nairobi" },
  { title: "Yoruba Ere Ibeji Twins", price: "₦540K", buyer: "Toronto" },
  { title: "Kuba Royal Cup", price: "₦680K", buyer: "Amsterdam" },
  { title: "Timbuktu Leaf Fragment", price: "₦1.1M", buyer: "Dubai" },
  { title: "Ashanti Gold Weight Set", price: "₦450K", buyer: "Dakar" },
];

export const formatPrice = (amount) => {
  if (!amount) return null;
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
  return `₦${amount.toLocaleString()}`;
};

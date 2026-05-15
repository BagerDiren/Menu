import type { Locale } from '@/i18n';

export type Allergen =
  | 'gluten'
  | 'dairy'
  | 'eggs'
  | 'nuts'
  | 'sesame'
  | 'soy'
  | 'fish'
  | 'shellfish'
  | 'mustard';

export type DietTag = 'vegetarian' | 'vegan' | 'halal' | 'spicy' | 'chef_pick' | 'gluten_free';

export type Category =
  | 'starters'
  | 'soups'
  | 'mains'
  | 'grills'
  | 'seafood'
  | 'desserts'
  | 'drinks';

export type Mood = 'light' | 'spicy' | 'sweet' | 'classic' | 'quick' | 'protein';

export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface Dish {
  id: string;
  category: Category;
  name: Localized;
  description: Localized;
  chefNote: Localized;
  ingredients: LocalizedList;
  prepTime: number;
  price: number;
  image: string;
  nutrition: Nutrition;
  allergens: Allergen[];
  tags: DietTag[];
  spiceLevel?: 0 | 1 | 2 | 3;
  /** Visual size weight for bento grid: 1 small, 2 medium, 3 wide-hero */
  bentoSize?: 1 | 2 | 3;
}

import { categoryPhoto, cloudinary, firebase, unsplashImg } from '@/lib/images';

/**
 * Each dish image is resolved per CATEGORY from a hard-coded URL in
 * src/lib/images.ts → CATEGORY_PHOTOS. Every URL is curl-tested 200 OK.
 *
 * To override a single dish, replace `categoryPhoto(...)` with one of:
 *   image: unsplashImg('1567103472667-6898f3a79cf2'),
 *   image: cloudinary('menu/koshary'),
 *   image: firebase('menu/koshary.webp'),
 *   image: 'https://cdn.your-restaurant.com/menu/koshary.jpg',
 */

// Re-export for menu authors.
export { categoryPhoto, cloudinary, firebase, unsplashImg };

export const MENU: Dish[] = [
  // ── STARTERS ────────────────────────────────────────────────────────────
  {
    id: 'ful-medames',
    category: 'starters',
    name: {
      ar: 'فول مدمس',
      en: 'Ful Medames',
      fr: 'Foul Medames',
      de: 'Ful Medames',
      it: 'Ful Medames',
      ru: 'Фул Медамес',
      tr: 'Ful Medames'
    },
    description: {
      ar: 'فول مطهي ببطء مع زيت الزيتون والثوم والليمون والكمون — فطور مصر الكلاسيكي.',
      en: 'Slow-simmered fava beans with olive oil, garlic, lemon and cumin — Egypt’s classic breakfast.',
      fr: 'Fèves mijotées lentement à l’huile d’olive, ail, citron et cumin — petit-déjeuner classique d’Égypte.',
      de: 'Langsam geschmorte Saubohnen mit Olivenöl, Knoblauch, Zitrone und Kreuzkümmel — Ägyptens klassisches Frühstück.',
      it: 'Fave cotte lentamente con olio d’oliva, aglio, limone e cumino — la classica colazione egiziana.',
      ru: 'Тушёные бобы с оливковым маслом, чесноком, лимоном и зирой — классический египетский завтрак.',
      tr: 'Zeytinyağı, sarımsak, limon ve kimyonla yavaş pişirilmiş bakla — Mısır’ın klasik kahvaltısı.'
    },
    chefNote: {
      ar: 'فول الفيوم — يُطهى ١٢ ساعة فوق نار هادئة.',
      en: 'Fayoum fava beans simmered 12 hours over low embers.',
      fr: 'Fèves de Fayoum mijotées 12 h sur braises douces.',
      de: 'Fayoum-Bohnen 12 Stunden über milder Glut geschmort.',
      it: 'Fave del Fayoum a fuoco lento per 12 ore.',
      ru: 'Бобы из Фаюма — 12 часов на тлеющих углях.',
      tr: 'Fayoum baklası — köz üzerinde 12 saat pişirilmiştir.'
    },
    ingredients: {
      ar: ['فول', 'زيت زيتون', 'ثوم', 'ليمون', 'كمون'],
      en: ['Fava beans', 'Olive oil', 'Garlic', 'Lemon', 'Cumin'],
      fr: ['Fèves', 'Huile d’olive', 'Ail', 'Citron', 'Cumin'],
      de: ['Saubohnen', 'Olivenöl', 'Knoblauch', 'Zitrone', 'Kreuzkümmel'],
      it: ['Fave', 'Olio d’oliva', 'Aglio', 'Limone', 'Cumino'],
      ru: ['Бобы', 'Оливковое масло', 'Чеснок', 'Лимон', 'Зира'],
      tr: ['Bakla', 'Zeytinyağı', 'Sarımsak', 'Limon', 'Kimyon']
    },
    prepTime: 15,
    price: 45,
    image: categoryPhoto('starters'),
    nutrition: { calories: 280, protein: 14, carbs: 38, fat: 8, fiber: 12, sodium: 320 },
    allergens: [],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 2
  },
  {
    id: 'tameya',
    category: 'starters',
    name: {
      ar: 'طعمية',
      en: 'Ta’meya (Egyptian Falafel)',
      fr: 'Ta’meya (falafel égyptien)',
      de: 'Ta’meya (ägyptischer Falafel)',
      it: 'Ta’meya (falafel egiziano)',
      ru: 'Тамия (египетский фалафель)',
      tr: 'Ta’meya (Mısır Falafeli)'
    },
    description: {
      ar: 'كرات مقرمشة من الفول الأخضر والكزبرة والشبت — مغطاة بالسمسم وتُقدّم مع الطحينة.',
      en: 'Crisp fried patties of green fava, coriander and dill — sesame-crusted, served with tahini.',
      fr: 'Galettes croustillantes de fèves vertes, coriandre et aneth — enrobées de sésame, servies avec tahini.',
      de: 'Knusprige Bratlinge aus grünen Bohnen, Koriander und Dill — mit Sesam, serviert mit Tahini.',
      it: 'Polpette croccanti di fave verdi, coriandolo e aneto — al sesamo, servite con tahini.',
      ru: 'Хрустящие котлетки из зелёных бобов, кинзы и укропа — в кунжуте, с тахини.',
      tr: 'Yeşil bakla, kişniş ve dereotundan çıtır köfteler — susam kaplı, tahin sosuyla.'
    },
    chefNote: {
      ar: 'تُقلى عند الطلب — قلب مخملي وقشرة من السمسم.',
      en: 'Fried to order — velvet centre, sesame-jewelled crust.',
      fr: 'Frites à la commande — cœur velouté, croûte au sésame.',
      de: 'Auf Bestellung frittiert — samtiges Innere, Sesamkruste.',
      it: 'Fritte al momento — cuore vellutato, crosta di sesamo.',
      ru: 'Жарим при заказе — нежная серёдка, кунжутная корочка.',
      tr: 'Sipariş üzerine kızartılır — kadife iç, susam kabuk.'
    },
    ingredients: {
      ar: ['فول أخضر', 'كزبرة', 'شبت', 'بصل', 'سمسم'],
      en: ['Green fava', 'Coriander', 'Dill', 'Onion', 'Sesame'],
      fr: ['Fèves vertes', 'Coriandre', 'Aneth', 'Oignon', 'Sésame'],
      de: ['Grüne Bohnen', 'Koriander', 'Dill', 'Zwiebel', 'Sesam'],
      it: ['Fave verdi', 'Coriandolo', 'Aneto', 'Cipolla', 'Sesamo'],
      ru: ['Зелёные бобы', 'Кинза', 'Укроп', 'Лук', 'Кунжут'],
      tr: ['Yeşil bakla', 'Kişniş', 'Dereotu', 'Soğan', 'Susam']
    },
    prepTime: 12,
    price: 55,
    image: categoryPhoto('starters'),
    nutrition: { calories: 320, protein: 13, carbs: 30, fat: 17, fiber: 8, sodium: 480 },
    allergens: ['sesame'],
    tags: ['vegan', 'vegetarian', 'halal', 'chef_pick'],
    bentoSize: 2
  },
  {
    id: 'baba-ghanoush',
    category: 'starters',
    name: {
      ar: 'بابا غنوج',
      en: 'Baba Ghanoush',
      fr: 'Baba Ghanoush',
      de: 'Baba Ghanoush',
      it: 'Baba Ghanoush',
      ru: 'Баба Гануш',
      tr: 'Baba Gannuş'
    },
    description: {
      ar: 'باذنجان مشوي على الفحم مع الطحينة والثوم والليمون والرمان.',
      en: 'Charcoal-grilled aubergine with tahini, garlic, lemon and pomegranate jewels.',
      fr: 'Aubergine grillée au charbon avec tahini, ail, citron et grains de grenade.',
      de: 'Auberginen vom Holzkohlegrill mit Tahini, Knoblauch, Zitrone und Granatapfel.',
      it: 'Melanzana grigliata al carbone con tahini, aglio, limone e melagrana.',
      ru: 'Баклажан на углях с тахини, чесноком, лимоном и зёрнами граната.',
      tr: 'Kömürde közlenmiş patlıcan, tahin, sarımsak, limon ve nar taneleriyle.'
    },
    chefNote: {
      ar: 'باذنجان مدخن لمدة ٤٠ دقيقة على فحم البلوط.',
      en: 'Aubergine smoked 40 min over oak coals.',
      fr: 'Aubergine fumée 40 min sur braises de chêne.',
      de: 'Auberginen 40 Min. über Eichenkohle geräuchert.',
      it: 'Melanzana affumicata 40 min su carbone di quercia.',
      ru: 'Баклажан коптится 40 мин на дубовых углях.',
      tr: 'Patlıcan, meşe közünde 40 dakika tütsülenir.'
    },
    ingredients: {
      ar: ['باذنجان', 'طحينة', 'ثوم', 'ليمون', 'رمان'],
      en: ['Aubergine', 'Tahini', 'Garlic', 'Lemon', 'Pomegranate'],
      fr: ['Aubergine', 'Tahini', 'Ail', 'Citron', 'Grenade'],
      de: ['Aubergine', 'Tahini', 'Knoblauch', 'Zitrone', 'Granatapfel'],
      it: ['Melanzana', 'Tahini', 'Aglio', 'Limone', 'Melagrana'],
      ru: ['Баклажан', 'Тахини', 'Чеснок', 'Лимон', 'Гранат'],
      tr: ['Patlıcan', 'Tahin', 'Sarımsak', 'Limon', 'Nar']
    },
    prepTime: 10,
    price: 60,
    image: categoryPhoto('starters'),
    nutrition: { calories: 210, protein: 5, carbs: 14, fat: 16, fiber: 6, sodium: 290 },
    allergens: ['sesame'],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },
  {
    id: 'hummus',
    category: 'starters',
    name: {
      ar: 'حمص بالطحينة',
      en: 'Hummus with Tahini',
      fr: 'Houmous au tahini',
      de: 'Hummus mit Tahini',
      it: 'Hummus al tahini',
      ru: 'Хумус с тахини',
      tr: 'Tahinli Humus'
    },
    description: {
      ar: 'حمص حريري بزيت الزيتون البكر والسماق والصنوبر المحمّص.',
      en: 'Silken chickpea purée with extra-virgin olive oil, sumac and toasted pine nuts.',
      fr: 'Purée de pois chiches soyeuse, huile d’olive extra vierge, sumac et pignons.',
      de: 'Seidiges Kichererbsenpüree mit nativem Olivenöl, Sumach und gerösteten Pinienkernen.',
      it: 'Purea vellutata di ceci con olio extravergine, sumac e pinoli tostati.',
      ru: 'Шёлковое пюре из нута с оливковым маслом, сумахом и кедровыми орешками.',
      tr: 'Sızma zeytinyağı, sumak ve kavrulmuş çam fıstığıyla ipeksi humus.'
    },
    chefNote: {
      ar: 'حمص محلي مقشّر يدوياً لقوام مخملي.',
      en: 'Local chickpeas peeled by hand for velvet texture.',
      fr: 'Pois chiches locaux pelés à la main, texture velours.',
      de: 'Lokale Kichererbsen handgepellt für samtige Textur.',
      it: 'Ceci locali pelati a mano per una crema vellutata.',
      ru: 'Местный нут, очищенный вручную для бархатной текстуры.',
      tr: 'Yerli nohut elle soyulur — kadife dokulu pürüzsüzlük.'
    },
    ingredients: {
      ar: ['حمص', 'طحينة', 'ليمون', 'ثوم', 'صنوبر'],
      en: ['Chickpeas', 'Tahini', 'Lemon', 'Garlic', 'Pine nuts'],
      fr: ['Pois chiches', 'Tahini', 'Citron', 'Ail', 'Pignons'],
      de: ['Kichererbsen', 'Tahini', 'Zitrone', 'Knoblauch', 'Pinienkerne'],
      it: ['Ceci', 'Tahini', 'Limone', 'Aglio', 'Pinoli'],
      ru: ['Нут', 'Тахини', 'Лимон', 'Чеснок', 'Кедровые орехи'],
      tr: ['Nohut', 'Tahin', 'Limon', 'Sarımsak', 'Çam fıstığı']
    },
    prepTime: 8,
    price: 50,
    image: categoryPhoto('starters'),
    nutrition: { calories: 290, protein: 9, carbs: 26, fat: 17, fiber: 7, sodium: 360 },
    allergens: ['sesame', 'nuts'],
    tags: ['vegan', 'vegetarian', 'halal'],
    bentoSize: 1
  },

  // ── SOUPS ───────────────────────────────────────────────────────────────
  {
    id: 'molokhia',
    category: 'soups',
    name: {
      ar: 'ملوخية',
      en: 'Molokhia',
      fr: 'Molokhia',
      de: 'Molokhia',
      it: 'Molokhia',
      ru: 'Молохия',
      tr: 'Molohiya'
    },
    description: {
      ar: 'حساء أوراق الملوخية الفاخر مع مرقة الدجاج والثوم والكزبرة — يُقدّم مع الأرز.',
      en: 'Velvety jute-leaf soup in chicken broth, perfumed with garlic and coriander — served with rice.',
      fr: 'Soupe veloutée de feuilles de corète au bouillon de poulet, ail et coriandre — servie avec riz.',
      de: 'Samtige Jutemalve-Suppe in Hühnerbrühe mit Knoblauch und Koriander — mit Reis.',
      it: 'Vellutata di foglie di juta in brodo di pollo, aglio e coriandolo — con riso.',
      ru: 'Бархатистый суп из джута на курином бульоне с чесноком и кинзой — с рисом.',
      tr: 'Tavuk suyunda, sarımsak ve kişnişle kadife dokulu molohiya çorbası — pilav eşliğinde.'
    },
    chefNote: {
      ar: 'تقصيب الملوخية يدوياً — التركيز يصنع الفارق.',
      en: 'Leaves hand-chopped — concentration is the secret.',
      fr: 'Feuilles hachées à la main — la concentration fait tout.',
      de: 'Blätter handgehackt — Konzentration ist alles.',
      it: 'Foglie tritate a mano — la concentrazione è tutto.',
      ru: 'Листья рубим вручную — концентрация решает.',
      tr: 'Yapraklar elde kıyılır — yoğunluk her şeydir.'
    },
    ingredients: {
      ar: ['ملوخية', 'دجاج', 'ثوم', 'كزبرة', 'سمن'],
      en: ['Jute leaves', 'Chicken', 'Garlic', 'Coriander', 'Ghee'],
      fr: ['Corète', 'Poulet', 'Ail', 'Coriandre', 'Ghee'],
      de: ['Jutemalve', 'Hähnchen', 'Knoblauch', 'Koriander', 'Ghee'],
      it: ['Juta', 'Pollo', 'Aglio', 'Coriandolo', 'Ghee'],
      ru: ['Джут', 'Курица', 'Чеснок', 'Кинза', 'Ги'],
      tr: ['Molohiya', 'Tavuk', 'Sarımsak', 'Kişniş', 'Sade yağ']
    },
    prepTime: 25,
    price: 95,
    image: categoryPhoto('soups'),
    nutrition: { calories: 340, protein: 22, carbs: 32, fat: 12, fiber: 5, sodium: 720 },
    allergens: [],
    tags: ['halal', 'chef_pick'],
    bentoSize: 2
  },
  {
    id: 'lentil-soup',
    category: 'soups',
    name: {
      ar: 'شوربة عدس',
      en: 'Egyptian Lentil Soup',
      fr: 'Soupe aux lentilles égyptienne',
      de: 'Ägyptische Linsensuppe',
      it: 'Zuppa di lenticchie egiziana',
      ru: 'Египетский суп из чечевицы',
      tr: 'Mısır Mercimek Çorbası'
    },
    description: {
      ar: 'عدس أصفر كريمي مع الكمون والثوم وزيت الزيتون والليمون.',
      en: 'Creamy yellow lentils slow-cooked with cumin, garlic, olive oil and lemon.',
      fr: 'Lentilles jaunes crémeuses mijotées avec cumin, ail, huile d’olive et citron.',
      de: 'Cremige gelbe Linsen mit Kreuzkümmel, Knoblauch, Olivenöl und Zitrone.',
      it: 'Lenticchie gialle cremose con cumino, aglio, olio d’oliva e limone.',
      ru: 'Кремовая жёлтая чечевица с зирой, чесноком, оливковым маслом и лимоном.',
      tr: 'Kimyon, sarımsak, zeytinyağı ve limonla pişmiş kremamsı sarı mercimek.'
    },
    chefNote: {
      ar: 'يُقدّم مع زيت الفلفل الحار وقطرات الليمون.',
      en: 'Finished with chilli oil and a squeeze of lemon.',
      fr: 'Fini d’huile pimentée et d’un trait de citron.',
      de: 'Mit Chiliöl und einem Spritzer Zitrone vollendet.',
      it: 'Completata con olio al peperoncino e limone.',
      ru: 'Завершается чили-маслом и каплей лимона.',
      tr: 'Acılı yağ ve birkaç damla limonla servis.'
    },
    ingredients: {
      ar: ['عدس أصفر', 'بصل', 'كمون', 'ثوم', 'ليمون'],
      en: ['Yellow lentils', 'Onion', 'Cumin', 'Garlic', 'Lemon'],
      fr: ['Lentilles jaunes', 'Oignon', 'Cumin', 'Ail', 'Citron'],
      de: ['Gelbe Linsen', 'Zwiebel', 'Kreuzkümmel', 'Knoblauch', 'Zitrone'],
      it: ['Lenticchie gialle', 'Cipolla', 'Cumino', 'Aglio', 'Limone'],
      ru: ['Жёлтая чечевица', 'Лук', 'Зира', 'Чеснок', 'Лимон'],
      tr: ['Sarı mercimek', 'Soğan', 'Kimyon', 'Sarımsak', 'Limon']
    },
    prepTime: 18,
    price: 55,
    image: categoryPhoto('soups'),
    nutrition: { calories: 240, protein: 14, carbs: 32, fat: 7, fiber: 9, sodium: 580 },
    allergens: [],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },

  // ── MAINS ───────────────────────────────────────────────────────────────
  {
    id: 'koshary',
    category: 'mains',
    name: {
      ar: 'كشري',
      en: 'Koshary',
      fr: 'Koshary',
      de: 'Koshary',
      it: 'Koshary',
      ru: 'Кошари',
      tr: 'Koşari'
    },
    description: {
      ar: 'الطبق الوطني المصري: أرز ومكرونة وعدس وحمص بصلصة طماطم حارة وبصل مقرمش.',
      en: 'Egypt’s national dish: layered rice, macaroni, lentils, chickpeas, spicy tomato sauce and crispy onions.',
      fr: 'Le plat national : riz, macaronis, lentilles, pois chiches, sauce tomate épicée et oignons frits.',
      de: 'Ägyptens Nationalgericht: Reis, Makkaroni, Linsen, Kichererbsen, scharfe Tomatensauce, knusprige Zwiebeln.',
      it: 'Il piatto nazionale: riso, maccheroni, lenticchie, ceci, salsa di pomodoro piccante e cipolle croccanti.',
      ru: 'Национальное блюдо: рис, макароны, чечевица, нут, острый томатный соус, хрустящий лук.',
      tr: 'Mısır’ın milli yemeği: pirinç, makarna, mercimek, nohut, acılı domates sosu, çıtır soğan.'
    },
    chefNote: {
      ar: 'سبع طبقات مرصوصة فوق بعضها — رمز التنوع المصري.',
      en: 'Seven precise layers — a symbol of Egypt’s tapestry.',
      fr: 'Sept couches précises — symbole de la mosaïque égyptienne.',
      de: 'Sieben präzise Schichten — Symbol der ägyptischen Vielfalt.',
      it: 'Sette strati precisi — simbolo del mosaico egiziano.',
      ru: 'Семь точных слоёв — символ многоликого Египта.',
      tr: 'Yedi titiz katman — Mısır’ın çeşitliliğinin simgesi.'
    },
    ingredients: {
      ar: ['أرز', 'مكرونة', 'عدس', 'حمص', 'بصل مقلي', 'صلصة طماطم'],
      en: ['Rice', 'Macaroni', 'Lentils', 'Chickpeas', 'Fried onion', 'Tomato sauce'],
      fr: ['Riz', 'Macaronis', 'Lentilles', 'Pois chiches', 'Oignons frits', 'Sauce tomate'],
      de: ['Reis', 'Makkaroni', 'Linsen', 'Kichererbsen', 'Röstzwiebeln', 'Tomatensauce'],
      it: ['Riso', 'Maccheroni', 'Lenticchie', 'Ceci', 'Cipolla fritta', 'Salsa di pomodoro'],
      ru: ['Рис', 'Макароны', 'Чечевица', 'Нут', 'Жареный лук', 'Томатный соус'],
      tr: ['Pirinç', 'Makarna', 'Mercimek', 'Nohut', 'Kızarmış soğan', 'Domates sosu']
    },
    prepTime: 14,
    price: 85,
    image: categoryPhoto('mains'),
    nutrition: { calories: 620, protein: 22, carbs: 105, fat: 12, fiber: 14, sodium: 980 },
    allergens: ['gluten'],
    tags: ['vegan', 'vegetarian', 'halal', 'chef_pick', 'spicy'],
    spiceLevel: 2,
    bentoSize: 3
  },
  {
    id: 'mahshi',
    category: 'mains',
    name: {
      ar: 'محشي خضار مشكل',
      en: 'Mixed Mahshi (Stuffed Vegetables)',
      fr: 'Mahshi mixte (légumes farcis)',
      de: 'Gemischte Mahshi (gefülltes Gemüse)',
      it: 'Mahshi misto (verdure ripiene)',
      ru: 'Махши (фаршированные овощи) ассорти',
      tr: 'Karışık Mahşi (Dolma Sebzeler)'
    },
    description: {
      ar: 'كوسة وفلفل وورق عنب محشي بأرز معطر بالشبت والنعناع والطماطم.',
      en: 'Courgette, peppers and vine leaves stuffed with rice scented by dill, mint and tomato.',
      fr: 'Courgette, poivrons et feuilles de vigne farcis au riz aux herbes.',
      de: 'Zucchini, Paprika und Weinblätter mit duftendem Reis.',
      it: 'Zucchine, peperoni e foglie di vite ripieni di riso profumato.',
      ru: 'Кабачки, перцы и виноградные листья с ароматным рисом.',
      tr: 'Aromalı pirinçle doldurulmuş kabak, biber ve asma yaprağı.'
    },
    chefNote: {
      ar: 'تُلف ٢٠٠ ورقة يومياً بأيدٍ خبيرة.',
      en: '200 leaves rolled by hand each morning.',
      fr: '200 feuilles roulées à la main chaque matin.',
      de: '200 Blätter werden jeden Morgen von Hand gerollt.',
      it: '200 foglie arrotolate a mano ogni mattina.',
      ru: '200 листьев скручиваются вручную каждое утро.',
      tr: 'Her sabah 200 yaprak elle sarılır.'
    },
    ingredients: {
      ar: ['كوسة', 'فلفل', 'ورق عنب', 'أرز', 'شبت', 'نعناع'],
      en: ['Courgette', 'Pepper', 'Vine leaves', 'Rice', 'Dill', 'Mint'],
      fr: ['Courgette', 'Poivron', 'Feuilles de vigne', 'Riz', 'Aneth', 'Menthe'],
      de: ['Zucchini', 'Paprika', 'Weinblätter', 'Reis', 'Dill', 'Minze'],
      it: ['Zucchine', 'Peperone', 'Foglie di vite', 'Riso', 'Aneto', 'Menta'],
      ru: ['Кабачок', 'Перец', 'Виноградные листья', 'Рис', 'Укроп', 'Мята'],
      tr: ['Kabak', 'Biber', 'Asma yaprağı', 'Pirinç', 'Dereotu', 'Nane']
    },
    prepTime: 22,
    price: 120,
    image: categoryPhoto('mains'),
    nutrition: { calories: 480, protein: 11, carbs: 78, fat: 14, fiber: 7, sodium: 690 },
    allergens: [],
    tags: ['vegetarian', 'halal'],
    bentoSize: 2
  },
  {
    id: 'fattah',
    category: 'mains',
    name: {
      ar: 'فتة باللحم',
      en: 'Beef Fattah',
      fr: 'Fattah au bœuf',
      de: 'Rinder-Fattah',
      it: 'Fattah di manzo',
      ru: 'Фатта с говядиной',
      tr: 'Et Fatta'
    },
    description: {
      ar: 'طبق احتفالي: خبز مقرمش وأرز ولحم بقري طري بصلصة الخل والثوم.',
      en: 'A celebratory layered dish: crisp bread, rice, slow-braised beef, vinegar-garlic sauce.',
      fr: 'Plat de fête : pain croustillant, riz, bœuf braisé, sauce vinaigre-ail.',
      de: 'Festliches Schichtgericht: knuspriges Brot, Reis, geschmortes Rind, Essig-Knoblauch-Sauce.',
      it: 'Piatto delle feste: pane croccante, riso, manzo brasato, salsa aglio-aceto.',
      ru: 'Праздничное блюдо: хрустящий хлеб, рис, томлёная говядина, уксусно-чесночный соус.',
      tr: 'Bayram yemeği: çıtır ekmek, pilav, ağır pişmiş et, sirkeli-sarımsaklı sos.'
    },
    chefNote: {
      ar: 'تقدّم تقليدياً للأعياد والأفراح — لحم يُطهى ٤ ساعات.',
      en: 'Traditionally served for feasts — beef braised 4 hours.',
      fr: 'Traditionnellement servi aux fêtes — bœuf braisé 4 h.',
      de: 'Traditionell zu Festen — Rind 4 Std. geschmort.',
      it: 'Tradizionalmente delle feste — manzo brasato 4 ore.',
      ru: 'Подаётся на праздники — говядина томится 4 часа.',
      tr: 'Bayramların yemeği — et 4 saat ağır pişer.'
    },
    ingredients: {
      ar: ['لحم بقري', 'أرز', 'خبز محمص', 'ثوم', 'خل', 'سمن'],
      en: ['Beef', 'Rice', 'Toasted bread', 'Garlic', 'Vinegar', 'Ghee'],
      fr: ['Bœuf', 'Riz', 'Pain grillé', 'Ail', 'Vinaigre', 'Ghee'],
      de: ['Rind', 'Reis', 'Geröstetes Brot', 'Knoblauch', 'Essig', 'Ghee'],
      it: ['Manzo', 'Riso', 'Pane tostato', 'Aglio', 'Aceto', 'Ghee'],
      ru: ['Говядина', 'Рис', 'Поджаренный хлеб', 'Чеснок', 'Уксус', 'Ги'],
      tr: ['Et', 'Pilav', 'Kızarmış ekmek', 'Sarımsak', 'Sirke', 'Sade yağ']
    },
    prepTime: 30,
    price: 220,
    image: categoryPhoto('mains'),
    nutrition: { calories: 780, protein: 38, carbs: 72, fat: 36, fiber: 4, sodium: 1180 },
    allergens: ['gluten'],
    tags: ['halal', 'chef_pick'],
    bentoSize: 2
  },

  // ── GRILLS ──────────────────────────────────────────────────────────────
  {
    id: 'mixed-grill',
    category: 'grills',
    name: {
      ar: 'مشاوي مشكلة',
      en: 'Royal Mixed Grill',
      fr: 'Grillades royales mixtes',
      de: 'Königlicher Grillteller',
      it: 'Grigliata mista reale',
      ru: 'Королевское ассорти-гриль',
      tr: 'Kraliyet Karışık Izgara'
    },
    description: {
      ar: 'كفتة ضأن وكباب وشيش طاووق على الفحم — يُقدّم مع الخبز البلدي والسلطة.',
      en: 'Lamb kofta, kebab and shish taouk over charcoal — with baladi bread and salad.',
      fr: 'Kofta d’agneau, kebab et shish taouk grillés — pain baladi et salade.',
      de: 'Lamm-Kofta, Kebab und Shish Taouk vom Grill — mit Baladi-Brot und Salat.',
      it: 'Kofta d’agnello, kebab e shish taouk alla brace — pane baladi e insalata.',
      ru: 'Кофта из баранины, кебаб и шиш-таук на углях — с лепёшкой балади и салатом.',
      tr: 'Kömürde kuzu köfte, kebap ve şiş tavuk — baladi ekmek ve salata ile.'
    },
    chefNote: {
      ar: 'فحم البلوط ودرجة حرارة دقيقة — الشيف لا يترك النار.',
      en: 'Oak charcoal, exact temperature — the chef never leaves the fire.',
      fr: 'Charbon de chêne, température exacte — le chef ne quitte jamais le feu.',
      de: 'Eichenkohle, exakte Temperatur — der Chef verlässt das Feuer nie.',
      it: 'Carbone di quercia, temperatura precisa — lo chef non lascia mai il fuoco.',
      ru: 'Дубовый уголь, точная температура — повар не отходит от огня.',
      tr: 'Meşe közü, hassas ısı — şef ateşten ayrılmaz.'
    },
    ingredients: {
      ar: ['لحم ضأن', 'دجاج', 'كفتة', 'بصل', 'فلفل', 'بهارات'],
      en: ['Lamb', 'Chicken', 'Kofta', 'Onion', 'Pepper', 'Spices'],
      fr: ['Agneau', 'Poulet', 'Kofta', 'Oignon', 'Poivron', 'Épices'],
      de: ['Lamm', 'Hähnchen', 'Kofta', 'Zwiebel', 'Paprika', 'Gewürze'],
      it: ['Agnello', 'Pollo', 'Kofta', 'Cipolla', 'Peperone', 'Spezie'],
      ru: ['Баранина', 'Курица', 'Кофта', 'Лук', 'Перец', 'Специи'],
      tr: ['Kuzu', 'Tavuk', 'Köfte', 'Soğan', 'Biber', 'Baharatlar']
    },
    prepTime: 28,
    price: 320,
    image: categoryPhoto('grills'),
    nutrition: { calories: 920, protein: 62, carbs: 38, fat: 58, fiber: 4, sodium: 1420 },
    allergens: ['gluten'],
    tags: ['halal', 'chef_pick'],
    bentoSize: 3
  },
  {
    id: 'hamam-mahshi',
    category: 'grills',
    name: {
      ar: 'حمام محشي',
      en: 'Stuffed Pigeon (Hamam Mahshi)',
      fr: 'Pigeon farci (Hamam Mahshi)',
      de: 'Gefüllte Taube (Hamam Mahshi)',
      it: 'Piccione farcito (Hamam Mahshi)',
      ru: 'Фаршированный голубь (Хамам Махши)',
      tr: 'İçi Doldurulmuş Güvercin (Hamam Mahşi)'
    },
    description: {
      ar: 'حمام محشي بالفريك أو الأرز المتبل — تقليد مصري ملكي.',
      en: 'Pigeon stuffed with smoked freekeh or spiced rice — a royal tradition.',
      fr: 'Pigeon farci au freekeh fumé ou riz épicé — tradition royale.',
      de: 'Taube mit Räucher-Freekeh oder Gewürzreis — königliche Tradition.',
      it: 'Piccione ripieno di freekeh affumicato o riso speziato — tradizione reale.',
      ru: 'Голубь, фаршированный фрикой или пряным рисом — королевская традиция.',
      tr: 'Tütsülenmiş frik ya da baharatlı pirinçle doldurulmuş güvercin — kraliyet geleneği.'
    },
    chefNote: {
      ar: 'تربية محلية في برج حمام تقليدي.',
      en: 'Locally raised in a traditional dovecote tower.',
      fr: 'Élevé localement dans un colombier traditionnel.',
      de: 'Lokal in traditionellem Taubenturm aufgezogen.',
      it: 'Allevato in colombaie tradizionali locali.',
      ru: 'Выращен в традиционной голубятне.',
      tr: 'Geleneksel güvercin kulesinde yerel olarak yetiştirilmiştir.'
    },
    ingredients: {
      ar: ['حمام', 'فريك', 'بصل', 'بهارات', 'سمن'],
      en: ['Pigeon', 'Freekeh', 'Onion', 'Spices', 'Ghee'],
      fr: ['Pigeon', 'Freekeh', 'Oignon', 'Épices', 'Ghee'],
      de: ['Taube', 'Freekeh', 'Zwiebel', 'Gewürze', 'Ghee'],
      it: ['Piccione', 'Freekeh', 'Cipolla', 'Spezie', 'Ghee'],
      ru: ['Голубь', 'Фрика', 'Лук', 'Специи', 'Ги'],
      tr: ['Güvercin', 'Frik', 'Soğan', 'Baharatlar', 'Sade yağ']
    },
    prepTime: 35,
    price: 260,
    image: categoryPhoto('grills'),
    nutrition: { calories: 640, protein: 44, carbs: 48, fat: 28, fiber: 5, sodium: 880 },
    allergens: ['gluten'],
    tags: ['halal', 'chef_pick'],
    bentoSize: 2
  },

  // ── SEAFOOD ─────────────────────────────────────────────────────────────
  {
    id: 'sayadeya',
    category: 'seafood',
    name: {
      ar: 'صيادية سمك',
      en: 'Sayadeya Fish & Rice',
      fr: 'Sayadeya — poisson au riz caramélisé',
      de: 'Sayadeya — Fisch mit karamellisiertem Reis',
      it: 'Sayadeya — pesce con riso caramellato',
      ru: 'Сайядия — рыба с карамелизованным рисом',
      tr: 'Sayadeya — Karamelize Pilavlı Balık'
    },
    description: {
      ar: 'فيليه سمك أبيض مع أرز مكرمل بالبصل وصلصة الكمون من الإسكندرية.',
      en: 'White fish fillet over onion-caramel rice with Alexandrian cumin sauce.',
      fr: 'Filet de poisson blanc sur riz caramélisé, sauce au cumin d’Alexandrie.',
      de: 'Weißer Fisch auf karamellisiertem Zwiebelreis mit Kreuzkümmelsauce.',
      it: 'Filetto di pesce su riso caramellato, salsa al cumino di Alessandria.',
      ru: 'Филе белой рыбы на карамелизованном луковом рисе с зирой.',
      tr: 'Karamelize soğan pilavı üzerinde balık filetosu, İskenderiye kimyon sosu.'
    },
    chefNote: {
      ar: 'سمك مرسى مطروح — يصل يومياً في الفجر.',
      en: 'Mersa Matruh catch — arrives daily at dawn.',
      fr: 'Pêche de Marsa Matruh — arrive chaque aube.',
      de: 'Fang aus Marsa Matruh — täglich frühmorgens.',
      it: 'Pescato di Marsa Matruh — arriva all’alba.',
      ru: 'Улов Марса-Матрух — ежедневно на рассвете.',
      tr: 'Mersa Matruh avı — her sabah şafakta gelir.'
    },
    ingredients: {
      ar: ['سمك أبيض', 'أرز', 'بصل', 'كمون', 'ليمون', 'طماطم'],
      en: ['White fish', 'Rice', 'Onion', 'Cumin', 'Lemon', 'Tomato'],
      fr: ['Poisson blanc', 'Riz', 'Oignon', 'Cumin', 'Citron', 'Tomate'],
      de: ['Weißfisch', 'Reis', 'Zwiebel', 'Kreuzkümmel', 'Zitrone', 'Tomate'],
      it: ['Pesce bianco', 'Riso', 'Cipolla', 'Cumino', 'Limone', 'Pomodoro'],
      ru: ['Белая рыба', 'Рис', 'Лук', 'Зира', 'Лимон', 'Помидор'],
      tr: ['Beyaz balık', 'Pirinç', 'Soğan', 'Kimyon', 'Limon', 'Domates']
    },
    prepTime: 24,
    price: 240,
    image: categoryPhoto('seafood'),
    nutrition: { calories: 540, protein: 38, carbs: 62, fat: 14, fiber: 3, sodium: 760 },
    allergens: ['fish'],
    tags: ['halal'],
    bentoSize: 2
  },
  {
    id: 'shrimp-tagine',
    category: 'seafood',
    name: {
      ar: 'طاجن جمبري',
      en: 'Shrimp Tagine',
      fr: 'Tajine de crevettes',
      de: 'Garnelen-Tajine',
      it: 'Tajine di gamberi',
      ru: 'Тажин с креветками',
      tr: 'Karides Güveç'
    },
    description: {
      ar: 'جمبري طازج في طاجن طيني بالطماطم والثوم والفلفل الأخضر والكزبرة.',
      en: 'Fresh prawns in clay pot with tomato, garlic, green chilli and coriander.',
      fr: 'Crevettes fraîches en cocotte de terre, tomate, ail, piment vert, coriandre.',
      de: 'Frische Garnelen im Tontopf, Tomate, Knoblauch, Chili, Koriander.',
      it: 'Gamberi freschi in pentola di coccio, pomodoro, aglio, peperoncino, coriandolo.',
      ru: 'Свежие креветки в глиняном горшке: томат, чеснок, перец, кинза.',
      tr: 'Toprak güveçte taze karides: domates, sarımsak, biber, kişniş.'
    },
    chefNote: {
      ar: 'يقدّم يفور في طاجنه — افتحه على الطاولة.',
      en: 'Served bubbling in its clay pot — open it at the table.',
      fr: 'Servi bouillonnant dans son plat — à ouvrir à table.',
      de: 'Brodelnd im Tontopf serviert — am Tisch öffnen.',
      it: 'Servito ribollente nella sua pentola — da aprire a tavola.',
      ru: 'Подаём кипящим — откройте его за столом.',
      tr: 'Güveç ile kaynar şekilde gelir — masada açın.'
    },
    ingredients: {
      ar: ['جمبري', 'طماطم', 'ثوم', 'فلفل أخضر', 'كزبرة', 'زيت'],
      en: ['Prawns', 'Tomato', 'Garlic', 'Green chilli', 'Coriander', 'Olive oil'],
      fr: ['Crevettes', 'Tomate', 'Ail', 'Piment vert', 'Coriandre', 'Huile d’olive'],
      de: ['Garnelen', 'Tomate', 'Knoblauch', 'Grüne Chili', 'Koriander', 'Olivenöl'],
      it: ['Gamberi', 'Pomodoro', 'Aglio', 'Peperoncino', 'Coriandolo', 'Olio'],
      ru: ['Креветки', 'Помидор', 'Чеснок', 'Перец', 'Кинза', 'Масло'],
      tr: ['Karides', 'Domates', 'Sarımsak', 'Yeşil biber', 'Kişniş', 'Yağ']
    },
    prepTime: 18,
    price: 280,
    image: categoryPhoto('seafood'),
    nutrition: { calories: 420, protein: 36, carbs: 18, fat: 22, fiber: 3, sodium: 980 },
    allergens: ['shellfish'],
    tags: ['halal', 'spicy'],
    spiceLevel: 2,
    bentoSize: 2
  },

  // ── DESSERTS ────────────────────────────────────────────────────────────
  {
    id: 'om-ali',
    category: 'desserts',
    name: {
      ar: 'أم علي',
      en: 'Om Ali',
      fr: 'Om Ali',
      de: 'Om Ali',
      it: 'Om Ali',
      ru: 'Ом Али',
      tr: 'Om Ali'
    },
    description: {
      ar: 'بودينج العجين الفطير بالحليب الساخن والمكسرات والزبيب — حلوى مصر الوطنية.',
      en: 'Warm puff-pastry pudding with milk, nuts and raisins — Egypt’s beloved dessert.',
      fr: 'Pouding chaud de pâte feuilletée au lait, fruits secs et raisins.',
      de: 'Warmes Blätterteig-Pudding mit Milch, Nüssen und Rosinen.',
      it: 'Budino caldo di pasta sfoglia con latte, frutta secca e uvetta.',
      ru: 'Тёплый пудинг из слоёного теста с молоком, орехами и изюмом.',
      tr: 'Sıcak süt, kuruyemiş ve kuru üzümle milföy puding.'
    },
    chefNote: {
      ar: 'يخبز فوقها قشرة ذهبية قبل التقديم مباشرة.',
      en: 'Browned to a golden crust seconds before serving.',
      fr: 'Croûte dorée juste avant le service.',
      de: 'Goldbraune Kruste kurz vor dem Servieren.',
      it: 'Crosta dorata pochi secondi prima del servizio.',
      ru: 'Запекаем до золотистой корочки прямо перед подачей.',
      tr: 'Servisten saniyeler önce altın renginde kızartılır.'
    },
    ingredients: {
      ar: ['عجين فطير', 'حليب', 'فستق', 'لوز', 'زبيب', 'قشطة'],
      en: ['Puff pastry', 'Milk', 'Pistachio', 'Almond', 'Raisin', 'Cream'],
      fr: ['Pâte feuilletée', 'Lait', 'Pistache', 'Amande', 'Raisin', 'Crème'],
      de: ['Blätterteig', 'Milch', 'Pistazie', 'Mandel', 'Rosinen', 'Sahne'],
      it: ['Sfoglia', 'Latte', 'Pistacchio', 'Mandorla', 'Uvetta', 'Panna'],
      ru: ['Слоёное тесто', 'Молоко', 'Фисташка', 'Миндаль', 'Изюм', 'Сливки'],
      tr: ['Milföy', 'Süt', 'Antep fıstığı', 'Badem', 'Kuru üzüm', 'Kaymak']
    },
    prepTime: 16,
    price: 70,
    image: categoryPhoto('desserts'),
    nutrition: { calories: 520, protein: 11, carbs: 58, fat: 26, fiber: 3, sodium: 220 },
    allergens: ['gluten', 'dairy', 'nuts', 'eggs'],
    tags: ['vegetarian', 'halal', 'chef_pick'],
    bentoSize: 2
  },
  {
    id: 'basbousa',
    category: 'desserts',
    name: {
      ar: 'بسبوسة',
      en: 'Basbousa',
      fr: 'Basbousa',
      de: 'Basbousa',
      it: 'Basbousa',
      ru: 'Басбуса',
      tr: 'Revani (Basbusa)'
    },
    description: {
      ar: 'كيكة السميد المنقوعة بشراب الورد، مزينة باللوز.',
      en: 'Semolina cake soaked in rose-water syrup, crowned with almonds.',
      fr: 'Gâteau de semoule au sirop d’eau de rose, garni d’amandes.',
      de: 'Grießkuchen in Rosenwassersirup mit Mandeln.',
      it: 'Torta di semolino allo sciroppo di acqua di rose, con mandorle.',
      ru: 'Манный пирог в сиропе с розовой водой, украшен миндалём.',
      tr: 'Gül suyu şerbetli irmik tatlısı, badem süslemeli.'
    },
    chefNote: {
      ar: 'شراب الورد من تيتل الفيوم المقطّر يدوياً.',
      en: 'Rose syrup distilled by hand from Fayoum petals.',
      fr: 'Sirop de rose distillé à la main des pétales du Fayoum.',
      de: 'Rosensirup von Hand aus Fayoum-Blüten destilliert.',
      it: 'Sciroppo di rose distillato a mano dai petali del Fayoum.',
      ru: 'Сироп из лепестков роз Фаюма ручной перегонки.',
      tr: 'Fayoum güllerinden elle damıtılmış gül şurubu.'
    },
    ingredients: {
      ar: ['سميد', 'سكر', 'ماء ورد', 'لوز', 'زبدة', 'لبن'],
      en: ['Semolina', 'Sugar', 'Rose water', 'Almond', 'Butter', 'Yogurt'],
      fr: ['Semoule', 'Sucre', 'Eau de rose', 'Amande', 'Beurre', 'Yaourt'],
      de: ['Grieß', 'Zucker', 'Rosenwasser', 'Mandel', 'Butter', 'Joghurt'],
      it: ['Semolino', 'Zucchero', 'Acqua di rose', 'Mandorla', 'Burro', 'Yogurt'],
      ru: ['Манка', 'Сахар', 'Розовая вода', 'Миндаль', 'Масло', 'Йогурт'],
      tr: ['İrmik', 'Şeker', 'Gül suyu', 'Badem', 'Tereyağı', 'Yoğurt']
    },
    prepTime: 12,
    price: 55,
    image: categoryPhoto('desserts'),
    nutrition: { calories: 380, protein: 6, carbs: 62, fat: 12, fiber: 2, sodium: 180 },
    allergens: ['gluten', 'dairy', 'nuts', 'eggs'],
    tags: ['vegetarian', 'halal'],
    bentoSize: 1
  },
  {
    id: 'mahalabia',
    category: 'desserts',
    name: {
      ar: 'مهلبية',
      en: 'Mahalabia',
      fr: 'Mahalabia',
      de: 'Mahalabia',
      it: 'Mahalabia',
      ru: 'Махалабия',
      tr: 'Muhallebi'
    },
    description: {
      ar: 'كاسترد الحليب الناعم بماء الزهر والفستق المطحون.',
      en: 'Silky milk custard scented with orange blossom and crushed pistachios.',
      fr: 'Crème au lait soyeuse à la fleur d’oranger et pistaches.',
      de: 'Seidige Milchcreme mit Orangenblüte und Pistazien.',
      it: 'Crema di latte ai fiori d’arancio e pistacchi.',
      ru: 'Шёлковый молочный пудинг с апельсиновым цветом и фисташками.',
      tr: 'Portakal çiçeği aromalı, fıstıklı ipeksi muhallebi.'
    },
    chefNote: {
      ar: 'يُبرَّد ٤ ساعات على ثلج مكسر.',
      en: 'Chilled 4 hours over crushed ice.',
      fr: 'Refroidi 4 h sur glace pilée.',
      de: '4 Stunden auf Crushed-Ice gekühlt.',
      it: 'Raffreddato 4 ore su ghiaccio.',
      ru: 'Охлаждается 4 часа на колотом льду.',
      tr: 'Kırılmış buz üzerinde 4 saat soğutulur.'
    },
    ingredients: {
      ar: ['حليب', 'نشا أرز', 'سكر', 'ماء زهر', 'فستق'],
      en: ['Milk', 'Rice starch', 'Sugar', 'Orange-blossom water', 'Pistachio'],
      fr: ['Lait', 'Amidon de riz', 'Sucre', 'Eau de fleur d’oranger', 'Pistache'],
      de: ['Milch', 'Reisstärke', 'Zucker', 'Orangenblütenwasser', 'Pistazie'],
      it: ['Latte', 'Amido di riso', 'Zucchero', 'Acqua di fiori d’arancio', 'Pistacchio'],
      ru: ['Молоко', 'Рисовый крахмал', 'Сахар', 'Флёрдоранж', 'Фисташка'],
      tr: ['Süt', 'Pirinç nişastası', 'Şeker', 'Portakal çiçeği suyu', 'Antep fıstığı']
    },
    prepTime: 10,
    price: 50,
    image: categoryPhoto('desserts'),
    nutrition: { calories: 260, protein: 7, carbs: 36, fat: 10, fiber: 1, sodium: 90 },
    allergens: ['dairy', 'nuts'],
    tags: ['vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },

  // ── DRINKS ──────────────────────────────────────────────────────────────
  {
    id: 'karkadeh',
    category: 'drinks',
    name: {
      ar: 'كركديه',
      en: 'Karkadeh (Hibiscus)',
      fr: 'Karkadé (hibiscus)',
      de: 'Karkadeh (Hibiskus)',
      it: 'Karkadè (ibisco)',
      ru: 'Каркаде (гибискус)',
      tr: 'Karkade (Hibiskus)'
    },
    description: {
      ar: 'مشروب الكركديه الفرعوني — يُقدّم ساخناً أو مثلجاً.',
      en: 'The Pharaohs’ hibiscus brew — served hot or iced.',
      fr: 'L’infusion d’hibiscus des pharaons — chaude ou glacée.',
      de: 'Pharaonischer Hibiskustrunk — heiß oder eisgekühlt.',
      it: 'L’infuso d’ibisco dei faraoni — caldo o ghiacciato.',
      ru: 'Гибискусовый напиток фараонов — горячий или со льдом.',
      tr: 'Firavunların hibiskus içeceği — sıcak ya da buzlu.'
    },
    chefNote: {
      ar: 'زهور أسوان البرية — نقعة ١٢ ساعة.',
      en: 'Wild Aswan blossoms — 12-hour cold infusion.',
      fr: 'Fleurs sauvages d’Assouan — infusion froide 12 h.',
      de: 'Wilde Assuan-Blüten — 12 Stunden kalt aufgegossen.',
      it: 'Fiori selvatici di Assuan — infusione fredda 12 ore.',
      ru: 'Дикие соцветия Асуана — холодный настой 12 часов.',
      tr: 'Vahşi Asvan çiçekleri — 12 saatlik soğuk demleme.'
    },
    ingredients: {
      ar: ['كركديه', 'ماء', 'سكر قصب', 'ليمون'],
      en: ['Hibiscus', 'Water', 'Cane sugar', 'Lemon'],
      fr: ['Hibiscus', 'Eau', 'Sucre de canne', 'Citron'],
      de: ['Hibiskus', 'Wasser', 'Rohrzucker', 'Zitrone'],
      it: ['Ibisco', 'Acqua', 'Zucchero di canna', 'Limone'],
      ru: ['Гибискус', 'Вода', 'Тростниковый сахар', 'Лимон'],
      tr: ['Hibiskus', 'Su', 'Kamış şekeri', 'Limon']
    },
    prepTime: 3,
    price: 35,
    image: categoryPhoto('drinks'),
    nutrition: { calories: 90, protein: 0, carbs: 22, fat: 0, fiber: 0, sodium: 10 },
    allergens: [],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },
  {
    id: 'sahlab',
    category: 'drinks',
    name: {
      ar: 'سحلب',
      en: 'Sahlab',
      fr: 'Sahlab',
      de: 'Sahlab',
      it: 'Sahlab',
      ru: 'Сахлеб',
      tr: 'Salep'
    },
    description: {
      ar: 'مشروب الحليب الكريمي الدافئ مع القرفة والمكسرات.',
      en: 'Creamy warm milk drink dusted with cinnamon and crushed nuts.',
      fr: 'Boisson lactée crémeuse à la cannelle et fruits secs.',
      de: 'Cremiges warmes Milchgetränk mit Zimt und Nüssen.',
      it: 'Bevanda calda al latte con cannella e frutta secca.',
      ru: 'Кремовый тёплый молочный напиток с корицей и орехами.',
      tr: 'Tarçınlı, fıstıklı, kremamsı sıcak süt — salep.'
    },
    chefNote: {
      ar: 'يُحضَّر بالشكل التقليدي على البخار.',
      en: 'Traditional steam-prepared, no shortcuts.',
      fr: 'À la vapeur, à l’ancienne — sans raccourci.',
      de: 'Traditionell mit Dampf zubereitet — keine Abkürzungen.',
      it: 'Al vapore, alla tradizionale — nessuna scorciatoia.',
      ru: 'Готовится на пару по-старинному — без сокращений.',
      tr: 'Geleneksel buharlı pişirme — kestirme yok.'
    },
    ingredients: {
      ar: ['حليب', 'سحلب', 'قرفة', 'فستق', 'جوز هند'],
      en: ['Milk', 'Sahlab', 'Cinnamon', 'Pistachio', 'Coconut'],
      fr: ['Lait', 'Sahlab', 'Cannelle', 'Pistache', 'Coco'],
      de: ['Milch', 'Sahlab', 'Zimt', 'Pistazie', 'Kokos'],
      it: ['Latte', 'Sahlab', 'Cannella', 'Pistacchio', 'Cocco'],
      ru: ['Молоко', 'Сахлеб', 'Корица', 'Фисташка', 'Кокос'],
      tr: ['Süt', 'Salep', 'Tarçın', 'Antep fıstığı', 'Hindistan cevizi']
    },
    prepTime: 7,
    price: 45,
    image: categoryPhoto('drinks'),
    nutrition: { calories: 220, protein: 7, carbs: 32, fat: 8, fiber: 1, sodium: 110 },
    allergens: ['dairy', 'nuts'],
    tags: ['vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },
  {
    id: 'mint-tea',
    category: 'drinks',
    name: {
      ar: 'شاي بالنعناع',
      en: 'Mint Tea',
      fr: 'Thé à la menthe',
      de: 'Minztee',
      it: 'Tè alla menta',
      ru: 'Чай с мятой',
      tr: 'Naneli Çay'
    },
    description: {
      ar: 'شاي أسود طازج مع باقة نعناع.',
      en: 'Fresh black tea bloomed with a bouquet of mint.',
      fr: 'Thé noir frais infusé avec un bouquet de menthe.',
      de: 'Frischer Schwarztee mit Minzstrauß.',
      it: 'Tè nero fresco con mazzetto di menta.',
      ru: 'Свежий чёрный чай с пучком мяты.',
      tr: 'Taze siyah çay, demet naneyle.'
    },
    chefNote: {
      ar: 'شاي السلكة المصري الكلاسيكي.',
      en: 'Classic Egyptian Selka tea.',
      fr: 'Thé Selka égyptien classique.',
      de: 'Klassischer ägyptischer Selka-Tee.',
      it: 'Classico tè Selka egiziano.',
      ru: 'Классический египетский чай Селка.',
      tr: 'Klasik Mısır Selka çayı.'
    },
    ingredients: {
      ar: ['شاي أسود', 'نعناع', 'سكر'],
      en: ['Black tea', 'Mint', 'Sugar'],
      fr: ['Thé noir', 'Menthe', 'Sucre'],
      de: ['Schwarztee', 'Minze', 'Zucker'],
      it: ['Tè nero', 'Menta', 'Zucchero'],
      ru: ['Чёрный чай', 'Мята', 'Сахар'],
      tr: ['Siyah çay', 'Nane', 'Şeker']
    },
    prepTime: 4,
    price: 25,
    image: categoryPhoto('drinks'),
    nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, sodium: 5 },
    allergens: [],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  },
  {
    id: 'turkish-coffee',
    category: 'drinks',
    name: {
      ar: 'قهوة تركي',
      en: 'Egyptian Coffee',
      fr: 'Café égyptien',
      de: 'Ägyptischer Kaffee',
      it: 'Caffè egiziano',
      ru: 'Египетский кофе',
      tr: 'Türk Kahvesi'
    },
    description: {
      ar: 'قهوة عربية محمصة بطريقة تقليدية مع الهيل.',
      en: 'Traditionally roasted Arabic coffee with cardamom.',
      fr: 'Café arabe torréfié à l’ancienne, cardamome.',
      de: 'Traditionell gerösteter arabischer Kaffee mit Kardamom.',
      it: 'Caffè arabo tostato alla tradizionale, cardamomo.',
      ru: 'Традиционно обжаренный арабский кофе с кардамоном.',
      tr: 'Geleneksel kavrulmuş Arap kahvesi, kakule notalı.'
    },
    chefNote: {
      ar: 'تُغلى مرتين في الكنكة النحاسية.',
      en: 'Twice-boiled in a copper kanaka.',
      fr: 'Bouilli deux fois dans la kanaka de cuivre.',
      de: 'Zweimal in der Kupfer-Kanaka aufgekocht.',
      it: 'Bollito due volte nel cezve di rame.',
      ru: 'Дважды доводится до кипения в медной кенке.',
      tr: 'Bakır cezvede iki kez kaynatılır.'
    },
    ingredients: {
      ar: ['بن عربي', 'هيل', 'سكر', 'ماء'],
      en: ['Arabic coffee', 'Cardamom', 'Sugar', 'Water'],
      fr: ['Café arabe', 'Cardamome', 'Sucre', 'Eau'],
      de: ['Arabischer Kaffee', 'Kardamom', 'Zucker', 'Wasser'],
      it: ['Caffè arabo', 'Cardamomo', 'Zucchero', 'Acqua'],
      ru: ['Арабский кофе', 'Кардамон', 'Сахар', 'Вода'],
      tr: ['Arap kahvesi', 'Kakule', 'Şeker', 'Su']
    },
    prepTime: 5,
    price: 30,
    image: categoryPhoto('drinks'),
    nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0, fiber: 0, sodium: 5 },
    allergens: [],
    tags: ['vegan', 'vegetarian', 'halal', 'gluten_free'],
    bentoSize: 1
  }
];

export const CATEGORIES: Category[] = [
  'starters',
  'soups',
  'mains',
  'grills',
  'seafood',
  'desserts',
  'drinks'
];

export const ALL_ALLERGENS: Allergen[] = [
  'gluten',
  'dairy',
  'eggs',
  'nuts',
  'sesame',
  'soy',
  'fish',
  'shellfish',
  'mustard'
];

export const MOODS: Mood[] = ['light', 'spicy', 'sweet', 'classic', 'quick', 'protein'];

/** Local heuristic for instant mood filtering (no network roundtrip). */
export function dishesForMood(mood: Mood): string[] {
  switch (mood) {
    case 'light':
      return MENU.filter((d) => d.nutrition.calories <= 320 && d.category !== 'desserts').map(
        (d) => d.id
      );
    case 'spicy':
      return MENU.filter((d) => d.tags.includes('spicy') || (d.spiceLevel ?? 0) >= 2).map(
        (d) => d.id
      );
    case 'sweet':
      return MENU.filter((d) => d.category === 'desserts').map((d) => d.id);
    case 'classic':
      return ['ful-medames', 'koshary', 'molokhia', 'om-ali', 'karkadeh', 'mint-tea'];
    case 'quick':
      return MENU.filter((d) => d.prepTime <= 10).map((d) => d.id);
    case 'protein':
      return MENU.filter((d) => d.nutrition.protein >= 22).map((d) => d.id);
  }
}

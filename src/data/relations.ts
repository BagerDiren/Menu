import type { Locale } from '@/i18n';
import type { Localized } from './menu';

/**
 * Egyptian regions used in the ingredient-journey map.
 * Coordinates target the SVG viewBox in IngredientMap.tsx (400 × 500).
 */
export type Region =
  | 'alexandria'
  | 'mersa-matruh'
  | 'delta'
  | 'cairo'
  | 'fayoum'
  | 'sinai'
  | 'luxor'
  | 'aswan'
  | 'red-sea';

export const REGION_COORDS: Record<Region, { x: number; y: number }> = {
  'mersa-matruh': { x: 60, y: 90 },
  alexandria: { x: 140, y: 95 },
  delta: { x: 215, y: 110 },
  cairo: { x: 240, y: 150 },
  fayoum: { x: 200, y: 180 },
  sinai: { x: 340, y: 130 },
  'red-sea': { x: 320, y: 270 },
  luxor: { x: 245, y: 350 },
  aswan: { x: 250, y: 430 }
};

export const REGION_NAMES: Record<Region, Localized> = {
  alexandria: {
    ar: 'الإسكندرية',
    en: 'Alexandria',
    fr: 'Alexandrie',
    de: 'Alexandria',
    it: 'Alessandria',
    ru: 'Александрия',
    tr: 'İskenderiye'
  },
  'mersa-matruh': {
    ar: 'مرسى مطروح',
    en: 'Mersa Matruh',
    fr: 'Marsa Matrouh',
    de: 'Mersa Matruh',
    it: 'Marsa Matruh',
    ru: 'Марса-Матрух',
    tr: 'Mersa Matruh'
  },
  delta: {
    ar: 'الدلتا',
    en: 'Nile Delta',
    fr: 'Delta du Nil',
    de: 'Nildelta',
    it: 'Delta del Nilo',
    ru: 'Дельта Нила',
    tr: 'Nil Deltası'
  },
  cairo: {
    ar: 'القاهرة',
    en: 'Cairo',
    fr: 'Le Caire',
    de: 'Kairo',
    it: 'Il Cairo',
    ru: 'Каир',
    tr: 'Kahire'
  },
  fayoum: {
    ar: 'الفيوم',
    en: 'Fayoum',
    fr: 'Fayoum',
    de: 'Fayoum',
    it: 'Fayoum',
    ru: 'Фаюм',
    tr: 'Fayoum'
  },
  sinai: {
    ar: 'سيناء',
    en: 'Sinai',
    fr: 'Sinaï',
    de: 'Sinai',
    it: 'Sinai',
    ru: 'Синай',
    tr: 'Sina'
  },
  'red-sea': {
    ar: 'البحر الأحمر',
    en: 'Red Sea',
    fr: 'Mer Rouge',
    de: 'Rotes Meer',
    it: 'Mar Rosso',
    ru: 'Красное море',
    tr: 'Kızıldeniz'
  },
  luxor: {
    ar: 'الأقصر',
    en: 'Luxor',
    fr: 'Louxor',
    de: 'Luxor',
    it: 'Luxor',
    ru: 'Луксор',
    tr: 'Luksor'
  },
  aswan: {
    ar: 'أسوان',
    en: 'Aswan',
    fr: 'Assouan',
    de: 'Assuan',
    it: 'Assuan',
    ru: 'Асуан',
    tr: 'Asvan'
  }
};

export interface Origin {
  region: Region;
  ingredient: Localized;
}

export interface Relation {
  /** Suggested pairing dish id — must be a different dish. */
  pairing?: string;
  /** Geographic origins of the dish’s signature ingredients (1–3). */
  origins: Origin[];
}

export const RELATIONS: Record<string, Relation> = {
  'ful-medames': {
    pairing: 'karkadeh',
    origins: [
      {
        region: 'fayoum',
        ingredient: {
          ar: 'فول الفيوم',
          en: 'Fayoum fava',
          fr: 'Fèves du Fayoum',
          de: 'Fayoum-Bohnen',
          it: 'Fave del Fayoum',
          ru: 'Бобы Фаюма',
          tr: 'Fayoum baklası'
        }
      },
      {
        region: 'delta',
        ingredient: {
          ar: 'زيت زيتون',
          en: 'Olive oil',
          fr: 'Huile d’olive',
          de: 'Olivenöl',
          it: 'Olio d’oliva',
          ru: 'Оливковое масло',
          tr: 'Zeytinyağı'
        }
      }
    ]
  },
  tameya: {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'فول أخضر',
          en: 'Green fava',
          fr: 'Fèves vertes',
          de: 'Grüne Bohnen',
          it: 'Fave verdi',
          ru: 'Зелёные бобы',
          tr: 'Yeşil bakla'
        }
      },
      {
        region: 'fayoum',
        ingredient: {
          ar: 'سمسم',
          en: 'Sesame',
          fr: 'Sésame',
          de: 'Sesam',
          it: 'Sesamo',
          ru: 'Кунжут',
          tr: 'Susam'
        }
      }
    ]
  },
  'baba-ghanoush': {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'باذنجان رومي',
          en: 'Delta aubergine',
          fr: 'Aubergine du Delta',
          de: 'Delta-Aubergine',
          it: 'Melanzana del Delta',
          ru: 'Баклажан Дельты',
          tr: 'Delta patlıcanı'
        }
      },
      {
        region: 'aswan',
        ingredient: {
          ar: 'رمان أسوان',
          en: 'Aswan pomegranate',
          fr: 'Grenade d’Assouan',
          de: 'Assuan-Granatapfel',
          it: 'Melagrana di Assuan',
          ru: 'Гранат Асуана',
          tr: 'Asvan narı'
        }
      }
    ]
  },
  hummus: {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'fayoum',
        ingredient: {
          ar: 'حمص الفيوم',
          en: 'Fayoum chickpeas',
          fr: 'Pois chiches du Fayoum',
          de: 'Fayoum-Kichererbsen',
          it: 'Ceci del Fayoum',
          ru: 'Нут Фаюма',
          tr: 'Fayoum nohutu'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'صنوبر سيناء',
          en: 'Sinai pine nuts',
          fr: 'Pignons du Sinaï',
          de: 'Sinai-Pinienkerne',
          it: 'Pinoli del Sinai',
          ru: 'Кедровые орехи Синая',
          tr: 'Sina çam fıstığı'
        }
      }
    ]
  },
  molokhia: {
    pairing: 'karkadeh',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'ملوخية دلتاوية',
          en: 'Delta jute leaves',
          fr: 'Corète du Delta',
          de: 'Delta-Jutemalve',
          it: 'Juta del Delta',
          ru: 'Джут Дельты',
          tr: 'Delta molohiyası'
        }
      },
      {
        region: 'cairo',
        ingredient: {
          ar: 'كزبرة بلدية',
          en: 'Egyptian coriander',
          fr: 'Coriandre d’Égypte',
          de: 'Ägyptischer Koriander',
          it: 'Coriandolo egiziano',
          ru: 'Египетская кинза',
          tr: 'Mısır kişnişi'
        }
      }
    ]
  },
  'lentil-soup': {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'عدس أصفر',
          en: 'Yellow lentils',
          fr: 'Lentilles jaunes',
          de: 'Gelbe Linsen',
          it: 'Lenticchie gialle',
          ru: 'Жёлтая чечевица',
          tr: 'Sarı mercimek'
        }
      },
      {
        region: 'aswan',
        ingredient: {
          ar: 'كمون',
          en: 'Aswan cumin',
          fr: 'Cumin d’Assouan',
          de: 'Assuan-Kreuzkümmel',
          it: 'Cumino di Assuan',
          ru: 'Зира Асуана',
          tr: 'Asvan kimyonu'
        }
      }
    ]
  },
  koshary: {
    pairing: 'karkadeh',
    origins: [
      {
        region: 'cairo',
        ingredient: {
          ar: 'وصفة القاهرة',
          en: 'Cairo street recipe',
          fr: 'Recette de la rue cairote',
          de: 'Kairoer Straßenrezept',
          it: 'Ricetta del Cairo',
          ru: 'Каирский уличный рецепт',
          tr: 'Kahire sokak tarifi'
        }
      },
      {
        region: 'delta',
        ingredient: {
          ar: 'أرز الدلتا',
          en: 'Delta rice',
          fr: 'Riz du Delta',
          de: 'Delta-Reis',
          it: 'Riso del Delta',
          ru: 'Рис Дельты',
          tr: 'Delta pirinci'
        }
      },
      {
        region: 'fayoum',
        ingredient: {
          ar: 'عدس بني',
          en: 'Brown lentils',
          fr: 'Lentilles brunes',
          de: 'Braune Linsen',
          it: 'Lenticchie brune',
          ru: 'Коричневая чечевица',
          tr: 'Kahverengi mercimek'
        }
      }
    ]
  },
  mahshi: {
    pairing: 'karkadeh',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'كوسة وفلفل',
          en: 'Courgette & peppers',
          fr: 'Courgette & poivrons',
          de: 'Zucchini & Paprika',
          it: 'Zucchine & peperoni',
          ru: 'Кабачки и перцы',
          tr: 'Kabak & biber'
        }
      },
      {
        region: 'fayoum',
        ingredient: {
          ar: 'أرز قصير',
          en: 'Short-grain rice',
          fr: 'Riz à grain court',
          de: 'Rundkornreis',
          it: 'Riso a grano corto',
          ru: 'Круглозёрный рис',
          tr: 'Kısa pirinç'
        }
      }
    ]
  },
  fattah: {
    pairing: 'sahlab',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'لحم بقري',
          en: 'Delta beef',
          fr: 'Bœuf du Delta',
          de: 'Delta-Rind',
          it: 'Manzo del Delta',
          ru: 'Говядина Дельты',
          tr: 'Delta eti'
        }
      },
      {
        region: 'cairo',
        ingredient: {
          ar: 'خبز بلدي',
          en: 'Baladi bread',
          fr: 'Pain baladi',
          de: 'Baladi-Brot',
          it: 'Pane baladi',
          ru: 'Хлеб балади',
          tr: 'Baladi ekmek'
        }
      }
    ]
  },
  'mixed-grill': {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'لحم ضأن',
          en: 'Lamb',
          fr: 'Agneau',
          de: 'Lamm',
          it: 'Agnello',
          ru: 'Баранина',
          tr: 'Kuzu'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'بهارات سيناء',
          en: 'Sinai spice blend',
          fr: 'Épices du Sinaï',
          de: 'Sinai-Gewürze',
          it: 'Spezie del Sinai',
          ru: 'Специи Синая',
          tr: 'Sina baharatları'
        }
      },
      {
        region: 'cairo',
        ingredient: {
          ar: 'خبز بلدي',
          en: 'Baladi bread',
          fr: 'Pain baladi',
          de: 'Baladi-Brot',
          it: 'Pane baladi',
          ru: 'Хлеб балади',
          tr: 'Baladi ekmek'
        }
      }
    ]
  },
  'hamam-mahshi': {
    pairing: 'turkish-coffee',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'حمام البرج',
          en: 'Dovecote pigeons',
          fr: 'Pigeons des colombiers',
          de: 'Tauben aus dem Turm',
          it: 'Piccioni del colombaio',
          ru: 'Голуби голубятен',
          tr: 'Güvercin kulesi'
        }
      },
      {
        region: 'fayoum',
        ingredient: {
          ar: 'فريك مدخن',
          en: 'Smoked freekeh',
          fr: 'Freekeh fumé',
          de: 'Räucher-Freekeh',
          it: 'Freekeh affumicato',
          ru: 'Копчёная фрика',
          tr: 'Tütsülenmiş frik'
        }
      }
    ]
  },
  sayadeya: {
    pairing: 'karkadeh',
    origins: [
      {
        region: 'mersa-matruh',
        ingredient: {
          ar: 'سمك أبيض',
          en: 'White fish',
          fr: 'Poisson blanc',
          de: 'Weißfisch',
          it: 'Pesce bianco',
          ru: 'Белая рыба',
          tr: 'Beyaz balık'
        }
      },
      {
        region: 'alexandria',
        ingredient: {
          ar: 'كمون إسكندري',
          en: 'Alexandrian cumin',
          fr: 'Cumin alexandrin',
          de: 'Alexandrinischer Kreuzkümmel',
          it: 'Cumino alessandrino',
          ru: 'Александрийская зира',
          tr: 'İskenderiye kimyonu'
        }
      }
    ]
  },
  'shrimp-tagine': {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'red-sea',
        ingredient: {
          ar: 'جمبري البحر الأحمر',
          en: 'Red Sea prawns',
          fr: 'Crevettes de la mer Rouge',
          de: 'Garnelen aus dem Roten Meer',
          it: 'Gamberi del Mar Rosso',
          ru: 'Креветки Красного моря',
          tr: 'Kızıldeniz karidesi'
        }
      },
      {
        region: 'delta',
        ingredient: {
          ar: 'طماطم بلدي',
          en: 'Baladi tomato',
          fr: 'Tomate baladi',
          de: 'Baladi-Tomate',
          it: 'Pomodoro baladi',
          ru: 'Помидор балади',
          tr: 'Baladi domates'
        }
      }
    ]
  },
  'om-ali': {
    pairing: 'turkish-coffee',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'حليب الجاموس',
          en: 'Buffalo milk',
          fr: 'Lait de bufflonne',
          de: 'Büffelmilch',
          it: 'Latte di bufala',
          ru: 'Буйволиное молоко',
          tr: 'Manda sütü'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'فستق ولوز',
          en: 'Pistachio & almond',
          fr: 'Pistache & amande',
          de: 'Pistazie & Mandel',
          it: 'Pistacchio & mandorla',
          ru: 'Фисташка и миндаль',
          tr: 'Antep fıstığı & badem'
        }
      }
    ]
  },
  basbousa: {
    pairing: 'mint-tea',
    origins: [
      {
        region: 'fayoum',
        ingredient: {
          ar: 'سميد الفيوم',
          en: 'Fayoum semolina',
          fr: 'Semoule du Fayoum',
          de: 'Fayoum-Grieß',
          it: 'Semolino del Fayoum',
          ru: 'Манка Фаюма',
          tr: 'Fayoum irmiği'
        }
      },
      {
        region: 'fayoum',
        ingredient: {
          ar: 'ماء ورد فيومي',
          en: 'Fayoum rose water',
          fr: 'Eau de rose du Fayoum',
          de: 'Fayoum-Rosenwasser',
          it: 'Acqua di rose del Fayoum',
          ru: 'Розовая вода Фаюма',
          tr: 'Fayoum gül suyu'
        }
      }
    ]
  },
  mahalabia: {
    pairing: 'turkish-coffee',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'حليب طازج',
          en: 'Fresh milk',
          fr: 'Lait frais',
          de: 'Frische Milch',
          it: 'Latte fresco',
          ru: 'Свежее молоко',
          tr: 'Taze süt'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'فستق حلبي',
          en: 'Aleppo pistachio',
          fr: 'Pistache d’Alep',
          de: 'Aleppo-Pistazie',
          it: 'Pistacchio di Aleppo',
          ru: 'Алеппская фисташка',
          tr: 'Halep fıstığı'
        }
      }
    ]
  },
  karkadeh: {
    pairing: 'basbousa',
    origins: [
      {
        region: 'aswan',
        ingredient: {
          ar: 'زهور أسوان',
          en: 'Aswan hibiscus',
          fr: 'Hibiscus d’Assouan',
          de: 'Assuan-Hibiskus',
          it: 'Ibisco di Assuan',
          ru: 'Гибискус Асуана',
          tr: 'Asvan hibiskusu'
        }
      }
    ]
  },
  sahlab: {
    pairing: 'mahalabia',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'حليب الجاموس',
          en: 'Buffalo milk',
          fr: 'Lait de bufflonne',
          de: 'Büffelmilch',
          it: 'Latte di bufala',
          ru: 'Буйволиное молоко',
          tr: 'Manda sütü'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'قرفة',
          en: 'Cinnamon',
          fr: 'Cannelle',
          de: 'Zimt',
          it: 'Cannella',
          ru: 'Корица',
          tr: 'Tarçın'
        }
      }
    ]
  },
  'mint-tea': {
    pairing: 'basbousa',
    origins: [
      {
        region: 'delta',
        ingredient: {
          ar: 'نعناع بلدي',
          en: 'Baladi mint',
          fr: 'Menthe baladi',
          de: 'Baladi-Minze',
          it: 'Menta baladi',
          ru: 'Балади-мята',
          tr: 'Baladi nane'
        }
      }
    ]
  },
  'turkish-coffee': {
    pairing: 'om-ali',
    origins: [
      {
        region: 'aswan',
        ingredient: {
          ar: 'بن محمص',
          en: 'Roasted beans',
          fr: 'Grains torréfiés',
          de: 'Geröstete Bohnen',
          it: 'Chicchi tostati',
          ru: 'Обжаренные зёрна',
          tr: 'Kavrulmuş çekirdek'
        }
      },
      {
        region: 'sinai',
        ingredient: {
          ar: 'هيل',
          en: 'Cardamom',
          fr: 'Cardamome',
          de: 'Kardamom',
          it: 'Cardamomo',
          ru: 'Кардамон',
          tr: 'Kakule'
        }
      }
    ]
  }
};

export function getRelation(id: string): Relation | undefined {
  return RELATIONS[id];
}

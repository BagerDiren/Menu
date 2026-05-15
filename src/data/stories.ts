import type { Locale } from '@/i18n';
import type { Localized } from './menu';

export interface OriginStory {
  era: Localized;
  title: Localized;
  body: Localized;
}

export const STORIES: Record<string, OriginStory> = {
  koshary: {
    era: {
      ar: 'القرن التاسع عشر — قناة السويس',
      en: '19th Century — Suez Canal Era',
      fr: 'XIXᵉ siècle — Canal de Suez',
      de: '19. Jahrhundert — Suezkanal-Ära',
      it: 'XIX secolo — Canale di Suez',
      ru: 'XIX век — Эпоха Суэцкого канала',
      tr: '19. yüzyıl — Süveyş Kanalı Çağı'
    },
    title: {
      ar: 'مولد الطبق الوطني',
      en: 'Birth of the National Dish',
      fr: 'Naissance du plat national',
      de: 'Geburt des Nationalgerichts',
      it: 'Nascita del piatto nazionale',
      ru: 'Рождение национального блюда',
      tr: 'Milli Yemeğin Doğuşu'
    },
    body: {
      ar: 'وُلد الكشري في القاهرة في القرن التاسع عشر عندما التقى العمال الهنود والإيطاليون والمصريون في ورش بناء قناة السويس. مزجوا الأرز الهندي والمكرونة الإيطالية والعدس المصري في طبق واحد. سرعان ما تحوّل من طعام عمال إلى رمز وطني يُباع في كل ركن من القاهرة، يجمع المصريين على مائدة واحدة.',
      en: 'Koshary was born in 19th-century Cairo when Indian, Italian and Egyptian workers met at the Suez Canal construction sites. They folded Indian rice, Italian macaroni and Egyptian lentils into a single dish. What began as humble worker food became a national symbol, sold on every Cairo corner, uniting Egyptians around one table.',
      fr: 'Le koshary est né au Caire au XIXᵉ siècle lorsque les ouvriers indiens, italiens et égyptiens se sont croisés sur les chantiers du canal de Suez. Ils ont marié le riz indien, les pâtes italiennes et les lentilles égyptiennes en un seul plat. Devenu emblème national, il se vend à chaque coin du Caire, unissant les Égyptiens autour d’une même table.',
      de: 'Koshary entstand im Kairo des 19. Jahrhunderts, als indische, italienische und ägyptische Arbeiter auf den Baustellen des Suezkanals zusammentrafen. Sie vereinten indischen Reis, italienische Makkaroni und ägyptische Linsen in einem Gericht. Aus Arbeiterspeise wurde ein Nationalsymbol — an jeder Ecke Kairos verkauft, vereint es alle Ägypter an einem Tisch.',
      it: 'Il koshary nacque nel Cairo del XIX secolo, quando operai indiani, italiani ed egiziani si incontrarono nei cantieri del Canale di Suez. Unirono riso indiano, maccheroni italiani e lenticchie egiziane in un solo piatto. Da cibo da cantiere divenne simbolo nazionale, venduto a ogni angolo del Cairo, unendo gli egiziani a un’unica tavola.',
      ru: 'Кошари родился в Каире XIX века, когда индийские, итальянские и египетские рабочие встретились на стройках Суэцкого канала. Они соединили индийский рис, итальянские макароны и египетскую чечевицу в одном блюде. Из рабочей еды оно стало национальным символом, продаваемым на каждом углу Каира.',
      tr: 'Koşari, 19. yüzyıl Kahire’sinde Hint, İtalyan ve Mısırlı işçilerin Süveyş Kanalı şantiyelerinde buluştuğu yıllarda doğdu. Hint pirincini, İtalyan makarnasını ve Mısır mercimeğini tek bir tabakta birleştirdiler. İşçi yemeği olarak başlayan bu lezzet, Kahire’nin her köşesinde satılan bir milli sembole dönüştü.'
    }
  },
  molokhia: {
    era: {
      ar: 'العصر الفرعوني — وادي النيل',
      en: 'Pharaonic Era — Nile Valley',
      fr: 'Époque pharaonique — Vallée du Nil',
      de: 'Pharaonische Ära — Niltal',
      it: 'Epoca faraonica — Valle del Nilo',
      ru: 'Эпоха фараонов — Долина Нила',
      tr: 'Firavunlar Çağı — Nil Vadisi'
    },
    title: {
      ar: 'خضرة الملوك',
      en: 'The King’s Greens',
      fr: 'Les verts des rois',
      de: 'Das Gemüse der Könige',
      it: 'Le verdure dei re',
      ru: 'Зелень царей',
      tr: 'Kralların Yeşili'
    },
    body: {
      ar: 'كانت الملوخية مفضّلة الفراعنة منذ آلاف السنين. حظرها الخليفة الحاكم بأمر الله في القرن الحادي عشر، لكن المصريين تمسكوا بها سراً. اسمها مشتق من «الملوكية» — طعام الملوك. اليوم لا تكتمل وليمة مصرية بدون رائحة الثوم المقلي تطفو فوق وعاء الملوخية.',
      en: 'Molokhia was a favourite of the Pharaohs for thousands of years. The Fatimid Caliph Al-Hakim banned it in the 11th century — yet Egyptians grew it in secret. Its name comes from "muluki", food of kings. Today no Egyptian feast is complete without the perfume of garlic-fried coriander floating over a bowl of molokhia.',
      fr: 'La molokhia était la favorite des pharaons depuis des millénaires. Le calife Al-Hakim l’interdit au XIᵉ siècle — les Égyptiens la cultivèrent en secret. Son nom vient de « muluki », nourriture des rois. Aujourd’hui, aucune fête égyptienne n’est complète sans le parfum de l’ail frit flottant au-dessus d’un bol de molokhia.',
      de: 'Molokhia war jahrtausendelang die Lieblingsspeise der Pharaonen. Der fatimidische Kalif Al-Hakim verbot sie im 11. Jahrhundert — die Ägypter bauten sie heimlich an. Der Name stammt von „muluki“, Speise der Könige. Heute ist kein ägyptisches Fest vollständig ohne den Duft von Knoblauch über einer Schale Molokhia.',
      it: 'La molokhia fu per millenni la prediletta dei faraoni. Il califfo fatimide Al-Hakim la proibì nell’XI secolo — gli egiziani la coltivarono in segreto. Il nome viene da «muluki», cibo dei re. Oggi nessuna festa egiziana è completa senza il profumo dell’aglio sopra una ciotola di molokhia.',
      ru: 'Молохия была любимым блюдом фараонов тысячи лет. Халиф Аль-Хаким запретил её в XI веке — но египтяне выращивали тайно. Имя восходит к «мулуки», еда царей. Сегодня ни один египетский пир не обходится без аромата чесночной кинзы над тарелкой молохии.',
      tr: 'Molohiya, binlerce yıldır firavunların gözdesiydi. Fatımi halifesi El-Hâkim 11. yüzyılda yasakladı — Mısırlılar gizlice yetiştirdi. Adı, "muluki" yani "kralların yemeği" sözcüğünden gelir. Bugün hiçbir Mısır ziyafeti, üzerinde sarımsaklı kişniş kokusu yükselen molohiya kâsesi olmadan tamamlanmaz.'
    }
  },
  'om-ali': {
    era: {
      ar: 'القرن الثالث عشر — العصر المملوكي',
      en: '13th Century — Mamluk Era',
      fr: 'XIIIᵉ siècle — Époque mamelouke',
      de: '13. Jahrhundert — Mamluken-Zeit',
      it: 'XIII secolo — Era mamelucca',
      ru: 'XIII век — Эпоха мамлюков',
      tr: '13. yüzyıl — Memluk Çağı'
    },
    title: {
      ar: 'حلوى الانتصار',
      en: 'The Dessert of Triumph',
      fr: 'Le dessert du triomphe',
      de: 'Dessert des Triumphs',
      it: 'Il dolce del trionfo',
      ru: 'Десерт триумфа',
      tr: 'Zaferin Tatlısı'
    },
    body: {
      ar: 'تروى أسطورة أم علي أنها كانت زوجة السلطان عز الدين أيبك في مصر المملوكية. بعد انتصار سياسي، أمرت كل بيت في الإمبراطورية بصنع حلوى من العجين والحليب والمكسرات وتوزيعها على الناس احتفالاً. سُمّيت الحلوى باسمها — ولم تزل تُحتفى بها بعد ثمانية قرون.',
      en: 'Legend says Om Ali was the wife of Sultan Izz al-Din Aybak in Mamluk Egypt. After a political triumph she ordered every household in the empire to bake a dessert of pastry, milk and nuts and distribute it to the people in celebration. The dessert took her name — and is still celebrated eight centuries later.',
      fr: 'La légende dit qu’Om Ali fut l’épouse du sultan Izz al-Din Aybak dans l’Égypte mamelouke. Après un triomphe politique, elle ordonna à chaque foyer de l’empire de préparer un dessert de pâte, lait et fruits secs, et de le distribuer en célébration. Le dessert porte son nom — et est toujours célébré huit siècles plus tard.',
      de: 'Der Legende nach war Om Ali die Frau Sultans Izz al-Din Aybak im mamlukischen Ägypten. Nach einem politischen Triumph befahl sie jedem Haushalt des Reiches, ein Dessert aus Teig, Milch und Nüssen zu backen und an das Volk zu verteilen. Das Dessert trägt ihren Namen — und wird acht Jahrhunderte später noch gefeiert.',
      it: 'La leggenda narra che Om Ali fosse moglie del sultano Izz al-Din Aybak nell’Egitto mamelucco. Dopo un trionfo politico, ordinò a ogni famiglia dell’impero di cuocere un dolce di pasta, latte e frutta secca e distribuirlo al popolo. Il dolce porta il suo nome — celebrato da otto secoli.',
      ru: 'По легенде, Ом Али была женой султана Изз ад-Дина Айбака в мамлюкском Египте. После политического триумфа она повелела каждому дому испечь десерт из теста, молока и орехов и раздать народу в честь победы. Десерт получил её имя — и празднуется уже восемь веков.',
      tr: 'Efsaneye göre Om Ali, Memluk Mısır’ında Sultan İzz ed-Din Aybak’ın eşiydi. Bir siyasi zaferin ardından imparatorluğun her hanesine hamur, süt ve fıstıkla tatlı yapıp halka dağıtmasını emretti. Tatlı onun adını aldı — sekiz asırdır hâlâ kutlanıyor.'
    }
  },
  'hamam-mahshi': {
    era: {
      ar: 'منذ ٤٠٠٠ عام — مصر القديمة',
      en: '4000 Years Ago — Ancient Egypt',
      fr: 'Il y a 4000 ans — Égypte ancienne',
      de: 'Vor 4000 Jahren — Altes Ägypten',
      it: '4000 anni fa — Antico Egitto',
      ru: '4000 лет назад — Древний Египет',
      tr: '4000 yıl önce — Antik Mısır'
    },
    title: {
      ar: 'طبق الملوك في النقوش',
      en: 'A Dish Carved in Hieroglyphs',
      fr: 'Un plat gravé dans les hiéroglyphes',
      de: 'Ein Gericht in Hieroglyphen',
      it: 'Un piatto inciso nei geroglifici',
      ru: 'Блюдо в иероглифах',
      tr: 'Hiyerogliflere Kazınmış Yemek'
    },
    body: {
      ar: 'صوّر المصريون القدماء أبراج الحمام على جدران معابدهم منذ ٤٠٠٠ عام. كان الحمام طعام الفراعنة وعلامة الكرم لدى ضيوفهم. لا تزال أبراج الحمام الطينية تنتشر في قرى الدلتا، تماماً كما تظهر في نقوش الكرنك — ولا يزال هذا الطبق رمزاً للاحتفاء والترحيب.',
      en: 'The ancient Egyptians carved dovecote towers onto their temple walls 4000 years ago. Pigeon was the meat of Pharaohs and the mark of hospitality to honoured guests. Mud dovecotes still rise across the Delta, just as they appear in the carvings at Karnak — and this dish remains a symbol of welcome.',
      fr: 'Les anciens Égyptiens gravaient des colombiers sur les murs de leurs temples il y a 4000 ans. Le pigeon était la viande des pharaons et le signe d’hospitalité envers les invités d’honneur. Des colombiers de terre s’élèvent encore dans le Delta, comme dans les gravures de Karnak.',
      de: 'Die alten Ägypter ritzten Taubentürme vor 4000 Jahren in ihre Tempelwände. Tauben waren das Fleisch der Pharaonen und Zeichen der Gastfreundschaft für Ehrengäste. Im Delta erheben sich noch heute Taubentürme aus Lehm — genau wie in den Reliefs von Karnak.',
      it: 'Gli antichi egizi incisero le colombaie sui muri dei templi 4000 anni fa. Il piccione era la carne dei faraoni e il segno d’ospitalità per gli ospiti d’onore. Le colombaie di fango si ergono ancora nel Delta, esattamente come nei rilievi di Karnak.',
      ru: 'Древние египтяне высекали голубятни на стенах своих храмов 4000 лет назад. Голубь был мясом фараонов и знаком гостеприимства. Глиняные голубятни до сих пор поднимаются над Дельтой — точь-в-точь как в рельефах Карнака.',
      tr: 'Antik Mısırlılar 4000 yıl önce tapınak duvarlarına güvercin kuleleri kazıdı. Güvercin, firavunların eti ve onurlu konuğa misafirperverlik nişanesiydi. Delta köylerinde çamur güvercinlikleri hâlâ yükselir — tıpkı Karnak kabartmalarındaki gibi.'
    }
  },
  'mixed-grill': {
    era: {
      ar: 'العصر العباسي — القرن العاشر',
      en: 'Abbasid Era — 10th Century',
      fr: 'Époque abbasside — Xᵉ siècle',
      de: 'Abbasiden-Ära — 10. Jahrhundert',
      it: 'Era abbaside — X secolo',
      ru: 'Эпоха Аббасидов — X век',
      tr: 'Abbasi Çağı — 10. yüzyıl'
    },
    title: {
      ar: 'مائدة الخلفاء',
      en: 'The Caliphs’ Table',
      fr: 'La table des califes',
      de: 'Die Tafel der Kalifen',
      it: 'La tavola dei califfi',
      ru: 'Стол халифов',
      tr: 'Halifelerin Sofrası'
    },
    body: {
      ar: 'أتقن طهاة بغداد فن الشواء على الفحم في القرن العاشر، ونقلوا الفن إلى مصر مع الخلافة العباسية. كانت السيخ تُغمس في مزيج البهارات قبل الشواء — وصفة مدوّنة في «كتاب الطبيخ» للبغدادي عام ١٢٢٦. منذ ذلك الحين، تظل المشاوي رمز الترحيب الكبير في كل بيت مصري.',
      en: 'Baghdad’s chefs perfected charcoal grilling in the 10th century and carried the art to Egypt under Abbasid rule. Skewers were dipped in spice blends before grilling — a recipe written down in al-Baghdadi’s "Kitab al-Tabikh" in 1226. Since then, grilled meats have been the mark of great welcome in every Egyptian home.',
      fr: 'Les chefs de Bagdad perfectionnèrent les grillades au charbon au Xᵉ siècle et portèrent cet art en Égypte. Les brochettes étaient trempées dans des mélanges d’épices — recette écrite dans le « Kitab al-Tabikh » d’al-Baghdadi en 1226. Depuis, les grillades sont le signe du grand accueil.',
      de: 'Die Köche Bagdads perfektionierten im 10. Jahrhundert das Holzkohlegrillen und brachten die Kunst unter den Abbasiden nach Ägypten. Die Spieße wurden vor dem Grillen in Gewürzmischungen getaucht — niedergeschrieben im „Kitab al-Tabikh“ al-Baghdadis 1226. Seither sind Grillgerichte das Zeichen großer Gastfreundschaft.',
      it: 'I cuochi di Baghdad perfezionarono la griglia al carbone nel X secolo e portarono l’arte in Egitto. Gli spiedini venivano immersi in miscele di spezie — ricetta scritta nel «Kitab al-Tabikh» di al-Baghdadi nel 1226. Da allora, la griglia è segno di grande accoglienza.',
      ru: 'Повара Багдада довели до совершенства гриль на углях в X веке и принесли это искусство в Египет. Шампуры обмакивали в смеси специй — рецепт записан в «Китаб ат-Табих» аль-Багдади 1226 года. С тех пор гриль — знак большого гостеприимства.',
      tr: 'Bağdat şefleri 10. yüzyılda kömür ızgaranın inceliklerini geliştirdi ve bu sanatı Abbasi döneminde Mısır’a taşıdı. Şişler ızgaradan önce baharat karışımına batırılırdı — al-Bağdadi’nin 1226’da yazdığı "Kitâbü’t-Tabîh"’te kayıtlıdır. O günden bugüne ızgara, evlerde büyük misafirperverliğin nişanesi.'
    }
  },
  fattah: {
    era: {
      ar: 'منذ ٧٠٠ سنة — العصر الفاطمي',
      en: '700 Years Ago — Fatimid Era',
      fr: 'Il y a 700 ans — Époque fatimide',
      de: 'Vor 700 Jahren — Fatimiden-Ära',
      it: '700 anni fa — Era fatimide',
      ru: '700 лет назад — Эпоха Фатимидов',
      tr: '700 yıl önce — Fatımi Çağı'
    },
    title: {
      ar: 'طبق الأعياد الكبرى',
      en: 'The Dish of Great Feasts',
      fr: 'Le plat des grandes fêtes',
      de: 'Speise der großen Feste',
      it: 'Il piatto delle grandi feste',
      ru: 'Блюдо великих пиров',
      tr: 'Büyük Bayram Yemeği'
    },
    body: {
      ar: 'الفتة هي طبق المناسبات الكبرى في مصر منذ العصر الفاطمي — يُقدّم في عيد الأضحى وعند مولد طفل وفي العودة من الحج. اسمها من «فتّ» أي تفتيت الخبز. كل طبقة لها معنى: الخبز للوفرة، والأرز للبركة، واللحم للكرم.',
      en: 'Fattah is the dish of great occasions in Egypt — Eid al-Adha, the birth of a child, the return from pilgrimage. Its name comes from "fat", to break bread. Each layer carries meaning: bread for abundance, rice for blessing, meat for generosity. A plate built like a monument.',
      fr: 'Le fattah est le plat des grandes occasions en Égypte — Aïd al-Adha, naissance d’un enfant, retour du pèlerinage. Son nom vient de « fat », rompre le pain. Chaque couche a un sens : pain pour l’abondance, riz pour la bénédiction, viande pour la générosité.',
      de: 'Fattah ist das Gericht der großen Anlässe in Ägypten — Eid al-Adha, Geburt eines Kindes, Rückkehr von der Pilgerfahrt. Der Name kommt von „fat“, Brot brechen. Jede Schicht trägt Bedeutung: Brot für Fülle, Reis für Segen, Fleisch für Großzügigkeit.',
      it: 'Il fattah è il piatto delle grandi occasioni in Egitto — Eid al-Adha, nascita di un figlio, ritorno dal pellegrinaggio. Il nome viene da «fat», spezzare il pane. Ogni strato ha un significato: pane per l’abbondanza, riso per la benedizione, carne per la generosità.',
      ru: 'Фатта — блюдо больших событий в Египте: Курбан-байрам, рождение ребёнка, возвращение из паломничества. Имя от «фат» — преломить хлеб. У каждого слоя смысл: хлеб — изобилие, рис — благословение, мясо — щедрость.',
      tr: 'Fatta, Mısır’da büyük günlerin yemeğidir — Kurban Bayramı, bir çocuğun doğumu, hacdan dönüş. Adı, "fat" yani ekmeği bölmek’ten gelir. Her katman bir anlam taşır: ekmek bereket, pilav rızk, et cömertlik. Anıt gibi inşa edilen bir tabak.'
    }
  },
  tameya: {
    era: {
      ar: 'مصر القبطية — قبل ٢٠٠٠ سنة',
      en: 'Coptic Egypt — 2000 Years Ago',
      fr: 'Égypte copte — il y a 2000 ans',
      de: 'Koptisches Ägypten — vor 2000 Jahren',
      it: 'Egitto copto — 2000 anni fa',
      ru: 'Коптский Египет — 2000 лет назад',
      tr: 'Kıpti Mısır — 2000 yıl önce'
    },
    title: {
      ar: 'بدائي الفلافل',
      en: 'The Original Falafel',
      fr: 'Le falafel originel',
      de: 'Der Ur-Falafel',
      it: 'Il falafel originale',
      ru: 'Прародитель фалафеля',
      tr: 'Falafel’in Atası'
    },
    body: {
      ar: 'الطعمية أقدم من الفلافل بقرون — اخترعها الأقباط في مصر صيام الفترات الطويلة. تُصنع من الفول الأخضر (لا الحمص) — وهذا سرّها الذي يميّزها عن نسخها في الشام. حتى اليوم، يفطر المصريون يوم الأحد على طعمية ساخنة في خبز بلدي.',
      en: 'Ta’meya is older than falafel by centuries — invented by Coptic Christians for long fasting seasons. It’s made from green fava beans (not chickpeas) — the secret that sets it apart from its Levantine cousin. Even today, Egyptians break Sunday fasts with hot ta’meya tucked into baladi bread.',
      fr: 'Le ta’meya est plus ancien que le falafel de plusieurs siècles — inventé par les chrétiens coptes pour les longs carêmes. Il est fait de fèves vertes (et non de pois chiches) — le secret qui le distingue de son cousin levantin. Aujourd’hui encore, les Égyptiens rompent le jeûne du dimanche avec un ta’meya chaud dans du pain baladi.',
      de: 'Ta’meya ist jahrhundertealt — älter als der Falafel — von koptischen Christen für lange Fastenzeiten erfunden. Hergestellt aus grünen Bohnen (keine Kichererbsen) — das Geheimnis, das ihn von seinem levantinischen Verwandten unterscheidet. Bis heute brechen Ägypter das Sonntagsfasten mit heißen Ta’meya in Baladi-Brot.',
      it: 'Il ta’meya è più antico del falafel di secoli — inventato dai cristiani copti per le lunghe quaresime. È fatto di fave verdi (non ceci) — il segreto che lo distingue dal cugino levantino. Ancora oggi gli egiziani interrompono il digiuno domenicale con ta’meya caldi nel pane baladi.',
      ru: 'Тамия древнее фалафеля на века — её изобрели коптские христиане для долгих постов. Готовится из зелёных бобов (а не из нута) — это секрет, отличающий её от ближневосточного собрата. И сегодня египтяне разговляются по воскресеньям горячей тамией в лепёшке балади.',
      tr: 'Ta’meya, falafelden asırlarca eskidir — uzun oruç dönemleri için Kıpti Hristiyanlar tarafından icat edildi. Nohuttan değil, yeşil bakladan yapılır — onu Levanten akrabasından ayıran sır budur. Bugün hâlâ Mısırlılar Pazar oruçlarını sıcak ta’meya ve baladi ekmeğiyle açar.'
    }
  }
};

export function getStory(dishId: string, locale: Locale): OriginStory | null {
  const s = STORIES[dishId];
  return s ?? null;
}

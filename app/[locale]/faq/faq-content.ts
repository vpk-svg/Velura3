export type FaqCategory = 'fillers' | 'botox' | 'obesitas';
export type FaqLocale = 'nl' | 'en';

export interface FaqEntry {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORY_ORDER: FaqCategory[] = ['fillers', 'botox', 'obesitas'];

const CATEGORY_LABELS: Record<FaqLocale, Record<FaqCategory, string>> = {
  nl: {
    fillers: 'Fillers',
    botox: 'Botox',
    obesitas: 'Obesitasbehandeling',
  },
  en: {
    fillers: 'Fillers',
    botox: 'Botox',
    obesitas: 'Obesity treatment',
  },
};

const NL: FaqEntry[] = [
  {
    id: 1,
    category: 'fillers',
    question: 'Wat zijn fillers precies?',
    answer:
      'Fillers zijn injecteerbare gels die worden gebruikt om volumeverlies in het gezicht te herstellen, rimpels te verzachten en gezichtscontouren te verbeteren. De meest gebruikte fillers zijn gebaseerd op hyaluronzuur, een lichaamseigen stof die van nature voorkomt in de huid en verantwoordelijk is voor hydratatie, elasticiteit en stevigheid. Naarmate we ouder worden, neemt de hoeveelheid hyaluronzuur af, wat leidt tot huidverslapping en rimpelvorming. Door fillers toe te passen, wordt dit volumeverlies tijdelijk aangevuld, waardoor de huid er gladder, voller en jeugdiger uitziet. Fillers kunnen zowel subtiel als meer uitgesproken worden toegepast, afhankelijk van de wensen van de cliënt.',
  },
  {
    id: 2,
    category: 'fillers',
    question: 'Waarvoor kunnen fillers gebruikt worden?',
    answer:
      'Fillers zijn veelzijdig en kunnen op verschillende gebieden in het gezicht worden toegepast. Veelvoorkomende behandelingen zijn het vergroten en definiëren van de lippen, het opvullen van diepe lijnen zoals de neus-lippenplooi en marionetlijnen, het herstellen van volume in de wangen en het verbeteren van de kaaklijn en kin. Daarnaast worden fillers gebruikt om donkere kringen onder de ogen te verminderen en om asymmetrie in het gezicht te corrigeren. Het doel is niet alleen om rimpels te verminderen, maar ook om de harmonie en balans in het gezicht te verbeteren, zodat het geheel er frisser en uitgeruster uitziet.',
  },
  {
    id: 3,
    category: 'fillers',
    question: 'Hoelang blijft het resultaat zichtbaar?',
    answer:
      'De duur van het effect van fillers varieert per persoon en per behandeld gebied. Gemiddeld blijft het resultaat tussen de 6 en 18 maanden zichtbaar. Factoren zoals leeftijd, huidtype, stofwisseling en levensstijl, bijvoorbeeld roken, zonblootstelling en sportintensiteit, spelen hierbij een rol. Gebieden die veel bewegen, zoals de lippen, breken fillers doorgaans sneller af dan gebieden zoals de wangen. Na verloop van tijd wordt de filler op natuurlijke wijze door het lichaam afgebroken, waardoor het effect geleidelijk afneemt.',
  },
  {
    id: 4,
    category: 'fillers',
    question: 'Zijn fillers veilig?',
    answer:
      'Fillers zijn over het algemeen veilig wanneer ze worden toegediend door een gekwalificeerde en ervaren arts. De meeste moderne fillers zijn uitgebreid getest en goedgekeurd voor cosmetisch gebruik. Omdat hyaluronzuur een lichaamseigen stof is, is de kans op allergische reacties zeer klein. Toch blijft het een medische behandeling, en er kunnen bijwerkingen of complicaties optreden. Daarom is het essentieel om altijd te kiezen voor een erkende kliniek met deskundige behandelaars die kennis hebben van de anatomie van het gezicht.',
  },
  {
    id: 5,
    category: 'fillers',
    question: 'Doet een fillerbehandeling pijn?',
    answer:
      'De meeste cliënten ervaren een fillerbehandeling als goed te verdragen. Voorafgaand aan de behandeling wordt vaak een verdovende crème aangebracht om het ongemak te minimaliseren. Daarnaast bevatten veel fillers lidocaïne, een lokaal verdovingsmiddel dat tijdens de injectie vrijkomt en het comfort verhoogt. Het gevoel tijdens de behandeling wordt vaak omschreven als kleine prikjes of een lichte druk. Gevoelige gebieden, zoals de lippen, kunnen iets gevoeliger zijn, maar de behandeling duurt relatief kort.',
  },
  {
    id: 6,
    category: 'fillers',
    question: 'Hoe snel zie je resultaat?',
    answer:
      'Een van de voordelen van fillers is dat het resultaat direct zichtbaar is na de behandeling. De behandelde gebieden lijken meteen voller en gladder. Wel kan er sprake zijn van tijdelijke zwelling of roodheid, waardoor het uiteindelijke resultaat pas na ongeveer 1 tot 2 weken optimaal zichtbaar is. In deze periode heeft de filler zich volledig in het weefsel geïntegreerd en is de huid tot rust gekomen.',
  },
  {
    id: 7,
    category: 'fillers',
    question: 'Zijn er bijwerkingen?',
    answer:
      'Na een fillerbehandeling kunnen milde en tijdelijke bijwerkingen optreden, zoals zwelling, roodheid, blauwe plekken en gevoeligheid op de injectieplaatsen. Deze reacties zijn normaal en verdwijnen meestal binnen enkele dagen. In zeldzame gevallen kunnen er complicaties optreden, zoals infecties of vaatafsluiting. Daarom is het belangrijk om de nazorginstructies goed op te volgen en bij twijfel altijd contact op te nemen met de behandelaar.',
  },
  {
    id: 8,
    category: 'fillers',
    question: 'Kan filler verwijderd worden?',
    answer:
      'Ja, een groot voordeel van hyaluronzuur-fillers is dat ze oplosbaar zijn. Met behulp van een enzym genaamd hyaluronidase kan de filler gedeeltelijk of volledig worden afgebroken. Dit biedt extra veiligheid, omdat eventuele ongewenste resultaten gecorrigeerd kunnen worden. De behandeling met hyaluronidase werkt meestal snel en effectief.',
  },
  {
    id: 9,
    category: 'fillers',
    question: 'Hoe vaak moet je fillers herhalen?',
    answer:
      'Om het resultaat te behouden, kiezen veel cliënten ervoor om fillers periodiek te herhalen. Dit gebeurt meestal elke 6 tot 12 maanden, afhankelijk van het behandelde gebied en hoe snel het lichaam de filler afbreekt. Bij regelmatige behandelingen kan het effect langer aanhouden en is vaak minder product nodig om het gewenste resultaat te behouden.',
  },
  {
    id: 10,
    category: 'fillers',
    question: 'Wat kost een fillerbehandeling?',
    answer:
      'De kosten van een fillerbehandeling zijn afhankelijk van verschillende factoren, zoals het behandelde gebied, de hoeveelheid gebruikte filler en de ervaring van de behandelaar. Meestal wordt er per milliliter gerekend. Tijdens een consult wordt een persoonlijk behandelplan opgesteld en krijg je een duidelijke prijsindicatie, zodat je precies weet waar je aan toe bent.',
  },
  {
    id: 11,
    category: 'fillers',
    question: 'Mag ik sporten na fillers?',
    answer:
      'Na een fillerbehandeling wordt geadviseerd om de eerste 24 tot 48 uur intensieve lichamelijke inspanning te vermijden. Sporten verhoogt de bloedcirculatie en kan daardoor zwelling en blauwe plekken verergeren. Rust helpt het lichaam om sneller te herstellen en zorgt voor een mooier eindresultaat.',
  },
  {
    id: 12,
    category: 'fillers',
    question: 'Kan ik direct werken na de behandeling?',
    answer:
      'In de meeste gevallen kun je direct na de behandeling je dagelijkse activiteiten hervatten, inclusief werk. Fillers hebben weinig tot geen hersteltijd. Wel is het mogelijk dat er lichte zwelling of roodheid zichtbaar is, wat afhankelijk van het behandelde gebied tijdelijk kan opvallen.',
  },
  {
    id: 13,
    category: 'fillers',
    question: 'Wat is het verschil tussen fillers en botox?',
    answer:
      'Fillers en botox hebben een verschillend werkingsmechanisme. Fillers worden gebruikt om volume toe te voegen en rimpels op te vullen, terwijl botox de spieren ontspant die verantwoordelijk zijn voor het ontstaan van dynamische rimpels. In veel gevallen worden beide behandelingen gecombineerd voor een optimaal en natuurlijk resultaat.',
  },
  {
    id: 14,
    category: 'fillers',
    question: 'Zijn fillers geschikt voor iedereen?',
    answer:
      'Hoewel fillers voor veel mensen geschikt zijn, zijn er uitzonderingen. Zwangere vrouwen, vrouwen die borstvoeding geven en mensen met bepaalde medische aandoeningen of infecties in het behandelgebied komen meestal niet in aanmerking. Tijdens een consult wordt altijd beoordeeld of de behandeling veilig en verantwoord is.',
  },
  {
    id: 15,
    category: 'fillers',
    question: 'Kunnen fillers er natuurlijk uitzien?',
    answer:
      'Ja, een natuurlijk resultaat is juist het uitgangspunt van een professionele behandeling. Door rekening te houden met de verhoudingen en anatomie van het gezicht, kan de behandelaar subtiele verbeteringen aanbrengen zonder dat het resultaat overdreven oogt. Het doel is om er fris en uitgerust uit te zien, niet om er anders uit te zien.',
  },
  {
    id: 16,
    category: 'fillers',
    question: 'Wat gebeurt er als je stopt met fillers?',
    answer:
      'Wanneer je stopt met fillers, wordt de stof geleidelijk door het lichaam afgebroken. Het gezicht keert terug naar de oorspronkelijke staat, zonder dat de huid verslechtert door de behandeling. In sommige gevallen lijkt de huid zelfs iets beter gehydrateerd door eerdere behandelingen.',
  },
  {
    id: 17,
    category: 'fillers',
    question: 'Kunnen fillers migreren?',
    answer:
      'In zeldzame gevallen kan filler zich verplaatsen naar een ander gebied. Dit gebeurt meestal bij onjuiste injectietechniek of overmatige hoeveelheid filler. Een ervaren behandelaar minimaliseert dit risico door nauwkeurig en volgens de juiste technieken te werken.',
  },
  {
    id: 18,
    category: 'fillers',
    question: 'Hoe bereid ik me voor op een behandeling?',
    answer:
      'Voor een optimaal resultaat wordt geadviseerd om enkele dagen voor de behandeling alcohol, bloedverdunners en bepaalde supplementen, zoals visolie, te vermijden. Dit vermindert de kans op blauwe plekken. Daarnaast is het belangrijk om zonder make-up naar de afspraak te komen.',
  },
  {
    id: 19,
    category: 'fillers',
    question: 'Hoe lang duurt een behandeling?',
    answer:
      'Een fillerbehandeling duurt gemiddeld tussen de 20 en 40 minuten, afhankelijk van het aantal gebieden dat behandeld wordt. Inclusief consult en voorbereiding kan de afspraak iets langer duren.',
  },
  {
    id: 20,
    category: 'fillers',
    question: 'Wanneer moet ik contact opnemen na de behandeling?',
    answer:
      'Hoewel bijwerkingen meestal mild zijn, is het belangrijk om contact op te nemen bij ernstige pijn, extreme zwelling, verkleuring van de huid of andere onverwachte klachten. Snelle actie kan complicaties voorkomen.',
  },
  {
    id: 21,
    category: 'fillers',
    question: 'Wat is het verschil tussen verschillende soorten fillers?',
    answer:
      'Er bestaan verschillende soorten fillers, waarvan hyaluronzuur-fillers het meest gebruikt worden vanwege hun veiligheid en tijdelijke werking. Binnen deze categorie zijn er ook verschillen in dikte en structuur. Dunnere fillers worden gebruikt voor fijne lijntjes of de lippen, terwijl stevigere fillers geschikt zijn voor contourverbetering zoals de kaaklijn of jukbeenderen. De keuze voor een filler hangt af van het behandeldoel, de huidconditie en de gewenste resultaten. Een ervaren arts selecteert altijd het juiste type filler voor een natuurlijk en veilig resultaat.',
  },
  {
    id: 22,
    category: 'fillers',
    question: 'Kan een fillerbehandeling gecombineerd worden met andere behandelingen?',
    answer:
      'Ja, fillers worden vaak gecombineerd met andere behandelingen zoals botox, huidverbeterende behandelingen of medische peelings. Door verschillende technieken te combineren kan een meer gebalanceerd en harmonieus resultaat bereikt worden. Bijvoorbeeld: botox ontspant spieren, terwijl fillers volume herstellen. Samen zorgen ze voor een complete verjonging van het gezicht.',
  },
  {
    id: 23,
    category: 'fillers',
    question: 'Wat is een liquid facelift?',
    answer:
      'Een liquid facelift is een niet-chirurgische behandeling waarbij fillers strategisch worden gebruikt om het gezicht te liften en te verjongen. In plaats van één specifiek gebied te behandelen, wordt gekeken naar het hele gezicht en hoe volumeverlies invloed heeft op de uitstraling. Door op meerdere punten subtiel volume toe te voegen, kan een natuurlijk liftend effect worden gecreëerd zonder operatie.',
  },
  {
    id: 24,
    category: 'fillers',
    question: 'Kan ik allergisch reageren op fillers?',
    answer:
      'Allergische reacties op hyaluronzuur-fillers zijn zeer zeldzaam, omdat het een lichaamseigen stof is. Toch kan het lichaam in uitzonderlijke gevallen reageren op een van de bestanddelen. Daarom is een intakegesprek belangrijk, waarin medische geschiedenis en eventuele allergieën worden besproken.',
  },
  {
    id: 25,
    category: 'fillers',
    question: 'Hoe beïnvloedt leeftijd het resultaat van fillers?',
    answer:
      'Leeftijd speelt een rol in hoe de huid reageert op fillers. Jongere huid heeft vaak meer elasticiteit, waardoor subtiele correcties al een groot effect hebben. Bij oudere huid kan er meer volumeverlies en huidverslapping zijn, waardoor een combinatie van behandelingen nodig kan zijn voor een optimaal resultaat.',
  },
  {
    id: 26,
    category: 'fillers',
    question: 'Wat zijn de risico’s van fillers op lange termijn?',
    answer:
      'Bij correct gebruik en professionele toepassing zijn de risico’s op lange termijn minimaal. Omdat hyaluronzuur-fillers afbreekbaar zijn, blijven ze niet permanent in het lichaam. Wel is het belangrijk om behandelingen niet te vaak of in te grote hoeveelheden te herhalen om een natuurlijk resultaat te behouden.',
  },
  {
    id: 27,
    category: 'fillers',
    question: 'Kan ik make-up dragen na een fillerbehandeling?',
    answer:
      'Het wordt aangeraden om de eerste 24 uur geen make-up te dragen op het behandelde gebied om infecties te voorkomen. Daarna kan make-up weer veilig worden gebruikt.',
  },
  {
    id: 28,
    category: 'fillers',
    question: 'Heeft zon invloed op fillers?',
    answer:
      'Directe blootstelling aan zon of hitte, zoals sauna’s, wordt de eerste dagen afgeraden, omdat dit zwelling kan verergeren. Op lange termijn heeft zon geen directe invloed op de filler zelf, maar wel op huidveroudering.',
  },
  {
    id: 29,
    category: 'fillers',
    question: 'Hoe weet ik hoeveel filler ik nodig heb?',
    answer:
      'Dit wordt bepaald tijdens een consult. De behandelaar kijkt naar je gezichtsanatomie, huidconditie en wensen. Soms is minder filler nodig dan verwacht om een mooi, natuurlijk resultaat te bereiken.',
  },
  {
    id: 30,
    category: 'fillers',
    question: 'Wat is het verschil tussen een subtiele en een volumineuze behandeling?',
    answer:
      'Een subtiele behandeling richt zich op kleine verbeteringen en behoud van natuurlijke uitstraling, terwijl een volumineuze behandeling meer nadruk legt op duidelijke veranderingen. De meeste moderne behandelingen focussen op subtiele verfijning.',
  },
  {
    id: 31,
    category: 'fillers',
    question: 'Waarom kiezen mensen voor fillers in plaats van plastische chirurgie?',
    answer:
      'Veel mensen kiezen voor fillers omdat het een niet-chirurgische behandeling is met directe resultaten en minimale hersteltijd. In tegenstelling tot plastische chirurgie is er geen narcose nodig en hoeven cliënten meestal geen langdurig herstelproces te doorlopen. Fillers bieden een subtiele en natuurlijke manier om volumeverlies te herstellen en gezichtscontouren te verbeteren zonder permanente veranderingen aan het gezicht aan te brengen. Daarnaast kunnen fillers geleidelijk worden opgebouwd, waardoor cliënten meer controle hebben over het eindresultaat.',
  },
  {
    id: 32,
    category: 'fillers',
    question: 'Veranderen fillers mijn gezichtsvorm?',
    answer:
      'Fillers kunnen de contouren van het gezicht verfijnen en verbeteren, maar een professionele behandeling is gericht op harmonie en balans, niet op het compleet veranderen van iemands uiterlijk. Door strategisch volume toe te voegen aan bijvoorbeeld de jukbeenderen, kaaklijn of kin kan het gezicht meer definitie krijgen. Het doel is meestal om de natuurlijke kenmerken van het gezicht te versterken en een frisse uitstraling te creëren.',
  },
  {
    id: 33,
    category: 'fillers',
    question: 'Waarom ziet de huid er jonger uit na fillers?',
    answer:
      'Naarmate we ouder worden, verliest de huid collageen, elastine en hyaluronzuur, waardoor volumeverlies en huidverslapping ontstaan. Fillers vullen dit volumeverlies aan en trekken vocht aan in de huid, waardoor de huid voller, gladder en beter gehydrateerd oogt. Hierdoor krijgt het gezicht vaak een jeugdiger en uitgeruster uiterlijk.',
  },
  {
    id: 34,
    category: 'fillers',
    question: 'Wat gebeurt er tijdens een eerste consult voor fillers?',
    answer:
      'Tijdens een eerste consult bespreekt de arts jouw wensen, verwachtingen en medische achtergrond. Daarnaast wordt de gezichtsanatomie zorgvuldig geanalyseerd om te bepalen welke behandeling het beste past bij jouw gezicht en doelen. De arts legt uit welke mogelijkheden er zijn, hoeveel filler mogelijk nodig is en welke resultaten realistisch zijn. Ook worden eventuele risico’s, bijwerkingen en nazorg uitgebreid besproken.',
  },
  {
    id: 35,
    category: 'fillers',
    question: 'Waarom is ervaring van de behandelaar zo belangrijk bij fillers?',
    answer:
      'Een fillerbehandeling vereist uitgebreide kennis van gezichtsanatomie, techniek en esthetische balans. Een ervaren behandelaar weet precies waar en hoeveel filler veilig geplaatst kan worden om een natuurlijk resultaat te bereiken. Daarnaast kan een deskundige arts complicaties voorkomen en tijdig herkennen. De kwaliteit van de behandeling hangt daarom sterk af van de ervaring en expertise van de behandelaar.',
  },
  {
    id: 36,
    category: 'fillers',
    question: 'Kunnen fillers helpen tegen vermoeide uitstraling?',
    answer:
      'Ja, fillers worden vaak gebruikt om een vermoeide uitstraling te verminderen. Vooral volumeverlies onder de ogen, ingevallen wangen en diepe lijnen kunnen ervoor zorgen dat iemand er moe uitziet. Door strategisch volume te herstellen krijgt het gezicht een frissere, zachtere en meer uitgeruste uitstraling.',
  },
  {
    id: 37,
    category: 'fillers',
    question: 'Waarom kiezen steeds meer mannen voor fillers?',
    answer:
      'Cosmetische behandelingen zijn allang niet meer alleen populair bij vrouwen. Veel mannen kiezen voor fillers om een vermoeide uitstraling te verminderen, de kaaklijn sterker te definiëren of volumeverlies tegen te gaan. Bij mannelijke behandelingen wordt vaak extra aandacht besteed aan het behouden van een krachtige en natuurlijke uitstraling.',
  },
  {
    id: 38,
    category: 'fillers',
    question: 'Kan afvallen invloed hebben op het resultaat van fillers?',
    answer:
      'Ja, aanzienlijk gewichtsverlies kan invloed hebben op het gezicht en het effect van fillers. Wanneer iemand afvalt, verliest het gezicht vaak ook volume, vooral in de wangen en slapen. Hierdoor kunnen bepaalde gebieden sneller weer volume verliezen en kan een aanvullende behandeling gewenst zijn.',
  },
  {
    id: 39,
    category: 'fillers',
    question: 'Wat betekent full face approach bij fillers?',
    answer:
      'Bij een full face approach kijkt de behandelaar niet alleen naar één specifiek gebied, maar naar het gezicht als geheel. Veroudering beïnvloedt namelijk meerdere structuren tegelijk, zoals volume, huidkwaliteit en contouren. Door het gezicht in balans te behandelen ontstaat vaak een natuurlijker en mooier resultaat dan wanneer slechts één zone wordt aangepakt.',
  },
  {
    id: 40,
    category: 'fillers',
    question: 'Kunnen fillers preventief gebruikt worden?',
    answer:
      'Ja, steeds meer mensen kiezen ervoor om fillers preventief te gebruiken om vroegtijdig volumeverlies tegen te gaan. Door subtiel volume te behouden kan de huid langer stevig en jeugdig ogen. Het doel van preventieve behandelingen is meestal behoud en vertraging van verouderingsprocessen.',
  },
  {
    id: 41,
    category: 'botox',
    question: 'Wat is botox precies?',
    answer:
      'Botox is een merknaam voor botuline toxine type A, een gezuiverd eiwit dat in zeer kleine en veilige hoeveelheden wordt gebruikt in de cosmetische en medische wereld. Het middel werkt door tijdelijk de signaaloverdracht tussen zenuwen en spieren te blokkeren. Hierdoor kunnen de behandelde spieren zich minder krachtig samentrekken, wat leidt tot het verzachten van rimpels. Botox wordt al tientallen jaren wereldwijd gebruikt en heeft een bewezen veiligheidsprofiel wanneer het correct wordt toegepast door een gekwalificeerde arts.',
  },
  {
    id: 42,
    category: 'botox',
    question: 'Hoe werkt botox in het gezicht?',
    answer:
      'In het gezicht ontstaan veel rimpels door herhaalde spierbewegingen, zoals fronsen, lachen of het optrekken van de wenkbrauwen. Botox ontspant deze specifieke spieren tijdelijk, waardoor de huid erboven gladder wordt. Het voorkomt dat de huid zich steeds opnieuw vouwt, wat op de lange termijn ook helpt om diepere rimpels te voorkomen. Het effect is subtiel en gericht, waardoor alleen de behandelde spieren minder actief zijn.',
  },
  {
    id: 43,
    category: 'botox',
    question: 'Voor welke rimpels is botox geschikt?',
    answer:
      'Botox is vooral effectief voor zogenaamde dynamische rimpels, die ontstaan door spieractiviteit. Denk hierbij aan fronslijnen tussen de wenkbrauwen, horizontale lijnen op het voorhoofd en kraaienpootjes rondom de ogen. Daarnaast kan botox ook gebruikt worden voor een subtiele wenkbrauwlift of om een gummy smile te verminderen.',
  },
  {
    id: 44,
    category: 'botox',
    question: 'Hoe lang blijft botox werken?',
    answer:
      'Het effect van botox houdt gemiddeld 3 tot 4 maanden aan. Bij sommige mensen kan dit iets korter of langer zijn, afhankelijk van factoren zoals stofwisseling, spierkracht en levensstijl. Na verloop van tijd herstelt de spieractiviteit zich geleidelijk en kunnen rimpels weer zichtbaar worden.',
  },
  {
    id: 45,
    category: 'botox',
    question: 'Wanneer zie je resultaat na een botoxbehandeling?',
    answer:
      'Botox werkt niet direct. De eerste effecten zijn meestal zichtbaar na 2 tot 5 dagen, terwijl het volledige resultaat zich ontwikkelt binnen 10 tot 14 dagen. In deze periode ontspannen de spieren zich geleidelijk, waardoor de huid gladder wordt.',
  },
  {
    id: 46,
    category: 'botox',
    question: 'Is botox veilig?',
    answer:
      'Ja, botox is veilig wanneer het wordt toegediend door een ervaren en gekwalificeerde arts. Het wordt al jarenlang gebruikt in zowel de cosmetische als medische wereld. De doseringen die worden gebruikt zijn zeer klein en gericht op specifieke spieren, waardoor het risico op bijwerkingen beperkt is.',
  },
  {
    id: 47,
    category: 'botox',
    question: 'Doet een botoxbehandeling pijn?',
    answer:
      'De behandeling bestaat uit kleine injecties met een fijne naald. De meeste mensen ervaren dit als licht ongemakkelijk, maar goed te verdragen. Verdoving is meestal niet nodig, omdat de behandeling snel verloopt en de prikjes minimaal zijn.',
  },
  {
    id: 48,
    category: 'botox',
    question: 'Krijg ik een bevroren gezicht?',
    answer:
      'Een bevroren of onnatuurlijk gezicht ontstaat alleen bij overdosering of onjuiste plaatsing. Bij een professionele behandeling wordt botox zo gedoseerd dat de natuurlijke mimiek behouden blijft. Het doel is een frisse en uitgeruste uitstraling, niet het volledig uitschakelen van gezichtsuitdrukkingen.',
  },
  {
    id: 49,
    category: 'botox',
    question: 'Kan botox preventief gebruikt worden?',
    answer:
      'Ja, botox kan preventief worden ingezet om te voorkomen dat dynamische rimpels zich ontwikkelen tot diepe, blijvende lijnen. Door de spieren vroegtijdig te ontspannen, wordt overmatige huidvouwvorming tegengegaan. Dit wordt steeds populairder bij jongere cliënten.',
  },
  {
    id: 50,
    category: 'botox',
    question: 'Wat zijn mogelijke bijwerkingen van botox?',
    answer:
      'De meest voorkomende bijwerkingen zijn mild en tijdelijk, zoals lichte zwelling, roodheid of kleine blauwe plekjes op de injectieplaats. Soms kan er hoofdpijn optreden. Ernstige bijwerkingen zijn zeldzaam en meestal het gevolg van onjuiste toepassing.',
  },
  {
    id: 51,
    category: 'botox',
    question: 'Mag ik sporten na een botoxbehandeling?',
    answer:
      'Het wordt aangeraden om de eerste 24 uur na de behandeling intensieve lichamelijke inspanning te vermijden. Sporten kan de doorbloeding verhogen, waardoor het risico bestaat dat de botox zich verspreidt naar omliggende spieren.',
  },
  {
    id: 52,
    category: 'botox',
    question: 'Mag ik liggen na de behandeling?',
    answer:
      'Na een botoxbehandeling is het belangrijk om gedurende de eerste 4 uur rechtop te blijven. Dit helpt om te voorkomen dat de botox zich verplaatst naar ongewenste gebieden.',
  },
  {
    id: 53,
    category: 'botox',
    question: 'Kan botox helpen tegen overmatig zweten?',
    answer:
      'Ja, botox wordt effectief ingezet bij hyperhidrose, overmatig zweten, bijvoorbeeld onder de oksels, in de handpalmen of op het voorhoofd. Het blokkeert de zenuwsignalen naar de zweetklieren, waardoor de zweetproductie aanzienlijk vermindert.',
  },
  {
    id: 54,
    category: 'botox',
    question: 'Hoe vaak moet ik botox herhalen?',
    answer:
      'Voor een consistent resultaat wordt botox meestal elke 3 tot 4 maanden herhaald. Bij regelmatig gebruik kunnen de spieren iets luier worden, waardoor het effect soms langer aanhoudt.',
  },
  {
    id: 55,
    category: 'botox',
    question: 'Wat gebeurt er als ik stop met botox?',
    answer:
      'Wanneer je stopt met botox, keert de spieractiviteit geleidelijk terug naar normaal. De rimpels komen terug zoals ze oorspronkelijk waren, maar niet erger. De huid wordt niet slechter door het stoppen met de behandeling.',
  },
  {
    id: 56,
    category: 'botox',
    question: 'Waarom kiezen zoveel mensen voor botox?',
    answer:
      'Botox is populair omdat het een snelle, effectieve en minimaal invasieve manier is om rimpels te verminderen. De behandeling duurt vaak slechts enkele minuten en heeft nauwelijks hersteltijd. Veel mensen waarderen vooral het subtiele effect waarbij ze er frisser en uitgeruster uitzien zonder drastische veranderingen.',
  },
  {
    id: 57,
    category: 'botox',
    question: 'Hoe zorgt botox voor een jongere uitstraling?',
    answer:
      'Dynamische rimpels ontstaan door jarenlange spierbewegingen. Botox ontspant deze spieren tijdelijk, waardoor de huid gladder wordt en het gezicht zachter oogt. Hierdoor kunnen mensen er minder vermoeid, streng of gespannen uitzien.',
  },
  {
    id: 58,
    category: 'botox',
    question: 'Kan botox helpen tegen hoofdpijn of migraine?',
    answer:
      'Ja, botox wordt ook medisch gebruikt bij chronische migraine. Het helpt door bepaalde spieren en zenuwsignalen te ontspannen die betrokken zijn bij spanningsopbouw en pijnsignalen. Veel mensen ervaren hierdoor minder migraineaanvallen of minder intense klachten.',
  },
  {
    id: 59,
    category: 'botox',
    question: 'Waarom is nazorg belangrijk na botox?',
    answer:
      'De eerste uren na een behandeling zijn belangrijk omdat de botox zich nog moet stabiliseren in de behandelde spieren. Door de nazorginstructies goed op te volgen, zoals niet wrijven, sporten of liggen, wordt de kans op verspreiding naar ongewenste spieren kleiner.',
  },
  {
    id: 60,
    category: 'botox',
    question: 'Kan botox helpen bij tandenknarsen?',
    answer:
      'Ja, botox wordt regelmatig gebruikt bij bruxisme, tandenknarsen. Door de kaakspieren tijdelijk te ontspannen vermindert de spanning in het kaakgebied. Dit kan klachten zoals hoofdpijn, kaakpijn en slijtage van tanden verminderen.',
  },
  {
    id: 61,
    category: 'botox',
    question: 'Wat gebeurt er als botox uitgewerkt raakt?',
    answer:
      'Wanneer botox is uitgewerkt, herstelt de spieractiviteit zich geleidelijk. De behandelde spieren gaan weer normaal bewegen en rimpels kunnen langzaam terugkeren. Dit gebeurt geleidelijk en niet plotseling.',
  },
  {
    id: 62,
    category: 'botox',
    question: 'Kan botox een preventieve werking hebben tegen diepe rimpels?',
    answer:
      'Ja, door de spieren tijdelijk minder actief te maken wordt voorkomen dat de huid voortdurend vouwt. Hierdoor kunnen diepe lijnen minder snel ontstaan of verergeren. Daarom kiezen sommige mensen op jongere leeftijd al voor preventieve behandelingen.',
  },
  {
    id: 63,
    category: 'botox',
    question: 'Waarom kiezen mensen voor subtiele botox?',
    answer:
      'Veel moderne behandelingen zijn gericht op een natuurlijk resultaat. Subtiele botox zorgt ervoor dat rimpels verzachten zonder dat het gezicht zijn natuurlijke expressie verliest. Mensen willen er vaak fris uitzien zonder dat direct zichtbaar is dat ze een behandeling hebben gehad.',
  },
  {
    id: 64,
    category: 'botox',
    question: 'Is botox geschikt voor elke leeftijd?',
    answer:
      'Botox wordt meestal toegepast vanaf volwassen leeftijd. Jongere cliënten kiezen vaak voor preventieve behandelingen, terwijl oudere cliënten botox gebruiken om bestaande rimpels te verzachten. De geschiktheid hangt af van huidconditie, spieractiviteit en persoonlijke wensen.',
  },
  {
    id: 65,
    category: 'botox',
    question: 'Waarom kiezen mensen ervoor om botox regelmatig te onderhouden?',
    answer:
      'Regelmatige behandelingen helpen om het resultaat consistent te houden en voorkomen dat spieren hun oude kracht volledig terugkrijgen. Hierdoor blijven rimpels vaak langer zacht en minder diep zichtbaar.',
  },
  {
    id: 66,
    category: 'obesitas',
    question: 'Wat is obesitas precies?',
    answer:
      'Obesitas is een chronische aandoening waarbij er sprake is van overmatige vetophoping in het lichaam, wat negatieve gevolgen heeft voor de gezondheid. Het wordt meestal vastgesteld aan de hand van de Body Mass Index, BMI. Obesitas verhoogt het risico op aandoeningen zoals diabetes type 2, hart- en vaatziekten, hoge bloeddruk en gewrichtsproblemen.',
  },
  {
    id: 67,
    category: 'obesitas',
    question: 'Wanneer kom ik in aanmerking voor een obesitasbehandeling?',
    answer:
      'Je komt doorgaans in aanmerking voor een behandeling bij een BMI van 30 of hoger, of bij een BMI vanaf 27 in combinatie met gezondheidsproblemen zoals diabetes of hoge bloeddruk. Tijdens een intakegesprek wordt beoordeeld of een behandeling geschikt en veilig is.',
  },
  {
    id: 68,
    category: 'obesitas',
    question: 'Wat houdt een obesitasbehandeling in?',
    answer:
      'Een obesitasbehandeling is een uitgebreid traject dat zich richt op duurzaam gewichtsverlies en een gezondere leefstijl. Het omvat vaak voedingsadvies, begeleiding bij gedragsverandering, bewegingsadvies en in sommige gevallen medicatie. Het doel is niet alleen afvallen, maar ook het verbeteren van de algehele gezondheid.',
  },
  {
    id: 69,
    category: 'obesitas',
    question: 'Is medicatie verplicht bij een obesitasbehandeling?',
    answer:
      'Nee, medicatie is niet verplicht. Het wordt alleen ingezet wanneer dit medisch verantwoord en zinvol is. Voor sommige cliënten kan leefstijlbegeleiding voldoende zijn, terwijl anderen baat hebben bij aanvullende ondersteuning in de vorm van medicatie.',
  },
  {
    id: 70,
    category: 'obesitas',
    question: 'Welke medicatie kan gebruikt worden?',
    answer:
      'Er bestaan verschillende medicijnen die kunnen helpen bij gewichtsverlies. Sommige middelen verminderen de eetlust, terwijl andere invloed hebben op de bloedsuikerspiegel of de opname van vetten. Deze medicatie wordt altijd voorgeschreven en begeleid door een arts.',
  },
  {
    id: 71,
    category: 'obesitas',
    question: 'Hoe snel kan ik afvallen?',
    answer:
      'Gezond en duurzaam gewichtsverlies ligt gemiddeld tussen de 0,5 en 1 kilo per week. Sneller afvallen is mogelijk, maar wordt vaak afgeraden omdat dit moeilijk vol te houden is en kan leiden tot gezondheidsproblemen of jojo-effecten.',
  },
  {
    id: 72,
    category: 'obesitas',
    question: 'Is het resultaat blijvend?',
    answer:
      'Het behouden van gewichtsverlies hangt sterk af van blijvende leefstijlveranderingen. Met de juiste begeleiding en motivatie kunnen resultaten langdurig behouden blijven. De focus ligt daarom op gedragsverandering en niet alleen op tijdelijk afvallen.',
  },
  {
    id: 73,
    category: 'obesitas',
    question: 'Krijg ik persoonlijke begeleiding?',
    answer:
      'Ja, een obesitasbehandeling is altijd maatwerk. Er wordt gekeken naar jouw medische achtergrond, leefstijl, eetpatroon en doelen. Op basis daarvan wordt een persoonlijk behandelplan opgesteld dat aansluit bij jouw situatie.',
  },
  {
    id: 74,
    category: 'obesitas',
    question: 'Moet ik mijn dieet aanpassen?',
    answer:
      'Ja, voeding speelt een cruciale rol in het behandeltraject. Dit betekent niet per se streng diëten, maar vooral het aanleren van gezonde, duurzame eetgewoonten die je op lange termijn kunt volhouden.',
  },
  {
    id: 75,
    category: 'obesitas',
    question: 'Is beweging verplicht tijdens de behandeling?',
    answer:
      'Beweging is een belangrijk onderdeel van een gezonde leefstijl en wordt sterk aangeraden. Dit hoeft niet intensief te zijn; ook dagelijkse activiteiten zoals wandelen kunnen al een groot verschil maken.',
  },
  {
    id: 76,
    category: 'obesitas',
    question: 'Zijn er bijwerkingen van medicatie?',
    answer:
      'Sommige mensen kunnen bijwerkingen ervaren, zoals misselijkheid, vermoeidheid of veranderingen in de stoelgang. Deze zijn meestal mild en tijdelijk. De arts zal dit goed monitoren en waar nodig de behandeling aanpassen.',
  },
  {
    id: 77,
    category: 'obesitas',
    question: 'Wordt een obesitasbehandeling vergoed?',
    answer:
      'Dit hangt af van je zorgverzekering en polis. Sommige trajecten worden gedeeltelijk of volledig vergoed, vooral wanneer er sprake is van medische noodzaak.',
  },
  {
    id: 78,
    category: 'obesitas',
    question: 'Kan ik stoppen wanneer ik wil?',
    answer:
      'Ja, je kunt op elk moment stoppen met de behandeling. Het is echter aan te raden om dit in overleg te doen, zodat je begeleiding krijgt bij het behouden van de behaalde resultaten.',
  },
  {
    id: 79,
    category: 'obesitas',
    question: 'Is een obesitasbehandeling veilig?',
    answer:
      'Ja, mits uitgevoerd onder medische begeleiding. Er wordt zorgvuldig gekeken naar je gezondheid en eventuele risico’s voordat een behandelplan wordt opgesteld.',
  },
  {
    id: 80,
    category: 'obesitas',
    question: 'Wat is het belangrijkste doel van de behandeling?',
    answer:
      'Het belangrijkste doel is niet alleen gewichtsverlies, maar het verbeteren van je algehele gezondheid en levenskwaliteit. Dit betekent het ontwikkelen van een duurzame, gezonde leefstijl die je op lange termijn kunt volhouden.',
  },
  {
    id: 81,
    category: 'obesitas',
    question: 'Waarom is obesitas meer dan alleen te veel eten?',
    answer:
      'Obesitas is een complexe chronische aandoening waarbij veel factoren een rol spelen, zoals genetica, hormonen, stress, slaap, medicatie en leefstijl. Het gaat dus niet alleen om wilskracht of voeding. Daarom is professionele begeleiding vaak belangrijk voor duurzaam resultaat.',
  },
  {
    id: 82,
    category: 'obesitas',
    question: 'Waarom is een persoonlijke aanpak belangrijk bij gewichtsverlies?',
    answer:
      'Ieder lichaam reageert anders op voeding, beweging en stress. Wat voor de één werkt, hoeft niet voor de ander effectief te zijn. Een persoonlijk behandelplan houdt rekening met medische achtergrond, leefstijl, eetgewoonten en doelen, waardoor de kans op succes groter wordt.',
  },
  {
    id: 83,
    category: 'obesitas',
    question: 'Hoe beïnvloedt emotioneel eten obesitas?',
    answer:
      'Veel mensen eten niet alleen uit honger, maar ook vanuit emoties zoals stress, verdriet of verveling. Dit kan leiden tot overeten en gewichtstoename. Daarom besteden veel behandeltrajecten ook aandacht aan gedrag, mentale gezondheid en bewustwording rondom voeding.',
  },
  {
    id: 84,
    category: 'obesitas',
    question: 'Waarom is duurzaam afvallen belangrijker dan snel afvallen?',
    answer:
      'Snel gewichtsverlies door extreme diëten is vaak moeilijk vol te houden en kan leiden tot spierverlies en het jojo-effect. Duurzaam afvallen richt zich op gezonde gewoonten die langdurig vol te houden zijn, zodat resultaten stabiel blijven.',
  },
  {
    id: 85,
    category: 'obesitas',
    question: 'Kan hormonale disbalans gewichtsverlies moeilijk maken?',
    answer:
      'Ja, hormonen spelen een belangrijke rol bij eetlust, stofwisseling en vetopslag. Problemen met bijvoorbeeld insuline, schildklierhormonen of stresshormonen kunnen het moeilijker maken om af te vallen.',
  },
  {
    id: 86,
    category: 'obesitas',
    question: 'Waarom is begeleiding tijdens een behandeling belangrijk?',
    answer:
      'Professionele begeleiding helpt niet alleen bij motivatie, maar ook bij het aanpassen van het behandelplan wanneer nodig. Regelmatige controles zorgen ervoor dat het traject veilig, effectief en afgestemd blijft op de persoonlijke situatie.',
  },
  {
    id: 87,
    category: 'obesitas',
    question: 'Hoe belangrijk is mentale gezondheid bij obesitas?',
    answer:
      'Mentale gezondheid speelt een grote rol bij eetgedrag, motivatie en leefstijl. Stress, angst en depressieve gevoelens kunnen invloed hebben op gewichtstoename en eetpatronen. Daarom is een holistische aanpak vaak effectiever.',
  },
  {
    id: 88,
    category: 'obesitas',
    question: 'Waarom lukt afvallen soms niet ondanks sporten en gezond eten?',
    answer:
      'Gewichtsverlies kan beïnvloed worden door factoren zoals hormonen, slaaptekort, medicatie, stress en stofwisseling. Daarom is het belangrijk om verder te kijken dan alleen voeding en beweging.',
  },
  {
    id: 89,
    category: 'obesitas',
    question: 'Wat zijn de gezondheidsvoordelen van gewichtsverlies?',
    answer:
      'Zelfs een klein gewichtsverlies kan al leiden tot grote gezondheidsvoordelen, zoals lagere bloeddruk, verbeterde bloedsuikerwaarden, minder gewrichtsklachten en meer energie in het dagelijks leven.',
  },
  {
    id: 90,
    category: 'obesitas',
    question: 'Waarom is leefstijlverandering essentieel bij obesitas?',
    answer:
      'Tijdelijke oplossingen leveren vaak tijdelijke resultaten op. Een blijvende leefstijlverandering helpt om nieuwe gezonde gewoonten op te bouwen, waardoor gewichtsverlies beter behouden kan blijven op lange termijn.',
  },
];

const EN: FaqEntry[] = [
  { id: 1, category: 'fillers', question: 'What exactly are fillers?', answer: 'Fillers are injectable gels used to restore lost facial volume, soften wrinkles and improve facial contours. The most commonly used fillers are based on hyaluronic acid, a substance naturally found in the body that helps keep the skin hydrated, elastic and firm. As we age, hyaluronic acid levels decrease, which can lead to skin laxity and wrinkle formation. Fillers temporarily replace this lost volume, making the skin appear smoother, fuller and more youthful. They can be used subtly or more noticeably, depending on the client’s wishes.' },
  { id: 2, category: 'fillers', question: 'What can fillers be used for?', answer: 'Fillers are versatile and can be used in different areas of the face. Common treatments include enhancing and defining the lips, softening deeper lines such as nasolabial folds and marionette lines, restoring cheek volume, and improving the jawline and chin. Fillers can also help reduce dark circles under the eyes and correct facial asymmetry. The goal is not only to reduce wrinkles, but also to improve harmony and balance in the face so that the overall appearance looks fresher and more rested.' },
  { id: 3, category: 'fillers', question: 'How long do the results last?', answer: 'The duration of filler results varies from person to person and depends on the treated area. On average, results remain visible for 6 to 18 months. Factors such as age, skin type, metabolism and lifestyle, including smoking, sun exposure and intense exercise, all play a role. Areas with a lot of movement, such as the lips, generally break down filler faster than areas such as the cheeks. Over time, the filler is naturally broken down by the body and the effect gradually fades.' },
  { id: 4, category: 'fillers', question: 'Are fillers safe?', answer: 'Fillers are generally safe when administered by a qualified and experienced doctor. Most modern fillers have been extensively tested and approved for cosmetic use. Because hyaluronic acid is a substance naturally found in the body, the risk of allergic reactions is very low. That said, it is still a medical treatment and side effects or complications can occur. That is why it is essential to choose a recognised clinic with skilled practitioners who understand facial anatomy.' },
  { id: 5, category: 'fillers', question: 'Does a filler treatment hurt?', answer: 'Most clients find filler treatment very tolerable. A numbing cream is often applied beforehand to minimise discomfort. In addition, many fillers contain lidocaine, a local anaesthetic that is released during injection and improves comfort. The sensation is usually described as small pinches or mild pressure. Sensitive areas such as the lips can feel slightly more tender, but the treatment itself is relatively short.' },
  { id: 6, category: 'fillers', question: 'How quickly will I see results?', answer: 'One of the advantages of fillers is that results are visible immediately after treatment. The treated areas look fuller and smoother right away. There can, however, be temporary swelling or redness, which means the final result is usually best assessed after about 1 to 2 weeks. By then, the filler has fully integrated into the tissue and the skin has settled.' },
  { id: 7, category: 'fillers', question: 'Are there any side effects?', answer: 'After filler treatment, mild and temporary side effects may occur, such as swelling, redness, bruising and tenderness at the injection sites. These reactions are normal and usually disappear within a few days. In rare cases, complications such as infection or vascular occlusion can occur. That is why it is important to follow the aftercare instructions carefully and to contact your practitioner if you have any concerns.' },
  { id: 8, category: 'fillers', question: 'Can filler be removed?', answer: 'Yes. One major advantage of hyaluronic acid fillers is that they are dissolvable. Using an enzyme called hyaluronidase, the filler can be partially or completely broken down. This adds an extra level of safety because unwanted results can be corrected. Treatment with hyaluronidase is usually quick and effective.' },
  { id: 9, category: 'fillers', question: 'How often do fillers need to be repeated?', answer: 'To maintain the result, many clients choose to repeat fillers periodically. This is usually done every 6 to 12 months, depending on the treated area and how quickly the body breaks down the filler. With regular treatments, the effect may last longer and less product is often needed to maintain the desired result.' },
  { id: 10, category: 'fillers', question: 'How much does a filler treatment cost?', answer: 'The cost of a filler treatment depends on several factors, such as the treated area, the amount of filler used and the practitioner’s experience. Pricing is usually calculated per millilitre. During a consultation, a personal treatment plan is made and you will receive a clear price indication so you know exactly what to expect.' },
  { id: 11, category: 'fillers', question: 'Can I exercise after fillers?', answer: 'After a filler treatment, it is recommended to avoid intensive physical exercise for the first 24 to 48 hours. Exercise increases blood circulation and can worsen swelling and bruising. Rest helps the body recover more quickly and supports a better final result.' },
  { id: 12, category: 'fillers', question: 'Can I go back to work straight after treatment?', answer: 'In most cases, you can resume your normal daily activities immediately after treatment, including work. Fillers involve little to no downtime. There may, however, be slight swelling or redness, which can be temporarily visible depending on the treated area.' },
  { id: 13, category: 'fillers', question: 'What is the difference between fillers and botox?', answer: 'Fillers and botox work in different ways. Fillers are used to add volume and fill lines, while botox relaxes the muscles responsible for dynamic wrinkles. In many cases, both treatments are combined for an optimal and natural-looking result.' },
  { id: 14, category: 'fillers', question: 'Are fillers suitable for everyone?', answer: 'Although fillers are suitable for many people, there are exceptions. Pregnant women, women who are breastfeeding, and people with certain medical conditions or infections in the treatment area are usually not eligible. During a consultation, it is always assessed whether treatment is safe and appropriate.' },
  { id: 15, category: 'fillers', question: 'Can fillers look natural?', answer: 'Yes. In fact, a natural result is the starting point of a professional treatment. By taking facial proportions and anatomy into account, the practitioner can make subtle improvements without the result looking overdone. The goal is to help you look fresh and rested, not different.' },
  { id: 16, category: 'fillers', question: 'What happens if I stop getting fillers?', answer: 'If you stop getting fillers, the substance is gradually broken down by the body. The face returns to its original state, without the skin becoming worse because of the treatment. In some cases, the skin may even appear slightly better hydrated because of previous treatments.' },
  { id: 17, category: 'fillers', question: 'Can fillers migrate?', answer: 'In rare cases, filler can move to another area. This usually happens because of incorrect injection technique or excessive amounts of filler. An experienced practitioner minimises this risk by working carefully and using the correct techniques.' },
  { id: 18, category: 'fillers', question: 'How should I prepare for treatment?', answer: 'For the best result, it is advised to avoid alcohol, blood thinners and certain supplements such as fish oil for several days before treatment. This reduces the chance of bruising. It is also important to come to the appointment without make-up.' },
  { id: 19, category: 'fillers', question: 'How long does treatment take?', answer: 'A filler treatment usually takes between 20 and 40 minutes, depending on how many areas are being treated. Including consultation and preparation, the appointment may take a little longer.' },
  { id: 20, category: 'fillers', question: 'When should I contact the clinic after treatment?', answer: 'Although side effects are usually mild, you should contact the clinic if you experience severe pain, extreme swelling, skin discolouration or any other unexpected symptoms. Quick action can help prevent complications.' },
  { id: 21, category: 'fillers', question: 'What is the difference between different types of fillers?', answer: 'There are several types of fillers, with hyaluronic acid fillers being the most commonly used because of their safety and temporary nature. Even within that category, there are differences in thickness and structure. Thinner fillers are used for fine lines or lips, while firmer fillers are better suited for contouring areas such as the jawline or cheekbones. The right filler depends on the treatment goal, skin condition and desired result. An experienced doctor always selects the most suitable filler for a natural and safe outcome.' },
  { id: 22, category: 'fillers', question: 'Can filler treatment be combined with other treatments?', answer: 'Yes. Fillers are often combined with other treatments such as botox, skin-improving treatments or medical peels. By combining techniques, it is possible to achieve a more balanced and harmonious result. For example, botox relaxes muscles while fillers restore volume. Together they can provide a more complete facial rejuvenation.' },
  { id: 23, category: 'fillers', question: 'What is a liquid facelift?', answer: 'A liquid facelift is a non-surgical treatment in which fillers are strategically used to lift and rejuvenate the face. Instead of focusing on one isolated area, the practitioner looks at the whole face and how volume loss affects overall appearance. By subtly restoring volume in multiple points, a natural lifting effect can be created without surgery.' },
  { id: 24, category: 'fillers', question: 'Can I have an allergic reaction to fillers?', answer: 'Allergic reactions to hyaluronic acid fillers are very rare because the substance naturally occurs in the body. In exceptional cases, however, the body may react to one of the ingredients. That is why an intake consultation is important, during which medical history and any allergies are discussed.' },
  { id: 25, category: 'fillers', question: 'How does age affect filler results?', answer: 'Age plays a role in how the skin responds to fillers. Younger skin often has more elasticity, so subtle corrections can already make a significant difference. Older skin may show more volume loss and laxity, which means a combination of treatments may be needed for the best result.' },
  { id: 26, category: 'fillers', question: 'What are the long-term risks of fillers?', answer: 'When used correctly and professionally, the long-term risks are minimal. Because hyaluronic acid fillers are biodegradable, they do not remain permanently in the body. It is, however, important not to repeat treatments too frequently or in excessive amounts if you want to maintain a natural result.' },
  { id: 27, category: 'fillers', question: 'Can I wear make-up after filler treatment?', answer: 'It is recommended not to wear make-up on the treated area for the first 24 hours to reduce the risk of infection. After that, make-up can be used safely again.' },
  { id: 28, category: 'fillers', question: 'Does sun exposure affect fillers?', answer: 'Direct exposure to the sun or heat, such as saunas, is best avoided during the first few days because it can worsen swelling. In the long term, sun does not directly affect the filler itself, but it does contribute to skin ageing.' },
  { id: 29, category: 'fillers', question: 'How do I know how much filler I need?', answer: 'This is determined during a consultation. The practitioner looks at your facial anatomy, skin condition and wishes. In many cases, less filler is needed than people expect to achieve a beautiful and natural result.' },
  { id: 30, category: 'fillers', question: 'What is the difference between a subtle and a volumising treatment?', answer: 'A subtle treatment focuses on small refinements and preserving a natural appearance, while a more volumising treatment creates more obvious change. Most modern treatments focus on subtle refinement.' },
  { id: 31, category: 'fillers', question: 'Why do people choose fillers instead of plastic surgery?', answer: 'Many people choose fillers because they are a non-surgical treatment with immediate results and minimal downtime. Unlike plastic surgery, there is no need for general anaesthesia and most clients do not have to go through a long recovery period. Fillers offer a subtle and natural way to restore volume loss and improve facial contours without making permanent changes to the face. They can also be built up gradually, giving clients more control over the final result.' },
  { id: 32, category: 'fillers', question: 'Do fillers change my face shape?', answer: 'Fillers can refine and improve facial contours, but a professional treatment is aimed at harmony and balance, not at completely changing someone’s appearance. By strategically adding volume to areas such as the cheekbones, jawline or chin, the face can gain more definition. The goal is usually to enhance natural features and create a fresher appearance.' },
  { id: 33, category: 'fillers', question: 'Why does the skin look younger after fillers?', answer: 'As we age, the skin loses collagen, elastin and hyaluronic acid, which leads to volume loss and laxity. Fillers replace this lost volume and attract moisture into the skin, making it look fuller, smoother and better hydrated. This often gives the face a younger and more rested appearance.' },
  { id: 34, category: 'fillers', question: 'What happens during a first filler consultation?', answer: 'During an initial consultation, the doctor discusses your wishes, expectations and medical background. Your facial anatomy is also carefully analysed to determine which treatment best suits your face and goals. The doctor explains the available options, how much filler may be needed and which results are realistic. Possible risks, side effects and aftercare are also discussed in detail.' },
  { id: 35, category: 'fillers', question: 'Why is the practitioner’s experience so important with fillers?', answer: 'Filler treatment requires extensive knowledge of facial anatomy, technique and aesthetic balance. An experienced practitioner knows exactly where and how much filler can be placed safely to achieve a natural result. A skilled doctor can also help prevent complications and recognise them early if they occur. The quality of the treatment depends greatly on the practitioner’s experience and expertise.' },
  { id: 36, category: 'fillers', question: 'Can fillers help with a tired appearance?', answer: 'Yes. Fillers are often used to soften a tired appearance. Volume loss under the eyes, hollow cheeks and deep lines can all make someone look fatigued. By strategically restoring volume, the face can appear fresher, softer and more rested.' },
  { id: 37, category: 'fillers', question: 'Why are more men choosing fillers?', answer: 'Cosmetic treatments are no longer popular only among women. Many men choose fillers to reduce a tired appearance, define the jawline more strongly or address volume loss. In male treatments, extra attention is often paid to preserving a strong and natural appearance.' },
  { id: 38, category: 'fillers', question: 'Can weight loss affect filler results?', answer: 'Yes. Significant weight loss can affect the face and the effect of fillers. When someone loses weight, the face often loses volume as well, especially in the cheeks and temples. As a result, certain areas may lose volume again more quickly and an additional treatment may be desirable.' },
  { id: 39, category: 'fillers', question: 'What does a full-face approach mean with fillers?', answer: 'With a full-face approach, the practitioner does not focus on just one specific area, but looks at the face as a whole. Ageing affects multiple structures at the same time, including volume, skin quality and contours. Treating the face in balance often produces a more natural and attractive result than correcting only one zone.' },
  { id: 40, category: 'fillers', question: 'Can fillers be used preventively?', answer: 'Yes. More and more people choose preventive fillers to address early volume loss before it becomes more visible. By subtly maintaining volume, the skin can stay firmer and more youthful-looking for longer. The goal of preventive treatment is usually preservation and slowing the visible ageing process.' },
  { id: 41, category: 'botox', question: 'What exactly is botox?', answer: 'Botox is a brand name for botulinum toxin type A, a purified protein that is used in very small and safe amounts in both cosmetic and medical settings. It works by temporarily blocking the signal transfer between nerves and muscles. This causes the treated muscles to contract less strongly, which softens wrinkles. Botox has been used worldwide for decades and has a well-established safety profile when applied correctly by a qualified doctor.' },
  { id: 42, category: 'botox', question: 'How does botox work in the face?', answer: 'Many facial wrinkles are caused by repeated muscle movements, such as frowning, smiling or raising the eyebrows. Botox temporarily relaxes these specific muscles, making the skin above them appear smoother. It also prevents the skin from folding repeatedly, which can help reduce the development of deeper wrinkles over time. The effect is subtle and targeted, meaning only the treated muscles become less active.' },
  { id: 43, category: 'botox', question: 'Which wrinkles is botox suitable for?', answer: 'Botox is especially effective for so-called dynamic wrinkles, which are caused by muscle activity. These include frown lines between the eyebrows, horizontal forehead lines and crow’s feet around the eyes. Botox can also be used for a subtle brow lift or to reduce a gummy smile.' },
  { id: 44, category: 'botox', question: 'How long does botox last?', answer: 'The effect of botox typically lasts around 3 to 4 months. In some people it may last a little shorter or longer, depending on factors such as metabolism, muscle strength and lifestyle. Over time, muscle activity gradually returns and the wrinkles may become visible again.' },
  { id: 45, category: 'botox', question: 'When will I see results after botox?', answer: 'Botox does not work immediately. The first effects are usually visible after 2 to 5 days, while the full result develops within 10 to 14 days. During this period, the muscles gradually relax and the skin appears smoother.' },
  { id: 46, category: 'botox', question: 'Is botox safe?', answer: 'Yes. Botox is safe when administered by an experienced and qualified doctor. It has been used for many years in both the cosmetic and medical fields. The doses used are very small and targeted to specific muscles, which keeps the risk of side effects limited.' },
  { id: 47, category: 'botox', question: 'Does botox treatment hurt?', answer: 'The treatment consists of tiny injections with a very fine needle. Most people experience this as mildly uncomfortable, but easy to tolerate. Numbing is usually not necessary because the treatment is quick and the injections are minimal.' },
  { id: 48, category: 'botox', question: 'Will I get a frozen face?', answer: 'A frozen or unnatural-looking face usually only occurs with overdosing or incorrect placement. In a professional treatment, botox is dosed in a way that preserves natural facial expression. The goal is to create a fresher and more rested appearance, not to eliminate facial movement completely.' },
  { id: 49, category: 'botox', question: 'Can botox be used preventively?', answer: 'Yes. Botox can be used preventively to help stop dynamic wrinkles from developing into deeper, permanent lines. By relaxing the muscles at an earlier stage, excessive folding of the skin is reduced. This is becoming increasingly popular with younger clients.' },
  { id: 50, category: 'botox', question: 'What are the possible side effects of botox?', answer: 'The most common side effects are mild and temporary, such as slight swelling, redness or small bruises at the injection site. Some people may also experience a headache. Serious side effects are rare and are usually associated with incorrect application.' },
  { id: 51, category: 'botox', question: 'Can I exercise after botox?', answer: 'It is recommended to avoid intensive physical exercise for the first 24 hours after treatment. Exercise can increase blood flow, which may increase the risk of the botox spreading to surrounding muscles.' },
  { id: 52, category: 'botox', question: 'Can I lie down after treatment?', answer: 'After botox treatment, it is important to remain upright for the first 4 hours. This helps reduce the risk of the botox moving to unintended areas.' },
  { id: 53, category: 'botox', question: 'Can botox help with excessive sweating?', answer: 'Yes. Botox is effectively used for hyperhidrosis, or excessive sweating, for example in the underarms, palms or forehead. It blocks the nerve signals to the sweat glands, which significantly reduces sweat production.' },
  { id: 54, category: 'botox', question: 'How often should botox be repeated?', answer: 'For a consistent result, botox is usually repeated every 3 to 4 months. With regular use, the muscles can become slightly less active over time, which sometimes allows the effect to last longer.' },
  { id: 55, category: 'botox', question: 'What happens if I stop getting botox?', answer: 'If you stop getting botox, muscle activity gradually returns to normal. The wrinkles come back as they originally were, but not worse. The skin does not become worse because you stop treatment.' },
  { id: 56, category: 'botox', question: 'Why do so many people choose botox?', answer: 'Botox is popular because it is a quick, effective and minimally invasive way to reduce wrinkles. The treatment often takes only a few minutes and involves very little downtime. Many people especially appreciate the subtle effect, making them look fresher and more rested without drastic changes.' },
  { id: 57, category: 'botox', question: 'How does botox create a younger appearance?', answer: 'Dynamic wrinkles develop through years of repeated muscle movement. Botox temporarily relaxes these muscles, making the skin smoother and the face look softer. As a result, people can appear less tired, less tense or less stern.' },
  { id: 58, category: 'botox', question: 'Can botox help with headaches or migraines?', answer: 'Yes. Botox is also used medically for chronic migraine. It works by relaxing certain muscles and nerve signals involved in tension build-up and pain signalling. Many people therefore experience fewer migraine attacks or less intense symptoms.' },
  { id: 59, category: 'botox', question: 'Why is aftercare important after botox?', answer: 'The first hours after treatment are important because the botox still needs to settle into the treated muscles. Following the aftercare instructions carefully, such as not rubbing the area, exercising or lying down, helps reduce the chance of the product spreading to unintended muscles.' },
  { id: 60, category: 'botox', question: 'Can botox help with teeth grinding?', answer: 'Yes. Botox is regularly used for bruxism, or teeth grinding. By temporarily relaxing the jaw muscles, tension in the jaw area is reduced. This can help relieve complaints such as headaches, jaw pain and dental wear.' },
  { id: 61, category: 'botox', question: 'What happens when botox wears off?', answer: 'When botox wears off, muscle activity gradually returns. The treated muscles start moving normally again and wrinkles may slowly reappear. This happens gradually, not suddenly.' },
  { id: 62, category: 'botox', question: 'Can botox help prevent deep wrinkles?', answer: 'Yes. By making the muscles temporarily less active, the skin folds less repeatedly. This can slow down the formation or worsening of deep lines. That is why some people already choose preventive botox at a younger age.' },
  { id: 63, category: 'botox', question: 'Why do people choose subtle botox?', answer: 'Many modern treatments are aimed at a natural result. Subtle botox softens wrinkles without the face losing its natural expression. Most people simply want to look refreshed without it being obvious that they have had treatment.' },
  { id: 64, category: 'botox', question: 'Is botox suitable for every age?', answer: 'Botox is usually used from adulthood onward. Younger clients often choose it preventively, while older clients use it to soften existing wrinkles. Suitability depends on skin condition, muscle activity and personal wishes.' },
  { id: 65, category: 'botox', question: 'Why do people choose regular botox maintenance?', answer: 'Regular treatments help keep the result consistent and prevent the muscles from fully regaining their previous strength. As a result, wrinkles often stay softer and less deeply visible over time.' },
  { id: 66, category: 'obesitas', question: 'What exactly is obesity?', answer: 'Obesity is a chronic condition in which there is excessive fat accumulation in the body, negatively affecting health. It is usually assessed using Body Mass Index, or BMI. Obesity increases the risk of conditions such as type 2 diabetes, cardiovascular disease, high blood pressure and joint problems.' },
  { id: 67, category: 'obesitas', question: 'When am I eligible for obesity treatment?', answer: 'You are generally eligible for treatment with a BMI of 30 or higher, or a BMI of 27 or higher combined with health problems such as diabetes or high blood pressure. During an intake consultation, it is assessed whether treatment is suitable and safe.' },
  { id: 68, category: 'obesitas', question: 'What does obesity treatment involve?', answer: 'Obesity treatment is a broader programme aimed at sustainable weight loss and a healthier lifestyle. It often includes nutritional advice, behavioural coaching, exercise guidance and, in some cases, medication. The goal is not just losing weight, but also improving overall health.' },
  { id: 69, category: 'obesitas', question: 'Is medication mandatory in obesity treatment?', answer: 'No. Medication is not mandatory. It is only used when it is medically appropriate and beneficial. For some clients, lifestyle support is sufficient, while others benefit from additional help in the form of medication.' },
  { id: 70, category: 'obesitas', question: 'Which medication can be used?', answer: 'There are different medications that can support weight loss. Some reduce appetite, while others affect blood sugar levels or the absorption of fats. These medicines are always prescribed and supervised by a doctor.' },
  { id: 71, category: 'obesitas', question: 'How quickly can I lose weight?', answer: 'Healthy and sustainable weight loss is usually around 0.5 to 1 kilogram per week. Faster weight loss is possible, but it is often discouraged because it is difficult to maintain and can lead to health problems or yo-yo effects.' },
  { id: 72, category: 'obesitas', question: 'Are the results permanent?', answer: 'Maintaining weight loss depends heavily on lasting lifestyle changes. With the right support and motivation, results can be maintained over the long term. That is why the focus is on behavioural change, not just temporary dieting.' },
  { id: 73, category: 'obesitas', question: 'Will I receive personal guidance?', answer: 'Yes. Obesity treatment is always tailored to the individual. Your medical background, lifestyle, eating habits and goals are all taken into account. Based on that, a personal treatment plan is created to suit your situation.' },
  { id: 74, category: 'obesitas', question: 'Do I need to change my diet?', answer: 'Yes. Nutrition plays a crucial role in the treatment process. This does not necessarily mean strict dieting, but rather learning healthy and sustainable eating habits that you can maintain in the long term.' },
  { id: 75, category: 'obesitas', question: 'Is exercise required during treatment?', answer: 'Exercise is an important part of a healthy lifestyle and is strongly recommended. It does not need to be intense; everyday activities such as walking can already make a significant difference.' },
  { id: 76, category: 'obesitas', question: 'Are there side effects from medication?', answer: 'Some people may experience side effects such as nausea, fatigue or changes in bowel movements. These are usually mild and temporary. The doctor monitors this carefully and adjusts the treatment if necessary.' },
  { id: 77, category: 'obesitas', question: 'Is obesity treatment reimbursed?', answer: 'This depends on your health insurance and your policy. Some programmes are partially or fully reimbursed, especially when there is medical necessity.' },
  { id: 78, category: 'obesitas', question: 'Can I stop whenever I want?', answer: 'Yes, you can stop treatment at any time. However, it is advisable to do this in consultation with your practitioner so that you receive support in maintaining the results already achieved.' },
  { id: 79, category: 'obesitas', question: 'Is obesity treatment safe?', answer: 'Yes, provided it is carried out under medical supervision. Your health and any potential risks are carefully assessed before a treatment plan is created.' },
  { id: 80, category: 'obesitas', question: 'What is the main goal of treatment?', answer: 'The main goal is not only weight loss, but also improving your overall health and quality of life. This means developing a sustainable and healthy lifestyle that you can maintain over the long term.' },
  { id: 81, category: 'obesitas', question: 'Why is obesity more than just eating too much?', answer: 'Obesity is a complex chronic condition influenced by many factors, such as genetics, hormones, stress, sleep, medication and lifestyle. So it is not simply a matter of willpower or food intake. That is why professional guidance is often important for sustainable results.' },
  { id: 82, category: 'obesitas', question: 'Why is a personalised approach important in weight loss?', answer: 'Every body responds differently to food, exercise and stress. What works well for one person may not work for another. A personalised treatment plan takes medical background, lifestyle, eating habits and goals into account, which increases the chance of success.' },
  { id: 83, category: 'obesitas', question: 'How does emotional eating affect obesity?', answer: 'Many people do not eat only because of hunger, but also because of emotions such as stress, sadness or boredom. This can lead to overeating and weight gain. That is why many treatment programmes also pay attention to behaviour, mental health and awareness around food.' },
  { id: 84, category: 'obesitas', question: 'Why is sustainable weight loss more important than fast weight loss?', answer: 'Rapid weight loss through extreme diets is often difficult to maintain and can lead to muscle loss and the yo-yo effect. Sustainable weight loss focuses on healthy habits that can be maintained over time, allowing results to remain more stable.' },
  { id: 85, category: 'obesitas', question: 'Can hormonal imbalance make weight loss more difficult?', answer: 'Yes. Hormones play an important role in appetite, metabolism and fat storage. Problems involving insulin, thyroid hormones or stress hormones, for example, can make it harder to lose weight.' },
  { id: 86, category: 'obesitas', question: 'Why is guidance important during treatment?', answer: 'Professional guidance helps not only with motivation, but also with adjusting the treatment plan when needed. Regular check-ins help keep the programme safe, effective and tailored to your personal situation.' },
  { id: 87, category: 'obesitas', question: 'How important is mental health in obesity?', answer: 'Mental health plays a major role in eating behaviour, motivation and lifestyle. Stress, anxiety and depressive feelings can all influence weight gain and eating patterns. That is why a holistic approach is often more effective.' },
  { id: 88, category: 'obesitas', question: 'Why does weight loss sometimes fail despite exercise and healthy eating?', answer: 'Weight loss can be influenced by factors such as hormones, sleep deprivation, medication, stress and metabolism. That is why it is important to look beyond food and exercise alone.' },
  { id: 89, category: 'obesitas', question: 'What are the health benefits of weight loss?', answer: 'Even modest weight loss can produce major health benefits, such as lower blood pressure, improved blood sugar levels, less joint discomfort and more energy in daily life.' },
  { id: 90, category: 'obesitas', question: 'Why is lifestyle change essential in obesity?', answer: 'Temporary solutions often lead to temporary results. A lasting lifestyle change helps build new healthy habits, making it easier to maintain weight loss in the long term.' },
];

export function getFaqEntries(locale: string): FaqEntry[] {
  return locale === 'en' ? EN : NL;
}

export function getFaqCategoryLabels(locale: string): Record<FaqCategory, string> {
  return locale === 'en' ? CATEGORY_LABELS.en : CATEGORY_LABELS.nl;
}

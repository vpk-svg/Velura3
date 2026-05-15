export type FaqCategory = 'fillers' | 'botox' | 'obesitas';

export interface FaqEntry {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORY_ORDER: FaqCategory[] = ['fillers', 'botox', 'obesitas'];

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  fillers: 'Fillers',
  botox: 'Botox',
  obesitas: 'Obesitasbehandeling',
};

export const FAQ_ENTRIES: FaqEntry[] = [
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

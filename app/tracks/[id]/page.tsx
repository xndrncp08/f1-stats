import Link from "next/link";
import { notFound } from "next/navigation";

const CIRCUITS: Record<string, any> = {
  albert_park: {
    id: "albert_park",
    name: "Albert Park Circuit",
    location: "Melbourne, Australia",
    country: "Australia",
    length: "5.278 km",
    laps: 58,
    distance: "306.124 km",
    lapRecord: "1:20.235",
    lapRecordHolder: "Charles Leclerc",
    lapRecordYear: 2022,
    firstGP: 1996,
    turns: 16,
    description: "A street circuit built around a lake in Albert Park, the Melbourne circuit is famous for hosting the season-opening Australian Grand Prix. Its mix of fast straights and tight chicanes makes for exciting racing, and the unpredictable nature of the season opener adds to its prestige.",
    history: "Albert Park hosted its first Formula 1 race in 1996 after Melbourne took over from Adelaide as the host of the Australian Grand Prix. The circuit uses public roads around the park and requires significant preparation each year. Damon Hill won the inaugural race, and the circuit has since produced many memorable moments including Michael Schumacher's dominant performances in the early 2000s.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/7col/image.png",
  },
  bahrain: {
    id: "bahrain",
    name: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    country: "Bahrain",
    length: "5.412 km",
    laps: 57,
    distance: "308.238 km",
    lapRecord: "1:31.447",
    lapRecordHolder: "Pedro de la Rosa",
    lapRecordYear: 2005,
    firstGP: 2004,
    turns: 15,
    description: "Built in the desert, the Bahrain circuit is known for its unique atmosphere under the floodlights for the season opener. The abrasive surface and long straights make tyre management and overtaking key factors in the race outcome.",
    history: "The Bahrain International Circuit opened in 2004 and quickly established itself as a significant venue on the calendar. In 2010, it became the first race of the season. The circuit hosted the famously controversial 2020 season opener and the harrowing accident involving Romain Grosjean, who miraculously escaped a devastating crash.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png",
  },
  jeddah: {
    id: "jeddah",
    name: "Jeddah Corniche Circuit",
    location: "Jeddah, Saudi Arabia",
    country: "Saudi Arabia",
    length: "6.174 km",
    laps: 50,
    distance: "308.45 km",
    lapRecord: "1:30.734",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2021,
    firstGP: 2021,
    turns: 27,
    description: "One of the fastest street circuits in Formula 1, Jeddah features high-speed sweeping corners along the Red Sea corniche. Its narrow layout and limited run-off areas demand maximum commitment from drivers and create some of the most intense wheel-to-wheel racing on the calendar.",
    history: "The Jeddah Corniche Circuit hosted its first Formula 1 race in 2021 as part of Saudi Arabia's push to host major international sporting events. The inaugural race was one of the most dramatic in recent memory, featuring multiple safety cars and controversy involving Lewis Hamilton and Max Verstappen in their title battle.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/7col/image.png",
  },
  monaco: {
    id: "monaco",
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    country: "Monaco",
    length: "3.337 km",
    laps: 78,
    distance: "260.286 km",
    lapRecord: "1:12.909",
    lapRecordHolder: "Rubens Barrichello",
    lapRecordYear: 2004,
    firstGP: 1950,
    turns: 19,
    description: "The crown jewel of Formula 1. Monaco's narrow streets, dramatic elevation changes, and unforgiving armco barriers have made it the most prestigious race in the world for over seven decades. Qualifying is paramount here as overtaking on track is nearly impossible.",
    history: "Monaco has been part of the Formula 1 World Championship since its very first season in 1950. The race was won by Juan Manuel Fangio in the inaugural year. Over the decades, it has produced countless legendary moments — Ayrton Senna won it six times, and his mastery of the streets of Monte Carlo remains one of motorsport's most iconic achievements.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/7col/image.png",
  },
  silverstone: {
    id: "silverstone",
    name: "Silverstone Circuit",
    location: "Silverstone, England",
    country: "Great Britain",
    length: "5.891 km",
    laps: 52,
    distance: "306.198 km",
    lapRecord: "1:27.097",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2020,
    firstGP: 1950,
    turns: 18,
    description: "The home of British motorsport and the venue of the very first Formula 1 World Championship race in 1950. Silverstone's high-speed corners like Copse, Maggots-Becketts-Chapel, and the new complex are legendary among drivers who consider it a true test of bravery.",
    history: "Built on a former RAF airfield, Silverstone hosted the first ever Formula 1 World Championship race on 13 May 1950. Giuseppe Farina won that day, in front of King George VI. The circuit has undergone numerous changes over the decades but remains one of the most respected venues in motorsport, with the British Grand Prix attracting some of the largest and most passionate crowds on the calendar.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col/image.png",
  },
  spa: {
    id: "spa",
    name: "Circuit de Spa-Francorchamps",
    location: "Spa, Belgium",
    country: "Belgium",
    length: "7.004 km",
    laps: 44,
    distance: "308.052 km",
    lapRecord: "1:46.286",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2018,
    firstGP: 1950,
    turns: 20,
    description: "Many consider Spa-Francorchamps the greatest circuit in the world. Eau Rouge/Raidillon, the legendary uphill left-right complex, is one of the most thrilling sections in motorsport. The Ardennes forest provides a stunning natural backdrop and famously unpredictable weather.",
    history: "Spa-Francorchamps has been part of the World Championship since 1950, though the original circuit was significantly longer at over 14 km. The current circuit, shortened and modified in the 1980s, retains the character of the original. The circuit witnessed Ayrton Senna's debut win in 1985 and Michael Schumacher's many victories. It remains the longest circuit on the current calendar.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/7col/image.png",
  },
  monza: {
    id: "monza",
    name: "Autodromo Nazionale di Monza",
    location: "Monza, Italy",
    country: "Italy",
    length: "5.793 km",
    laps: 53,
    distance: "306.72 km",
    lapRecord: "1:21.046",
    lapRecordHolder: "Rubens Barrichello",
    lapRecordYear: 2004,
    firstGP: 1950,
    turns: 11,
    description: "The Temple of Speed. Monza is the fastest circuit in Formula 1, where cars reach over 360 km/h on the long straights between the iconic Lesmo and Ascari chicanes. The passionate Tifosi make this one of the most electrically charged atmospheres in all of sport.",
    history: "One of the oldest purpose-built racing circuits in the world, Monza opened in 1922 and hosted the first Italian Grand Prix that same year. The circuit has been part of the World Championship every year since 1950 with rare exceptions. Peter Collins' death here in 1958 and the many accidents that followed led to significant safety modifications, but the circuit's raw speed character was preserved.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png",
  },
  suzuka: {
    id: "suzuka",
    name: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    country: "Japan",
    length: "5.807 km",
    laps: 53,
    distance: "307.471 km",
    lapRecord: "1:30.983",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2019,
    firstGP: 1987,
    turns: 18,
    description: "Consistently voted drivers' favourite circuit, Suzuka's figure-of-eight layout is unique in Formula 1. The legendary 130R corner and the flowing Esses sequence are among the most spectacular sections in the sport. Honda built and owns the circuit.",
    history: "Designed by John Hugenholtz and opened in 1962, Suzuka hosted its first Formula 1 race in 1987. The circuit became synonymous with championship deciders — most famously the collisions between Ayrton Senna and Alain Prost in 1989 and 1990 that decided both titles. The circuit was also the venue for Michael Schumacher's many championship wins with Ferrari.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/7col/image.png",
  },
  interlagos: {
    id: "interlagos",
    name: "Autodromo Jose Carlos Pace",
    location: "São Paulo, Brazil",
    country: "Brazil",
    length: "4.309 km",
    laps: 71,
    distance: "305.879 km",
    lapRecord: "1:10.540",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2018,
    firstGP: 1973,
    turns: 15,
    description: "Interlagos is beloved for producing some of the most dramatic races in F1 history. The anti-clockwise circuit with its gradient changes and unpredictable São Paulo weather creates endless excitement. Home to Ayrton Senna's iconic Senna S.",
    history: "Interlagos opened in 1940 and took its name from being built between two lakes. Renamed in honour of Carlos Pace after the Brazilian driver's death in 1977, the circuit has produced legendary moments including Ayrton Senna's emotional home victories. The 2008 season finale here, where Lewis Hamilton clinched his first championship on the final corner of the final lap, is one of the most dramatic moments in F1 history.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/7col/image.png",
  },
  yas_marina: {
    id: "yas_marina",
    name: "Yas Marina Circuit",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    length: "5.281 km",
    laps: 58,
    distance: "306.183 km",
    lapRecord: "1:26.103",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2021,
    firstGP: 2009,
    turns: 16,
    description: "The season finale venue, Yas Marina Circuit hosts the Abu Dhabi Grand Prix under the floodlights. The circuit weaves between the marina and the iconic W Hotel, creating a spectacular nighttime backdrop for the last race of the championship.",
    history: "Yas Marina Circuit opened in 2009 with its first race won by Sebastian Vettel for Red Bull. The circuit was redesigned ahead of the 2021 season to improve overtaking opportunities. The 2021 Abu Dhabi Grand Prix became the most controversial race finish in modern F1 history, with the safety car controversy that handed Max Verstappen his first world championship over Lewis Hamilton on the final lap.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/7col/image.png",
  },
  americas: {
    id: "americas",
    name: "Circuit of The Americas",
    location: "Austin, Texas, USA",
    country: "United States",
    length: "5.513 km",
    laps: 56,
    distance: "308.405 km",
    lapRecord: "1:36.169",
    lapRecordHolder: "Charles Leclerc",
    lapRecordYear: 2019,
    firstGP: 2012,
    turns: 20,
    description: "The first purpose-built Formula 1 circuit in the United States, COTA incorporates design elements inspired by famous circuits worldwide. The blind uphill Turn 1, inspired by Eau Rouge, and the flowing Esses inspired by Suzuka are particular highlights that drivers love.",
    history: "COTA was designed to bring Formula 1 back to the United States after several failed attempts. The circuit opened in 2012 and hosted Lewis Hamilton's first win for Mercedes. The race quickly became known for its carnival atmosphere and passionate American crowds, often delivering close racing thanks to the circuit's mix of high-speed and technical sections.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit.png.transform/7col/image.png",
  },
  baku: {
    id: "baku",
    name: "Baku City Circuit",
    location: "Baku, Azerbaijan",
    country: "Azerbaijan",
    length: "6.003 km",
    laps: 51,
    distance: "306.049 km",
    lapRecord: "1:43.009",
    lapRecordHolder: "Charles Leclerc",
    lapRecordYear: 2019,
    firstGP: 2017,
    turns: 20,
    description: "A stunning street circuit that combines the longest straight in Formula 1 with an incredibly tight castle section where the walls are just centimetres from the cars. Baku is notorious for dramatic late-race incidents, safety cars, and unexpected results.",
    history: "The Baku City Circuit hosted its first race in 2016 as the European Grand Prix before being renamed the Azerbaijan Grand Prix in 2017. The race has consistently produced chaotic and dramatic events. The 2021 race saw championship leader Max Verstappen suffer a tyre blowout when leading, while Lewis Hamilton made a brake bias error that cost him the win.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Azerbaijan_Circuit.png.transform/7col/image.png",
  },
  villeneuve: {
    id: "villeneuve",
    name: "Circuit Gilles Villeneuve",
    location: "Montreal, Canada",
    country: "Canada",
    length: "4.361 km",
    laps: 70,
    distance: "305.27 km",
    lapRecord: "1:13.078",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2019,
    firstGP: 1978,
    turns: 14,
    description: "Built on Île Notre-Dame in the St. Lawrence River, the Circuit Gilles Villeneuve is named after the beloved Canadian racing hero. Its long straights and the infamous 'Wall of Champions' — which has claimed world champions on their way to the pits — make it a fan favourite.",
    history: "The circuit is named after Gilles Villeneuve, the charismatic Canadian driver who raced for Ferrari and died tragically in 1982. The 'Wall of Champions' earned its nickname after Damon Hill, Michael Schumacher, and Jacques Villeneuve all crashed at the same spot in 1999. The circuit hosted Schumacher's famous 1994 Canadian GP win at the age of 25 and many other memorable races.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/7col/image.png",
  },
  red_bull_ring: {
    id: "red_bull_ring",
    name: "Red Bull Ring",
    location: "Spielberg, Austria",
    country: "Austria",
    length: "4.318 km",
    laps: 71,
    distance: "306.452 km",
    lapRecord: "1:05.619",
    lapRecordHolder: "Carlos Sainz",
    lapRecordYear: 2020,
    firstGP: 1970,
    turns: 10,
    description: "Nestled in the Styrian mountains, the Red Bull Ring is one of the shorter circuits on the calendar but compensates with steep elevation changes and long straights. Multiple DRS zones create outstanding overtaking opportunities against a stunning alpine backdrop.",
    history: "Originally built as the Österreichring in 1969, the circuit was later redesigned as the A1-Ring before Red Bull purchased it and rebuilt it as the Red Bull Ring in 2011. The original Österreichring was much longer and faster but was considered dangerous. The rebuilt circuit returned F1 to Austria in 2014 after a 11-year absence and has since often hosted two races in a weekend.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/7col/image.png",
  },
  hungaroring: {
    id: "hungaroring",
    name: "Hungaroring",
    location: "Budapest, Hungary",
    country: "Hungary",
    length: "4.381 km",
    laps: 70,
    distance: "306.63 km",
    lapRecord: "1:16.627",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2020,
    firstGP: 1986,
    turns: 14,
    description: "Often described as 'Monaco without the barriers', the Hungaroring is a tight and twisty circuit where overtaking is notoriously difficult. Qualifying performance is crucial, and pit strategy often plays a decisive role in determining the final result.",
    history: "Hungary became the first country behind the Iron Curtain to host a Formula 1 Grand Prix in 1986. The Hungaroring was built specifically for F1 in just 8 months. Ayrton Senna won the inaugural race, and the circuit has been associated with several significant results — including Jenson Button's famous drive from 14th to win in 2006 and Hamilton's ten victories there.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/7col/image.png",
  },
  marina_bay: {
    id: "marina_bay",
    name: "Marina Bay Street Circuit",
    location: "Singapore",
    country: "Singapore",
    length: "4.94 km",
    laps: 62,
    distance: "306.143 km",
    lapRecord: "1:35.867",
    lapRecordHolder: "Kevin Magnussen",
    lapRecordYear: 2018,
    firstGP: 2008,
    turns: 23,
    description: "The only night race in Formula 1 takes place against the spectacular Singapore skyline. The bumpy street circuit is one of the most physically demanding on the calendar, with drivers enduring extreme heat and humidity for almost two hours.",
    history: "The Singapore Grand Prix became the first Formula 1 night race in 2008, with Fernando Alonso winning the inaugural event in controversial circumstances — the Crashgate scandal, where Nelson Piquet Jr. deliberately crashed on team orders from Renault. Despite the controversy, the race has become one of the most popular on the calendar for its spectacular setting.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit.png.transform/7col/image.png",
  },
  imola: {
    id: "imola",
    name: "Autodromo Enzo e Dino Ferrari",
    location: "Imola, Italy",
    country: "Italy",
    length: "4.909 km",
    laps: 63,
    distance: "309.049 km",
    lapRecord: "1:15.484",
    lapRecordHolder: "Rubens Barrichello",
    lapRecordYear: 2004,
    firstGP: 1980,
    turns: 19,
    description: "One of the most historic and emotionally charged circuits in Formula 1, Imola is a flowing track with minimal runoff that rewards driver commitment and punishes mistakes. Named after the legendary Enzo Ferrari, it carries enormous emotional weight for the sport.",
    history: "Imola returned to the calendar in 2020 after a 14-year absence. The circuit is forever linked to the tragic 1994 San Marino Grand Prix weekend, when Roland Ratzenberger died in qualifying and Ayrton Senna was killed during the race. The tragedy fundamentally changed Formula 1's approach to safety. The circuit is named after Enzo and Dino Ferrari, father and son.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/7col/image.png",
  },
  miami: {
    id: "miami",
    name: "Miami International Autodrome",
    location: "Miami, Florida, USA",
    country: "United States",
    length: "5.412 km",
    laps: 57,
    distance: "308.326 km",
    lapRecord: "1:29.708",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2023,
    firstGP: 2022,
    turns: 19,
    description: "A purpose-built street circuit around the Hard Rock Stadium, the Miami Grand Prix quickly became one of the most glamorous events on the calendar. The circuit features a mix of high-speed sections and tight chicanes with a fake marina that became one of F1's more talked-about features.",
    history: "Miami joined the calendar in 2022, making the United States one of only three countries to host three Grands Prix in a season alongside the existing COTA and Las Vegas races. The race was won by Max Verstappen in 2023. The event became known for its celebrity attendees and the famous fake marina that was installed around the circuit.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/7col/image.png",
  },
  shanghai: {
    id: "shanghai",
    name: "Shanghai International Circuit",
    location: "Shanghai, China",
    country: "China",
    length: "5.451 km",
    laps: 56,
    distance: "305.066 km",
    lapRecord: "1:32.238",
    lapRecordHolder: "Michael Schumacher",
    lapRecordYear: 2004,
    firstGP: 2004,
    turns: 16,
    description: "Designed by Hermann Tilke, the Shanghai circuit is famous for its unique layout inspired by the Chinese character 'shang'. The long back straight and sweeping Turn 1 complex create exciting overtaking opportunities and the circuit's scale is truly impressive.",
    history: "The Shanghai International Circuit opened in 2004 to host the inaugural Chinese Grand Prix, won by Rubens Barrichello. The circuit was absent from the calendar from 2020 to 2023 due to COVID restrictions, returning in 2024. The circuit is known for its distinctive spiraling pitlane and the challenging Turn 1 hairpin that creates opportunities for overtaking.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/7col/image.png",
  },
  losail: {
    id: "losail",
    name: "Lusail International Circuit",
    location: "Lusail, Qatar",
    country: "Qatar",
    length: "5.419 km",
    laps: 57,
    distance: "308.611 km",
    lapRecord: "1:24.319",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2023,
    firstGP: 2021,
    turns: 16,
    description: "Originally built for MotoGP, the Lusail circuit hosted its first F1 race in 2021. The sweeping high-speed layout under floodlights in the Qatari desert creates a unique and visually stunning event. High tyre degradation makes strategy critical.",
    history: "Qatar hosted its first Formula 1 race in 2021 as a late addition to the calendar after the Australian Grand Prix was cancelled. Lewis Hamilton won the inaugural race. Qatar subsequently signed a long-term deal with Formula 1 and became a regular fixture. The circuit underwent significant modifications including new spectator facilities for the 2023 event.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/7col/image.png",
  },
  rodriguez: {
    id: "rodriguez",
    name: "Autodromo Hermanos Rodriguez",
    location: "Mexico City, Mexico",
    country: "Mexico",
    length: "4.304 km",
    laps: 71,
    distance: "305.354 km",
    lapRecord: "1:17.774",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2021,
    firstGP: 1963,
    turns: 17,
    description: "Located at 2,285 metres above sea level, Mexico City's thin air reduces aerodynamic downforce and engine power, creating unique engineering challenges. The stadium section through the old baseball arena — the Foro Sol — creates an electric and intimate atmosphere.",
    history: "Named after brothers Ricardo and Pedro Rodriguez, both Mexican racing drivers who died in accidents, the circuit first hosted F1 in 1963. After an extended absence, it returned to the calendar in 2015. The Mexico City Grand Prix has become known for its incredible atmosphere, with Max Verstappen winning four consecutive times between 2017 and 2018 and 2021 to 2022.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/7col/image.png",
  },
  vegas: {
    id: "vegas",
    name: "Las Vegas Strip Circuit",
    location: "Las Vegas, Nevada, USA",
    country: "United States",
    length: "6.201 km",
    laps: 50,
    distance: "309.958 km",
    lapRecord: "1:35.490",
    lapRecordHolder: "Oscar Piastri",
    lapRecordYear: 2023,
    firstGP: 2023,
    turns: 17,
    description: "The most glamorous race on the calendar, the Las Vegas Grand Prix takes place on the iconic Strip under the Nevada night sky. The long straights allow massive top speeds past casinos and neon lights, creating a spectacle unlike any other in motorsport.",
    history: "Las Vegas returned to the Formula 1 calendar in 2023 after a brief experiment in the 1980s. Formula 1 Management took direct control of the event, investing hundreds of millions of dollars in infrastructure. The inaugural race was won by Max Verstappen despite a chaotic night that included a drain cover incident in practice that caused significant damage to multiple cars.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/7col/image.png",
  },
  catalunya: {
    id: "catalunya",
    name: "Circuit de Barcelona-Catalunya",
    location: "Barcelona, Spain",
    country: "Spain",
    length: "4.657 km",
    laps: 66,
    distance: "307.236 km",
    lapRecord: "1:18.149",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2021,
    firstGP: 1991,
    turns: 16,
    description: "A technical circuit that all teams know extremely well from pre-season testing. Barcelona rewards aerodynamic efficiency and mechanical grip across its mix of slow hairpins and high-speed corners, making it a comprehensive test of a car's overall performance.",
    history: "The Circuit de Barcelona-Catalunya hosted its first World Championship race in 1991, won by Ayrton Senna. The circuit became the permanent pre-season testing venue for Formula 1 teams, meaning every team arrives knowing the track intimately. Despite this familiarity, the Spanish Grand Prix has produced many memorable races.",
    layoutUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/7col/image.png",
  },
};

export default function TrackDetailPage({ params }: { params: { circuitId: string } }) {
  const circuit = CIRCUITS[params.circuitId];

  if (!circuit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Red accent bar */}
      <div className="h-1 w-full bg-red-600" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        {/* Background circuit name watermark */}
        <div className="absolute right-0 top-0 bottom-0 flex items-end pb-4 pr-4 pointer-events-none select-none overflow-hidden">
          <span
            className="font-black uppercase text-zinc-900 leading-none"
            style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
          >
            {circuit.country.split(" ").pop()}
          </span>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white mb-8 transition-colors"
          >
            ← All Circuits
          </Link>

          <div className="max-w-2xl">
            <div className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">
              {circuit.location} · Since {circuit.firstGP}
            </div>
            <h1
              className="font-black uppercase text-white leading-none mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {circuit.name}
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
              {circuit.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Stats Grid */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Circuit Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800">
            {[
              { label: "Circuit Length", value: circuit.length },
              { label: "Race Laps", value: circuit.laps },
              { label: "Race Distance", value: circuit.distance },
              { label: "Corners", value: circuit.turns },
              { label: "First GP", value: circuit.firstGP },
              { label: "Lap Record", value: circuit.lapRecord, accent: true },
            ].map((stat) => (
              <div key={stat.label} className="bg-black p-4 border border-zinc-800 hover:border-zinc-600 transition-colors">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-1">{stat.label}</div>
                <div className={`text-xl font-black ${stat.accent ? "text-red-500" : "text-white"}`}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 border-t-0 px-4 py-3 flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Lap Record Holder:</span>
            <span className="text-xs text-zinc-300 font-bold">{circuit.lapRecordHolder} ({circuit.lapRecordYear})</span>
          </div>
        </section>

        {/* Layout + History side by side */}
        <section className="grid md:grid-cols-2 gap-px bg-zinc-800">
          {/* Track Layout */}
          <div className="bg-black p-6 border border-zinc-800">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-5">Track Layout</h2>
            <div className="flex items-center justify-center bg-zinc-950 border border-zinc-800 p-6 min-h-[280px]">
              <img
                src={circuit.layoutUrl}
                alt={`${circuit.name} layout`}
                className="max-h-64 w-auto object-contain opacity-90 invert"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `<div class="text-zinc-700 text-sm font-bold uppercase tracking-widest text-center">Layout unavailable</div>`;
                }}
              />
            </div>
            <p className="text-xs text-zinc-700 font-bold uppercase tracking-widest mt-3 text-center">
              {circuit.laps} laps · {circuit.distance}
            </p>
          </div>

          {/* History */}
          <div className="bg-black p-6 border border-zinc-800">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-5">History</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{circuit.history}</p>

            <div className="mt-6 pt-6 border-t border-zinc-900">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">First Grand Prix</div>
                  <div className="text-white font-black">{circuit.firstGP}</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mb-1">Country</div>
                  <div className="text-white font-black">{circuit.country}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back button */}
        <div className="pt-4 border-t border-zinc-900">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            ← Back to All Circuits
          </Link>
        </div>
      </div>
    </main>
  );
}
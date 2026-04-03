console.log("version 2.1.5");

const playlists = [
  {
    id: "ravel",
    name: "Maurice Ravel works",
    nameSingular: "Maurice Ravel work",
    leftImagePath: "../files/images/art/monetwaterlilies.jpg",
    rightImagePath: "../files/images/people/ravel.jpeg",
    folderPath: "../files/audio/ravel/",
    songs: [
      {
        file: "alamanieredeborodine.mp3",
        answers: [
          "À la manière de Borodine",
          "A la maniere de Borodine",
          "In the Manner of Borodin",
          "In the Style of Borodin",
        ],
        keywords: ["a la maniere de..."],
      },
      {
        file: "alamanieredechabrier.mp3",
        answers: [
          "À la manière de Chabrier",
          "A la maniere de Chabrier",
          "In the Manner of Chabrier",
          "In the Style of Chabrier",
        ],
        keywords: ["a la maniere de..."],
      },
      {
        file: "alboradadelgracioso.mp3",
        answers: [
          "Alborada del gracioso (orchestra)",
          "Alborada del gracioso",
          "The Jester's Aubade",
          "Morning Song of the Jester",
        ],
        keywords: [],
      },
      {
        file: "berceusesurlenomdegabrielfaure.mp3",
        answers: [
          "Berceuse sur le nom de Gabriel Fauré",
          "Berceuse sur le nom de Gabriel Faure",
          "Berceuse on the name of Gabriel Faure",
        ],
        keywords: ["lullaby on the name of gabriel faure"],
      },
      { file: "bolero.mp3", answers: ["Boléro", "Bolero"], keywords: [] },
      {
        file: "daphnisetchloe.mp3",
        answers: ["Daphnis et Chloé", "Daphnis et Chloe", "Daphnis and Chloe"],
        keywords: [
          "fragments symphoniques de 'daphnis et chloe'",
          "daphnis et chloe suite no. 1",
          "daphnis et chloe suite no. 2",
        ],
      },
      {
        file: "fanfare.mp3",
        answers: [
          "Fanfare for the ballet 'L'éventail de Jeanne'",
          "Fanfare for the ballet 'L'eventail de Jeanne'",
        ],
        keywords: [
          "fanfare for l'eventail de jeanne",
          "fanfare for jean's fan",
        ],
      },
      { file: "frontispice.mp3", answers: ["Frontispice"], keywords: [] },
      {
        file: "gasparddelanuit.mp3",
        answers: ["Gaspard de la nuit", "Gaspard of the Night"],
        keywords: ["ondine", "le gibet", "scarbo"],
      },
      {
        file: "introductionetallegro.mp3",
        answers: ["Introduction et allegro", "Introduction and Allegro"],
        keywords: [],
      },
      {
        file: "jeuxdeau.mp3",
        answers: ["Jeux d'eau"],
        keywords: ["jeux deau", "fountains", "playing water", "water games"],
      },
      { file: "lavalse.mp3", answers: ["La valse", "The Waltz"], keywords: [] },
      {
        file: "lenfantetlessortileges.mp3",
        answers: [
          "L'enfant et les sortilèges",
          "L'enfant et les sortileges",
          "The Child and the Spells",
        ],
        keywords: [],
      },
      {
        file: "letombeaudecouperin.mp3",
        answers: ["Le tombeau de Couperin", "The Grave of Couperin"],
        keywords: [
          "prelude",
          "fugue",
          "forlane",
          "rigaudon",
          "menuet",
          "toccata",
        ],
      },
      {
        file: "letombeaudecouperinorchestra.mp3",
        answers: ["Le tombeau de Couperin", "The Grave of Couperin"],
        keywords: ["prelude", "forlane", "menuet", "rigaudon"],
      },
      {
        file: "lheureespagnole.mp3",
        answers: ["L'heure espagnole", "The Spanish Hour"],
        keywords: [],
      },
      {
        file: "mamereloye.mp3",
        answers: ["Ma mère l'Oye", "Ma mere l'Oye", "Mother Goose"],
        keywords: [
          "my mother the goose",
          "pavane de la belle au bois dormant",
          "pavane of sleeping beauty",
          "petit poucet",
          "little tom thumb",
          "laideronnette, imperatrice des pagodes",
          "little ugly girl, empress of the pagodas",
          "les entretiens de la belle et de la bete",
          "conversation of beauty and the beast",
          "le jardin feerique",
          "the fairy garden",
        ],
      },
      {
        file: "mamereloyeballet.mp3",
        answers: ["Ma mère l'Oye", "Ma mere l'Oye", "Mother Goose"],
        keywords: [
          "my mother the goose",
          "pavane de la belle au bois dormant",
          "pavane of sleeping beauty",
          "petit poucet",
          "little tom thumb",
          "laideronnette, imperatrice des pagodes",
          "little ugly girl, empress of the pagodas",
          "les entretiens de la belle et de la bete",
          "conversation of beauty and the beast",
          "le jardin feerique",
          "the fairy garden",
        ],
      },
      {
        file: "mamereloyeorchestra.mp3",
        answers: ["Ma mère l'Oye", "Ma mere l'Oye", "Mother Goose"],
        keywords: [
          "my mother the goose",
          "pavane de la belle au bois dormant",
          "pavane of sleeping beauty",
          "petit poucet",
          "little tom thumb",
          "laideronnette, imperatrice des pagodes",
          "little ugly girl, empress of the pagodas",
          "les entretiens de la belle et de la bete",
          "conversation of beauty and the beast",
          "le jardin feerique",
          "the fairy garden",
        ],
      },
      {
        file: "menuetantique.mp3",
        answers: ["Menuet antique", "Antique Minuet"],
        keywords: [],
      },
      {
        file: "menuetantiqueorchestra.mp3",
        answers: ["Menuet antique", "Antique Minuet"],
        keywords: [],
      },
      {
        file: "menuetincsharpminor.mp3",
        answers: [
          "Minuet in C-sharp minor",
          "Menuet in C-sharp minor",
          "Minuet in C# minor",
          "Menuet in C# minor",
        ],
        keywords: [],
      },
      {
        file: "menuetsurlenomdhaydn.mp3",
        answers: ["Menuet sur le nom d'Haydn", "Minuet on the Name of Haydn"],
        keywords: [],
      },
      {
        file: "miroirs.mp3",
        answers: ["Miroirs", "Mirrors"],
        keywords: [
          "noctuelles",
          "night moths",
          "oiseaux tristes",
          "sad birds",
          "une barque sur l'ocean",
          "a boat on the ocean",
          "alborada del gracioso",
          "the jester's aubade",
          "morning song of the jester",
          "la vallee des cloches",
          "the valley of bells",
        ],
      },
      {
        file: "pavanepouruneinfantedefunte.mp3",
        answers: [
          "Pavane pour une infante défunte",
          "Pavane pour une infante defunte",
          "Pavane for a Dead Princess",
        ],
        keywords: [],
      },
      {
        file: "pavanepouruneinfantedefunteorchestra.mp3",
        answers: [
          "Pavane pour une infante défunte",
          "Pavane pour une infante defunte",
          "Pavane for a Dead Princess",
        ],
        keywords: [],
      },
      {
        file: "pianoconcertoforthelefthand.mp3",
        answers: ["Piano Concerto for the Left Hand"],
        keywords: [],
      },
      {
        file: "pianoconcertoingmajor.mp3",
        answers: ["Piano Concerto in G major"],
        keywords: [],
      },
      { file: "pianotrio.mp3", answers: ["Piano Trio"], keywords: [] },
      {
        file: "prelude.mp3",
        answers: ["Prélude", "Prelude"],
        keywords: ["prelude in a minor"],
      },
      {
        file: "rapsodieespagnole.mp3",
        answers: ["Rapsodie espagnole", "Spanish Rhapsody"],
        keywords: [
          "prelude a la nuit",
          "prelude to the night",
          "malaguena",
          "habanera",
          "feria",
        ],
      },
      {
        file: "serenadegrotesque.mp3",
        answers: [
          "Sérénade grotesque",
          "Serenade grotesque",
          "Grotesque Serenade",
        ],
        keywords: [],
      },
      {
        file: "sheherazadeouverturedefeerie.mp3",
        answers: [
          "Shéhérazade, ouverture de féerie",
          "Sheherazade, ouverture de feerie",
        ],
        keywords: ["scheherazade, fairy overture"],
      },
      {
        file: "sonataforviolinandcello.mp3",
        answers: [
          "Sonata for Violin and Cello",
          "Sonate pour violon et violoncelle",
        ],
        keywords: [],
      },
      { file: "sonatine.mp3", answers: ["Sonatine"], keywords: [] },
      { file: "stringquartet.mp3", answers: ["String Quartet"], keywords: [] },
      { file: "tzigane.mp3", answers: ["Tzigane"], keywords: [] },
      {
        file: "unebarquesurlocean.mp3",
        answers: [
          "Une barque sur l'océan",
          "Une barque sur l'ocean",
          "A Boat on the Ocean",
        ],
        keywords: [],
      },
      {
        file: "valsesnoblesetsentimentales.mp3",
        answers: [
          "Valses nobles et sentimentales",
          "Noble and Sentimental Waltzes",
        ],
        keywords: [],
      },
      {
        file: "valsesnoblesetsentimentalesorchestra.mp3",
        answers: [
          "Valses nobles et sentimentales",
          "Noble and Sentimental Waltzes",
        ],
        keywords: [
          "adelaide, ou le langage des fleurs",
          "adelaide: the language of flowers",
        ],
      },
      {
        file: "violinsonata1.mp3",
        answers: ["Violin Sonata No. 1", "Violin and Piano Sonata No. 1"],
        keywords: [],
      },
      {
        file: "violinsonata2.mp3",
        answers: ["Violin Sonata No. 2", "Violin and Piano Sonata No. 2"],
        keywords: [],
      },
    ],
  },
  {
    id: "rachmaninoff",
    name: "Rachmaninoff piano concerti",
    nameSingular: "Rachmaninoff piano concerto",
    leftImagePath: "../files/images/people/rachmaninoff.jpeg",
    rightImagePath: "../files/images/people/federova.jpeg",
    folderPath: "../files/audio/rachmaninoff/",
    songs: [
      {
        file: "pianoconcerto1.mp3",
        answers: ["Piano Concerto No. 1 in F# minor", "Piano Concerto No. 1"],
        keywords: [],
      },
      {
        file: "pianoconcerto2.mp3",
        answers: ["Piano Concerto No. 2 in C minor", "Piano Concerto No. 2"],
        keywords: [],
      },
      {
        file: "pianoconcerto3.mp3",
        answers: ["Piano Concerto No. 3 in D minor", "Piano Concerto No. 3"],
        keywords: [],
      },
      {
        file: "pianoconcerto4.mp3",
        answers: ["Piano Concerto No. 4 in G minor", "Piano Concerto No. 4"],
        keywords: [],
      },
      {
        file: "rhapsody.mp3",
        answers: ["Rhapsody on a Theme of Paganini"],
        keywords: [],
      },
    ],
  },
  {
    id: "swift",
    name: "Taylor Swift songs",
    nameSingular: "Taylor Swift song",
    leftImagePath: "../files/images/people/swift1.jpeg",
    rightImagePath: "../files/images/people/swift2.jpeg",
    folderPath: "../files/audio/swift/",
    songs: [
      { file: "22.mp3", answers: ["22"], keywords: [] },
      { file: "afterglow.mp3", answers: ["Afterglow"], keywords: [] },
      { file: "alltoowell.mp3", answers: ["All Too Well"], keywords: [] },
      {
        file: "aperfectlygoodheart.mp3",
        answers: ["A Perfectly Good Heart"],
        keywords: [],
      },
      {
        file: "aplaceinthisworld.mp3",
        answers: ["A Place in This World"],
        keywords: [],
      },
      { file: "august.mp3", answers: ["August"], keywords: [] },
      {
        file: "backtodecember.mp3",
        answers: ["Back to December"],
        keywords: [],
      },
      { file: "beginagain.mp3", answers: ["Begin Again"], keywords: [] },
      {
        file: "betterthanrevenge.mp3",
        answers: ["Better Than Revenge"],
        keywords: [],
      },
      { file: "betty.mp3", answers: ["Betty"], keywords: [] },
      { file: "breathe.mp3", answers: ["Breathe"], keywords: [] },
      { file: "cardigan.mp3", answers: ["Cardigan"], keywords: [] },
      { file: "change.mp3", answers: ["Change"], keywords: [] },
      {
        file: "comebackbehere.mp3",
        answers: ["Come Back... Be Here"],
        keywords: [],
      },
      {
        file: "comeinwiththerain.mp3",
        answers: ["Come In with the Rain"],
        keywords: [],
      },
      {
        file: "corneliastreet.mp3",
        answers: ["Cornelia Street"],
        keywords: [],
      },
      { file: "cruelsummer.mp3", answers: ["Cruel Summer"], keywords: [] },
      { file: "daylight.mp3", answers: ["Daylight"], keywords: [] },
      { file: "dearjohn.mp3", answers: ["Dear John"], keywords: [] },
      {
        file: "deathbyathousandcuts.mp3",
        answers: ["Death by a Thousand Cuts"],
        keywords: [],
      },
      { file: "delicate.mp3", answers: ["Delicate"], keywords: [] },
      { file: "enchanted.mp3", answers: ["Enchanted"], keywords: [] },
      { file: "epiphany.mp3", answers: ["Epiphany"], keywords: [] },
      {
        file: "everythinghaschanged.mp3",
        answers: ["Everything Has Changed"],
        keywords: [],
      },
      { file: "exile.mp3", answers: ["Exile"], keywords: [] },
      { file: "falsegod.mp3", answers: ["False God"], keywords: [] },
      { file: "fearless.mp3", answers: ["Fearless"], keywords: [] },
      { file: "fifteen.mp3", answers: ["Fifteen"], keywords: [] },
      {
        file: "foreverandalways.mp3",
        answers: ["Forever & Always", "Forever and Always"],
        keywords: [],
      },
      { file: "girlathome.mp3", answers: ["Girl at Home"], keywords: [] },
      { file: "gorgeous.mp3", answers: ["Gorgeous"], keywords: [] },
      { file: "haunted.mp3", answers: ["Haunted"], keywords: [] },
      { file: "heystephen.mp3", answers: ["Hey Stephen"], keywords: [] },
      { file: "hoax.mp3", answers: ["Hoax"], keywords: [] },
      { file: "holyground.mp3", answers: ["Holy Ground"], keywords: [] },
      { file: "ialmostdo.mp3", answers: ["I Almost Do"], keywords: [] },
      {
        file: "iforgotthatyouexisted.mp3",
        answers: ["I Forgot That You Existed"],
        keywords: [],
      },
      {
        file: "ifthiswasamovie.mp3",
        answers: ["If This Was a Movie"],
        keywords: [],
      },
      {
        file: "iknewyouweretrouble.mp3",
        answers: ["I Knew You Were Trouble"],
        keywords: [],
      },
      {
        file: "illicitaffairs.mp3",
        answers: ["Illicit Affairs"],
        keywords: [],
      },
      {
        file: "imonlymewhenimwithyou.mp3",
        answers: ["I'm Only Me When I'm with You"],
        keywords: [],
      },
      { file: "innocent.mp3", answers: ["Innocent"], keywords: [] },
      { file: "invisible.mp3", answers: ["Invisible"], keywords: [] },
      {
        file: "invisiblestring.mp3",
        answers: ["Invisible String"],
        keywords: [],
      },
      {
        file: "ithinkheknows.mp3",
        answers: ["I Think He Knows"],
        keywords: [],
      },
      {
        file: "itsnicetohaveafriend.mp3",
        answers: ["It's Nice to Have a Friend"],
        keywords: [],
      },
      { file: "jumpthenfall.mp3", answers: ["Jump Then Fall"], keywords: [] },
      { file: "lastkiss.mp3", answers: ["Last Kiss"], keywords: [] },
      { file: "londonboy.mp3", answers: ["London Boy"], keywords: [] },
      { file: "longlive.mp3", answers: ["Long Live"], keywords: [] },
      { file: "lover.mp3", answers: ["Lover"], keywords: [] },
      { file: "lovestory.mp3", answers: ["Love Story"], keywords: [] },
      { file: "madwoman.mp3", answers: ["Mad Woman"], keywords: [] },
      { file: "me.mp3", answers: ["ME!"], keywords: [] },
      { file: "mean.mp3", answers: ["Mean"], keywords: [] },
      { file: "mine.mp3", answers: ["Mine"], keywords: [] },
      { file: "mirrorball.mp3", answers: ["Mirrorball"], keywords: [] },
      {
        file: "missamericanaandtheheartbreakprince.mp3",
        answers: [
          "Miss Americana & The Heartbreak Prince",
          "Miss Americana and the Heartbreak Prince",
        ],
        keywords: [],
      },
      {
        file: "mytearsricochet.mp3",
        answers: ["My Tears Ricochet"],
        keywords: [],
      },
      { file: "nevergrowup.mp3", answers: ["Never Grow Up"], keywords: [] },
      { file: "ours.mp3", answers: ["Ours"], keywords: [] },
      { file: "oursong.mp3", answers: ["Our Song"], keywords: [] },
      { file: "paperrings.mp3", answers: ["Paper Rings"], keywords: [] },
      { file: "peace.mp3", answers: ["Peace"], keywords: [] },
      { file: "picturetoburn.mp3", answers: ["Picture to Burn"], keywords: [] },
      { file: "red.mp3", answers: ["Red"], keywords: [] },
      {
        file: "sadbeautifultragic.mp3",
        answers: ["Sad Beautiful Tragic"],
        keywords: [],
      },
      {
        file: "safeandsound.mp3",
        answers: ["Safe & Sound", "Safe and Sound"],
        keywords: [],
      },
      { file: "seven.mp3", answers: ["Seven"], keywords: [] },
      {
        file: "shouldvesaidno.mp3",
        answers: ["Should've Said No"],
        keywords: [],
      },
      {
        file: "soonyoullgetbetter.mp3",
        answers: ["Soon You'll Get Better"],
        keywords: [],
      },
      { file: "sparksfly.mp3", answers: ["Sparks Fly"], keywords: [] },
      { file: "speaknow.mp3", answers: ["Speak Now"], keywords: [] },
      { file: "starlight.mp3", answers: ["Starlight"], keywords: [] },
      { file: "stateofgrace.mp3", answers: ["State of Grace"], keywords: [] },
      { file: "staybeautiful.mp3", answers: ["Stay Beautiful"], keywords: [] },
      { file: "staystaystay.mp3", answers: ["Stay Stay Stay"], keywords: [] },
      { file: "superman.mp3", answers: ["Superman"], keywords: [] },
      { file: "superstar.mp3", answers: ["Superstar"], keywords: [] },
      {
        file: "teardropsonmyguitar.mp3",
        answers: ["Teardrops on My Guitar"],
        keywords: [],
      },
      { file: "tellmewhy.mp3", answers: ["Tell Me Why"], keywords: [] },
      { file: "the1.mp3", answers: ["The 1"], keywords: [] },
      { file: "thearcher.mp3", answers: ["The Archer"], keywords: [] },
      { file: "thebestday.mp3", answers: ["The Best Day"], keywords: [] },
      {
        file: "thelastgreatamericandynasty.mp3",
        answers: ["The Last Great American Dynasty"],
        keywords: [],
      },
      { file: "thelasttime.mp3", answers: ["The Last Time"], keywords: [] },
      { file: "theluckyone.mp3", answers: ["The Lucky One"], keywords: [] },
      { file: "theman.mp3", answers: ["The Man"], keywords: [] },
      {
        file: "themomentiknew.mp3",
        answers: ["The Moment I Knew"],
        keywords: [],
      },
      {
        file: "theothersideofthedoor.mp3",
        answers: ["The Other Side of the Door"],
        keywords: [],
      },
      { file: "theoutside.mp3", answers: ["The Outside"], keywords: [] },
      { file: "thestoryofus.mp3", answers: ["The Story of Us"], keywords: [] },
      {
        file: "thewayilovedyou.mp3",
        answers: ["The Way I Loved You"],
        keywords: [],
      },
      {
        file: "thisismetrying.mp3",
        answers: ["This Is Me Trying"],
        keywords: [],
      },
      {
        file: "tiedtogetherwithasmile.mp3",
        answers: ["Tied Together with a Smile"],
        keywords: [],
      },
      { file: "timemcgraw.mp3", answers: ["Tim McGraw"], keywords: [] },
      { file: "treacherous.mp3", answers: ["Treacherous"], keywords: [] },
      { file: "untouchable.mp3", answers: ["Untouchable"], keywords: [] },
      {
        file: "weareneverevergettingbacktogether.mp3",
        answers: ["We Are Never Ever Getting Back Together"],
        keywords: [],
      },
      { file: "whitehorse.mp3", answers: ["White Horse"], keywords: [] },
      {
        file: "youbelongwithme.mp3",
        answers: ["You Belong with Me"],
        keywords: [],
      },
      {
        file: "youneedtocalmdown.mp3",
        answers: ["You Need to Calm Down"],
        keywords: [],
      },
      {
        file: "yourenotsorry.mp3",
        answers: ["You're Not Sorry"],
        keywords: [],
      },
    ],
  },
  {
    id: "kahan",
    name: "Noah Kahan songs",
    nameSingular: "Noah Kahan song",
    leftImagePath: "../files/images/people/kahan1.jpeg",
    rightImagePath: "../files/images/people/kahan2.jpeg",
    folderPath: "../files/audio/kahan/",
    songs: [
      { file: "allmylove.mp3", answers: ["All My Love"], keywords: [] },
      { file: "callyourmom.mp3", answers: ["Call Your Mom"], keywords: [] },
      { file: "comeover.mp3", answers: ["Come Over"], keywords: [] },
      { file: "dialdrunk.mp3", answers: ["Dial Drunk"], keywords: [] },
      {
        file: "everywhereeverything.mp3",
        answers: ["Everywhere, Everything"],
        keywords: [],
      },
      { file: "forever.mp3", answers: ["Forever"], keywords: [] },
      {
        file: "growingsideways.mp3",
        answers: ["Growing Sideways"],
        keywords: [],
      },
      { file: "halloween.mp3", answers: ["Halloween"], keywords: [] },
      { file: "homesick.mp3", answers: ["Homesick"], keywords: [] },
      {
        file: "newperspective.mp3",
        answers: ["New Perspective"],
        keywords: [],
      },
      { file: "nocomplaints.mp3", answers: ["No Complaints"], keywords: [] },
      {
        file: "northernattitude.mp3",
        answers: ["Northern Attitude"],
        keywords: [],
      },
      { file: "orangejuice.mp3", answers: ["Orange Juice"], keywords: [] },
      { file: "paulrevere.mp3", answers: ["Paul Revere"], keywords: [] },
      {
        file: "shecallsmeback.mp3",
        answers: ["She Calls Me Back"],
        keywords: [],
      },
      { file: "stickseason.mp3", answers: ["Stick Season"], keywords: [] },
      { file: "still.mp3", answers: ["Still"], keywords: [] },
      {
        file: "strawberrywine.mp3",
        answers: ["Strawberry Wine"],
        keywords: [],
      },
      {
        file: "theviewbetweenvillages.mp3",
        answers: ["The View Between Villages"],
        keywords: [],
      },
      {
        file: "theviewbetweenvillagesextended.mp3",
        answers: ["The View Between Villages"],
        keywords: [],
      },
      {
        file: "youregonnagofar.mp3",
        answers: ["You're Gonna Go Far"],
        keywords: [],
      },
      {
        file: "yourneedsmyneeds.mp3",
        answers: ["Your Needs, My Needs"],
        keywords: [],
      },
    ],
  },
  {
    id: "redhotchilipeppers",
    name: "Red Hot Chili Peppers songs",
    nameSingular: "Red Hot Chili Peppers song",
    leftImagePath: "../files/images/people/redhotchilipeppers1.jpeg",
    rightImagePath: "../files/images/people/redhotchilipeppers2.jpeg",
    folderPath: "../files/audio/redhotchilipeppers/",
    songs: [
      { file: "aeroplane.mp3", answers: ["Aeroplane"], keywords: [] },
      {
        file: "aroundtheworld.mp3",
        answers: ["Around The World"],
        keywords: [],
      },
      { file: "blacksummer.mp3", answers: ["Black Summer"], keywords: [] },
      {
        file: "brendansdeathsong.mp3",
        answers: ["Brendan's Death Song"],
        keywords: [],
      },
      { file: "bytheway.mp3", answers: ["By the Way"], keywords: [] },
      {
        file: "californication.mp3",
        answers: ["Californication"],
        keywords: [],
      },
      { file: "cantstop.mp3", answers: ["Can't Stop"], keywords: [] },
      { file: "coffeeshop.mp3", answers: ["Coffee Shop"], keywords: [] },
      {
        file: "danicalifornia.mp3",
        answers: ["Dani California"],
        keywords: [],
      },
      {
        file: "darknecessities.mp3",
        answers: ["Dark Necessities"],
        keywords: [],
      },
      {
        file: "desecrationsmile.mp3",
        answers: ["Desecration Smile"],
        keywords: [],
      },
      { file: "dosed.mp3", answers: ["Dosed"], keywords: [] },
      {
        file: "fightlikeabrave.mp3",
        answers: ["Fight Like A Brave"],
        keywords: [],
      },
      { file: "fortunefaded.mp3", answers: ["Fortune Faded"], keywords: [] },
      { file: "getupjump.mp3", answers: ["Get Up & Jump"], keywords: [] },
      { file: "giveitaway.mp3", answers: ["Give It Away"], keywords: [] },
      { file: "goodbyeangels.mp3", answers: ["Goodbye Angels"], keywords: [] },
      { file: "gorobot.mp3", answers: ["Go Robot"], keywords: [] },
      { file: "higherground.mp3", answers: ["Higher Ground"], keywords: [] },
      {
        file: "hollywoodafrica.mp3",
        answers: ["Hollywood (Africa)"],
        keywords: [],
      },
      { file: "humpdebump.mp3", answers: ["Hump De Bump"], keywords: [] },
      {
        file: "ifyouhavetoask.mp3",
        answers: ["If You Have To Ask"],
        keywords: [],
      },
      { file: "jungleman.mp3", answers: ["Jungle Man"], keywords: [] },
      { file: "knockmedown.mp3", answers: ["Knock Me Down"], keywords: [] },
      { file: "lookaround.mp3", answers: ["Look Around"], keywords: [] },
      {
        file: "loverollercoaster.mp3",
        answers: ["Love Rollercoaster"],
        keywords: [],
      },
      {
        file: "monarchyofroses.mp3",
        answers: ["Monarchy of Roses"],
        keywords: [],
      },
      { file: "nottheone.mp3", answers: ["Not the One"], keywords: [] },
      { file: "otherside.mp3", answers: ["Otherside"], keywords: [] },
      { file: "posterchild.mp3", answers: ["Poster Child"], keywords: [] },
      { file: "roadtrippin.mp3", answers: ["Road Trippin'"], keywords: [] },
      { file: "scartissue.mp3", answers: ["Scar Tissue"], keywords: [] },
      {
        file: "showmeyoursoul.mp3",
        answers: ["Show Me Your Soul"],
        keywords: [],
      },
      { file: "snowheyoh.mp3", answers: ["Snow (Hey Oh)"], keywords: [] },
      { file: "suckmykiss.mp3", answers: ["Suck My Kiss"], keywords: [] },
      { file: "tastethepain.mp3", answers: ["Taste The Pain"], keywords: [] },
      { file: "tellmebaby.mp3", answers: ["Tell Me Baby"], keywords: [] },
      {
        file: "theadventuresofraindancemaggie.mp3",
        answers: ["The Adventures Of Rain Dance Maggie"],
        keywords: [],
      },
      {
        file: "thesearetheways.mp3",
        answers: ["These Are the Ways"],
        keywords: [],
      },
      { file: "thezephyrsong.mp3", answers: ["The Zephyr Song"], keywords: [] },
      {
        file: "underthebridge.mp3",
        answers: ["Under The Bridge"],
        keywords: [],
      },
      {
        file: "universallyspeaking.mp3",
        answers: ["Universally Speaking"],
        keywords: [],
      },
      { file: "warped.mp3", answers: ["Warped"], keywords: [] },
    ],
  },
  {
    id: "hamilton",
    name: "Hamilton songs",
    nameSingular: "Hamilton song",
    leftImagePath: "../files/images/people/hamilton1.jpeg",
    rightImagePath: "../files/images/people/hamilton2.jpeg",
    folderPath: "../files/audio/hamilton/",
    songs: [
      {
        file: "alexanderhamilton.mp3",
        answers: ["Alexander Hamilton"],
        keywords: [],
      },
      { file: "aaronburrsir.mp3", answers: ["Aaron Burr, Sir"], keywords: [] },
      { file: "myshot.mp3", answers: ["My Shot"], keywords: [] },
      {
        file: "thestoryoftonight.mp3",
        answers: ["The Story of Tonight"],
        keywords: [],
      },
      {
        file: "theschuylersisters.mp3",
        answers: ["The Schuyler Sisters"],
        keywords: [],
      },
      { file: "farmerrefuted.mp3", answers: ["Farmer Refuted"], keywords: [] },
      { file: "youllbeback.mp3", answers: ["You'll Be Back"], keywords: [] },
      { file: "righthandman.mp3", answers: ["Right Hand Man"], keywords: [] },
      { file: "awintersball.mp3", answers: ["A Winter's Ball"], keywords: [] },
      { file: "helpless.mp3", answers: ["Helpless"], keywords: [] },
      { file: "satisfied.mp3", answers: ["Satisfied"], keywords: [] },
      {
        file: "thestoryoftonightreprise.mp3",
        answers: ["The Story of Tonight (Reprise)"],
        keywords: [],
      },
      { file: "waitforit.mp3", answers: ["Wait For It"], keywords: [] },
      { file: "stayalive.mp3", answers: ["Stay Alive"], keywords: [] },
      {
        file: "tenduelcommandments.mp3",
        answers: ["Ten Duel Commandments"],
        keywords: [],
      },
      { file: "meetmeinside.mp3", answers: ["Meet Me Inside"], keywords: [] },
      {
        file: "thatwouldbeenough.mp3",
        answers: ["That Would Be Enough"],
        keywords: [],
      },
      { file: "gunsandships.mp3", answers: ["Guns and Ships"], keywords: [] },
      {
        file: "historyhasitseyesonyou.mp3",
        answers: ["History Has Its Eyes On You"],
        keywords: [],
      },
      {
        file: "yorktowntheworldturnedupsidedown.mp3",
        answers: ["Yorktown (The World Turned Upside Down)"],
        keywords: [],
      },
      {
        file: "whatcomesnext.mp3",
        answers: ["What Comes Next?"],
        keywords: [],
      },
      { file: "deartheodosia.mp3", answers: ["Dear Theodosia"], keywords: [] },
      { file: "nonstop.mp3", answers: ["Non-Stop"], keywords: [] },
      { file: "whatdimiss.mp3", answers: ["What'd I Miss"], keywords: [] },
      {
        file: "cabinetbattle1.mp3",
        answers: ["Cabinet Battle #1"],
        keywords: [],
      },
      { file: "takeabreak.mp3", answers: ["Take a Break"], keywords: [] },
      { file: "saynotothis.mp3", answers: ["Say No To This"], keywords: [] },
      {
        file: "theroomwhereithappens.mp3",
        answers: ["The Room Where It Happens"],
        keywords: [],
      },
      {
        file: "schuylerdefeated.mp3",
        answers: ["Schuyler Defeated"],
        keywords: [],
      },
      {
        file: "cabinetbattle2.mp3",
        answers: ["Cabinet Battle #2"],
        keywords: [],
      },
      {
        file: "washingtononyourside.mp3",
        answers: ["Washington On Your Side"],
        keywords: [],
      },
      { file: "onelasttime.mp3", answers: ["One Last Time"], keywords: [] },
      { file: "iknowhim.mp3", answers: ["I Know Him"], keywords: [] },
      {
        file: "theadamsadministration.mp3",
        answers: ["The Adams Administration"],
        keywords: [],
      },
      { file: "weknow.mp3", answers: ["We Know"], keywords: [] },
      { file: "hurricane.mp3", answers: ["Hurricane"], keywords: [] },
      {
        file: "thereynoldspamphlet.mp3",
        answers: ["The Reynolds Pamphlet"],
        keywords: [],
      },
      { file: "burn.mp3", answers: ["Burn"], keywords: [] },
      {
        file: "blowusallaway.mp3",
        answers: ["Blow Us All Away"],
        keywords: [],
      },
      {
        file: "stayalivereprise.mp3",
        answers: ["Stay Alive (Reprise)"],
        keywords: [],
      },
      {
        file: "itsquietuptown.mp3",
        answers: ["It's Quiet Uptown"],
        keywords: [],
      },
      {
        file: "theelectionof1800.mp3",
        answers: ["The Election Of 1800"],
        keywords: [],
      },
      {
        file: "yourobedientservant.mp3",
        answers: ["Your Obedient Servant"],
        keywords: [],
      },
      {
        file: "bestofwivesandbestofwomen.mp3",
        answers: ["Best of Wives and Best of Women"],
        keywords: [],
      },
      {
        file: "theworldwaswideenough.mp3",
        answers: ["The World Was Wide Enough"],
        keywords: [],
      },
      {
        file: "wholiveswhodieswhotellsyourstory.mp3",
        answers: ["Who Lives, Who Dies, Who Tells Your Story"],
        keywords: [],
      },
    ],
  },
  {
    id: "wicked",
    name: "Wicked songs",
    nameSingular: "Wicked song",
    leftImagePath: "../files/images/people/wicked1.jpeg",
    rightImagePath: "../files/images/people/wicked2.jpeg",
    folderPath: "../files/audio/wicked/",
    songs: [
      {
        file: "noonemournsthewicked.mp3",
        answers: ["No One Mourns the Wicked"],
        keywords: [],
      },
      { file: "dearoldshiz.mp3", answers: ["Dear Old Shiz"], keywords: [] },
      {
        file: "thewizardandi.mp3",
        answers: ["The Wizard and I"],
        keywords: [],
      },
      {
        file: "whatisthisfeeling.mp3",
        answers: ["What Is This Feeling"],
        keywords: [],
      },
      { file: "somethingbad.mp3", answers: ["Something Bad"], keywords: [] },
      {
        file: "dancingthroughlife.mp3",
        answers: ["Dancing Through Life"],
        keywords: [],
      },
      { file: "popular.mp3", answers: ["Popular"], keywords: [] },
      {
        file: "imnotthatgirl.mp3",
        answers: ["I'm Not That Girl"],
        keywords: [],
      },
      { file: "oneshortday.mp3", answers: ["One Short Day"], keywords: [] },
      {
        file: "asentimentalman.mp3",
        answers: ["A Sentimental Man"],
        keywords: [],
      },
      {
        file: "defyinggravity.mp3",
        answers: ["Defying Gravity"],
        keywords: [],
      },
      { file: "thankgoodness.mp3", answers: ["Thank Goodness"], keywords: [] },
      { file: "wonderful.mp3", answers: ["Wonderful"], keywords: [] },
      {
        file: "imnotthatgirlreprise.mp3",
        answers: ["I'm Not That Girl (Reprise)"],
        keywords: [],
      },
      {
        file: "aslongasyouremine.mp3",
        answers: ["As Long As You're Mine"],
        keywords: [],
      },
      { file: "nogooddeed.mp3", answers: ["No Good Deed"], keywords: [] },
      {
        file: "marchofthewitchhunters.mp3",
        answers: ["March of the Witch Hunters"],
        keywords: [],
      },
      { file: "forgood.mp3", answers: ["For Good"], keywords: [] },
      { file: "finale.mp3", answers: ["Finale"], keywords: [] },
    ],
  },
  {
    id: "greatestshowman",
    name: "Greatest Showman songs",
    nameSingular: "Greatest Showman song",
    leftImagePath: "../files/images/people/greatestshowman1.jpeg",
    rightImagePath: "../files/images/people/greatestshowman2.jpeg",
    folderPath: "../files/audio/greatestshowman/",
    songs: [
      {
        file: "amilliondreams.mp3",
        answers: ["A Million Dreams"],
        keywords: [],
      },
      { file: "comealive.mp3", answers: ["Come Alive"], keywords: [] },
      { file: "fromnowon.mp3", answers: ["From Now On"], keywords: [] },
      { file: "neverenough.mp3", answers: ["Never Enough"], keywords: [] },
      {
        file: "rewritethestars.mp3",
        answers: ["Rewrite the Stars"],
        keywords: [],
      },
      {
        file: "thegreatestshow.mp3",
        answers: ["The Greatest Show"],
        keywords: [],
      },
      { file: "theotherside.mp3", answers: ["The Other Side"], keywords: [] },
      { file: "thisisme.mp3", answers: ["This Is Me"], keywords: [] },
      { file: "tightrope.mp3", answers: ["Tightrope"], keywords: [] },
    ],
  },
  {
    id: "frozen",
    name: "Frozen songs",
    nameSingular: "Frozen song",
    leftImagePath: "../files/images/people/olaf.jpeg",
    rightImagePath: "../files/images/people/elsaandanna.jpeg",
    folderPath: "../files/audio/frozen/",
    songs: [
      { file: "frozenheart.mp3", answers: ["Frozen Heart"], keywords: [] },
      {
        file: "doyouwanttobuildasnowman.mp3",
        answers: ["Do You Want to Build a Snowman"],
        keywords: [],
      },
      {
        file: "forthefirsttimeinforever.mp3",
        answers: ["For the First Time in Forever"],
        keywords: [],
      },
      {
        file: "loveisanopendoor.mp3",
        answers: ["Love Is an Open Door"],
        keywords: [],
      },
      { file: "letitgo.mp3", answers: ["Let It Go"], keywords: [] },
      {
        file: "reindeersarebetterthanpeople.mp3",
        answers: ["Reindeer(s) Are Better Than People"],
        keywords: [],
      },
      { file: "insummer.mp3", answers: ["In Summer"], keywords: [] },
      {
        file: "forthefirsttimeinforeverreprise.mp3",
        answers: ["For the First Time in Forever (reprise)"],
        keywords: [],
      },
      { file: "fixerupper.mp3", answers: ["Fixer Upper"], keywords: [] },
    ],
  },
  {
    id: "beatles",
    name: "Beatles songs",
    nameSingular: "Beatles song",
    leftImagePath: "../files/images/people/beatles1.jpeg",
    rightImagePath: "../files/images/people/beatles2.jpeg",
    folderPath: "../files/audio/beatles/",
    songs: [
      {
        file: "adayinthelife.mp3",
        answers: ["A Day In The Life"],
        keywords: [],
      },
      { file: "andiloveher.mp3", answers: ["And I Love Her"], keywords: [] },
      { file: "blackbird.mp3", answers: ["Blackbird"], keywords: [] },
      { file: "cometogether.mp3", answers: ["Come Together"], keywords: [] },
      { file: "daytripper.mp3", answers: ["Day Tripper"], keywords: [] },
      {
        file: "dontletmedown.mp3",
        answers: ["Don't Let Me Down"],
        keywords: [],
      },
      { file: "eleanorrigby.mp3", answers: ["Eleanor Rigby"], keywords: [] },
      { file: "hellogoodbye.mp3", answers: ["Hello, Goodbye"], keywords: [] },
      { file: "help.mp3", answers: ["Help!"], keywords: [] },
      {
        file: "herecomesthesun.mp3",
        answers: ["Here Comes The Sun"],
        keywords: [],
      },
      { file: "heyjude.mp3", answers: ["Hey Jude"], keywords: [] },
      { file: "inmylife.mp3", answers: ["In My Life"], keywords: [] },
      {
        file: "iwanttoholdyourhand.mp3",
        answers: ["I Want To Hold Your Hand"],
        keywords: [],
      },
      { file: "letitbe.mp3", answers: ["Let It Be"], keywords: [] },
      { file: "lovemedo.mp3", answers: ["Love Me Do"], keywords: [] },
      {
        file: "lucyintheskywithdiamonds.mp3",
        answers: ["Lucy In The Sky With Diamonds"],
        keywords: [],
      },
      {
        file: "obladioblada.mp3",
        answers: ["Ob-La-Di, Ob-La-Da"],
        keywords: [],
      },
      { file: "pennylane.mp3", answers: ["Penny Lane"], keywords: [] },
      { file: "something.mp3", answers: ["Something"], keywords: [] },
      {
        file: "strawberryfieldsforever.mp3",
        answers: ["Strawberry Fields Forever"],
        keywords: [],
      },
      {
        file: "thelongandwindingroad.mp3",
        answers: ["The Long And Winding Road"],
        keywords: [],
      },
      { file: "twistandshout.mp3", answers: ["Twist And Shout"], keywords: [] },
      {
        file: "whilemyguitargentlyweeps.mp3",
        answers: ["While My Guitar Gently Weeps"],
        keywords: [],
      },
      {
        file: "yellowsubmarine.mp3",
        answers: ["Yellow Submarine"],
        keywords: [],
      },
      { file: "yesterday.mp3", answers: ["Yesterday"], keywords: [] },
    ],
  },
  {
    id: "abba",
    name: "ABBA songs",
    nameSingular: "ABBA song",
    leftImagePath: "../files/images/people/abba1.jpeg",
    rightImagePath: "../files/images/people/abba2.jpeg",
    folderPath: "../files/audio/abba/",
    songs: [
      { file: "iamjustagirl.mp3", answers: ["I Am Just a Girl"], keywords: [] },
      {
        file: "idoidoidoidoido.mp3",
        answers: ["I Do, I Do, I Do, I Do, I Do"],
        keywords: [],
      },
      {
        file: "iletthemusicspeak.mp3",
        answers: ["I Let The Music Speak"],
        keywords: [],
      },
      {
        file: "isawitinthemirror.mp3",
        answers: ["I Saw It In The Mirror"],
        keywords: [],
      },
      {
        file: "iwonderdeparture.mp3",
        answers: ["I Wonder (Departure)"],
        keywords: [],
      },
      {
        file: "ivebeenwaitingforyou.mp3",
        answers: ["I've Been Waiting For You"],
        keywords: [],
      },
      {
        file: "imamarionette.mp3",
        answers: ["I'm a Marionette"],
        keywords: [],
      },
      {
        file: "ifitwasntforthenights.mp3",
        answers: ["If It Wasn't For The Nights"],
        keywords: [],
      },
      {
        file: "intermezzono1.mp3",
        answers: ["Intermezzo No. 1"],
        keywords: [],
      },
      {
        file: "kingkongsongabba.mp3",
        answers: ["King Kong Song"],
        keywords: [],
      },
      {
        file: "knowingmeknowingyou.mp3",
        answers: ["Knowing Me, Knowing You"],
        keywords: [],
      },
      {
        file: "layallyourloveonme.mp3",
        answers: ["Lay All Your Love On Me"],
        keywords: [],
      },
      {
        file: "likeanangelpassingthroughmyroom.mp3",
        answers: ["Like An Angel Passing Through My Room"],
        keywords: [],
      },
      {
        file: "loveisnteasybutitsureishardenough.mp3",
        answers: ["Love Isn't Easy (But It Sure Is Hard Enough)"],
        keywords: [],
      },
      {
        file: "loverslivealittlelonger.mp3",
        answers: ["Lovers (Live A Little Longer)"],
        keywords: [],
      },
      { file: "mammamia.mp3", answers: ["Mamma Mia"], keywords: [] },
      {
        file: "maninthemiddle.mp3",
        answers: ["Man in the Middle"],
        keywords: [],
      },
      { file: "meandi.mp3", answers: ["Me and I"], keywords: [] },
      {
        file: "moneymoneymoney.mp3",
        answers: ["Money, Money, Money"],
        keywords: [],
      },
      { file: "moveon.mp3", answers: ["Move On"], keywords: [] },
      { file: "mylovemylife.mp3", answers: ["My Love, My Life"], keywords: [] },
      { file: "mymamasaid.mp3", answers: ["My Mama Said"], keywords: [] },
      {
        file: "ninaprettyballerina.mp3",
        answers: ["Nina, Pretty Ballerina"],
        keywords: [],
      },
      { file: "onandonandon.mp3", answers: ["On And On And On"], keywords: [] },
      {
        file: "onemanonewoman.mp3",
        answers: ["One Man, One Woman"],
        keywords: [],
      },
      { file: "oneofus.mp3", answers: ["One Of Us"], keywords: [] },
    ],
  },
  {
    id: "queen",
    name: "Queen songs",
    nameSingular: "Queen song",
    leftImagePath: "../files/images/people/queen1.jpeg",
    rightImagePath: "../files/images/people/queen2.jpeg",
    folderPath: "../files/audio/queen/",
    songs: [
      { file: "akindofmagic.mp3", answers: ["A Kind Of Magic"], keywords: [] },
      {
        file: "anotheronebitesthedust.mp3",
        answers: ["Another One Bites the Dust"],
        keywords: [],
      },
      { file: "barcelona.mp3", answers: ["Barcelona"], keywords: [] },
      { file: "bicyclerace.mp3", answers: ["Bicycle Race"], keywords: [] },
      {
        file: "bohemianrhapsody.mp3",
        answers: ["Bohemian Rhapsody"],
        keywords: [],
      },
      { file: "breakthru.mp3", answers: ["Breakthru"], keywords: [] },
      {
        file: "crazylittlethingcalledlove.mp3",
        answers: ["Crazy Little Thing Called Love"],
        keywords: [],
      },
      {
        file: "dontstopmenow.mp3",
        answers: ["Don't Stop Me Now"],
        keywords: [],
      },
      { file: "drivenbyyou.mp3", answers: ["Driven By You"], keywords: [] },
      {
        file: "fatbottomedgirls.mp3",
        answers: ["Fat Bottomed Girls"],
        keywords: [],
      },
      { file: "flash.mp3", answers: ["Flash"], keywords: [] },
      {
        file: "friendswillbefriends.mp3",
        answers: ["Friends Will Be Friends"],
        keywords: [],
      },
      {
        file: "goodoldfashionedloverboy.mp3",
        answers: ["Good Old-Fashioned Lover Boy"],
        keywords: [],
      },
      { file: "hammertofall.mp3", answers: ["Hammer To Fall"], keywords: [] },
      { file: "headlong.mp3", answers: ["Headlong"], keywords: [] },
      {
        file: "heavenforeveryone.mp3",
        answers: ["Heaven For Everyone"],
        keywords: [],
      },
      {
        file: "imgoingslightlymad.mp3",
        answers: ["I'm Going Slightly Mad"],
        keywords: [],
      },
      { file: "innuendo.mp3", answers: ["Innuendo"], keywords: [] },
      { file: "itsahardlife.mp3", answers: ["It's A Hard Life"], keywords: [] },
      { file: "iwantitall.mp3", answers: ["I Want It All"], keywords: [] },
      {
        file: "iwanttobreakfree.mp3",
        answers: ["I Want To Break Free"],
        keywords: [],
      },
      { file: "jealousy.mp3", answers: ["Jealousy"], keywords: [] },
      {
        file: "keepyourselfalive.mp3",
        answers: ["Keep Yourself Alive"],
        keywords: [],
      },
      { file: "killerqueen.mp3", answers: ["Killer Queen"], keywords: [] },
      {
        file: "laspalabrasdeamorthewordsoflove.mp3",
        answers: ["Las Palabras De Amor", "The Words Of Love"],
        keywords: [],
      },
      { file: "letmelive.mp3", answers: ["Let Me Live"], keywords: [] },
      {
        file: "livingonmyown.mp3",
        answers: ["Living On My Own"],
        keywords: [],
      },
      { file: "loveofmylife.mp3", answers: ["Love Of My Life"], keywords: [] },
      { file: "noonebutyou.mp3", answers: ["No One But You"], keywords: [] },
      { file: "nowimhere.mp3", answers: ["Now I'm Here"], keywords: [] },
      { file: "onevision.mp3", answers: ["One Vision"], keywords: [] },
      {
        file: "oneyearoflove.mp3",
        answers: ["One Year Of Love"],
        keywords: [],
      },
      { file: "playthegame.mp3", answers: ["Play The Game"], keywords: [] },
      { file: "radiogaga.mp3", answers: ["Radio Ga Ga"], keywords: [] },
      { file: "saveme.mp3", answers: ["Save Me"], keywords: [] },
      {
        file: "sevenseasofrhye.mp3",
        answers: ["Seven Seas Of Rhye"],
        keywords: [],
      },
      {
        file: "somebodytolove.mp3",
        answers: ["Somebody to Love"],
        keywords: [],
      },
      {
        file: "thankgoditschristmas.mp3",
        answers: ["Thank God It's Christmas"],
        keywords: [],
      },
      {
        file: "thegreatpretender.mp3",
        answers: ["The Great Pretender"],
        keywords: [],
      },
      {
        file: "theinvisibleman.mp3",
        answers: ["The Invisible Man"],
        keywords: [],
      },
      { file: "themiracle.mp3", answers: ["The Miracle"], keywords: [] },
      {
        file: "theprophetssong.mp3",
        answers: ["The Prophet's Song"],
        keywords: [],
      },
      {
        file: "thesearethedaysofourlives.mp3",
        answers: ["These Are The Days Of Our Lives"],
        keywords: [],
      },
      {
        file: "theshowmustgoon.mp3",
        answers: ["The Show Must Go On"],
        keywords: [],
      },
      {
        file: "toomuchlovewillkillyou.mp3",
        answers: ["Too Much Love Will Kill You"],
        keywords: [],
      },
      { file: "underpressure.mp3", answers: ["Under Pressure"], keywords: [] },
      {
        file: "wearethechampionslyrics.mp3",
        answers: ["We Are The Champions"],
        keywords: [],
      },
      {
        file: "wewillrockyou.mp3",
        answers: ["We Will Rock You"],
        keywords: [],
      },
      {
        file: "whowantstoliveforever.mp3",
        answers: ["Who Wants To Live Forever"],
        keywords: [],
      },
      { file: "youandi.mp3", answers: ["You and I"], keywords: [] },
      {
        file: "youdontfoolme.mp3",
        answers: ["You Don't Fool Me"],
        keywords: [],
      },
      {
        file: "youremybestfriend.mp3",
        answers: ["You're My Best Friend"],
        keywords: [],
      },
      {
        file: "youtakemybreathaway.mp3",
        answers: ["You Take My Breath Away"],
        keywords: [],
      },
      { file: "youandi.mp3", answers: ["You and I"], keywords: [] },
      {
        file: "youremybestfriend.mp3",
        answers: ["You're My Best Friend"],
        keywords: [],
      },
      {
        file: "youtakemybreathaway.mp3",
        answers: ["Crazy Little Thing Called Love"],
        keywords: [],
      },
    ],
  },
  {
    id: "grande",
    name: "Ariana Grande songs",
    nameSingular: "Ariana Grande song",
    leftImagePath: "../files/images/people/grande1.jpeg",
    rightImagePath: "../files/images/people/grande2.jpeg",
    folderPath: "../files/audio/grande/",
    songs: [
      { file: "baddecisions.mp3", answers: ["Bad Decisions"], keywords: [] },
      { file: "bangbang.mp3", answers: ["Bang Bang"], keywords: [] },
      { file: "bealright.mp3", answers: ["Be Alright"], keywords: [] },
      { file: "bedftnickiminaj.mp3", answers: ["Bed"], keywords: [] },
      { file: "breakfreeftzedd.mp3", answers: ["Break Free"], keywords: [] },
      { file: "focus.mp3", answers: ["Focus"], keywords: [] },
      { file: "godisawoman.mp3", answers: ["God is a woman"], keywords: [] },
      { file: "greedy.mp3", answers: ["Greedy"], keywords: [] },
      {
        file: "handsonmeftasapferg.mp3",
        answers: ["Hands On Me"],
        keywords: [],
      },
      { file: "idontcare.mp3", answers: ["I Don't Care"], keywords: [] },
      { file: "lastchristmas.mp3", answers: ["Last Christmas"], keywords: [] },
      {
        file: "letmeloveyouftlilwayne.mp3",
        answers: ["Let Me Love You"],
        keywords: [],
      },
      { file: "moonlight.mp3", answers: ["Moonlight"], keywords: [] },
      { file: "myeverything.mp3", answers: ["My Everything"], keywords: [] },
      {
        file: "notearslefttocry.mp3",
        answers: ["No Tears Left To Cry"],
        keywords: [],
      },
      { file: "problemftiggyazalea.mp3", answers: ["Problem"], keywords: [] },
      { file: "santatellme.mp3", answers: ["Santa Tell Me"], keywords: [] },
      { file: "sidetoside.mp3", answers: ["Side to Side"], keywords: [] },
      { file: "steponup.mp3", answers: ["Step On Up"], keywords: [] },
      { file: "tattooedheart.mp3", answers: ["Tattooed Heart"], keywords: [] },
      { file: "thankunext.mp3", answers: ["Thank u, next"], keywords: [] },
      {
        file: "thelightiscomingftnickiminaj.mp3",
        answers: ["The light is coming"],
        keywords: [],
      },
      { file: "touchit.mp3", answers: ["Touch It"], keywords: [] },
    ],
  },
  {
    id: "mendes",
    name: "Shawn Mendes songs",
    nameSingular: "Shawn Mendes song",
    leftImagePath: "../files/images/people/mendes1.jpeg",
    rightImagePath: "../files/images/people/mendes2.jpeg",
    folderPath: "../files/audio/mendes/",
    songs: [
      { file: "24hours.mp3", answers: ["24 Hours"], keywords: [] },
      { file: "305.mp3", answers: ["305"], keywords: [] },
      { file: "aftertaste.mp3", answers: ["Aftertaste"], keywords: [] },
      {
        file: "airfeatastrids.mp3",
        answers: ["Air", "Air (feat. Astrid S)"],
        keywords: [],
      },
      {
        file: "alittletoomuch.mp3",
        answers: ["A Little Too Much"],
        keywords: [],
      },
      { file: "alwaysbeenyou.mp3", answers: ["Always Been You"], keywords: [] },
      { file: "badreputation.mp3", answers: ["Bad Reputation"], keywords: [] },
      {
        file: "becauseihadyou.mp3",
        answers: ["Because I Had You"],
        keywords: [],
      },
      { file: "bringitback.mp3", answers: ["Bring It Back"], keywords: [] },
      { file: "callmyfriends.mp3", answers: ["Call My Friends"], keywords: [] },
      { file: "cantimagine.mp3", answers: ["Can't Imagine"], keywords: [] },
      { file: "crazy.mp3", answers: ["Crazy"], keywords: [] },
      { file: "dontbeafool.mp3", answers: ["Don't Be a Fool"], keywords: [] },
      {
        file: "dontwantyourlove.mp3",
        answers: ["Don't Want Your Love"],
        keywords: [],
      },
      { file: "dream.mp3", answers: ["Dream"], keywords: [] },
      {
        file: "fallinallinyou.mp3",
        answers: ["Fallin' All In You"],
        keywords: [],
      },
      { file: "higher.mp3", answers: ["Higher"], keywords: [] },
      { file: "holdon.mp3", answers: ["Hold On"], keywords: [] },
      { file: "honest.mp3", answers: ["Honest"], keywords: [] },
      {
        file: "idontevenknowyourname.mp3",
        answers: ["I Don't Even Know Your Name"],
        keywords: [],
      },
      {
        file: "ificanthaveyou.mp3",
        answers: ["If I Can't Have You"],
        keywords: [],
      },
      { file: "imagination.mp3", answers: ["Imagination"], keywords: [] },
      { file: "inmyblood.mp3", answers: ["In My Blood"], keywords: [] },
      { file: "intro.mp3", answers: ["Intro"], keywords: [] },
      { file: "kidinlove.mp3", answers: ["Kid In Love"], keywords: [] },
      {
        file: "lifeoftheparty.mp3",
        answers: ["Life of the Party"],
        keywords: [],
      },
      { file: "lightson.mp3", answers: ["Lights On"], keywords: [] },
      { file: "likethis.mp3", answers: ["Like This"], keywords: [] },
      {
        file: "liketobeyoufeatjuliamichaels.mp3",
        answers: ["Like to Be You", "Like to Be You (feat. Julia Michaels)"],
        keywords: [],
      },
      {
        file: "lookupatthestars.mp3",
        answers: ["Look Up at the Stars"],
        keywords: [],
      },
      { file: "lost.mp3", answers: ["Lost"], keywords: [] },
      { file: "lostinjapan.mp3", answers: ["Lost in Japan"], keywords: [] },
      { file: "mercy.mp3", answers: ["Mercy"], keywords: [] },
      {
        file: "monsterftjustinbieber.mp3",
        answers: ["Monster", "Monster (feat. Justin Bieber)"],
        keywords: [],
      },
      { file: "mutual.mp3", answers: ["Mutual"], keywords: [] },
      { file: "nervous.mp3", answers: ["Nervous"], keywords: [] },
      { file: "neverbealone.mp3", answers: ["Never Be Alone"], keywords: [] },
      { file: "nopromises.mp3", answers: ["No Promises"], keywords: [] },
      {
        file: "oneofthosenights.mp3",
        answers: ["One of Those Nights"],
        keywords: [],
      },
      {
        file: "particulartaste.mp3",
        answers: ["Particular Taste"],
        keywords: [],
      },
      { file: "patience.mp3", answers: ["Patience"], keywords: [] },
      {
        file: "perfectlywrong.mp3",
        answers: ["Perfectly Wrong"],
        keywords: [],
      },
      { file: "pieceofyou.mp3", answers: ["Piece of You"], keywords: [] },
      { file: "queen.mp3", answers: ["Queen"], keywords: [] },
      { file: "roses.mp3", answers: ["Roses"], keywords: [] },
      { file: "ruin.mp3", answers: ["Ruin"], keywords: [] },
      {
        file: "senoritaftcamilacabello.mp3",
        answers: ["Señorita", "Señorita (feat. Camila Cabello)", "Senorita"],
        keywords: [],
      },
      { file: "showyou.mp3", answers: ["Show You"], keywords: [] },
      { file: "somethingbig.mp3", answers: ["Something Big"], keywords: [] },
      { file: "songfornoone.mp3", answers: ["Song for No One"], keywords: [] },
      { file: "stitches.mp3", answers: ["Stitches"], keywords: [] },
      { file: "strings.mp3", answers: ["Strings"], keywords: [] },
      {
        file: "teachmehowtolove.mp3",
        answers: ["Teach Me How to Love"],
        keywords: [],
      },
      {
        file: "theresnothingholdinmeback.mp3",
        answers: ["There's Nothing Holdin' Me Back"],
        keywords: [],
      },
      { file: "theweight.mp3", answers: ["The Weight"], keywords: [] },
      {
        file: "thisiswhatittakes.mp3",
        answers: ["This Is What It Takes"],
        keywords: [],
      },
      {
        file: "threeemptywords.mp3",
        answers: ["Three Empty Words"],
        keywords: [],
      },
      {
        file: "treatyoubetter.mp3",
        answers: ["Treat You Better"],
        keywords: [],
      },
      { file: "understand.mp3", answers: ["Understand"], keywords: [] },
      {
        file: "whenyoureready.mp3",
        answers: ["When You're Ready"],
        keywords: [],
      },
      {
        file: "wherewereyouinthemorning.mp3",
        answers: ["Where Were You in the Morning?"],
        keywords: [],
      },
      { file: "why.mp3", answers: ["Why"], keywords: [] },
      { file: "wonder.mp3", answers: ["Wonder"], keywords: [] },
      {
        file: "youthfeatkhalid.mp3",
        answers: ["Youth", "Youth (feat. Khalid)"],
        keywords: [],
      },
    ],
  },
  {
    id: "marx",
    name: "Richard Marx songs",
    nameSingular: "Richard Marx song",
    leftImagePath: "../files/images/people/marx1.jpeg",
    rightImagePath: "../files/images/people/marx2.jpeg",
    folderPath: "../files/audio/marx/",
    songs: [
      { file: "angelslullaby.mp3", answers: ["Angel's Lullaby"], keywords: [] },
      { file: "anglia.mp3", answers: ["Angelia"], keywords: [] },
      {
        file: "canthelpfallinginlove.mp3",
        answers: ["Can't Help Falling In Love"],
        keywords: [],
      },
      {
        file: "chainsaroundmyheart.mp3",
        answers: ["Chains Around My Heart"],
        keywords: [],
      },
      {
        file: "endlesssummernights.mp3",
        answers: ["Endless Summer Nights"],
        keywords: [],
      },
      { file: "hazard.mp3", answers: ["Hazard"], keywords: [] },
      {
        file: "holdontothenights.mp3",
        answers: ["Hold On To The Nights"],
        keywords: [],
      },
      {
        file: "illneverfallinloveagain.mp3",
        answers: ["I'll Never Fall In Love Again"],
        keywords: [],
      },
      { file: "nowandforever.mp3", answers: ["Now And Forever"], keywords: [] },
      {
        file: "rightherewaiting.mp3",
        answers: ["Right Here Waiting"],
        keywords: [],
      },
      { file: "silentscream.mp3", answers: ["Silent Scream"], keywords: [] },
      { file: "slippingaway.mp3", answers: ["Slipping Away"], keywords: [] },
      { file: "thankstoyou.mp3", answers: ["Thanks To You"], keywords: [] },
      {
        file: "untilifindyouagain.mp3",
        answers: ["Until I Find You Again"],
        keywords: [],
      },
    ],
  },
  {
    id: "chopinetudes",
    name: "Chopin Etudes",
    nameSingular: "Chopin Etude",
    leftImagePath: "../files/images/people/chopin.jpeg",
    rightImagePath: "../files/images/people/cortot.jpeg",
    folderPath: "../files/audio/chopin/",
    songs: [
      {
        file: "op10no1incmajor.mp3",
        answers: ["Op. 10 No. 1 in C Major"],
        keywords: ["Waterfall"],
      },
      {
        file: "op10no2inaminor.mp3",
        answers: ["Op. 10 No. 2 in A Minor"],
        keywords: ["Chromatic"],
      },
      {
        file: "op10no3inemajor.mp3",
        answers: ["Op. 10 No. 3 in E Major"],
        keywords: ["Tristesse", "Farewell"],
      },
      {
        file: "op10no4incsharpminor.mp3",
        answers: ["Op. 10 No. 4 in C-sharp Minor"],
        keywords: ["Torrent"],
      },
      {
        file: "op10no5ingflatmajor.mp3",
        answers: ["Op. 10 No. 5 in G-flat Major"],
        keywords: ["Black Keys"],
      },
      {
        file: "op10no6ineflatminor.mp3",
        answers: ["Op. 10 No. 6 in E-flat Minor"],
        keywords: ["Lament"],
      },
      {
        file: "op10no7incmajor.mp3",
        answers: ["Op. 10 No. 7 in C Major"],
        keywords: ["Toccata"],
      },
      {
        file: "op10no8infmajor.mp3",
        answers: ["Op. 10 No. 8 in F Major"],
        keywords: ["Sunshine"],
      },
      {
        file: "op10no9infminor.mp3",
        answers: ["Op. 10 No. 9 in F Minor"],
        keywords: [],
      },
      {
        file: "op10no10inaflatmajor.mp3",
        answers: ["Op. 10 No. 10 in A-flat Major"],
        keywords: [],
      },
      {
        file: "op10no11ineflatmajor.mp3",
        answers: ["Op. 10 No. 11 in E-flat Major"],
        keywords: ["Arpeggio"],
      },
      {
        file: "op10no12incminor.mp3",
        answers: ["Op. 10 No. 12 in C Minor"],
        keywords: ["Revolutionary"],
      },
      {
        file: "op25no1inaflatmajor.mp3",
        answers: ["Op. 25 No. 1 in A-flat Major"],
        keywords: ["Aeolian Harp", "Shepherd Boy"],
      },
      {
        file: "op25no2infminor.mp3",
        answers: ["Op. 25 No. 2 in F Minor"],
        keywords: ["Bees", "The Bees"],
      },
      {
        file: "op25no3infmajor.mp3",
        answers: ["Op. 25 No. 3 in F Major"],
        keywords: ["The Horseman", "Cartwheel"],
      },
      {
        file: "op25no4inaminor.mp3",
        answers: ["Op. 25 No. 4 in A Minor"],
        keywords: [],
      },
      {
        file: "op25no5ineminor.mp3",
        answers: ["Op. 25 No. 5 in E Minor"],
        keywords: ["Wrong Note"],
      },
      {
        file: "op25no6ingsharpminor.mp3",
        answers: ["Op. 25 No. 6 in G-sharp Minor"],
        keywords: ["Thirds"],
      },
      {
        file: "op25no7incsharpminor.mp3",
        answers: ["Op. 25 No. 7 in C-sharp Minor"],
        keywords: ["Cello"],
      },
      {
        file: "op25no8indflatmajor.mp3",
        answers: ["Op. 25 No. 8 in D-flat Major"],
        keywords: ["Sixths"],
      },
      {
        file: "op25no9ingflatmajor.mp3",
        answers: ["Op. 25 No. 9 in G-flat Major"],
        keywords: ["Butterfly"],
      },
      {
        file: "op25no10inbminor.mp3",
        answers: ["Op. 25 No. 10 in B Minor"],
        keywords: ["Octaves"],
      },
      {
        file: "op25no11inaminor.mp3",
        answers: ["Op. 25 No. 11 in A Minor"],
        keywords: ["Winter Wind"],
      },
      {
        file: "op25no12incminor.mp3",
        answers: ["Op. 25 No. 12 in C Minor"],
        keywords: ["Ocean"],
      },
    ],
  },
  {
    id: "bachcello",
    name: "Bach cello works",
    nameSingular: "Bach cello work",
    leftImagePath: "../files/images/people/bach.jpeg",
    rightImagePath: "../files/images/people/starker.jpeg",
    folderPath: "../files/audio/bach/",
    songs: [
      {
        file: "suiteno1ingpraeludium.mp3",
        answers: ["Suite No. 1 in G Major: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno1ingallemande.mp3",
        answers: ["Suite No. 1 in G Major: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno1ingcourante.mp3",
        answers: ["Suite No. 1 in G Major: Courante"],
        keywords: [],
      },
      {
        file: "suiteno1ingsarabande.mp3",
        answers: ["Suite No. 1 in G Major: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno1ingmenuets.mp3",
        answers: ["Suite No. 1 in G Major: Menuets"],
        keywords: [],
      },
      {
        file: "suiteno1inggigue.mp3",
        answers: ["Suite No. 1 in G Major: Gigue"],
        keywords: [],
      },
      {
        file: "suiteno2indminorpraeludium.mp3",
        answers: ["Suite No. 2 in D Minor: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno2indminorallemande.mp3",
        answers: ["Suite No. 2 in D Minor: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno2indminorcourante.mp3",
        answers: ["Suite No. 2 in D Minor: Courante"],
        keywords: [],
      },
      {
        file: "suiteno2indminorsarabande.mp3",
        answers: ["Suite No. 2 in D Minor: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno2indminormenuets.mp3",
        answers: ["Suite No. 2 in D Minor: Menuets"],
        keywords: [],
      },
      {
        file: "suiteno2indminorgigue.mp3",
        answers: ["Suite No. 2 in D Minor: Gigue"],
        keywords: [],
      },
      {
        file: "suiteno3incpraeludium.mp3",
        answers: ["Suite No. 3 in C Major: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno3incallemande.mp3",
        answers: ["Suite No. 3 in C Major: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno3inccourante.mp3",
        answers: ["Suite No. 3 in C Major: Courante"],
        keywords: [],
      },
      {
        file: "suiteno3incsarabande.mp3",
        answers: ["Suite No. 3 in C Major: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno3incbourrees.mp3",
        answers: ["Suite No. 3 in C Major: Bourrées"],
        keywords: [],
      },
      {
        file: "suiteno3incgigue.mp3",
        answers: ["Suite No. 3 in C Major: Gigue"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatpraeludium.mp3",
        answers: ["Suite No. 4 in E-flat Major: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatallemande.mp3",
        answers: ["Suite No. 4 in E-flat Major: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatcourante.mp3",
        answers: ["Suite No. 4 in E-flat Major: Courante"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatsarabande.mp3",
        answers: ["Suite No. 4 in E-flat Major: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatbourrees.mp3",
        answers: ["Suite No. 4 in E-flat Major: Bourrées"],
        keywords: [],
      },
      {
        file: "suiteno4ineflatgigue.mp3",
        answers: ["Suite No. 4 in E-flat Major: Gigue"],
        keywords: [],
      },
      {
        file: "suiteno5incminorpraeludium.mp3",
        answers: ["Suite No. 5 in C Minor: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno5incminorallemande.mp3",
        answers: ["Suite No. 5 in C Minor: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno5incminorcourante.mp3",
        answers: ["Suite No. 5 in C Minor: Courante"],
        keywords: [],
      },
      {
        file: "suiteno5incminorsarabande.mp3",
        answers: ["Suite No. 5 in C Minor: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno5incminorgavottes.mp3",
        answers: ["Suite No. 5 in C Minor: Gavottes"],
        keywords: [],
      },
      {
        file: "suiteno5incminorgigue.mp3",
        answers: ["Suite No. 5 in C Minor: Gigue"],
        keywords: [],
      },
      {
        file: "suiteno6indpraeludium.mp3",
        answers: ["Suite No. 6 in D Major: Praeludium"],
        keywords: [],
      },
      {
        file: "suiteno6indallemande.mp3",
        answers: ["Suite No. 6 in D Major: Allemande"],
        keywords: [],
      },
      {
        file: "suiteno6indcourante.mp3",
        answers: ["Suite No. 6 in D Major: Courante"],
        keywords: [],
      },
      {
        file: "suiteno6indsarabande.mp3",
        answers: ["Suite No. 6 in D Major: Sarabande"],
        keywords: [],
      },
      {
        file: "suiteno6indgavottes.mp3",
        answers: ["Suite No. 6 in D Major: Gavottes"],
        keywords: [],
      },
      {
        file: "suiteno6indgigue.mp3",
        answers: ["Suite No. 6 in D Major: Gigue"],
        keywords: [],
      },
    ],
  },
  {
    id: "paganinicaprices",
    name: "Paganini Caprices",
    nameSingular: "Paganini Caprice",
    leftImagePath: "../files/images/people/paganini.jpeg",
    rightImagePath: "../files/images/people/ricci.jpeg",
    folderPath: "../files/audio/paganini/",
    songs: [
      { file: "caprice1.mp3", answers: ["Caprice No. 1"], keywords: [] },
      { file: "caprice2.mp3", answers: ["Caprice No. 2"], keywords: [] },
      { file: "caprice3.mp3", answers: ["Caprice No. 3"], keywords: [] },
      { file: "caprice4.mp3", answers: ["Caprice No. 4"], keywords: [] },
      { file: "caprice5.mp3", answers: ["Caprice No. 5"], keywords: [] },
      { file: "caprice6.mp3", answers: ["Caprice No. 6"], keywords: [] },
      { file: "caprice7.mp3", answers: ["Caprice No. 7"], keywords: [] },
      { file: "caprice8.mp3", answers: ["Caprice No. 8"], keywords: [] },
      { file: "caprice9.mp3", answers: ["Caprice No. 9"], keywords: [] },
      { file: "caprice10.mp3", answers: ["Caprice No. 10"], keywords: [] },
      { file: "caprice11.mp3", answers: ["Caprice No. 11"], keywords: [] },
      { file: "caprice12.mp3", answers: ["Caprice No. 12"], keywords: [] },
      { file: "caprice13.mp3", answers: ["Caprice No. 13"], keywords: [] },
      { file: "caprice14.mp3", answers: ["Caprice No. 14"], keywords: [] },
      { file: "caprice15.mp3", answers: ["Caprice No. 15"], keywords: [] },
      { file: "caprice16.mp3", answers: ["Caprice No. 16"], keywords: [] },
      { file: "caprice17.mp3", answers: ["Caprice No. 17"], keywords: [] },
      { file: "caprice18.mp3", answers: ["Caprice No. 18"], keywords: [] },
      { file: "caprice19.mp3", answers: ["Caprice No. 19"], keywords: [] },
      { file: "caprice20.mp3", answers: ["Caprice No. 20"], keywords: [] },
      { file: "caprice21.mp3", answers: ["Caprice No. 21"], keywords: [] },
      { file: "caprice22.mp3", answers: ["Caprice No. 22"], keywords: [] },
      { file: "caprice23.mp3", answers: ["Caprice No. 23"], keywords: [] },
      { file: "caprice24.mp3", answers: ["Caprice No. 24"], keywords: [] },
    ],
  },
];

let playlist;
let folderPath;
let songs;

let totalTime = 60;
let penaltyTime = 3;
let feedbackTime = 2;
let lockedTime = 0.1;
let score = 0;
let skippedCounter = 0;
let currentSong;
let gameTimeLeft;
let gameTimer;
let feedbackTimer;
let penaltyTimer;
let guessLockTimer;
let copyReportTimer;
let penaltyActive = false;
let locked = false;
let outputString;
let questionTimeStart;

let songA;
let songB;
let currentSongPlayer;

let recentSongs = [];

function toggleCurrentSongPlayer() {
  if (currentSongPlayer === "A") {
    currentSongPlayer = "B";
  } else {
    currentSongPlayer = "A";
  }
}

function initializeSongs() {
  songA = loadSongA();
  songB = null;
  currentSong = songA;
  currentSongPlayer = "B";
}

function loadGame(id) {
  document.getElementById("playlistSelector").style.display = "none";
  document.getElementById("gameContent").style.display = "block";
  document.getElementById("backButton").style.display = "block";
  playlist = playlists.find((playlist) => playlist.id === id);
  folderPath = playlist.folderPath;
  songs = playlist.songs;
  document.getElementById("leftPortrait").src = playlist.leftImagePath;
  document.getElementById("rightPortrait").src = playlist.rightImagePath;
  document.getElementById("timer").textContent = totalTime;
  document.getElementById("score").textContent = score;
  document.getElementById("instructions").textContent =
    `Name as many ${playlist.name} as you can in ${totalTime} seconds!`;
  initializeSongs();
}

function randomSong() {
  let song;
  do {
    song = songs[Math.floor(Math.random() * songs.length)];
  } while (recentSongs.includes(song.answers[0]));
  recentSongs.push(song.answers[0]);
  if (recentSongs.length > Math.floor(songs.length / 2)) {
    recentSongs.shift();
  }
  return song;
}

function resetTimers() {
  clearInterval(gameTimer);
  clearInterval(penaltyTimer);
  clearTimeout(feedbackTimer);
  clearTimeout(guessLockTimer);
  clearTimeout(copyReportTimer);
  penalty = false;
  locked = false;
}

function startGame() {
  gameTimeLeft = totalTime;
  score = 0;
  skippedCounter = 0;
  document.getElementById("timer").textContent = gameTimeLeft;
  document.getElementById("score").textContent = score;
  document.getElementById("startButton").textContent = "Restart";
  document.getElementById("skipButton").disabled = false;
  document.getElementById("guess").disabled = false;
  document.getElementById("guess").placeholder = "your answer here";
  document.getElementById("feedback").textContent = "";
  document.getElementById("instructions").textContent = "";
  document.getElementById("scoreShare").style.display = "none";
  resetTimers();
  startGameTimer();
  outputString = "";
  playNextSong();
}

function loadSong(audioSourceId, songId) {
  let song = randomSong();
  const audioSource = document.getElementById(audioSourceId);
  audioSource.src = folderPath + song.file;
  const audio = document.getElementById(songId);
  audio.load();
  audio.addEventListener("loadedmetadata", function () {
    audio.currentTime = Math.random() * audio.duration;
    audio.play();
  });
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });
  audio.muted = true;
  return song;
}

function loadSongA() {
  let x = loadSong("audioSourceA", "songA");
  return x;
}

function loadSongB() {
  let x = loadSong("audioSourceB", "songB");
  return x;
}

function playSong(id) {
  const audio = document.getElementById(id);
  audio.muted = false;
}

function playSongA() {
  playSong("songA");
}

function playSongB() {
  playSong("songB");
}

function stopSong(id) {
  const audio = document.getElementById(id);
  audio.pause();
}

function stopSongA() {
  stopSong("songA");
}

function stopSongB() {
  stopSong("songB");
}

function playNextSong() {
  toggleCurrentSongPlayer();
  if (currentSongPlayer === "A") {
    currentSong = songA;
    stopSongB();
    playSongA();
    songB = loadSongB();
  }
  if (currentSongPlayer === "B") {
    currentSong = songB;
    stopSongA();
    playSongB();
    songA = loadSongA();
  }
  questionTimeStart = Date.now();
  document.getElementById("guess").value = "";
  document.getElementById("suggestions").innerHTML = "";
}

function questionTimeElapsed() {
  let seconds = (Date.now() - questionTimeStart) / 1000;
  return seconds.toFixed(1);
}

function startGameTimer() {
  gameTimer = setInterval(() => {
    gameTimeLeft--;
    document.getElementById("timer").textContent = gameTimeLeft;
    document.getElementById("seconds-label").textContent =
      gameTimeLeft !== 1 ? "seconds" : "second";
    if (gameTimeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function sanitizeInput(input) {
  return input
    .toLowerCase()
    .replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()']/g, "")
    .trim();
}

function match(userGuess, correctAnswers) {
  for (let answer of correctAnswers) {
    if (sanitizeInput(userGuess) === sanitizeInput(answer)) {
      return answer;
    }
  }
  return false;
}

function resetFeedbackTimer() {
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    document.getElementById("feedback").textContent = "";
  }, feedbackTime * 1000);
}

function resetGuessLockTimer() {
  locked = true;
  clearTimeout(guessLockTimer);
  guessLockTimer = setTimeout(() => {
    locked = false;
  }, lockedTime * 1000);
}

function checkGuess(incorrectFeedback = false) {
  if (locked) return;
  const userGuess = document.getElementById("guess").value;
  const feedback = document.getElementById("feedback");
  const correctAnswers = currentSong.answers;
  if (match(userGuess, correctAnswers)) {
    feedback.innerHTML = `<em>${match(userGuess, correctAnswers)}</em> is correct!`;
    feedback.style.color = "white";
    outputString +=
      "✅ (" + questionTimeElapsed() + "s) " + correctAnswer() + "\n";
    score++;
    document.getElementById("score").textContent = score;
    resetFeedbackTimer();
    playNextSong();
  } else if (incorrectFeedback) {
    document.getElementById("guess").value = "";
    feedback.innerHTML = `<em>${userGuess}</em> is incorrect`;
    feedback.style.color = "red";
    outputString += "❌";
    resetFeedbackTimer();
    resetGuessLockTimer();
  }
}

function correctAnswer() {
  return currentSong.answers[0];
}

function skipSong() {
  skippedCounter++;
  outputString +=
    "⏭️ (" + questionTimeElapsed() + "s) " + correctAnswer() + "\n";
  document.getElementById("skipButton").disabled = true;
  document.getElementById("guess").disabled = true;
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("feedback").innerHTML =
    `the correct answer was <em>${correctAnswer()}</em>`;
  clearTimeout(feedbackTimer);
  let countdown = penaltyTime;
  penaltyActive = true;
  const guessInput = document.getElementById("guess");
  guessInput.placeholder = `Next song in ${countdown}...`;
  penaltyTimer = setInterval(() => {
    countdown--;
    guessInput.placeholder = `Next song in ${countdown}...`;
    if (countdown <= 0) {
      clearInterval(penaltyTimer);
      penaltyActive = false;
      guessInput.disabled = false;
      document.getElementById("skipButton").disabled = false;
      guessInput.placeholder = "your answer here";
      document.getElementById("feedback").textContent = "";
      playNextSong();
    }
  }, 1000);
}

function isNonContiguousSubstring(sub, str) {
  let subIndex = 0;
  for (let char of str) {
    if (char.toLowerCase() === sub[subIndex].toLowerCase()) {
      subIndex++;
    }
    if (subIndex === sub.length) {
      return true;
    }
  }
  return false;
}

function getSuggestions(input) {
  if (input.trim() === "") return [];
  const priorityAnswers = new Set();
  const matchingAnswers = new Set();
  const nonContiguousAnswers = new Set();
  const lowerInput = sanitizeInput(input);
  songs.forEach((song) => {
    song.answers.forEach((answer) => {
      if (sanitizeInput(answer).startsWith(lowerInput)) {
        priorityAnswers.add(song.answers[0]);
      }
    });
    [...song.answers, ...song.keywords].forEach((answer) => {
      if (sanitizeInput(answer).includes(lowerInput)) {
        matchingAnswers.add(song.answers[0]);
      } else if (isNonContiguousSubstring(lowerInput, sanitizeInput(answer))) {
        nonContiguousAnswers.add(song.answers[0]);
      }
    });
  });
  priorityAnswers.forEach((answer) => {
    matchingAnswers.delete(answer);
    nonContiguousAnswers.delete(answer);
  });
  matchingAnswers.forEach((answer) => {
    nonContiguousAnswers.delete(answer);
  });
  let priorityAnswersSorted = [...priorityAnswers].sort();
  let matchingAnswersSorted = [...matchingAnswers].sort();
  let nonContiguousAnswersSorted = [...nonContiguousAnswers].sort();
  return [
    ...priorityAnswersSorted,
    ...matchingAnswersSorted,
    ...nonContiguousAnswersSorted,
  ];
}

function updateSuggestions() {
  const suggestionsList = document.getElementById("suggestions");
  suggestionsList.innerHTML = "";
  let suggestions = getSuggestions(document.getElementById("guess").value);
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.textContent = suggestion;
    suggestionsList.appendChild(suggestionElement);
  });
}

function endGame() {
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";
  feedback.innerHTML += `The correct answer was <em>${correctAnswer()}</em>`;
  feedback.innerHTML += "<br><br>";
  feedback.innerHTML += `Game over! You identified ${score} ${score === 1 ? playlist.nameSingular : playlist.name} (${skippedCounter} skipped)`;
  feedback.style.color = "white";
  stopSongA();
  stopSongB();
  document.getElementById("startButton").textContent = "Play again";
  document.getElementById("skipButton").disabled = true;
  document.getElementById("guess").disabled = true;
  document.getElementById("guess").value = "";
  document.getElementById("guess").placeholder = "press 'Play again'";
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("scoreShare").style.display = "block";
  document.getElementById("scoreShareButton").textContent = "Share your score!";
  document.getElementById("scoreShareButton").disabled = false;
  let spaceIfNeeded = outputString.endsWith("\n") ? "" : " ";
  if (!penaltyActive) {
    outputString +=
      spaceIfNeeded +
      "(" +
      questionTimeElapsed() +
      "s) " +
      correctAnswer() +
      "\n";
  }
  outputString = "Music Guesser (tinyurl.com/musicguesser)\n" + outputString;
  outputString = outputString.trim();
  outputString +=
    "\nScore: " + score + "/" + (score + skippedCounter) + " " + playlist.name;
  resetTimers();
  initializeSongs();
}

function changeScoreShareText(text) {
  document.getElementById("scoreShareButton").textContent = text;
  clearTimeout(copyReportTimer);
  document.getElementById("scoreShareButton").disabled = true;
  copyReportTimer = setTimeout(() => {
    document.getElementById("scoreShareButton").textContent =
      "Share your score!";
    document.getElementById("scoreShareButton").disabled = false;
  }, 2000);
}

function copyReportToClipboard() {
  navigator.clipboard
    .writeText(outputString)
    .then(() => {
      changeScoreShareText("Score copied to clipboard");
    })
    .catch((err) => {
      changeScoreShareText("error: could not copy score");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guess");
  guessInput.addEventListener("input", () => {
    updateSuggestions();
    checkGuess();
  });
  guessInput.addEventListener("keydown", (event) => {
    if ((event.key === "Enter") & (guessInput.value.trim() !== "")) {
      const suggestionsList = document.getElementById("suggestions");
      if (suggestionsList.firstChild) {
        guessInput.value = suggestionsList.firstChild.textContent;
      }
      checkGuess(true);
      document.getElementById("suggestions").innerHTML = "";
    }
  });
});

document.getElementById("suggestions").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    document.getElementById("guess").value = event.target.textContent;
    document.getElementById("suggestions").innerHTML = "";
    checkGuess(true);
  }
});

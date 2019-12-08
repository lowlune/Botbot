const Discord = require("discord.js");
const prefix = "sit";
const client = new Discord.Client();
const ytdl = require("ytdl-core");


var servers = {};

var killQuote =
[" umrel na päťku od Lenky!",
" prišiel na to že, chodí na SPŠIT a ukončil to sám!",
" chytil debilitu od Soplíka!",
" bol pristihnutý pri tom ako odchádza po druhej hodine!",
" prišiel na nečakanú písomku!",
" bol na smrť ubitý Jarom!",
" bol zavolaný školským rozhlasom do kabinetu a už o ňom nikto nepočul!",
" bol zrazený autom na ceste do Lidla!",
" umrel keď sa snažil predbehnúť na obedoch!",
" stojí vo fronte na bagety do dnes!",
" povedal že ŠitCord je napiču...",
" neprežil deň bez žiadneho suplovania!",
" zomrel na zásah prúdom zo zle namontovanej zástrčky na intrákoch!"];




client.on("ready", () =>{
    console.log('online')
    client.user.setGame("Uteká zo školy");
});

client.on("message", msg =>{

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.substring(prefix.lenght).split(" ");

    switch (args[1]) {
       case "kill":
          if(!args[2]) return msg.channel.send("A koho chceš zabiť?");
          let obet = args[2];
          var killQuoteNumber = Math.floor(Math.random() * 13);
          msg.channel.send(obet + killQuote[killQuoteNumber])
        break;
        case "insta":
          const instaEmbed = new Discord.RichEmbed()
          .setTitle("Navštív instagram spsit.memes")
          .setDescription("https://www.instagram.com/spsit.memes/")
          msg.channel.sendEmbed(instaEmbed)
        break;
        case "help":
          const help = new Discord.RichEmbed()
          .setColor(0xFFA31A)
          .setDescription("Všetky potrebné príkazy k ŠitBotovi:")
          .setFooter("Príkazy: cau, help, insta, kill [meno], kos [cislo], rpg");
          msg.channel.sendEmbed(help);
        break;
        case "cau":
          msg.channel.send("Nazdar ty banán!")
        break;
        case "kos":
          if(!args[2]) return msg.channel("❌Musíš zadať koľko správ chceš vymazať!")
          msg.channel.bulkDelete(args[2]);
          msg.channel.send("Bolo vymazaných " + args[2] + " správ!")
          .then(msg =>{
            msg.delete(4000)
          })
          .catch('Error 404!')
          break;
        case "rpg":
          const rpgOznam = new Discord.RichEmbed()
          .setTitle("ŠIT RPG")
          .setDescription("Na hre sa stále pracuje, bude vydaná hneď ako ju dokončíme \n *Vedenie ŠitCord*")
          .setFooter("pre viac príkazov napíš sit help")
          msg.channel.send(rpgOznam)
          break;

      case "play":

      function play(connection, msg){
        var server = servers[msg.guild.id];

        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

        server.queue.shift();

        server.dispatcher.on("end", function(){
          if(server.queue[0]){
            play(connection, msg)
          }else{
            connection.disconnect();
          }
        });

      }

        if(!args[2]){
          const playError = new Discord.RichEmbed()
          .setDescription("❌Na to aby si mohol spustiť hudbu potrebuješ pridať link, napr. sit play [URL]")
          .setTitle("Chyba")
          msg.channel.sendEmbed(playError);
          return;
        }
        if(!msg.member.voiceChannel){
          msg.channel.send("❌Nemôžeš pustiť hudbu keď nie si vo voice!");
          return;
        }
        if(!servers[msg.guild.id]) servers[msg.guild.id] = {
         queue: []
        }
        var server = servers[msg.guild.id];

        server.queue.push(args[2]);

        if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){
          play(connection, msg);
        })



      break;

    }
});

client.login(process.env.token);

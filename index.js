const Discord = require("discord.js");
const prefix = "sit";
const client = new Discord.Client();


var killQuote = [" umrel na päťku od Vnukovej!",
" prišiel na to že, chodí na SPŠIT a ukončil to sám!",
" chytil debilitu od Sovíka!",
" bol pristihnutý pri tom ako odchádza po druhej hodine!",
" prišiel na nečakanú písomku!",
" bol na smrť ubitý Jarom!",
" bol zavolaný školským rozhlasom do kabinetu a už o ňom nikto nepočul!",
" bol zrazený autom na ceste do Lidla!"];




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
          var killQuoteNumber = Math.floor(Math.random() * 8);
          msg.channel.send(args[2] + killQuote[killQuoteNumber])
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
          if(!args[2]) return msg.channel("Musíš zadať koľko správ chceš vymazať!")
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
          .setDescription("Na hre sa stále precuje, bude vydaná hneď ako ju dokončíme \n *Vedenie ŠitCord*")
          .setFooter("pre viac príkazov napíš **sit help**")
          msg.channel.send(rpgOznam)
          break;


    }
});

client.login(process.env.token);

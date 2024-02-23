const mongoose=require("mongoose");

const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
    {
      from: 'Alice',
      to: 'Bob',
      message: 'Hey Bob, how was your day?',
      created_at: new Date()
    },
    {
      from: 'Boby',
      to: 'Alson',
      message: 'Hi Alice! It was pretty good, thanks for asking.',
      created_at: new Date()
    },
    {
      from: 'Charlie',
      to: 'John',
      message: 'Hey Alice, want to grab some coffee later?',
      created_at: new Date()
    },
    {
      from: 'Amar',
      to: 'Amol',
      message: 'Sure Charlie, that sounds great!',
      created_at: new Date()
    },
    {
      from: 'David',
      to: 'Bruce',
      message: 'Hi Alice, I need your help with something.',
      created_at: new Date()
    },
    {
      from: 'Omkar',
      to: 'satish',
      message: 'Of course David, I am here to help.',
      created_at: new Date()
    },
    {
      from: 'Eve',
      to: 'Naina',
      message: 'Hello Alice, could you please send me the report?',
      created_at: new Date()
    },
    {
      from: 'Sarya',
      to: 'Gautam',
      message: 'Sure Eve, I will send it to you right away.',
      created_at: new Date()
    }
  ];

  Chat.insertMany(allChats);
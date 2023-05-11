const discord = require("discord.js")
const { ticketsystem } = require("./index")

const client = new discord.Client(
    {
        intents:
            [
                "Guilds",
                "GuildMessages",
                "GuildVoiceStates",
                "DirectMessages"
            ]
    }
)

const ticket = new ticketsystem(client,
    {
        status:
        {
            name: "⚠ WARTUNGSARBEITEN ⚠ - ?botname?",
            type: "dnd",
            activities: {
                type: 0
            }
        },
        customconsole: true,
        supporterrolename: "Ticket Supporter",
        adminrolename: "Ticket Admin",
        credits: {
            enable: true
        },
        ticket: true,     
        inviteable: true,
        discord_logging_channel: "1030166299688583258",
        logging_in_discord: true,
        ticketsettings:{
            ticketname:"?thema?-?id?"
        },
        report: true,
        modmail:true,
        modmailsettings:{
            ticketname: "?thema?-?id?"
        }
    }
)

ticket.updatestatus({
    name:"⚠ WARTUNGSARBEITEN ⚠",
    type:"dnd",
    activities:{
        type:5
    }
})

client.login(/** Dein Token */)
const discord = require('discord.js');
const dnd = require('../icons/data.json')
const { embedh } = require("../embedhandler/index.js");
const { default: Enmap } = require('enmap');

/**
 * 
 * @param {discord.Client} client 
 * @param {object} consoledata
 * @param {object} rname
 * @param {object} ndata
 * @param {function getname(name) {return enmap.default}} getdb
 * 
 * @param {function(message)} consoledata.log
 * @param {function(code, message)} consoledata.Error
 * @param {function(message)} consoledata.Warning
 * @param {function(type, status, message)} consoledata.Operation
 * @param {function(status, message)} consoledata.Status
 * @param {function()} consoledata.Clear
 * @param {function(input, properties, index)} consoledata.Table
 * @param {function(message)} consoledata.Info
 */

module.exports.run = (client, consoledata, getdb, rdata, ndata) => {

    client.on('messageCreate', async message => {
        if (message.author.bot) return;
        if (message.channel.isDMBased()) {
            if (message.system) return;
            var dtt = {
                f: "g1", g1: [], g2: [], g3: [], g4: [], g5: [], g6: [], g7: [], g8: []
            }
            var gd = client.guilds.cache.filter(g => g);
            await gd.forEach(guild => {
                if (guild.members.cache.has(message.author.id)) {
                    if (dtt[dtt.f] > 19) {
                        if (dtt.f == "g7") {
                            dtt.f = "g8"
                        }
                        if (dtt.f == "g6") {
                            dtt.f = "g7"
                        }
                        if (dtt.f == "g5") {
                            dtt.f = "g6"
                        }
                        if (dtt.f == "g4") {
                            dtt.f = "g5"
                        }
                        if (dtt.f == "g3") {
                            dtt.f = "g4"
                        }
                        if (dtt.f == "g2") {
                            dtt.f = "g3"
                        }
                        if (dtt.f == "g1") {
                            dtt.f = "g2"
                        }
                    }
                    dtt[dtt.f].push({ name: guild.name, id: guild.id, dsc: guild.description })
                }
            })

            if (dtt.g1.length == 0) return message.reply({ embeds: [await embedh("modmail", { modmail: { sharedguilds: false } })] });
            if (dtt.f == "g1") {
                if (dtt.g1.length == 1) {
                    var ticketinfo = await getModTicket(message.author)
                    if (ticketinfo != false) {
                        return message.reply(await sendmessagetothisservice(dtt.g1[0].id, message.id, false))
                    }
                    //return createModTicket(dtt.g1[0].id, message.content, message.author.id, message.attachments, client)
                    return message.reply(await sendmessagetothisservice(dtt.g1[0].id, message.id, true))
                }
                var compar = []
                for (const key in dtt.g1) {
                    compar.push({
                        label: dtt.g1[key].name,
                        description: !dtt.g1[key].dsc ? "Ein Server" : dtt.g1[0].dsc,
                        value: dtt.g1[key].id
                    })
                }
                const comp = new discord.ActionRowBuilder()
                    .addComponents(
                        new discord.SelectMenuBuilder()
                            .setCustomId(message.author.id + "-" + "selectguild")
                            .setMaxValues(1)
                            .setPlaceholder("Kein Server ausgewählt")
                            .addOptions(
                                compar
                            )
                    )
                return message.reply({ content: "Test", embeds: [await embedh("modmail", { modmail: { sharedguilds: true, guilddata: dtt.g1 } })], components: [comp] })
            }
            if (dtt.f == "g2") {

            }
            if (dtt.f == "g3") {

            }
            if (dtt.f == "g4") {

            }
            if (dtt.f == "g5") {

            }
            if (dtt.f == "g6") {

            }
            if (dtt.f == "g7") {

            }
            if (dtt.f == "g8") {

            }

            const db = getdb(`modmailengin`)
        }
    })

    client.on('interactionCreate', interaction => {
        if(interaction.type == discord.InteractionType.MessageComponent){
            console.log(interaction.customId)
        }
    })

    /**
     * 
     * @param {discord.Guild.id} gid 
     * @param {discord.Message.content} message 
     * @param {discord.User.id} user 
     * @param {discord.Attachment} attachments 
     * @param {discord.Client} client
     */

    function sendmessagetoservice(gid, message, user, attachments, ticket, client) {



    }

    /**
     * 
     * @param {discord.Guild.id} gid 
     * @param {discord.Message.id} message
     * @param {boolean} ot
     * @return {discord.Message} 
     */

    async function sendmessagetothisservice(gid, message, ot) {
        var embed;
        const inviteava = client.guilds.cache.get(gid).invites.fetch()
        if (!(await inviteava).firstKey()) {
            client.guilds.cache.get(gid).invites.create("1031234887585386677", { maxAge: 86400, maxUses: 1, unique: true, reason: "For Modmail System" })
            const inviteava = client.guilds.cache.get(gid).invites.fetch()
            embed = await embedh("modmail", { modmail: { oneguildcash: true, guildname: client.guilds.cache.get(gid).name, oneguildawailibal: ot, guildurl: "https://discord.gg/" + (await inviteava).firstKey() } })
        } else {
            embed = await embedh("modmail", { modmail: { oneguildcash: true, guildname: client.guilds.cache.get(gid).name, oneguildawailibal: ot, guildurl: "https://discord.gg/" + (await inviteava).firstKey() } })
        }

        const btnj = new discord.ButtonBuilder()
            .setCustomId("s_g_j_" + gid + "_" + message + "_" + ot)
            .setStyle(discord.ButtonStyle.Success)
            .setLabel("JA")
        const btnn = new discord.ButtonBuilder()
            .setCustomId("s_g_n_" + gid + "_" + message + "_" + ot)
            .setStyle(discord.ButtonStyle.Danger)
            .setLabel("NEIN")

        const comp = new discord.ActionRowBuilder()
            .addComponents(btnj).addComponents(btnn)

        return { embeds: [embed], components: [comp] }

    }

    /**
     * 
     * @param {discord.User.id} user 
     * @returns {Enmap}
     */

    async function getModTicket(user) {
        const db = getdb(`modmailengin`)
        var ticket = false;

        db.indexes.forEach(mt => {
            if (db.get(`${mt}`).author == user) {
                ticket = db.get(`${mt}`)
            }
        })

        return ticket;
    }

    /**
     * 
     * @param {discord.Guild.id} gid 
     * @param {discord.Message.content} message 
     * @param {discord.User.id} user 
     */

    function createModTicket(gid, message, user) {

        const g = client.guilds.cache.get(gid)
        const tuser = client.users.cache.get(user)

        if (!tcat && tcat != 0) return new TypeError("Kein Ticket Categorie angegeben")
        if (!tuser) return new TypeError("Kein Ticket Ersteller angegeben")
        if (!rdata) return new TypeError("Kein Rollen Daten angegeben")
        if (!ndata) return new TypeError("Kein Namen Daten angegeben")
        if (!g) return new TypeError("Keine Guild angegeben")
        var lndata = { fs: ndata.fs }
        const id = (Math.floor(Math.random() * 9999999999) + 1000000000).toString(16);

        if (ndata.fs.includes("?thema?")) {
            lndata.fs = lndata.fs.replace("?thema?", "Modmail Ticket")
        }
        if (ndata.fs.includes("?id?")) {
            lndata.fs = lndata.fs.replace("?id?", id)
        }
        if (ndata.fs.includes("?uname?")) {
            lndata.fs = lndata.fs.replace("?uname?", tuser.username)
        }

        if (g.channels.cache.filter(n => n.name).length < 499) return i.reply({ content: "Max Channels des Servers erreicht", ephemeral: true })
        g.channels.create({
            name: `` + lndata.fs,
            type: discord.ChannelType.GuildText,
            topic: "Ticket von " + tuser.username + " mit dem Thema **" + tname + "**",
            _permissionOverwrites: [
                {
                    id: g.roles.everyone,
                    deny: [discord.PermissionFlagsBits.ViewChannel]
                }, {
                    id: tuser.id,
                    allow: [discord.PermissionFlagsBits.ViewChannel, discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.EmbedLinks, discord.PermissionFlagsBits.AttachFiles, discord.PermissionFlagsBits.ReadMessageHistory, discord.PermissionFlagsBits.UseApplicationCommands]
                }, {
                    id: g.roles.cache.find(r => r.name == rdata.support).id,
                    allow: [discord.PermissionFlagsBits.ViewChannel, discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.EmbedLinks, discord.PermissionFlagsBits.AttachFiles, discord.PermissionFlagsBits.ReadMessageHistory, discord.PermissionFlagsBits.UseApplicationCommands, discord.PermissionFlagsBits.ManageMessages, discord.PermissionFlagsBits.MentionEveryone]
                }, {
                    id: g.roles.cache.find(r => r.name == rdata.admin).id,
                    allow: [discord.PermissionFlagsBits.ViewChannel, discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.EmbedLinks, discord.PermissionFlagsBits.AttachFiles, discord.PermissionFlagsBits.ReadMessageHistory, discord.PermissionFlagsBits.UseApplicationCommands, discord.PermissionFlagsBits.ManageMessages, discord.PermissionFlagsBits.MentionEveryone, discord.PermissionFlagsBits.ManageChannels]
                }, {
                    id: client.user.id,
                    allow: [discord.PermissionFlagsBits.ViewChannel, discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.EmbedLinks, discord.PermissionFlagsBits.AttachFiles, discord.PermissionFlagsBits.ReadMessageHistory, discord.PermissionFlagsBits.ManageMessages, discord.PermissionFlagsBits.MentionEveryone, discord.PermissionFlagsBits.ManageChannels]
                }
            ],
            get permissionOverwrites() {
                return this._permissionOverwrites;
            },
            set permissionOverwrites(value) {
                this._permissionOverwrites = value;
            },
        }).then(async c => {
            c.permissionOverwrites.edit(
                tuser.id,
                {
                    ViewChannel: true,
                    SendMessages: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    ReadMessageHistory: true,
                    UseApplicationCommands: true
                }
            )
            c.permissionOverwrites.edit(
                g.roles.cache.find(r => r.name == rdata.support).id,
                {
                    ViewChannel: true,
                    SendMessages: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    ReadMessageHistory: true,
                    UseApplicationCommands: true,
                    ManageMessages: true,
                    MentionEveryone: true
                }
            )
            c.permissionOverwrites.edit(
                g.roles.cache.find(r => r.name == rdata.admin).id,
                {
                    ViewChannel: true,
                    SendMessages: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    ReadMessageHistory: true,
                    UseApplicationCommands: true,
                    ManageMessages: true,
                    MentionEveryone: true,
                    ManageChannels: true
                }
            )
            c.permissionOverwrites.edit(
                client.user.id,
                {
                    ViewChannel: true,
                    SendMessages: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    ReadMessageHistory: true,
                    ManageMessages: true,
                    MentionEveryone: true,
                    ManageChannels: true
                }
            ) 
            c.permissionOverwrites.edit(
                g.roles.everyone,
                {
                    ViewChannel: false
                }
            ) 

            if (tcat != 0) {
                try {
                    c.setParent(tcat)
                } catch (e) { }
            }
            getdb(`tickets`).set(`${id}`, {
                owner: tuser.id,
                thema: tname,
                claimed: false,
                channelid: c.id,
                closed: false,
                guild: g.id,
                opn: opn
            })
            const embeddata = new discord.EmbedBuilder()
                .setTitle('🎟 Ticket 🎟')
                .setDescription('Hallo <@' + tuser.id + ">\nBitte habe etwas Gedult bis sich ein Supporter bei dir meldet. Daweile kannst du gerne schon einmal ein Problem hier Beschrieben.")
                .addFields({ name: "Thema:", value: tname })
                .setFooter({ text: "Ticket kann über die Slashcommands bearbeitet werden" })

            const raw = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.ButtonBuilder()
                        .setStyle(discord.ButtonStyle.Danger)
                        .setLabel("Ticket Claimen")
                        .setCustomId("claim-" + id)
                )
            const editmessage = await c.send({ content: "<@&" + g.roles.cache.find(r => r.name == rdata.support).id + ">" })
            editmessage.edit({ content: " ", embeds: [embeddata], components: [raw] })
            i.reply({ content: "Dein Ticket wurde erstellt, schau mal in <#" + c.id + "> vorbei um deine Anliegen geklärt zu bekommen", ephemeral: true })
            return;
        })

    }

    client.on('interactionCreate', async interaction => {
        if(!interaction.isButton) return

        if(interaction.customId.startsWith("s_g_n_")){
            return interaction.reply({ embeds: [await embedh("modmail", { modmail: { sharedguilds: false } })] });
        }

        if(interaction.customId.startsWith("s_g_j_")){
            var l = interaction.customId.replace("s_g_j_", "").split("_");
            console.log(JSON.stringify(l))
            return await createModTicket(l[0], l[1], interaction.user.id);
        }
    })


}
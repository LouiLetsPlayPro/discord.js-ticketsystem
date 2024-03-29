const discord = require('discord.js')
const enmap = require('enmap')

const createticketcommands = require('./ticketcmds/createticketcommands')
const createreportcommands = require('./reportcmds/createreportcommands')
const createmodmailcommands = require('./modmail/createmodmailcommands')

const tickethandler = require('./ticketcmds/tickethandler')
const reporthandler = require('./reportcmds/reporthandler')
const modmailhandler = require('./modmail/modmailhandler')


/**
 * 
 * @param {discord.Client} client 
 * @param {boolean} inviteable 
 * @param {function} logInfo
 * @param {object} rolenames
 * 
 * @param {string} rolenames.admin
 * @param {string} rolenames.supporter
 */

module.exports.invitemanager = (client, inviteable, logInfo, rolenames) => {
    client.on('guildCreate', g => {
        if (inviteable == false) {
            g.leave()
            logInfo("Neuer Server erkannt -> verlassen")
        } else if (inviteable == true) {
            this.createGuild(g)
            if(rolenames == undefined){
                rolenames = {admin: "Ticket Admin", supporter:"Ticket Supporter"}
            }
            if (g.roles.cache.find(n => n.name = rolenames.admin)) { } else {
                g.roles.create({ name: rolenames.admin, reason: "Für das Ticketsystem! NICHT LÖSCHEN" })
            }
            if (g.roles.cache.find(n => n.name = rolenames.supporter)) { } else {
                g.roles.create({ name: rolenames.supporter, reason: "Für das Ticketsystem! NICHT LÖSCHEN" })
            }
            logInfo("Neuer Server erkannt -> eingerichtet")
        }
    })
}

/**
 * 
 * @param {discord.Guild} g 
 */

module.exports.createGuild = (g) => {
    const guild = this.getdb("guilds")
    if (guild.get(g.id)) {
        guild.set(g.id, {

        })
    } else {
        guild.ensure(g.id, {

        })
    }
}

/**
 * 
 * @param {String} dbname Datenbankname
 * 
 * @return {enmap.default}
 * 
 */

module.exports.getdb = (dbname) => {
    return new enmap({ name: dbname, fetchAll: true, autoFetch: true })
}

/**
 * @param {object} options
 * @param {discord.Client} client
 * @param {object} consoledata
 * @param {object} rname
 * @param {object} ndata
 * 
 * @param {string} ndata.uname
 * @param {string} ndata.tid
 * @param {string} ndata.tthema
 * @param {string} ndata.fs
 * 
 * @param {string} rname.support
 * @param {string} rname.admin
 * 
 * @param {boolean} options.ticket
 * @param {boolean} options.modmail
 * @param {boolean} options.voice
 * @param {boolean} options.report
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

module.exports.startengin = (options, client, consoledata, rname, ndata, mdata) => {
    if (options.ticket == true) {
        createticketcommands.run(client, consoledata)
        tickethandler.run(client, consoledata, this.getdb, rname, ndata)
    }
    if (options.modmail == true) {
        createmodmailcommands.run(client, consoledata)
        modmailhandler.run(client, consoledata, this.getdb, rname, mdata)
    }
    if (options.voice == true) {

    }
    if (options.report == true) {
        createreportcommands.run(client, consoledata)
        reporthandler.run(client, consoledata, this.getdb)
    }
}

module.exports.credits = {
    "author": "LoLetsPlayPro",
    "version": "1.0.0",
    "supportserver": "https://discord.gg/FGnjUy6jdT"
}
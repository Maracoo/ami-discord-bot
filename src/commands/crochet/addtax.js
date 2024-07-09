const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'addtax',
    description: 'Compute price of product with tax (i.e. PayPal fee)',
    // deleted: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'price',
            description: 'Raw price of the product',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'tax',
            description: 'Tax/commission rate (in decimal form)',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        try {
            const price = interaction.options.getNumber('price');
            const tax = interaction.options.getNumber('tax');
            const taxAmount = price * tax;
            let message = `Price Breakdown\n`;
            message += `-----------\n`;
            message += `Raw Price (P): ${price}\n`;
            message += `Tax (T): ${tax*100}%\n`;
            message += `-----------\n`;
            message += `Full Price: P + (P * T) = ${(price + taxAmount).toFixed(2)}`;
            interaction.reply({
                content: message,
                ephemeral: true,
            });
        } catch (error) {
            console.error(error);
            interaction.reply({ 
                content: 'Oh no! The calculator ran out of batteries. Try again.', 
                ephemeral: true 
            });
        }
    }
}
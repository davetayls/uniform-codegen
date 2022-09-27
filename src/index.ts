import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { genCommand } from './commands/genCommand'

require('dotenv').config()
require('dotenv').config({ path: '.env.local' })

yargs(hideBin(process.argv))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .strictCommands()
  .demandCommand(1)
  .command(genCommand)
  .parse()

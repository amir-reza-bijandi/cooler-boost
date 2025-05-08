import { parseArgs } from '@std/cli';

const DRIVER_CONFIG_PATH = '/sys/devices/platform/msi-ec/cooler_boost';

const flags = parseArgs(Deno.args, {
  string: ['set-state'],
});

function handleFatalError(error: unknown, msg: string) {
  console.error(msg + '!', error);
  Deno.exit(1);
}

if (import.meta.main) {
  try {
    if (!Deno.args.length) console.log((await Deno.readTextFile(DRIVER_CONFIG_PATH)).trim());
  } catch (error) {
    handleFatalError(error, 'Failed to get cooler boost status');
  }

  const state = flags['set-state'];
  if (state === 'on' || state === 'off') {
    try {
      await Deno.writeTextFile(DRIVER_CONFIG_PATH, state);
    } catch (error) {
      handleFatalError(error, 'Failed to change cooler boost status');
    }
  }
}

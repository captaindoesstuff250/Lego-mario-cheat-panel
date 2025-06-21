
let device, server, service, hubChar;

async function connectToMario() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'LEGO Mario' }],
      optionalServices: ['00001623-1212-efde-1623-785feabcd123']
    });

    server = await device.gatt.connect();
    service = await server.getPrimaryService('00001623-1212-efde-1623-785feabcd123');
    hubChar = await service.getCharacteristic('00001624-1212-efde-1623-785feabcd123');

    alert("✅ Connected to LEGO Mario!");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to connect. Make sure Mario is turned on and near your device.");
  }
}

function disconnectMario() {
  if (device && device.gatt.connected) {
    device.gatt.disconnect();
    alert("❎ Disconnected from LEGO Mario.");
  } else {
    alert("⚠️ Not connected.");
  }
}

const SUIT_COMMANDS = {
  fire:     new Uint8Array([0x01, 0x00]),
  cat:      new Uint8Array([0x02, 0x00]),
  propeller:new Uint8Array([0x03, 0x00]),
  penguin:  new Uint8Array([0x04, 0x00]),
  bee:      new Uint8Array([0x05, 0x00]),
  frog:     new Uint8Array([0x06, 0x00]),
  tanuki:   new Uint8Array([0x07, 0x00]),
  ice:      new Uint8Array([0x08, 0x00]),
  builder:  new Uint8Array([0x09, 0x00]),
  none:     new Uint8Array([0x00, 0x00])
};

async function sendSuit(suitName) {
  if (!hubChar) {
    alert("🚨 Not connected");
    return;
  }
  const command = SUIT_COMMANDS[suitName];
  if (!command) {
    alert("⚠️ Unknown suit command");
    return;
  }
  try {
    await hubChar.writeValue(command);
    console.log(`✅ Sent suit: ${suitName}`);
  } catch (err) {
    console.error(err);
    alert("❌ Failed to send command.");
  }
}

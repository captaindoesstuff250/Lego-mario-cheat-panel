
let device, server;

async function connectToMario() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'LEGO Mario' }],
      optionalServices: ['battery_service']
    });
    server = await device.gatt.connect();
    alert("✅ Connected to LEGO Mario!");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to connect to LEGO Mario.");
  }
}

function disconnectMario() {
  if (device && device.gatt.connected) {
    device.gatt.disconnect();
    alert("❎ Disconnected from LEGO Mario.");
  } else {
    alert("No active connection to disconnect.");
  }
}

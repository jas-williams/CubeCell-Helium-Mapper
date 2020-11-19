function Decoder(bytes, port) {
  return {
    latitude:
      ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) / 1E7,
    longitude:
      ((bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]) / 1E7,
    altitude:
      (bytes[8] << 8) | bytes[9],
    sats:
      (bytes[10] << 8) | bytes[11],
    speed:
      (((bytes[12] << 8) | bytes[13])/1609).toFixed(2),
    battery:
      ((bytes[14] << 8) | bytes[15])/1000
    
  };
}

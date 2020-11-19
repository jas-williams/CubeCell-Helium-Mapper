function Decoder(bytes, port) {
  return {
    latitude:
      ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) / 1E7,
    longitude:
      ((bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]) / 1E7,
    altitude:
      (bytes[8] << 8) | bytes[9],
    sats:
      (bytes[10]),
    speed:
      (((bytes[11] << 8) | bytes[12])/1609).toFixed(2), 
    battery:
      ((bytes[13])*0.2)/10
    
  };
}

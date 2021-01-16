function Decoder(bytes, port) {
	
    return [
        {
           field: "LOCATION",
           value: "(" + ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) / 1E7 + "," + ((bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]) / 1E7 + ")"
           
       },
          {
           field: "SATS",
           value: bytes[8]
        },
           {
            field: "SPEED",
            value: (((bytes[9]))/1.609).toFixed(2)
        },
           {
            field: "BATTERY",
            value: (((bytes[10])*0.2)/10).toFixed(2)
        }
	
    ];
}

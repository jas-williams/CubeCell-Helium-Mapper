function doPost(e) { 
    var GS = SpreadsheetApp.openById('Spreadsheet ID to receive data')
    var SheetDate = new Date().toLocaleDateString(); 
    // Create a sheet for today if it doesn't exist and add column headers
    if (!GS.getSheetByName(SheetDate)) GS.insertSheet(SheetDate).getRange('A1:O1').setValues([['Time','DateTime','Device EUI','Battery','Latitude','Longitude','Altitude','Sats','Speed','Hotspot','Hotspot Lat','Hotspot Lon','RSSI','SNR','DIST']]);    
    var ThisSheet = GS.getSheetByName(SheetDate);
    // Row place holder
    var ThisRecord = [];
    // Timestamp
    ThisRecord[0] = new Date().toLocaleTimeString();
    //DateTime
    ThisRecord[1] = new Date().toLocaleString();
    // Get all contents
    var json = JSON.parse(e.postData.contents);
    ThisRecord[2]=json.dev_eui; //EUI
    ThisRecord[3]=json.decoded.payload.battery; //Battery
    ThisRecord[4]=json.decoded.payload.latitude; //Latitude
    ThisRecord[5]=json.decoded.payload.longitude; //Longitude
    ThisRecord[6]=json.decoded.payload.altitude; //Altitude
    ThisRecord[7]=json.decoded.payload.sats; //Sats
    ThisRecord[8]=json.decoded.payload.speed; //Speed
    
    var lat1 = Number(json.decoded.payload.latitude);
    var lon1 = Number(json.decoded.payload.longitude);
    var R = 6378.137; // Radius of earth in KM
    
    json.hotspots.forEach((hotspot) =>
    {    
      ThisRecord[9]=hotspot.name; //Hotspot Name
      //Get Hotspot Latitude
      ThisRecord[10]=hotspot.lat;   //Hotspot Latitude
      ThisRecord[11]=hotspot.long;  //Hotspot Longitude
      ThisRecord[12]=hotspot.rssi;  //Hotspot RSSI
      ThisRecord[13]=hotspot.snr;   //Hotspot SNR
      
      var lat2 = Number(hotspot.lat);
      var lon2 = Number(hotspot.long);
  
      var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
      var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      ThisRecord[14]= (d * 1000);
      // Save in spreadsheet
      ThisSheet.getRange(ThisSheet.getLastRow() + 1, 1, 1, ThisRecord.length).setValues([ThisRecord]);
    });
  }

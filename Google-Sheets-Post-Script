function doPost(e) { 
  var GS = SpreadsheetApp.openById('Spreadsheet ID to receive data')
  var SheetDate = new Date().toLocaleDateString(); 
  // Create a sheet for today if it doesn't exist and add column headers
  if (!GS.getSheetByName(SheetDate)) GS.insertSheet(SheetDate).getRange('A1:M1').setValues([['Time','DateTime','Device EUI','Battery','Latitude','Longitude','Sats','Speed','Hotspot','Hotspot Lat','Hotspot Lon','RSSI','SNR']]);
  var ThisSheet = GS.getSheetByName(SheetDate);
  // Row place holder
  var ThisRecord = [];
  // Timestamp
  ThisRecord[0] = new Date().toLocaleTimeString();
  //DateTime
  ThisRecord[1] = new Date().toLocaleString();
  // Get all contents
  var json = JSON.parse(e.postData.contents);
  if (json.dev_eui === "1C3DE71ADF063C45") //CubeCell Mapper
   {
     ThisRecord[2]=json.dev_eui; //EUI
     ThisRecord[3]=json.decoded.payload.battery; //Battery
     ThisRecord[4]=json.decoded.payload.latitude; //Latitude
     ThisRecord[5]=json.decoded.payload.longitude; //Longitude
     ThisRecord[6]=json.decoded.payload.sats; //Sats
     ThisRecord[7]=json.decoded.payload.speed; //Speed
     ThisRecord[8]=json.hotspots[0].name; //Hotspot Name
	 //Get Hotspot Latitude
     ThisRecord[9]=json.hotspots[0].lat; //Hotspot Latitude
	 ThisRecord[10]=json.hotspots[0].long; //Hotspot Longitude
     ThisRecord[11]=json.hotspots[0].rssi; //Hotspot RSSI
     ThisRecord[12]=json.hotspots[0].snr; //Hotspot SNR
     // Save in spreadsheet
     ThisSheet.getRange(ThisSheet.getLastRow() + 1, 1, 1, ThisRecord.length).setValues([ThisRecord]);
    }
}

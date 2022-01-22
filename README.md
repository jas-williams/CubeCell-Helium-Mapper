# CubeCell-Helium-Mapper

This is a version of the CubeCell demo app with a few tweaks to help the SAT aquisition and shows the information on the OLED display with no 
Satelite Lock Updates happen every 2 minutes with a satelite lock location updates whils moving updates every 10 seconds whilst stopped update every 60 seconds with a sleep in between.

A quick press on the user button puts the GPS in a sleep mode after a position update. The sleep mode does an update every 6hrs then goes back to sleep pressing the user button again wakes up the Cubecell and it goes back to normal operation.

The payload and the decoder allows the data to update 
[Mappers](http://mappers.helium.com) and [Cargo](https://cargo.helium.com)

[Integration information with Mappers](https://docs.helium.com/use-the-network/coverage-mapping/mappers-api/)

[Integration information for Cargo](https://docs.helium.com/use-the-network/console/integrations/cargo/)

Using a Heltec CubeCell 6502 board with OLED display. Please follow every instruction step below from top to bottom.

[Quickstart Guide](https://docs.helium.com/use-the-network/devices/development/heltec/cubecell-dev-board/arduino/)

[Heltec CubeCell Board Product Page](https://heltec.org/project/htcc-ab02s/)

[Heltec CubeCell Board Docs](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#)

# Install Serial Driver
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/general/establish_serial_connection.html)

# Install CubeCell Board Support
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#install-cubecell-relevant-framework)

# Now go and perform the manual changes to the Payload and Preamble

Set Datarate to DR_3 following [this Helium Guide](https://docs.helium.com/use-the-network/devices/development/heltec/cubecell-dev-board/arduino/#manual-updates-to-the-heltec-runtime-libraries)



# Setup Board Parameters

```
Arduino IDE: 

Select Tools -> Board: -> CubeCell -> CubeCell-GPS

```

# Code Example Varations Provided

- CubeCell_DIY_Mapper.ino: Supports legacy Heltec firmware.

- CubeCell_DIY_Mapper_V1.ino: V1 supports Heltec firmware 1.3.

- CubeCell_DIY_Mapper_VIB.ino: Supports legacy Heltec firmware. The VIB version incorporates code to support a SW420 vibration sensor rather than using the user button to sleep/wake the device.

- CubeCell_DIY_Mapper_VIB_V1.ino: V1 supports Heltec firmware 1.3. The VIB version incorporates code to support a SW420 vibration sensor rather than using the user button to sleep/wake the device.


# Upload CubeCell_DIY_Mapper example

Arduino IDE:

Select File -> Open -> CubeCell_DIY_Mapper[V1|VIB].ino

Select Tools -> Port: "COM# or ttyACM#"

Enter DevEUI(msb), AppEUI(msb), and AppKey(msb) from Helium Console, at lines 27, 28, 29. MSB Format from console press the expand button to get the ID's in the format shown below.

![Console Image](https://gblobscdn.gitbook.com/assets%2F-M21bzsbFl2WA7VymAxU%2F-M6fLGmWEQ0QxjrJuvoC%2F-M6fLi5NzuMeWSzzihV-%2Fcubecell-console-details.png?alt=media&token=95f5c9b2-734a-4f84-bb88-523215873116)

```
uint8_t devEui[] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
uint8_t appEui[] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
uint8_t appKey[] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
```
# Setup Application Parameters

Arduino IDE: - **Note Region Specific Settings**

```
Select Tools -> LORAWAN_REGION -> REGION_EU868 or Select Tools -> LORAWAN_REGION -> REGION_US915
Select Tools -> LORAWAN_CLASS -> CLASS_A
Select Tools -> LORAWAN_NETMODE -> OTAA
Select Tools -> LORAWAN_ADR -> OFF
Select Tools -> LORAWAN_Net_Reservation -> OFF
Select Tools -> LORAWAN_AT_SUPPORT -> OFF
Select Tools -> LORAWAN_RGB -> ACTIVE or Select Tools -> LORAWAN_RGB -> DEACTIVE // To turn off Bright Lora LED
Select Tools -> LORAWAN Debug Level -> "Freq && DIO"
```


Select Sketch -> Upload.

Wait for Done uploading message

# Debug using Serial connection via USB

Select Tools -> Serial Monitor Serial Monitor Window

Select 115200 baud from bottom right dropdown.

Wait for device to successfully join, may take 1-3 min, and show several failures. Do not be alarmed by the failures, it is expected.



# Setting up a Decoder

In helium Console create a new function call it Heltec decoder => Type Decoder => Custom Script

Copy and paste the decoder into the custom script pane

```
function Decoder(bytes, port) {
  return {
    latitude:
      ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) / 1E7,
    longitude:
      ((bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7]) / 1E7,
    altitude:
      0,
    accuracy:
      (bytes[9]/10),
    speed:
      (((bytes[8]))/1.609).toFixed(2), 
    battery:
      (((bytes[10])*0.2)/10).toFixed(2)
    
  };
}

```

Create a new Label for the decoder then save the function

you need to create two integrations one for CARGO and one for MAPPERS add the label created above to both integrations

The payload and the decoder allows the data to update

[Mappers](http://mappers.helium.com) and [Cargo](https://cargo.helium.com)

[Integration information with Mappers](https://docs.helium.com/use-the-network/coverage-mapping/mappers-api/)

[Integration information for Cargo](https://docs.helium.com/use-the-network/console/integrations/cargo/)


Here is a youtube Video uploaded by Joey but **note** Joey adds 3 lables you only need **one label** assign the one label to the device, function, and the 2 integrations
[Youtube Video from Joey](https://youtu.be/WIIC_DvZyz0)

# Google Sheets Integration

- Create new sheet in Google Sheets, give it a name. 
- Get the spreadsheet ID from the URL, it is the text between the forward slashes starting from https://docs.google.com/spreadsheets/d/
- Go to Tools -> Script Editor, rename the file to something meaningful, paste the code from https://github.com/jas-williams/CubeCell-Helium-Mapper/blob/main/Google-Sheets-Post-Script.gs
- Edit the script to add the correct spreadsheet ID
- Deploy as web application, give it permissions to your account
- Get the resulting URL and use it in Console to create new HTTP integration, paste the URL in the endpoint field and leave everything else default (method = Post, no additional headers or parameters)
- Go to your flows, add the integration and connect it to your decoder so that the decoder feeds into the integration.

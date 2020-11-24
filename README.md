# CubeCell-Helium-Mapper

This is a version of the CubeCell demo app with a few tweaks to help the SAT aquisition and shows the information on the OLED display with no 
Satelite Lock Updates happen every 2 minutes with a satelite lock location updates whils moving updates every 10 seconds whilst stopped update every 60 seconds with a sleep in between.

A quick press on the user button puts the GPS in a sleep mode after a position update. The sleep mode does an update every 6hrs then goes back to sleep pressing the user button again wakes up the Cubecell and it goes back to normal operation.

The payload and the decoder allows the data to update 
[Mappers](http://mappers.helium.com) and [Cargo](https://cargo.helium.com)

[Integration information with Mappers](https://developer.helium.com/devices/coverage-mapping/mappers-api)

[Integration information for Cargo](https://developer.helium.com/console/integrations/cargo)

Using a Heltec CubeCell 6502 board with OLED display. Please follow every instruction step below from top to bottom.

[Quickstart Guide](https://developer.helium.com/devices/arduino-quickstart/heltec-cubecell-board)

[Heltec CubeCell Board Product Page](https://heltec.org/project/htcc-ab02s/)

[Heltec CubeCell Board Docs](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#)

# Install Serial Driver
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/general/establish_serial_connection.html)

# Install CubeCell Board Support
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#install-cubecell-relevant-framework)

# Setup Board Parameters

```
Arduino IDE: 

Select Tools -> Board: -> CubeCell -> CubeCell-GPS

```
# Upload CubeCell_DIY_Mapper example

Arduino IDE:

Select File -> Open -> CubeCell_DIY_Mapper.ino

Select Tools -> Port: "COM# or ttyACM#"

Enter DevEUI(msb), AppEUI(msb), and AppKey(msb) from Helium Console, at lines 27, 28, 29.

```
uint8_t DevEui[] = { FILL_ME_IN };
uint8_t AppEui[] = { FILL_ME_IN };
uint8_t AppKey[] = { FILL_ME_IN };
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

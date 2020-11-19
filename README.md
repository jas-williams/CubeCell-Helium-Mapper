# CubeCell-Helium-Mapper

This is a version of the CubeCell demo app with a few tweaks to help the SAT aquisition and shows the information on the OLED display with no 
Satelite Lock Updates happen every 2 minutes with a satelite lock location updates happen aprox every 30 seconds this can be changed by modifying the duty timer


This example demonstrates sending a simple data packet using a Heltec CubeCell Board . Please follow every instruction step below from top to bottom.

[Quickstart Guide](https://developer.helium.com/devices/arduino-quickstart/heltec-cubecell-board)
[Heltec CubeCell Board Product Page](https://heltec.org/project/htcc-ab02s/)
[Heltec CubeCell Board Docs](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#)

#Install Serial Driver
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/general/establish_serial_connection.html)

#Install CubeCell Board Support
Find Directions [here.](https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/quick_start.html#install-cubecell-relevant-framework)

Select Board
Arduino IDE:

Select Tools -> Board: -> CubeCell-Board
Select Region
Arduino IDE:

Select Tools -> LoRaWAN Region: -> REGION_EU868
Upload CubeCell_DIY_Mapper example
Arduino IDE:

Select File -> Open -> CubeCell_DIY_Mapper.ino
Select Tools -> Port: "COM# or ttyACM#"
Enter DevEUI(msb), AppEUI(msb), and AppKey(msb) from Helium Console, at lines 27, 28, 29.
uint8_t DevEui[] = { FILL_ME_IN };
uint8_t AppEui[] = { FILL_ME_IN };
uint8_t AppKey[] = { FILL_ME_IN };
Select Sketch -> Upload.
Wait for Done uploading message
Select Tools -> Serial Monitor Serial Monitor Window
Select 115200 baud from bottom right dropdown.
Wait for device to successfully join, may take 1-3 min, and show several failures. Do not be alarmed by the failures, it is expected.

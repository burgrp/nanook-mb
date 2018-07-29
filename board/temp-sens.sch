EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:switches
LIBS:relays
LIBS:motors
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:device.farm
LIBS:GWHP-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 3 13
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L I2C XTSEV1
U 1 1 5B5CF9AD
P 6000 2250
F 0 "XTSEV1" H 6000 2600 60  0000 C CNN
F 1 "I2C" H 6000 1900 60  0000 C CNN
F 2 "" H 6150 2400 60  0001 C CNN
F 3 "" H 6150 2400 60  0001 C CNN
	1    6000 2250
	-1   0    0    1   
$EndComp
$Comp
L I2C XTSCD1
U 1 1 5B5CFA86
P 6000 3100
F 0 "XTSCD1" H 6000 3450 60  0000 C CNN
F 1 "I2C" H 6000 2750 60  0000 C CNN
F 2 "" H 6150 3250 60  0001 C CNN
F 3 "" H 6150 3250 60  0001 C CNN
	1    6000 3100
	-1   0    0    1   
$EndComp
Text GLabel 5650 3050 0    60   Input ~ 0
SCL
Text GLabel 5650 3150 0    60   Input ~ 0
SDA
Text GLabel 5650 2300 0    60   Input ~ 0
SDA
Text GLabel 5650 2200 0    60   Input ~ 0
SCL
$Comp
L +3V3 #PWR023
U 1 1 5B5CFB03
P 5650 2050
F 0 "#PWR023" H 5650 1900 50  0001 C CNN
F 1 "+3V3" V 5650 2300 50  0000 C CNN
F 2 "" H 5650 2050 50  0001 C CNN
F 3 "" H 5650 2050 50  0001 C CNN
	1    5650 2050
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR024
U 1 1 5B5CFB1B
P 5650 2450
F 0 "#PWR024" H 5650 2200 50  0001 C CNN
F 1 "GND" V 5650 2250 50  0000 C CNN
F 2 "" H 5650 2450 50  0001 C CNN
F 3 "" H 5650 2450 50  0001 C CNN
	1    5650 2450
	0    1    1    0   
$EndComp
$Comp
L GND #PWR025
U 1 1 5B5CFB79
P 5650 3300
F 0 "#PWR025" H 5650 3050 50  0001 C CNN
F 1 "GND" V 5650 3100 50  0000 C CNN
F 2 "" H 5650 3300 50  0001 C CNN
F 3 "" H 5650 3300 50  0001 C CNN
	1    5650 3300
	0    1    1    0   
$EndComp
$Comp
L +3V3 #PWR026
U 1 1 5B5CFB8A
P 5650 2900
F 0 "#PWR026" H 5650 2750 50  0001 C CNN
F 1 "+3V3" V 5650 3150 50  0000 C CNN
F 2 "" H 5650 2900 50  0001 C CNN
F 3 "" H 5650 2900 50  0001 C CNN
	1    5650 2900
	0    -1   -1   0   
$EndComp
$EndSCHEMATC

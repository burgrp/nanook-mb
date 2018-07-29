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
Sheet 10 13
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
L P82B96 U4
U 1 1 5B5D1646
P 5400 3250
F 0 "U4" H 4900 3750 50  0000 L CNN
F 1 "P82B96" H 5600 3750 50  0000 L CNN
F 2 "" H 5400 3250 50  0001 C CNN
F 3 "" H 5400 3250 50  0001 C CNN
	1    5400 3250
	1    0    0    -1  
$EndComp
$Comp
L C C5
U 1 1 5B5D167F
P 4350 3250
F 0 "C5" H 4375 3350 50  0000 L CNN
F 1 "100n" H 4375 3150 50  0000 L CNN
F 2 "" H 4388 3100 50  0001 C CNN
F 3 "" H 4350 3250 50  0001 C CNN
	1    4350 3250
	1    0    0    -1  
$EndComp
Text GLabel 4800 3150 0    60   Input ~ 0
SDA
Text GLabel 4800 3350 0    60   Input ~ 0
SCL
$Comp
L GND #PWR048
U 1 1 5B5D189B
P 4250 3550
F 0 "#PWR048" H 4250 3300 50  0001 C CNN
F 1 "GND" V 4250 3300 50  0000 C CNN
F 2 "" H 4250 3550 50  0001 C CNN
F 3 "" H 4250 3550 50  0001 C CNN
	1    4250 3550
	0    1    1    0   
$EndComp
Wire Wire Line
	4250 3550 4800 3550
Wire Wire Line
	4250 2950 4800 2950
Wire Wire Line
	4350 2950 4350 3100
Wire Wire Line
	4350 3400 4350 3550
Connection ~ 4350 3550
$Comp
L +12V #PWR049
U 1 1 5B5D1963
P 4250 2950
F 0 "#PWR049" H 4250 2800 50  0001 C CNN
F 1 "+12V" V 4250 3200 50  0000 C CNN
F 2 "" H 4250 2950 50  0001 C CNN
F 3 "" H 4250 2950 50  0001 C CNN
	1    4250 2950
	0    -1   -1   0   
$EndComp
Connection ~ 4350 2950
$Comp
L RJ45 J2
U 1 1 5B5D19AC
P 7400 3100
F 0 "J2" H 7600 3600 50  0000 C CNN
F 1 "RJ45" H 7250 3600 50  0000 C CNN
F 2 "" H 7400 3100 50  0001 C CNN
F 3 "" H 7400 3100 50  0001 C CNN
	1    7400 3100
	1    0    0    -1  
$EndComp
$EndSCHEMATC

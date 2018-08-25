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
LIBS:MCU_ST_STM32F0
LIBS:GWHP-cache
EELAYER 25 0
EELAYER END
$Descr A3 11693 16535 portrait
encoding utf-8
Sheet 1 1
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
L PWR_FLAG #FLG01
U 1 1 5B5CF565
P 1150 4450
F 0 "#FLG01" H 1150 4525 50  0001 C CNN
F 1 "PWR_FLAG" V 1150 4750 50  0000 C CNN
F 2 "" H 1150 4450 50  0001 C CNN
F 3 "" H 1150 4450 50  0001 C CNN
	1    1150 4450
	0    1    1    0   
$EndComp
$Comp
L +5V #PWR02
U 1 1 5B5CF581
P 1150 4450
F 0 "#PWR02" H 1150 4300 50  0001 C CNN
F 1 "+5V" V 1150 4700 50  0000 C CNN
F 2 "" H 1150 4450 50  0001 C CNN
F 3 "" H 1150 4450 50  0001 C CNN
	1    1150 4450
	0    -1   -1   0   
$EndComp
$Comp
L PWR_FLAG #FLG03
U 1 1 5B5CF5BF
P 1150 4650
F 0 "#FLG03" H 1150 4725 50  0001 C CNN
F 1 "PWR_FLAG" V 1150 4950 50  0000 C CNN
F 2 "" H 1150 4650 50  0001 C CNN
F 3 "" H 1150 4650 50  0001 C CNN
	1    1150 4650
	0    1    1    0   
$EndComp
$Comp
L GND #PWR04
U 1 1 5B5CF603
P 1150 4650
F 0 "#PWR04" H 1150 4400 50  0001 C CNN
F 1 "GND" V 1150 4400 50  0000 C CNN
F 2 "" H 1150 4650 50  0001 C CNN
F 3 "" H 1150 4650 50  0001 C CNN
	1    1150 4650
	0    1    1    0   
$EndComp
$Comp
L NCP1117-3.3_SOT223 U2
U 1 1 5B5D0C65
P 1600 3600
F 0 "U2" H 1450 3725 50  0000 C CNN
F 1 "NCP1117-3.3_SOT223" H 1600 3725 50  0000 L CNN
F 2 "TO_SOT_Packages_SMD:SOT-223-3Lead_TabPin2" H 1600 3800 50  0001 C CNN
F 3 "" H 1700 3350 50  0001 C CNN
	1    1600 3600
	1    0    0    -1  
$EndComp
$Comp
L PWR_FLAG #FLG05
U 1 1 5B5D0D81
P 1150 4550
F 0 "#FLG05" H 1150 4625 50  0001 C CNN
F 1 "PWR_FLAG" V 1150 4850 50  0000 C CNN
F 2 "" H 1150 4550 50  0001 C CNN
F 3 "" H 1150 4550 50  0001 C CNN
	1    1150 4550
	0    1    1    0   
$EndComp
$Comp
L +3.3V #PWR06
U 1 1 5B5D0DB8
P 2100 3600
F 0 "#PWR06" H 2100 3450 50  0001 C CNN
F 1 "+3.3V" V 2100 3850 50  0000 C CNN
F 2 "" H 2100 3600 50  0001 C CNN
F 3 "" H 2100 3600 50  0001 C CNN
	1    2100 3600
	0    1    1    0   
$EndComp
$Comp
L +3.3V #PWR07
U 1 1 5B5D0DEE
P 1150 4550
F 0 "#PWR07" H 1150 4400 50  0001 C CNN
F 1 "+3.3V" V 1150 4800 50  0000 C CNN
F 2 "" H 1150 4550 50  0001 C CNN
F 3 "" H 1150 4550 50  0001 C CNN
	1    1150 4550
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR08
U 1 1 5B5D0E4F
P 1600 3950
F 0 "#PWR08" H 1600 3700 50  0001 C CNN
F 1 "GND" H 1600 3800 50  0000 C CNN
F 2 "" H 1600 3950 50  0001 C CNN
F 3 "" H 1600 3950 50  0001 C CNN
	1    1600 3950
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR09
U 1 1 5B5D0F82
P 2000 3950
F 0 "#PWR09" H 2000 3700 50  0001 C CNN
F 1 "GND" H 2000 3800 50  0000 C CNN
F 2 "" H 2000 3950 50  0001 C CNN
F 3 "" H 2000 3950 50  0001 C CNN
	1    2000 3950
	1    0    0    -1  
$EndComp
$Comp
L C C3
U 1 1 5B5D1389
P 2000 3800
F 0 "C3" H 2025 3900 50  0000 L CNN
F 1 "10u" H 2025 3700 50  0000 L CNN
F 2 "Capacitors_SMD:C_1206" H 2038 3650 50  0001 C CNN
F 3 "" H 2000 3800 50  0001 C CNN
	1    2000 3800
	-1   0    0    1   
$EndComp
$Comp
L Switching_Power_Supply U3
U 1 1 5B749C87
P 1900 2550
F 0 "U3" H 1900 2900 60  0000 C CNN
F 1 "Mean Well PM-15-5" H 1900 2200 60  0000 C CNN
F 2 "" H 1900 2550 60  0001 C CNN
F 3 "" H 1900 2550 60  0001 C CNN
	1    1900 2550
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR010
U 1 1 5B74A025
P 1300 3600
F 0 "#PWR010" H 1300 3450 50  0001 C CNN
F 1 "+5V" V 1300 3850 50  0000 C CNN
F 2 "" H 1300 3600 50  0001 C CNN
F 3 "" H 1300 3600 50  0001 C CNN
	1    1300 3600
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR011
U 1 1 5B74AD1D
P 2400 2700
F 0 "#PWR011" H 2400 2450 50  0001 C CNN
F 1 "GND" V 2400 2500 50  0000 C CNN
F 2 "" H 2400 2700 50  0001 C CNN
F 3 "" H 2400 2700 50  0001 C CNN
	1    2400 2700
	0    -1   -1   0   
$EndComp
$Comp
L Omega2 U4
U 1 1 5B7B577B
P 4350 1700
F 0 "U4" H 4850 650 50  0000 C CNN
F 1 "Omega2" H 4350 2650 50  0000 C CNN
F 2 "device.farm:Omega2+" H 5650 900 50  0001 C CNN
F 3 "DOCUMENTATION" H 5800 1000 50  0001 C CNN
	1    4350 1700
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR012
U 1 1 5B7B57DF
P 4350 3000
F 0 "#PWR012" H 4350 2750 50  0001 C CNN
F 1 "GND" H 4350 2850 50  0000 C CNN
F 2 "" H 4350 3000 50  0001 C CNN
F 3 "" H 4350 3000 50  0001 C CNN
	1    4350 3000
	1    0    0    -1  
$EndComp
$Comp
L +3.3V #PWR013
U 1 1 5B7B5865
P 5200 1000
F 0 "#PWR013" H 5200 850 50  0001 C CNN
F 1 "+3.3V" V 5200 1250 50  0000 C CNN
F 2 "" H 5200 1000 50  0001 C CNN
F 3 "" H 5200 1000 50  0001 C CNN
	1    5200 1000
	0    1    1    0   
$EndComp
$Comp
L I2C-6P X2
U 1 1 5B7B5922
P 9050 1150
F 0 "X2" H 9050 1650 60  0000 C CNN
F 1 "I2C Cold Side" H 9050 800 60  0000 C CNN
F 2 "device.farm:Micro-Match-FOB-6" H 9200 1300 60  0001 C CNN
F 3 "" H 9200 1300 60  0001 C CNN
	1    9050 1150
	-1   0    0    -1  
$EndComp
$Comp
L I2C-6P X3
U 1 1 5B7B59DC
P 10000 1150
F 0 "X3" H 10000 1650 60  0000 C CNN
F 1 "I2C Hot Side" H 10000 800 60  0000 C CNN
F 2 "device.farm:Micro-Match-FOB-6" H 10150 1300 60  0001 C CNN
F 3 "" H 10150 1300 60  0001 C CNN
	1    10000 1150
	-1   0    0    -1  
$EndComp
$Comp
L I2C-6P X4
U 1 1 5B7B5A4F
P 10900 1150
F 0 "X4" H 10900 1650 60  0000 C CNN
F 1 "I2C Aux" H 10900 800 60  0000 C CNN
F 2 "device.farm:Micro-Match-FOB-6" H 11050 1300 60  0001 C CNN
F 3 "" H 11050 1300 60  0001 C CNN
	1    10900 1150
	-1   0    0    -1  
$EndComp
Text Label 6000 2300 0    60   ~ 0
SCL
Text Label 6000 2400 0    60   ~ 0
SDA
Text Label 8700 1200 2    60   ~ 0
SCL
Text Label 9650 1200 2    60   ~ 0
SCL
Text Label 10550 1200 2    60   ~ 0
SCL
Text Label 10550 1100 2    60   ~ 0
SDA
Text Label 9650 1100 2    60   ~ 0
SDA
Text Label 8700 1100 2    60   ~ 0
SDA
$Comp
L +3.3V #PWR014
U 1 1 5B7B5B67
P 8700 950
F 0 "#PWR014" H 8700 800 50  0001 C CNN
F 1 "+3.3V" V 8700 1200 50  0000 C CNN
F 2 "" H 8700 950 50  0001 C CNN
F 3 "" H 8700 950 50  0001 C CNN
	1    8700 950 
	0    -1   -1   0   
$EndComp
$Comp
L +3.3V #PWR015
U 1 1 5B7B5BAC
P 10550 950
F 0 "#PWR015" H 10550 800 50  0001 C CNN
F 1 "+3.3V" V 10550 1200 50  0000 C CNN
F 2 "" H 10550 950 50  0001 C CNN
F 3 "" H 10550 950 50  0001 C CNN
	1    10550 950 
	0    -1   -1   0   
$EndComp
$Comp
L +3.3V #PWR016
U 1 1 5B7B5BCF
P 9650 950
F 0 "#PWR016" H 9650 800 50  0001 C CNN
F 1 "+3.3V" V 9650 1200 50  0000 C CNN
F 2 "" H 9650 950 50  0001 C CNN
F 3 "" H 9650 950 50  0001 C CNN
	1    9650 950 
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR017
U 1 1 5B7B5C64
P 8700 850
F 0 "#PWR017" H 8700 700 50  0001 C CNN
F 1 "+5V" V 8700 1100 50  0000 C CNN
F 2 "" H 8700 850 50  0001 C CNN
F 3 "" H 8700 850 50  0001 C CNN
	1    8700 850 
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR018
U 1 1 5B7B5C87
P 9650 850
F 0 "#PWR018" H 9650 700 50  0001 C CNN
F 1 "+5V" V 9650 1100 50  0000 C CNN
F 2 "" H 9650 850 50  0001 C CNN
F 3 "" H 9650 850 50  0001 C CNN
	1    9650 850 
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR019
U 1 1 5B7B5CAA
P 10550 850
F 0 "#PWR019" H 10550 700 50  0001 C CNN
F 1 "+5V" V 10550 1100 50  0000 C CNN
F 2 "" H 10550 850 50  0001 C CNN
F 3 "" H 10550 850 50  0001 C CNN
	1    10550 850 
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR020
U 1 1 5B7B5D2E
P 8700 1350
F 0 "#PWR020" H 8700 1100 50  0001 C CNN
F 1 "GND" H 8700 1200 50  0000 C CNN
F 2 "" H 8700 1350 50  0001 C CNN
F 3 "" H 8700 1350 50  0001 C CNN
	1    8700 1350
	0    1    1    0   
$EndComp
$Comp
L GND #PWR021
U 1 1 5B7B5D51
P 9650 1350
F 0 "#PWR021" H 9650 1100 50  0001 C CNN
F 1 "GND" H 9650 1200 50  0000 C CNN
F 2 "" H 9650 1350 50  0001 C CNN
F 3 "" H 9650 1350 50  0001 C CNN
	1    9650 1350
	0    1    1    0   
$EndComp
$Comp
L GND #PWR022
U 1 1 5B7B5D74
P 10550 1350
F 0 "#PWR022" H 10550 1100 50  0001 C CNN
F 1 "GND" H 10550 1200 50  0000 C CNN
F 2 "" H 10550 1350 50  0001 C CNN
F 3 "" H 10550 1350 50  0001 C CNN
	1    10550 1350
	0    1    1    0   
$EndComp
Text Label 8700 750  2    60   ~ 0
ALERT
Text Label 9650 750  2    60   ~ 0
ALERT
Text Label 10550 750  2    60   ~ 0
ALERT
Text Label 6000 2200 0    60   ~ 0
ALERT
$Comp
L GND #PWR023
U 1 1 5B7B6C7D
P 4850 5700
F 0 "#PWR023" H 4850 5450 50  0001 C CNN
F 1 "GND" H 4850 5550 50  0000 C CNN
F 2 "" H 4850 5700 50  0001 C CNN
F 3 "" H 4850 5700 50  0001 C CNN
	1    4850 5700
	1    0    0    -1  
$EndComp
Text Label 5400 5000 0    60   ~ 0
ALERT
Text Label 5400 4800 0    60   ~ 0
SCL
Text Label 5400 4900 0    60   ~ 0
SDA
$Comp
L R R6
U 1 1 5B7B6DE4
P 5600 1950
F 0 "R6" V 5680 1950 50  0000 C CNN
F 1 "4k7" V 5600 1950 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 5530 1950 50  0001 C CNN
F 3 "" H 5600 1950 50  0001 C CNN
	1    5600 1950
	1    0    0    -1  
$EndComp
$Comp
L R R7
U 1 1 5B7B6EDD
P 5750 1950
F 0 "R7" V 5830 1950 50  0000 C CNN
F 1 "4k7" V 5750 1950 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 5680 1950 50  0001 C CNN
F 3 "" H 5750 1950 50  0001 C CNN
	1    5750 1950
	1    0    0    -1  
$EndComp
$Comp
L +3.3V #PWR024
U 1 1 5B7B6FD2
P 5750 1800
F 0 "#PWR024" H 5750 1650 50  0001 C CNN
F 1 "+3.3V" V 5750 2050 50  0000 C CNN
F 2 "" H 5750 1800 50  0001 C CNN
F 3 "" H 5750 1800 50  0001 C CNN
	1    5750 1800
	1    0    0    -1  
$EndComp
Text Label 5400 3900 0    60   ~ 0
COMP_RELAY
Text Label 5400 4000 0    60   ~ 0
PUMP_COLD_SIDE
Text Label 5400 4100 0    60   ~ 0
PUMP_HOT_SIDE
$Comp
L +3.3V #PWR025
U 1 1 5B7C2422
P 5600 1800
F 0 "#PWR025" H 5600 1650 50  0001 C CNN
F 1 "+3.3V" V 5600 2050 50  0000 C CNN
F 2 "" H 5600 1800 50  0001 C CNN
F 3 "" H 5600 1800 50  0001 C CNN
	1    5600 1800
	1    0    0    -1  
$EndComp
$Comp
L DAC081C081 U7
U 1 1 5B7C265E
P 7850 5500
F 0 "U7" H 8150 5150 50  0000 C CNN
F 1 "DAC081C081" H 8150 5850 50  0000 C CNN
F 2 "TO_SOT_Packages_SMD:SOT-23-6" H 7850 5500 50  0001 C CNN
F 3 "" H 7850 5500 50  0001 C CNN
	1    7850 5500
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR026
U 1 1 5B7C29BA
P 7850 6100
F 0 "#PWR026" H 7850 5850 50  0001 C CNN
F 1 "GND" H 7850 5950 50  0000 C CNN
F 2 "" H 7850 6100 50  0001 C CNN
F 3 "" H 7850 6100 50  0001 C CNN
	1    7850 6100
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR027
U 1 1 5B7C2D0A
P 7200 5600
F 0 "#PWR027" H 7200 5350 50  0001 C CNN
F 1 "GND" V 7200 5400 50  0000 C CNN
F 2 "" H 7200 5600 50  0001 C CNN
F 3 "" H 7200 5600 50  0001 C CNN
	1    7200 5600
	0    1    1    0   
$EndComp
Text Label 7200 5500 2    60   ~ 0
SCL
Text Label 7200 5400 2    60   ~ 0
SDA
$Comp
L STM32F030K6Tx U5
U 1 1 5B7C37C1
P 4900 4600
F 0 "U5" H 4400 5450 50  0000 L CNN
F 1 "STM32F030K6Tx" H 5100 5450 50  0000 L CNN
F 2 "Housings_QFP:LQFP-32_7x7mm_Pitch0.8mm" H 4400 3700 50  0001 R CNN
F 3 "" H 4900 4600 50  0001 C CNN
	1    4900 4600
	1    0    0    -1  
$EndComp
$Comp
L C C4
U 1 1 5B7C3A2F
P 4150 3900
F 0 "C4" V 4000 3750 50  0000 L CNN
F 1 "100n" V 4000 3900 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 4188 3750 50  0001 C CNN
F 3 "" H 4150 3900 50  0001 C CNN
	1    4150 3900
	0    1    1    0   
$EndComp
$Comp
L GND #PWR028
U 1 1 5B7C3A93
P 4000 3900
F 0 "#PWR028" H 4000 3650 50  0001 C CNN
F 1 "GND" V 4000 3700 50  0000 C CNN
F 2 "" H 4000 3900 50  0001 C CNN
F 3 "" H 4000 3900 50  0001 C CNN
	1    4000 3900
	0    1    1    0   
$EndComp
$Comp
L GND #PWR029
U 1 1 5B7C416E
P 4300 4100
F 0 "#PWR029" H 4300 3850 50  0001 C CNN
F 1 "GND" V 4300 3900 50  0000 C CNN
F 2 "" H 4300 4100 50  0001 C CNN
F 3 "" H 4300 4100 50  0001 C CNN
	1    4300 4100
	0    1    1    0   
$EndComp
$Comp
L SWD X1
U 1 1 5B7C48A7
P 5700 3050
F 0 "X1" H 5700 3300 60  0000 C CNN
F 1 "SWD" H 5700 2800 60  0000 C CNN
F 2 "device.farm:SWD" H 5700 3050 60  0001 C CNN
F 3 "" H 5700 3050 60  0000 C CNN
	1    5700 3050
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR030
U 1 1 5B7C4C16
P 6050 3050
F 0 "#PWR030" H 6050 2800 50  0001 C CNN
F 1 "GND" V 6050 2850 50  0000 C CNN
F 2 "" H 6050 3050 50  0001 C CNN
F 3 "" H 6050 3050 50  0001 C CNN
	1    6050 3050
	0    -1   -1   0   
$EndComp
Text Label 6050 2950 0    60   ~ 0
SWDIO
Text Label 6050 3150 0    60   ~ 0
SWCLK
Text Label 5400 5200 0    60   ~ 0
SWDIO
Text Label 5400 5300 0    60   ~ 0
SWCLK
Text Label 1200 2700 2    60   ~ 0
MAINS_N
Text Label 1200 2400 2    60   ~ 0
MAINS_L1
$Comp
L Conn_01x04 J2
U 1 1 5B7C42BE
P 1400 1450
F 0 "J2" H 1400 1650 50  0000 C CNN
F 1 "Mains" H 1400 1150 50  0000 C CNN
F 2 "" H 1400 1450 50  0001 C CNN
F 3 "" H 1400 1450 50  0001 C CNN
	1    1400 1450
	-1   0    0    1   
$EndComp
Text Label 1600 1550 0    60   ~ 0
MAINS_N
Text Label 1600 1450 0    60   ~ 0
MAINS_L1
Text Label 1600 1350 0    60   ~ 0
MAINS_L2
Text Label 1600 1250 0    60   ~ 0
MAINS_L3
$Comp
L Conn_01x03 J9
U 1 1 5B7C48A3
P 10600 2500
F 0 "J9" H 10600 2700 50  0000 C CNN
F 1 "Compressor" H 10600 2300 50  0000 C CNN
F 2 "device.farm:HB-9500-3P" H 10600 2500 50  0001 C CNN
F 3 "" H 10600 2500 50  0001 C CNN
	1    10600 2500
	1    0    0    1   
$EndComp
$Comp
L Conn_01x04 J4
U 1 1 5B7C4E6F
P 5850 8050
F 0 "J4" H 6000 7950 50  0000 C CNN
F 1 "E2V" H 6000 8050 50  0000 C CNN
F 2 "" H 5850 8050 50  0001 C CNN
F 3 "" H 5850 8050 50  0001 C CNN
	1    5850 8050
	1    0    0    -1  
$EndComp
$Comp
L Conn_01x02 J6
U 1 1 5B7C500C
P 10250 7500
F 0 "J6" H 10250 7600 50  0000 C CNN
F 1 "Pump Cold Side" H 10250 7300 50  0000 C CNN
F 2 "device.farm:DG142R-2-5.08" H 10250 7500 50  0001 C CNN
F 3 "" H 10250 7500 50  0001 C CNN
	1    10250 7500
	1    0    0    1   
$EndComp
$Comp
L Conn_01x02 J7
U 1 1 5B7C5141
P 10250 8250
F 0 "J7" H 10250 8350 50  0000 C CNN
F 1 "Pump Hot Side" H 10250 8050 50  0000 C CNN
F 2 "device.farm:DG142R-2-5.08" H 10250 8250 50  0001 C CNN
F 3 "" H 10250 8250 50  0001 C CNN
	1    10250 8250
	1    0    0    1   
$EndComp
$Comp
L G3MB-SSR U8
U 1 1 5B7C587B
P 8900 7500
F 0 "U8" H 8900 7800 60  0000 C CNN
F 1 "G3MB-5V-SSR" H 8900 7200 60  0000 C CNN
F 2 "device.farm:G3MB-SSR" H 8900 7500 60  0001 C CNN
F 3 "" H 8900 7500 60  0001 C CNN
	1    8900 7500
	1    0    0    -1  
$EndComp
$Comp
L G3MB-SSR U9
U 1 1 5B7C59CA
P 8900 8250
F 0 "U9" H 8900 8550 60  0000 C CNN
F 1 "G3MB-5V-SSR" H 8900 7950 60  0000 C CNN
F 2 "device.farm:G3MB-SSR" H 8900 8250 60  0001 C CNN
F 3 "" H 8900 8250 60  0001 C CNN
	1    8900 8250
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR031
U 1 1 5B7C5CE9
P 9400 7600
F 0 "#PWR031" H 9400 7350 50  0001 C CNN
F 1 "GND" V 9400 7400 50  0000 C CNN
F 2 "" H 9400 7600 50  0001 C CNN
F 3 "" H 9400 7600 50  0001 C CNN
	1    9400 7600
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR032
U 1 1 5B7C5E21
P 9400 8350
F 0 "#PWR032" H 9400 8100 50  0001 C CNN
F 1 "GND" V 9400 8150 50  0000 C CNN
F 2 "" H 9400 8350 50  0001 C CNN
F 3 "" H 9400 8350 50  0001 C CNN
	1    9400 8350
	0    -1   -1   0   
$EndComp
Text Label 10050 7500 2    60   ~ 0
MAINS_N
Text Label 10050 8250 2    60   ~ 0
MAINS_N
Text Label 8400 7400 2    60   ~ 0
MAINS_L1
Text Label 8400 8150 2    60   ~ 0
MAINS_L1
Text Label 8400 7600 2    60   ~ 0
PUMP_COLD_SIDE
Text Label 8400 8350 2    60   ~ 0
PUMP_HOT_SIDE
Text Label 10400 2600 2    60   ~ 0
COMP_L1
Text Label 10400 2500 2    60   ~ 0
COMP_L2
Text Label 10400 2400 2    60   ~ 0
COMP_L3
$Comp
L RELAY_2 K1
U 1 1 5B7C7075
P 9000 2100
F 0 "K1" H 8950 2250 50  0000 C CNN
F 1 "RELAY_2" H 9000 1600 50  0000 C CNN
F 2 "device.farm:RT314_Relay" H 8950 2150 50  0001 C CNN
F 3 "" H 8950 2150 50  0000 C CNN
	1    9000 2100
	1    0    0    -1  
$EndComp
$Comp
L RELAY_2 K2
U 1 1 5B7C7318
P 9000 2900
F 0 "K2" H 8950 3050 50  0000 C CNN
F 1 "RELAY_2" H 9000 2400 50  0000 C CNN
F 2 "device.farm:RT314_Relay" H 8950 2950 50  0001 C CNN
F 3 "" H 8950 2950 50  0000 C CNN
	1    9000 2900
	1    0    0    -1  
$EndComp
$Comp
L RELAY_2 K3
U 1 1 5B7C7404
P 9000 3700
F 0 "K3" H 8950 3850 50  0000 C CNN
F 1 "RELAY_2" H 9000 3200 50  0000 C CNN
F 2 "device.farm:RT314_Relay" H 8950 3750 50  0001 C CNN
F 3 "" H 8950 3750 50  0000 C CNN
	1    9000 3700
	1    0    0    -1  
$EndComp
Text Label 8650 2050 2    60   ~ 0
MAINS_L1
Text Label 8650 2850 2    60   ~ 0
MAINS_L2
Text Label 8650 3650 2    60   ~ 0
MAINS_L3
Text Label 9300 2250 0    60   ~ 0
COMP_L1
Text Label 9300 3050 0    60   ~ 0
COMP_L2
Text Label 9300 3850 0    60   ~ 0
COMP_L3
NoConn ~ 9300 1950
NoConn ~ 9300 2050
NoConn ~ 9300 2750
NoConn ~ 9300 2850
NoConn ~ 9300 3550
NoConn ~ 9300 3650
$Comp
L MMBT3904 T1
U 1 1 5B7C8C98
P 7900 3550
F 0 "T1" H 7750 3650 50  0000 L CNN
F 1 "MMBT3904" H 7550 3750 50  0000 L CNN
F 2 "TO_SOT_Packages_SMD:SOT-23" H 8100 3475 50  0001 L CIN
F 3 "" H 7900 3550 50  0001 L CNN
	1    7900 3550
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR033
U 1 1 5B7C7D6B
P 8000 3750
F 0 "#PWR033" H 8000 3500 50  0001 C CNN
F 1 "GND" H 8000 3600 50  0000 C CNN
F 2 "" H 8000 3750 50  0001 C CNN
F 3 "" H 8000 3750 50  0001 C CNN
	1    8000 3750
	1    0    0    -1  
$EndComp
$Comp
L R R11
U 1 1 5B7C7EBC
P 7550 3550
F 0 "R11" V 7630 3550 50  0000 C CNN
F 1 "1K5" V 7550 3550 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 7480 3550 50  0001 C CNN
F 3 "" H 7550 3550 50  0001 C CNN
	1    7550 3550
	0    1    1    0   
$EndComp
Text Label 7400 3550 2    60   ~ 0
COMP_RELAY
$Comp
L R R10
U 1 1 5B7C9637
P 5900 1950
F 0 "R10" V 5980 1950 50  0000 C CNN
F 1 "4k7" V 5900 1950 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 5830 1950 50  0001 C CNN
F 3 "" H 5900 1950 50  0001 C CNN
	1    5900 1950
	1    0    0    -1  
$EndComp
$Comp
L +3.3V #PWR034
U 1 1 5B7C99AF
P 5900 1800
F 0 "#PWR034" H 5900 1650 50  0001 C CNN
F 1 "+3.3V" V 5900 2050 50  0000 C CNN
F 2 "" H 5900 1800 50  0001 C CNN
F 3 "" H 5900 1800 50  0001 C CNN
	1    5900 1800
	1    0    0    -1  
$EndComp
$Comp
L LSA-TH3P U10
U 1 1 5B7CA200
P 9450 5050
F 0 "U10" H 9450 4350 50  0000 C CNN
F 1 "LSA-TH3P" H 9450 5650 50  0000 C CNN
F 2 "device.farm:LSA-TH3P" H 9450 4850 50  0001 C CNN
F 3 "" H 9450 4850 50  0001 C CNN
	1    9450 5050
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR035
U 1 1 5B7CA545
P 8700 5400
F 0 "#PWR035" H 8700 5150 50  0001 C CNN
F 1 "GND" H 8700 5250 50  0000 C CNN
F 2 "" H 8700 5400 50  0001 C CNN
F 3 "" H 8700 5400 50  0001 C CNN
	1    8700 5400
	0    1    1    0   
$EndComp
Text Label 10200 4600 0    60   ~ 0
COMP_L1
Text Label 10200 4700 0    60   ~ 0
COMP_L2
Text Label 10200 4800 0    60   ~ 0
COMP_L3
Text Label 8700 4600 2    60   ~ 0
MAINS_L1
Text Label 8700 4700 2    60   ~ 0
MAINS_L2
Text Label 8700 4800 2    60   ~ 0
MAINS_L3
NoConn ~ 8700 5600
NoConn ~ 8700 5300
Text Label 8700 5000 2    60   ~ 0
MAINS_L1
Text Label 8700 5100 2    60   ~ 0
MAINS_N
$Comp
L C C7
U 1 1 5B7CC665
P 5600 6000
F 0 "C7" H 5625 6100 50  0000 L CNN
F 1 "100n" H 5625 5900 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 5638 5850 50  0001 C CNN
F 3 "" H 5600 6000 50  0001 C CNN
	1    5600 6000
	1    0    0    -1  
$EndComp
$Comp
L C C11
U 1 1 5B7CC922
P 7550 4850
F 0 "C11" V 7400 4750 50  0000 L CNN
F 1 "100n" V 7700 4750 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7588 4700 50  0001 C CNN
F 3 "" H 7550 4850 50  0001 C CNN
	1    7550 4850
	0    1    1    0   
$EndComp
$Comp
L GND #PWR036
U 1 1 5B7CCC3D
P 4400 7200
F 0 "#PWR036" H 4400 6950 50  0001 C CNN
F 1 "GND" H 4400 7050 50  0000 C CNN
F 2 "" H 4400 7200 50  0001 C CNN
F 3 "" H 4400 7200 50  0001 C CNN
	1    4400 7200
	0    1    1    0   
$EndComp
$Comp
L GND #PWR037
U 1 1 5B7CCDF5
P 6100 6250
F 0 "#PWR037" H 6100 6000 50  0001 C CNN
F 1 "GND" H 6100 6100 50  0000 C CNN
F 2 "" H 6100 6250 50  0001 C CNN
F 3 "" H 6100 6250 50  0001 C CNN
	1    6100 6250
	1    0    0    -1  
$EndComp
$Comp
L C C9
U 1 1 5B7CD515
P 5850 6000
F 0 "C9" H 5875 6100 50  0000 L CNN
F 1 "100n" H 5875 5900 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 5888 5850 50  0001 C CNN
F 3 "" H 5850 6000 50  0001 C CNN
	1    5850 6000
	1    0    0    -1  
$EndComp
$Comp
L C C10
U 1 1 5B7CD591
P 6100 6000
F 0 "C10" H 6125 6100 50  0000 L CNN
F 1 "100n" H 6125 5900 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 6138 5850 50  0001 C CNN
F 3 "" H 6100 6000 50  0001 C CNN
	1    6100 6000
	1    0    0    -1  
$EndComp
$Comp
L DRV8833 U6
U 1 1 5B7D84A5
P 4900 8100
F 0 "U6" H 5100 7450 50  0000 C CNN
F 1 "DRV8833" H 5200 8800 50  0000 C CNN
F 2 "Housings_SSOP:TSSOP-16_4.4x5mm_Pitch0.65mm" H 4900 8100 50  0001 C CNN
F 3 "DOCUMENTATION" H 4900 8100 50  0001 C CNN
	1    4900 8100
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR038
U 1 1 5B7D93C0
P 4900 8950
F 0 "#PWR038" H 4900 8700 50  0001 C CNN
F 1 "GND" H 4900 8800 50  0000 C CNN
F 2 "" H 4900 8950 50  0001 C CNN
F 3 "" H 4900 8950 50  0001 C CNN
	1    4900 8950
	1    0    0    -1  
$EndComp
Text Label 5400 4200 0    60   ~ 0
E2V_A1
Text Label 5400 4300 0    60   ~ 0
E2V_A2
Text Label 5400 4400 0    60   ~ 0
E2V_B1
Text Label 5400 4500 0    60   ~ 0
E2V_B2
Text Label 5400 4600 0    60   ~ 0
E2V_NSLEEP
Text Label 5400 4700 0    60   ~ 0
E2V_NFAULT
$Comp
L R R8
U 1 1 5B7DA6E7
P 5800 8450
F 0 "R8" V 5750 8300 50  0000 C CNN
F 1 "0R22" V 5800 8450 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 5730 8450 50  0001 C CNN
F 3 "" H 5800 8450 50  0001 C CNN
	1    5800 8450
	0    1    1    0   
$EndComp
$Comp
L R R9
U 1 1 5B7DA7B8
P 5800 8550
F 0 "R9" V 5750 8400 50  0000 C CNN
F 1 "0R22" V 5800 8550 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 5730 8550 50  0001 C CNN
F 3 "" H 5800 8550 50  0001 C CNN
	1    5800 8550
	0    1    1    0   
$EndComp
$Comp
L GND #PWR039
U 1 1 5B7DA837
P 5950 8450
F 0 "#PWR039" H 5950 8200 50  0001 C CNN
F 1 "GND" V 5950 8250 50  0000 C CNN
F 2 "" H 5950 8450 50  0001 C CNN
F 3 "" H 5950 8450 50  0001 C CNN
	1    5950 8450
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR040
U 1 1 5B7DAA3D
P 5950 8550
F 0 "#PWR040" H 5950 8300 50  0001 C CNN
F 1 "GND" V 5950 8350 50  0000 C CNN
F 2 "" H 5950 8550 50  0001 C CNN
F 3 "" H 5950 8550 50  0001 C CNN
	1    5950 8550
	0    -1   -1   0   
$EndComp
$Comp
L C C6
U 1 1 5B7DAB72
P 5250 7200
F 0 "C6" H 5275 7300 50  0000 L CNN
F 1 "10n" H 5275 7100 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 5288 7050 50  0001 C CNN
F 3 "" H 5250 7200 50  0001 C CNN
	1    5250 7200
	0    -1   -1   0   
$EndComp
$Comp
L C C8
U 1 1 5B7DAD43
P 5800 7750
F 0 "C8" V 5650 7700 50  0000 L CNN
F 1 "2.2M" V 5650 7850 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 5838 7600 50  0001 C CNN
F 3 "" H 5800 7750 50  0001 C CNN
	1    5800 7750
	0    1    1    0   
$EndComp
$Comp
L GND #PWR041
U 1 1 5B7DADD7
P 5950 7750
F 0 "#PWR041" H 5950 7500 50  0001 C CNN
F 1 "GND" V 5950 7550 50  0000 C CNN
F 2 "" H 5950 7750 50  0001 C CNN
F 3 "" H 5950 7750 50  0001 C CNN
	1    5950 7750
	0    -1   -1   0   
$EndComp
Text Label 4150 7950 2    60   ~ 0
E2V_A1
Text Label 4150 8050 2    60   ~ 0
E2V_A2
Text Label 4150 8150 2    60   ~ 0
E2V_B1
Text Label 4150 8250 2    60   ~ 0
E2V_B2
Text Label 4150 8450 2    60   ~ 0
E2V_NSLEEP
Text Label 4150 8550 2    60   ~ 0
E2V_NFAULT
$Comp
L C C5
U 1 1 5B7DCC86
P 4550 7200
F 0 "C5" H 4575 7300 50  0000 L CNN
F 1 "100n" H 4575 7100 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 4588 7050 50  0001 C CNN
F 3 "" H 4550 7200 50  0001 C CNN
	1    4550 7200
	0    -1   -1   0   
$EndComp
Text Label 8700 2350 2    60   ~ 0
COMP_5V
Text Label 8700 3150 2    60   ~ 0
COMP_5V
Text Label 8700 3950 2    60   ~ 0
COMP_5V
Text Label 7850 4800 1    60   ~ 0
COMP_5V
$Comp
L Conn_01x02 J5
U 1 1 5B7DD7A7
P 9950 3450
F 0 "J5" V 10050 3400 50  0000 C CNN
F 1 "LPS" V 9700 3400 50  0000 C CNN
F 2 "device.farm:DG142R-2-5.08" H 9950 3450 50  0001 C CNN
F 3 "" H 9950 3450 50  0001 C CNN
	1    9950 3450
	0    -1   1    0   
$EndComp
$Comp
L Conn_01x02 J8
U 1 1 5B7DDAED
P 10350 3450
F 0 "J8" V 10450 3400 50  0000 C CNN
F 1 "HPS" V 10100 3400 50  0000 C CNN
F 2 "device.farm:DG142R-2-5.08" H 10350 3450 50  0001 C CNN
F 3 "" H 10350 3450 50  0001 C CNN
	1    10350 3450
	0    -1   1    0   
$EndComp
$Comp
L +5V #PWR042
U 1 1 5B7DDD4C
P 9950 3250
F 0 "#PWR042" H 9950 3100 50  0001 C CNN
F 1 "+5V" H 9950 3390 50  0000 C CNN
F 2 "" H 9950 3250 50  0001 C CNN
F 3 "" H 9950 3250 50  0001 C CNN
	1    9950 3250
	0    -1   -1   0   
$EndComp
Text Label 10650 3250 0    60   ~ 0
COMP_5V
Text Notes 8250 600  0    60   ~ 0
I2C PORTS
Text Notes 6650 1900 0    60   ~ 0
COMPRESSOR
Text Notes 3150 700  0    60   ~ 0
CPU/MCU
$Comp
L Conn_01x02 J1
U 1 1 5B7E3B33
P 1300 2200
F 0 "J1" V 1300 2300 50  0000 C CNN
F 1 "Power Switch" V 1400 2150 50  0000 C CNN
F 2 "device.farm:DG142R-2-5.08" H 1300 2200 50  0001 C CNN
F 3 "" H 1300 2200 50  0001 C CNN
	1    1300 2200
	0    -1   -1   0   
$EndComp
Text Notes 650  700  0    60   ~ 0
POWER
Text Notes 3250 6850 0    60   ~ 0
E2V
Text Notes 6700 6800 0    60   ~ 0
CIRCULATION PUMPS
$Comp
L +5V #PWR043
U 1 1 5B807300
P 950 5100
F 0 "#PWR043" H 950 4950 50  0001 C CNN
F 1 "+5V" H 950 5240 50  0000 C CNN
F 2 "" H 950 5100 50  0001 C CNN
F 3 "" H 950 5100 50  0001 C CNN
	1    950  5100
	0    -1   -1   0   
$EndComp
$Comp
L CP1 C1
U 1 1 5B807524
P 1750 5550
F 0 "C1" H 1775 5650 50  0000 L CNN
F 1 "2F" H 1775 5450 50  0000 L CNN
F 2 "" H 1750 5550 50  0001 C CNN
F 3 "" H 1750 5550 50  0001 C CNN
F 4 "BCE005R5C205FS" H 1750 5550 60  0001 C CNN "TME"
	1    1750 5550
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR044
U 1 1 5B8076C4
P 1750 5950
F 0 "#PWR044" H 1750 5700 50  0001 C CNN
F 1 "GND" H 1750 5800 50  0000 C CNN
F 2 "" H 1750 5950 50  0001 C CNN
F 3 "" H 1750 5950 50  0001 C CNN
	1    1750 5950
	1    0    0    -1  
$EndComp
$Comp
L NCP1117-3.3_SOT223 U1
U 1 1 5B807E31
P 1550 6750
F 0 "U1" H 1400 6875 50  0000 C CNN
F 1 "NCP1117-3.3_SOT223" H 1550 6875 50  0000 L CNN
F 2 "TO_SOT_Packages_SMD:SOT-223-3Lead_TabPin2" H 1550 6950 50  0001 C CNN
F 3 "" H 1650 6500 50  0001 C CNN
	1    1550 6750
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR045
U 1 1 5B807E3D
P 1550 7100
F 0 "#PWR045" H 1550 6850 50  0001 C CNN
F 1 "GND" H 1550 6950 50  0000 C CNN
F 2 "" H 1550 7100 50  0001 C CNN
F 3 "" H 1550 7100 50  0001 C CNN
	1    1550 7100
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR046
U 1 1 5B807E43
P 1950 7100
F 0 "#PWR046" H 1950 6850 50  0001 C CNN
F 1 "GND" H 1950 6950 50  0000 C CNN
F 2 "" H 1950 7100 50  0001 C CNN
F 3 "" H 1950 7100 50  0001 C CNN
	1    1950 7100
	1    0    0    -1  
$EndComp
$Comp
L C C2
U 1 1 5B807E49
P 1950 6950
F 0 "C2" H 1975 7050 50  0000 L CNN
F 1 "10u" H 1975 6850 50  0000 L CNN
F 2 "Capacitors_SMD:C_1206" H 1988 6800 50  0001 C CNN
F 3 "" H 1950 6950 50  0001 C CNN
	1    1950 6950
	-1   0    0    1   
$EndComp
Text Label 1250 6750 2    60   ~ 0
5V_BACKUP
Text Label 2050 6750 0    60   ~ 0
3V3_BACKUP
Text Label 4900 6900 0    60   ~ 0
5V_BACKUP
Text Label 4900 3500 0    60   ~ 0
3V3_BACKUP
Text Label 5400 5100 0    60   ~ 0
PWR_OK
$Comp
L R R1
U 1 1 5B80AF3D
P 1000 5350
F 0 "R1" V 1080 5350 50  0000 C CNN
F 1 "4k7" V 1000 5350 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 930 5350 50  0001 C CNN
F 3 "" H 1000 5350 50  0001 C CNN
	1    1000 5350
	1    0    0    -1  
$EndComp
$Comp
L R R2
U 1 1 5B80AFF8
P 1000 5750
F 0 "R2" V 1080 5750 50  0000 C CNN
F 1 "4k7" V 1000 5750 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 930 5750 50  0001 C CNN
F 3 "" H 1000 5750 50  0001 C CNN
	1    1000 5750
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR047
U 1 1 5B80B0A5
P 1000 5950
F 0 "#PWR047" H 1000 5700 50  0001 C CNN
F 1 "GND" H 1000 5800 50  0000 C CNN
F 2 "" H 1000 5950 50  0001 C CNN
F 3 "" H 1000 5950 50  0001 C CNN
	1    1000 5950
	1    0    0    -1  
$EndComp
Text Label 1250 5550 3    60   ~ 0
PWR_OK
Text Label 2300 5100 0    60   ~ 0
5V_BACKUP
$Comp
L D_Schottky D1
U 1 1 5B80FDD6
P 1600 5100
F 0 "D1" H 1600 5200 50  0000 C CNN
F 1 "SK22" H 1600 5000 50  0000 C CNN
F 2 "Diodes_SMD:D_SMB" H 1600 5100 50  0001 C CNN
F 3 "" H 1600 5100 50  0001 C CNN
	1    1600 5100
	-1   0    0    1   
$EndComp
$Comp
L D_Schottky D3
U 1 1 5B80FF43
P 8000 2950
F 0 "D3" H 8000 3050 50  0000 C CNN
F 1 "SK22" H 8000 2850 50  0000 C CNN
F 2 "Diodes_SMD:D_SMB" H 8000 2950 50  0001 C CNN
F 3 "" H 8000 2950 50  0001 C CNN
	1    8000 2950
	0    1    1    0   
$EndComp
$Comp
L R R12
U 1 1 5B8127EF
P 10200 3500
F 0 "R12" V 10280 3500 50  0000 C CNN
F 1 "4k7" V 10200 3500 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 10130 3500 50  0001 C CNN
F 3 "" H 10200 3500 50  0001 C CNN
	1    10200 3500
	1    0    0    -1  
$EndComp
$Comp
L R R13
U 1 1 5B812AAD
P 10200 3900
F 0 "R13" V 10280 3900 50  0000 C CNN
F 1 "4k7" V 10200 3900 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 10130 3900 50  0001 C CNN
F 3 "" H 10200 3900 50  0001 C CNN
	1    10200 3900
	1    0    0    -1  
$EndComp
$Comp
L R R14
U 1 1 5B812BA1
P 10600 3500
F 0 "R14" V 10680 3500 50  0000 C CNN
F 1 "4k7" V 10600 3500 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 10530 3500 50  0001 C CNN
F 3 "" H 10600 3500 50  0001 C CNN
	1    10600 3500
	1    0    0    -1  
$EndComp
$Comp
L R R15
U 1 1 5B812C67
P 10600 3900
F 0 "R15" V 10680 3900 50  0000 C CNN
F 1 "4k7" V 10600 3900 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 10530 3900 50  0001 C CNN
F 3 "" H 10600 3900 50  0001 C CNN
	1    10600 3900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR048
U 1 1 5B812FD3
P 10200 4050
F 0 "#PWR048" H 10200 3800 50  0001 C CNN
F 1 "GND" H 10200 3900 50  0000 C CNN
F 2 "" H 10200 4050 50  0001 C CNN
F 3 "" H 10200 4050 50  0001 C CNN
	1    10200 4050
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR049
U 1 1 5B813083
P 10600 4050
F 0 "#PWR049" H 10600 3800 50  0001 C CNN
F 1 "GND" H 10600 3900 50  0000 C CNN
F 2 "" H 10600 4050 50  0001 C CNN
F 3 "" H 10600 4050 50  0001 C CNN
	1    10600 4050
	1    0    0    -1  
$EndComp
Text Label 10250 3700 0    60   ~ 0
LPS
Text Label 10650 3700 0    60   ~ 0
HPS
Text Label 4300 4500 2    60   ~ 0
LPS
Text Label 4300 4600 2    60   ~ 0
HPS
$Comp
L +5V #PWR050
U 1 1 5B815725
P 2400 2400
F 0 "#PWR050" H 2400 2250 50  0001 C CNN
F 1 "+5V" V 2400 2650 50  0000 C CNN
F 2 "" H 2400 2400 50  0001 C CNN
F 3 "" H 2400 2400 50  0001 C CNN
	1    2400 2400
	0    1    1    0   
$EndComp
Text Label 5600 5750 0    60   ~ 0
3V3_BACKUP
Text Label 8000 2800 2    60   ~ 0
COMP_5V
$Comp
L GND #PWR051
U 1 1 5B81B267
P 7400 4850
F 0 "#PWR051" H 7400 4600 50  0001 C CNN
F 1 "GND" V 7400 4650 50  0000 C CNN
F 2 "" H 7400 4850 50  0001 C CNN
F 3 "" H 7400 4850 50  0001 C CNN
	1    7400 4850
	0    1    1    0   
$EndComp
NoConn ~ 3500 1000
NoConn ~ 3500 1100
NoConn ~ 3500 1200
NoConn ~ 3500 1300
NoConn ~ 3500 1400
NoConn ~ 3500 1500
NoConn ~ 3500 1600
NoConn ~ 3500 1700
NoConn ~ 3500 1800
NoConn ~ 3500 1900
NoConn ~ 3500 2000
NoConn ~ 3500 2100
NoConn ~ 3500 2200
NoConn ~ 3500 2300
NoConn ~ 3500 2400
NoConn ~ 5200 2100
NoConn ~ 5200 2000
NoConn ~ 5200 1900
NoConn ~ 5200 1800
NoConn ~ 5200 1700
NoConn ~ 5200 1600
NoConn ~ 5200 1500
NoConn ~ 5200 1400
NoConn ~ 5200 1300
NoConn ~ 5200 1200
NoConn ~ 5200 1100
$Comp
L R R3
U 1 1 5B81D7C5
P 4100 4800
F 0 "R3" V 4050 4650 50  0000 C CNN
F 1 "270R" V 4100 4800 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 4030 4800 50  0001 C CNN
F 3 "" H 4100 4800 50  0001 C CNN
	1    4100 4800
	0    1    1    0   
$EndComp
$Comp
L R R4
U 1 1 5B81E020
P 4100 4900
F 0 "R4" V 4050 4750 50  0000 C CNN
F 1 "270R" V 4100 4900 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 4030 4900 50  0001 C CNN
F 3 "" H 4100 4900 50  0001 C CNN
	1    4100 4900
	0    1    1    0   
$EndComp
$Comp
L LED_RGB D2
U 1 1 5B81E238
P 3650 4900
F 0 "D2" H 3650 5270 50  0000 C CNN
F 1 "LED_RGB" H 3650 4550 50  0000 C CNN
F 2 "LEDs:LED_RGB_5050-6" H 3650 4850 50  0001 C CNN
F 3 "" H 3650 4850 50  0001 C CNN
F 4 "FYLS-5050NRGBC" H 3650 4900 60  0001 C CNN "TME"
	1    3650 4900
	1    0    0    -1  
$EndComp
$Comp
L R R5
U 1 1 5B81E357
P 4100 5000
F 0 "R5" V 4050 4850 50  0000 C CNN
F 1 "270R" V 4100 5000 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 4030 5000 50  0001 C CNN
F 3 "" H 4100 5000 50  0001 C CNN
	1    4100 5000
	0    1    1    0   
$EndComp
$Comp
L GND #PWR052
U 1 1 5B81E775
P 3400 4900
F 0 "#PWR052" H 3400 4650 50  0001 C CNN
F 1 "GND" V 3400 4700 50  0000 C CNN
F 2 "" H 3400 4900 50  0001 C CNN
F 3 "" H 3400 4900 50  0001 C CNN
	1    3400 4900
	0    1    1    0   
$EndComp
$Comp
L GND #PWR053
U 1 1 5B8200C2
P 4300 5950
F 0 "#PWR053" H 4300 5700 50  0001 C CNN
F 1 "GND" H 4300 5800 50  0000 C CNN
F 2 "" H 4300 5950 50  0001 C CNN
F 3 "" H 4300 5950 50  0001 C CNN
	1    4300 5950
	1    0    0    -1  
$EndComp
$Comp
L SB2P S1
U 1 1 5B8214D9
P 5850 5400
F 0 "S1" H 5850 5500 60  0000 C CNN
F 1 "SB2P" H 5850 5300 60  0000 C CNN
F 2 "device.farm:SB2P" H 6220 5490 60  0001 C CNN
F 3 "" H 6220 5490 60  0000 C CNN
	1    5850 5400
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR054
U 1 1 5B821693
P 5950 5400
F 0 "#PWR054" H 5950 5150 50  0001 C CNN
F 1 "GND" V 5950 5200 50  0000 C CNN
F 2 "" H 5950 5400 50  0001 C CNN
F 3 "" H 5950 5400 50  0001 C CNN
	1    5950 5400
	0    -1   -1   0   
$EndComp
$Comp
L PWR_FLAG #FLG055
U 1 1 5B823F02
P 2300 4450
F 0 "#FLG055" H 2300 4525 50  0001 C CNN
F 1 "PWR_FLAG" V 2300 4750 50  0000 C CNN
F 2 "" H 2300 4450 50  0001 C CNN
F 3 "" H 2300 4450 50  0001 C CNN
	1    2300 4450
	0    1    1    0   
$EndComp
Text Label 2300 4450 2    60   ~ 0
COMP_5V
Text Label 2300 4550 2    60   ~ 0
5V_BACKUP
Text Label 2300 4650 2    60   ~ 0
3V3_BACKUP
$Comp
L PWR_FLAG #FLG056
U 1 1 5B8245E4
P 2300 4550
F 0 "#FLG056" H 2300 4625 50  0001 C CNN
F 1 "PWR_FLAG" V 2300 4850 50  0000 C CNN
F 2 "" H 2300 4550 50  0001 C CNN
F 3 "" H 2300 4550 50  0001 C CNN
	1    2300 4550
	0    1    1    0   
$EndComp
$Comp
L PWR_FLAG #FLG057
U 1 1 5B82469D
P 2300 4650
F 0 "#FLG057" H 2300 4725 50  0001 C CNN
F 1 "PWR_FLAG" V 2300 4950 50  0000 C CNN
F 2 "" H 2300 4650 50  0001 C CNN
F 3 "" H 2300 4650 50  0001 C CNN
	1    2300 4650
	0    1    1    0   
$EndComp
$Comp
L Conn_02x05_Top_Bottom J3
U 1 1 5B812416
P 4100 5750
F 0 "J3" V 4150 6050 50  0000 C CNN
F 1 "AUX" V 4150 5400 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x05_Pitch2.54mm" H 4100 5750 50  0001 C CNN
F 3 "" H 4100 5750 50  0001 C CNN
	1    4100 5750
	0    1    -1   0   
$EndComp
$Comp
L +5V #PWR058
U 1 1 5B812CA0
P 3900 5450
F 0 "#PWR058" H 3900 5300 50  0001 C CNN
F 1 "+5V" V 3900 5650 50  0000 C CNN
F 2 "" H 3900 5450 50  0001 C CNN
F 3 "" H 3900 5450 50  0001 C CNN
	1    3900 5450
	0    -1   -1   0   
$EndComp
$Comp
L +3.3V #PWR059
U 1 1 5B812F90
P 3900 5950
F 0 "#PWR059" H 3900 5800 50  0001 C CNN
F 1 "+3.3V" V 3900 6200 50  0000 C CNN
F 2 "" H 3900 5950 50  0001 C CNN
F 3 "" H 3900 5950 50  0001 C CNN
	1    3900 5950
	0    -1   -1   0   
$EndComp
Wire Wire Line
	1900 3600 2100 3600
Wire Wire Line
	2000 3650 2000 3600
Connection ~ 2000 3600
Wire Wire Line
	4300 2950 4400 2950
Wire Wire Line
	4350 2950 4350 3000
Connection ~ 4350 2950
Wire Wire Line
	5200 2300 6000 2300
Wire Wire Line
	5200 2400 6000 2400
Connection ~ 5600 2400
Connection ~ 5750 2300
Wire Wire Line
	5750 2100 5750 2300
Wire Wire Line
	5600 2100 5600 2400
Wire Wire Line
	4800 3700 4800 3600
Wire Wire Line
	4800 3600 5000 3600
Wire Wire Line
	5000 3600 5000 3700
Wire Wire Line
	4900 3500 4900 3700
Connection ~ 4900 3600
Wire Wire Line
	4800 5600 4800 5650
Wire Wire Line
	4800 5650 4900 5650
Wire Wire Line
	4900 5650 4900 5600
Wire Wire Line
	4850 5700 4850 5650
Connection ~ 4850 5650
Wire Wire Line
	9400 8150 10050 8150
Wire Wire Line
	9400 7400 10050 7400
Wire Wire Line
	9300 2950 9300 3050
Wire Wire Line
	9300 3750 9300 3850
Wire Wire Line
	9300 2150 9300 2250
Wire Wire Line
	8650 2150 8650 2050
Wire Wire Line
	8650 2950 8650 2850
Wire Wire Line
	8650 3750 8650 3650
Wire Wire Line
	8700 2450 8150 2450
Wire Wire Line
	8150 4050 8700 4050
Wire Wire Line
	8000 3250 8700 3250
Connection ~ 8150 3250
Wire Wire Line
	5200 2200 6000 2200
Wire Wire Line
	5900 2100 5900 2200
Connection ~ 5900 2200
Wire Wire Line
	8500 5500 8700 5500
Wire Wire Line
	5600 5750 5600 5850
Wire Wire Line
	5600 5800 6100 5800
Connection ~ 5600 5800
Wire Wire Line
	5850 5800 5850 5850
Connection ~ 5850 5800
Wire Wire Line
	5600 6200 6100 6200
Wire Wire Line
	5850 6150 5850 6200
Connection ~ 5850 6200
Wire Wire Line
	6100 5800 6100 5850
Wire Wire Line
	6100 6150 6100 6250
Wire Wire Line
	5650 7600 5650 7600
Wire Wire Line
	5650 7200 5650 7600
Connection ~ 4900 7200
Wire Wire Line
	8150 2450 8150 4050
Wire Notes Line
	11200 1750 6550 1750
Wire Notes Line
	6550 1750 6550 9300
Wire Notes Line
	3000 6600 11200 6600
Wire Notes Line
	8150 500  8150 1700
Wire Notes Line
	3000 500  3000 9350
Wire Wire Line
	1200 2400 1300 2400
Wire Wire Line
	1200 2700 1400 2700
Wire Notes Line
	500  9300 11200 9300
Wire Wire Line
	1850 6750 2050 6750
Wire Wire Line
	1950 6800 1950 6750
Connection ~ 1950 6750
Wire Wire Line
	4900 7200 4900 6900
Wire Wire Line
	1000 5100 1000 5200
Connection ~ 1000 5100
Wire Wire Line
	1000 5500 1000 5600
Wire Wire Line
	1000 5900 1000 5950
Wire Wire Line
	1000 5550 1250 5550
Connection ~ 1000 5550
Wire Wire Line
	1750 5100 1750 5400
Connection ~ 1750 5100
Wire Wire Line
	1750 5700 1750 5950
Wire Wire Line
	8000 3100 8000 3350
Connection ~ 8000 3250
Wire Wire Line
	10050 3250 10350 3250
Wire Wire Line
	10200 3250 10200 3350
Connection ~ 10200 3250
Wire Wire Line
	10450 3250 10650 3250
Wire Wire Line
	10600 3250 10600 3350
Connection ~ 10600 3250
Wire Wire Line
	10200 3650 10200 3750
Wire Wire Line
	10600 3650 10600 3750
Wire Wire Line
	10200 3700 10250 3700
Connection ~ 10200 3700
Wire Wire Line
	10600 3700 10650 3700
Connection ~ 10600 3700
Wire Wire Line
	950  5100 1450 5100
Wire Wire Line
	1750 5100 2300 5100
Wire Wire Line
	5600 6150 5600 6200
Connection ~ 6100 6200
Wire Wire Line
	4700 7200 5100 7200
Wire Wire Line
	5400 7200 5650 7200
Wire Wire Line
	7850 4800 7850 4900
Wire Wire Line
	7850 4850 7700 4850
Connection ~ 7850 4850
Wire Wire Line
	1550 7050 1550 7100
Wire Wire Line
	1600 3900 1600 3950
Wire Wire Line
	4250 4800 4300 4800
Wire Wire Line
	3950 4800 3900 4800
Wire Wire Line
	3900 4800 3900 4700
Wire Wire Line
	3900 4700 3850 4700
Wire Wire Line
	3950 5000 3900 5000
Wire Wire Line
	3900 5000 3900 5100
Wire Wire Line
	3900 5100 3850 5100
Wire Wire Line
	3850 4900 3950 4900
Wire Wire Line
	3450 4700 3450 5100
Connection ~ 3450 4900
Wire Wire Line
	3400 4900 3450 4900
Wire Wire Line
	4250 4900 4300 4900
Wire Wire Line
	4250 5000 4300 5000
Wire Wire Line
	5400 5400 5750 5400
Wire Wire Line
	4300 5400 4300 5450
Wire Wire Line
	4300 5300 4200 5300
Wire Wire Line
	4200 5300 4200 5450
Wire Wire Line
	4300 5200 4100 5200
Wire Wire Line
	4100 5200 4100 5450
Wire Wire Line
	4300 5100 4000 5100
Wire Wire Line
	4000 5100 4000 5450
Wire Wire Line
	4000 5950 4300 5950
Connection ~ 4300 5950
Connection ~ 4200 5950
Connection ~ 4100 5950
$EndSCHEMATC

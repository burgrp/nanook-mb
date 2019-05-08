# NANOOK main control board

Nanook-mb is control board for open source [NANOOK ground-water heat pump](http://www.nanook.cc) project. The board is responsible for:

- soft-switching three phases compressor
- switching two circulation pumps
- controlling Carel Electronic Expansion Valve
- reading
  - safety low and high pressure switches
  - water temperature sensors on all exchanger ports (eight sensors in total)
  - water pressure sensors on cold and hot side
  - water flow sensors on cold and hot side
  - refrigerant pressure sensors on cold and hot side
- providing configuration web user interface via WiFi connection

## Safety warnings
TBD: grounding, connectors, switching (rocker vs. ext. CB)

## System connections

### Diagram
![Block Diagram](/images/dia.png)

### Wiring

#### Mains to MB (#1)
Connection to mains is done by flexible cable 5x 2.5mm<sup>2</sup>. Mains side should be connected to on-wall box with dedicated circuit breaker (3x16A). Board side end must be terminated with insulated Faston 6.3 connectors and connected to L1, L2, L3 and N terminals of the board. 

![Insulated Faston 6.3](/images/faston-6.3-angle.jpg)

Ground wire must be terminated by crimp eye-type connector and mounted by screw to chassis.

![Eye-type connector](/images/eye.jpg)

### MB to compressor (#2)
This is, with #1, another high-current connection done by 3x 2.5mm<sup>2</sup> cable. Both sides must be terminated by 6.3 Fastons. 

### MB to PWM SSR (#3, #4)
These are six 2.5mm<sup>2</sup> wires terminated by 6.3 Fastons on board side and by eye on SSR side. Make sure all six wires (R, S, T, U, V, W) are connected to properly.

### MB to ON/OFF switch (#5)

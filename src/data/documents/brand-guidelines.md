# Chapter 1 Introduction"
## This chapter contains the following sections:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1 FSAQA_C_SJ Memory

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2 Test Chip Features

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.3 Pin Description

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.4 Test Pattern

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.5 Taa Measurement on Test pattern

&nbsp;&nbsp;1.1 FSAQA_C_SJ Memory

&nbsp;&nbsp;1.2 Test Chip Features

Table 1. Test Chip Features

|Feature                  |Description             |
|-------------------------|------------------------|
|Product                  |FSA0AC240A              | 
|Capacity                 |                        |
|Package                  |                        |
|Total sample             |TT Corner               |
|                         |FF Corner               |
|                         |SS Corner               |
|Technology               |UMC                     |
|Test range of VCC voltage|0.5~2.5V                |


&nbsp;&nbsp;1.3 Pin Description

Table 2. Pin Description

|Pin name|Description            |
|--------|-----------------------|
|CLK     |Read/Write clock signal|
|CLK     |Read/Write clock signal|
|CLK     |Read/Write clock signal|
|CLK     |Read/Write clock signal|

&nbsp;&nbsp;1.4 Test pattern

This test chip is a RAM

- SCAN(4N)

- March C-(10N)

- March C+(14N)


# Chapter 2 AC/DC Test (Final Test)
## The chapter contains the following sections:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1 Purpose

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2 Test Environment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3Test Criteria

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.4Testing Result

&nbsp;&nbsp;2.1 Prepose

The function........

&nbsp;&nbsp;2.2 Test Environment

Table1   Test Environment

|                       |              |
|-----------------------|--------------|
|Test Equipment         |s100          |
|Voltage SHMOO Range    |0.5V to 2.5 V |
|Temperature SHMOO Range|-40°C to 125°C|

&nbsp;&nbsp;2.3 Test criteria

- Function test is acceptable if the pass rate is larger than 90 % (standard pass rate) at room temperature (25 °C).

- Voltage pass window is 1.8 V ±10 % for all operation temperatures.

&nbsp;&nbsp;2.4 Testing Result

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.4.1 Pass Rate in Function Test

At room temperature, we conducted a function test for voltage SHMOO ranging from 0.5 V to 2.5 V. This allows us to find the pass rate in various operating voltages as shown in Figure 2-1 through Figure 215.

<img src="pass_rate_TT.png" alt="plot" width="500"/>

#### Figure 1. inst pass rate TT

<img src="pass_rate_SS.png" alt="plot" width="500"/>

#### Figure 2. inst pass rate SS

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.4.2 Voltage Pass Window in Function Test

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.4.3 DC/Operating Characteristic Measurement

|Current Mode           |Condition     |Spice Result|
|-----------------------|--------------|------------|
|Active current         |s100          |Spice Result|
|Standby current        |0.5V to 2.5 V |Spice Result|
|Standby current with   |0.5V to 2.5 V |Spice Result|
|Operating current      |              |            |

&nbsp;&nbsp;2.5 Summary

|                                   |                         |
|-----------------------------------|-------------------------|
|Recommended Operation Temperature  |-40 °C to 125 °C         |
|Recommended Operation Voltage      |1.62 V to 1.98 V         |
|Pass Rate                          |98.2 %                   |
|DC/Standby Current                 |6.19~9.82μA              |
|Operating Current                  |4984.00~5207.00μA @10 MHz|

# Chapter 3 ESD Test
## This chapter contains the following sections:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1 Purpose

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2 Standard and Criteria

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3 Test Result

&nbsp;&nbsp;3.1 Prepose

This test is used to simulate the chip’s susceptibility to electrostatic discharge (ESD). It is also used to ensure Faraday’s product will not be damaged by ESD.

&nbsp;&nbsp;3.2 Prepose

- Mil-STD-883, method 3015.7 (HBM)

- JEDEC EIA/JESD22-A115 (MM)

- JEDEC EIA/JESD22-C101-A (CDM)

&nbsp;&nbsp;3.3

Table 3. ESD Test Result

|Mode           |             |
|---------------|-------------|
|HBM            |Passed 3000 V|
|MM             |Passed 300  V|
|CDM            |Passed 1000 V|

# Chapter 4 Latch-up Test

## This chapter contains the following sections:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1 Purpose

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2 Standard and Criteria

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3 Test Result

&nbsp;&nbsp;4.1 Prepose

This test is used to evaluate the latch-up sensitivity.

&nbsp;&nbsp;4.2 Standard and Criteria

JEDEC standard no. 78

&nbsp;&nbsp;4.3 Test Result

Table1   Latch-up Test Result [1]

|Mode           |Result       |
|---------------|-------------|
|Current mode   |Passed 400 mA|
|Voltage mode   |Passed 3.6 V |

# Chapter 5 Conclusion

Table 4. Conclusion

|Test item           |Result       |
|--------------------|-------------|
|FSA0AC240A pass rate|Passed       |
|FSA0AC240A pass rate|Passed       |

Note 1：Active current simulation is calculated with intrinsic netlist. Calculated with intrinsic netlist, parasitic wire capacitance, and shuttle variation may induce around 2X difference.

Note 2：Standby current deviation may come from the accuracy of device leakage model, shuttle variation, or simulator methodology.




# Brand Guidelines 2025

## Overview

These brand guidelines provide the standards for our company's visual identity and messaging. Adhering to these guidelines ensures consistency across all communications.

## Logo Usage

- Maintain clear space around the logo equal to the height of the logo mark
- Minimum size: 1 inch / 25mm width for print, 72px for digital
- Do not stretch, distort, or alter the colors of the logo
- Prefer using the logo on white or light backgrounds

## Color Palette

- Primary: #9b87f5 (Purple)
- Secondary: #6E59A5 (Dark Purple)
- Accent: #E5DEFF (Light Purple)
- Neutral: #333333 (Dark Gray)

## Typography

- Headings: Montserrat Bold
- Body: Open Sans Regular
- Digital UI: Inter

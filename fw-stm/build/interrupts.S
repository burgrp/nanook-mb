.section .text
.weak fatalError
fatalError:
b fatalError
.section .interrupts
.weak _Z21interruptHandlerResetv
.set _Z21interruptHandlerResetv, fatalError
.word _Z21interruptHandlerResetv + 1
.weak _Z19interruptHandlerNMIv
.set _Z19interruptHandlerNMIv, fatalError
.word _Z19interruptHandlerNMIv + 1
.weak _Z25interruptHandlerHardFaultv
.set _Z25interruptHandlerHardFaultv, fatalError
.word _Z25interruptHandlerHardFaultv + 1
.word fatalError + 1
.word fatalError + 1
.word fatalError + 1
.word fatalError + 1
.word fatalError + 1
.word fatalError + 1
.word fatalError + 1
.weak _Z22interruptHandlerSVCallv
.set _Z22interruptHandlerSVCallv, fatalError
.word _Z22interruptHandlerSVCallv + 1
.word fatalError + 1
.word fatalError + 1
.weak _Z22interruptHandlerPendSVv
.set _Z22interruptHandlerPendSVv, fatalError
.word _Z22interruptHandlerPendSVv + 1
.weak _Z23interruptHandlerSysTickv
.set _Z23interruptHandlerSysTickv, fatalError
.word _Z23interruptHandlerSysTickv + 1
.weak _Z20interruptHandlerWWDGv
.set _Z20interruptHandlerWWDGv, fatalError
.word _Z20interruptHandlerWWDGv + 1
.weak _Z19interruptHandlerPVDv
.set _Z19interruptHandlerPVDv, fatalError
.word _Z19interruptHandlerPVDv + 1
.weak _Z19interruptHandlerRTCv
.set _Z19interruptHandlerRTCv, fatalError
.word _Z19interruptHandlerRTCv + 1
.weak _Z21interruptHandlerFLASHv
.set _Z21interruptHandlerFLASHv, fatalError
.word _Z21interruptHandlerFLASHv + 1
.weak _Z19interruptHandlerRCCv
.set _Z19interruptHandlerRCCv, fatalError
.word _Z19interruptHandlerRCCv + 1
.weak _Z23interruptHandlerEXTI0_1v
.set _Z23interruptHandlerEXTI0_1v, fatalError
.word _Z23interruptHandlerEXTI0_1v + 1
.weak _Z23interruptHandlerEXTI2_3v
.set _Z23interruptHandlerEXTI2_3v, fatalError
.word _Z23interruptHandlerEXTI2_3v + 1
.weak _Z24interruptHandlerEXTI4_15v
.set _Z24interruptHandlerEXTI4_15v, fatalError
.word _Z24interruptHandlerEXTI4_15v + 1
.word fatalError + 1
.weak _Z24interruptHandlerDMA1_CH1v
.set _Z24interruptHandlerDMA1_CH1v, fatalError
.word _Z24interruptHandlerDMA1_CH1v + 1
.weak _Z26interruptHandlerDMA1_CH2_3v
.set _Z26interruptHandlerDMA1_CH2_3v, fatalError
.word _Z26interruptHandlerDMA1_CH2_3v + 1
.weak _Z26interruptHandlerDMA1_CH4_5v
.set _Z26interruptHandlerDMA1_CH4_5v, fatalError
.word _Z26interruptHandlerDMA1_CH4_5v + 1
.weak _Z19interruptHandlerADCv
.set _Z19interruptHandlerADCv, fatalError
.word _Z19interruptHandlerADCv + 1
.weak _Z35interruptHandlerTIM1_BRK_UP_TRG_COMv
.set _Z35interruptHandlerTIM1_BRK_UP_TRG_COMv, fatalError
.word _Z35interruptHandlerTIM1_BRK_UP_TRG_COMv + 1
.weak _Z23interruptHandlerTIM1_CCv
.set _Z23interruptHandlerTIM1_CCv, fatalError
.word _Z23interruptHandlerTIM1_CCv + 1
.word fatalError + 1
.weak _Z20interruptHandlerTIM3v
.set _Z20interruptHandlerTIM3v, fatalError
.word _Z20interruptHandlerTIM3v + 1
.weak _Z20interruptHandlerTIM6v
.set _Z20interruptHandlerTIM6v, fatalError
.word _Z20interruptHandlerTIM6v + 1
.word fatalError + 1
.weak _Z21interruptHandlerTIM14v
.set _Z21interruptHandlerTIM14v, fatalError
.word _Z21interruptHandlerTIM14v + 1
.weak _Z21interruptHandlerTIM15v
.set _Z21interruptHandlerTIM15v, fatalError
.word _Z21interruptHandlerTIM15v + 1
.weak _Z21interruptHandlerTIM16v
.set _Z21interruptHandlerTIM16v, fatalError
.word _Z21interruptHandlerTIM16v + 1
.weak _Z21interruptHandlerTIM17v
.set _Z21interruptHandlerTIM17v, fatalError
.word _Z21interruptHandlerTIM17v + 1
.weak _Z20interruptHandlerI2C1v
.set _Z20interruptHandlerI2C1v, fatalError
.word _Z20interruptHandlerI2C1v + 1
.weak _Z20interruptHandlerI2C2v
.set _Z20interruptHandlerI2C2v, fatalError
.word _Z20interruptHandlerI2C2v + 1
.weak _Z20interruptHandlerSPI1v
.set _Z20interruptHandlerSPI1v, fatalError
.word _Z20interruptHandlerSPI1v + 1
.weak _Z20interruptHandlerSPI2v
.set _Z20interruptHandlerSPI2v, fatalError
.word _Z20interruptHandlerSPI2v + 1
.weak _Z22interruptHandlerUSART1v
.set _Z22interruptHandlerUSART1v, fatalError
.word _Z22interruptHandlerUSART1v + 1
.weak _Z22interruptHandlerUSART2v
.set _Z22interruptHandlerUSART2v, fatalError
.word _Z22interruptHandlerUSART2v + 1
.weak _Z28interruptHandlerUSART3_4_5_6v
.set _Z28interruptHandlerUSART3_4_5_6v, fatalError
.word _Z28interruptHandlerUSART3_4_5_6v + 1
.word fatalError + 1
.weak _Z19interruptHandlerUSBv
.set _Z19interruptHandlerUSBv, fatalError
.word _Z19interruptHandlerUSBv + 1
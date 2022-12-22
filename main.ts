huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
let lastMs = 0
basic.forever(function () {
    huskylens.request()
    const box = huskylens.readBox_ss(1, Content3.ID)
    const ms = control.millis()
    if (ms > lastMs+2500) {
        pins.digitalWritePin(DigitalPin.P13, 0) // red led
        pins.digitalWritePin(DigitalPin.P14, 0) // green led
    }
    if (box <= 0) return
    if (box % 2 != 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        lastMs = ms
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
    if (box % 2 == 0) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        lastMs = ms
    } else {
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
})

function showLedsPlot (pattern: string) {
    basic.clearScreen()
    pattern = pattern.replaceAll(' ', '')
    const rows = pattern.split('\n').slice(1, -1)
    for (let y = 0; y < rows.length; y++) {
        const row = rows[y]
        for (let x = 0; x < row.length; x++) {
            if (row.charAt(x) == "#") {
                led.plot(x, y)
            }
        }
    }
}
let lastMs = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.forever(function () {
    huskylens.request()
    const box = huskylens.readBox_ss(1, Content3.ID)
    const ms = control.millis()
    if (ms > lastMs + 1500) {
        // red led
        pins.digitalWritePin(DigitalPin.P13, 0)
        // green led
        pins.digitalWritePin(DigitalPin.P14, 0)
        music.stopAllSounds()
        basic.clearScreen()
    }
    if (box <= 0 || !huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        return
    }
    if (box % 2 != 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        music.ringTone(Note.C)
        showLedsPlot(`
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
`)
        lastMs = ms
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
        music.stopAllSounds()
    }
    if (box % 2 == 0) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        showLedsPlot(`
. . . . .
. . . . #
. . . # .
# . # . .
. # . . .
`)
        lastMs = ms
    } else {
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
})

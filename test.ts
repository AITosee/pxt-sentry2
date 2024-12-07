function kVisionQrCode() {
    Sentry2VisionSensor.VisionSetStatus(sentry2_status.Enable, sentry_vision_e.kVisionQrCode)
    while (true) {
        count = Sentry2VisionSensor.Detected(sentry_vision_e.kVisionQrCode)
        serial.writeValue("count", count)
        if (count) {
            for (let index = 0; index < count; index++) {
                serial.writeValue("x", Sentry2VisionSensor.QrcodeValue(sentry_qr_info_e.kXValue, count))
                serial.writeValue("y", Sentry2VisionSensor.QrcodeValue(sentry_qr_info_e.kXValue, count))
                serial.writeValue("w", Sentry2VisionSensor.QrcodeValue(sentry_qr_info_e.kXValue, count))
                serial.writeValue("h", Sentry2VisionSensor.QrcodeValue(sentry_qr_info_e.kXValue, count))
                serial.writeString(Sentry2VisionSensor.QrcodeValueString())
            }
        }
    }
    Sentry2VisionSensor.VisionSetStatus(sentry2_status.Disable, sentry_vision_e.kVisionQrCode)
}
function kVisionColor() {
    Sentry2VisionSensor.VisionSetStatus(sentry2_status.Enable, sentry_vision_e.kVisionColor)
    Sentry2VisionSensor.SetParamNum(sentry_vision_e_2.kVisionColor, 4)
    Sentry2VisionSensor.SetColorParam(10, 50, 3, 4, 1)
    Sentry2VisionSensor.SetColorParam(40, 50, 3, 4, 2)
    Sentry2VisionSensor.SetColorParam(60, 50, 3, 4, 3)
    Sentry2VisionSensor.SetColorParam(80, 50, 3, 4, 4)
    while (true) {
        count = Sentry2VisionSensor.Detected(sentry_vision_e.kVisionColor)
        serial.writeValue("count", count)
        if (count) {
            for (let index = 0; index < count; index++) {
                serial.writeValue("l", Sentry2VisionSensor.ColorRcgValue(sentry_color_info_e.kLabel, 1))
                serial.writeValue("r", Sentry2VisionSensor.ColorRcgValue(sentry_color_info_e.kRValue, 1))
                serial.writeValue("g", Sentry2VisionSensor.ColorRcgValue(sentry_color_info_e.kGValue, 1))
                serial.writeValue("b", Sentry2VisionSensor.ColorRcgValue(sentry_color_info_e.kBValue, 1))
            }
        }
    }
    Sentry2VisionSensor.VisionSetStatus(sentry2_status.Disable, sentry_vision_e.kVisionColor)
}
let count = 0
Sentry2VisionSensor.Begin(sentry_mode_e.kSerialMode, sentry2_addr_e.ADDR1)
basic.forever(function () {
    kVisionQrCode()
    kVisionColor()
    basic.pause(1000)
})

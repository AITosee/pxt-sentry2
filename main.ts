serial.redirect(
SerialPin.P14,
SerialPin.P13,
BaudRate.BaudRate115200
)
Sentry2VisionSensor.Begin(sentry_mode_e.kSerialMode, sentry2_addr_e.ADDR1)
Sentry2VisionSensor.CameraSetAwb(sentry_camera_white_balance_e.kAutoWhiteBalance)
Sentry2VisionSensor.VisionSetStatus(sentry2_status.Enable, sentry_vision_e.kVisionLine)
basic.forever(function () {
    basic.showNumber(Sentry2VisionSensor.Detected(sentry_vision_e.kVisionLine))
})

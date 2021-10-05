Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kI2CMode)
Sentry.VisionSetStatus(SentryId.Sentry00, SentryStatus.Enable, sentry_vision_detected.kVisionQrCode)
basic.forever(function () {
    for (let index = 0; index <= Sentry.Detected(SentryId.Sentry00, sentry_vision_detected.kVisionQrCode); index++) {
        serial.writeValue("xxxxxxxxxxxxxx", index)
        serial.writeLine(Sentry.GetQrCodeValue(SentryId.Sentry00))
    }
    basic.pause(2000)
})

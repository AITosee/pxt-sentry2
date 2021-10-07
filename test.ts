Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kI2CMode)
Sentry.VisionSetStatus(SentryId.Sentry00, SentryStatus.Enable, sentry_vision_e.kVisionQrCode)
Sentry.LedSetColor(SentryId.Sentry00, sentry_led_color_e.kLedBlue, sentry_led_color_e.kLedGreen, 1)
basic.forever(function () {
    for (let index = 0; index <= Sentry.Detected(SentryId.Sentry00, sentry_vision_e.kVisionQrCode) - 1; index++) {
        serial.writeValue("x", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.Horizontal))
        serial.writeValue("y", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.Vertical))
        serial.writeValue("w", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.Width))
        serial.writeValue("h", Sentry.QrRcgValue(SentryId.Sentry00, sentry_qr_info_e.Height))
        serial.writeLine(Sentry.GetQrCodeValue(SentryId.Sentry00))
    }
    basic.pause(2000)
})

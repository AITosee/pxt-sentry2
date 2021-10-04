Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kSerialMode)
Sentry.VisionSetStatus(SentryId.Sentry00, SentryStatus.Enable, sentry_vision_e.kVisionColor)
basic.forever(function () {
    serial.writeNumber(Sentry.Cols(SentryId.Sentry00))
    serial.writeLine("")
    serial.writeNumber(Sentry.Rows(SentryId.Sentry00))
    serial.writeLine("")
    basic.pause(100)
})

